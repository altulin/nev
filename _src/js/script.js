(() => {
  var e = {
    51: function(e, t, i) {
      var r, n;
 /*! tabbyjs v12.0.3 | (c) 2019 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/tabby */      Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), 
      n = void 0 !== i.g ? i.g : "undefined" != typeof window ? window : this, r = function() {
        return function(e) {
          "use strict";
          var t = {
            idPrefix: "tabby-toggle_",
            default: "[data-tabby-default]"
          }, i = function(t) {
            if (t && "true" != t.getAttribute("aria-selected")) {
              var i = document.querySelector(t.hash);
              if (i) {
                var r = function(e) {
                  var t = e.closest('[role="tablist"]');
                  if (!t) {
                    return {};
                  }
                  var i = t.querySelector('[role="tab"][aria-selected="true"]');
                  if (!i) {
                    return {};
                  }
                  var r = document.querySelector(i.hash);
                  return i.setAttribute("aria-selected", "false"), i.setAttribute("tabindex", "-1"), 
                  r ? (r.setAttribute("hidden", "hidden"), {
                    previousTab: i,
                    previousContent: r
                  }) : {
                    previousTab: i
                  };
                }(t);
                !function(e, t) {
                  e.setAttribute("aria-selected", "true"), e.setAttribute("tabindex", "0"), t.removeAttribute("hidden"), 
                  e.focus();
                }(t, i), r.tab = t, r.content = i, function(t, i) {
                  var r;
                  "function" == typeof e.CustomEvent ? r = new CustomEvent("tabby", {
                    bubbles: !0,
                    cancelable: !0,
                    detail: i
                  }) : (r = document.createEvent("CustomEvent")).initCustomEvent("tabby", !0, !0, i), 
                  t.dispatchEvent(r);
                }(t, r);
              }
            }
          }, r = function(e, t) {
            var r = function(e) {
              var t = e.closest('[role="tablist"]'), i = t ? t.querySelectorAll('[role="tab"]') : null;
              if (i) {
                return {
                  tabs: i,
                  index: Array.prototype.indexOf.call(i, e)
                };
              }
            }(e);
            if (r) {
              var n, s = r.tabs.length - 1;
              [ "ArrowUp", "ArrowLeft", "Up", "Left" ].indexOf(t) > -1 ? n = r.index < 1 ? s : r.index - 1 : [ "ArrowDown", "ArrowRight", "Down", "Right" ].indexOf(t) > -1 ? n = r.index === s ? 0 : r.index + 1 : "Home" === t ? n = 0 : "End" === t && (n = s), 
              i(r.tabs[n]);
            }
          };
          return function(n, s) {
            var a, o, l = {
              destroy: function() {
                var e = o.querySelectorAll("a");
                Array.prototype.forEach.call(e, (function(e) {
                  var t = document.querySelector(e.hash);
                  t && function(e, t, i) {
                    e.id.slice(0, i.idPrefix.length) === i.idPrefix && (e.id = ""), e.removeAttribute("role"), 
                    e.removeAttribute("aria-controls"), e.removeAttribute("aria-selected"), e.removeAttribute("tabindex"), 
                    e.closest("li").removeAttribute("role"), t.removeAttribute("role"), t.removeAttribute("aria-labelledby"), 
                    t.removeAttribute("hidden");
                  }(e, t, a);
                })), o.removeAttribute("role"), document.documentElement.removeEventListener("click", d, !0), 
                o.removeEventListener("keydown", u, !0), a = null, o = null;
              },
              setup: function() {
                if (o = document.querySelector(n)) {
                  var e = o.querySelectorAll("a");
                  o.setAttribute("role", "tablist"), Array.prototype.forEach.call(e, (function(e) {
                    var t = document.querySelector(e.hash);
                    t && function(e, t, i) {
                      e.id || (e.id = i.idPrefix + t.id), e.setAttribute("role", "tab"), e.setAttribute("aria-controls", t.id), 
                      e.closest("li").setAttribute("role", "presentation"), t.setAttribute("role", "tabpanel"), 
                      t.setAttribute("aria-labelledby", e.id), e.matches(i.default) ? e.setAttribute("aria-selected", "true") : (e.setAttribute("aria-selected", "false"), 
                      e.setAttribute("tabindex", "-1"), t.setAttribute("hidden", "hidden"));
                    }(e, t, a);
                  }));
                }
              },
              toggle: function(e) {
                var t = e;
                "string" == typeof e && (t = document.querySelector(n + ' [role="tab"][href*="' + e + '"]')), 
                i(t);
              }
            }, d = function(e) {
              var t = e.target.closest(n + ' [role="tab"]');
              t && (e.preventDefault(), i(t));
            }, u = function(e) {
              var t = document.activeElement;
              t.matches(n + ' [role="tab"]') && ([ "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Up", "Down", "Left", "Right", "Home", "End" ].indexOf(e.key) < 0 || r(t, e.key));
            };
            return a = function() {
              var e = {};
              return Array.prototype.forEach.call(arguments, (function(t) {
                for (var i in t) {
                  if (!t.hasOwnProperty(i)) {
                    return;
                  }
                  e[i] = t[i];
                }
              })), e;
            }(t, s || {}), l.setup(), function(t) {
              if (!(e.location.hash.length < 1)) {
                var r = document.querySelector(t + ' [role="tab"][href*="' + e.location.hash + '"]');
                i(r);
              }
            }(n), document.documentElement.addEventListener("click", d, !0), o.addEventListener("keydown", u, !0), 
            l;
          };
        }(n);
      }.apply(t, []), void 0 === r || (e.exports = r);
    }
  }, t = {};
  function i(r) {
    var n = t[r];
    if (void 0 !== n) {
      return n.exports;
    }
    var s = t[r] = {
      exports: {}
    };
    return e[r].call(s.exports, s, s.exports, i), s.exports;
  }
  i.g = function() {
    if ("object" == typeof globalThis) {
      return globalThis;
    }
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) {
        return window;
      }
    }
  }(), (() => {
    "use strict";
    function e(e) {
      if (void 0 === e) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return e;
    }
    function t(e, t) {
      e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t;
    }
    /*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/    var r, n, s, a, o, l, d, u, c, p, h, f, m, g, v, _ = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: {
        lineHeight: ""
      }
    }, y = {
      duration: .5,
      overwrite: !1,
      delay: 0
    }, b = 1e8, w = 1e-8, T = 2 * Math.PI, x = T / 4, S = 0, E = Math.sqrt, C = Math.cos, M = Math.sin, k = function(e) {
      return "string" == typeof e;
    }, A = function(e) {
      return "function" == typeof e;
    }, P = function(e) {
      return "number" == typeof e;
    }, O = function(e) {
      return void 0 === e;
    }, L = function(e) {
      return "object" == typeof e;
    }, I = function(e) {
      return !1 !== e;
    }, z = function() {
      return "undefined" != typeof window;
    }, D = function(e) {
      return A(e) || k(e);
    }, F = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function() {}, R = Array.isArray, B = /(?:-?\.?\d|\.)+/gi, G = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, N = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, $ = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, q = /[+-]=-?[.\d]+/, V = /[^,'"\[\]\s]+/gi, j = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, H = {}, Y = {}, X = function(e) {
      return (Y = Te(e, H)) && xi;
    }, W = function(e, t) {
      return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
    }, U = function(e, t) {
      return !t && console.warn(e);
    }, Q = function(e, t) {
      return e && (H[e] = t) && Y && (Y[e] = t) || H;
    }, K = function() {
      return 0;
    }, Z = {
      suppressEvents: !0,
      isStart: !0,
      kill: !1
    }, J = {
      suppressEvents: !0,
      kill: !1
    }, ee = {
      suppressEvents: !0
    }, te = {}, ie = [], re = {}, ne = {}, se = {}, ae = 30, oe = [], le = "", de = function(e) {
      var t, i, r = e[0];
      if (L(r) || A(r) || (e = [ e ]), !(t = (r._gsap || {}).harness)) {
        for (i = oe.length; i-- && !oe[i].targetTest(r); ) {}
        t = oe[i];
      }
      for (i = e.length; i--; ) {
        e[i] && (e[i]._gsap || (e[i]._gsap = new Rt(e[i], t))) || e.splice(i, 1);
      }
      return e;
    }, ue = function(e) {
      return e._gsap || de(et(e))[0]._gsap;
    }, ce = function(e, t, i) {
      return (i = e[t]) && A(i) ? e[t]() : O(i) && e.getAttribute && e.getAttribute(t) || i;
    }, pe = function(e, t) {
      return (e = e.split(",")).forEach(t) || e;
    }, he = function(e) {
      return Math.round(1e5 * e) / 1e5 || 0;
    }, fe = function(e) {
      return Math.round(1e7 * e) / 1e7 || 0;
    }, me = function(e, t) {
      var i = t.charAt(0), r = parseFloat(t.substr(2));
      return e = parseFloat(e), "+" === i ? e + r : "-" === i ? e - r : "*" === i ? e * r : e / r;
    }, ge = function(e, t) {
      for (var i = t.length, r = 0; e.indexOf(t[r]) < 0 && ++r < i; ) {}
      return r < i;
    }, ve = function() {
      var e, t, i = ie.length, r = ie.slice(0);
      for (re = {}, ie.length = 0, e = 0; e < i; e++) {
        (t = r[e]) && t._lazy && (t.render(t._lazy[0], t._lazy[1], !0)._lazy = 0);
      }
    }, _e = function(e, t, i, r) {
      ie.length && !n && ve(), e.render(t, i, r || n && t < 0 && (e._initted || e._startAt)), 
      ie.length && !n && ve();
    }, ye = function(e) {
      var t = parseFloat(e);
      return (t || 0 === t) && (e + "").match(V).length < 2 ? t : k(e) ? e.trim() : e;
    }, be = function(e) {
      return e;
    }, we = function(e, t) {
      for (var i in t) {
        i in e || (e[i] = t[i]);
      }
      return e;
    }, Te = function(e, t) {
      for (var i in t) {
        e[i] = t[i];
      }
      return e;
    }, xe = function e(t, i) {
      for (var r in i) {
        "__proto__" !== r && "constructor" !== r && "prototype" !== r && (t[r] = L(i[r]) ? e(t[r] || (t[r] = {}), i[r]) : i[r]);
      }
      return t;
    }, Se = function(e, t) {
      var i, r = {};
      for (i in e) {
        i in t || (r[i] = e[i]);
      }
      return r;
    }, Ee = function(e) {
      var t, i = e.parent || a, r = e.keyframes ? (t = R(e.keyframes), function(e, i) {
        for (var r in i) {
          r in e || "duration" === r && t || "ease" === r || (e[r] = i[r]);
        }
      }) : we;
      if (I(e.inherit)) {
        for (;i; ) {
          r(e, i.vars.defaults), i = i.parent || i._dp;
        }
      }
      return e;
    }, Ce = function(e, t, i, r, n) {
      void 0 === i && (i = "_first"), void 0 === r && (r = "_last");
      var s, a = e[r];
      if (n) {
        for (s = t[n]; a && a[n] > s; ) {
          a = a._prev;
        }
      }
      return a ? (t._next = a._next, a._next = t) : (t._next = e[i], e[i] = t), t._next ? t._next._prev = t : e[r] = t, 
      t._prev = a, t.parent = t._dp = e, t;
    }, Me = function(e, t, i, r) {
      void 0 === i && (i = "_first"), void 0 === r && (r = "_last");
      var n = t._prev, s = t._next;
      n ? n._next = s : e[i] === t && (e[i] = s), s ? s._prev = n : e[r] === t && (e[r] = n), 
      t._next = t._prev = t.parent = null;
    }, ke = function(e, t) {
      e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), 
      e._act = 0;
    }, Ae = function(e, t) {
      if (e && (!t || t._end > e._dur || t._start < 0)) {
        for (var i = e; i; ) {
          i._dirty = 1, i = i.parent;
        }
      }
      return e;
    }, Pe = function(e, t, i, r) {
      return e._startAt && (n ? e._startAt.revert(J) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, r));
    }, Oe = function e(t) {
      return !t || t._ts && e(t.parent);
    }, Le = function(e) {
      return e._repeat ? Ie(e._tTime, e = e.duration() + e._rDelay) * e : 0;
    }, Ie = function(e, t) {
      var i = Math.floor(e /= t);
      return e && i === e ? i - 1 : i;
    }, ze = function(e, t) {
      return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
    }, De = function(e) {
      return e._end = fe(e._start + (e._tDur / Math.abs(e._ts || e._rts || w) || 0));
    }, Fe = function(e, t) {
      var i = e._dp;
      return i && i.smoothChildTiming && e._ts && (e._start = fe(i._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), 
      De(e), i._dirty || Ae(i, e)), e;
    }, Re = function(e, t) {
      var i;
      if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (i = ze(e.rawTime(), t), 
      (!t._dur || Ue(0, t.totalDuration(), i) - t._tTime > w) && t.render(i, !0)), Ae(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
        if (e._dur < e.duration()) {
          for (i = e; i._dp; ) {
            i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
          }
        }
        e._zTime = -1e-8;
      }
    }, Be = function(e, t, i, r) {
      return t.parent && ke(t), t._start = fe((P(i) ? i : i || e !== a ? Ye(e, i, t) : e._time) + t._delay), 
      t._end = fe(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), Ce(e, t, "_first", "_last", e._sort ? "_start" : 0), 
      qe(t) || (e._recent = t), r || Re(e, t), e._ts < 0 && Fe(e, e._tTime), e;
    }, Ge = function(e, t) {
      return (H.ScrollTrigger || W("scrollTrigger", t)) && H.ScrollTrigger.create(t, e);
    }, Ne = function(e, t, i, r, s) {
      return Ht(e, t, s), e._initted ? !i && e._pt && !n && (e._dur && !1 !== e.vars.lazy || !e._dur && e.vars.lazy) && c !== St.frame ? (ie.push(e), 
      e._lazy = [ s, r ], 1) : void 0 : 1;
    }, $e = function e(t) {
      var i = t.parent;
      return i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || e(i));
    }, qe = function(e) {
      var t = e.data;
      return "isFromStart" === t || "isStart" === t;
    }, Ve = function(e, t, i, r) {
      var n = e._repeat, s = fe(t) || 0, a = e._tTime / e._tDur;
      return a && !r && (e._time *= s / e._dur), e._dur = s, e._tDur = n ? n < 0 ? 1e10 : fe(s * (n + 1) + e._rDelay * n) : s, 
      a > 0 && !r && Fe(e, e._tTime = e._tDur * a), e.parent && De(e), i || Ae(e.parent, e), 
      e;
    }, je = function(e) {
      return e instanceof Gt ? Ae(e) : Ve(e, e._dur);
    }, He = {
      _start: 0,
      endTime: K,
      totalDuration: K
    }, Ye = function e(t, i, r) {
      var n, s, a, o = t.labels, l = t._recent || He, d = t.duration() >= b ? l.endTime(!1) : t._dur;
      return k(i) && (isNaN(i) || i in o) ? (s = i.charAt(0), a = "%" === i.substr(-1), 
      n = i.indexOf("="), "<" === s || ">" === s ? (n >= 0 && (i = i.replace(/=/, "")), 
      ("<" === s ? l._start : l.endTime(l._repeat >= 0)) + (parseFloat(i.substr(1)) || 0) * (a ? (n < 0 ? l : r).totalDuration() / 100 : 1)) : n < 0 ? (i in o || (o[i] = d), 
      o[i]) : (s = parseFloat(i.charAt(n - 1) + i.substr(n + 1)), a && r && (s = s / 100 * (R(r) ? r[0] : r).totalDuration()), 
      n > 1 ? e(t, i.substr(0, n - 1), r) + s : d + s)) : null == i ? d : +i;
    }, Xe = function(e, t, i) {
      var r, n, s = P(t[1]), a = (s ? 2 : 1) + (e < 2 ? 0 : 1), o = t[a];
      if (s && (o.duration = t[1]), o.parent = i, e) {
        for (r = o, n = i; n && !("immediateRender" in r); ) {
          r = n.vars.defaults || {}, n = I(n.vars.inherit) && n.parent;
        }
        o.immediateRender = I(r.immediateRender), e < 2 ? o.runBackwards = 1 : o.startAt = t[a - 1];
      }
      return new Qt(t[0], o, t[a + 1]);
    }, We = function(e, t) {
      return e || 0 === e ? t(e) : t;
    }, Ue = function(e, t, i) {
      return i < e ? e : i > t ? t : i;
    }, Qe = function(e, t) {
      return k(e) && (t = j.exec(e)) ? t[1] : "";
    }, Ke = [].slice, Ze = function(e, t) {
      return e && L(e) && "length" in e && (!t && !e.length || e.length - 1 in e && L(e[0])) && !e.nodeType && e !== o;
    }, Je = function(e, t, i) {
      return void 0 === i && (i = []), e.forEach((function(e) {
        var r;
        return k(e) && !t || Ze(e, 1) ? (r = i).push.apply(r, et(e)) : i.push(e);
      })) || i;
    }, et = function(e, t, i) {
      return s && !t && s.selector ? s.selector(e) : !k(e) || i || !l && Et() ? R(e) ? Je(e, i) : Ze(e) ? Ke.call(e, 0) : e ? [ e ] : [] : Ke.call((t || d).querySelectorAll(e), 0);
    }, tt = function(e) {
      return e = et(e)[0] || U("Invalid scope") || {}, function(t) {
        var i = e.current || e.nativeElement || e;
        return et(t, i.querySelectorAll ? i : i === e ? U("Invalid scope") || d.createElement("div") : e);
      };
    }, it = function(e) {
      return e.sort((function() {
        return .5 - Math.random();
      }));
    }, rt = function(e) {
      if (A(e)) {
        return e;
      }
      var t = L(e) ? e : {
        each: e
      }, i = Lt(t.ease), r = t.from || 0, n = parseFloat(t.base) || 0, s = {}, a = r > 0 && r < 1, o = isNaN(r) || a, l = t.axis, d = r, u = r;
      return k(r) ? d = u = {
        center: .5,
        edges: .5,
        end: 1
      }[r] || 0 : !a && o && (d = r[0], u = r[1]), function(e, a, c) {
        var p, h, f, m, g, v, _, y, w, T = (c || t).length, x = s[T];
        if (!x) {
          if (!(w = "auto" === t.grid ? 0 : (t.grid || [ 1, b ])[1])) {
            for (_ = -b; _ < (_ = c[w++].getBoundingClientRect().left) && w < T; ) {}
            w < T && w--;
          }
          for (x = s[T] = [], p = o ? Math.min(w, T) * d - .5 : r % w, h = w === b ? 0 : o ? T * u / w - .5 : r / w | 0, 
          _ = 0, y = b, v = 0; v < T; v++) {
            f = v % w - p, m = h - (v / w | 0), x[v] = g = l ? Math.abs("y" === l ? m : f) : E(f * f + m * m), 
            g > _ && (_ = g), g < y && (y = g);
          }
          "random" === r && it(x), x.max = _ - y, x.min = y, x.v = T = (parseFloat(t.amount) || parseFloat(t.each) * (w > T ? T - 1 : l ? "y" === l ? T / w : w : Math.max(w, T / w)) || 0) * ("edges" === r ? -1 : 1), 
          x.b = T < 0 ? n - T : n, x.u = Qe(t.amount || t.each) || 0, i = i && T < 0 ? Pt(i) : i;
        }
        return T = (x[e] - x.min) / x.max || 0, fe(x.b + (i ? i(T) : T) * x.v) + x.u;
      };
    }, nt = function(e) {
      var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
      return function(i) {
        var r = fe(Math.round(parseFloat(i) / e) * e * t);
        return (r - r % 1) / t + (P(i) ? 0 : Qe(i));
      };
    }, st = function(e, t) {
      var i, r, n = R(e);
      return !n && L(e) && (i = n = e.radius || b, e.values ? (e = et(e.values), (r = !P(e[0])) && (i *= i)) : e = nt(e.increment)), 
      We(t, n ? A(e) ? function(t) {
        return r = e(t), Math.abs(r - t) <= i ? r : t;
      } : function(t) {
        for (var n, s, a = parseFloat(r ? t.x : t), o = parseFloat(r ? t.y : 0), l = b, d = 0, u = e.length; u--; ) {
          (n = r ? (n = e[u].x - a) * n + (s = e[u].y - o) * s : Math.abs(e[u] - a)) < l && (l = n, 
          d = u);
        }
        return d = !i || l <= i ? e[d] : t, r || d === t || P(t) ? d : d + Qe(t);
      } : nt(e));
    }, at = function(e, t, i, r) {
      return We(R(e) ? !t : !0 === i ? !!(i = 0) : !r, (function() {
        return R(e) ? e[~~(Math.random() * e.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((e - i / 2 + Math.random() * (t - e + .99 * i)) / i) * i * r) / r;
      }));
    }, ot = function(e, t, i) {
      return We(i, (function(i) {
        return e[~~t(i)];
      }));
    }, lt = function(e) {
      for (var t, i, r, n, s = 0, a = ""; ~(t = e.indexOf("random(", s)); ) {
        r = e.indexOf(")", t), n = "[" === e.charAt(t + 7), i = e.substr(t + 7, r - t - 7).match(n ? V : B), 
        a += e.substr(s, t - s) + at(n ? i : +i[0], n ? 0 : +i[1], +i[2] || 1e-5), s = r + 1;
      }
      return a + e.substr(s, e.length - s);
    }, dt = function(e, t, i, r, n) {
      var s = t - e, a = r - i;
      return We(n, (function(t) {
        return i + ((t - e) / s * a || 0);
      }));
    }, ut = function(e, t, i) {
      var r, n, s, a = e.labels, o = b;
      for (r in a) {
        (n = a[r] - t) < 0 == !!i && n && o > (n = Math.abs(n)) && (s = r, o = n);
      }
      return s;
    }, ct = function(e, t, i) {
      var r, n, a, o = e.vars, l = o[t], d = s, u = e._ctx;
      if (l) {
        return r = o[t + "Params"], n = o.callbackScope || e, i && ie.length && ve(), u && (s = u), 
        a = r ? l.apply(n, r) : l.call(n), s = d, a;
      }
    }, pt = function(e) {
      return ke(e), e.scrollTrigger && e.scrollTrigger.kill(!!n), e.progress() < 1 && ct(e, "onInterrupt"), 
      e;
    }, ht = [], ft = function(e) {
      if (e) {
        if (e = !e.name && e.default || e, z() || e.headless) {
          var t = e.name, i = A(e), r = t && !i && e.init ? function() {
            this._props = [];
          } : e, n = {
            init: K,
            render: si,
            add: Vt,
            kill: oi,
            modifier: ai,
            rawVars: 0
          }, s = {
            targetTest: 0,
            get: 0,
            getSetter: ti,
            aliases: {},
            register: 0
          };
          if (Et(), e !== r) {
            if (ne[t]) {
              return;
            }
            we(r, we(Se(e, n), s)), Te(r.prototype, Te(n, Se(e, s))), ne[r.prop = t] = r, e.targetTest && (oe.push(r), 
            te[t] = 1), t = ("css" === t ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
          }
          Q(t, r), e.register && e.register(xi, r, ui);
        } else {
          ht.push(e);
        }
      }
    }, mt = 255, gt = {
      aqua: [ 0, mt, mt ],
      lime: [ 0, mt, 0 ],
      silver: [ 192, 192, 192 ],
      black: [ 0, 0, 0 ],
      maroon: [ 128, 0, 0 ],
      teal: [ 0, 128, 128 ],
      blue: [ 0, 0, mt ],
      navy: [ 0, 0, 128 ],
      white: [ mt, mt, mt ],
      olive: [ 128, 128, 0 ],
      yellow: [ mt, mt, 0 ],
      orange: [ mt, 165, 0 ],
      gray: [ 128, 128, 128 ],
      purple: [ 128, 0, 128 ],
      green: [ 0, 128, 0 ],
      red: [ mt, 0, 0 ],
      pink: [ mt, 192, 203 ],
      cyan: [ 0, mt, mt ],
      transparent: [ mt, mt, mt, 0 ]
    }, vt = function(e, t, i) {
      return (6 * (e += e < 0 ? 1 : e > 1 ? -1 : 0) < 1 ? t + (i - t) * e * 6 : e < .5 ? i : 3 * e < 2 ? t + (i - t) * (2 / 3 - e) * 6 : t) * mt + .5 | 0;
    }, _t = function(e, t, i) {
      var r, n, s, a, o, l, d, u, c, p, h = e ? P(e) ? [ e >> 16, e >> 8 & mt, e & mt ] : 0 : gt.black;
      if (!h) {
        if ("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), gt[e]) {
          h = gt[e];
        } else if ("#" === e.charAt(0)) {
          if (e.length < 6 && (r = e.charAt(1), n = e.charAt(2), s = e.charAt(3), e = "#" + r + r + n + n + s + s + (5 === e.length ? e.charAt(4) + e.charAt(4) : "")), 
          9 === e.length) {
            return [ (h = parseInt(e.substr(1, 6), 16)) >> 16, h >> 8 & mt, h & mt, parseInt(e.substr(7), 16) / 255 ];
          }
          h = [ (e = parseInt(e.substr(1), 16)) >> 16, e >> 8 & mt, e & mt ];
        } else if ("hsl" === e.substr(0, 3)) {
          if (h = p = e.match(B), t) {
            if (~e.indexOf("=")) {
              return h = e.match(G), i && h.length < 4 && (h[3] = 1), h;
            }
          } else {
            a = +h[0] % 360 / 360, o = +h[1] / 100, r = 2 * (l = +h[2] / 100) - (n = l <= .5 ? l * (o + 1) : l + o - l * o), 
            h.length > 3 && (h[3] *= 1), h[0] = vt(a + 1 / 3, r, n), h[1] = vt(a, r, n), h[2] = vt(a - 1 / 3, r, n);
          }
        } else {
          h = e.match(B) || gt.transparent;
        }
        h = h.map(Number);
      }
      return t && !p && (r = h[0] / mt, n = h[1] / mt, s = h[2] / mt, l = ((d = Math.max(r, n, s)) + (u = Math.min(r, n, s))) / 2, 
      d === u ? a = o = 0 : (c = d - u, o = l > .5 ? c / (2 - d - u) : c / (d + u), a = d === r ? (n - s) / c + (n < s ? 6 : 0) : d === n ? (s - r) / c + 2 : (r - n) / c + 4, 
      a *= 60), h[0] = ~~(a + .5), h[1] = ~~(100 * o + .5), h[2] = ~~(100 * l + .5)), 
      i && h.length < 4 && (h[3] = 1), h;
    }, yt = function(e) {
      var t = [], i = [], r = -1;
      return e.split(wt).forEach((function(e) {
        var n = e.match(N) || [];
        t.push.apply(t, n), i.push(r += n.length + 1);
      })), t.c = i, t;
    }, bt = function(e, t, i) {
      var r, n, s, a, o = "", l = (e + o).match(wt), d = t ? "hsla(" : "rgba(", u = 0;
      if (!l) {
        return e;
      }
      if (l = l.map((function(e) {
        return (e = _t(e, t, 1)) && d + (t ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3] : e.join(",")) + ")";
      })), i && (s = yt(e), (r = i.c).join(o) !== s.c.join(o))) {
        for (a = (n = e.replace(wt, "1").split(N)).length - 1; u < a; u++) {
          o += n[u] + (~r.indexOf(u) ? l.shift() || d + "0,0,0,0)" : (s.length ? s : l.length ? l : i).shift());
        }
      }
      if (!n) {
        for (a = (n = e.split(wt)).length - 1; u < a; u++) {
          o += n[u] + l[u];
        }
      }
      return o + n[a];
    }, wt = function() {
      var e, t = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
      for (e in gt) {
        t += "|" + e + "\\b";
      }
      return new RegExp(t + ")", "gi");
    }(), Tt = /hsl[a]?\(/, xt = function(e) {
      var t, i = e.join(" ");
      if (wt.lastIndex = 0, wt.test(i)) {
        return t = Tt.test(i), e[1] = bt(e[1], t), e[0] = bt(e[0], t, yt(e[1])), !0;
      }
    }, St = function() {
      var e, t, i, r, n, s, a = Date.now, c = 500, p = 33, f = a(), m = f, g = 1e3 / 240, v = g, _ = [], y = function i(o) {
        var l, d, u, h, y = a() - m, b = !0 === o;
        if ((y > c || y < 0) && (f += y - p), ((l = (u = (m += y) - f) - v) > 0 || b) && (h = ++r.frame, 
        n = u - 1e3 * r.time, r.time = u /= 1e3, v += l + (l >= g ? 4 : g - l), d = 1), 
        b || (e = t(i)), d) {
          for (s = 0; s < _.length; s++) {
            _[s](u, n, h, o);
          }
        }
      };
      return r = {
        time: 0,
        frame: 0,
        tick: function() {
          y(!0);
        },
        deltaRatio: function(e) {
          return n / (1e3 / (e || 60));
        },
        wake: function() {
          u && (!l && z() && (o = l = window, d = o.document || {}, H.gsap = xi, (o.gsapVersions || (o.gsapVersions = [])).push(xi.version), 
          X(Y || o.GreenSockGlobals || !o.gsap && o || {}), ht.forEach(ft)), i = "undefined" != typeof requestAnimationFrame && requestAnimationFrame, 
          e && r.sleep(), t = i || function(e) {
            return setTimeout(e, v - 1e3 * r.time + 1 | 0);
          }, h = 1, y(2));
        },
        sleep: function() {
          (i ? cancelAnimationFrame : clearTimeout)(e), h = 0, t = K;
        },
        lagSmoothing: function(e, t) {
          c = e || 1 / 0, p = Math.min(t || 33, c);
        },
        fps: function(e) {
          g = 1e3 / (e || 240), v = 1e3 * r.time + g;
        },
        add: function(e, t, i) {
          var n = t ? function(t, i, s, a) {
            e(t, i, s, a), r.remove(n);
          } : e;
          return r.remove(e), _[i ? "unshift" : "push"](n), Et(), n;
        },
        remove: function(e, t) {
          ~(t = _.indexOf(e)) && _.splice(t, 1) && s >= t && s--;
        },
        _listeners: _
      };
    }(), Et = function() {
      return !h && St.wake();
    }, Ct = {}, Mt = /^[\d.\-M][\d.\-,\s]/, kt = /["']/g, At = function(e) {
      for (var t, i, r, n = {}, s = e.substr(1, e.length - 3).split(":"), a = s[0], o = 1, l = s.length; o < l; o++) {
        i = s[o], t = o !== l - 1 ? i.lastIndexOf(",") : i.length, r = i.substr(0, t), n[a] = isNaN(r) ? r.replace(kt, "").trim() : +r, 
        a = i.substr(t + 1).trim();
      }
      return n;
    }, Pt = function(e) {
      return function(t) {
        return 1 - e(1 - t);
      };
    }, Ot = function e(t, i) {
      for (var r, n = t._first; n; ) {
        n instanceof Gt ? e(n, i) : !n.vars.yoyoEase || n._yoyo && n._repeat || n._yoyo === i || (n.timeline ? e(n.timeline, i) : (r = n._ease, 
        n._ease = n._yEase, n._yEase = r, n._yoyo = i)), n = n._next;
      }
    }, Lt = function(e, t) {
      return e && (A(e) ? e : Ct[e] || function(e) {
        var t, i, r, n, s = (e + "").split("("), a = Ct[s[0]];
        return a && s.length > 1 && a.config ? a.config.apply(null, ~e.indexOf("{") ? [ At(s[1]) ] : (t = e, 
        i = t.indexOf("(") + 1, r = t.indexOf(")"), n = t.indexOf("(", i), t.substring(i, ~n && n < r ? t.indexOf(")", r + 1) : r)).split(",").map(ye)) : Ct._CE && Mt.test(e) ? Ct._CE("", e) : a;
      }(e)) || t;
    }, It = function(e, t, i, r) {
      void 0 === i && (i = function(e) {
        return 1 - t(1 - e);
      }), void 0 === r && (r = function(e) {
        return e < .5 ? t(2 * e) / 2 : 1 - t(2 * (1 - e)) / 2;
      });
      var n, s = {
        easeIn: t,
        easeOut: i,
        easeInOut: r
      };
      return pe(e, (function(e) {
        for (var t in Ct[e] = H[e] = s, Ct[n = e.toLowerCase()] = i, s) {
          Ct[n + ("easeIn" === t ? ".in" : "easeOut" === t ? ".out" : ".inOut")] = Ct[e + "." + t] = s[t];
        }
      })), s;
    }, zt = function(e) {
      return function(t) {
        return t < .5 ? (1 - e(1 - 2 * t)) / 2 : .5 + e(2 * (t - .5)) / 2;
      };
    }, Dt = function e(t, i, r) {
      var n = i >= 1 ? i : 1, s = (r || (t ? .3 : .45)) / (i < 1 ? i : 1), a = s / T * (Math.asin(1 / n) || 0), o = function(e) {
        return 1 === e ? 1 : n * Math.pow(2, -10 * e) * M((e - a) * s) + 1;
      }, l = "out" === t ? o : "in" === t ? function(e) {
        return 1 - o(1 - e);
      } : zt(o);
      return s = T / s, l.config = function(i, r) {
        return e(t, i, r);
      }, l;
    }, Ft = function e(t, i) {
      void 0 === i && (i = 1.70158);
      var r = function(e) {
        return e ? --e * e * ((i + 1) * e + i) + 1 : 0;
      }, n = "out" === t ? r : "in" === t ? function(e) {
        return 1 - r(1 - e);
      } : zt(r);
      return n.config = function(i) {
        return e(t, i);
      }, n;
    };
    pe("Linear,Quad,Cubic,Quart,Quint,Strong", (function(e, t) {
      var i = t < 5 ? t + 1 : t;
      It(e + ",Power" + (i - 1), t ? function(e) {
        return Math.pow(e, i);
      } : function(e) {
        return e;
      }, (function(e) {
        return 1 - Math.pow(1 - e, i);
      }), (function(e) {
        return e < .5 ? Math.pow(2 * e, i) / 2 : 1 - Math.pow(2 * (1 - e), i) / 2;
      }));
    })), Ct.Linear.easeNone = Ct.none = Ct.Linear.easeIn, It("Elastic", Dt("in"), Dt("out"), Dt()), 
    f = 7.5625, g = 1 / (m = 2.75), It("Bounce", (function(e) {
      return 1 - v(1 - e);
    }), v = function(e) {
      return e < g ? f * e * e : e < .7272727272727273 ? f * Math.pow(e - 1.5 / m, 2) + .75 : e < .9090909090909092 ? f * (e -= 2.25 / m) * e + .9375 : f * Math.pow(e - 2.625 / m, 2) + .984375;
    }), It("Expo", (function(e) {
      return e ? Math.pow(2, 10 * (e - 1)) : 0;
    })), It("Circ", (function(e) {
      return -(E(1 - e * e) - 1);
    })), It("Sine", (function(e) {
      return 1 === e ? 1 : 1 - C(e * x);
    })), It("Back", Ft("in"), Ft("out"), Ft()), Ct.SteppedEase = Ct.steps = H.SteppedEase = {
      config: function(e, t) {
        void 0 === e && (e = 1);
        var i = 1 / e, r = e + (t ? 0 : 1), n = t ? 1 : 0;
        return function(e) {
          return ((r * Ue(0, .99999999, e) | 0) + n) * i;
        };
      }
    }, y.ease = Ct["quad.out"], pe("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function(e) {
      return le += e + "," + e + "Params,";
    }));
    var Rt = function(e, t) {
      this.id = S++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : ce, 
      this.set = t ? t.getSetter : ti;
    }, Bt = function() {
      function e(e) {
        this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, 
        this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, Ve(this, +e.duration, 1, 1), 
        this.data = e.data, s && (this._ctx = s, s.data.push(this)), h || St.wake();
      }
      var t = e.prototype;
      return t.delay = function(e) {
        return e || 0 === e ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), 
        this._delay = e, this) : this._delay;
      }, t.duration = function(e) {
        return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur;
      }, t.totalDuration = function(e) {
        return arguments.length ? (this._dirty = 0, Ve(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
      }, t.totalTime = function(e, t) {
        if (Et(), !arguments.length) {
          return this._tTime;
        }
        var i = this._dp;
        if (i && i.smoothChildTiming && this._ts) {
          for (Fe(this, e), !i._dp || i.parent || Re(i, this); i && i.parent; ) {
            i.parent._time !== i._start + (i._ts >= 0 ? i._tTime / i._ts : (i.totalDuration() - i._tTime) / -i._ts) && i.totalTime(i._tTime, !0), 
            i = i.parent;
          }
          !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && Be(this._dp, this, this._start - this._delay);
        }
        return (this._tTime !== e || !this._dur && !t || this._initted && Math.abs(this._zTime) === w || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e), 
        _e(this, e, t)), this;
      }, t.time = function(e, t) {
        return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + Le(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), t) : this._time;
      }, t.totalProgress = function(e, t) {
        return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0;
      }, t.progress = function(e, t) {
        return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? e : 1 - e) + Le(this), t) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
      }, t.iteration = function(e, t) {
        var i = this.duration() + this._rDelay;
        return arguments.length ? this.totalTime(this._time + (e - 1) * i, t) : this._repeat ? Ie(this._tTime, i) + 1 : 1;
      }, t.timeScale = function(e, t) {
        if (!arguments.length) {
          return -1e-8 === this._rts ? 0 : this._rts;
        }
        if (this._rts === e) {
          return this;
        }
        var i = this.parent && this._ts ? ze(this.parent._time, this) : this._tTime;
        return this._rts = +e || 0, this._ts = this._ps || -1e-8 === e ? 0 : this._rts, 
        this.totalTime(Ue(-Math.abs(this._delay), this._tDur, i), !1 !== t), De(this), function(e) {
          for (var t = e.parent; t && t.parent; ) {
            t._dirty = 1, t.totalDuration(), t = t.parent;
          }
          return e;
        }(this);
      }, t.paused = function(e) {
        return arguments.length ? (this._ps !== e && (this._ps = e, e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), 
        this._ts = this._act = 0) : (Et(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== w && (this._tTime -= w)))), 
        this) : this._ps;
      }, t.startTime = function(e) {
        if (arguments.length) {
          this._start = e;
          var t = this.parent || this._dp;
          return t && (t._sort || !this.parent) && Be(t, this, e - this._delay), this;
        }
        return this._start;
      }, t.endTime = function(e) {
        return this._start + (I(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
      }, t.rawTime = function(e) {
        var t = this.parent || this._dp;
        return t ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? ze(t.rawTime(e), this) : this._tTime : this._tTime;
      }, t.revert = function(e) {
        void 0 === e && (e = ee);
        var t = n;
        return n = e, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(e), 
        this.totalTime(-.01, e.suppressEvents)), "nested" !== this.data && !1 !== e.kill && this.kill(), 
        n = t, this;
      }, t.globalTime = function(e) {
        for (var t = this, i = arguments.length ? e : t.rawTime(); t; ) {
          i = t._start + i / (Math.abs(t._ts) || 1), t = t._dp;
        }
        return !this.parent && this._sat ? this._sat.globalTime(e) : i;
      }, t.repeat = function(e) {
        return arguments.length ? (this._repeat = e === 1 / 0 ? -2 : e, je(this)) : -2 === this._repeat ? 1 / 0 : this._repeat;
      }, t.repeatDelay = function(e) {
        if (arguments.length) {
          var t = this._time;
          return this._rDelay = e, je(this), t ? this.time(t) : this;
        }
        return this._rDelay;
      }, t.yoyo = function(e) {
        return arguments.length ? (this._yoyo = e, this) : this._yoyo;
      }, t.seek = function(e, t) {
        return this.totalTime(Ye(this, e), I(t));
      }, t.restart = function(e, t) {
        return this.play().totalTime(e ? -this._delay : 0, I(t));
      }, t.play = function(e, t) {
        return null != e && this.seek(e, t), this.reversed(!1).paused(!1);
      }, t.reverse = function(e, t) {
        return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1);
      }, t.pause = function(e, t) {
        return null != e && this.seek(e, t), this.paused(!0);
      }, t.resume = function() {
        return this.paused(!1);
      }, t.reversed = function(e) {
        return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -1e-8 : 0)), 
        this) : this._rts < 0;
      }, t.invalidate = function() {
        return this._initted = this._act = 0, this._zTime = -1e-8, this;
      }, t.isActive = function() {
        var e, t = this.parent || this._dp, i = this._start;
        return !(t && !(this._ts && this._initted && t.isActive() && (e = t.rawTime(!0)) >= i && e < this.endTime(!0) - w));
      }, t.eventCallback = function(e, t, i) {
        var r = this.vars;
        return arguments.length > 1 ? (t ? (r[e] = t, i && (r[e + "Params"] = i), "onUpdate" === e && (this._onUpdate = t)) : delete r[e], 
        this) : r[e];
      }, t.then = function(e) {
        var t = this;
        return new Promise((function(i) {
          var r = A(e) ? e : be, n = function() {
            var e = t.then;
            t.then = null, A(r) && (r = r(t)) && (r.then || r === t) && (t.then = e), i(r), 
            t.then = e;
          };
          t._initted && 1 === t.totalProgress() && t._ts >= 0 || !t._tTime && t._ts < 0 ? n() : t._prom = n;
        }));
      }, t.kill = function() {
        pt(this);
      }, e;
    }();
    we(Bt.prototype, {
      _time: 0,
      _start: 0,
      _end: 0,
      _tTime: 0,
      _tDur: 0,
      _dirty: 0,
      _repeat: 0,
      _yoyo: !1,
      parent: null,
      _initted: !1,
      _rDelay: 0,
      _ts: 1,
      _dp: 0,
      ratio: 0,
      _zTime: -1e-8,
      _prom: 0,
      _ps: !1,
      _rts: 1
    });
    var Gt = function(i) {
      function r(t, r) {
        var n;
        return void 0 === t && (t = {}), (n = i.call(this, t) || this).labels = {}, n.smoothChildTiming = !!t.smoothChildTiming, 
        n.autoRemoveChildren = !!t.autoRemoveChildren, n._sort = I(t.sortChildren), a && Be(t.parent || a, e(n), r), 
        t.reversed && n.reverse(), t.paused && n.paused(!0), t.scrollTrigger && Ge(e(n), t.scrollTrigger), 
        n;
      }
      t(r, i);
      var s = r.prototype;
      return s.to = function(e, t, i) {
        return Xe(0, arguments, this), this;
      }, s.from = function(e, t, i) {
        return Xe(1, arguments, this), this;
      }, s.fromTo = function(e, t, i, r) {
        return Xe(2, arguments, this), this;
      }, s.set = function(e, t, i) {
        return t.duration = 0, t.parent = this, Ee(t).repeatDelay || (t.repeat = 0), t.immediateRender = !!t.immediateRender, 
        new Qt(e, t, Ye(this, i), 1), this;
      }, s.call = function(e, t, i) {
        return Be(this, Qt.delayedCall(0, e, t), i);
      }, s.staggerTo = function(e, t, i, r, n, s, a) {
        return i.duration = t, i.stagger = i.stagger || r, i.onComplete = s, i.onCompleteParams = a, 
        i.parent = this, new Qt(e, i, Ye(this, n)), this;
      }, s.staggerFrom = function(e, t, i, r, n, s, a) {
        return i.runBackwards = 1, Ee(i).immediateRender = I(i.immediateRender), this.staggerTo(e, t, i, r, n, s, a);
      }, s.staggerFromTo = function(e, t, i, r, n, s, a, o) {
        return r.startAt = i, Ee(r).immediateRender = I(r.immediateRender), this.staggerTo(e, t, r, n, s, a, o);
      }, s.render = function(e, t, i) {
        var r, s, o, l, d, u, c, p, h, f, m, g, v = this._time, _ = this._dirty ? this.totalDuration() : this._tDur, y = this._dur, b = e <= 0 ? 0 : fe(e), T = this._zTime < 0 != e < 0 && (this._initted || !y);
        if (this !== a && b > _ && e >= 0 && (b = _), b !== this._tTime || i || T) {
          if (v !== this._time && y && (b += this._time - v, e += this._time - v), r = b, 
          h = this._start, u = !(p = this._ts), T && (y || (v = this._zTime), (e || !t) && (this._zTime = e)), 
          this._repeat) {
            if (m = this._yoyo, d = y + this._rDelay, this._repeat < -1 && e < 0) {
              return this.totalTime(100 * d + e, t, i);
            }
            if (r = fe(b % d), b === _ ? (l = this._repeat, r = y) : ((l = ~~(b / d)) && l === b / d && (r = y, 
            l--), r > y && (r = y)), f = Ie(this._tTime, d), !v && this._tTime && f !== l && this._tTime - f * d - this._dur <= 0 && (f = l), 
            m && 1 & l && (r = y - r, g = 1), l !== f && !this._lock) {
              var x = m && 1 & f, S = x === (m && 1 & l);
              if (l < f && (x = !x), v = x ? 0 : b % y ? y : b, this._lock = 1, this.render(v || (g ? 0 : fe(l * d)), t, !y)._lock = 0, 
              this._tTime = b, !t && this.parent && ct(this, "onRepeat"), this.vars.repeatRefresh && !g && (this.invalidate()._lock = 1), 
              v && v !== this._time || u !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
                return this;
              }
              if (y = this._dur, _ = this._tDur, S && (this._lock = 2, v = x ? y : -1e-4, this.render(v, !0), 
              this.vars.repeatRefresh && !g && this.invalidate()), this._lock = 0, !this._ts && !u) {
                return this;
              }
              Ot(this, g);
            }
          }
          if (this._hasPause && !this._forcing && this._lock < 2 && (c = function(e, t, i) {
            var r;
            if (i > t) {
              for (r = e._first; r && r._start <= i; ) {
                if ("isPause" === r.data && r._start > t) {
                  return r;
                }
                r = r._next;
              }
            } else {
              for (r = e._last; r && r._start >= i; ) {
                if ("isPause" === r.data && r._start < t) {
                  return r;
                }
                r = r._prev;
              }
            }
          }(this, fe(v), fe(r)), c && (b -= r - (r = c._start))), this._tTime = b, this._time = r, 
          this._act = !p, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, 
          this._zTime = e, v = 0), !v && r && !t && !l && (ct(this, "onStart"), this._tTime !== b)) {
            return this;
          }
          if (r >= v && e >= 0) {
            for (s = this._first; s; ) {
              if (o = s._next, (s._act || r >= s._start) && s._ts && c !== s) {
                if (s.parent !== this) {
                  return this.render(e, t, i);
                }
                if (s.render(s._ts > 0 ? (r - s._start) * s._ts : (s._dirty ? s.totalDuration() : s._tDur) + (r - s._start) * s._ts, t, i), 
                r !== this._time || !this._ts && !u) {
                  c = 0, o && (b += this._zTime = -1e-8);
                  break;
                }
              }
              s = o;
            }
          } else {
            s = this._last;
            for (var E = e < 0 ? e : r; s; ) {
              if (o = s._prev, (s._act || E <= s._end) && s._ts && c !== s) {
                if (s.parent !== this) {
                  return this.render(e, t, i);
                }
                if (s.render(s._ts > 0 ? (E - s._start) * s._ts : (s._dirty ? s.totalDuration() : s._tDur) + (E - s._start) * s._ts, t, i || n && (s._initted || s._startAt)), 
                r !== this._time || !this._ts && !u) {
                  c = 0, o && (b += this._zTime = E ? -1e-8 : w);
                  break;
                }
              }
              s = o;
            }
          }
          if (c && !t && (this.pause(), c.render(r >= v ? 0 : -1e-8)._zTime = r >= v ? 1 : -1, 
          this._ts)) {
            return this._start = h, De(this), this.render(e, t, i);
          }
          this._onUpdate && !t && ct(this, "onUpdate", !0), (b === _ && this._tTime >= this.totalDuration() || !b && v) && (h !== this._start && Math.abs(p) === Math.abs(this._ts) || this._lock || ((e || !y) && (b === _ && this._ts > 0 || !b && this._ts < 0) && ke(this, 1), 
          t || e < 0 && !v || !b && !v && _ || (ct(this, b === _ && e >= 0 ? "onComplete" : "onReverseComplete", !0), 
          this._prom && !(b < _ && this.timeScale() > 0) && this._prom())));
        }
        return this;
      }, s.add = function(e, t) {
        var i = this;
        if (P(t) || (t = Ye(this, t, e)), !(e instanceof Bt)) {
          if (R(e)) {
            return e.forEach((function(e) {
              return i.add(e, t);
            })), this;
          }
          if (k(e)) {
            return this.addLabel(e, t);
          }
          if (!A(e)) {
            return this;
          }
          e = Qt.delayedCall(0, e);
        }
        return this !== e ? Be(this, e, t) : this;
      }, s.getChildren = function(e, t, i, r) {
        void 0 === e && (e = !0), void 0 === t && (t = !0), void 0 === i && (i = !0), void 0 === r && (r = -b);
        for (var n = [], s = this._first; s; ) {
          s._start >= r && (s instanceof Qt ? t && n.push(s) : (i && n.push(s), e && n.push.apply(n, s.getChildren(!0, t, i)))), 
          s = s._next;
        }
        return n;
      }, s.getById = function(e) {
        for (var t = this.getChildren(1, 1, 1), i = t.length; i--; ) {
          if (t[i].vars.id === e) {
            return t[i];
          }
        }
      }, s.remove = function(e) {
        return k(e) ? this.removeLabel(e) : A(e) ? this.killTweensOf(e) : (Me(this, e), 
        e === this._recent && (this._recent = this._last), Ae(this));
      }, s.totalTime = function(e, t) {
        return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = fe(St.time - (this._ts > 0 ? e / this._ts : (this.totalDuration() - e) / -this._ts))), 
        i.prototype.totalTime.call(this, e, t), this._forcing = 0, this) : this._tTime;
      }, s.addLabel = function(e, t) {
        return this.labels[e] = Ye(this, t), this;
      }, s.removeLabel = function(e) {
        return delete this.labels[e], this;
      }, s.addPause = function(e, t, i) {
        var r = Qt.delayedCall(0, t || K, i);
        return r.data = "isPause", this._hasPause = 1, Be(this, r, Ye(this, e));
      }, s.removePause = function(e) {
        var t = this._first;
        for (e = Ye(this, e); t; ) {
          t._start === e && "isPause" === t.data && ke(t), t = t._next;
        }
      }, s.killTweensOf = function(e, t, i) {
        for (var r = this.getTweensOf(e, i), n = r.length; n--; ) {
          Nt !== r[n] && r[n].kill(e, t);
        }
        return this;
      }, s.getTweensOf = function(e, t) {
        for (var i, r = [], n = et(e), s = this._first, a = P(t); s; ) {
          s instanceof Qt ? ge(s._targets, n) && (a ? (!Nt || s._initted && s._ts) && s.globalTime(0) <= t && s.globalTime(s.totalDuration()) > t : !t || s.isActive()) && r.push(s) : (i = s.getTweensOf(n, t)).length && r.push.apply(r, i), 
          s = s._next;
        }
        return r;
      }, s.tweenTo = function(e, t) {
        t = t || {};
        var i, r = this, n = Ye(r, e), s = t, a = s.startAt, o = s.onStart, l = s.onStartParams, d = s.immediateRender, u = Qt.to(r, we({
          ease: t.ease || "none",
          lazy: !1,
          immediateRender: !1,
          time: n,
          overwrite: "auto",
          duration: t.duration || Math.abs((n - (a && "time" in a ? a.time : r._time)) / r.timeScale()) || w,
          onStart: function() {
            if (r.pause(), !i) {
              var e = t.duration || Math.abs((n - (a && "time" in a ? a.time : r._time)) / r.timeScale());
              u._dur !== e && Ve(u, e, 0, 1).render(u._time, !0, !0), i = 1;
            }
            o && o.apply(u, l || []);
          }
        }, t));
        return d ? u.render(0) : u;
      }, s.tweenFromTo = function(e, t, i) {
        return this.tweenTo(t, we({
          startAt: {
            time: Ye(this, e)
          }
        }, i));
      }, s.recent = function() {
        return this._recent;
      }, s.nextLabel = function(e) {
        return void 0 === e && (e = this._time), ut(this, Ye(this, e));
      }, s.previousLabel = function(e) {
        return void 0 === e && (e = this._time), ut(this, Ye(this, e), 1);
      }, s.currentLabel = function(e) {
        return arguments.length ? this.seek(e, !0) : this.previousLabel(this._time + w);
      }, s.shiftChildren = function(e, t, i) {
        void 0 === i && (i = 0);
        for (var r, n = this._first, s = this.labels; n; ) {
          n._start >= i && (n._start += e, n._end += e), n = n._next;
        }
        if (t) {
          for (r in s) {
            s[r] >= i && (s[r] += e);
          }
        }
        return Ae(this);
      }, s.invalidate = function(e) {
        var t = this._first;
        for (this._lock = 0; t; ) {
          t.invalidate(e), t = t._next;
        }
        return i.prototype.invalidate.call(this, e);
      }, s.clear = function(e) {
        void 0 === e && (e = !0);
        for (var t, i = this._first; i; ) {
          t = i._next, this.remove(i), i = t;
        }
        return this._dp && (this._time = this._tTime = this._pTime = 0), e && (this.labels = {}), 
        Ae(this);
      }, s.totalDuration = function(e) {
        var t, i, r, n = 0, s = this, o = s._last, l = b;
        if (arguments.length) {
          return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -e : e));
        }
        if (s._dirty) {
          for (r = s.parent; o; ) {
            t = o._prev, o._dirty && o.totalDuration(), (i = o._start) > l && s._sort && o._ts && !s._lock ? (s._lock = 1, 
            Be(s, o, i - o._delay, 1)._lock = 0) : l = i, i < 0 && o._ts && (n -= i, (!r && !s._dp || r && r.smoothChildTiming) && (s._start += i / s._ts, 
            s._time -= i, s._tTime -= i), s.shiftChildren(-i, !1, -Infinity), l = 0), o._end > n && o._ts && (n = o._end), 
            o = t;
          }
          Ve(s, s === a && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
        }
        return s._tDur;
      }, r.updateRoot = function(e) {
        if (a._ts && (_e(a, ze(e, a)), c = St.frame), St.frame >= ae) {
          ae += _.autoSleep || 120;
          var t = a._first;
          if ((!t || !t._ts) && _.autoSleep && St._listeners.length < 2) {
            for (;t && !t._ts; ) {
              t = t._next;
            }
            t || St.sleep();
          }
        }
      }, r;
    }(Bt);
    we(Gt.prototype, {
      _lock: 0,
      _hasPause: 0,
      _forcing: 0
    });
    var Nt, $t, qt = function(e, t, i, r, n, s, a) {
      var o, l, d, u, c, p, h, f, m = new ui(this._pt, e, t, 0, 1, ni, null, n), g = 0, v = 0;
      for (m.b = i, m.e = r, i += "", (h = ~(r += "").indexOf("random(")) && (r = lt(r)), 
      s && (s(f = [ i, r ], e, t), i = f[0], r = f[1]), l = i.match($) || []; o = $.exec(r); ) {
        u = o[0], c = r.substring(g, o.index), d ? d = (d + 1) % 5 : "rgba(" === c.substr(-5) && (d = 1), 
        u !== l[v++] && (p = parseFloat(l[v - 1]) || 0, m._pt = {
          _next: m._pt,
          p: c || 1 === v ? c : ",",
          s: p,
          c: "=" === u.charAt(1) ? me(p, u) - p : parseFloat(u) - p,
          m: d && d < 4 ? Math.round : 0
        }, g = $.lastIndex);
      }
      return m.c = g < r.length ? r.substring(g, r.length) : "", m.fp = a, (q.test(r) || h) && (m.e = 0), 
      this._pt = m, m;
    }, Vt = function(e, t, i, r, n, s, a, o, l, d) {
      A(r) && (r = r(n || 0, e, s));
      var u, c = e[t], p = "get" !== i ? i : A(c) ? l ? e[t.indexOf("set") || !A(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](l) : e[t]() : c, h = A(c) ? l ? Jt : Zt : Kt;
      if (k(r) && (~r.indexOf("random(") && (r = lt(r)), "=" === r.charAt(1) && ((u = me(p, r) + (Qe(p) || 0)) || 0 === u) && (r = u)), 
      !d || p !== r || $t) {
        return isNaN(p * r) || "" === r ? (!c && !(t in e) && W(t, r), qt.call(this, e, t, p, r, h, o || _.stringFilter, l)) : (u = new ui(this._pt, e, t, +p || 0, r - (p || 0), "boolean" == typeof c ? ri : ii, 0, h), 
        l && (u.fp = l), a && u.modifier(a, this, e), this._pt = u);
      }
    }, jt = function(e, t, i, r, n, s) {
      var a, o, l, d;
      if (ne[e] && !1 !== (a = new ne[e]).init(n, a.rawVars ? t[e] : function(e, t, i, r, n) {
        if (A(e) && (e = Xt(e, n, t, i, r)), !L(e) || e.style && e.nodeType || R(e) || F(e)) {
          return k(e) ? Xt(e, n, t, i, r) : e;
        }
        var s, a = {};
        for (s in e) {
          a[s] = Xt(e[s], n, t, i, r);
        }
        return a;
      }(t[e], r, n, s, i), i, r, s) && (i._pt = o = new ui(i._pt, n, e, 0, 1, a.render, a, 0, a.priority), 
      i !== p)) {
        for (l = i._ptLookup[i._targets.indexOf(n)], d = a._props.length; d--; ) {
          l[a._props[d]] = o;
        }
      }
      return a;
    }, Ht = function e(t, i, s) {
      var o, l, d, u, c, p, h, f, m, g, v, _, T, x = t.vars, S = x.ease, E = x.startAt, C = x.immediateRender, M = x.lazy, k = x.onUpdate, A = x.runBackwards, P = x.yoyoEase, O = x.keyframes, L = x.autoRevert, z = t._dur, D = t._startAt, F = t._targets, R = t.parent, B = R && "nested" === R.data ? R.vars.targets : F, G = "auto" === t._overwrite && !r, N = t.timeline;
      if (N && (!O || !S) && (S = "none"), t._ease = Lt(S, y.ease), t._yEase = P ? Pt(Lt(!0 === P ? S : P, y.ease)) : 0, 
      P && t._yoyo && !t._repeat && (P = t._yEase, t._yEase = t._ease, t._ease = P), t._from = !N && !!x.runBackwards, 
      !N || O && !x.stagger) {
        if (_ = (f = F[0] ? ue(F[0]).harness : 0) && x[f.prop], o = Se(x, te), D && (D._zTime < 0 && D.progress(1), 
        i < 0 && A && C && !L ? D.render(-1, !0) : D.revert(A && z ? J : Z), D._lazy = 0), 
        E) {
          if (ke(t._startAt = Qt.set(F, we({
            data: "isStart",
            overwrite: !1,
            parent: R,
            immediateRender: !0,
            lazy: !D && I(M),
            startAt: null,
            delay: 0,
            onUpdate: k && function() {
              return ct(t, "onUpdate");
            },
            stagger: 0
          }, E))), t._startAt._dp = 0, t._startAt._sat = t, i < 0 && (n || !C && !L) && t._startAt.revert(J), 
          C && z && i <= 0 && s <= 0) {
            return void (i && (t._zTime = i));
          }
        } else if (A && z && !D) {
          if (i && (C = !1), d = we({
            overwrite: !1,
            data: "isFromStart",
            lazy: C && !D && I(M),
            immediateRender: C,
            stagger: 0,
            parent: R
          }, o), _ && (d[f.prop] = _), ke(t._startAt = Qt.set(F, d)), t._startAt._dp = 0, 
          t._startAt._sat = t, i < 0 && (n ? t._startAt.revert(J) : t._startAt.render(-1, !0)), 
          t._zTime = i, C) {
            if (!i) {
              return;
            }
          } else {
            e(t._startAt, w, w);
          }
        }
        for (t._pt = t._ptCache = 0, M = z && I(M) || M && !z, l = 0; l < F.length; l++) {
          if (h = (c = F[l])._gsap || de(F)[l]._gsap, t._ptLookup[l] = g = {}, re[h.id] && ie.length && ve(), 
          v = B === F ? l : B.indexOf(c), f && !1 !== (m = new f).init(c, _ || o, t, v, B) && (t._pt = u = new ui(t._pt, c, m.name, 0, 1, m.render, m, 0, m.priority), 
          m._props.forEach((function(e) {
            g[e] = u;
          })), m.priority && (p = 1)), !f || _) {
            for (d in o) {
              ne[d] && (m = jt(d, o, t, v, c, B)) ? m.priority && (p = 1) : g[d] = u = Vt.call(t, c, d, "get", o[d], v, B, 0, x.stringFilter);
            }
          }
          t._op && t._op[l] && t.kill(c, t._op[l]), G && t._pt && (Nt = t, a.killTweensOf(c, g, t.globalTime(i)), 
          T = !t.parent, Nt = 0), t._pt && M && (re[h.id] = 1);
        }
        p && di(t), t._onInit && t._onInit(t);
      }
      t._onUpdate = k, t._initted = (!t._op || t._pt) && !T, O && i <= 0 && N.render(b, !0, !0);
    }, Yt = function(e, t, i, r) {
      var n, s, a = t.ease || r || "power1.inOut";
      if (R(t)) {
        s = i[e] || (i[e] = []), t.forEach((function(e, i) {
          return s.push({
            t: i / (t.length - 1) * 100,
            v: e,
            e: a
          });
        }));
      } else {
        for (n in t) {
          s = i[n] || (i[n] = []), "ease" === n || s.push({
            t: parseFloat(e),
            v: t[n],
            e: a
          });
        }
      }
    }, Xt = function(e, t, i, r, n) {
      return A(e) ? e.call(t, i, r, n) : k(e) && ~e.indexOf("random(") ? lt(e) : e;
    }, Wt = le + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Ut = {};
    pe(Wt + ",id,stagger,delay,duration,paused,scrollTrigger", (function(e) {
      return Ut[e] = 1;
    }));
    var Qt = function(i) {
      function s(t, n, s, o) {
        var l;
        "number" == typeof n && (s.duration = n, n = s, s = null);
        var d, u, c, p, h, f, m, g, v = (l = i.call(this, o ? n : Ee(n)) || this).vars, y = v.duration, b = v.delay, w = v.immediateRender, T = v.stagger, x = v.overwrite, S = v.keyframes, E = v.defaults, C = v.scrollTrigger, M = v.yoyoEase, k = n.parent || a, A = (R(t) || F(t) ? P(t[0]) : "length" in n) ? [ t ] : et(t);
        if (l._targets = A.length ? de(A) : U("GSAP target " + t + " not found. https://gsap.com", !_.nullTargetWarn) || [], 
        l._ptLookup = [], l._overwrite = x, S || T || D(y) || D(b)) {
          if (n = l.vars, (d = l.timeline = new Gt({
            data: "nested",
            defaults: E || {},
            targets: k && "nested" === k.data ? k.vars.targets : A
          })).kill(), d.parent = d._dp = e(l), d._start = 0, T || D(y) || D(b)) {
            if (p = A.length, m = T && rt(T), L(T)) {
              for (h in T) {
                ~Wt.indexOf(h) && (g || (g = {}), g[h] = T[h]);
              }
            }
            for (u = 0; u < p; u++) {
              (c = Se(n, Ut)).stagger = 0, M && (c.yoyoEase = M), g && Te(c, g), f = A[u], c.duration = +Xt(y, e(l), u, f, A), 
              c.delay = (+Xt(b, e(l), u, f, A) || 0) - l._delay, !T && 1 === p && c.delay && (l._delay = b = c.delay, 
              l._start += b, c.delay = 0), d.to(f, c, m ? m(u, f, A) : 0), d._ease = Ct.none;
            }
            d.duration() ? y = b = 0 : l.timeline = 0;
          } else if (S) {
            Ee(we(d.vars.defaults, {
              ease: "none"
            })), d._ease = Lt(S.ease || n.ease || "none");
            var O, z, B, G = 0;
            if (R(S)) {
              S.forEach((function(e) {
                return d.to(A, e, ">");
              })), d.duration();
            } else {
              for (h in c = {}, S) {
                "ease" === h || "easeEach" === h || Yt(h, S[h], c, S.easeEach);
              }
              for (h in c) {
                for (O = c[h].sort((function(e, t) {
                  return e.t - t.t;
                })), G = 0, u = 0; u < O.length; u++) {
                  (B = {
                    ease: (z = O[u]).e,
                    duration: (z.t - (u ? O[u - 1].t : 0)) / 100 * y
                  })[h] = z.v, d.to(A, B, G), G += B.duration;
                }
              }
              d.duration() < y && d.to({}, {
                duration: y - d.duration()
              });
            }
          }
          y || l.duration(y = d.duration());
        } else {
          l.timeline = 0;
        }
        return !0 !== x || r || (Nt = e(l), a.killTweensOf(A), Nt = 0), Be(k, e(l), s), 
        n.reversed && l.reverse(), n.paused && l.paused(!0), (w || !y && !S && l._start === fe(k._time) && I(w) && Oe(e(l)) && "nested" !== k.data) && (l._tTime = -1e-8, 
        l.render(Math.max(0, -b) || 0)), C && Ge(e(l), C), l;
      }
      t(s, i);
      var o = s.prototype;
      return o.render = function(e, t, i) {
        var r, s, a, o, l, d, u, c, p, h = this._time, f = this._tDur, m = this._dur, g = e < 0, v = e > f - w && !g ? f : e < w ? 0 : e;
        if (m) {
          if (v !== this._tTime || !e || i || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== g) {
            if (r = v, c = this.timeline, this._repeat) {
              if (o = m + this._rDelay, this._repeat < -1 && g) {
                return this.totalTime(100 * o + e, t, i);
              }
              if (r = fe(v % o), v === f ? (a = this._repeat, r = m) : ((a = ~~(v / o)) && a === fe(v / o) && (r = m, 
              a--), r > m && (r = m)), (d = this._yoyo && 1 & a) && (p = this._yEase, r = m - r), 
              l = Ie(this._tTime, o), r === h && !i && this._initted && a === l) {
                return this._tTime = v, this;
              }
              a !== l && (c && this._yEase && Ot(c, d), this.vars.repeatRefresh && !d && !this._lock && this._time !== o && this._initted && (this._lock = i = 1, 
              this.render(fe(o * a), !0).invalidate()._lock = 0));
            }
            if (!this._initted) {
              if (Ne(this, g ? e : r, i, t, v)) {
                return this._tTime = 0, this;
              }
              if (!(h === this._time || i && this.vars.repeatRefresh && a !== l)) {
                return this;
              }
              if (m !== this._dur) {
                return this.render(e, t, i);
              }
            }
            if (this._tTime = v, this._time = r, !this._act && this._ts && (this._act = 1, this._lazy = 0), 
            this.ratio = u = (p || this._ease)(r / m), this._from && (this.ratio = u = 1 - u), 
            r && !h && !t && !a && (ct(this, "onStart"), this._tTime !== v)) {
              return this;
            }
            for (s = this._pt; s; ) {
              s.r(u, s.d), s = s._next;
            }
            c && c.render(e < 0 ? e : c._dur * c._ease(r / this._dur), t, i) || this._startAt && (this._zTime = e), 
            this._onUpdate && !t && (g && Pe(this, e, 0, i), ct(this, "onUpdate")), this._repeat && a !== l && this.vars.onRepeat && !t && this.parent && ct(this, "onRepeat"), 
            v !== this._tDur && v || this._tTime !== v || (g && !this._onUpdate && Pe(this, e, 0, !0), 
            (e || !m) && (v === this._tDur && this._ts > 0 || !v && this._ts < 0) && ke(this, 1), 
            t || g && !h || !(v || h || d) || (ct(this, v === f ? "onComplete" : "onReverseComplete", !0), 
            this._prom && !(v < f && this.timeScale() > 0) && this._prom()));
          }
        } else {
          !function(e, t, i, r) {
            var s, a, o, l = e.ratio, d = t < 0 || !t && (!e._start && $e(e) && (e._initted || !qe(e)) || (e._ts < 0 || e._dp._ts < 0) && !qe(e)) ? 0 : 1, u = e._rDelay, c = 0;
            if (u && e._repeat && (c = Ue(0, e._tDur, t), a = Ie(c, u), e._yoyo && 1 & a && (d = 1 - d), 
            a !== Ie(e._tTime, u) && (l = 1 - d, e.vars.repeatRefresh && e._initted && e.invalidate())), 
            d !== l || n || r || e._zTime === w || !t && e._zTime) {
              if (!e._initted && Ne(e, t, r, i, c)) {
                return;
              }
              for (o = e._zTime, e._zTime = t || (i ? w : 0), i || (i = t && !o), e.ratio = d, 
              e._from && (d = 1 - d), e._time = 0, e._tTime = c, s = e._pt; s; ) {
                s.r(d, s.d), s = s._next;
              }
              t < 0 && Pe(e, t, 0, !0), e._onUpdate && !i && ct(e, "onUpdate"), c && e._repeat && !i && e.parent && ct(e, "onRepeat"), 
              (t >= e._tDur || t < 0) && e.ratio === d && (d && ke(e, 1), i || n || (ct(e, d ? "onComplete" : "onReverseComplete", !0), 
              e._prom && e._prom()));
            } else {
              e._zTime || (e._zTime = t);
            }
          }(this, e, t, i);
        }
        return this;
      }, o.targets = function() {
        return this._targets;
      }, o.invalidate = function(e) {
        return (!e || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, 
        this._ptLookup = [], this.timeline && this.timeline.invalidate(e), i.prototype.invalidate.call(this, e);
      }, o.resetTo = function(e, t, i, r, n) {
        h || St.wake(), this._ts || this.play();
        var s = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
        return this._initted || Ht(this, s), function(e, t, i, r, n, s, a, o) {
          var l, d, u, c, p = (e._pt && e._ptCache || (e._ptCache = {}))[t];
          if (!p) {
            for (p = e._ptCache[t] = [], u = e._ptLookup, c = e._targets.length; c--; ) {
              if ((l = u[c][t]) && l.d && l.d._pt) {
                for (l = l.d._pt; l && l.p !== t && l.fp !== t; ) {
                  l = l._next;
                }
              }
              if (!l) {
                return $t = 1, e.vars[t] = "+=0", Ht(e, a), $t = 0, o ? U(t + " not eligible for reset") : 1;
              }
              p.push(l);
            }
          }
          for (c = p.length; c--; ) {
            (l = (d = p[c])._pt || d).s = !r && 0 !== r || n ? l.s + (r || 0) + s * l.c : r, 
            l.c = i - l.s, d.e && (d.e = he(i) + Qe(d.e)), d.b && (d.b = l.s + Qe(d.b));
          }
        }(this, e, t, i, r, this._ease(s / this._dur), s, n) ? this.resetTo(e, t, i, r, 1) : (Fe(this, 0), 
        this.parent || Ce(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), 
        this.render(0));
      }, o.kill = function(e, t) {
        if (void 0 === t && (t = "all"), !(e || t && "all" !== t)) {
          return this._lazy = this._pt = 0, this.parent ? pt(this) : this;
        }
        if (this.timeline) {
          var i = this.timeline.totalDuration();
          return this.timeline.killTweensOf(e, t, Nt && !0 !== Nt.vars.overwrite)._first || pt(this), 
          this.parent && i !== this.timeline.totalDuration() && Ve(this, this._dur * this.timeline._tDur / i, 0, 1), 
          this;
        }
        var r, n, s, a, o, l, d, u = this._targets, c = e ? et(e) : u, p = this._ptLookup, h = this._pt;
        if ((!t || "all" === t) && function(e, t) {
          for (var i = e.length, r = i === t.length; r && i-- && e[i] === t[i]; ) {}
          return i < 0;
        }(u, c)) {
          return "all" === t && (this._pt = 0), pt(this);
        }
        for (r = this._op = this._op || [], "all" !== t && (k(t) && (o = {}, pe(t, (function(e) {
          return o[e] = 1;
        })), t = o), t = function(e, t) {
          var i, r, n, s, a = e[0] ? ue(e[0]).harness : 0, o = a && a.aliases;
          if (!o) {
            return t;
          }
          for (r in i = Te({}, t), o) {
            if (r in i) {
              for (n = (s = o[r].split(",")).length; n--; ) {
                i[s[n]] = i[r];
              }
            }
          }
          return i;
        }(u, t)), d = u.length; d--; ) {
          if (~c.indexOf(u[d])) {
            for (o in n = p[d], "all" === t ? (r[d] = t, a = n, s = {}) : (s = r[d] = r[d] || {}, 
            a = t), a) {
              (l = n && n[o]) && ("kill" in l.d && !0 !== l.d.kill(o) || Me(this, l, "_pt"), delete n[o]), 
              "all" !== s && (s[o] = 1);
            }
          }
        }
        return this._initted && !this._pt && h && pt(this), this;
      }, s.to = function(e, t) {
        return new s(e, t, arguments[2]);
      }, s.from = function(e, t) {
        return Xe(1, arguments);
      }, s.delayedCall = function(e, t, i, r) {
        return new s(t, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: e,
          onComplete: t,
          onReverseComplete: t,
          onCompleteParams: i,
          onReverseCompleteParams: i,
          callbackScope: r
        });
      }, s.fromTo = function(e, t, i) {
        return Xe(2, arguments);
      }, s.set = function(e, t) {
        return t.duration = 0, t.repeatDelay || (t.repeat = 0), new s(e, t);
      }, s.killTweensOf = function(e, t, i) {
        return a.killTweensOf(e, t, i);
      }, s;
    }(Bt);
    we(Qt.prototype, {
      _targets: [],
      _lazy: 0,
      _startAt: 0,
      _op: 0,
      _onInit: 0
    }), pe("staggerTo,staggerFrom,staggerFromTo", (function(e) {
      Qt[e] = function() {
        var t = new Gt, i = Ke.call(arguments, 0);
        return i.splice("staggerFromTo" === e ? 5 : 4, 0, 0), t[e].apply(t, i);
      };
    }));
    var Kt = function(e, t, i) {
      return e[t] = i;
    }, Zt = function(e, t, i) {
      return e[t](i);
    }, Jt = function(e, t, i, r) {
      return e[t](r.fp, i);
    }, ei = function(e, t, i) {
      return e.setAttribute(t, i);
    }, ti = function(e, t) {
      return A(e[t]) ? Zt : O(e[t]) && e.setAttribute ? ei : Kt;
    }, ii = function(e, t) {
      return t.set(t.t, t.p, Math.round(1e6 * (t.s + t.c * e)) / 1e6, t);
    }, ri = function(e, t) {
      return t.set(t.t, t.p, !!(t.s + t.c * e), t);
    }, ni = function(e, t) {
      var i = t._pt, r = "";
      if (!e && t.b) {
        r = t.b;
      } else if (1 === e && t.e) {
        r = t.e;
      } else {
        for (;i; ) {
          r = i.p + (i.m ? i.m(i.s + i.c * e) : Math.round(1e4 * (i.s + i.c * e)) / 1e4) + r, 
          i = i._next;
        }
        r += t.c;
      }
      t.set(t.t, t.p, r, t);
    }, si = function(e, t) {
      for (var i = t._pt; i; ) {
        i.r(e, i.d), i = i._next;
      }
    }, ai = function(e, t, i, r) {
      for (var n, s = this._pt; s; ) {
        n = s._next, s.p === r && s.modifier(e, t, i), s = n;
      }
    }, oi = function(e) {
      for (var t, i, r = this._pt; r; ) {
        i = r._next, r.p === e && !r.op || r.op === e ? Me(this, r, "_pt") : r.dep || (t = 1), 
        r = i;
      }
      return !t;
    }, li = function(e, t, i, r) {
      r.mSet(e, t, r.m.call(r.tween, i, r.mt), r);
    }, di = function(e) {
      for (var t, i, r, n, s = e._pt; s; ) {
        for (t = s._next, i = r; i && i.pr > s.pr; ) {
          i = i._next;
        }
        (s._prev = i ? i._prev : n) ? s._prev._next = s : r = s, (s._next = i) ? i._prev = s : n = s, 
        s = t;
      }
      e._pt = r;
    }, ui = function() {
      function e(e, t, i, r, n, s, a, o, l) {
        this.t = t, this.s = r, this.c = n, this.p = i, this.r = s || ii, this.d = a || this, 
        this.set = o || Kt, this.pr = l || 0, this._next = e, e && (e._prev = this);
      }
      return e.prototype.modifier = function(e, t, i) {
        this.mSet = this.mSet || this.set, this.set = li, this.m = e, this.mt = i, this.tween = t;
      }, e;
    }();
    pe(le + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function(e) {
      return te[e] = 1;
    })), H.TweenMax = H.TweenLite = Qt, H.TimelineLite = H.TimelineMax = Gt, a = new Gt({
      sortChildren: !1,
      defaults: y,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0
    }), _.stringFilter = xt;
    var ci = [], pi = {}, hi = [], fi = 0, mi = 0, gi = function(e) {
      return (pi[e] || hi).map((function(e) {
        return e();
      }));
    }, vi = function() {
      var e = Date.now(), t = [];
      e - fi > 2 && (gi("matchMediaInit"), ci.forEach((function(e) {
        var i, r, n, s, a = e.queries, l = e.conditions;
        for (r in a) {
          (i = o.matchMedia(a[r]).matches) && (n = 1), i !== l[r] && (l[r] = i, s = 1);
        }
        s && (e.revert(), n && t.push(e));
      })), gi("matchMediaRevert"), t.forEach((function(e) {
        return e.onMatch(e, (function(t) {
          return e.add(null, t);
        }));
      })), fi = e, gi("matchMedia"));
    }, _i = function() {
      function e(e, t) {
        this.selector = t && tt(t), this.data = [], this._r = [], this.isReverted = !1, 
        this.id = mi++, e && this.add(e);
      }
      var t = e.prototype;
      return t.add = function(e, t, i) {
        A(e) && (i = t, t = e, e = A);
        var r = this, n = function() {
          var e, n = s, a = r.selector;
          return n && n !== r && n.data.push(r), i && (r.selector = tt(i)), s = r, e = t.apply(r, arguments), 
          A(e) && r._r.push(e), s = n, r.selector = a, r.isReverted = !1, e;
        };
        return r.last = n, e === A ? n(r, (function(e) {
          return r.add(null, e);
        })) : e ? r[e] = n : n;
      }, t.ignore = function(e) {
        var t = s;
        s = null, e(this), s = t;
      }, t.getTweens = function() {
        var t = [];
        return this.data.forEach((function(i) {
          return i instanceof e ? t.push.apply(t, i.getTweens()) : i instanceof Qt && !(i.parent && "nested" === i.parent.data) && t.push(i);
        })), t;
      }, t.clear = function() {
        this._r.length = this.data.length = 0;
      }, t.kill = function(e, t) {
        var i = this;
        if (e ? function() {
          for (var t, r = i.getTweens(), n = i.data.length; n--; ) {
            "isFlip" === (t = i.data[n]).data && (t.revert(), t.getChildren(!0, !0, !1).forEach((function(e) {
              return r.splice(r.indexOf(e), 1);
            })));
          }
          for (r.map((function(e) {
            return {
              g: e._dur || e._delay || e._sat && !e._sat.vars.immediateRender ? e.globalTime(0) : -1 / 0,
              t: e
            };
          })).sort((function(e, t) {
            return t.g - e.g || -1 / 0;
          })).forEach((function(t) {
            return t.t.revert(e);
          })), n = i.data.length; n--; ) {
            (t = i.data[n]) instanceof Gt ? "nested" !== t.data && (t.scrollTrigger && t.scrollTrigger.revert(), 
            t.kill()) : !(t instanceof Qt) && t.revert && t.revert(e);
          }
          i._r.forEach((function(t) {
            return t(e, i);
          })), i.isReverted = !0;
        }() : this.data.forEach((function(e) {
          return e.kill && e.kill();
        })), this.clear(), t) {
          for (var r = ci.length; r--; ) {
            ci[r].id === this.id && ci.splice(r, 1);
          }
        }
      }, t.revert = function(e) {
        this.kill(e || {});
      }, e;
    }(), yi = function() {
      function e(e) {
        this.contexts = [], this.scope = e, s && s.data.push(this);
      }
      var t = e.prototype;
      return t.add = function(e, t, i) {
        L(e) || (e = {
          matches: e
        });
        var r, n, a, l = new _i(0, i || this.scope), d = l.conditions = {};
        for (n in s && !l.selector && (l.selector = s.selector), this.contexts.push(l), 
        t = l.add("onMatch", t), l.queries = e, e) {
          "all" === n ? a = 1 : (r = o.matchMedia(e[n])) && (ci.indexOf(l) < 0 && ci.push(l), 
          (d[n] = r.matches) && (a = 1), r.addListener ? r.addListener(vi) : r.addEventListener("change", vi));
        }
        return a && t(l, (function(e) {
          return l.add(null, e);
        })), this;
      }, t.revert = function(e) {
        this.kill(e || {});
      }, t.kill = function(e) {
        this.contexts.forEach((function(t) {
          return t.kill(e, !0);
        }));
      }, e;
    }(), bi = {
      registerPlugin: function() {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) {
          t[i] = arguments[i];
        }
        t.forEach((function(e) {
          return ft(e);
        }));
      },
      timeline: function(e) {
        return new Gt(e);
      },
      getTweensOf: function(e, t) {
        return a.getTweensOf(e, t);
      },
      getProperty: function(e, t, i, r) {
        k(e) && (e = et(e)[0]);
        var n = ue(e || {}).get, s = i ? be : ye;
        return "native" === i && (i = ""), e ? t ? s((ne[t] && ne[t].get || n)(e, t, i, r)) : function(t, i, r) {
          return s((ne[t] && ne[t].get || n)(e, t, i, r));
        } : e;
      },
      quickSetter: function(e, t, i) {
        if ((e = et(e)).length > 1) {
          var r = e.map((function(e) {
            return xi.quickSetter(e, t, i);
          })), n = r.length;
          return function(e) {
            for (var t = n; t--; ) {
              r[t](e);
            }
          };
        }
        e = e[0] || {};
        var s = ne[t], a = ue(e), o = a.harness && (a.harness.aliases || {})[t] || t, l = s ? function(t) {
          var r = new s;
          p._pt = 0, r.init(e, i ? t + i : t, p, 0, [ e ]), r.render(1, r), p._pt && si(1, p);
        } : a.set(e, o);
        return s ? l : function(t) {
          return l(e, o, i ? t + i : t, a, 1);
        };
      },
      quickTo: function(e, t, i) {
        var r, n = xi.to(e, Te(((r = {})[t] = "+=0.1", r.paused = !0, r), i || {})), s = function(e, i, r) {
          return n.resetTo(t, e, i, r);
        };
        return s.tween = n, s;
      },
      isTweening: function(e) {
        return a.getTweensOf(e, !0).length > 0;
      },
      defaults: function(e) {
        return e && e.ease && (e.ease = Lt(e.ease, y.ease)), xe(y, e || {});
      },
      config: function(e) {
        return xe(_, e || {});
      },
      registerEffect: function(e) {
        var t = e.name, i = e.effect, r = e.plugins, n = e.defaults, s = e.extendTimeline;
        (r || "").split(",").forEach((function(e) {
          return e && !ne[e] && !H[e] && U(t + " effect requires " + e + " plugin.");
        })), se[t] = function(e, t, r) {
          return i(et(e), we(t || {}, n), r);
        }, s && (Gt.prototype[t] = function(e, i, r) {
          return this.add(se[t](e, L(i) ? i : (r = i) && {}, this), r);
        });
      },
      registerEase: function(e, t) {
        Ct[e] = Lt(t);
      },
      parseEase: function(e, t) {
        return arguments.length ? Lt(e, t) : Ct;
      },
      getById: function(e) {
        return a.getById(e);
      },
      exportRoot: function(e, t) {
        void 0 === e && (e = {});
        var i, r, n = new Gt(e);
        for (n.smoothChildTiming = I(e.smoothChildTiming), a.remove(n), n._dp = 0, n._time = n._tTime = a._time, 
        i = a._first; i; ) {
          r = i._next, !t && !i._dur && i instanceof Qt && i.vars.onComplete === i._targets[0] || Be(n, i, i._start - i._delay), 
          i = r;
        }
        return Be(a, n, 0), n;
      },
      context: function(e, t) {
        return e ? new _i(e, t) : s;
      },
      matchMedia: function(e) {
        return new yi(e);
      },
      matchMediaRefresh: function() {
        return ci.forEach((function(e) {
          var t, i, r = e.conditions;
          for (i in r) {
            r[i] && (r[i] = !1, t = 1);
          }
          t && e.revert();
        })) || vi();
      },
      addEventListener: function(e, t) {
        var i = pi[e] || (pi[e] = []);
        ~i.indexOf(t) || i.push(t);
      },
      removeEventListener: function(e, t) {
        var i = pi[e], r = i && i.indexOf(t);
        r >= 0 && i.splice(r, 1);
      },
      utils: {
        wrap: function e(t, i, r) {
          var n = i - t;
          return R(t) ? ot(t, e(0, t.length), i) : We(r, (function(e) {
            return (n + (e - t) % n) % n + t;
          }));
        },
        wrapYoyo: function e(t, i, r) {
          var n = i - t, s = 2 * n;
          return R(t) ? ot(t, e(0, t.length - 1), i) : We(r, (function(e) {
            return t + ((e = (s + (e - t) % s) % s || 0) > n ? s - e : e);
          }));
        },
        distribute: rt,
        random: at,
        snap: st,
        normalize: function(e, t, i) {
          return dt(e, t, 0, 1, i);
        },
        getUnit: Qe,
        clamp: function(e, t, i) {
          return We(i, (function(i) {
            return Ue(e, t, i);
          }));
        },
        splitColor: _t,
        toArray: et,
        selector: tt,
        mapRange: dt,
        pipe: function() {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) {
            t[i] = arguments[i];
          }
          return function(e) {
            return t.reduce((function(e, t) {
              return t(e);
            }), e);
          };
        },
        unitize: function(e, t) {
          return function(i) {
            return e(parseFloat(i)) + (t || Qe(i));
          };
        },
        interpolate: function e(t, i, r, n) {
          var s = isNaN(t + i) ? 0 : function(e) {
            return (1 - e) * t + e * i;
          };
          if (!s) {
            var a, o, l, d, u, c = k(t), p = {};
            if (!0 === r && (n = 1) && (r = null), c) {
              t = {
                p: t
              }, i = {
                p: i
              };
            } else if (R(t) && !R(i)) {
              for (l = [], d = t.length, u = d - 2, o = 1; o < d; o++) {
                l.push(e(t[o - 1], t[o]));
              }
              d--, s = function(e) {
                e *= d;
                var t = Math.min(u, ~~e);
                return l[t](e - t);
              }, r = i;
            } else {
              n || (t = Te(R(t) ? [] : {}, t));
            }
            if (!l) {
              for (a in i) {
                Vt.call(p, t, a, "get", i[a]);
              }
              s = function(e) {
                return si(e, p) || (c ? t.p : t);
              };
            }
          }
          return We(r, s);
        },
        shuffle: it
      },
      install: X,
      effects: se,
      ticker: St,
      updateRoot: Gt.updateRoot,
      plugins: ne,
      globalTimeline: a,
      core: {
        PropTween: ui,
        globals: Q,
        Tween: Qt,
        Timeline: Gt,
        Animation: Bt,
        getCache: ue,
        _removeLinkedListItem: Me,
        reverting: function() {
          return n;
        },
        context: function(e) {
          return e && s && (s.data.push(e), e._ctx = s), s;
        },
        suppressOverwrites: function(e) {
          return r = e;
        }
      }
    };
    pe("to,from,fromTo,delayedCall,set,killTweensOf", (function(e) {
      return bi[e] = Qt[e];
    })), St.add(Gt.updateRoot), p = bi.to({}, {
      duration: 0
    });
    var wi = function(e, t) {
      for (var i = e._pt; i && i.p !== t && i.op !== t && i.fp !== t; ) {
        i = i._next;
      }
      return i;
    }, Ti = function(e, t) {
      return {
        name: e,
        rawVars: 1,
        init: function(e, i, r) {
          r._onInit = function(e) {
            var r, n;
            if (k(i) && (r = {}, pe(i, (function(e) {
              return r[e] = 1;
            })), i = r), t) {
              for (n in r = {}, i) {
                r[n] = t(i[n]);
              }
              i = r;
            }
            !function(e, t) {
              var i, r, n, s = e._targets;
              for (i in t) {
                for (r = s.length; r--; ) {
                  (n = e._ptLookup[r][i]) && (n = n.d) && (n._pt && (n = wi(n, i)), n && n.modifier && n.modifier(t[i], e, s[r], i));
                }
              }
            }(e, i);
          };
        }
      };
    }, xi = bi.registerPlugin({
      name: "attr",
      init: function(e, t, i, r, n) {
        var s, a, o;
        for (s in this.tween = i, t) {
          o = e.getAttribute(s) || "", (a = this.add(e, "setAttribute", (o || 0) + "", t[s], r, n, 0, 0, s)).op = s, 
          a.b = o, this._props.push(s);
        }
      },
      render: function(e, t) {
        for (var i = t._pt; i; ) {
          n ? i.set(i.t, i.p, i.b, i) : i.r(e, i.d), i = i._next;
        }
      }
    }, {
      name: "endArray",
      init: function(e, t) {
        for (var i = t.length; i--; ) {
          this.add(e, i, e[i] || 0, t[i], 0, 0, 0, 0, 0, 1);
        }
      }
    }, Ti("roundProps", nt), Ti("modifiers"), Ti("snap", st)) || bi;
    Qt.version = Gt.version = xi.version = "3.12.5", u = 1, z() && Et();
    Ct.Power0, Ct.Power1, Ct.Power2, Ct.Power3, Ct.Power4, Ct.Linear, Ct.Quad, Ct.Cubic, 
    Ct.Quart, Ct.Quint, Ct.Strong, Ct.Elastic, Ct.Back, Ct.SteppedEase, Ct.Bounce, Ct.Sine, 
    Ct.Expo, Ct.Circ;
    var Si, Ei, Ci, Mi, ki, Ai, Pi, Oi, Li = {}, Ii = 180 / Math.PI, zi = Math.PI / 180, Di = Math.atan2, Fi = /([A-Z])/g, Ri = /(left|right|width|margin|padding|x)/i, Bi = /[\s,\(]\S/, Gi = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity"
    }, Ni = function(e, t) {
      return t.set(t.t, t.p, Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t);
    }, $i = function(e, t) {
      return t.set(t.t, t.p, 1 === e ? t.e : Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t);
    }, qi = function(e, t) {
      return t.set(t.t, t.p, e ? Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u : t.b, t);
    }, Vi = function(e, t) {
      var i = t.s + t.c * e;
      t.set(t.t, t.p, ~~(i + (i < 0 ? -.5 : .5)) + t.u, t);
    }, ji = function(e, t) {
      return t.set(t.t, t.p, e ? t.e : t.b, t);
    }, Hi = function(e, t) {
      return t.set(t.t, t.p, 1 !== e ? t.b : t.e, t);
    }, Yi = function(e, t, i) {
      return e.style[t] = i;
    }, Xi = function(e, t, i) {
      return e.style.setProperty(t, i);
    }, Wi = function(e, t, i) {
      return e._gsap[t] = i;
    }, Ui = function(e, t, i) {
      return e._gsap.scaleX = e._gsap.scaleY = i;
    }, Qi = function(e, t, i, r, n) {
      var s = e._gsap;
      s.scaleX = s.scaleY = i, s.renderTransform(n, s);
    }, Ki = function(e, t, i, r, n) {
      var s = e._gsap;
      s[t] = i, s.renderTransform(n, s);
    }, Zi = "transform", Ji = Zi + "Origin", er = function e(t, i) {
      var r = this, n = this.target, s = n.style, a = n._gsap;
      if (t in Li && s) {
        if (this.tfm = this.tfm || {}, "transform" === t) {
          return Gi.transform.split(",").forEach((function(t) {
            return e.call(r, t, i);
          }));
        }
        if (~(t = Gi[t] || t).indexOf(",") ? t.split(",").forEach((function(e) {
          return r.tfm[e] = _r(n, e);
        })) : this.tfm[t] = a.x ? a[t] : _r(n, t), t === Ji && (this.tfm.zOrigin = a.zOrigin), 
        this.props.indexOf(Zi) >= 0) {
          return;
        }
        a.svg && (this.svgo = n.getAttribute("data-svg-origin"), this.props.push(Ji, i, "")), 
        t = Zi;
      }
      (s || i) && this.props.push(t, i, s[t]);
    }, tr = function(e) {
      e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
    }, ir = function() {
      var e, t, i = this.props, r = this.target, n = r.style, s = r._gsap;
      for (e = 0; e < i.length; e += 3) {
        i[e + 1] ? r[i[e]] = i[e + 2] : i[e + 2] ? n[i[e]] = i[e + 2] : n.removeProperty("--" === i[e].substr(0, 2) ? i[e] : i[e].replace(Fi, "-$1").toLowerCase());
      }
      if (this.tfm) {
        for (t in this.tfm) {
          s[t] = this.tfm[t];
        }
        s.svg && (s.renderTransform(), r.setAttribute("data-svg-origin", this.svgo || "")), 
        (e = Pi()) && e.isStart || n[Zi] || (tr(n), s.zOrigin && n[Ji] && (n[Ji] += " " + s.zOrigin + "px", 
        s.zOrigin = 0, s.renderTransform()), s.uncache = 1);
      }
    }, rr = function(e, t) {
      var i = {
        target: e,
        props: [],
        revert: ir,
        save: er
      };
      return e._gsap || xi.core.getCache(e), t && t.split(",").forEach((function(e) {
        return i.save(e);
      })), i;
    }, nr = function(e, t) {
      var i = Ei.createElementNS ? Ei.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Ei.createElement(e);
      return i && i.style ? i : Ei.createElement(e);
    }, sr = function e(t, i, r) {
      var n = getComputedStyle(t);
      return n[i] || n.getPropertyValue(i.replace(Fi, "-$1").toLowerCase()) || n.getPropertyValue(i) || !r && e(t, or(i) || i, 1) || "";
    }, ar = "O,Moz,ms,Ms,Webkit".split(","), or = function(e, t, i) {
      var r = (t || ki).style, n = 5;
      if (e in r && !i) {
        return e;
      }
      for (e = e.charAt(0).toUpperCase() + e.substr(1); n-- && !(ar[n] + e in r); ) {}
      return n < 0 ? null : (3 === n ? "ms" : n >= 0 ? ar[n] : "") + e;
    }, lr = function() {
      "undefined" != typeof window && window.document && (Si = window, Ei = Si.document, 
      Ci = Ei.documentElement, ki = nr("div") || {
        style: {}
      }, nr("div"), Zi = or(Zi), Ji = Zi + "Origin", ki.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", 
      Oi = !!or("perspective"), Pi = xi.core.reverting, Mi = 1);
    }, dr = function e(t) {
      var i, r = nr("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = this.parentNode, s = this.nextSibling, a = this.style.cssText;
      if (Ci.appendChild(r), r.appendChild(this), this.style.display = "block", t) {
        try {
          i = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = e;
        } catch (e) {}
      } else {
        this._gsapBBox && (i = this._gsapBBox());
      }
      return n && (s ? n.insertBefore(this, s) : n.appendChild(this)), Ci.removeChild(r), 
      this.style.cssText = a, i;
    }, ur = function(e, t) {
      for (var i = t.length; i--; ) {
        if (e.hasAttribute(t[i])) {
          return e.getAttribute(t[i]);
        }
      }
    }, cr = function(e) {
      var t;
      try {
        t = e.getBBox();
      } catch (i) {
        t = dr.call(e, !0);
      }
      return t && (t.width || t.height) || e.getBBox === dr || (t = dr.call(e, !0)), !t || t.width || t.x || t.y ? t : {
        x: +ur(e, [ "x", "cx", "x1" ]) || 0,
        y: +ur(e, [ "y", "cy", "y1" ]) || 0,
        width: 0,
        height: 0
      };
    }, pr = function(e) {
      return !(!e.getCTM || e.parentNode && !e.ownerSVGElement || !cr(e));
    }, hr = function(e, t) {
      if (t) {
        var i, r = e.style;
        t in Li && t !== Ji && (t = Zi), r.removeProperty ? ("ms" !== (i = t.substr(0, 2)) && "webkit" !== t.substr(0, 6) || (t = "-" + t), 
        r.removeProperty("--" === i ? t : t.replace(Fi, "-$1").toLowerCase())) : r.removeAttribute(t);
      }
    }, fr = function(e, t, i, r, n, s) {
      var a = new ui(e._pt, t, i, 0, 1, s ? Hi : ji);
      return e._pt = a, a.b = r, a.e = n, e._props.push(i), a;
    }, mr = {
      deg: 1,
      rad: 1,
      turn: 1
    }, gr = {
      grid: 1,
      flex: 1
    }, vr = function e(t, i, r, n) {
      var s, a, o, l, d = parseFloat(r) || 0, u = (r + "").trim().substr((d + "").length) || "px", c = ki.style, p = Ri.test(i), h = "svg" === t.tagName.toLowerCase(), f = (h ? "client" : "offset") + (p ? "Width" : "Height"), m = 100, g = "px" === n, v = "%" === n;
      if (n === u || !d || mr[n] || mr[u]) {
        return d;
      }
      if ("px" !== u && !g && (d = e(t, i, r, "px")), l = t.getCTM && pr(t), (v || "%" === u) && (Li[i] || ~i.indexOf("adius"))) {
        return s = l ? t.getBBox()[p ? "width" : "height"] : t[f], he(v ? d / s * m : d / 100 * s);
      }
      if (c[p ? "width" : "height"] = m + (g ? u : n), a = ~i.indexOf("adius") || "em" === n && t.appendChild && !h ? t : t.parentNode, 
      l && (a = (t.ownerSVGElement || {}).parentNode), a && a !== Ei && a.appendChild || (a = Ei.body), 
      (o = a._gsap) && v && o.width && p && o.time === St.time && !o.uncache) {
        return he(d / o.width * m);
      }
      if (!v || "height" !== i && "width" !== i) {
        (v || "%" === u) && !gr[sr(a, "display")] && (c.position = sr(t, "position")), a === t && (c.position = "static"), 
        a.appendChild(ki), s = ki[f], a.removeChild(ki), c.position = "absolute";
      } else {
        var _ = t.style[i];
        t.style[i] = m + n, s = t[f], _ ? t.style[i] = _ : hr(t, i);
      }
      return p && v && ((o = ue(a)).time = St.time, o.width = a[f]), he(g ? s * d / m : s && d ? m / s * d : 0);
    }, _r = function(e, t, i, r) {
      var n;
      return Mi || lr(), t in Gi && "transform" !== t && ~(t = Gi[t]).indexOf(",") && (t = t.split(",")[0]), 
      Li[t] && "transform" !== t ? (n = Ar(e, r), n = "transformOrigin" !== t ? n[t] : n.svg ? n.origin : Pr(sr(e, Ji)) + " " + n.zOrigin + "px") : (!(n = e.style[t]) || "auto" === n || r || ~(n + "").indexOf("calc(")) && (n = Tr[t] && Tr[t](e, t, i) || sr(e, t) || ce(e, t) || ("opacity" === t ? 1 : 0)), 
      i && !~(n + "").trim().indexOf(" ") ? vr(e, t, n, i) + i : n;
    }, yr = function(e, t, i, r) {
      if (!i || "none" === i) {
        var n = or(t, e, 1), s = n && sr(e, n, 1);
        s && s !== i ? (t = n, i = s) : "borderColor" === t && (i = sr(e, "borderTopColor"));
      }
      var a, o, l, d, u, c, p, h, f, m, g, v = new ui(this._pt, e.style, t, 0, 1, ni), y = 0, b = 0;
      if (v.b = i, v.e = r, i += "", "auto" === (r += "") && (c = e.style[t], e.style[t] = r, 
      r = sr(e, t) || r, c ? e.style[t] = c : hr(e, t)), xt(a = [ i, r ]), r = a[1], l = (i = a[0]).match(N) || [], 
      (r.match(N) || []).length) {
        for (;o = N.exec(r); ) {
          p = o[0], f = r.substring(y, o.index), u ? u = (u + 1) % 5 : "rgba(" !== f.substr(-5) && "hsla(" !== f.substr(-5) || (u = 1), 
          p !== (c = l[b++] || "") && (d = parseFloat(c) || 0, g = c.substr((d + "").length), 
          "=" === p.charAt(1) && (p = me(d, p) + g), h = parseFloat(p), m = p.substr((h + "").length), 
          y = N.lastIndex - m.length, m || (m = m || _.units[t] || g, y === r.length && (r += m, 
          v.e += m)), g !== m && (d = vr(e, t, c, m) || 0), v._pt = {
            _next: v._pt,
            p: f || 1 === b ? f : ",",
            s: d,
            c: h - d,
            m: u && u < 4 || "zIndex" === t ? Math.round : 0
          });
        }
        v.c = y < r.length ? r.substring(y, r.length) : "";
      } else {
        v.r = "display" === t && "none" === r ? Hi : ji;
      }
      return q.test(r) && (v.e = 0), this._pt = v, v;
    }, br = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%"
    }, wr = function(e, t) {
      if (t.tween && t.tween._time === t.tween._dur) {
        var i, r, n, s = t.t, a = s.style, o = t.u, l = s._gsap;
        if ("all" === o || !0 === o) {
          a.cssText = "", r = 1;
        } else {
          for (n = (o = o.split(",")).length; --n > -1; ) {
            i = o[n], Li[i] && (r = 1, i = "transformOrigin" === i ? Ji : Zi), hr(s, i);
          }
        }
        r && (hr(s, Zi), l && (l.svg && s.removeAttribute("transform"), Ar(s, 1), l.uncache = 1, 
        tr(a)));
      }
    }, Tr = {
      clearProps: function(e, t, i, r, n) {
        if ("isFromStart" !== n.data) {
          var s = e._pt = new ui(e._pt, t, i, 0, 0, wr);
          return s.u = r, s.pr = -10, s.tween = n, e._props.push(i), 1;
        }
      }
    }, xr = [ 1, 0, 0, 1, 0, 0 ], Sr = {}, Er = function(e) {
      return "matrix(1, 0, 0, 1, 0, 0)" === e || "none" === e || !e;
    }, Cr = function(e) {
      var t = sr(e, Zi);
      return Er(t) ? xr : t.substr(7).match(G).map(he);
    }, Mr = function(e, t) {
      var i, r, n, s, a = e._gsap || ue(e), o = e.style, l = Cr(e);
      return a.svg && e.getAttribute("transform") ? "1,0,0,1,0,0" === (l = [ (n = e.transform.baseVal.consolidate().matrix).a, n.b, n.c, n.d, n.e, n.f ]).join(",") ? xr : l : (l !== xr || e.offsetParent || e === Ci || a.svg || (n = o.display, 
      o.display = "block", (i = e.parentNode) && e.offsetParent || (s = 1, r = e.nextElementSibling, 
      Ci.appendChild(e)), l = Cr(e), n ? o.display = n : hr(e, "display"), s && (r ? i.insertBefore(e, r) : i ? i.appendChild(e) : Ci.removeChild(e))), 
      t && l.length > 6 ? [ l[0], l[1], l[4], l[5], l[12], l[13] ] : l);
    }, kr = function(e, t, i, r, n, s) {
      var a, o, l, d = e._gsap, u = n || Mr(e, !0), c = d.xOrigin || 0, p = d.yOrigin || 0, h = d.xOffset || 0, f = d.yOffset || 0, m = u[0], g = u[1], v = u[2], _ = u[3], y = u[4], b = u[5], w = t.split(" "), T = parseFloat(w[0]) || 0, x = parseFloat(w[1]) || 0;
      i ? u !== xr && (o = m * _ - g * v) && (l = T * (-g / o) + x * (m / o) - (m * b - g * y) / o, 
      T = T * (_ / o) + x * (-v / o) + (v * b - _ * y) / o, x = l) : (T = (a = cr(e)).x + (~w[0].indexOf("%") ? T / 100 * a.width : T), 
      x = a.y + (~(w[1] || w[0]).indexOf("%") ? x / 100 * a.height : x)), r || !1 !== r && d.smooth ? (y = T - c, 
      b = x - p, d.xOffset = h + (y * m + b * v) - y, d.yOffset = f + (y * g + b * _) - b) : d.xOffset = d.yOffset = 0, 
      d.xOrigin = T, d.yOrigin = x, d.smooth = !!r, d.origin = t, d.originIsAbsolute = !!i, 
      e.style[Ji] = "0px 0px", s && (fr(s, d, "xOrigin", c, T), fr(s, d, "yOrigin", p, x), 
      fr(s, d, "xOffset", h, d.xOffset), fr(s, d, "yOffset", f, d.yOffset)), e.setAttribute("data-svg-origin", T + " " + x);
    }, Ar = function(e, t) {
      var i = e._gsap || new Rt(e);
      if ("x" in i && !t && !i.uncache) {
        return i;
      }
      var r, n, s, a, o, l, d, u, c, p, h, f, m, g, v, y, b, w, T, x, S, E, C, M, k, A, P, O, L, I, z, D, F = e.style, R = i.scaleX < 0, B = "px", G = "deg", N = getComputedStyle(e), $ = sr(e, Ji) || "0";
      return r = n = s = l = d = u = c = p = h = 0, a = o = 1, i.svg = !(!e.getCTM || !pr(e)), 
      N.translate && ("none" === N.translate && "none" === N.scale && "none" === N.rotate || (F[Zi] = ("none" !== N.translate ? "translate3d(" + (N.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + ("none" !== N.rotate ? "rotate(" + N.rotate + ") " : "") + ("none" !== N.scale ? "scale(" + N.scale.split(" ").join(",") + ") " : "") + ("none" !== N[Zi] ? N[Zi] : "")), 
      F.scale = F.rotate = F.translate = "none"), g = Mr(e, i.svg), i.svg && (i.uncache ? (k = e.getBBox(), 
      $ = i.xOrigin - k.x + "px " + (i.yOrigin - k.y) + "px", M = "") : M = !t && e.getAttribute("data-svg-origin"), 
      kr(e, M || $, !!M || i.originIsAbsolute, !1 !== i.smooth, g)), f = i.xOrigin || 0, 
      m = i.yOrigin || 0, g !== xr && (w = g[0], T = g[1], x = g[2], S = g[3], r = E = g[4], 
      n = C = g[5], 6 === g.length ? (a = Math.sqrt(w * w + T * T), o = Math.sqrt(S * S + x * x), 
      l = w || T ? Di(T, w) * Ii : 0, (c = x || S ? Di(x, S) * Ii + l : 0) && (o *= Math.abs(Math.cos(c * zi))), 
      i.svg && (r -= f - (f * w + m * x), n -= m - (f * T + m * S))) : (D = g[6], I = g[7], 
      P = g[8], O = g[9], L = g[10], z = g[11], r = g[12], n = g[13], s = g[14], d = (v = Di(D, L)) * Ii, 
      v && (M = E * (y = Math.cos(-v)) + P * (b = Math.sin(-v)), k = C * y + O * b, A = D * y + L * b, 
      P = E * -b + P * y, O = C * -b + O * y, L = D * -b + L * y, z = I * -b + z * y, 
      E = M, C = k, D = A), u = (v = Di(-x, L)) * Ii, v && (y = Math.cos(-v), z = S * (b = Math.sin(-v)) + z * y, 
      w = M = w * y - P * b, T = k = T * y - O * b, x = A = x * y - L * b), l = (v = Di(T, w)) * Ii, 
      v && (M = w * (y = Math.cos(v)) + T * (b = Math.sin(v)), k = E * y + C * b, T = T * y - w * b, 
      C = C * y - E * b, w = M, E = k), d && Math.abs(d) + Math.abs(l) > 359.9 && (d = l = 0, 
      u = 180 - u), a = he(Math.sqrt(w * w + T * T + x * x)), o = he(Math.sqrt(C * C + D * D)), 
      v = Di(E, C), c = Math.abs(v) > 2e-4 ? v * Ii : 0, h = z ? 1 / (z < 0 ? -z : z) : 0), 
      i.svg && (M = e.getAttribute("transform"), i.forceCSS = e.setAttribute("transform", "") || !Er(sr(e, Zi)), 
      M && e.setAttribute("transform", M))), Math.abs(c) > 90 && Math.abs(c) < 270 && (R ? (a *= -1, 
      c += l <= 0 ? 180 : -180, l += l <= 0 ? 180 : -180) : (o *= -1, c += c <= 0 ? 180 : -180)), 
      t = t || i.uncache, i.x = r - ((i.xPercent = r && (!t && i.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-r) ? -50 : 0))) ? e.offsetWidth * i.xPercent / 100 : 0) + B, 
      i.y = n - ((i.yPercent = n && (!t && i.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-n) ? -50 : 0))) ? e.offsetHeight * i.yPercent / 100 : 0) + B, 
      i.z = s + B, i.scaleX = he(a), i.scaleY = he(o), i.rotation = he(l) + G, i.rotationX = he(d) + G, 
      i.rotationY = he(u) + G, i.skewX = c + G, i.skewY = p + G, i.transformPerspective = h + B, 
      (i.zOrigin = parseFloat($.split(" ")[2]) || !t && i.zOrigin || 0) && (F[Ji] = Pr($)), 
      i.xOffset = i.yOffset = 0, i.force3D = _.force3D, i.renderTransform = i.svg ? Rr : Oi ? Fr : Lr, 
      i.uncache = 0, i;
    }, Pr = function(e) {
      return (e = e.split(" "))[0] + " " + e[1];
    }, Or = function(e, t, i) {
      var r = Qe(t);
      return he(parseFloat(t) + parseFloat(vr(e, "x", i + "px", r))) + r;
    }, Lr = function(e, t) {
      t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, Fr(e, t);
    }, Ir = "0deg", zr = "0px", Dr = ") ", Fr = function(e, t) {
      var i = t || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, o = i.z, l = i.rotation, d = i.rotationY, u = i.rotationX, c = i.skewX, p = i.skewY, h = i.scaleX, f = i.scaleY, m = i.transformPerspective, g = i.force3D, v = i.target, _ = i.zOrigin, y = "", b = "auto" === g && e && 1 !== e || !0 === g;
      if (_ && (u !== Ir || d !== Ir)) {
        var w, T = parseFloat(d) * zi, x = Math.sin(T), S = Math.cos(T);
        T = parseFloat(u) * zi, w = Math.cos(T), s = Or(v, s, x * w * -_), a = Or(v, a, -Math.sin(T) * -_), 
        o = Or(v, o, S * w * -_ + _);
      }
      m !== zr && (y += "perspective(" + m + Dr), (r || n) && (y += "translate(" + r + "%, " + n + "%) "), 
      (b || s !== zr || a !== zr || o !== zr) && (y += o !== zr || b ? "translate3d(" + s + ", " + a + ", " + o + ") " : "translate(" + s + ", " + a + Dr), 
      l !== Ir && (y += "rotate(" + l + Dr), d !== Ir && (y += "rotateY(" + d + Dr), u !== Ir && (y += "rotateX(" + u + Dr), 
      c === Ir && p === Ir || (y += "skew(" + c + ", " + p + Dr), 1 === h && 1 === f || (y += "scale(" + h + ", " + f + Dr), 
      v.style[Zi] = y || "translate(0, 0)";
    }, Rr = function(e, t) {
      var i, r, n, s, a, o = t || this, l = o.xPercent, d = o.yPercent, u = o.x, c = o.y, p = o.rotation, h = o.skewX, f = o.skewY, m = o.scaleX, g = o.scaleY, v = o.target, _ = o.xOrigin, y = o.yOrigin, b = o.xOffset, w = o.yOffset, T = o.forceCSS, x = parseFloat(u), S = parseFloat(c);
      p = parseFloat(p), h = parseFloat(h), (f = parseFloat(f)) && (h += f = parseFloat(f), 
      p += f), p || h ? (p *= zi, h *= zi, i = Math.cos(p) * m, r = Math.sin(p) * m, n = Math.sin(p - h) * -g, 
      s = Math.cos(p - h) * g, h && (f *= zi, a = Math.tan(h - f), n *= a = Math.sqrt(1 + a * a), 
      s *= a, f && (a = Math.tan(f), i *= a = Math.sqrt(1 + a * a), r *= a)), i = he(i), 
      r = he(r), n = he(n), s = he(s)) : (i = m, s = g, r = n = 0), (x && !~(u + "").indexOf("px") || S && !~(c + "").indexOf("px")) && (x = vr(v, "x", u, "px"), 
      S = vr(v, "y", c, "px")), (_ || y || b || w) && (x = he(x + _ - (_ * i + y * n) + b), 
      S = he(S + y - (_ * r + y * s) + w)), (l || d) && (a = v.getBBox(), x = he(x + l / 100 * a.width), 
      S = he(S + d / 100 * a.height)), a = "matrix(" + i + "," + r + "," + n + "," + s + "," + x + "," + S + ")", 
      v.setAttribute("transform", a), T && (v.style[Zi] = a);
    }, Br = function(e, t, i, r, n) {
      var s, a, o = 360, l = k(n), d = parseFloat(n) * (l && ~n.indexOf("rad") ? Ii : 1) - r, u = r + d + "deg";
      return l && ("short" === (s = n.split("_")[1]) && (d %= o) !== d % 180 && (d += d < 0 ? o : -360), 
      "cw" === s && d < 0 ? d = (d + 36e9) % o - ~~(d / o) * o : "ccw" === s && d > 0 && (d = (d - 36e9) % o - ~~(d / o) * o)), 
      e._pt = a = new ui(e._pt, t, i, r, d, $i), a.e = u, a.u = "deg", e._props.push(i), 
      a;
    }, Gr = function(e, t) {
      for (var i in t) {
        e[i] = t[i];
      }
      return e;
    }, Nr = function(e, t, i) {
      var r, n, s, a, o, l, d, u = Gr({}, i._gsap), c = i.style;
      for (n in u.svg ? (s = i.getAttribute("transform"), i.setAttribute("transform", ""), 
      c[Zi] = t, r = Ar(i, 1), hr(i, Zi), i.setAttribute("transform", s)) : (s = getComputedStyle(i)[Zi], 
      c[Zi] = t, r = Ar(i, 1), c[Zi] = s), Li) {
        (s = u[n]) !== (a = r[n]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) < 0 && (o = Qe(s) !== (d = Qe(a)) ? vr(i, n, s, d) : parseFloat(s), 
        l = parseFloat(a), e._pt = new ui(e._pt, r, n, o, l - o, Ni), e._pt.u = d || 0, 
        e._props.push(n));
      }
      Gr(r, u);
    };
    pe("padding,margin,Width,Radius", (function(e, t) {
      var i = "Top", r = "Right", n = "Bottom", s = "Left", a = (t < 3 ? [ i, r, n, s ] : [ i + s, i + r, n + r, n + s ]).map((function(i) {
        return t < 2 ? e + i : "border" + i + e;
      }));
      Tr[t > 1 ? "border" + e : e] = function(e, t, i, r, n) {
        var s, o;
        if (arguments.length < 4) {
          return s = a.map((function(t) {
            return _r(e, t, i);
          })), 5 === (o = s.join(" ")).split(s[0]).length ? s[0] : o;
        }
        s = (r + "").split(" "), o = {}, a.forEach((function(e, t) {
          return o[e] = s[t] = s[t] || s[(t - 1) / 2 | 0];
        })), e.init(t, o, n);
      };
    }));
    var $r, qr, Vr, jr = {
      name: "css",
      register: lr,
      targetTest: function(e) {
        return e.style && e.nodeType;
      },
      init: function(e, t, i, r, n) {
        var s, a, o, l, d, u, c, p, h, f, m, g, v, y, b, w, T, x, S, E, C = this._props, M = e.style, A = i.vars.startAt;
        for (c in Mi || lr(), this.styles = this.styles || rr(e), w = this.styles.props, 
        this.tween = i, t) {
          if ("autoRound" !== c && (a = t[c], !ne[c] || !jt(c, t, i, r, e, n))) {
            if (d = typeof a, u = Tr[c], "function" === d && (d = typeof (a = a.call(i, r, e, n))), 
            "string" === d && ~a.indexOf("random(") && (a = lt(a)), u) {
              u(this, e, c, a, i) && (b = 1);
            } else if ("--" === c.substr(0, 2)) {
              s = (getComputedStyle(e).getPropertyValue(c) + "").trim(), a += "", wt.lastIndex = 0, 
              wt.test(s) || (p = Qe(s), h = Qe(a)), h ? p !== h && (s = vr(e, c, s, h) + h) : p && (a += p), 
              this.add(M, "setProperty", s, a, r, n, 0, 0, c), C.push(c), w.push(c, 0, M[c]);
            } else if ("undefined" !== d) {
              if (A && c in A ? (s = "function" == typeof A[c] ? A[c].call(i, r, e, n) : A[c], 
              k(s) && ~s.indexOf("random(") && (s = lt(s)), Qe(s + "") || "auto" === s || (s += _.units[c] || Qe(_r(e, c)) || ""), 
              "=" === (s + "").charAt(1) && (s = _r(e, c))) : s = _r(e, c), l = parseFloat(s), 
              (f = "string" === d && "=" === a.charAt(1) && a.substr(0, 2)) && (a = a.substr(2)), 
              o = parseFloat(a), c in Gi && ("autoAlpha" === c && (1 === l && "hidden" === _r(e, "visibility") && o && (l = 0), 
              w.push("visibility", 0, M.visibility), fr(this, M, "visibility", l ? "inherit" : "hidden", o ? "inherit" : "hidden", !o)), 
              "scale" !== c && "transform" !== c && ~(c = Gi[c]).indexOf(",") && (c = c.split(",")[0])), 
              m = c in Li) {
                if (this.styles.save(c), g || ((v = e._gsap).renderTransform && !t.parseTransform || Ar(e, t.parseTransform), 
                y = !1 !== t.smoothOrigin && v.smooth, (g = this._pt = new ui(this._pt, M, Zi, 0, 1, v.renderTransform, v, 0, -1)).dep = 1), 
                "scale" === c) {
                  this._pt = new ui(this._pt, v, "scaleY", v.scaleY, (f ? me(v.scaleY, f + o) : o) - v.scaleY || 0, Ni), 
                  this._pt.u = 0, C.push("scaleY", c), c += "X";
                } else {
                  if ("transformOrigin" === c) {
                    w.push(Ji, 0, M[Ji]), x = void 0, S = void 0, E = void 0, x = (T = a).split(" "), 
                    S = x[0], E = x[1] || "50%", "top" !== S && "bottom" !== S && "left" !== E && "right" !== E || (T = S, 
                    S = E, E = T), x[0] = br[S] || S, x[1] = br[E] || E, a = x.join(" "), v.svg ? kr(e, a, 0, y, 0, this) : ((h = parseFloat(a.split(" ")[2]) || 0) !== v.zOrigin && fr(this, v, "zOrigin", v.zOrigin, h), 
                    fr(this, M, c, Pr(s), Pr(a)));
                    continue;
                  }
                  if ("svgOrigin" === c) {
                    kr(e, a, 1, y, 0, this);
                    continue;
                  }
                  if (c in Sr) {
                    Br(this, v, c, l, f ? me(l, f + a) : a);
                    continue;
                  }
                  if ("smoothOrigin" === c) {
                    fr(this, v, "smooth", v.smooth, a);
                    continue;
                  }
                  if ("force3D" === c) {
                    v[c] = a;
                    continue;
                  }
                  if ("transform" === c) {
                    Nr(this, a, e);
                    continue;
                  }
                }
              } else {
                c in M || (c = or(c) || c);
              }
              if (m || (o || 0 === o) && (l || 0 === l) && !Bi.test(a) && c in M) {
                o || (o = 0), (p = (s + "").substr((l + "").length)) !== (h = Qe(a) || (c in _.units ? _.units[c] : p)) && (l = vr(e, c, s, h)), 
                this._pt = new ui(this._pt, m ? v : M, c, l, (f ? me(l, f + o) : o) - l, m || "px" !== h && "zIndex" !== c || !1 === t.autoRound ? Ni : Vi), 
                this._pt.u = h || 0, p !== h && "%" !== h && (this._pt.b = s, this._pt.r = qi);
              } else if (c in M) {
                yr.call(this, e, c, s, f ? f + a : a);
              } else if (c in e) {
                this.add(e, c, s || e[c], f ? f + a : a, r, n);
              } else if ("parseTransform" !== c) {
                W(c, a);
                continue;
              }
              m || (c in M ? w.push(c, 0, M[c]) : w.push(c, 1, s || e[c])), C.push(c);
            }
          }
        }
        b && di(this);
      },
      render: function(e, t) {
        if (t.tween._time || !Pi()) {
          for (var i = t._pt; i; ) {
            i.r(e, i.d), i = i._next;
          }
        } else {
          t.styles.revert();
        }
      },
      get: _r,
      aliases: Gi,
      getSetter: function(e, t, i) {
        var r = Gi[t];
        return r && r.indexOf(",") < 0 && (t = r), t in Li && t !== Ji && (e._gsap.x || _r(e, "x")) ? i && Ai === i ? "scale" === t ? Ui : Wi : (Ai = i || {}) && ("scale" === t ? Qi : Ki) : e.style && !O(e.style[t]) ? Yi : ~t.indexOf("-") ? Xi : ti(e, t);
      },
      core: {
        _removeProperty: hr,
        _getMatrix: Mr
      }
    };
    xi.utils.checkPrefix = or, xi.core.getStyleSaver = rr, Vr = pe(($r = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") + "," + (qr = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", (function(e) {
      Li[e] = 1;
    })), pe(qr, (function(e) {
      _.units[e] = "deg", Sr[e] = 1;
    })), Gi[Vr[13]] = $r + "," + qr, pe("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", (function(e) {
      var t = e.split(":");
      Gi[t[1]] = Vr[t[0]];
    })), pe("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function(e) {
      _.units[e] = "px";
    })), xi.registerPlugin(jr);
    var Hr = xi.registerPlugin(jr) || xi;
    Hr.core.Tween;
    const Yr = async e => {
      const t = Xr.querySelector(`${e.target.dataset.anchor}`);
      e.preventDefault(), await Zr(), t.scrollIntoView({
        behavior: "smooth"
      });
    }, Xr = document.querySelector("body"), Wr = Xr.querySelector(".header"), Ur = Wr.querySelector(".header-left__btn"), Qr = Array.from(Wr.querySelectorAll(".js-anchor")), Kr = Hr.timeline({
      paused: !0
    }).fromTo(Wr.querySelector(".menu"), {
      autoAlpha: 0
    }, {
      autoAlpha: 1
    }).fromTo(Wr.querySelector(".menu__figure"), {
      x: "20%",
      autoAlpha: 0
    }, {
      x: 0,
      autoAlpha: 1
    }).fromTo(Wr.querySelector(".menu-contetnt__wrap"), {
      y: "5%",
      autoAlpha: 0
    }, {
      y: 0,
      autoAlpha: 1,
      duration: .5,
      onComplete: () => {}
    }, "<"), Zr = async () => {
      Ur.classList.remove("menu-icon--active"), await Kr.reverse(), Wr.classList.remove("header--menu-active"), 
      Xr.classList.remove("scroll-lock"), Qr.forEach((e => {
        e.removeEventListener("click", Yr);
      }));
    }, Jr = () => {
      0 === Kr.progress() ? (async () => {
        Ur.classList.add("menu-icon--active"), Wr.classList.add("header--menu-active"), 
        await Kr.play(), Xr.classList.add("scroll-lock"), Qr.forEach((e => {
          e.addEventListener("click", Yr);
        }));
      })() : Zr();
    };
    let en = window.scrollY;
    const tn = () => {
      const e = window.scrollY, t = e > en ? "down" : "up";
      "" !== t && (e - en > 10 || e - en < -10) && ("down" === t ? Wr.classList.add("header--down") : Wr.classList.remove("header--down")), 
      en = e > 0 ? e : 0;
    };
    function rn(e) {
      return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object;
    }
    function nn(e, t) {
      void 0 === e && (e = {}), void 0 === t && (t = {}), Object.keys(t).forEach((i => {
        void 0 === e[i] ? e[i] = t[i] : rn(t[i]) && rn(e[i]) && Object.keys(t[i]).length > 0 && nn(e[i], t[i]);
      }));
    }
    const sn = {
      body: {},
      addEventListener() {},
      removeEventListener() {},
      activeElement: {
        blur() {},
        nodeName: ""
      },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({
        initEvent() {}
      }),
      createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => []
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
      }
    };
    function an() {
      const e = "undefined" != typeof document ? document : {};
      return nn(e, sn), e;
    }
    const on = {
      document: sn,
      navigator: {
        userAgent: ""
      },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
      },
      history: {
        replaceState() {},
        pushState() {},
        go() {},
        back() {}
      },
      CustomEvent: function() {
        return this;
      },
      addEventListener() {},
      removeEventListener() {},
      getComputedStyle: () => ({
        getPropertyValue: () => ""
      }),
      Image() {},
      Date() {},
      screen: {},
      setTimeout() {},
      clearTimeout() {},
      matchMedia: () => ({}),
      requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
      cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e);
      }
    };
    function ln() {
      const e = "undefined" != typeof window ? window : {};
      return nn(e, on), e;
    }
    function dn(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t);
    }
    function un() {
      return Date.now();
    }
    function cn(e, t) {
      void 0 === t && (t = "x");
      const i = ln();
      let r, n, s;
      const a = function(e) {
        const t = ln();
        let i;
        return t.getComputedStyle && (i = t.getComputedStyle(e, null)), !i && e.currentStyle && (i = e.currentStyle), 
        i || (i = e.style), i;
      }(e);
      return i.WebKitCSSMatrix ? (n = a.transform || a.webkitTransform, n.split(",").length > 6 && (n = n.split(", ").map((e => e.replace(",", "."))).join(", ")), 
      s = new i.WebKitCSSMatrix("none" === n ? "" : n)) : (s = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), 
      r = s.toString().split(",")), "x" === t && (n = i.WebKitCSSMatrix ? s.m41 : 16 === r.length ? parseFloat(r[12]) : parseFloat(r[4])), 
      "y" === t && (n = i.WebKitCSSMatrix ? s.m42 : 16 === r.length ? parseFloat(r[13]) : parseFloat(r[5])), 
      n || 0;
    }
    function pn(e) {
      return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1);
    }
    function hn() {
      const e = Object(arguments.length <= 0 ? void 0 : arguments[0]), t = [ "__proto__", "constructor", "prototype" ];
      for (let r = 1; r < arguments.length; r += 1) {
        const n = r < 0 || arguments.length <= r ? void 0 : arguments[r];
        if (null != n && (i = n, !("undefined" != typeof window && void 0 !== window.HTMLElement ? i instanceof HTMLElement : i && (1 === i.nodeType || 11 === i.nodeType)))) {
          const i = Object.keys(Object(n)).filter((e => t.indexOf(e) < 0));
          for (let t = 0, r = i.length; t < r; t += 1) {
            const r = i[t], s = Object.getOwnPropertyDescriptor(n, r);
            void 0 !== s && s.enumerable && (pn(e[r]) && pn(n[r]) ? n[r].__swiper__ ? e[r] = n[r] : hn(e[r], n[r]) : !pn(e[r]) && pn(n[r]) ? (e[r] = {}, 
            n[r].__swiper__ ? e[r] = n[r] : hn(e[r], n[r])) : e[r] = n[r]);
          }
        }
      }
      var i;
      return e;
    }
    function fn(e, t, i) {
      e.style.setProperty(t, i);
    }
    function mn(e) {
      let {swiper: t, targetPosition: i, side: r} = e;
      const n = ln(), s = -t.translate;
      let a, o = null;
      const l = t.params.speed;
      t.wrapperEl.style.scrollSnapType = "none", n.cancelAnimationFrame(t.cssModeFrameID);
      const d = i > s ? "next" : "prev", u = (e, t) => "next" === d && e >= t || "prev" === d && e <= t, c = () => {
        a = (new Date).getTime(), null === o && (o = a);
        const e = Math.max(Math.min((a - o) / l, 1), 0), d = .5 - Math.cos(e * Math.PI) / 2;
        let p = s + d * (i - s);
        if (u(p, i) && (p = i), t.wrapperEl.scrollTo({
          [r]: p
        }), u(p, i)) {
          return t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", 
          setTimeout((() => {
            t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({
              [r]: p
            });
          })), void n.cancelAnimationFrame(t.cssModeFrameID);
        }
        t.cssModeFrameID = n.requestAnimationFrame(c);
      };
      c();
    }
    function gn(e, t) {
      return void 0 === t && (t = ""), [ ...e.children ].filter((e => e.matches(t)));
    }
    function vn(e) {
      try {
        return void console.warn(e);
      } catch (e) {}
    }
    function _n(e, t) {
      void 0 === t && (t = []);
      const i = document.createElement(e);
      return i.classList.add(...Array.isArray(t) ? t : function(e) {
        return void 0 === e && (e = ""), e.trim().split(" ").filter((e => !!e.trim()));
      }(t)), i;
    }
    function yn(e, t) {
      return ln().getComputedStyle(e, null).getPropertyValue(t);
    }
    function bn(e) {
      let t, i = e;
      if (i) {
        for (t = 0; null !== (i = i.previousSibling); ) {
          1 === i.nodeType && (t += 1);
        }
        return t;
      }
    }
    function wn(e, t) {
      const i = [];
      let r = e.parentElement;
      for (;r; ) {
        t ? r.matches(t) && i.push(r) : i.push(r), r = r.parentElement;
      }
      return i;
    }
    function Tn(e, t, i) {
      const r = ln();
      return i ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(r.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(r.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth;
    }
    function xn(e) {
      return (Array.isArray(e) ? e : [ e ]).filter((e => !!e));
    }
    let Sn, En, Cn;
    function Mn() {
      return Sn || (Sn = function() {
        const e = ln(), t = an();
        return {
          smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style,
          touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
        };
      }()), Sn;
    }
    function kn(e) {
      return void 0 === e && (e = {}), En || (En = function(e) {
        let {userAgent: t} = void 0 === e ? {} : e;
        const i = Mn(), r = ln(), n = r.navigator.platform, s = t || r.navigator.userAgent, a = {
          ios: !1,
          android: !1
        }, o = r.screen.width, l = r.screen.height, d = s.match(/(Android);?[\s\/]+([\d.]+)?/);
        let u = s.match(/(iPad).*OS\s([\d_]+)/);
        const c = s.match(/(iPod)(.*OS\s([\d_]+))?/), p = !u && s.match(/(iPhone\sOS|iOS)\s([\d_]+)/), h = "Win32" === n;
        let f = "MacIntel" === n;
        return !u && f && i.touch && [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ].indexOf(`${o}x${l}`) >= 0 && (u = s.match(/(Version)\/([\d.]+)/), 
        u || (u = [ 0, 1, "13_0_0" ]), f = !1), d && !h && (a.os = "android", a.android = !0), 
        (u || p || c) && (a.os = "ios", a.ios = !0), a;
      }(e)), En;
    }
    function An() {
      return Cn || (Cn = function() {
        const e = ln(), t = kn();
        let i = !1;
        function r() {
          const t = e.navigator.userAgent.toLowerCase();
          return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0;
        }
        if (r()) {
          const t = String(e.navigator.userAgent);
          if (t.includes("Version/")) {
            const [e, r] = t.split("Version/")[1].split(" ")[0].split(".").map((e => Number(e)));
            i = e < 16 || 16 === e && r < 2;
          }
        }
        const n = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent), s = r();
        return {
          isSafari: i || s,
          needPerspectiveFix: i,
          need3dFix: s || n && t.ios,
          isWebView: n
        };
      }()), Cn;
    }
    var Pn = {
      on(e, t, i) {
        const r = this;
        if (!r.eventsListeners || r.destroyed) {
          return r;
        }
        if ("function" != typeof t) {
          return r;
        }
        const n = i ? "unshift" : "push";
        return e.split(" ").forEach((e => {
          r.eventsListeners[e] || (r.eventsListeners[e] = []), r.eventsListeners[e][n](t);
        })), r;
      },
      once(e, t, i) {
        const r = this;
        if (!r.eventsListeners || r.destroyed) {
          return r;
        }
        if ("function" != typeof t) {
          return r;
        }
        function n() {
          r.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
          for (var i = arguments.length, s = new Array(i), a = 0; a < i; a++) {
            s[a] = arguments[a];
          }
          t.apply(r, s);
        }
        return n.__emitterProxy = t, r.on(e, n, i);
      },
      onAny(e, t) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) {
          return i;
        }
        if ("function" != typeof e) {
          return i;
        }
        const r = t ? "unshift" : "push";
        return i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[r](e), i;
      },
      offAny(e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed) {
          return t;
        }
        if (!t.eventsAnyListeners) {
          return t;
        }
        const i = t.eventsAnyListeners.indexOf(e);
        return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
      },
      off(e, t) {
        const i = this;
        return !i.eventsListeners || i.destroyed ? i : i.eventsListeners ? (e.split(" ").forEach((e => {
          void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].forEach(((r, n) => {
            (r === t || r.__emitterProxy && r.__emitterProxy === t) && i.eventsListeners[e].splice(n, 1);
          }));
        })), i) : i;
      },
      emit() {
        const e = this;
        if (!e.eventsListeners || e.destroyed) {
          return e;
        }
        if (!e.eventsListeners) {
          return e;
        }
        let t, i, r;
        for (var n = arguments.length, s = new Array(n), a = 0; a < n; a++) {
          s[a] = arguments[a];
        }
        "string" == typeof s[0] || Array.isArray(s[0]) ? (t = s[0], i = s.slice(1, s.length), 
        r = e) : (t = s[0].events, i = s[0].data, r = s[0].context || e), i.unshift(r);
        return (Array.isArray(t) ? t : t.split(" ")).forEach((t => {
          e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e => {
            e.apply(r, [ t, ...i ]);
          })), e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((e => {
            e.apply(r, i);
          }));
        })), e;
      }
    };
    const On = (e, t) => {
      if (!e || e.destroyed || !e.params) {
        return;
      }
      const i = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
      if (i) {
        let t = i.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t && e.isElement && (i.shadowRoot ? t = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame((() => {
          i.shadowRoot && (t = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`), 
          t && t.remove());
        }))), t && t.remove();
      }
    }, Ln = (e, t) => {
      if (!e.slides[t]) {
        return;
      }
      const i = e.slides[t].querySelector('[loading="lazy"]');
      i && i.removeAttribute("loading");
    }, In = e => {
      if (!e || e.destroyed || !e.params) {
        return;
      }
      let t = e.params.lazyPreloadPrevNext;
      const i = e.slides.length;
      if (!i || !t || t < 0) {
        return;
      }
      t = Math.min(t, i);
      const r = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), n = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const i = n, s = [ i - t ];
        return s.push(...Array.from({
          length: t
        }).map(((e, t) => i + r + t))), void e.slides.forEach(((t, i) => {
          s.includes(t.column) && Ln(e, i);
        }));
      }
      const s = n + r - 1;
      if (e.params.rewind || e.params.loop) {
        for (let r = n - t; r <= s + t; r += 1) {
          const t = (r % i + i) % i;
          (t < n || t > s) && Ln(e, t);
        }
      } else {
        for (let r = Math.max(n - t, 0); r <= Math.min(s + t, i - 1); r += 1) {
          r !== n && (r > s || r < n) && Ln(e, r);
        }
      }
    };
    var zn = {
      updateSize: function() {
        const e = this;
        let t, i;
        const r = e.el;
        t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : r.clientWidth, 
        i = void 0 !== e.params.height && null !== e.params.height ? e.params.height : r.clientHeight, 
        0 === t && e.isHorizontal() || 0 === i && e.isVertical() || (t = t - parseInt(yn(r, "padding-left") || 0, 10) - parseInt(yn(r, "padding-right") || 0, 10), 
        i = i - parseInt(yn(r, "padding-top") || 0, 10) - parseInt(yn(r, "padding-bottom") || 0, 10), 
        Number.isNaN(t) && (t = 0), Number.isNaN(i) && (i = 0), Object.assign(e, {
          width: t,
          height: i,
          size: e.isHorizontal() ? t : i
        }));
      },
      updateSlides: function() {
        const e = this;
        function t(t, i) {
          return parseFloat(t.getPropertyValue(e.getDirectionLabel(i)) || 0);
        }
        const i = e.params, {wrapperEl: r, slidesEl: n, size: s, rtlTranslate: a, wrongRTL: o} = e, l = e.virtual && i.virtual.enabled, d = l ? e.virtual.slides.length : e.slides.length, u = gn(n, `.${e.params.slideClass}, swiper-slide`), c = l ? e.virtual.slides.length : u.length;
        let p = [];
        const h = [], f = [];
        let m = i.slidesOffsetBefore;
        "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
        let g = i.slidesOffsetAfter;
        "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
        const v = e.snapGrid.length, _ = e.slidesGrid.length;
        let y = i.spaceBetween, b = -m, w = 0, T = 0;
        if (void 0 === s) {
          return;
        }
        "string" == typeof y && y.indexOf("%") >= 0 ? y = parseFloat(y.replace("%", "")) / 100 * s : "string" == typeof y && (y = parseFloat(y)), 
        e.virtualSize = -y, u.forEach((e => {
          a ? e.style.marginLeft = "" : e.style.marginRight = "", e.style.marginBottom = "", 
          e.style.marginTop = "";
        })), i.centeredSlides && i.cssMode && (fn(r, "--swiper-centered-offset-before", ""), 
        fn(r, "--swiper-centered-offset-after", ""));
        const x = i.grid && i.grid.rows > 1 && e.grid;
        let S;
        x ? e.grid.initSlides(u) : e.grid && e.grid.unsetSlides();
        const E = "auto" === i.slidesPerView && i.breakpoints && Object.keys(i.breakpoints).filter((e => void 0 !== i.breakpoints[e].slidesPerView)).length > 0;
        for (let r = 0; r < c; r += 1) {
          let n;
          if (S = 0, u[r] && (n = u[r]), x && e.grid.updateSlide(r, n, u), !u[r] || "none" !== yn(n, "display")) {
            if ("auto" === i.slidesPerView) {
              E && (u[r].style[e.getDirectionLabel("width")] = "");
              const s = getComputedStyle(n), a = n.style.transform, o = n.style.webkitTransform;
              if (a && (n.style.transform = "none"), o && (n.style.webkitTransform = "none"), 
              i.roundLengths) {
                S = e.isHorizontal() ? Tn(n, "width", !0) : Tn(n, "height", !0);
              } else {
                const e = t(s, "width"), i = t(s, "padding-left"), r = t(s, "padding-right"), a = t(s, "margin-left"), o = t(s, "margin-right"), l = s.getPropertyValue("box-sizing");
                if (l && "border-box" === l) {
                  S = e + a + o;
                } else {
                  const {clientWidth: t, offsetWidth: s} = n;
                  S = e + i + r + a + o + (s - t);
                }
              }
              a && (n.style.transform = a), o && (n.style.webkitTransform = o), i.roundLengths && (S = Math.floor(S));
            } else {
              S = (s - (i.slidesPerView - 1) * y) / i.slidesPerView, i.roundLengths && (S = Math.floor(S)), 
              u[r] && (u[r].style[e.getDirectionLabel("width")] = `${S}px`);
            }
            u[r] && (u[r].swiperSlideSize = S), f.push(S), i.centeredSlides ? (b = b + S / 2 + w / 2 + y, 
            0 === w && 0 !== r && (b = b - s / 2 - y), 0 === r && (b = b - s / 2 - y), Math.abs(b) < .001 && (b = 0), 
            i.roundLengths && (b = Math.floor(b)), T % i.slidesPerGroup == 0 && p.push(b), h.push(b)) : (i.roundLengths && (b = Math.floor(b)), 
            (T - Math.min(e.params.slidesPerGroupSkip, T)) % e.params.slidesPerGroup == 0 && p.push(b), 
            h.push(b), b = b + S + y), e.virtualSize += S + y, w = S, T += 1;
          }
        }
        if (e.virtualSize = Math.max(e.virtualSize, s) + g, a && o && ("slide" === i.effect || "coverflow" === i.effect) && (r.style.width = `${e.virtualSize + y}px`), 
        i.setWrapperSize && (r.style[e.getDirectionLabel("width")] = `${e.virtualSize + y}px`), 
        x && e.grid.updateWrapperSize(S, p), !i.centeredSlides) {
          const t = [];
          for (let r = 0; r < p.length; r += 1) {
            let n = p[r];
            i.roundLengths && (n = Math.floor(n)), p[r] <= e.virtualSize - s && t.push(n);
          }
          p = t, Math.floor(e.virtualSize - s) - Math.floor(p[p.length - 1]) > 1 && p.push(e.virtualSize - s);
        }
        if (l && i.loop) {
          const t = f[0] + y;
          if (i.slidesPerGroup > 1) {
            const r = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / i.slidesPerGroup), n = t * i.slidesPerGroup;
            for (let e = 0; e < r; e += 1) {
              p.push(p[p.length - 1] + n);
            }
          }
          for (let r = 0; r < e.virtual.slidesBefore + e.virtual.slidesAfter; r += 1) {
            1 === i.slidesPerGroup && p.push(p[p.length - 1] + t), h.push(h[h.length - 1] + t), 
            e.virtualSize += t;
          }
        }
        if (0 === p.length && (p = [ 0 ]), 0 !== y) {
          const t = e.isHorizontal() && a ? "marginLeft" : e.getDirectionLabel("marginRight");
          u.filter(((e, t) => !(i.cssMode && !i.loop) || t !== u.length - 1)).forEach((e => {
            e.style[t] = `${y}px`;
          }));
        }
        if (i.centeredSlides && i.centeredSlidesBounds) {
          let e = 0;
          f.forEach((t => {
            e += t + (y || 0);
          })), e -= y;
          const t = e - s;
          p = p.map((e => e <= 0 ? -m : e > t ? t + g : e));
        }
        if (i.centerInsufficientSlides) {
          let e = 0;
          if (f.forEach((t => {
            e += t + (y || 0);
          })), e -= y, e < s) {
            const t = (s - e) / 2;
            p.forEach(((e, i) => {
              p[i] = e - t;
            })), h.forEach(((e, i) => {
              h[i] = e + t;
            }));
          }
        }
        if (Object.assign(e, {
          slides: u,
          snapGrid: p,
          slidesGrid: h,
          slidesSizesGrid: f
        }), i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
          fn(r, "--swiper-centered-offset-before", -p[0] + "px"), fn(r, "--swiper-centered-offset-after", e.size / 2 - f[f.length - 1] / 2 + "px");
          const t = -e.snapGrid[0], i = -e.slidesGrid[0];
          e.snapGrid = e.snapGrid.map((e => e + t)), e.slidesGrid = e.slidesGrid.map((e => e + i));
        }
        if (c !== d && e.emit("slidesLengthChange"), p.length !== v && (e.params.watchOverflow && e.checkOverflow(), 
        e.emit("snapGridLengthChange")), h.length !== _ && e.emit("slidesGridLengthChange"), 
        i.watchSlidesProgress && e.updateSlidesOffset(), e.emit("slidesUpdated"), !(l || i.cssMode || "slide" !== i.effect && "fade" !== i.effect)) {
          const t = `${i.containerModifierClass}backface-hidden`, r = e.el.classList.contains(t);
          c <= i.maxBackfaceHiddenSlides ? r || e.el.classList.add(t) : r && e.el.classList.remove(t);
        }
      },
      updateAutoHeight: function(e) {
        const t = this, i = [], r = t.virtual && t.params.virtual.enabled;
        let n, s = 0;
        "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
        const a = e => r ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1) {
          if (t.params.centeredSlides) {
            (t.visibleSlides || []).forEach((e => {
              i.push(e);
            }));
          } else {
            for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
              const e = t.activeIndex + n;
              if (e > t.slides.length && !r) {
                break;
              }
              i.push(a(e));
            }
          }
        } else {
          i.push(a(t.activeIndex));
        }
        for (n = 0; n < i.length; n += 1) {
          if (void 0 !== i[n]) {
            const e = i[n].offsetHeight;
            s = e > s ? e : s;
          }
        }
        (s || 0 === s) && (t.wrapperEl.style.height = `${s}px`);
      },
      updateSlidesOffset: function() {
        const e = this, t = e.slides, i = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
        for (let r = 0; r < t.length; r += 1) {
          t[r].swiperSlideOffset = (e.isHorizontal() ? t[r].offsetLeft : t[r].offsetTop) - i - e.cssOverflowAdjustment();
        }
      },
      updateSlidesProgress: function(e) {
        void 0 === e && (e = this && this.translate || 0);
        const t = this, i = t.params, {slides: r, rtlTranslate: n, snapGrid: s} = t;
        if (0 === r.length) {
          return;
        }
        void 0 === r[0].swiperSlideOffset && t.updateSlidesOffset();
        let a = -e;
        n && (a = e), r.forEach((e => {
          e.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass);
        })), t.visibleSlidesIndexes = [], t.visibleSlides = [];
        let o = i.spaceBetween;
        "string" == typeof o && o.indexOf("%") >= 0 ? o = parseFloat(o.replace("%", "")) / 100 * t.size : "string" == typeof o && (o = parseFloat(o));
        for (let e = 0; e < r.length; e += 1) {
          const l = r[e];
          let d = l.swiperSlideOffset;
          i.cssMode && i.centeredSlides && (d -= r[0].swiperSlideOffset);
          const u = (a + (i.centeredSlides ? t.minTranslate() : 0) - d) / (l.swiperSlideSize + o), c = (a - s[0] + (i.centeredSlides ? t.minTranslate() : 0) - d) / (l.swiperSlideSize + o), p = -(a - d), h = p + t.slidesSizesGrid[e], f = p >= 0 && p <= t.size - t.slidesSizesGrid[e];
          (p >= 0 && p < t.size - 1 || h > 1 && h <= t.size || p <= 0 && h >= t.size) && (t.visibleSlides.push(l), 
          t.visibleSlidesIndexes.push(e), r[e].classList.add(i.slideVisibleClass)), f && r[e].classList.add(i.slideFullyVisibleClass), 
          l.progress = n ? -u : u, l.originalProgress = n ? -c : c;
        }
      },
      updateProgress: function(e) {
        const t = this;
        if (void 0 === e) {
          const i = t.rtlTranslate ? -1 : 1;
          e = t && t.translate && t.translate * i || 0;
        }
        const i = t.params, r = t.maxTranslate() - t.minTranslate();
        let {progress: n, isBeginning: s, isEnd: a, progressLoop: o} = t;
        const l = s, d = a;
        if (0 === r) {
          n = 0, s = !0, a = !0;
        } else {
          n = (e - t.minTranslate()) / r;
          const i = Math.abs(e - t.minTranslate()) < 1, o = Math.abs(e - t.maxTranslate()) < 1;
          s = i || n <= 0, a = o || n >= 1, i && (n = 0), o && (n = 1);
        }
        if (i.loop) {
          const i = t.getSlideIndexByData(0), r = t.getSlideIndexByData(t.slides.length - 1), n = t.slidesGrid[i], s = t.slidesGrid[r], a = t.slidesGrid[t.slidesGrid.length - 1], l = Math.abs(e);
          o = l >= n ? (l - n) / a : (l + a - s) / a, o > 1 && (o -= 1);
        }
        Object.assign(t, {
          progress: n,
          progressLoop: o,
          isBeginning: s,
          isEnd: a
        }), (i.watchSlidesProgress || i.centeredSlides && i.autoHeight) && t.updateSlidesProgress(e), 
        s && !l && t.emit("reachBeginning toEdge"), a && !d && t.emit("reachEnd toEdge"), 
        (l && !s || d && !a) && t.emit("fromEdge"), t.emit("progress", n);
      },
      updateSlidesClasses: function() {
        const e = this, {slides: t, params: i, slidesEl: r, activeIndex: n} = e, s = e.virtual && i.virtual.enabled, a = e.grid && i.grid && i.grid.rows > 1, o = e => gn(r, `.${i.slideClass}${e}, swiper-slide${e}`)[0];
        let l, d, u;
        if (t.forEach((e => {
          e.classList.remove(i.slideActiveClass, i.slideNextClass, i.slidePrevClass);
        })), s) {
          if (i.loop) {
            let t = n - e.virtual.slidesBefore;
            t < 0 && (t = e.virtual.slides.length + t), t >= e.virtual.slides.length && (t -= e.virtual.slides.length), 
            l = o(`[data-swiper-slide-index="${t}"]`);
          } else {
            l = o(`[data-swiper-slide-index="${n}"]`);
          }
        } else {
          a ? (l = t.filter((e => e.column === n))[0], u = t.filter((e => e.column === n + 1))[0], 
          d = t.filter((e => e.column === n - 1))[0]) : l = t[n];
        }
        l && (l.classList.add(i.slideActiveClass), a ? (u && u.classList.add(i.slideNextClass), 
        d && d.classList.add(i.slidePrevClass)) : (u = function(e, t) {
          const i = [];
          for (;e.nextElementSibling; ) {
            const r = e.nextElementSibling;
            t ? r.matches(t) && i.push(r) : i.push(r), e = r;
          }
          return i;
        }(l, `.${i.slideClass}, swiper-slide`)[0], i.loop && !u && (u = t[0]), u && u.classList.add(i.slideNextClass), 
        d = function(e, t) {
          const i = [];
          for (;e.previousElementSibling; ) {
            const r = e.previousElementSibling;
            t ? r.matches(t) && i.push(r) : i.push(r), e = r;
          }
          return i;
        }(l, `.${i.slideClass}, swiper-slide`)[0], i.loop && 0 === !d && (d = t[t.length - 1]), 
        d && d.classList.add(i.slidePrevClass))), e.emitSlidesClasses();
      },
      updateActiveIndex: function(e) {
        const t = this, i = t.rtlTranslate ? t.translate : -t.translate, {snapGrid: r, params: n, activeIndex: s, realIndex: a, snapIndex: o} = t;
        let l, d = e;
        const u = e => {
          let i = e - t.virtual.slidesBefore;
          return i < 0 && (i = t.virtual.slides.length + i), i >= t.virtual.slides.length && (i -= t.virtual.slides.length), 
          i;
        };
        if (void 0 === d && (d = function(e) {
          const {slidesGrid: t, params: i} = e, r = e.rtlTranslate ? e.translate : -e.translate;
          let n;
          for (let e = 0; e < t.length; e += 1) {
            void 0 !== t[e + 1] ? r >= t[e] && r < t[e + 1] - (t[e + 1] - t[e]) / 2 ? n = e : r >= t[e] && r < t[e + 1] && (n = e + 1) : r >= t[e] && (n = e);
          }
          return i.normalizeSlideIndex && (n < 0 || void 0 === n) && (n = 0), n;
        }(t)), r.indexOf(i) >= 0) {
          l = r.indexOf(i);
        } else {
          const e = Math.min(n.slidesPerGroupSkip, d);
          l = e + Math.floor((d - e) / n.slidesPerGroup);
        }
        if (l >= r.length && (l = r.length - 1), d === s && !t.params.loop) {
          return void (l !== o && (t.snapIndex = l, t.emit("snapIndexChange")));
        }
        if (d === s && t.params.loop && t.virtual && t.params.virtual.enabled) {
          return void (t.realIndex = u(d));
        }
        const c = t.grid && n.grid && n.grid.rows > 1;
        let p;
        if (t.virtual && n.virtual.enabled && n.loop) {
          p = u(d);
        } else if (c) {
          const e = t.slides.filter((e => e.column === d))[0];
          let i = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
          Number.isNaN(i) && (i = Math.max(t.slides.indexOf(e), 0)), p = Math.floor(i / n.grid.rows);
        } else if (t.slides[d]) {
          const e = t.slides[d].getAttribute("data-swiper-slide-index");
          p = e ? parseInt(e, 10) : d;
        } else {
          p = d;
        }
        Object.assign(t, {
          previousSnapIndex: o,
          snapIndex: l,
          previousRealIndex: a,
          realIndex: p,
          previousIndex: s,
          activeIndex: d
        }), t.initialized && In(t), t.emit("activeIndexChange"), t.emit("snapIndexChange"), 
        (t.initialized || t.params.runCallbacksOnInit) && (a !== p && t.emit("realIndexChange"), 
        t.emit("slideChange"));
      },
      updateClickedSlide: function(e, t) {
        const i = this, r = i.params;
        let n = e.closest(`.${r.slideClass}, swiper-slide`);
        !n && i.isElement && t && t.length > 1 && t.includes(e) && [ ...t.slice(t.indexOf(e) + 1, t.length) ].forEach((e => {
          !n && e.matches && e.matches(`.${r.slideClass}, swiper-slide`) && (n = e);
        }));
        let s, a = !1;
        if (n) {
          for (let e = 0; e < i.slides.length; e += 1) {
            if (i.slides[e] === n) {
              a = !0, s = e;
              break;
            }
          }
        }
        if (!n || !a) {
          return i.clickedSlide = void 0, void (i.clickedIndex = void 0);
        }
        i.clickedSlide = n, i.virtual && i.params.virtual.enabled ? i.clickedIndex = parseInt(n.getAttribute("data-swiper-slide-index"), 10) : i.clickedIndex = s, 
        r.slideToClickedSlide && void 0 !== i.clickedIndex && i.clickedIndex !== i.activeIndex && i.slideToClickedSlide();
      }
    };
    var Dn = {
      getTranslate: function(e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        const {params: t, rtlTranslate: i, translate: r, wrapperEl: n} = this;
        if (t.virtualTranslate) {
          return i ? -r : r;
        }
        if (t.cssMode) {
          return r;
        }
        let s = cn(n, e);
        return s += this.cssOverflowAdjustment(), i && (s = -s), s || 0;
      },
      setTranslate: function(e, t) {
        const i = this, {rtlTranslate: r, params: n, wrapperEl: s, progress: a} = i;
        let o, l = 0, d = 0;
        i.isHorizontal() ? l = r ? -e : e : d = e, n.roundLengths && (l = Math.floor(l), 
        d = Math.floor(d)), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? l : d, 
        n.cssMode ? s[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -l : -d : n.virtualTranslate || (i.isHorizontal() ? l -= i.cssOverflowAdjustment() : d -= i.cssOverflowAdjustment(), 
        s.style.transform = `translate3d(${l}px, ${d}px, 0px)`);
        const u = i.maxTranslate() - i.minTranslate();
        o = 0 === u ? 0 : (e - i.minTranslate()) / u, o !== a && i.updateProgress(e), i.emit("setTranslate", i.translate, t);
      },
      minTranslate: function() {
        return -this.snapGrid[0];
      },
      maxTranslate: function() {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function(e, t, i, r, n) {
        void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), 
        void 0 === r && (r = !0);
        const s = this, {params: a, wrapperEl: o} = s;
        if (s.animating && a.preventInteractionOnTransition) {
          return !1;
        }
        const l = s.minTranslate(), d = s.maxTranslate();
        let u;
        if (u = r && e > l ? l : r && e < d ? d : e, s.updateProgress(u), a.cssMode) {
          const e = s.isHorizontal();
          if (0 === t) {
            o[e ? "scrollLeft" : "scrollTop"] = -u;
          } else {
            if (!s.support.smoothScroll) {
              return mn({
                swiper: s,
                targetPosition: -u,
                side: e ? "left" : "top"
              }), !0;
            }
            o.scrollTo({
              [e ? "left" : "top"]: -u,
              behavior: "smooth"
            });
          }
          return !0;
        }
        return 0 === t ? (s.setTransition(0), s.setTranslate(u), i && (s.emit("beforeTransitionStart", t, n), 
        s.emit("transitionEnd"))) : (s.setTransition(t), s.setTranslate(u), i && (s.emit("beforeTransitionStart", t, n), 
        s.emit("transitionStart")), s.animating || (s.animating = !0, s.onTranslateToWrapperTransitionEnd || (s.onTranslateToWrapperTransitionEnd = function(e) {
          s && !s.destroyed && e.target === this && (s.wrapperEl.removeEventListener("transitionend", s.onTranslateToWrapperTransitionEnd), 
          s.onTranslateToWrapperTransitionEnd = null, delete s.onTranslateToWrapperTransitionEnd, 
          i && s.emit("transitionEnd"));
        }), s.wrapperEl.addEventListener("transitionend", s.onTranslateToWrapperTransitionEnd))), 
        !0;
      }
    };
    function Fn(e) {
      let {swiper: t, runCallbacks: i, direction: r, step: n} = e;
      const {activeIndex: s, previousIndex: a} = t;
      let o = r;
      if (o || (o = s > a ? "next" : s < a ? "prev" : "reset"), t.emit(`transition${n}`), 
      i && s !== a) {
        if ("reset" === o) {
          return void t.emit(`slideResetTransition${n}`);
        }
        t.emit(`slideChangeTransition${n}`), "next" === o ? t.emit(`slideNextTransition${n}`) : t.emit(`slidePrevTransition${n}`);
      }
    }
    var Rn = {
      slideTo: function(e, t, i, r, n) {
        void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), 
        "string" == typeof e && (e = parseInt(e, 10));
        const s = this;
        let a = e;
        a < 0 && (a = 0);
        const {params: o, snapGrid: l, slidesGrid: d, previousIndex: u, activeIndex: c, rtlTranslate: p, wrapperEl: h, enabled: f} = s;
        if (s.animating && o.preventInteractionOnTransition || !f && !r && !n || s.destroyed) {
          return !1;
        }
        const m = Math.min(s.params.slidesPerGroupSkip, a);
        let g = m + Math.floor((a - m) / s.params.slidesPerGroup);
        g >= l.length && (g = l.length - 1);
        const v = -l[g];
        if (o.normalizeSlideIndex) {
          for (let e = 0; e < d.length; e += 1) {
            const t = -Math.floor(100 * v), i = Math.floor(100 * d[e]), r = Math.floor(100 * d[e + 1]);
            void 0 !== d[e + 1] ? t >= i && t < r - (r - i) / 2 ? a = e : t >= i && t < r && (a = e + 1) : t >= i && (a = e);
          }
        }
        if (s.initialized && a !== c) {
          if (!s.allowSlideNext && (p ? v > s.translate && v > s.minTranslate() : v < s.translate && v < s.minTranslate())) {
            return !1;
          }
          if (!s.allowSlidePrev && v > s.translate && v > s.maxTranslate() && (c || 0) !== a) {
            return !1;
          }
        }
        let _;
        if (a !== (u || 0) && i && s.emit("beforeSlideChangeStart"), s.updateProgress(v), 
        _ = a > c ? "next" : a < c ? "prev" : "reset", p && -v === s.translate || !p && v === s.translate) {
          return s.updateActiveIndex(a), o.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), 
          "slide" !== o.effect && s.setTranslate(v), "reset" !== _ && (s.transitionStart(i, _), 
          s.transitionEnd(i, _)), !1;
        }
        if (o.cssMode) {
          const e = s.isHorizontal(), i = p ? v : -v;
          if (0 === t) {
            const t = s.virtual && s.params.virtual.enabled;
            t && (s.wrapperEl.style.scrollSnapType = "none", s._immediateVirtual = !0), t && !s._cssModeVirtualInitialSet && s.params.initialSlide > 0 ? (s._cssModeVirtualInitialSet = !0, 
            requestAnimationFrame((() => {
              h[e ? "scrollLeft" : "scrollTop"] = i;
            }))) : h[e ? "scrollLeft" : "scrollTop"] = i, t && requestAnimationFrame((() => {
              s.wrapperEl.style.scrollSnapType = "", s._immediateVirtual = !1;
            }));
          } else {
            if (!s.support.smoothScroll) {
              return mn({
                swiper: s,
                targetPosition: i,
                side: e ? "left" : "top"
              }), !0;
            }
            h.scrollTo({
              [e ? "left" : "top"]: i,
              behavior: "smooth"
            });
          }
          return !0;
        }
        return s.setTransition(t), s.setTranslate(v), s.updateActiveIndex(a), s.updateSlidesClasses(), 
        s.emit("beforeTransitionStart", t, r), s.transitionStart(i, _), 0 === t ? s.transitionEnd(i, _) : s.animating || (s.animating = !0, 
        s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function(e) {
          s && !s.destroyed && e.target === this && (s.wrapperEl.removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd), 
          s.onSlideToWrapperTransitionEnd = null, delete s.onSlideToWrapperTransitionEnd, 
          s.transitionEnd(i, _));
        }), s.wrapperEl.addEventListener("transitionend", s.onSlideToWrapperTransitionEnd)), 
        !0;
      },
      slideToLoop: function(e, t, i, r) {
        if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), 
        "string" == typeof e) {
          e = parseInt(e, 10);
        }
        const n = this;
        if (n.destroyed) {
          return;
        }
        const s = n.grid && n.params.grid && n.params.grid.rows > 1;
        let a = e;
        if (n.params.loop) {
          if (n.virtual && n.params.virtual.enabled) {
            a += n.virtual.slidesBefore;
          } else {
            let e;
            if (s) {
              const t = a * n.params.grid.rows;
              e = n.slides.filter((e => 1 * e.getAttribute("data-swiper-slide-index") === t))[0].column;
            } else {
              e = n.getSlideIndexByData(a);
            }
            const t = s ? Math.ceil(n.slides.length / n.params.grid.rows) : n.slides.length, {centeredSlides: i} = n.params;
            let r = n.params.slidesPerView;
            "auto" === r ? r = n.slidesPerViewDynamic() : (r = Math.ceil(parseFloat(n.params.slidesPerView, 10)), 
            i && r % 2 == 0 && (r += 1));
            let o = t - e < r;
            if (i && (o = o || e < Math.ceil(r / 2)), o) {
              const r = i ? e < n.activeIndex ? "prev" : "next" : e - n.activeIndex - 1 < n.params.slidesPerView ? "next" : "prev";
              n.loopFix({
                direction: r,
                slideTo: !0,
                activeSlideIndex: "next" === r ? e + 1 : e - t + 1,
                slideRealIndex: "next" === r ? n.realIndex : void 0
              });
            }
            if (s) {
              const e = a * n.params.grid.rows;
              a = n.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0].column;
            } else {
              a = n.getSlideIndexByData(a);
            }
          }
        }
        return requestAnimationFrame((() => {
          n.slideTo(a, t, i, r);
        })), n;
      },
      slideNext: function(e, t, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const r = this, {enabled: n, params: s, animating: a} = r;
        if (!n || r.destroyed) {
          return r;
        }
        let o = s.slidesPerGroup;
        "auto" === s.slidesPerView && 1 === s.slidesPerGroup && s.slidesPerGroupAuto && (o = Math.max(r.slidesPerViewDynamic("current", !0), 1));
        const l = r.activeIndex < s.slidesPerGroupSkip ? 1 : o, d = r.virtual && s.virtual.enabled;
        if (s.loop) {
          if (a && !d && s.loopPreventsSliding) {
            return !1;
          }
          if (r.loopFix({
            direction: "next"
          }), r._clientLeft = r.wrapperEl.clientLeft, r.activeIndex === r.slides.length - 1 && s.cssMode) {
            return requestAnimationFrame((() => {
              r.slideTo(r.activeIndex + l, e, t, i);
            })), !0;
          }
        }
        return s.rewind && r.isEnd ? r.slideTo(0, e, t, i) : r.slideTo(r.activeIndex + l, e, t, i);
      },
      slidePrev: function(e, t, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const r = this, {params: n, snapGrid: s, slidesGrid: a, rtlTranslate: o, enabled: l, animating: d} = r;
        if (!l || r.destroyed) {
          return r;
        }
        const u = r.virtual && n.virtual.enabled;
        if (n.loop) {
          if (d && !u && n.loopPreventsSliding) {
            return !1;
          }
          r.loopFix({
            direction: "prev"
          }), r._clientLeft = r.wrapperEl.clientLeft;
        }
        function c(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const p = c(o ? r.translate : -r.translate), h = s.map((e => c(e)));
        let f = s[h.indexOf(p) - 1];
        if (void 0 === f && n.cssMode) {
          let e;
          s.forEach(((t, i) => {
            p >= t && (e = i);
          })), void 0 !== e && (f = s[e > 0 ? e - 1 : e]);
        }
        let m = 0;
        if (void 0 !== f && (m = a.indexOf(f), m < 0 && (m = r.activeIndex - 1), "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (m = m - r.slidesPerViewDynamic("previous", !0) + 1, 
        m = Math.max(m, 0))), n.rewind && r.isBeginning) {
          const n = r.params.virtual && r.params.virtual.enabled && r.virtual ? r.virtual.slides.length - 1 : r.slides.length - 1;
          return r.slideTo(n, e, t, i);
        }
        return n.loop && 0 === r.activeIndex && n.cssMode ? (requestAnimationFrame((() => {
          r.slideTo(m, e, t, i);
        })), !0) : r.slideTo(m, e, t, i);
      },
      slideReset: function(e, t, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const r = this;
        if (!r.destroyed) {
          return r.slideTo(r.activeIndex, e, t, i);
        }
      },
      slideToClosest: function(e, t, i, r) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === r && (r = .5);
        const n = this;
        if (n.destroyed) {
          return;
        }
        let s = n.activeIndex;
        const a = Math.min(n.params.slidesPerGroupSkip, s), o = a + Math.floor((s - a) / n.params.slidesPerGroup), l = n.rtlTranslate ? n.translate : -n.translate;
        if (l >= n.snapGrid[o]) {
          const e = n.snapGrid[o];
          l - e > (n.snapGrid[o + 1] - e) * r && (s += n.params.slidesPerGroup);
        } else {
          const e = n.snapGrid[o - 1];
          l - e <= (n.snapGrid[o] - e) * r && (s -= n.params.slidesPerGroup);
        }
        return s = Math.max(s, 0), s = Math.min(s, n.slidesGrid.length - 1), n.slideTo(s, e, t, i);
      },
      slideToClickedSlide: function() {
        const e = this;
        if (e.destroyed) {
          return;
        }
        const {params: t, slidesEl: i} = e, r = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
        let n, s = e.clickedIndex;
        const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
        if (t.loop) {
          if (e.animating) {
            return;
          }
          n = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? s < e.loopedSlides - r / 2 || s > e.slides.length - e.loopedSlides + r / 2 ? (e.loopFix(), 
          s = e.getSlideIndex(gn(i, `${a}[data-swiper-slide-index="${n}"]`)[0]), dn((() => {
            e.slideTo(s);
          }))) : e.slideTo(s) : s > e.slides.length - r ? (e.loopFix(), s = e.getSlideIndex(gn(i, `${a}[data-swiper-slide-index="${n}"]`)[0]), 
          dn((() => {
            e.slideTo(s);
          }))) : e.slideTo(s);
        } else {
          e.slideTo(s);
        }
      }
    };
    var Bn = {
      loopCreate: function(e) {
        const t = this, {params: i, slidesEl: r} = t;
        if (!i.loop || t.virtual && t.params.virtual.enabled) {
          return;
        }
        const n = () => {
          gn(r, `.${i.slideClass}, swiper-slide`).forEach(((e, t) => {
            e.setAttribute("data-swiper-slide-index", t);
          }));
        }, s = t.grid && i.grid && i.grid.rows > 1, a = i.slidesPerGroup * (s ? i.grid.rows : 1), o = t.slides.length % a != 0, l = s && t.slides.length % i.grid.rows != 0, d = e => {
          for (let r = 0; r < e; r += 1) {
            const e = t.isElement ? _n("swiper-slide", [ i.slideBlankClass ]) : _n("div", [ i.slideClass, i.slideBlankClass ]);
            t.slidesEl.append(e);
          }
        };
        if (o) {
          if (i.loopAddBlankSlides) {
            d(a - t.slides.length % a), t.recalcSlides(), t.updateSlides();
          } else {
            vn("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
          }
          n();
        } else if (l) {
          if (i.loopAddBlankSlides) {
            d(i.grid.rows - t.slides.length % i.grid.rows), t.recalcSlides(), t.updateSlides();
          } else {
            vn("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
          }
          n();
        } else {
          n();
        }
        t.loopFix({
          slideRealIndex: e,
          direction: i.centeredSlides ? void 0 : "next"
        });
      },
      loopFix: function(e) {
        let {slideRealIndex: t, slideTo: i = !0, direction: r, setTranslate: n, activeSlideIndex: s, byController: a, byMousewheel: o} = void 0 === e ? {} : e;
        const l = this;
        if (!l.params.loop) {
          return;
        }
        l.emit("beforeLoopFix");
        const {slides: d, allowSlidePrev: u, allowSlideNext: c, slidesEl: p, params: h} = l, {centeredSlides: f} = h;
        if (l.allowSlidePrev = !0, l.allowSlideNext = !0, l.virtual && h.virtual.enabled) {
          return i && (h.centeredSlides || 0 !== l.snapIndex ? h.centeredSlides && l.snapIndex < h.slidesPerView ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0) : l.snapIndex === l.snapGrid.length - 1 && l.slideTo(l.virtual.slidesBefore, 0, !1, !0) : l.slideTo(l.virtual.slides.length, 0, !1, !0)), 
          l.allowSlidePrev = u, l.allowSlideNext = c, void l.emit("loopFix");
        }
        let m = h.slidesPerView;
        "auto" === m ? m = l.slidesPerViewDynamic() : (m = Math.ceil(parseFloat(h.slidesPerView, 10)), 
        f && m % 2 == 0 && (m += 1));
        const g = h.slidesPerGroupAuto ? m : h.slidesPerGroup;
        let v = g;
        v % g != 0 && (v += g - v % g), v += h.loopAdditionalSlides, l.loopedSlides = v;
        const _ = l.grid && h.grid && h.grid.rows > 1;
        d.length < m + v ? vn("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : _ && "row" === h.grid.fill && vn("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
        const y = [], b = [];
        let w = l.activeIndex;
        void 0 === s ? s = l.getSlideIndex(d.filter((e => e.classList.contains(h.slideActiveClass)))[0]) : w = s;
        const T = "next" === r || !r, x = "prev" === r || !r;
        let S = 0, E = 0;
        const C = _ ? Math.ceil(d.length / h.grid.rows) : d.length, M = (_ ? d[s].column : s) + (f && void 0 === n ? -m / 2 + .5 : 0);
        if (M < v) {
          S = Math.max(v - M, g);
          for (let e = 0; e < v - M; e += 1) {
            const t = e - Math.floor(e / C) * C;
            if (_) {
              const e = C - t - 1;
              for (let t = d.length - 1; t >= 0; t -= 1) {
                d[t].column === e && y.push(t);
              }
            } else {
              y.push(C - t - 1);
            }
          }
        } else if (M + m > C - v) {
          E = Math.max(M - (C - 2 * v), g);
          for (let e = 0; e < E; e += 1) {
            const t = e - Math.floor(e / C) * C;
            _ ? d.forEach(((e, i) => {
              e.column === t && b.push(i);
            })) : b.push(t);
          }
        }
        if (l.__preventObserver__ = !0, requestAnimationFrame((() => {
          l.__preventObserver__ = !1;
        })), x && y.forEach((e => {
          d[e].swiperLoopMoveDOM = !0, p.prepend(d[e]), d[e].swiperLoopMoveDOM = !1;
        })), T && b.forEach((e => {
          d[e].swiperLoopMoveDOM = !0, p.append(d[e]), d[e].swiperLoopMoveDOM = !1;
        })), l.recalcSlides(), "auto" === h.slidesPerView ? l.updateSlides() : _ && (y.length > 0 && x || b.length > 0 && T) && l.slides.forEach(((e, t) => {
          l.grid.updateSlide(t, e, l.slides);
        })), h.watchSlidesProgress && l.updateSlidesOffset(), i) {
          if (y.length > 0 && x) {
            if (void 0 === t) {
              const e = l.slidesGrid[w], t = l.slidesGrid[w + S] - e;
              o ? l.setTranslate(l.translate - t) : (l.slideTo(w + Math.ceil(S), 0, !1, !0), n && (l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - t, 
              l.touchEventsData.currentTranslate = l.touchEventsData.currentTranslate - t));
            } else if (n) {
              const e = _ ? y.length / h.grid.rows : y.length;
              l.slideTo(l.activeIndex + e, 0, !1, !0), l.touchEventsData.currentTranslate = l.translate;
            }
          } else if (b.length > 0 && T) {
            if (void 0 === t) {
              const e = l.slidesGrid[w], t = l.slidesGrid[w - E] - e;
              o ? l.setTranslate(l.translate - t) : (l.slideTo(w - E, 0, !1, !0), n && (l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - t, 
              l.touchEventsData.currentTranslate = l.touchEventsData.currentTranslate - t));
            } else {
              const e = _ ? b.length / h.grid.rows : b.length;
              l.slideTo(l.activeIndex - e, 0, !1, !0);
            }
          }
        }
        if (l.allowSlidePrev = u, l.allowSlideNext = c, l.controller && l.controller.control && !a) {
          const e = {
            slideRealIndex: t,
            direction: r,
            setTranslate: n,
            activeSlideIndex: s,
            byController: !0
          };
          Array.isArray(l.controller.control) ? l.controller.control.forEach((t => {
            !t.destroyed && t.params.loop && t.loopFix({
              ...e,
              slideTo: t.params.slidesPerView === h.slidesPerView && i
            });
          })) : l.controller.control instanceof l.constructor && l.controller.control.params.loop && l.controller.control.loopFix({
            ...e,
            slideTo: l.controller.control.params.slidesPerView === h.slidesPerView && i
          });
        }
        l.emit("loopFix");
      },
      loopDestroy: function() {
        const e = this, {params: t, slidesEl: i} = e;
        if (!t.loop || e.virtual && e.params.virtual.enabled) {
          return;
        }
        e.recalcSlides();
        const r = [];
        e.slides.forEach((e => {
          const t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
          r[t] = e;
        })), e.slides.forEach((e => {
          e.removeAttribute("data-swiper-slide-index");
        })), r.forEach((e => {
          i.append(e);
        })), e.recalcSlides(), e.slideTo(e.realIndex, 0);
      }
    };
    function Gn(e, t, i) {
      const r = ln(), {params: n} = e, s = n.edgeSwipeDetection, a = n.edgeSwipeThreshold;
      return !s || !(i <= a || i >= r.innerWidth - a) || "prevent" === s && (t.preventDefault(), 
      !0);
    }
    function Nn(e) {
      const t = this, i = an();
      let r = e;
      r.originalEvent && (r = r.originalEvent);
      const n = t.touchEventsData;
      if ("pointerdown" === r.type) {
        if (null !== n.pointerId && n.pointerId !== r.pointerId) {
          return;
        }
        n.pointerId = r.pointerId;
      } else {
        "touchstart" === r.type && 1 === r.targetTouches.length && (n.touchId = r.targetTouches[0].identifier);
      }
      if ("touchstart" === r.type) {
        return void Gn(t, r, r.targetTouches[0].pageX);
      }
      const {params: s, touches: a, enabled: o} = t;
      if (!o) {
        return;
      }
      if (!s.simulateTouch && "mouse" === r.pointerType) {
        return;
      }
      if (t.animating && s.preventInteractionOnTransition) {
        return;
      }
      !t.animating && s.cssMode && s.loop && t.loopFix();
      let l = r.target;
      if ("wrapper" === s.touchEventsTarget && !t.wrapperEl.contains(l)) {
        return;
      }
      if ("which" in r && 3 === r.which) {
        return;
      }
      if ("button" in r && r.button > 0) {
        return;
      }
      if (n.isTouched && n.isMoved) {
        return;
      }
      const d = !!s.noSwipingClass && "" !== s.noSwipingClass, u = r.composedPath ? r.composedPath() : r.path;
      d && r.target && r.target.shadowRoot && u && (l = u[0]);
      const c = s.noSwipingSelector ? s.noSwipingSelector : `.${s.noSwipingClass}`, p = !(!r.target || !r.target.shadowRoot);
      if (s.noSwiping && (p ? function(e, t) {
        return void 0 === t && (t = this), function t(i) {
          if (!i || i === an() || i === ln()) {
            return null;
          }
          i.assignedSlot && (i = i.assignedSlot);
          const r = i.closest(e);
          return r || i.getRootNode ? r || t(i.getRootNode().host) : null;
        }(t);
      }(c, l) : l.closest(c))) {
        return void (t.allowClick = !0);
      }
      if (s.swipeHandler && !l.closest(s.swipeHandler)) {
        return;
      }
      a.currentX = r.pageX, a.currentY = r.pageY;
      const h = a.currentX, f = a.currentY;
      if (!Gn(t, r, h)) {
        return;
      }
      Object.assign(n, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
      }), a.startX = h, a.startY = f, n.touchStartTime = un(), t.allowClick = !0, t.updateSize(), 
      t.swipeDirection = void 0, s.threshold > 0 && (n.allowThresholdMove = !1);
      let m = !0;
      l.matches(n.focusableElements) && (m = !1, "SELECT" === l.nodeName && (n.isTouched = !1)), 
      i.activeElement && i.activeElement.matches(n.focusableElements) && i.activeElement !== l && i.activeElement.blur();
      const g = m && t.allowTouchMove && s.touchStartPreventDefault;
      !s.touchStartForcePreventDefault && !g || l.isContentEditable || r.preventDefault(), 
      s.freeMode && s.freeMode.enabled && t.freeMode && t.animating && !s.cssMode && t.freeMode.onTouchStart(), 
      t.emit("touchStart", r);
    }
    function $n(e) {
      const t = an(), i = this, r = i.touchEventsData, {params: n, touches: s, rtlTranslate: a, enabled: o} = i;
      if (!o) {
        return;
      }
      if (!n.simulateTouch && "mouse" === e.pointerType) {
        return;
      }
      let l, d = e;
      if (d.originalEvent && (d = d.originalEvent), "pointermove" === d.type) {
        if (null !== r.touchId) {
          return;
        }
        if (d.pointerId !== r.pointerId) {
          return;
        }
      }
      if ("touchmove" === d.type) {
        if (l = [ ...d.changedTouches ].filter((e => e.identifier === r.touchId))[0], !l || l.identifier !== r.touchId) {
          return;
        }
      } else {
        l = d;
      }
      if (!r.isTouched) {
        return void (r.startMoving && r.isScrolling && i.emit("touchMoveOpposite", d));
      }
      const u = l.pageX, c = l.pageY;
      if (d.preventedByNestedSwiper) {
        return s.startX = u, void (s.startY = c);
      }
      if (!i.allowTouchMove) {
        return d.target.matches(r.focusableElements) || (i.allowClick = !1), void (r.isTouched && (Object.assign(s, {
          startX: u,
          startY: c,
          currentX: u,
          currentY: c
        }), r.touchStartTime = un()));
      }
      if (n.touchReleaseOnEdges && !n.loop) {
        if (i.isVertical()) {
          if (c < s.startY && i.translate <= i.maxTranslate() || c > s.startY && i.translate >= i.minTranslate()) {
            return r.isTouched = !1, void (r.isMoved = !1);
          }
        } else if (u < s.startX && i.translate <= i.maxTranslate() || u > s.startX && i.translate >= i.minTranslate()) {
          return;
        }
      }
      if (t.activeElement && d.target === t.activeElement && d.target.matches(r.focusableElements)) {
        return r.isMoved = !0, void (i.allowClick = !1);
      }
      r.allowTouchCallbacks && i.emit("touchMove", d), s.previousX = s.currentX, s.previousY = s.currentY, 
      s.currentX = u, s.currentY = c;
      const p = s.currentX - s.startX, h = s.currentY - s.startY;
      if (i.params.threshold && Math.sqrt(p ** 2 + h ** 2) < i.params.threshold) {
        return;
      }
      if (void 0 === r.isScrolling) {
        let e;
        i.isHorizontal() && s.currentY === s.startY || i.isVertical() && s.currentX === s.startX ? r.isScrolling = !1 : p * p + h * h >= 25 && (e = 180 * Math.atan2(Math.abs(h), Math.abs(p)) / Math.PI, 
        r.isScrolling = i.isHorizontal() ? e > n.touchAngle : 90 - e > n.touchAngle);
      }
      if (r.isScrolling && i.emit("touchMoveOpposite", d), void 0 === r.startMoving && (s.currentX === s.startX && s.currentY === s.startY || (r.startMoving = !0)), 
      r.isScrolling) {
        return void (r.isTouched = !1);
      }
      if (!r.startMoving) {
        return;
      }
      i.allowClick = !1, !n.cssMode && d.cancelable && d.preventDefault(), n.touchMoveStopPropagation && !n.nested && d.stopPropagation();
      let f = i.isHorizontal() ? p : h, m = i.isHorizontal() ? s.currentX - s.previousX : s.currentY - s.previousY;
      n.oneWayMovement && (f = Math.abs(f) * (a ? 1 : -1), m = Math.abs(m) * (a ? 1 : -1)), 
      s.diff = f, f *= n.touchRatio, a && (f = -f, m = -m);
      const g = i.touchesDirection;
      i.swipeDirection = f > 0 ? "prev" : "next", i.touchesDirection = m > 0 ? "prev" : "next";
      const v = i.params.loop && !n.cssMode, _ = "next" === i.touchesDirection && i.allowSlideNext || "prev" === i.touchesDirection && i.allowSlidePrev;
      if (!r.isMoved) {
        if (v && _ && i.loopFix({
          direction: i.swipeDirection
        }), r.startTranslate = i.getTranslate(), i.setTransition(0), i.animating) {
          const e = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0
          });
          i.wrapperEl.dispatchEvent(e);
        }
        r.allowMomentumBounce = !1, !n.grabCursor || !0 !== i.allowSlideNext && !0 !== i.allowSlidePrev || i.setGrabCursor(!0), 
        i.emit("sliderFirstMove", d);
      }
      if ((new Date).getTime(), r.isMoved && r.allowThresholdMove && g !== i.touchesDirection && v && _ && Math.abs(f) >= 1) {
        return Object.assign(s, {
          startX: u,
          startY: c,
          currentX: u,
          currentY: c,
          startTranslate: r.currentTranslate
        }), r.loopSwapReset = !0, void (r.startTranslate = r.currentTranslate);
      }
      i.emit("sliderMove", d), r.isMoved = !0, r.currentTranslate = f + r.startTranslate;
      let y = !0, b = n.resistanceRatio;
      if (n.touchReleaseOnEdges && (b = 0), f > 0 ? (v && _ && r.allowThresholdMove && r.currentTranslate > (n.centeredSlides ? i.minTranslate() - i.slidesSizesGrid[i.activeIndex + 1] : i.minTranslate()) && i.loopFix({
        direction: "prev",
        setTranslate: !0,
        activeSlideIndex: 0
      }), r.currentTranslate > i.minTranslate() && (y = !1, n.resistance && (r.currentTranslate = i.minTranslate() - 1 + (-i.minTranslate() + r.startTranslate + f) ** b))) : f < 0 && (v && _ && r.allowThresholdMove && r.currentTranslate < (n.centeredSlides ? i.maxTranslate() + i.slidesSizesGrid[i.slidesSizesGrid.length - 1] : i.maxTranslate()) && i.loopFix({
        direction: "next",
        setTranslate: !0,
        activeSlideIndex: i.slides.length - ("auto" === n.slidesPerView ? i.slidesPerViewDynamic() : Math.ceil(parseFloat(n.slidesPerView, 10)))
      }), r.currentTranslate < i.maxTranslate() && (y = !1, n.resistance && (r.currentTranslate = i.maxTranslate() + 1 - (i.maxTranslate() - r.startTranslate - f) ** b))), 
      y && (d.preventedByNestedSwiper = !0), !i.allowSlideNext && "next" === i.swipeDirection && r.currentTranslate < r.startTranslate && (r.currentTranslate = r.startTranslate), 
      !i.allowSlidePrev && "prev" === i.swipeDirection && r.currentTranslate > r.startTranslate && (r.currentTranslate = r.startTranslate), 
      i.allowSlidePrev || i.allowSlideNext || (r.currentTranslate = r.startTranslate), 
      n.threshold > 0) {
        if (!(Math.abs(f) > n.threshold || r.allowThresholdMove)) {
          return void (r.currentTranslate = r.startTranslate);
        }
        if (!r.allowThresholdMove) {
          return r.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, 
          r.currentTranslate = r.startTranslate, void (s.diff = i.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY);
        }
      }
      n.followFinger && !n.cssMode && ((n.freeMode && n.freeMode.enabled && i.freeMode || n.watchSlidesProgress) && (i.updateActiveIndex(), 
      i.updateSlidesClasses()), n.freeMode && n.freeMode.enabled && i.freeMode && i.freeMode.onTouchMove(), 
      i.updateProgress(r.currentTranslate), i.setTranslate(r.currentTranslate));
    }
    function qn(e) {
      const t = this, i = t.touchEventsData;
      let r, n = e;
      n.originalEvent && (n = n.originalEvent);
      if ("touchend" === n.type || "touchcancel" === n.type) {
        if (r = [ ...n.changedTouches ].filter((e => e.identifier === i.touchId))[0], !r || r.identifier !== i.touchId) {
          return;
        }
      } else {
        if (null !== i.touchId) {
          return;
        }
        if (n.pointerId !== i.pointerId) {
          return;
        }
        r = n;
      }
      if ([ "pointercancel", "pointerout", "pointerleave", "contextmenu" ].includes(n.type)) {
        if (!([ "pointercancel", "contextmenu" ].includes(n.type) && (t.browser.isSafari || t.browser.isWebView))) {
          return;
        }
      }
      i.pointerId = null, i.touchId = null;
      const {params: s, touches: a, rtlTranslate: o, slidesGrid: l, enabled: d} = t;
      if (!d) {
        return;
      }
      if (!s.simulateTouch && "mouse" === n.pointerType) {
        return;
      }
      if (i.allowTouchCallbacks && t.emit("touchEnd", n), i.allowTouchCallbacks = !1, 
      !i.isTouched) {
        return i.isMoved && s.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void (i.startMoving = !1);
      }
      s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
      const u = un(), c = u - i.touchStartTime;
      if (t.allowClick) {
        const e = n.path || n.composedPath && n.composedPath();
        t.updateClickedSlide(e && e[0] || n.target, e), t.emit("tap click", n), c < 300 && u - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", n);
      }
      if (i.lastClickTime = un(), dn((() => {
        t.destroyed || (t.allowClick = !0);
      })), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff && !i.loopSwapReset || i.currentTranslate === i.startTranslate && !i.loopSwapReset) {
        return i.isTouched = !1, i.isMoved = !1, void (i.startMoving = !1);
      }
      let p;
      if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, p = s.followFinger ? o ? t.translate : -t.translate : -i.currentTranslate, 
      s.cssMode) {
        return;
      }
      if (s.freeMode && s.freeMode.enabled) {
        return void t.freeMode.onTouchEnd({
          currentPos: p
        });
      }
      const h = p >= -t.maxTranslate() && !t.params.loop;
      let f = 0, m = t.slidesSizesGrid[0];
      for (let e = 0; e < l.length; e += e < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup) {
        const t = e < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
        void 0 !== l[e + t] ? (h || p >= l[e] && p < l[e + t]) && (f = e, m = l[e + t] - l[e]) : (h || p >= l[e]) && (f = e, 
        m = l[l.length - 1] - l[l.length - 2]);
      }
      let g = null, v = null;
      s.rewind && (t.isBeginning ? v = s.virtual && s.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (g = 0));
      const _ = (p - l[f]) / m, y = f < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
      if (c > s.longSwipesMs) {
        if (!s.longSwipes) {
          return void t.slideTo(t.activeIndex);
        }
        "next" === t.swipeDirection && (_ >= s.longSwipesRatio ? t.slideTo(s.rewind && t.isEnd ? g : f + y) : t.slideTo(f)), 
        "prev" === t.swipeDirection && (_ > 1 - s.longSwipesRatio ? t.slideTo(f + y) : null !== v && _ < 0 && Math.abs(_) > s.longSwipesRatio ? t.slideTo(v) : t.slideTo(f));
      } else {
        if (!s.shortSwipes) {
          return void t.slideTo(t.activeIndex);
        }
        t.navigation && (n.target === t.navigation.nextEl || n.target === t.navigation.prevEl) ? n.target === t.navigation.nextEl ? t.slideTo(f + y) : t.slideTo(f) : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : f + y), 
        "prev" === t.swipeDirection && t.slideTo(null !== v ? v : f));
      }
    }
    function Vn() {
      const e = this, {params: t, el: i} = e;
      if (i && 0 === i.offsetWidth) {
        return;
      }
      t.breakpoints && e.setBreakpoint();
      const {allowSlideNext: r, allowSlidePrev: n, snapGrid: s} = e, a = e.virtual && e.params.virtual.enabled;
      e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), 
      e.updateSlidesClasses();
      const o = a && t.loop;
      !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || o ? e.params.loop && !a ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0), 
      e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), 
      e.autoplay.resizeTimeout = setTimeout((() => {
        e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
      }), 500)), e.allowSlidePrev = n, e.allowSlideNext = r, e.params.watchOverflow && s !== e.snapGrid && e.checkOverflow();
    }
    function jn(e) {
      const t = this;
      t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), 
      e.stopImmediatePropagation())));
    }
    function Hn() {
      const e = this, {wrapperEl: t, rtlTranslate: i, enabled: r} = e;
      if (!r) {
        return;
      }
      let n;
      e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 
      0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
      const s = e.maxTranslate() - e.minTranslate();
      n = 0 === s ? 0 : (e.translate - e.minTranslate()) / s, n !== e.progress && e.updateProgress(i ? -e.translate : e.translate), 
      e.emit("setTranslate", e.translate, !1);
    }
    function Yn(e) {
      const t = this;
      On(t, e.target), t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update();
    }
    function Xn() {
      const e = this;
      e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
    }
    const Wn = (e, t) => {
      const i = an(), {params: r, el: n, wrapperEl: s, device: a} = e, o = !!r.nested, l = "on" === t ? "addEventListener" : "removeEventListener", d = t;
      i[l]("touchstart", e.onDocumentTouchStart, {
        passive: !1,
        capture: o
      }), n[l]("touchstart", e.onTouchStart, {
        passive: !1
      }), n[l]("pointerdown", e.onTouchStart, {
        passive: !1
      }), i[l]("touchmove", e.onTouchMove, {
        passive: !1,
        capture: o
      }), i[l]("pointermove", e.onTouchMove, {
        passive: !1,
        capture: o
      }), i[l]("touchend", e.onTouchEnd, {
        passive: !0
      }), i[l]("pointerup", e.onTouchEnd, {
        passive: !0
      }), i[l]("pointercancel", e.onTouchEnd, {
        passive: !0
      }), i[l]("touchcancel", e.onTouchEnd, {
        passive: !0
      }), i[l]("pointerout", e.onTouchEnd, {
        passive: !0
      }), i[l]("pointerleave", e.onTouchEnd, {
        passive: !0
      }), i[l]("contextmenu", e.onTouchEnd, {
        passive: !0
      }), (r.preventClicks || r.preventClicksPropagation) && n[l]("click", e.onClick, !0), 
      r.cssMode && s[l]("scroll", e.onScroll), r.updateOnWindowResize ? e[d](a.ios || a.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", Vn, !0) : e[d]("observerUpdate", Vn, !0), 
      n[l]("load", e.onLoad, {
        capture: !0
      });
    };
    const Un = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var Qn = {
      init: !0,
      direction: "horizontal",
      oneWayMovement: !1,
      swiperElementNodeName: "SWIPER-CONTAINER",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      eventsPrefix: "swiper",
      enabled: !0,
      focusableElements: "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: .5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 5,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: .85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      loop: !1,
      loopAddBlankSlides: !0,
      loopAdditionalSlides: 0,
      loopPreventsSliding: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-blank",
      slideActiveClass: "swiper-slide-active",
      slideVisibleClass: "swiper-slide-visible",
      slideFullyVisibleClass: "swiper-slide-fully-visible",
      slideNextClass: "swiper-slide-next",
      slidePrevClass: "swiper-slide-prev",
      wrapperClass: "swiper-wrapper",
      lazyPreloaderClass: "swiper-lazy-preloader",
      lazyPreloadPrevNext: 0,
      runCallbacksOnInit: !0,
      _emitClasses: !1
    };
    function Kn(e, t) {
      return function(i) {
        void 0 === i && (i = {});
        const r = Object.keys(i)[0], n = i[r];
        "object" == typeof n && null !== n ? (!0 === e[r] && (e[r] = {
          enabled: !0
        }), "navigation" === r && e[r] && e[r].enabled && !e[r].prevEl && !e[r].nextEl && (e[r].auto = !0), 
        [ "pagination", "scrollbar" ].indexOf(r) >= 0 && e[r] && e[r].enabled && !e[r].el && (e[r].auto = !0), 
        r in e && "enabled" in n ? ("object" != typeof e[r] || "enabled" in e[r] || (e[r].enabled = !0), 
        e[r] || (e[r] = {
          enabled: !1
        }), hn(t, i)) : hn(t, i)) : hn(t, i);
      };
    }
    const Zn = {
      eventsEmitter: Pn,
      update: zn,
      translate: Dn,
      transition: {
        setTransition: function(e, t) {
          const i = this;
          i.params.cssMode || (i.wrapperEl.style.transitionDuration = `${e}ms`, i.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : ""), 
          i.emit("setTransition", e, t);
        },
        transitionStart: function(e, t) {
          void 0 === e && (e = !0);
          const i = this, {params: r} = i;
          r.cssMode || (r.autoHeight && i.updateAutoHeight(), Fn({
            swiper: i,
            runCallbacks: e,
            direction: t,
            step: "Start"
          }));
        },
        transitionEnd: function(e, t) {
          void 0 === e && (e = !0);
          const i = this, {params: r} = i;
          i.animating = !1, r.cssMode || (i.setTransition(0), Fn({
            swiper: i,
            runCallbacks: e,
            direction: t,
            step: "End"
          }));
        }
      },
      slide: Rn,
      loop: Bn,
      grabCursor: {
        setGrabCursor: function(e) {
          const t = this;
          if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) {
            return;
          }
          const i = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0), i.style.cursor = "move", i.style.cursor = e ? "grabbing" : "grab", 
          t.isElement && requestAnimationFrame((() => {
            t.__preventObserver__ = !1;
          }));
        },
        unsetGrabCursor: function() {
          const e = this;
          e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), 
          e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "", 
          e.isElement && requestAnimationFrame((() => {
            e.__preventObserver__ = !1;
          })));
        }
      },
      events: {
        attachEvents: function() {
          const e = this, {params: t} = e;
          e.onTouchStart = Nn.bind(e), e.onTouchMove = $n.bind(e), e.onTouchEnd = qn.bind(e), 
          e.onDocumentTouchStart = Xn.bind(e), t.cssMode && (e.onScroll = Hn.bind(e)), e.onClick = jn.bind(e), 
          e.onLoad = Yn.bind(e), Wn(e, "on");
        },
        detachEvents: function() {
          Wn(this, "off");
        }
      },
      breakpoints: {
        setBreakpoint: function() {
          const e = this, {realIndex: t, initialized: i, params: r, el: n} = e, s = r.breakpoints;
          if (!s || s && 0 === Object.keys(s).length) {
            return;
          }
          const a = e.getBreakpoint(s, e.params.breakpointsBase, e.el);
          if (!a || e.currentBreakpoint === a) {
            return;
          }
          const o = (a in s ? s[a] : void 0) || e.originalParams, l = Un(e, r), d = Un(e, o), u = r.enabled;
          l && !d ? (n.classList.remove(`${r.containerModifierClass}grid`, `${r.containerModifierClass}grid-column`), 
          e.emitContainerClasses()) : !l && d && (n.classList.add(`${r.containerModifierClass}grid`), 
          (o.grid.fill && "column" === o.grid.fill || !o.grid.fill && "column" === r.grid.fill) && n.classList.add(`${r.containerModifierClass}grid-column`), 
          e.emitContainerClasses()), [ "navigation", "pagination", "scrollbar" ].forEach((t => {
            if (void 0 === o[t]) {
              return;
            }
            const i = r[t] && r[t].enabled, n = o[t] && o[t].enabled;
            i && !n && e[t].disable(), !i && n && e[t].enable();
          }));
          const c = o.direction && o.direction !== r.direction, p = r.loop && (o.slidesPerView !== r.slidesPerView || c), h = r.loop;
          c && i && e.changeDirection(), hn(e.params, o);
          const f = e.params.enabled, m = e.params.loop;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev
          }), u && !f ? e.disable() : !u && f && e.enable(), e.currentBreakpoint = a, e.emit("_beforeBreakpoint", o), 
          i && (p ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides()) : !h && m ? (e.loopCreate(t), 
          e.updateSlides()) : h && !m && e.loopDestroy()), e.emit("breakpoint", o);
        },
        getBreakpoint: function(e, t, i) {
          if (void 0 === t && (t = "window"), !e || "container" === t && !i) {
            return;
          }
          let r = !1;
          const n = ln(), s = "window" === t ? n.innerHeight : i.clientHeight, a = Object.keys(e).map((e => {
            if ("string" == typeof e && 0 === e.indexOf("@")) {
              const t = parseFloat(e.substr(1));
              return {
                value: s * t,
                point: e
              };
            }
            return {
              value: e,
              point: e
            };
          }));
          a.sort(((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10)));
          for (let e = 0; e < a.length; e += 1) {
            const {point: s, value: o} = a[e];
            "window" === t ? n.matchMedia(`(min-width: ${o}px)`).matches && (r = s) : o <= i.clientWidth && (r = s);
          }
          return r || "max";
        }
      },
      checkOverflow: {
        checkOverflow: function() {
          const e = this, {isLocked: t, params: i} = e, {slidesOffsetBefore: r} = i;
          if (r) {
            const t = e.slides.length - 1, i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * r;
            e.isLocked = e.size > i;
          } else {
            e.isLocked = 1 === e.snapGrid.length;
          }
          !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), 
          t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        }
      },
      classes: {
        addClasses: function() {
          const e = this, {classNames: t, params: i, rtl: r, el: n, device: s} = e, a = function(e, t) {
            const i = [];
            return e.forEach((e => {
              "object" == typeof e ? Object.keys(e).forEach((r => {
                e[r] && i.push(t + r);
              })) : "string" == typeof e && i.push(t + e);
            })), i;
          }([ "initialized", i.direction, {
            "free-mode": e.params.freeMode && i.freeMode.enabled
          }, {
            autoheight: i.autoHeight
          }, {
            rtl: r
          }, {
            grid: i.grid && i.grid.rows > 1
          }, {
            "grid-column": i.grid && i.grid.rows > 1 && "column" === i.grid.fill
          }, {
            android: s.android
          }, {
            ios: s.ios
          }, {
            "css-mode": i.cssMode
          }, {
            centered: i.cssMode && i.centeredSlides
          }, {
            "watch-progress": i.watchSlidesProgress
          } ], i.containerModifierClass);
          t.push(...a), n.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function() {
          const {el: e, classNames: t} = this;
          e.classList.remove(...t), this.emitContainerClasses();
        }
      }
    }, Jn = {};
    class es {
      constructor() {
        let e, t;
        for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++) {
          r[n] = arguments[n];
        }
        1 === r.length && r[0].constructor && "Object" === Object.prototype.toString.call(r[0]).slice(8, -1) ? t = r[0] : [e, t] = r, 
        t || (t = {}), t = hn({}, t), e && !t.el && (t.el = e);
        const s = an();
        if (t.el && "string" == typeof t.el && s.querySelectorAll(t.el).length > 1) {
          const e = [];
          return s.querySelectorAll(t.el).forEach((i => {
            const r = hn({}, t, {
              el: i
            });
            e.push(new es(r));
          })), e;
        }
        const a = this;
        a.__swiper__ = !0, a.support = Mn(), a.device = kn({
          userAgent: t.userAgent
        }), a.browser = An(), a.eventsListeners = {}, a.eventsAnyListeners = [], a.modules = [ ...a.__modules__ ], 
        t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
        const o = {};
        a.modules.forEach((e => {
          e({
            params: t,
            swiper: a,
            extendParams: Kn(t, o),
            on: a.on.bind(a),
            once: a.once.bind(a),
            off: a.off.bind(a),
            emit: a.emit.bind(a)
          });
        }));
        const l = hn({}, Qn, o);
        return a.params = hn({}, l, Jn, t), a.originalParams = hn({}, a.params), a.passedParams = hn({}, t), 
        a.params && a.params.on && Object.keys(a.params.on).forEach((e => {
          a.on(e, a.params.on[e]);
        })), a.params && a.params.onAny && a.onAny(a.params.onAny), Object.assign(a, {
          enabled: a.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === a.params.direction,
          isVertical: () => "vertical" === a.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: a.params.allowSlideNext,
          allowSlidePrev: a.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: a.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            pointerId: null,
            touchId: null
          },
          allowClick: !0,
          allowTouchMove: a.params.allowTouchMove,
          touches: {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
          },
          imagesToLoad: [],
          imagesLoaded: 0
        }), a.emit("_swiper"), a.params.init && a.init(), a;
      }
      getDirectionLabel(e) {
        return this.isHorizontal() ? e : {
          width: "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          marginRight: "marginBottom"
        }[e];
      }
      getSlideIndex(e) {
        const {slidesEl: t, params: i} = this, r = bn(gn(t, `.${i.slideClass}, swiper-slide`)[0]);
        return bn(e) - r;
      }
      getSlideIndexByData(e) {
        return this.getSlideIndex(this.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0]);
      }
      recalcSlides() {
        const {slidesEl: e, params: t} = this;
        this.slides = gn(e, `.${t.slideClass}, swiper-slide`);
      }
      enable() {
        const e = this;
        e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
      }
      disable() {
        const e = this;
        e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
      }
      setProgress(e, t) {
        const i = this;
        e = Math.min(Math.max(e, 0), 1);
        const r = i.minTranslate(), n = (i.maxTranslate() - r) * e + r;
        i.translateTo(n, void 0 === t ? 0 : t), i.updateActiveIndex(), i.updateSlidesClasses();
      }
      emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) {
          return;
        }
        const t = e.el.className.split(" ").filter((t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass)));
        e.emit("_containerClasses", t.join(" "));
      }
      getSlideClasses(e) {
        const t = this;
        return t.destroyed ? "" : e.className.split(" ").filter((e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ");
      }
      emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) {
          return;
        }
        const t = [];
        e.slides.forEach((i => {
          const r = e.getSlideClasses(i);
          t.push({
            slideEl: i,
            classNames: r
          }), e.emit("_slideClass", i, r);
        })), e.emit("_slideClasses", t);
      }
      slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"), void 0 === t && (t = !1);
        const {params: i, slides: r, slidesGrid: n, slidesSizesGrid: s, size: a, activeIndex: o} = this;
        let l = 1;
        if ("number" == typeof i.slidesPerView) {
          return i.slidesPerView;
        }
        if (i.centeredSlides) {
          let e, t = r[o] ? Math.ceil(r[o].swiperSlideSize) : 0;
          for (let i = o + 1; i < r.length; i += 1) {
            r[i] && !e && (t += Math.ceil(r[i].swiperSlideSize), l += 1, t > a && (e = !0));
          }
          for (let i = o - 1; i >= 0; i -= 1) {
            r[i] && !e && (t += r[i].swiperSlideSize, l += 1, t > a && (e = !0));
          }
        } else if ("current" === e) {
          for (let e = o + 1; e < r.length; e += 1) {
            (t ? n[e] + s[e] - n[o] < a : n[e] - n[o] < a) && (l += 1);
          }
        } else {
          for (let e = o - 1; e >= 0; e -= 1) {
            n[o] - n[e] < a && (l += 1);
          }
        }
        return l;
      }
      update() {
        const e = this;
        if (!e || e.destroyed) {
          return;
        }
        const {snapGrid: t, params: i} = e;
        function r() {
          const t = e.rtlTranslate ? -1 * e.translate : e.translate, i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let n;
        if (i.breakpoints && e.setBreakpoint(), [ ...e.el.querySelectorAll('[loading="lazy"]') ].forEach((t => {
          t.complete && On(e, t);
        })), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), 
        i.freeMode && i.freeMode.enabled && !i.cssMode) {
          r(), i.autoHeight && e.updateAutoHeight();
        } else {
          if (("auto" === i.slidesPerView || i.slidesPerView > 1) && e.isEnd && !i.centeredSlides) {
            const t = e.virtual && i.virtual.enabled ? e.virtual.slides : e.slides;
            n = e.slideTo(t.length - 1, 0, !1, !0);
          } else {
            n = e.slideTo(e.activeIndex, 0, !1, !0);
          }
          n || r();
        }
        i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
      }
      changeDirection(e, t) {
        void 0 === t && (t = !0);
        const i = this, r = i.params.direction;
        return e || (e = "horizontal" === r ? "vertical" : "horizontal"), e === r || "horizontal" !== e && "vertical" !== e || (i.el.classList.remove(`${i.params.containerModifierClass}${r}`), 
        i.el.classList.add(`${i.params.containerModifierClass}${e}`), i.emitContainerClasses(), 
        i.params.direction = e, i.slides.forEach((t => {
          "vertical" === e ? t.style.width = "" : t.style.height = "";
        })), i.emit("changeDirection"), t && i.update()), i;
      }
      changeLanguageDirection(e) {
        const t = this;
        t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, 
        t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), 
        t.el.dir = "ltr"), t.update());
      }
      mount(e) {
        const t = this;
        if (t.mounted) {
          return !0;
        }
        let i = e || t.params.el;
        if ("string" == typeof i && (i = document.querySelector(i)), !i) {
          return !1;
        }
        i.swiper = t, i.parentNode && i.parentNode.host && i.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
        const r = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let n = (() => {
          if (i && i.shadowRoot && i.shadowRoot.querySelector) {
            return i.shadowRoot.querySelector(r());
          }
          return gn(i, r())[0];
        })();
        return !n && t.params.createElements && (n = _n("div", t.params.wrapperClass), i.append(n), 
        gn(i, `.${t.params.slideClass}`).forEach((e => {
          n.append(e);
        }))), Object.assign(t, {
          el: i,
          wrapperEl: n,
          slidesEl: t.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : n,
          hostEl: t.isElement ? i.parentNode.host : i,
          mounted: !0,
          rtl: "rtl" === i.dir.toLowerCase() || "rtl" === yn(i, "direction"),
          rtlTranslate: "horizontal" === t.params.direction && ("rtl" === i.dir.toLowerCase() || "rtl" === yn(i, "direction")),
          wrongRTL: "-webkit-box" === yn(n, "display")
        }), !0;
      }
      init(e) {
        const t = this;
        if (t.initialized) {
          return t;
        }
        if (!1 === t.mount(e)) {
          return t;
        }
        t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), 
        t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), 
        t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), 
        t.params.loop && t.loopCreate(), t.attachEvents();
        const i = [ ...t.el.querySelectorAll('[loading="lazy"]') ];
        return t.isElement && i.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), 
        i.forEach((e => {
          e.complete ? On(t, e) : e.addEventListener("load", (e => {
            On(t, e.target);
          }));
        })), In(t), t.initialized = !0, In(t), t.emit("init"), t.emit("afterInit"), t;
      }
      destroy(e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        const i = this, {params: r, el: n, wrapperEl: s, slides: a} = i;
        return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, 
        i.detachEvents(), r.loop && i.loopDestroy(), t && (i.removeClasses(), n.removeAttribute("style"), 
        s.removeAttribute("style"), a && a.length && a.forEach((e => {
          e.classList.remove(r.slideVisibleClass, r.slideFullyVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass), 
          e.removeAttribute("style"), e.removeAttribute("data-swiper-slide-index");
        }))), i.emit("destroy"), Object.keys(i.eventsListeners).forEach((e => {
          i.off(e);
        })), !1 !== e && (i.el.swiper = null, function(e) {
          const t = e;
          Object.keys(t).forEach((e => {
            try {
              t[e] = null;
            } catch (e) {}
            try {
              delete t[e];
            } catch (e) {}
          }));
        }(i)), i.destroyed = !0), null;
      }
      static extendDefaults(e) {
        hn(Jn, e);
      }
      static get extendedDefaults() {
        return Jn;
      }
      static get defaults() {
        return Qn;
      }
      static installModule(e) {
        es.prototype.__modules__ || (es.prototype.__modules__ = []);
        const t = es.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e) ? (e.forEach((e => es.installModule(e))), es) : (es.installModule(e), 
        es);
      }
    }
    function ts(e, t, i, r) {
      return e.params.createElements && Object.keys(r).forEach((n => {
        if (!i[n] && !0 === i.auto) {
          let s = gn(e.el, `.${r[n]}`)[0];
          s || (s = _n("div", r[n]), s.className = r[n], e.el.append(s)), i[n] = s, t[n] = s;
        }
      })), i;
    }
    function is(e) {
      let {swiper: t, extendParams: i, on: r, emit: n} = e;
      function s(e) {
        let i;
        return e && "string" == typeof e && t.isElement && (i = t.el.querySelector(e), i) ? i : (e && ("string" == typeof e && (i = [ ...document.querySelectorAll(e) ]), 
        t.params.uniqueNavElements && "string" == typeof e && i.length > 1 && 1 === t.el.querySelectorAll(e).length && (i = t.el.querySelector(e))), 
        e && !i ? e : i);
      }
      function a(e, i) {
        const r = t.params.navigation;
        (e = xn(e)).forEach((e => {
          e && (e.classList[i ? "add" : "remove"](...r.disabledClass.split(" ")), "BUTTON" === e.tagName && (e.disabled = i), 
          t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](r.lockClass));
        }));
      }
      function o() {
        const {nextEl: e, prevEl: i} = t.navigation;
        if (t.params.loop) {
          return a(i, !1), void a(e, !1);
        }
        a(i, t.isBeginning && !t.params.rewind), a(e, t.isEnd && !t.params.rewind);
      }
      function l(e) {
        e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(), 
        n("navigationPrev"));
      }
      function d(e) {
        e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(), 
        n("navigationNext"));
      }
      function u() {
        const e = t.params.navigation;
        if (t.params.navigation = ts(t, t.originalParams.navigation, t.params.navigation, {
          nextEl: "swiper-button-next",
          prevEl: "swiper-button-prev"
        }), !e.nextEl && !e.prevEl) {
          return;
        }
        let i = s(e.nextEl), r = s(e.prevEl);
        Object.assign(t.navigation, {
          nextEl: i,
          prevEl: r
        }), i = xn(i), r = xn(r);
        const n = (i, r) => {
          i && i.addEventListener("click", "next" === r ? d : l), !t.enabled && i && i.classList.add(...e.lockClass.split(" "));
        };
        i.forEach((e => n(e, "next"))), r.forEach((e => n(e, "prev")));
      }
      function c() {
        let {nextEl: e, prevEl: i} = t.navigation;
        e = xn(e), i = xn(i);
        const r = (e, i) => {
          e.removeEventListener("click", "next" === i ? d : l), e.classList.remove(...t.params.navigation.disabledClass.split(" "));
        };
        e.forEach((e => r(e, "next"))), i.forEach((e => r(e, "prev")));
      }
      i({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
          navigationDisabledClass: "swiper-navigation-disabled"
        }
      }), t.navigation = {
        nextEl: null,
        prevEl: null
      }, r("init", (() => {
        !1 === t.params.navigation.enabled ? p() : (u(), o());
      })), r("toEdge fromEdge lock unlock", (() => {
        o();
      })), r("destroy", (() => {
        c();
      })), r("enable disable", (() => {
        let {nextEl: e, prevEl: i} = t.navigation;
        e = xn(e), i = xn(i), t.enabled ? o() : [ ...e, ...i ].filter((e => !!e)).forEach((e => e.classList.add(t.params.navigation.lockClass)));
      })), r("click", ((e, i) => {
        let {nextEl: r, prevEl: s} = t.navigation;
        r = xn(r), s = xn(s);
        const a = i.target;
        if (t.params.navigation.hideOnClick && !s.includes(a) && !r.includes(a)) {
          if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === a || t.pagination.el.contains(a))) {
            return;
          }
          let e;
          r.length ? e = r[0].classList.contains(t.params.navigation.hiddenClass) : s.length && (e = s[0].classList.contains(t.params.navigation.hiddenClass)), 
          n(!0 === e ? "navigationShow" : "navigationHide"), [ ...r, ...s ].filter((e => !!e)).forEach((e => e.classList.toggle(t.params.navigation.hiddenClass)));
        }
      }));
      const p = () => {
        t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")), c();
      };
      Object.assign(t.navigation, {
        enable: () => {
          t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")), 
          u(), o();
        },
        disable: p,
        update: o,
        init: u,
        destroy: c
      });
    }
    function rs(e) {
      return void 0 === e && (e = ""), `.${e.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
    }
    function ns(e) {
      let {swiper: t, extendParams: i, on: r, emit: n} = e;
      const s = "swiper-pagination";
      let a;
      i({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: e => e,
          formatFractionTotal: e => e,
          bulletClass: `${s}-bullet`,
          bulletActiveClass: `${s}-bullet-active`,
          modifierClass: `${s}-`,
          currentClass: `${s}-current`,
          totalClass: `${s}-total`,
          hiddenClass: `${s}-hidden`,
          progressbarFillClass: `${s}-progressbar-fill`,
          progressbarOppositeClass: `${s}-progressbar-opposite`,
          clickableClass: `${s}-clickable`,
          lockClass: `${s}-lock`,
          horizontalClass: `${s}-horizontal`,
          verticalClass: `${s}-vertical`,
          paginationDisabledClass: `${s}-disabled`
        }
      }), t.pagination = {
        el: null,
        bullets: []
      };
      let o = 0;
      function l() {
        return !t.params.pagination.el || !t.pagination.el || Array.isArray(t.pagination.el) && 0 === t.pagination.el.length;
      }
      function d(e, i) {
        const {bulletActiveClass: r} = t.params.pagination;
        e && (e = e[("prev" === i ? "previous" : "next") + "ElementSibling"]) && (e.classList.add(`${r}-${i}`), 
        (e = e[("prev" === i ? "previous" : "next") + "ElementSibling"]) && e.classList.add(`${r}-${i}-${i}`));
      }
      function u(e) {
        const i = e.target.closest(rs(t.params.pagination.bulletClass));
        if (!i) {
          return;
        }
        e.preventDefault();
        const r = bn(i) * t.params.slidesPerGroup;
        if (t.params.loop) {
          if (t.realIndex === r) {
            return;
          }
          t.slideToLoop(r);
        } else {
          t.slideTo(r);
        }
      }
      function c() {
        const e = t.rtl, i = t.params.pagination;
        if (l()) {
          return;
        }
        let r, s, u = t.pagination.el;
        u = xn(u);
        const c = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length, p = t.params.loop ? Math.ceil(c / t.params.slidesPerGroup) : t.snapGrid.length;
        if (t.params.loop ? (s = t.previousRealIndex || 0, r = t.params.slidesPerGroup > 1 ? Math.floor(t.realIndex / t.params.slidesPerGroup) : t.realIndex) : void 0 !== t.snapIndex ? (r = t.snapIndex, 
        s = t.previousSnapIndex) : (s = t.previousIndex || 0, r = t.activeIndex || 0), "bullets" === i.type && t.pagination.bullets && t.pagination.bullets.length > 0) {
          const n = t.pagination.bullets;
          let l, c, p;
          if (i.dynamicBullets && (a = Tn(n[0], t.isHorizontal() ? "width" : "height", !0), 
          u.forEach((e => {
            e.style[t.isHorizontal() ? "width" : "height"] = a * (i.dynamicMainBullets + 4) + "px";
          })), i.dynamicMainBullets > 1 && void 0 !== s && (o += r - (s || 0), o > i.dynamicMainBullets - 1 ? o = i.dynamicMainBullets - 1 : o < 0 && (o = 0)), 
          l = Math.max(r - o, 0), c = l + (Math.min(n.length, i.dynamicMainBullets) - 1), 
          p = (c + l) / 2), n.forEach((e => {
            const t = [ ...[ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((e => `${i.bulletActiveClass}${e}`)) ].map((e => "string" == typeof e && e.includes(" ") ? e.split(" ") : e)).flat();
            e.classList.remove(...t);
          })), u.length > 1) {
            n.forEach((e => {
              const n = bn(e);
              n === r ? e.classList.add(...i.bulletActiveClass.split(" ")) : t.isElement && e.setAttribute("part", "bullet"), 
              i.dynamicBullets && (n >= l && n <= c && e.classList.add(...`${i.bulletActiveClass}-main`.split(" ")), 
              n === l && d(e, "prev"), n === c && d(e, "next"));
            }));
          } else {
            const e = n[r];
            if (e && e.classList.add(...i.bulletActiveClass.split(" ")), t.isElement && n.forEach(((e, t) => {
              e.setAttribute("part", t === r ? "bullet-active" : "bullet");
            })), i.dynamicBullets) {
              const e = n[l], t = n[c];
              for (let e = l; e <= c; e += 1) {
                n[e] && n[e].classList.add(...`${i.bulletActiveClass}-main`.split(" "));
              }
              d(e, "prev"), d(t, "next");
            }
          }
          if (i.dynamicBullets) {
            const r = Math.min(n.length, i.dynamicMainBullets + 4), s = (a * r - a) / 2 - p * a, o = e ? "right" : "left";
            n.forEach((e => {
              e.style[t.isHorizontal() ? o : "top"] = `${s}px`;
            }));
          }
        }
        u.forEach(((e, s) => {
          if ("fraction" === i.type && (e.querySelectorAll(rs(i.currentClass)).forEach((e => {
            e.textContent = i.formatFractionCurrent(r + 1);
          })), e.querySelectorAll(rs(i.totalClass)).forEach((e => {
            e.textContent = i.formatFractionTotal(p);
          }))), "progressbar" === i.type) {
            let n;
            n = i.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical";
            const s = (r + 1) / p;
            let a = 1, o = 1;
            "horizontal" === n ? a = s : o = s, e.querySelectorAll(rs(i.progressbarFillClass)).forEach((e => {
              e.style.transform = `translate3d(0,0,0) scaleX(${a}) scaleY(${o})`, e.style.transitionDuration = `${t.params.speed}ms`;
            }));
          }
          "custom" === i.type && i.renderCustom ? (e.innerHTML = i.renderCustom(t, r + 1, p), 
          0 === s && n("paginationRender", e)) : (0 === s && n("paginationRender", e), n("paginationUpdate", e)), 
          t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](i.lockClass);
        }));
      }
      function p() {
        const e = t.params.pagination;
        if (l()) {
          return;
        }
        const i = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.grid && t.params.grid.rows > 1 ? t.slides.length / Math.ceil(t.params.grid.rows) : t.slides.length;
        let r = t.pagination.el;
        r = xn(r);
        let s = "";
        if ("bullets" === e.type) {
          let r = t.params.loop ? Math.ceil(i / t.params.slidesPerGroup) : t.snapGrid.length;
          t.params.freeMode && t.params.freeMode.enabled && r > i && (r = i);
          for (let i = 0; i < r; i += 1) {
            e.renderBullet ? s += e.renderBullet.call(t, i, e.bulletClass) : s += `<${e.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>`;
          }
        }
        "fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`), 
        "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`), 
        t.pagination.bullets = [], r.forEach((i => {
          "custom" !== e.type && (i.innerHTML = s || ""), "bullets" === e.type && t.pagination.bullets.push(...i.querySelectorAll(rs(e.bulletClass)));
        })), "custom" !== e.type && n("paginationRender", r[0]);
      }
      function h() {
        t.params.pagination = ts(t, t.originalParams.pagination, t.params.pagination, {
          el: "swiper-pagination"
        });
        const e = t.params.pagination;
        if (!e.el) {
          return;
        }
        let i;
        "string" == typeof e.el && t.isElement && (i = t.el.querySelector(e.el)), i || "string" != typeof e.el || (i = [ ...document.querySelectorAll(e.el) ]), 
        i || (i = e.el), i && 0 !== i.length && (t.params.uniqueNavElements && "string" == typeof e.el && Array.isArray(i) && i.length > 1 && (i = [ ...t.el.querySelectorAll(e.el) ], 
        i.length > 1 && (i = i.filter((e => wn(e, ".swiper")[0] === t.el))[0])), Array.isArray(i) && 1 === i.length && (i = i[0]), 
        Object.assign(t.pagination, {
          el: i
        }), i = xn(i), i.forEach((i => {
          "bullets" === e.type && e.clickable && i.classList.add(...(e.clickableClass || "").split(" ")), 
          i.classList.add(e.modifierClass + e.type), i.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass), 
          "bullets" === e.type && e.dynamicBullets && (i.classList.add(`${e.modifierClass}${e.type}-dynamic`), 
          o = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && i.classList.add(e.progressbarOppositeClass), 
          e.clickable && i.addEventListener("click", u), t.enabled || i.classList.add(e.lockClass);
        })));
      }
      function f() {
        const e = t.params.pagination;
        if (l()) {
          return;
        }
        let i = t.pagination.el;
        i && (i = xn(i), i.forEach((i => {
          i.classList.remove(e.hiddenClass), i.classList.remove(e.modifierClass + e.type), 
          i.classList.remove(t.isHorizontal() ? e.horizontalClass : e.verticalClass), e.clickable && (i.classList.remove(...(e.clickableClass || "").split(" ")), 
          i.removeEventListener("click", u));
        }))), t.pagination.bullets && t.pagination.bullets.forEach((t => t.classList.remove(...e.bulletActiveClass.split(" "))));
      }
      r("changeDirection", (() => {
        if (!t.pagination || !t.pagination.el) {
          return;
        }
        const e = t.params.pagination;
        let {el: i} = t.pagination;
        i = xn(i), i.forEach((i => {
          i.classList.remove(e.horizontalClass, e.verticalClass), i.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass);
        }));
      })), r("init", (() => {
        !1 === t.params.pagination.enabled ? m() : (h(), p(), c());
      })), r("activeIndexChange", (() => {
        void 0 === t.snapIndex && c();
      })), r("snapIndexChange", (() => {
        c();
      })), r("snapGridLengthChange", (() => {
        p(), c();
      })), r("destroy", (() => {
        f();
      })), r("enable disable", (() => {
        let {el: e} = t.pagination;
        e && (e = xn(e), e.forEach((e => e.classList[t.enabled ? "remove" : "add"](t.params.pagination.lockClass))));
      })), r("lock unlock", (() => {
        c();
      })), r("click", ((e, i) => {
        const r = i.target, s = xn(t.pagination.el);
        if (t.params.pagination.el && t.params.pagination.hideOnClick && s && s.length > 0 && !r.classList.contains(t.params.pagination.bulletClass)) {
          if (t.navigation && (t.navigation.nextEl && r === t.navigation.nextEl || t.navigation.prevEl && r === t.navigation.prevEl)) {
            return;
          }
          const e = s[0].classList.contains(t.params.pagination.hiddenClass);
          n(!0 === e ? "paginationShow" : "paginationHide"), s.forEach((e => e.classList.toggle(t.params.pagination.hiddenClass)));
        }
      }));
      const m = () => {
        t.el.classList.add(t.params.pagination.paginationDisabledClass);
        let {el: e} = t.pagination;
        e && (e = xn(e), e.forEach((e => e.classList.add(t.params.pagination.paginationDisabledClass)))), 
        f();
      };
      Object.assign(t.pagination, {
        enable: () => {
          t.el.classList.remove(t.params.pagination.paginationDisabledClass);
          let {el: e} = t.pagination;
          e && (e = xn(e), e.forEach((e => e.classList.remove(t.params.pagination.paginationDisabledClass)))), 
          h(), p(), c();
        },
        disable: m,
        render: p,
        update: c,
        init: h,
        destroy: f
      });
    }
    function ss(e) {
      let t, i, {swiper: r, extendParams: n, on: s, emit: a, params: o} = e;
      r.autoplay = {
        running: !1,
        paused: !1,
        timeLeft: 0
      }, n({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !1,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1
        }
      });
      let l, d, u, c, p, h, f, m, g = o && o.autoplay ? o.autoplay.delay : 3e3, v = o && o.autoplay ? o.autoplay.delay : 3e3, _ = (new Date).getTime();
      function y(e) {
        r && !r.destroyed && r.wrapperEl && e.target === r.wrapperEl && (r.wrapperEl.removeEventListener("transitionend", y), 
        m || E());
      }
      const b = () => {
        if (r.destroyed || !r.autoplay.running) {
          return;
        }
        r.autoplay.paused ? d = !0 : d && (v = l, d = !1);
        const e = r.autoplay.paused ? l : _ + v - (new Date).getTime();
        r.autoplay.timeLeft = e, a("autoplayTimeLeft", e, e / g), i = requestAnimationFrame((() => {
          b();
        }));
      }, w = e => {
        if (r.destroyed || !r.autoplay.running) {
          return;
        }
        cancelAnimationFrame(i), b();
        let n = void 0 === e ? r.params.autoplay.delay : e;
        g = r.params.autoplay.delay, v = r.params.autoplay.delay;
        const s = (() => {
          let e;
          if (e = r.virtual && r.params.virtual.enabled ? r.slides.filter((e => e.classList.contains("swiper-slide-active")))[0] : r.slides[r.activeIndex], 
          !e) {
            return;
          }
          return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
        })();
        !Number.isNaN(s) && s > 0 && void 0 === e && (n = s, g = s, v = s), l = n;
        const o = r.params.speed, d = () => {
          r && !r.destroyed && (r.params.autoplay.reverseDirection ? !r.isBeginning || r.params.loop || r.params.rewind ? (r.slidePrev(o, !0, !0), 
          a("autoplay")) : r.params.autoplay.stopOnLastSlide || (r.slideTo(r.slides.length - 1, o, !0, !0), 
          a("autoplay")) : !r.isEnd || r.params.loop || r.params.rewind ? (r.slideNext(o, !0, !0), 
          a("autoplay")) : r.params.autoplay.stopOnLastSlide || (r.slideTo(0, o, !0, !0), 
          a("autoplay")), r.params.cssMode && (_ = (new Date).getTime(), requestAnimationFrame((() => {
            w();
          }))));
        };
        return n > 0 ? (clearTimeout(t), t = setTimeout((() => {
          d();
        }), n)) : requestAnimationFrame((() => {
          d();
        })), n;
      }, T = () => {
        _ = (new Date).getTime(), r.autoplay.running = !0, w(), a("autoplayStart");
      }, x = () => {
        r.autoplay.running = !1, clearTimeout(t), cancelAnimationFrame(i), a("autoplayStop");
      }, S = (e, i) => {
        if (r.destroyed || !r.autoplay.running) {
          return;
        }
        clearTimeout(t), e || (f = !0);
        const n = () => {
          a("autoplayPause"), r.params.autoplay.waitForTransition ? r.wrapperEl.addEventListener("transitionend", y) : E();
        };
        if (r.autoplay.paused = !0, i) {
          return h && (l = r.params.autoplay.delay), h = !1, void n();
        }
        const s = l || r.params.autoplay.delay;
        l = s - ((new Date).getTime() - _), r.isEnd && l < 0 && !r.params.loop || (l < 0 && (l = 0), 
        n());
      }, E = () => {
        r.isEnd && l < 0 && !r.params.loop || r.destroyed || !r.autoplay.running || (_ = (new Date).getTime(), 
        f ? (f = !1, w(l)) : w(), r.autoplay.paused = !1, a("autoplayResume"));
      }, C = () => {
        if (r.destroyed || !r.autoplay.running) {
          return;
        }
        const e = an();
        "hidden" === e.visibilityState && (f = !0, S(!0)), "visible" === e.visibilityState && E();
      }, M = e => {
        "mouse" === e.pointerType && (f = !0, m = !0, r.animating || r.autoplay.paused || S(!0));
      }, k = e => {
        "mouse" === e.pointerType && (m = !1, r.autoplay.paused && E());
      };
      s("init", (() => {
        r.params.autoplay.enabled && (r.params.autoplay.pauseOnMouseEnter && (r.el.addEventListener("pointerenter", M), 
        r.el.addEventListener("pointerleave", k)), an().addEventListener("visibilitychange", C), 
        T());
      })), s("destroy", (() => {
        r.el.removeEventListener("pointerenter", M), r.el.removeEventListener("pointerleave", k), 
        an().removeEventListener("visibilitychange", C), r.autoplay.running && x();
      })), s("_freeModeStaticRelease", (() => {
        (c || f) && E();
      })), s("_freeModeNoMomentumRelease", (() => {
        r.params.autoplay.disableOnInteraction ? x() : S(!0, !0);
      })), s("beforeTransitionStart", ((e, t, i) => {
        !r.destroyed && r.autoplay.running && (i || !r.params.autoplay.disableOnInteraction ? S(!0, !0) : x());
      })), s("sliderFirstMove", (() => {
        !r.destroyed && r.autoplay.running && (r.params.autoplay.disableOnInteraction ? x() : (u = !0, 
        c = !1, f = !1, p = setTimeout((() => {
          f = !0, c = !0, S(!0);
        }), 200)));
      })), s("touchEnd", (() => {
        if (!r.destroyed && r.autoplay.running && u) {
          if (clearTimeout(p), clearTimeout(t), r.params.autoplay.disableOnInteraction) {
            return c = !1, void (u = !1);
          }
          c && r.params.cssMode && E(), c = !1, u = !1;
        }
      })), s("slideChange", (() => {
        !r.destroyed && r.autoplay.running && (h = !0);
      })), Object.assign(r.autoplay, {
        start: T,
        stop: x,
        pause: S,
        resume: E
      });
    }
    let as;
    Object.keys(Zn).forEach((e => {
      Object.keys(Zn[e]).forEach((t => {
        es.prototype[t] = Zn[e][t];
      }));
    })), es.use([ function(e) {
      let {swiper: t, on: i, emit: r} = e;
      const n = ln();
      let s = null, a = null;
      const o = () => {
        t && !t.destroyed && t.initialized && (r("beforeResize"), r("resize"));
      }, l = () => {
        t && !t.destroyed && t.initialized && r("orientationchange");
      };
      i("init", (() => {
        t.params.resizeObserver && void 0 !== n.ResizeObserver ? t && !t.destroyed && t.initialized && (s = new ResizeObserver((e => {
          a = n.requestAnimationFrame((() => {
            const {width: i, height: r} = t;
            let n = i, s = r;
            e.forEach((e => {
              let {contentBoxSize: i, contentRect: r, target: a} = e;
              a && a !== t.el || (n = r ? r.width : (i[0] || i).inlineSize, s = r ? r.height : (i[0] || i).blockSize);
            })), n === i && s === r || o();
          }));
        })), s.observe(t.el)) : (n.addEventListener("resize", o), n.addEventListener("orientationchange", l));
      })), i("destroy", (() => {
        a && n.cancelAnimationFrame(a), s && s.unobserve && t.el && (s.unobserve(t.el), 
        s = null), n.removeEventListener("resize", o), n.removeEventListener("orientationchange", l);
      }));
    }, function(e) {
      let {swiper: t, extendParams: i, on: r, emit: n} = e;
      const s = [], a = ln(), o = function(e, i) {
        void 0 === i && (i = {});
        const r = new (a.MutationObserver || a.WebkitMutationObserver)((e => {
          if (t.__preventObserver__) {
            return;
          }
          if (1 === e.length) {
            return void n("observerUpdate", e[0]);
          }
          const i = function() {
            n("observerUpdate", e[0]);
          };
          a.requestAnimationFrame ? a.requestAnimationFrame(i) : a.setTimeout(i, 0);
        }));
        r.observe(e, {
          attributes: void 0 === i.attributes || i.attributes,
          childList: void 0 === i.childList || i.childList,
          characterData: void 0 === i.characterData || i.characterData
        }), s.push(r);
      };
      i({
        observer: !1,
        observeParents: !1,
        observeSlideChildren: !1
      }), r("init", (() => {
        if (t.params.observer) {
          if (t.params.observeParents) {
            const e = wn(t.hostEl);
            for (let t = 0; t < e.length; t += 1) {
              o(e[t]);
            }
          }
          o(t.hostEl, {
            childList: t.params.observeSlideChildren
          }), o(t.wrapperEl, {
            attributes: !1
          });
        }
      })), r("destroy", (() => {
        s.forEach((e => {
          e.disconnect();
        })), s.splice(0, s.length);
      }));
    } ]);
    const os = new es(".promo__swiper", {
      enabled: !1,
      modules: [ ns, ss ],
      loop: !0,
      pagination: {
        el: ".promo-swiper__pagination",
        bulletClass: "pagination-bar__bullet",
        bulletActiveClass: "pagination-bar__bullet--active"
      },
      speed: 2e3,
      on: {
        init: e => (e => {
          const t = e.pagination.bullets;
          as = t.map(((e, i) => Hr.timeline({
            paused: !0
          }).set(t[i], {
            width: "1rem",
            marginRight: 0
          }).to(t[i], {
            marginRight: "4.6rem",
            duration: .01
          }).add("clear", "<").to(t[i], {
            width: "5.6rem",
            marginRight: 0,
            duration: 3
          }).add("ready", "<"))), as[e.realIndex].play();
        })(e),
        realIndexChange: e => (e => {
          as.forEach((e => {
            e.pause("clear");
          })), as[e.realIndex].pause("ready");
        })(e),
        slideChangeTransitionEnd: e => (e => {
          as[e.realIndex].play("ready");
        })(e)
      }
    });
    var ls = i(51);
    new ls(".tabs-head").toggle("#shore");
    new ls(".aesthetics-head").toggle("#exit");
    const ds = window.innerWidth, us = e => {
      const t = e.slides.filter((e => e.classList.contains("swiper-slide-active")))[0] || e.slides[0];
      t && Hr.to(t.querySelector(".dubrovka-slide__text"), {
        autoAlpha: 1
      });
    }, cs = (e, t) => {
      const i = Xr.querySelector(`.tabs-block__btn--next-${t}`), r = Xr.querySelector(`.tabs-block__btn--prev-${t}`);
      e.slides.forEach((e => {
        Hr.set(e.querySelector(".dubrovka-slide__text"), {
          autoAlpha: 0
        });
      })), e.on("slideChangeTransitionEnd", us), i.addEventListener("click", (() => (e => {
        const t = e.slides.filter((e => e.classList.contains("swiper-slide-active")))[0], i = e.slides.filter((e => e.classList.contains("swiper-slide-next")))[0];
        Hr.timeline().set(t.querySelector(".dubrovka-slide__text"), {
          autoAlpha: 0
        }).to(i, {
          width: "43.4%",
          duration: .5
        }).to(i.querySelector(".dubrovka-slide__figure"), {
          height: "100%",
          duration: .5
        }, "<").to(t, {
          width: "35.4%",
          duration: .5
        }, "<").to(t.querySelector(".dubrovka-slide__figure"), {
          height: "64%",
          duration: .5
        }, "<").call((() => e.slideNext(1e3)));
      })(e))), r.addEventListener("click", (() => (e => {
        const t = e.slides.filter((e => e.classList.contains("swiper-slide-active")))[0], i = e.slides.filter((e => e.classList.contains("swiper-slide-prev")))[0] || e.slides[e.slides.length - 1];
        Hr.timeline().set(t.querySelector(".dubrovka-slide__text"), {
          autoAlpha: 0
        }).to(i, {
          width: "43.4%",
          duration: .5
        }).to(i.querySelector(".dubrovka-slide__figure"), {
          height: "100%",
          duration: .5
        }, "<").to(t, {
          width: "35.4%",
          duration: .5
        }, "<").to(t.querySelector(".dubrovka-slide__figure"), {
          height: "64%",
          duration: .5
        }, "<").then((() => {
          e.slidePrev(1e3);
        }));
      })(e))), us(e);
    }, ps = new es(".circle__slider", {
      enabled: !1,
      modules: [ is, ns ],
      loop: !0,
      speed: 1e3,
      centeredSlides: !0,
      slidesPerView: "auto",
      spaceBetween: 5,
      navigation: {
        nextEl: ".circle__btn--next",
        prevEl: ".circle__btn--prev"
      },
      pagination: {
        enabled: !1,
        el: ".circle__pagination",
        type: "progressbar"
      }
    });
    let hs;
    const fs = new es(".yard__slider", {
      enabled: !1,
      modules: [ ns, ss ],
      loop: !0,
      spaceBetween: 5,
      pagination: {
        el: ".yard__pagination",
        bulletClass: "pagination-bar__bullet",
        bulletActiveClass: "pagination-bar__bullet--active"
      },
      speed: 2e3,
      on: {
        init: e => (e => {
          const t = e.pagination.bullets;
          hs = t.map(((e, i) => Hr.timeline({
            paused: !0
          }).set(t[i], {
            width: "1rem",
            marginRight: 0
          }).to(t[i], {
            marginRight: "4.6rem",
            duration: .01
          }).add("clear", "<").to(t[i], {
            width: "5.6rem",
            marginRight: 0,
            duration: 3
          }).add("ready", "<"))), hs[e.realIndex].play();
        })(e),
        realIndexChange: e => (e => {
          hs.forEach((e => {
            e.pause("clear");
          })), hs[e.realIndex].pause("ready");
        })(e),
        slideChangeTransitionEnd: e => (e => {
          hs[e.realIndex].play("ready");
        })(e)
      }
    });
    document.addEventListener("DOMContentLoaded", (() => {
      os.enable(), Ur && Ur.addEventListener("click", Jr), Wr && window.addEventListener("scroll", tn), 
      Array.from(Xr.querySelectorAll(".js-tabs-slider")).map(((e, t) => new es(e, {
        modules: [ is ],
        speed: 500,
        slidesPerView: "auto",
        loop: !0,
        spaceBetween: 5,
        navigation: {
          enabled: !1,
          nextEl: `.tabs-block__btn--next-${t}`,
          prevEl: `.tabs-block__btn--prev-${t}`
        },
        allowTouchMove: !1,
        on: {
          init: us
        },
        breakpoints: {
          320: {
            allowTouchMove: !0,
            navigation: {
              enabled: !0
            },
            slidesPerView: 1
          },
          769: {
            allowTouchMove: !1,
            navigation: {
              enabled: !1
            },
            slidesPerView: "auto"
          }
        }
      }))).forEach(((e, t) => {
        ds < 769 || cs(e, t);
      })), ps.enable(), fs.enable(), Array.from(Xr.querySelectorAll(".js-aesthetics-tabs")).map(((e, t) => new es(e, {
        modules: [ is ],
        speed: 500,
        slidesPerView: "auto",
        loop: !0,
        spaceBetween: 5,
        navigation: {
          enabled: !0,
          nextEl: `.aesthetics__btn--next-${t}`,
          prevEl: `.aesthetics__btn--prev-${t}`
        },
        allowTouchMove: !1,
        on: {},
        centeredSlides: !0,
        initialSlide: 3,
        breakpoints: {
          320: {
            allowTouchMove: !0,
            navigation: {
              enabled: !0
            },
            slidesPerView: 1
          },
          769: {
            allowTouchMove: !0,
            navigation: {
              enabled: !1
            },
            slidesPerView: "auto"
          }
        }
      })));
    }));
  })();
})();