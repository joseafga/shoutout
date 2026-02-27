use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Debug, Serialize, Deserialize)]
pub struct Channel {
    // pub id: u64,
    // pub user_id: u64,
    // pub slug: String,
    // pub is_banned: bool,
    // pub playback_url: String,
    // pub name_updated_at: Option<String>,
    // pub vod_enabled: bool,
    // pub subscription_enabled: bool,
    pub is_affiliate: bool,
    #[serde(rename = "followersCount")]
    pub followers_count: u64,
    // pub subscriber_badges: Vec<SubscriberBadge>,
    // pub banner_image: ResponsiveImage,
    pub recent_categories: Vec<Category>,
    pub livestream: Option<Livestream>,
    // pub role: Option<serde_json::Value>,
    // pub muted: bool,
    // pub follower_badges: Vec<serde_json::Value>,
    // pub offline_banner_image: ResponsiveImage,
    // pub can_host: bool,
    pub user: User,
    // pub chatroom: Chatroom,
    // pub ascending_links: Vec<AscendingLink>,
    // pub plan: Option<serde_json::Value>,
    pub previous_livestreams: Vec<Livestream>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: u64,
    pub username: String,
    pub agreed_to_terms: bool,
    pub email_verified_at: String,
    pub bio: Option<String>,
    pub country: Option<String>,
    pub state: Option<String>,
    pub city: Option<String>,
    pub instagram: Option<String>,
    pub twitter: Option<String>,
    pub youtube: Option<String>,
    pub discord: Option<String>,
    pub tiktok: Option<String>,
    pub facebook: Option<String>,
    pub gender: Option<String>,
    pub profile_pic: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Category {
    pub id: u64,
    pub category_id: u64,
    pub name: String,
    pub slug: String,
    pub tags: Vec<String>,
    pub description: Option<String>,
    pub deleted_at: Option<String>,
    pub is_mature: bool,
    pub is_promoted: bool,
    pub viewers: u64,
    pub is_fallback: bool,
    pub banner: Option<ResponsiveImage>,
    pub category: CategoryType,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ResponsiveImage {
    #[serde(alias = "src")]
    pub url: String,
    #[serde(alias = "srcset")]
    pub responsive: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CategoryType {
    pub id: u64,
    pub name: String,
    pub slug: String,
    pub icon: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Livestream {
    pub id: u64,
    pub slug: String,
    pub channel_id: u64,
    pub created_at: String,
    pub session_title: String,
    pub is_live: bool,
    pub risk_level_id: Option<u64>,
    pub start_time: String,
    pub source: Option<String>,
    pub twitch_channel: Option<String>,
    pub duration: u64,
    pub language: String,
    pub is_mature: bool,
    pub viewer_count: u64,
    pub thumbnail: ResponsiveImage,
    pub views: Option<u64>,
    pub lang_iso: String,
    pub tags: Vec<serde_json::Value>,
    pub categories: Vec<Category>,
    pub video: Option<VideoDetail>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VideoDetail {
    pub id: u64,
    pub live_stream_id: u64,
    pub slug: Option<String>,
    pub thumb: Option<String>,
    pub s3: Option<String>,
    pub trading_platform_id: Option<String>,
    pub created_at: String,
    pub updated_at: String,
    pub uuid: String,
    pub views: u64,
    pub deleted_at: Option<String>,
    pub is_pruned: bool,
    pub is_private: bool,
    pub status: String,
}
