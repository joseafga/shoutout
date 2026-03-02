use anyhow::{Result, anyhow};
use boa_engine::{Context, Source};
use cookie::Cookie;
use regex::Regex;
use scraper::{Html, Selector};
use std::time::Duration;
use url::Url;
use worker::{Delay, Fetch, Headers, Request, RequestInit, RequestRedirect};

pub struct Cloudpass;

impl Cloudpass {
    pub async fn get(url: &str) -> Result<String> {
        let headers = Headers::new();
        headers.set(
            "User-Agent",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        )?;
        headers.set(
            "Accept",
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        )?;
        headers.set("Accept-Language", "en-US,en;q=0.5")?;
        headers.set("Accept-Encoding", "gzip, deflate, br")?;
        headers.set("Connection", "keep-alive")?;
        headers.set("Upgrade-Insecure-Requests", "1")?;

        let init = RequestInit {
            headers: headers.clone(),
            redirect: RequestRedirect::Follow,
            ..Default::default()
        };

        let mut resp = Fetch::Request(Request::new_with_init(url, &init)?)
            .send()
            .await?;
        let status = resp.status_code();
        let body = resp.text().await?;

        if status == 403 || status == 503 {
            if Self::is_cloudflare_challenge(&body) {
                return Self::solve_js_challenge(url, &body, headers).await;
            }
        }

        Ok(body)
    }

    fn is_cloudflare_challenge(body: &str) -> bool {
        body.contains("cloudflare")
            && (body.contains("/challenge-platform/")
                || body.contains("chk_jschl")
                || body.contains("jschl_vc"))
    }

    async fn solve_js_challenge(url: &str, body: &str, base_headers: Headers) -> Result<String> {
        let parsed_url = Url::parse(url)?;
        let host = parsed_url.host_str().ok_or(anyhow!("No host"))?.to_string();

        let document = Html::parse_document(body);

        let form_selector = Selector::parse(r#"form[id="challenge-form"]"#).unwrap();
        let form = document
            .select(&form_selector)
            .next()
            .ok_or(anyhow!("No challenge form"))?;

        let action = form.value().attr("action").ok_or(anyhow!("No action"))?;
        let full_action = if action.starts_with('/') {
            format!(
                "{}://{}{}",
                parsed_url.scheme(),
                parsed_url.host_str().unwrap_or(""),
                action
            )
        } else {
            action.to_string()
        };

        let jschl_vc = Self::get_input_value(&document, "jschl_vc")?;
        let pass = Self::get_input_value(&document, "pass")?;

        let script_selector = Selector::parse("script").unwrap();
        let script = document
            .select(&script_selector)
            .find(|s| s.inner_html().contains("jschl-answer"))
            .ok_or(anyhow!("No challenge script"))?;

        let mut js = script.inner_html();

        // JS sanitize
        js = Regex::new(r"setTimeout\(function\(\)\{")?
            .replace(&js, "")
            .to_string();
        js = Regex::new(r"\},\s*\d+\);")?.replace(&js, "").to_string();
        js = Regex::new(r"f\.action \+= location\.hash;")?
            .replace(&js, "")
            .to_string();
        js = Regex::new(r"f\.submit\(\);")?.replace(&js, "").to_string();

        let pre_js = format!(
            r#"
            var a = {{ value: 0 }};
            var t = "{host}";
            var location = {{ hash: "" }};
            var document = {{
                createElement: function(tag) {{ return {{ innerHTML: "", firstChild: {{ href: "http://{host}/" }} }}; }},
                getElementById: function(id) {{ return {{ value: {{}} }}; }}
            }};
            "#
        );

        let full_js = pre_js + &js + "; a.value.toFixed(10);";

        let mut context = Context::default();
        let js_value = context
            .eval(Source::from_bytes(full_js.as_bytes()))
            .map_err(|e| anyhow!("JS eval error: {}", e.to_string()))?;

        let answer = if let Some(s) = js_value.as_string() {
            s.to_std_string_escaped()
        } else if let Some(n) = js_value.as_number() {
            n.to_string()
        } else {
            return Err(anyhow!("Invalid JS result"));
        };

        Delay::from(Duration::from_secs(5)).await;

        let challenge_url = format!(
            "{}?jschl_vc={}&pass={}&jschl_answer={}",
            full_action, jschl_vc, pass, answer
        );

        // Submit challenge
        let solve_headers = Headers::new();
        solve_headers.set("Referer", url)?;
        let solve_resp = Fetch::Request(Request::new_with_init(
            &challenge_url,
            &RequestInit {
                headers: solve_headers,
                redirect: RequestRedirect::Follow,
                ..Default::default()
            },
        )?)
        .send()
        .await?;

        // Cookie extraction
        let set_cookies: Vec<String> = solve_resp
            .headers()
            .entries()
            .filter(|(k, _)| k.to_lowercase() == "set-cookie")
            .map(|(_, v)| v)
            .collect();

        let mut cookie_strings = Vec::new();
        for sc in set_cookies {
            if let Ok(c) = Cookie::parse(sc) {
                cookie_strings.push(format!("{}={}", c.name(), c.value()));
            }
        }
        let cookie_header = cookie_strings.join("; ");

        // Retry original request with cookies
        base_headers.set("Cookie", &cookie_header)?;
        let mut orig_resp = Fetch::Request(Request::new_with_init(
            url,
            &RequestInit {
                headers: base_headers,
                redirect: RequestRedirect::Follow,
                ..Default::default()
            },
        )?)
        .send()
        .await?;

        Ok(orig_resp.text().await?)
    }

    fn get_input_value(document: &Html, name: &str) -> Result<String> {
        let selector = Selector::parse(&format!(r#"input[name="{}"]"#, name)).unwrap();
        let input = document
            .select(&selector)
            .next()
            .ok_or(anyhow!("No input for {}", name))?;
        Ok(input
            .value()
            .attr("value")
            .ok_or(anyhow!("No value"))?
            .to_string())
    }
}
