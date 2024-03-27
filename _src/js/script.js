(() => {
  var e = {
    348: function(e) {
      e.exports = function() {
        "use strict";
        var e = document, t = e.createTextNode.bind(e);
        function r(e, t, r) {
          e.style.setProperty(t, r);
        }
        function i(e, t) {
          return e.appendChild(t);
        }
        function n(t, r, n, s) {
          var a = e.createElement("span");
          return r && (a.className = r), n && (!s && a.setAttribute("data-" + r, n), a.textContent = n), 
          t && i(t, a) || a;
        }
        function s(e, t) {
          return e.getAttribute("data-" + t);
        }
        function a(t, r) {
          return t && 0 != t.length ? t.nodeName ? [ t ] : [].slice.call(t[0].nodeName ? t : (r || e).querySelectorAll(t)) : [];
        }
        function o(e) {
          for (var t = []; e--; ) {
            t[e] = [];
          }
          return t;
        }
        function l(e, t) {
          e && e.some(t);
        }
        function c(e) {
          return function(t) {
            return e[t];
          };
        }
        function u(e, t, i) {
          var n = "--" + t, s = n + "-index";
          l(i, (function(e, t) {
            Array.isArray(e) ? l(e, (function(e) {
              r(e, s, t);
            })) : r(e, s, t);
          })), r(e, n + "-total", i.length);
        }
        var d = {};
        function p(e, t, r) {
          var i = r.indexOf(e);
          if (-1 == i) {
            r.unshift(e), l(d[e].depends, (function(t) {
              p(t, e, r);
            }));
          } else {
            var n = r.indexOf(t);
            r.splice(i, 1), r.splice(n, 0, e);
          }
          return r;
        }
        function f(e, t, r, i) {
          return {
            by: e,
            depends: t,
            key: r,
            split: i
          };
        }
        function h(e) {
          return p(e, 0, []).map(c(d));
        }
        function m(e) {
          d[e.by] = e;
        }
        function g(e, r, s, o, c) {
          e.normalize();
          var u = [], d = document.createDocumentFragment();
          o && u.push(e.previousSibling);
          var p = [];
          return a(e.childNodes).some((function(e) {
            if (!e.tagName || e.hasChildNodes()) {
              if (e.childNodes && e.childNodes.length) {
                return p.push(e), void u.push.apply(u, g(e, r, s, o, c));
              }
              var i = e.wholeText || "", a = i.trim();
              a.length && (" " === i[0] && p.push(t(" ")), l(a.split(s), (function(e, t) {
                t && c && p.push(n(d, "whitespace", " ", c));
                var i = n(d, r, e);
                u.push(i), p.push(i);
              })), " " === i[i.length - 1] && p.push(t(" ")));
            } else {
              p.push(e);
            }
          })), l(p, (function(e) {
            i(d, e);
          })), e.innerHTML = "", i(e, d), u;
        }
        var v = 0;
        function y(e, t) {
          for (var r in t) {
            e[r] = t[r];
          }
          return e;
        }
        var _ = "words", b = f(_, v, "word", (function(e) {
          return g(e, "word", /\s+/, 0, 1);
        })), w = "chars", T = f(w, [ _ ], "char", (function(e, t, r) {
          var i = [];
          return l(r[_], (function(e, r) {
            i.push.apply(i, g(e, "char", "", t.whitespace && r));
          })), i;
        }));
        function x(e) {
          var t = (e = e || {}).key;
          return a(e.target || "[data-splitting]").map((function(r) {
            var i = r["🍌"];
            if (!e.force && i) {
              return i;
            }
            i = r["🍌"] = {
              el: r
            };
            var n = h(e.by || s(r, "splitting") || w), a = y({}, e);
            return l(n, (function(e) {
              if (e.split) {
                var n = e.by, s = (t ? "-" + t : "") + e.key, o = e.split(r, a, i);
                s && u(r, s, o), i[n] = o, r.classList.add(n);
              }
            })), r.classList.add("splitting"), i;
          }));
        }
        function S(e) {
          var t = (e = e || {}).target = n();
          return t.innerHTML = e.content, x(e), t.outerHTML;
        }
        function E(e, t, r) {
          var i = a(t.matching || e.children, e), n = {};
          return l(i, (function(e) {
            var t = Math.round(e[r]);
            (n[t] || (n[t] = [])).push(e);
          })), Object.keys(n).map(Number).sort(C).map(c(n));
        }
        function C(e, t) {
          return e - t;
        }
        x.html = S, x.add = m;
        var M = f("lines", [ _ ], "line", (function(e, t, r) {
          return E(e, {
            matching: r[_]
          }, "offsetTop");
        })), A = f("items", v, "item", (function(e, t) {
          return a(t.matching || e.children, e);
        })), k = f("rows", v, "row", (function(e, t) {
          return E(e, t, "offsetTop");
        })), P = f("cols", v, "col", (function(e, t) {
          return E(e, t, "offsetLeft");
        })), L = f("grid", [ "rows", "cols" ]), O = "layout", D = f(O, v, v, (function(e, t) {
          var o = t.rows = +(t.rows || s(e, "rows") || 1), l = t.columns = +(t.columns || s(e, "columns") || 1);
          if (t.image = t.image || s(e, "image") || e.currentSrc || e.src, t.image) {
            var c = a("img", e)[0];
            t.image = c && (c.currentSrc || c.src);
          }
          t.image && r(e, "background-image", "url(" + t.image + ")");
          for (var u = o * l, d = [], p = n(v, "cell-grid"); u--; ) {
            var f = n(p, "cell");
            n(f, "cell-inner"), d.push(f);
          }
          return i(e, p), d;
        })), I = f("cellRows", [ O ], "row", (function(e, t, r) {
          var i = t.rows, n = o(i);
          return l(r[O], (function(e, t, r) {
            n[Math.floor(t / (r.length / i))].push(e);
          })), n;
        })), z = f("cellColumns", [ O ], "col", (function(e, t, r) {
          var i = t.columns, n = o(i);
          return l(r[O], (function(e, t) {
            n[t % i].push(e);
          })), n;
        })), q = f("cells", [ "cellRows", "cellColumns" ], "cell", (function(e, t, r) {
          return r[O];
        }));
        return m(b), m(T), m(M), m(A), m(k), m(P), m(L), m(D), m(I), m(z), m(q), x;
      }();
    }
  }, t = {};
  function r(i) {
    var n = t[i];
    if (void 0 !== n) {
      return n.exports;
    }
    var s = t[i] = {
      exports: {}
    };
    return e[i].call(s.exports, s, s.exports, r), s.exports;
  }
  (() => {
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
*/    var i, n, s, a, o, l, c, u, d, p, f, h, m, g, v, y = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: {
        lineHeight: ""
      }
    }, _ = {
      duration: .5,
      overwrite: !1,
      delay: 0
    }, b = 1e8, w = 1e-8, T = 2 * Math.PI, x = T / 4, S = 0, E = Math.sqrt, C = Math.cos, M = Math.sin, A = function(e) {
      return "string" == typeof e;
    }, k = function(e) {
      return "function" == typeof e;
    }, P = function(e) {
      return "number" == typeof e;
    }, L = function(e) {
      return void 0 === e;
    }, O = function(e) {
      return "object" == typeof e;
    }, D = function(e) {
      return !1 !== e;
    }, I = function() {
      return "undefined" != typeof window;
    }, z = function(e) {
      return k(e) || A(e);
    }, q = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function() {}, R = Array.isArray, F = /(?:-?\.?\d|\.)+/gi, B = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, N = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, G = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, V = /[+-]=-?[.\d]+/, $ = /[^,'"\[\]\s]+/gi, Y = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, H = {}, X = {}, j = function(e) {
      return (X = Te(e, H)) && xr;
    }, W = function(e, t) {
      return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
    }, U = function(e, t) {
      return !t && console.warn(e);
    }, K = function(e, t) {
      return e && (H[e] = t) && X && (X[e] = t) || H;
    }, Q = function() {
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
    }, te = {}, re = [], ie = {}, ne = {}, se = {}, ae = 30, oe = [], le = "", ce = function(e) {
      var t, r, i = e[0];
      if (O(i) || k(i) || (e = [ e ]), !(t = (i._gsap || {}).harness)) {
        for (r = oe.length; r-- && !oe[r].targetTest(i); ) {}
        t = oe[r];
      }
      for (r = e.length; r--; ) {
        e[r] && (e[r]._gsap || (e[r]._gsap = new Rt(e[r], t))) || e.splice(r, 1);
      }
      return e;
    }, ue = function(e) {
      return e._gsap || ce(et(e))[0]._gsap;
    }, de = function(e, t, r) {
      return (r = e[t]) && k(r) ? e[t]() : L(r) && e.getAttribute && e.getAttribute(t) || r;
    }, pe = function(e, t) {
      return (e = e.split(",")).forEach(t) || e;
    }, fe = function(e) {
      return Math.round(1e5 * e) / 1e5 || 0;
    }, he = function(e) {
      return Math.round(1e7 * e) / 1e7 || 0;
    }, me = function(e, t) {
      var r = t.charAt(0), i = parseFloat(t.substr(2));
      return e = parseFloat(e), "+" === r ? e + i : "-" === r ? e - i : "*" === r ? e * i : e / i;
    }, ge = function(e, t) {
      for (var r = t.length, i = 0; e.indexOf(t[i]) < 0 && ++i < r; ) {}
      return i < r;
    }, ve = function() {
      var e, t, r = re.length, i = re.slice(0);
      for (ie = {}, re.length = 0, e = 0; e < r; e++) {
        (t = i[e]) && t._lazy && (t.render(t._lazy[0], t._lazy[1], !0)._lazy = 0);
      }
    }, ye = function(e, t, r, i) {
      re.length && !n && ve(), e.render(t, r, i || n && t < 0 && (e._initted || e._startAt)), 
      re.length && !n && ve();
    }, _e = function(e) {
      var t = parseFloat(e);
      return (t || 0 === t) && (e + "").match($).length < 2 ? t : A(e) ? e.trim() : e;
    }, be = function(e) {
      return e;
    }, we = function(e, t) {
      for (var r in t) {
        r in e || (e[r] = t[r]);
      }
      return e;
    }, Te = function(e, t) {
      for (var r in t) {
        e[r] = t[r];
      }
      return e;
    }, xe = function e(t, r) {
      for (var i in r) {
        "__proto__" !== i && "constructor" !== i && "prototype" !== i && (t[i] = O(r[i]) ? e(t[i] || (t[i] = {}), r[i]) : r[i]);
      }
      return t;
    }, Se = function(e, t) {
      var r, i = {};
      for (r in e) {
        r in t || (i[r] = e[r]);
      }
      return i;
    }, Ee = function(e) {
      var t, r = e.parent || a, i = e.keyframes ? (t = R(e.keyframes), function(e, r) {
        for (var i in r) {
          i in e || "duration" === i && t || "ease" === i || (e[i] = r[i]);
        }
      }) : we;
      if (D(e.inherit)) {
        for (;r; ) {
          i(e, r.vars.defaults), r = r.parent || r._dp;
        }
      }
      return e;
    }, Ce = function(e, t, r, i, n) {
      void 0 === r && (r = "_first"), void 0 === i && (i = "_last");
      var s, a = e[i];
      if (n) {
        for (s = t[n]; a && a[n] > s; ) {
          a = a._prev;
        }
      }
      return a ? (t._next = a._next, a._next = t) : (t._next = e[r], e[r] = t), t._next ? t._next._prev = t : e[i] = t, 
      t._prev = a, t.parent = t._dp = e, t;
    }, Me = function(e, t, r, i) {
      void 0 === r && (r = "_first"), void 0 === i && (i = "_last");
      var n = t._prev, s = t._next;
      n ? n._next = s : e[r] === t && (e[r] = s), s ? s._prev = n : e[i] === t && (e[i] = n), 
      t._next = t._prev = t.parent = null;
    }, Ae = function(e, t) {
      e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), 
      e._act = 0;
    }, ke = function(e, t) {
      if (e && (!t || t._end > e._dur || t._start < 0)) {
        for (var r = e; r; ) {
          r._dirty = 1, r = r.parent;
        }
      }
      return e;
    }, Pe = function(e, t, r, i) {
      return e._startAt && (n ? e._startAt.revert(J) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, i));
    }, Le = function e(t) {
      return !t || t._ts && e(t.parent);
    }, Oe = function(e) {
      return e._repeat ? De(e._tTime, e = e.duration() + e._rDelay) * e : 0;
    }, De = function(e, t) {
      var r = Math.floor(e /= t);
      return e && r === e ? r - 1 : r;
    }, Ie = function(e, t) {
      return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
    }, ze = function(e) {
      return e._end = he(e._start + (e._tDur / Math.abs(e._ts || e._rts || w) || 0));
    }, qe = function(e, t) {
      var r = e._dp;
      return r && r.smoothChildTiming && e._ts && (e._start = he(r._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), 
      ze(e), r._dirty || ke(r, e)), e;
    }, Re = function(e, t) {
      var r;
      if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (r = Ie(e.rawTime(), t), 
      (!t._dur || Ue(0, t.totalDuration(), r) - t._tTime > w) && t.render(r, !0)), ke(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
        if (e._dur < e.duration()) {
          for (r = e; r._dp; ) {
            r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
          }
        }
        e._zTime = -1e-8;
      }
    }, Fe = function(e, t, r, i) {
      return t.parent && Ae(t), t._start = he((P(r) ? r : r || e !== a ? Xe(e, r, t) : e._time) + t._delay), 
      t._end = he(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), Ce(e, t, "_first", "_last", e._sort ? "_start" : 0), 
      Ve(t) || (e._recent = t), i || Re(e, t), e._ts < 0 && qe(e, e._tTime), e;
    }, Be = function(e, t) {
      return (H.ScrollTrigger || W("scrollTrigger", t)) && H.ScrollTrigger.create(t, e);
    }, Ne = function(e, t, r, i, s) {
      return Ht(e, t, s), e._initted ? !r && e._pt && !n && (e._dur && !1 !== e.vars.lazy || !e._dur && e.vars.lazy) && d !== St.frame ? (re.push(e), 
      e._lazy = [ s, i ], 1) : void 0 : 1;
    }, Ge = function e(t) {
      var r = t.parent;
      return r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || e(r));
    }, Ve = function(e) {
      var t = e.data;
      return "isFromStart" === t || "isStart" === t;
    }, $e = function(e, t, r, i) {
      var n = e._repeat, s = he(t) || 0, a = e._tTime / e._tDur;
      return a && !i && (e._time *= s / e._dur), e._dur = s, e._tDur = n ? n < 0 ? 1e10 : he(s * (n + 1) + e._rDelay * n) : s, 
      a > 0 && !i && qe(e, e._tTime = e._tDur * a), e.parent && ze(e), r || ke(e.parent, e), 
      e;
    }, Ye = function(e) {
      return e instanceof Bt ? ke(e) : $e(e, e._dur);
    }, He = {
      _start: 0,
      endTime: Q,
      totalDuration: Q
    }, Xe = function e(t, r, i) {
      var n, s, a, o = t.labels, l = t._recent || He, c = t.duration() >= b ? l.endTime(!1) : t._dur;
      return A(r) && (isNaN(r) || r in o) ? (s = r.charAt(0), a = "%" === r.substr(-1), 
      n = r.indexOf("="), "<" === s || ">" === s ? (n >= 0 && (r = r.replace(/=/, "")), 
      ("<" === s ? l._start : l.endTime(l._repeat >= 0)) + (parseFloat(r.substr(1)) || 0) * (a ? (n < 0 ? l : i).totalDuration() / 100 : 1)) : n < 0 ? (r in o || (o[r] = c), 
      o[r]) : (s = parseFloat(r.charAt(n - 1) + r.substr(n + 1)), a && i && (s = s / 100 * (R(i) ? i[0] : i).totalDuration()), 
      n > 1 ? e(t, r.substr(0, n - 1), i) + s : c + s)) : null == r ? c : +r;
    }, je = function(e, t, r) {
      var i, n, s = P(t[1]), a = (s ? 2 : 1) + (e < 2 ? 0 : 1), o = t[a];
      if (s && (o.duration = t[1]), o.parent = r, e) {
        for (i = o, n = r; n && !("immediateRender" in i); ) {
          i = n.vars.defaults || {}, n = D(n.vars.inherit) && n.parent;
        }
        o.immediateRender = D(i.immediateRender), e < 2 ? o.runBackwards = 1 : o.startAt = t[a - 1];
      }
      return new Kt(t[0], o, t[a + 1]);
    }, We = function(e, t) {
      return e || 0 === e ? t(e) : t;
    }, Ue = function(e, t, r) {
      return r < e ? e : r > t ? t : r;
    }, Ke = function(e, t) {
      return A(e) && (t = Y.exec(e)) ? t[1] : "";
    }, Qe = [].slice, Ze = function(e, t) {
      return e && O(e) && "length" in e && (!t && !e.length || e.length - 1 in e && O(e[0])) && !e.nodeType && e !== o;
    }, Je = function(e, t, r) {
      return void 0 === r && (r = []), e.forEach((function(e) {
        var i;
        return A(e) && !t || Ze(e, 1) ? (i = r).push.apply(i, et(e)) : r.push(e);
      })) || r;
    }, et = function(e, t, r) {
      return s && !t && s.selector ? s.selector(e) : !A(e) || r || !l && Et() ? R(e) ? Je(e, r) : Ze(e) ? Qe.call(e, 0) : e ? [ e ] : [] : Qe.call((t || c).querySelectorAll(e), 0);
    }, tt = function(e) {
      return e = et(e)[0] || U("Invalid scope") || {}, function(t) {
        var r = e.current || e.nativeElement || e;
        return et(t, r.querySelectorAll ? r : r === e ? U("Invalid scope") || c.createElement("div") : e);
      };
    }, rt = function(e) {
      return e.sort((function() {
        return .5 - Math.random();
      }));
    }, it = function(e) {
      if (k(e)) {
        return e;
      }
      var t = O(e) ? e : {
        each: e
      }, r = Ot(t.ease), i = t.from || 0, n = parseFloat(t.base) || 0, s = {}, a = i > 0 && i < 1, o = isNaN(i) || a, l = t.axis, c = i, u = i;
      return A(i) ? c = u = {
        center: .5,
        edges: .5,
        end: 1
      }[i] || 0 : !a && o && (c = i[0], u = i[1]), function(e, a, d) {
        var p, f, h, m, g, v, y, _, w, T = (d || t).length, x = s[T];
        if (!x) {
          if (!(w = "auto" === t.grid ? 0 : (t.grid || [ 1, b ])[1])) {
            for (y = -b; y < (y = d[w++].getBoundingClientRect().left) && w < T; ) {}
            w < T && w--;
          }
          for (x = s[T] = [], p = o ? Math.min(w, T) * c - .5 : i % w, f = w === b ? 0 : o ? T * u / w - .5 : i / w | 0, 
          y = 0, _ = b, v = 0; v < T; v++) {
            h = v % w - p, m = f - (v / w | 0), x[v] = g = l ? Math.abs("y" === l ? m : h) : E(h * h + m * m), 
            g > y && (y = g), g < _ && (_ = g);
          }
          "random" === i && rt(x), x.max = y - _, x.min = _, x.v = T = (parseFloat(t.amount) || parseFloat(t.each) * (w > T ? T - 1 : l ? "y" === l ? T / w : w : Math.max(w, T / w)) || 0) * ("edges" === i ? -1 : 1), 
          x.b = T < 0 ? n - T : n, x.u = Ke(t.amount || t.each) || 0, r = r && T < 0 ? Pt(r) : r;
        }
        return T = (x[e] - x.min) / x.max || 0, he(x.b + (r ? r(T) : T) * x.v) + x.u;
      };
    }, nt = function(e) {
      var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
      return function(r) {
        var i = he(Math.round(parseFloat(r) / e) * e * t);
        return (i - i % 1) / t + (P(r) ? 0 : Ke(r));
      };
    }, st = function(e, t) {
      var r, i, n = R(e);
      return !n && O(e) && (r = n = e.radius || b, e.values ? (e = et(e.values), (i = !P(e[0])) && (r *= r)) : e = nt(e.increment)), 
      We(t, n ? k(e) ? function(t) {
        return i = e(t), Math.abs(i - t) <= r ? i : t;
      } : function(t) {
        for (var n, s, a = parseFloat(i ? t.x : t), o = parseFloat(i ? t.y : 0), l = b, c = 0, u = e.length; u--; ) {
          (n = i ? (n = e[u].x - a) * n + (s = e[u].y - o) * s : Math.abs(e[u] - a)) < l && (l = n, 
          c = u);
        }
        return c = !r || l <= r ? e[c] : t, i || c === t || P(t) ? c : c + Ke(t);
      } : nt(e));
    }, at = function(e, t, r, i) {
      return We(R(e) ? !t : !0 === r ? !!(r = 0) : !i, (function() {
        return R(e) ? e[~~(Math.random() * e.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((e - r / 2 + Math.random() * (t - e + .99 * r)) / r) * r * i) / i;
      }));
    }, ot = function(e, t, r) {
      return We(r, (function(r) {
        return e[~~t(r)];
      }));
    }, lt = function(e) {
      for (var t, r, i, n, s = 0, a = ""; ~(t = e.indexOf("random(", s)); ) {
        i = e.indexOf(")", t), n = "[" === e.charAt(t + 7), r = e.substr(t + 7, i - t - 7).match(n ? $ : F), 
        a += e.substr(s, t - s) + at(n ? r : +r[0], n ? 0 : +r[1], +r[2] || 1e-5), s = i + 1;
      }
      return a + e.substr(s, e.length - s);
    }, ct = function(e, t, r, i, n) {
      var s = t - e, a = i - r;
      return We(n, (function(t) {
        return r + ((t - e) / s * a || 0);
      }));
    }, ut = function(e, t, r) {
      var i, n, s, a = e.labels, o = b;
      for (i in a) {
        (n = a[i] - t) < 0 == !!r && n && o > (n = Math.abs(n)) && (s = i, o = n);
      }
      return s;
    }, dt = function(e, t, r) {
      var i, n, a, o = e.vars, l = o[t], c = s, u = e._ctx;
      if (l) {
        return i = o[t + "Params"], n = o.callbackScope || e, r && re.length && ve(), u && (s = u), 
        a = i ? l.apply(n, i) : l.call(n), s = c, a;
      }
    }, pt = function(e) {
      return Ae(e), e.scrollTrigger && e.scrollTrigger.kill(!!n), e.progress() < 1 && dt(e, "onInterrupt"), 
      e;
    }, ft = [], ht = function(e) {
      if (e) {
        if (e = !e.name && e.default || e, I() || e.headless) {
          var t = e.name, r = k(e), i = t && !r && e.init ? function() {
            this._props = [];
          } : e, n = {
            init: Q,
            render: sr,
            add: $t,
            kill: or,
            modifier: ar,
            rawVars: 0
          }, s = {
            targetTest: 0,
            get: 0,
            getSetter: tr,
            aliases: {},
            register: 0
          };
          if (Et(), e !== i) {
            if (ne[t]) {
              return;
            }
            we(i, we(Se(e, n), s)), Te(i.prototype, Te(n, Se(e, s))), ne[i.prop = t] = i, e.targetTest && (oe.push(i), 
            te[t] = 1), t = ("css" === t ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
          }
          K(t, i), e.register && e.register(xr, i, ur);
        } else {
          ft.push(e);
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
    }, vt = function(e, t, r) {
      return (6 * (e += e < 0 ? 1 : e > 1 ? -1 : 0) < 1 ? t + (r - t) * e * 6 : e < .5 ? r : 3 * e < 2 ? t + (r - t) * (2 / 3 - e) * 6 : t) * mt + .5 | 0;
    }, yt = function(e, t, r) {
      var i, n, s, a, o, l, c, u, d, p, f = e ? P(e) ? [ e >> 16, e >> 8 & mt, e & mt ] : 0 : gt.black;
      if (!f) {
        if ("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), gt[e]) {
          f = gt[e];
        } else if ("#" === e.charAt(0)) {
          if (e.length < 6 && (i = e.charAt(1), n = e.charAt(2), s = e.charAt(3), e = "#" + i + i + n + n + s + s + (5 === e.length ? e.charAt(4) + e.charAt(4) : "")), 
          9 === e.length) {
            return [ (f = parseInt(e.substr(1, 6), 16)) >> 16, f >> 8 & mt, f & mt, parseInt(e.substr(7), 16) / 255 ];
          }
          f = [ (e = parseInt(e.substr(1), 16)) >> 16, e >> 8 & mt, e & mt ];
        } else if ("hsl" === e.substr(0, 3)) {
          if (f = p = e.match(F), t) {
            if (~e.indexOf("=")) {
              return f = e.match(B), r && f.length < 4 && (f[3] = 1), f;
            }
          } else {
            a = +f[0] % 360 / 360, o = +f[1] / 100, i = 2 * (l = +f[2] / 100) - (n = l <= .5 ? l * (o + 1) : l + o - l * o), 
            f.length > 3 && (f[3] *= 1), f[0] = vt(a + 1 / 3, i, n), f[1] = vt(a, i, n), f[2] = vt(a - 1 / 3, i, n);
          }
        } else {
          f = e.match(F) || gt.transparent;
        }
        f = f.map(Number);
      }
      return t && !p && (i = f[0] / mt, n = f[1] / mt, s = f[2] / mt, l = ((c = Math.max(i, n, s)) + (u = Math.min(i, n, s))) / 2, 
      c === u ? a = o = 0 : (d = c - u, o = l > .5 ? d / (2 - c - u) : d / (c + u), a = c === i ? (n - s) / d + (n < s ? 6 : 0) : c === n ? (s - i) / d + 2 : (i - n) / d + 4, 
      a *= 60), f[0] = ~~(a + .5), f[1] = ~~(100 * o + .5), f[2] = ~~(100 * l + .5)), 
      r && f.length < 4 && (f[3] = 1), f;
    }, _t = function(e) {
      var t = [], r = [], i = -1;
      return e.split(wt).forEach((function(e) {
        var n = e.match(N) || [];
        t.push.apply(t, n), r.push(i += n.length + 1);
      })), t.c = r, t;
    }, bt = function(e, t, r) {
      var i, n, s, a, o = "", l = (e + o).match(wt), c = t ? "hsla(" : "rgba(", u = 0;
      if (!l) {
        return e;
      }
      if (l = l.map((function(e) {
        return (e = yt(e, t, 1)) && c + (t ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3] : e.join(",")) + ")";
      })), r && (s = _t(e), (i = r.c).join(o) !== s.c.join(o))) {
        for (a = (n = e.replace(wt, "1").split(N)).length - 1; u < a; u++) {
          o += n[u] + (~i.indexOf(u) ? l.shift() || c + "0,0,0,0)" : (s.length ? s : l.length ? l : r).shift());
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
      var t, r = e.join(" ");
      if (wt.lastIndex = 0, wt.test(r)) {
        return t = Tt.test(r), e[1] = bt(e[1], t), e[0] = bt(e[0], t, _t(e[1])), !0;
      }
    }, St = function() {
      var e, t, r, i, n, s, a = Date.now, d = 500, p = 33, h = a(), m = h, g = 1e3 / 240, v = g, y = [], _ = function r(o) {
        var l, c, u, f, _ = a() - m, b = !0 === o;
        if ((_ > d || _ < 0) && (h += _ - p), ((l = (u = (m += _) - h) - v) > 0 || b) && (f = ++i.frame, 
        n = u - 1e3 * i.time, i.time = u /= 1e3, v += l + (l >= g ? 4 : g - l), c = 1), 
        b || (e = t(r)), c) {
          for (s = 0; s < y.length; s++) {
            y[s](u, n, f, o);
          }
        }
      };
      return i = {
        time: 0,
        frame: 0,
        tick: function() {
          _(!0);
        },
        deltaRatio: function(e) {
          return n / (1e3 / (e || 60));
        },
        wake: function() {
          u && (!l && I() && (o = l = window, c = o.document || {}, H.gsap = xr, (o.gsapVersions || (o.gsapVersions = [])).push(xr.version), 
          j(X || o.GreenSockGlobals || !o.gsap && o || {}), ft.forEach(ht)), r = "undefined" != typeof requestAnimationFrame && requestAnimationFrame, 
          e && i.sleep(), t = r || function(e) {
            return setTimeout(e, v - 1e3 * i.time + 1 | 0);
          }, f = 1, _(2));
        },
        sleep: function() {
          (r ? cancelAnimationFrame : clearTimeout)(e), f = 0, t = Q;
        },
        lagSmoothing: function(e, t) {
          d = e || 1 / 0, p = Math.min(t || 33, d);
        },
        fps: function(e) {
          g = 1e3 / (e || 240), v = 1e3 * i.time + g;
        },
        add: function(e, t, r) {
          var n = t ? function(t, r, s, a) {
            e(t, r, s, a), i.remove(n);
          } : e;
          return i.remove(e), y[r ? "unshift" : "push"](n), Et(), n;
        },
        remove: function(e, t) {
          ~(t = y.indexOf(e)) && y.splice(t, 1) && s >= t && s--;
        },
        _listeners: y
      };
    }(), Et = function() {
      return !f && St.wake();
    }, Ct = {}, Mt = /^[\d.\-M][\d.\-,\s]/, At = /["']/g, kt = function(e) {
      for (var t, r, i, n = {}, s = e.substr(1, e.length - 3).split(":"), a = s[0], o = 1, l = s.length; o < l; o++) {
        r = s[o], t = o !== l - 1 ? r.lastIndexOf(",") : r.length, i = r.substr(0, t), n[a] = isNaN(i) ? i.replace(At, "").trim() : +i, 
        a = r.substr(t + 1).trim();
      }
      return n;
    }, Pt = function(e) {
      return function(t) {
        return 1 - e(1 - t);
      };
    }, Lt = function e(t, r) {
      for (var i, n = t._first; n; ) {
        n instanceof Bt ? e(n, r) : !n.vars.yoyoEase || n._yoyo && n._repeat || n._yoyo === r || (n.timeline ? e(n.timeline, r) : (i = n._ease, 
        n._ease = n._yEase, n._yEase = i, n._yoyo = r)), n = n._next;
      }
    }, Ot = function(e, t) {
      return e && (k(e) ? e : Ct[e] || function(e) {
        var t, r, i, n, s = (e + "").split("("), a = Ct[s[0]];
        return a && s.length > 1 && a.config ? a.config.apply(null, ~e.indexOf("{") ? [ kt(s[1]) ] : (t = e, 
        r = t.indexOf("(") + 1, i = t.indexOf(")"), n = t.indexOf("(", r), t.substring(r, ~n && n < i ? t.indexOf(")", i + 1) : i)).split(",").map(_e)) : Ct._CE && Mt.test(e) ? Ct._CE("", e) : a;
      }(e)) || t;
    }, Dt = function(e, t, r, i) {
      void 0 === r && (r = function(e) {
        return 1 - t(1 - e);
      }), void 0 === i && (i = function(e) {
        return e < .5 ? t(2 * e) / 2 : 1 - t(2 * (1 - e)) / 2;
      });
      var n, s = {
        easeIn: t,
        easeOut: r,
        easeInOut: i
      };
      return pe(e, (function(e) {
        for (var t in Ct[e] = H[e] = s, Ct[n = e.toLowerCase()] = r, s) {
          Ct[n + ("easeIn" === t ? ".in" : "easeOut" === t ? ".out" : ".inOut")] = Ct[e + "." + t] = s[t];
        }
      })), s;
    }, It = function(e) {
      return function(t) {
        return t < .5 ? (1 - e(1 - 2 * t)) / 2 : .5 + e(2 * (t - .5)) / 2;
      };
    }, zt = function e(t, r, i) {
      var n = r >= 1 ? r : 1, s = (i || (t ? .3 : .45)) / (r < 1 ? r : 1), a = s / T * (Math.asin(1 / n) || 0), o = function(e) {
        return 1 === e ? 1 : n * Math.pow(2, -10 * e) * M((e - a) * s) + 1;
      }, l = "out" === t ? o : "in" === t ? function(e) {
        return 1 - o(1 - e);
      } : It(o);
      return s = T / s, l.config = function(r, i) {
        return e(t, r, i);
      }, l;
    }, qt = function e(t, r) {
      void 0 === r && (r = 1.70158);
      var i = function(e) {
        return e ? --e * e * ((r + 1) * e + r) + 1 : 0;
      }, n = "out" === t ? i : "in" === t ? function(e) {
        return 1 - i(1 - e);
      } : It(i);
      return n.config = function(r) {
        return e(t, r);
      }, n;
    };
    pe("Linear,Quad,Cubic,Quart,Quint,Strong", (function(e, t) {
      var r = t < 5 ? t + 1 : t;
      Dt(e + ",Power" + (r - 1), t ? function(e) {
        return Math.pow(e, r);
      } : function(e) {
        return e;
      }, (function(e) {
        return 1 - Math.pow(1 - e, r);
      }), (function(e) {
        return e < .5 ? Math.pow(2 * e, r) / 2 : 1 - Math.pow(2 * (1 - e), r) / 2;
      }));
    })), Ct.Linear.easeNone = Ct.none = Ct.Linear.easeIn, Dt("Elastic", zt("in"), zt("out"), zt()), 
    h = 7.5625, g = 1 / (m = 2.75), Dt("Bounce", (function(e) {
      return 1 - v(1 - e);
    }), v = function(e) {
      return e < g ? h * e * e : e < .7272727272727273 ? h * Math.pow(e - 1.5 / m, 2) + .75 : e < .9090909090909092 ? h * (e -= 2.25 / m) * e + .9375 : h * Math.pow(e - 2.625 / m, 2) + .984375;
    }), Dt("Expo", (function(e) {
      return e ? Math.pow(2, 10 * (e - 1)) : 0;
    })), Dt("Circ", (function(e) {
      return -(E(1 - e * e) - 1);
    })), Dt("Sine", (function(e) {
      return 1 === e ? 1 : 1 - C(e * x);
    })), Dt("Back", qt("in"), qt("out"), qt()), Ct.SteppedEase = Ct.steps = H.SteppedEase = {
      config: function(e, t) {
        void 0 === e && (e = 1);
        var r = 1 / e, i = e + (t ? 0 : 1), n = t ? 1 : 0;
        return function(e) {
          return ((i * Ue(0, .99999999, e) | 0) + n) * r;
        };
      }
    }, _.ease = Ct["quad.out"], pe("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function(e) {
      return le += e + "," + e + "Params,";
    }));
    var Rt = function(e, t) {
      this.id = S++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : de, 
      this.set = t ? t.getSetter : tr;
    }, Ft = function() {
      function e(e) {
        this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, 
        this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, $e(this, +e.duration, 1, 1), 
        this.data = e.data, s && (this._ctx = s, s.data.push(this)), f || St.wake();
      }
      var t = e.prototype;
      return t.delay = function(e) {
        return e || 0 === e ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), 
        this._delay = e, this) : this._delay;
      }, t.duration = function(e) {
        return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur;
      }, t.totalDuration = function(e) {
        return arguments.length ? (this._dirty = 0, $e(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
      }, t.totalTime = function(e, t) {
        if (Et(), !arguments.length) {
          return this._tTime;
        }
        var r = this._dp;
        if (r && r.smoothChildTiming && this._ts) {
          for (qe(this, e), !r._dp || r.parent || Re(r, this); r && r.parent; ) {
            r.parent._time !== r._start + (r._ts >= 0 ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0), 
            r = r.parent;
          }
          !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && Fe(this._dp, this, this._start - this._delay);
        }
        return (this._tTime !== e || !this._dur && !t || this._initted && Math.abs(this._zTime) === w || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e), 
        ye(this, e, t)), this;
      }, t.time = function(e, t) {
        return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + Oe(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), t) : this._time;
      }, t.totalProgress = function(e, t) {
        return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0;
      }, t.progress = function(e, t) {
        return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? e : 1 - e) + Oe(this), t) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
      }, t.iteration = function(e, t) {
        var r = this.duration() + this._rDelay;
        return arguments.length ? this.totalTime(this._time + (e - 1) * r, t) : this._repeat ? De(this._tTime, r) + 1 : 1;
      }, t.timeScale = function(e, t) {
        if (!arguments.length) {
          return -1e-8 === this._rts ? 0 : this._rts;
        }
        if (this._rts === e) {
          return this;
        }
        var r = this.parent && this._ts ? Ie(this.parent._time, this) : this._tTime;
        return this._rts = +e || 0, this._ts = this._ps || -1e-8 === e ? 0 : this._rts, 
        this.totalTime(Ue(-Math.abs(this._delay), this._tDur, r), !1 !== t), ze(this), function(e) {
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
          return t && (t._sort || !this.parent) && Fe(t, this, e - this._delay), this;
        }
        return this._start;
      }, t.endTime = function(e) {
        return this._start + (D(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
      }, t.rawTime = function(e) {
        var t = this.parent || this._dp;
        return t ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ie(t.rawTime(e), this) : this._tTime : this._tTime;
      }, t.revert = function(e) {
        void 0 === e && (e = ee);
        var t = n;
        return n = e, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(e), 
        this.totalTime(-.01, e.suppressEvents)), "nested" !== this.data && !1 !== e.kill && this.kill(), 
        n = t, this;
      }, t.globalTime = function(e) {
        for (var t = this, r = arguments.length ? e : t.rawTime(); t; ) {
          r = t._start + r / (Math.abs(t._ts) || 1), t = t._dp;
        }
        return !this.parent && this._sat ? this._sat.globalTime(e) : r;
      }, t.repeat = function(e) {
        return arguments.length ? (this._repeat = e === 1 / 0 ? -2 : e, Ye(this)) : -2 === this._repeat ? 1 / 0 : this._repeat;
      }, t.repeatDelay = function(e) {
        if (arguments.length) {
          var t = this._time;
          return this._rDelay = e, Ye(this), t ? this.time(t) : this;
        }
        return this._rDelay;
      }, t.yoyo = function(e) {
        return arguments.length ? (this._yoyo = e, this) : this._yoyo;
      }, t.seek = function(e, t) {
        return this.totalTime(Xe(this, e), D(t));
      }, t.restart = function(e, t) {
        return this.play().totalTime(e ? -this._delay : 0, D(t));
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
        var e, t = this.parent || this._dp, r = this._start;
        return !(t && !(this._ts && this._initted && t.isActive() && (e = t.rawTime(!0)) >= r && e < this.endTime(!0) - w));
      }, t.eventCallback = function(e, t, r) {
        var i = this.vars;
        return arguments.length > 1 ? (t ? (i[e] = t, r && (i[e + "Params"] = r), "onUpdate" === e && (this._onUpdate = t)) : delete i[e], 
        this) : i[e];
      }, t.then = function(e) {
        var t = this;
        return new Promise((function(r) {
          var i = k(e) ? e : be, n = function() {
            var e = t.then;
            t.then = null, k(i) && (i = i(t)) && (i.then || i === t) && (t.then = e), r(i), 
            t.then = e;
          };
          t._initted && 1 === t.totalProgress() && t._ts >= 0 || !t._tTime && t._ts < 0 ? n() : t._prom = n;
        }));
      }, t.kill = function() {
        pt(this);
      }, e;
    }();
    we(Ft.prototype, {
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
    var Bt = function(r) {
      function i(t, i) {
        var n;
        return void 0 === t && (t = {}), (n = r.call(this, t) || this).labels = {}, n.smoothChildTiming = !!t.smoothChildTiming, 
        n.autoRemoveChildren = !!t.autoRemoveChildren, n._sort = D(t.sortChildren), a && Fe(t.parent || a, e(n), i), 
        t.reversed && n.reverse(), t.paused && n.paused(!0), t.scrollTrigger && Be(e(n), t.scrollTrigger), 
        n;
      }
      t(i, r);
      var s = i.prototype;
      return s.to = function(e, t, r) {
        return je(0, arguments, this), this;
      }, s.from = function(e, t, r) {
        return je(1, arguments, this), this;
      }, s.fromTo = function(e, t, r, i) {
        return je(2, arguments, this), this;
      }, s.set = function(e, t, r) {
        return t.duration = 0, t.parent = this, Ee(t).repeatDelay || (t.repeat = 0), t.immediateRender = !!t.immediateRender, 
        new Kt(e, t, Xe(this, r), 1), this;
      }, s.call = function(e, t, r) {
        return Fe(this, Kt.delayedCall(0, e, t), r);
      }, s.staggerTo = function(e, t, r, i, n, s, a) {
        return r.duration = t, r.stagger = r.stagger || i, r.onComplete = s, r.onCompleteParams = a, 
        r.parent = this, new Kt(e, r, Xe(this, n)), this;
      }, s.staggerFrom = function(e, t, r, i, n, s, a) {
        return r.runBackwards = 1, Ee(r).immediateRender = D(r.immediateRender), this.staggerTo(e, t, r, i, n, s, a);
      }, s.staggerFromTo = function(e, t, r, i, n, s, a, o) {
        return i.startAt = r, Ee(i).immediateRender = D(i.immediateRender), this.staggerTo(e, t, i, n, s, a, o);
      }, s.render = function(e, t, r) {
        var i, s, o, l, c, u, d, p, f, h, m, g, v = this._time, y = this._dirty ? this.totalDuration() : this._tDur, _ = this._dur, b = e <= 0 ? 0 : he(e), T = this._zTime < 0 != e < 0 && (this._initted || !_);
        if (this !== a && b > y && e >= 0 && (b = y), b !== this._tTime || r || T) {
          if (v !== this._time && _ && (b += this._time - v, e += this._time - v), i = b, 
          f = this._start, u = !(p = this._ts), T && (_ || (v = this._zTime), (e || !t) && (this._zTime = e)), 
          this._repeat) {
            if (m = this._yoyo, c = _ + this._rDelay, this._repeat < -1 && e < 0) {
              return this.totalTime(100 * c + e, t, r);
            }
            if (i = he(b % c), b === y ? (l = this._repeat, i = _) : ((l = ~~(b / c)) && l === b / c && (i = _, 
            l--), i > _ && (i = _)), h = De(this._tTime, c), !v && this._tTime && h !== l && this._tTime - h * c - this._dur <= 0 && (h = l), 
            m && 1 & l && (i = _ - i, g = 1), l !== h && !this._lock) {
              var x = m && 1 & h, S = x === (m && 1 & l);
              if (l < h && (x = !x), v = x ? 0 : b % _ ? _ : b, this._lock = 1, this.render(v || (g ? 0 : he(l * c)), t, !_)._lock = 0, 
              this._tTime = b, !t && this.parent && dt(this, "onRepeat"), this.vars.repeatRefresh && !g && (this.invalidate()._lock = 1), 
              v && v !== this._time || u !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
                return this;
              }
              if (_ = this._dur, y = this._tDur, S && (this._lock = 2, v = x ? _ : -1e-4, this.render(v, !0), 
              this.vars.repeatRefresh && !g && this.invalidate()), this._lock = 0, !this._ts && !u) {
                return this;
              }
              Lt(this, g);
            }
          }
          if (this._hasPause && !this._forcing && this._lock < 2 && (d = function(e, t, r) {
            var i;
            if (r > t) {
              for (i = e._first; i && i._start <= r; ) {
                if ("isPause" === i.data && i._start > t) {
                  return i;
                }
                i = i._next;
              }
            } else {
              for (i = e._last; i && i._start >= r; ) {
                if ("isPause" === i.data && i._start < t) {
                  return i;
                }
                i = i._prev;
              }
            }
          }(this, he(v), he(i)), d && (b -= i - (i = d._start))), this._tTime = b, this._time = i, 
          this._act = !p, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, 
          this._zTime = e, v = 0), !v && i && !t && !l && (dt(this, "onStart"), this._tTime !== b)) {
            return this;
          }
          if (i >= v && e >= 0) {
            for (s = this._first; s; ) {
              if (o = s._next, (s._act || i >= s._start) && s._ts && d !== s) {
                if (s.parent !== this) {
                  return this.render(e, t, r);
                }
                if (s.render(s._ts > 0 ? (i - s._start) * s._ts : (s._dirty ? s.totalDuration() : s._tDur) + (i - s._start) * s._ts, t, r), 
                i !== this._time || !this._ts && !u) {
                  d = 0, o && (b += this._zTime = -1e-8);
                  break;
                }
              }
              s = o;
            }
          } else {
            s = this._last;
            for (var E = e < 0 ? e : i; s; ) {
              if (o = s._prev, (s._act || E <= s._end) && s._ts && d !== s) {
                if (s.parent !== this) {
                  return this.render(e, t, r);
                }
                if (s.render(s._ts > 0 ? (E - s._start) * s._ts : (s._dirty ? s.totalDuration() : s._tDur) + (E - s._start) * s._ts, t, r || n && (s._initted || s._startAt)), 
                i !== this._time || !this._ts && !u) {
                  d = 0, o && (b += this._zTime = E ? -1e-8 : w);
                  break;
                }
              }
              s = o;
            }
          }
          if (d && !t && (this.pause(), d.render(i >= v ? 0 : -1e-8)._zTime = i >= v ? 1 : -1, 
          this._ts)) {
            return this._start = f, ze(this), this.render(e, t, r);
          }
          this._onUpdate && !t && dt(this, "onUpdate", !0), (b === y && this._tTime >= this.totalDuration() || !b && v) && (f !== this._start && Math.abs(p) === Math.abs(this._ts) || this._lock || ((e || !_) && (b === y && this._ts > 0 || !b && this._ts < 0) && Ae(this, 1), 
          t || e < 0 && !v || !b && !v && y || (dt(this, b === y && e >= 0 ? "onComplete" : "onReverseComplete", !0), 
          this._prom && !(b < y && this.timeScale() > 0) && this._prom())));
        }
        return this;
      }, s.add = function(e, t) {
        var r = this;
        if (P(t) || (t = Xe(this, t, e)), !(e instanceof Ft)) {
          if (R(e)) {
            return e.forEach((function(e) {
              return r.add(e, t);
            })), this;
          }
          if (A(e)) {
            return this.addLabel(e, t);
          }
          if (!k(e)) {
            return this;
          }
          e = Kt.delayedCall(0, e);
        }
        return this !== e ? Fe(this, e, t) : this;
      }, s.getChildren = function(e, t, r, i) {
        void 0 === e && (e = !0), void 0 === t && (t = !0), void 0 === r && (r = !0), void 0 === i && (i = -b);
        for (var n = [], s = this._first; s; ) {
          s._start >= i && (s instanceof Kt ? t && n.push(s) : (r && n.push(s), e && n.push.apply(n, s.getChildren(!0, t, r)))), 
          s = s._next;
        }
        return n;
      }, s.getById = function(e) {
        for (var t = this.getChildren(1, 1, 1), r = t.length; r--; ) {
          if (t[r].vars.id === e) {
            return t[r];
          }
        }
      }, s.remove = function(e) {
        return A(e) ? this.removeLabel(e) : k(e) ? this.killTweensOf(e) : (Me(this, e), 
        e === this._recent && (this._recent = this._last), ke(this));
      }, s.totalTime = function(e, t) {
        return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = he(St.time - (this._ts > 0 ? e / this._ts : (this.totalDuration() - e) / -this._ts))), 
        r.prototype.totalTime.call(this, e, t), this._forcing = 0, this) : this._tTime;
      }, s.addLabel = function(e, t) {
        return this.labels[e] = Xe(this, t), this;
      }, s.removeLabel = function(e) {
        return delete this.labels[e], this;
      }, s.addPause = function(e, t, r) {
        var i = Kt.delayedCall(0, t || Q, r);
        return i.data = "isPause", this._hasPause = 1, Fe(this, i, Xe(this, e));
      }, s.removePause = function(e) {
        var t = this._first;
        for (e = Xe(this, e); t; ) {
          t._start === e && "isPause" === t.data && Ae(t), t = t._next;
        }
      }, s.killTweensOf = function(e, t, r) {
        for (var i = this.getTweensOf(e, r), n = i.length; n--; ) {
          Nt !== i[n] && i[n].kill(e, t);
        }
        return this;
      }, s.getTweensOf = function(e, t) {
        for (var r, i = [], n = et(e), s = this._first, a = P(t); s; ) {
          s instanceof Kt ? ge(s._targets, n) && (a ? (!Nt || s._initted && s._ts) && s.globalTime(0) <= t && s.globalTime(s.totalDuration()) > t : !t || s.isActive()) && i.push(s) : (r = s.getTweensOf(n, t)).length && i.push.apply(i, r), 
          s = s._next;
        }
        return i;
      }, s.tweenTo = function(e, t) {
        t = t || {};
        var r, i = this, n = Xe(i, e), s = t, a = s.startAt, o = s.onStart, l = s.onStartParams, c = s.immediateRender, u = Kt.to(i, we({
          ease: t.ease || "none",
          lazy: !1,
          immediateRender: !1,
          time: n,
          overwrite: "auto",
          duration: t.duration || Math.abs((n - (a && "time" in a ? a.time : i._time)) / i.timeScale()) || w,
          onStart: function() {
            if (i.pause(), !r) {
              var e = t.duration || Math.abs((n - (a && "time" in a ? a.time : i._time)) / i.timeScale());
              u._dur !== e && $e(u, e, 0, 1).render(u._time, !0, !0), r = 1;
            }
            o && o.apply(u, l || []);
          }
        }, t));
        return c ? u.render(0) : u;
      }, s.tweenFromTo = function(e, t, r) {
        return this.tweenTo(t, we({
          startAt: {
            time: Xe(this, e)
          }
        }, r));
      }, s.recent = function() {
        return this._recent;
      }, s.nextLabel = function(e) {
        return void 0 === e && (e = this._time), ut(this, Xe(this, e));
      }, s.previousLabel = function(e) {
        return void 0 === e && (e = this._time), ut(this, Xe(this, e), 1);
      }, s.currentLabel = function(e) {
        return arguments.length ? this.seek(e, !0) : this.previousLabel(this._time + w);
      }, s.shiftChildren = function(e, t, r) {
        void 0 === r && (r = 0);
        for (var i, n = this._first, s = this.labels; n; ) {
          n._start >= r && (n._start += e, n._end += e), n = n._next;
        }
        if (t) {
          for (i in s) {
            s[i] >= r && (s[i] += e);
          }
        }
        return ke(this);
      }, s.invalidate = function(e) {
        var t = this._first;
        for (this._lock = 0; t; ) {
          t.invalidate(e), t = t._next;
        }
        return r.prototype.invalidate.call(this, e);
      }, s.clear = function(e) {
        void 0 === e && (e = !0);
        for (var t, r = this._first; r; ) {
          t = r._next, this.remove(r), r = t;
        }
        return this._dp && (this._time = this._tTime = this._pTime = 0), e && (this.labels = {}), 
        ke(this);
      }, s.totalDuration = function(e) {
        var t, r, i, n = 0, s = this, o = s._last, l = b;
        if (arguments.length) {
          return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -e : e));
        }
        if (s._dirty) {
          for (i = s.parent; o; ) {
            t = o._prev, o._dirty && o.totalDuration(), (r = o._start) > l && s._sort && o._ts && !s._lock ? (s._lock = 1, 
            Fe(s, o, r - o._delay, 1)._lock = 0) : l = r, r < 0 && o._ts && (n -= r, (!i && !s._dp || i && i.smoothChildTiming) && (s._start += r / s._ts, 
            s._time -= r, s._tTime -= r), s.shiftChildren(-r, !1, -Infinity), l = 0), o._end > n && o._ts && (n = o._end), 
            o = t;
          }
          $e(s, s === a && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
        }
        return s._tDur;
      }, i.updateRoot = function(e) {
        if (a._ts && (ye(a, Ie(e, a)), d = St.frame), St.frame >= ae) {
          ae += y.autoSleep || 120;
          var t = a._first;
          if ((!t || !t._ts) && y.autoSleep && St._listeners.length < 2) {
            for (;t && !t._ts; ) {
              t = t._next;
            }
            t || St.sleep();
          }
        }
      }, i;
    }(Ft);
    we(Bt.prototype, {
      _lock: 0,
      _hasPause: 0,
      _forcing: 0
    });
    var Nt, Gt, Vt = function(e, t, r, i, n, s, a) {
      var o, l, c, u, d, p, f, h, m = new ur(this._pt, e, t, 0, 1, nr, null, n), g = 0, v = 0;
      for (m.b = r, m.e = i, r += "", (f = ~(i += "").indexOf("random(")) && (i = lt(i)), 
      s && (s(h = [ r, i ], e, t), r = h[0], i = h[1]), l = r.match(G) || []; o = G.exec(i); ) {
        u = o[0], d = i.substring(g, o.index), c ? c = (c + 1) % 5 : "rgba(" === d.substr(-5) && (c = 1), 
        u !== l[v++] && (p = parseFloat(l[v - 1]) || 0, m._pt = {
          _next: m._pt,
          p: d || 1 === v ? d : ",",
          s: p,
          c: "=" === u.charAt(1) ? me(p, u) - p : parseFloat(u) - p,
          m: c && c < 4 ? Math.round : 0
        }, g = G.lastIndex);
      }
      return m.c = g < i.length ? i.substring(g, i.length) : "", m.fp = a, (V.test(i) || f) && (m.e = 0), 
      this._pt = m, m;
    }, $t = function(e, t, r, i, n, s, a, o, l, c) {
      k(i) && (i = i(n || 0, e, s));
      var u, d = e[t], p = "get" !== r ? r : k(d) ? l ? e[t.indexOf("set") || !k(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](l) : e[t]() : d, f = k(d) ? l ? Jt : Zt : Qt;
      if (A(i) && (~i.indexOf("random(") && (i = lt(i)), "=" === i.charAt(1) && ((u = me(p, i) + (Ke(p) || 0)) || 0 === u) && (i = u)), 
      !c || p !== i || Gt) {
        return isNaN(p * i) || "" === i ? (!d && !(t in e) && W(t, i), Vt.call(this, e, t, p, i, f, o || y.stringFilter, l)) : (u = new ur(this._pt, e, t, +p || 0, i - (p || 0), "boolean" == typeof d ? ir : rr, 0, f), 
        l && (u.fp = l), a && u.modifier(a, this, e), this._pt = u);
      }
    }, Yt = function(e, t, r, i, n, s) {
      var a, o, l, c;
      if (ne[e] && !1 !== (a = new ne[e]).init(n, a.rawVars ? t[e] : function(e, t, r, i, n) {
        if (k(e) && (e = jt(e, n, t, r, i)), !O(e) || e.style && e.nodeType || R(e) || q(e)) {
          return A(e) ? jt(e, n, t, r, i) : e;
        }
        var s, a = {};
        for (s in e) {
          a[s] = jt(e[s], n, t, r, i);
        }
        return a;
      }(t[e], i, n, s, r), r, i, s) && (r._pt = o = new ur(r._pt, n, e, 0, 1, a.render, a, 0, a.priority), 
      r !== p)) {
        for (l = r._ptLookup[r._targets.indexOf(n)], c = a._props.length; c--; ) {
          l[a._props[c]] = o;
        }
      }
      return a;
    }, Ht = function e(t, r, s) {
      var o, l, c, u, d, p, f, h, m, g, v, y, T, x = t.vars, S = x.ease, E = x.startAt, C = x.immediateRender, M = x.lazy, A = x.onUpdate, k = x.runBackwards, P = x.yoyoEase, L = x.keyframes, O = x.autoRevert, I = t._dur, z = t._startAt, q = t._targets, R = t.parent, F = R && "nested" === R.data ? R.vars.targets : q, B = "auto" === t._overwrite && !i, N = t.timeline;
      if (N && (!L || !S) && (S = "none"), t._ease = Ot(S, _.ease), t._yEase = P ? Pt(Ot(!0 === P ? S : P, _.ease)) : 0, 
      P && t._yoyo && !t._repeat && (P = t._yEase, t._yEase = t._ease, t._ease = P), t._from = !N && !!x.runBackwards, 
      !N || L && !x.stagger) {
        if (y = (h = q[0] ? ue(q[0]).harness : 0) && x[h.prop], o = Se(x, te), z && (z._zTime < 0 && z.progress(1), 
        r < 0 && k && C && !O ? z.render(-1, !0) : z.revert(k && I ? J : Z), z._lazy = 0), 
        E) {
          if (Ae(t._startAt = Kt.set(q, we({
            data: "isStart",
            overwrite: !1,
            parent: R,
            immediateRender: !0,
            lazy: !z && D(M),
            startAt: null,
            delay: 0,
            onUpdate: A && function() {
              return dt(t, "onUpdate");
            },
            stagger: 0
          }, E))), t._startAt._dp = 0, t._startAt._sat = t, r < 0 && (n || !C && !O) && t._startAt.revert(J), 
          C && I && r <= 0 && s <= 0) {
            return void (r && (t._zTime = r));
          }
        } else if (k && I && !z) {
          if (r && (C = !1), c = we({
            overwrite: !1,
            data: "isFromStart",
            lazy: C && !z && D(M),
            immediateRender: C,
            stagger: 0,
            parent: R
          }, o), y && (c[h.prop] = y), Ae(t._startAt = Kt.set(q, c)), t._startAt._dp = 0, 
          t._startAt._sat = t, r < 0 && (n ? t._startAt.revert(J) : t._startAt.render(-1, !0)), 
          t._zTime = r, C) {
            if (!r) {
              return;
            }
          } else {
            e(t._startAt, w, w);
          }
        }
        for (t._pt = t._ptCache = 0, M = I && D(M) || M && !I, l = 0; l < q.length; l++) {
          if (f = (d = q[l])._gsap || ce(q)[l]._gsap, t._ptLookup[l] = g = {}, ie[f.id] && re.length && ve(), 
          v = F === q ? l : F.indexOf(d), h && !1 !== (m = new h).init(d, y || o, t, v, F) && (t._pt = u = new ur(t._pt, d, m.name, 0, 1, m.render, m, 0, m.priority), 
          m._props.forEach((function(e) {
            g[e] = u;
          })), m.priority && (p = 1)), !h || y) {
            for (c in o) {
              ne[c] && (m = Yt(c, o, t, v, d, F)) ? m.priority && (p = 1) : g[c] = u = $t.call(t, d, c, "get", o[c], v, F, 0, x.stringFilter);
            }
          }
          t._op && t._op[l] && t.kill(d, t._op[l]), B && t._pt && (Nt = t, a.killTweensOf(d, g, t.globalTime(r)), 
          T = !t.parent, Nt = 0), t._pt && M && (ie[f.id] = 1);
        }
        p && cr(t), t._onInit && t._onInit(t);
      }
      t._onUpdate = A, t._initted = (!t._op || t._pt) && !T, L && r <= 0 && N.render(b, !0, !0);
    }, Xt = function(e, t, r, i) {
      var n, s, a = t.ease || i || "power1.inOut";
      if (R(t)) {
        s = r[e] || (r[e] = []), t.forEach((function(e, r) {
          return s.push({
            t: r / (t.length - 1) * 100,
            v: e,
            e: a
          });
        }));
      } else {
        for (n in t) {
          s = r[n] || (r[n] = []), "ease" === n || s.push({
            t: parseFloat(e),
            v: t[n],
            e: a
          });
        }
      }
    }, jt = function(e, t, r, i, n) {
      return k(e) ? e.call(t, r, i, n) : A(e) && ~e.indexOf("random(") ? lt(e) : e;
    }, Wt = le + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Ut = {};
    pe(Wt + ",id,stagger,delay,duration,paused,scrollTrigger", (function(e) {
      return Ut[e] = 1;
    }));
    var Kt = function(r) {
      function s(t, n, s, o) {
        var l;
        "number" == typeof n && (s.duration = n, n = s, s = null);
        var c, u, d, p, f, h, m, g, v = (l = r.call(this, o ? n : Ee(n)) || this).vars, _ = v.duration, b = v.delay, w = v.immediateRender, T = v.stagger, x = v.overwrite, S = v.keyframes, E = v.defaults, C = v.scrollTrigger, M = v.yoyoEase, A = n.parent || a, k = (R(t) || q(t) ? P(t[0]) : "length" in n) ? [ t ] : et(t);
        if (l._targets = k.length ? ce(k) : U("GSAP target " + t + " not found. https://gsap.com", !y.nullTargetWarn) || [], 
        l._ptLookup = [], l._overwrite = x, S || T || z(_) || z(b)) {
          if (n = l.vars, (c = l.timeline = new Bt({
            data: "nested",
            defaults: E || {},
            targets: A && "nested" === A.data ? A.vars.targets : k
          })).kill(), c.parent = c._dp = e(l), c._start = 0, T || z(_) || z(b)) {
            if (p = k.length, m = T && it(T), O(T)) {
              for (f in T) {
                ~Wt.indexOf(f) && (g || (g = {}), g[f] = T[f]);
              }
            }
            for (u = 0; u < p; u++) {
              (d = Se(n, Ut)).stagger = 0, M && (d.yoyoEase = M), g && Te(d, g), h = k[u], d.duration = +jt(_, e(l), u, h, k), 
              d.delay = (+jt(b, e(l), u, h, k) || 0) - l._delay, !T && 1 === p && d.delay && (l._delay = b = d.delay, 
              l._start += b, d.delay = 0), c.to(h, d, m ? m(u, h, k) : 0), c._ease = Ct.none;
            }
            c.duration() ? _ = b = 0 : l.timeline = 0;
          } else if (S) {
            Ee(we(c.vars.defaults, {
              ease: "none"
            })), c._ease = Ot(S.ease || n.ease || "none");
            var L, I, F, B = 0;
            if (R(S)) {
              S.forEach((function(e) {
                return c.to(k, e, ">");
              })), c.duration();
            } else {
              for (f in d = {}, S) {
                "ease" === f || "easeEach" === f || Xt(f, S[f], d, S.easeEach);
              }
              for (f in d) {
                for (L = d[f].sort((function(e, t) {
                  return e.t - t.t;
                })), B = 0, u = 0; u < L.length; u++) {
                  (F = {
                    ease: (I = L[u]).e,
                    duration: (I.t - (u ? L[u - 1].t : 0)) / 100 * _
                  })[f] = I.v, c.to(k, F, B), B += F.duration;
                }
              }
              c.duration() < _ && c.to({}, {
                duration: _ - c.duration()
              });
            }
          }
          _ || l.duration(_ = c.duration());
        } else {
          l.timeline = 0;
        }
        return !0 !== x || i || (Nt = e(l), a.killTweensOf(k), Nt = 0), Fe(A, e(l), s), 
        n.reversed && l.reverse(), n.paused && l.paused(!0), (w || !_ && !S && l._start === he(A._time) && D(w) && Le(e(l)) && "nested" !== A.data) && (l._tTime = -1e-8, 
        l.render(Math.max(0, -b) || 0)), C && Be(e(l), C), l;
      }
      t(s, r);
      var o = s.prototype;
      return o.render = function(e, t, r) {
        var i, s, a, o, l, c, u, d, p, f = this._time, h = this._tDur, m = this._dur, g = e < 0, v = e > h - w && !g ? h : e < w ? 0 : e;
        if (m) {
          if (v !== this._tTime || !e || r || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== g) {
            if (i = v, d = this.timeline, this._repeat) {
              if (o = m + this._rDelay, this._repeat < -1 && g) {
                return this.totalTime(100 * o + e, t, r);
              }
              if (i = he(v % o), v === h ? (a = this._repeat, i = m) : ((a = ~~(v / o)) && a === he(v / o) && (i = m, 
              a--), i > m && (i = m)), (c = this._yoyo && 1 & a) && (p = this._yEase, i = m - i), 
              l = De(this._tTime, o), i === f && !r && this._initted && a === l) {
                return this._tTime = v, this;
              }
              a !== l && (d && this._yEase && Lt(d, c), this.vars.repeatRefresh && !c && !this._lock && this._time !== o && this._initted && (this._lock = r = 1, 
              this.render(he(o * a), !0).invalidate()._lock = 0));
            }
            if (!this._initted) {
              if (Ne(this, g ? e : i, r, t, v)) {
                return this._tTime = 0, this;
              }
              if (!(f === this._time || r && this.vars.repeatRefresh && a !== l)) {
                return this;
              }
              if (m !== this._dur) {
                return this.render(e, t, r);
              }
            }
            if (this._tTime = v, this._time = i, !this._act && this._ts && (this._act = 1, this._lazy = 0), 
            this.ratio = u = (p || this._ease)(i / m), this._from && (this.ratio = u = 1 - u), 
            i && !f && !t && !a && (dt(this, "onStart"), this._tTime !== v)) {
              return this;
            }
            for (s = this._pt; s; ) {
              s.r(u, s.d), s = s._next;
            }
            d && d.render(e < 0 ? e : d._dur * d._ease(i / this._dur), t, r) || this._startAt && (this._zTime = e), 
            this._onUpdate && !t && (g && Pe(this, e, 0, r), dt(this, "onUpdate")), this._repeat && a !== l && this.vars.onRepeat && !t && this.parent && dt(this, "onRepeat"), 
            v !== this._tDur && v || this._tTime !== v || (g && !this._onUpdate && Pe(this, e, 0, !0), 
            (e || !m) && (v === this._tDur && this._ts > 0 || !v && this._ts < 0) && Ae(this, 1), 
            t || g && !f || !(v || f || c) || (dt(this, v === h ? "onComplete" : "onReverseComplete", !0), 
            this._prom && !(v < h && this.timeScale() > 0) && this._prom()));
          }
        } else {
          !function(e, t, r, i) {
            var s, a, o, l = e.ratio, c = t < 0 || !t && (!e._start && Ge(e) && (e._initted || !Ve(e)) || (e._ts < 0 || e._dp._ts < 0) && !Ve(e)) ? 0 : 1, u = e._rDelay, d = 0;
            if (u && e._repeat && (d = Ue(0, e._tDur, t), a = De(d, u), e._yoyo && 1 & a && (c = 1 - c), 
            a !== De(e._tTime, u) && (l = 1 - c, e.vars.repeatRefresh && e._initted && e.invalidate())), 
            c !== l || n || i || e._zTime === w || !t && e._zTime) {
              if (!e._initted && Ne(e, t, i, r, d)) {
                return;
              }
              for (o = e._zTime, e._zTime = t || (r ? w : 0), r || (r = t && !o), e.ratio = c, 
              e._from && (c = 1 - c), e._time = 0, e._tTime = d, s = e._pt; s; ) {
                s.r(c, s.d), s = s._next;
              }
              t < 0 && Pe(e, t, 0, !0), e._onUpdate && !r && dt(e, "onUpdate"), d && e._repeat && !r && e.parent && dt(e, "onRepeat"), 
              (t >= e._tDur || t < 0) && e.ratio === c && (c && Ae(e, 1), r || n || (dt(e, c ? "onComplete" : "onReverseComplete", !0), 
              e._prom && e._prom()));
            } else {
              e._zTime || (e._zTime = t);
            }
          }(this, e, t, r);
        }
        return this;
      }, o.targets = function() {
        return this._targets;
      }, o.invalidate = function(e) {
        return (!e || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, 
        this._ptLookup = [], this.timeline && this.timeline.invalidate(e), r.prototype.invalidate.call(this, e);
      }, o.resetTo = function(e, t, r, i, n) {
        f || St.wake(), this._ts || this.play();
        var s = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
        return this._initted || Ht(this, s), function(e, t, r, i, n, s, a, o) {
          var l, c, u, d, p = (e._pt && e._ptCache || (e._ptCache = {}))[t];
          if (!p) {
            for (p = e._ptCache[t] = [], u = e._ptLookup, d = e._targets.length; d--; ) {
              if ((l = u[d][t]) && l.d && l.d._pt) {
                for (l = l.d._pt; l && l.p !== t && l.fp !== t; ) {
                  l = l._next;
                }
              }
              if (!l) {
                return Gt = 1, e.vars[t] = "+=0", Ht(e, a), Gt = 0, o ? U(t + " not eligible for reset") : 1;
              }
              p.push(l);
            }
          }
          for (d = p.length; d--; ) {
            (l = (c = p[d])._pt || c).s = !i && 0 !== i || n ? l.s + (i || 0) + s * l.c : i, 
            l.c = r - l.s, c.e && (c.e = fe(r) + Ke(c.e)), c.b && (c.b = l.s + Ke(c.b));
          }
        }(this, e, t, r, i, this._ease(s / this._dur), s, n) ? this.resetTo(e, t, r, i, 1) : (qe(this, 0), 
        this.parent || Ce(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), 
        this.render(0));
      }, o.kill = function(e, t) {
        if (void 0 === t && (t = "all"), !(e || t && "all" !== t)) {
          return this._lazy = this._pt = 0, this.parent ? pt(this) : this;
        }
        if (this.timeline) {
          var r = this.timeline.totalDuration();
          return this.timeline.killTweensOf(e, t, Nt && !0 !== Nt.vars.overwrite)._first || pt(this), 
          this.parent && r !== this.timeline.totalDuration() && $e(this, this._dur * this.timeline._tDur / r, 0, 1), 
          this;
        }
        var i, n, s, a, o, l, c, u = this._targets, d = e ? et(e) : u, p = this._ptLookup, f = this._pt;
        if ((!t || "all" === t) && function(e, t) {
          for (var r = e.length, i = r === t.length; i && r-- && e[r] === t[r]; ) {}
          return r < 0;
        }(u, d)) {
          return "all" === t && (this._pt = 0), pt(this);
        }
        for (i = this._op = this._op || [], "all" !== t && (A(t) && (o = {}, pe(t, (function(e) {
          return o[e] = 1;
        })), t = o), t = function(e, t) {
          var r, i, n, s, a = e[0] ? ue(e[0]).harness : 0, o = a && a.aliases;
          if (!o) {
            return t;
          }
          for (i in r = Te({}, t), o) {
            if (i in r) {
              for (n = (s = o[i].split(",")).length; n--; ) {
                r[s[n]] = r[i];
              }
            }
          }
          return r;
        }(u, t)), c = u.length; c--; ) {
          if (~d.indexOf(u[c])) {
            for (o in n = p[c], "all" === t ? (i[c] = t, a = n, s = {}) : (s = i[c] = i[c] || {}, 
            a = t), a) {
              (l = n && n[o]) && ("kill" in l.d && !0 !== l.d.kill(o) || Me(this, l, "_pt"), delete n[o]), 
              "all" !== s && (s[o] = 1);
            }
          }
        }
        return this._initted && !this._pt && f && pt(this), this;
      }, s.to = function(e, t) {
        return new s(e, t, arguments[2]);
      }, s.from = function(e, t) {
        return je(1, arguments);
      }, s.delayedCall = function(e, t, r, i) {
        return new s(t, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: e,
          onComplete: t,
          onReverseComplete: t,
          onCompleteParams: r,
          onReverseCompleteParams: r,
          callbackScope: i
        });
      }, s.fromTo = function(e, t, r) {
        return je(2, arguments);
      }, s.set = function(e, t) {
        return t.duration = 0, t.repeatDelay || (t.repeat = 0), new s(e, t);
      }, s.killTweensOf = function(e, t, r) {
        return a.killTweensOf(e, t, r);
      }, s;
    }(Ft);
    we(Kt.prototype, {
      _targets: [],
      _lazy: 0,
      _startAt: 0,
      _op: 0,
      _onInit: 0
    }), pe("staggerTo,staggerFrom,staggerFromTo", (function(e) {
      Kt[e] = function() {
        var t = new Bt, r = Qe.call(arguments, 0);
        return r.splice("staggerFromTo" === e ? 5 : 4, 0, 0), t[e].apply(t, r);
      };
    }));
    var Qt = function(e, t, r) {
      return e[t] = r;
    }, Zt = function(e, t, r) {
      return e[t](r);
    }, Jt = function(e, t, r, i) {
      return e[t](i.fp, r);
    }, er = function(e, t, r) {
      return e.setAttribute(t, r);
    }, tr = function(e, t) {
      return k(e[t]) ? Zt : L(e[t]) && e.setAttribute ? er : Qt;
    }, rr = function(e, t) {
      return t.set(t.t, t.p, Math.round(1e6 * (t.s + t.c * e)) / 1e6, t);
    }, ir = function(e, t) {
      return t.set(t.t, t.p, !!(t.s + t.c * e), t);
    }, nr = function(e, t) {
      var r = t._pt, i = "";
      if (!e && t.b) {
        i = t.b;
      } else if (1 === e && t.e) {
        i = t.e;
      } else {
        for (;r; ) {
          i = r.p + (r.m ? r.m(r.s + r.c * e) : Math.round(1e4 * (r.s + r.c * e)) / 1e4) + i, 
          r = r._next;
        }
        i += t.c;
      }
      t.set(t.t, t.p, i, t);
    }, sr = function(e, t) {
      for (var r = t._pt; r; ) {
        r.r(e, r.d), r = r._next;
      }
    }, ar = function(e, t, r, i) {
      for (var n, s = this._pt; s; ) {
        n = s._next, s.p === i && s.modifier(e, t, r), s = n;
      }
    }, or = function(e) {
      for (var t, r, i = this._pt; i; ) {
        r = i._next, i.p === e && !i.op || i.op === e ? Me(this, i, "_pt") : i.dep || (t = 1), 
        i = r;
      }
      return !t;
    }, lr = function(e, t, r, i) {
      i.mSet(e, t, i.m.call(i.tween, r, i.mt), i);
    }, cr = function(e) {
      for (var t, r, i, n, s = e._pt; s; ) {
        for (t = s._next, r = i; r && r.pr > s.pr; ) {
          r = r._next;
        }
        (s._prev = r ? r._prev : n) ? s._prev._next = s : i = s, (s._next = r) ? r._prev = s : n = s, 
        s = t;
      }
      e._pt = i;
    }, ur = function() {
      function e(e, t, r, i, n, s, a, o, l) {
        this.t = t, this.s = i, this.c = n, this.p = r, this.r = s || rr, this.d = a || this, 
        this.set = o || Qt, this.pr = l || 0, this._next = e, e && (e._prev = this);
      }
      return e.prototype.modifier = function(e, t, r) {
        this.mSet = this.mSet || this.set, this.set = lr, this.m = e, this.mt = r, this.tween = t;
      }, e;
    }();
    pe(le + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function(e) {
      return te[e] = 1;
    })), H.TweenMax = H.TweenLite = Kt, H.TimelineLite = H.TimelineMax = Bt, a = new Bt({
      sortChildren: !1,
      defaults: _,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0
    }), y.stringFilter = xt;
    var dr = [], pr = {}, fr = [], hr = 0, mr = 0, gr = function(e) {
      return (pr[e] || fr).map((function(e) {
        return e();
      }));
    }, vr = function() {
      var e = Date.now(), t = [];
      e - hr > 2 && (gr("matchMediaInit"), dr.forEach((function(e) {
        var r, i, n, s, a = e.queries, l = e.conditions;
        for (i in a) {
          (r = o.matchMedia(a[i]).matches) && (n = 1), r !== l[i] && (l[i] = r, s = 1);
        }
        s && (e.revert(), n && t.push(e));
      })), gr("matchMediaRevert"), t.forEach((function(e) {
        return e.onMatch(e, (function(t) {
          return e.add(null, t);
        }));
      })), hr = e, gr("matchMedia"));
    }, yr = function() {
      function e(e, t) {
        this.selector = t && tt(t), this.data = [], this._r = [], this.isReverted = !1, 
        this.id = mr++, e && this.add(e);
      }
      var t = e.prototype;
      return t.add = function(e, t, r) {
        k(e) && (r = t, t = e, e = k);
        var i = this, n = function() {
          var e, n = s, a = i.selector;
          return n && n !== i && n.data.push(i), r && (i.selector = tt(r)), s = i, e = t.apply(i, arguments), 
          k(e) && i._r.push(e), s = n, i.selector = a, i.isReverted = !1, e;
        };
        return i.last = n, e === k ? n(i, (function(e) {
          return i.add(null, e);
        })) : e ? i[e] = n : n;
      }, t.ignore = function(e) {
        var t = s;
        s = null, e(this), s = t;
      }, t.getTweens = function() {
        var t = [];
        return this.data.forEach((function(r) {
          return r instanceof e ? t.push.apply(t, r.getTweens()) : r instanceof Kt && !(r.parent && "nested" === r.parent.data) && t.push(r);
        })), t;
      }, t.clear = function() {
        this._r.length = this.data.length = 0;
      }, t.kill = function(e, t) {
        var r = this;
        if (e ? function() {
          for (var t, i = r.getTweens(), n = r.data.length; n--; ) {
            "isFlip" === (t = r.data[n]).data && (t.revert(), t.getChildren(!0, !0, !1).forEach((function(e) {
              return i.splice(i.indexOf(e), 1);
            })));
          }
          for (i.map((function(e) {
            return {
              g: e._dur || e._delay || e._sat && !e._sat.vars.immediateRender ? e.globalTime(0) : -1 / 0,
              t: e
            };
          })).sort((function(e, t) {
            return t.g - e.g || -1 / 0;
          })).forEach((function(t) {
            return t.t.revert(e);
          })), n = r.data.length; n--; ) {
            (t = r.data[n]) instanceof Bt ? "nested" !== t.data && (t.scrollTrigger && t.scrollTrigger.revert(), 
            t.kill()) : !(t instanceof Kt) && t.revert && t.revert(e);
          }
          r._r.forEach((function(t) {
            return t(e, r);
          })), r.isReverted = !0;
        }() : this.data.forEach((function(e) {
          return e.kill && e.kill();
        })), this.clear(), t) {
          for (var i = dr.length; i--; ) {
            dr[i].id === this.id && dr.splice(i, 1);
          }
        }
      }, t.revert = function(e) {
        this.kill(e || {});
      }, e;
    }(), _r = function() {
      function e(e) {
        this.contexts = [], this.scope = e, s && s.data.push(this);
      }
      var t = e.prototype;
      return t.add = function(e, t, r) {
        O(e) || (e = {
          matches: e
        });
        var i, n, a, l = new yr(0, r || this.scope), c = l.conditions = {};
        for (n in s && !l.selector && (l.selector = s.selector), this.contexts.push(l), 
        t = l.add("onMatch", t), l.queries = e, e) {
          "all" === n ? a = 1 : (i = o.matchMedia(e[n])) && (dr.indexOf(l) < 0 && dr.push(l), 
          (c[n] = i.matches) && (a = 1), i.addListener ? i.addListener(vr) : i.addEventListener("change", vr));
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
    }(), br = {
      registerPlugin: function() {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) {
          t[r] = arguments[r];
        }
        t.forEach((function(e) {
          return ht(e);
        }));
      },
      timeline: function(e) {
        return new Bt(e);
      },
      getTweensOf: function(e, t) {
        return a.getTweensOf(e, t);
      },
      getProperty: function(e, t, r, i) {
        A(e) && (e = et(e)[0]);
        var n = ue(e || {}).get, s = r ? be : _e;
        return "native" === r && (r = ""), e ? t ? s((ne[t] && ne[t].get || n)(e, t, r, i)) : function(t, r, i) {
          return s((ne[t] && ne[t].get || n)(e, t, r, i));
        } : e;
      },
      quickSetter: function(e, t, r) {
        if ((e = et(e)).length > 1) {
          var i = e.map((function(e) {
            return xr.quickSetter(e, t, r);
          })), n = i.length;
          return function(e) {
            for (var t = n; t--; ) {
              i[t](e);
            }
          };
        }
        e = e[0] || {};
        var s = ne[t], a = ue(e), o = a.harness && (a.harness.aliases || {})[t] || t, l = s ? function(t) {
          var i = new s;
          p._pt = 0, i.init(e, r ? t + r : t, p, 0, [ e ]), i.render(1, i), p._pt && sr(1, p);
        } : a.set(e, o);
        return s ? l : function(t) {
          return l(e, o, r ? t + r : t, a, 1);
        };
      },
      quickTo: function(e, t, r) {
        var i, n = xr.to(e, Te(((i = {})[t] = "+=0.1", i.paused = !0, i), r || {})), s = function(e, r, i) {
          return n.resetTo(t, e, r, i);
        };
        return s.tween = n, s;
      },
      isTweening: function(e) {
        return a.getTweensOf(e, !0).length > 0;
      },
      defaults: function(e) {
        return e && e.ease && (e.ease = Ot(e.ease, _.ease)), xe(_, e || {});
      },
      config: function(e) {
        return xe(y, e || {});
      },
      registerEffect: function(e) {
        var t = e.name, r = e.effect, i = e.plugins, n = e.defaults, s = e.extendTimeline;
        (i || "").split(",").forEach((function(e) {
          return e && !ne[e] && !H[e] && U(t + " effect requires " + e + " plugin.");
        })), se[t] = function(e, t, i) {
          return r(et(e), we(t || {}, n), i);
        }, s && (Bt.prototype[t] = function(e, r, i) {
          return this.add(se[t](e, O(r) ? r : (i = r) && {}, this), i);
        });
      },
      registerEase: function(e, t) {
        Ct[e] = Ot(t);
      },
      parseEase: function(e, t) {
        return arguments.length ? Ot(e, t) : Ct;
      },
      getById: function(e) {
        return a.getById(e);
      },
      exportRoot: function(e, t) {
        void 0 === e && (e = {});
        var r, i, n = new Bt(e);
        for (n.smoothChildTiming = D(e.smoothChildTiming), a.remove(n), n._dp = 0, n._time = n._tTime = a._time, 
        r = a._first; r; ) {
          i = r._next, !t && !r._dur && r instanceof Kt && r.vars.onComplete === r._targets[0] || Fe(n, r, r._start - r._delay), 
          r = i;
        }
        return Fe(a, n, 0), n;
      },
      context: function(e, t) {
        return e ? new yr(e, t) : s;
      },
      matchMedia: function(e) {
        return new _r(e);
      },
      matchMediaRefresh: function() {
        return dr.forEach((function(e) {
          var t, r, i = e.conditions;
          for (r in i) {
            i[r] && (i[r] = !1, t = 1);
          }
          t && e.revert();
        })) || vr();
      },
      addEventListener: function(e, t) {
        var r = pr[e] || (pr[e] = []);
        ~r.indexOf(t) || r.push(t);
      },
      removeEventListener: function(e, t) {
        var r = pr[e], i = r && r.indexOf(t);
        i >= 0 && r.splice(i, 1);
      },
      utils: {
        wrap: function e(t, r, i) {
          var n = r - t;
          return R(t) ? ot(t, e(0, t.length), r) : We(i, (function(e) {
            return (n + (e - t) % n) % n + t;
          }));
        },
        wrapYoyo: function e(t, r, i) {
          var n = r - t, s = 2 * n;
          return R(t) ? ot(t, e(0, t.length - 1), r) : We(i, (function(e) {
            return t + ((e = (s + (e - t) % s) % s || 0) > n ? s - e : e);
          }));
        },
        distribute: it,
        random: at,
        snap: st,
        normalize: function(e, t, r) {
          return ct(e, t, 0, 1, r);
        },
        getUnit: Ke,
        clamp: function(e, t, r) {
          return We(r, (function(r) {
            return Ue(e, t, r);
          }));
        },
        splitColor: yt,
        toArray: et,
        selector: tt,
        mapRange: ct,
        pipe: function() {
          for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) {
            t[r] = arguments[r];
          }
          return function(e) {
            return t.reduce((function(e, t) {
              return t(e);
            }), e);
          };
        },
        unitize: function(e, t) {
          return function(r) {
            return e(parseFloat(r)) + (t || Ke(r));
          };
        },
        interpolate: function e(t, r, i, n) {
          var s = isNaN(t + r) ? 0 : function(e) {
            return (1 - e) * t + e * r;
          };
          if (!s) {
            var a, o, l, c, u, d = A(t), p = {};
            if (!0 === i && (n = 1) && (i = null), d) {
              t = {
                p: t
              }, r = {
                p: r
              };
            } else if (R(t) && !R(r)) {
              for (l = [], c = t.length, u = c - 2, o = 1; o < c; o++) {
                l.push(e(t[o - 1], t[o]));
              }
              c--, s = function(e) {
                e *= c;
                var t = Math.min(u, ~~e);
                return l[t](e - t);
              }, i = r;
            } else {
              n || (t = Te(R(t) ? [] : {}, t));
            }
            if (!l) {
              for (a in r) {
                $t.call(p, t, a, "get", r[a]);
              }
              s = function(e) {
                return sr(e, p) || (d ? t.p : t);
              };
            }
          }
          return We(i, s);
        },
        shuffle: rt
      },
      install: j,
      effects: se,
      ticker: St,
      updateRoot: Bt.updateRoot,
      plugins: ne,
      globalTimeline: a,
      core: {
        PropTween: ur,
        globals: K,
        Tween: Kt,
        Timeline: Bt,
        Animation: Ft,
        getCache: ue,
        _removeLinkedListItem: Me,
        reverting: function() {
          return n;
        },
        context: function(e) {
          return e && s && (s.data.push(e), e._ctx = s), s;
        },
        suppressOverwrites: function(e) {
          return i = e;
        }
      }
    };
    pe("to,from,fromTo,delayedCall,set,killTweensOf", (function(e) {
      return br[e] = Kt[e];
    })), St.add(Bt.updateRoot), p = br.to({}, {
      duration: 0
    });
    var wr = function(e, t) {
      for (var r = e._pt; r && r.p !== t && r.op !== t && r.fp !== t; ) {
        r = r._next;
      }
      return r;
    }, Tr = function(e, t) {
      return {
        name: e,
        rawVars: 1,
        init: function(e, r, i) {
          i._onInit = function(e) {
            var i, n;
            if (A(r) && (i = {}, pe(r, (function(e) {
              return i[e] = 1;
            })), r = i), t) {
              for (n in i = {}, r) {
                i[n] = t(r[n]);
              }
              r = i;
            }
            !function(e, t) {
              var r, i, n, s = e._targets;
              for (r in t) {
                for (i = s.length; i--; ) {
                  (n = e._ptLookup[i][r]) && (n = n.d) && (n._pt && (n = wr(n, r)), n && n.modifier && n.modifier(t[r], e, s[i], r));
                }
              }
            }(e, r);
          };
        }
      };
    }, xr = br.registerPlugin({
      name: "attr",
      init: function(e, t, r, i, n) {
        var s, a, o;
        for (s in this.tween = r, t) {
          o = e.getAttribute(s) || "", (a = this.add(e, "setAttribute", (o || 0) + "", t[s], i, n, 0, 0, s)).op = s, 
          a.b = o, this._props.push(s);
        }
      },
      render: function(e, t) {
        for (var r = t._pt; r; ) {
          n ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d), r = r._next;
        }
      }
    }, {
      name: "endArray",
      init: function(e, t) {
        for (var r = t.length; r--; ) {
          this.add(e, r, e[r] || 0, t[r], 0, 0, 0, 0, 0, 1);
        }
      }
    }, Tr("roundProps", nt), Tr("modifiers"), Tr("snap", st)) || br;
    Kt.version = Bt.version = xr.version = "3.12.5", u = 1, I() && Et();
    Ct.Power0, Ct.Power1, Ct.Power2, Ct.Power3, Ct.Power4, Ct.Linear, Ct.Quad, Ct.Cubic, 
    Ct.Quart, Ct.Quint, Ct.Strong, Ct.Elastic, Ct.Back, Ct.SteppedEase, Ct.Bounce, Ct.Sine, 
    Ct.Expo, Ct.Circ;
    var Sr, Er, Cr, Mr, Ar, kr, Pr, Lr, Or = {}, Dr = 180 / Math.PI, Ir = Math.PI / 180, zr = Math.atan2, qr = /([A-Z])/g, Rr = /(left|right|width|margin|padding|x)/i, Fr = /[\s,\(]\S/, Br = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity"
    }, Nr = function(e, t) {
      return t.set(t.t, t.p, Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t);
    }, Gr = function(e, t) {
      return t.set(t.t, t.p, 1 === e ? t.e : Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t);
    }, Vr = function(e, t) {
      return t.set(t.t, t.p, e ? Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u : t.b, t);
    }, $r = function(e, t) {
      var r = t.s + t.c * e;
      t.set(t.t, t.p, ~~(r + (r < 0 ? -.5 : .5)) + t.u, t);
    }, Yr = function(e, t) {
      return t.set(t.t, t.p, e ? t.e : t.b, t);
    }, Hr = function(e, t) {
      return t.set(t.t, t.p, 1 !== e ? t.b : t.e, t);
    }, Xr = function(e, t, r) {
      return e.style[t] = r;
    }, jr = function(e, t, r) {
      return e.style.setProperty(t, r);
    }, Wr = function(e, t, r) {
      return e._gsap[t] = r;
    }, Ur = function(e, t, r) {
      return e._gsap.scaleX = e._gsap.scaleY = r;
    }, Kr = function(e, t, r, i, n) {
      var s = e._gsap;
      s.scaleX = s.scaleY = r, s.renderTransform(n, s);
    }, Qr = function(e, t, r, i, n) {
      var s = e._gsap;
      s[t] = r, s.renderTransform(n, s);
    }, Zr = "transform", Jr = Zr + "Origin", ei = function e(t, r) {
      var i = this, n = this.target, s = n.style, a = n._gsap;
      if (t in Or && s) {
        if (this.tfm = this.tfm || {}, "transform" === t) {
          return Br.transform.split(",").forEach((function(t) {
            return e.call(i, t, r);
          }));
        }
        if (~(t = Br[t] || t).indexOf(",") ? t.split(",").forEach((function(e) {
          return i.tfm[e] = yi(n, e);
        })) : this.tfm[t] = a.x ? a[t] : yi(n, t), t === Jr && (this.tfm.zOrigin = a.zOrigin), 
        this.props.indexOf(Zr) >= 0) {
          return;
        }
        a.svg && (this.svgo = n.getAttribute("data-svg-origin"), this.props.push(Jr, r, "")), 
        t = Zr;
      }
      (s || r) && this.props.push(t, r, s[t]);
    }, ti = function(e) {
      e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
    }, ri = function() {
      var e, t, r = this.props, i = this.target, n = i.style, s = i._gsap;
      for (e = 0; e < r.length; e += 3) {
        r[e + 1] ? i[r[e]] = r[e + 2] : r[e + 2] ? n[r[e]] = r[e + 2] : n.removeProperty("--" === r[e].substr(0, 2) ? r[e] : r[e].replace(qr, "-$1").toLowerCase());
      }
      if (this.tfm) {
        for (t in this.tfm) {
          s[t] = this.tfm[t];
        }
        s.svg && (s.renderTransform(), i.setAttribute("data-svg-origin", this.svgo || "")), 
        (e = Pr()) && e.isStart || n[Zr] || (ti(n), s.zOrigin && n[Jr] && (n[Jr] += " " + s.zOrigin + "px", 
        s.zOrigin = 0, s.renderTransform()), s.uncache = 1);
      }
    }, ii = function(e, t) {
      var r = {
        target: e,
        props: [],
        revert: ri,
        save: ei
      };
      return e._gsap || xr.core.getCache(e), t && t.split(",").forEach((function(e) {
        return r.save(e);
      })), r;
    }, ni = function(e, t) {
      var r = Er.createElementNS ? Er.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Er.createElement(e);
      return r && r.style ? r : Er.createElement(e);
    }, si = function e(t, r, i) {
      var n = getComputedStyle(t);
      return n[r] || n.getPropertyValue(r.replace(qr, "-$1").toLowerCase()) || n.getPropertyValue(r) || !i && e(t, oi(r) || r, 1) || "";
    }, ai = "O,Moz,ms,Ms,Webkit".split(","), oi = function(e, t, r) {
      var i = (t || Ar).style, n = 5;
      if (e in i && !r) {
        return e;
      }
      for (e = e.charAt(0).toUpperCase() + e.substr(1); n-- && !(ai[n] + e in i); ) {}
      return n < 0 ? null : (3 === n ? "ms" : n >= 0 ? ai[n] : "") + e;
    }, li = function() {
      "undefined" != typeof window && window.document && (Sr = window, Er = Sr.document, 
      Cr = Er.documentElement, Ar = ni("div") || {
        style: {}
      }, ni("div"), Zr = oi(Zr), Jr = Zr + "Origin", Ar.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", 
      Lr = !!oi("perspective"), Pr = xr.core.reverting, Mr = 1);
    }, ci = function e(t) {
      var r, i = ni("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = this.parentNode, s = this.nextSibling, a = this.style.cssText;
      if (Cr.appendChild(i), i.appendChild(this), this.style.display = "block", t) {
        try {
          r = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = e;
        } catch (e) {}
      } else {
        this._gsapBBox && (r = this._gsapBBox());
      }
      return n && (s ? n.insertBefore(this, s) : n.appendChild(this)), Cr.removeChild(i), 
      this.style.cssText = a, r;
    }, ui = function(e, t) {
      for (var r = t.length; r--; ) {
        if (e.hasAttribute(t[r])) {
          return e.getAttribute(t[r]);
        }
      }
    }, di = function(e) {
      var t;
      try {
        t = e.getBBox();
      } catch (r) {
        t = ci.call(e, !0);
      }
      return t && (t.width || t.height) || e.getBBox === ci || (t = ci.call(e, !0)), !t || t.width || t.x || t.y ? t : {
        x: +ui(e, [ "x", "cx", "x1" ]) || 0,
        y: +ui(e, [ "y", "cy", "y1" ]) || 0,
        width: 0,
        height: 0
      };
    }, pi = function(e) {
      return !(!e.getCTM || e.parentNode && !e.ownerSVGElement || !di(e));
    }, fi = function(e, t) {
      if (t) {
        var r, i = e.style;
        t in Or && t !== Jr && (t = Zr), i.removeProperty ? ("ms" !== (r = t.substr(0, 2)) && "webkit" !== t.substr(0, 6) || (t = "-" + t), 
        i.removeProperty("--" === r ? t : t.replace(qr, "-$1").toLowerCase())) : i.removeAttribute(t);
      }
    }, hi = function(e, t, r, i, n, s) {
      var a = new ur(e._pt, t, r, 0, 1, s ? Hr : Yr);
      return e._pt = a, a.b = i, a.e = n, e._props.push(r), a;
    }, mi = {
      deg: 1,
      rad: 1,
      turn: 1
    }, gi = {
      grid: 1,
      flex: 1
    }, vi = function e(t, r, i, n) {
      var s, a, o, l, c = parseFloat(i) || 0, u = (i + "").trim().substr((c + "").length) || "px", d = Ar.style, p = Rr.test(r), f = "svg" === t.tagName.toLowerCase(), h = (f ? "client" : "offset") + (p ? "Width" : "Height"), m = 100, g = "px" === n, v = "%" === n;
      if (n === u || !c || mi[n] || mi[u]) {
        return c;
      }
      if ("px" !== u && !g && (c = e(t, r, i, "px")), l = t.getCTM && pi(t), (v || "%" === u) && (Or[r] || ~r.indexOf("adius"))) {
        return s = l ? t.getBBox()[p ? "width" : "height"] : t[h], fe(v ? c / s * m : c / 100 * s);
      }
      if (d[p ? "width" : "height"] = m + (g ? u : n), a = ~r.indexOf("adius") || "em" === n && t.appendChild && !f ? t : t.parentNode, 
      l && (a = (t.ownerSVGElement || {}).parentNode), a && a !== Er && a.appendChild || (a = Er.body), 
      (o = a._gsap) && v && o.width && p && o.time === St.time && !o.uncache) {
        return fe(c / o.width * m);
      }
      if (!v || "height" !== r && "width" !== r) {
        (v || "%" === u) && !gi[si(a, "display")] && (d.position = si(t, "position")), a === t && (d.position = "static"), 
        a.appendChild(Ar), s = Ar[h], a.removeChild(Ar), d.position = "absolute";
      } else {
        var y = t.style[r];
        t.style[r] = m + n, s = t[h], y ? t.style[r] = y : fi(t, r);
      }
      return p && v && ((o = ue(a)).time = St.time, o.width = a[h]), fe(g ? s * c / m : s && c ? m / s * c : 0);
    }, yi = function(e, t, r, i) {
      var n;
      return Mr || li(), t in Br && "transform" !== t && ~(t = Br[t]).indexOf(",") && (t = t.split(",")[0]), 
      Or[t] && "transform" !== t ? (n = ki(e, i), n = "transformOrigin" !== t ? n[t] : n.svg ? n.origin : Pi(si(e, Jr)) + " " + n.zOrigin + "px") : (!(n = e.style[t]) || "auto" === n || i || ~(n + "").indexOf("calc(")) && (n = Ti[t] && Ti[t](e, t, r) || si(e, t) || de(e, t) || ("opacity" === t ? 1 : 0)), 
      r && !~(n + "").trim().indexOf(" ") ? vi(e, t, n, r) + r : n;
    }, _i = function(e, t, r, i) {
      if (!r || "none" === r) {
        var n = oi(t, e, 1), s = n && si(e, n, 1);
        s && s !== r ? (t = n, r = s) : "borderColor" === t && (r = si(e, "borderTopColor"));
      }
      var a, o, l, c, u, d, p, f, h, m, g, v = new ur(this._pt, e.style, t, 0, 1, nr), _ = 0, b = 0;
      if (v.b = r, v.e = i, r += "", "auto" === (i += "") && (d = e.style[t], e.style[t] = i, 
      i = si(e, t) || i, d ? e.style[t] = d : fi(e, t)), xt(a = [ r, i ]), i = a[1], l = (r = a[0]).match(N) || [], 
      (i.match(N) || []).length) {
        for (;o = N.exec(i); ) {
          p = o[0], h = i.substring(_, o.index), u ? u = (u + 1) % 5 : "rgba(" !== h.substr(-5) && "hsla(" !== h.substr(-5) || (u = 1), 
          p !== (d = l[b++] || "") && (c = parseFloat(d) || 0, g = d.substr((c + "").length), 
          "=" === p.charAt(1) && (p = me(c, p) + g), f = parseFloat(p), m = p.substr((f + "").length), 
          _ = N.lastIndex - m.length, m || (m = m || y.units[t] || g, _ === i.length && (i += m, 
          v.e += m)), g !== m && (c = vi(e, t, d, m) || 0), v._pt = {
            _next: v._pt,
            p: h || 1 === b ? h : ",",
            s: c,
            c: f - c,
            m: u && u < 4 || "zIndex" === t ? Math.round : 0
          });
        }
        v.c = _ < i.length ? i.substring(_, i.length) : "";
      } else {
        v.r = "display" === t && "none" === i ? Hr : Yr;
      }
      return V.test(i) && (v.e = 0), this._pt = v, v;
    }, bi = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%"
    }, wi = function(e, t) {
      if (t.tween && t.tween._time === t.tween._dur) {
        var r, i, n, s = t.t, a = s.style, o = t.u, l = s._gsap;
        if ("all" === o || !0 === o) {
          a.cssText = "", i = 1;
        } else {
          for (n = (o = o.split(",")).length; --n > -1; ) {
            r = o[n], Or[r] && (i = 1, r = "transformOrigin" === r ? Jr : Zr), fi(s, r);
          }
        }
        i && (fi(s, Zr), l && (l.svg && s.removeAttribute("transform"), ki(s, 1), l.uncache = 1, 
        ti(a)));
      }
    }, Ti = {
      clearProps: function(e, t, r, i, n) {
        if ("isFromStart" !== n.data) {
          var s = e._pt = new ur(e._pt, t, r, 0, 0, wi);
          return s.u = i, s.pr = -10, s.tween = n, e._props.push(r), 1;
        }
      }
    }, xi = [ 1, 0, 0, 1, 0, 0 ], Si = {}, Ei = function(e) {
      return "matrix(1, 0, 0, 1, 0, 0)" === e || "none" === e || !e;
    }, Ci = function(e) {
      var t = si(e, Zr);
      return Ei(t) ? xi : t.substr(7).match(B).map(fe);
    }, Mi = function(e, t) {
      var r, i, n, s, a = e._gsap || ue(e), o = e.style, l = Ci(e);
      return a.svg && e.getAttribute("transform") ? "1,0,0,1,0,0" === (l = [ (n = e.transform.baseVal.consolidate().matrix).a, n.b, n.c, n.d, n.e, n.f ]).join(",") ? xi : l : (l !== xi || e.offsetParent || e === Cr || a.svg || (n = o.display, 
      o.display = "block", (r = e.parentNode) && e.offsetParent || (s = 1, i = e.nextElementSibling, 
      Cr.appendChild(e)), l = Ci(e), n ? o.display = n : fi(e, "display"), s && (i ? r.insertBefore(e, i) : r ? r.appendChild(e) : Cr.removeChild(e))), 
      t && l.length > 6 ? [ l[0], l[1], l[4], l[5], l[12], l[13] ] : l);
    }, Ai = function(e, t, r, i, n, s) {
      var a, o, l, c = e._gsap, u = n || Mi(e, !0), d = c.xOrigin || 0, p = c.yOrigin || 0, f = c.xOffset || 0, h = c.yOffset || 0, m = u[0], g = u[1], v = u[2], y = u[3], _ = u[4], b = u[5], w = t.split(" "), T = parseFloat(w[0]) || 0, x = parseFloat(w[1]) || 0;
      r ? u !== xi && (o = m * y - g * v) && (l = T * (-g / o) + x * (m / o) - (m * b - g * _) / o, 
      T = T * (y / o) + x * (-v / o) + (v * b - y * _) / o, x = l) : (T = (a = di(e)).x + (~w[0].indexOf("%") ? T / 100 * a.width : T), 
      x = a.y + (~(w[1] || w[0]).indexOf("%") ? x / 100 * a.height : x)), i || !1 !== i && c.smooth ? (_ = T - d, 
      b = x - p, c.xOffset = f + (_ * m + b * v) - _, c.yOffset = h + (_ * g + b * y) - b) : c.xOffset = c.yOffset = 0, 
      c.xOrigin = T, c.yOrigin = x, c.smooth = !!i, c.origin = t, c.originIsAbsolute = !!r, 
      e.style[Jr] = "0px 0px", s && (hi(s, c, "xOrigin", d, T), hi(s, c, "yOrigin", p, x), 
      hi(s, c, "xOffset", f, c.xOffset), hi(s, c, "yOffset", h, c.yOffset)), e.setAttribute("data-svg-origin", T + " " + x);
    }, ki = function(e, t) {
      var r = e._gsap || new Rt(e);
      if ("x" in r && !t && !r.uncache) {
        return r;
      }
      var i, n, s, a, o, l, c, u, d, p, f, h, m, g, v, _, b, w, T, x, S, E, C, M, A, k, P, L, O, D, I, z, q = e.style, R = r.scaleX < 0, F = "px", B = "deg", N = getComputedStyle(e), G = si(e, Jr) || "0";
      return i = n = s = l = c = u = d = p = f = 0, a = o = 1, r.svg = !(!e.getCTM || !pi(e)), 
      N.translate && ("none" === N.translate && "none" === N.scale && "none" === N.rotate || (q[Zr] = ("none" !== N.translate ? "translate3d(" + (N.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + ("none" !== N.rotate ? "rotate(" + N.rotate + ") " : "") + ("none" !== N.scale ? "scale(" + N.scale.split(" ").join(",") + ") " : "") + ("none" !== N[Zr] ? N[Zr] : "")), 
      q.scale = q.rotate = q.translate = "none"), g = Mi(e, r.svg), r.svg && (r.uncache ? (A = e.getBBox(), 
      G = r.xOrigin - A.x + "px " + (r.yOrigin - A.y) + "px", M = "") : M = !t && e.getAttribute("data-svg-origin"), 
      Ai(e, M || G, !!M || r.originIsAbsolute, !1 !== r.smooth, g)), h = r.xOrigin || 0, 
      m = r.yOrigin || 0, g !== xi && (w = g[0], T = g[1], x = g[2], S = g[3], i = E = g[4], 
      n = C = g[5], 6 === g.length ? (a = Math.sqrt(w * w + T * T), o = Math.sqrt(S * S + x * x), 
      l = w || T ? zr(T, w) * Dr : 0, (d = x || S ? zr(x, S) * Dr + l : 0) && (o *= Math.abs(Math.cos(d * Ir))), 
      r.svg && (i -= h - (h * w + m * x), n -= m - (h * T + m * S))) : (z = g[6], D = g[7], 
      P = g[8], L = g[9], O = g[10], I = g[11], i = g[12], n = g[13], s = g[14], c = (v = zr(z, O)) * Dr, 
      v && (M = E * (_ = Math.cos(-v)) + P * (b = Math.sin(-v)), A = C * _ + L * b, k = z * _ + O * b, 
      P = E * -b + P * _, L = C * -b + L * _, O = z * -b + O * _, I = D * -b + I * _, 
      E = M, C = A, z = k), u = (v = zr(-x, O)) * Dr, v && (_ = Math.cos(-v), I = S * (b = Math.sin(-v)) + I * _, 
      w = M = w * _ - P * b, T = A = T * _ - L * b, x = k = x * _ - O * b), l = (v = zr(T, w)) * Dr, 
      v && (M = w * (_ = Math.cos(v)) + T * (b = Math.sin(v)), A = E * _ + C * b, T = T * _ - w * b, 
      C = C * _ - E * b, w = M, E = A), c && Math.abs(c) + Math.abs(l) > 359.9 && (c = l = 0, 
      u = 180 - u), a = fe(Math.sqrt(w * w + T * T + x * x)), o = fe(Math.sqrt(C * C + z * z)), 
      v = zr(E, C), d = Math.abs(v) > 2e-4 ? v * Dr : 0, f = I ? 1 / (I < 0 ? -I : I) : 0), 
      r.svg && (M = e.getAttribute("transform"), r.forceCSS = e.setAttribute("transform", "") || !Ei(si(e, Zr)), 
      M && e.setAttribute("transform", M))), Math.abs(d) > 90 && Math.abs(d) < 270 && (R ? (a *= -1, 
      d += l <= 0 ? 180 : -180, l += l <= 0 ? 180 : -180) : (o *= -1, d += d <= 0 ? 180 : -180)), 
      t = t || r.uncache, r.x = i - ((r.xPercent = i && (!t && r.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-i) ? -50 : 0))) ? e.offsetWidth * r.xPercent / 100 : 0) + F, 
      r.y = n - ((r.yPercent = n && (!t && r.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-n) ? -50 : 0))) ? e.offsetHeight * r.yPercent / 100 : 0) + F, 
      r.z = s + F, r.scaleX = fe(a), r.scaleY = fe(o), r.rotation = fe(l) + B, r.rotationX = fe(c) + B, 
      r.rotationY = fe(u) + B, r.skewX = d + B, r.skewY = p + B, r.transformPerspective = f + F, 
      (r.zOrigin = parseFloat(G.split(" ")[2]) || !t && r.zOrigin || 0) && (q[Jr] = Pi(G)), 
      r.xOffset = r.yOffset = 0, r.force3D = y.force3D, r.renderTransform = r.svg ? Ri : Lr ? qi : Oi, 
      r.uncache = 0, r;
    }, Pi = function(e) {
      return (e = e.split(" "))[0] + " " + e[1];
    }, Li = function(e, t, r) {
      var i = Ke(t);
      return fe(parseFloat(t) + parseFloat(vi(e, "x", r + "px", i))) + i;
    }, Oi = function(e, t) {
      t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, qi(e, t);
    }, Di = "0deg", Ii = "0px", zi = ") ", qi = function(e, t) {
      var r = t || this, i = r.xPercent, n = r.yPercent, s = r.x, a = r.y, o = r.z, l = r.rotation, c = r.rotationY, u = r.rotationX, d = r.skewX, p = r.skewY, f = r.scaleX, h = r.scaleY, m = r.transformPerspective, g = r.force3D, v = r.target, y = r.zOrigin, _ = "", b = "auto" === g && e && 1 !== e || !0 === g;
      if (y && (u !== Di || c !== Di)) {
        var w, T = parseFloat(c) * Ir, x = Math.sin(T), S = Math.cos(T);
        T = parseFloat(u) * Ir, w = Math.cos(T), s = Li(v, s, x * w * -y), a = Li(v, a, -Math.sin(T) * -y), 
        o = Li(v, o, S * w * -y + y);
      }
      m !== Ii && (_ += "perspective(" + m + zi), (i || n) && (_ += "translate(" + i + "%, " + n + "%) "), 
      (b || s !== Ii || a !== Ii || o !== Ii) && (_ += o !== Ii || b ? "translate3d(" + s + ", " + a + ", " + o + ") " : "translate(" + s + ", " + a + zi), 
      l !== Di && (_ += "rotate(" + l + zi), c !== Di && (_ += "rotateY(" + c + zi), u !== Di && (_ += "rotateX(" + u + zi), 
      d === Di && p === Di || (_ += "skew(" + d + ", " + p + zi), 1 === f && 1 === h || (_ += "scale(" + f + ", " + h + zi), 
      v.style[Zr] = _ || "translate(0, 0)";
    }, Ri = function(e, t) {
      var r, i, n, s, a, o = t || this, l = o.xPercent, c = o.yPercent, u = o.x, d = o.y, p = o.rotation, f = o.skewX, h = o.skewY, m = o.scaleX, g = o.scaleY, v = o.target, y = o.xOrigin, _ = o.yOrigin, b = o.xOffset, w = o.yOffset, T = o.forceCSS, x = parseFloat(u), S = parseFloat(d);
      p = parseFloat(p), f = parseFloat(f), (h = parseFloat(h)) && (f += h = parseFloat(h), 
      p += h), p || f ? (p *= Ir, f *= Ir, r = Math.cos(p) * m, i = Math.sin(p) * m, n = Math.sin(p - f) * -g, 
      s = Math.cos(p - f) * g, f && (h *= Ir, a = Math.tan(f - h), n *= a = Math.sqrt(1 + a * a), 
      s *= a, h && (a = Math.tan(h), r *= a = Math.sqrt(1 + a * a), i *= a)), r = fe(r), 
      i = fe(i), n = fe(n), s = fe(s)) : (r = m, s = g, i = n = 0), (x && !~(u + "").indexOf("px") || S && !~(d + "").indexOf("px")) && (x = vi(v, "x", u, "px"), 
      S = vi(v, "y", d, "px")), (y || _ || b || w) && (x = fe(x + y - (y * r + _ * n) + b), 
      S = fe(S + _ - (y * i + _ * s) + w)), (l || c) && (a = v.getBBox(), x = fe(x + l / 100 * a.width), 
      S = fe(S + c / 100 * a.height)), a = "matrix(" + r + "," + i + "," + n + "," + s + "," + x + "," + S + ")", 
      v.setAttribute("transform", a), T && (v.style[Zr] = a);
    }, Fi = function(e, t, r, i, n) {
      var s, a, o = 360, l = A(n), c = parseFloat(n) * (l && ~n.indexOf("rad") ? Dr : 1) - i, u = i + c + "deg";
      return l && ("short" === (s = n.split("_")[1]) && (c %= o) !== c % 180 && (c += c < 0 ? o : -360), 
      "cw" === s && c < 0 ? c = (c + 36e9) % o - ~~(c / o) * o : "ccw" === s && c > 0 && (c = (c - 36e9) % o - ~~(c / o) * o)), 
      e._pt = a = new ur(e._pt, t, r, i, c, Gr), a.e = u, a.u = "deg", e._props.push(r), 
      a;
    }, Bi = function(e, t) {
      for (var r in t) {
        e[r] = t[r];
      }
      return e;
    }, Ni = function(e, t, r) {
      var i, n, s, a, o, l, c, u = Bi({}, r._gsap), d = r.style;
      for (n in u.svg ? (s = r.getAttribute("transform"), r.setAttribute("transform", ""), 
      d[Zr] = t, i = ki(r, 1), fi(r, Zr), r.setAttribute("transform", s)) : (s = getComputedStyle(r)[Zr], 
      d[Zr] = t, i = ki(r, 1), d[Zr] = s), Or) {
        (s = u[n]) !== (a = i[n]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) < 0 && (o = Ke(s) !== (c = Ke(a)) ? vi(r, n, s, c) : parseFloat(s), 
        l = parseFloat(a), e._pt = new ur(e._pt, i, n, o, l - o, Nr), e._pt.u = c || 0, 
        e._props.push(n));
      }
      Bi(i, u);
    };
    pe("padding,margin,Width,Radius", (function(e, t) {
      var r = "Top", i = "Right", n = "Bottom", s = "Left", a = (t < 3 ? [ r, i, n, s ] : [ r + s, r + i, n + i, n + s ]).map((function(r) {
        return t < 2 ? e + r : "border" + r + e;
      }));
      Ti[t > 1 ? "border" + e : e] = function(e, t, r, i, n) {
        var s, o;
        if (arguments.length < 4) {
          return s = a.map((function(t) {
            return yi(e, t, r);
          })), 5 === (o = s.join(" ")).split(s[0]).length ? s[0] : o;
        }
        s = (i + "").split(" "), o = {}, a.forEach((function(e, t) {
          return o[e] = s[t] = s[t] || s[(t - 1) / 2 | 0];
        })), e.init(t, o, n);
      };
    }));
    var Gi, Vi, $i, Yi = {
      name: "css",
      register: li,
      targetTest: function(e) {
        return e.style && e.nodeType;
      },
      init: function(e, t, r, i, n) {
        var s, a, o, l, c, u, d, p, f, h, m, g, v, _, b, w, T, x, S, E, C = this._props, M = e.style, k = r.vars.startAt;
        for (d in Mr || li(), this.styles = this.styles || ii(e), w = this.styles.props, 
        this.tween = r, t) {
          if ("autoRound" !== d && (a = t[d], !ne[d] || !Yt(d, t, r, i, e, n))) {
            if (c = typeof a, u = Ti[d], "function" === c && (c = typeof (a = a.call(r, i, e, n))), 
            "string" === c && ~a.indexOf("random(") && (a = lt(a)), u) {
              u(this, e, d, a, r) && (b = 1);
            } else if ("--" === d.substr(0, 2)) {
              s = (getComputedStyle(e).getPropertyValue(d) + "").trim(), a += "", wt.lastIndex = 0, 
              wt.test(s) || (p = Ke(s), f = Ke(a)), f ? p !== f && (s = vi(e, d, s, f) + f) : p && (a += p), 
              this.add(M, "setProperty", s, a, i, n, 0, 0, d), C.push(d), w.push(d, 0, M[d]);
            } else if ("undefined" !== c) {
              if (k && d in k ? (s = "function" == typeof k[d] ? k[d].call(r, i, e, n) : k[d], 
              A(s) && ~s.indexOf("random(") && (s = lt(s)), Ke(s + "") || "auto" === s || (s += y.units[d] || Ke(yi(e, d)) || ""), 
              "=" === (s + "").charAt(1) && (s = yi(e, d))) : s = yi(e, d), l = parseFloat(s), 
              (h = "string" === c && "=" === a.charAt(1) && a.substr(0, 2)) && (a = a.substr(2)), 
              o = parseFloat(a), d in Br && ("autoAlpha" === d && (1 === l && "hidden" === yi(e, "visibility") && o && (l = 0), 
              w.push("visibility", 0, M.visibility), hi(this, M, "visibility", l ? "inherit" : "hidden", o ? "inherit" : "hidden", !o)), 
              "scale" !== d && "transform" !== d && ~(d = Br[d]).indexOf(",") && (d = d.split(",")[0])), 
              m = d in Or) {
                if (this.styles.save(d), g || ((v = e._gsap).renderTransform && !t.parseTransform || ki(e, t.parseTransform), 
                _ = !1 !== t.smoothOrigin && v.smooth, (g = this._pt = new ur(this._pt, M, Zr, 0, 1, v.renderTransform, v, 0, -1)).dep = 1), 
                "scale" === d) {
                  this._pt = new ur(this._pt, v, "scaleY", v.scaleY, (h ? me(v.scaleY, h + o) : o) - v.scaleY || 0, Nr), 
                  this._pt.u = 0, C.push("scaleY", d), d += "X";
                } else {
                  if ("transformOrigin" === d) {
                    w.push(Jr, 0, M[Jr]), x = void 0, S = void 0, E = void 0, x = (T = a).split(" "), 
                    S = x[0], E = x[1] || "50%", "top" !== S && "bottom" !== S && "left" !== E && "right" !== E || (T = S, 
                    S = E, E = T), x[0] = bi[S] || S, x[1] = bi[E] || E, a = x.join(" "), v.svg ? Ai(e, a, 0, _, 0, this) : ((f = parseFloat(a.split(" ")[2]) || 0) !== v.zOrigin && hi(this, v, "zOrigin", v.zOrigin, f), 
                    hi(this, M, d, Pi(s), Pi(a)));
                    continue;
                  }
                  if ("svgOrigin" === d) {
                    Ai(e, a, 1, _, 0, this);
                    continue;
                  }
                  if (d in Si) {
                    Fi(this, v, d, l, h ? me(l, h + a) : a);
                    continue;
                  }
                  if ("smoothOrigin" === d) {
                    hi(this, v, "smooth", v.smooth, a);
                    continue;
                  }
                  if ("force3D" === d) {
                    v[d] = a;
                    continue;
                  }
                  if ("transform" === d) {
                    Ni(this, a, e);
                    continue;
                  }
                }
              } else {
                d in M || (d = oi(d) || d);
              }
              if (m || (o || 0 === o) && (l || 0 === l) && !Fr.test(a) && d in M) {
                o || (o = 0), (p = (s + "").substr((l + "").length)) !== (f = Ke(a) || (d in y.units ? y.units[d] : p)) && (l = vi(e, d, s, f)), 
                this._pt = new ur(this._pt, m ? v : M, d, l, (h ? me(l, h + o) : o) - l, m || "px" !== f && "zIndex" !== d || !1 === t.autoRound ? Nr : $r), 
                this._pt.u = f || 0, p !== f && "%" !== f && (this._pt.b = s, this._pt.r = Vr);
              } else if (d in M) {
                _i.call(this, e, d, s, h ? h + a : a);
              } else if (d in e) {
                this.add(e, d, s || e[d], h ? h + a : a, i, n);
              } else if ("parseTransform" !== d) {
                W(d, a);
                continue;
              }
              m || (d in M ? w.push(d, 0, M[d]) : w.push(d, 1, s || e[d])), C.push(d);
            }
          }
        }
        b && cr(this);
      },
      render: function(e, t) {
        if (t.tween._time || !Pr()) {
          for (var r = t._pt; r; ) {
            r.r(e, r.d), r = r._next;
          }
        } else {
          t.styles.revert();
        }
      },
      get: yi,
      aliases: Br,
      getSetter: function(e, t, r) {
        var i = Br[t];
        return i && i.indexOf(",") < 0 && (t = i), t in Or && t !== Jr && (e._gsap.x || yi(e, "x")) ? r && kr === r ? "scale" === t ? Ur : Wr : (kr = r || {}) && ("scale" === t ? Kr : Qr) : e.style && !L(e.style[t]) ? Xr : ~t.indexOf("-") ? jr : tr(e, t);
      },
      core: {
        _removeProperty: fi,
        _getMatrix: Mi
      }
    };
    xr.utils.checkPrefix = oi, xr.core.getStyleSaver = ii, $i = pe((Gi = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") + "," + (Vi = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", (function(e) {
      Or[e] = 1;
    })), pe(Vi, (function(e) {
      y.units[e] = "deg", Si[e] = 1;
    })), Br[$i[13]] = Gi + "," + Vi, pe("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", (function(e) {
      var t = e.split(":");
      Br[t[1]] = $i[t[0]];
    })), pe("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function(e) {
      y.units[e] = "px";
    })), xr.registerPlugin(Yi);
    var Hi = xr.registerPlugin(Yi) || xr;
    Hi.core.Tween;
    const Xi = async e => {
      const t = ji.querySelector(`${e.target.dataset.anchor}`);
      e.preventDefault(), await Zi(), t && t.scrollIntoView({
        behavior: "smooth"
      });
    }, ji = document.querySelector("body"), Wi = ji.querySelector(".header"), Ui = Wi.querySelector(".header-left__btn"), Ki = Array.from(Wi.querySelectorAll(".js-anchor")), Qi = Hi.timeline({
      paused: !0
    }).fromTo(Wi.querySelector(".menu"), {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      duration: .3
    }).fromTo(Wi.querySelector(".menu__figure"), {
      x: 50,
      autoAlpha: 0
    }, {
      x: 0,
      autoAlpha: 1,
      duration: .3
    }, "<").fromTo(Wi.querySelector(".menu-contetnt__wrap"), {
      y: -30,
      autoAlpha: 0
    }, {
      y: 0,
      autoAlpha: 1,
      duration: .3
    }, "<"), Zi = async () => {
      Ui.classList.remove("menu-icon--active"), await Qi.reverse(), Wi.classList.remove("header--menu-active"), 
      ji.classList.remove("scroll-lock"), Ki.forEach((e => {
        e.removeEventListener("click", Xi);
      }));
    }, Ji = () => {
      0 === Qi.progress() ? (async () => {
        Ui.classList.add("menu-icon--active"), Wi.classList.add("header--menu-active"), 
        await Qi.play(), ji.classList.add("scroll-lock"), Ki.forEach((e => {
          e.addEventListener("click", Xi);
        }));
      })() : Zi();
    };
    let en = window.scrollY;
    const tn = () => {
      const e = window.scrollY, t = e > en ? "down" : "up";
      "" !== t && (e - en > 10 || e - en < -10) && (Wi.className = "", Wi.classList.add("header"), 
      e > 50 && Wi.classList.add(`header--${t}`)), en = e > 0 ? e : 0;
    };
    function rn(e) {
      return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object;
    }
    function nn(e, t) {
      void 0 === e && (e = {}), void 0 === t && (t = {}), Object.keys(t).forEach((r => {
        void 0 === e[r] ? e[r] = t[r] : rn(t[r]) && rn(e[r]) && Object.keys(t[r]).length > 0 && nn(e[r], t[r]);
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
    function cn(e) {
      return void 0 === e && (e = ""), e.trim().split(" ").filter((e => !!e.trim()));
    }
    function un(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t);
    }
    function dn() {
      return Date.now();
    }
    function pn(e, t) {
      void 0 === t && (t = "x");
      const r = ln();
      let i, n, s;
      const a = function(e) {
        const t = ln();
        let r;
        return t.getComputedStyle && (r = t.getComputedStyle(e, null)), !r && e.currentStyle && (r = e.currentStyle), 
        r || (r = e.style), r;
      }(e);
      return r.WebKitCSSMatrix ? (n = a.transform || a.webkitTransform, n.split(",").length > 6 && (n = n.split(", ").map((e => e.replace(",", "."))).join(", ")), 
      s = new r.WebKitCSSMatrix("none" === n ? "" : n)) : (s = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), 
      i = s.toString().split(",")), "x" === t && (n = r.WebKitCSSMatrix ? s.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), 
      "y" === t && (n = r.WebKitCSSMatrix ? s.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), 
      n || 0;
    }
    function fn(e) {
      return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1);
    }
    function hn() {
      const e = Object(arguments.length <= 0 ? void 0 : arguments[0]), t = [ "__proto__", "constructor", "prototype" ];
      for (let i = 1; i < arguments.length; i += 1) {
        const n = i < 0 || arguments.length <= i ? void 0 : arguments[i];
        if (null != n && (r = n, !("undefined" != typeof window && void 0 !== window.HTMLElement ? r instanceof HTMLElement : r && (1 === r.nodeType || 11 === r.nodeType)))) {
          const r = Object.keys(Object(n)).filter((e => t.indexOf(e) < 0));
          for (let t = 0, i = r.length; t < i; t += 1) {
            const i = r[t], s = Object.getOwnPropertyDescriptor(n, i);
            void 0 !== s && s.enumerable && (fn(e[i]) && fn(n[i]) ? n[i].__swiper__ ? e[i] = n[i] : hn(e[i], n[i]) : !fn(e[i]) && fn(n[i]) ? (e[i] = {}, 
            n[i].__swiper__ ? e[i] = n[i] : hn(e[i], n[i])) : e[i] = n[i]);
          }
        }
      }
      var r;
      return e;
    }
    function mn(e, t, r) {
      e.style.setProperty(t, r);
    }
    function gn(e) {
      let {swiper: t, targetPosition: r, side: i} = e;
      const n = ln(), s = -t.translate;
      let a, o = null;
      const l = t.params.speed;
      t.wrapperEl.style.scrollSnapType = "none", n.cancelAnimationFrame(t.cssModeFrameID);
      const c = r > s ? "next" : "prev", u = (e, t) => "next" === c && e >= t || "prev" === c && e <= t, d = () => {
        a = (new Date).getTime(), null === o && (o = a);
        const e = Math.max(Math.min((a - o) / l, 1), 0), c = .5 - Math.cos(e * Math.PI) / 2;
        let p = s + c * (r - s);
        if (u(p, r) && (p = r), t.wrapperEl.scrollTo({
          [i]: p
        }), u(p, r)) {
          return t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", 
          setTimeout((() => {
            t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({
              [i]: p
            });
          })), void n.cancelAnimationFrame(t.cssModeFrameID);
        }
        t.cssModeFrameID = n.requestAnimationFrame(d);
      };
      d();
    }
    function vn(e) {
      return e.querySelector(".swiper-slide-transform") || e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform") || e;
    }
    function yn(e, t) {
      return void 0 === t && (t = ""), [ ...e.children ].filter((e => e.matches(t)));
    }
    function _n(e) {
      try {
        return void console.warn(e);
      } catch (e) {}
    }
    function bn(e, t) {
      void 0 === t && (t = []);
      const r = document.createElement(e);
      return r.classList.add(...Array.isArray(t) ? t : cn(t)), r;
    }
    function wn(e, t) {
      return ln().getComputedStyle(e, null).getPropertyValue(t);
    }
    function Tn(e) {
      let t, r = e;
      if (r) {
        for (t = 0; null !== (r = r.previousSibling); ) {
          1 === r.nodeType && (t += 1);
        }
        return t;
      }
    }
    function xn(e, t) {
      const r = [];
      let i = e.parentElement;
      for (;i; ) {
        t ? i.matches(t) && r.push(i) : r.push(i), i = i.parentElement;
      }
      return r;
    }
    function Sn(e, t, r) {
      const i = ln();
      return r ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth;
    }
    function En(e) {
      return (Array.isArray(e) ? e : [ e ]).filter((e => !!e));
    }
    let Cn, Mn, An;
    function kn() {
      return Cn || (Cn = function() {
        const e = ln(), t = an();
        return {
          smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style,
          touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
        };
      }()), Cn;
    }
    function Pn(e) {
      return void 0 === e && (e = {}), Mn || (Mn = function(e) {
        let {userAgent: t} = void 0 === e ? {} : e;
        const r = kn(), i = ln(), n = i.navigator.platform, s = t || i.navigator.userAgent, a = {
          ios: !1,
          android: !1
        }, o = i.screen.width, l = i.screen.height, c = s.match(/(Android);?[\s\/]+([\d.]+)?/);
        let u = s.match(/(iPad).*OS\s([\d_]+)/);
        const d = s.match(/(iPod)(.*OS\s([\d_]+))?/), p = !u && s.match(/(iPhone\sOS|iOS)\s([\d_]+)/), f = "Win32" === n;
        let h = "MacIntel" === n;
        return !u && h && r.touch && [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ].indexOf(`${o}x${l}`) >= 0 && (u = s.match(/(Version)\/([\d.]+)/), 
        u || (u = [ 0, 1, "13_0_0" ]), h = !1), c && !f && (a.os = "android", a.android = !0), 
        (u || p || d) && (a.os = "ios", a.ios = !0), a;
      }(e)), Mn;
    }
    function Ln() {
      return An || (An = function() {
        const e = ln(), t = Pn();
        let r = !1;
        function i() {
          const t = e.navigator.userAgent.toLowerCase();
          return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0;
        }
        if (i()) {
          const t = String(e.navigator.userAgent);
          if (t.includes("Version/")) {
            const [e, i] = t.split("Version/")[1].split(" ")[0].split(".").map((e => Number(e)));
            r = e < 16 || 16 === e && i < 2;
          }
        }
        const n = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent), s = i();
        return {
          isSafari: r || s,
          needPerspectiveFix: r,
          need3dFix: s || n && t.ios,
          isWebView: n
        };
      }()), An;
    }
    var On = {
      on(e, t, r) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) {
          return i;
        }
        if ("function" != typeof t) {
          return i;
        }
        const n = r ? "unshift" : "push";
        return e.split(" ").forEach((e => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][n](t);
        })), i;
      },
      once(e, t, r) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) {
          return i;
        }
        if ("function" != typeof t) {
          return i;
        }
        function n() {
          i.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
          for (var r = arguments.length, s = new Array(r), a = 0; a < r; a++) {
            s[a] = arguments[a];
          }
          t.apply(i, s);
        }
        return n.__emitterProxy = t, i.on(e, n, r);
      },
      onAny(e, t) {
        const r = this;
        if (!r.eventsListeners || r.destroyed) {
          return r;
        }
        if ("function" != typeof e) {
          return r;
        }
        const i = t ? "unshift" : "push";
        return r.eventsAnyListeners.indexOf(e) < 0 && r.eventsAnyListeners[i](e), r;
      },
      offAny(e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed) {
          return t;
        }
        if (!t.eventsAnyListeners) {
          return t;
        }
        const r = t.eventsAnyListeners.indexOf(e);
        return r >= 0 && t.eventsAnyListeners.splice(r, 1), t;
      },
      off(e, t) {
        const r = this;
        return !r.eventsListeners || r.destroyed ? r : r.eventsListeners ? (e.split(" ").forEach((e => {
          void 0 === t ? r.eventsListeners[e] = [] : r.eventsListeners[e] && r.eventsListeners[e].forEach(((i, n) => {
            (i === t || i.__emitterProxy && i.__emitterProxy === t) && r.eventsListeners[e].splice(n, 1);
          }));
        })), r) : r;
      },
      emit() {
        const e = this;
        if (!e.eventsListeners || e.destroyed) {
          return e;
        }
        if (!e.eventsListeners) {
          return e;
        }
        let t, r, i;
        for (var n = arguments.length, s = new Array(n), a = 0; a < n; a++) {
          s[a] = arguments[a];
        }
        "string" == typeof s[0] || Array.isArray(s[0]) ? (t = s[0], r = s.slice(1, s.length), 
        i = e) : (t = s[0].events, r = s[0].data, i = s[0].context || e), r.unshift(i);
        return (Array.isArray(t) ? t : t.split(" ")).forEach((t => {
          e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e => {
            e.apply(i, [ t, ...r ]);
          })), e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((e => {
            e.apply(i, r);
          }));
        })), e;
      }
    };
    const Dn = (e, t) => {
      if (!e || e.destroyed || !e.params) {
        return;
      }
      const r = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
      if (r) {
        let t = r.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t && e.isElement && (r.shadowRoot ? t = r.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame((() => {
          r.shadowRoot && (t = r.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`), 
          t && t.remove());
        }))), t && t.remove();
      }
    }, In = (e, t) => {
      if (!e.slides[t]) {
        return;
      }
      const r = e.slides[t].querySelector('[loading="lazy"]');
      r && r.removeAttribute("loading");
    }, zn = e => {
      if (!e || e.destroyed || !e.params) {
        return;
      }
      let t = e.params.lazyPreloadPrevNext;
      const r = e.slides.length;
      if (!r || !t || t < 0) {
        return;
      }
      t = Math.min(t, r);
      const i = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), n = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const r = n, s = [ r - t ];
        return s.push(...Array.from({
          length: t
        }).map(((e, t) => r + i + t))), void e.slides.forEach(((t, r) => {
          s.includes(t.column) && In(e, r);
        }));
      }
      const s = n + i - 1;
      if (e.params.rewind || e.params.loop) {
        for (let i = n - t; i <= s + t; i += 1) {
          const t = (i % r + r) % r;
          (t < n || t > s) && In(e, t);
        }
      } else {
        for (let i = Math.max(n - t, 0); i <= Math.min(s + t, r - 1); i += 1) {
          i !== n && (i > s || i < n) && In(e, i);
        }
      }
    };
    var qn = {
      updateSize: function() {
        const e = this;
        let t, r;
        const i = e.el;
        t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i.clientWidth, 
        r = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i.clientHeight, 
        0 === t && e.isHorizontal() || 0 === r && e.isVertical() || (t = t - parseInt(wn(i, "padding-left") || 0, 10) - parseInt(wn(i, "padding-right") || 0, 10), 
        r = r - parseInt(wn(i, "padding-top") || 0, 10) - parseInt(wn(i, "padding-bottom") || 0, 10), 
        Number.isNaN(t) && (t = 0), Number.isNaN(r) && (r = 0), Object.assign(e, {
          width: t,
          height: r,
          size: e.isHorizontal() ? t : r
        }));
      },
      updateSlides: function() {
        const e = this;
        function t(t, r) {
          return parseFloat(t.getPropertyValue(e.getDirectionLabel(r)) || 0);
        }
        const r = e.params, {wrapperEl: i, slidesEl: n, size: s, rtlTranslate: a, wrongRTL: o} = e, l = e.virtual && r.virtual.enabled, c = l ? e.virtual.slides.length : e.slides.length, u = yn(n, `.${e.params.slideClass}, swiper-slide`), d = l ? e.virtual.slides.length : u.length;
        let p = [];
        const f = [], h = [];
        let m = r.slidesOffsetBefore;
        "function" == typeof m && (m = r.slidesOffsetBefore.call(e));
        let g = r.slidesOffsetAfter;
        "function" == typeof g && (g = r.slidesOffsetAfter.call(e));
        const v = e.snapGrid.length, y = e.slidesGrid.length;
        let _ = r.spaceBetween, b = -m, w = 0, T = 0;
        if (void 0 === s) {
          return;
        }
        "string" == typeof _ && _.indexOf("%") >= 0 ? _ = parseFloat(_.replace("%", "")) / 100 * s : "string" == typeof _ && (_ = parseFloat(_)), 
        e.virtualSize = -_, u.forEach((e => {
          a ? e.style.marginLeft = "" : e.style.marginRight = "", e.style.marginBottom = "", 
          e.style.marginTop = "";
        })), r.centeredSlides && r.cssMode && (mn(i, "--swiper-centered-offset-before", ""), 
        mn(i, "--swiper-centered-offset-after", ""));
        const x = r.grid && r.grid.rows > 1 && e.grid;
        let S;
        x ? e.grid.initSlides(u) : e.grid && e.grid.unsetSlides();
        const E = "auto" === r.slidesPerView && r.breakpoints && Object.keys(r.breakpoints).filter((e => void 0 !== r.breakpoints[e].slidesPerView)).length > 0;
        for (let i = 0; i < d; i += 1) {
          let n;
          if (S = 0, u[i] && (n = u[i]), x && e.grid.updateSlide(i, n, u), !u[i] || "none" !== wn(n, "display")) {
            if ("auto" === r.slidesPerView) {
              E && (u[i].style[e.getDirectionLabel("width")] = "");
              const s = getComputedStyle(n), a = n.style.transform, o = n.style.webkitTransform;
              if (a && (n.style.transform = "none"), o && (n.style.webkitTransform = "none"), 
              r.roundLengths) {
                S = e.isHorizontal() ? Sn(n, "width", !0) : Sn(n, "height", !0);
              } else {
                const e = t(s, "width"), r = t(s, "padding-left"), i = t(s, "padding-right"), a = t(s, "margin-left"), o = t(s, "margin-right"), l = s.getPropertyValue("box-sizing");
                if (l && "border-box" === l) {
                  S = e + a + o;
                } else {
                  const {clientWidth: t, offsetWidth: s} = n;
                  S = e + r + i + a + o + (s - t);
                }
              }
              a && (n.style.transform = a), o && (n.style.webkitTransform = o), r.roundLengths && (S = Math.floor(S));
            } else {
              S = (s - (r.slidesPerView - 1) * _) / r.slidesPerView, r.roundLengths && (S = Math.floor(S)), 
              u[i] && (u[i].style[e.getDirectionLabel("width")] = `${S}px`);
            }
            u[i] && (u[i].swiperSlideSize = S), h.push(S), r.centeredSlides ? (b = b + S / 2 + w / 2 + _, 
            0 === w && 0 !== i && (b = b - s / 2 - _), 0 === i && (b = b - s / 2 - _), Math.abs(b) < .001 && (b = 0), 
            r.roundLengths && (b = Math.floor(b)), T % r.slidesPerGroup == 0 && p.push(b), f.push(b)) : (r.roundLengths && (b = Math.floor(b)), 
            (T - Math.min(e.params.slidesPerGroupSkip, T)) % e.params.slidesPerGroup == 0 && p.push(b), 
            f.push(b), b = b + S + _), e.virtualSize += S + _, w = S, T += 1;
          }
        }
        if (e.virtualSize = Math.max(e.virtualSize, s) + g, a && o && ("slide" === r.effect || "coverflow" === r.effect) && (i.style.width = `${e.virtualSize + _}px`), 
        r.setWrapperSize && (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + _}px`), 
        x && e.grid.updateWrapperSize(S, p), !r.centeredSlides) {
          const t = [];
          for (let i = 0; i < p.length; i += 1) {
            let n = p[i];
            r.roundLengths && (n = Math.floor(n)), p[i] <= e.virtualSize - s && t.push(n);
          }
          p = t, Math.floor(e.virtualSize - s) - Math.floor(p[p.length - 1]) > 1 && p.push(e.virtualSize - s);
        }
        if (l && r.loop) {
          const t = h[0] + _;
          if (r.slidesPerGroup > 1) {
            const i = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / r.slidesPerGroup), n = t * r.slidesPerGroup;
            for (let e = 0; e < i; e += 1) {
              p.push(p[p.length - 1] + n);
            }
          }
          for (let i = 0; i < e.virtual.slidesBefore + e.virtual.slidesAfter; i += 1) {
            1 === r.slidesPerGroup && p.push(p[p.length - 1] + t), f.push(f[f.length - 1] + t), 
            e.virtualSize += t;
          }
        }
        if (0 === p.length && (p = [ 0 ]), 0 !== _) {
          const t = e.isHorizontal() && a ? "marginLeft" : e.getDirectionLabel("marginRight");
          u.filter(((e, t) => !(r.cssMode && !r.loop) || t !== u.length - 1)).forEach((e => {
            e.style[t] = `${_}px`;
          }));
        }
        if (r.centeredSlides && r.centeredSlidesBounds) {
          let e = 0;
          h.forEach((t => {
            e += t + (_ || 0);
          })), e -= _;
          const t = e - s;
          p = p.map((e => e <= 0 ? -m : e > t ? t + g : e));
        }
        if (r.centerInsufficientSlides) {
          let e = 0;
          if (h.forEach((t => {
            e += t + (_ || 0);
          })), e -= _, e < s) {
            const t = (s - e) / 2;
            p.forEach(((e, r) => {
              p[r] = e - t;
            })), f.forEach(((e, r) => {
              f[r] = e + t;
            }));
          }
        }
        if (Object.assign(e, {
          slides: u,
          snapGrid: p,
          slidesGrid: f,
          slidesSizesGrid: h
        }), r.centeredSlides && r.cssMode && !r.centeredSlidesBounds) {
          mn(i, "--swiper-centered-offset-before", -p[0] + "px"), mn(i, "--swiper-centered-offset-after", e.size / 2 - h[h.length - 1] / 2 + "px");
          const t = -e.snapGrid[0], r = -e.slidesGrid[0];
          e.snapGrid = e.snapGrid.map((e => e + t)), e.slidesGrid = e.slidesGrid.map((e => e + r));
        }
        if (d !== c && e.emit("slidesLengthChange"), p.length !== v && (e.params.watchOverflow && e.checkOverflow(), 
        e.emit("snapGridLengthChange")), f.length !== y && e.emit("slidesGridLengthChange"), 
        r.watchSlidesProgress && e.updateSlidesOffset(), e.emit("slidesUpdated"), !(l || r.cssMode || "slide" !== r.effect && "fade" !== r.effect)) {
          const t = `${r.containerModifierClass}backface-hidden`, i = e.el.classList.contains(t);
          d <= r.maxBackfaceHiddenSlides ? i || e.el.classList.add(t) : i && e.el.classList.remove(t);
        }
      },
      updateAutoHeight: function(e) {
        const t = this, r = [], i = t.virtual && t.params.virtual.enabled;
        let n, s = 0;
        "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
        const a = e => i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1) {
          if (t.params.centeredSlides) {
            (t.visibleSlides || []).forEach((e => {
              r.push(e);
            }));
          } else {
            for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
              const e = t.activeIndex + n;
              if (e > t.slides.length && !i) {
                break;
              }
              r.push(a(e));
            }
          }
        } else {
          r.push(a(t.activeIndex));
        }
        for (n = 0; n < r.length; n += 1) {
          if (void 0 !== r[n]) {
            const e = r[n].offsetHeight;
            s = e > s ? e : s;
          }
        }
        (s || 0 === s) && (t.wrapperEl.style.height = `${s}px`);
      },
      updateSlidesOffset: function() {
        const e = this, t = e.slides, r = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
        for (let i = 0; i < t.length; i += 1) {
          t[i].swiperSlideOffset = (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - r - e.cssOverflowAdjustment();
        }
      },
      updateSlidesProgress: function(e) {
        void 0 === e && (e = this && this.translate || 0);
        const t = this, r = t.params, {slides: i, rtlTranslate: n, snapGrid: s} = t;
        if (0 === i.length) {
          return;
        }
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        let a = -e;
        n && (a = e), i.forEach((e => {
          e.classList.remove(r.slideVisibleClass, r.slideFullyVisibleClass);
        })), t.visibleSlidesIndexes = [], t.visibleSlides = [];
        let o = r.spaceBetween;
        "string" == typeof o && o.indexOf("%") >= 0 ? o = parseFloat(o.replace("%", "")) / 100 * t.size : "string" == typeof o && (o = parseFloat(o));
        for (let e = 0; e < i.length; e += 1) {
          const l = i[e];
          let c = l.swiperSlideOffset;
          r.cssMode && r.centeredSlides && (c -= i[0].swiperSlideOffset);
          const u = (a + (r.centeredSlides ? t.minTranslate() : 0) - c) / (l.swiperSlideSize + o), d = (a - s[0] + (r.centeredSlides ? t.minTranslate() : 0) - c) / (l.swiperSlideSize + o), p = -(a - c), f = p + t.slidesSizesGrid[e], h = p >= 0 && p <= t.size - t.slidesSizesGrid[e];
          (p >= 0 && p < t.size - 1 || f > 1 && f <= t.size || p <= 0 && f >= t.size) && (t.visibleSlides.push(l), 
          t.visibleSlidesIndexes.push(e), i[e].classList.add(r.slideVisibleClass)), h && i[e].classList.add(r.slideFullyVisibleClass), 
          l.progress = n ? -u : u, l.originalProgress = n ? -d : d;
        }
      },
      updateProgress: function(e) {
        const t = this;
        if (void 0 === e) {
          const r = t.rtlTranslate ? -1 : 1;
          e = t && t.translate && t.translate * r || 0;
        }
        const r = t.params, i = t.maxTranslate() - t.minTranslate();
        let {progress: n, isBeginning: s, isEnd: a, progressLoop: o} = t;
        const l = s, c = a;
        if (0 === i) {
          n = 0, s = !0, a = !0;
        } else {
          n = (e - t.minTranslate()) / i;
          const r = Math.abs(e - t.minTranslate()) < 1, o = Math.abs(e - t.maxTranslate()) < 1;
          s = r || n <= 0, a = o || n >= 1, r && (n = 0), o && (n = 1);
        }
        if (r.loop) {
          const r = t.getSlideIndexByData(0), i = t.getSlideIndexByData(t.slides.length - 1), n = t.slidesGrid[r], s = t.slidesGrid[i], a = t.slidesGrid[t.slidesGrid.length - 1], l = Math.abs(e);
          o = l >= n ? (l - n) / a : (l + a - s) / a, o > 1 && (o -= 1);
        }
        Object.assign(t, {
          progress: n,
          progressLoop: o,
          isBeginning: s,
          isEnd: a
        }), (r.watchSlidesProgress || r.centeredSlides && r.autoHeight) && t.updateSlidesProgress(e), 
        s && !l && t.emit("reachBeginning toEdge"), a && !c && t.emit("reachEnd toEdge"), 
        (l && !s || c && !a) && t.emit("fromEdge"), t.emit("progress", n);
      },
      updateSlidesClasses: function() {
        const e = this, {slides: t, params: r, slidesEl: i, activeIndex: n} = e, s = e.virtual && r.virtual.enabled, a = e.grid && r.grid && r.grid.rows > 1, o = e => yn(i, `.${r.slideClass}${e}, swiper-slide${e}`)[0];
        let l, c, u;
        if (t.forEach((e => {
          e.classList.remove(r.slideActiveClass, r.slideNextClass, r.slidePrevClass);
        })), s) {
          if (r.loop) {
            let t = n - e.virtual.slidesBefore;
            t < 0 && (t = e.virtual.slides.length + t), t >= e.virtual.slides.length && (t -= e.virtual.slides.length), 
            l = o(`[data-swiper-slide-index="${t}"]`);
          } else {
            l = o(`[data-swiper-slide-index="${n}"]`);
          }
        } else {
          a ? (l = t.filter((e => e.column === n))[0], u = t.filter((e => e.column === n + 1))[0], 
          c = t.filter((e => e.column === n - 1))[0]) : l = t[n];
        }
        l && (l.classList.add(r.slideActiveClass), a ? (u && u.classList.add(r.slideNextClass), 
        c && c.classList.add(r.slidePrevClass)) : (u = function(e, t) {
          const r = [];
          for (;e.nextElementSibling; ) {
            const i = e.nextElementSibling;
            t ? i.matches(t) && r.push(i) : r.push(i), e = i;
          }
          return r;
        }(l, `.${r.slideClass}, swiper-slide`)[0], r.loop && !u && (u = t[0]), u && u.classList.add(r.slideNextClass), 
        c = function(e, t) {
          const r = [];
          for (;e.previousElementSibling; ) {
            const i = e.previousElementSibling;
            t ? i.matches(t) && r.push(i) : r.push(i), e = i;
          }
          return r;
        }(l, `.${r.slideClass}, swiper-slide`)[0], r.loop && 0 === !c && (c = t[t.length - 1]), 
        c && c.classList.add(r.slidePrevClass))), e.emitSlidesClasses();
      },
      updateActiveIndex: function(e) {
        const t = this, r = t.rtlTranslate ? t.translate : -t.translate, {snapGrid: i, params: n, activeIndex: s, realIndex: a, snapIndex: o} = t;
        let l, c = e;
        const u = e => {
          let r = e - t.virtual.slidesBefore;
          return r < 0 && (r = t.virtual.slides.length + r), r >= t.virtual.slides.length && (r -= t.virtual.slides.length), 
          r;
        };
        if (void 0 === c && (c = function(e) {
          const {slidesGrid: t, params: r} = e, i = e.rtlTranslate ? e.translate : -e.translate;
          let n;
          for (let e = 0; e < t.length; e += 1) {
            void 0 !== t[e + 1] ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2 ? n = e : i >= t[e] && i < t[e + 1] && (n = e + 1) : i >= t[e] && (n = e);
          }
          return r.normalizeSlideIndex && (n < 0 || void 0 === n) && (n = 0), n;
        }(t)), i.indexOf(r) >= 0) {
          l = i.indexOf(r);
        } else {
          const e = Math.min(n.slidesPerGroupSkip, c);
          l = e + Math.floor((c - e) / n.slidesPerGroup);
        }
        if (l >= i.length && (l = i.length - 1), c === s && !t.params.loop) {
          return void (l !== o && (t.snapIndex = l, t.emit("snapIndexChange")));
        }
        if (c === s && t.params.loop && t.virtual && t.params.virtual.enabled) {
          return void (t.realIndex = u(c));
        }
        const d = t.grid && n.grid && n.grid.rows > 1;
        let p;
        if (t.virtual && n.virtual.enabled && n.loop) {
          p = u(c);
        } else if (d) {
          const e = t.slides.filter((e => e.column === c))[0];
          let r = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
          Number.isNaN(r) && (r = Math.max(t.slides.indexOf(e), 0)), p = Math.floor(r / n.grid.rows);
        } else if (t.slides[c]) {
          const e = t.slides[c].getAttribute("data-swiper-slide-index");
          p = e ? parseInt(e, 10) : c;
        } else {
          p = c;
        }
        Object.assign(t, {
          previousSnapIndex: o,
          snapIndex: l,
          previousRealIndex: a,
          realIndex: p,
          previousIndex: s,
          activeIndex: c
        }), t.initialized && zn(t), t.emit("activeIndexChange"), t.emit("snapIndexChange"), 
        (t.initialized || t.params.runCallbacksOnInit) && (a !== p && t.emit("realIndexChange"), 
        t.emit("slideChange"));
      },
      updateClickedSlide: function(e, t) {
        const r = this, i = r.params;
        let n = e.closest(`.${i.slideClass}, swiper-slide`);
        !n && r.isElement && t && t.length > 1 && t.includes(e) && [ ...t.slice(t.indexOf(e) + 1, t.length) ].forEach((e => {
          !n && e.matches && e.matches(`.${i.slideClass}, swiper-slide`) && (n = e);
        }));
        let s, a = !1;
        if (n) {
          for (let e = 0; e < r.slides.length; e += 1) {
            if (r.slides[e] === n) {
              a = !0, s = e;
              break;
            }
          }
        }
        if (!n || !a) {
          return r.clickedSlide = void 0, void (r.clickedIndex = void 0);
        }
        r.clickedSlide = n, r.virtual && r.params.virtual.enabled ? r.clickedIndex = parseInt(n.getAttribute("data-swiper-slide-index"), 10) : r.clickedIndex = s, 
        i.slideToClickedSlide && void 0 !== r.clickedIndex && r.clickedIndex !== r.activeIndex && r.slideToClickedSlide();
      }
    };
    var Rn = {
      getTranslate: function(e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        const {params: t, rtlTranslate: r, translate: i, wrapperEl: n} = this;
        if (t.virtualTranslate) {
          return r ? -i : i;
        }
        if (t.cssMode) {
          return i;
        }
        let s = pn(n, e);
        return s += this.cssOverflowAdjustment(), r && (s = -s), s || 0;
      },
      setTranslate: function(e, t) {
        const r = this, {rtlTranslate: i, params: n, wrapperEl: s, progress: a} = r;
        let o, l = 0, c = 0;
        r.isHorizontal() ? l = i ? -e : e : c = e, n.roundLengths && (l = Math.floor(l), 
        c = Math.floor(c)), r.previousTranslate = r.translate, r.translate = r.isHorizontal() ? l : c, 
        n.cssMode ? s[r.isHorizontal() ? "scrollLeft" : "scrollTop"] = r.isHorizontal() ? -l : -c : n.virtualTranslate || (r.isHorizontal() ? l -= r.cssOverflowAdjustment() : c -= r.cssOverflowAdjustment(), 
        s.style.transform = `translate3d(${l}px, ${c}px, 0px)`);
        const u = r.maxTranslate() - r.minTranslate();
        o = 0 === u ? 0 : (e - r.minTranslate()) / u, o !== a && r.updateProgress(e), r.emit("setTranslate", r.translate, t);
      },
      minTranslate: function() {
        return -this.snapGrid[0];
      },
      maxTranslate: function() {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function(e, t, r, i, n) {
        void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === r && (r = !0), 
        void 0 === i && (i = !0);
        const s = this, {params: a, wrapperEl: o} = s;
        if (s.animating && a.preventInteractionOnTransition) {
          return !1;
        }
        const l = s.minTranslate(), c = s.maxTranslate();
        let u;
        if (u = i && e > l ? l : i && e < c ? c : e, s.updateProgress(u), a.cssMode) {
          const e = s.isHorizontal();
          if (0 === t) {
            o[e ? "scrollLeft" : "scrollTop"] = -u;
          } else {
            if (!s.support.smoothScroll) {
              return gn({
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
        return 0 === t ? (s.setTransition(0), s.setTranslate(u), r && (s.emit("beforeTransitionStart", t, n), 
        s.emit("transitionEnd"))) : (s.setTransition(t), s.setTranslate(u), r && (s.emit("beforeTransitionStart", t, n), 
        s.emit("transitionStart")), s.animating || (s.animating = !0, s.onTranslateToWrapperTransitionEnd || (s.onTranslateToWrapperTransitionEnd = function(e) {
          s && !s.destroyed && e.target === this && (s.wrapperEl.removeEventListener("transitionend", s.onTranslateToWrapperTransitionEnd), 
          s.onTranslateToWrapperTransitionEnd = null, delete s.onTranslateToWrapperTransitionEnd, 
          r && s.emit("transitionEnd"));
        }), s.wrapperEl.addEventListener("transitionend", s.onTranslateToWrapperTransitionEnd))), 
        !0;
      }
    };
    function Fn(e) {
      let {swiper: t, runCallbacks: r, direction: i, step: n} = e;
      const {activeIndex: s, previousIndex: a} = t;
      let o = i;
      if (o || (o = s > a ? "next" : s < a ? "prev" : "reset"), t.emit(`transition${n}`), 
      r && s !== a) {
        if ("reset" === o) {
          return void t.emit(`slideResetTransition${n}`);
        }
        t.emit(`slideChangeTransition${n}`), "next" === o ? t.emit(`slideNextTransition${n}`) : t.emit(`slidePrevTransition${n}`);
      }
    }
    var Bn = {
      slideTo: function(e, t, r, i, n) {
        void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === r && (r = !0), 
        "string" == typeof e && (e = parseInt(e, 10));
        const s = this;
        let a = e;
        a < 0 && (a = 0);
        const {params: o, snapGrid: l, slidesGrid: c, previousIndex: u, activeIndex: d, rtlTranslate: p, wrapperEl: f, enabled: h} = s;
        if (s.animating && o.preventInteractionOnTransition || !h && !i && !n || s.destroyed) {
          return !1;
        }
        const m = Math.min(s.params.slidesPerGroupSkip, a);
        let g = m + Math.floor((a - m) / s.params.slidesPerGroup);
        g >= l.length && (g = l.length - 1);
        const v = -l[g];
        if (o.normalizeSlideIndex) {
          for (let e = 0; e < c.length; e += 1) {
            const t = -Math.floor(100 * v), r = Math.floor(100 * c[e]), i = Math.floor(100 * c[e + 1]);
            void 0 !== c[e + 1] ? t >= r && t < i - (i - r) / 2 ? a = e : t >= r && t < i && (a = e + 1) : t >= r && (a = e);
          }
        }
        if (s.initialized && a !== d) {
          if (!s.allowSlideNext && (p ? v > s.translate && v > s.minTranslate() : v < s.translate && v < s.minTranslate())) {
            return !1;
          }
          if (!s.allowSlidePrev && v > s.translate && v > s.maxTranslate() && (d || 0) !== a) {
            return !1;
          }
        }
        let y;
        if (a !== (u || 0) && r && s.emit("beforeSlideChangeStart"), s.updateProgress(v), 
        y = a > d ? "next" : a < d ? "prev" : "reset", p && -v === s.translate || !p && v === s.translate) {
          return s.updateActiveIndex(a), o.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), 
          "slide" !== o.effect && s.setTranslate(v), "reset" !== y && (s.transitionStart(r, y), 
          s.transitionEnd(r, y)), !1;
        }
        if (o.cssMode) {
          const e = s.isHorizontal(), r = p ? v : -v;
          if (0 === t) {
            const t = s.virtual && s.params.virtual.enabled;
            t && (s.wrapperEl.style.scrollSnapType = "none", s._immediateVirtual = !0), t && !s._cssModeVirtualInitialSet && s.params.initialSlide > 0 ? (s._cssModeVirtualInitialSet = !0, 
            requestAnimationFrame((() => {
              f[e ? "scrollLeft" : "scrollTop"] = r;
            }))) : f[e ? "scrollLeft" : "scrollTop"] = r, t && requestAnimationFrame((() => {
              s.wrapperEl.style.scrollSnapType = "", s._immediateVirtual = !1;
            }));
          } else {
            if (!s.support.smoothScroll) {
              return gn({
                swiper: s,
                targetPosition: r,
                side: e ? "left" : "top"
              }), !0;
            }
            f.scrollTo({
              [e ? "left" : "top"]: r,
              behavior: "smooth"
            });
          }
          return !0;
        }
        return s.setTransition(t), s.setTranslate(v), s.updateActiveIndex(a), s.updateSlidesClasses(), 
        s.emit("beforeTransitionStart", t, i), s.transitionStart(r, y), 0 === t ? s.transitionEnd(r, y) : s.animating || (s.animating = !0, 
        s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function(e) {
          s && !s.destroyed && e.target === this && (s.wrapperEl.removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd), 
          s.onSlideToWrapperTransitionEnd = null, delete s.onSlideToWrapperTransitionEnd, 
          s.transitionEnd(r, y));
        }), s.wrapperEl.addEventListener("transitionend", s.onSlideToWrapperTransitionEnd)), 
        !0;
      },
      slideToLoop: function(e, t, r, i) {
        if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === r && (r = !0), 
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
            const t = s ? Math.ceil(n.slides.length / n.params.grid.rows) : n.slides.length, {centeredSlides: r} = n.params;
            let i = n.params.slidesPerView;
            "auto" === i ? i = n.slidesPerViewDynamic() : (i = Math.ceil(parseFloat(n.params.slidesPerView, 10)), 
            r && i % 2 == 0 && (i += 1));
            let o = t - e < i;
            if (r && (o = o || e < Math.ceil(i / 2)), o) {
              const i = r ? e < n.activeIndex ? "prev" : "next" : e - n.activeIndex - 1 < n.params.slidesPerView ? "next" : "prev";
              n.loopFix({
                direction: i,
                slideTo: !0,
                activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
                slideRealIndex: "next" === i ? n.realIndex : void 0
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
          n.slideTo(a, t, r, i);
        })), n;
      },
      slideNext: function(e, t, r) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this, {enabled: n, params: s, animating: a} = i;
        if (!n || i.destroyed) {
          return i;
        }
        let o = s.slidesPerGroup;
        "auto" === s.slidesPerView && 1 === s.slidesPerGroup && s.slidesPerGroupAuto && (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
        const l = i.activeIndex < s.slidesPerGroupSkip ? 1 : o, c = i.virtual && s.virtual.enabled;
        if (s.loop) {
          if (a && !c && s.loopPreventsSliding) {
            return !1;
          }
          if (i.loopFix({
            direction: "next"
          }), i._clientLeft = i.wrapperEl.clientLeft, i.activeIndex === i.slides.length - 1 && s.cssMode) {
            return requestAnimationFrame((() => {
              i.slideTo(i.activeIndex + l, e, t, r);
            })), !0;
          }
        }
        return s.rewind && i.isEnd ? i.slideTo(0, e, t, r) : i.slideTo(i.activeIndex + l, e, t, r);
      },
      slidePrev: function(e, t, r) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this, {params: n, snapGrid: s, slidesGrid: a, rtlTranslate: o, enabled: l, animating: c} = i;
        if (!l || i.destroyed) {
          return i;
        }
        const u = i.virtual && n.virtual.enabled;
        if (n.loop) {
          if (c && !u && n.loopPreventsSliding) {
            return !1;
          }
          i.loopFix({
            direction: "prev"
          }), i._clientLeft = i.wrapperEl.clientLeft;
        }
        function d(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const p = d(o ? i.translate : -i.translate), f = s.map((e => d(e)));
        let h = s[f.indexOf(p) - 1];
        if (void 0 === h && n.cssMode) {
          let e;
          s.forEach(((t, r) => {
            p >= t && (e = r);
          })), void 0 !== e && (h = s[e > 0 ? e - 1 : e]);
        }
        let m = 0;
        if (void 0 !== h && (m = a.indexOf(h), m < 0 && (m = i.activeIndex - 1), "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (m = m - i.slidesPerViewDynamic("previous", !0) + 1, 
        m = Math.max(m, 0))), n.rewind && i.isBeginning) {
          const n = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
          return i.slideTo(n, e, t, r);
        }
        return n.loop && 0 === i.activeIndex && n.cssMode ? (requestAnimationFrame((() => {
          i.slideTo(m, e, t, r);
        })), !0) : i.slideTo(m, e, t, r);
      },
      slideReset: function(e, t, r) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this;
        if (!i.destroyed) {
          return i.slideTo(i.activeIndex, e, t, r);
        }
      },
      slideToClosest: function(e, t, r, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === i && (i = .5);
        const n = this;
        if (n.destroyed) {
          return;
        }
        let s = n.activeIndex;
        const a = Math.min(n.params.slidesPerGroupSkip, s), o = a + Math.floor((s - a) / n.params.slidesPerGroup), l = n.rtlTranslate ? n.translate : -n.translate;
        if (l >= n.snapGrid[o]) {
          const e = n.snapGrid[o];
          l - e > (n.snapGrid[o + 1] - e) * i && (s += n.params.slidesPerGroup);
        } else {
          const e = n.snapGrid[o - 1];
          l - e <= (n.snapGrid[o] - e) * i && (s -= n.params.slidesPerGroup);
        }
        return s = Math.max(s, 0), s = Math.min(s, n.slidesGrid.length - 1), n.slideTo(s, e, t, r);
      },
      slideToClickedSlide: function() {
        const e = this;
        if (e.destroyed) {
          return;
        }
        const {params: t, slidesEl: r} = e, i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
        let n, s = e.clickedIndex;
        const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
        if (t.loop) {
          if (e.animating) {
            return;
          }
          n = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? s < e.loopedSlides - i / 2 || s > e.slides.length - e.loopedSlides + i / 2 ? (e.loopFix(), 
          s = e.getSlideIndex(yn(r, `${a}[data-swiper-slide-index="${n}"]`)[0]), un((() => {
            e.slideTo(s);
          }))) : e.slideTo(s) : s > e.slides.length - i ? (e.loopFix(), s = e.getSlideIndex(yn(r, `${a}[data-swiper-slide-index="${n}"]`)[0]), 
          un((() => {
            e.slideTo(s);
          }))) : e.slideTo(s);
        } else {
          e.slideTo(s);
        }
      }
    };
    var Nn = {
      loopCreate: function(e) {
        const t = this, {params: r, slidesEl: i} = t;
        if (!r.loop || t.virtual && t.params.virtual.enabled) {
          return;
        }
        const n = () => {
          yn(i, `.${r.slideClass}, swiper-slide`).forEach(((e, t) => {
            e.setAttribute("data-swiper-slide-index", t);
          }));
        }, s = t.grid && r.grid && r.grid.rows > 1, a = r.slidesPerGroup * (s ? r.grid.rows : 1), o = t.slides.length % a != 0, l = s && t.slides.length % r.grid.rows != 0, c = e => {
          for (let i = 0; i < e; i += 1) {
            const e = t.isElement ? bn("swiper-slide", [ r.slideBlankClass ]) : bn("div", [ r.slideClass, r.slideBlankClass ]);
            t.slidesEl.append(e);
          }
        };
        if (o) {
          if (r.loopAddBlankSlides) {
            c(a - t.slides.length % a), t.recalcSlides(), t.updateSlides();
          } else {
            _n("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
          }
          n();
        } else if (l) {
          if (r.loopAddBlankSlides) {
            c(r.grid.rows - t.slides.length % r.grid.rows), t.recalcSlides(), t.updateSlides();
          } else {
            _n("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
          }
          n();
        } else {
          n();
        }
        t.loopFix({
          slideRealIndex: e,
          direction: r.centeredSlides ? void 0 : "next"
        });
      },
      loopFix: function(e) {
        let {slideRealIndex: t, slideTo: r = !0, direction: i, setTranslate: n, activeSlideIndex: s, byController: a, byMousewheel: o} = void 0 === e ? {} : e;
        const l = this;
        if (!l.params.loop) {
          return;
        }
        l.emit("beforeLoopFix");
        const {slides: c, allowSlidePrev: u, allowSlideNext: d, slidesEl: p, params: f} = l, {centeredSlides: h} = f;
        if (l.allowSlidePrev = !0, l.allowSlideNext = !0, l.virtual && f.virtual.enabled) {
          return r && (f.centeredSlides || 0 !== l.snapIndex ? f.centeredSlides && l.snapIndex < f.slidesPerView ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0) : l.snapIndex === l.snapGrid.length - 1 && l.slideTo(l.virtual.slidesBefore, 0, !1, !0) : l.slideTo(l.virtual.slides.length, 0, !1, !0)), 
          l.allowSlidePrev = u, l.allowSlideNext = d, void l.emit("loopFix");
        }
        let m = f.slidesPerView;
        "auto" === m ? m = l.slidesPerViewDynamic() : (m = Math.ceil(parseFloat(f.slidesPerView, 10)), 
        h && m % 2 == 0 && (m += 1));
        const g = f.slidesPerGroupAuto ? m : f.slidesPerGroup;
        let v = g;
        v % g != 0 && (v += g - v % g), v += f.loopAdditionalSlides, l.loopedSlides = v;
        const y = l.grid && f.grid && f.grid.rows > 1;
        c.length < m + v ? _n("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : y && "row" === f.grid.fill && _n("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
        const _ = [], b = [];
        let w = l.activeIndex;
        void 0 === s ? s = l.getSlideIndex(c.filter((e => e.classList.contains(f.slideActiveClass)))[0]) : w = s;
        const T = "next" === i || !i, x = "prev" === i || !i;
        let S = 0, E = 0;
        const C = y ? Math.ceil(c.length / f.grid.rows) : c.length, M = (y ? c[s].column : s) + (h && void 0 === n ? -m / 2 + .5 : 0);
        if (M < v) {
          S = Math.max(v - M, g);
          for (let e = 0; e < v - M; e += 1) {
            const t = e - Math.floor(e / C) * C;
            if (y) {
              const e = C - t - 1;
              for (let t = c.length - 1; t >= 0; t -= 1) {
                c[t].column === e && _.push(t);
              }
            } else {
              _.push(C - t - 1);
            }
          }
        } else if (M + m > C - v) {
          E = Math.max(M - (C - 2 * v), g);
          for (let e = 0; e < E; e += 1) {
            const t = e - Math.floor(e / C) * C;
            y ? c.forEach(((e, r) => {
              e.column === t && b.push(r);
            })) : b.push(t);
          }
        }
        if (l.__preventObserver__ = !0, requestAnimationFrame((() => {
          l.__preventObserver__ = !1;
        })), x && _.forEach((e => {
          c[e].swiperLoopMoveDOM = !0, p.prepend(c[e]), c[e].swiperLoopMoveDOM = !1;
        })), T && b.forEach((e => {
          c[e].swiperLoopMoveDOM = !0, p.append(c[e]), c[e].swiperLoopMoveDOM = !1;
        })), l.recalcSlides(), "auto" === f.slidesPerView ? l.updateSlides() : y && (_.length > 0 && x || b.length > 0 && T) && l.slides.forEach(((e, t) => {
          l.grid.updateSlide(t, e, l.slides);
        })), f.watchSlidesProgress && l.updateSlidesOffset(), r) {
          if (_.length > 0 && x) {
            if (void 0 === t) {
              const e = l.slidesGrid[w], t = l.slidesGrid[w + S] - e;
              o ? l.setTranslate(l.translate - t) : (l.slideTo(w + Math.ceil(S), 0, !1, !0), n && (l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - t, 
              l.touchEventsData.currentTranslate = l.touchEventsData.currentTranslate - t));
            } else if (n) {
              const e = y ? _.length / f.grid.rows : _.length;
              l.slideTo(l.activeIndex + e, 0, !1, !0), l.touchEventsData.currentTranslate = l.translate;
            }
          } else if (b.length > 0 && T) {
            if (void 0 === t) {
              const e = l.slidesGrid[w], t = l.slidesGrid[w - E] - e;
              o ? l.setTranslate(l.translate - t) : (l.slideTo(w - E, 0, !1, !0), n && (l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - t, 
              l.touchEventsData.currentTranslate = l.touchEventsData.currentTranslate - t));
            } else {
              const e = y ? b.length / f.grid.rows : b.length;
              l.slideTo(l.activeIndex - e, 0, !1, !0);
            }
          }
        }
        if (l.allowSlidePrev = u, l.allowSlideNext = d, l.controller && l.controller.control && !a) {
          const e = {
            slideRealIndex: t,
            direction: i,
            setTranslate: n,
            activeSlideIndex: s,
            byController: !0
          };
          Array.isArray(l.controller.control) ? l.controller.control.forEach((t => {
            !t.destroyed && t.params.loop && t.loopFix({
              ...e,
              slideTo: t.params.slidesPerView === f.slidesPerView && r
            });
          })) : l.controller.control instanceof l.constructor && l.controller.control.params.loop && l.controller.control.loopFix({
            ...e,
            slideTo: l.controller.control.params.slidesPerView === f.slidesPerView && r
          });
        }
        l.emit("loopFix");
      },
      loopDestroy: function() {
        const e = this, {params: t, slidesEl: r} = e;
        if (!t.loop || e.virtual && e.params.virtual.enabled) {
          return;
        }
        e.recalcSlides();
        const i = [];
        e.slides.forEach((e => {
          const t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
          i[t] = e;
        })), e.slides.forEach((e => {
          e.removeAttribute("data-swiper-slide-index");
        })), i.forEach((e => {
          r.append(e);
        })), e.recalcSlides(), e.slideTo(e.realIndex, 0);
      }
    };
    function Gn(e, t, r) {
      const i = ln(), {params: n} = e, s = n.edgeSwipeDetection, a = n.edgeSwipeThreshold;
      return !s || !(r <= a || r >= i.innerWidth - a) || "prevent" === s && (t.preventDefault(), 
      !0);
    }
    function Vn(e) {
      const t = this, r = an();
      let i = e;
      i.originalEvent && (i = i.originalEvent);
      const n = t.touchEventsData;
      if ("pointerdown" === i.type) {
        if (null !== n.pointerId && n.pointerId !== i.pointerId) {
          return;
        }
        n.pointerId = i.pointerId;
      } else {
        "touchstart" === i.type && 1 === i.targetTouches.length && (n.touchId = i.targetTouches[0].identifier);
      }
      if ("touchstart" === i.type) {
        return void Gn(t, i, i.targetTouches[0].pageX);
      }
      const {params: s, touches: a, enabled: o} = t;
      if (!o) {
        return;
      }
      if (!s.simulateTouch && "mouse" === i.pointerType) {
        return;
      }
      if (t.animating && s.preventInteractionOnTransition) {
        return;
      }
      !t.animating && s.cssMode && s.loop && t.loopFix();
      let l = i.target;
      if ("wrapper" === s.touchEventsTarget && !t.wrapperEl.contains(l)) {
        return;
      }
      if ("which" in i && 3 === i.which) {
        return;
      }
      if ("button" in i && i.button > 0) {
        return;
      }
      if (n.isTouched && n.isMoved) {
        return;
      }
      const c = !!s.noSwipingClass && "" !== s.noSwipingClass, u = i.composedPath ? i.composedPath() : i.path;
      c && i.target && i.target.shadowRoot && u && (l = u[0]);
      const d = s.noSwipingSelector ? s.noSwipingSelector : `.${s.noSwipingClass}`, p = !(!i.target || !i.target.shadowRoot);
      if (s.noSwiping && (p ? function(e, t) {
        return void 0 === t && (t = this), function t(r) {
          if (!r || r === an() || r === ln()) {
            return null;
          }
          r.assignedSlot && (r = r.assignedSlot);
          const i = r.closest(e);
          return i || r.getRootNode ? i || t(r.getRootNode().host) : null;
        }(t);
      }(d, l) : l.closest(d))) {
        return void (t.allowClick = !0);
      }
      if (s.swipeHandler && !l.closest(s.swipeHandler)) {
        return;
      }
      a.currentX = i.pageX, a.currentY = i.pageY;
      const f = a.currentX, h = a.currentY;
      if (!Gn(t, i, f)) {
        return;
      }
      Object.assign(n, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
      }), a.startX = f, a.startY = h, n.touchStartTime = dn(), t.allowClick = !0, t.updateSize(), 
      t.swipeDirection = void 0, s.threshold > 0 && (n.allowThresholdMove = !1);
      let m = !0;
      l.matches(n.focusableElements) && (m = !1, "SELECT" === l.nodeName && (n.isTouched = !1)), 
      r.activeElement && r.activeElement.matches(n.focusableElements) && r.activeElement !== l && r.activeElement.blur();
      const g = m && t.allowTouchMove && s.touchStartPreventDefault;
      !s.touchStartForcePreventDefault && !g || l.isContentEditable || i.preventDefault(), 
      s.freeMode && s.freeMode.enabled && t.freeMode && t.animating && !s.cssMode && t.freeMode.onTouchStart(), 
      t.emit("touchStart", i);
    }
    function $n(e) {
      const t = an(), r = this, i = r.touchEventsData, {params: n, touches: s, rtlTranslate: a, enabled: o} = r;
      if (!o) {
        return;
      }
      if (!n.simulateTouch && "mouse" === e.pointerType) {
        return;
      }
      let l, c = e;
      if (c.originalEvent && (c = c.originalEvent), "pointermove" === c.type) {
        if (null !== i.touchId) {
          return;
        }
        if (c.pointerId !== i.pointerId) {
          return;
        }
      }
      if ("touchmove" === c.type) {
        if (l = [ ...c.changedTouches ].filter((e => e.identifier === i.touchId))[0], !l || l.identifier !== i.touchId) {
          return;
        }
      } else {
        l = c;
      }
      if (!i.isTouched) {
        return void (i.startMoving && i.isScrolling && r.emit("touchMoveOpposite", c));
      }
      const u = l.pageX, d = l.pageY;
      if (c.preventedByNestedSwiper) {
        return s.startX = u, void (s.startY = d);
      }
      if (!r.allowTouchMove) {
        return c.target.matches(i.focusableElements) || (r.allowClick = !1), void (i.isTouched && (Object.assign(s, {
          startX: u,
          startY: d,
          currentX: u,
          currentY: d
        }), i.touchStartTime = dn()));
      }
      if (n.touchReleaseOnEdges && !n.loop) {
        if (r.isVertical()) {
          if (d < s.startY && r.translate <= r.maxTranslate() || d > s.startY && r.translate >= r.minTranslate()) {
            return i.isTouched = !1, void (i.isMoved = !1);
          }
        } else if (u < s.startX && r.translate <= r.maxTranslate() || u > s.startX && r.translate >= r.minTranslate()) {
          return;
        }
      }
      if (t.activeElement && c.target === t.activeElement && c.target.matches(i.focusableElements)) {
        return i.isMoved = !0, void (r.allowClick = !1);
      }
      i.allowTouchCallbacks && r.emit("touchMove", c), s.previousX = s.currentX, s.previousY = s.currentY, 
      s.currentX = u, s.currentY = d;
      const p = s.currentX - s.startX, f = s.currentY - s.startY;
      if (r.params.threshold && Math.sqrt(p ** 2 + f ** 2) < r.params.threshold) {
        return;
      }
      if (void 0 === i.isScrolling) {
        let e;
        r.isHorizontal() && s.currentY === s.startY || r.isVertical() && s.currentX === s.startX ? i.isScrolling = !1 : p * p + f * f >= 25 && (e = 180 * Math.atan2(Math.abs(f), Math.abs(p)) / Math.PI, 
        i.isScrolling = r.isHorizontal() ? e > n.touchAngle : 90 - e > n.touchAngle);
      }
      if (i.isScrolling && r.emit("touchMoveOpposite", c), void 0 === i.startMoving && (s.currentX === s.startX && s.currentY === s.startY || (i.startMoving = !0)), 
      i.isScrolling) {
        return void (i.isTouched = !1);
      }
      if (!i.startMoving) {
        return;
      }
      r.allowClick = !1, !n.cssMode && c.cancelable && c.preventDefault(), n.touchMoveStopPropagation && !n.nested && c.stopPropagation();
      let h = r.isHorizontal() ? p : f, m = r.isHorizontal() ? s.currentX - s.previousX : s.currentY - s.previousY;
      n.oneWayMovement && (h = Math.abs(h) * (a ? 1 : -1), m = Math.abs(m) * (a ? 1 : -1)), 
      s.diff = h, h *= n.touchRatio, a && (h = -h, m = -m);
      const g = r.touchesDirection;
      r.swipeDirection = h > 0 ? "prev" : "next", r.touchesDirection = m > 0 ? "prev" : "next";
      const v = r.params.loop && !n.cssMode, y = "next" === r.touchesDirection && r.allowSlideNext || "prev" === r.touchesDirection && r.allowSlidePrev;
      if (!i.isMoved) {
        if (v && y && r.loopFix({
          direction: r.swipeDirection
        }), i.startTranslate = r.getTranslate(), r.setTransition(0), r.animating) {
          const e = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0
          });
          r.wrapperEl.dispatchEvent(e);
        }
        i.allowMomentumBounce = !1, !n.grabCursor || !0 !== r.allowSlideNext && !0 !== r.allowSlidePrev || r.setGrabCursor(!0), 
        r.emit("sliderFirstMove", c);
      }
      if ((new Date).getTime(), i.isMoved && i.allowThresholdMove && g !== r.touchesDirection && v && y && Math.abs(h) >= 1) {
        return Object.assign(s, {
          startX: u,
          startY: d,
          currentX: u,
          currentY: d,
          startTranslate: i.currentTranslate
        }), i.loopSwapReset = !0, void (i.startTranslate = i.currentTranslate);
      }
      r.emit("sliderMove", c), i.isMoved = !0, i.currentTranslate = h + i.startTranslate;
      let _ = !0, b = n.resistanceRatio;
      if (n.touchReleaseOnEdges && (b = 0), h > 0 ? (v && y && i.allowThresholdMove && i.currentTranslate > (n.centeredSlides ? r.minTranslate() - r.slidesSizesGrid[r.activeIndex + 1] : r.minTranslate()) && r.loopFix({
        direction: "prev",
        setTranslate: !0,
        activeSlideIndex: 0
      }), i.currentTranslate > r.minTranslate() && (_ = !1, n.resistance && (i.currentTranslate = r.minTranslate() - 1 + (-r.minTranslate() + i.startTranslate + h) ** b))) : h < 0 && (v && y && i.allowThresholdMove && i.currentTranslate < (n.centeredSlides ? r.maxTranslate() + r.slidesSizesGrid[r.slidesSizesGrid.length - 1] : r.maxTranslate()) && r.loopFix({
        direction: "next",
        setTranslate: !0,
        activeSlideIndex: r.slides.length - ("auto" === n.slidesPerView ? r.slidesPerViewDynamic() : Math.ceil(parseFloat(n.slidesPerView, 10)))
      }), i.currentTranslate < r.maxTranslate() && (_ = !1, n.resistance && (i.currentTranslate = r.maxTranslate() + 1 - (r.maxTranslate() - i.startTranslate - h) ** b))), 
      _ && (c.preventedByNestedSwiper = !0), !r.allowSlideNext && "next" === r.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), 
      !r.allowSlidePrev && "prev" === r.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), 
      r.allowSlidePrev || r.allowSlideNext || (i.currentTranslate = i.startTranslate), 
      n.threshold > 0) {
        if (!(Math.abs(h) > n.threshold || i.allowThresholdMove)) {
          return void (i.currentTranslate = i.startTranslate);
        }
        if (!i.allowThresholdMove) {
          return i.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, 
          i.currentTranslate = i.startTranslate, void (s.diff = r.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY);
        }
      }
      n.followFinger && !n.cssMode && ((n.freeMode && n.freeMode.enabled && r.freeMode || n.watchSlidesProgress) && (r.updateActiveIndex(), 
      r.updateSlidesClasses()), n.freeMode && n.freeMode.enabled && r.freeMode && r.freeMode.onTouchMove(), 
      r.updateProgress(i.currentTranslate), r.setTranslate(i.currentTranslate));
    }
    function Yn(e) {
      const t = this, r = t.touchEventsData;
      let i, n = e;
      n.originalEvent && (n = n.originalEvent);
      if ("touchend" === n.type || "touchcancel" === n.type) {
        if (i = [ ...n.changedTouches ].filter((e => e.identifier === r.touchId))[0], !i || i.identifier !== r.touchId) {
          return;
        }
      } else {
        if (null !== r.touchId) {
          return;
        }
        if (n.pointerId !== r.pointerId) {
          return;
        }
        i = n;
      }
      if ([ "pointercancel", "pointerout", "pointerleave", "contextmenu" ].includes(n.type)) {
        if (!([ "pointercancel", "contextmenu" ].includes(n.type) && (t.browser.isSafari || t.browser.isWebView))) {
          return;
        }
      }
      r.pointerId = null, r.touchId = null;
      const {params: s, touches: a, rtlTranslate: o, slidesGrid: l, enabled: c} = t;
      if (!c) {
        return;
      }
      if (!s.simulateTouch && "mouse" === n.pointerType) {
        return;
      }
      if (r.allowTouchCallbacks && t.emit("touchEnd", n), r.allowTouchCallbacks = !1, 
      !r.isTouched) {
        return r.isMoved && s.grabCursor && t.setGrabCursor(!1), r.isMoved = !1, void (r.startMoving = !1);
      }
      s.grabCursor && r.isMoved && r.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
      const u = dn(), d = u - r.touchStartTime;
      if (t.allowClick) {
        const e = n.path || n.composedPath && n.composedPath();
        t.updateClickedSlide(e && e[0] || n.target, e), t.emit("tap click", n), d < 300 && u - r.lastClickTime < 300 && t.emit("doubleTap doubleClick", n);
      }
      if (r.lastClickTime = dn(), un((() => {
        t.destroyed || (t.allowClick = !0);
      })), !r.isTouched || !r.isMoved || !t.swipeDirection || 0 === a.diff && !r.loopSwapReset || r.currentTranslate === r.startTranslate && !r.loopSwapReset) {
        return r.isTouched = !1, r.isMoved = !1, void (r.startMoving = !1);
      }
      let p;
      if (r.isTouched = !1, r.isMoved = !1, r.startMoving = !1, p = s.followFinger ? o ? t.translate : -t.translate : -r.currentTranslate, 
      s.cssMode) {
        return;
      }
      if (s.freeMode && s.freeMode.enabled) {
        return void t.freeMode.onTouchEnd({
          currentPos: p
        });
      }
      const f = p >= -t.maxTranslate() && !t.params.loop;
      let h = 0, m = t.slidesSizesGrid[0];
      for (let e = 0; e < l.length; e += e < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup) {
        const t = e < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
        void 0 !== l[e + t] ? (f || p >= l[e] && p < l[e + t]) && (h = e, m = l[e + t] - l[e]) : (f || p >= l[e]) && (h = e, 
        m = l[l.length - 1] - l[l.length - 2]);
      }
      let g = null, v = null;
      s.rewind && (t.isBeginning ? v = s.virtual && s.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (g = 0));
      const y = (p - l[h]) / m, _ = h < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
      if (d > s.longSwipesMs) {
        if (!s.longSwipes) {
          return void t.slideTo(t.activeIndex);
        }
        "next" === t.swipeDirection && (y >= s.longSwipesRatio ? t.slideTo(s.rewind && t.isEnd ? g : h + _) : t.slideTo(h)), 
        "prev" === t.swipeDirection && (y > 1 - s.longSwipesRatio ? t.slideTo(h + _) : null !== v && y < 0 && Math.abs(y) > s.longSwipesRatio ? t.slideTo(v) : t.slideTo(h));
      } else {
        if (!s.shortSwipes) {
          return void t.slideTo(t.activeIndex);
        }
        t.navigation && (n.target === t.navigation.nextEl || n.target === t.navigation.prevEl) ? n.target === t.navigation.nextEl ? t.slideTo(h + _) : t.slideTo(h) : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : h + _), 
        "prev" === t.swipeDirection && t.slideTo(null !== v ? v : h));
      }
    }
    function Hn() {
      const e = this, {params: t, el: r} = e;
      if (r && 0 === r.offsetWidth) {
        return;
      }
      t.breakpoints && e.setBreakpoint();
      const {allowSlideNext: i, allowSlidePrev: n, snapGrid: s} = e, a = e.virtual && e.params.virtual.enabled;
      e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), 
      e.updateSlidesClasses();
      const o = a && t.loop;
      !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || o ? e.params.loop && !a ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0), 
      e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), 
      e.autoplay.resizeTimeout = setTimeout((() => {
        e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
      }), 500)), e.allowSlidePrev = n, e.allowSlideNext = i, e.params.watchOverflow && s !== e.snapGrid && e.checkOverflow();
    }
    function Xn(e) {
      const t = this;
      t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), 
      e.stopImmediatePropagation())));
    }
    function jn() {
      const e = this, {wrapperEl: t, rtlTranslate: r, enabled: i} = e;
      if (!i) {
        return;
      }
      let n;
      e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 
      0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
      const s = e.maxTranslate() - e.minTranslate();
      n = 0 === s ? 0 : (e.translate - e.minTranslate()) / s, n !== e.progress && e.updateProgress(r ? -e.translate : e.translate), 
      e.emit("setTranslate", e.translate, !1);
    }
    function Wn(e) {
      const t = this;
      Dn(t, e.target), t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update();
    }
    function Un() {
      const e = this;
      e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
    }
    const Kn = (e, t) => {
      const r = an(), {params: i, el: n, wrapperEl: s, device: a} = e, o = !!i.nested, l = "on" === t ? "addEventListener" : "removeEventListener", c = t;
      r[l]("touchstart", e.onDocumentTouchStart, {
        passive: !1,
        capture: o
      }), n[l]("touchstart", e.onTouchStart, {
        passive: !1
      }), n[l]("pointerdown", e.onTouchStart, {
        passive: !1
      }), r[l]("touchmove", e.onTouchMove, {
        passive: !1,
        capture: o
      }), r[l]("pointermove", e.onTouchMove, {
        passive: !1,
        capture: o
      }), r[l]("touchend", e.onTouchEnd, {
        passive: !0
      }), r[l]("pointerup", e.onTouchEnd, {
        passive: !0
      }), r[l]("pointercancel", e.onTouchEnd, {
        passive: !0
      }), r[l]("touchcancel", e.onTouchEnd, {
        passive: !0
      }), r[l]("pointerout", e.onTouchEnd, {
        passive: !0
      }), r[l]("pointerleave", e.onTouchEnd, {
        passive: !0
      }), r[l]("contextmenu", e.onTouchEnd, {
        passive: !0
      }), (i.preventClicks || i.preventClicksPropagation) && n[l]("click", e.onClick, !0), 
      i.cssMode && s[l]("scroll", e.onScroll), i.updateOnWindowResize ? e[c](a.ios || a.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", Hn, !0) : e[c]("observerUpdate", Hn, !0), 
      n[l]("load", e.onLoad, {
        capture: !0
      });
    };
    const Qn = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var Zn = {
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
    function Jn(e, t) {
      return function(r) {
        void 0 === r && (r = {});
        const i = Object.keys(r)[0], n = r[i];
        "object" == typeof n && null !== n ? (!0 === e[i] && (e[i] = {
          enabled: !0
        }), "navigation" === i && e[i] && e[i].enabled && !e[i].prevEl && !e[i].nextEl && (e[i].auto = !0), 
        [ "pagination", "scrollbar" ].indexOf(i) >= 0 && e[i] && e[i].enabled && !e[i].el && (e[i].auto = !0), 
        i in e && "enabled" in n ? ("object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0), 
        e[i] || (e[i] = {
          enabled: !1
        }), hn(t, r)) : hn(t, r)) : hn(t, r);
      };
    }
    const es = {
      eventsEmitter: On,
      update: qn,
      translate: Rn,
      transition: {
        setTransition: function(e, t) {
          const r = this;
          r.params.cssMode || (r.wrapperEl.style.transitionDuration = `${e}ms`, r.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : ""), 
          r.emit("setTransition", e, t);
        },
        transitionStart: function(e, t) {
          void 0 === e && (e = !0);
          const r = this, {params: i} = r;
          i.cssMode || (i.autoHeight && r.updateAutoHeight(), Fn({
            swiper: r,
            runCallbacks: e,
            direction: t,
            step: "Start"
          }));
        },
        transitionEnd: function(e, t) {
          void 0 === e && (e = !0);
          const r = this, {params: i} = r;
          r.animating = !1, i.cssMode || (r.setTransition(0), Fn({
            swiper: r,
            runCallbacks: e,
            direction: t,
            step: "End"
          }));
        }
      },
      slide: Bn,
      loop: Nn,
      grabCursor: {
        setGrabCursor: function(e) {
          const t = this;
          if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) {
            return;
          }
          const r = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0), r.style.cursor = "move", r.style.cursor = e ? "grabbing" : "grab", 
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
          e.onTouchStart = Vn.bind(e), e.onTouchMove = $n.bind(e), e.onTouchEnd = Yn.bind(e), 
          e.onDocumentTouchStart = Un.bind(e), t.cssMode && (e.onScroll = jn.bind(e)), e.onClick = Xn.bind(e), 
          e.onLoad = Wn.bind(e), Kn(e, "on");
        },
        detachEvents: function() {
          Kn(this, "off");
        }
      },
      breakpoints: {
        setBreakpoint: function() {
          const e = this, {realIndex: t, initialized: r, params: i, el: n} = e, s = i.breakpoints;
          if (!s || s && 0 === Object.keys(s).length) {
            return;
          }
          const a = e.getBreakpoint(s, e.params.breakpointsBase, e.el);
          if (!a || e.currentBreakpoint === a) {
            return;
          }
          const o = (a in s ? s[a] : void 0) || e.originalParams, l = Qn(e, i), c = Qn(e, o), u = i.enabled;
          l && !c ? (n.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`), 
          e.emitContainerClasses()) : !l && c && (n.classList.add(`${i.containerModifierClass}grid`), 
          (o.grid.fill && "column" === o.grid.fill || !o.grid.fill && "column" === i.grid.fill) && n.classList.add(`${i.containerModifierClass}grid-column`), 
          e.emitContainerClasses()), [ "navigation", "pagination", "scrollbar" ].forEach((t => {
            if (void 0 === o[t]) {
              return;
            }
            const r = i[t] && i[t].enabled, n = o[t] && o[t].enabled;
            r && !n && e[t].disable(), !r && n && e[t].enable();
          }));
          const d = o.direction && o.direction !== i.direction, p = i.loop && (o.slidesPerView !== i.slidesPerView || d), f = i.loop;
          d && r && e.changeDirection(), hn(e.params, o);
          const h = e.params.enabled, m = e.params.loop;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev
          }), u && !h ? e.disable() : !u && h && e.enable(), e.currentBreakpoint = a, e.emit("_beforeBreakpoint", o), 
          r && (p ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides()) : !f && m ? (e.loopCreate(t), 
          e.updateSlides()) : f && !m && e.loopDestroy()), e.emit("breakpoint", o);
        },
        getBreakpoint: function(e, t, r) {
          if (void 0 === t && (t = "window"), !e || "container" === t && !r) {
            return;
          }
          let i = !1;
          const n = ln(), s = "window" === t ? n.innerHeight : r.clientHeight, a = Object.keys(e).map((e => {
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
            "window" === t ? n.matchMedia(`(min-width: ${o}px)`).matches && (i = s) : o <= r.clientWidth && (i = s);
          }
          return i || "max";
        }
      },
      checkOverflow: {
        checkOverflow: function() {
          const e = this, {isLocked: t, params: r} = e, {slidesOffsetBefore: i} = r;
          if (i) {
            const t = e.slides.length - 1, r = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > r;
          } else {
            e.isLocked = 1 === e.snapGrid.length;
          }
          !0 === r.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === r.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), 
          t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        }
      },
      classes: {
        addClasses: function() {
          const e = this, {classNames: t, params: r, rtl: i, el: n, device: s} = e, a = function(e, t) {
            const r = [];
            return e.forEach((e => {
              "object" == typeof e ? Object.keys(e).forEach((i => {
                e[i] && r.push(t + i);
              })) : "string" == typeof e && r.push(t + e);
            })), r;
          }([ "initialized", r.direction, {
            "free-mode": e.params.freeMode && r.freeMode.enabled
          }, {
            autoheight: r.autoHeight
          }, {
            rtl: i
          }, {
            grid: r.grid && r.grid.rows > 1
          }, {
            "grid-column": r.grid && r.grid.rows > 1 && "column" === r.grid.fill
          }, {
            android: s.android
          }, {
            ios: s.ios
          }, {
            "css-mode": r.cssMode
          }, {
            centered: r.cssMode && r.centeredSlides
          }, {
            "watch-progress": r.watchSlidesProgress
          } ], r.containerModifierClass);
          t.push(...a), n.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function() {
          const {el: e, classNames: t} = this;
          e.classList.remove(...t), this.emitContainerClasses();
        }
      }
    }, ts = {};
    class rs {
      constructor() {
        let e, t;
        for (var r = arguments.length, i = new Array(r), n = 0; n < r; n++) {
          i[n] = arguments[n];
        }
        1 === i.length && i[0].constructor && "Object" === Object.prototype.toString.call(i[0]).slice(8, -1) ? t = i[0] : [e, t] = i, 
        t || (t = {}), t = hn({}, t), e && !t.el && (t.el = e);
        const s = an();
        if (t.el && "string" == typeof t.el && s.querySelectorAll(t.el).length > 1) {
          const e = [];
          return s.querySelectorAll(t.el).forEach((r => {
            const i = hn({}, t, {
              el: r
            });
            e.push(new rs(i));
          })), e;
        }
        const a = this;
        a.__swiper__ = !0, a.support = kn(), a.device = Pn({
          userAgent: t.userAgent
        }), a.browser = Ln(), a.eventsListeners = {}, a.eventsAnyListeners = [], a.modules = [ ...a.__modules__ ], 
        t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
        const o = {};
        a.modules.forEach((e => {
          e({
            params: t,
            swiper: a,
            extendParams: Jn(t, o),
            on: a.on.bind(a),
            once: a.once.bind(a),
            off: a.off.bind(a),
            emit: a.emit.bind(a)
          });
        }));
        const l = hn({}, Zn, o);
        return a.params = hn({}, l, ts, t), a.originalParams = hn({}, a.params), a.passedParams = hn({}, t), 
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
        const {slidesEl: t, params: r} = this, i = Tn(yn(t, `.${r.slideClass}, swiper-slide`)[0]);
        return Tn(e) - i;
      }
      getSlideIndexByData(e) {
        return this.getSlideIndex(this.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0]);
      }
      recalcSlides() {
        const {slidesEl: e, params: t} = this;
        this.slides = yn(e, `.${t.slideClass}, swiper-slide`);
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
        const r = this;
        e = Math.min(Math.max(e, 0), 1);
        const i = r.minTranslate(), n = (r.maxTranslate() - i) * e + i;
        r.translateTo(n, void 0 === t ? 0 : t), r.updateActiveIndex(), r.updateSlidesClasses();
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
        e.slides.forEach((r => {
          const i = e.getSlideClasses(r);
          t.push({
            slideEl: r,
            classNames: i
          }), e.emit("_slideClass", r, i);
        })), e.emit("_slideClasses", t);
      }
      slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"), void 0 === t && (t = !1);
        const {params: r, slides: i, slidesGrid: n, slidesSizesGrid: s, size: a, activeIndex: o} = this;
        let l = 1;
        if ("number" == typeof r.slidesPerView) {
          return r.slidesPerView;
        }
        if (r.centeredSlides) {
          let e, t = i[o] ? Math.ceil(i[o].swiperSlideSize) : 0;
          for (let r = o + 1; r < i.length; r += 1) {
            i[r] && !e && (t += Math.ceil(i[r].swiperSlideSize), l += 1, t > a && (e = !0));
          }
          for (let r = o - 1; r >= 0; r -= 1) {
            i[r] && !e && (t += i[r].swiperSlideSize, l += 1, t > a && (e = !0));
          }
        } else if ("current" === e) {
          for (let e = o + 1; e < i.length; e += 1) {
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
        const {snapGrid: t, params: r} = e;
        function i() {
          const t = e.rtlTranslate ? -1 * e.translate : e.translate, r = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(r), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let n;
        if (r.breakpoints && e.setBreakpoint(), [ ...e.el.querySelectorAll('[loading="lazy"]') ].forEach((t => {
          t.complete && Dn(e, t);
        })), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), 
        r.freeMode && r.freeMode.enabled && !r.cssMode) {
          i(), r.autoHeight && e.updateAutoHeight();
        } else {
          if (("auto" === r.slidesPerView || r.slidesPerView > 1) && e.isEnd && !r.centeredSlides) {
            const t = e.virtual && r.virtual.enabled ? e.virtual.slides : e.slides;
            n = e.slideTo(t.length - 1, 0, !1, !0);
          } else {
            n = e.slideTo(e.activeIndex, 0, !1, !0);
          }
          n || i();
        }
        r.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
      }
      changeDirection(e, t) {
        void 0 === t && (t = !0);
        const r = this, i = r.params.direction;
        return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e || (r.el.classList.remove(`${r.params.containerModifierClass}${i}`), 
        r.el.classList.add(`${r.params.containerModifierClass}${e}`), r.emitContainerClasses(), 
        r.params.direction = e, r.slides.forEach((t => {
          "vertical" === e ? t.style.width = "" : t.style.height = "";
        })), r.emit("changeDirection"), t && r.update()), r;
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
        let r = e || t.params.el;
        if ("string" == typeof r && (r = document.querySelector(r)), !r) {
          return !1;
        }
        r.swiper = t, r.parentNode && r.parentNode.host && r.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
        const i = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let n = (() => {
          if (r && r.shadowRoot && r.shadowRoot.querySelector) {
            return r.shadowRoot.querySelector(i());
          }
          return yn(r, i())[0];
        })();
        return !n && t.params.createElements && (n = bn("div", t.params.wrapperClass), r.append(n), 
        yn(r, `.${t.params.slideClass}`).forEach((e => {
          n.append(e);
        }))), Object.assign(t, {
          el: r,
          wrapperEl: n,
          slidesEl: t.isElement && !r.parentNode.host.slideSlots ? r.parentNode.host : n,
          hostEl: t.isElement ? r.parentNode.host : r,
          mounted: !0,
          rtl: "rtl" === r.dir.toLowerCase() || "rtl" === wn(r, "direction"),
          rtlTranslate: "horizontal" === t.params.direction && ("rtl" === r.dir.toLowerCase() || "rtl" === wn(r, "direction")),
          wrongRTL: "-webkit-box" === wn(n, "display")
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
        const r = [ ...t.el.querySelectorAll('[loading="lazy"]') ];
        return t.isElement && r.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), 
        r.forEach((e => {
          e.complete ? Dn(t, e) : e.addEventListener("load", (e => {
            Dn(t, e.target);
          }));
        })), zn(t), t.initialized = !0, zn(t), t.emit("init"), t.emit("afterInit"), t;
      }
      destroy(e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        const r = this, {params: i, el: n, wrapperEl: s, slides: a} = r;
        return void 0 === r.params || r.destroyed || (r.emit("beforeDestroy"), r.initialized = !1, 
        r.detachEvents(), i.loop && r.loopDestroy(), t && (r.removeClasses(), n.removeAttribute("style"), 
        s.removeAttribute("style"), a && a.length && a.forEach((e => {
          e.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass), 
          e.removeAttribute("style"), e.removeAttribute("data-swiper-slide-index");
        }))), r.emit("destroy"), Object.keys(r.eventsListeners).forEach((e => {
          r.off(e);
        })), !1 !== e && (r.el.swiper = null, function(e) {
          const t = e;
          Object.keys(t).forEach((e => {
            try {
              t[e] = null;
            } catch (e) {}
            try {
              delete t[e];
            } catch (e) {}
          }));
        }(r)), r.destroyed = !0), null;
      }
      static extendDefaults(e) {
        hn(ts, e);
      }
      static get extendedDefaults() {
        return ts;
      }
      static get defaults() {
        return Zn;
      }
      static installModule(e) {
        rs.prototype.__modules__ || (rs.prototype.__modules__ = []);
        const t = rs.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e) ? (e.forEach((e => rs.installModule(e))), rs) : (rs.installModule(e), 
        rs);
      }
    }
    function is(e, t, r, i) {
      return e.params.createElements && Object.keys(i).forEach((n => {
        if (!r[n] && !0 === r.auto) {
          let s = yn(e.el, `.${i[n]}`)[0];
          s || (s = bn("div", i[n]), s.className = i[n], e.el.append(s)), r[n] = s, t[n] = s;
        }
      })), r;
    }
    function ns(e) {
      let {swiper: t, extendParams: r, on: i, emit: n} = e;
      function s(e) {
        let r;
        return e && "string" == typeof e && t.isElement && (r = t.el.querySelector(e), r) ? r : (e && ("string" == typeof e && (r = [ ...document.querySelectorAll(e) ]), 
        t.params.uniqueNavElements && "string" == typeof e && r.length > 1 && 1 === t.el.querySelectorAll(e).length && (r = t.el.querySelector(e))), 
        e && !r ? e : r);
      }
      function a(e, r) {
        const i = t.params.navigation;
        (e = En(e)).forEach((e => {
          e && (e.classList[r ? "add" : "remove"](...i.disabledClass.split(" ")), "BUTTON" === e.tagName && (e.disabled = r), 
          t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](i.lockClass));
        }));
      }
      function o() {
        const {nextEl: e, prevEl: r} = t.navigation;
        if (t.params.loop) {
          return a(r, !1), void a(e, !1);
        }
        a(r, t.isBeginning && !t.params.rewind), a(e, t.isEnd && !t.params.rewind);
      }
      function l(e) {
        e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(), 
        n("navigationPrev"));
      }
      function c(e) {
        e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(), 
        n("navigationNext"));
      }
      function u() {
        const e = t.params.navigation;
        if (t.params.navigation = is(t, t.originalParams.navigation, t.params.navigation, {
          nextEl: "swiper-button-next",
          prevEl: "swiper-button-prev"
        }), !e.nextEl && !e.prevEl) {
          return;
        }
        let r = s(e.nextEl), i = s(e.prevEl);
        Object.assign(t.navigation, {
          nextEl: r,
          prevEl: i
        }), r = En(r), i = En(i);
        const n = (r, i) => {
          r && r.addEventListener("click", "next" === i ? c : l), !t.enabled && r && r.classList.add(...e.lockClass.split(" "));
        };
        r.forEach((e => n(e, "next"))), i.forEach((e => n(e, "prev")));
      }
      function d() {
        let {nextEl: e, prevEl: r} = t.navigation;
        e = En(e), r = En(r);
        const i = (e, r) => {
          e.removeEventListener("click", "next" === r ? c : l), e.classList.remove(...t.params.navigation.disabledClass.split(" "));
        };
        e.forEach((e => i(e, "next"))), r.forEach((e => i(e, "prev")));
      }
      r({
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
      }, i("init", (() => {
        !1 === t.params.navigation.enabled ? p() : (u(), o());
      })), i("toEdge fromEdge lock unlock", (() => {
        o();
      })), i("destroy", (() => {
        d();
      })), i("enable disable", (() => {
        let {nextEl: e, prevEl: r} = t.navigation;
        e = En(e), r = En(r), t.enabled ? o() : [ ...e, ...r ].filter((e => !!e)).forEach((e => e.classList.add(t.params.navigation.lockClass)));
      })), i("click", ((e, r) => {
        let {nextEl: i, prevEl: s} = t.navigation;
        i = En(i), s = En(s);
        const a = r.target;
        if (t.params.navigation.hideOnClick && !s.includes(a) && !i.includes(a)) {
          if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === a || t.pagination.el.contains(a))) {
            return;
          }
          let e;
          i.length ? e = i[0].classList.contains(t.params.navigation.hiddenClass) : s.length && (e = s[0].classList.contains(t.params.navigation.hiddenClass)), 
          n(!0 === e ? "navigationShow" : "navigationHide"), [ ...i, ...s ].filter((e => !!e)).forEach((e => e.classList.toggle(t.params.navigation.hiddenClass)));
        }
      }));
      const p = () => {
        t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")), d();
      };
      Object.assign(t.navigation, {
        enable: () => {
          t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")), 
          u(), o();
        },
        disable: p,
        update: o,
        init: u,
        destroy: d
      });
    }
    function ss(e) {
      return void 0 === e && (e = ""), `.${e.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
    }
    function as(e) {
      let {swiper: t, extendParams: r, on: i, emit: n} = e;
      const s = "swiper-pagination";
      let a;
      r({
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
      function c(e, r) {
        const {bulletActiveClass: i} = t.params.pagination;
        e && (e = e[("prev" === r ? "previous" : "next") + "ElementSibling"]) && (e.classList.add(`${i}-${r}`), 
        (e = e[("prev" === r ? "previous" : "next") + "ElementSibling"]) && e.classList.add(`${i}-${r}-${r}`));
      }
      function u(e) {
        const r = e.target.closest(ss(t.params.pagination.bulletClass));
        if (!r) {
          return;
        }
        e.preventDefault();
        const i = Tn(r) * t.params.slidesPerGroup;
        if (t.params.loop) {
          if (t.realIndex === i) {
            return;
          }
          t.slideToLoop(i);
        } else {
          t.slideTo(i);
        }
      }
      function d() {
        const e = t.rtl, r = t.params.pagination;
        if (l()) {
          return;
        }
        let i, s, u = t.pagination.el;
        u = En(u);
        const d = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length, p = t.params.loop ? Math.ceil(d / t.params.slidesPerGroup) : t.snapGrid.length;
        if (t.params.loop ? (s = t.previousRealIndex || 0, i = t.params.slidesPerGroup > 1 ? Math.floor(t.realIndex / t.params.slidesPerGroup) : t.realIndex) : void 0 !== t.snapIndex ? (i = t.snapIndex, 
        s = t.previousSnapIndex) : (s = t.previousIndex || 0, i = t.activeIndex || 0), "bullets" === r.type && t.pagination.bullets && t.pagination.bullets.length > 0) {
          const n = t.pagination.bullets;
          let l, d, p;
          if (r.dynamicBullets && (a = Sn(n[0], t.isHorizontal() ? "width" : "height", !0), 
          u.forEach((e => {
            e.style[t.isHorizontal() ? "width" : "height"] = a * (r.dynamicMainBullets + 4) + "px";
          })), r.dynamicMainBullets > 1 && void 0 !== s && (o += i - (s || 0), o > r.dynamicMainBullets - 1 ? o = r.dynamicMainBullets - 1 : o < 0 && (o = 0)), 
          l = Math.max(i - o, 0), d = l + (Math.min(n.length, r.dynamicMainBullets) - 1), 
          p = (d + l) / 2), n.forEach((e => {
            const t = [ ...[ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((e => `${r.bulletActiveClass}${e}`)) ].map((e => "string" == typeof e && e.includes(" ") ? e.split(" ") : e)).flat();
            e.classList.remove(...t);
          })), u.length > 1) {
            n.forEach((e => {
              const n = Tn(e);
              n === i ? e.classList.add(...r.bulletActiveClass.split(" ")) : t.isElement && e.setAttribute("part", "bullet"), 
              r.dynamicBullets && (n >= l && n <= d && e.classList.add(...`${r.bulletActiveClass}-main`.split(" ")), 
              n === l && c(e, "prev"), n === d && c(e, "next"));
            }));
          } else {
            const e = n[i];
            if (e && e.classList.add(...r.bulletActiveClass.split(" ")), t.isElement && n.forEach(((e, t) => {
              e.setAttribute("part", t === i ? "bullet-active" : "bullet");
            })), r.dynamicBullets) {
              const e = n[l], t = n[d];
              for (let e = l; e <= d; e += 1) {
                n[e] && n[e].classList.add(...`${r.bulletActiveClass}-main`.split(" "));
              }
              c(e, "prev"), c(t, "next");
            }
          }
          if (r.dynamicBullets) {
            const i = Math.min(n.length, r.dynamicMainBullets + 4), s = (a * i - a) / 2 - p * a, o = e ? "right" : "left";
            n.forEach((e => {
              e.style[t.isHorizontal() ? o : "top"] = `${s}px`;
            }));
          }
        }
        u.forEach(((e, s) => {
          if ("fraction" === r.type && (e.querySelectorAll(ss(r.currentClass)).forEach((e => {
            e.textContent = r.formatFractionCurrent(i + 1);
          })), e.querySelectorAll(ss(r.totalClass)).forEach((e => {
            e.textContent = r.formatFractionTotal(p);
          }))), "progressbar" === r.type) {
            let n;
            n = r.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical";
            const s = (i + 1) / p;
            let a = 1, o = 1;
            "horizontal" === n ? a = s : o = s, e.querySelectorAll(ss(r.progressbarFillClass)).forEach((e => {
              e.style.transform = `translate3d(0,0,0) scaleX(${a}) scaleY(${o})`, e.style.transitionDuration = `${t.params.speed}ms`;
            }));
          }
          "custom" === r.type && r.renderCustom ? (e.innerHTML = r.renderCustom(t, i + 1, p), 
          0 === s && n("paginationRender", e)) : (0 === s && n("paginationRender", e), n("paginationUpdate", e)), 
          t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](r.lockClass);
        }));
      }
      function p() {
        const e = t.params.pagination;
        if (l()) {
          return;
        }
        const r = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.grid && t.params.grid.rows > 1 ? t.slides.length / Math.ceil(t.params.grid.rows) : t.slides.length;
        let i = t.pagination.el;
        i = En(i);
        let s = "";
        if ("bullets" === e.type) {
          let i = t.params.loop ? Math.ceil(r / t.params.slidesPerGroup) : t.snapGrid.length;
          t.params.freeMode && t.params.freeMode.enabled && i > r && (i = r);
          for (let r = 0; r < i; r += 1) {
            e.renderBullet ? s += e.renderBullet.call(t, r, e.bulletClass) : s += `<${e.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>`;
          }
        }
        "fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`), 
        "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`), 
        t.pagination.bullets = [], i.forEach((r => {
          "custom" !== e.type && (r.innerHTML = s || ""), "bullets" === e.type && t.pagination.bullets.push(...r.querySelectorAll(ss(e.bulletClass)));
        })), "custom" !== e.type && n("paginationRender", i[0]);
      }
      function f() {
        t.params.pagination = is(t, t.originalParams.pagination, t.params.pagination, {
          el: "swiper-pagination"
        });
        const e = t.params.pagination;
        if (!e.el) {
          return;
        }
        let r;
        "string" == typeof e.el && t.isElement && (r = t.el.querySelector(e.el)), r || "string" != typeof e.el || (r = [ ...document.querySelectorAll(e.el) ]), 
        r || (r = e.el), r && 0 !== r.length && (t.params.uniqueNavElements && "string" == typeof e.el && Array.isArray(r) && r.length > 1 && (r = [ ...t.el.querySelectorAll(e.el) ], 
        r.length > 1 && (r = r.filter((e => xn(e, ".swiper")[0] === t.el))[0])), Array.isArray(r) && 1 === r.length && (r = r[0]), 
        Object.assign(t.pagination, {
          el: r
        }), r = En(r), r.forEach((r => {
          "bullets" === e.type && e.clickable && r.classList.add(...(e.clickableClass || "").split(" ")), 
          r.classList.add(e.modifierClass + e.type), r.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass), 
          "bullets" === e.type && e.dynamicBullets && (r.classList.add(`${e.modifierClass}${e.type}-dynamic`), 
          o = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && r.classList.add(e.progressbarOppositeClass), 
          e.clickable && r.addEventListener("click", u), t.enabled || r.classList.add(e.lockClass);
        })));
      }
      function h() {
        const e = t.params.pagination;
        if (l()) {
          return;
        }
        let r = t.pagination.el;
        r && (r = En(r), r.forEach((r => {
          r.classList.remove(e.hiddenClass), r.classList.remove(e.modifierClass + e.type), 
          r.classList.remove(t.isHorizontal() ? e.horizontalClass : e.verticalClass), e.clickable && (r.classList.remove(...(e.clickableClass || "").split(" ")), 
          r.removeEventListener("click", u));
        }))), t.pagination.bullets && t.pagination.bullets.forEach((t => t.classList.remove(...e.bulletActiveClass.split(" "))));
      }
      i("changeDirection", (() => {
        if (!t.pagination || !t.pagination.el) {
          return;
        }
        const e = t.params.pagination;
        let {el: r} = t.pagination;
        r = En(r), r.forEach((r => {
          r.classList.remove(e.horizontalClass, e.verticalClass), r.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass);
        }));
      })), i("init", (() => {
        !1 === t.params.pagination.enabled ? m() : (f(), p(), d());
      })), i("activeIndexChange", (() => {
        void 0 === t.snapIndex && d();
      })), i("snapIndexChange", (() => {
        d();
      })), i("snapGridLengthChange", (() => {
        p(), d();
      })), i("destroy", (() => {
        h();
      })), i("enable disable", (() => {
        let {el: e} = t.pagination;
        e && (e = En(e), e.forEach((e => e.classList[t.enabled ? "remove" : "add"](t.params.pagination.lockClass))));
      })), i("lock unlock", (() => {
        d();
      })), i("click", ((e, r) => {
        const i = r.target, s = En(t.pagination.el);
        if (t.params.pagination.el && t.params.pagination.hideOnClick && s && s.length > 0 && !i.classList.contains(t.params.pagination.bulletClass)) {
          if (t.navigation && (t.navigation.nextEl && i === t.navigation.nextEl || t.navigation.prevEl && i === t.navigation.prevEl)) {
            return;
          }
          const e = s[0].classList.contains(t.params.pagination.hiddenClass);
          n(!0 === e ? "paginationShow" : "paginationHide"), s.forEach((e => e.classList.toggle(t.params.pagination.hiddenClass)));
        }
      }));
      const m = () => {
        t.el.classList.add(t.params.pagination.paginationDisabledClass);
        let {el: e} = t.pagination;
        e && (e = En(e), e.forEach((e => e.classList.add(t.params.pagination.paginationDisabledClass)))), 
        h();
      };
      Object.assign(t.pagination, {
        enable: () => {
          t.el.classList.remove(t.params.pagination.paginationDisabledClass);
          let {el: e} = t.pagination;
          e && (e = En(e), e.forEach((e => e.classList.remove(t.params.pagination.paginationDisabledClass)))), 
          f(), p(), d();
        },
        disable: m,
        render: p,
        update: d,
        init: f,
        destroy: h
      });
    }
    function os(e) {
      let {swiper: t, extendParams: r, on: i, emit: n} = e;
      const s = an();
      let a, o, l, c, u = !1, d = null, p = null;
      function f() {
        if (!t.params.scrollbar.el || !t.scrollbar.el) {
          return;
        }
        const {scrollbar: e, rtlTranslate: r} = t, {dragEl: i, el: n} = e, s = t.params.scrollbar, a = t.params.loop ? t.progressLoop : t.progress;
        let c = o, u = (l - o) * a;
        r ? (u = -u, u > 0 ? (c = o - u, u = 0) : -u + o > l && (c = l + u)) : u < 0 ? (c = o + u, 
        u = 0) : u + o > l && (c = l - u), t.isHorizontal() ? (i.style.transform = `translate3d(${u}px, 0, 0)`, 
        i.style.width = `${c}px`) : (i.style.transform = `translate3d(0px, ${u}px, 0)`, 
        i.style.height = `${c}px`), s.hide && (clearTimeout(d), n.style.opacity = 1, d = setTimeout((() => {
          n.style.opacity = 0, n.style.transitionDuration = "400ms";
        }), 1e3));
      }
      function h() {
        if (!t.params.scrollbar.el || !t.scrollbar.el) {
          return;
        }
        const {scrollbar: e} = t, {dragEl: r, el: i} = e;
        r.style.width = "", r.style.height = "", l = t.isHorizontal() ? i.offsetWidth : i.offsetHeight, 
        c = t.size / (t.virtualSize + t.params.slidesOffsetBefore - (t.params.centeredSlides ? t.snapGrid[0] : 0)), 
        o = "auto" === t.params.scrollbar.dragSize ? l * c : parseInt(t.params.scrollbar.dragSize, 10), 
        t.isHorizontal() ? r.style.width = `${o}px` : r.style.height = `${o}px`, i.style.display = c >= 1 ? "none" : "", 
        t.params.scrollbar.hide && (i.style.opacity = 0), t.params.watchOverflow && t.enabled && e.el.classList[t.isLocked ? "add" : "remove"](t.params.scrollbar.lockClass);
      }
      function m(e) {
        return t.isHorizontal() ? e.clientX : e.clientY;
      }
      function g(e) {
        const {scrollbar: r, rtlTranslate: i} = t, {el: n} = r;
        let s;
        s = (m(e) - function(e) {
          const t = ln(), r = an(), i = e.getBoundingClientRect(), n = r.body, s = e.clientTop || n.clientTop || 0, a = e.clientLeft || n.clientLeft || 0, o = e === t ? t.scrollY : e.scrollTop, l = e === t ? t.scrollX : e.scrollLeft;
          return {
            top: i.top + o - s,
            left: i.left + l - a
          };
        }(n)[t.isHorizontal() ? "left" : "top"] - (null !== a ? a : o / 2)) / (l - o), s = Math.max(Math.min(s, 1), 0), 
        i && (s = 1 - s);
        const c = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * s;
        t.updateProgress(c), t.setTranslate(c), t.updateActiveIndex(), t.updateSlidesClasses();
      }
      function v(e) {
        const r = t.params.scrollbar, {scrollbar: i, wrapperEl: s} = t, {el: o, dragEl: l} = i;
        u = !0, a = e.target === l ? m(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, 
        e.preventDefault(), e.stopPropagation(), s.style.transitionDuration = "100ms", l.style.transitionDuration = "100ms", 
        g(e), clearTimeout(p), o.style.transitionDuration = "0ms", r.hide && (o.style.opacity = 1), 
        t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "none"), n("scrollbarDragStart", e);
      }
      function y(e) {
        const {scrollbar: r, wrapperEl: i} = t, {el: s, dragEl: a} = r;
        u && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, g(e), i.style.transitionDuration = "0ms", 
        s.style.transitionDuration = "0ms", a.style.transitionDuration = "0ms", n("scrollbarDragMove", e));
      }
      function _(e) {
        const r = t.params.scrollbar, {scrollbar: i, wrapperEl: s} = t, {el: a} = i;
        u && (u = !1, t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "", s.style.transitionDuration = ""), 
        r.hide && (clearTimeout(p), p = un((() => {
          a.style.opacity = 0, a.style.transitionDuration = "400ms";
        }), 1e3)), n("scrollbarDragEnd", e), r.snapOnRelease && t.slideToClosest());
      }
      function b(e) {
        const {scrollbar: r, params: i} = t, n = r.el;
        if (!n) {
          return;
        }
        const a = n, o = !!i.passiveListeners && {
          passive: !1,
          capture: !1
        }, l = !!i.passiveListeners && {
          passive: !0,
          capture: !1
        };
        if (!a) {
          return;
        }
        const c = "on" === e ? "addEventListener" : "removeEventListener";
        a[c]("pointerdown", v, o), s[c]("pointermove", y, o), s[c]("pointerup", _, l);
      }
      function w() {
        const {scrollbar: e, el: r} = t;
        t.params.scrollbar = is(t, t.originalParams.scrollbar, t.params.scrollbar, {
          el: "swiper-scrollbar"
        });
        const i = t.params.scrollbar;
        if (!i.el) {
          return;
        }
        let n, a;
        if ("string" == typeof i.el && t.isElement && (n = t.el.querySelector(i.el)), n || "string" != typeof i.el) {
          n || (n = i.el);
        } else if (n = s.querySelectorAll(i.el), !n.length) {
          return;
        }
        t.params.uniqueNavElements && "string" == typeof i.el && n.length > 1 && 1 === r.querySelectorAll(i.el).length && (n = r.querySelector(i.el)), 
        n.length > 0 && (n = n[0]), n.classList.add(t.isHorizontal() ? i.horizontalClass : i.verticalClass), 
        n && (a = n.querySelector(ss(t.params.scrollbar.dragClass)), a || (a = bn("div", t.params.scrollbar.dragClass), 
        n.append(a))), Object.assign(e, {
          el: n,
          dragEl: a
        }), i.draggable && t.params.scrollbar.el && t.scrollbar.el && b("on"), n && n.classList[t.enabled ? "remove" : "add"](...cn(t.params.scrollbar.lockClass));
      }
      function T() {
        const e = t.params.scrollbar, r = t.scrollbar.el;
        r && r.classList.remove(...cn(t.isHorizontal() ? e.horizontalClass : e.verticalClass)), 
        t.params.scrollbar.el && t.scrollbar.el && b("off");
      }
      r({
        scrollbar: {
          el: null,
          dragSize: "auto",
          hide: !1,
          draggable: !1,
          snapOnRelease: !0,
          lockClass: "swiper-scrollbar-lock",
          dragClass: "swiper-scrollbar-drag",
          scrollbarDisabledClass: "swiper-scrollbar-disabled",
          horizontalClass: "swiper-scrollbar-horizontal",
          verticalClass: "swiper-scrollbar-vertical"
        }
      }), t.scrollbar = {
        el: null,
        dragEl: null
      }, i("changeDirection", (() => {
        if (!t.scrollbar || !t.scrollbar.el) {
          return;
        }
        const e = t.params.scrollbar;
        let {el: r} = t.scrollbar;
        r = En(r), r.forEach((r => {
          r.classList.remove(e.horizontalClass, e.verticalClass), r.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass);
        }));
      })), i("init", (() => {
        !1 === t.params.scrollbar.enabled ? x() : (w(), h(), f());
      })), i("update resize observerUpdate lock unlock changeDirection", (() => {
        h();
      })), i("setTranslate", (() => {
        f();
      })), i("setTransition", ((e, r) => {
        !function(e) {
          t.params.scrollbar.el && t.scrollbar.el && (t.scrollbar.dragEl.style.transitionDuration = `${e}ms`);
        }(r);
      })), i("enable disable", (() => {
        const {el: e} = t.scrollbar;
        e && e.classList[t.enabled ? "remove" : "add"](...cn(t.params.scrollbar.lockClass));
      })), i("destroy", (() => {
        T();
      }));
      const x = () => {
        t.el.classList.add(...cn(t.params.scrollbar.scrollbarDisabledClass)), t.scrollbar.el && t.scrollbar.el.classList.add(...cn(t.params.scrollbar.scrollbarDisabledClass)), 
        T();
      };
      Object.assign(t.scrollbar, {
        enable: () => {
          t.el.classList.remove(...cn(t.params.scrollbar.scrollbarDisabledClass)), t.scrollbar.el && t.scrollbar.el.classList.remove(...cn(t.params.scrollbar.scrollbarDisabledClass)), 
          w(), h(), f();
        },
        disable: x,
        updateSize: h,
        setTranslate: f,
        init: w,
        destroy: T
      });
    }
    function ls(e) {
      let t, r, {swiper: i, extendParams: n, on: s, emit: a, params: o} = e;
      i.autoplay = {
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
      let l, c, u, d, p, f, h, m, g = o && o.autoplay ? o.autoplay.delay : 3e3, v = o && o.autoplay ? o.autoplay.delay : 3e3, y = (new Date).getTime();
      function _(e) {
        i && !i.destroyed && i.wrapperEl && e.target === i.wrapperEl && (i.wrapperEl.removeEventListener("transitionend", _), 
        m || E());
      }
      const b = () => {
        if (i.destroyed || !i.autoplay.running) {
          return;
        }
        i.autoplay.paused ? c = !0 : c && (v = l, c = !1);
        const e = i.autoplay.paused ? l : y + v - (new Date).getTime();
        i.autoplay.timeLeft = e, a("autoplayTimeLeft", e, e / g), r = requestAnimationFrame((() => {
          b();
        }));
      }, w = e => {
        if (i.destroyed || !i.autoplay.running) {
          return;
        }
        cancelAnimationFrame(r), b();
        let n = void 0 === e ? i.params.autoplay.delay : e;
        g = i.params.autoplay.delay, v = i.params.autoplay.delay;
        const s = (() => {
          let e;
          if (e = i.virtual && i.params.virtual.enabled ? i.slides.filter((e => e.classList.contains("swiper-slide-active")))[0] : i.slides[i.activeIndex], 
          !e) {
            return;
          }
          return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
        })();
        !Number.isNaN(s) && s > 0 && void 0 === e && (n = s, g = s, v = s), l = n;
        const o = i.params.speed, c = () => {
          i && !i.destroyed && (i.params.autoplay.reverseDirection ? !i.isBeginning || i.params.loop || i.params.rewind ? (i.slidePrev(o, !0, !0), 
          a("autoplay")) : i.params.autoplay.stopOnLastSlide || (i.slideTo(i.slides.length - 1, o, !0, !0), 
          a("autoplay")) : !i.isEnd || i.params.loop || i.params.rewind ? (i.slideNext(o, !0, !0), 
          a("autoplay")) : i.params.autoplay.stopOnLastSlide || (i.slideTo(0, o, !0, !0), 
          a("autoplay")), i.params.cssMode && (y = (new Date).getTime(), requestAnimationFrame((() => {
            w();
          }))));
        };
        return n > 0 ? (clearTimeout(t), t = setTimeout((() => {
          c();
        }), n)) : requestAnimationFrame((() => {
          c();
        })), n;
      }, T = () => {
        y = (new Date).getTime(), i.autoplay.running = !0, w(), a("autoplayStart");
      }, x = () => {
        i.autoplay.running = !1, clearTimeout(t), cancelAnimationFrame(r), a("autoplayStop");
      }, S = (e, r) => {
        if (i.destroyed || !i.autoplay.running) {
          return;
        }
        clearTimeout(t), e || (h = !0);
        const n = () => {
          a("autoplayPause"), i.params.autoplay.waitForTransition ? i.wrapperEl.addEventListener("transitionend", _) : E();
        };
        if (i.autoplay.paused = !0, r) {
          return f && (l = i.params.autoplay.delay), f = !1, void n();
        }
        const s = l || i.params.autoplay.delay;
        l = s - ((new Date).getTime() - y), i.isEnd && l < 0 && !i.params.loop || (l < 0 && (l = 0), 
        n());
      }, E = () => {
        i.isEnd && l < 0 && !i.params.loop || i.destroyed || !i.autoplay.running || (y = (new Date).getTime(), 
        h ? (h = !1, w(l)) : w(), i.autoplay.paused = !1, a("autoplayResume"));
      }, C = () => {
        if (i.destroyed || !i.autoplay.running) {
          return;
        }
        const e = an();
        "hidden" === e.visibilityState && (h = !0, S(!0)), "visible" === e.visibilityState && E();
      }, M = e => {
        "mouse" === e.pointerType && (h = !0, m = !0, i.animating || i.autoplay.paused || S(!0));
      }, A = e => {
        "mouse" === e.pointerType && (m = !1, i.autoplay.paused && E());
      };
      s("init", (() => {
        i.params.autoplay.enabled && (i.params.autoplay.pauseOnMouseEnter && (i.el.addEventListener("pointerenter", M), 
        i.el.addEventListener("pointerleave", A)), an().addEventListener("visibilitychange", C), 
        T());
      })), s("destroy", (() => {
        i.el.removeEventListener("pointerenter", M), i.el.removeEventListener("pointerleave", A), 
        an().removeEventListener("visibilitychange", C), i.autoplay.running && x();
      })), s("_freeModeStaticRelease", (() => {
        (d || h) && E();
      })), s("_freeModeNoMomentumRelease", (() => {
        i.params.autoplay.disableOnInteraction ? x() : S(!0, !0);
      })), s("beforeTransitionStart", ((e, t, r) => {
        !i.destroyed && i.autoplay.running && (r || !i.params.autoplay.disableOnInteraction ? S(!0, !0) : x());
      })), s("sliderFirstMove", (() => {
        !i.destroyed && i.autoplay.running && (i.params.autoplay.disableOnInteraction ? x() : (u = !0, 
        d = !1, h = !1, p = setTimeout((() => {
          h = !0, d = !0, S(!0);
        }), 200)));
      })), s("touchEnd", (() => {
        if (!i.destroyed && i.autoplay.running && u) {
          if (clearTimeout(p), clearTimeout(t), i.params.autoplay.disableOnInteraction) {
            return d = !1, void (u = !1);
          }
          d && i.params.cssMode && E(), d = !1, u = !1;
        }
      })), s("slideChange", (() => {
        !i.destroyed && i.autoplay.running && (f = !0);
      })), Object.assign(i.autoplay, {
        start: T,
        stop: x,
        pause: S,
        resume: E
      });
    }
    function cs(e, t) {
      const r = vn(t);
      return r !== t && (r.style.backfaceVisibility = "hidden", r.style["-webkit-backface-visibility"] = "hidden"), 
      r;
    }
    function us(e) {
      let {swiper: t, duration: r, transformElements: i, allSlides: n} = e;
      const {activeIndex: s} = t;
      if (t.params.virtualTranslate && 0 !== r) {
        let e, r = !1;
        e = n ? i : i.filter((e => {
          const r = e.classList.contains("swiper-slide-transform") ? (e => {
            if (!e.parentElement) {
              return t.slides.filter((t => t.shadowRoot && t.shadowRoot === e.parentNode))[0];
            }
            return e.parentElement;
          })(e) : e;
          return t.getSlideIndex(r) === s;
        })), e.forEach((e => {
          !function(e, t) {
            t && e.addEventListener("transitionend", (function r(i) {
              i.target === e && (t.call(e, i), e.removeEventListener("transitionend", r));
            }));
          }(e, (() => {
            if (r) {
              return;
            }
            if (!t || t.destroyed) {
              return;
            }
            r = !0, t.animating = !1;
            const e = new window.CustomEvent("transitionend", {
              bubbles: !0,
              cancelable: !0
            });
            t.wrapperEl.dispatchEvent(e);
          }));
        }));
      }
    }
    let ds;
    Object.keys(es).forEach((e => {
      Object.keys(es[e]).forEach((t => {
        rs.prototype[t] = es[e][t];
      }));
    })), rs.use([ function(e) {
      let {swiper: t, on: r, emit: i} = e;
      const n = ln();
      let s = null, a = null;
      const o = () => {
        t && !t.destroyed && t.initialized && (i("beforeResize"), i("resize"));
      }, l = () => {
        t && !t.destroyed && t.initialized && i("orientationchange");
      };
      r("init", (() => {
        t.params.resizeObserver && void 0 !== n.ResizeObserver ? t && !t.destroyed && t.initialized && (s = new ResizeObserver((e => {
          a = n.requestAnimationFrame((() => {
            const {width: r, height: i} = t;
            let n = r, s = i;
            e.forEach((e => {
              let {contentBoxSize: r, contentRect: i, target: a} = e;
              a && a !== t.el || (n = i ? i.width : (r[0] || r).inlineSize, s = i ? i.height : (r[0] || r).blockSize);
            })), n === r && s === i || o();
          }));
        })), s.observe(t.el)) : (n.addEventListener("resize", o), n.addEventListener("orientationchange", l));
      })), r("destroy", (() => {
        a && n.cancelAnimationFrame(a), s && s.unobserve && t.el && (s.unobserve(t.el), 
        s = null), n.removeEventListener("resize", o), n.removeEventListener("orientationchange", l);
      }));
    }, function(e) {
      let {swiper: t, extendParams: r, on: i, emit: n} = e;
      const s = [], a = ln(), o = function(e, r) {
        void 0 === r && (r = {});
        const i = new (a.MutationObserver || a.WebkitMutationObserver)((e => {
          if (t.__preventObserver__) {
            return;
          }
          if (1 === e.length) {
            return void n("observerUpdate", e[0]);
          }
          const r = function() {
            n("observerUpdate", e[0]);
          };
          a.requestAnimationFrame ? a.requestAnimationFrame(r) : a.setTimeout(r, 0);
        }));
        i.observe(e, {
          attributes: void 0 === r.attributes || r.attributes,
          childList: void 0 === r.childList || r.childList,
          characterData: void 0 === r.characterData || r.characterData
        }), s.push(i);
      };
      r({
        observer: !1,
        observeParents: !1,
        observeSlideChildren: !1
      }), i("init", (() => {
        if (t.params.observer) {
          if (t.params.observeParents) {
            const e = xn(t.hostEl);
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
      })), i("destroy", (() => {
        s.forEach((e => {
          e.disconnect();
        })), s.splice(0, s.length);
      }));
    } ]);
    const ps = new rs(".promo__swiper", {
      enabled: !1,
      init: !1,
      modules: [ as, ls, function(e) {
        let {swiper: t, extendParams: r, on: i} = e;
        r({
          fadeEffect: {
            crossFade: !1
          }
        }), function(e) {
          const {effect: t, swiper: r, on: i, setTranslate: n, setTransition: s, overwriteParams: a, perspective: o, recreateShadows: l, getEffectParams: c} = e;
          let u;
          i("beforeInit", (() => {
            if (r.params.effect !== t) {
              return;
            }
            r.classNames.push(`${r.params.containerModifierClass}${t}`), o && o() && r.classNames.push(`${r.params.containerModifierClass}3d`);
            const e = a ? a() : {};
            Object.assign(r.params, e), Object.assign(r.originalParams, e);
          })), i("setTranslate", (() => {
            r.params.effect === t && n();
          })), i("setTransition", ((e, i) => {
            r.params.effect === t && s(i);
          })), i("transitionEnd", (() => {
            if (r.params.effect === t && l) {
              if (!c || !c().slideShadows) {
                return;
              }
              r.slides.forEach((e => {
                e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e => e.remove()));
              })), l();
            }
          })), i("virtualUpdate", (() => {
            r.params.effect === t && (r.slides.length || (u = !0), requestAnimationFrame((() => {
              u && r.slides && r.slides.length && (n(), u = !1);
            })));
          }));
        }({
          effect: "fade",
          swiper: t,
          on: i,
          setTranslate: () => {
            const {slides: e} = t;
            t.params.fadeEffect;
            for (let r = 0; r < e.length; r += 1) {
              const e = t.slides[r];
              let i = -e.swiperSlideOffset;
              t.params.virtualTranslate || (i -= t.translate);
              let n = 0;
              t.isHorizontal() || (n = i, i = 0);
              const s = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(e.progress), 0) : 1 + Math.min(Math.max(e.progress, -1), 0), a = cs(0, e);
              a.style.opacity = s, a.style.transform = `translate3d(${i}px, ${n}px, 0px)`;
            }
          },
          setTransition: e => {
            const r = t.slides.map((e => vn(e)));
            r.forEach((t => {
              t.style.transitionDuration = `${e}ms`;
            })), us({
              swiper: t,
              duration: e,
              transformElements: r,
              allSlides: !0
            });
          },
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !t.params.cssMode
          })
        });
      } ],
      autoplay: {
        delay: 3e3
      },
      effect: "fade",
      fadeEffect: {
        crossFade: !0
      },
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
          ds = t.map(((r, i) => Hi.timeline({
            paused: !0
          }).set(t[i], {
            width: "1rem",
            marginRight: 0
          }).to(t[i], {
            marginRight: "4.6rem",
            duration: .01
          }).add("clear", "<").set(e.pagination.el, {
            autoAlpha: 1
          }).to(t[i], {
            width: "5.6rem",
            marginRight: 0,
            duration: 3
          }).add("ready", "<"))), requestAnimationFrame((() => {
            ds[e.realIndex].play();
          }));
        })(e),
        realIndexChange: e => (e => {
          ds.forEach((e => {
            e.pause("clear");
          })), ds[e.realIndex].pause("ready");
        })(e),
        slideChangeTransitionEnd: e => (e => {
          ds[e.realIndex].play("ready");
        })(e)
      }
    }), fs = window.innerWidth, hs = e => {
      if (fs < 769) {
        return;
      }
      const t = e.slides[e.realIndex];
      t && Hi.timeline().to(t, {
        width: "43.4%",
        duration: .5
      }).to(t.querySelector(".dubrovka-slide__figure"), {
        height: "100%",
        duration: .5
      }, "<").to(t.querySelector(".dubrovka-slide__text"), {
        autoAlpha: 1,
        duration: .1
      });
    }, ms = e => {
      if (fs < 769) {
        return;
      }
      const t = e.slides[e.previousIndex], r = e.slides.filter((e => e.classList.contains("swiper-slide-active")))[0];
      r && t && Hi.timeline().fromTo(t.querySelector(".dubrovka-slide__text"), {
        autoAlpha: 1
      }, {
        autoAlpha: 0,
        duration: .01
      }).to(r, {
        width: "43.4%",
        duration: 1
      }, "<").to(r.querySelector(".dubrovka-slide__figure"), {
        height: "100%",
        duration: 1
      }, "<").fromTo(t, {
        width: "43.4%"
      }, {
        width: "35.4%",
        duration: 1
      }, "<").fromTo(t.querySelector(".dubrovka-slide__figure"), {
        height: "100%"
      }, {
        height: "64%",
        duration: 1
      }, "<").to(r.querySelector(".dubrovka-slide__text"), {
        autoAlpha: 1,
        duration: .1
      });
    }, gs = () => {
      Array.from(ji.querySelectorAll(".js-tabs-slider")).map(((e, t) => new rs(e, {
        modules: [ ns, os ],
        speed: 500,
        slidesPerView: "auto",
        loop: !0,
        spaceBetween: 5,
        allowTouchMove: !1,
        scrollbar: {
          el: ".tabs-slider__scrollbar",
          draggable: !0
        },
        on: {
          afterInit: hs,
          slideChangeTransitionStart: ms
        },
        breakpoints: {
          320: {
            allowTouchMove: !0,
            slidesPerView: "auto"
          },
          769: {
            allowTouchMove: !1,
            slidesPerView: "auto"
          }
        }
      }))).forEach(((e, t) => {
        fs < 769 || ((e, t) => {
          const r = ji.querySelector(`.tabs-block__btn--next-${t}`), i = ji.querySelector(`.tabs-block__btn--prev-${t}`);
          r.addEventListener("click", (() => e.slideNext(1e3))), i.addEventListener("click", (() => e.slidePrev(1e3)));
        })(e, t);
      }));
    }, vs = new rs(".circle__slider", {
      enabled: !1,
      modules: [ ns, as, os ],
      loop: !0,
      speed: 1e3,
      centeredSlides: !0,
      slidesPerView: "auto",
      cssMode: !0,
      navigation: {
        nextEl: ".circle-control__block--right",
        prevEl: ".circle-control__block--left"
      },
      scrollbar: {
        el: ".circle-slider__scrollbar",
        draggable: !0
      }
    }), ys = e => {
      if (fs < 769) {
        return;
      }
      e.forEach((e => {
        e.classList.add("aesthetics-tab__slide--cover");
      }));
      const t = e.filter((e => e.classList.contains("swiper-slide-prev")))[0], r = e.filter((e => e.classList.contains("swiper-slide-active")))[0];
      t && r && (t.classList.remove("aesthetics-tab__slide--cover"), r.classList.remove("aesthetics-tab__slide--cover"));
    }, _s = e => {
      if (fs < 769) {
        return;
      }
      const t = e.slides[e.realIndex];
      t && (Hi.timeline().to(t, {
        width: "43.4%",
        duration: .1
      }), ys(e.slides));
    }, bs = e => {
      if (fs < 769) {
        return;
      }
      const t = e.slides[e.previousIndex];
      e.slides.forEach((e => {
        Hi.to(e.querySelector(".aesthetics-tab__list"), {
          autoAlpha: 0
        });
      }));
      const r = e.slides.filter((e => e.classList.contains("swiper-slide-active")))[0];
      r && t && (Hi.timeline().to(r, {
        width: "42.5%",
        duration: 1
      }).fromTo(t, {
        width: "42.5%"
      }, {
        width: "27%",
        duration: 1
      }, "<"), ys(e.slides));
    }, ws = e => {
      if (fs < 769) {
        return;
      }
      const t = e.slides.filter((e => e.classList.contains("swiper-slide-prev")))[0];
      Hi.to(t.querySelector(".aesthetics-tab__list"), {
        autoAlpha: 1,
        duration: 1
      });
    }, Ts = ji.querySelector(".page-main"), xs = e => {
      e.preventDefault(), Ts.scrollIntoView({
        behavior: "smooth"
      });
    };
    let Ss = Hi.timeline({
      paused: !0
    });
    function Es(e, t) {
      for (var r = 0; r < t.length; r++) {
        var i = t[r];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
        Object.defineProperty(e, i.key, i);
      }
    }
    requestAnimationFrame((() => {
      const e = ji.querySelector(".promo-slide--0");
      if (!e) {
        return;
      }
      const t = Array.from(e.querySelectorAll(".promo-title--0 .promo-title__text")), r = e.querySelector(".promo-slide__block"), i = e.querySelector(".promo-slide__label");
      Ss.fromTo(t, {
        backgroundPositionY: "200%"
      }, {
        backgroundPositionY: "100%",
        duration: 2
      }).fromTo(r, {
        autoAlpha: 0,
        y: "50%"
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 1
      }, "<").fromTo(i, {
        scale: 0
      }, {
        scale: 1,
        duration: 1
      }, "<50%");
    }));
    /*!
 * Observer 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
    var Cs, Ms, As, ks, Ps, Ls, Os, Ds, Is, zs, qs, Rs, Fs, Bs = function() {
      return Cs || "undefined" != typeof window && (Cs = window.gsap) && Cs.registerPlugin && Cs;
    }, Ns = 1, Gs = [], Vs = [], $s = [], Ys = Date.now, Hs = function(e, t) {
      return t;
    }, Xs = function(e, t) {
      return ~$s.indexOf(e) && $s[$s.indexOf(e) + 1][t];
    }, js = function(e) {
      return !!~zs.indexOf(e);
    }, Ws = function(e, t, r, i, n) {
      return e.addEventListener(t, r, {
        passive: !1 !== i,
        capture: !!n
      });
    }, Us = function(e, t, r, i) {
      return e.removeEventListener(t, r, !!i);
    }, Ks = "scrollLeft", Qs = "scrollTop", Zs = function() {
      return qs && qs.isPressed || Vs.cache++;
    }, Js = function(e, t) {
      var r = function r(i) {
        if (i || 0 === i) {
          Ns && (As.history.scrollRestoration = "manual");
          var n = qs && qs.isPressed;
          i = r.v = Math.round(i) || (qs && qs.iOS ? 1 : 0), e(i), r.cacheID = Vs.cache, n && Hs("ss", i);
        } else {
          (t || Vs.cache !== r.cacheID || Hs("ref")) && (r.cacheID = Vs.cache, r.v = e());
        }
        return r.v + r.offset;
      };
      return r.offset = 0, e && r;
    }, ea = {
      s: Ks,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: Js((function(e) {
        return arguments.length ? As.scrollTo(e, ta.sc()) : As.pageXOffset || ks[Ks] || Ps[Ks] || Ls[Ks] || 0;
      }))
    }, ta = {
      s: Qs,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: ea,
      sc: Js((function(e) {
        return arguments.length ? As.scrollTo(ea.sc(), e) : As.pageYOffset || ks[Qs] || Ps[Qs] || Ls[Qs] || 0;
      }))
    }, ra = function(e, t) {
      return (t && t._ctx && t._ctx.selector || Cs.utils.toArray)(e)[0] || ("string" == typeof e && !1 !== Cs.config().nullTargetWarn ? console.warn("Element not found:", e) : null);
    }, ia = function(e, t) {
      var r = t.s, i = t.sc;
      js(e) && (e = ks.scrollingElement || Ps);
      var n = Vs.indexOf(e), s = i === ta.sc ? 1 : 2;
      !~n && (n = Vs.push(e) - 1), Vs[n + s] || Ws(e, "scroll", Zs);
      var a = Vs[n + s], o = a || (Vs[n + s] = Js(Xs(e, r), !0) || (js(e) ? i : Js((function(t) {
        return arguments.length ? e[r] = t : e[r];
      }))));
      return o.target = e, a || (o.smooth = "smooth" === Cs.getProperty(e, "scrollBehavior")), 
      o;
    }, na = function(e, t, r) {
      var i = e, n = e, s = Ys(), a = s, o = t || 50, l = Math.max(500, 3 * o), c = function(e, t) {
        var l = Ys();
        t || l - s > o ? (n = i, i = e, a = s, s = l) : r ? i += e : i = n + (e - n) / (l - a) * (s - a);
      };
      return {
        update: c,
        reset: function() {
          n = i = r ? 0 : i, a = s = 0;
        },
        getVelocity: function(e) {
          var t = a, o = n, u = Ys();
          return (e || 0 === e) && e !== i && c(e), s === a || u - a > l ? 0 : (i + (r ? o : -o)) / ((r ? u : s) - t) * 1e3;
        }
      };
    }, sa = function(e, t) {
      return t && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
    }, aa = function(e) {
      var t = Math.max.apply(Math, e), r = Math.min.apply(Math, e);
      return Math.abs(t) >= Math.abs(r) ? t : r;
    }, oa = function() {
      var e, t, r, i;
      (Is = Cs.core.globals().ScrollTrigger) && Is.core && (e = Is.core, t = e.bridge || {}, 
      r = e._scrollers, i = e._proxies, r.push.apply(r, Vs), i.push.apply(i, $s), Vs = r, 
      $s = i, Hs = function(e, r) {
        return t[e](r);
      });
    }, la = function(e) {
      return Cs = e || Bs(), !Ms && Cs && "undefined" != typeof document && document.body && (As = window, 
      ks = document, Ps = ks.documentElement, Ls = ks.body, zs = [ As, ks, Ps, Ls ], Cs.utils.clamp, 
      Fs = Cs.core.context || function() {}, Ds = "onpointerenter" in Ls ? "pointer" : "mouse", 
      Os = ca.isTouch = As.matchMedia && As.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in As || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, 
      Rs = ca.eventTypes = ("ontouchstart" in Ps ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Ps ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), 
      setTimeout((function() {
        return Ns = 0;
      }), 500), oa(), Ms = 1), Ms;
    };
    ea.op = ta, Vs.cache = 0;
    var ca = function() {
      function e(e) {
        this.init(e);
      }
      var t, r, i;
      return e.prototype.init = function(e) {
        Ms || la(Cs) || console.warn("Please gsap.registerPlugin(Observer)"), Is || oa();
        var t = e.tolerance, r = e.dragMinimum, i = e.type, n = e.target, s = e.lineHeight, a = e.debounce, o = e.preventDefault, l = e.onStop, c = e.onStopDelay, u = e.ignore, d = e.wheelSpeed, p = e.event, f = e.onDragStart, h = e.onDragEnd, m = e.onDrag, g = e.onPress, v = e.onRelease, y = e.onRight, _ = e.onLeft, b = e.onUp, w = e.onDown, T = e.onChangeX, x = e.onChangeY, S = e.onChange, E = e.onToggleX, C = e.onToggleY, M = e.onHover, A = e.onHoverEnd, k = e.onMove, P = e.ignoreCheck, L = e.isNormalizer, O = e.onGestureStart, D = e.onGestureEnd, I = e.onWheel, z = e.onEnable, q = e.onDisable, R = e.onClick, F = e.scrollSpeed, B = e.capture, N = e.allowClicks, G = e.lockAxis, V = e.onLockAxis;
        this.target = n = ra(n) || Ps, this.vars = e, u && (u = Cs.utils.toArray(u)), t = t || 1e-9, 
        r = r || 0, d = d || 1, F = F || 1, i = i || "wheel,touch,pointer", a = !1 !== a, 
        s || (s = parseFloat(As.getComputedStyle(Ls).lineHeight) || 22);
        var $, Y, H, X, j, W, U, K = this, Q = 0, Z = 0, J = e.passive || !o, ee = ia(n, ea), te = ia(n, ta), re = ee(), ie = te(), ne = ~i.indexOf("touch") && !~i.indexOf("pointer") && "pointerdown" === Rs[0], se = js(n), ae = n.ownerDocument || ks, oe = [ 0, 0, 0 ], le = [ 0, 0, 0 ], ce = 0, ue = function() {
          return ce = Ys();
        }, de = function(e, t) {
          return (K.event = e) && u && ~u.indexOf(e.target) || t && ne && "touch" !== e.pointerType || P && P(e, t);
        }, pe = function() {
          var e = K.deltaX = aa(oe), r = K.deltaY = aa(le), i = Math.abs(e) >= t, n = Math.abs(r) >= t;
          S && (i || n) && S(K, e, r, oe, le), i && (y && K.deltaX > 0 && y(K), _ && K.deltaX < 0 && _(K), 
          T && T(K), E && K.deltaX < 0 != Q < 0 && E(K), Q = K.deltaX, oe[0] = oe[1] = oe[2] = 0), 
          n && (w && K.deltaY > 0 && w(K), b && K.deltaY < 0 && b(K), x && x(K), C && K.deltaY < 0 != Z < 0 && C(K), 
          Z = K.deltaY, le[0] = le[1] = le[2] = 0), (X || H) && (k && k(K), H && (m(K), H = !1), 
          X = !1), W && !(W = !1) && V && V(K), j && (I(K), j = !1), $ = 0;
        }, fe = function(e, t, r) {
          oe[r] += e, le[r] += t, K._vx.update(e), K._vy.update(t), a ? $ || ($ = requestAnimationFrame(pe)) : pe();
        }, he = function(e, t) {
          G && !U && (K.axis = U = Math.abs(e) > Math.abs(t) ? "x" : "y", W = !0), "y" !== U && (oe[2] += e, 
          K._vx.update(e, !0)), "x" !== U && (le[2] += t, K._vy.update(t, !0)), a ? $ || ($ = requestAnimationFrame(pe)) : pe();
        }, me = function(e) {
          if (!de(e, 1)) {
            var t = (e = sa(e, o)).clientX, i = e.clientY, n = t - K.x, s = i - K.y, a = K.isDragging;
            K.x = t, K.y = i, (a || Math.abs(K.startX - t) >= r || Math.abs(K.startY - i) >= r) && (m && (H = !0), 
            a || (K.isDragging = !0), he(n, s), a || f && f(K));
          }
        }, ge = K.onPress = function(e) {
          de(e, 1) || e && e.button || (K.axis = U = null, Y.pause(), K.isPressed = !0, e = sa(e), 
          Q = Z = 0, K.startX = K.x = e.clientX, K.startY = K.y = e.clientY, K._vx.reset(), 
          K._vy.reset(), Ws(L ? n : ae, Rs[1], me, J, !0), K.deltaX = K.deltaY = 0, g && g(K));
        }, ve = K.onRelease = function(e) {
          if (!de(e, 1)) {
            Us(L ? n : ae, Rs[1], me, !0);
            var t = !isNaN(K.y - K.startY), r = K.isDragging, i = r && (Math.abs(K.x - K.startX) > 3 || Math.abs(K.y - K.startY) > 3), s = sa(e);
            !i && t && (K._vx.reset(), K._vy.reset(), o && N && Cs.delayedCall(.08, (function() {
              if (Ys() - ce > 300 && !e.defaultPrevented) {
                if (e.target.click) {
                  e.target.click();
                } else if (ae.createEvent) {
                  var t = ae.createEvent("MouseEvents");
                  t.initMouseEvent("click", !0, !0, As, 1, s.screenX, s.screenY, s.clientX, s.clientY, !1, !1, !1, !1, 0, null), 
                  e.target.dispatchEvent(t);
                }
              }
            }))), K.isDragging = K.isGesturing = K.isPressed = !1, l && r && !L && Y.restart(!0), 
            h && r && h(K), v && v(K, i);
          }
        }, ye = function(e) {
          return e.touches && e.touches.length > 1 && (K.isGesturing = !0) && O(e, K.isDragging);
        }, _e = function() {
          return (K.isGesturing = !1) || D(K);
        }, be = function(e) {
          if (!de(e)) {
            var t = ee(), r = te();
            fe((t - re) * F, (r - ie) * F, 1), re = t, ie = r, l && Y.restart(!0);
          }
        }, we = function(e) {
          if (!de(e)) {
            e = sa(e, o), I && (j = !0);
            var t = (1 === e.deltaMode ? s : 2 === e.deltaMode ? As.innerHeight : 1) * d;
            fe(e.deltaX * t, e.deltaY * t, 0), l && !L && Y.restart(!0);
          }
        }, Te = function(e) {
          if (!de(e)) {
            var t = e.clientX, r = e.clientY, i = t - K.x, n = r - K.y;
            K.x = t, K.y = r, X = !0, l && Y.restart(!0), (i || n) && he(i, n);
          }
        }, xe = function(e) {
          K.event = e, M(K);
        }, Se = function(e) {
          K.event = e, A(K);
        }, Ee = function(e) {
          return de(e) || sa(e, o) && R(K);
        };
        Y = K._dc = Cs.delayedCall(c || .25, (function() {
          K._vx.reset(), K._vy.reset(), Y.pause(), l && l(K);
        })).pause(), K.deltaX = K.deltaY = 0, K._vx = na(0, 50, !0), K._vy = na(0, 50, !0), 
        K.scrollX = ee, K.scrollY = te, K.isDragging = K.isGesturing = K.isPressed = !1, 
        Fs(this), K.enable = function(e) {
          return K.isEnabled || (Ws(se ? ae : n, "scroll", Zs), i.indexOf("scroll") >= 0 && Ws(se ? ae : n, "scroll", be, J, B), 
          i.indexOf("wheel") >= 0 && Ws(n, "wheel", we, J, B), (i.indexOf("touch") >= 0 && Os || i.indexOf("pointer") >= 0) && (Ws(n, Rs[0], ge, J, B), 
          Ws(ae, Rs[2], ve), Ws(ae, Rs[3], ve), N && Ws(n, "click", ue, !0, !0), R && Ws(n, "click", Ee), 
          O && Ws(ae, "gesturestart", ye), D && Ws(ae, "gestureend", _e), M && Ws(n, Ds + "enter", xe), 
          A && Ws(n, Ds + "leave", Se), k && Ws(n, Ds + "move", Te)), K.isEnabled = !0, e && e.type && ge(e), 
          z && z(K)), K;
        }, K.disable = function() {
          K.isEnabled && (Gs.filter((function(e) {
            return e !== K && js(e.target);
          })).length || Us(se ? ae : n, "scroll", Zs), K.isPressed && (K._vx.reset(), K._vy.reset(), 
          Us(L ? n : ae, Rs[1], me, !0)), Us(se ? ae : n, "scroll", be, B), Us(n, "wheel", we, B), 
          Us(n, Rs[0], ge, B), Us(ae, Rs[2], ve), Us(ae, Rs[3], ve), Us(n, "click", ue, !0), 
          Us(n, "click", Ee), Us(ae, "gesturestart", ye), Us(ae, "gestureend", _e), Us(n, Ds + "enter", xe), 
          Us(n, Ds + "leave", Se), Us(n, Ds + "move", Te), K.isEnabled = K.isPressed = K.isDragging = !1, 
          q && q(K));
        }, K.kill = K.revert = function() {
          K.disable();
          var e = Gs.indexOf(K);
          e >= 0 && Gs.splice(e, 1), qs === K && (qs = 0);
        }, Gs.push(K), L && js(n) && (qs = K), K.enable(p);
      }, t = e, (r = [ {
        key: "velocityX",
        get: function() {
          return this._vx.getVelocity();
        }
      }, {
        key: "velocityY",
        get: function() {
          return this._vy.getVelocity();
        }
      } ]) && Es(t.prototype, r), i && Es(t, i), e;
    }();
    ca.version = "3.12.5", ca.create = function(e) {
      return new ca(e);
    }, ca.register = la, ca.getAll = function() {
      return Gs.slice();
    }, ca.getById = function(e) {
      return Gs.filter((function(t) {
        return t.vars.id === e;
      }))[0];
    }, Bs() && Cs.registerPlugin(ca);
    /*!
 * ScrollTrigger 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
    var ua, da, pa, fa, ha, ma, ga, va, ya, _a, ba, wa, Ta, xa, Sa, Ea, Ca, Ma, Aa, ka, Pa, La, Oa, Da, Ia, za, qa, Ra, Fa, Ba, Na, Ga, Va, $a, Ya, Ha, Xa, ja, Wa = 1, Ua = Date.now, Ka = Ua(), Qa = 0, Za = 0, Ja = function(e, t, r) {
      var i = ho(e) && ("clamp(" === e.substr(0, 6) || e.indexOf("max") > -1);
      return r["_" + t + "Clamp"] = i, i ? e.substr(6, e.length - 7) : e;
    }, eo = function(e, t) {
      return !t || ho(e) && "clamp(" === e.substr(0, 6) ? e : "clamp(" + e + ")";
    }, to = function e() {
      return Za && requestAnimationFrame(e);
    }, ro = function() {
      return xa = 1;
    }, io = function() {
      return xa = 0;
    }, no = function(e) {
      return e;
    }, so = function(e) {
      return Math.round(1e5 * e) / 1e5 || 0;
    }, ao = function() {
      return "undefined" != typeof window;
    }, oo = function() {
      return ua || ao() && (ua = window.gsap) && ua.registerPlugin && ua;
    }, lo = function(e) {
      return !!~ga.indexOf(e);
    }, co = function(e) {
      return ("Height" === e ? Na : pa["inner" + e]) || ha["client" + e] || ma["client" + e];
    }, uo = function(e) {
      return Xs(e, "getBoundingClientRect") || (lo(e) ? function() {
        return Sl.width = pa.innerWidth, Sl.height = Na, Sl;
      } : function() {
        return Ro(e);
      });
    }, po = function(e, t) {
      var r = t.s, i = t.d2, n = t.d, s = t.a;
      return Math.max(0, (r = "scroll" + i) && (s = Xs(e, r)) ? s() - uo(e)()[n] : lo(e) ? (ha[r] || ma[r]) - co(i) : e[r] - e["offset" + i]);
    }, fo = function(e, t) {
      for (var r = 0; r < Aa.length; r += 3) {
        (!t || ~t.indexOf(Aa[r + 1])) && e(Aa[r], Aa[r + 1], Aa[r + 2]);
      }
    }, ho = function(e) {
      return "string" == typeof e;
    }, mo = function(e) {
      return "function" == typeof e;
    }, go = function(e) {
      return "number" == typeof e;
    }, vo = function(e) {
      return "object" == typeof e;
    }, yo = function(e, t, r) {
      return e && e.progress(t ? 0 : 1) && r && e.pause();
    }, _o = function(e, t) {
      if (e.enabled) {
        var r = e._ctx ? e._ctx.add((function() {
          return t(e);
        })) : t(e);
        r && r.totalTime && (e.callbackAnimation = r);
      }
    }, bo = Math.abs, wo = "left", To = "right", xo = "bottom", So = "width", Eo = "height", Co = "Right", Mo = "Left", Ao = "Top", ko = "Bottom", Po = "padding", Lo = "margin", Oo = "Width", Do = "Height", Io = "px", zo = function(e) {
      return pa.getComputedStyle(e);
    }, qo = function(e, t) {
      for (var r in t) {
        r in e || (e[r] = t[r]);
      }
      return e;
    }, Ro = function(e, t) {
      var r = t && "matrix(1, 0, 0, 1, 0, 0)" !== zo(e)[Sa] && ua.to(e, {
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        skewX: 0,
        skewY: 0
      }).progress(1), i = e.getBoundingClientRect();
      return r && r.progress(0).kill(), i;
    }, Fo = function(e, t) {
      var r = t.d2;
      return e["offset" + r] || e["client" + r] || 0;
    }, Bo = function(e) {
      var t, r = [], i = e.labels, n = e.duration();
      for (t in i) {
        r.push(i[t] / n);
      }
      return r;
    }, No = function(e) {
      var t = ua.utils.snap(e), r = Array.isArray(e) && e.slice(0).sort((function(e, t) {
        return e - t;
      }));
      return r ? function(e, i, n) {
        var s;
        if (void 0 === n && (n = .001), !i) {
          return t(e);
        }
        if (i > 0) {
          for (e -= n, s = 0; s < r.length; s++) {
            if (r[s] >= e) {
              return r[s];
            }
          }
          return r[s - 1];
        }
        for (s = r.length, e += n; s--; ) {
          if (r[s] <= e) {
            return r[s];
          }
        }
        return r[0];
      } : function(r, i, n) {
        void 0 === n && (n = .001);
        var s = t(r);
        return !i || Math.abs(s - r) < n || s - r < 0 == i < 0 ? s : t(i < 0 ? r - e : r + e);
      };
    }, Go = function(e, t, r, i) {
      return r.split(",").forEach((function(r) {
        return e(t, r, i);
      }));
    }, Vo = function(e, t, r, i, n) {
      return e.addEventListener(t, r, {
        passive: !i,
        capture: !!n
      });
    }, $o = function(e, t, r, i) {
      return e.removeEventListener(t, r, !!i);
    }, Yo = function(e, t, r) {
      (r = r && r.wheelHandler) && (e(t, "wheel", r), e(t, "touchmove", r));
    }, Ho = {
      startColor: "green",
      endColor: "red",
      indent: 0,
      fontSize: "16px",
      fontWeight: "normal"
    }, Xo = {
      toggleActions: "play",
      anticipatePin: 0
    }, jo = {
      top: 0,
      left: 0,
      center: .5,
      bottom: 1,
      right: 1
    }, Wo = function(e, t) {
      if (ho(e)) {
        var r = e.indexOf("="), i = ~r ? +(e.charAt(r - 1) + 1) * parseFloat(e.substr(r + 1)) : 0;
        ~r && (e.indexOf("%") > r && (i *= t / 100), e = e.substr(0, r - 1)), e = i + (e in jo ? jo[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0);
      }
      return e;
    }, Uo = function(e, t, r, i, n, s, a, o) {
      var l = n.startColor, c = n.endColor, u = n.fontSize, d = n.indent, p = n.fontWeight, f = fa.createElement("div"), h = lo(r) || "fixed" === Xs(r, "pinType"), m = -1 !== e.indexOf("scroller"), g = h ? ma : r, v = -1 !== e.indexOf("start"), y = v ? l : c, _ = "border-color:" + y + ";font-size:" + u + ";color:" + y + ";font-weight:" + p + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return _ += "position:" + ((m || o) && h ? "fixed;" : "absolute;"), (m || o || !h) && (_ += (i === ta ? To : xo) + ":" + (s + parseFloat(d)) + "px;"), 
      a && (_ += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), 
      f._isStart = v, f.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")), 
      f.style.cssText = _, f.innerText = t || 0 === t ? e + "-" + t : e, g.children[0] ? g.insertBefore(f, g.children[0]) : g.appendChild(f), 
      f._offset = f["offset" + i.op.d2], Ko(f, 0, i, v), f;
    }, Ko = function(e, t, r, i) {
      var n = {
        display: "block"
      }, s = r[i ? "os2" : "p2"], a = r[i ? "p2" : "os2"];
      e._isFlipped = i, n[r.a + "Percent"] = i ? -100 : 0, n[r.a] = i ? "1px" : 0, n["border" + s + Oo] = 1, 
      n["border" + a + Oo] = 0, n[r.p] = t + "px", ua.set(e, n);
    }, Qo = [], Zo = {}, Jo = function() {
      return Ua() - Qa > 34 && (Ya || (Ya = requestAnimationFrame(vl)));
    }, el = function() {
      (!Oa || !Oa.isPressed || Oa.startX > ma.clientWidth) && (Vs.cache++, Oa ? Ya || (Ya = requestAnimationFrame(vl)) : vl(), 
      Qa || al("scrollStart"), Qa = Ua());
    }, tl = function() {
      za = pa.innerWidth, Ia = pa.innerHeight;
    }, rl = function() {
      Vs.cache++, !Ta && !La && !fa.fullscreenElement && !fa.webkitFullscreenElement && (!Da || za !== pa.innerWidth || Math.abs(pa.innerHeight - Ia) > .25 * pa.innerHeight) && va.restart(!0);
    }, il = {}, nl = [], sl = function e() {
      return $o(Ll, "scrollEnd", e) || hl(!0);
    }, al = function(e) {
      return il[e] && il[e].map((function(e) {
        return e();
      })) || nl;
    }, ol = [], ll = function(e) {
      for (var t = 0; t < ol.length; t += 5) {
        (!e || ol[t + 4] && ol[t + 4].query === e) && (ol[t].style.cssText = ol[t + 1], 
        ol[t].getBBox && ol[t].setAttribute("transform", ol[t + 2] || ""), ol[t + 3].uncache = 1);
      }
    }, cl = function(e, t) {
      var r;
      for (Ea = 0; Ea < Qo.length; Ea++) {
        !(r = Qo[Ea]) || t && r._ctx !== t || (e ? r.kill(1) : r.revert(!0, !0));
      }
      Ga = !0, t && ll(t), t || al("revert");
    }, ul = function(e, t) {
      Vs.cache++, (t || !Ha) && Vs.forEach((function(e) {
        return mo(e) && e.cacheID++ && (e.rec = 0);
      })), ho(e) && (pa.history.scrollRestoration = Fa = e);
    }, dl = 0, pl = function() {
      ma.appendChild(Ba), Na = !Oa && Ba.offsetHeight || pa.innerHeight, ma.removeChild(Ba);
    }, fl = function(e) {
      return ya(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach((function(t) {
        return t.style.display = e ? "none" : "block";
      }));
    }, hl = function(e, t) {
      if (!Qa || e || Ga) {
        pl(), Ha = Ll.isRefreshing = !0, Vs.forEach((function(e) {
          return mo(e) && ++e.cacheID && (e.rec = e());
        }));
        var r = al("refreshInit");
        ka && Ll.sort(), t || cl(), Vs.forEach((function(e) {
          mo(e) && (e.smooth && (e.target.style.scrollBehavior = "auto"), e(0));
        })), Qo.slice(0).forEach((function(e) {
          return e.refresh();
        })), Ga = !1, Qo.forEach((function(e) {
          if (e._subPinOffset && e.pin) {
            var t = e.vars.horizontal ? "offsetWidth" : "offsetHeight", r = e.pin[t];
            e.revert(!0, 1), e.adjustPinSpacing(e.pin[t] - r), e.refresh();
          }
        })), Va = 1, fl(!0), Qo.forEach((function(e) {
          var t = po(e.scroller, e._dir), r = "max" === e.vars.end || e._endClamp && e.end > t, i = e._startClamp && e.start >= t;
          (r || i) && e.setPositions(i ? t - 1 : e.start, r ? Math.max(i ? t : e.start + 1, t) : e.end, !0);
        })), fl(!1), Va = 0, r.forEach((function(e) {
          return e && e.render && e.render(-1);
        })), Vs.forEach((function(e) {
          mo(e) && (e.smooth && requestAnimationFrame((function() {
            return e.target.style.scrollBehavior = "smooth";
          })), e.rec && e(e.rec));
        })), ul(Fa, 1), va.pause(), dl++, Ha = 2, vl(2), Qo.forEach((function(e) {
          return mo(e.vars.onRefresh) && e.vars.onRefresh(e);
        })), Ha = Ll.isRefreshing = !1, al("refresh");
      } else {
        Vo(Ll, "scrollEnd", sl);
      }
    }, ml = 0, gl = 1, vl = function(e) {
      if (2 === e || !Ha && !Ga) {
        Ll.isUpdating = !0, ja && ja.update(0);
        var t = Qo.length, r = Ua(), i = r - Ka >= 50, n = t && Qo[0].scroll();
        if (gl = ml > n ? -1 : 1, Ha || (ml = n), i && (Qa && !xa && r - Qa > 200 && (Qa = 0, 
        al("scrollEnd")), ba = Ka, Ka = r), gl < 0) {
          for (Ea = t; Ea-- > 0; ) {
            Qo[Ea] && Qo[Ea].update(0, i);
          }
          gl = 1;
        } else {
          for (Ea = 0; Ea < t; Ea++) {
            Qo[Ea] && Qo[Ea].update(0, i);
          }
        }
        Ll.isUpdating = !1;
      }
      Ya = 0;
    }, yl = [ wo, "top", xo, To, Lo + ko, Lo + Co, Lo + Ao, Lo + Mo, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order" ], _l = yl.concat([ So, Eo, "boxSizing", "max" + Oo, "max" + Do, "position", Lo, Po, Po + Ao, Po + Co, Po + ko, Po + Mo ]), bl = function(e, t, r, i) {
      if (!e._gsap.swappedIn) {
        for (var n, s = yl.length, a = t.style, o = e.style; s--; ) {
          a[n = yl[s]] = r[n];
        }
        a.position = "absolute" === r.position ? "absolute" : "relative", "inline" === r.display && (a.display = "inline-block"), 
        o[xo] = o[To] = "auto", a.flexBasis = r.flexBasis || "auto", a.overflow = "visible", 
        a.boxSizing = "border-box", a[So] = Fo(e, ea) + Io, a[Eo] = Fo(e, ta) + Io, a[Po] = o[Lo] = o.top = o[wo] = "0", 
        Tl(i), o[So] = o["max" + Oo] = r[So], o[Eo] = o["max" + Do] = r[Eo], o[Po] = r[Po], 
        e.parentNode !== t && (e.parentNode.insertBefore(t, e), t.appendChild(e)), e._gsap.swappedIn = !0;
      }
    }, wl = /([A-Z])/g, Tl = function(e) {
      if (e) {
        var t, r, i = e.t.style, n = e.length, s = 0;
        for ((e.t._gsap || ua.core.getCache(e.t)).uncache = 1; s < n; s += 2) {
          r = e[s + 1], t = e[s], r ? i[t] = r : i[t] && i.removeProperty(t.replace(wl, "-$1").toLowerCase());
        }
      }
    }, xl = function(e) {
      for (var t = _l.length, r = e.style, i = [], n = 0; n < t; n++) {
        i.push(_l[n], r[_l[n]]);
      }
      return i.t = e, i;
    }, Sl = {
      left: 0,
      top: 0
    }, El = function(e, t, r, i, n, s, a, o, l, c, u, d, p, f) {
      mo(e) && (e = e(o)), ho(e) && "max" === e.substr(0, 3) && (e = d + ("=" === e.charAt(4) ? Wo("0" + e.substr(3), r) : 0));
      var h, m, g, v = p ? p.time() : 0;
      if (p && p.seek(0), isNaN(e) || (e = +e), go(e)) {
        p && (e = ua.utils.mapRange(p.scrollTrigger.start, p.scrollTrigger.end, 0, d, e)), 
        a && Ko(a, r, i, !0);
      } else {
        mo(t) && (t = t(o));
        var y, _, b, w, T = (e || "0").split(" ");
        g = ra(t, o) || ma, (y = Ro(g) || {}) && (y.left || y.top) || "none" !== zo(g).display || (w = g.style.display, 
        g.style.display = "block", y = Ro(g), w ? g.style.display = w : g.style.removeProperty("display")), 
        _ = Wo(T[0], y[i.d]), b = Wo(T[1] || "0", r), e = y[i.p] - l[i.p] - c + _ + n - b, 
        a && Ko(a, b, i, r - b < 20 || a._isStart && b > 20), r -= r - b;
      }
      if (f && (o[f] = e || -.001, e < 0 && (e = 0)), s) {
        var x = e + r, S = s._isStart;
        h = "scroll" + i.d2, Ko(s, x, i, S && x > 20 || !S && (u ? Math.max(ma[h], ha[h]) : s.parentNode[h]) <= x + 1), 
        u && (l = Ro(a), u && (s.style[i.op.p] = l[i.op.p] - i.op.m - s._offset + Io));
      }
      return p && g && (h = Ro(g), p.seek(d), m = Ro(g), p._caScrollDist = h[i.p] - m[i.p], 
      e = e / p._caScrollDist * d), p && p.seek(v), p ? e : Math.round(e);
    }, Cl = /(webkit|moz|length|cssText|inset)/i, Ml = function(e, t, r, i) {
      if (e.parentNode !== t) {
        var n, s, a = e.style;
        if (t === ma) {
          for (n in e._stOrig = a.cssText, s = zo(e)) {
            +n || Cl.test(n) || !s[n] || "string" != typeof a[n] || "0" === n || (a[n] = s[n]);
          }
          a.top = r, a.left = i;
        } else {
          a.cssText = e._stOrig;
        }
        ua.core.getCache(e).uncache = 1, t.appendChild(e);
      }
    }, Al = function(e, t, r) {
      var i = t, n = i;
      return function(t) {
        var s = Math.round(e());
        return s !== i && s !== n && Math.abs(s - i) > 3 && Math.abs(s - n) > 3 && (t = s, 
        r && r()), n = i, i = t, t;
      };
    }, kl = function(e, t, r) {
      var i = {};
      i[t.p] = "+=" + r, ua.set(e, i);
    }, Pl = function(e, t) {
      var r = ia(e, t), i = "_scroll" + t.p2, n = function t(n, s, a, o, l) {
        var c = t.tween, u = s.onComplete, d = {};
        a = a || r();
        var p = Al(r, a, (function() {
          c.kill(), t.tween = 0;
        }));
        return l = o && l || 0, o = o || n - a, c && c.kill(), s[i] = n, s.inherit = !1, 
        s.modifiers = d, d[i] = function() {
          return p(a + o * c.ratio + l * c.ratio * c.ratio);
        }, s.onUpdate = function() {
          Vs.cache++, t.tween && vl();
        }, s.onComplete = function() {
          t.tween = 0, u && u.call(c);
        }, c = t.tween = ua.to(e, s);
      };
      return e[i] = r, r.wheelHandler = function() {
        return n.tween && n.tween.kill() && (n.tween = 0);
      }, Vo(e, "wheel", r.wheelHandler), Ll.isTouch && Vo(e, "touchmove", r.wheelHandler), 
      n;
    }, Ll = function() {
      function e(t, r) {
        da || e.register(ua) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), 
        Ra(this), this.init(t, r);
      }
      return e.prototype.init = function(t, r) {
        if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), Za) {
          var i, n, s, a, o, l, c, u, d, p, f, h, m, g, v, y, _, b, w, T, x, S, E, C, M, A, k, P, L, O, D, I, z, q, R, F, B, N, G, V, $, Y, H = t = qo(ho(t) || go(t) || t.nodeType ? {
            trigger: t
          } : t, Xo), X = H.onUpdate, j = H.toggleClass, W = H.id, U = H.onToggle, K = H.onRefresh, Q = H.scrub, Z = H.trigger, J = H.pin, ee = H.pinSpacing, te = H.invalidateOnRefresh, re = H.anticipatePin, ie = H.onScrubComplete, ne = H.onSnapComplete, se = H.once, ae = H.snap, oe = H.pinReparent, le = H.pinSpacer, ce = H.containerAnimation, ue = H.fastScrollEnd, de = H.preventOverlaps, pe = t.horizontal || t.containerAnimation && !1 !== t.horizontal ? ea : ta, fe = !Q && 0 !== Q, he = ra(t.scroller || pa), me = ua.core.getCache(he), ge = lo(he), ve = "fixed" === ("pinType" in t ? t.pinType : Xs(he, "pinType") || ge && "fixed"), ye = [ t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack ], _e = fe && t.toggleActions.split(" "), be = "markers" in t ? t.markers : Xo.markers, we = ge ? 0 : parseFloat(zo(he)["border" + pe.p2 + Oo]) || 0, Te = this, xe = t.onRefreshInit && function() {
            return t.onRefreshInit(Te);
          }, Se = function(e, t, r) {
            var i = r.d, n = r.d2, s = r.a;
            return (s = Xs(e, "getBoundingClientRect")) ? function() {
              return s()[i];
            } : function() {
              return (t ? co(n) : e["client" + n]) || 0;
            };
          }(he, ge, pe), Ee = function(e, t) {
            return !t || ~$s.indexOf(e) ? uo(e) : function() {
              return Sl;
            };
          }(he, ge), Ce = 0, Me = 0, Ae = 0, ke = ia(he, pe);
          if (Te._startClamp = Te._endClamp = !1, Te._dir = pe, re *= 45, Te.scroller = he, 
          Te.scroll = ce ? ce.time.bind(ce) : ke, a = ke(), Te.vars = t, r = r || t.animation, 
          "refreshPriority" in t && (ka = 1, -9999 === t.refreshPriority && (ja = Te)), me.tweenScroll = me.tweenScroll || {
            top: Pl(he, ta),
            left: Pl(he, ea)
          }, Te.tweenTo = i = me.tweenScroll[pe.p], Te.scrubDuration = function(e) {
            (z = go(e) && e) ? I ? I.duration(e) : I = ua.to(r, {
              ease: "expo",
              totalProgress: "+=0",
              inherit: !1,
              duration: z,
              paused: !0,
              onComplete: function() {
                return ie && ie(Te);
              }
            }) : (I && I.progress(1).kill(), I = 0);
          }, r && (r.vars.lazy = !1, r._initted && !Te.isReverted || !1 !== r.vars.immediateRender && !1 !== t.immediateRender && r.duration() && r.render(0, !0, !0), 
          Te.animation = r.pause(), r.scrollTrigger = Te, Te.scrubDuration(Q), O = 0, W || (W = r.vars.id)), 
          ae && (vo(ae) && !ae.push || (ae = {
            snapTo: ae
          }), "scrollBehavior" in ma.style && ua.set(ge ? [ ma, ha ] : he, {
            scrollBehavior: "auto"
          }), Vs.forEach((function(e) {
            return mo(e) && e.target === (ge ? fa.scrollingElement || ha : he) && (e.smooth = !1);
          })), s = mo(ae.snapTo) ? ae.snapTo : "labels" === ae.snapTo ? function(e) {
            return function(t) {
              return ua.utils.snap(Bo(e), t);
            };
          }(r) : "labelsDirectional" === ae.snapTo ? (V = r, function(e, t) {
            return No(Bo(V))(e, t.direction);
          }) : !1 !== ae.directional ? function(e, t) {
            return No(ae.snapTo)(e, Ua() - Me < 500 ? 0 : t.direction);
          } : ua.utils.snap(ae.snapTo), q = ae.duration || {
            min: .1,
            max: 2
          }, q = vo(q) ? _a(q.min, q.max) : _a(q, q), R = ua.delayedCall(ae.delay || z / 2 || .1, (function() {
            var e = ke(), t = Ua() - Me < 500, n = i.tween;
            if (!(t || Math.abs(Te.getVelocity()) < 10) || n || xa || Ce === e) {
              Te.isActive && Ce !== e && R.restart(!0);
            } else {
              var a, o, u = (e - l) / g, d = r && !fe ? r.totalProgress() : u, p = t ? 0 : (d - D) / (Ua() - ba) * 1e3 || 0, f = ua.utils.clamp(-u, 1 - u, bo(p / 2) * p / .185), h = u + (!1 === ae.inertia ? 0 : f), m = ae, v = m.onStart, y = m.onInterrupt, _ = m.onComplete;
              if (a = s(h, Te), go(a) || (a = h), o = Math.round(l + a * g), e <= c && e >= l && o !== e) {
                if (n && !n._initted && n.data <= bo(o - e)) {
                  return;
                }
                !1 === ae.inertia && (f = a - u), i(o, {
                  duration: q(bo(.185 * Math.max(bo(h - d), bo(a - d)) / p / .05 || 0)),
                  ease: ae.ease || "power3",
                  data: bo(o - e),
                  onInterrupt: function() {
                    return R.restart(!0) && y && y(Te);
                  },
                  onComplete: function() {
                    Te.update(), Ce = ke(), r && (I ? I.resetTo("totalProgress", a, r._tTime / r._tDur) : r.progress(a)), 
                    O = D = r && !fe ? r.totalProgress() : Te.progress, ne && ne(Te), _ && _(Te);
                  }
                }, e, f * g, o - e - f * g), v && v(Te, i.tween);
              }
            }
          })).pause()), W && (Zo[W] = Te), (G = (Z = Te.trigger = ra(Z || !0 !== J && J)) && Z._gsap && Z._gsap.stRevert) && (G = G(Te)), 
          J = !0 === J ? Z : ra(J), ho(j) && (j = {
            targets: Z,
            className: j
          }), J && (!1 === ee || ee === Lo || (ee = !(!ee && J.parentNode && J.parentNode.style && "flex" === zo(J.parentNode).display) && Po), 
          Te.pin = J, (n = ua.core.getCache(J)).spacer ? v = n.pinState : (le && ((le = ra(le)) && !le.nodeType && (le = le.current || le.nativeElement), 
          n.spacerIsNative = !!le, le && (n.spacerState = xl(le))), n.spacer = b = le || fa.createElement("div"), 
          b.classList.add("pin-spacer"), W && b.classList.add("pin-spacer-" + W), n.pinState = v = xl(J)), 
          !1 !== t.force3D && ua.set(J, {
            force3D: !0
          }), Te.spacer = b = n.spacer, L = zo(J), C = L[ee + pe.os2], T = ua.getProperty(J), 
          x = ua.quickSetter(J, pe.a, Io), bl(J, b, L), _ = xl(J)), be) {
            h = vo(be) ? qo(be, Ho) : Ho, p = Uo("scroller-start", W, he, pe, h, 0), f = Uo("scroller-end", W, he, pe, h, 0, p), 
            w = p["offset" + pe.op.d2];
            var Pe = ra(Xs(he, "content") || he);
            u = this.markerStart = Uo("start", W, Pe, pe, h, w, 0, ce), d = this.markerEnd = Uo("end", W, Pe, pe, h, w, 0, ce), 
            ce && (N = ua.quickSetter([ u, d ], pe.a, Io)), ve || $s.length && !0 === Xs(he, "fixedMarkers") || (Y = zo($ = ge ? ma : he).position, 
            $.style.position = "absolute" === Y || "fixed" === Y ? Y : "relative", ua.set([ p, f ], {
              force3D: !0
            }), A = ua.quickSetter(p, pe.a, Io), P = ua.quickSetter(f, pe.a, Io));
          }
          if (ce) {
            var Le = ce.vars.onUpdate, Oe = ce.vars.onUpdateParams;
            ce.eventCallback("onUpdate", (function() {
              Te.update(0, 0, 1), Le && Le.apply(ce, Oe || []);
            }));
          }
          if (Te.previous = function() {
            return Qo[Qo.indexOf(Te) - 1];
          }, Te.next = function() {
            return Qo[Qo.indexOf(Te) + 1];
          }, Te.revert = function(e, t) {
            if (!t) {
              return Te.kill(!0);
            }
            var i = !1 !== e || !Te.enabled, n = Ta;
            i !== Te.isReverted && (i && (F = Math.max(ke(), Te.scroll.rec || 0), Ae = Te.progress, 
            B = r && r.progress()), u && [ u, d, p, f ].forEach((function(e) {
              return e.style.display = i ? "none" : "block";
            })), i && (Ta = Te, Te.update(i)), !J || oe && Te.isActive || (i ? function(e, t, r) {
              Tl(r);
              var i = e._gsap;
              if (i.spacerIsNative) {
                Tl(i.spacerState);
              } else if (e._gsap.swappedIn) {
                var n = t.parentNode;
                n && (n.insertBefore(e, t), n.removeChild(t));
              }
              e._gsap.swappedIn = !1;
            }(J, b, v) : bl(J, b, zo(J), M)), i || Te.update(i), Ta = n, Te.isReverted = i);
          }, Te.refresh = function(n, s, h, w) {
            if (!Ta && Te.enabled || s) {
              if (J && n && Qa) {
                Vo(e, "scrollEnd", sl);
              } else {
                !Ha && xe && xe(Te), Ta = Te, i.tween && !h && (i.tween.kill(), i.tween = 0), I && I.pause(), 
                te && r && r.revert({
                  kill: !1
                }).invalidate(), Te.isReverted || Te.revert(!0, !0), Te._subPinOffset = !1;
                var x, C, A, P, L, O, D, z, q, N, G, V, $, Y = Se(), H = Ee(), X = ce ? ce.duration() : po(he, pe), j = g <= .01, W = 0, U = w || 0, Q = vo(h) ? h.end : t.end, re = t.endTrigger || Z, ie = vo(h) ? h.start : t.start || (0 !== t.start && Z ? J ? "0 0" : "0 100%" : 0), ne = Te.pinnedContainer = t.pinnedContainer && ra(t.pinnedContainer, Te), se = Z && Math.max(0, Qo.indexOf(Te)) || 0, ae = se;
                for (be && vo(h) && (V = ua.getProperty(p, pe.p), $ = ua.getProperty(f, pe.p)); ae--; ) {
                  (O = Qo[ae]).end || O.refresh(0, 1) || (Ta = Te), !(D = O.pin) || D !== Z && D !== J && D !== ne || O.isReverted || (N || (N = []), 
                  N.unshift(O), O.revert(!0, !0)), O !== Qo[ae] && (se--, ae--);
                }
                for (mo(ie) && (ie = ie(Te)), ie = Ja(ie, "start", Te), l = El(ie, Z, Y, pe, ke(), u, p, Te, H, we, ve, X, ce, Te._startClamp && "_startClamp") || (J ? -.001 : 0), 
                mo(Q) && (Q = Q(Te)), ho(Q) && !Q.indexOf("+=") && (~Q.indexOf(" ") ? Q = (ho(ie) ? ie.split(" ")[0] : "") + Q : (W = Wo(Q.substr(2), Y), 
                Q = ho(ie) ? ie : (ce ? ua.utils.mapRange(0, ce.duration(), ce.scrollTrigger.start, ce.scrollTrigger.end, l) : l) + W, 
                re = Z)), Q = Ja(Q, "end", Te), c = Math.max(l, El(Q || (re ? "100% 0" : X), re, Y, pe, ke() + W, d, f, Te, H, we, ve, X, ce, Te._endClamp && "_endClamp")) || -.001, 
                W = 0, ae = se; ae--; ) {
                  (D = (O = Qo[ae]).pin) && O.start - O._pinPush <= l && !ce && O.end > 0 && (x = O.end - (Te._startClamp ? Math.max(0, O.start) : O.start), 
                  (D === Z && O.start - O._pinPush < l || D === ne) && isNaN(ie) && (W += x * (1 - O.progress)), 
                  D === J && (U += x));
                }
                if (l += W, c += W, Te._startClamp && (Te._startClamp += W), Te._endClamp && !Ha && (Te._endClamp = c || -.001, 
                c = Math.min(c, po(he, pe))), g = c - l || (l -= .01) && .001, j && (Ae = ua.utils.clamp(0, 1, ua.utils.normalize(l, c, F))), 
                Te._pinPush = U, u && W && ((x = {})[pe.a] = "+=" + W, ne && (x[pe.p] = "-=" + ke()), 
                ua.set([ u, d ], x)), !J || Va && Te.end >= po(he, pe)) {
                  if (Z && ke() && !ce) {
                    for (C = Z.parentNode; C && C !== ma; ) {
                      C._pinOffset && (l -= C._pinOffset, c -= C._pinOffset), C = C.parentNode;
                    }
                  }
                } else {
                  x = zo(J), P = pe === ta, A = ke(), S = parseFloat(T(pe.a)) + U, !X && c > 1 && (G = {
                    style: G = (ge ? fa.scrollingElement || ha : he).style,
                    value: G["overflow" + pe.a.toUpperCase()]
                  }, ge && "scroll" !== zo(ma)["overflow" + pe.a.toUpperCase()] && (G.style["overflow" + pe.a.toUpperCase()] = "scroll")), 
                  bl(J, b, x), _ = xl(J), C = Ro(J, !0), z = ve && ia(he, P ? ea : ta)(), ee ? ((M = [ ee + pe.os2, g + U + Io ]).t = b, 
                  (ae = ee === Po ? Fo(J, pe) + g + U : 0) && (M.push(pe.d, ae + Io), "auto" !== b.style.flexBasis && (b.style.flexBasis = ae + Io)), 
                  Tl(M), ne && Qo.forEach((function(e) {
                    e.pin === ne && !1 !== e.vars.pinSpacing && (e._subPinOffset = !0);
                  })), ve && ke(F)) : (ae = Fo(J, pe)) && "auto" !== b.style.flexBasis && (b.style.flexBasis = ae + Io), 
                  ve && ((L = {
                    top: C.top + (P ? A - l : z) + Io,
                    left: C.left + (P ? z : A - l) + Io,
                    boxSizing: "border-box",
                    position: "fixed"
                  })[So] = L["max" + Oo] = Math.ceil(C.width) + Io, L[Eo] = L["max" + Do] = Math.ceil(C.height) + Io, 
                  L[Lo] = L[Lo + Ao] = L[Lo + Co] = L[Lo + ko] = L[Lo + Mo] = "0", L[Po] = x[Po], 
                  L[Po + Ao] = x[Po + Ao], L[Po + Co] = x[Po + Co], L[Po + ko] = x[Po + ko], L[Po + Mo] = x[Po + Mo], 
                  y = function(e, t, r) {
                    for (var i, n = [], s = e.length, a = r ? 8 : 0; a < s; a += 2) {
                      i = e[a], n.push(i, i in t ? t[i] : e[a + 1]);
                    }
                    return n.t = e.t, n;
                  }(v, L, oe), Ha && ke(0)), r ? (q = r._initted, Pa(1), r.render(r.duration(), !0, !0), 
                  E = T(pe.a) - S + g + U, k = Math.abs(g - E) > 1, ve && k && y.splice(y.length - 2, 2), 
                  r.render(0, !0, !0), q || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), 
                  Pa(0)) : E = g, G && (G.value ? G.style["overflow" + pe.a.toUpperCase()] = G.value : G.style.removeProperty("overflow-" + pe.a));
                }
                N && N.forEach((function(e) {
                  return e.revert(!1, !0);
                })), Te.start = l, Te.end = c, a = o = Ha ? F : ke(), ce || Ha || (a < F && ke(F), 
                Te.scroll.rec = 0), Te.revert(!1, !0), Me = Ua(), R && (Ce = -1, R.restart(!0)), 
                Ta = 0, r && fe && (r._initted || B) && r.progress() !== B && r.progress(B || 0, !0).render(r.time(), !0, !0), 
                (j || Ae !== Te.progress || ce || te) && (r && !fe && r.totalProgress(ce && l < -.001 && !Ae ? ua.utils.normalize(l, c, 0) : Ae, !0), 
                Te.progress = j || (a - l) / g === Ae ? 0 : Ae), J && ee && (b._pinOffset = Math.round(Te.progress * E)), 
                I && I.invalidate(), isNaN(V) || (V -= ua.getProperty(p, pe.p), $ -= ua.getProperty(f, pe.p), 
                kl(p, pe, V), kl(u, pe, V - (w || 0)), kl(f, pe, $), kl(d, pe, $ - (w || 0))), j && !Ha && Te.update(), 
                !K || Ha || m || (m = !0, K(Te), m = !1);
              }
            }
          }, Te.getVelocity = function() {
            return (ke() - o) / (Ua() - ba) * 1e3 || 0;
          }, Te.endAnimation = function() {
            yo(Te.callbackAnimation), r && (I ? I.progress(1) : r.paused() ? fe || yo(r, Te.direction < 0, 1) : yo(r, r.reversed()));
          }, Te.labelToScroll = function(e) {
            return r && r.labels && (l || Te.refresh() || l) + r.labels[e] / r.duration() * g || 0;
          }, Te.getTrailing = function(e) {
            var t = Qo.indexOf(Te), r = Te.direction > 0 ? Qo.slice(0, t).reverse() : Qo.slice(t + 1);
            return (ho(e) ? r.filter((function(t) {
              return t.vars.preventOverlaps === e;
            })) : r).filter((function(e) {
              return Te.direction > 0 ? e.end <= l : e.start >= c;
            }));
          }, Te.update = function(e, t, n) {
            if (!ce || n || e) {
              var s, u, d, f, h, m, v, w = !0 === Ha ? F : Te.scroll(), T = e ? 0 : (w - l) / g, M = T < 0 ? 0 : T > 1 ? 1 : T || 0, L = Te.progress;
              if (t && (o = a, a = ce ? ke() : w, ae && (D = O, O = r && !fe ? r.totalProgress() : M)), 
              re && J && !Ta && !Wa && Qa && (!M && l < w + (w - o) / (Ua() - ba) * re ? M = 1e-4 : 1 === M && c > w + (w - o) / (Ua() - ba) * re && (M = .9999)), 
              M !== L && Te.enabled) {
                if (f = (h = (s = Te.isActive = !!M && M < 1) !== (!!L && L < 1)) || !!M != !!L, 
                Te.direction = M > L ? 1 : -1, Te.progress = M, f && !Ta && (u = M && !L ? 0 : 1 === M ? 1 : 1 === L ? 2 : 3, 
                fe && (d = !h && "none" !== _e[u + 1] && _e[u + 1] || _e[u], v = r && ("complete" === d || "reset" === d || d in r))), 
                de && (h || v) && (v || Q || !r) && (mo(de) ? de(Te) : Te.getTrailing(de).forEach((function(e) {
                  return e.endAnimation();
                }))), fe || (!I || Ta || Wa ? r && r.totalProgress(M, !(!Ta || !Me && !e)) : (I._dp._time - I._start !== I._time && I.render(I._dp._time - I._start), 
                I.resetTo ? I.resetTo("totalProgress", M, r._tTime / r._tDur) : (I.vars.totalProgress = M, 
                I.invalidate().restart()))), J) {
                  if (e && ee && (b.style[ee + pe.os2] = C), ve) {
                    if (f) {
                      if (m = !e && M > L && c + 1 > w && w + 1 >= po(he, pe), oe) {
                        if (e || !s && !m) {
                          Ml(J, b);
                        } else {
                          var z = Ro(J, !0), q = w - l;
                          Ml(J, ma, z.top + (pe === ta ? q : 0) + Io, z.left + (pe === ta ? 0 : q) + Io);
                        }
                      }
                      Tl(s || m ? y : _), k && M < 1 && s || x(S + (1 !== M || m ? 0 : E));
                    }
                  } else {
                    x(so(S + E * M));
                  }
                }
                ae && !i.tween && !Ta && !Wa && R.restart(!0), j && (h || se && M && (M < 1 || !$a)) && ya(j.targets).forEach((function(e) {
                  return e.classList[s || se ? "add" : "remove"](j.className);
                })), X && !fe && !e && X(Te), f && !Ta ? (fe && (v && ("complete" === d ? r.pause().totalProgress(1) : "reset" === d ? r.restart(!0).pause() : "restart" === d ? r.restart(!0) : r[d]()), 
                X && X(Te)), !h && $a || (U && h && _o(Te, U), ye[u] && _o(Te, ye[u]), se && (1 === M ? Te.kill(!1, 1) : ye[u] = 0), 
                h || ye[u = 1 === M ? 1 : 3] && _o(Te, ye[u])), ue && !s && Math.abs(Te.getVelocity()) > (go(ue) ? ue : 2500) && (yo(Te.callbackAnimation), 
                I ? I.progress(1) : yo(r, "reverse" === d ? 1 : !M, 1))) : fe && X && !Ta && X(Te);
              }
              if (P) {
                var B = ce ? w / ce.duration() * (ce._caScrollDist || 0) : w;
                A(B + (p._isFlipped ? 1 : 0)), P(B);
              }
              N && N(-w / ce.duration() * (ce._caScrollDist || 0));
            }
          }, Te.enable = function(t, r) {
            Te.enabled || (Te.enabled = !0, Vo(he, "resize", rl), ge || Vo(he, "scroll", el), 
            xe && Vo(e, "refreshInit", xe), !1 !== t && (Te.progress = Ae = 0, a = o = Ce = ke()), 
            !1 !== r && Te.refresh());
          }, Te.getTween = function(e) {
            return e && i ? i.tween : I;
          }, Te.setPositions = function(e, t, r, i) {
            if (ce) {
              var n = ce.scrollTrigger, s = ce.duration(), a = n.end - n.start;
              e = n.start + a * e / s, t = n.start + a * t / s;
            }
            Te.refresh(!1, !1, {
              start: eo(e, r && !!Te._startClamp),
              end: eo(t, r && !!Te._endClamp)
            }, i), Te.update();
          }, Te.adjustPinSpacing = function(e) {
            if (M && e) {
              var t = M.indexOf(pe.d) + 1;
              M[t] = parseFloat(M[t]) + e + Io, M[1] = parseFloat(M[1]) + e + Io, Tl(M);
            }
          }, Te.disable = function(t, r) {
            if (Te.enabled && (!1 !== t && Te.revert(!0, !0), Te.enabled = Te.isActive = !1, 
            r || I && I.pause(), F = 0, n && (n.uncache = 1), xe && $o(e, "refreshInit", xe), 
            R && (R.pause(), i.tween && i.tween.kill() && (i.tween = 0)), !ge)) {
              for (var s = Qo.length; s--; ) {
                if (Qo[s].scroller === he && Qo[s] !== Te) {
                  return;
                }
              }
              $o(he, "resize", rl), ge || $o(he, "scroll", el);
            }
          }, Te.kill = function(e, i) {
            Te.disable(e, i), I && !i && I.kill(), W && delete Zo[W];
            var s = Qo.indexOf(Te);
            s >= 0 && Qo.splice(s, 1), s === Ea && gl > 0 && Ea--, s = 0, Qo.forEach((function(e) {
              return e.scroller === Te.scroller && (s = 1);
            })), s || Ha || (Te.scroll.rec = 0), r && (r.scrollTrigger = null, e && r.revert({
              kill: !1
            }), i || r.kill()), u && [ u, d, p, f ].forEach((function(e) {
              return e.parentNode && e.parentNode.removeChild(e);
            })), ja === Te && (ja = 0), J && (n && (n.uncache = 1), s = 0, Qo.forEach((function(e) {
              return e.pin === J && s++;
            })), s || (n.spacer = 0)), t.onKill && t.onKill(Te);
          }, Qo.push(Te), Te.enable(!1, !1), G && G(Te), r && r.add && !g) {
            var De = Te.update;
            Te.update = function() {
              Te.update = De, l || c || Te.refresh();
            }, ua.delayedCall(.01, Te.update), g = .01, l = c = 0;
          } else {
            Te.refresh();
          }
          J && function() {
            if (Xa !== dl) {
              var e = Xa = dl;
              requestAnimationFrame((function() {
                return e === dl && hl(!0);
              }));
            }
          }();
        } else {
          this.update = this.refresh = this.kill = no;
        }
      }, e.register = function(t) {
        return da || (ua = t || oo(), ao() && window.document && e.enable(), da = Za), da;
      }, e.defaults = function(e) {
        if (e) {
          for (var t in e) {
            Xo[t] = e[t];
          }
        }
        return Xo;
      }, e.disable = function(e, t) {
        Za = 0, Qo.forEach((function(r) {
          return r[t ? "kill" : "disable"](e);
        })), $o(pa, "wheel", el), $o(fa, "scroll", el), clearInterval(wa), $o(fa, "touchcancel", no), 
        $o(ma, "touchstart", no), Go($o, fa, "pointerdown,touchstart,mousedown", ro), Go($o, fa, "pointerup,touchend,mouseup", io), 
        va.kill(), fo($o);
        for (var r = 0; r < Vs.length; r += 3) {
          Yo($o, Vs[r], Vs[r + 1]), Yo($o, Vs[r], Vs[r + 2]);
        }
      }, e.enable = function() {
        if (pa = window, fa = document, ha = fa.documentElement, ma = fa.body, ua && (ya = ua.utils.toArray, 
        _a = ua.utils.clamp, Ra = ua.core.context || no, Pa = ua.core.suppressOverwrites || no, 
        Fa = pa.history.scrollRestoration || "auto", ml = pa.pageYOffset, ua.core.globals("ScrollTrigger", e), 
        ma)) {
          Za = 1, (Ba = document.createElement("div")).style.height = "100vh", Ba.style.position = "absolute", 
          pl(), to(), ca.register(ua), e.isTouch = ca.isTouch, qa = ca.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), 
          Da = 1 === ca.isTouch, Vo(pa, "wheel", el), ga = [ pa, fa, ha, ma ], ua.matchMedia ? (e.matchMedia = function(e) {
            var t, r = ua.matchMedia();
            for (t in e) {
              r.add(t, e[t]);
            }
            return r;
          }, ua.addEventListener("matchMediaInit", (function() {
            return cl();
          })), ua.addEventListener("matchMediaRevert", (function() {
            return ll();
          })), ua.addEventListener("matchMedia", (function() {
            hl(0, 1), al("matchMedia");
          })), ua.matchMedia("(orientation: portrait)", (function() {
            return tl(), tl;
          }))) : console.warn("Requires GSAP 3.11.0 or later"), tl(), Vo(fa, "scroll", el);
          var t, r, i = ma.style, n = i.borderTopStyle, s = ua.core.Animation.prototype;
          for (s.revert || Object.defineProperty(s, "revert", {
            value: function() {
              return this.time(-.01, !0);
            }
          }), i.borderTopStyle = "solid", t = Ro(ma), ta.m = Math.round(t.top + ta.sc()) || 0, 
          ea.m = Math.round(t.left + ea.sc()) || 0, n ? i.borderTopStyle = n : i.removeProperty("border-top-style"), 
          wa = setInterval(Jo, 250), ua.delayedCall(.5, (function() {
            return Wa = 0;
          })), Vo(fa, "touchcancel", no), Vo(ma, "touchstart", no), Go(Vo, fa, "pointerdown,touchstart,mousedown", ro), 
          Go(Vo, fa, "pointerup,touchend,mouseup", io), Sa = ua.utils.checkPrefix("transform"), 
          _l.push(Sa), da = Ua(), va = ua.delayedCall(.2, hl).pause(), Aa = [ fa, "visibilitychange", function() {
            var e = pa.innerWidth, t = pa.innerHeight;
            fa.hidden ? (Ca = e, Ma = t) : Ca === e && Ma === t || rl();
          }, fa, "DOMContentLoaded", hl, pa, "load", hl, pa, "resize", rl ], fo(Vo), Qo.forEach((function(e) {
            return e.enable(0, 1);
          })), r = 0; r < Vs.length; r += 3) {
            Yo($o, Vs[r], Vs[r + 1]), Yo($o, Vs[r], Vs[r + 2]);
          }
        }
      }, e.config = function(t) {
        "limitCallbacks" in t && ($a = !!t.limitCallbacks);
        var r = t.syncInterval;
        r && clearInterval(wa) || (wa = r) && setInterval(Jo, r), "ignoreMobileResize" in t && (Da = 1 === e.isTouch && t.ignoreMobileResize), 
        "autoRefreshEvents" in t && (fo($o) || fo(Vo, t.autoRefreshEvents || "none"), La = -1 === (t.autoRefreshEvents + "").indexOf("resize"));
      }, e.scrollerProxy = function(e, t) {
        var r = ra(e), i = Vs.indexOf(r), n = lo(r);
        ~i && Vs.splice(i, n ? 6 : 2), t && (n ? $s.unshift(pa, t, ma, t, ha, t) : $s.unshift(r, t));
      }, e.clearMatchMedia = function(e) {
        Qo.forEach((function(t) {
          return t._ctx && t._ctx.query === e && t._ctx.kill(!0, !0);
        }));
      }, e.isInViewport = function(e, t, r) {
        var i = (ho(e) ? ra(e) : e).getBoundingClientRect(), n = i[r ? So : Eo] * t || 0;
        return r ? i.right - n > 0 && i.left + n < pa.innerWidth : i.bottom - n > 0 && i.top + n < pa.innerHeight;
      }, e.positionInViewport = function(e, t, r) {
        ho(e) && (e = ra(e));
        var i = e.getBoundingClientRect(), n = i[r ? So : Eo], s = null == t ? n / 2 : t in jo ? jo[t] * n : ~t.indexOf("%") ? parseFloat(t) * n / 100 : parseFloat(t) || 0;
        return r ? (i.left + s) / pa.innerWidth : (i.top + s) / pa.innerHeight;
      }, e.killAll = function(e) {
        if (Qo.slice(0).forEach((function(e) {
          return "ScrollSmoother" !== e.vars.id && e.kill();
        })), !0 !== e) {
          var t = il.killAll || [];
          il = {}, t.forEach((function(e) {
            return e();
          }));
        }
      }, e;
    }();
    Ll.version = "3.12.5", Ll.saveStyles = function(e) {
      return e ? ya(e).forEach((function(e) {
        if (e && e.style) {
          var t = ol.indexOf(e);
          t >= 0 && ol.splice(t, 5), ol.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), ua.core.getCache(e), Ra());
        }
      })) : ol;
    }, Ll.revert = function(e, t) {
      return cl(!e, t);
    }, Ll.create = function(e, t) {
      return new Ll(e, t);
    }, Ll.refresh = function(e) {
      return e ? rl() : (da || Ll.register()) && hl(!0);
    }, Ll.update = function(e) {
      return ++Vs.cache && vl(!0 === e ? 2 : 0);
    }, Ll.clearScrollMemory = ul, Ll.maxScroll = function(e, t) {
      return po(e, t ? ea : ta);
    }, Ll.getScrollFunc = function(e, t) {
      return ia(ra(e), t ? ea : ta);
    }, Ll.getById = function(e) {
      return Zo[e];
    }, Ll.getAll = function() {
      return Qo.filter((function(e) {
        return "ScrollSmoother" !== e.vars.id;
      }));
    }, Ll.isScrolling = function() {
      return !!Qa;
    }, Ll.snapDirectional = No, Ll.addEventListener = function(e, t) {
      var r = il[e] || (il[e] = []);
      ~r.indexOf(t) || r.push(t);
    }, Ll.removeEventListener = function(e, t) {
      var r = il[e], i = r && r.indexOf(t);
      i >= 0 && r.splice(i, 1);
    }, Ll.batch = function(e, t) {
      var r, i = [], n = {}, s = t.interval || .016, a = t.batchMax || 1e9, o = function(e, t) {
        var r = [], i = [], n = ua.delayedCall(s, (function() {
          t(r, i), r = [], i = [];
        })).pause();
        return function(e) {
          r.length || n.restart(!0), r.push(e.trigger), i.push(e), a <= r.length && n.progress(1);
        };
      };
      for (r in t) {
        n[r] = "on" === r.substr(0, 2) && mo(t[r]) && "onRefreshInit" !== r ? o(0, t[r]) : t[r];
      }
      return mo(a) && (a = a(), Vo(Ll, "refresh", (function() {
        return a = t.batchMax();
      }))), ya(e).forEach((function(e) {
        var t = {};
        for (r in n) {
          t[r] = n[r];
        }
        t.trigger = e, i.push(Ll.create(t));
      })), i;
    };
    var Ol, Dl = function(e, t, r, i) {
      return t > i ? e(i) : t < 0 && e(0), r > i ? (i - t) / (r - t) : r < 0 ? t / (t - r) : 1;
    }, Il = function e(t, r) {
      !0 === r ? t.style.removeProperty("touch-action") : t.style.touchAction = !0 === r ? "auto" : r ? "pan-" + r + (ca.isTouch ? " pinch-zoom" : "") : "none", 
      t === ha && e(ma, r);
    }, zl = {
      auto: 1,
      scroll: 1
    }, ql = function(e) {
      var t, r = e.event, i = e.target, n = e.axis, s = (r.changedTouches ? r.changedTouches[0] : r).target, a = s._gsap || ua.core.getCache(s), o = Ua();
      if (!a._isScrollT || o - a._isScrollT > 2e3) {
        for (;s && s !== ma && (s.scrollHeight <= s.clientHeight && s.scrollWidth <= s.clientWidth || !zl[(t = zo(s)).overflowY] && !zl[t.overflowX]); ) {
          s = s.parentNode;
        }
        a._isScroll = s && s !== i && !lo(s) && (zl[(t = zo(s)).overflowY] || zl[t.overflowX]), 
        a._isScrollT = o;
      }
      (a._isScroll || "x" === n) && (r.stopPropagation(), r._gsapAllow = !0);
    }, Rl = function(e, t, r, i) {
      return ca.create({
        target: e,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: t,
        onWheel: i = i && ql,
        onPress: i,
        onDrag: i,
        onScroll: i,
        onEnable: function() {
          return r && Vo(fa, ca.eventTypes[0], Bl, !1, !0);
        },
        onDisable: function() {
          return $o(fa, ca.eventTypes[0], Bl, !0);
        }
      });
    }, Fl = /(input|label|select|textarea)/i, Bl = function(e) {
      var t = Fl.test(e.target.tagName);
      (t || Ol) && (e._gsapAllow = !0, Ol = t);
    }, Nl = function(e) {
      vo(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), 
      e.debounce = !!e.debounce, e.id = e.id || "normalizer";
      var t, r, i, n, s, a, o, l, c = e, u = c.normalizeScrollX, d = c.momentum, p = c.allowNestedScroll, f = c.onRelease, h = ra(e.target) || ha, m = ua.core.globals().ScrollSmoother, g = m && m.get(), v = qa && (e.content && ra(e.content) || g && !1 !== e.content && !g.smooth() && g.content()), y = ia(h, ta), _ = ia(h, ea), b = 1, w = (ca.isTouch && pa.visualViewport ? pa.visualViewport.scale * pa.visualViewport.width : pa.outerWidth) / pa.innerWidth, T = 0, x = mo(d) ? function() {
        return d(t);
      } : function() {
        return d || 2.8;
      }, S = Rl(h, e.type, !0, p), E = function() {
        return n = !1;
      }, C = no, M = no, A = function() {
        r = po(h, ta), M = _a(qa ? 1 : 0, r), u && (C = _a(0, po(h, ea))), i = dl;
      }, k = function() {
        v._gsap.y = so(parseFloat(v._gsap.y) + y.offset) + "px", v.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(v._gsap.y) + ", 0, 1)", 
        y.offset = y.cacheID = 0;
      }, P = function() {
        A(), s.isActive() && s.vars.scrollY > r && (y() > r ? s.progress(1) && y(r) : s.resetTo("scrollY", r));
      };
      return v && ua.set(v, {
        y: "+=0"
      }), e.ignoreCheck = function(e) {
        return qa && "touchmove" === e.type && function() {
          if (n) {
            requestAnimationFrame(E);
            var e = so(t.deltaY / 2), r = M(y.v - e);
            if (v && r !== y.v + y.offset) {
              y.offset = r - y.v;
              var i = so((parseFloat(v && v._gsap.y) || 0) - y.offset);
              v.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + i + ", 0, 1)", 
              v._gsap.y = i + "px", y.cacheID = Vs.cache, vl();
            }
            return !0;
          }
          y.offset && k(), n = !0;
        }() || b > 1.05 && "touchstart" !== e.type || t.isGesturing || e.touches && e.touches.length > 1;
      }, e.onPress = function() {
        n = !1;
        var e = b;
        b = so((pa.visualViewport && pa.visualViewport.scale || 1) / w), s.pause(), e !== b && Il(h, b > 1.01 || !u && "x"), 
        a = _(), o = y(), A(), i = dl;
      }, e.onRelease = e.onGestureStart = function(e, t) {
        if (y.offset && k(), t) {
          Vs.cache++;
          var i, n, a = x();
          u && (n = (i = _()) + .05 * a * -e.velocityX / .227, a *= Dl(_, i, n, po(h, ea)), 
          s.vars.scrollX = C(n)), n = (i = y()) + .05 * a * -e.velocityY / .227, a *= Dl(y, i, n, po(h, ta)), 
          s.vars.scrollY = M(n), s.invalidate().duration(a).play(.01), (qa && s.vars.scrollY >= r || i >= r - 1) && ua.to({}, {
            onUpdate: P,
            duration: a
          });
        } else {
          l.restart(!0);
        }
        f && f(e);
      }, e.onWheel = function() {
        s._ts && s.pause(), Ua() - T > 1e3 && (i = 0, T = Ua());
      }, e.onChange = function(e, t, r, n, s) {
        if (dl !== i && A(), t && u && _(C(n[2] === t ? a + (e.startX - e.x) : _() + t - n[1])), 
        r) {
          y.offset && k();
          var l = s[2] === r, c = l ? o + e.startY - e.y : y() + r - s[1], d = M(c);
          l && c !== d && (o += d - c), y(d);
        }
        (r || t) && vl();
      }, e.onEnable = function() {
        Il(h, !u && "x"), Ll.addEventListener("refresh", P), Vo(pa, "resize", P), y.smooth && (y.target.style.scrollBehavior = "auto", 
        y.smooth = _.smooth = !1), S.enable();
      }, e.onDisable = function() {
        Il(h, !0), $o(pa, "resize", P), Ll.removeEventListener("refresh", P), S.kill();
      }, e.lockAxis = !1 !== e.lockAxis, (t = new ca(e)).iOS = qa, qa && !y() && y(1), 
      qa && ua.ticker.add(no), l = t._dc, s = ua.to(t, {
        ease: "power4",
        paused: !0,
        inherit: !1,
        scrollX: u ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: Al(y, y(), (function() {
            return s.pause();
          }))
        },
        onUpdate: vl,
        onComplete: l.vars.onComplete
      }), t;
    };
    Ll.sort = function(e) {
      return Qo.sort(e || function(e, t) {
        return -1e6 * (e.vars.refreshPriority || 0) + e.start - (t.start + -1e6 * (t.vars.refreshPriority || 0));
      });
    }, Ll.observe = function(e) {
      return new ca(e);
    }, Ll.normalizeScroll = function(e) {
      if (void 0 === e) {
        return Oa;
      }
      if (!0 === e && Oa) {
        return Oa.enable();
      }
      if (!1 === e) {
        return Oa && Oa.kill(), void (Oa = e);
      }
      var t = e instanceof ca ? e : Nl(e);
      return Oa && Oa.target === t.target && Oa.kill(), lo(t.target) && (Oa = t), t;
    }, Ll.core = {
      _getVelocityProp: na,
      _inputObserver: Rl,
      _scrollers: Vs,
      _proxies: $s,
      bridge: {
        ss: function() {
          Qa || al("scrollStart"), Qa = Ua();
        },
        ref: function() {
          return Ta;
        }
      }
    }, oo() && ua.registerPlugin(Ll), Hi.registerPlugin(Ll);
    var Gl = r(348);
    Hi.registerPlugin(Ll);
    const Vl = ji.querySelector(".near");
    Hi.registerPlugin(Ll);
    let $l, Yl, Hl, Xl, jl, Wl, Ul, Kl, Ql, Zl, Jl, ec, tc, rc, ic;
    Hi.registerPlugin(Ll);
    Wl = ji.querySelector(".about"), Wl && ($l = Wl.querySelector(".about__title"), 
    Yl = Wl.querySelector(".about__subtitle"), Hl = Wl.querySelector(".about__text"), 
    Ul = Array.from(Wl.querySelectorAll(".about__item--up")), Kl = Array.from(Wl.querySelectorAll(".about__item--down")), 
    Ql = Wl.querySelectorAll(".about__list"), Xl = Wl.querySelector(".about__link"), 
    jl = Wl.querySelector(".picture__img"), rc = Hi.timeline({
      paused: !0
    }).fromTo(Ul, {
      autoAlpha: 1,
      y: "0"
    }, {
      autoAlpha: 0,
      y: "50",
      duration: 1
    }), ic = Hi.timeline({
      paused: !0
    }).fromTo(Kl, {
      autoAlpha: 1,
      y: "0"
    }, {
      autoAlpha: 0,
      y: "50",
      duration: 1
    }), Zl = Hi.timeline({
      paused: !0
    }).fromTo(Yl, {
      autoAlpha: 1,
      y: "0"
    }, {
      autoAlpha: 0,
      y: "50",
      duration: 1
    }), Jl = Hi.timeline({
      paused: !0
    }).fromTo(Hl, {
      autoAlpha: 1,
      y: "0"
    }, {
      autoAlpha: 0,
      y: "50",
      duration: 1
    }), ec = Hi.timeline({
      paused: !0
    }).fromTo(Xl, {
      autoAlpha: 1,
      y: "0"
    }, {
      autoAlpha: 0,
      y: "50",
      duration: 1
    }), tc = Hi.timeline({
      paused: !0
    }).fromTo(jl, {
      scale: 1
    }, {
      scale: .9,
      duration: 1
    }));
    const nc = ji.querySelector(".circle-cover__block--center");
    Hi.registerPlugin(Ll);
    const sc = ji.querySelector(".circle");
    let ac;
    const oc = new rs(".yard__slider", {
      enabled: !1,
      modules: [ as, ls, ns ],
      autoplay: {
        delay: 3e3
      },
      loop: !0,
      spaceBetween: 5,
      pagination: {
        el: ".yard__pagination",
        bulletClass: "pagination-bar__bullet",
        bulletActiveClass: "pagination-bar__bullet--active"
      },
      navigation: {
        nextEl: ".yard-touch__block--next",
        prevEl: ".yard-touch__block--prev"
      },
      speed: 2e3,
      on: {
        init: e => (e => {
          const t = e.pagination.bullets;
          ac = t.map(((e, r) => Hi.timeline({
            paused: !0
          }).set(t[r], {
            width: "1rem",
            marginRight: 0
          }).to(t[r], {
            marginRight: "4.6rem",
            duration: .01
          }).add("clear", "<").to(t[r], {
            width: "5.6rem",
            marginRight: 0,
            duration: 3
          }).add("ready", "<"))), ac[e.realIndex].play();
        })(e),
        realIndexChange: e => (e => {
          ac.forEach((e => {
            e.pause("clear");
          })), ac[e.realIndex].pause("ready");
        })(e),
        slideChangeTransitionEnd: e => (e => {
          ac[e.realIndex].play("ready");
        })(e)
      }
    });
    Hi.registerPlugin(Ll);
    const lc = ji.querySelector(".yard-touch"), cc = ji.querySelector(".aesthetics-touch"), uc = Array.from(ji.querySelectorAll(".aesthetics-touch")), dc = ji.querySelector(".choose__content");
    Hi.registerPlugin(Ll);
    const pc = ji.querySelector(".developer");
    Hi.registerPlugin(Ll);
    const fc = ji.querySelector(".aesthetics");
    Hi.registerPlugin(Ll);
    const hc = ji.querySelector(".choose"), mc = e => {
      const t = ji.querySelector(e);
      if (!t) {
        return;
      }
      const r = t.querySelectorAll(".tab-btn"), i = t.querySelectorAll(".tab-content");
      r.forEach((e => {
        e.addEventListener("click", (e => {
          Array.from(r).forEach((e => {
            e.classList.remove("selected");
          })), e.target.classList.add("selected");
          const t = e.target.dataset.tabContentId, n = document.getElementById(t);
          n && (Array.from(i).forEach((e => {
            e.classList.add("hidden");
          })), n.classList.remove("hidden"));
        }));
      }));
    }, gc = () => {
      if (!ji.querySelector("#map")) {
        return;
      }
      const e = new ymaps.Map("map", {
        center: [ 59.84347032994195, 30.938058359802223 ],
        zoom: 16,
        controls: []
      }), t = new ymaps.Placemark([ 59.842503, 30.938881 ], {}, {
        iconLayout: "default#image",
        iconImageHref: "/img/map-mark.png",
        iconImageSize: [ 80, 80 ],
        iconImageOffset: [ -15, -15 ]
      });
      e.controls.remove("geolocationControl"), e.controls.remove("searchControl"), e.controls.remove("trafficControl"), 
      e.controls.remove("typeSelector"), e.controls.remove("fullscreenControl"), e.controls.remove("zoomControl"), 
      e.behaviors.disable("scrollZoom"), e.geoObjects.add(t), fs > 768 || e.behaviors.disable("drag");
    }, vc = ji.querySelector(".choose__content"), yc = () => {
      window.location.assign("https://plan7.ru/catalog/adm/?page=zk&id=103&path=embed");
    };
    document.addEventListener("DOMContentLoaded", (() => {
      Ss.play().then((() => {
        ps.init(), ps.enable();
      })), mc(".dubrovka"), mc(".aesthetics"), Ui && Ui.addEventListener("click", Ji), 
      Wi && window.addEventListener("scroll", tn), gs(), vs.enable(), Array.from(ji.querySelectorAll(".js-aesthetics-tabs")).map(((e, t) => new rs(e, {
        modules: [ ns, os ],
        speed: 1e3,
        slidesPerView: "auto",
        loop: !0,
        spaceBetween: 5,
        navigation: {
          enabled: !0,
          nextEl: ".aesthetics-touch__block--next",
          prevEl: ".aesthetics-touch__block--prev"
        },
        allowTouchMove: !1,
        slidesOffsetBefore: 200,
        centeredSlides: !0,
        initialSlide: 3,
        scrollbar: {
          el: ".aesthetics-tab__scrollbar",
          draggable: !0
        },
        breakpoints: {
          320: {
            allowTouchMove: !0,
            initialSlide: 0,
            slidesPerView: "auto",
            slidesOffsetBefore: 0,
            centeredSlides: !1
          },
          769: {
            allowTouchMove: !1,
            initialSlide: 3,
            slidesPerView: "auto",
            slidesOffsetBefore: 200,
            centeredSlides: !0
          }
        },
        on: {
          slideChangeTransitionStart: bs,
          afterInit: _s,
          slideNextTransitionEnd: ws,
          slidePrevTransitionEnd: ws
        }
      }))), (() => {
        if (!Ts) {
          return;
        }
        Array.from(ji.querySelectorAll(".js-top")).forEach((e => {
          e.addEventListener("click", xs);
        }));
      })(), Array.from(ji.querySelectorAll(".promo-slide__link")).forEach((e => {
        e.addEventListener("click", (e => {
          e.preventDefault(), ji.querySelector(".choose").scrollIntoView({
            behavior: "smooth"
          });
        }));
      })), (() => {
        if (fs < 769) {
          return;
        }
        const e = ji.querySelector(".dubrovka__title");
        e && Hi.to(e, {
          scrollTrigger: {
            trigger: e,
            toggleActions: "play pause reverce pause",
            start: "top 70%"
          },
          width: fs > 1920 ? "68%" : fs > 1440 ? "90%" : "100%",
          duration: 1
        });
      })(), Array.from(ji.querySelectorAll(".near-indication__line")).forEach(((e, t) => {
        Hi.to(e, {
          scrollTrigger: {
            trigger: e,
            toggleActions: "play pause none pause",
            start: `top ${90 - 1 * t}%`,
            end: "+=300",
            once: !0,
            scrub: !0
          },
          width: "100%",
          duration: 5
        });
      })), (() => {
        const e = Array.from(ji.querySelectorAll(".location-flag__line")), t = ji.querySelector(".location");
        if (!t) {
          return;
        }
        const r = t.querySelector(".location-logo__figure"), i = t.querySelector(".location-logo__link");
        e.forEach(((e, r) => {
          const i = Hi.timeline({
            paused: !0
          }).fromTo(t.querySelector(`.location-flag__title--${r + 1}`), {
            autoAlpha: 1
          }, {
            autoAlpha: 0
          }).fromTo(e, {
            height: "100%"
          }, {
            height: 0
          }).play();
          Hi.to(e, {
            scrollTrigger: {
              trigger: t,
              toggleActions: "play none none pause",
              start: "top 60%",
              end: "+=100",
              onse: !0,
              onToggle: ({isActive: e}) => {
                e || i.reverse();
              }
            }
          });
        })), Hi.to(r, {
          scrollTrigger: {
            trigger: t,
            toggleActions: "play none none pause",
            start: "top 50%",
            end: "+=300"
          },
          scale: 1,
          duration: 1
        }), Hi.to(i, {
          scrollTrigger: {
            trigger: t,
            toggleActions: "play none none pause",
            start: "top 50%",
            end: "+=300"
          },
          autoAlpha: 1,
          duration: 1
        });
      })(), (() => {
        let e;
        $l && (Gl({
          target: $l,
          whitespace: !0,
          by: "chars"
        }), e = $l.querySelector(".word")), Ql && (rc.play(), ic.play(), Hi.to(Ql, {
          scrollTrigger: {
            trigger: Ql,
            toggleActions: "play none none pause",
            start: "top 90%",
            end: "+=100",
            once: !0,
            onToggle: ({isActive: e}) => {
              e || rc.reverse();
            }
          }
        }), Hi.to(Ql, {
          scrollTrigger: {
            trigger: Ql,
            toggleActions: "play none none pause",
            start: "top 80%",
            end: "+=100",
            once: !0,
            onToggle: ({isActive: e}) => {
              e || ic.reverse();
            }
          }
        })), Yl && (Zl.play(), Hi.to(Yl, {
          scrollTrigger: {
            trigger: Yl,
            toggleActions: "play none none pause",
            start: "top 100%",
            end: "+=100",
            once: !0,
            onToggle: ({isActive: e}) => {
              e || Zl.reverse();
            }
          }
        })), Hl && (Jl.play(), Hi.to(Hl, {
          scrollTrigger: {
            trigger: Hl,
            toggleActions: "play none none pause",
            start: "top 100%",
            end: "+=100",
            once: !0,
            onToggle: ({isActive: e}) => {
              e || Jl.reverse();
            }
          }
        })), Xl && (ec.play(), Hi.to(Xl, {
          scrollTrigger: {
            trigger: Xl,
            toggleActions: "play none none pause",
            start: "top 100%",
            end: "+=100",
            once: !0,
            onToggle: ({isActive: e}) => {
              e || ec.reverse();
            }
          }
        })), jl && (tc.play(), Hi.to(jl, {
          scrollTrigger: {
            trigger: jl,
            toggleActions: "play none none pause",
            start: "top 70%",
            end: "+=100",
            once: !0,
            onToggle: ({isActive: e}) => {
              e || tc.reverse();
            }
          }
        })), e && Hi.to(e, {
          scrollTrigger: {
            trigger: $l,
            toggleActions: "play pause reverce pause",
            start: "top 70%",
            once: !0
          },
          flexGrow: 0,
          duration: 1
        });
      })(), (() => {
        if (!nc) {
          return;
        }
        if (fs < 769) {
          return;
        }
        Array.from(nc.querySelectorAll(".circle-control__block")).forEach((e => {
          let t = 0, r = 0, i = 0, n = 0;
          const s = e.querySelector(".control");
          !function e() {
            i += .2 * (t - i), n += .2 * (r - n), s.style.left = i + "px", s.style.top = n + "px", 
            requestAnimationFrame(e);
          }(), e.addEventListener("mousemove", (function(e) {
            s.classList.add("circle-control__btn--active"), t = e.offsetX - 95, r = e.offsetY - 95;
          })), e.addEventListener("mouseleave", (function(e) {
            s.classList.remove("circle-control__btn--active");
          }));
        }));
      })(), (() => {
        if (!sc) {
          return;
        }
        const e = sc.querySelector(".title");
        if (!e) {
          return;
        }
        Array.from(e.querySelectorAll("span")).forEach((t => {
          const r = Hi.timeline({
            paused: !0
          }).fromTo(t, {
            backgroundPositionY: "100%"
          }, {
            backgroundPositionY: "200%",
            duration: 1
          }).fromTo(t, {
            y: 0
          }, {
            y: "100%",
            duration: 1
          }, "<");
          r.play(), Hi.to(e, {
            scrollTrigger: {
              trigger: sc,
              toggleActions: "play none none pause",
              start: "top 80%",
              end: "+=100",
              once: !0,
              onToggle: ({isActive: e}) => {
                e || r.reverse();
              }
            }
          });
        }));
      })(), (() => {
        const e = ji.querySelector(".yard");
        if (!e) {
          return;
        }
        const t = e.querySelector(".yard__title"), r = e.querySelector(".yard__text"), i = e.querySelector(".yard__cover"), n = e.querySelector(".yard__pagination"), s = Hi.timeline({
          paused: !0
        }).fromTo(t, {
          autoAlpha: 0,
          y: "200"
        }, {
          autoAlpha: 1,
          y: "0",
          duration: 1
        }).fromTo(r, {
          autoAlpha: 0,
          y: 200
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 1
        }, "<").to(i, {
          y: "100%",
          duration: 1
        }, "<").call((() => {
          oc.enable(), oc.slideNext(2e3);
        })).to(n, {
          autoAlpha: 1
        }), a = Hi.timeline({
          paused: !0
        }).to(i, {
          y: "100%",
          duration: 1
        }, "<").call((() => {
          oc.enable(), oc.slideNext(2e3);
        })).to(n, {
          autoAlpha: 1
        }), o = Hi.timeline({
          paused: !0
        }).fromTo(t, {
          autoAlpha: 0,
          y: "200"
        }, {
          autoAlpha: 1,
          y: "0",
          duration: 1
        }).fromTo(r, {
          autoAlpha: 0,
          y: 200
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 1
        }, "<");
        fs > 768 ? Hi.to(t, {
          scrollTrigger: {
            trigger: e,
            toggleActions: "play none none pause",
            start: "top 80%",
            end: "+=300",
            once: !0,
            onToggle: ({isActive: e}) => {
              e || s.play();
            }
          }
        }) : (Hi.to(t, {
          scrollTrigger: {
            trigger: e,
            toggleActions: "play none none pause",
            start: "top 90%",
            end: "+=200",
            once: !0,
            onToggle: ({isActive: e}) => {
              e || a.play();
            }
          }
        }), Hi.to(t, {
          scrollTrigger: {
            trigger: t,
            toggleActions: "play none none pause",
            start: "top 90%",
            end: "+=50",
            once: !0,
            markers: !0,
            onToggle: ({isActive: e}) => {
              e || o.play();
            }
          }
        }));
      })(), (() => {
        if (!lc) {
          return;
        }
        if (fs < 769) {
          return;
        }
        Array.from(lc.querySelectorAll(".yard-touch__block")).forEach((e => {
          let t = 0, r = 0, i = 0, n = 0;
          const s = e.querySelector(".control");
          !function e() {
            i += .2 * (t - i), n += .2 * (r - n), s.style.left = i + "px", s.style.top = n + "px", 
            requestAnimationFrame(e);
          }(), e.addEventListener("mousemove", (function(e) {
            s.classList.add("yard-touch__btn--active"), t = e.offsetX - 95, r = e.offsetY - 95;
          })), e.addEventListener("mouseleave", (function(e) {
            s.classList.remove("yard-touch__btn--active");
          }));
        }));
      })(), (() => {
        if (fs < 769) {
          return;
        }
        if (!cc) {
          return;
        }
        uc.map((e => Array.from(e.querySelectorAll(".aesthetics-touch__block")))).flat().forEach((e => {
          let t = 0, r = 0, i = 0, n = 0;
          const s = e.querySelector(".control");
          !function e() {
            i += .2 * (t - i), n += .2 * (r - n), s.style.left = i + "px", s.style.top = n + "px", 
            requestAnimationFrame(e);
          }(), e.addEventListener("mousemove", (function(e) {
            s.classList.add("aesthetics-touch__btn--active"), t = e.offsetX - 95, r = e.offsetY - 95;
          })), e.addEventListener("mouseleave", (function(e) {
            s.classList.remove("aesthetics-touch__btn--active");
          }));
        }));
      })(), (() => {
        if (!dc) {
          return;
        }
        if (fs < 769) {
          return;
        }
        Array.from(dc.querySelectorAll(".choose__control")).forEach((e => {
          let t = 0, r = 0, i = 0, n = 0;
          const s = e.querySelector(".control");
          !function e() {
            i += .2 * (t - i), n += .2 * (r - n), s.style.left = i + "px", s.style.top = n + "px", 
            requestAnimationFrame(e);
          }(), e.addEventListener("mousemove", (function(i) {
            s.classList.add("choose__circle--active"), e.classList.add("choose__control--active"), 
            t = i.offsetX - 95, r = i.offsetY - 95;
          })), e.addEventListener("mouseleave", (function(t) {
            s.classList.remove("choose__circle--active"), e.classList.remove("choose__control--active");
          }));
        }));
      })(), (() => {
        if (!pc) {
          return;
        }
        const e = pc.querySelector(".developer__title--" + (fs < 769 ? "tb" : "dt")), t = pc.querySelector(".developer-info__logo"), r = pc.querySelector(".developer__figure-cover"), i = pc.querySelector(".info-block"), n = pc.querySelector(".info-list"), s = Hi.timeline({
          paused: !0
        }).fromTo(r, {
          y: 0
        }, {
          y: "-100%",
          duration: .5
        }).fromTo(n, {
          y: 0,
          autoAlpha: 1
        }, {
          y: 100,
          autoAlpha: 0,
          duration: 1
        }).fromTo(i, {
          y: 0,
          autoAlpha: 1
        }, {
          y: 100,
          autoAlpha: 0,
          duration: 1
        }, "<"), a = Hi.timeline({
          paused: !0
        }).fromTo(e, {
          autoAlpha: 1,
          y: 0
        }, {
          autoAlpha: 0,
          y: 100,
          duration: .5
        }).fromTo(t, {
          autoAlpha: 1
        }, {
          autoAlpha: 0,
          duration: .5
        }, "<");
        a.play(), s.play(), Hi.to(e, {
          scrollTrigger: {
            trigger: pc,
            toggleActions: "play none none pause",
            start: fs < 769 ? "top 100%" : "top 60%",
            end: fs < 769 ? "+=200" : "+=300",
            once: !0,
            onToggle: ({isActive: e}) => {
              e || a.reverse();
            }
          }
        }), Hi.to(i, {
          scrollTrigger: {
            trigger: pc,
            toggleActions: "play none none pause",
            start: fs < 769 ? "top 80%" : "top 60%",
            end: fs < 769 ? "+=200" : "+=300",
            once: !0,
            onToggle: ({isActive: e}) => {
              e || s.reverse();
            }
          }
        });
      })(), (() => {
        const e = ji.querySelector(".aesthetics");
        if (!e) {
          return;
        }
        Array.from(e.querySelectorAll(".aesthetics-head__info")).forEach((e => {
          const t = e.querySelector(".aesthetics-head__mark"), r = t.parentNode, i = e.querySelector(".aesthetics-head__text"), n = Hi.timeline({
            paused: !0
          }).fromTo(i, {
            width: "11rem"
          }, {
            width: "0",
            duration: .5
          });
          n.play(), t.addEventListener("mousemove", (function() {
            r.classList.add("aesthetics-head__info--active"), n.reverse();
          })), t.addEventListener("mouseleave", (function() {
            r.classList.remove("aesthetics-head__info--active"), n.play();
          }));
        }));
      })(), (() => {
        if (!fc) {
          return;
        }
        const e = fc.querySelector(".aesthetics__title"), t = Hi.timeline({
          paused: !0
        }).fromTo(e, {
          backgroundPositionY: "100%"
        }, {
          backgroundPositionY: "200%",
          duration: 1
        }).fromTo(e, {
          y: 0
        }, {
          y: "100%",
          duration: 1
        }, "<");
        t.play(), Hi.to(e, {
          scrollTrigger: {
            trigger: e,
            toggleActions: "play pause reverce pause",
            start: fs < 769 ? "top 100%" : "top 80%",
            end: fs < 769 ? "+=200" : "+=300",
            once: !0,
            onToggle: ({isActive: e}) => {
              e || t.reverse();
            }
          },
          duration: 1
        });
      })(), (() => {
        if (!hc) {
          return;
        }
        if (fs < 769) {
          return;
        }
        const e = hc.querySelector(".choose__title");
        if (!e) {
          return;
        }
        const t = Hi.timeline().fromTo(e, {
          width: fs > 1920 ? "65%" : fs > 1439 ? "80%" : "100%"
        }, {
          width: "100%"
        });
        Hi.to(e, {
          scrollTrigger: {
            trigger: e,
            toggleActions: "play pause reverce pause",
            start: "top 70%",
            end: "+=100",
            once: !0,
            onToggle: ({isActive: e}) => {
              e || t.reverse();
            }
          }
        });
      })(), ymaps.ready(gc), (() => {
        if (!Vl) {
          return;
        }
        const e = Vl.querySelector(".near__inner");
        if (!e) {
          return;
        }
        const t = Hi.timeline().fromTo(e, {
          autoAlpha: 1
        }, {
          autoAlpha: 0,
          duration: .5
        });
        Hi.to(e, {
          scrollTrigger: {
            trigger: e,
            toggleActions: "play pause none pause",
            start: "top 70%",
            end: "+=100",
            once: !0,
            onToggle: ({isActive: e}) => {
              e || t.reverse();
            }
          }
        });
      })(), (() => {
        if (!vc) {
          return;
        }
        const e = vc.querySelector(".choose__left"), t = vc.querySelector(".choose__right"), r = vc.querySelector(".choose__bg");
        e.addEventListener("click", (i => {
          i.preventDefault(), Hi.timeline().to(e.querySelector(".choose-block"), {
            display: "none",
            duration: .1
          }).to(t.querySelector(".choose-block"), {
            display: "none",
            duration: .1
          }).fromTo(e, {
            width: "50%"
          }, {
            width: "100%",
            duration: 1
          }).fromTo(t, {
            width: "50%"
          }, {
            width: 0,
            duration: 1
          }, "<").to(r, {
            scale: 1.1,
            duration: 1
          }).then((() => {
            yc();
          }));
        })), t.addEventListener("click", (r => {
          r.preventDefault(), Hi.timeline().to(e.querySelector(".choose-block"), {
            display: "none",
            duration: .1
          }).fromTo(t, {
            width: "50%"
          }, {
            width: "100%",
            duration: 1
          }).fromTo(e, {
            width: "50%"
          }, {
            width: 0,
            duration: 1
          }, "<").then((() => {
            yc();
          }));
        }));
      })(), (() => {
        if (!Vl) {
          return;
        }
        const e = Vl.querySelector(".near-title");
        Gl({
          target: e,
          whitespace: !0,
          by: "chars"
        });
        const t = e.querySelector(".word");
        Hi.to(t, {
          scrollTrigger: {
            trigger: e,
            toggleActions: "play pause reverce pause",
            start: "top 70%",
            once: !0
          },
          flexGrow: 0,
          duration: 1
        });
      })();
    }));
  })();
})();