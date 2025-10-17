var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// build/index.js
import { WorkerEntrypoint as rt } from "cloudflare:workers";
import T from "./1a02325038d50004e00f991a56902ea1efe397f1-index_bg.wasm";
var r;
var W = null;
function F() {
  return (W === null || W.byteLength === 0) && (W = new Uint8Array(r.memory.buffer)), W;
}
__name(F, "F");
var U = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
U.decode();
function q(e, t) {
  return U.decode(F().subarray(e, e + t));
}
__name(q, "q");
function d(e, t) {
  return e = e >>> 0, q(e, t);
}
__name(d, "d");
var g = 0;
var j = new TextEncoder();
"encodeInto" in j || (j.encodeInto = function(e, t) {
  let n = j.encode(e);
  return t.set(n), { read: e.length, written: n.length };
});
function S(e, t, n) {
  if (n === void 0) {
    let u = j.encode(e), E = t(u.length, 1) >>> 0;
    return F().subarray(E, E + u.length).set(u), g = u.length, E;
  }
  let _ = e.length, i = t(_, 1) >>> 0, c = F(), s = 0;
  for (; s < _; s++) {
    let u = e.charCodeAt(s);
    if (u > 127) break;
    c[i + s] = u;
  }
  if (s !== _) {
    s !== 0 && (e = e.slice(s)), i = n(i, _, _ = s + e.length * 3, 1) >>> 0;
    let u = F().subarray(i + s, i + _), E = j.encodeInto(e, u);
    s += E.written, i = n(i, _, s, 1) >>> 0;
  }
  return g = s, i;
}
__name(S, "S");
var l = null;
function b() {
  return (l === null || l.buffer.detached === true || l.buffer.detached === void 0 && l.buffer !== r.memory.buffer) && (l = new DataView(r.memory.buffer)), l;
}
__name(b, "b");
function f(e) {
  return e == null;
}
__name(f, "f");
function w(e) {
  let t = r.__externref_table_alloc();
  return r.__wbindgen_export_3.set(t, e), t;
}
__name(w, "w");
function a(e, t) {
  try {
    return e.apply(this, t);
  } catch (n) {
    let _ = w(n);
    r.__wbindgen_exn_store(_);
  }
}
__name(a, "a");
function B(e, t) {
  return e = e >>> 0, F().subarray(e / 1, e / 1 + t);
}
__name(B, "B");
function z(e) {
  let t = typeof e;
  if (t == "number" || t == "boolean" || e == null) return `${e}`;
  if (t == "string") return `"${e}"`;
  if (t == "symbol") {
    let i = e.description;
    return i == null ? "Symbol" : `Symbol(${i})`;
  }
  if (t == "function") {
    let i = e.name;
    return typeof i == "string" && i.length > 0 ? `Function(${i})` : "Function";
  }
  if (Array.isArray(e)) {
    let i = e.length, c = "[";
    i > 0 && (c += z(e[0]));
    for (let s = 1; s < i; s++) c += ", " + z(e[s]);
    return c += "]", c;
  }
  let n = /\[object ([^\]]+)\]/.exec(toString.call(e)), _;
  if (n && n.length > 1) _ = n[1];
  else return toString.call(e);
  if (_ == "Object") try {
    return "Object(" + JSON.stringify(e) + ")";
  } catch {
    return "Object";
  }
  return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : _;
}
__name(z, "z");
var O = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry((e) => {
  e.instance === o && r.__wbindgen_export_5.get(e.dtor)(e.a, e.b);
});
function H(e, t, n, _) {
  let i = { a: e, b: t, cnt: 1, dtor: n, instance: o }, c = /* @__PURE__ */ __name((...s) => {
    if (i.instance !== o) throw new Error("Cannot invoke closure from previous WASM instance");
    i.cnt++;
    let u = i.a;
    i.a = 0;
    try {
      return _(u, i.b, ...s);
    } finally {
      --i.cnt === 0 ? (r.__wbindgen_export_5.get(i.dtor)(u, i.b), O.unregister(i)) : i.a = u;
    }
  }, "c");
  return c.original = i, O.register(c, i, i), c;
}
__name(H, "H");
function P(e, t, n) {
  return r.fetch(e, t, n);
}
__name(P, "P");
function A(e) {
  r.setPanicHook(e);
}
__name(A, "A");
function $(e, t) {
  e = e >>> 0;
  let n = b(), _ = [];
  for (let i = e; i < e + 4 * t; i += 4) _.push(r.__wbindgen_export_3.get(n.getUint32(i, true)));
  return r.__externref_drop_slice(e, t), _;
}
__name($, "$");
function N(e, t) {
  let n = t(e.length * 4, 4) >>> 0;
  for (let _ = 0; _ < e.length; _++) {
    let i = w(e[_]);
    b().setUint32(n + 4 * _, i, true);
  }
  return g = e.length, n;
}
__name(N, "N");
function V(e, t, n) {
  r.closure174_externref_shim(e, t, n);
}
__name(V, "V");
function J(e, t, n, _) {
  r.closure206_externref_shim(e, t, n, _);
}
__name(J, "J");
var G = ["bytes"];
var o = 0;
function C() {
  o++, l = null, W = null, typeof numBytesDecoded < "u" && (numBytesDecoded = 0), typeof g < "u" && (g = 0), r = new WebAssembly.Instance(T, L).exports, r.__wbindgen_start();
}
__name(C, "C");
var K = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: e, instance: t }) => {
  t === o && r.__wbg_containerstartupoptions_free(e >>> 0, 1);
});
var p = class {
  static {
    __name(this, "p");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, K.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    r.__wbg_containerstartupoptions_free(t, 0);
  }
  get entrypoint() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    let t = r.__wbg_get_containerstartupoptions_entrypoint(this.__wbg_ptr);
    var n = $(t[0], t[1]).slice();
    return r.__wbindgen_free(t[0], t[1] * 4, 4), n;
  }
  set entrypoint(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    let n = N(t, r.__wbindgen_malloc), _ = g;
    r.__wbg_set_containerstartupoptions_entrypoint(this.__wbg_ptr, n, _);
  }
  get enableInternet() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    let t = r.__wbg_get_containerstartupoptions_enableInternet(this.__wbg_ptr);
    return t === 16777215 ? void 0 : t !== 0;
  }
  set enableInternet(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    r.__wbg_set_containerstartupoptions_enableInternet(this.__wbg_ptr, f(t) ? 16777215 : t ? 1 : 0);
  }
  get env() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    return r.__wbg_get_containerstartupoptions_env(this.__wbg_ptr);
  }
  set env(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    r.__wbg_set_containerstartupoptions_env(this.__wbg_ptr, t);
  }
};
Symbol.dispose && (p.prototype[Symbol.dispose] = p.prototype.free);
var Q = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: e, instance: t }) => {
  t === o && r.__wbg_intounderlyingbytesource_free(e >>> 0, 1);
});
var h = class {
  static {
    __name(this, "h");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Q.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    r.__wbg_intounderlyingbytesource_free(t, 0);
  }
  get type() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    let t = r.intounderlyingbytesource_type(this.__wbg_ptr);
    return G[t];
  }
  get autoAllocateChunkSize() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    return r.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr) >>> 0;
  }
  start(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    r.intounderlyingbytesource_start(this.__wbg_ptr, t);
  }
  pull(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    return r.intounderlyingbytesource_pull(this.__wbg_ptr, t);
  }
  cancel() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    let t = this.__destroy_into_raw();
    r.intounderlyingbytesource_cancel(t);
  }
};
Symbol.dispose && (h.prototype[Symbol.dispose] = h.prototype.free);
var X = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: e, instance: t }) => {
  t === o && r.__wbg_intounderlyingsink_free(e >>> 0, 1);
});
var y = class {
  static {
    __name(this, "y");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, X.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    r.__wbg_intounderlyingsink_free(t, 0);
  }
  write(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    return r.intounderlyingsink_write(this.__wbg_ptr, t);
  }
  close() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    let t = this.__destroy_into_raw();
    return r.intounderlyingsink_close(t);
  }
  abort(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    let n = this.__destroy_into_raw();
    return r.intounderlyingsink_abort(n, t);
  }
};
Symbol.dispose && (y.prototype[Symbol.dispose] = y.prototype.free);
var Y = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: e, instance: t }) => {
  t === o && r.__wbg_intounderlyingsource_free(e >>> 0, 1);
});
var m = class {
  static {
    __name(this, "m");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Y.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    r.__wbg_intounderlyingsource_free(t, 0);
  }
  pull(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    return r.intounderlyingsource_pull(this.__wbg_ptr, t);
  }
  cancel() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    let t = this.__destroy_into_raw();
    r.intounderlyingsource_cancel(t);
  }
};
Symbol.dispose && (m.prototype[Symbol.dispose] = m.prototype.free);
var Z = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: e, instance: t }) => {
  t === o && r.__wbg_minifyconfig_free(e >>> 0, 1);
});
var x = class {
  static {
    __name(this, "x");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Z.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    r.__wbg_minifyconfig_free(t, 0);
  }
  get js() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    return r.__wbg_get_minifyconfig_js(this.__wbg_ptr) !== 0;
  }
  set js(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    r.__wbg_set_minifyconfig_js(this.__wbg_ptr, t);
  }
  get html() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    return r.__wbg_get_minifyconfig_html(this.__wbg_ptr) !== 0;
  }
  set html(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    r.__wbg_set_minifyconfig_html(this.__wbg_ptr, t);
  }
  get css() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    return r.__wbg_get_minifyconfig_css(this.__wbg_ptr) !== 0;
  }
  set css(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    r.__wbg_set_minifyconfig_css(this.__wbg_ptr, t);
  }
};
Symbol.dispose && (x.prototype[Symbol.dispose] = x.prototype.free);
var tt = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: e, instance: t }) => {
  t === o && r.__wbg_r2range_free(e >>> 0, 1);
});
var I = class {
  static {
    __name(this, "I");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, tt.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    r.__wbg_r2range_free(t, 0);
  }
  get offset() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    let t = r.__wbg_get_r2range_offset(this.__wbg_ptr);
    return t[0] === 0 ? void 0 : t[1];
  }
  set offset(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    r.__wbg_set_r2range_offset(this.__wbg_ptr, !f(t), f(t) ? 0 : t);
  }
  get length() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    let t = r.__wbg_get_r2range_length(this.__wbg_ptr);
    return t[0] === 0 ? void 0 : t[1];
  }
  set length(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    r.__wbg_set_r2range_length(this.__wbg_ptr, !f(t), f(t) ? 0 : t);
  }
  get suffix() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    let t = r.__wbg_get_r2range_suffix(this.__wbg_ptr);
    return t[0] === 0 ? void 0 : t[1];
  }
  set suffix(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== o) throw new Error("Invalid stale object from previous Wasm instance");
    r.__wbg_set_r2range_suffix(this.__wbg_ptr, !f(t), f(t) ? 0 : t);
  }
};
Symbol.dispose && (I.prototype[Symbol.dispose] = I.prototype.free);
var L = { __wbindgen_placeholder__: { __wbg_Error_e17e777aac105295: /* @__PURE__ */ __name(function(e, t) {
  return Error(d(e, t));
}, "__wbg_Error_e17e777aac105295"), __wbg_String_8f0eb39a4a4c2f66: /* @__PURE__ */ __name(function(e, t) {
  let n = String(t), _ = S(n, r.__wbindgen_malloc, r.__wbindgen_realloc), i = g;
  b().setInt32(e + 4, i, true), b().setInt32(e + 0, _, true);
}, "__wbg_String_8f0eb39a4a4c2f66"), __wbg_buffer_8d40b1d762fb3c66: /* @__PURE__ */ __name(function(e) {
  return e.buffer;
}, "__wbg_buffer_8d40b1d762fb3c66"), __wbg_byobRequest_2c036bceca1e6037: /* @__PURE__ */ __name(function(e) {
  let t = e.byobRequest;
  return f(t) ? 0 : w(t);
}, "__wbg_byobRequest_2c036bceca1e6037"), __wbg_byteLength_331a6b5545834024: /* @__PURE__ */ __name(function(e) {
  return e.byteLength;
}, "__wbg_byteLength_331a6b5545834024"), __wbg_byteOffset_49a5b5608000358b: /* @__PURE__ */ __name(function(e) {
  return e.byteOffset;
}, "__wbg_byteOffset_49a5b5608000358b"), __wbg_call_13410aac570ffff7: /* @__PURE__ */ __name(function() {
  return a(function(e, t) {
    return e.call(t);
  }, arguments);
}, "__wbg_call_13410aac570ffff7"), __wbg_call_641db1bb5db5a579: /* @__PURE__ */ __name(function() {
  return a(function(e, t, n, _) {
    return e.call(t, n, _);
  }, arguments);
}, "__wbg_call_641db1bb5db5a579"), __wbg_call_a5400b25a865cfd8: /* @__PURE__ */ __name(function() {
  return a(function(e, t, n) {
    return e.call(t, n);
  }, arguments);
}, "__wbg_call_a5400b25a865cfd8"), __wbg_cause_61050b860539c54b: /* @__PURE__ */ __name(function(e) {
  return e.cause;
}, "__wbg_cause_61050b860539c54b"), __wbg_cf_b1ad1dbf5d915558: /* @__PURE__ */ __name(function() {
  return a(function(e) {
    let t = e.cf;
    return f(t) ? 0 : w(t);
  }, arguments);
}, "__wbg_cf_b1ad1dbf5d915558"), __wbg_close_cccada6053ee3a65: /* @__PURE__ */ __name(function() {
  return a(function(e) {
    e.close();
  }, arguments);
}, "__wbg_close_cccada6053ee3a65"), __wbg_close_d71a78219dc23e91: /* @__PURE__ */ __name(function() {
  return a(function(e) {
    e.close();
  }, arguments);
}, "__wbg_close_d71a78219dc23e91"), __wbg_constructor_ceaf28c60b36b26f: /* @__PURE__ */ __name(function(e) {
  return e.constructor;
}, "__wbg_constructor_ceaf28c60b36b26f"), __wbg_enqueue_452bc2343d1c2ff9: /* @__PURE__ */ __name(function() {
  return a(function(e, t) {
    e.enqueue(t);
  }, arguments);
}, "__wbg_enqueue_452bc2343d1c2ff9"), __wbg_error_4700bbeb78363714: /* @__PURE__ */ __name(function(e, t) {
  console.error(e, t);
}, "__wbg_error_4700bbeb78363714"), __wbg_error_99981e16d476aa5c: /* @__PURE__ */ __name(function(e) {
  console.error(e);
}, "__wbg_error_99981e16d476aa5c"), __wbg_get_458e874b43b18b25: /* @__PURE__ */ __name(function() {
  return a(function(e, t) {
    return Reflect.get(e, t);
  }, arguments);
}, "__wbg_get_458e874b43b18b25"), __wbg_headers_af04c3eb495104ed: /* @__PURE__ */ __name(function(e) {
  return e.headers;
}, "__wbg_headers_af04c3eb495104ed"), __wbg_instanceof_Error_76149ae9b431750e: /* @__PURE__ */ __name(function(e) {
  let t;
  try {
    t = e instanceof Error;
  } catch {
    t = false;
  }
  return t;
}, "__wbg_instanceof_Error_76149ae9b431750e"), __wbg_length_6bb7e81f9d7713e4: /* @__PURE__ */ __name(function(e) {
  return e.length;
}, "__wbg_length_6bb7e81f9d7713e4"), __wbg_method_8e0e977407edb4c6: /* @__PURE__ */ __name(function(e, t) {
  let n = t.method, _ = S(n, r.__wbindgen_malloc, r.__wbindgen_realloc), i = g;
  b().setInt32(e + 4, i, true), b().setInt32(e + 0, _, true);
}, "__wbg_method_8e0e977407edb4c6"), __wbg_name_23070e4686c7bc20: /* @__PURE__ */ __name(function(e) {
  return e.name;
}, "__wbg_name_23070e4686c7bc20"), __wbg_new_19c25a3f2fa63a02: /* @__PURE__ */ __name(function() {
  return new Object();
}, "__wbg_new_19c25a3f2fa63a02"), __wbg_new_2e3c58a15f39f5f9: /* @__PURE__ */ __name(function(e, t) {
  try {
    var n = { a: e, b: t }, _ = /* @__PURE__ */ __name((c, s) => {
      let u = n.a;
      n.a = 0;
      try {
        return J(u, n.b, c, s);
      } finally {
        n.a = u;
      }
    }, "_");
    return new Promise(_);
  } finally {
    n.a = n.b = 0;
  }
}, "__wbg_new_2e3c58a15f39f5f9"), __wbg_new_da9dc54c5db29dfa: /* @__PURE__ */ __name(function(e, t) {
  return new Error(d(e, t));
}, "__wbg_new_da9dc54c5db29dfa"), __wbg_new_f6e53210afea8e45: /* @__PURE__ */ __name(function() {
  return a(function() {
    return new Headers();
  }, arguments);
}, "__wbg_new_f6e53210afea8e45"), __wbg_newnoargs_254190557c45b4ec: /* @__PURE__ */ __name(function(e, t) {
  return new Function(d(e, t));
}, "__wbg_newnoargs_254190557c45b4ec"), __wbg_newwithbyteoffsetandlength_e8f53910b4d42b45: /* @__PURE__ */ __name(function(e, t, n) {
  return new Uint8Array(e, t >>> 0, n >>> 0);
}, "__wbg_newwithbyteoffsetandlength_e8f53910b4d42b45"), __wbg_newwithlength_a167dcc7aaa3ba77: /* @__PURE__ */ __name(function(e) {
  return new Uint8Array(e >>> 0);
}, "__wbg_newwithlength_a167dcc7aaa3ba77"), __wbg_newwithoptbuffersourceandinit_b492b23a1fc82449: /* @__PURE__ */ __name(function() {
  return a(function(e, t) {
    return new Response(e, t);
  }, arguments);
}, "__wbg_newwithoptbuffersourceandinit_b492b23a1fc82449"), __wbg_newwithoptreadablestreamandinit_438b8943bcc5c115: /* @__PURE__ */ __name(function() {
  return a(function(e, t) {
    return new Response(e, t);
  }, arguments);
}, "__wbg_newwithoptreadablestreamandinit_438b8943bcc5c115"), __wbg_newwithoptstrandinit_e43b4aa9635e7001: /* @__PURE__ */ __name(function() {
  return a(function(e, t, n) {
    return new Response(e === 0 ? void 0 : d(e, t), n);
  }, arguments);
}, "__wbg_newwithoptstrandinit_e43b4aa9635e7001"), __wbg_queueMicrotask_25d0739ac89e8c88: /* @__PURE__ */ __name(function(e) {
  queueMicrotask(e);
}, "__wbg_queueMicrotask_25d0739ac89e8c88"), __wbg_queueMicrotask_4488407636f5bf24: /* @__PURE__ */ __name(function(e) {
  return e.queueMicrotask;
}, "__wbg_queueMicrotask_4488407636f5bf24"), __wbg_resolve_4055c623acdd6a1b: /* @__PURE__ */ __name(function(e) {
  return Promise.resolve(e);
}, "__wbg_resolve_4055c623acdd6a1b"), __wbg_respond_6c2c4e20ef85138e: /* @__PURE__ */ __name(function() {
  return a(function(e, t) {
    e.respond(t >>> 0);
  }, arguments);
}, "__wbg_respond_6c2c4e20ef85138e"), __wbg_set_1353b2a5e96bc48c: /* @__PURE__ */ __name(function(e, t, n) {
  e.set(B(t, n));
}, "__wbg_set_1353b2a5e96bc48c"), __wbg_set_1c17f9738fac2718: /* @__PURE__ */ __name(function() {
  return a(function(e, t, n, _, i) {
    e.set(d(t, n), d(_, i));
  }, arguments);
}, "__wbg_set_1c17f9738fac2718"), __wbg_set_3f1d0b984ed272ed: /* @__PURE__ */ __name(function(e, t, n) {
  e[t] = n;
}, "__wbg_set_3f1d0b984ed272ed"), __wbg_set_453345bcda80b89a: /* @__PURE__ */ __name(function() {
  return a(function(e, t, n) {
    return Reflect.set(e, t, n);
  }, arguments);
}, "__wbg_set_453345bcda80b89a"), __wbg_setheaders_ea17f6abcffa069c: /* @__PURE__ */ __name(function(e, t) {
  e.headers = t;
}, "__wbg_setheaders_ea17f6abcffa069c"), __wbg_setstatus_5964ea9c49463997: /* @__PURE__ */ __name(function(e, t) {
  e.status = t;
}, "__wbg_setstatus_5964ea9c49463997"), __wbg_static_accessor_GLOBAL_8921f820c2ce3f12: /* @__PURE__ */ __name(function() {
  let e = typeof global > "u" ? null : global;
  return f(e) ? 0 : w(e);
}, "__wbg_static_accessor_GLOBAL_8921f820c2ce3f12"), __wbg_static_accessor_GLOBAL_THIS_f0a4409105898184: /* @__PURE__ */ __name(function() {
  let e = typeof globalThis > "u" ? null : globalThis;
  return f(e) ? 0 : w(e);
}, "__wbg_static_accessor_GLOBAL_THIS_f0a4409105898184"), __wbg_static_accessor_SELF_995b214ae681ff99: /* @__PURE__ */ __name(function() {
  let e = typeof self > "u" ? null : self;
  return f(e) ? 0 : w(e);
}, "__wbg_static_accessor_SELF_995b214ae681ff99"), __wbg_static_accessor_WINDOW_cde3890479c675ea: /* @__PURE__ */ __name(function() {
  let e = typeof window > "u" ? null : window;
  return f(e) ? 0 : w(e);
}, "__wbg_static_accessor_WINDOW_cde3890479c675ea"), __wbg_then_b33a773d723afa3e: /* @__PURE__ */ __name(function(e, t, n) {
  return e.then(t, n);
}, "__wbg_then_b33a773d723afa3e"), __wbg_then_e22500defe16819f: /* @__PURE__ */ __name(function(e, t) {
  return e.then(t);
}, "__wbg_then_e22500defe16819f"), __wbg_toString_d8f537919ef401d6: /* @__PURE__ */ __name(function(e) {
  return e.toString();
}, "__wbg_toString_d8f537919ef401d6"), __wbg_url_79bd91c4e84e8270: /* @__PURE__ */ __name(function(e, t) {
  let n = t.url, _ = S(n, r.__wbindgen_malloc, r.__wbindgen_realloc), i = g;
  b().setInt32(e + 4, i, true), b().setInt32(e + 0, _, true);
}, "__wbg_url_79bd91c4e84e8270"), __wbg_view_91cc97d57ab30530: /* @__PURE__ */ __name(function(e) {
  let t = e.view;
  return f(t) ? 0 : w(t);
}, "__wbg_view_91cc97d57ab30530"), __wbg_wbindgencbdrop_eb10308566512b88: /* @__PURE__ */ __name(function(e) {
  let t = e.original;
  return t.cnt-- == 1 ? (t.a = 0, true) : false;
}, "__wbg_wbindgencbdrop_eb10308566512b88"), __wbg_wbindgendebugstring_99ef257a3ddda34d: /* @__PURE__ */ __name(function(e, t) {
  let n = z(t), _ = S(n, r.__wbindgen_malloc, r.__wbindgen_realloc), i = g;
  b().setInt32(e + 4, i, true), b().setInt32(e + 0, _, true);
}, "__wbg_wbindgendebugstring_99ef257a3ddda34d"), __wbg_wbindgenisfunction_8cee7dce3725ae74: /* @__PURE__ */ __name(function(e) {
  return typeof e == "function";
}, "__wbg_wbindgenisfunction_8cee7dce3725ae74"), __wbg_wbindgenisundefined_c4b71d073b92f3c5: /* @__PURE__ */ __name(function(e) {
  return e === void 0;
}, "__wbg_wbindgenisundefined_c4b71d073b92f3c5"), __wbg_wbindgenstringget_0f16a6ddddef376f: /* @__PURE__ */ __name(function(e, t) {
  let n = t, _ = typeof n == "string" ? n : void 0;
  var i = f(_) ? 0 : S(_, r.__wbindgen_malloc, r.__wbindgen_realloc), c = g;
  b().setInt32(e + 4, c, true), b().setInt32(e + 0, i, true);
}, "__wbg_wbindgenstringget_0f16a6ddddef376f"), __wbg_wbindgenthrow_451ec1a8469d7eb6: /* @__PURE__ */ __name(function(e, t) {
  throw new Error(d(e, t));
}, "__wbg_wbindgenthrow_451ec1a8469d7eb6"), __wbindgen_cast_2241b6af4c4b2941: /* @__PURE__ */ __name(function(e, t) {
  return d(e, t);
}, "__wbindgen_cast_2241b6af4c4b2941"), __wbindgen_cast_4625c577ab2ec9ee: /* @__PURE__ */ __name(function(e) {
  return BigInt.asUintN(64, e);
}, "__wbindgen_cast_4625c577ab2ec9ee"), __wbindgen_cast_c2ab4ccad0d29d1c: /* @__PURE__ */ __name(function(e, t) {
  return H(e, t, 173, V);
}, "__wbindgen_cast_c2ab4ccad0d29d1c"), __wbindgen_cast_d6cd19b81560fd6e: /* @__PURE__ */ __name(function(e) {
  return e;
}, "__wbindgen_cast_d6cd19b81560fd6e"), __wbindgen_init_externref_table: /* @__PURE__ */ __name(function() {
  let e = r.__wbindgen_export_3, t = e.grow(4);
  e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, true), e.set(t + 3, false);
}, "__wbindgen_init_externref_table") } };
var et = new WebAssembly.Instance(T, L);
r = et.exports;
r.__wbindgen_start();
Error.stackTraceLimit = 100;
var k = null;
function D() {
  A && A(function(e) {
    k = new Error("Critical Rust panic: " + e), console.error(k);
  });
}
__name(D, "D");
D();
var R = 0;
function it() {
  k && (console.log("Reinitializing Wasm application"), C(), k = null, D(), R++);
}
__name(it, "it");
var M = class extends rt {
  static {
    __name(this, "M");
  }
  async fetch(t) {
    return it(), await P(t, this.env, this.ctx);
  }
};
var v = { construct(e, t, n) {
  let _ = { instance: Reflect.construct(e, t, n), instanceId: R, ctor: e, args: t, newTarget: n };
  return new Proxy(_, { get(i, c, s) {
    return i.instanceId !== R && (i.instance = Reflect.construct(i.ctor, i.args, i.newTarget), i.instanceId = R), Reflect.get(i.instance, c, s);
  } });
} };
var st = new Proxy(p, v);
var ct = new Proxy(h, v);
var ut = new Proxy(y, v);
var at = new Proxy(m, v);
var ft = new Proxy(x, v);
var bt = new Proxy(I, v);
export {
  st as ContainerStartupOptions,
  ct as IntoUnderlyingByteSource,
  ut as IntoUnderlyingSink,
  at as IntoUnderlyingSource,
  ft as MinifyConfig,
  bt as R2Range,
  C as __wbg_reset_state,
  M as default,
  P as fetch,
  A as setPanicHook
};
//# sourceMappingURL=index.js.map
