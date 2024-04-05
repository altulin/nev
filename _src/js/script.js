(() => {
  var e = {
    344: e => {
      var t, o, r;
      t = window, o = 0, r = function e(t, r) {
        var i = this, a = this, s = !1;
        if (Array.isArray(t)) {
          return !!t.length && t.map((function(t) {
            return new e(t, r);
          }));
        }
        var n = {
          init: function() {
            this.options = Object.assign({
              duration: 600,
              ariaEnabled: !0,
              collapse: !0,
              showMultiple: !1,
              onlyChildNodes: !0,
              openOnInit: [],
              elementClass: "ac",
              triggerClass: "ac-trigger",
              panelClass: "ac-panel",
              activeClass: "is-active",
              beforeOpen: function() {},
              onOpen: function() {},
              beforeClose: function() {},
              onClose: function() {}
            }, r);
            var e = "string" == typeof t;
            this.container = e ? document.querySelector(t) : t, this.createDefinitions(), a.attachEvents();
          },
          createDefinitions: function() {
            var e = this, t = this.options, r = t.elementClass, i = t.openOnInit, a = t.onlyChildNodes ? this.container.childNodes : this.container.querySelectorAll(d(r));
            this.elements = Array.from(a).filter((function(e) {
              return e.classList && e.classList.contains(r);
            })), this.firstElement = this.elements[0], this.lastElement = this.elements[this.elements.length - 1], 
            this.elements.filter((function(e) {
              return !e.classList.contains("js-enabled");
            })).forEach((function(t) {
              t.classList.add("js-enabled"), e.generateIDs(t), e.setARIA(t), e.setTransition(t);
              var r = e.elements.indexOf(t);
              o++, i.includes(r) ? e.showElement(t, !1) : e.closeElement(t, !1);
            }));
          },
          setTransition: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], o = this.options, r = o.duration, i = o.panelClass, a = e.querySelector(d(i)), s = l("transitionDuration");
            a.style[s] = t ? null : "".concat(r, "ms");
          },
          generateIDs: function(e) {
            var t = this.options, r = t.triggerClass, i = t.panelClass, a = e.querySelector(d(r)), s = e.querySelector(d(i));
            e.setAttribute("id", e.id || "ac-".concat(o)), a.setAttribute("id", a.id || "ac-trigger-".concat(o)), 
            s.setAttribute("id", s.id || "ac-panel-".concat(o));
          },
          removeIDs: function(e) {
            var t = this.options, o = t.triggerClass, r = t.panelClass, i = e.querySelector(d(o)), a = e.querySelector(d(r));
            e.id.startsWith("ac-") && e.removeAttribute("id"), i.id.startsWith("ac-") && i.removeAttribute("id"), 
            a.id.startsWith("ac-") && a.removeAttribute("id");
          },
          setARIA: function(e) {
            var t = this.options, o = t.ariaEnabled, r = t.triggerClass, i = t.panelClass;
            if (o) {
              var a = e.querySelector(d(r)), s = e.querySelector(d(i));
              a.setAttribute("role", "button"), a.setAttribute("aria-controls", s.id), a.setAttribute("aria-disabled", !1), 
              a.setAttribute("aria-expanded", !1), s.setAttribute("role", "region"), s.setAttribute("aria-labelledby", a.id);
            }
          },
          updateARIA: function(e, t) {
            var o = t.ariaExpanded, r = t.ariaDisabled, i = this.options, a = i.ariaEnabled, s = i.triggerClass;
            if (a) {
              var n = e.querySelector(d(s));
              n.setAttribute("aria-expanded", o), n.setAttribute("aria-disabled", r);
            }
          },
          removeARIA: function(e) {
            var t = this.options, o = t.ariaEnabled, r = t.triggerClass, i = t.panelClass;
            if (o) {
              var a = e.querySelector(d(r)), s = e.querySelector(d(i));
              a.removeAttribute("role"), a.removeAttribute("aria-controls"), a.removeAttribute("aria-disabled"), 
              a.removeAttribute("aria-expanded"), s.removeAttribute("role"), s.removeAttribute("aria-labelledby");
            }
          },
          focus: function(e, t) {
            e.preventDefault();
            var o = this.options.triggerClass;
            t.querySelector(d(o)).focus();
          },
          focusFirstElement: function(e) {
            this.focus(e, this.firstElement), this.currFocusedIdx = 0;
          },
          focusLastElement: function(e) {
            this.focus(e, this.lastElement), this.currFocusedIdx = this.elements.length - 1;
          },
          focusNextElement: function(e) {
            var t = this.currFocusedIdx + 1;
            if (t > this.elements.length - 1) {
              return this.focusFirstElement(e);
            }
            this.focus(e, this.elements[t]), this.currFocusedIdx = t;
          },
          focusPrevElement: function(e) {
            var t = this.currFocusedIdx - 1;
            if (t < 0) {
              return this.focusLastElement(e);
            }
            this.focus(e, this.elements[t]), this.currFocusedIdx = t;
          },
          showElement: function(e) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], o = this.options, r = o.panelClass, i = o.activeClass, a = o.collapse, s = o.beforeOpen;
            t && s(e);
            var n = e.querySelector(d(r)), l = n.scrollHeight;
            e.classList.add(i), requestAnimationFrame((function() {
              requestAnimationFrame((function() {
                n.style.height = t ? "".concat(l, "px") : "auto";
              }));
            })), this.updateARIA(e, {
              ariaExpanded: !0,
              ariaDisabled: !a
            });
          },
          closeElement: function(e) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], o = this.options, r = o.panelClass, i = o.activeClass, a = o.beforeClose, s = e.querySelector(d(r)), n = s.scrollHeight;
            e.classList.remove(i), t ? (a(e), requestAnimationFrame((function() {
              s.style.height = "".concat(n, "px"), requestAnimationFrame((function() {
                s.style.height = 0;
              }));
            }))) : s.style.height = 0, this.updateARIA(e, {
              ariaExpanded: !1,
              ariaDisabled: !1
            });
          },
          toggleElement: function(e) {
            var t = this.options, o = t.activeClass, r = t.collapse, i = e.classList.contains(o);
            if (!i || r) {
              return i ? this.closeElement(e) : this.showElement(e);
            }
          },
          closeElements: function() {
            var e = this, t = this.options, o = t.activeClass;
            t.showMultiple || this.elements.forEach((function(t, r) {
              t.classList.contains(o) && r !== e.currFocusedIdx && e.closeElement(t);
            }));
          },
          handleClick: function(e) {
            var t = this, o = e.currentTarget;
            this.elements.forEach((function(r, i) {
              r.contains(o) && "A" !== e.target.nodeName && (t.currFocusedIdx = i, t.closeElements(), 
              t.focus(e, r), t.toggleElement(r));
            }));
          },
          handleKeydown: function(e) {
            switch (e.key) {
             case "ArrowUp":
              return this.focusPrevElement(e);

             case "ArrowDown":
              return this.focusNextElement(e);

             case "Home":
              return this.focusFirstElement(e);

             case "End":
              return this.focusLastElement(e);

             default:
              return null;
            }
          },
          handleFocus: function(e) {
            var t = e.currentTarget, o = this.elements.find((function(e) {
              return e.contains(t);
            }));
            this.currFocusedIdx = this.elements.indexOf(o);
          },
          handleTransitionEnd: function(e) {
            if (e.stopPropagation(), "height" === e.propertyName) {
              var t = this.options, o = t.onOpen, r = t.onClose, i = e.currentTarget, a = parseInt(i.style.height), s = this.elements.find((function(e) {
                return e.contains(i);
              }));
              a > 0 ? (i.style.height = "auto", o(s)) : r(s);
            }
          }
        };
        this.attachEvents = function() {
          if (!s) {
            var e = n.options, t = e.triggerClass, o = e.panelClass;
            n.handleClick = n.handleClick.bind(n), n.handleKeydown = n.handleKeydown.bind(n), 
            n.handleFocus = n.handleFocus.bind(n), n.handleTransitionEnd = n.handleTransitionEnd.bind(n), 
            n.elements.forEach((function(e) {
              var r = e.querySelector(d(t)), i = e.querySelector(d(o));
              r.addEventListener("click", n.handleClick), r.addEventListener("keydown", n.handleKeydown), 
              r.addEventListener("focus", n.handleFocus), i.addEventListener("webkitTransitionEnd", n.handleTransitionEnd), 
              i.addEventListener("transitionend", n.handleTransitionEnd);
            })), s = !0;
          }
        }, this.detachEvents = function() {
          if (s) {
            var e = n.options, t = e.triggerClass, o = e.panelClass;
            n.elements.forEach((function(e) {
              var r = e.querySelector(d(t)), i = e.querySelector(d(o));
              r.removeEventListener("click", n.handleClick), r.removeEventListener("keydown", n.handleKeydown), 
              r.removeEventListener("focus", n.handleFocus), i.removeEventListener("webkitTransitionEnd", n.handleTransitionEnd), 
              i.removeEventListener("transitionend", n.handleTransitionEnd);
            })), s = !1;
          }
        }, this.toggle = function(e) {
          var t = n.elements[e];
          t && n.toggleElement(t);
        }, this.open = function(e) {
          var t = n.elements[e];
          t && n.showElement(t);
        }, this.openAll = function() {
          var e = n.options, t = e.activeClass, o = e.onOpen;
          n.elements.forEach((function(e) {
            e.classList.contains(t) || (n.showElement(e, !1), o(e));
          }));
        }, this.close = function(e) {
          var t = n.elements[e];
          t && n.closeElement(t);
        }, this.closeAll = function() {
          var e = n.options, t = e.activeClass, o = e.onClose;
          n.elements.forEach((function(e) {
            e.classList.contains(t) && (n.closeElement(e, !1), o(e));
          }));
        }, this.destroy = function() {
          i.detachEvents(), i.openAll(), n.elements.forEach((function(e) {
            n.removeIDs(e), n.removeARIA(e), n.setTransition(e, !0);
          })), s = !0;
        }, this.update = function() {
          n.createDefinitions(), i.detachEvents(), i.attachEvents();
        };
        var l = function(e) {
          return "string" == typeof document.documentElement.style[e] ? e : (e = c(e), e = "webkit".concat(e));
        }, c = function(e) {
          return e.charAt(0).toUpperCase() + e.slice(1);
        }, d = function(e) {
          return ".".concat(CSS.escape(e));
        };
        n.init();
      }, void 0 !== e.exports ? e.exports = r : t.Accordion = r;
    },
    716: function(e, t) {
      !function(e) {
        "use strict";
        /*!
	 * ScrollToPlugin 3.12.5
	 * https://gsap.com
	 *
	 * @license Copyright 2008-2024, GreenSock. All rights reserved.
	 * Subject to the terms at https://gsap.com/standard-license or for
	 * Club GSAP members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/        var t, o, r, i, a, s, n, l, c = function() {
          return "undefined" != typeof window;
        }, d = function() {
          return t || c() && (t = window.gsap) && t.registerPlugin && t;
        }, f = function(e) {
          return "string" == typeof e;
        }, u = function(e) {
          return "function" == typeof e;
        }, p = function(e, t) {
          var o = "x" === t ? "Width" : "Height", s = "scroll" + o, n = "client" + o;
          return e === r || e === i || e === a ? Math.max(i[s], a[s]) - (r["inner" + o] || i[n] || a[n]) : e[s] - e["offset" + o];
        }, m = function(e, t) {
          var o = "scroll" + ("x" === t ? "Left" : "Top");
          return e === r && (null != e.pageXOffset ? o = "page" + t.toUpperCase() + "Offset" : e = null != i[o] ? i : a), 
          function() {
            return e[o];
          };
        }, h = function(e, t, o, r) {
          if (u(e) && (e = e(t, o, r)), "object" != typeof e) {
            return f(e) && "max" !== e && "=" !== e.charAt(1) ? {
              x: e,
              y: e
            } : {
              y: e
            };
          }
          if (e.nodeType) {
            return {
              y: e,
              x: e
            };
          }
          var i, a = {};
          for (i in e) {
            a[i] = "onAutoKill" !== i && u(e[i]) ? e[i](t, o, r) : e[i];
          }
          return a;
        }, g = function(e, t) {
          if (!(e = s(e)[0]) || !e.getBoundingClientRect) {
            return console.warn("scrollTo target doesn't exist. Using 0") || {
              x: 0,
              y: 0
            };
          }
          var o = e.getBoundingClientRect(), n = !t || t === r || t === a, l = n ? {
            top: i.clientTop - (r.pageYOffset || i.scrollTop || a.scrollTop || 0),
            left: i.clientLeft - (r.pageXOffset || i.scrollLeft || a.scrollLeft || 0)
          } : t.getBoundingClientRect(), c = {
            x: o.left - l.left,
            y: o.top - l.top
          };
          return !n && t && (c.x += m(t, "x")(), c.y += m(t, "y")()), c;
        }, y = function(e, t, o, r, i) {
          return isNaN(e) || "object" == typeof e ? f(e) && "=" === e.charAt(1) ? parseFloat(e.substr(2)) * ("-" === e.charAt(0) ? -1 : 1) + r - i : "max" === e ? p(t, o) - i : Math.min(p(t, o), g(e, t)[o] - i) : parseFloat(e) - i;
        }, v = function() {
          t = d(), c() && t && "undefined" != typeof document && document.body && (r = window, 
          a = document.body, i = document.documentElement, s = t.utils.toArray, t.config({
            autoKillThreshold: 7
          }), n = t.config(), o = 1);
        }, z = {
          version: "3.12.5",
          name: "scrollTo",
          rawVars: 1,
          register: function(e) {
            t = e, v();
          },
          init: function(e, i, a, s, n) {
            o || v();
            var c = this, d = t.getProperty(e, "scrollSnapType");
            c.isWin = e === r, c.target = e, c.tween = a, i = h(i, s, e, n), c.vars = i, c.autoKill = !!i.autoKill, 
            c.getX = m(e, "x"), c.getY = m(e, "y"), c.x = c.xPrev = c.getX(), c.y = c.yPrev = c.getY(), 
            l || (l = t.core.globals().ScrollTrigger), "smooth" === t.getProperty(e, "scrollBehavior") && t.set(e, {
              scrollBehavior: "auto"
            }), d && "none" !== d && (c.snap = 1, c.snapInline = e.style.scrollSnapType, e.style.scrollSnapType = "none"), 
            null != i.x ? (c.add(c, "x", c.x, y(i.x, e, "x", c.x, i.offsetX || 0), s, n), c._props.push("scrollTo_x")) : c.skipX = 1, 
            null != i.y ? (c.add(c, "y", c.y, y(i.y, e, "y", c.y, i.offsetY || 0), s, n), c._props.push("scrollTo_y")) : c.skipY = 1;
          },
          render: function(e, t) {
            for (var o, i, a, s, c, d = t._pt, f = t.target, u = t.tween, m = t.autoKill, h = t.xPrev, g = t.yPrev, y = t.isWin, v = t.snap, z = t.snapInline; d; ) {
              d.r(e, d.d), d = d._next;
            }
            o = y || !t.skipX ? t.getX() : h, a = (i = y || !t.skipY ? t.getY() : g) - g, s = o - h, 
            c = n.autoKillThreshold, t.x < 0 && (t.x = 0), t.y < 0 && (t.y = 0), m && (!t.skipX && (s > c || s < -c) && o < p(f, "x") && (t.skipX = 1), 
            !t.skipY && (a > c || a < -c) && i < p(f, "y") && (t.skipY = 1), t.skipX && t.skipY && (u.kill(), 
            t.vars.onAutoKill && t.vars.onAutoKill.apply(u, t.vars.onAutoKillParams || []))), 
            y ? r.scrollTo(t.skipX ? o : t.x, t.skipY ? i : t.y) : (t.skipY || (f.scrollTop = t.y), 
            t.skipX || (f.scrollLeft = t.x)), !v || 1 !== e && 0 !== e || (i = f.scrollTop, 
            o = f.scrollLeft, z ? f.style.scrollSnapType = z : f.style.removeProperty("scroll-snap-type"), 
            f.scrollTop = i + 1, f.scrollLeft = o + 1, f.scrollTop = i, f.scrollLeft = o), t.xPrev = t.x, 
            t.yPrev = t.y, l && l.update();
          },
          kill: function(e) {
            var t = "scrollTo" === e, o = this._props.indexOf(e);
            return (t || "scrollTo_x" === e) && (this.skipX = 1), (t || "scrollTo_y" === e) && (this.skipY = 1), 
            o > -1 && this._props.splice(o, 1), !this._props.length;
          }
        };
        z.max = p, z.getOffset = g, z.buildGetter = m, d() && t.registerPlugin(z), e.ScrollToPlugin = z, 
        e.default = z, Object.defineProperty(e, "__esModule", {
          value: !0
        });
      }(t);
    },
    348: function(e) {
      e.exports = function() {
        "use strict";
        var e = document, t = e.createTextNode.bind(e);
        function o(e, t, o) {
          e.style.setProperty(t, o);
        }
        function r(e, t) {
          return e.appendChild(t);
        }
        function i(t, o, i, a) {
          var s = e.createElement("span");
          return o && (s.className = o), i && (!a && s.setAttribute("data-" + o, i), s.textContent = i), 
          t && r(t, s) || s;
        }
        function a(e, t) {
          return e.getAttribute("data-" + t);
        }
        function s(t, o) {
          return t && 0 != t.length ? t.nodeName ? [ t ] : [].slice.call(t[0].nodeName ? t : (o || e).querySelectorAll(t)) : [];
        }
        function n(e) {
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
        function d(e, t, r) {
          var i = "--" + t, a = i + "-index";
          l(r, (function(e, t) {
            Array.isArray(e) ? l(e, (function(e) {
              o(e, a, t);
            })) : o(e, a, t);
          })), o(e, i + "-total", r.length);
        }
        var f = {};
        function u(e, t, o) {
          var r = o.indexOf(e);
          if (-1 == r) {
            o.unshift(e), l(f[e].depends, (function(t) {
              u(t, e, o);
            }));
          } else {
            var i = o.indexOf(t);
            o.splice(r, 1), o.splice(i, 0, e);
          }
          return o;
        }
        function p(e, t, o, r) {
          return {
            by: e,
            depends: t,
            key: o,
            split: r
          };
        }
        function m(e) {
          return u(e, 0, []).map(c(f));
        }
        function h(e) {
          f[e.by] = e;
        }
        function g(e, o, a, n, c) {
          e.normalize();
          var d = [], f = document.createDocumentFragment();
          n && d.push(e.previousSibling);
          var u = [];
          return s(e.childNodes).some((function(e) {
            if (!e.tagName || e.hasChildNodes()) {
              if (e.childNodes && e.childNodes.length) {
                return u.push(e), void d.push.apply(d, g(e, o, a, n, c));
              }
              var r = e.wholeText || "", s = r.trim();
              s.length && (" " === r[0] && u.push(t(" ")), l(s.split(a), (function(e, t) {
                t && c && u.push(i(f, "whitespace", " ", c));
                var r = i(f, o, e);
                d.push(r), u.push(r);
              })), " " === r[r.length - 1] && u.push(t(" ")));
            } else {
              u.push(e);
            }
          })), l(u, (function(e) {
            r(f, e);
          })), e.innerHTML = "", r(e, f), d;
        }
        var y = 0;
        function v(e, t) {
          for (var o in t) {
            e[o] = t[o];
          }
          return e;
        }
        var z = "words", b = p(z, y, "word", (function(e) {
          return g(e, "word", /\s+/, 0, 1);
        })), _ = "chars", w = p(_, [ z ], "char", (function(e, t, o) {
          var r = [];
          return l(o[z], (function(e, o) {
            r.push.apply(r, g(e, "char", "", t.whitespace && o));
          })), r;
        }));
        function x(e) {
          var t = (e = e || {}).key;
          return s(e.target || "[data-splitting]").map((function(o) {
            var r = o["🍌"];
            if (!e.force && r) {
              return r;
            }
            r = o["🍌"] = {
              el: o
            };
            var i = m(e.by || a(o, "splitting") || _), s = v({}, e);
            return l(i, (function(e) {
              if (e.split) {
                var i = e.by, a = (t ? "-" + t : "") + e.key, n = e.split(o, s, r);
                a && d(o, a, n), r[i] = n, o.classList.add(i);
              }
            })), o.classList.add("splitting"), r;
          }));
        }
        function T(e) {
          var t = (e = e || {}).target = i();
          return t.innerHTML = e.content, x(e), t.outerHTML;
        }
        function S(e, t, o) {
          var r = s(t.matching || e.children, e), i = {};
          return l(r, (function(e) {
            var t = Math.round(e[o]);
            (i[t] || (i[t] = [])).push(e);
          })), Object.keys(i).map(Number).sort(E).map(c(i));
        }
        function E(e, t) {
          return e - t;
        }
        x.html = T, x.add = h;
        var C = p("lines", [ z ], "line", (function(e, t, o) {
          return S(e, {
            matching: o[z]
          }, "offsetTop");
        })), A = p("items", y, "item", (function(e, t) {
          return s(t.matching || e.children, e);
        })), k = p("rows", y, "row", (function(e, t) {
          return S(e, t, "offsetTop");
        })), M = p("cols", y, "col", (function(e, t) {
          return S(e, t, "offsetLeft");
        })), P = p("grid", [ "rows", "cols" ]), L = "layout", O = p(L, y, y, (function(e, t) {
          var n = t.rows = +(t.rows || a(e, "rows") || 1), l = t.columns = +(t.columns || a(e, "columns") || 1);
          if (t.image = t.image || a(e, "image") || e.currentSrc || e.src, t.image) {
            var c = s("img", e)[0];
            t.image = c && (c.currentSrc || c.src);
          }
          t.image && o(e, "background-image", "url(" + t.image + ")");
          for (var d = n * l, f = [], u = i(y, "cell-grid"); d--; ) {
            var p = i(u, "cell");
            i(p, "cell-inner"), f.push(p);
          }
          return r(e, u), f;
        })), I = p("cellRows", [ L ], "row", (function(e, t, o) {
          var r = t.rows, i = n(r);
          return l(o[L], (function(e, t, o) {
            i[Math.floor(t / (o.length / r))].push(e);
          })), i;
        })), D = p("cellColumns", [ L ], "col", (function(e, t, o) {
          var r = t.columns, i = n(r);
          return l(o[L], (function(e, t) {
            i[t % r].push(e);
          })), i;
        })), q = p("cells", [ "cellRows", "cellColumns" ], "cell", (function(e, t, o) {
          return o[L];
        }));
        return h(b), h(w), h(C), h(A), h(k), h(M), h(P), h(O), h(I), h(D), h(q), x;
      }();
    }
  }, t = {};
  function o(r) {
    var i = t[r];
    if (void 0 !== i) {
      return i.exports;
    }
    var a = t[r] = {
      exports: {}
    };
    return e[r].call(a.exports, a, a.exports, o), a.exports;
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
*/    var r, i, a, s, n, l, c, d, f, u, p, m, h, g, y, v = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: {
        lineHeight: ""
      }
    }, z = {
      duration: .5,
      overwrite: !1,
      delay: 0
    }, b = 1e8, _ = 1e-8, w = 2 * Math.PI, x = w / 4, T = 0, S = Math.sqrt, E = Math.cos, C = Math.sin, A = function(e) {
      return "string" == typeof e;
    }, k = function(e) {
      return "function" == typeof e;
    }, M = function(e) {
      return "number" == typeof e;
    }, P = function(e) {
      return void 0 === e;
    }, L = function(e) {
      return "object" == typeof e;
    }, O = function(e) {
      return !1 !== e;
    }, I = function() {
      return "undefined" != typeof window;
    }, D = function(e) {
      return k(e) || A(e);
    }, q = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function() {}, F = Array.isArray, R = /(?:-?\.?\d|\.)+/gi, B = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, N = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, G = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Y = /[+-]=-?[.\d]+/, $ = /[^,'"\[\]\s]+/gi, V = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, H = {}, X = {}, j = function(e) {
      return (X = we(e, H)) && To;
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
    }, te = {}, oe = [], re = {}, ie = {}, ae = {}, se = 30, ne = [], le = "", ce = function(e) {
      var t, o, r = e[0];
      if (L(r) || k(r) || (e = [ e ]), !(t = (r._gsap || {}).harness)) {
        for (o = ne.length; o-- && !ne[o].targetTest(r); ) {}
        t = ne[o];
      }
      for (o = e.length; o--; ) {
        e[o] && (e[o]._gsap || (e[o]._gsap = new Ft(e[o], t))) || e.splice(o, 1);
      }
      return e;
    }, de = function(e) {
      return e._gsap || ce(et(e))[0]._gsap;
    }, fe = function(e, t, o) {
      return (o = e[t]) && k(o) ? e[t]() : P(o) && e.getAttribute && e.getAttribute(t) || o;
    }, ue = function(e, t) {
      return (e = e.split(",")).forEach(t) || e;
    }, pe = function(e) {
      return Math.round(1e5 * e) / 1e5 || 0;
    }, me = function(e) {
      return Math.round(1e7 * e) / 1e7 || 0;
    }, he = function(e, t) {
      var o = t.charAt(0), r = parseFloat(t.substr(2));
      return e = parseFloat(e), "+" === o ? e + r : "-" === o ? e - r : "*" === o ? e * r : e / r;
    }, ge = function(e, t) {
      for (var o = t.length, r = 0; e.indexOf(t[r]) < 0 && ++r < o; ) {}
      return r < o;
    }, ye = function() {
      var e, t, o = oe.length, r = oe.slice(0);
      for (re = {}, oe.length = 0, e = 0; e < o; e++) {
        (t = r[e]) && t._lazy && (t.render(t._lazy[0], t._lazy[1], !0)._lazy = 0);
      }
    }, ve = function(e, t, o, r) {
      oe.length && !i && ye(), e.render(t, o, r || i && t < 0 && (e._initted || e._startAt)), 
      oe.length && !i && ye();
    }, ze = function(e) {
      var t = parseFloat(e);
      return (t || 0 === t) && (e + "").match($).length < 2 ? t : A(e) ? e.trim() : e;
    }, be = function(e) {
      return e;
    }, _e = function(e, t) {
      for (var o in t) {
        o in e || (e[o] = t[o]);
      }
      return e;
    }, we = function(e, t) {
      for (var o in t) {
        e[o] = t[o];
      }
      return e;
    }, xe = function e(t, o) {
      for (var r in o) {
        "__proto__" !== r && "constructor" !== r && "prototype" !== r && (t[r] = L(o[r]) ? e(t[r] || (t[r] = {}), o[r]) : o[r]);
      }
      return t;
    }, Te = function(e, t) {
      var o, r = {};
      for (o in e) {
        o in t || (r[o] = e[o]);
      }
      return r;
    }, Se = function(e) {
      var t, o = e.parent || s, r = e.keyframes ? (t = F(e.keyframes), function(e, o) {
        for (var r in o) {
          r in e || "duration" === r && t || "ease" === r || (e[r] = o[r]);
        }
      }) : _e;
      if (O(e.inherit)) {
        for (;o; ) {
          r(e, o.vars.defaults), o = o.parent || o._dp;
        }
      }
      return e;
    }, Ee = function(e, t, o, r, i) {
      void 0 === o && (o = "_first"), void 0 === r && (r = "_last");
      var a, s = e[r];
      if (i) {
        for (a = t[i]; s && s[i] > a; ) {
          s = s._prev;
        }
      }
      return s ? (t._next = s._next, s._next = t) : (t._next = e[o], e[o] = t), t._next ? t._next._prev = t : e[r] = t, 
      t._prev = s, t.parent = t._dp = e, t;
    }, Ce = function(e, t, o, r) {
      void 0 === o && (o = "_first"), void 0 === r && (r = "_last");
      var i = t._prev, a = t._next;
      i ? i._next = a : e[o] === t && (e[o] = a), a ? a._prev = i : e[r] === t && (e[r] = i), 
      t._next = t._prev = t.parent = null;
    }, Ae = function(e, t) {
      e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), 
      e._act = 0;
    }, ke = function(e, t) {
      if (e && (!t || t._end > e._dur || t._start < 0)) {
        for (var o = e; o; ) {
          o._dirty = 1, o = o.parent;
        }
      }
      return e;
    }, Me = function(e, t, o, r) {
      return e._startAt && (i ? e._startAt.revert(J) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, r));
    }, Pe = function e(t) {
      return !t || t._ts && e(t.parent);
    }, Le = function(e) {
      return e._repeat ? Oe(e._tTime, e = e.duration() + e._rDelay) * e : 0;
    }, Oe = function(e, t) {
      var o = Math.floor(e /= t);
      return e && o === e ? o - 1 : o;
    }, Ie = function(e, t) {
      return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
    }, De = function(e) {
      return e._end = me(e._start + (e._tDur / Math.abs(e._ts || e._rts || _) || 0));
    }, qe = function(e, t) {
      var o = e._dp;
      return o && o.smoothChildTiming && e._ts && (e._start = me(o._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), 
      De(e), o._dirty || ke(o, e)), e;
    }, Fe = function(e, t) {
      var o;
      if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (o = Ie(e.rawTime(), t), 
      (!t._dur || Ue(0, t.totalDuration(), o) - t._tTime > _) && t.render(o, !0)), ke(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
        if (e._dur < e.duration()) {
          for (o = e; o._dp; ) {
            o.rawTime() >= 0 && o.totalTime(o._tTime), o = o._dp;
          }
        }
        e._zTime = -1e-8;
      }
    }, Re = function(e, t, o, r) {
      return t.parent && Ae(t), t._start = me((M(o) ? o : o || e !== s ? Xe(e, o, t) : e._time) + t._delay), 
      t._end = me(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), Ee(e, t, "_first", "_last", e._sort ? "_start" : 0), 
      Ye(t) || (e._recent = t), r || Fe(e, t), e._ts < 0 && qe(e, e._tTime), e;
    }, Be = function(e, t) {
      return (H.ScrollTrigger || W("scrollTrigger", t)) && H.ScrollTrigger.create(t, e);
    }, Ne = function(e, t, o, r, a) {
      return Ht(e, t, a), e._initted ? !o && e._pt && !i && (e._dur && !1 !== e.vars.lazy || !e._dur && e.vars.lazy) && f !== Tt.frame ? (oe.push(e), 
      e._lazy = [ a, r ], 1) : void 0 : 1;
    }, Ge = function e(t) {
      var o = t.parent;
      return o && o._ts && o._initted && !o._lock && (o.rawTime() < 0 || e(o));
    }, Ye = function(e) {
      var t = e.data;
      return "isFromStart" === t || "isStart" === t;
    }, $e = function(e, t, o, r) {
      var i = e._repeat, a = me(t) || 0, s = e._tTime / e._tDur;
      return s && !r && (e._time *= a / e._dur), e._dur = a, e._tDur = i ? i < 0 ? 1e10 : me(a * (i + 1) + e._rDelay * i) : a, 
      s > 0 && !r && qe(e, e._tTime = e._tDur * s), e.parent && De(e), o || ke(e.parent, e), 
      e;
    }, Ve = function(e) {
      return e instanceof Bt ? ke(e) : $e(e, e._dur);
    }, He = {
      _start: 0,
      endTime: Q,
      totalDuration: Q
    }, Xe = function e(t, o, r) {
      var i, a, s, n = t.labels, l = t._recent || He, c = t.duration() >= b ? l.endTime(!1) : t._dur;
      return A(o) && (isNaN(o) || o in n) ? (a = o.charAt(0), s = "%" === o.substr(-1), 
      i = o.indexOf("="), "<" === a || ">" === a ? (i >= 0 && (o = o.replace(/=/, "")), 
      ("<" === a ? l._start : l.endTime(l._repeat >= 0)) + (parseFloat(o.substr(1)) || 0) * (s ? (i < 0 ? l : r).totalDuration() / 100 : 1)) : i < 0 ? (o in n || (n[o] = c), 
      n[o]) : (a = parseFloat(o.charAt(i - 1) + o.substr(i + 1)), s && r && (a = a / 100 * (F(r) ? r[0] : r).totalDuration()), 
      i > 1 ? e(t, o.substr(0, i - 1), r) + a : c + a)) : null == o ? c : +o;
    }, je = function(e, t, o) {
      var r, i, a = M(t[1]), s = (a ? 2 : 1) + (e < 2 ? 0 : 1), n = t[s];
      if (a && (n.duration = t[1]), n.parent = o, e) {
        for (r = n, i = o; i && !("immediateRender" in r); ) {
          r = i.vars.defaults || {}, i = O(i.vars.inherit) && i.parent;
        }
        n.immediateRender = O(r.immediateRender), e < 2 ? n.runBackwards = 1 : n.startAt = t[s - 1];
      }
      return new Kt(t[0], n, t[s + 1]);
    }, We = function(e, t) {
      return e || 0 === e ? t(e) : t;
    }, Ue = function(e, t, o) {
      return o < e ? e : o > t ? t : o;
    }, Ke = function(e, t) {
      return A(e) && (t = V.exec(e)) ? t[1] : "";
    }, Qe = [].slice, Ze = function(e, t) {
      return e && L(e) && "length" in e && (!t && !e.length || e.length - 1 in e && L(e[0])) && !e.nodeType && e !== n;
    }, Je = function(e, t, o) {
      return void 0 === o && (o = []), e.forEach((function(e) {
        var r;
        return A(e) && !t || Ze(e, 1) ? (r = o).push.apply(r, et(e)) : o.push(e);
      })) || o;
    }, et = function(e, t, o) {
      return a && !t && a.selector ? a.selector(e) : !A(e) || o || !l && St() ? F(e) ? Je(e, o) : Ze(e) ? Qe.call(e, 0) : e ? [ e ] : [] : Qe.call((t || c).querySelectorAll(e), 0);
    }, tt = function(e) {
      return e = et(e)[0] || U("Invalid scope") || {}, function(t) {
        var o = e.current || e.nativeElement || e;
        return et(t, o.querySelectorAll ? o : o === e ? U("Invalid scope") || c.createElement("div") : e);
      };
    }, ot = function(e) {
      return e.sort((function() {
        return .5 - Math.random();
      }));
    }, rt = function(e) {
      if (k(e)) {
        return e;
      }
      var t = L(e) ? e : {
        each: e
      }, o = Lt(t.ease), r = t.from || 0, i = parseFloat(t.base) || 0, a = {}, s = r > 0 && r < 1, n = isNaN(r) || s, l = t.axis, c = r, d = r;
      return A(r) ? c = d = {
        center: .5,
        edges: .5,
        end: 1
      }[r] || 0 : !s && n && (c = r[0], d = r[1]), function(e, s, f) {
        var u, p, m, h, g, y, v, z, _, w = (f || t).length, x = a[w];
        if (!x) {
          if (!(_ = "auto" === t.grid ? 0 : (t.grid || [ 1, b ])[1])) {
            for (v = -b; v < (v = f[_++].getBoundingClientRect().left) && _ < w; ) {}
            _ < w && _--;
          }
          for (x = a[w] = [], u = n ? Math.min(_, w) * c - .5 : r % _, p = _ === b ? 0 : n ? w * d / _ - .5 : r / _ | 0, 
          v = 0, z = b, y = 0; y < w; y++) {
            m = y % _ - u, h = p - (y / _ | 0), x[y] = g = l ? Math.abs("y" === l ? h : m) : S(m * m + h * h), 
            g > v && (v = g), g < z && (z = g);
          }
          "random" === r && ot(x), x.max = v - z, x.min = z, x.v = w = (parseFloat(t.amount) || parseFloat(t.each) * (_ > w ? w - 1 : l ? "y" === l ? w / _ : _ : Math.max(_, w / _)) || 0) * ("edges" === r ? -1 : 1), 
          x.b = w < 0 ? i - w : i, x.u = Ke(t.amount || t.each) || 0, o = o && w < 0 ? Mt(o) : o;
        }
        return w = (x[e] - x.min) / x.max || 0, me(x.b + (o ? o(w) : w) * x.v) + x.u;
      };
    }, it = function(e) {
      var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
      return function(o) {
        var r = me(Math.round(parseFloat(o) / e) * e * t);
        return (r - r % 1) / t + (M(o) ? 0 : Ke(o));
      };
    }, at = function(e, t) {
      var o, r, i = F(e);
      return !i && L(e) && (o = i = e.radius || b, e.values ? (e = et(e.values), (r = !M(e[0])) && (o *= o)) : e = it(e.increment)), 
      We(t, i ? k(e) ? function(t) {
        return r = e(t), Math.abs(r - t) <= o ? r : t;
      } : function(t) {
        for (var i, a, s = parseFloat(r ? t.x : t), n = parseFloat(r ? t.y : 0), l = b, c = 0, d = e.length; d--; ) {
          (i = r ? (i = e[d].x - s) * i + (a = e[d].y - n) * a : Math.abs(e[d] - s)) < l && (l = i, 
          c = d);
        }
        return c = !o || l <= o ? e[c] : t, r || c === t || M(t) ? c : c + Ke(t);
      } : it(e));
    }, st = function(e, t, o, r) {
      return We(F(e) ? !t : !0 === o ? !!(o = 0) : !r, (function() {
        return F(e) ? e[~~(Math.random() * e.length)] : (o = o || 1e-5) && (r = o < 1 ? Math.pow(10, (o + "").length - 2) : 1) && Math.floor(Math.round((e - o / 2 + Math.random() * (t - e + .99 * o)) / o) * o * r) / r;
      }));
    }, nt = function(e, t, o) {
      return We(o, (function(o) {
        return e[~~t(o)];
      }));
    }, lt = function(e) {
      for (var t, o, r, i, a = 0, s = ""; ~(t = e.indexOf("random(", a)); ) {
        r = e.indexOf(")", t), i = "[" === e.charAt(t + 7), o = e.substr(t + 7, r - t - 7).match(i ? $ : R), 
        s += e.substr(a, t - a) + st(i ? o : +o[0], i ? 0 : +o[1], +o[2] || 1e-5), a = r + 1;
      }
      return s + e.substr(a, e.length - a);
    }, ct = function(e, t, o, r, i) {
      var a = t - e, s = r - o;
      return We(i, (function(t) {
        return o + ((t - e) / a * s || 0);
      }));
    }, dt = function(e, t, o) {
      var r, i, a, s = e.labels, n = b;
      for (r in s) {
        (i = s[r] - t) < 0 == !!o && i && n > (i = Math.abs(i)) && (a = r, n = i);
      }
      return a;
    }, ft = function(e, t, o) {
      var r, i, s, n = e.vars, l = n[t], c = a, d = e._ctx;
      if (l) {
        return r = n[t + "Params"], i = n.callbackScope || e, o && oe.length && ye(), d && (a = d), 
        s = r ? l.apply(i, r) : l.call(i), a = c, s;
      }
    }, ut = function(e) {
      return Ae(e), e.scrollTrigger && e.scrollTrigger.kill(!!i), e.progress() < 1 && ft(e, "onInterrupt"), 
      e;
    }, pt = [], mt = function(e) {
      if (e) {
        if (e = !e.name && e.default || e, I() || e.headless) {
          var t = e.name, o = k(e), r = t && !o && e.init ? function() {
            this._props = [];
          } : e, i = {
            init: Q,
            render: ao,
            add: $t,
            kill: no,
            modifier: so,
            rawVars: 0
          }, a = {
            targetTest: 0,
            get: 0,
            getSetter: to,
            aliases: {},
            register: 0
          };
          if (St(), e !== r) {
            if (ie[t]) {
              return;
            }
            _e(r, _e(Te(e, i), a)), we(r.prototype, we(i, Te(e, a))), ie[r.prop = t] = r, e.targetTest && (ne.push(r), 
            te[t] = 1), t = ("css" === t ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
          }
          K(t, r), e.register && e.register(To, r, fo);
        } else {
          pt.push(e);
        }
      }
    }, ht = 255, gt = {
      aqua: [ 0, ht, ht ],
      lime: [ 0, ht, 0 ],
      silver: [ 192, 192, 192 ],
      black: [ 0, 0, 0 ],
      maroon: [ 128, 0, 0 ],
      teal: [ 0, 128, 128 ],
      blue: [ 0, 0, ht ],
      navy: [ 0, 0, 128 ],
      white: [ ht, ht, ht ],
      olive: [ 128, 128, 0 ],
      yellow: [ ht, ht, 0 ],
      orange: [ ht, 165, 0 ],
      gray: [ 128, 128, 128 ],
      purple: [ 128, 0, 128 ],
      green: [ 0, 128, 0 ],
      red: [ ht, 0, 0 ],
      pink: [ ht, 192, 203 ],
      cyan: [ 0, ht, ht ],
      transparent: [ ht, ht, ht, 0 ]
    }, yt = function(e, t, o) {
      return (6 * (e += e < 0 ? 1 : e > 1 ? -1 : 0) < 1 ? t + (o - t) * e * 6 : e < .5 ? o : 3 * e < 2 ? t + (o - t) * (2 / 3 - e) * 6 : t) * ht + .5 | 0;
    }, vt = function(e, t, o) {
      var r, i, a, s, n, l, c, d, f, u, p = e ? M(e) ? [ e >> 16, e >> 8 & ht, e & ht ] : 0 : gt.black;
      if (!p) {
        if ("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), gt[e]) {
          p = gt[e];
        } else if ("#" === e.charAt(0)) {
          if (e.length < 6 && (r = e.charAt(1), i = e.charAt(2), a = e.charAt(3), e = "#" + r + r + i + i + a + a + (5 === e.length ? e.charAt(4) + e.charAt(4) : "")), 
          9 === e.length) {
            return [ (p = parseInt(e.substr(1, 6), 16)) >> 16, p >> 8 & ht, p & ht, parseInt(e.substr(7), 16) / 255 ];
          }
          p = [ (e = parseInt(e.substr(1), 16)) >> 16, e >> 8 & ht, e & ht ];
        } else if ("hsl" === e.substr(0, 3)) {
          if (p = u = e.match(R), t) {
            if (~e.indexOf("=")) {
              return p = e.match(B), o && p.length < 4 && (p[3] = 1), p;
            }
          } else {
            s = +p[0] % 360 / 360, n = +p[1] / 100, r = 2 * (l = +p[2] / 100) - (i = l <= .5 ? l * (n + 1) : l + n - l * n), 
            p.length > 3 && (p[3] *= 1), p[0] = yt(s + 1 / 3, r, i), p[1] = yt(s, r, i), p[2] = yt(s - 1 / 3, r, i);
          }
        } else {
          p = e.match(R) || gt.transparent;
        }
        p = p.map(Number);
      }
      return t && !u && (r = p[0] / ht, i = p[1] / ht, a = p[2] / ht, l = ((c = Math.max(r, i, a)) + (d = Math.min(r, i, a))) / 2, 
      c === d ? s = n = 0 : (f = c - d, n = l > .5 ? f / (2 - c - d) : f / (c + d), s = c === r ? (i - a) / f + (i < a ? 6 : 0) : c === i ? (a - r) / f + 2 : (r - i) / f + 4, 
      s *= 60), p[0] = ~~(s + .5), p[1] = ~~(100 * n + .5), p[2] = ~~(100 * l + .5)), 
      o && p.length < 4 && (p[3] = 1), p;
    }, zt = function(e) {
      var t = [], o = [], r = -1;
      return e.split(_t).forEach((function(e) {
        var i = e.match(N) || [];
        t.push.apply(t, i), o.push(r += i.length + 1);
      })), t.c = o, t;
    }, bt = function(e, t, o) {
      var r, i, a, s, n = "", l = (e + n).match(_t), c = t ? "hsla(" : "rgba(", d = 0;
      if (!l) {
        return e;
      }
      if (l = l.map((function(e) {
        return (e = vt(e, t, 1)) && c + (t ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3] : e.join(",")) + ")";
      })), o && (a = zt(e), (r = o.c).join(n) !== a.c.join(n))) {
        for (s = (i = e.replace(_t, "1").split(N)).length - 1; d < s; d++) {
          n += i[d] + (~r.indexOf(d) ? l.shift() || c + "0,0,0,0)" : (a.length ? a : l.length ? l : o).shift());
        }
      }
      if (!i) {
        for (s = (i = e.split(_t)).length - 1; d < s; d++) {
          n += i[d] + l[d];
        }
      }
      return n + i[s];
    }, _t = function() {
      var e, t = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
      for (e in gt) {
        t += "|" + e + "\\b";
      }
      return new RegExp(t + ")", "gi");
    }(), wt = /hsl[a]?\(/, xt = function(e) {
      var t, o = e.join(" ");
      if (_t.lastIndex = 0, _t.test(o)) {
        return t = wt.test(o), e[1] = bt(e[1], t), e[0] = bt(e[0], t, zt(e[1])), !0;
      }
    }, Tt = function() {
      var e, t, o, r, i, a, s = Date.now, f = 500, u = 33, m = s(), h = m, g = 1e3 / 240, y = g, v = [], z = function o(n) {
        var l, c, d, p, z = s() - h, b = !0 === n;
        if ((z > f || z < 0) && (m += z - u), ((l = (d = (h += z) - m) - y) > 0 || b) && (p = ++r.frame, 
        i = d - 1e3 * r.time, r.time = d /= 1e3, y += l + (l >= g ? 4 : g - l), c = 1), 
        b || (e = t(o)), c) {
          for (a = 0; a < v.length; a++) {
            v[a](d, i, p, n);
          }
        }
      };
      return r = {
        time: 0,
        frame: 0,
        tick: function() {
          z(!0);
        },
        deltaRatio: function(e) {
          return i / (1e3 / (e || 60));
        },
        wake: function() {
          d && (!l && I() && (n = l = window, c = n.document || {}, H.gsap = To, (n.gsapVersions || (n.gsapVersions = [])).push(To.version), 
          j(X || n.GreenSockGlobals || !n.gsap && n || {}), pt.forEach(mt)), o = "undefined" != typeof requestAnimationFrame && requestAnimationFrame, 
          e && r.sleep(), t = o || function(e) {
            return setTimeout(e, y - 1e3 * r.time + 1 | 0);
          }, p = 1, z(2));
        },
        sleep: function() {
          (o ? cancelAnimationFrame : clearTimeout)(e), p = 0, t = Q;
        },
        lagSmoothing: function(e, t) {
          f = e || 1 / 0, u = Math.min(t || 33, f);
        },
        fps: function(e) {
          g = 1e3 / (e || 240), y = 1e3 * r.time + g;
        },
        add: function(e, t, o) {
          var i = t ? function(t, o, a, s) {
            e(t, o, a, s), r.remove(i);
          } : e;
          return r.remove(e), v[o ? "unshift" : "push"](i), St(), i;
        },
        remove: function(e, t) {
          ~(t = v.indexOf(e)) && v.splice(t, 1) && a >= t && a--;
        },
        _listeners: v
      };
    }(), St = function() {
      return !p && Tt.wake();
    }, Et = {}, Ct = /^[\d.\-M][\d.\-,\s]/, At = /["']/g, kt = function(e) {
      for (var t, o, r, i = {}, a = e.substr(1, e.length - 3).split(":"), s = a[0], n = 1, l = a.length; n < l; n++) {
        o = a[n], t = n !== l - 1 ? o.lastIndexOf(",") : o.length, r = o.substr(0, t), i[s] = isNaN(r) ? r.replace(At, "").trim() : +r, 
        s = o.substr(t + 1).trim();
      }
      return i;
    }, Mt = function(e) {
      return function(t) {
        return 1 - e(1 - t);
      };
    }, Pt = function e(t, o) {
      for (var r, i = t._first; i; ) {
        i instanceof Bt ? e(i, o) : !i.vars.yoyoEase || i._yoyo && i._repeat || i._yoyo === o || (i.timeline ? e(i.timeline, o) : (r = i._ease, 
        i._ease = i._yEase, i._yEase = r, i._yoyo = o)), i = i._next;
      }
    }, Lt = function(e, t) {
      return e && (k(e) ? e : Et[e] || function(e) {
        var t, o, r, i, a = (e + "").split("("), s = Et[a[0]];
        return s && a.length > 1 && s.config ? s.config.apply(null, ~e.indexOf("{") ? [ kt(a[1]) ] : (t = e, 
        o = t.indexOf("(") + 1, r = t.indexOf(")"), i = t.indexOf("(", o), t.substring(o, ~i && i < r ? t.indexOf(")", r + 1) : r)).split(",").map(ze)) : Et._CE && Ct.test(e) ? Et._CE("", e) : s;
      }(e)) || t;
    }, Ot = function(e, t, o, r) {
      void 0 === o && (o = function(e) {
        return 1 - t(1 - e);
      }), void 0 === r && (r = function(e) {
        return e < .5 ? t(2 * e) / 2 : 1 - t(2 * (1 - e)) / 2;
      });
      var i, a = {
        easeIn: t,
        easeOut: o,
        easeInOut: r
      };
      return ue(e, (function(e) {
        for (var t in Et[e] = H[e] = a, Et[i = e.toLowerCase()] = o, a) {
          Et[i + ("easeIn" === t ? ".in" : "easeOut" === t ? ".out" : ".inOut")] = Et[e + "." + t] = a[t];
        }
      })), a;
    }, It = function(e) {
      return function(t) {
        return t < .5 ? (1 - e(1 - 2 * t)) / 2 : .5 + e(2 * (t - .5)) / 2;
      };
    }, Dt = function e(t, o, r) {
      var i = o >= 1 ? o : 1, a = (r || (t ? .3 : .45)) / (o < 1 ? o : 1), s = a / w * (Math.asin(1 / i) || 0), n = function(e) {
        return 1 === e ? 1 : i * Math.pow(2, -10 * e) * C((e - s) * a) + 1;
      }, l = "out" === t ? n : "in" === t ? function(e) {
        return 1 - n(1 - e);
      } : It(n);
      return a = w / a, l.config = function(o, r) {
        return e(t, o, r);
      }, l;
    }, qt = function e(t, o) {
      void 0 === o && (o = 1.70158);
      var r = function(e) {
        return e ? --e * e * ((o + 1) * e + o) + 1 : 0;
      }, i = "out" === t ? r : "in" === t ? function(e) {
        return 1 - r(1 - e);
      } : It(r);
      return i.config = function(o) {
        return e(t, o);
      }, i;
    };
    ue("Linear,Quad,Cubic,Quart,Quint,Strong", (function(e, t) {
      var o = t < 5 ? t + 1 : t;
      Ot(e + ",Power" + (o - 1), t ? function(e) {
        return Math.pow(e, o);
      } : function(e) {
        return e;
      }, (function(e) {
        return 1 - Math.pow(1 - e, o);
      }), (function(e) {
        return e < .5 ? Math.pow(2 * e, o) / 2 : 1 - Math.pow(2 * (1 - e), o) / 2;
      }));
    })), Et.Linear.easeNone = Et.none = Et.Linear.easeIn, Ot("Elastic", Dt("in"), Dt("out"), Dt()), 
    m = 7.5625, g = 1 / (h = 2.75), Ot("Bounce", (function(e) {
      return 1 - y(1 - e);
    }), y = function(e) {
      return e < g ? m * e * e : e < .7272727272727273 ? m * Math.pow(e - 1.5 / h, 2) + .75 : e < .9090909090909092 ? m * (e -= 2.25 / h) * e + .9375 : m * Math.pow(e - 2.625 / h, 2) + .984375;
    }), Ot("Expo", (function(e) {
      return e ? Math.pow(2, 10 * (e - 1)) : 0;
    })), Ot("Circ", (function(e) {
      return -(S(1 - e * e) - 1);
    })), Ot("Sine", (function(e) {
      return 1 === e ? 1 : 1 - E(e * x);
    })), Ot("Back", qt("in"), qt("out"), qt()), Et.SteppedEase = Et.steps = H.SteppedEase = {
      config: function(e, t) {
        void 0 === e && (e = 1);
        var o = 1 / e, r = e + (t ? 0 : 1), i = t ? 1 : 0;
        return function(e) {
          return ((r * Ue(0, .99999999, e) | 0) + i) * o;
        };
      }
    }, z.ease = Et["quad.out"], ue("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function(e) {
      return le += e + "," + e + "Params,";
    }));
    var Ft = function(e, t) {
      this.id = T++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : fe, 
      this.set = t ? t.getSetter : to;
    }, Rt = function() {
      function e(e) {
        this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, 
        this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, $e(this, +e.duration, 1, 1), 
        this.data = e.data, a && (this._ctx = a, a.data.push(this)), p || Tt.wake();
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
        if (St(), !arguments.length) {
          return this._tTime;
        }
        var o = this._dp;
        if (o && o.smoothChildTiming && this._ts) {
          for (qe(this, e), !o._dp || o.parent || Fe(o, this); o && o.parent; ) {
            o.parent._time !== o._start + (o._ts >= 0 ? o._tTime / o._ts : (o.totalDuration() - o._tTime) / -o._ts) && o.totalTime(o._tTime, !0), 
            o = o.parent;
          }
          !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && Re(this._dp, this, this._start - this._delay);
        }
        return (this._tTime !== e || !this._dur && !t || this._initted && Math.abs(this._zTime) === _ || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e), 
        ve(this, e, t)), this;
      }, t.time = function(e, t) {
        return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + Le(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), t) : this._time;
      }, t.totalProgress = function(e, t) {
        return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0;
      }, t.progress = function(e, t) {
        return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? e : 1 - e) + Le(this), t) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
      }, t.iteration = function(e, t) {
        var o = this.duration() + this._rDelay;
        return arguments.length ? this.totalTime(this._time + (e - 1) * o, t) : this._repeat ? Oe(this._tTime, o) + 1 : 1;
      }, t.timeScale = function(e, t) {
        if (!arguments.length) {
          return -1e-8 === this._rts ? 0 : this._rts;
        }
        if (this._rts === e) {
          return this;
        }
        var o = this.parent && this._ts ? Ie(this.parent._time, this) : this._tTime;
        return this._rts = +e || 0, this._ts = this._ps || -1e-8 === e ? 0 : this._rts, 
        this.totalTime(Ue(-Math.abs(this._delay), this._tDur, o), !1 !== t), De(this), function(e) {
          for (var t = e.parent; t && t.parent; ) {
            t._dirty = 1, t.totalDuration(), t = t.parent;
          }
          return e;
        }(this);
      }, t.paused = function(e) {
        return arguments.length ? (this._ps !== e && (this._ps = e, e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), 
        this._ts = this._act = 0) : (St(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== _ && (this._tTime -= _)))), 
        this) : this._ps;
      }, t.startTime = function(e) {
        if (arguments.length) {
          this._start = e;
          var t = this.parent || this._dp;
          return t && (t._sort || !this.parent) && Re(t, this, e - this._delay), this;
        }
        return this._start;
      }, t.endTime = function(e) {
        return this._start + (O(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
      }, t.rawTime = function(e) {
        var t = this.parent || this._dp;
        return t ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ie(t.rawTime(e), this) : this._tTime : this._tTime;
      }, t.revert = function(e) {
        void 0 === e && (e = ee);
        var t = i;
        return i = e, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(e), 
        this.totalTime(-.01, e.suppressEvents)), "nested" !== this.data && !1 !== e.kill && this.kill(), 
        i = t, this;
      }, t.globalTime = function(e) {
        for (var t = this, o = arguments.length ? e : t.rawTime(); t; ) {
          o = t._start + o / (Math.abs(t._ts) || 1), t = t._dp;
        }
        return !this.parent && this._sat ? this._sat.globalTime(e) : o;
      }, t.repeat = function(e) {
        return arguments.length ? (this._repeat = e === 1 / 0 ? -2 : e, Ve(this)) : -2 === this._repeat ? 1 / 0 : this._repeat;
      }, t.repeatDelay = function(e) {
        if (arguments.length) {
          var t = this._time;
          return this._rDelay = e, Ve(this), t ? this.time(t) : this;
        }
        return this._rDelay;
      }, t.yoyo = function(e) {
        return arguments.length ? (this._yoyo = e, this) : this._yoyo;
      }, t.seek = function(e, t) {
        return this.totalTime(Xe(this, e), O(t));
      }, t.restart = function(e, t) {
        return this.play().totalTime(e ? -this._delay : 0, O(t));
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
        var e, t = this.parent || this._dp, o = this._start;
        return !(t && !(this._ts && this._initted && t.isActive() && (e = t.rawTime(!0)) >= o && e < this.endTime(!0) - _));
      }, t.eventCallback = function(e, t, o) {
        var r = this.vars;
        return arguments.length > 1 ? (t ? (r[e] = t, o && (r[e + "Params"] = o), "onUpdate" === e && (this._onUpdate = t)) : delete r[e], 
        this) : r[e];
      }, t.then = function(e) {
        var t = this;
        return new Promise((function(o) {
          var r = k(e) ? e : be, i = function() {
            var e = t.then;
            t.then = null, k(r) && (r = r(t)) && (r.then || r === t) && (t.then = e), o(r), 
            t.then = e;
          };
          t._initted && 1 === t.totalProgress() && t._ts >= 0 || !t._tTime && t._ts < 0 ? i() : t._prom = i;
        }));
      }, t.kill = function() {
        ut(this);
      }, e;
    }();
    _e(Rt.prototype, {
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
    var Bt = function(o) {
      function r(t, r) {
        var i;
        return void 0 === t && (t = {}), (i = o.call(this, t) || this).labels = {}, i.smoothChildTiming = !!t.smoothChildTiming, 
        i.autoRemoveChildren = !!t.autoRemoveChildren, i._sort = O(t.sortChildren), s && Re(t.parent || s, e(i), r), 
        t.reversed && i.reverse(), t.paused && i.paused(!0), t.scrollTrigger && Be(e(i), t.scrollTrigger), 
        i;
      }
      t(r, o);
      var a = r.prototype;
      return a.to = function(e, t, o) {
        return je(0, arguments, this), this;
      }, a.from = function(e, t, o) {
        return je(1, arguments, this), this;
      }, a.fromTo = function(e, t, o, r) {
        return je(2, arguments, this), this;
      }, a.set = function(e, t, o) {
        return t.duration = 0, t.parent = this, Se(t).repeatDelay || (t.repeat = 0), t.immediateRender = !!t.immediateRender, 
        new Kt(e, t, Xe(this, o), 1), this;
      }, a.call = function(e, t, o) {
        return Re(this, Kt.delayedCall(0, e, t), o);
      }, a.staggerTo = function(e, t, o, r, i, a, s) {
        return o.duration = t, o.stagger = o.stagger || r, o.onComplete = a, o.onCompleteParams = s, 
        o.parent = this, new Kt(e, o, Xe(this, i)), this;
      }, a.staggerFrom = function(e, t, o, r, i, a, s) {
        return o.runBackwards = 1, Se(o).immediateRender = O(o.immediateRender), this.staggerTo(e, t, o, r, i, a, s);
      }, a.staggerFromTo = function(e, t, o, r, i, a, s, n) {
        return r.startAt = o, Se(r).immediateRender = O(r.immediateRender), this.staggerTo(e, t, r, i, a, s, n);
      }, a.render = function(e, t, o) {
        var r, a, n, l, c, d, f, u, p, m, h, g, y = this._time, v = this._dirty ? this.totalDuration() : this._tDur, z = this._dur, b = e <= 0 ? 0 : me(e), w = this._zTime < 0 != e < 0 && (this._initted || !z);
        if (this !== s && b > v && e >= 0 && (b = v), b !== this._tTime || o || w) {
          if (y !== this._time && z && (b += this._time - y, e += this._time - y), r = b, 
          p = this._start, d = !(u = this._ts), w && (z || (y = this._zTime), (e || !t) && (this._zTime = e)), 
          this._repeat) {
            if (h = this._yoyo, c = z + this._rDelay, this._repeat < -1 && e < 0) {
              return this.totalTime(100 * c + e, t, o);
            }
            if (r = me(b % c), b === v ? (l = this._repeat, r = z) : ((l = ~~(b / c)) && l === b / c && (r = z, 
            l--), r > z && (r = z)), m = Oe(this._tTime, c), !y && this._tTime && m !== l && this._tTime - m * c - this._dur <= 0 && (m = l), 
            h && 1 & l && (r = z - r, g = 1), l !== m && !this._lock) {
              var x = h && 1 & m, T = x === (h && 1 & l);
              if (l < m && (x = !x), y = x ? 0 : b % z ? z : b, this._lock = 1, this.render(y || (g ? 0 : me(l * c)), t, !z)._lock = 0, 
              this._tTime = b, !t && this.parent && ft(this, "onRepeat"), this.vars.repeatRefresh && !g && (this.invalidate()._lock = 1), 
              y && y !== this._time || d !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
                return this;
              }
              if (z = this._dur, v = this._tDur, T && (this._lock = 2, y = x ? z : -1e-4, this.render(y, !0), 
              this.vars.repeatRefresh && !g && this.invalidate()), this._lock = 0, !this._ts && !d) {
                return this;
              }
              Pt(this, g);
            }
          }
          if (this._hasPause && !this._forcing && this._lock < 2 && (f = function(e, t, o) {
            var r;
            if (o > t) {
              for (r = e._first; r && r._start <= o; ) {
                if ("isPause" === r.data && r._start > t) {
                  return r;
                }
                r = r._next;
              }
            } else {
              for (r = e._last; r && r._start >= o; ) {
                if ("isPause" === r.data && r._start < t) {
                  return r;
                }
                r = r._prev;
              }
            }
          }(this, me(y), me(r)), f && (b -= r - (r = f._start))), this._tTime = b, this._time = r, 
          this._act = !u, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, 
          this._zTime = e, y = 0), !y && r && !t && !l && (ft(this, "onStart"), this._tTime !== b)) {
            return this;
          }
          if (r >= y && e >= 0) {
            for (a = this._first; a; ) {
              if (n = a._next, (a._act || r >= a._start) && a._ts && f !== a) {
                if (a.parent !== this) {
                  return this.render(e, t, o);
                }
                if (a.render(a._ts > 0 ? (r - a._start) * a._ts : (a._dirty ? a.totalDuration() : a._tDur) + (r - a._start) * a._ts, t, o), 
                r !== this._time || !this._ts && !d) {
                  f = 0, n && (b += this._zTime = -1e-8);
                  break;
                }
              }
              a = n;
            }
          } else {
            a = this._last;
            for (var S = e < 0 ? e : r; a; ) {
              if (n = a._prev, (a._act || S <= a._end) && a._ts && f !== a) {
                if (a.parent !== this) {
                  return this.render(e, t, o);
                }
                if (a.render(a._ts > 0 ? (S - a._start) * a._ts : (a._dirty ? a.totalDuration() : a._tDur) + (S - a._start) * a._ts, t, o || i && (a._initted || a._startAt)), 
                r !== this._time || !this._ts && !d) {
                  f = 0, n && (b += this._zTime = S ? -1e-8 : _);
                  break;
                }
              }
              a = n;
            }
          }
          if (f && !t && (this.pause(), f.render(r >= y ? 0 : -1e-8)._zTime = r >= y ? 1 : -1, 
          this._ts)) {
            return this._start = p, De(this), this.render(e, t, o);
          }
          this._onUpdate && !t && ft(this, "onUpdate", !0), (b === v && this._tTime >= this.totalDuration() || !b && y) && (p !== this._start && Math.abs(u) === Math.abs(this._ts) || this._lock || ((e || !z) && (b === v && this._ts > 0 || !b && this._ts < 0) && Ae(this, 1), 
          t || e < 0 && !y || !b && !y && v || (ft(this, b === v && e >= 0 ? "onComplete" : "onReverseComplete", !0), 
          this._prom && !(b < v && this.timeScale() > 0) && this._prom())));
        }
        return this;
      }, a.add = function(e, t) {
        var o = this;
        if (M(t) || (t = Xe(this, t, e)), !(e instanceof Rt)) {
          if (F(e)) {
            return e.forEach((function(e) {
              return o.add(e, t);
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
        return this !== e ? Re(this, e, t) : this;
      }, a.getChildren = function(e, t, o, r) {
        void 0 === e && (e = !0), void 0 === t && (t = !0), void 0 === o && (o = !0), void 0 === r && (r = -b);
        for (var i = [], a = this._first; a; ) {
          a._start >= r && (a instanceof Kt ? t && i.push(a) : (o && i.push(a), e && i.push.apply(i, a.getChildren(!0, t, o)))), 
          a = a._next;
        }
        return i;
      }, a.getById = function(e) {
        for (var t = this.getChildren(1, 1, 1), o = t.length; o--; ) {
          if (t[o].vars.id === e) {
            return t[o];
          }
        }
      }, a.remove = function(e) {
        return A(e) ? this.removeLabel(e) : k(e) ? this.killTweensOf(e) : (Ce(this, e), 
        e === this._recent && (this._recent = this._last), ke(this));
      }, a.totalTime = function(e, t) {
        return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = me(Tt.time - (this._ts > 0 ? e / this._ts : (this.totalDuration() - e) / -this._ts))), 
        o.prototype.totalTime.call(this, e, t), this._forcing = 0, this) : this._tTime;
      }, a.addLabel = function(e, t) {
        return this.labels[e] = Xe(this, t), this;
      }, a.removeLabel = function(e) {
        return delete this.labels[e], this;
      }, a.addPause = function(e, t, o) {
        var r = Kt.delayedCall(0, t || Q, o);
        return r.data = "isPause", this._hasPause = 1, Re(this, r, Xe(this, e));
      }, a.removePause = function(e) {
        var t = this._first;
        for (e = Xe(this, e); t; ) {
          t._start === e && "isPause" === t.data && Ae(t), t = t._next;
        }
      }, a.killTweensOf = function(e, t, o) {
        for (var r = this.getTweensOf(e, o), i = r.length; i--; ) {
          Nt !== r[i] && r[i].kill(e, t);
        }
        return this;
      }, a.getTweensOf = function(e, t) {
        for (var o, r = [], i = et(e), a = this._first, s = M(t); a; ) {
          a instanceof Kt ? ge(a._targets, i) && (s ? (!Nt || a._initted && a._ts) && a.globalTime(0) <= t && a.globalTime(a.totalDuration()) > t : !t || a.isActive()) && r.push(a) : (o = a.getTweensOf(i, t)).length && r.push.apply(r, o), 
          a = a._next;
        }
        return r;
      }, a.tweenTo = function(e, t) {
        t = t || {};
        var o, r = this, i = Xe(r, e), a = t, s = a.startAt, n = a.onStart, l = a.onStartParams, c = a.immediateRender, d = Kt.to(r, _e({
          ease: t.ease || "none",
          lazy: !1,
          immediateRender: !1,
          time: i,
          overwrite: "auto",
          duration: t.duration || Math.abs((i - (s && "time" in s ? s.time : r._time)) / r.timeScale()) || _,
          onStart: function() {
            if (r.pause(), !o) {
              var e = t.duration || Math.abs((i - (s && "time" in s ? s.time : r._time)) / r.timeScale());
              d._dur !== e && $e(d, e, 0, 1).render(d._time, !0, !0), o = 1;
            }
            n && n.apply(d, l || []);
          }
        }, t));
        return c ? d.render(0) : d;
      }, a.tweenFromTo = function(e, t, o) {
        return this.tweenTo(t, _e({
          startAt: {
            time: Xe(this, e)
          }
        }, o));
      }, a.recent = function() {
        return this._recent;
      }, a.nextLabel = function(e) {
        return void 0 === e && (e = this._time), dt(this, Xe(this, e));
      }, a.previousLabel = function(e) {
        return void 0 === e && (e = this._time), dt(this, Xe(this, e), 1);
      }, a.currentLabel = function(e) {
        return arguments.length ? this.seek(e, !0) : this.previousLabel(this._time + _);
      }, a.shiftChildren = function(e, t, o) {
        void 0 === o && (o = 0);
        for (var r, i = this._first, a = this.labels; i; ) {
          i._start >= o && (i._start += e, i._end += e), i = i._next;
        }
        if (t) {
          for (r in a) {
            a[r] >= o && (a[r] += e);
          }
        }
        return ke(this);
      }, a.invalidate = function(e) {
        var t = this._first;
        for (this._lock = 0; t; ) {
          t.invalidate(e), t = t._next;
        }
        return o.prototype.invalidate.call(this, e);
      }, a.clear = function(e) {
        void 0 === e && (e = !0);
        for (var t, o = this._first; o; ) {
          t = o._next, this.remove(o), o = t;
        }
        return this._dp && (this._time = this._tTime = this._pTime = 0), e && (this.labels = {}), 
        ke(this);
      }, a.totalDuration = function(e) {
        var t, o, r, i = 0, a = this, n = a._last, l = b;
        if (arguments.length) {
          return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -e : e));
        }
        if (a._dirty) {
          for (r = a.parent; n; ) {
            t = n._prev, n._dirty && n.totalDuration(), (o = n._start) > l && a._sort && n._ts && !a._lock ? (a._lock = 1, 
            Re(a, n, o - n._delay, 1)._lock = 0) : l = o, o < 0 && n._ts && (i -= o, (!r && !a._dp || r && r.smoothChildTiming) && (a._start += o / a._ts, 
            a._time -= o, a._tTime -= o), a.shiftChildren(-o, !1, -Infinity), l = 0), n._end > i && n._ts && (i = n._end), 
            n = t;
          }
          $e(a, a === s && a._time > i ? a._time : i, 1, 1), a._dirty = 0;
        }
        return a._tDur;
      }, r.updateRoot = function(e) {
        if (s._ts && (ve(s, Ie(e, s)), f = Tt.frame), Tt.frame >= se) {
          se += v.autoSleep || 120;
          var t = s._first;
          if ((!t || !t._ts) && v.autoSleep && Tt._listeners.length < 2) {
            for (;t && !t._ts; ) {
              t = t._next;
            }
            t || Tt.sleep();
          }
        }
      }, r;
    }(Rt);
    _e(Bt.prototype, {
      _lock: 0,
      _hasPause: 0,
      _forcing: 0
    });
    var Nt, Gt, Yt = function(e, t, o, r, i, a, s) {
      var n, l, c, d, f, u, p, m, h = new fo(this._pt, e, t, 0, 1, io, null, i), g = 0, y = 0;
      for (h.b = o, h.e = r, o += "", (p = ~(r += "").indexOf("random(")) && (r = lt(r)), 
      a && (a(m = [ o, r ], e, t), o = m[0], r = m[1]), l = o.match(G) || []; n = G.exec(r); ) {
        d = n[0], f = r.substring(g, n.index), c ? c = (c + 1) % 5 : "rgba(" === f.substr(-5) && (c = 1), 
        d !== l[y++] && (u = parseFloat(l[y - 1]) || 0, h._pt = {
          _next: h._pt,
          p: f || 1 === y ? f : ",",
          s: u,
          c: "=" === d.charAt(1) ? he(u, d) - u : parseFloat(d) - u,
          m: c && c < 4 ? Math.round : 0
        }, g = G.lastIndex);
      }
      return h.c = g < r.length ? r.substring(g, r.length) : "", h.fp = s, (Y.test(r) || p) && (h.e = 0), 
      this._pt = h, h;
    }, $t = function(e, t, o, r, i, a, s, n, l, c) {
      k(r) && (r = r(i || 0, e, a));
      var d, f = e[t], u = "get" !== o ? o : k(f) ? l ? e[t.indexOf("set") || !k(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](l) : e[t]() : f, p = k(f) ? l ? Jt : Zt : Qt;
      if (A(r) && (~r.indexOf("random(") && (r = lt(r)), "=" === r.charAt(1) && ((d = he(u, r) + (Ke(u) || 0)) || 0 === d) && (r = d)), 
      !c || u !== r || Gt) {
        return isNaN(u * r) || "" === r ? (!f && !(t in e) && W(t, r), Yt.call(this, e, t, u, r, p, n || v.stringFilter, l)) : (d = new fo(this._pt, e, t, +u || 0, r - (u || 0), "boolean" == typeof f ? ro : oo, 0, p), 
        l && (d.fp = l), s && d.modifier(s, this, e), this._pt = d);
      }
    }, Vt = function(e, t, o, r, i, a) {
      var s, n, l, c;
      if (ie[e] && !1 !== (s = new ie[e]).init(i, s.rawVars ? t[e] : function(e, t, o, r, i) {
        if (k(e) && (e = jt(e, i, t, o, r)), !L(e) || e.style && e.nodeType || F(e) || q(e)) {
          return A(e) ? jt(e, i, t, o, r) : e;
        }
        var a, s = {};
        for (a in e) {
          s[a] = jt(e[a], i, t, o, r);
        }
        return s;
      }(t[e], r, i, a, o), o, r, a) && (o._pt = n = new fo(o._pt, i, e, 0, 1, s.render, s, 0, s.priority), 
      o !== u)) {
        for (l = o._ptLookup[o._targets.indexOf(i)], c = s._props.length; c--; ) {
          l[s._props[c]] = n;
        }
      }
      return s;
    }, Ht = function e(t, o, a) {
      var n, l, c, d, f, u, p, m, h, g, y, v, w, x = t.vars, T = x.ease, S = x.startAt, E = x.immediateRender, C = x.lazy, A = x.onUpdate, k = x.runBackwards, M = x.yoyoEase, P = x.keyframes, L = x.autoRevert, I = t._dur, D = t._startAt, q = t._targets, F = t.parent, R = F && "nested" === F.data ? F.vars.targets : q, B = "auto" === t._overwrite && !r, N = t.timeline;
      if (N && (!P || !T) && (T = "none"), t._ease = Lt(T, z.ease), t._yEase = M ? Mt(Lt(!0 === M ? T : M, z.ease)) : 0, 
      M && t._yoyo && !t._repeat && (M = t._yEase, t._yEase = t._ease, t._ease = M), t._from = !N && !!x.runBackwards, 
      !N || P && !x.stagger) {
        if (v = (m = q[0] ? de(q[0]).harness : 0) && x[m.prop], n = Te(x, te), D && (D._zTime < 0 && D.progress(1), 
        o < 0 && k && E && !L ? D.render(-1, !0) : D.revert(k && I ? J : Z), D._lazy = 0), 
        S) {
          if (Ae(t._startAt = Kt.set(q, _e({
            data: "isStart",
            overwrite: !1,
            parent: F,
            immediateRender: !0,
            lazy: !D && O(C),
            startAt: null,
            delay: 0,
            onUpdate: A && function() {
              return ft(t, "onUpdate");
            },
            stagger: 0
          }, S))), t._startAt._dp = 0, t._startAt._sat = t, o < 0 && (i || !E && !L) && t._startAt.revert(J), 
          E && I && o <= 0 && a <= 0) {
            return void (o && (t._zTime = o));
          }
        } else if (k && I && !D) {
          if (o && (E = !1), c = _e({
            overwrite: !1,
            data: "isFromStart",
            lazy: E && !D && O(C),
            immediateRender: E,
            stagger: 0,
            parent: F
          }, n), v && (c[m.prop] = v), Ae(t._startAt = Kt.set(q, c)), t._startAt._dp = 0, 
          t._startAt._sat = t, o < 0 && (i ? t._startAt.revert(J) : t._startAt.render(-1, !0)), 
          t._zTime = o, E) {
            if (!o) {
              return;
            }
          } else {
            e(t._startAt, _, _);
          }
        }
        for (t._pt = t._ptCache = 0, C = I && O(C) || C && !I, l = 0; l < q.length; l++) {
          if (p = (f = q[l])._gsap || ce(q)[l]._gsap, t._ptLookup[l] = g = {}, re[p.id] && oe.length && ye(), 
          y = R === q ? l : R.indexOf(f), m && !1 !== (h = new m).init(f, v || n, t, y, R) && (t._pt = d = new fo(t._pt, f, h.name, 0, 1, h.render, h, 0, h.priority), 
          h._props.forEach((function(e) {
            g[e] = d;
          })), h.priority && (u = 1)), !m || v) {
            for (c in n) {
              ie[c] && (h = Vt(c, n, t, y, f, R)) ? h.priority && (u = 1) : g[c] = d = $t.call(t, f, c, "get", n[c], y, R, 0, x.stringFilter);
            }
          }
          t._op && t._op[l] && t.kill(f, t._op[l]), B && t._pt && (Nt = t, s.killTweensOf(f, g, t.globalTime(o)), 
          w = !t.parent, Nt = 0), t._pt && C && (re[p.id] = 1);
        }
        u && co(t), t._onInit && t._onInit(t);
      }
      t._onUpdate = A, t._initted = (!t._op || t._pt) && !w, P && o <= 0 && N.render(b, !0, !0);
    }, Xt = function(e, t, o, r) {
      var i, a, s = t.ease || r || "power1.inOut";
      if (F(t)) {
        a = o[e] || (o[e] = []), t.forEach((function(e, o) {
          return a.push({
            t: o / (t.length - 1) * 100,
            v: e,
            e: s
          });
        }));
      } else {
        for (i in t) {
          a = o[i] || (o[i] = []), "ease" === i || a.push({
            t: parseFloat(e),
            v: t[i],
            e: s
          });
        }
      }
    }, jt = function(e, t, o, r, i) {
      return k(e) ? e.call(t, o, r, i) : A(e) && ~e.indexOf("random(") ? lt(e) : e;
    }, Wt = le + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Ut = {};
    ue(Wt + ",id,stagger,delay,duration,paused,scrollTrigger", (function(e) {
      return Ut[e] = 1;
    }));
    var Kt = function(o) {
      function a(t, i, a, n) {
        var l;
        "number" == typeof i && (a.duration = i, i = a, a = null);
        var c, d, f, u, p, m, h, g, y = (l = o.call(this, n ? i : Se(i)) || this).vars, z = y.duration, b = y.delay, _ = y.immediateRender, w = y.stagger, x = y.overwrite, T = y.keyframes, S = y.defaults, E = y.scrollTrigger, C = y.yoyoEase, A = i.parent || s, k = (F(t) || q(t) ? M(t[0]) : "length" in i) ? [ t ] : et(t);
        if (l._targets = k.length ? ce(k) : U("GSAP target " + t + " not found. https://gsap.com", !v.nullTargetWarn) || [], 
        l._ptLookup = [], l._overwrite = x, T || w || D(z) || D(b)) {
          if (i = l.vars, (c = l.timeline = new Bt({
            data: "nested",
            defaults: S || {},
            targets: A && "nested" === A.data ? A.vars.targets : k
          })).kill(), c.parent = c._dp = e(l), c._start = 0, w || D(z) || D(b)) {
            if (u = k.length, h = w && rt(w), L(w)) {
              for (p in w) {
                ~Wt.indexOf(p) && (g || (g = {}), g[p] = w[p]);
              }
            }
            for (d = 0; d < u; d++) {
              (f = Te(i, Ut)).stagger = 0, C && (f.yoyoEase = C), g && we(f, g), m = k[d], f.duration = +jt(z, e(l), d, m, k), 
              f.delay = (+jt(b, e(l), d, m, k) || 0) - l._delay, !w && 1 === u && f.delay && (l._delay = b = f.delay, 
              l._start += b, f.delay = 0), c.to(m, f, h ? h(d, m, k) : 0), c._ease = Et.none;
            }
            c.duration() ? z = b = 0 : l.timeline = 0;
          } else if (T) {
            Se(_e(c.vars.defaults, {
              ease: "none"
            })), c._ease = Lt(T.ease || i.ease || "none");
            var P, I, R, B = 0;
            if (F(T)) {
              T.forEach((function(e) {
                return c.to(k, e, ">");
              })), c.duration();
            } else {
              for (p in f = {}, T) {
                "ease" === p || "easeEach" === p || Xt(p, T[p], f, T.easeEach);
              }
              for (p in f) {
                for (P = f[p].sort((function(e, t) {
                  return e.t - t.t;
                })), B = 0, d = 0; d < P.length; d++) {
                  (R = {
                    ease: (I = P[d]).e,
                    duration: (I.t - (d ? P[d - 1].t : 0)) / 100 * z
                  })[p] = I.v, c.to(k, R, B), B += R.duration;
                }
              }
              c.duration() < z && c.to({}, {
                duration: z - c.duration()
              });
            }
          }
          z || l.duration(z = c.duration());
        } else {
          l.timeline = 0;
        }
        return !0 !== x || r || (Nt = e(l), s.killTweensOf(k), Nt = 0), Re(A, e(l), a), 
        i.reversed && l.reverse(), i.paused && l.paused(!0), (_ || !z && !T && l._start === me(A._time) && O(_) && Pe(e(l)) && "nested" !== A.data) && (l._tTime = -1e-8, 
        l.render(Math.max(0, -b) || 0)), E && Be(e(l), E), l;
      }
      t(a, o);
      var n = a.prototype;
      return n.render = function(e, t, o) {
        var r, a, s, n, l, c, d, f, u, p = this._time, m = this._tDur, h = this._dur, g = e < 0, y = e > m - _ && !g ? m : e < _ ? 0 : e;
        if (h) {
          if (y !== this._tTime || !e || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== g) {
            if (r = y, f = this.timeline, this._repeat) {
              if (n = h + this._rDelay, this._repeat < -1 && g) {
                return this.totalTime(100 * n + e, t, o);
              }
              if (r = me(y % n), y === m ? (s = this._repeat, r = h) : ((s = ~~(y / n)) && s === me(y / n) && (r = h, 
              s--), r > h && (r = h)), (c = this._yoyo && 1 & s) && (u = this._yEase, r = h - r), 
              l = Oe(this._tTime, n), r === p && !o && this._initted && s === l) {
                return this._tTime = y, this;
              }
              s !== l && (f && this._yEase && Pt(f, c), this.vars.repeatRefresh && !c && !this._lock && this._time !== n && this._initted && (this._lock = o = 1, 
              this.render(me(n * s), !0).invalidate()._lock = 0));
            }
            if (!this._initted) {
              if (Ne(this, g ? e : r, o, t, y)) {
                return this._tTime = 0, this;
              }
              if (!(p === this._time || o && this.vars.repeatRefresh && s !== l)) {
                return this;
              }
              if (h !== this._dur) {
                return this.render(e, t, o);
              }
            }
            if (this._tTime = y, this._time = r, !this._act && this._ts && (this._act = 1, this._lazy = 0), 
            this.ratio = d = (u || this._ease)(r / h), this._from && (this.ratio = d = 1 - d), 
            r && !p && !t && !s && (ft(this, "onStart"), this._tTime !== y)) {
              return this;
            }
            for (a = this._pt; a; ) {
              a.r(d, a.d), a = a._next;
            }
            f && f.render(e < 0 ? e : f._dur * f._ease(r / this._dur), t, o) || this._startAt && (this._zTime = e), 
            this._onUpdate && !t && (g && Me(this, e, 0, o), ft(this, "onUpdate")), this._repeat && s !== l && this.vars.onRepeat && !t && this.parent && ft(this, "onRepeat"), 
            y !== this._tDur && y || this._tTime !== y || (g && !this._onUpdate && Me(this, e, 0, !0), 
            (e || !h) && (y === this._tDur && this._ts > 0 || !y && this._ts < 0) && Ae(this, 1), 
            t || g && !p || !(y || p || c) || (ft(this, y === m ? "onComplete" : "onReverseComplete", !0), 
            this._prom && !(y < m && this.timeScale() > 0) && this._prom()));
          }
        } else {
          !function(e, t, o, r) {
            var a, s, n, l = e.ratio, c = t < 0 || !t && (!e._start && Ge(e) && (e._initted || !Ye(e)) || (e._ts < 0 || e._dp._ts < 0) && !Ye(e)) ? 0 : 1, d = e._rDelay, f = 0;
            if (d && e._repeat && (f = Ue(0, e._tDur, t), s = Oe(f, d), e._yoyo && 1 & s && (c = 1 - c), 
            s !== Oe(e._tTime, d) && (l = 1 - c, e.vars.repeatRefresh && e._initted && e.invalidate())), 
            c !== l || i || r || e._zTime === _ || !t && e._zTime) {
              if (!e._initted && Ne(e, t, r, o, f)) {
                return;
              }
              for (n = e._zTime, e._zTime = t || (o ? _ : 0), o || (o = t && !n), e.ratio = c, 
              e._from && (c = 1 - c), e._time = 0, e._tTime = f, a = e._pt; a; ) {
                a.r(c, a.d), a = a._next;
              }
              t < 0 && Me(e, t, 0, !0), e._onUpdate && !o && ft(e, "onUpdate"), f && e._repeat && !o && e.parent && ft(e, "onRepeat"), 
              (t >= e._tDur || t < 0) && e.ratio === c && (c && Ae(e, 1), o || i || (ft(e, c ? "onComplete" : "onReverseComplete", !0), 
              e._prom && e._prom()));
            } else {
              e._zTime || (e._zTime = t);
            }
          }(this, e, t, o);
        }
        return this;
      }, n.targets = function() {
        return this._targets;
      }, n.invalidate = function(e) {
        return (!e || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, 
        this._ptLookup = [], this.timeline && this.timeline.invalidate(e), o.prototype.invalidate.call(this, e);
      }, n.resetTo = function(e, t, o, r, i) {
        p || Tt.wake(), this._ts || this.play();
        var a = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
        return this._initted || Ht(this, a), function(e, t, o, r, i, a, s, n) {
          var l, c, d, f, u = (e._pt && e._ptCache || (e._ptCache = {}))[t];
          if (!u) {
            for (u = e._ptCache[t] = [], d = e._ptLookup, f = e._targets.length; f--; ) {
              if ((l = d[f][t]) && l.d && l.d._pt) {
                for (l = l.d._pt; l && l.p !== t && l.fp !== t; ) {
                  l = l._next;
                }
              }
              if (!l) {
                return Gt = 1, e.vars[t] = "+=0", Ht(e, s), Gt = 0, n ? U(t + " not eligible for reset") : 1;
              }
              u.push(l);
            }
          }
          for (f = u.length; f--; ) {
            (l = (c = u[f])._pt || c).s = !r && 0 !== r || i ? l.s + (r || 0) + a * l.c : r, 
            l.c = o - l.s, c.e && (c.e = pe(o) + Ke(c.e)), c.b && (c.b = l.s + Ke(c.b));
          }
        }(this, e, t, o, r, this._ease(a / this._dur), a, i) ? this.resetTo(e, t, o, r, 1) : (qe(this, 0), 
        this.parent || Ee(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), 
        this.render(0));
      }, n.kill = function(e, t) {
        if (void 0 === t && (t = "all"), !(e || t && "all" !== t)) {
          return this._lazy = this._pt = 0, this.parent ? ut(this) : this;
        }
        if (this.timeline) {
          var o = this.timeline.totalDuration();
          return this.timeline.killTweensOf(e, t, Nt && !0 !== Nt.vars.overwrite)._first || ut(this), 
          this.parent && o !== this.timeline.totalDuration() && $e(this, this._dur * this.timeline._tDur / o, 0, 1), 
          this;
        }
        var r, i, a, s, n, l, c, d = this._targets, f = e ? et(e) : d, u = this._ptLookup, p = this._pt;
        if ((!t || "all" === t) && function(e, t) {
          for (var o = e.length, r = o === t.length; r && o-- && e[o] === t[o]; ) {}
          return o < 0;
        }(d, f)) {
          return "all" === t && (this._pt = 0), ut(this);
        }
        for (r = this._op = this._op || [], "all" !== t && (A(t) && (n = {}, ue(t, (function(e) {
          return n[e] = 1;
        })), t = n), t = function(e, t) {
          var o, r, i, a, s = e[0] ? de(e[0]).harness : 0, n = s && s.aliases;
          if (!n) {
            return t;
          }
          for (r in o = we({}, t), n) {
            if (r in o) {
              for (i = (a = n[r].split(",")).length; i--; ) {
                o[a[i]] = o[r];
              }
            }
          }
          return o;
        }(d, t)), c = d.length; c--; ) {
          if (~f.indexOf(d[c])) {
            for (n in i = u[c], "all" === t ? (r[c] = t, s = i, a = {}) : (a = r[c] = r[c] || {}, 
            s = t), s) {
              (l = i && i[n]) && ("kill" in l.d && !0 !== l.d.kill(n) || Ce(this, l, "_pt"), delete i[n]), 
              "all" !== a && (a[n] = 1);
            }
          }
        }
        return this._initted && !this._pt && p && ut(this), this;
      }, a.to = function(e, t) {
        return new a(e, t, arguments[2]);
      }, a.from = function(e, t) {
        return je(1, arguments);
      }, a.delayedCall = function(e, t, o, r) {
        return new a(t, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: e,
          onComplete: t,
          onReverseComplete: t,
          onCompleteParams: o,
          onReverseCompleteParams: o,
          callbackScope: r
        });
      }, a.fromTo = function(e, t, o) {
        return je(2, arguments);
      }, a.set = function(e, t) {
        return t.duration = 0, t.repeatDelay || (t.repeat = 0), new a(e, t);
      }, a.killTweensOf = function(e, t, o) {
        return s.killTweensOf(e, t, o);
      }, a;
    }(Rt);
    _e(Kt.prototype, {
      _targets: [],
      _lazy: 0,
      _startAt: 0,
      _op: 0,
      _onInit: 0
    }), ue("staggerTo,staggerFrom,staggerFromTo", (function(e) {
      Kt[e] = function() {
        var t = new Bt, o = Qe.call(arguments, 0);
        return o.splice("staggerFromTo" === e ? 5 : 4, 0, 0), t[e].apply(t, o);
      };
    }));
    var Qt = function(e, t, o) {
      return e[t] = o;
    }, Zt = function(e, t, o) {
      return e[t](o);
    }, Jt = function(e, t, o, r) {
      return e[t](r.fp, o);
    }, eo = function(e, t, o) {
      return e.setAttribute(t, o);
    }, to = function(e, t) {
      return k(e[t]) ? Zt : P(e[t]) && e.setAttribute ? eo : Qt;
    }, oo = function(e, t) {
      return t.set(t.t, t.p, Math.round(1e6 * (t.s + t.c * e)) / 1e6, t);
    }, ro = function(e, t) {
      return t.set(t.t, t.p, !!(t.s + t.c * e), t);
    }, io = function(e, t) {
      var o = t._pt, r = "";
      if (!e && t.b) {
        r = t.b;
      } else if (1 === e && t.e) {
        r = t.e;
      } else {
        for (;o; ) {
          r = o.p + (o.m ? o.m(o.s + o.c * e) : Math.round(1e4 * (o.s + o.c * e)) / 1e4) + r, 
          o = o._next;
        }
        r += t.c;
      }
      t.set(t.t, t.p, r, t);
    }, ao = function(e, t) {
      for (var o = t._pt; o; ) {
        o.r(e, o.d), o = o._next;
      }
    }, so = function(e, t, o, r) {
      for (var i, a = this._pt; a; ) {
        i = a._next, a.p === r && a.modifier(e, t, o), a = i;
      }
    }, no = function(e) {
      for (var t, o, r = this._pt; r; ) {
        o = r._next, r.p === e && !r.op || r.op === e ? Ce(this, r, "_pt") : r.dep || (t = 1), 
        r = o;
      }
      return !t;
    }, lo = function(e, t, o, r) {
      r.mSet(e, t, r.m.call(r.tween, o, r.mt), r);
    }, co = function(e) {
      for (var t, o, r, i, a = e._pt; a; ) {
        for (t = a._next, o = r; o && o.pr > a.pr; ) {
          o = o._next;
        }
        (a._prev = o ? o._prev : i) ? a._prev._next = a : r = a, (a._next = o) ? o._prev = a : i = a, 
        a = t;
      }
      e._pt = r;
    }, fo = function() {
      function e(e, t, o, r, i, a, s, n, l) {
        this.t = t, this.s = r, this.c = i, this.p = o, this.r = a || oo, this.d = s || this, 
        this.set = n || Qt, this.pr = l || 0, this._next = e, e && (e._prev = this);
      }
      return e.prototype.modifier = function(e, t, o) {
        this.mSet = this.mSet || this.set, this.set = lo, this.m = e, this.mt = o, this.tween = t;
      }, e;
    }();
    ue(le + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function(e) {
      return te[e] = 1;
    })), H.TweenMax = H.TweenLite = Kt, H.TimelineLite = H.TimelineMax = Bt, s = new Bt({
      sortChildren: !1,
      defaults: z,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0
    }), v.stringFilter = xt;
    var uo = [], po = {}, mo = [], ho = 0, go = 0, yo = function(e) {
      return (po[e] || mo).map((function(e) {
        return e();
      }));
    }, vo = function() {
      var e = Date.now(), t = [];
      e - ho > 2 && (yo("matchMediaInit"), uo.forEach((function(e) {
        var o, r, i, a, s = e.queries, l = e.conditions;
        for (r in s) {
          (o = n.matchMedia(s[r]).matches) && (i = 1), o !== l[r] && (l[r] = o, a = 1);
        }
        a && (e.revert(), i && t.push(e));
      })), yo("matchMediaRevert"), t.forEach((function(e) {
        return e.onMatch(e, (function(t) {
          return e.add(null, t);
        }));
      })), ho = e, yo("matchMedia"));
    }, zo = function() {
      function e(e, t) {
        this.selector = t && tt(t), this.data = [], this._r = [], this.isReverted = !1, 
        this.id = go++, e && this.add(e);
      }
      var t = e.prototype;
      return t.add = function(e, t, o) {
        k(e) && (o = t, t = e, e = k);
        var r = this, i = function() {
          var e, i = a, s = r.selector;
          return i && i !== r && i.data.push(r), o && (r.selector = tt(o)), a = r, e = t.apply(r, arguments), 
          k(e) && r._r.push(e), a = i, r.selector = s, r.isReverted = !1, e;
        };
        return r.last = i, e === k ? i(r, (function(e) {
          return r.add(null, e);
        })) : e ? r[e] = i : i;
      }, t.ignore = function(e) {
        var t = a;
        a = null, e(this), a = t;
      }, t.getTweens = function() {
        var t = [];
        return this.data.forEach((function(o) {
          return o instanceof e ? t.push.apply(t, o.getTweens()) : o instanceof Kt && !(o.parent && "nested" === o.parent.data) && t.push(o);
        })), t;
      }, t.clear = function() {
        this._r.length = this.data.length = 0;
      }, t.kill = function(e, t) {
        var o = this;
        if (e ? function() {
          for (var t, r = o.getTweens(), i = o.data.length; i--; ) {
            "isFlip" === (t = o.data[i]).data && (t.revert(), t.getChildren(!0, !0, !1).forEach((function(e) {
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
          })), i = o.data.length; i--; ) {
            (t = o.data[i]) instanceof Bt ? "nested" !== t.data && (t.scrollTrigger && t.scrollTrigger.revert(), 
            t.kill()) : !(t instanceof Kt) && t.revert && t.revert(e);
          }
          o._r.forEach((function(t) {
            return t(e, o);
          })), o.isReverted = !0;
        }() : this.data.forEach((function(e) {
          return e.kill && e.kill();
        })), this.clear(), t) {
          for (var r = uo.length; r--; ) {
            uo[r].id === this.id && uo.splice(r, 1);
          }
        }
      }, t.revert = function(e) {
        this.kill(e || {});
      }, e;
    }(), bo = function() {
      function e(e) {
        this.contexts = [], this.scope = e, a && a.data.push(this);
      }
      var t = e.prototype;
      return t.add = function(e, t, o) {
        L(e) || (e = {
          matches: e
        });
        var r, i, s, l = new zo(0, o || this.scope), c = l.conditions = {};
        for (i in a && !l.selector && (l.selector = a.selector), this.contexts.push(l), 
        t = l.add("onMatch", t), l.queries = e, e) {
          "all" === i ? s = 1 : (r = n.matchMedia(e[i])) && (uo.indexOf(l) < 0 && uo.push(l), 
          (c[i] = r.matches) && (s = 1), r.addListener ? r.addListener(vo) : r.addEventListener("change", vo));
        }
        return s && t(l, (function(e) {
          return l.add(null, e);
        })), this;
      }, t.revert = function(e) {
        this.kill(e || {});
      }, t.kill = function(e) {
        this.contexts.forEach((function(t) {
          return t.kill(e, !0);
        }));
      }, e;
    }(), _o = {
      registerPlugin: function() {
        for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) {
          t[o] = arguments[o];
        }
        t.forEach((function(e) {
          return mt(e);
        }));
      },
      timeline: function(e) {
        return new Bt(e);
      },
      getTweensOf: function(e, t) {
        return s.getTweensOf(e, t);
      },
      getProperty: function(e, t, o, r) {
        A(e) && (e = et(e)[0]);
        var i = de(e || {}).get, a = o ? be : ze;
        return "native" === o && (o = ""), e ? t ? a((ie[t] && ie[t].get || i)(e, t, o, r)) : function(t, o, r) {
          return a((ie[t] && ie[t].get || i)(e, t, o, r));
        } : e;
      },
      quickSetter: function(e, t, o) {
        if ((e = et(e)).length > 1) {
          var r = e.map((function(e) {
            return To.quickSetter(e, t, o);
          })), i = r.length;
          return function(e) {
            for (var t = i; t--; ) {
              r[t](e);
            }
          };
        }
        e = e[0] || {};
        var a = ie[t], s = de(e), n = s.harness && (s.harness.aliases || {})[t] || t, l = a ? function(t) {
          var r = new a;
          u._pt = 0, r.init(e, o ? t + o : t, u, 0, [ e ]), r.render(1, r), u._pt && ao(1, u);
        } : s.set(e, n);
        return a ? l : function(t) {
          return l(e, n, o ? t + o : t, s, 1);
        };
      },
      quickTo: function(e, t, o) {
        var r, i = To.to(e, we(((r = {})[t] = "+=0.1", r.paused = !0, r), o || {})), a = function(e, o, r) {
          return i.resetTo(t, e, o, r);
        };
        return a.tween = i, a;
      },
      isTweening: function(e) {
        return s.getTweensOf(e, !0).length > 0;
      },
      defaults: function(e) {
        return e && e.ease && (e.ease = Lt(e.ease, z.ease)), xe(z, e || {});
      },
      config: function(e) {
        return xe(v, e || {});
      },
      registerEffect: function(e) {
        var t = e.name, o = e.effect, r = e.plugins, i = e.defaults, a = e.extendTimeline;
        (r || "").split(",").forEach((function(e) {
          return e && !ie[e] && !H[e] && U(t + " effect requires " + e + " plugin.");
        })), ae[t] = function(e, t, r) {
          return o(et(e), _e(t || {}, i), r);
        }, a && (Bt.prototype[t] = function(e, o, r) {
          return this.add(ae[t](e, L(o) ? o : (r = o) && {}, this), r);
        });
      },
      registerEase: function(e, t) {
        Et[e] = Lt(t);
      },
      parseEase: function(e, t) {
        return arguments.length ? Lt(e, t) : Et;
      },
      getById: function(e) {
        return s.getById(e);
      },
      exportRoot: function(e, t) {
        void 0 === e && (e = {});
        var o, r, i = new Bt(e);
        for (i.smoothChildTiming = O(e.smoothChildTiming), s.remove(i), i._dp = 0, i._time = i._tTime = s._time, 
        o = s._first; o; ) {
          r = o._next, !t && !o._dur && o instanceof Kt && o.vars.onComplete === o._targets[0] || Re(i, o, o._start - o._delay), 
          o = r;
        }
        return Re(s, i, 0), i;
      },
      context: function(e, t) {
        return e ? new zo(e, t) : a;
      },
      matchMedia: function(e) {
        return new bo(e);
      },
      matchMediaRefresh: function() {
        return uo.forEach((function(e) {
          var t, o, r = e.conditions;
          for (o in r) {
            r[o] && (r[o] = !1, t = 1);
          }
          t && e.revert();
        })) || vo();
      },
      addEventListener: function(e, t) {
        var o = po[e] || (po[e] = []);
        ~o.indexOf(t) || o.push(t);
      },
      removeEventListener: function(e, t) {
        var o = po[e], r = o && o.indexOf(t);
        r >= 0 && o.splice(r, 1);
      },
      utils: {
        wrap: function e(t, o, r) {
          var i = o - t;
          return F(t) ? nt(t, e(0, t.length), o) : We(r, (function(e) {
            return (i + (e - t) % i) % i + t;
          }));
        },
        wrapYoyo: function e(t, o, r) {
          var i = o - t, a = 2 * i;
          return F(t) ? nt(t, e(0, t.length - 1), o) : We(r, (function(e) {
            return t + ((e = (a + (e - t) % a) % a || 0) > i ? a - e : e);
          }));
        },
        distribute: rt,
        random: st,
        snap: at,
        normalize: function(e, t, o) {
          return ct(e, t, 0, 1, o);
        },
        getUnit: Ke,
        clamp: function(e, t, o) {
          return We(o, (function(o) {
            return Ue(e, t, o);
          }));
        },
        splitColor: vt,
        toArray: et,
        selector: tt,
        mapRange: ct,
        pipe: function() {
          for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++) {
            t[o] = arguments[o];
          }
          return function(e) {
            return t.reduce((function(e, t) {
              return t(e);
            }), e);
          };
        },
        unitize: function(e, t) {
          return function(o) {
            return e(parseFloat(o)) + (t || Ke(o));
          };
        },
        interpolate: function e(t, o, r, i) {
          var a = isNaN(t + o) ? 0 : function(e) {
            return (1 - e) * t + e * o;
          };
          if (!a) {
            var s, n, l, c, d, f = A(t), u = {};
            if (!0 === r && (i = 1) && (r = null), f) {
              t = {
                p: t
              }, o = {
                p: o
              };
            } else if (F(t) && !F(o)) {
              for (l = [], c = t.length, d = c - 2, n = 1; n < c; n++) {
                l.push(e(t[n - 1], t[n]));
              }
              c--, a = function(e) {
                e *= c;
                var t = Math.min(d, ~~e);
                return l[t](e - t);
              }, r = o;
            } else {
              i || (t = we(F(t) ? [] : {}, t));
            }
            if (!l) {
              for (s in o) {
                $t.call(u, t, s, "get", o[s]);
              }
              a = function(e) {
                return ao(e, u) || (f ? t.p : t);
              };
            }
          }
          return We(r, a);
        },
        shuffle: ot
      },
      install: j,
      effects: ae,
      ticker: Tt,
      updateRoot: Bt.updateRoot,
      plugins: ie,
      globalTimeline: s,
      core: {
        PropTween: fo,
        globals: K,
        Tween: Kt,
        Timeline: Bt,
        Animation: Rt,
        getCache: de,
        _removeLinkedListItem: Ce,
        reverting: function() {
          return i;
        },
        context: function(e) {
          return e && a && (a.data.push(e), e._ctx = a), a;
        },
        suppressOverwrites: function(e) {
          return r = e;
        }
      }
    };
    ue("to,from,fromTo,delayedCall,set,killTweensOf", (function(e) {
      return _o[e] = Kt[e];
    })), Tt.add(Bt.updateRoot), u = _o.to({}, {
      duration: 0
    });
    var wo = function(e, t) {
      for (var o = e._pt; o && o.p !== t && o.op !== t && o.fp !== t; ) {
        o = o._next;
      }
      return o;
    }, xo = function(e, t) {
      return {
        name: e,
        rawVars: 1,
        init: function(e, o, r) {
          r._onInit = function(e) {
            var r, i;
            if (A(o) && (r = {}, ue(o, (function(e) {
              return r[e] = 1;
            })), o = r), t) {
              for (i in r = {}, o) {
                r[i] = t(o[i]);
              }
              o = r;
            }
            !function(e, t) {
              var o, r, i, a = e._targets;
              for (o in t) {
                for (r = a.length; r--; ) {
                  (i = e._ptLookup[r][o]) && (i = i.d) && (i._pt && (i = wo(i, o)), i && i.modifier && i.modifier(t[o], e, a[r], o));
                }
              }
            }(e, o);
          };
        }
      };
    }, To = _o.registerPlugin({
      name: "attr",
      init: function(e, t, o, r, i) {
        var a, s, n;
        for (a in this.tween = o, t) {
          n = e.getAttribute(a) || "", (s = this.add(e, "setAttribute", (n || 0) + "", t[a], r, i, 0, 0, a)).op = a, 
          s.b = n, this._props.push(a);
        }
      },
      render: function(e, t) {
        for (var o = t._pt; o; ) {
          i ? o.set(o.t, o.p, o.b, o) : o.r(e, o.d), o = o._next;
        }
      }
    }, {
      name: "endArray",
      init: function(e, t) {
        for (var o = t.length; o--; ) {
          this.add(e, o, e[o] || 0, t[o], 0, 0, 0, 0, 0, 1);
        }
      }
    }, xo("roundProps", it), xo("modifiers"), xo("snap", at)) || _o;
    Kt.version = Bt.version = To.version = "3.12.5", d = 1, I() && St();
    Et.Power0, Et.Power1, Et.Power2, Et.Power3, Et.Power4, Et.Linear, Et.Quad, Et.Cubic, 
    Et.Quart, Et.Quint, Et.Strong, Et.Elastic, Et.Back, Et.SteppedEase, Et.Bounce, Et.Sine, 
    Et.Expo, Et.Circ;
    var So, Eo, Co, Ao, ko, Mo, Po, Lo, Oo = {}, Io = 180 / Math.PI, Do = Math.PI / 180, qo = Math.atan2, Fo = /([A-Z])/g, Ro = /(left|right|width|margin|padding|x)/i, Bo = /[\s,\(]\S/, No = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity"
    }, Go = function(e, t) {
      return t.set(t.t, t.p, Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t);
    }, Yo = function(e, t) {
      return t.set(t.t, t.p, 1 === e ? t.e : Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u, t);
    }, $o = function(e, t) {
      return t.set(t.t, t.p, e ? Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u : t.b, t);
    }, Vo = function(e, t) {
      var o = t.s + t.c * e;
      t.set(t.t, t.p, ~~(o + (o < 0 ? -.5 : .5)) + t.u, t);
    }, Ho = function(e, t) {
      return t.set(t.t, t.p, e ? t.e : t.b, t);
    }, Xo = function(e, t) {
      return t.set(t.t, t.p, 1 !== e ? t.b : t.e, t);
    }, jo = function(e, t, o) {
      return e.style[t] = o;
    }, Wo = function(e, t, o) {
      return e.style.setProperty(t, o);
    }, Uo = function(e, t, o) {
      return e._gsap[t] = o;
    }, Ko = function(e, t, o) {
      return e._gsap.scaleX = e._gsap.scaleY = o;
    }, Qo = function(e, t, o, r, i) {
      var a = e._gsap;
      a.scaleX = a.scaleY = o, a.renderTransform(i, a);
    }, Zo = function(e, t, o, r, i) {
      var a = e._gsap;
      a[t] = o, a.renderTransform(i, a);
    }, Jo = "transform", er = Jo + "Origin", tr = function e(t, o) {
      var r = this, i = this.target, a = i.style, s = i._gsap;
      if (t in Oo && a) {
        if (this.tfm = this.tfm || {}, "transform" === t) {
          return No.transform.split(",").forEach((function(t) {
            return e.call(r, t, o);
          }));
        }
        if (~(t = No[t] || t).indexOf(",") ? t.split(",").forEach((function(e) {
          return r.tfm[e] = zr(i, e);
        })) : this.tfm[t] = s.x ? s[t] : zr(i, t), t === er && (this.tfm.zOrigin = s.zOrigin), 
        this.props.indexOf(Jo) >= 0) {
          return;
        }
        s.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(er, o, "")), 
        t = Jo;
      }
      (a || o) && this.props.push(t, o, a[t]);
    }, or = function(e) {
      e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
    }, rr = function() {
      var e, t, o = this.props, r = this.target, i = r.style, a = r._gsap;
      for (e = 0; e < o.length; e += 3) {
        o[e + 1] ? r[o[e]] = o[e + 2] : o[e + 2] ? i[o[e]] = o[e + 2] : i.removeProperty("--" === o[e].substr(0, 2) ? o[e] : o[e].replace(Fo, "-$1").toLowerCase());
      }
      if (this.tfm) {
        for (t in this.tfm) {
          a[t] = this.tfm[t];
        }
        a.svg && (a.renderTransform(), r.setAttribute("data-svg-origin", this.svgo || "")), 
        (e = Po()) && e.isStart || i[Jo] || (or(i), a.zOrigin && i[er] && (i[er] += " " + a.zOrigin + "px", 
        a.zOrigin = 0, a.renderTransform()), a.uncache = 1);
      }
    }, ir = function(e, t) {
      var o = {
        target: e,
        props: [],
        revert: rr,
        save: tr
      };
      return e._gsap || To.core.getCache(e), t && t.split(",").forEach((function(e) {
        return o.save(e);
      })), o;
    }, ar = function(e, t) {
      var o = Eo.createElementNS ? Eo.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Eo.createElement(e);
      return o && o.style ? o : Eo.createElement(e);
    }, sr = function e(t, o, r) {
      var i = getComputedStyle(t);
      return i[o] || i.getPropertyValue(o.replace(Fo, "-$1").toLowerCase()) || i.getPropertyValue(o) || !r && e(t, lr(o) || o, 1) || "";
    }, nr = "O,Moz,ms,Ms,Webkit".split(","), lr = function(e, t, o) {
      var r = (t || ko).style, i = 5;
      if (e in r && !o) {
        return e;
      }
      for (e = e.charAt(0).toUpperCase() + e.substr(1); i-- && !(nr[i] + e in r); ) {}
      return i < 0 ? null : (3 === i ? "ms" : i >= 0 ? nr[i] : "") + e;
    }, cr = function() {
      "undefined" != typeof window && window.document && (So = window, Eo = So.document, 
      Co = Eo.documentElement, ko = ar("div") || {
        style: {}
      }, ar("div"), Jo = lr(Jo), er = Jo + "Origin", ko.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", 
      Lo = !!lr("perspective"), Po = To.core.reverting, Ao = 1);
    }, dr = function e(t) {
      var o, r = ar("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), i = this.parentNode, a = this.nextSibling, s = this.style.cssText;
      if (Co.appendChild(r), r.appendChild(this), this.style.display = "block", t) {
        try {
          o = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = e;
        } catch (e) {}
      } else {
        this._gsapBBox && (o = this._gsapBBox());
      }
      return i && (a ? i.insertBefore(this, a) : i.appendChild(this)), Co.removeChild(r), 
      this.style.cssText = s, o;
    }, fr = function(e, t) {
      for (var o = t.length; o--; ) {
        if (e.hasAttribute(t[o])) {
          return e.getAttribute(t[o]);
        }
      }
    }, ur = function(e) {
      var t;
      try {
        t = e.getBBox();
      } catch (o) {
        t = dr.call(e, !0);
      }
      return t && (t.width || t.height) || e.getBBox === dr || (t = dr.call(e, !0)), !t || t.width || t.x || t.y ? t : {
        x: +fr(e, [ "x", "cx", "x1" ]) || 0,
        y: +fr(e, [ "y", "cy", "y1" ]) || 0,
        width: 0,
        height: 0
      };
    }, pr = function(e) {
      return !(!e.getCTM || e.parentNode && !e.ownerSVGElement || !ur(e));
    }, mr = function(e, t) {
      if (t) {
        var o, r = e.style;
        t in Oo && t !== er && (t = Jo), r.removeProperty ? ("ms" !== (o = t.substr(0, 2)) && "webkit" !== t.substr(0, 6) || (t = "-" + t), 
        r.removeProperty("--" === o ? t : t.replace(Fo, "-$1").toLowerCase())) : r.removeAttribute(t);
      }
    }, hr = function(e, t, o, r, i, a) {
      var s = new fo(e._pt, t, o, 0, 1, a ? Xo : Ho);
      return e._pt = s, s.b = r, s.e = i, e._props.push(o), s;
    }, gr = {
      deg: 1,
      rad: 1,
      turn: 1
    }, yr = {
      grid: 1,
      flex: 1
    }, vr = function e(t, o, r, i) {
      var a, s, n, l, c = parseFloat(r) || 0, d = (r + "").trim().substr((c + "").length) || "px", f = ko.style, u = Ro.test(o), p = "svg" === t.tagName.toLowerCase(), m = (p ? "client" : "offset") + (u ? "Width" : "Height"), h = 100, g = "px" === i, y = "%" === i;
      if (i === d || !c || gr[i] || gr[d]) {
        return c;
      }
      if ("px" !== d && !g && (c = e(t, o, r, "px")), l = t.getCTM && pr(t), (y || "%" === d) && (Oo[o] || ~o.indexOf("adius"))) {
        return a = l ? t.getBBox()[u ? "width" : "height"] : t[m], pe(y ? c / a * h : c / 100 * a);
      }
      if (f[u ? "width" : "height"] = h + (g ? d : i), s = ~o.indexOf("adius") || "em" === i && t.appendChild && !p ? t : t.parentNode, 
      l && (s = (t.ownerSVGElement || {}).parentNode), s && s !== Eo && s.appendChild || (s = Eo.body), 
      (n = s._gsap) && y && n.width && u && n.time === Tt.time && !n.uncache) {
        return pe(c / n.width * h);
      }
      if (!y || "height" !== o && "width" !== o) {
        (y || "%" === d) && !yr[sr(s, "display")] && (f.position = sr(t, "position")), s === t && (f.position = "static"), 
        s.appendChild(ko), a = ko[m], s.removeChild(ko), f.position = "absolute";
      } else {
        var v = t.style[o];
        t.style[o] = h + i, a = t[m], v ? t.style[o] = v : mr(t, o);
      }
      return u && y && ((n = de(s)).time = Tt.time, n.width = s[m]), pe(g ? a * c / h : a && c ? h / a * c : 0);
    }, zr = function(e, t, o, r) {
      var i;
      return Ao || cr(), t in No && "transform" !== t && ~(t = No[t]).indexOf(",") && (t = t.split(",")[0]), 
      Oo[t] && "transform" !== t ? (i = Mr(e, r), i = "transformOrigin" !== t ? i[t] : i.svg ? i.origin : Pr(sr(e, er)) + " " + i.zOrigin + "px") : (!(i = e.style[t]) || "auto" === i || r || ~(i + "").indexOf("calc(")) && (i = xr[t] && xr[t](e, t, o) || sr(e, t) || fe(e, t) || ("opacity" === t ? 1 : 0)), 
      o && !~(i + "").trim().indexOf(" ") ? vr(e, t, i, o) + o : i;
    }, br = function(e, t, o, r) {
      if (!o || "none" === o) {
        var i = lr(t, e, 1), a = i && sr(e, i, 1);
        a && a !== o ? (t = i, o = a) : "borderColor" === t && (o = sr(e, "borderTopColor"));
      }
      var s, n, l, c, d, f, u, p, m, h, g, y = new fo(this._pt, e.style, t, 0, 1, io), z = 0, b = 0;
      if (y.b = o, y.e = r, o += "", "auto" === (r += "") && (f = e.style[t], e.style[t] = r, 
      r = sr(e, t) || r, f ? e.style[t] = f : mr(e, t)), xt(s = [ o, r ]), r = s[1], l = (o = s[0]).match(N) || [], 
      (r.match(N) || []).length) {
        for (;n = N.exec(r); ) {
          u = n[0], m = r.substring(z, n.index), d ? d = (d + 1) % 5 : "rgba(" !== m.substr(-5) && "hsla(" !== m.substr(-5) || (d = 1), 
          u !== (f = l[b++] || "") && (c = parseFloat(f) || 0, g = f.substr((c + "").length), 
          "=" === u.charAt(1) && (u = he(c, u) + g), p = parseFloat(u), h = u.substr((p + "").length), 
          z = N.lastIndex - h.length, h || (h = h || v.units[t] || g, z === r.length && (r += h, 
          y.e += h)), g !== h && (c = vr(e, t, f, h) || 0), y._pt = {
            _next: y._pt,
            p: m || 1 === b ? m : ",",
            s: c,
            c: p - c,
            m: d && d < 4 || "zIndex" === t ? Math.round : 0
          });
        }
        y.c = z < r.length ? r.substring(z, r.length) : "";
      } else {
        y.r = "display" === t && "none" === r ? Xo : Ho;
      }
      return Y.test(r) && (y.e = 0), this._pt = y, y;
    }, _r = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%"
    }, wr = function(e, t) {
      if (t.tween && t.tween._time === t.tween._dur) {
        var o, r, i, a = t.t, s = a.style, n = t.u, l = a._gsap;
        if ("all" === n || !0 === n) {
          s.cssText = "", r = 1;
        } else {
          for (i = (n = n.split(",")).length; --i > -1; ) {
            o = n[i], Oo[o] && (r = 1, o = "transformOrigin" === o ? er : Jo), mr(a, o);
          }
        }
        r && (mr(a, Jo), l && (l.svg && a.removeAttribute("transform"), Mr(a, 1), l.uncache = 1, 
        or(s)));
      }
    }, xr = {
      clearProps: function(e, t, o, r, i) {
        if ("isFromStart" !== i.data) {
          var a = e._pt = new fo(e._pt, t, o, 0, 0, wr);
          return a.u = r, a.pr = -10, a.tween = i, e._props.push(o), 1;
        }
      }
    }, Tr = [ 1, 0, 0, 1, 0, 0 ], Sr = {}, Er = function(e) {
      return "matrix(1, 0, 0, 1, 0, 0)" === e || "none" === e || !e;
    }, Cr = function(e) {
      var t = sr(e, Jo);
      return Er(t) ? Tr : t.substr(7).match(B).map(pe);
    }, Ar = function(e, t) {
      var o, r, i, a, s = e._gsap || de(e), n = e.style, l = Cr(e);
      return s.svg && e.getAttribute("transform") ? "1,0,0,1,0,0" === (l = [ (i = e.transform.baseVal.consolidate().matrix).a, i.b, i.c, i.d, i.e, i.f ]).join(",") ? Tr : l : (l !== Tr || e.offsetParent || e === Co || s.svg || (i = n.display, 
      n.display = "block", (o = e.parentNode) && e.offsetParent || (a = 1, r = e.nextElementSibling, 
      Co.appendChild(e)), l = Cr(e), i ? n.display = i : mr(e, "display"), a && (r ? o.insertBefore(e, r) : o ? o.appendChild(e) : Co.removeChild(e))), 
      t && l.length > 6 ? [ l[0], l[1], l[4], l[5], l[12], l[13] ] : l);
    }, kr = function(e, t, o, r, i, a) {
      var s, n, l, c = e._gsap, d = i || Ar(e, !0), f = c.xOrigin || 0, u = c.yOrigin || 0, p = c.xOffset || 0, m = c.yOffset || 0, h = d[0], g = d[1], y = d[2], v = d[3], z = d[4], b = d[5], _ = t.split(" "), w = parseFloat(_[0]) || 0, x = parseFloat(_[1]) || 0;
      o ? d !== Tr && (n = h * v - g * y) && (l = w * (-g / n) + x * (h / n) - (h * b - g * z) / n, 
      w = w * (v / n) + x * (-y / n) + (y * b - v * z) / n, x = l) : (w = (s = ur(e)).x + (~_[0].indexOf("%") ? w / 100 * s.width : w), 
      x = s.y + (~(_[1] || _[0]).indexOf("%") ? x / 100 * s.height : x)), r || !1 !== r && c.smooth ? (z = w - f, 
      b = x - u, c.xOffset = p + (z * h + b * y) - z, c.yOffset = m + (z * g + b * v) - b) : c.xOffset = c.yOffset = 0, 
      c.xOrigin = w, c.yOrigin = x, c.smooth = !!r, c.origin = t, c.originIsAbsolute = !!o, 
      e.style[er] = "0px 0px", a && (hr(a, c, "xOrigin", f, w), hr(a, c, "yOrigin", u, x), 
      hr(a, c, "xOffset", p, c.xOffset), hr(a, c, "yOffset", m, c.yOffset)), e.setAttribute("data-svg-origin", w + " " + x);
    }, Mr = function(e, t) {
      var o = e._gsap || new Ft(e);
      if ("x" in o && !t && !o.uncache) {
        return o;
      }
      var r, i, a, s, n, l, c, d, f, u, p, m, h, g, y, z, b, _, w, x, T, S, E, C, A, k, M, P, L, O, I, D, q = e.style, F = o.scaleX < 0, R = "px", B = "deg", N = getComputedStyle(e), G = sr(e, er) || "0";
      return r = i = a = l = c = d = f = u = p = 0, s = n = 1, o.svg = !(!e.getCTM || !pr(e)), 
      N.translate && ("none" === N.translate && "none" === N.scale && "none" === N.rotate || (q[Jo] = ("none" !== N.translate ? "translate3d(" + (N.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + ("none" !== N.rotate ? "rotate(" + N.rotate + ") " : "") + ("none" !== N.scale ? "scale(" + N.scale.split(" ").join(",") + ") " : "") + ("none" !== N[Jo] ? N[Jo] : "")), 
      q.scale = q.rotate = q.translate = "none"), g = Ar(e, o.svg), o.svg && (o.uncache ? (A = e.getBBox(), 
      G = o.xOrigin - A.x + "px " + (o.yOrigin - A.y) + "px", C = "") : C = !t && e.getAttribute("data-svg-origin"), 
      kr(e, C || G, !!C || o.originIsAbsolute, !1 !== o.smooth, g)), m = o.xOrigin || 0, 
      h = o.yOrigin || 0, g !== Tr && (_ = g[0], w = g[1], x = g[2], T = g[3], r = S = g[4], 
      i = E = g[5], 6 === g.length ? (s = Math.sqrt(_ * _ + w * w), n = Math.sqrt(T * T + x * x), 
      l = _ || w ? qo(w, _) * Io : 0, (f = x || T ? qo(x, T) * Io + l : 0) && (n *= Math.abs(Math.cos(f * Do))), 
      o.svg && (r -= m - (m * _ + h * x), i -= h - (m * w + h * T))) : (D = g[6], O = g[7], 
      M = g[8], P = g[9], L = g[10], I = g[11], r = g[12], i = g[13], a = g[14], c = (y = qo(D, L)) * Io, 
      y && (C = S * (z = Math.cos(-y)) + M * (b = Math.sin(-y)), A = E * z + P * b, k = D * z + L * b, 
      M = S * -b + M * z, P = E * -b + P * z, L = D * -b + L * z, I = O * -b + I * z, 
      S = C, E = A, D = k), d = (y = qo(-x, L)) * Io, y && (z = Math.cos(-y), I = T * (b = Math.sin(-y)) + I * z, 
      _ = C = _ * z - M * b, w = A = w * z - P * b, x = k = x * z - L * b), l = (y = qo(w, _)) * Io, 
      y && (C = _ * (z = Math.cos(y)) + w * (b = Math.sin(y)), A = S * z + E * b, w = w * z - _ * b, 
      E = E * z - S * b, _ = C, S = A), c && Math.abs(c) + Math.abs(l) > 359.9 && (c = l = 0, 
      d = 180 - d), s = pe(Math.sqrt(_ * _ + w * w + x * x)), n = pe(Math.sqrt(E * E + D * D)), 
      y = qo(S, E), f = Math.abs(y) > 2e-4 ? y * Io : 0, p = I ? 1 / (I < 0 ? -I : I) : 0), 
      o.svg && (C = e.getAttribute("transform"), o.forceCSS = e.setAttribute("transform", "") || !Er(sr(e, Jo)), 
      C && e.setAttribute("transform", C))), Math.abs(f) > 90 && Math.abs(f) < 270 && (F ? (s *= -1, 
      f += l <= 0 ? 180 : -180, l += l <= 0 ? 180 : -180) : (n *= -1, f += f <= 0 ? 180 : -180)), 
      t = t || o.uncache, o.x = r - ((o.xPercent = r && (!t && o.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-r) ? -50 : 0))) ? e.offsetWidth * o.xPercent / 100 : 0) + R, 
      o.y = i - ((o.yPercent = i && (!t && o.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-i) ? -50 : 0))) ? e.offsetHeight * o.yPercent / 100 : 0) + R, 
      o.z = a + R, o.scaleX = pe(s), o.scaleY = pe(n), o.rotation = pe(l) + B, o.rotationX = pe(c) + B, 
      o.rotationY = pe(d) + B, o.skewX = f + B, o.skewY = u + B, o.transformPerspective = p + R, 
      (o.zOrigin = parseFloat(G.split(" ")[2]) || !t && o.zOrigin || 0) && (q[er] = Pr(G)), 
      o.xOffset = o.yOffset = 0, o.force3D = v.force3D, o.renderTransform = o.svg ? Rr : Lo ? Fr : Or, 
      o.uncache = 0, o;
    }, Pr = function(e) {
      return (e = e.split(" "))[0] + " " + e[1];
    }, Lr = function(e, t, o) {
      var r = Ke(t);
      return pe(parseFloat(t) + parseFloat(vr(e, "x", o + "px", r))) + r;
    }, Or = function(e, t) {
      t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, Fr(e, t);
    }, Ir = "0deg", Dr = "0px", qr = ") ", Fr = function(e, t) {
      var o = t || this, r = o.xPercent, i = o.yPercent, a = o.x, s = o.y, n = o.z, l = o.rotation, c = o.rotationY, d = o.rotationX, f = o.skewX, u = o.skewY, p = o.scaleX, m = o.scaleY, h = o.transformPerspective, g = o.force3D, y = o.target, v = o.zOrigin, z = "", b = "auto" === g && e && 1 !== e || !0 === g;
      if (v && (d !== Ir || c !== Ir)) {
        var _, w = parseFloat(c) * Do, x = Math.sin(w), T = Math.cos(w);
        w = parseFloat(d) * Do, _ = Math.cos(w), a = Lr(y, a, x * _ * -v), s = Lr(y, s, -Math.sin(w) * -v), 
        n = Lr(y, n, T * _ * -v + v);
      }
      h !== Dr && (z += "perspective(" + h + qr), (r || i) && (z += "translate(" + r + "%, " + i + "%) "), 
      (b || a !== Dr || s !== Dr || n !== Dr) && (z += n !== Dr || b ? "translate3d(" + a + ", " + s + ", " + n + ") " : "translate(" + a + ", " + s + qr), 
      l !== Ir && (z += "rotate(" + l + qr), c !== Ir && (z += "rotateY(" + c + qr), d !== Ir && (z += "rotateX(" + d + qr), 
      f === Ir && u === Ir || (z += "skew(" + f + ", " + u + qr), 1 === p && 1 === m || (z += "scale(" + p + ", " + m + qr), 
      y.style[Jo] = z || "translate(0, 0)";
    }, Rr = function(e, t) {
      var o, r, i, a, s, n = t || this, l = n.xPercent, c = n.yPercent, d = n.x, f = n.y, u = n.rotation, p = n.skewX, m = n.skewY, h = n.scaleX, g = n.scaleY, y = n.target, v = n.xOrigin, z = n.yOrigin, b = n.xOffset, _ = n.yOffset, w = n.forceCSS, x = parseFloat(d), T = parseFloat(f);
      u = parseFloat(u), p = parseFloat(p), (m = parseFloat(m)) && (p += m = parseFloat(m), 
      u += m), u || p ? (u *= Do, p *= Do, o = Math.cos(u) * h, r = Math.sin(u) * h, i = Math.sin(u - p) * -g, 
      a = Math.cos(u - p) * g, p && (m *= Do, s = Math.tan(p - m), i *= s = Math.sqrt(1 + s * s), 
      a *= s, m && (s = Math.tan(m), o *= s = Math.sqrt(1 + s * s), r *= s)), o = pe(o), 
      r = pe(r), i = pe(i), a = pe(a)) : (o = h, a = g, r = i = 0), (x && !~(d + "").indexOf("px") || T && !~(f + "").indexOf("px")) && (x = vr(y, "x", d, "px"), 
      T = vr(y, "y", f, "px")), (v || z || b || _) && (x = pe(x + v - (v * o + z * i) + b), 
      T = pe(T + z - (v * r + z * a) + _)), (l || c) && (s = y.getBBox(), x = pe(x + l / 100 * s.width), 
      T = pe(T + c / 100 * s.height)), s = "matrix(" + o + "," + r + "," + i + "," + a + "," + x + "," + T + ")", 
      y.setAttribute("transform", s), w && (y.style[Jo] = s);
    }, Br = function(e, t, o, r, i) {
      var a, s, n = 360, l = A(i), c = parseFloat(i) * (l && ~i.indexOf("rad") ? Io : 1) - r, d = r + c + "deg";
      return l && ("short" === (a = i.split("_")[1]) && (c %= n) !== c % 180 && (c += c < 0 ? n : -360), 
      "cw" === a && c < 0 ? c = (c + 36e9) % n - ~~(c / n) * n : "ccw" === a && c > 0 && (c = (c - 36e9) % n - ~~(c / n) * n)), 
      e._pt = s = new fo(e._pt, t, o, r, c, Yo), s.e = d, s.u = "deg", e._props.push(o), 
      s;
    }, Nr = function(e, t) {
      for (var o in t) {
        e[o] = t[o];
      }
      return e;
    }, Gr = function(e, t, o) {
      var r, i, a, s, n, l, c, d = Nr({}, o._gsap), f = o.style;
      for (i in d.svg ? (a = o.getAttribute("transform"), o.setAttribute("transform", ""), 
      f[Jo] = t, r = Mr(o, 1), mr(o, Jo), o.setAttribute("transform", a)) : (a = getComputedStyle(o)[Jo], 
      f[Jo] = t, r = Mr(o, 1), f[Jo] = a), Oo) {
        (a = d[i]) !== (s = r[i]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) < 0 && (n = Ke(a) !== (c = Ke(s)) ? vr(o, i, a, c) : parseFloat(a), 
        l = parseFloat(s), e._pt = new fo(e._pt, r, i, n, l - n, Go), e._pt.u = c || 0, 
        e._props.push(i));
      }
      Nr(r, d);
    };
    ue("padding,margin,Width,Radius", (function(e, t) {
      var o = "Top", r = "Right", i = "Bottom", a = "Left", s = (t < 3 ? [ o, r, i, a ] : [ o + a, o + r, i + r, i + a ]).map((function(o) {
        return t < 2 ? e + o : "border" + o + e;
      }));
      xr[t > 1 ? "border" + e : e] = function(e, t, o, r, i) {
        var a, n;
        if (arguments.length < 4) {
          return a = s.map((function(t) {
            return zr(e, t, o);
          })), 5 === (n = a.join(" ")).split(a[0]).length ? a[0] : n;
        }
        a = (r + "").split(" "), n = {}, s.forEach((function(e, t) {
          return n[e] = a[t] = a[t] || a[(t - 1) / 2 | 0];
        })), e.init(t, n, i);
      };
    }));
    var Yr, $r, Vr, Hr = {
      name: "css",
      register: cr,
      targetTest: function(e) {
        return e.style && e.nodeType;
      },
      init: function(e, t, o, r, i) {
        var a, s, n, l, c, d, f, u, p, m, h, g, y, z, b, _, w, x, T, S, E = this._props, C = e.style, k = o.vars.startAt;
        for (f in Ao || cr(), this.styles = this.styles || ir(e), _ = this.styles.props, 
        this.tween = o, t) {
          if ("autoRound" !== f && (s = t[f], !ie[f] || !Vt(f, t, o, r, e, i))) {
            if (c = typeof s, d = xr[f], "function" === c && (c = typeof (s = s.call(o, r, e, i))), 
            "string" === c && ~s.indexOf("random(") && (s = lt(s)), d) {
              d(this, e, f, s, o) && (b = 1);
            } else if ("--" === f.substr(0, 2)) {
              a = (getComputedStyle(e).getPropertyValue(f) + "").trim(), s += "", _t.lastIndex = 0, 
              _t.test(a) || (u = Ke(a), p = Ke(s)), p ? u !== p && (a = vr(e, f, a, p) + p) : u && (s += u), 
              this.add(C, "setProperty", a, s, r, i, 0, 0, f), E.push(f), _.push(f, 0, C[f]);
            } else if ("undefined" !== c) {
              if (k && f in k ? (a = "function" == typeof k[f] ? k[f].call(o, r, e, i) : k[f], 
              A(a) && ~a.indexOf("random(") && (a = lt(a)), Ke(a + "") || "auto" === a || (a += v.units[f] || Ke(zr(e, f)) || ""), 
              "=" === (a + "").charAt(1) && (a = zr(e, f))) : a = zr(e, f), l = parseFloat(a), 
              (m = "string" === c && "=" === s.charAt(1) && s.substr(0, 2)) && (s = s.substr(2)), 
              n = parseFloat(s), f in No && ("autoAlpha" === f && (1 === l && "hidden" === zr(e, "visibility") && n && (l = 0), 
              _.push("visibility", 0, C.visibility), hr(this, C, "visibility", l ? "inherit" : "hidden", n ? "inherit" : "hidden", !n)), 
              "scale" !== f && "transform" !== f && ~(f = No[f]).indexOf(",") && (f = f.split(",")[0])), 
              h = f in Oo) {
                if (this.styles.save(f), g || ((y = e._gsap).renderTransform && !t.parseTransform || Mr(e, t.parseTransform), 
                z = !1 !== t.smoothOrigin && y.smooth, (g = this._pt = new fo(this._pt, C, Jo, 0, 1, y.renderTransform, y, 0, -1)).dep = 1), 
                "scale" === f) {
                  this._pt = new fo(this._pt, y, "scaleY", y.scaleY, (m ? he(y.scaleY, m + n) : n) - y.scaleY || 0, Go), 
                  this._pt.u = 0, E.push("scaleY", f), f += "X";
                } else {
                  if ("transformOrigin" === f) {
                    _.push(er, 0, C[er]), x = void 0, T = void 0, S = void 0, x = (w = s).split(" "), 
                    T = x[0], S = x[1] || "50%", "top" !== T && "bottom" !== T && "left" !== S && "right" !== S || (w = T, 
                    T = S, S = w), x[0] = _r[T] || T, x[1] = _r[S] || S, s = x.join(" "), y.svg ? kr(e, s, 0, z, 0, this) : ((p = parseFloat(s.split(" ")[2]) || 0) !== y.zOrigin && hr(this, y, "zOrigin", y.zOrigin, p), 
                    hr(this, C, f, Pr(a), Pr(s)));
                    continue;
                  }
                  if ("svgOrigin" === f) {
                    kr(e, s, 1, z, 0, this);
                    continue;
                  }
                  if (f in Sr) {
                    Br(this, y, f, l, m ? he(l, m + s) : s);
                    continue;
                  }
                  if ("smoothOrigin" === f) {
                    hr(this, y, "smooth", y.smooth, s);
                    continue;
                  }
                  if ("force3D" === f) {
                    y[f] = s;
                    continue;
                  }
                  if ("transform" === f) {
                    Gr(this, s, e);
                    continue;
                  }
                }
              } else {
                f in C || (f = lr(f) || f);
              }
              if (h || (n || 0 === n) && (l || 0 === l) && !Bo.test(s) && f in C) {
                n || (n = 0), (u = (a + "").substr((l + "").length)) !== (p = Ke(s) || (f in v.units ? v.units[f] : u)) && (l = vr(e, f, a, p)), 
                this._pt = new fo(this._pt, h ? y : C, f, l, (m ? he(l, m + n) : n) - l, h || "px" !== p && "zIndex" !== f || !1 === t.autoRound ? Go : Vo), 
                this._pt.u = p || 0, u !== p && "%" !== p && (this._pt.b = a, this._pt.r = $o);
              } else if (f in C) {
                br.call(this, e, f, a, m ? m + s : s);
              } else if (f in e) {
                this.add(e, f, a || e[f], m ? m + s : s, r, i);
              } else if ("parseTransform" !== f) {
                W(f, s);
                continue;
              }
              h || (f in C ? _.push(f, 0, C[f]) : _.push(f, 1, a || e[f])), E.push(f);
            }
          }
        }
        b && co(this);
      },
      render: function(e, t) {
        if (t.tween._time || !Po()) {
          for (var o = t._pt; o; ) {
            o.r(e, o.d), o = o._next;
          }
        } else {
          t.styles.revert();
        }
      },
      get: zr,
      aliases: No,
      getSetter: function(e, t, o) {
        var r = No[t];
        return r && r.indexOf(",") < 0 && (t = r), t in Oo && t !== er && (e._gsap.x || zr(e, "x")) ? o && Mo === o ? "scale" === t ? Ko : Uo : (Mo = o || {}) && ("scale" === t ? Qo : Zo) : e.style && !P(e.style[t]) ? jo : ~t.indexOf("-") ? Wo : to(e, t);
      },
      core: {
        _removeProperty: mr,
        _getMatrix: Ar
      }
    };
    To.utils.checkPrefix = lr, To.core.getStyleSaver = ir, Vr = ue((Yr = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") + "," + ($r = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", (function(e) {
      Oo[e] = 1;
    })), ue($r, (function(e) {
      v.units[e] = "deg", Sr[e] = 1;
    })), No[Vr[13]] = Yr + "," + $r, ue("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", (function(e) {
      var t = e.split(":");
      No[t[1]] = Vr[t[0]];
    })), ue("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function(e) {
      v.units[e] = "px";
    })), To.registerPlugin(Hr);
    var Xr = To.registerPlugin(Hr) || To, jr = (Xr.core.Tween, o(716));
    function Wr(e) {
      return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object;
    }
    function Ur(e, t) {
      void 0 === e && (e = {}), void 0 === t && (t = {}), Object.keys(t).forEach((o => {
        void 0 === e[o] ? e[o] = t[o] : Wr(t[o]) && Wr(e[o]) && Object.keys(t[o]).length > 0 && Ur(e[o], t[o]);
      }));
    }
    const Kr = {
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
    function Qr() {
      const e = "undefined" != typeof document ? document : {};
      return Ur(e, Kr), e;
    }
    const Zr = {
      document: Kr,
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
    function Jr() {
      const e = "undefined" != typeof window ? window : {};
      return Ur(e, Zr), e;
    }
    function ei(e) {
      return void 0 === e && (e = ""), e.trim().split(" ").filter((e => !!e.trim()));
    }
    function ti(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t);
    }
    function oi() {
      return Date.now();
    }
    function ri(e, t) {
      void 0 === t && (t = "x");
      const o = Jr();
      let r, i, a;
      const s = function(e) {
        const t = Jr();
        let o;
        return t.getComputedStyle && (o = t.getComputedStyle(e, null)), !o && e.currentStyle && (o = e.currentStyle), 
        o || (o = e.style), o;
      }(e);
      return o.WebKitCSSMatrix ? (i = s.transform || s.webkitTransform, i.split(",").length > 6 && (i = i.split(", ").map((e => e.replace(",", "."))).join(", ")), 
      a = new o.WebKitCSSMatrix("none" === i ? "" : i)) : (a = s.MozTransform || s.OTransform || s.MsTransform || s.msTransform || s.transform || s.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), 
      r = a.toString().split(",")), "x" === t && (i = o.WebKitCSSMatrix ? a.m41 : 16 === r.length ? parseFloat(r[12]) : parseFloat(r[4])), 
      "y" === t && (i = o.WebKitCSSMatrix ? a.m42 : 16 === r.length ? parseFloat(r[13]) : parseFloat(r[5])), 
      i || 0;
    }
    function ii(e) {
      return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1);
    }
    function ai() {
      const e = Object(arguments.length <= 0 ? void 0 : arguments[0]), t = [ "__proto__", "constructor", "prototype" ];
      for (let r = 1; r < arguments.length; r += 1) {
        const i = r < 0 || arguments.length <= r ? void 0 : arguments[r];
        if (null != i && (o = i, !("undefined" != typeof window && void 0 !== window.HTMLElement ? o instanceof HTMLElement : o && (1 === o.nodeType || 11 === o.nodeType)))) {
          const o = Object.keys(Object(i)).filter((e => t.indexOf(e) < 0));
          for (let t = 0, r = o.length; t < r; t += 1) {
            const r = o[t], a = Object.getOwnPropertyDescriptor(i, r);
            void 0 !== a && a.enumerable && (ii(e[r]) && ii(i[r]) ? i[r].__swiper__ ? e[r] = i[r] : ai(e[r], i[r]) : !ii(e[r]) && ii(i[r]) ? (e[r] = {}, 
            i[r].__swiper__ ? e[r] = i[r] : ai(e[r], i[r])) : e[r] = i[r]);
          }
        }
      }
      var o;
      return e;
    }
    function si(e, t, o) {
      e.style.setProperty(t, o);
    }
    function ni(e) {
      let {swiper: t, targetPosition: o, side: r} = e;
      const i = Jr(), a = -t.translate;
      let s, n = null;
      const l = t.params.speed;
      t.wrapperEl.style.scrollSnapType = "none", i.cancelAnimationFrame(t.cssModeFrameID);
      const c = o > a ? "next" : "prev", d = (e, t) => "next" === c && e >= t || "prev" === c && e <= t, f = () => {
        s = (new Date).getTime(), null === n && (n = s);
        const e = Math.max(Math.min((s - n) / l, 1), 0), c = .5 - Math.cos(e * Math.PI) / 2;
        let u = a + c * (o - a);
        if (d(u, o) && (u = o), t.wrapperEl.scrollTo({
          [r]: u
        }), d(u, o)) {
          return t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", 
          setTimeout((() => {
            t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({
              [r]: u
            });
          })), void i.cancelAnimationFrame(t.cssModeFrameID);
        }
        t.cssModeFrameID = i.requestAnimationFrame(f);
      };
      f();
    }
    function li(e) {
      return e.querySelector(".swiper-slide-transform") || e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform") || e;
    }
    function ci(e, t) {
      return void 0 === t && (t = ""), [ ...e.children ].filter((e => e.matches(t)));
    }
    function di(e) {
      try {
        return void console.warn(e);
      } catch (e) {}
    }
    function fi(e, t) {
      void 0 === t && (t = []);
      const o = document.createElement(e);
      return o.classList.add(...Array.isArray(t) ? t : ei(t)), o;
    }
    function ui(e, t) {
      return Jr().getComputedStyle(e, null).getPropertyValue(t);
    }
    function pi(e) {
      let t, o = e;
      if (o) {
        for (t = 0; null !== (o = o.previousSibling); ) {
          1 === o.nodeType && (t += 1);
        }
        return t;
      }
    }
    function mi(e, t) {
      const o = [];
      let r = e.parentElement;
      for (;r; ) {
        t ? r.matches(t) && o.push(r) : o.push(r), r = r.parentElement;
      }
      return o;
    }
    function hi(e, t, o) {
      const r = Jr();
      return o ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(r.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(r.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth;
    }
    function gi(e) {
      return (Array.isArray(e) ? e : [ e ]).filter((e => !!e));
    }
    let yi, vi, zi;
    function bi() {
      return yi || (yi = function() {
        const e = Jr(), t = Qr();
        return {
          smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style,
          touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
        };
      }()), yi;
    }
    function _i(e) {
      return void 0 === e && (e = {}), vi || (vi = function(e) {
        let {userAgent: t} = void 0 === e ? {} : e;
        const o = bi(), r = Jr(), i = r.navigator.platform, a = t || r.navigator.userAgent, s = {
          ios: !1,
          android: !1
        }, n = r.screen.width, l = r.screen.height, c = a.match(/(Android);?[\s\/]+([\d.]+)?/);
        let d = a.match(/(iPad).*OS\s([\d_]+)/);
        const f = a.match(/(iPod)(.*OS\s([\d_]+))?/), u = !d && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/), p = "Win32" === i;
        let m = "MacIntel" === i;
        return !d && m && o.touch && [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ].indexOf(`${n}x${l}`) >= 0 && (d = a.match(/(Version)\/([\d.]+)/), 
        d || (d = [ 0, 1, "13_0_0" ]), m = !1), c && !p && (s.os = "android", s.android = !0), 
        (d || u || f) && (s.os = "ios", s.ios = !0), s;
      }(e)), vi;
    }
    function wi() {
      return zi || (zi = function() {
        const e = Jr(), t = _i();
        let o = !1;
        function r() {
          const t = e.navigator.userAgent.toLowerCase();
          return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0;
        }
        if (r()) {
          const t = String(e.navigator.userAgent);
          if (t.includes("Version/")) {
            const [e, r] = t.split("Version/")[1].split(" ")[0].split(".").map((e => Number(e)));
            o = e < 16 || 16 === e && r < 2;
          }
        }
        const i = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent), a = r();
        return {
          isSafari: o || a,
          needPerspectiveFix: o,
          need3dFix: a || i && t.ios,
          isWebView: i
        };
      }()), zi;
    }
    var xi = {
      on(e, t, o) {
        const r = this;
        if (!r.eventsListeners || r.destroyed) {
          return r;
        }
        if ("function" != typeof t) {
          return r;
        }
        const i = o ? "unshift" : "push";
        return e.split(" ").forEach((e => {
          r.eventsListeners[e] || (r.eventsListeners[e] = []), r.eventsListeners[e][i](t);
        })), r;
      },
      once(e, t, o) {
        const r = this;
        if (!r.eventsListeners || r.destroyed) {
          return r;
        }
        if ("function" != typeof t) {
          return r;
        }
        function i() {
          r.off(e, i), i.__emitterProxy && delete i.__emitterProxy;
          for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++) {
            a[s] = arguments[s];
          }
          t.apply(r, a);
        }
        return i.__emitterProxy = t, r.on(e, i, o);
      },
      onAny(e, t) {
        const o = this;
        if (!o.eventsListeners || o.destroyed) {
          return o;
        }
        if ("function" != typeof e) {
          return o;
        }
        const r = t ? "unshift" : "push";
        return o.eventsAnyListeners.indexOf(e) < 0 && o.eventsAnyListeners[r](e), o;
      },
      offAny(e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed) {
          return t;
        }
        if (!t.eventsAnyListeners) {
          return t;
        }
        const o = t.eventsAnyListeners.indexOf(e);
        return o >= 0 && t.eventsAnyListeners.splice(o, 1), t;
      },
      off(e, t) {
        const o = this;
        return !o.eventsListeners || o.destroyed ? o : o.eventsListeners ? (e.split(" ").forEach((e => {
          void 0 === t ? o.eventsListeners[e] = [] : o.eventsListeners[e] && o.eventsListeners[e].forEach(((r, i) => {
            (r === t || r.__emitterProxy && r.__emitterProxy === t) && o.eventsListeners[e].splice(i, 1);
          }));
        })), o) : o;
      },
      emit() {
        const e = this;
        if (!e.eventsListeners || e.destroyed) {
          return e;
        }
        if (!e.eventsListeners) {
          return e;
        }
        let t, o, r;
        for (var i = arguments.length, a = new Array(i), s = 0; s < i; s++) {
          a[s] = arguments[s];
        }
        "string" == typeof a[0] || Array.isArray(a[0]) ? (t = a[0], o = a.slice(1, a.length), 
        r = e) : (t = a[0].events, o = a[0].data, r = a[0].context || e), o.unshift(r);
        return (Array.isArray(t) ? t : t.split(" ")).forEach((t => {
          e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e => {
            e.apply(r, [ t, ...o ]);
          })), e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((e => {
            e.apply(r, o);
          }));
        })), e;
      }
    };
    const Ti = (e, t) => {
      if (!e || e.destroyed || !e.params) {
        return;
      }
      const o = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
      if (o) {
        let t = o.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t && e.isElement && (o.shadowRoot ? t = o.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame((() => {
          o.shadowRoot && (t = o.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`), 
          t && t.remove());
        }))), t && t.remove();
      }
    }, Si = (e, t) => {
      if (!e.slides[t]) {
        return;
      }
      const o = e.slides[t].querySelector('[loading="lazy"]');
      o && o.removeAttribute("loading");
    }, Ei = e => {
      if (!e || e.destroyed || !e.params) {
        return;
      }
      let t = e.params.lazyPreloadPrevNext;
      const o = e.slides.length;
      if (!o || !t || t < 0) {
        return;
      }
      t = Math.min(t, o);
      const r = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), i = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const o = i, a = [ o - t ];
        return a.push(...Array.from({
          length: t
        }).map(((e, t) => o + r + t))), void e.slides.forEach(((t, o) => {
          a.includes(t.column) && Si(e, o);
        }));
      }
      const a = i + r - 1;
      if (e.params.rewind || e.params.loop) {
        for (let r = i - t; r <= a + t; r += 1) {
          const t = (r % o + o) % o;
          (t < i || t > a) && Si(e, t);
        }
      } else {
        for (let r = Math.max(i - t, 0); r <= Math.min(a + t, o - 1); r += 1) {
          r !== i && (r > a || r < i) && Si(e, r);
        }
      }
    };
    var Ci = {
      updateSize: function() {
        const e = this;
        let t, o;
        const r = e.el;
        t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : r.clientWidth, 
        o = void 0 !== e.params.height && null !== e.params.height ? e.params.height : r.clientHeight, 
        0 === t && e.isHorizontal() || 0 === o && e.isVertical() || (t = t - parseInt(ui(r, "padding-left") || 0, 10) - parseInt(ui(r, "padding-right") || 0, 10), 
        o = o - parseInt(ui(r, "padding-top") || 0, 10) - parseInt(ui(r, "padding-bottom") || 0, 10), 
        Number.isNaN(t) && (t = 0), Number.isNaN(o) && (o = 0), Object.assign(e, {
          width: t,
          height: o,
          size: e.isHorizontal() ? t : o
        }));
      },
      updateSlides: function() {
        const e = this;
        function t(t, o) {
          return parseFloat(t.getPropertyValue(e.getDirectionLabel(o)) || 0);
        }
        const o = e.params, {wrapperEl: r, slidesEl: i, size: a, rtlTranslate: s, wrongRTL: n} = e, l = e.virtual && o.virtual.enabled, c = l ? e.virtual.slides.length : e.slides.length, d = ci(i, `.${e.params.slideClass}, swiper-slide`), f = l ? e.virtual.slides.length : d.length;
        let u = [];
        const p = [], m = [];
        let h = o.slidesOffsetBefore;
        "function" == typeof h && (h = o.slidesOffsetBefore.call(e));
        let g = o.slidesOffsetAfter;
        "function" == typeof g && (g = o.slidesOffsetAfter.call(e));
        const y = e.snapGrid.length, v = e.slidesGrid.length;
        let z = o.spaceBetween, b = -h, _ = 0, w = 0;
        if (void 0 === a) {
          return;
        }
        "string" == typeof z && z.indexOf("%") >= 0 ? z = parseFloat(z.replace("%", "")) / 100 * a : "string" == typeof z && (z = parseFloat(z)), 
        e.virtualSize = -z, d.forEach((e => {
          s ? e.style.marginLeft = "" : e.style.marginRight = "", e.style.marginBottom = "", 
          e.style.marginTop = "";
        })), o.centeredSlides && o.cssMode && (si(r, "--swiper-centered-offset-before", ""), 
        si(r, "--swiper-centered-offset-after", ""));
        const x = o.grid && o.grid.rows > 1 && e.grid;
        let T;
        x ? e.grid.initSlides(d) : e.grid && e.grid.unsetSlides();
        const S = "auto" === o.slidesPerView && o.breakpoints && Object.keys(o.breakpoints).filter((e => void 0 !== o.breakpoints[e].slidesPerView)).length > 0;
        for (let r = 0; r < f; r += 1) {
          let i;
          if (T = 0, d[r] && (i = d[r]), x && e.grid.updateSlide(r, i, d), !d[r] || "none" !== ui(i, "display")) {
            if ("auto" === o.slidesPerView) {
              S && (d[r].style[e.getDirectionLabel("width")] = "");
              const a = getComputedStyle(i), s = i.style.transform, n = i.style.webkitTransform;
              if (s && (i.style.transform = "none"), n && (i.style.webkitTransform = "none"), 
              o.roundLengths) {
                T = e.isHorizontal() ? hi(i, "width", !0) : hi(i, "height", !0);
              } else {
                const e = t(a, "width"), o = t(a, "padding-left"), r = t(a, "padding-right"), s = t(a, "margin-left"), n = t(a, "margin-right"), l = a.getPropertyValue("box-sizing");
                if (l && "border-box" === l) {
                  T = e + s + n;
                } else {
                  const {clientWidth: t, offsetWidth: a} = i;
                  T = e + o + r + s + n + (a - t);
                }
              }
              s && (i.style.transform = s), n && (i.style.webkitTransform = n), o.roundLengths && (T = Math.floor(T));
            } else {
              T = (a - (o.slidesPerView - 1) * z) / o.slidesPerView, o.roundLengths && (T = Math.floor(T)), 
              d[r] && (d[r].style[e.getDirectionLabel("width")] = `${T}px`);
            }
            d[r] && (d[r].swiperSlideSize = T), m.push(T), o.centeredSlides ? (b = b + T / 2 + _ / 2 + z, 
            0 === _ && 0 !== r && (b = b - a / 2 - z), 0 === r && (b = b - a / 2 - z), Math.abs(b) < .001 && (b = 0), 
            o.roundLengths && (b = Math.floor(b)), w % o.slidesPerGroup == 0 && u.push(b), p.push(b)) : (o.roundLengths && (b = Math.floor(b)), 
            (w - Math.min(e.params.slidesPerGroupSkip, w)) % e.params.slidesPerGroup == 0 && u.push(b), 
            p.push(b), b = b + T + z), e.virtualSize += T + z, _ = T, w += 1;
          }
        }
        if (e.virtualSize = Math.max(e.virtualSize, a) + g, s && n && ("slide" === o.effect || "coverflow" === o.effect) && (r.style.width = `${e.virtualSize + z}px`), 
        o.setWrapperSize && (r.style[e.getDirectionLabel("width")] = `${e.virtualSize + z}px`), 
        x && e.grid.updateWrapperSize(T, u), !o.centeredSlides) {
          const t = [];
          for (let r = 0; r < u.length; r += 1) {
            let i = u[r];
            o.roundLengths && (i = Math.floor(i)), u[r] <= e.virtualSize - a && t.push(i);
          }
          u = t, Math.floor(e.virtualSize - a) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - a);
        }
        if (l && o.loop) {
          const t = m[0] + z;
          if (o.slidesPerGroup > 1) {
            const r = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / o.slidesPerGroup), i = t * o.slidesPerGroup;
            for (let e = 0; e < r; e += 1) {
              u.push(u[u.length - 1] + i);
            }
          }
          for (let r = 0; r < e.virtual.slidesBefore + e.virtual.slidesAfter; r += 1) {
            1 === o.slidesPerGroup && u.push(u[u.length - 1] + t), p.push(p[p.length - 1] + t), 
            e.virtualSize += t;
          }
        }
        if (0 === u.length && (u = [ 0 ]), 0 !== z) {
          const t = e.isHorizontal() && s ? "marginLeft" : e.getDirectionLabel("marginRight");
          d.filter(((e, t) => !(o.cssMode && !o.loop) || t !== d.length - 1)).forEach((e => {
            e.style[t] = `${z}px`;
          }));
        }
        if (o.centeredSlides && o.centeredSlidesBounds) {
          let e = 0;
          m.forEach((t => {
            e += t + (z || 0);
          })), e -= z;
          const t = e - a;
          u = u.map((e => e <= 0 ? -h : e > t ? t + g : e));
        }
        if (o.centerInsufficientSlides) {
          let e = 0;
          if (m.forEach((t => {
            e += t + (z || 0);
          })), e -= z, e < a) {
            const t = (a - e) / 2;
            u.forEach(((e, o) => {
              u[o] = e - t;
            })), p.forEach(((e, o) => {
              p[o] = e + t;
            }));
          }
        }
        if (Object.assign(e, {
          slides: d,
          snapGrid: u,
          slidesGrid: p,
          slidesSizesGrid: m
        }), o.centeredSlides && o.cssMode && !o.centeredSlidesBounds) {
          si(r, "--swiper-centered-offset-before", -u[0] + "px"), si(r, "--swiper-centered-offset-after", e.size / 2 - m[m.length - 1] / 2 + "px");
          const t = -e.snapGrid[0], o = -e.slidesGrid[0];
          e.snapGrid = e.snapGrid.map((e => e + t)), e.slidesGrid = e.slidesGrid.map((e => e + o));
        }
        if (f !== c && e.emit("slidesLengthChange"), u.length !== y && (e.params.watchOverflow && e.checkOverflow(), 
        e.emit("snapGridLengthChange")), p.length !== v && e.emit("slidesGridLengthChange"), 
        o.watchSlidesProgress && e.updateSlidesOffset(), e.emit("slidesUpdated"), !(l || o.cssMode || "slide" !== o.effect && "fade" !== o.effect)) {
          const t = `${o.containerModifierClass}backface-hidden`, r = e.el.classList.contains(t);
          f <= o.maxBackfaceHiddenSlides ? r || e.el.classList.add(t) : r && e.el.classList.remove(t);
        }
      },
      updateAutoHeight: function(e) {
        const t = this, o = [], r = t.virtual && t.params.virtual.enabled;
        let i, a = 0;
        "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
        const s = e => r ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1) {
          if (t.params.centeredSlides) {
            (t.visibleSlides || []).forEach((e => {
              o.push(e);
            }));
          } else {
            for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
              const e = t.activeIndex + i;
              if (e > t.slides.length && !r) {
                break;
              }
              o.push(s(e));
            }
          }
        } else {
          o.push(s(t.activeIndex));
        }
        for (i = 0; i < o.length; i += 1) {
          if (void 0 !== o[i]) {
            const e = o[i].offsetHeight;
            a = e > a ? e : a;
          }
        }
        (a || 0 === a) && (t.wrapperEl.style.height = `${a}px`);
      },
      updateSlidesOffset: function() {
        const e = this, t = e.slides, o = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
        for (let r = 0; r < t.length; r += 1) {
          t[r].swiperSlideOffset = (e.isHorizontal() ? t[r].offsetLeft : t[r].offsetTop) - o - e.cssOverflowAdjustment();
        }
      },
      updateSlidesProgress: function(e) {
        void 0 === e && (e = this && this.translate || 0);
        const t = this, o = t.params, {slides: r, rtlTranslate: i, snapGrid: a} = t;
        if (0 === r.length) {
          return;
        }
        void 0 === r[0].swiperSlideOffset && t.updateSlidesOffset();
        let s = -e;
        i && (s = e), r.forEach((e => {
          e.classList.remove(o.slideVisibleClass, o.slideFullyVisibleClass);
        })), t.visibleSlidesIndexes = [], t.visibleSlides = [];
        let n = o.spaceBetween;
        "string" == typeof n && n.indexOf("%") >= 0 ? n = parseFloat(n.replace("%", "")) / 100 * t.size : "string" == typeof n && (n = parseFloat(n));
        for (let e = 0; e < r.length; e += 1) {
          const l = r[e];
          let c = l.swiperSlideOffset;
          o.cssMode && o.centeredSlides && (c -= r[0].swiperSlideOffset);
          const d = (s + (o.centeredSlides ? t.minTranslate() : 0) - c) / (l.swiperSlideSize + n), f = (s - a[0] + (o.centeredSlides ? t.minTranslate() : 0) - c) / (l.swiperSlideSize + n), u = -(s - c), p = u + t.slidesSizesGrid[e], m = u >= 0 && u <= t.size - t.slidesSizesGrid[e];
          (u >= 0 && u < t.size - 1 || p > 1 && p <= t.size || u <= 0 && p >= t.size) && (t.visibleSlides.push(l), 
          t.visibleSlidesIndexes.push(e), r[e].classList.add(o.slideVisibleClass)), m && r[e].classList.add(o.slideFullyVisibleClass), 
          l.progress = i ? -d : d, l.originalProgress = i ? -f : f;
        }
      },
      updateProgress: function(e) {
        const t = this;
        if (void 0 === e) {
          const o = t.rtlTranslate ? -1 : 1;
          e = t && t.translate && t.translate * o || 0;
        }
        const o = t.params, r = t.maxTranslate() - t.minTranslate();
        let {progress: i, isBeginning: a, isEnd: s, progressLoop: n} = t;
        const l = a, c = s;
        if (0 === r) {
          i = 0, a = !0, s = !0;
        } else {
          i = (e - t.minTranslate()) / r;
          const o = Math.abs(e - t.minTranslate()) < 1, n = Math.abs(e - t.maxTranslate()) < 1;
          a = o || i <= 0, s = n || i >= 1, o && (i = 0), n && (i = 1);
        }
        if (o.loop) {
          const o = t.getSlideIndexByData(0), r = t.getSlideIndexByData(t.slides.length - 1), i = t.slidesGrid[o], a = t.slidesGrid[r], s = t.slidesGrid[t.slidesGrid.length - 1], l = Math.abs(e);
          n = l >= i ? (l - i) / s : (l + s - a) / s, n > 1 && (n -= 1);
        }
        Object.assign(t, {
          progress: i,
          progressLoop: n,
          isBeginning: a,
          isEnd: s
        }), (o.watchSlidesProgress || o.centeredSlides && o.autoHeight) && t.updateSlidesProgress(e), 
        a && !l && t.emit("reachBeginning toEdge"), s && !c && t.emit("reachEnd toEdge"), 
        (l && !a || c && !s) && t.emit("fromEdge"), t.emit("progress", i);
      },
      updateSlidesClasses: function() {
        const e = this, {slides: t, params: o, slidesEl: r, activeIndex: i} = e, a = e.virtual && o.virtual.enabled, s = e.grid && o.grid && o.grid.rows > 1, n = e => ci(r, `.${o.slideClass}${e}, swiper-slide${e}`)[0];
        let l, c, d;
        if (t.forEach((e => {
          e.classList.remove(o.slideActiveClass, o.slideNextClass, o.slidePrevClass);
        })), a) {
          if (o.loop) {
            let t = i - e.virtual.slidesBefore;
            t < 0 && (t = e.virtual.slides.length + t), t >= e.virtual.slides.length && (t -= e.virtual.slides.length), 
            l = n(`[data-swiper-slide-index="${t}"]`);
          } else {
            l = n(`[data-swiper-slide-index="${i}"]`);
          }
        } else {
          s ? (l = t.filter((e => e.column === i))[0], d = t.filter((e => e.column === i + 1))[0], 
          c = t.filter((e => e.column === i - 1))[0]) : l = t[i];
        }
        l && (l.classList.add(o.slideActiveClass), s ? (d && d.classList.add(o.slideNextClass), 
        c && c.classList.add(o.slidePrevClass)) : (d = function(e, t) {
          const o = [];
          for (;e.nextElementSibling; ) {
            const r = e.nextElementSibling;
            t ? r.matches(t) && o.push(r) : o.push(r), e = r;
          }
          return o;
        }(l, `.${o.slideClass}, swiper-slide`)[0], o.loop && !d && (d = t[0]), d && d.classList.add(o.slideNextClass), 
        c = function(e, t) {
          const o = [];
          for (;e.previousElementSibling; ) {
            const r = e.previousElementSibling;
            t ? r.matches(t) && o.push(r) : o.push(r), e = r;
          }
          return o;
        }(l, `.${o.slideClass}, swiper-slide`)[0], o.loop && 0 === !c && (c = t[t.length - 1]), 
        c && c.classList.add(o.slidePrevClass))), e.emitSlidesClasses();
      },
      updateActiveIndex: function(e) {
        const t = this, o = t.rtlTranslate ? t.translate : -t.translate, {snapGrid: r, params: i, activeIndex: a, realIndex: s, snapIndex: n} = t;
        let l, c = e;
        const d = e => {
          let o = e - t.virtual.slidesBefore;
          return o < 0 && (o = t.virtual.slides.length + o), o >= t.virtual.slides.length && (o -= t.virtual.slides.length), 
          o;
        };
        if (void 0 === c && (c = function(e) {
          const {slidesGrid: t, params: o} = e, r = e.rtlTranslate ? e.translate : -e.translate;
          let i;
          for (let e = 0; e < t.length; e += 1) {
            void 0 !== t[e + 1] ? r >= t[e] && r < t[e + 1] - (t[e + 1] - t[e]) / 2 ? i = e : r >= t[e] && r < t[e + 1] && (i = e + 1) : r >= t[e] && (i = e);
          }
          return o.normalizeSlideIndex && (i < 0 || void 0 === i) && (i = 0), i;
        }(t)), r.indexOf(o) >= 0) {
          l = r.indexOf(o);
        } else {
          const e = Math.min(i.slidesPerGroupSkip, c);
          l = e + Math.floor((c - e) / i.slidesPerGroup);
        }
        if (l >= r.length && (l = r.length - 1), c === a && !t.params.loop) {
          return void (l !== n && (t.snapIndex = l, t.emit("snapIndexChange")));
        }
        if (c === a && t.params.loop && t.virtual && t.params.virtual.enabled) {
          return void (t.realIndex = d(c));
        }
        const f = t.grid && i.grid && i.grid.rows > 1;
        let u;
        if (t.virtual && i.virtual.enabled && i.loop) {
          u = d(c);
        } else if (f) {
          const e = t.slides.filter((e => e.column === c))[0];
          let o = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
          Number.isNaN(o) && (o = Math.max(t.slides.indexOf(e), 0)), u = Math.floor(o / i.grid.rows);
        } else if (t.slides[c]) {
          const e = t.slides[c].getAttribute("data-swiper-slide-index");
          u = e ? parseInt(e, 10) : c;
        } else {
          u = c;
        }
        Object.assign(t, {
          previousSnapIndex: n,
          snapIndex: l,
          previousRealIndex: s,
          realIndex: u,
          previousIndex: a,
          activeIndex: c
        }), t.initialized && Ei(t), t.emit("activeIndexChange"), t.emit("snapIndexChange"), 
        (t.initialized || t.params.runCallbacksOnInit) && (s !== u && t.emit("realIndexChange"), 
        t.emit("slideChange"));
      },
      updateClickedSlide: function(e, t) {
        const o = this, r = o.params;
        let i = e.closest(`.${r.slideClass}, swiper-slide`);
        !i && o.isElement && t && t.length > 1 && t.includes(e) && [ ...t.slice(t.indexOf(e) + 1, t.length) ].forEach((e => {
          !i && e.matches && e.matches(`.${r.slideClass}, swiper-slide`) && (i = e);
        }));
        let a, s = !1;
        if (i) {
          for (let e = 0; e < o.slides.length; e += 1) {
            if (o.slides[e] === i) {
              s = !0, a = e;
              break;
            }
          }
        }
        if (!i || !s) {
          return o.clickedSlide = void 0, void (o.clickedIndex = void 0);
        }
        o.clickedSlide = i, o.virtual && o.params.virtual.enabled ? o.clickedIndex = parseInt(i.getAttribute("data-swiper-slide-index"), 10) : o.clickedIndex = a, 
        r.slideToClickedSlide && void 0 !== o.clickedIndex && o.clickedIndex !== o.activeIndex && o.slideToClickedSlide();
      }
    };
    var Ai = {
      getTranslate: function(e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        const {params: t, rtlTranslate: o, translate: r, wrapperEl: i} = this;
        if (t.virtualTranslate) {
          return o ? -r : r;
        }
        if (t.cssMode) {
          return r;
        }
        let a = ri(i, e);
        return a += this.cssOverflowAdjustment(), o && (a = -a), a || 0;
      },
      setTranslate: function(e, t) {
        const o = this, {rtlTranslate: r, params: i, wrapperEl: a, progress: s} = o;
        let n, l = 0, c = 0;
        o.isHorizontal() ? l = r ? -e : e : c = e, i.roundLengths && (l = Math.floor(l), 
        c = Math.floor(c)), o.previousTranslate = o.translate, o.translate = o.isHorizontal() ? l : c, 
        i.cssMode ? a[o.isHorizontal() ? "scrollLeft" : "scrollTop"] = o.isHorizontal() ? -l : -c : i.virtualTranslate || (o.isHorizontal() ? l -= o.cssOverflowAdjustment() : c -= o.cssOverflowAdjustment(), 
        a.style.transform = `translate3d(${l}px, ${c}px, 0px)`);
        const d = o.maxTranslate() - o.minTranslate();
        n = 0 === d ? 0 : (e - o.minTranslate()) / d, n !== s && o.updateProgress(e), o.emit("setTranslate", o.translate, t);
      },
      minTranslate: function() {
        return -this.snapGrid[0];
      },
      maxTranslate: function() {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function(e, t, o, r, i) {
        void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === o && (o = !0), 
        void 0 === r && (r = !0);
        const a = this, {params: s, wrapperEl: n} = a;
        if (a.animating && s.preventInteractionOnTransition) {
          return !1;
        }
        const l = a.minTranslate(), c = a.maxTranslate();
        let d;
        if (d = r && e > l ? l : r && e < c ? c : e, a.updateProgress(d), s.cssMode) {
          const e = a.isHorizontal();
          if (0 === t) {
            n[e ? "scrollLeft" : "scrollTop"] = -d;
          } else {
            if (!a.support.smoothScroll) {
              return ni({
                swiper: a,
                targetPosition: -d,
                side: e ? "left" : "top"
              }), !0;
            }
            n.scrollTo({
              [e ? "left" : "top"]: -d,
              behavior: "smooth"
            });
          }
          return !0;
        }
        return 0 === t ? (a.setTransition(0), a.setTranslate(d), o && (a.emit("beforeTransitionStart", t, i), 
        a.emit("transitionEnd"))) : (a.setTransition(t), a.setTranslate(d), o && (a.emit("beforeTransitionStart", t, i), 
        a.emit("transitionStart")), a.animating || (a.animating = !0, a.onTranslateToWrapperTransitionEnd || (a.onTranslateToWrapperTransitionEnd = function(e) {
          a && !a.destroyed && e.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onTranslateToWrapperTransitionEnd), 
          a.onTranslateToWrapperTransitionEnd = null, delete a.onTranslateToWrapperTransitionEnd, 
          o && a.emit("transitionEnd"));
        }), a.wrapperEl.addEventListener("transitionend", a.onTranslateToWrapperTransitionEnd))), 
        !0;
      }
    };
    function ki(e) {
      let {swiper: t, runCallbacks: o, direction: r, step: i} = e;
      const {activeIndex: a, previousIndex: s} = t;
      let n = r;
      if (n || (n = a > s ? "next" : a < s ? "prev" : "reset"), t.emit(`transition${i}`), 
      o && a !== s) {
        if ("reset" === n) {
          return void t.emit(`slideResetTransition${i}`);
        }
        t.emit(`slideChangeTransition${i}`), "next" === n ? t.emit(`slideNextTransition${i}`) : t.emit(`slidePrevTransition${i}`);
      }
    }
    var Mi = {
      slideTo: function(e, t, o, r, i) {
        void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === o && (o = !0), 
        "string" == typeof e && (e = parseInt(e, 10));
        const a = this;
        let s = e;
        s < 0 && (s = 0);
        const {params: n, snapGrid: l, slidesGrid: c, previousIndex: d, activeIndex: f, rtlTranslate: u, wrapperEl: p, enabled: m} = a;
        if (a.animating && n.preventInteractionOnTransition || !m && !r && !i || a.destroyed) {
          return !1;
        }
        const h = Math.min(a.params.slidesPerGroupSkip, s);
        let g = h + Math.floor((s - h) / a.params.slidesPerGroup);
        g >= l.length && (g = l.length - 1);
        const y = -l[g];
        if (n.normalizeSlideIndex) {
          for (let e = 0; e < c.length; e += 1) {
            const t = -Math.floor(100 * y), o = Math.floor(100 * c[e]), r = Math.floor(100 * c[e + 1]);
            void 0 !== c[e + 1] ? t >= o && t < r - (r - o) / 2 ? s = e : t >= o && t < r && (s = e + 1) : t >= o && (s = e);
          }
        }
        if (a.initialized && s !== f) {
          if (!a.allowSlideNext && (u ? y > a.translate && y > a.minTranslate() : y < a.translate && y < a.minTranslate())) {
            return !1;
          }
          if (!a.allowSlidePrev && y > a.translate && y > a.maxTranslate() && (f || 0) !== s) {
            return !1;
          }
        }
        let v;
        if (s !== (d || 0) && o && a.emit("beforeSlideChangeStart"), a.updateProgress(y), 
        v = s > f ? "next" : s < f ? "prev" : "reset", u && -y === a.translate || !u && y === a.translate) {
          return a.updateActiveIndex(s), n.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), 
          "slide" !== n.effect && a.setTranslate(y), "reset" !== v && (a.transitionStart(o, v), 
          a.transitionEnd(o, v)), !1;
        }
        if (n.cssMode) {
          const e = a.isHorizontal(), o = u ? y : -y;
          if (0 === t) {
            const t = a.virtual && a.params.virtual.enabled;
            t && (a.wrapperEl.style.scrollSnapType = "none", a._immediateVirtual = !0), t && !a._cssModeVirtualInitialSet && a.params.initialSlide > 0 ? (a._cssModeVirtualInitialSet = !0, 
            requestAnimationFrame((() => {
              p[e ? "scrollLeft" : "scrollTop"] = o;
            }))) : p[e ? "scrollLeft" : "scrollTop"] = o, t && requestAnimationFrame((() => {
              a.wrapperEl.style.scrollSnapType = "", a._immediateVirtual = !1;
            }));
          } else {
            if (!a.support.smoothScroll) {
              return ni({
                swiper: a,
                targetPosition: o,
                side: e ? "left" : "top"
              }), !0;
            }
            p.scrollTo({
              [e ? "left" : "top"]: o,
              behavior: "smooth"
            });
          }
          return !0;
        }
        return a.setTransition(t), a.setTranslate(y), a.updateActiveIndex(s), a.updateSlidesClasses(), 
        a.emit("beforeTransitionStart", t, r), a.transitionStart(o, v), 0 === t ? a.transitionEnd(o, v) : a.animating || (a.animating = !0, 
        a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function(e) {
          a && !a.destroyed && e.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), 
          a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, 
          a.transitionEnd(o, v));
        }), a.wrapperEl.addEventListener("transitionend", a.onSlideToWrapperTransitionEnd)), 
        !0;
      },
      slideToLoop: function(e, t, o, r) {
        if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === o && (o = !0), 
        "string" == typeof e) {
          e = parseInt(e, 10);
        }
        const i = this;
        if (i.destroyed) {
          return;
        }
        const a = i.grid && i.params.grid && i.params.grid.rows > 1;
        let s = e;
        if (i.params.loop) {
          if (i.virtual && i.params.virtual.enabled) {
            s += i.virtual.slidesBefore;
          } else {
            let e;
            if (a) {
              const t = s * i.params.grid.rows;
              e = i.slides.filter((e => 1 * e.getAttribute("data-swiper-slide-index") === t))[0].column;
            } else {
              e = i.getSlideIndexByData(s);
            }
            const t = a ? Math.ceil(i.slides.length / i.params.grid.rows) : i.slides.length, {centeredSlides: o} = i.params;
            let r = i.params.slidesPerView;
            "auto" === r ? r = i.slidesPerViewDynamic() : (r = Math.ceil(parseFloat(i.params.slidesPerView, 10)), 
            o && r % 2 == 0 && (r += 1));
            let n = t - e < r;
            if (o && (n = n || e < Math.ceil(r / 2)), n) {
              const r = o ? e < i.activeIndex ? "prev" : "next" : e - i.activeIndex - 1 < i.params.slidesPerView ? "next" : "prev";
              i.loopFix({
                direction: r,
                slideTo: !0,
                activeSlideIndex: "next" === r ? e + 1 : e - t + 1,
                slideRealIndex: "next" === r ? i.realIndex : void 0
              });
            }
            if (a) {
              const e = s * i.params.grid.rows;
              s = i.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0].column;
            } else {
              s = i.getSlideIndexByData(s);
            }
          }
        }
        return requestAnimationFrame((() => {
          i.slideTo(s, t, o, r);
        })), i;
      },
      slideNext: function(e, t, o) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const r = this, {enabled: i, params: a, animating: s} = r;
        if (!i || r.destroyed) {
          return r;
        }
        let n = a.slidesPerGroup;
        "auto" === a.slidesPerView && 1 === a.slidesPerGroup && a.slidesPerGroupAuto && (n = Math.max(r.slidesPerViewDynamic("current", !0), 1));
        const l = r.activeIndex < a.slidesPerGroupSkip ? 1 : n, c = r.virtual && a.virtual.enabled;
        if (a.loop) {
          if (s && !c && a.loopPreventsSliding) {
            return !1;
          }
          if (r.loopFix({
            direction: "next"
          }), r._clientLeft = r.wrapperEl.clientLeft, r.activeIndex === r.slides.length - 1 && a.cssMode) {
            return requestAnimationFrame((() => {
              r.slideTo(r.activeIndex + l, e, t, o);
            })), !0;
          }
        }
        return a.rewind && r.isEnd ? r.slideTo(0, e, t, o) : r.slideTo(r.activeIndex + l, e, t, o);
      },
      slidePrev: function(e, t, o) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const r = this, {params: i, snapGrid: a, slidesGrid: s, rtlTranslate: n, enabled: l, animating: c} = r;
        if (!l || r.destroyed) {
          return r;
        }
        const d = r.virtual && i.virtual.enabled;
        if (i.loop) {
          if (c && !d && i.loopPreventsSliding) {
            return !1;
          }
          r.loopFix({
            direction: "prev"
          }), r._clientLeft = r.wrapperEl.clientLeft;
        }
        function f(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const u = f(n ? r.translate : -r.translate), p = a.map((e => f(e)));
        let m = a[p.indexOf(u) - 1];
        if (void 0 === m && i.cssMode) {
          let e;
          a.forEach(((t, o) => {
            u >= t && (e = o);
          })), void 0 !== e && (m = a[e > 0 ? e - 1 : e]);
        }
        let h = 0;
        if (void 0 !== m && (h = s.indexOf(m), h < 0 && (h = r.activeIndex - 1), "auto" === i.slidesPerView && 1 === i.slidesPerGroup && i.slidesPerGroupAuto && (h = h - r.slidesPerViewDynamic("previous", !0) + 1, 
        h = Math.max(h, 0))), i.rewind && r.isBeginning) {
          const i = r.params.virtual && r.params.virtual.enabled && r.virtual ? r.virtual.slides.length - 1 : r.slides.length - 1;
          return r.slideTo(i, e, t, o);
        }
        return i.loop && 0 === r.activeIndex && i.cssMode ? (requestAnimationFrame((() => {
          r.slideTo(h, e, t, o);
        })), !0) : r.slideTo(h, e, t, o);
      },
      slideReset: function(e, t, o) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const r = this;
        if (!r.destroyed) {
          return r.slideTo(r.activeIndex, e, t, o);
        }
      },
      slideToClosest: function(e, t, o, r) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === r && (r = .5);
        const i = this;
        if (i.destroyed) {
          return;
        }
        let a = i.activeIndex;
        const s = Math.min(i.params.slidesPerGroupSkip, a), n = s + Math.floor((a - s) / i.params.slidesPerGroup), l = i.rtlTranslate ? i.translate : -i.translate;
        if (l >= i.snapGrid[n]) {
          const e = i.snapGrid[n];
          l - e > (i.snapGrid[n + 1] - e) * r && (a += i.params.slidesPerGroup);
        } else {
          const e = i.snapGrid[n - 1];
          l - e <= (i.snapGrid[n] - e) * r && (a -= i.params.slidesPerGroup);
        }
        return a = Math.max(a, 0), a = Math.min(a, i.slidesGrid.length - 1), i.slideTo(a, e, t, o);
      },
      slideToClickedSlide: function() {
        const e = this;
        if (e.destroyed) {
          return;
        }
        const {params: t, slidesEl: o} = e, r = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
        let i, a = e.clickedIndex;
        const s = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
        if (t.loop) {
          if (e.animating) {
            return;
          }
          i = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? a < e.loopedSlides - r / 2 || a > e.slides.length - e.loopedSlides + r / 2 ? (e.loopFix(), 
          a = e.getSlideIndex(ci(o, `${s}[data-swiper-slide-index="${i}"]`)[0]), ti((() => {
            e.slideTo(a);
          }))) : e.slideTo(a) : a > e.slides.length - r ? (e.loopFix(), a = e.getSlideIndex(ci(o, `${s}[data-swiper-slide-index="${i}"]`)[0]), 
          ti((() => {
            e.slideTo(a);
          }))) : e.slideTo(a);
        } else {
          e.slideTo(a);
        }
      }
    };
    var Pi = {
      loopCreate: function(e) {
        const t = this, {params: o, slidesEl: r} = t;
        if (!o.loop || t.virtual && t.params.virtual.enabled) {
          return;
        }
        const i = () => {
          ci(r, `.${o.slideClass}, swiper-slide`).forEach(((e, t) => {
            e.setAttribute("data-swiper-slide-index", t);
          }));
        }, a = t.grid && o.grid && o.grid.rows > 1, s = o.slidesPerGroup * (a ? o.grid.rows : 1), n = t.slides.length % s != 0, l = a && t.slides.length % o.grid.rows != 0, c = e => {
          for (let r = 0; r < e; r += 1) {
            const e = t.isElement ? fi("swiper-slide", [ o.slideBlankClass ]) : fi("div", [ o.slideClass, o.slideBlankClass ]);
            t.slidesEl.append(e);
          }
        };
        if (n) {
          if (o.loopAddBlankSlides) {
            c(s - t.slides.length % s), t.recalcSlides(), t.updateSlides();
          } else {
            di("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
          }
          i();
        } else if (l) {
          if (o.loopAddBlankSlides) {
            c(o.grid.rows - t.slides.length % o.grid.rows), t.recalcSlides(), t.updateSlides();
          } else {
            di("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
          }
          i();
        } else {
          i();
        }
        t.loopFix({
          slideRealIndex: e,
          direction: o.centeredSlides ? void 0 : "next"
        });
      },
      loopFix: function(e) {
        let {slideRealIndex: t, slideTo: o = !0, direction: r, setTranslate: i, activeSlideIndex: a, byController: s, byMousewheel: n} = void 0 === e ? {} : e;
        const l = this;
        if (!l.params.loop) {
          return;
        }
        l.emit("beforeLoopFix");
        const {slides: c, allowSlidePrev: d, allowSlideNext: f, slidesEl: u, params: p} = l, {centeredSlides: m} = p;
        if (l.allowSlidePrev = !0, l.allowSlideNext = !0, l.virtual && p.virtual.enabled) {
          return o && (p.centeredSlides || 0 !== l.snapIndex ? p.centeredSlides && l.snapIndex < p.slidesPerView ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0) : l.snapIndex === l.snapGrid.length - 1 && l.slideTo(l.virtual.slidesBefore, 0, !1, !0) : l.slideTo(l.virtual.slides.length, 0, !1, !0)), 
          l.allowSlidePrev = d, l.allowSlideNext = f, void l.emit("loopFix");
        }
        let h = p.slidesPerView;
        "auto" === h ? h = l.slidesPerViewDynamic() : (h = Math.ceil(parseFloat(p.slidesPerView, 10)), 
        m && h % 2 == 0 && (h += 1));
        const g = p.slidesPerGroupAuto ? h : p.slidesPerGroup;
        let y = g;
        y % g != 0 && (y += g - y % g), y += p.loopAdditionalSlides, l.loopedSlides = y;
        const v = l.grid && p.grid && p.grid.rows > 1;
        c.length < h + y ? di("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : v && "row" === p.grid.fill && di("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
        const z = [], b = [];
        let _ = l.activeIndex;
        void 0 === a ? a = l.getSlideIndex(c.filter((e => e.classList.contains(p.slideActiveClass)))[0]) : _ = a;
        const w = "next" === r || !r, x = "prev" === r || !r;
        let T = 0, S = 0;
        const E = v ? Math.ceil(c.length / p.grid.rows) : c.length, C = (v ? c[a].column : a) + (m && void 0 === i ? -h / 2 + .5 : 0);
        if (C < y) {
          T = Math.max(y - C, g);
          for (let e = 0; e < y - C; e += 1) {
            const t = e - Math.floor(e / E) * E;
            if (v) {
              const e = E - t - 1;
              for (let t = c.length - 1; t >= 0; t -= 1) {
                c[t].column === e && z.push(t);
              }
            } else {
              z.push(E - t - 1);
            }
          }
        } else if (C + h > E - y) {
          S = Math.max(C - (E - 2 * y), g);
          for (let e = 0; e < S; e += 1) {
            const t = e - Math.floor(e / E) * E;
            v ? c.forEach(((e, o) => {
              e.column === t && b.push(o);
            })) : b.push(t);
          }
        }
        if (l.__preventObserver__ = !0, requestAnimationFrame((() => {
          l.__preventObserver__ = !1;
        })), x && z.forEach((e => {
          c[e].swiperLoopMoveDOM = !0, u.prepend(c[e]), c[e].swiperLoopMoveDOM = !1;
        })), w && b.forEach((e => {
          c[e].swiperLoopMoveDOM = !0, u.append(c[e]), c[e].swiperLoopMoveDOM = !1;
        })), l.recalcSlides(), "auto" === p.slidesPerView ? l.updateSlides() : v && (z.length > 0 && x || b.length > 0 && w) && l.slides.forEach(((e, t) => {
          l.grid.updateSlide(t, e, l.slides);
        })), p.watchSlidesProgress && l.updateSlidesOffset(), o) {
          if (z.length > 0 && x) {
            if (void 0 === t) {
              const e = l.slidesGrid[_], t = l.slidesGrid[_ + T] - e;
              n ? l.setTranslate(l.translate - t) : (l.slideTo(_ + Math.ceil(T), 0, !1, !0), i && (l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - t, 
              l.touchEventsData.currentTranslate = l.touchEventsData.currentTranslate - t));
            } else if (i) {
              const e = v ? z.length / p.grid.rows : z.length;
              l.slideTo(l.activeIndex + e, 0, !1, !0), l.touchEventsData.currentTranslate = l.translate;
            }
          } else if (b.length > 0 && w) {
            if (void 0 === t) {
              const e = l.slidesGrid[_], t = l.slidesGrid[_ - S] - e;
              n ? l.setTranslate(l.translate - t) : (l.slideTo(_ - S, 0, !1, !0), i && (l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - t, 
              l.touchEventsData.currentTranslate = l.touchEventsData.currentTranslate - t));
            } else {
              const e = v ? b.length / p.grid.rows : b.length;
              l.slideTo(l.activeIndex - e, 0, !1, !0);
            }
          }
        }
        if (l.allowSlidePrev = d, l.allowSlideNext = f, l.controller && l.controller.control && !s) {
          const e = {
            slideRealIndex: t,
            direction: r,
            setTranslate: i,
            activeSlideIndex: a,
            byController: !0
          };
          Array.isArray(l.controller.control) ? l.controller.control.forEach((t => {
            !t.destroyed && t.params.loop && t.loopFix({
              ...e,
              slideTo: t.params.slidesPerView === p.slidesPerView && o
            });
          })) : l.controller.control instanceof l.constructor && l.controller.control.params.loop && l.controller.control.loopFix({
            ...e,
            slideTo: l.controller.control.params.slidesPerView === p.slidesPerView && o
          });
        }
        l.emit("loopFix");
      },
      loopDestroy: function() {
        const e = this, {params: t, slidesEl: o} = e;
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
          o.append(e);
        })), e.recalcSlides(), e.slideTo(e.realIndex, 0);
      }
    };
    function Li(e, t, o) {
      const r = Jr(), {params: i} = e, a = i.edgeSwipeDetection, s = i.edgeSwipeThreshold;
      return !a || !(o <= s || o >= r.innerWidth - s) || "prevent" === a && (t.preventDefault(), 
      !0);
    }
    function Oi(e) {
      const t = this, o = Qr();
      let r = e;
      r.originalEvent && (r = r.originalEvent);
      const i = t.touchEventsData;
      if ("pointerdown" === r.type) {
        if (null !== i.pointerId && i.pointerId !== r.pointerId) {
          return;
        }
        i.pointerId = r.pointerId;
      } else {
        "touchstart" === r.type && 1 === r.targetTouches.length && (i.touchId = r.targetTouches[0].identifier);
      }
      if ("touchstart" === r.type) {
        return void Li(t, r, r.targetTouches[0].pageX);
      }
      const {params: a, touches: s, enabled: n} = t;
      if (!n) {
        return;
      }
      if (!a.simulateTouch && "mouse" === r.pointerType) {
        return;
      }
      if (t.animating && a.preventInteractionOnTransition) {
        return;
      }
      !t.animating && a.cssMode && a.loop && t.loopFix();
      let l = r.target;
      if ("wrapper" === a.touchEventsTarget && !t.wrapperEl.contains(l)) {
        return;
      }
      if ("which" in r && 3 === r.which) {
        return;
      }
      if ("button" in r && r.button > 0) {
        return;
      }
      if (i.isTouched && i.isMoved) {
        return;
      }
      const c = !!a.noSwipingClass && "" !== a.noSwipingClass, d = r.composedPath ? r.composedPath() : r.path;
      c && r.target && r.target.shadowRoot && d && (l = d[0]);
      const f = a.noSwipingSelector ? a.noSwipingSelector : `.${a.noSwipingClass}`, u = !(!r.target || !r.target.shadowRoot);
      if (a.noSwiping && (u ? function(e, t) {
        return void 0 === t && (t = this), function t(o) {
          if (!o || o === Qr() || o === Jr()) {
            return null;
          }
          o.assignedSlot && (o = o.assignedSlot);
          const r = o.closest(e);
          return r || o.getRootNode ? r || t(o.getRootNode().host) : null;
        }(t);
      }(f, l) : l.closest(f))) {
        return void (t.allowClick = !0);
      }
      if (a.swipeHandler && !l.closest(a.swipeHandler)) {
        return;
      }
      s.currentX = r.pageX, s.currentY = r.pageY;
      const p = s.currentX, m = s.currentY;
      if (!Li(t, r, p)) {
        return;
      }
      Object.assign(i, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
      }), s.startX = p, s.startY = m, i.touchStartTime = oi(), t.allowClick = !0, t.updateSize(), 
      t.swipeDirection = void 0, a.threshold > 0 && (i.allowThresholdMove = !1);
      let h = !0;
      l.matches(i.focusableElements) && (h = !1, "SELECT" === l.nodeName && (i.isTouched = !1)), 
      o.activeElement && o.activeElement.matches(i.focusableElements) && o.activeElement !== l && o.activeElement.blur();
      const g = h && t.allowTouchMove && a.touchStartPreventDefault;
      !a.touchStartForcePreventDefault && !g || l.isContentEditable || r.preventDefault(), 
      a.freeMode && a.freeMode.enabled && t.freeMode && t.animating && !a.cssMode && t.freeMode.onTouchStart(), 
      t.emit("touchStart", r);
    }
    function Ii(e) {
      const t = Qr(), o = this, r = o.touchEventsData, {params: i, touches: a, rtlTranslate: s, enabled: n} = o;
      if (!n) {
        return;
      }
      if (!i.simulateTouch && "mouse" === e.pointerType) {
        return;
      }
      let l, c = e;
      if (c.originalEvent && (c = c.originalEvent), "pointermove" === c.type) {
        if (null !== r.touchId) {
          return;
        }
        if (c.pointerId !== r.pointerId) {
          return;
        }
      }
      if ("touchmove" === c.type) {
        if (l = [ ...c.changedTouches ].filter((e => e.identifier === r.touchId))[0], !l || l.identifier !== r.touchId) {
          return;
        }
      } else {
        l = c;
      }
      if (!r.isTouched) {
        return void (r.startMoving && r.isScrolling && o.emit("touchMoveOpposite", c));
      }
      const d = l.pageX, f = l.pageY;
      if (c.preventedByNestedSwiper) {
        return a.startX = d, void (a.startY = f);
      }
      if (!o.allowTouchMove) {
        return c.target.matches(r.focusableElements) || (o.allowClick = !1), void (r.isTouched && (Object.assign(a, {
          startX: d,
          startY: f,
          currentX: d,
          currentY: f
        }), r.touchStartTime = oi()));
      }
      if (i.touchReleaseOnEdges && !i.loop) {
        if (o.isVertical()) {
          if (f < a.startY && o.translate <= o.maxTranslate() || f > a.startY && o.translate >= o.minTranslate()) {
            return r.isTouched = !1, void (r.isMoved = !1);
          }
        } else if (d < a.startX && o.translate <= o.maxTranslate() || d > a.startX && o.translate >= o.minTranslate()) {
          return;
        }
      }
      if (t.activeElement && c.target === t.activeElement && c.target.matches(r.focusableElements)) {
        return r.isMoved = !0, void (o.allowClick = !1);
      }
      r.allowTouchCallbacks && o.emit("touchMove", c), a.previousX = a.currentX, a.previousY = a.currentY, 
      a.currentX = d, a.currentY = f;
      const u = a.currentX - a.startX, p = a.currentY - a.startY;
      if (o.params.threshold && Math.sqrt(u ** 2 + p ** 2) < o.params.threshold) {
        return;
      }
      if (void 0 === r.isScrolling) {
        let e;
        o.isHorizontal() && a.currentY === a.startY || o.isVertical() && a.currentX === a.startX ? r.isScrolling = !1 : u * u + p * p >= 25 && (e = 180 * Math.atan2(Math.abs(p), Math.abs(u)) / Math.PI, 
        r.isScrolling = o.isHorizontal() ? e > i.touchAngle : 90 - e > i.touchAngle);
      }
      if (r.isScrolling && o.emit("touchMoveOpposite", c), void 0 === r.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (r.startMoving = !0)), 
      r.isScrolling) {
        return void (r.isTouched = !1);
      }
      if (!r.startMoving) {
        return;
      }
      o.allowClick = !1, !i.cssMode && c.cancelable && c.preventDefault(), i.touchMoveStopPropagation && !i.nested && c.stopPropagation();
      let m = o.isHorizontal() ? u : p, h = o.isHorizontal() ? a.currentX - a.previousX : a.currentY - a.previousY;
      i.oneWayMovement && (m = Math.abs(m) * (s ? 1 : -1), h = Math.abs(h) * (s ? 1 : -1)), 
      a.diff = m, m *= i.touchRatio, s && (m = -m, h = -h);
      const g = o.touchesDirection;
      o.swipeDirection = m > 0 ? "prev" : "next", o.touchesDirection = h > 0 ? "prev" : "next";
      const y = o.params.loop && !i.cssMode, v = "next" === o.touchesDirection && o.allowSlideNext || "prev" === o.touchesDirection && o.allowSlidePrev;
      if (!r.isMoved) {
        if (y && v && o.loopFix({
          direction: o.swipeDirection
        }), r.startTranslate = o.getTranslate(), o.setTransition(0), o.animating) {
          const e = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0
          });
          o.wrapperEl.dispatchEvent(e);
        }
        r.allowMomentumBounce = !1, !i.grabCursor || !0 !== o.allowSlideNext && !0 !== o.allowSlidePrev || o.setGrabCursor(!0), 
        o.emit("sliderFirstMove", c);
      }
      if ((new Date).getTime(), r.isMoved && r.allowThresholdMove && g !== o.touchesDirection && y && v && Math.abs(m) >= 1) {
        return Object.assign(a, {
          startX: d,
          startY: f,
          currentX: d,
          currentY: f,
          startTranslate: r.currentTranslate
        }), r.loopSwapReset = !0, void (r.startTranslate = r.currentTranslate);
      }
      o.emit("sliderMove", c), r.isMoved = !0, r.currentTranslate = m + r.startTranslate;
      let z = !0, b = i.resistanceRatio;
      if (i.touchReleaseOnEdges && (b = 0), m > 0 ? (y && v && r.allowThresholdMove && r.currentTranslate > (i.centeredSlides ? o.minTranslate() - o.slidesSizesGrid[o.activeIndex + 1] : o.minTranslate()) && o.loopFix({
        direction: "prev",
        setTranslate: !0,
        activeSlideIndex: 0
      }), r.currentTranslate > o.minTranslate() && (z = !1, i.resistance && (r.currentTranslate = o.minTranslate() - 1 + (-o.minTranslate() + r.startTranslate + m) ** b))) : m < 0 && (y && v && r.allowThresholdMove && r.currentTranslate < (i.centeredSlides ? o.maxTranslate() + o.slidesSizesGrid[o.slidesSizesGrid.length - 1] : o.maxTranslate()) && o.loopFix({
        direction: "next",
        setTranslate: !0,
        activeSlideIndex: o.slides.length - ("auto" === i.slidesPerView ? o.slidesPerViewDynamic() : Math.ceil(parseFloat(i.slidesPerView, 10)))
      }), r.currentTranslate < o.maxTranslate() && (z = !1, i.resistance && (r.currentTranslate = o.maxTranslate() + 1 - (o.maxTranslate() - r.startTranslate - m) ** b))), 
      z && (c.preventedByNestedSwiper = !0), !o.allowSlideNext && "next" === o.swipeDirection && r.currentTranslate < r.startTranslate && (r.currentTranslate = r.startTranslate), 
      !o.allowSlidePrev && "prev" === o.swipeDirection && r.currentTranslate > r.startTranslate && (r.currentTranslate = r.startTranslate), 
      o.allowSlidePrev || o.allowSlideNext || (r.currentTranslate = r.startTranslate), 
      i.threshold > 0) {
        if (!(Math.abs(m) > i.threshold || r.allowThresholdMove)) {
          return void (r.currentTranslate = r.startTranslate);
        }
        if (!r.allowThresholdMove) {
          return r.allowThresholdMove = !0, a.startX = a.currentX, a.startY = a.currentY, 
          r.currentTranslate = r.startTranslate, void (a.diff = o.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY);
        }
      }
      i.followFinger && !i.cssMode && ((i.freeMode && i.freeMode.enabled && o.freeMode || i.watchSlidesProgress) && (o.updateActiveIndex(), 
      o.updateSlidesClasses()), i.freeMode && i.freeMode.enabled && o.freeMode && o.freeMode.onTouchMove(), 
      o.updateProgress(r.currentTranslate), o.setTranslate(r.currentTranslate));
    }
    function Di(e) {
      const t = this, o = t.touchEventsData;
      let r, i = e;
      i.originalEvent && (i = i.originalEvent);
      if ("touchend" === i.type || "touchcancel" === i.type) {
        if (r = [ ...i.changedTouches ].filter((e => e.identifier === o.touchId))[0], !r || r.identifier !== o.touchId) {
          return;
        }
      } else {
        if (null !== o.touchId) {
          return;
        }
        if (i.pointerId !== o.pointerId) {
          return;
        }
        r = i;
      }
      if ([ "pointercancel", "pointerout", "pointerleave", "contextmenu" ].includes(i.type)) {
        if (!([ "pointercancel", "contextmenu" ].includes(i.type) && (t.browser.isSafari || t.browser.isWebView))) {
          return;
        }
      }
      o.pointerId = null, o.touchId = null;
      const {params: a, touches: s, rtlTranslate: n, slidesGrid: l, enabled: c} = t;
      if (!c) {
        return;
      }
      if (!a.simulateTouch && "mouse" === i.pointerType) {
        return;
      }
      if (o.allowTouchCallbacks && t.emit("touchEnd", i), o.allowTouchCallbacks = !1, 
      !o.isTouched) {
        return o.isMoved && a.grabCursor && t.setGrabCursor(!1), o.isMoved = !1, void (o.startMoving = !1);
      }
      a.grabCursor && o.isMoved && o.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
      const d = oi(), f = d - o.touchStartTime;
      if (t.allowClick) {
        const e = i.path || i.composedPath && i.composedPath();
        t.updateClickedSlide(e && e[0] || i.target, e), t.emit("tap click", i), f < 300 && d - o.lastClickTime < 300 && t.emit("doubleTap doubleClick", i);
      }
      if (o.lastClickTime = oi(), ti((() => {
        t.destroyed || (t.allowClick = !0);
      })), !o.isTouched || !o.isMoved || !t.swipeDirection || 0 === s.diff && !o.loopSwapReset || o.currentTranslate === o.startTranslate && !o.loopSwapReset) {
        return o.isTouched = !1, o.isMoved = !1, void (o.startMoving = !1);
      }
      let u;
      if (o.isTouched = !1, o.isMoved = !1, o.startMoving = !1, u = a.followFinger ? n ? t.translate : -t.translate : -o.currentTranslate, 
      a.cssMode) {
        return;
      }
      if (a.freeMode && a.freeMode.enabled) {
        return void t.freeMode.onTouchEnd({
          currentPos: u
        });
      }
      const p = u >= -t.maxTranslate() && !t.params.loop;
      let m = 0, h = t.slidesSizesGrid[0];
      for (let e = 0; e < l.length; e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
        const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
        void 0 !== l[e + t] ? (p || u >= l[e] && u < l[e + t]) && (m = e, h = l[e + t] - l[e]) : (p || u >= l[e]) && (m = e, 
        h = l[l.length - 1] - l[l.length - 2]);
      }
      let g = null, y = null;
      a.rewind && (t.isBeginning ? y = a.virtual && a.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (g = 0));
      const v = (u - l[m]) / h, z = m < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
      if (f > a.longSwipesMs) {
        if (!a.longSwipes) {
          return void t.slideTo(t.activeIndex);
        }
        "next" === t.swipeDirection && (v >= a.longSwipesRatio ? t.slideTo(a.rewind && t.isEnd ? g : m + z) : t.slideTo(m)), 
        "prev" === t.swipeDirection && (v > 1 - a.longSwipesRatio ? t.slideTo(m + z) : null !== y && v < 0 && Math.abs(v) > a.longSwipesRatio ? t.slideTo(y) : t.slideTo(m));
      } else {
        if (!a.shortSwipes) {
          return void t.slideTo(t.activeIndex);
        }
        t.navigation && (i.target === t.navigation.nextEl || i.target === t.navigation.prevEl) ? i.target === t.navigation.nextEl ? t.slideTo(m + z) : t.slideTo(m) : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : m + z), 
        "prev" === t.swipeDirection && t.slideTo(null !== y ? y : m));
      }
    }
    function qi() {
      const e = this, {params: t, el: o} = e;
      if (o && 0 === o.offsetWidth) {
        return;
      }
      t.breakpoints && e.setBreakpoint();
      const {allowSlideNext: r, allowSlidePrev: i, snapGrid: a} = e, s = e.virtual && e.params.virtual.enabled;
      e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), 
      e.updateSlidesClasses();
      const n = s && t.loop;
      !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || n ? e.params.loop && !s ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0), 
      e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), 
      e.autoplay.resizeTimeout = setTimeout((() => {
        e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
      }), 500)), e.allowSlidePrev = i, e.allowSlideNext = r, e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
    }
    function Fi(e) {
      const t = this;
      t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), 
      e.stopImmediatePropagation())));
    }
    function Ri() {
      const e = this, {wrapperEl: t, rtlTranslate: o, enabled: r} = e;
      if (!r) {
        return;
      }
      let i;
      e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 
      0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
      const a = e.maxTranslate() - e.minTranslate();
      i = 0 === a ? 0 : (e.translate - e.minTranslate()) / a, i !== e.progress && e.updateProgress(o ? -e.translate : e.translate), 
      e.emit("setTranslate", e.translate, !1);
    }
    function Bi(e) {
      const t = this;
      Ti(t, e.target), t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update();
    }
    function Ni() {
      const e = this;
      e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
    }
    const Gi = (e, t) => {
      const o = Qr(), {params: r, el: i, wrapperEl: a, device: s} = e, n = !!r.nested, l = "on" === t ? "addEventListener" : "removeEventListener", c = t;
      o[l]("touchstart", e.onDocumentTouchStart, {
        passive: !1,
        capture: n
      }), i[l]("touchstart", e.onTouchStart, {
        passive: !1
      }), i[l]("pointerdown", e.onTouchStart, {
        passive: !1
      }), o[l]("touchmove", e.onTouchMove, {
        passive: !1,
        capture: n
      }), o[l]("pointermove", e.onTouchMove, {
        passive: !1,
        capture: n
      }), o[l]("touchend", e.onTouchEnd, {
        passive: !0
      }), o[l]("pointerup", e.onTouchEnd, {
        passive: !0
      }), o[l]("pointercancel", e.onTouchEnd, {
        passive: !0
      }), o[l]("touchcancel", e.onTouchEnd, {
        passive: !0
      }), o[l]("pointerout", e.onTouchEnd, {
        passive: !0
      }), o[l]("pointerleave", e.onTouchEnd, {
        passive: !0
      }), o[l]("contextmenu", e.onTouchEnd, {
        passive: !0
      }), (r.preventClicks || r.preventClicksPropagation) && i[l]("click", e.onClick, !0), 
      r.cssMode && a[l]("scroll", e.onScroll), r.updateOnWindowResize ? e[c](s.ios || s.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", qi, !0) : e[c]("observerUpdate", qi, !0), 
      i[l]("load", e.onLoad, {
        capture: !0
      });
    };
    const Yi = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var $i = {
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
    function Vi(e, t) {
      return function(o) {
        void 0 === o && (o = {});
        const r = Object.keys(o)[0], i = o[r];
        "object" == typeof i && null !== i ? (!0 === e[r] && (e[r] = {
          enabled: !0
        }), "navigation" === r && e[r] && e[r].enabled && !e[r].prevEl && !e[r].nextEl && (e[r].auto = !0), 
        [ "pagination", "scrollbar" ].indexOf(r) >= 0 && e[r] && e[r].enabled && !e[r].el && (e[r].auto = !0), 
        r in e && "enabled" in i ? ("object" != typeof e[r] || "enabled" in e[r] || (e[r].enabled = !0), 
        e[r] || (e[r] = {
          enabled: !1
        }), ai(t, o)) : ai(t, o)) : ai(t, o);
      };
    }
    const Hi = {
      eventsEmitter: xi,
      update: Ci,
      translate: Ai,
      transition: {
        setTransition: function(e, t) {
          const o = this;
          o.params.cssMode || (o.wrapperEl.style.transitionDuration = `${e}ms`, o.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : ""), 
          o.emit("setTransition", e, t);
        },
        transitionStart: function(e, t) {
          void 0 === e && (e = !0);
          const o = this, {params: r} = o;
          r.cssMode || (r.autoHeight && o.updateAutoHeight(), ki({
            swiper: o,
            runCallbacks: e,
            direction: t,
            step: "Start"
          }));
        },
        transitionEnd: function(e, t) {
          void 0 === e && (e = !0);
          const o = this, {params: r} = o;
          o.animating = !1, r.cssMode || (o.setTransition(0), ki({
            swiper: o,
            runCallbacks: e,
            direction: t,
            step: "End"
          }));
        }
      },
      slide: Mi,
      loop: Pi,
      grabCursor: {
        setGrabCursor: function(e) {
          const t = this;
          if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) {
            return;
          }
          const o = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0), o.style.cursor = "move", o.style.cursor = e ? "grabbing" : "grab", 
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
          e.onTouchStart = Oi.bind(e), e.onTouchMove = Ii.bind(e), e.onTouchEnd = Di.bind(e), 
          e.onDocumentTouchStart = Ni.bind(e), t.cssMode && (e.onScroll = Ri.bind(e)), e.onClick = Fi.bind(e), 
          e.onLoad = Bi.bind(e), Gi(e, "on");
        },
        detachEvents: function() {
          Gi(this, "off");
        }
      },
      breakpoints: {
        setBreakpoint: function() {
          const e = this, {realIndex: t, initialized: o, params: r, el: i} = e, a = r.breakpoints;
          if (!a || a && 0 === Object.keys(a).length) {
            return;
          }
          const s = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
          if (!s || e.currentBreakpoint === s) {
            return;
          }
          const n = (s in a ? a[s] : void 0) || e.originalParams, l = Yi(e, r), c = Yi(e, n), d = r.enabled;
          l && !c ? (i.classList.remove(`${r.containerModifierClass}grid`, `${r.containerModifierClass}grid-column`), 
          e.emitContainerClasses()) : !l && c && (i.classList.add(`${r.containerModifierClass}grid`), 
          (n.grid.fill && "column" === n.grid.fill || !n.grid.fill && "column" === r.grid.fill) && i.classList.add(`${r.containerModifierClass}grid-column`), 
          e.emitContainerClasses()), [ "navigation", "pagination", "scrollbar" ].forEach((t => {
            if (void 0 === n[t]) {
              return;
            }
            const o = r[t] && r[t].enabled, i = n[t] && n[t].enabled;
            o && !i && e[t].disable(), !o && i && e[t].enable();
          }));
          const f = n.direction && n.direction !== r.direction, u = r.loop && (n.slidesPerView !== r.slidesPerView || f), p = r.loop;
          f && o && e.changeDirection(), ai(e.params, n);
          const m = e.params.enabled, h = e.params.loop;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev
          }), d && !m ? e.disable() : !d && m && e.enable(), e.currentBreakpoint = s, e.emit("_beforeBreakpoint", n), 
          o && (u ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides()) : !p && h ? (e.loopCreate(t), 
          e.updateSlides()) : p && !h && e.loopDestroy()), e.emit("breakpoint", n);
        },
        getBreakpoint: function(e, t, o) {
          if (void 0 === t && (t = "window"), !e || "container" === t && !o) {
            return;
          }
          let r = !1;
          const i = Jr(), a = "window" === t ? i.innerHeight : o.clientHeight, s = Object.keys(e).map((e => {
            if ("string" == typeof e && 0 === e.indexOf("@")) {
              const t = parseFloat(e.substr(1));
              return {
                value: a * t,
                point: e
              };
            }
            return {
              value: e,
              point: e
            };
          }));
          s.sort(((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10)));
          for (let e = 0; e < s.length; e += 1) {
            const {point: a, value: n} = s[e];
            "window" === t ? i.matchMedia(`(min-width: ${n}px)`).matches && (r = a) : n <= o.clientWidth && (r = a);
          }
          return r || "max";
        }
      },
      checkOverflow: {
        checkOverflow: function() {
          const e = this, {isLocked: t, params: o} = e, {slidesOffsetBefore: r} = o;
          if (r) {
            const t = e.slides.length - 1, o = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * r;
            e.isLocked = e.size > o;
          } else {
            e.isLocked = 1 === e.snapGrid.length;
          }
          !0 === o.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === o.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), 
          t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        }
      },
      classes: {
        addClasses: function() {
          const e = this, {classNames: t, params: o, rtl: r, el: i, device: a} = e, s = function(e, t) {
            const o = [];
            return e.forEach((e => {
              "object" == typeof e ? Object.keys(e).forEach((r => {
                e[r] && o.push(t + r);
              })) : "string" == typeof e && o.push(t + e);
            })), o;
          }([ "initialized", o.direction, {
            "free-mode": e.params.freeMode && o.freeMode.enabled
          }, {
            autoheight: o.autoHeight
          }, {
            rtl: r
          }, {
            grid: o.grid && o.grid.rows > 1
          }, {
            "grid-column": o.grid && o.grid.rows > 1 && "column" === o.grid.fill
          }, {
            android: a.android
          }, {
            ios: a.ios
          }, {
            "css-mode": o.cssMode
          }, {
            centered: o.cssMode && o.centeredSlides
          }, {
            "watch-progress": o.watchSlidesProgress
          } ], o.containerModifierClass);
          t.push(...s), i.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function() {
          const {el: e, classNames: t} = this;
          e.classList.remove(...t), this.emitContainerClasses();
        }
      }
    }, Xi = {};
    class ji {
      constructor() {
        let e, t;
        for (var o = arguments.length, r = new Array(o), i = 0; i < o; i++) {
          r[i] = arguments[i];
        }
        1 === r.length && r[0].constructor && "Object" === Object.prototype.toString.call(r[0]).slice(8, -1) ? t = r[0] : [e, t] = r, 
        t || (t = {}), t = ai({}, t), e && !t.el && (t.el = e);
        const a = Qr();
        if (t.el && "string" == typeof t.el && a.querySelectorAll(t.el).length > 1) {
          const e = [];
          return a.querySelectorAll(t.el).forEach((o => {
            const r = ai({}, t, {
              el: o
            });
            e.push(new ji(r));
          })), e;
        }
        const s = this;
        s.__swiper__ = !0, s.support = bi(), s.device = _i({
          userAgent: t.userAgent
        }), s.browser = wi(), s.eventsListeners = {}, s.eventsAnyListeners = [], s.modules = [ ...s.__modules__ ], 
        t.modules && Array.isArray(t.modules) && s.modules.push(...t.modules);
        const n = {};
        s.modules.forEach((e => {
          e({
            params: t,
            swiper: s,
            extendParams: Vi(t, n),
            on: s.on.bind(s),
            once: s.once.bind(s),
            off: s.off.bind(s),
            emit: s.emit.bind(s)
          });
        }));
        const l = ai({}, $i, n);
        return s.params = ai({}, l, Xi, t), s.originalParams = ai({}, s.params), s.passedParams = ai({}, t), 
        s.params && s.params.on && Object.keys(s.params.on).forEach((e => {
          s.on(e, s.params.on[e]);
        })), s.params && s.params.onAny && s.onAny(s.params.onAny), Object.assign(s, {
          enabled: s.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === s.params.direction,
          isVertical: () => "vertical" === s.params.direction,
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
          allowSlideNext: s.params.allowSlideNext,
          allowSlidePrev: s.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: s.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            pointerId: null,
            touchId: null
          },
          allowClick: !0,
          allowTouchMove: s.params.allowTouchMove,
          touches: {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
          },
          imagesToLoad: [],
          imagesLoaded: 0
        }), s.emit("_swiper"), s.params.init && s.init(), s;
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
        const {slidesEl: t, params: o} = this, r = pi(ci(t, `.${o.slideClass}, swiper-slide`)[0]);
        return pi(e) - r;
      }
      getSlideIndexByData(e) {
        return this.getSlideIndex(this.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0]);
      }
      recalcSlides() {
        const {slidesEl: e, params: t} = this;
        this.slides = ci(e, `.${t.slideClass}, swiper-slide`);
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
        const o = this;
        e = Math.min(Math.max(e, 0), 1);
        const r = o.minTranslate(), i = (o.maxTranslate() - r) * e + r;
        o.translateTo(i, void 0 === t ? 0 : t), o.updateActiveIndex(), o.updateSlidesClasses();
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
        e.slides.forEach((o => {
          const r = e.getSlideClasses(o);
          t.push({
            slideEl: o,
            classNames: r
          }), e.emit("_slideClass", o, r);
        })), e.emit("_slideClasses", t);
      }
      slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"), void 0 === t && (t = !1);
        const {params: o, slides: r, slidesGrid: i, slidesSizesGrid: a, size: s, activeIndex: n} = this;
        let l = 1;
        if ("number" == typeof o.slidesPerView) {
          return o.slidesPerView;
        }
        if (o.centeredSlides) {
          let e, t = r[n] ? Math.ceil(r[n].swiperSlideSize) : 0;
          for (let o = n + 1; o < r.length; o += 1) {
            r[o] && !e && (t += Math.ceil(r[o].swiperSlideSize), l += 1, t > s && (e = !0));
          }
          for (let o = n - 1; o >= 0; o -= 1) {
            r[o] && !e && (t += r[o].swiperSlideSize, l += 1, t > s && (e = !0));
          }
        } else if ("current" === e) {
          for (let e = n + 1; e < r.length; e += 1) {
            (t ? i[e] + a[e] - i[n] < s : i[e] - i[n] < s) && (l += 1);
          }
        } else {
          for (let e = n - 1; e >= 0; e -= 1) {
            i[n] - i[e] < s && (l += 1);
          }
        }
        return l;
      }
      update() {
        const e = this;
        if (!e || e.destroyed) {
          return;
        }
        const {snapGrid: t, params: o} = e;
        function r() {
          const t = e.rtlTranslate ? -1 * e.translate : e.translate, o = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(o), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let i;
        if (o.breakpoints && e.setBreakpoint(), [ ...e.el.querySelectorAll('[loading="lazy"]') ].forEach((t => {
          t.complete && Ti(e, t);
        })), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), 
        o.freeMode && o.freeMode.enabled && !o.cssMode) {
          r(), o.autoHeight && e.updateAutoHeight();
        } else {
          if (("auto" === o.slidesPerView || o.slidesPerView > 1) && e.isEnd && !o.centeredSlides) {
            const t = e.virtual && o.virtual.enabled ? e.virtual.slides : e.slides;
            i = e.slideTo(t.length - 1, 0, !1, !0);
          } else {
            i = e.slideTo(e.activeIndex, 0, !1, !0);
          }
          i || r();
        }
        o.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
      }
      changeDirection(e, t) {
        void 0 === t && (t = !0);
        const o = this, r = o.params.direction;
        return e || (e = "horizontal" === r ? "vertical" : "horizontal"), e === r || "horizontal" !== e && "vertical" !== e || (o.el.classList.remove(`${o.params.containerModifierClass}${r}`), 
        o.el.classList.add(`${o.params.containerModifierClass}${e}`), o.emitContainerClasses(), 
        o.params.direction = e, o.slides.forEach((t => {
          "vertical" === e ? t.style.width = "" : t.style.height = "";
        })), o.emit("changeDirection"), t && o.update()), o;
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
        let o = e || t.params.el;
        if ("string" == typeof o && (o = document.querySelector(o)), !o) {
          return !1;
        }
        o.swiper = t, o.parentNode && o.parentNode.host && o.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
        const r = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let i = (() => {
          if (o && o.shadowRoot && o.shadowRoot.querySelector) {
            return o.shadowRoot.querySelector(r());
          }
          return ci(o, r())[0];
        })();
        return !i && t.params.createElements && (i = fi("div", t.params.wrapperClass), o.append(i), 
        ci(o, `.${t.params.slideClass}`).forEach((e => {
          i.append(e);
        }))), Object.assign(t, {
          el: o,
          wrapperEl: i,
          slidesEl: t.isElement && !o.parentNode.host.slideSlots ? o.parentNode.host : i,
          hostEl: t.isElement ? o.parentNode.host : o,
          mounted: !0,
          rtl: "rtl" === o.dir.toLowerCase() || "rtl" === ui(o, "direction"),
          rtlTranslate: "horizontal" === t.params.direction && ("rtl" === o.dir.toLowerCase() || "rtl" === ui(o, "direction")),
          wrongRTL: "-webkit-box" === ui(i, "display")
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
        const o = [ ...t.el.querySelectorAll('[loading="lazy"]') ];
        return t.isElement && o.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), 
        o.forEach((e => {
          e.complete ? Ti(t, e) : e.addEventListener("load", (e => {
            Ti(t, e.target);
          }));
        })), Ei(t), t.initialized = !0, Ei(t), t.emit("init"), t.emit("afterInit"), t;
      }
      destroy(e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        const o = this, {params: r, el: i, wrapperEl: a, slides: s} = o;
        return void 0 === o.params || o.destroyed || (o.emit("beforeDestroy"), o.initialized = !1, 
        o.detachEvents(), r.loop && o.loopDestroy(), t && (o.removeClasses(), i.removeAttribute("style"), 
        a.removeAttribute("style"), s && s.length && s.forEach((e => {
          e.classList.remove(r.slideVisibleClass, r.slideFullyVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass), 
          e.removeAttribute("style"), e.removeAttribute("data-swiper-slide-index");
        }))), o.emit("destroy"), Object.keys(o.eventsListeners).forEach((e => {
          o.off(e);
        })), !1 !== e && (o.el.swiper = null, function(e) {
          const t = e;
          Object.keys(t).forEach((e => {
            try {
              t[e] = null;
            } catch (e) {}
            try {
              delete t[e];
            } catch (e) {}
          }));
        }(o)), o.destroyed = !0), null;
      }
      static extendDefaults(e) {
        ai(Xi, e);
      }
      static get extendedDefaults() {
        return Xi;
      }
      static get defaults() {
        return $i;
      }
      static installModule(e) {
        ji.prototype.__modules__ || (ji.prototype.__modules__ = []);
        const t = ji.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e) ? (e.forEach((e => ji.installModule(e))), ji) : (ji.installModule(e), 
        ji);
      }
    }
    function Wi(e, t, o, r) {
      return e.params.createElements && Object.keys(r).forEach((i => {
        if (!o[i] && !0 === o.auto) {
          let a = ci(e.el, `.${r[i]}`)[0];
          a || (a = fi("div", r[i]), a.className = r[i], e.el.append(a)), o[i] = a, t[i] = a;
        }
      })), o;
    }
    function Ui(e) {
      let {swiper: t, extendParams: o, on: r, emit: i} = e;
      function a(e) {
        let o;
        return e && "string" == typeof e && t.isElement && (o = t.el.querySelector(e), o) ? o : (e && ("string" == typeof e && (o = [ ...document.querySelectorAll(e) ]), 
        t.params.uniqueNavElements && "string" == typeof e && o.length > 1 && 1 === t.el.querySelectorAll(e).length && (o = t.el.querySelector(e))), 
        e && !o ? e : o);
      }
      function s(e, o) {
        const r = t.params.navigation;
        (e = gi(e)).forEach((e => {
          e && (e.classList[o ? "add" : "remove"](...r.disabledClass.split(" ")), "BUTTON" === e.tagName && (e.disabled = o), 
          t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](r.lockClass));
        }));
      }
      function n() {
        const {nextEl: e, prevEl: o} = t.navigation;
        if (t.params.loop) {
          return s(o, !1), void s(e, !1);
        }
        s(o, t.isBeginning && !t.params.rewind), s(e, t.isEnd && !t.params.rewind);
      }
      function l(e) {
        e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(), 
        i("navigationPrev"));
      }
      function c(e) {
        e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(), 
        i("navigationNext"));
      }
      function d() {
        const e = t.params.navigation;
        if (t.params.navigation = Wi(t, t.originalParams.navigation, t.params.navigation, {
          nextEl: "swiper-button-next",
          prevEl: "swiper-button-prev"
        }), !e.nextEl && !e.prevEl) {
          return;
        }
        let o = a(e.nextEl), r = a(e.prevEl);
        Object.assign(t.navigation, {
          nextEl: o,
          prevEl: r
        }), o = gi(o), r = gi(r);
        const i = (o, r) => {
          o && o.addEventListener("click", "next" === r ? c : l), !t.enabled && o && o.classList.add(...e.lockClass.split(" "));
        };
        o.forEach((e => i(e, "next"))), r.forEach((e => i(e, "prev")));
      }
      function f() {
        let {nextEl: e, prevEl: o} = t.navigation;
        e = gi(e), o = gi(o);
        const r = (e, o) => {
          e.removeEventListener("click", "next" === o ? c : l), e.classList.remove(...t.params.navigation.disabledClass.split(" "));
        };
        e.forEach((e => r(e, "next"))), o.forEach((e => r(e, "prev")));
      }
      o({
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
        !1 === t.params.navigation.enabled ? u() : (d(), n());
      })), r("toEdge fromEdge lock unlock", (() => {
        n();
      })), r("destroy", (() => {
        f();
      })), r("enable disable", (() => {
        let {nextEl: e, prevEl: o} = t.navigation;
        e = gi(e), o = gi(o), t.enabled ? n() : [ ...e, ...o ].filter((e => !!e)).forEach((e => e.classList.add(t.params.navigation.lockClass)));
      })), r("click", ((e, o) => {
        let {nextEl: r, prevEl: a} = t.navigation;
        r = gi(r), a = gi(a);
        const s = o.target;
        if (t.params.navigation.hideOnClick && !a.includes(s) && !r.includes(s)) {
          if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === s || t.pagination.el.contains(s))) {
            return;
          }
          let e;
          r.length ? e = r[0].classList.contains(t.params.navigation.hiddenClass) : a.length && (e = a[0].classList.contains(t.params.navigation.hiddenClass)), 
          i(!0 === e ? "navigationShow" : "navigationHide"), [ ...r, ...a ].filter((e => !!e)).forEach((e => e.classList.toggle(t.params.navigation.hiddenClass)));
        }
      }));
      const u = () => {
        t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")), f();
      };
      Object.assign(t.navigation, {
        enable: () => {
          t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")), 
          d(), n();
        },
        disable: u,
        update: n,
        init: d,
        destroy: f
      });
    }
    function Ki(e) {
      return void 0 === e && (e = ""), `.${e.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
    }
    function Qi(e) {
      let {swiper: t, extendParams: o, on: r, emit: i} = e;
      const a = "swiper-pagination";
      let s;
      o({
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
          bulletClass: `${a}-bullet`,
          bulletActiveClass: `${a}-bullet-active`,
          modifierClass: `${a}-`,
          currentClass: `${a}-current`,
          totalClass: `${a}-total`,
          hiddenClass: `${a}-hidden`,
          progressbarFillClass: `${a}-progressbar-fill`,
          progressbarOppositeClass: `${a}-progressbar-opposite`,
          clickableClass: `${a}-clickable`,
          lockClass: `${a}-lock`,
          horizontalClass: `${a}-horizontal`,
          verticalClass: `${a}-vertical`,
          paginationDisabledClass: `${a}-disabled`
        }
      }), t.pagination = {
        el: null,
        bullets: []
      };
      let n = 0;
      function l() {
        return !t.params.pagination.el || !t.pagination.el || Array.isArray(t.pagination.el) && 0 === t.pagination.el.length;
      }
      function c(e, o) {
        const {bulletActiveClass: r} = t.params.pagination;
        e && (e = e[("prev" === o ? "previous" : "next") + "ElementSibling"]) && (e.classList.add(`${r}-${o}`), 
        (e = e[("prev" === o ? "previous" : "next") + "ElementSibling"]) && e.classList.add(`${r}-${o}-${o}`));
      }
      function d(e) {
        const o = e.target.closest(Ki(t.params.pagination.bulletClass));
        if (!o) {
          return;
        }
        e.preventDefault();
        const r = pi(o) * t.params.slidesPerGroup;
        if (t.params.loop) {
          if (t.realIndex === r) {
            return;
          }
          t.slideToLoop(r);
        } else {
          t.slideTo(r);
        }
      }
      function f() {
        const e = t.rtl, o = t.params.pagination;
        if (l()) {
          return;
        }
        let r, a, d = t.pagination.el;
        d = gi(d);
        const f = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length, u = t.params.loop ? Math.ceil(f / t.params.slidesPerGroup) : t.snapGrid.length;
        if (t.params.loop ? (a = t.previousRealIndex || 0, r = t.params.slidesPerGroup > 1 ? Math.floor(t.realIndex / t.params.slidesPerGroup) : t.realIndex) : void 0 !== t.snapIndex ? (r = t.snapIndex, 
        a = t.previousSnapIndex) : (a = t.previousIndex || 0, r = t.activeIndex || 0), "bullets" === o.type && t.pagination.bullets && t.pagination.bullets.length > 0) {
          const i = t.pagination.bullets;
          let l, f, u;
          if (o.dynamicBullets && (s = hi(i[0], t.isHorizontal() ? "width" : "height", !0), 
          d.forEach((e => {
            e.style[t.isHorizontal() ? "width" : "height"] = s * (o.dynamicMainBullets + 4) + "px";
          })), o.dynamicMainBullets > 1 && void 0 !== a && (n += r - (a || 0), n > o.dynamicMainBullets - 1 ? n = o.dynamicMainBullets - 1 : n < 0 && (n = 0)), 
          l = Math.max(r - n, 0), f = l + (Math.min(i.length, o.dynamicMainBullets) - 1), 
          u = (f + l) / 2), i.forEach((e => {
            const t = [ ...[ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((e => `${o.bulletActiveClass}${e}`)) ].map((e => "string" == typeof e && e.includes(" ") ? e.split(" ") : e)).flat();
            e.classList.remove(...t);
          })), d.length > 1) {
            i.forEach((e => {
              const i = pi(e);
              i === r ? e.classList.add(...o.bulletActiveClass.split(" ")) : t.isElement && e.setAttribute("part", "bullet"), 
              o.dynamicBullets && (i >= l && i <= f && e.classList.add(...`${o.bulletActiveClass}-main`.split(" ")), 
              i === l && c(e, "prev"), i === f && c(e, "next"));
            }));
          } else {
            const e = i[r];
            if (e && e.classList.add(...o.bulletActiveClass.split(" ")), t.isElement && i.forEach(((e, t) => {
              e.setAttribute("part", t === r ? "bullet-active" : "bullet");
            })), o.dynamicBullets) {
              const e = i[l], t = i[f];
              for (let e = l; e <= f; e += 1) {
                i[e] && i[e].classList.add(...`${o.bulletActiveClass}-main`.split(" "));
              }
              c(e, "prev"), c(t, "next");
            }
          }
          if (o.dynamicBullets) {
            const r = Math.min(i.length, o.dynamicMainBullets + 4), a = (s * r - s) / 2 - u * s, n = e ? "right" : "left";
            i.forEach((e => {
              e.style[t.isHorizontal() ? n : "top"] = `${a}px`;
            }));
          }
        }
        d.forEach(((e, a) => {
          if ("fraction" === o.type && (e.querySelectorAll(Ki(o.currentClass)).forEach((e => {
            e.textContent = o.formatFractionCurrent(r + 1);
          })), e.querySelectorAll(Ki(o.totalClass)).forEach((e => {
            e.textContent = o.formatFractionTotal(u);
          }))), "progressbar" === o.type) {
            let i;
            i = o.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical";
            const a = (r + 1) / u;
            let s = 1, n = 1;
            "horizontal" === i ? s = a : n = a, e.querySelectorAll(Ki(o.progressbarFillClass)).forEach((e => {
              e.style.transform = `translate3d(0,0,0) scaleX(${s}) scaleY(${n})`, e.style.transitionDuration = `${t.params.speed}ms`;
            }));
          }
          "custom" === o.type && o.renderCustom ? (e.innerHTML = o.renderCustom(t, r + 1, u), 
          0 === a && i("paginationRender", e)) : (0 === a && i("paginationRender", e), i("paginationUpdate", e)), 
          t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](o.lockClass);
        }));
      }
      function u() {
        const e = t.params.pagination;
        if (l()) {
          return;
        }
        const o = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.grid && t.params.grid.rows > 1 ? t.slides.length / Math.ceil(t.params.grid.rows) : t.slides.length;
        let r = t.pagination.el;
        r = gi(r);
        let a = "";
        if ("bullets" === e.type) {
          let r = t.params.loop ? Math.ceil(o / t.params.slidesPerGroup) : t.snapGrid.length;
          t.params.freeMode && t.params.freeMode.enabled && r > o && (r = o);
          for (let o = 0; o < r; o += 1) {
            e.renderBullet ? a += e.renderBullet.call(t, o, e.bulletClass) : a += `<${e.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>`;
          }
        }
        "fraction" === e.type && (a = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`), 
        "progressbar" === e.type && (a = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`), 
        t.pagination.bullets = [], r.forEach((o => {
          "custom" !== e.type && (o.innerHTML = a || ""), "bullets" === e.type && t.pagination.bullets.push(...o.querySelectorAll(Ki(e.bulletClass)));
        })), "custom" !== e.type && i("paginationRender", r[0]);
      }
      function p() {
        t.params.pagination = Wi(t, t.originalParams.pagination, t.params.pagination, {
          el: "swiper-pagination"
        });
        const e = t.params.pagination;
        if (!e.el) {
          return;
        }
        let o;
        "string" == typeof e.el && t.isElement && (o = t.el.querySelector(e.el)), o || "string" != typeof e.el || (o = [ ...document.querySelectorAll(e.el) ]), 
        o || (o = e.el), o && 0 !== o.length && (t.params.uniqueNavElements && "string" == typeof e.el && Array.isArray(o) && o.length > 1 && (o = [ ...t.el.querySelectorAll(e.el) ], 
        o.length > 1 && (o = o.filter((e => mi(e, ".swiper")[0] === t.el))[0])), Array.isArray(o) && 1 === o.length && (o = o[0]), 
        Object.assign(t.pagination, {
          el: o
        }), o = gi(o), o.forEach((o => {
          "bullets" === e.type && e.clickable && o.classList.add(...(e.clickableClass || "").split(" ")), 
          o.classList.add(e.modifierClass + e.type), o.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass), 
          "bullets" === e.type && e.dynamicBullets && (o.classList.add(`${e.modifierClass}${e.type}-dynamic`), 
          n = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && o.classList.add(e.progressbarOppositeClass), 
          e.clickable && o.addEventListener("click", d), t.enabled || o.classList.add(e.lockClass);
        })));
      }
      function m() {
        const e = t.params.pagination;
        if (l()) {
          return;
        }
        let o = t.pagination.el;
        o && (o = gi(o), o.forEach((o => {
          o.classList.remove(e.hiddenClass), o.classList.remove(e.modifierClass + e.type), 
          o.classList.remove(t.isHorizontal() ? e.horizontalClass : e.verticalClass), e.clickable && (o.classList.remove(...(e.clickableClass || "").split(" ")), 
          o.removeEventListener("click", d));
        }))), t.pagination.bullets && t.pagination.bullets.forEach((t => t.classList.remove(...e.bulletActiveClass.split(" "))));
      }
      r("changeDirection", (() => {
        if (!t.pagination || !t.pagination.el) {
          return;
        }
        const e = t.params.pagination;
        let {el: o} = t.pagination;
        o = gi(o), o.forEach((o => {
          o.classList.remove(e.horizontalClass, e.verticalClass), o.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass);
        }));
      })), r("init", (() => {
        !1 === t.params.pagination.enabled ? h() : (p(), u(), f());
      })), r("activeIndexChange", (() => {
        void 0 === t.snapIndex && f();
      })), r("snapIndexChange", (() => {
        f();
      })), r("snapGridLengthChange", (() => {
        u(), f();
      })), r("destroy", (() => {
        m();
      })), r("enable disable", (() => {
        let {el: e} = t.pagination;
        e && (e = gi(e), e.forEach((e => e.classList[t.enabled ? "remove" : "add"](t.params.pagination.lockClass))));
      })), r("lock unlock", (() => {
        f();
      })), r("click", ((e, o) => {
        const r = o.target, a = gi(t.pagination.el);
        if (t.params.pagination.el && t.params.pagination.hideOnClick && a && a.length > 0 && !r.classList.contains(t.params.pagination.bulletClass)) {
          if (t.navigation && (t.navigation.nextEl && r === t.navigation.nextEl || t.navigation.prevEl && r === t.navigation.prevEl)) {
            return;
          }
          const e = a[0].classList.contains(t.params.pagination.hiddenClass);
          i(!0 === e ? "paginationShow" : "paginationHide"), a.forEach((e => e.classList.toggle(t.params.pagination.hiddenClass)));
        }
      }));
      const h = () => {
        t.el.classList.add(t.params.pagination.paginationDisabledClass);
        let {el: e} = t.pagination;
        e && (e = gi(e), e.forEach((e => e.classList.add(t.params.pagination.paginationDisabledClass)))), 
        m();
      };
      Object.assign(t.pagination, {
        enable: () => {
          t.el.classList.remove(t.params.pagination.paginationDisabledClass);
          let {el: e} = t.pagination;
          e && (e = gi(e), e.forEach((e => e.classList.remove(t.params.pagination.paginationDisabledClass)))), 
          p(), u(), f();
        },
        disable: h,
        render: u,
        update: f,
        init: p,
        destroy: m
      });
    }
    function Zi(e) {
      let {swiper: t, extendParams: o, on: r, emit: i} = e;
      const a = Qr();
      let s, n, l, c, d = !1, f = null, u = null;
      function p() {
        if (!t.params.scrollbar.el || !t.scrollbar.el) {
          return;
        }
        const {scrollbar: e, rtlTranslate: o} = t, {dragEl: r, el: i} = e, a = t.params.scrollbar, s = t.params.loop ? t.progressLoop : t.progress;
        let c = n, d = (l - n) * s;
        o ? (d = -d, d > 0 ? (c = n - d, d = 0) : -d + n > l && (c = l + d)) : d < 0 ? (c = n + d, 
        d = 0) : d + n > l && (c = l - d), t.isHorizontal() ? (r.style.transform = `translate3d(${d}px, 0, 0)`, 
        r.style.width = `${c}px`) : (r.style.transform = `translate3d(0px, ${d}px, 0)`, 
        r.style.height = `${c}px`), a.hide && (clearTimeout(f), i.style.opacity = 1, f = setTimeout((() => {
          i.style.opacity = 0, i.style.transitionDuration = "400ms";
        }), 1e3));
      }
      function m() {
        if (!t.params.scrollbar.el || !t.scrollbar.el) {
          return;
        }
        const {scrollbar: e} = t, {dragEl: o, el: r} = e;
        o.style.width = "", o.style.height = "", l = t.isHorizontal() ? r.offsetWidth : r.offsetHeight, 
        c = t.size / (t.virtualSize + t.params.slidesOffsetBefore - (t.params.centeredSlides ? t.snapGrid[0] : 0)), 
        n = "auto" === t.params.scrollbar.dragSize ? l * c : parseInt(t.params.scrollbar.dragSize, 10), 
        t.isHorizontal() ? o.style.width = `${n}px` : o.style.height = `${n}px`, r.style.display = c >= 1 ? "none" : "", 
        t.params.scrollbar.hide && (r.style.opacity = 0), t.params.watchOverflow && t.enabled && e.el.classList[t.isLocked ? "add" : "remove"](t.params.scrollbar.lockClass);
      }
      function h(e) {
        return t.isHorizontal() ? e.clientX : e.clientY;
      }
      function g(e) {
        const {scrollbar: o, rtlTranslate: r} = t, {el: i} = o;
        let a;
        a = (h(e) - function(e) {
          const t = Jr(), o = Qr(), r = e.getBoundingClientRect(), i = o.body, a = e.clientTop || i.clientTop || 0, s = e.clientLeft || i.clientLeft || 0, n = e === t ? t.scrollY : e.scrollTop, l = e === t ? t.scrollX : e.scrollLeft;
          return {
            top: r.top + n - a,
            left: r.left + l - s
          };
        }(i)[t.isHorizontal() ? "left" : "top"] - (null !== s ? s : n / 2)) / (l - n), a = Math.max(Math.min(a, 1), 0), 
        r && (a = 1 - a);
        const c = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * a;
        t.updateProgress(c), t.setTranslate(c), t.updateActiveIndex(), t.updateSlidesClasses();
      }
      function y(e) {
        const o = t.params.scrollbar, {scrollbar: r, wrapperEl: a} = t, {el: n, dragEl: l} = r;
        d = !0, s = e.target === l ? h(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, 
        e.preventDefault(), e.stopPropagation(), a.style.transitionDuration = "100ms", l.style.transitionDuration = "100ms", 
        g(e), clearTimeout(u), n.style.transitionDuration = "0ms", o.hide && (n.style.opacity = 1), 
        t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "none"), i("scrollbarDragStart", e);
      }
      function v(e) {
        const {scrollbar: o, wrapperEl: r} = t, {el: a, dragEl: s} = o;
        d && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, g(e), r.style.transitionDuration = "0ms", 
        a.style.transitionDuration = "0ms", s.style.transitionDuration = "0ms", i("scrollbarDragMove", e));
      }
      function z(e) {
        const o = t.params.scrollbar, {scrollbar: r, wrapperEl: a} = t, {el: s} = r;
        d && (d = !1, t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "", a.style.transitionDuration = ""), 
        o.hide && (clearTimeout(u), u = ti((() => {
          s.style.opacity = 0, s.style.transitionDuration = "400ms";
        }), 1e3)), i("scrollbarDragEnd", e), o.snapOnRelease && t.slideToClosest());
      }
      function b(e) {
        const {scrollbar: o, params: r} = t, i = o.el;
        if (!i) {
          return;
        }
        const s = i, n = !!r.passiveListeners && {
          passive: !1,
          capture: !1
        }, l = !!r.passiveListeners && {
          passive: !0,
          capture: !1
        };
        if (!s) {
          return;
        }
        const c = "on" === e ? "addEventListener" : "removeEventListener";
        s[c]("pointerdown", y, n), a[c]("pointermove", v, n), a[c]("pointerup", z, l);
      }
      function _() {
        const {scrollbar: e, el: o} = t;
        t.params.scrollbar = Wi(t, t.originalParams.scrollbar, t.params.scrollbar, {
          el: "swiper-scrollbar"
        });
        const r = t.params.scrollbar;
        if (!r.el) {
          return;
        }
        let i, s;
        if ("string" == typeof r.el && t.isElement && (i = t.el.querySelector(r.el)), i || "string" != typeof r.el) {
          i || (i = r.el);
        } else if (i = a.querySelectorAll(r.el), !i.length) {
          return;
        }
        t.params.uniqueNavElements && "string" == typeof r.el && i.length > 1 && 1 === o.querySelectorAll(r.el).length && (i = o.querySelector(r.el)), 
        i.length > 0 && (i = i[0]), i.classList.add(t.isHorizontal() ? r.horizontalClass : r.verticalClass), 
        i && (s = i.querySelector(Ki(t.params.scrollbar.dragClass)), s || (s = fi("div", t.params.scrollbar.dragClass), 
        i.append(s))), Object.assign(e, {
          el: i,
          dragEl: s
        }), r.draggable && t.params.scrollbar.el && t.scrollbar.el && b("on"), i && i.classList[t.enabled ? "remove" : "add"](...ei(t.params.scrollbar.lockClass));
      }
      function w() {
        const e = t.params.scrollbar, o = t.scrollbar.el;
        o && o.classList.remove(...ei(t.isHorizontal() ? e.horizontalClass : e.verticalClass)), 
        t.params.scrollbar.el && t.scrollbar.el && b("off");
      }
      o({
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
      }, r("changeDirection", (() => {
        if (!t.scrollbar || !t.scrollbar.el) {
          return;
        }
        const e = t.params.scrollbar;
        let {el: o} = t.scrollbar;
        o = gi(o), o.forEach((o => {
          o.classList.remove(e.horizontalClass, e.verticalClass), o.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass);
        }));
      })), r("init", (() => {
        !1 === t.params.scrollbar.enabled ? x() : (_(), m(), p());
      })), r("update resize observerUpdate lock unlock changeDirection", (() => {
        m();
      })), r("setTranslate", (() => {
        p();
      })), r("setTransition", ((e, o) => {
        !function(e) {
          t.params.scrollbar.el && t.scrollbar.el && (t.scrollbar.dragEl.style.transitionDuration = `${e}ms`);
        }(o);
      })), r("enable disable", (() => {
        const {el: e} = t.scrollbar;
        e && e.classList[t.enabled ? "remove" : "add"](...ei(t.params.scrollbar.lockClass));
      })), r("destroy", (() => {
        w();
      }));
      const x = () => {
        t.el.classList.add(...ei(t.params.scrollbar.scrollbarDisabledClass)), t.scrollbar.el && t.scrollbar.el.classList.add(...ei(t.params.scrollbar.scrollbarDisabledClass)), 
        w();
      };
      Object.assign(t.scrollbar, {
        enable: () => {
          t.el.classList.remove(...ei(t.params.scrollbar.scrollbarDisabledClass)), t.scrollbar.el && t.scrollbar.el.classList.remove(...ei(t.params.scrollbar.scrollbarDisabledClass)), 
          _(), m(), p();
        },
        disable: x,
        updateSize: m,
        setTranslate: p,
        init: _,
        destroy: w
      });
    }
    function Ji(e) {
      let t, o, {swiper: r, extendParams: i, on: a, emit: s, params: n} = e;
      r.autoplay = {
        running: !1,
        paused: !1,
        timeLeft: 0
      }, i({
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
      let l, c, d, f, u, p, m, h, g = n && n.autoplay ? n.autoplay.delay : 3e3, y = n && n.autoplay ? n.autoplay.delay : 3e3, v = (new Date).getTime();
      function z(e) {
        r && !r.destroyed && r.wrapperEl && e.target === r.wrapperEl && (r.wrapperEl.removeEventListener("transitionend", z), 
        h || S());
      }
      const b = () => {
        if (r.destroyed || !r.autoplay.running) {
          return;
        }
        r.autoplay.paused ? c = !0 : c && (y = l, c = !1);
        const e = r.autoplay.paused ? l : v + y - (new Date).getTime();
        r.autoplay.timeLeft = e, s("autoplayTimeLeft", e, e / g), o = requestAnimationFrame((() => {
          b();
        }));
      }, _ = e => {
        if (r.destroyed || !r.autoplay.running) {
          return;
        }
        cancelAnimationFrame(o), b();
        let i = void 0 === e ? r.params.autoplay.delay : e;
        g = r.params.autoplay.delay, y = r.params.autoplay.delay;
        const a = (() => {
          let e;
          if (e = r.virtual && r.params.virtual.enabled ? r.slides.filter((e => e.classList.contains("swiper-slide-active")))[0] : r.slides[r.activeIndex], 
          !e) {
            return;
          }
          return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
        })();
        !Number.isNaN(a) && a > 0 && void 0 === e && (i = a, g = a, y = a), l = i;
        const n = r.params.speed, c = () => {
          r && !r.destroyed && (r.params.autoplay.reverseDirection ? !r.isBeginning || r.params.loop || r.params.rewind ? (r.slidePrev(n, !0, !0), 
          s("autoplay")) : r.params.autoplay.stopOnLastSlide || (r.slideTo(r.slides.length - 1, n, !0, !0), 
          s("autoplay")) : !r.isEnd || r.params.loop || r.params.rewind ? (r.slideNext(n, !0, !0), 
          s("autoplay")) : r.params.autoplay.stopOnLastSlide || (r.slideTo(0, n, !0, !0), 
          s("autoplay")), r.params.cssMode && (v = (new Date).getTime(), requestAnimationFrame((() => {
            _();
          }))));
        };
        return i > 0 ? (clearTimeout(t), t = setTimeout((() => {
          c();
        }), i)) : requestAnimationFrame((() => {
          c();
        })), i;
      }, w = () => {
        v = (new Date).getTime(), r.autoplay.running = !0, _(), s("autoplayStart");
      }, x = () => {
        r.autoplay.running = !1, clearTimeout(t), cancelAnimationFrame(o), s("autoplayStop");
      }, T = (e, o) => {
        if (r.destroyed || !r.autoplay.running) {
          return;
        }
        clearTimeout(t), e || (m = !0);
        const i = () => {
          s("autoplayPause"), r.params.autoplay.waitForTransition ? r.wrapperEl.addEventListener("transitionend", z) : S();
        };
        if (r.autoplay.paused = !0, o) {
          return p && (l = r.params.autoplay.delay), p = !1, void i();
        }
        const a = l || r.params.autoplay.delay;
        l = a - ((new Date).getTime() - v), r.isEnd && l < 0 && !r.params.loop || (l < 0 && (l = 0), 
        i());
      }, S = () => {
        r.isEnd && l < 0 && !r.params.loop || r.destroyed || !r.autoplay.running || (v = (new Date).getTime(), 
        m ? (m = !1, _(l)) : _(), r.autoplay.paused = !1, s("autoplayResume"));
      }, E = () => {
        if (r.destroyed || !r.autoplay.running) {
          return;
        }
        const e = Qr();
        "hidden" === e.visibilityState && (m = !0, T(!0)), "visible" === e.visibilityState && S();
      }, C = e => {
        "mouse" === e.pointerType && (m = !0, h = !0, r.animating || r.autoplay.paused || T(!0));
      }, A = e => {
        "mouse" === e.pointerType && (h = !1, r.autoplay.paused && S());
      };
      a("init", (() => {
        r.params.autoplay.enabled && (r.params.autoplay.pauseOnMouseEnter && (r.el.addEventListener("pointerenter", C), 
        r.el.addEventListener("pointerleave", A)), Qr().addEventListener("visibilitychange", E), 
        w());
      })), a("destroy", (() => {
        r.el.removeEventListener("pointerenter", C), r.el.removeEventListener("pointerleave", A), 
        Qr().removeEventListener("visibilitychange", E), r.autoplay.running && x();
      })), a("_freeModeStaticRelease", (() => {
        (f || m) && S();
      })), a("_freeModeNoMomentumRelease", (() => {
        r.params.autoplay.disableOnInteraction ? x() : T(!0, !0);
      })), a("beforeTransitionStart", ((e, t, o) => {
        !r.destroyed && r.autoplay.running && (o || !r.params.autoplay.disableOnInteraction ? T(!0, !0) : x());
      })), a("sliderFirstMove", (() => {
        !r.destroyed && r.autoplay.running && (r.params.autoplay.disableOnInteraction ? x() : (d = !0, 
        f = !1, m = !1, u = setTimeout((() => {
          m = !0, f = !0, T(!0);
        }), 200)));
      })), a("touchEnd", (() => {
        if (!r.destroyed && r.autoplay.running && d) {
          if (clearTimeout(u), clearTimeout(t), r.params.autoplay.disableOnInteraction) {
            return f = !1, void (d = !1);
          }
          f && r.params.cssMode && S(), f = !1, d = !1;
        }
      })), a("slideChange", (() => {
        !r.destroyed && r.autoplay.running && (p = !0);
      })), Object.assign(r.autoplay, {
        start: w,
        stop: x,
        pause: T,
        resume: S
      });
    }
    function ea(e, t) {
      const o = li(t);
      return o !== t && (o.style.backfaceVisibility = "hidden", o.style["-webkit-backface-visibility"] = "hidden"), 
      o;
    }
    function ta(e) {
      let {swiper: t, duration: o, transformElements: r, allSlides: i} = e;
      const {activeIndex: a} = t;
      if (t.params.virtualTranslate && 0 !== o) {
        let e, o = !1;
        e = i ? r : r.filter((e => {
          const o = e.classList.contains("swiper-slide-transform") ? (e => {
            if (!e.parentElement) {
              return t.slides.filter((t => t.shadowRoot && t.shadowRoot === e.parentNode))[0];
            }
            return e.parentElement;
          })(e) : e;
          return t.getSlideIndex(o) === a;
        })), e.forEach((e => {
          !function(e, t) {
            t && e.addEventListener("transitionend", (function o(r) {
              r.target === e && (t.call(e, r), e.removeEventListener("transitionend", o));
            }));
          }(e, (() => {
            if (o) {
              return;
            }
            if (!t || t.destroyed) {
              return;
            }
            o = !0, t.animating = !1;
            const e = new window.CustomEvent("transitionend", {
              bubbles: !0,
              cancelable: !0
            });
            t.wrapperEl.dispatchEvent(e);
          }));
        }));
      }
    }
    function oa(e) {
      let {swiper: t, extendParams: o, on: r} = e;
      o({
        fadeEffect: {
          crossFade: !1
        }
      });
      !function(e) {
        const {effect: t, swiper: o, on: r, setTranslate: i, setTransition: a, overwriteParams: s, perspective: n, recreateShadows: l, getEffectParams: c} = e;
        let d;
        r("beforeInit", (() => {
          if (o.params.effect !== t) {
            return;
          }
          o.classNames.push(`${o.params.containerModifierClass}${t}`), n && n() && o.classNames.push(`${o.params.containerModifierClass}3d`);
          const e = s ? s() : {};
          Object.assign(o.params, e), Object.assign(o.originalParams, e);
        })), r("setTranslate", (() => {
          o.params.effect === t && i();
        })), r("setTransition", ((e, r) => {
          o.params.effect === t && a(r);
        })), r("transitionEnd", (() => {
          if (o.params.effect === t && l) {
            if (!c || !c().slideShadows) {
              return;
            }
            o.slides.forEach((e => {
              e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e => e.remove()));
            })), l();
          }
        })), r("virtualUpdate", (() => {
          o.params.effect === t && (o.slides.length || (d = !0), requestAnimationFrame((() => {
            d && o.slides && o.slides.length && (i(), d = !1);
          })));
        }));
      }({
        effect: "fade",
        swiper: t,
        on: r,
        setTranslate: () => {
          const {slides: e} = t;
          t.params.fadeEffect;
          for (let o = 0; o < e.length; o += 1) {
            const e = t.slides[o];
            let r = -e.swiperSlideOffset;
            t.params.virtualTranslate || (r -= t.translate);
            let i = 0;
            t.isHorizontal() || (i = r, r = 0);
            const a = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(e.progress), 0) : 1 + Math.min(Math.max(e.progress, -1), 0), s = ea(0, e);
            s.style.opacity = a, s.style.transform = `translate3d(${r}px, ${i}px, 0px)`;
          }
        },
        setTransition: e => {
          const o = t.slides.map((e => li(e)));
          o.forEach((t => {
            t.style.transitionDuration = `${e}ms`;
          })), ta({
            swiper: t,
            duration: e,
            transformElements: o,
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
    }
    Object.keys(Hi).forEach((e => {
      Object.keys(Hi[e]).forEach((t => {
        ji.prototype[t] = Hi[e][t];
      }));
    })), ji.use([ function(e) {
      let {swiper: t, on: o, emit: r} = e;
      const i = Jr();
      let a = null, s = null;
      const n = () => {
        t && !t.destroyed && t.initialized && (r("beforeResize"), r("resize"));
      }, l = () => {
        t && !t.destroyed && t.initialized && r("orientationchange");
      };
      o("init", (() => {
        t.params.resizeObserver && void 0 !== i.ResizeObserver ? t && !t.destroyed && t.initialized && (a = new ResizeObserver((e => {
          s = i.requestAnimationFrame((() => {
            const {width: o, height: r} = t;
            let i = o, a = r;
            e.forEach((e => {
              let {contentBoxSize: o, contentRect: r, target: s} = e;
              s && s !== t.el || (i = r ? r.width : (o[0] || o).inlineSize, a = r ? r.height : (o[0] || o).blockSize);
            })), i === o && a === r || n();
          }));
        })), a.observe(t.el)) : (i.addEventListener("resize", n), i.addEventListener("orientationchange", l));
      })), o("destroy", (() => {
        s && i.cancelAnimationFrame(s), a && a.unobserve && t.el && (a.unobserve(t.el), 
        a = null), i.removeEventListener("resize", n), i.removeEventListener("orientationchange", l);
      }));
    }, function(e) {
      let {swiper: t, extendParams: o, on: r, emit: i} = e;
      const a = [], s = Jr(), n = function(e, o) {
        void 0 === o && (o = {});
        const r = new (s.MutationObserver || s.WebkitMutationObserver)((e => {
          if (t.__preventObserver__) {
            return;
          }
          if (1 === e.length) {
            return void i("observerUpdate", e[0]);
          }
          const o = function() {
            i("observerUpdate", e[0]);
          };
          s.requestAnimationFrame ? s.requestAnimationFrame(o) : s.setTimeout(o, 0);
        }));
        r.observe(e, {
          attributes: void 0 === o.attributes || o.attributes,
          childList: void 0 === o.childList || o.childList,
          characterData: void 0 === o.characterData || o.characterData
        }), a.push(r);
      };
      o({
        observer: !1,
        observeParents: !1,
        observeSlideChildren: !1
      }), r("init", (() => {
        if (t.params.observer) {
          if (t.params.observeParents) {
            const e = mi(t.hostEl);
            for (let t = 0; t < e.length; t += 1) {
              n(e[t]);
            }
          }
          n(t.hostEl, {
            childList: t.params.observeSlideChildren
          }), n(t.wrapperEl, {
            attributes: !1
          });
        }
      })), r("destroy", (() => {
        a.forEach((e => {
          e.disconnect();
        })), a.splice(0, a.length);
      }));
    } ]);
    let ra = {};
    const ia = window.innerWidth, aa = new ji(".tabs-block__slider", {
      modules: [ Ui, Zi ],
      speed: 500,
      slidesPerView: "auto",
      loop: !0,
      spaceBetween: 5,
      allowTouchMove: !1,
      scrollbar: {
        el: ".tabs-slider__scrollbar",
        draggable: !0
      },
      navigation: {
        nextEl: ".tabs-block__btn--next",
        prevEl: ".tabs-block__btn--prev"
      },
      on: {
        afterInit: e => {
          if (ia < 769) {
            return;
          }
          const t = e.slides[e.realIndex];
          t && Xr.timeline().to(t, {
            width: "43.4%",
            duration: .5
          }).to(t.querySelector(".dubrovka-slide__figure"), {
            height: "100%",
            duration: .5
          }, "<").to(t.querySelector(".dubrovka-slide__text"), {
            autoAlpha: 1,
            duration: .1
          });
        },
        slideChangeTransitionStart: e => {
          if (((e, t) => {
            const o = Array.from(ra[`${e}`]);
            Array.from(ra[`${e}-tabs`]).forEach((e => {
              e.classList.add("hidden");
            })), o.forEach((e => {
              e.classList.remove("selected");
            }));
            const r = t.slides.filter((e => e.classList.contains("swiper-slide-active")))[0];
            o.filter((e => e.dataset.tabContentId === r.dataset.slide)).forEach((e => {
              e.classList.add("selected");
            })), ca.querySelector(`#${r.dataset.slide}`).classList.remove("hidden");
          })("dubrovka", e), ia < 769) {
            return;
          }
          e.navigation.disable();
          const t = e.slides[e.previousIndex], o = e.slides.filter((e => e.classList.contains("swiper-slide-active")))[0];
          o && t && (e.slides.forEach((e => {
            Xr.set(e.querySelector(".dubrovka-slide__text"), {
              autoAlpha: 0
            }), Xr.set(e.querySelector(".dubrovka-slide__figure"), {
              height: "64%"
            }), Xr.set(e, {
              width: "35.4%"
            });
          })), Xr.timeline().fromTo(t.querySelector(".dubrovka-slide__text"), {
            autoAlpha: 1
          }, {
            autoAlpha: 0,
            duration: .01
          }).to(o, {
            width: "43.4%",
            duration: 1
          }, "<").to(o.querySelector(".dubrovka-slide__figure"), {
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
          }, "<").to(o.querySelector(".dubrovka-slide__text"), {
            autoAlpha: 1,
            duration: .1
          }).then((() => {
            e.navigation.enable();
          })));
        },
        click: (e, t) => ((e, t) => {
          const o = t.target.dataset.swiperSlideIndex;
          e.slideToLoop(o, 1e3);
        })(e, t)
      },
      breakpoints: {
        320: {
          allowTouchMove: !0,
          speed: 300,
          slidesPerView: "auto"
        },
        769: {
          speed: 500,
          allowTouchMove: !1,
          slidesPerView: "auto"
        }
      }
    });
    Xr.registerPlugin(jr.ScrollToPlugin);
    const sa = async (e, t) => {
      la(na(e), t), ma();
    }, na = e => e.protocol === window.location.protocol && e.host === window.location.host && e.pathname === window.location.pathname && e.search === window.location.search && e.hash;
    function la(e, t) {
      const o = !!e && document.querySelector(e);
      o && (t && t.preventDefault(), Xr.to(window, {
        scrollTo: o,
        duration: .5
      }));
    }
    la(window.location.hash);
    const ca = document.querySelector("body"), da = ca.querySelector(".header"), fa = da.querySelector(".header-left__btn"), ua = Array.from(ca.querySelectorAll(".js-anchor")), pa = Xr.timeline({
      paused: !0
    }).fromTo(da.querySelector(".menu"), {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      duration: .3
    }).fromTo(da.querySelector(".menu__figure"), {
      x: 50,
      autoAlpha: 0
    }, {
      x: 0,
      autoAlpha: 1,
      duration: .3
    }, "<").fromTo(da.querySelector(".menu-contetnt__wrap"), {
      y: -30,
      autoAlpha: 0
    }, {
      y: 0,
      autoAlpha: 1,
      duration: .3
    }, "<"), ma = async () => {
      fa.classList.remove("menu-icon--active"), ca.classList.remove("scroll-lock"), await pa.reverse(), 
      da.classList.remove("header--menu-active"), ua.forEach((e => {
        e.removeEventListener("click", sa);
      }));
    }, ha = () => {
      0 === pa.progress() ? (async () => {
        fa.classList.add("menu-icon--active"), da.classList.add("header--menu-active"), 
        ca.classList.add("scroll-lock"), await pa.play(), ua.forEach((e => {
          e.addEventListener("click", (t => sa(e, t)));
        }));
      })() : ma();
    };
    let ga, ya = window.scrollY;
    const va = ca.querySelector(".header--hide"), za = () => {
      if (!va) {
        return;
      }
      const e = window.scrollY, t = e > ya ? "down" : "up";
      "" !== t && (e - ya > 10 || e - ya < -10) && (clearTimeout(ga), "down" === t && (va.classList.contains("header--down") || e > 50 && (ga = setTimeout((() => {
        va.className = "", va.classList.add("header"), va.classList.add(`header--${t}`);
      }), 800))), "up" === t && (ga && (clearTimeout(ga), ga = 0), va.className = "", 
      va.classList.add("header"), e > 50 && va.classList.add(`header--${t}`))), ya = e > 0 ? e : 0;
    };
    let ba;
    const _a = new ji(".promo__swiper", {
      enabled: !1,
      init: !1,
      modules: [ Qi, Ji, oa ],
      effect: "fade",
      fadeEffect: {
        crossFade: !0
      },
      loop: !0,
      pagination: {
        el: ".promo-swiper__pagination",
        bulletClass: "pagination-bar__bullet",
        bulletActiveClass: "pagination-bar__bullet--active",
        clickable: !0
      },
      speed: 500,
      on: {
        init: e => (e => {
          const t = e.pagination.bullets;
          ba = t.map(((o, r) => Xr.timeline({
            paused: !0
          }).set(t[r], {
            width: ia < 769 ? "0.63rem" : "1rem",
            marginRight: 0
          }).to(t[r], {
            marginRight: ia < 769 ? "1.87rem" : "4.6rem",
            duration: .01
          }).add("clear", "<").set(e.pagination.el, {
            autoAlpha: 1
          }).to(t[r], {
            width: ia < 769 ? "2.5rem" : "5.6rem",
            marginRight: 0,
            duration: 3
          }).add("ready", "<"))), requestAnimationFrame((() => {
            ba[e.realIndex].play();
          }));
        })(e),
        realIndexChange: e => (e => {
          ba.forEach((e => {
            e.pause("clear");
          })), ba[e.realIndex].pause("ready");
        })(e),
        slideChangeTransitionEnd: e => (e => {
          ba[e.realIndex].play("ready");
        })(e)
      }
    }), wa = new ji(".circle__slider", {
      enabled: !1,
      modules: [ Ui, Qi, Zi ],
      loop: !0,
      speed: 1e3,
      centeredSlides: !0,
      slidesPerView: "auto",
      navigation: {
        nextEl: ".circle-control__block--right",
        prevEl: ".circle-control__block--left"
      },
      scrollbar: {
        enabled: !1,
        el: ".circle-slider__scrollbar"
      },
      breakpoints: {
        320: {
          scrollbar: {
            enabled: !0,
            el: ".circle-slider__scrollbar"
          },
          allowTouchMove: !0,
          speed: 300,
          slidesPerView: "auto"
        },
        769: {
          allowTouchMove: !1,
          speed: 1e3,
          slidesPerView: "auto",
          scrollbar: {
            enabled: !1,
            el: ".circle-slider__scrollbar"
          }
        }
      }
    }), xa = ca.querySelector(".page-main"), Ta = e => {
      e.preventDefault(), xa.scrollIntoView({
        behavior: "smooth"
      });
    };
    let Sa = Xr.timeline({
      paused: !0
    });
    function Ea(e, t) {
      for (var o = 0; o < t.length; o++) {
        var r = t[o];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
        Object.defineProperty(e, r.key, r);
      }
    }
    requestAnimationFrame((() => {
      const e = ca.querySelector(".promo-slide--0");
      if (!e) {
        return;
      }
      const t = ca.querySelector(".header__line"), o = Array.from(ca.querySelectorAll(".header__line-middle")), r = Array.from(ca.querySelectorAll(".js-header")), i = Array.from(e.querySelectorAll(".promo-title--0 .promo-title__text")), a = e.querySelector(".promo-slide__block"), s = e.querySelector(".promo-slide__label");
      Sa.fromTo(t, {
        width: "0%"
      }, {
        width: "100%",
        duration: ia > 768 ? 2 : 1
      }).fromTo(o, {
        height: 0
      }, {
        height: "100%",
        duration: 1
      }, "<50%").fromTo(r, {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        duration: 1
      }, "<").fromTo(i, {
        backgroundPositionY: "200%"
      }, {
        backgroundPositionY: "100%",
        duration: 1
      }, "<").fromTo(a, {
        autoAlpha: 0,
        y: "50%"
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 1
      }, "<").fromTo(s, {
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
    var Ca, Aa, ka, Ma, Pa, La, Oa, Ia, Da, qa, Fa, Ra, Ba, Na = function() {
      return Ca || "undefined" != typeof window && (Ca = window.gsap) && Ca.registerPlugin && Ca;
    }, Ga = 1, Ya = [], $a = [], Va = [], Ha = Date.now, Xa = function(e, t) {
      return t;
    }, ja = function(e, t) {
      return ~Va.indexOf(e) && Va[Va.indexOf(e) + 1][t];
    }, Wa = function(e) {
      return !!~qa.indexOf(e);
    }, Ua = function(e, t, o, r, i) {
      return e.addEventListener(t, o, {
        passive: !1 !== r,
        capture: !!i
      });
    }, Ka = function(e, t, o, r) {
      return e.removeEventListener(t, o, !!r);
    }, Qa = "scrollLeft", Za = "scrollTop", Ja = function() {
      return Fa && Fa.isPressed || $a.cache++;
    }, es = function(e, t) {
      var o = function o(r) {
        if (r || 0 === r) {
          Ga && (ka.history.scrollRestoration = "manual");
          var i = Fa && Fa.isPressed;
          r = o.v = Math.round(r) || (Fa && Fa.iOS ? 1 : 0), e(r), o.cacheID = $a.cache, i && Xa("ss", r);
        } else {
          (t || $a.cache !== o.cacheID || Xa("ref")) && (o.cacheID = $a.cache, o.v = e());
        }
        return o.v + o.offset;
      };
      return o.offset = 0, e && o;
    }, ts = {
      s: Qa,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: es((function(e) {
        return arguments.length ? ka.scrollTo(e, os.sc()) : ka.pageXOffset || Ma[Qa] || Pa[Qa] || La[Qa] || 0;
      }))
    }, os = {
      s: Za,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: ts,
      sc: es((function(e) {
        return arguments.length ? ka.scrollTo(ts.sc(), e) : ka.pageYOffset || Ma[Za] || Pa[Za] || La[Za] || 0;
      }))
    }, rs = function(e, t) {
      return (t && t._ctx && t._ctx.selector || Ca.utils.toArray)(e)[0] || ("string" == typeof e && !1 !== Ca.config().nullTargetWarn ? console.warn("Element not found:", e) : null);
    }, is = function(e, t) {
      var o = t.s, r = t.sc;
      Wa(e) && (e = Ma.scrollingElement || Pa);
      var i = $a.indexOf(e), a = r === os.sc ? 1 : 2;
      !~i && (i = $a.push(e) - 1), $a[i + a] || Ua(e, "scroll", Ja);
      var s = $a[i + a], n = s || ($a[i + a] = es(ja(e, o), !0) || (Wa(e) ? r : es((function(t) {
        return arguments.length ? e[o] = t : e[o];
      }))));
      return n.target = e, s || (n.smooth = "smooth" === Ca.getProperty(e, "scrollBehavior")), 
      n;
    }, as = function(e, t, o) {
      var r = e, i = e, a = Ha(), s = a, n = t || 50, l = Math.max(500, 3 * n), c = function(e, t) {
        var l = Ha();
        t || l - a > n ? (i = r, r = e, s = a, a = l) : o ? r += e : r = i + (e - i) / (l - s) * (a - s);
      };
      return {
        update: c,
        reset: function() {
          i = r = o ? 0 : r, s = a = 0;
        },
        getVelocity: function(e) {
          var t = s, n = i, d = Ha();
          return (e || 0 === e) && e !== r && c(e), a === s || d - s > l ? 0 : (r + (o ? n : -n)) / ((o ? d : a) - t) * 1e3;
        }
      };
    }, ss = function(e, t) {
      return t && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
    }, ns = function(e) {
      var t = Math.max.apply(Math, e), o = Math.min.apply(Math, e);
      return Math.abs(t) >= Math.abs(o) ? t : o;
    }, ls = function() {
      var e, t, o, r;
      (Da = Ca.core.globals().ScrollTrigger) && Da.core && (e = Da.core, t = e.bridge || {}, 
      o = e._scrollers, r = e._proxies, o.push.apply(o, $a), r.push.apply(r, Va), $a = o, 
      Va = r, Xa = function(e, o) {
        return t[e](o);
      });
    }, cs = function(e) {
      return Ca = e || Na(), !Aa && Ca && "undefined" != typeof document && document.body && (ka = window, 
      Ma = document, Pa = Ma.documentElement, La = Ma.body, qa = [ ka, Ma, Pa, La ], Ca.utils.clamp, 
      Ba = Ca.core.context || function() {}, Ia = "onpointerenter" in La ? "pointer" : "mouse", 
      Oa = ds.isTouch = ka.matchMedia && ka.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in ka || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, 
      Ra = ds.eventTypes = ("ontouchstart" in Pa ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Pa ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), 
      setTimeout((function() {
        return Ga = 0;
      }), 500), ls(), Aa = 1), Aa;
    };
    ts.op = os, $a.cache = 0;
    var ds = function() {
      function e(e) {
        this.init(e);
      }
      var t, o, r;
      return e.prototype.init = function(e) {
        Aa || cs(Ca) || console.warn("Please gsap.registerPlugin(Observer)"), Da || ls();
        var t = e.tolerance, o = e.dragMinimum, r = e.type, i = e.target, a = e.lineHeight, s = e.debounce, n = e.preventDefault, l = e.onStop, c = e.onStopDelay, d = e.ignore, f = e.wheelSpeed, u = e.event, p = e.onDragStart, m = e.onDragEnd, h = e.onDrag, g = e.onPress, y = e.onRelease, v = e.onRight, z = e.onLeft, b = e.onUp, _ = e.onDown, w = e.onChangeX, x = e.onChangeY, T = e.onChange, S = e.onToggleX, E = e.onToggleY, C = e.onHover, A = e.onHoverEnd, k = e.onMove, M = e.ignoreCheck, P = e.isNormalizer, L = e.onGestureStart, O = e.onGestureEnd, I = e.onWheel, D = e.onEnable, q = e.onDisable, F = e.onClick, R = e.scrollSpeed, B = e.capture, N = e.allowClicks, G = e.lockAxis, Y = e.onLockAxis;
        this.target = i = rs(i) || Pa, this.vars = e, d && (d = Ca.utils.toArray(d)), t = t || 1e-9, 
        o = o || 0, f = f || 1, R = R || 1, r = r || "wheel,touch,pointer", s = !1 !== s, 
        a || (a = parseFloat(ka.getComputedStyle(La).lineHeight) || 22);
        var $, V, H, X, j, W, U, K = this, Q = 0, Z = 0, J = e.passive || !n, ee = is(i, ts), te = is(i, os), oe = ee(), re = te(), ie = ~r.indexOf("touch") && !~r.indexOf("pointer") && "pointerdown" === Ra[0], ae = Wa(i), se = i.ownerDocument || Ma, ne = [ 0, 0, 0 ], le = [ 0, 0, 0 ], ce = 0, de = function() {
          return ce = Ha();
        }, fe = function(e, t) {
          return (K.event = e) && d && ~d.indexOf(e.target) || t && ie && "touch" !== e.pointerType || M && M(e, t);
        }, ue = function() {
          var e = K.deltaX = ns(ne), o = K.deltaY = ns(le), r = Math.abs(e) >= t, i = Math.abs(o) >= t;
          T && (r || i) && T(K, e, o, ne, le), r && (v && K.deltaX > 0 && v(K), z && K.deltaX < 0 && z(K), 
          w && w(K), S && K.deltaX < 0 != Q < 0 && S(K), Q = K.deltaX, ne[0] = ne[1] = ne[2] = 0), 
          i && (_ && K.deltaY > 0 && _(K), b && K.deltaY < 0 && b(K), x && x(K), E && K.deltaY < 0 != Z < 0 && E(K), 
          Z = K.deltaY, le[0] = le[1] = le[2] = 0), (X || H) && (k && k(K), H && (h(K), H = !1), 
          X = !1), W && !(W = !1) && Y && Y(K), j && (I(K), j = !1), $ = 0;
        }, pe = function(e, t, o) {
          ne[o] += e, le[o] += t, K._vx.update(e), K._vy.update(t), s ? $ || ($ = requestAnimationFrame(ue)) : ue();
        }, me = function(e, t) {
          G && !U && (K.axis = U = Math.abs(e) > Math.abs(t) ? "x" : "y", W = !0), "y" !== U && (ne[2] += e, 
          K._vx.update(e, !0)), "x" !== U && (le[2] += t, K._vy.update(t, !0)), s ? $ || ($ = requestAnimationFrame(ue)) : ue();
        }, he = function(e) {
          if (!fe(e, 1)) {
            var t = (e = ss(e, n)).clientX, r = e.clientY, i = t - K.x, a = r - K.y, s = K.isDragging;
            K.x = t, K.y = r, (s || Math.abs(K.startX - t) >= o || Math.abs(K.startY - r) >= o) && (h && (H = !0), 
            s || (K.isDragging = !0), me(i, a), s || p && p(K));
          }
        }, ge = K.onPress = function(e) {
          fe(e, 1) || e && e.button || (K.axis = U = null, V.pause(), K.isPressed = !0, e = ss(e), 
          Q = Z = 0, K.startX = K.x = e.clientX, K.startY = K.y = e.clientY, K._vx.reset(), 
          K._vy.reset(), Ua(P ? i : se, Ra[1], he, J, !0), K.deltaX = K.deltaY = 0, g && g(K));
        }, ye = K.onRelease = function(e) {
          if (!fe(e, 1)) {
            Ka(P ? i : se, Ra[1], he, !0);
            var t = !isNaN(K.y - K.startY), o = K.isDragging, r = o && (Math.abs(K.x - K.startX) > 3 || Math.abs(K.y - K.startY) > 3), a = ss(e);
            !r && t && (K._vx.reset(), K._vy.reset(), n && N && Ca.delayedCall(.08, (function() {
              if (Ha() - ce > 300 && !e.defaultPrevented) {
                if (e.target.click) {
                  e.target.click();
                } else if (se.createEvent) {
                  var t = se.createEvent("MouseEvents");
                  t.initMouseEvent("click", !0, !0, ka, 1, a.screenX, a.screenY, a.clientX, a.clientY, !1, !1, !1, !1, 0, null), 
                  e.target.dispatchEvent(t);
                }
              }
            }))), K.isDragging = K.isGesturing = K.isPressed = !1, l && o && !P && V.restart(!0), 
            m && o && m(K), y && y(K, r);
          }
        }, ve = function(e) {
          return e.touches && e.touches.length > 1 && (K.isGesturing = !0) && L(e, K.isDragging);
        }, ze = function() {
          return (K.isGesturing = !1) || O(K);
        }, be = function(e) {
          if (!fe(e)) {
            var t = ee(), o = te();
            pe((t - oe) * R, (o - re) * R, 1), oe = t, re = o, l && V.restart(!0);
          }
        }, _e = function(e) {
          if (!fe(e)) {
            e = ss(e, n), I && (j = !0);
            var t = (1 === e.deltaMode ? a : 2 === e.deltaMode ? ka.innerHeight : 1) * f;
            pe(e.deltaX * t, e.deltaY * t, 0), l && !P && V.restart(!0);
          }
        }, we = function(e) {
          if (!fe(e)) {
            var t = e.clientX, o = e.clientY, r = t - K.x, i = o - K.y;
            K.x = t, K.y = o, X = !0, l && V.restart(!0), (r || i) && me(r, i);
          }
        }, xe = function(e) {
          K.event = e, C(K);
        }, Te = function(e) {
          K.event = e, A(K);
        }, Se = function(e) {
          return fe(e) || ss(e, n) && F(K);
        };
        V = K._dc = Ca.delayedCall(c || .25, (function() {
          K._vx.reset(), K._vy.reset(), V.pause(), l && l(K);
        })).pause(), K.deltaX = K.deltaY = 0, K._vx = as(0, 50, !0), K._vy = as(0, 50, !0), 
        K.scrollX = ee, K.scrollY = te, K.isDragging = K.isGesturing = K.isPressed = !1, 
        Ba(this), K.enable = function(e) {
          return K.isEnabled || (Ua(ae ? se : i, "scroll", Ja), r.indexOf("scroll") >= 0 && Ua(ae ? se : i, "scroll", be, J, B), 
          r.indexOf("wheel") >= 0 && Ua(i, "wheel", _e, J, B), (r.indexOf("touch") >= 0 && Oa || r.indexOf("pointer") >= 0) && (Ua(i, Ra[0], ge, J, B), 
          Ua(se, Ra[2], ye), Ua(se, Ra[3], ye), N && Ua(i, "click", de, !0, !0), F && Ua(i, "click", Se), 
          L && Ua(se, "gesturestart", ve), O && Ua(se, "gestureend", ze), C && Ua(i, Ia + "enter", xe), 
          A && Ua(i, Ia + "leave", Te), k && Ua(i, Ia + "move", we)), K.isEnabled = !0, e && e.type && ge(e), 
          D && D(K)), K;
        }, K.disable = function() {
          K.isEnabled && (Ya.filter((function(e) {
            return e !== K && Wa(e.target);
          })).length || Ka(ae ? se : i, "scroll", Ja), K.isPressed && (K._vx.reset(), K._vy.reset(), 
          Ka(P ? i : se, Ra[1], he, !0)), Ka(ae ? se : i, "scroll", be, B), Ka(i, "wheel", _e, B), 
          Ka(i, Ra[0], ge, B), Ka(se, Ra[2], ye), Ka(se, Ra[3], ye), Ka(i, "click", de, !0), 
          Ka(i, "click", Se), Ka(se, "gesturestart", ve), Ka(se, "gestureend", ze), Ka(i, Ia + "enter", xe), 
          Ka(i, Ia + "leave", Te), Ka(i, Ia + "move", we), K.isEnabled = K.isPressed = K.isDragging = !1, 
          q && q(K));
        }, K.kill = K.revert = function() {
          K.disable();
          var e = Ya.indexOf(K);
          e >= 0 && Ya.splice(e, 1), Fa === K && (Fa = 0);
        }, Ya.push(K), P && Wa(i) && (Fa = K), K.enable(u);
      }, t = e, (o = [ {
        key: "velocityX",
        get: function() {
          return this._vx.getVelocity();
        }
      }, {
        key: "velocityY",
        get: function() {
          return this._vy.getVelocity();
        }
      } ]) && Ea(t.prototype, o), r && Ea(t, r), e;
    }();
    ds.version = "3.12.5", ds.create = function(e) {
      return new ds(e);
    }, ds.register = cs, ds.getAll = function() {
      return Ya.slice();
    }, ds.getById = function(e) {
      return Ya.filter((function(t) {
        return t.vars.id === e;
      }))[0];
    }, Na() && Ca.registerPlugin(ds);
    /*!
 * ScrollTrigger 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
    var fs, us, ps, ms, hs, gs, ys, vs, zs, bs, _s, ws, xs, Ts, Ss, Es, Cs, As, ks, Ms, Ps, Ls, Os, Is, Ds, qs, Fs, Rs, Bs, Ns, Gs, Ys, $s, Vs, Hs, Xs, js, Ws, Us = 1, Ks = Date.now, Qs = Ks(), Zs = 0, Js = 0, en = function(e, t, o) {
      var r = hn(e) && ("clamp(" === e.substr(0, 6) || e.indexOf("max") > -1);
      return o["_" + t + "Clamp"] = r, r ? e.substr(6, e.length - 7) : e;
    }, tn = function(e, t) {
      return !t || hn(e) && "clamp(" === e.substr(0, 6) ? e : "clamp(" + e + ")";
    }, on = function e() {
      return Js && requestAnimationFrame(e);
    }, rn = function() {
      return Ts = 1;
    }, an = function() {
      return Ts = 0;
    }, sn = function(e) {
      return e;
    }, nn = function(e) {
      return Math.round(1e5 * e) / 1e5 || 0;
    }, ln = function() {
      return "undefined" != typeof window;
    }, cn = function() {
      return fs || ln() && (fs = window.gsap) && fs.registerPlugin && fs;
    }, dn = function(e) {
      return !!~ys.indexOf(e);
    }, fn = function(e) {
      return ("Height" === e ? Gs : ps["inner" + e]) || hs["client" + e] || gs["client" + e];
    }, un = function(e) {
      return ja(e, "getBoundingClientRect") || (dn(e) ? function() {
        return Sl.width = ps.innerWidth, Sl.height = Gs, Sl;
      } : function() {
        return Rn(e);
      });
    }, pn = function(e, t) {
      var o = t.s, r = t.d2, i = t.d, a = t.a;
      return Math.max(0, (o = "scroll" + r) && (a = ja(e, o)) ? a() - un(e)()[i] : dn(e) ? (hs[o] || gs[o]) - fn(r) : e[o] - e["offset" + r]);
    }, mn = function(e, t) {
      for (var o = 0; o < ks.length; o += 3) {
        (!t || ~t.indexOf(ks[o + 1])) && e(ks[o], ks[o + 1], ks[o + 2]);
      }
    }, hn = function(e) {
      return "string" == typeof e;
    }, gn = function(e) {
      return "function" == typeof e;
    }, yn = function(e) {
      return "number" == typeof e;
    }, vn = function(e) {
      return "object" == typeof e;
    }, zn = function(e, t, o) {
      return e && e.progress(t ? 0 : 1) && o && e.pause();
    }, bn = function(e, t) {
      if (e.enabled) {
        var o = e._ctx ? e._ctx.add((function() {
          return t(e);
        })) : t(e);
        o && o.totalTime && (e.callbackAnimation = o);
      }
    }, _n = Math.abs, wn = "left", xn = "right", Tn = "bottom", Sn = "width", En = "height", Cn = "Right", An = "Left", kn = "Top", Mn = "Bottom", Pn = "padding", Ln = "margin", On = "Width", In = "Height", Dn = "px", qn = function(e) {
      return ps.getComputedStyle(e);
    }, Fn = function(e, t) {
      for (var o in t) {
        o in e || (e[o] = t[o]);
      }
      return e;
    }, Rn = function(e, t) {
      var o = t && "matrix(1, 0, 0, 1, 0, 0)" !== qn(e)[Ss] && fs.to(e, {
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
      }).progress(1), r = e.getBoundingClientRect();
      return o && o.progress(0).kill(), r;
    }, Bn = function(e, t) {
      var o = t.d2;
      return e["offset" + o] || e["client" + o] || 0;
    }, Nn = function(e) {
      var t, o = [], r = e.labels, i = e.duration();
      for (t in r) {
        o.push(r[t] / i);
      }
      return o;
    }, Gn = function(e) {
      var t = fs.utils.snap(e), o = Array.isArray(e) && e.slice(0).sort((function(e, t) {
        return e - t;
      }));
      return o ? function(e, r, i) {
        var a;
        if (void 0 === i && (i = .001), !r) {
          return t(e);
        }
        if (r > 0) {
          for (e -= i, a = 0; a < o.length; a++) {
            if (o[a] >= e) {
              return o[a];
            }
          }
          return o[a - 1];
        }
        for (a = o.length, e += i; a--; ) {
          if (o[a] <= e) {
            return o[a];
          }
        }
        return o[0];
      } : function(o, r, i) {
        void 0 === i && (i = .001);
        var a = t(o);
        return !r || Math.abs(a - o) < i || a - o < 0 == r < 0 ? a : t(r < 0 ? o - e : o + e);
      };
    }, Yn = function(e, t, o, r) {
      return o.split(",").forEach((function(o) {
        return e(t, o, r);
      }));
    }, $n = function(e, t, o, r, i) {
      return e.addEventListener(t, o, {
        passive: !r,
        capture: !!i
      });
    }, Vn = function(e, t, o, r) {
      return e.removeEventListener(t, o, !!r);
    }, Hn = function(e, t, o) {
      (o = o && o.wheelHandler) && (e(t, "wheel", o), e(t, "touchmove", o));
    }, Xn = {
      startColor: "green",
      endColor: "red",
      indent: 0,
      fontSize: "16px",
      fontWeight: "normal"
    }, jn = {
      toggleActions: "play",
      anticipatePin: 0
    }, Wn = {
      top: 0,
      left: 0,
      center: .5,
      bottom: 1,
      right: 1
    }, Un = function(e, t) {
      if (hn(e)) {
        var o = e.indexOf("="), r = ~o ? +(e.charAt(o - 1) + 1) * parseFloat(e.substr(o + 1)) : 0;
        ~o && (e.indexOf("%") > o && (r *= t / 100), e = e.substr(0, o - 1)), e = r + (e in Wn ? Wn[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0);
      }
      return e;
    }, Kn = function(e, t, o, r, i, a, s, n) {
      var l = i.startColor, c = i.endColor, d = i.fontSize, f = i.indent, u = i.fontWeight, p = ms.createElement("div"), m = dn(o) || "fixed" === ja(o, "pinType"), h = -1 !== e.indexOf("scroller"), g = m ? gs : o, y = -1 !== e.indexOf("start"), v = y ? l : c, z = "border-color:" + v + ";font-size:" + d + ";color:" + v + ";font-weight:" + u + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
      return z += "position:" + ((h || n) && m ? "fixed;" : "absolute;"), (h || n || !m) && (z += (r === os ? xn : Tn) + ":" + (a + parseFloat(f)) + "px;"), 
      s && (z += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), 
      p._isStart = y, p.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")), 
      p.style.cssText = z, p.innerText = t || 0 === t ? e + "-" + t : e, g.children[0] ? g.insertBefore(p, g.children[0]) : g.appendChild(p), 
      p._offset = p["offset" + r.op.d2], Qn(p, 0, r, y), p;
    }, Qn = function(e, t, o, r) {
      var i = {
        display: "block"
      }, a = o[r ? "os2" : "p2"], s = o[r ? "p2" : "os2"];
      e._isFlipped = r, i[o.a + "Percent"] = r ? -100 : 0, i[o.a] = r ? "1px" : 0, i["border" + a + On] = 1, 
      i["border" + s + On] = 0, i[o.p] = t + "px", fs.set(e, i);
    }, Zn = [], Jn = {}, el = function() {
      return Ks() - Zs > 34 && (Hs || (Hs = requestAnimationFrame(vl)));
    }, tl = function() {
      (!Os || !Os.isPressed || Os.startX > gs.clientWidth) && ($a.cache++, Os ? Hs || (Hs = requestAnimationFrame(vl)) : vl(), 
      Zs || nl("scrollStart"), Zs = Ks());
    }, ol = function() {
      qs = ps.innerWidth, Ds = ps.innerHeight;
    }, rl = function() {
      $a.cache++, !xs && !Ls && !ms.fullscreenElement && !ms.webkitFullscreenElement && (!Is || qs !== ps.innerWidth || Math.abs(ps.innerHeight - Ds) > .25 * ps.innerHeight) && vs.restart(!0);
    }, il = {}, al = [], sl = function e() {
      return Vn(Ll, "scrollEnd", e) || hl(!0);
    }, nl = function(e) {
      return il[e] && il[e].map((function(e) {
        return e();
      })) || al;
    }, ll = [], cl = function(e) {
      for (var t = 0; t < ll.length; t += 5) {
        (!e || ll[t + 4] && ll[t + 4].query === e) && (ll[t].style.cssText = ll[t + 1], 
        ll[t].getBBox && ll[t].setAttribute("transform", ll[t + 2] || ""), ll[t + 3].uncache = 1);
      }
    }, dl = function(e, t) {
      var o;
      for (Es = 0; Es < Zn.length; Es++) {
        !(o = Zn[Es]) || t && o._ctx !== t || (e ? o.kill(1) : o.revert(!0, !0));
      }
      Ys = !0, t && cl(t), t || nl("revert");
    }, fl = function(e, t) {
      $a.cache++, (t || !Xs) && $a.forEach((function(e) {
        return gn(e) && e.cacheID++ && (e.rec = 0);
      })), hn(e) && (ps.history.scrollRestoration = Bs = e);
    }, ul = 0, pl = function() {
      gs.appendChild(Ns), Gs = !Os && Ns.offsetHeight || ps.innerHeight, gs.removeChild(Ns);
    }, ml = function(e) {
      return zs(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach((function(t) {
        return t.style.display = e ? "none" : "block";
      }));
    }, hl = function(e, t) {
      if (!Zs || e || Ys) {
        pl(), Xs = Ll.isRefreshing = !0, $a.forEach((function(e) {
          return gn(e) && ++e.cacheID && (e.rec = e());
        }));
        var o = nl("refreshInit");
        Ms && Ll.sort(), t || dl(), $a.forEach((function(e) {
          gn(e) && (e.smooth && (e.target.style.scrollBehavior = "auto"), e(0));
        })), Zn.slice(0).forEach((function(e) {
          return e.refresh();
        })), Ys = !1, Zn.forEach((function(e) {
          if (e._subPinOffset && e.pin) {
            var t = e.vars.horizontal ? "offsetWidth" : "offsetHeight", o = e.pin[t];
            e.revert(!0, 1), e.adjustPinSpacing(e.pin[t] - o), e.refresh();
          }
        })), $s = 1, ml(!0), Zn.forEach((function(e) {
          var t = pn(e.scroller, e._dir), o = "max" === e.vars.end || e._endClamp && e.end > t, r = e._startClamp && e.start >= t;
          (o || r) && e.setPositions(r ? t - 1 : e.start, o ? Math.max(r ? t : e.start + 1, t) : e.end, !0);
        })), ml(!1), $s = 0, o.forEach((function(e) {
          return e && e.render && e.render(-1);
        })), $a.forEach((function(e) {
          gn(e) && (e.smooth && requestAnimationFrame((function() {
            return e.target.style.scrollBehavior = "smooth";
          })), e.rec && e(e.rec));
        })), fl(Bs, 1), vs.pause(), ul++, Xs = 2, vl(2), Zn.forEach((function(e) {
          return gn(e.vars.onRefresh) && e.vars.onRefresh(e);
        })), Xs = Ll.isRefreshing = !1, nl("refresh");
      } else {
        $n(Ll, "scrollEnd", sl);
      }
    }, gl = 0, yl = 1, vl = function(e) {
      if (2 === e || !Xs && !Ys) {
        Ll.isUpdating = !0, Ws && Ws.update(0);
        var t = Zn.length, o = Ks(), r = o - Qs >= 50, i = t && Zn[0].scroll();
        if (yl = gl > i ? -1 : 1, Xs || (gl = i), r && (Zs && !Ts && o - Zs > 200 && (Zs = 0, 
        nl("scrollEnd")), _s = Qs, Qs = o), yl < 0) {
          for (Es = t; Es-- > 0; ) {
            Zn[Es] && Zn[Es].update(0, r);
          }
          yl = 1;
        } else {
          for (Es = 0; Es < t; Es++) {
            Zn[Es] && Zn[Es].update(0, r);
          }
        }
        Ll.isUpdating = !1;
      }
      Hs = 0;
    }, zl = [ wn, "top", Tn, xn, Ln + Mn, Ln + Cn, Ln + kn, Ln + An, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order" ], bl = zl.concat([ Sn, En, "boxSizing", "max" + On, "max" + In, "position", Ln, Pn, Pn + kn, Pn + Cn, Pn + Mn, Pn + An ]), _l = function(e, t, o, r) {
      if (!e._gsap.swappedIn) {
        for (var i, a = zl.length, s = t.style, n = e.style; a--; ) {
          s[i = zl[a]] = o[i];
        }
        s.position = "absolute" === o.position ? "absolute" : "relative", "inline" === o.display && (s.display = "inline-block"), 
        n[Tn] = n[xn] = "auto", s.flexBasis = o.flexBasis || "auto", s.overflow = "visible", 
        s.boxSizing = "border-box", s[Sn] = Bn(e, ts) + Dn, s[En] = Bn(e, os) + Dn, s[Pn] = n[Ln] = n.top = n[wn] = "0", 
        xl(r), n[Sn] = n["max" + On] = o[Sn], n[En] = n["max" + In] = o[En], n[Pn] = o[Pn], 
        e.parentNode !== t && (e.parentNode.insertBefore(t, e), t.appendChild(e)), e._gsap.swappedIn = !0;
      }
    }, wl = /([A-Z])/g, xl = function(e) {
      if (e) {
        var t, o, r = e.t.style, i = e.length, a = 0;
        for ((e.t._gsap || fs.core.getCache(e.t)).uncache = 1; a < i; a += 2) {
          o = e[a + 1], t = e[a], o ? r[t] = o : r[t] && r.removeProperty(t.replace(wl, "-$1").toLowerCase());
        }
      }
    }, Tl = function(e) {
      for (var t = bl.length, o = e.style, r = [], i = 0; i < t; i++) {
        r.push(bl[i], o[bl[i]]);
      }
      return r.t = e, r;
    }, Sl = {
      left: 0,
      top: 0
    }, El = function(e, t, o, r, i, a, s, n, l, c, d, f, u, p) {
      gn(e) && (e = e(n)), hn(e) && "max" === e.substr(0, 3) && (e = f + ("=" === e.charAt(4) ? Un("0" + e.substr(3), o) : 0));
      var m, h, g, y = u ? u.time() : 0;
      if (u && u.seek(0), isNaN(e) || (e = +e), yn(e)) {
        u && (e = fs.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, f, e)), 
        s && Qn(s, o, r, !0);
      } else {
        gn(t) && (t = t(n));
        var v, z, b, _, w = (e || "0").split(" ");
        g = rs(t, n) || gs, (v = Rn(g) || {}) && (v.left || v.top) || "none" !== qn(g).display || (_ = g.style.display, 
        g.style.display = "block", v = Rn(g), _ ? g.style.display = _ : g.style.removeProperty("display")), 
        z = Un(w[0], v[r.d]), b = Un(w[1] || "0", o), e = v[r.p] - l[r.p] - c + z + i - b, 
        s && Qn(s, b, r, o - b < 20 || s._isStart && b > 20), o -= o - b;
      }
      if (p && (n[p] = e || -.001, e < 0 && (e = 0)), a) {
        var x = e + o, T = a._isStart;
        m = "scroll" + r.d2, Qn(a, x, r, T && x > 20 || !T && (d ? Math.max(gs[m], hs[m]) : a.parentNode[m]) <= x + 1), 
        d && (l = Rn(s), d && (a.style[r.op.p] = l[r.op.p] - r.op.m - a._offset + Dn));
      }
      return u && g && (m = Rn(g), u.seek(f), h = Rn(g), u._caScrollDist = m[r.p] - h[r.p], 
      e = e / u._caScrollDist * f), u && u.seek(y), u ? e : Math.round(e);
    }, Cl = /(webkit|moz|length|cssText|inset)/i, Al = function(e, t, o, r) {
      if (e.parentNode !== t) {
        var i, a, s = e.style;
        if (t === gs) {
          for (i in e._stOrig = s.cssText, a = qn(e)) {
            +i || Cl.test(i) || !a[i] || "string" != typeof s[i] || "0" === i || (s[i] = a[i]);
          }
          s.top = o, s.left = r;
        } else {
          s.cssText = e._stOrig;
        }
        fs.core.getCache(e).uncache = 1, t.appendChild(e);
      }
    }, kl = function(e, t, o) {
      var r = t, i = r;
      return function(t) {
        var a = Math.round(e());
        return a !== r && a !== i && Math.abs(a - r) > 3 && Math.abs(a - i) > 3 && (t = a, 
        o && o()), i = r, r = t, t;
      };
    }, Ml = function(e, t, o) {
      var r = {};
      r[t.p] = "+=" + o, fs.set(e, r);
    }, Pl = function(e, t) {
      var o = is(e, t), r = "_scroll" + t.p2, i = function t(i, a, s, n, l) {
        var c = t.tween, d = a.onComplete, f = {};
        s = s || o();
        var u = kl(o, s, (function() {
          c.kill(), t.tween = 0;
        }));
        return l = n && l || 0, n = n || i - s, c && c.kill(), a[r] = i, a.inherit = !1, 
        a.modifiers = f, f[r] = function() {
          return u(s + n * c.ratio + l * c.ratio * c.ratio);
        }, a.onUpdate = function() {
          $a.cache++, t.tween && vl();
        }, a.onComplete = function() {
          t.tween = 0, d && d.call(c);
        }, c = t.tween = fs.to(e, a);
      };
      return e[r] = o, o.wheelHandler = function() {
        return i.tween && i.tween.kill() && (i.tween = 0);
      }, $n(e, "wheel", o.wheelHandler), Ll.isTouch && $n(e, "touchmove", o.wheelHandler), 
      i;
    }, Ll = function() {
      function e(t, o) {
        us || e.register(fs) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), 
        Rs(this), this.init(t, o);
      }
      return e.prototype.init = function(t, o) {
        if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), Js) {
          var r, i, a, s, n, l, c, d, f, u, p, m, h, g, y, v, z, b, _, w, x, T, S, E, C, A, k, M, P, L, O, I, D, q, F, R, B, N, G, Y, $, V, H = t = Fn(hn(t) || yn(t) || t.nodeType ? {
            trigger: t
          } : t, jn), X = H.onUpdate, j = H.toggleClass, W = H.id, U = H.onToggle, K = H.onRefresh, Q = H.scrub, Z = H.trigger, J = H.pin, ee = H.pinSpacing, te = H.invalidateOnRefresh, oe = H.anticipatePin, re = H.onScrubComplete, ie = H.onSnapComplete, ae = H.once, se = H.snap, ne = H.pinReparent, le = H.pinSpacer, ce = H.containerAnimation, de = H.fastScrollEnd, fe = H.preventOverlaps, ue = t.horizontal || t.containerAnimation && !1 !== t.horizontal ? ts : os, pe = !Q && 0 !== Q, me = rs(t.scroller || ps), he = fs.core.getCache(me), ge = dn(me), ye = "fixed" === ("pinType" in t ? t.pinType : ja(me, "pinType") || ge && "fixed"), ve = [ t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack ], ze = pe && t.toggleActions.split(" "), be = "markers" in t ? t.markers : jn.markers, _e = ge ? 0 : parseFloat(qn(me)["border" + ue.p2 + On]) || 0, we = this, xe = t.onRefreshInit && function() {
            return t.onRefreshInit(we);
          }, Te = function(e, t, o) {
            var r = o.d, i = o.d2, a = o.a;
            return (a = ja(e, "getBoundingClientRect")) ? function() {
              return a()[r];
            } : function() {
              return (t ? fn(i) : e["client" + i]) || 0;
            };
          }(me, ge, ue), Se = function(e, t) {
            return !t || ~Va.indexOf(e) ? un(e) : function() {
              return Sl;
            };
          }(me, ge), Ee = 0, Ce = 0, Ae = 0, ke = is(me, ue);
          if (we._startClamp = we._endClamp = !1, we._dir = ue, oe *= 45, we.scroller = me, 
          we.scroll = ce ? ce.time.bind(ce) : ke, s = ke(), we.vars = t, o = o || t.animation, 
          "refreshPriority" in t && (Ms = 1, -9999 === t.refreshPriority && (Ws = we)), he.tweenScroll = he.tweenScroll || {
            top: Pl(me, os),
            left: Pl(me, ts)
          }, we.tweenTo = r = he.tweenScroll[ue.p], we.scrubDuration = function(e) {
            (D = yn(e) && e) ? I ? I.duration(e) : I = fs.to(o, {
              ease: "expo",
              totalProgress: "+=0",
              inherit: !1,
              duration: D,
              paused: !0,
              onComplete: function() {
                return re && re(we);
              }
            }) : (I && I.progress(1).kill(), I = 0);
          }, o && (o.vars.lazy = !1, o._initted && !we.isReverted || !1 !== o.vars.immediateRender && !1 !== t.immediateRender && o.duration() && o.render(0, !0, !0), 
          we.animation = o.pause(), o.scrollTrigger = we, we.scrubDuration(Q), L = 0, W || (W = o.vars.id)), 
          se && (vn(se) && !se.push || (se = {
            snapTo: se
          }), "scrollBehavior" in gs.style && fs.set(ge ? [ gs, hs ] : me, {
            scrollBehavior: "auto"
          }), $a.forEach((function(e) {
            return gn(e) && e.target === (ge ? ms.scrollingElement || hs : me) && (e.smooth = !1);
          })), a = gn(se.snapTo) ? se.snapTo : "labels" === se.snapTo ? function(e) {
            return function(t) {
              return fs.utils.snap(Nn(e), t);
            };
          }(o) : "labelsDirectional" === se.snapTo ? (Y = o, function(e, t) {
            return Gn(Nn(Y))(e, t.direction);
          }) : !1 !== se.directional ? function(e, t) {
            return Gn(se.snapTo)(e, Ks() - Ce < 500 ? 0 : t.direction);
          } : fs.utils.snap(se.snapTo), q = se.duration || {
            min: .1,
            max: 2
          }, q = vn(q) ? bs(q.min, q.max) : bs(q, q), F = fs.delayedCall(se.delay || D / 2 || .1, (function() {
            var e = ke(), t = Ks() - Ce < 500, i = r.tween;
            if (!(t || Math.abs(we.getVelocity()) < 10) || i || Ts || Ee === e) {
              we.isActive && Ee !== e && F.restart(!0);
            } else {
              var s, n, d = (e - l) / g, f = o && !pe ? o.totalProgress() : d, u = t ? 0 : (f - O) / (Ks() - _s) * 1e3 || 0, p = fs.utils.clamp(-d, 1 - d, _n(u / 2) * u / .185), m = d + (!1 === se.inertia ? 0 : p), h = se, y = h.onStart, v = h.onInterrupt, z = h.onComplete;
              if (s = a(m, we), yn(s) || (s = m), n = Math.round(l + s * g), e <= c && e >= l && n !== e) {
                if (i && !i._initted && i.data <= _n(n - e)) {
                  return;
                }
                !1 === se.inertia && (p = s - d), r(n, {
                  duration: q(_n(.185 * Math.max(_n(m - f), _n(s - f)) / u / .05 || 0)),
                  ease: se.ease || "power3",
                  data: _n(n - e),
                  onInterrupt: function() {
                    return F.restart(!0) && v && v(we);
                  },
                  onComplete: function() {
                    we.update(), Ee = ke(), o && (I ? I.resetTo("totalProgress", s, o._tTime / o._tDur) : o.progress(s)), 
                    L = O = o && !pe ? o.totalProgress() : we.progress, ie && ie(we), z && z(we);
                  }
                }, e, p * g, n - e - p * g), y && y(we, r.tween);
              }
            }
          })).pause()), W && (Jn[W] = we), (G = (Z = we.trigger = rs(Z || !0 !== J && J)) && Z._gsap && Z._gsap.stRevert) && (G = G(we)), 
          J = !0 === J ? Z : rs(J), hn(j) && (j = {
            targets: Z,
            className: j
          }), J && (!1 === ee || ee === Ln || (ee = !(!ee && J.parentNode && J.parentNode.style && "flex" === qn(J.parentNode).display) && Pn), 
          we.pin = J, (i = fs.core.getCache(J)).spacer ? y = i.pinState : (le && ((le = rs(le)) && !le.nodeType && (le = le.current || le.nativeElement), 
          i.spacerIsNative = !!le, le && (i.spacerState = Tl(le))), i.spacer = b = le || ms.createElement("div"), 
          b.classList.add("pin-spacer"), W && b.classList.add("pin-spacer-" + W), i.pinState = y = Tl(J)), 
          !1 !== t.force3D && fs.set(J, {
            force3D: !0
          }), we.spacer = b = i.spacer, P = qn(J), E = P[ee + ue.os2], w = fs.getProperty(J), 
          x = fs.quickSetter(J, ue.a, Dn), _l(J, b, P), z = Tl(J)), be) {
            m = vn(be) ? Fn(be, Xn) : Xn, u = Kn("scroller-start", W, me, ue, m, 0), p = Kn("scroller-end", W, me, ue, m, 0, u), 
            _ = u["offset" + ue.op.d2];
            var Me = rs(ja(me, "content") || me);
            d = this.markerStart = Kn("start", W, Me, ue, m, _, 0, ce), f = this.markerEnd = Kn("end", W, Me, ue, m, _, 0, ce), 
            ce && (N = fs.quickSetter([ d, f ], ue.a, Dn)), ye || Va.length && !0 === ja(me, "fixedMarkers") || (V = qn($ = ge ? gs : me).position, 
            $.style.position = "absolute" === V || "fixed" === V ? V : "relative", fs.set([ u, p ], {
              force3D: !0
            }), A = fs.quickSetter(u, ue.a, Dn), M = fs.quickSetter(p, ue.a, Dn));
          }
          if (ce) {
            var Pe = ce.vars.onUpdate, Le = ce.vars.onUpdateParams;
            ce.eventCallback("onUpdate", (function() {
              we.update(0, 0, 1), Pe && Pe.apply(ce, Le || []);
            }));
          }
          if (we.previous = function() {
            return Zn[Zn.indexOf(we) - 1];
          }, we.next = function() {
            return Zn[Zn.indexOf(we) + 1];
          }, we.revert = function(e, t) {
            if (!t) {
              return we.kill(!0);
            }
            var r = !1 !== e || !we.enabled, i = xs;
            r !== we.isReverted && (r && (R = Math.max(ke(), we.scroll.rec || 0), Ae = we.progress, 
            B = o && o.progress()), d && [ d, f, u, p ].forEach((function(e) {
              return e.style.display = r ? "none" : "block";
            })), r && (xs = we, we.update(r)), !J || ne && we.isActive || (r ? function(e, t, o) {
              xl(o);
              var r = e._gsap;
              if (r.spacerIsNative) {
                xl(r.spacerState);
              } else if (e._gsap.swappedIn) {
                var i = t.parentNode;
                i && (i.insertBefore(e, t), i.removeChild(t));
              }
              e._gsap.swappedIn = !1;
            }(J, b, y) : _l(J, b, qn(J), C)), r || we.update(r), xs = i, we.isReverted = r);
          }, we.refresh = function(i, a, m, _) {
            if (!xs && we.enabled || a) {
              if (J && i && Zs) {
                $n(e, "scrollEnd", sl);
              } else {
                !Xs && xe && xe(we), xs = we, r.tween && !m && (r.tween.kill(), r.tween = 0), I && I.pause(), 
                te && o && o.revert({
                  kill: !1
                }).invalidate(), we.isReverted || we.revert(!0, !0), we._subPinOffset = !1;
                var x, E, A, M, P, L, O, D, q, N, G, Y, $, V = Te(), H = Se(), X = ce ? ce.duration() : pn(me, ue), j = g <= .01, W = 0, U = _ || 0, Q = vn(m) ? m.end : t.end, oe = t.endTrigger || Z, re = vn(m) ? m.start : t.start || (0 !== t.start && Z ? J ? "0 0" : "0 100%" : 0), ie = we.pinnedContainer = t.pinnedContainer && rs(t.pinnedContainer, we), ae = Z && Math.max(0, Zn.indexOf(we)) || 0, se = ae;
                for (be && vn(m) && (Y = fs.getProperty(u, ue.p), $ = fs.getProperty(p, ue.p)); se--; ) {
                  (L = Zn[se]).end || L.refresh(0, 1) || (xs = we), !(O = L.pin) || O !== Z && O !== J && O !== ie || L.isReverted || (N || (N = []), 
                  N.unshift(L), L.revert(!0, !0)), L !== Zn[se] && (ae--, se--);
                }
                for (gn(re) && (re = re(we)), re = en(re, "start", we), l = El(re, Z, V, ue, ke(), d, u, we, H, _e, ye, X, ce, we._startClamp && "_startClamp") || (J ? -.001 : 0), 
                gn(Q) && (Q = Q(we)), hn(Q) && !Q.indexOf("+=") && (~Q.indexOf(" ") ? Q = (hn(re) ? re.split(" ")[0] : "") + Q : (W = Un(Q.substr(2), V), 
                Q = hn(re) ? re : (ce ? fs.utils.mapRange(0, ce.duration(), ce.scrollTrigger.start, ce.scrollTrigger.end, l) : l) + W, 
                oe = Z)), Q = en(Q, "end", we), c = Math.max(l, El(Q || (oe ? "100% 0" : X), oe, V, ue, ke() + W, f, p, we, H, _e, ye, X, ce, we._endClamp && "_endClamp")) || -.001, 
                W = 0, se = ae; se--; ) {
                  (O = (L = Zn[se]).pin) && L.start - L._pinPush <= l && !ce && L.end > 0 && (x = L.end - (we._startClamp ? Math.max(0, L.start) : L.start), 
                  (O === Z && L.start - L._pinPush < l || O === ie) && isNaN(re) && (W += x * (1 - L.progress)), 
                  O === J && (U += x));
                }
                if (l += W, c += W, we._startClamp && (we._startClamp += W), we._endClamp && !Xs && (we._endClamp = c || -.001, 
                c = Math.min(c, pn(me, ue))), g = c - l || (l -= .01) && .001, j && (Ae = fs.utils.clamp(0, 1, fs.utils.normalize(l, c, R))), 
                we._pinPush = U, d && W && ((x = {})[ue.a] = "+=" + W, ie && (x[ue.p] = "-=" + ke()), 
                fs.set([ d, f ], x)), !J || $s && we.end >= pn(me, ue)) {
                  if (Z && ke() && !ce) {
                    for (E = Z.parentNode; E && E !== gs; ) {
                      E._pinOffset && (l -= E._pinOffset, c -= E._pinOffset), E = E.parentNode;
                    }
                  }
                } else {
                  x = qn(J), M = ue === os, A = ke(), T = parseFloat(w(ue.a)) + U, !X && c > 1 && (G = {
                    style: G = (ge ? ms.scrollingElement || hs : me).style,
                    value: G["overflow" + ue.a.toUpperCase()]
                  }, ge && "scroll" !== qn(gs)["overflow" + ue.a.toUpperCase()] && (G.style["overflow" + ue.a.toUpperCase()] = "scroll")), 
                  _l(J, b, x), z = Tl(J), E = Rn(J, !0), D = ye && is(me, M ? ts : os)(), ee ? ((C = [ ee + ue.os2, g + U + Dn ]).t = b, 
                  (se = ee === Pn ? Bn(J, ue) + g + U : 0) && (C.push(ue.d, se + Dn), "auto" !== b.style.flexBasis && (b.style.flexBasis = se + Dn)), 
                  xl(C), ie && Zn.forEach((function(e) {
                    e.pin === ie && !1 !== e.vars.pinSpacing && (e._subPinOffset = !0);
                  })), ye && ke(R)) : (se = Bn(J, ue)) && "auto" !== b.style.flexBasis && (b.style.flexBasis = se + Dn), 
                  ye && ((P = {
                    top: E.top + (M ? A - l : D) + Dn,
                    left: E.left + (M ? D : A - l) + Dn,
                    boxSizing: "border-box",
                    position: "fixed"
                  })[Sn] = P["max" + On] = Math.ceil(E.width) + Dn, P[En] = P["max" + In] = Math.ceil(E.height) + Dn, 
                  P[Ln] = P[Ln + kn] = P[Ln + Cn] = P[Ln + Mn] = P[Ln + An] = "0", P[Pn] = x[Pn], 
                  P[Pn + kn] = x[Pn + kn], P[Pn + Cn] = x[Pn + Cn], P[Pn + Mn] = x[Pn + Mn], P[Pn + An] = x[Pn + An], 
                  v = function(e, t, o) {
                    for (var r, i = [], a = e.length, s = o ? 8 : 0; s < a; s += 2) {
                      r = e[s], i.push(r, r in t ? t[r] : e[s + 1]);
                    }
                    return i.t = e.t, i;
                  }(y, P, ne), Xs && ke(0)), o ? (q = o._initted, Ps(1), o.render(o.duration(), !0, !0), 
                  S = w(ue.a) - T + g + U, k = Math.abs(g - S) > 1, ye && k && v.splice(v.length - 2, 2), 
                  o.render(0, !0, !0), q || o.invalidate(!0), o.parent || o.totalTime(o.totalTime()), 
                  Ps(0)) : S = g, G && (G.value ? G.style["overflow" + ue.a.toUpperCase()] = G.value : G.style.removeProperty("overflow-" + ue.a));
                }
                N && N.forEach((function(e) {
                  return e.revert(!1, !0);
                })), we.start = l, we.end = c, s = n = Xs ? R : ke(), ce || Xs || (s < R && ke(R), 
                we.scroll.rec = 0), we.revert(!1, !0), Ce = Ks(), F && (Ee = -1, F.restart(!0)), 
                xs = 0, o && pe && (o._initted || B) && o.progress() !== B && o.progress(B || 0, !0).render(o.time(), !0, !0), 
                (j || Ae !== we.progress || ce || te) && (o && !pe && o.totalProgress(ce && l < -.001 && !Ae ? fs.utils.normalize(l, c, 0) : Ae, !0), 
                we.progress = j || (s - l) / g === Ae ? 0 : Ae), J && ee && (b._pinOffset = Math.round(we.progress * S)), 
                I && I.invalidate(), isNaN(Y) || (Y -= fs.getProperty(u, ue.p), $ -= fs.getProperty(p, ue.p), 
                Ml(u, ue, Y), Ml(d, ue, Y - (_ || 0)), Ml(p, ue, $), Ml(f, ue, $ - (_ || 0))), j && !Xs && we.update(), 
                !K || Xs || h || (h = !0, K(we), h = !1);
              }
            }
          }, we.getVelocity = function() {
            return (ke() - n) / (Ks() - _s) * 1e3 || 0;
          }, we.endAnimation = function() {
            zn(we.callbackAnimation), o && (I ? I.progress(1) : o.paused() ? pe || zn(o, we.direction < 0, 1) : zn(o, o.reversed()));
          }, we.labelToScroll = function(e) {
            return o && o.labels && (l || we.refresh() || l) + o.labels[e] / o.duration() * g || 0;
          }, we.getTrailing = function(e) {
            var t = Zn.indexOf(we), o = we.direction > 0 ? Zn.slice(0, t).reverse() : Zn.slice(t + 1);
            return (hn(e) ? o.filter((function(t) {
              return t.vars.preventOverlaps === e;
            })) : o).filter((function(e) {
              return we.direction > 0 ? e.end <= l : e.start >= c;
            }));
          }, we.update = function(e, t, i) {
            if (!ce || i || e) {
              var a, d, f, p, m, h, y, _ = !0 === Xs ? R : we.scroll(), w = e ? 0 : (_ - l) / g, C = w < 0 ? 0 : w > 1 ? 1 : w || 0, P = we.progress;
              if (t && (n = s, s = ce ? ke() : _, se && (O = L, L = o && !pe ? o.totalProgress() : C)), 
              oe && J && !xs && !Us && Zs && (!C && l < _ + (_ - n) / (Ks() - _s) * oe ? C = 1e-4 : 1 === C && c > _ + (_ - n) / (Ks() - _s) * oe && (C = .9999)), 
              C !== P && we.enabled) {
                if (p = (m = (a = we.isActive = !!C && C < 1) !== (!!P && P < 1)) || !!C != !!P, 
                we.direction = C > P ? 1 : -1, we.progress = C, p && !xs && (d = C && !P ? 0 : 1 === C ? 1 : 1 === P ? 2 : 3, 
                pe && (f = !m && "none" !== ze[d + 1] && ze[d + 1] || ze[d], y = o && ("complete" === f || "reset" === f || f in o))), 
                fe && (m || y) && (y || Q || !o) && (gn(fe) ? fe(we) : we.getTrailing(fe).forEach((function(e) {
                  return e.endAnimation();
                }))), pe || (!I || xs || Us ? o && o.totalProgress(C, !(!xs || !Ce && !e)) : (I._dp._time - I._start !== I._time && I.render(I._dp._time - I._start), 
                I.resetTo ? I.resetTo("totalProgress", C, o._tTime / o._tDur) : (I.vars.totalProgress = C, 
                I.invalidate().restart()))), J) {
                  if (e && ee && (b.style[ee + ue.os2] = E), ye) {
                    if (p) {
                      if (h = !e && C > P && c + 1 > _ && _ + 1 >= pn(me, ue), ne) {
                        if (e || !a && !h) {
                          Al(J, b);
                        } else {
                          var D = Rn(J, !0), q = _ - l;
                          Al(J, gs, D.top + (ue === os ? q : 0) + Dn, D.left + (ue === os ? 0 : q) + Dn);
                        }
                      }
                      xl(a || h ? v : z), k && C < 1 && a || x(T + (1 !== C || h ? 0 : S));
                    }
                  } else {
                    x(nn(T + S * C));
                  }
                }
                se && !r.tween && !xs && !Us && F.restart(!0), j && (m || ae && C && (C < 1 || !Vs)) && zs(j.targets).forEach((function(e) {
                  return e.classList[a || ae ? "add" : "remove"](j.className);
                })), X && !pe && !e && X(we), p && !xs ? (pe && (y && ("complete" === f ? o.pause().totalProgress(1) : "reset" === f ? o.restart(!0).pause() : "restart" === f ? o.restart(!0) : o[f]()), 
                X && X(we)), !m && Vs || (U && m && bn(we, U), ve[d] && bn(we, ve[d]), ae && (1 === C ? we.kill(!1, 1) : ve[d] = 0), 
                m || ve[d = 1 === C ? 1 : 3] && bn(we, ve[d])), de && !a && Math.abs(we.getVelocity()) > (yn(de) ? de : 2500) && (zn(we.callbackAnimation), 
                I ? I.progress(1) : zn(o, "reverse" === f ? 1 : !C, 1))) : pe && X && !xs && X(we);
              }
              if (M) {
                var B = ce ? _ / ce.duration() * (ce._caScrollDist || 0) : _;
                A(B + (u._isFlipped ? 1 : 0)), M(B);
              }
              N && N(-_ / ce.duration() * (ce._caScrollDist || 0));
            }
          }, we.enable = function(t, o) {
            we.enabled || (we.enabled = !0, $n(me, "resize", rl), ge || $n(me, "scroll", tl), 
            xe && $n(e, "refreshInit", xe), !1 !== t && (we.progress = Ae = 0, s = n = Ee = ke()), 
            !1 !== o && we.refresh());
          }, we.getTween = function(e) {
            return e && r ? r.tween : I;
          }, we.setPositions = function(e, t, o, r) {
            if (ce) {
              var i = ce.scrollTrigger, a = ce.duration(), s = i.end - i.start;
              e = i.start + s * e / a, t = i.start + s * t / a;
            }
            we.refresh(!1, !1, {
              start: tn(e, o && !!we._startClamp),
              end: tn(t, o && !!we._endClamp)
            }, r), we.update();
          }, we.adjustPinSpacing = function(e) {
            if (C && e) {
              var t = C.indexOf(ue.d) + 1;
              C[t] = parseFloat(C[t]) + e + Dn, C[1] = parseFloat(C[1]) + e + Dn, xl(C);
            }
          }, we.disable = function(t, o) {
            if (we.enabled && (!1 !== t && we.revert(!0, !0), we.enabled = we.isActive = !1, 
            o || I && I.pause(), R = 0, i && (i.uncache = 1), xe && Vn(e, "refreshInit", xe), 
            F && (F.pause(), r.tween && r.tween.kill() && (r.tween = 0)), !ge)) {
              for (var a = Zn.length; a--; ) {
                if (Zn[a].scroller === me && Zn[a] !== we) {
                  return;
                }
              }
              Vn(me, "resize", rl), ge || Vn(me, "scroll", tl);
            }
          }, we.kill = function(e, r) {
            we.disable(e, r), I && !r && I.kill(), W && delete Jn[W];
            var a = Zn.indexOf(we);
            a >= 0 && Zn.splice(a, 1), a === Es && yl > 0 && Es--, a = 0, Zn.forEach((function(e) {
              return e.scroller === we.scroller && (a = 1);
            })), a || Xs || (we.scroll.rec = 0), o && (o.scrollTrigger = null, e && o.revert({
              kill: !1
            }), r || o.kill()), d && [ d, f, u, p ].forEach((function(e) {
              return e.parentNode && e.parentNode.removeChild(e);
            })), Ws === we && (Ws = 0), J && (i && (i.uncache = 1), a = 0, Zn.forEach((function(e) {
              return e.pin === J && a++;
            })), a || (i.spacer = 0)), t.onKill && t.onKill(we);
          }, Zn.push(we), we.enable(!1, !1), G && G(we), o && o.add && !g) {
            var Oe = we.update;
            we.update = function() {
              we.update = Oe, l || c || we.refresh();
            }, fs.delayedCall(.01, we.update), g = .01, l = c = 0;
          } else {
            we.refresh();
          }
          J && function() {
            if (js !== ul) {
              var e = js = ul;
              requestAnimationFrame((function() {
                return e === ul && hl(!0);
              }));
            }
          }();
        } else {
          this.update = this.refresh = this.kill = sn;
        }
      }, e.register = function(t) {
        return us || (fs = t || cn(), ln() && window.document && e.enable(), us = Js), us;
      }, e.defaults = function(e) {
        if (e) {
          for (var t in e) {
            jn[t] = e[t];
          }
        }
        return jn;
      }, e.disable = function(e, t) {
        Js = 0, Zn.forEach((function(o) {
          return o[t ? "kill" : "disable"](e);
        })), Vn(ps, "wheel", tl), Vn(ms, "scroll", tl), clearInterval(ws), Vn(ms, "touchcancel", sn), 
        Vn(gs, "touchstart", sn), Yn(Vn, ms, "pointerdown,touchstart,mousedown", rn), Yn(Vn, ms, "pointerup,touchend,mouseup", an), 
        vs.kill(), mn(Vn);
        for (var o = 0; o < $a.length; o += 3) {
          Hn(Vn, $a[o], $a[o + 1]), Hn(Vn, $a[o], $a[o + 2]);
        }
      }, e.enable = function() {
        if (ps = window, ms = document, hs = ms.documentElement, gs = ms.body, fs && (zs = fs.utils.toArray, 
        bs = fs.utils.clamp, Rs = fs.core.context || sn, Ps = fs.core.suppressOverwrites || sn, 
        Bs = ps.history.scrollRestoration || "auto", gl = ps.pageYOffset, fs.core.globals("ScrollTrigger", e), 
        gs)) {
          Js = 1, (Ns = document.createElement("div")).style.height = "100vh", Ns.style.position = "absolute", 
          pl(), on(), ds.register(fs), e.isTouch = ds.isTouch, Fs = ds.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), 
          Is = 1 === ds.isTouch, $n(ps, "wheel", tl), ys = [ ps, ms, hs, gs ], fs.matchMedia ? (e.matchMedia = function(e) {
            var t, o = fs.matchMedia();
            for (t in e) {
              o.add(t, e[t]);
            }
            return o;
          }, fs.addEventListener("matchMediaInit", (function() {
            return dl();
          })), fs.addEventListener("matchMediaRevert", (function() {
            return cl();
          })), fs.addEventListener("matchMedia", (function() {
            hl(0, 1), nl("matchMedia");
          })), fs.matchMedia("(orientation: portrait)", (function() {
            return ol(), ol;
          }))) : console.warn("Requires GSAP 3.11.0 or later"), ol(), $n(ms, "scroll", tl);
          var t, o, r = gs.style, i = r.borderTopStyle, a = fs.core.Animation.prototype;
          for (a.revert || Object.defineProperty(a, "revert", {
            value: function() {
              return this.time(-.01, !0);
            }
          }), r.borderTopStyle = "solid", t = Rn(gs), os.m = Math.round(t.top + os.sc()) || 0, 
          ts.m = Math.round(t.left + ts.sc()) || 0, i ? r.borderTopStyle = i : r.removeProperty("border-top-style"), 
          ws = setInterval(el, 250), fs.delayedCall(.5, (function() {
            return Us = 0;
          })), $n(ms, "touchcancel", sn), $n(gs, "touchstart", sn), Yn($n, ms, "pointerdown,touchstart,mousedown", rn), 
          Yn($n, ms, "pointerup,touchend,mouseup", an), Ss = fs.utils.checkPrefix("transform"), 
          bl.push(Ss), us = Ks(), vs = fs.delayedCall(.2, hl).pause(), ks = [ ms, "visibilitychange", function() {
            var e = ps.innerWidth, t = ps.innerHeight;
            ms.hidden ? (Cs = e, As = t) : Cs === e && As === t || rl();
          }, ms, "DOMContentLoaded", hl, ps, "load", hl, ps, "resize", rl ], mn($n), Zn.forEach((function(e) {
            return e.enable(0, 1);
          })), o = 0; o < $a.length; o += 3) {
            Hn(Vn, $a[o], $a[o + 1]), Hn(Vn, $a[o], $a[o + 2]);
          }
        }
      }, e.config = function(t) {
        "limitCallbacks" in t && (Vs = !!t.limitCallbacks);
        var o = t.syncInterval;
        o && clearInterval(ws) || (ws = o) && setInterval(el, o), "ignoreMobileResize" in t && (Is = 1 === e.isTouch && t.ignoreMobileResize), 
        "autoRefreshEvents" in t && (mn(Vn) || mn($n, t.autoRefreshEvents || "none"), Ls = -1 === (t.autoRefreshEvents + "").indexOf("resize"));
      }, e.scrollerProxy = function(e, t) {
        var o = rs(e), r = $a.indexOf(o), i = dn(o);
        ~r && $a.splice(r, i ? 6 : 2), t && (i ? Va.unshift(ps, t, gs, t, hs, t) : Va.unshift(o, t));
      }, e.clearMatchMedia = function(e) {
        Zn.forEach((function(t) {
          return t._ctx && t._ctx.query === e && t._ctx.kill(!0, !0);
        }));
      }, e.isInViewport = function(e, t, o) {
        var r = (hn(e) ? rs(e) : e).getBoundingClientRect(), i = r[o ? Sn : En] * t || 0;
        return o ? r.right - i > 0 && r.left + i < ps.innerWidth : r.bottom - i > 0 && r.top + i < ps.innerHeight;
      }, e.positionInViewport = function(e, t, o) {
        hn(e) && (e = rs(e));
        var r = e.getBoundingClientRect(), i = r[o ? Sn : En], a = null == t ? i / 2 : t in Wn ? Wn[t] * i : ~t.indexOf("%") ? parseFloat(t) * i / 100 : parseFloat(t) || 0;
        return o ? (r.left + a) / ps.innerWidth : (r.top + a) / ps.innerHeight;
      }, e.killAll = function(e) {
        if (Zn.slice(0).forEach((function(e) {
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
      return e ? zs(e).forEach((function(e) {
        if (e && e.style) {
          var t = ll.indexOf(e);
          t >= 0 && ll.splice(t, 5), ll.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), fs.core.getCache(e), Rs());
        }
      })) : ll;
    }, Ll.revert = function(e, t) {
      return dl(!e, t);
    }, Ll.create = function(e, t) {
      return new Ll(e, t);
    }, Ll.refresh = function(e) {
      return e ? rl() : (us || Ll.register()) && hl(!0);
    }, Ll.update = function(e) {
      return ++$a.cache && vl(!0 === e ? 2 : 0);
    }, Ll.clearScrollMemory = fl, Ll.maxScroll = function(e, t) {
      return pn(e, t ? ts : os);
    }, Ll.getScrollFunc = function(e, t) {
      return is(rs(e), t ? ts : os);
    }, Ll.getById = function(e) {
      return Jn[e];
    }, Ll.getAll = function() {
      return Zn.filter((function(e) {
        return "ScrollSmoother" !== e.vars.id;
      }));
    }, Ll.isScrolling = function() {
      return !!Zs;
    }, Ll.snapDirectional = Gn, Ll.addEventListener = function(e, t) {
      var o = il[e] || (il[e] = []);
      ~o.indexOf(t) || o.push(t);
    }, Ll.removeEventListener = function(e, t) {
      var o = il[e], r = o && o.indexOf(t);
      r >= 0 && o.splice(r, 1);
    }, Ll.batch = function(e, t) {
      var o, r = [], i = {}, a = t.interval || .016, s = t.batchMax || 1e9, n = function(e, t) {
        var o = [], r = [], i = fs.delayedCall(a, (function() {
          t(o, r), o = [], r = [];
        })).pause();
        return function(e) {
          o.length || i.restart(!0), o.push(e.trigger), r.push(e), s <= o.length && i.progress(1);
        };
      };
      for (o in t) {
        i[o] = "on" === o.substr(0, 2) && gn(t[o]) && "onRefreshInit" !== o ? n(0, t[o]) : t[o];
      }
      return gn(s) && (s = s(), $n(Ll, "refresh", (function() {
        return s = t.batchMax();
      }))), zs(e).forEach((function(e) {
        var t = {};
        for (o in i) {
          t[o] = i[o];
        }
        t.trigger = e, r.push(Ll.create(t));
      })), r;
    };
    var Ol, Il = function(e, t, o, r) {
      return t > r ? e(r) : t < 0 && e(0), o > r ? (r - t) / (o - t) : o < 0 ? t / (t - o) : 1;
    }, Dl = function e(t, o) {
      !0 === o ? t.style.removeProperty("touch-action") : t.style.touchAction = !0 === o ? "auto" : o ? "pan-" + o + (ds.isTouch ? " pinch-zoom" : "") : "none", 
      t === hs && e(gs, o);
    }, ql = {
      auto: 1,
      scroll: 1
    }, Fl = function(e) {
      var t, o = e.event, r = e.target, i = e.axis, a = (o.changedTouches ? o.changedTouches[0] : o).target, s = a._gsap || fs.core.getCache(a), n = Ks();
      if (!s._isScrollT || n - s._isScrollT > 2e3) {
        for (;a && a !== gs && (a.scrollHeight <= a.clientHeight && a.scrollWidth <= a.clientWidth || !ql[(t = qn(a)).overflowY] && !ql[t.overflowX]); ) {
          a = a.parentNode;
        }
        s._isScroll = a && a !== r && !dn(a) && (ql[(t = qn(a)).overflowY] || ql[t.overflowX]), 
        s._isScrollT = n;
      }
      (s._isScroll || "x" === i) && (o.stopPropagation(), o._gsapAllow = !0);
    }, Rl = function(e, t, o, r) {
      return ds.create({
        target: e,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: t,
        onWheel: r = r && Fl,
        onPress: r,
        onDrag: r,
        onScroll: r,
        onEnable: function() {
          return o && $n(ms, ds.eventTypes[0], Nl, !1, !0);
        },
        onDisable: function() {
          return Vn(ms, ds.eventTypes[0], Nl, !0);
        }
      });
    }, Bl = /(input|label|select|textarea)/i, Nl = function(e) {
      var t = Bl.test(e.target.tagName);
      (t || Ol) && (e._gsapAllow = !0, Ol = t);
    }, Gl = function(e) {
      vn(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), 
      e.debounce = !!e.debounce, e.id = e.id || "normalizer";
      var t, o, r, i, a, s, n, l, c = e, d = c.normalizeScrollX, f = c.momentum, u = c.allowNestedScroll, p = c.onRelease, m = rs(e.target) || hs, h = fs.core.globals().ScrollSmoother, g = h && h.get(), y = Fs && (e.content && rs(e.content) || g && !1 !== e.content && !g.smooth() && g.content()), v = is(m, os), z = is(m, ts), b = 1, _ = (ds.isTouch && ps.visualViewport ? ps.visualViewport.scale * ps.visualViewport.width : ps.outerWidth) / ps.innerWidth, w = 0, x = gn(f) ? function() {
        return f(t);
      } : function() {
        return f || 2.8;
      }, T = Rl(m, e.type, !0, u), S = function() {
        return i = !1;
      }, E = sn, C = sn, A = function() {
        o = pn(m, os), C = bs(Fs ? 1 : 0, o), d && (E = bs(0, pn(m, ts))), r = ul;
      }, k = function() {
        y._gsap.y = nn(parseFloat(y._gsap.y) + v.offset) + "px", y.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(y._gsap.y) + ", 0, 1)", 
        v.offset = v.cacheID = 0;
      }, M = function() {
        A(), a.isActive() && a.vars.scrollY > o && (v() > o ? a.progress(1) && v(o) : a.resetTo("scrollY", o));
      };
      return y && fs.set(y, {
        y: "+=0"
      }), e.ignoreCheck = function(e) {
        return Fs && "touchmove" === e.type && function() {
          if (i) {
            requestAnimationFrame(S);
            var e = nn(t.deltaY / 2), o = C(v.v - e);
            if (y && o !== v.v + v.offset) {
              v.offset = o - v.v;
              var r = nn((parseFloat(y && y._gsap.y) || 0) - v.offset);
              y.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + r + ", 0, 1)", 
              y._gsap.y = r + "px", v.cacheID = $a.cache, vl();
            }
            return !0;
          }
          v.offset && k(), i = !0;
        }() || b > 1.05 && "touchstart" !== e.type || t.isGesturing || e.touches && e.touches.length > 1;
      }, e.onPress = function() {
        i = !1;
        var e = b;
        b = nn((ps.visualViewport && ps.visualViewport.scale || 1) / _), a.pause(), e !== b && Dl(m, b > 1.01 || !d && "x"), 
        s = z(), n = v(), A(), r = ul;
      }, e.onRelease = e.onGestureStart = function(e, t) {
        if (v.offset && k(), t) {
          $a.cache++;
          var r, i, s = x();
          d && (i = (r = z()) + .05 * s * -e.velocityX / .227, s *= Il(z, r, i, pn(m, ts)), 
          a.vars.scrollX = E(i)), i = (r = v()) + .05 * s * -e.velocityY / .227, s *= Il(v, r, i, pn(m, os)), 
          a.vars.scrollY = C(i), a.invalidate().duration(s).play(.01), (Fs && a.vars.scrollY >= o || r >= o - 1) && fs.to({}, {
            onUpdate: M,
            duration: s
          });
        } else {
          l.restart(!0);
        }
        p && p(e);
      }, e.onWheel = function() {
        a._ts && a.pause(), Ks() - w > 1e3 && (r = 0, w = Ks());
      }, e.onChange = function(e, t, o, i, a) {
        if (ul !== r && A(), t && d && z(E(i[2] === t ? s + (e.startX - e.x) : z() + t - i[1])), 
        o) {
          v.offset && k();
          var l = a[2] === o, c = l ? n + e.startY - e.y : v() + o - a[1], f = C(c);
          l && c !== f && (n += f - c), v(f);
        }
        (o || t) && vl();
      }, e.onEnable = function() {
        Dl(m, !d && "x"), Ll.addEventListener("refresh", M), $n(ps, "resize", M), v.smooth && (v.target.style.scrollBehavior = "auto", 
        v.smooth = z.smooth = !1), T.enable();
      }, e.onDisable = function() {
        Dl(m, !0), Vn(ps, "resize", M), Ll.removeEventListener("refresh", M), T.kill();
      }, e.lockAxis = !1 !== e.lockAxis, (t = new ds(e)).iOS = Fs, Fs && !v() && v(1), 
      Fs && fs.ticker.add(sn), l = t._dc, a = fs.to(t, {
        ease: "power4",
        paused: !0,
        inherit: !1,
        scrollX: d ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: kl(v, v(), (function() {
            return a.pause();
          }))
        },
        onUpdate: vl,
        onComplete: l.vars.onComplete
      }), t;
    };
    Ll.sort = function(e) {
      return Zn.sort(e || function(e, t) {
        return -1e6 * (e.vars.refreshPriority || 0) + e.start - (t.start + -1e6 * (t.vars.refreshPriority || 0));
      });
    }, Ll.observe = function(e) {
      return new ds(e);
    }, Ll.normalizeScroll = function(e) {
      if (void 0 === e) {
        return Os;
      }
      if (!0 === e && Os) {
        return Os.enable();
      }
      if (!1 === e) {
        return Os && Os.kill(), void (Os = e);
      }
      var t = e instanceof ds ? e : Gl(e);
      return Os && Os.target === t.target && Os.kill(), dn(t.target) && (Os = t), t;
    }, Ll.core = {
      _getVelocityProp: as,
      _inputObserver: Rl,
      _scrollers: $a,
      _proxies: Va,
      bridge: {
        ss: function() {
          Zs || nl("scrollStart"), Zs = Ks();
        },
        ref: function() {
          return xs;
        }
      }
    }, cn() && fs.registerPlugin(Ll);
    var Yl = o(348);
    Xr.registerPlugin(Ll);
    Xr.registerPlugin(Ll);
    const $l = ca.querySelector(".near"), Vl = () => {
      if (ia < 769) {
        return;
      }
      if (!$l) {
        return;
      }
      const e = $l.querySelector(".near-title");
      Yl({
        target: e,
        whitespace: !0,
        by: "chars"
      });
      const t = e.querySelector(".word");
      Xr.timeline().set(t, {
        flexGrow: 1
      }), Xr.timeline({
        scrollTrigger: {
          trigger: e,
          toggleActions: "restart pause reverse pause",
          start: "top 90%",
          end: "bottom 60%",
          scrub: 2
        }
      }).to(t, {
        flexGrow: 0,
        duration: 1
      });
    };
    Vl();
    Xr.registerPlugin(Ll);
    let Hl, Xl, jl, Wl, Ul, Kl, Ql, Zl, Jl, ec, tc, oc, rc, ic, ac;
    Xr.registerPlugin(Ll);
    Kl = ca.querySelector(".about"), Kl && (Hl = Kl.querySelector(".about__title"), 
    Xl = Kl.querySelector(".about__subtitle"), jl = Kl.querySelector(".about__text"), 
    Ql = Array.from(Kl.querySelectorAll(".about__item--up")), Zl = Array.from(Kl.querySelectorAll(".about__item--down")), 
    Jl = Kl.querySelectorAll(".about__list"), Wl = Kl.querySelector(".about__link"), 
    Ul = Kl.querySelector(".picture__img"), ic = Xr.timeline({
      paused: !0
    }).set(Ql, {
      autoAlpha: 0,
      y: "50"
    }), ac = Xr.timeline({
      paused: !0
    }).set(Zl, {
      autoAlpha: 0,
      y: "50"
    }), ec = Xr.timeline({
      paused: !0
    }).set(Xl, {
      autoAlpha: 0,
      y: "50"
    }), tc = Xr.timeline({
      paused: !0
    }).set(jl, {
      autoAlpha: 0,
      y: "50"
    }), oc = Xr.timeline({
      paused: !0
    }).set(Wl, {
      autoAlpha: 0,
      y: "50",
      duration: 1
    }), rc = Xr.timeline({
      paused: !0
    }).set(Ul, ia < 769 ? {
      autoAlpha: 0,
      y: 100,
      duration: 1
    } : {
      scale: .9,
      duration: 1
    }));
    const sc = ca.querySelector(".circle-cover__block--center");
    Xr.registerPlugin(Ll);
    const nc = ca.querySelector(".circle");
    let lc;
    const cc = new ji(".yard__slider", {
      init: !1,
      modules: [ Qi, Ji, Ui, oa ],
      autoplay: {
        delay: 3e3
      },
      effect: "fade",
      fadeEffect: {
        crossFade: !0
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
      speed: 500,
      on: {
        afterInit: e => {
          const t = e.pagination.bullets;
          lc = t.map(((e, o) => Xr.timeline({
            paused: !0
          }).set(t[o], {
            width: "" + (ia < 769 ? "0.63rem" : "1rem"),
            marginRight: 0
          }).to(t[o], {
            marginRight: "" + (ia < 769 ? "1.87rem" : "4.6rem"),
            duration: .01
          }).add("clear", "<").to(t[o], {
            width: "" + (ia < 769 ? "2.5rem" : "5.6rem"),
            marginRight: 0,
            duration: 3
          }).add("ready", "<"))), lc[e.realIndex].play();
        },
        realIndexChange: e => (e => {
          lc.forEach((e => {
            e.pause("clear");
          })), lc[e.realIndex].pause("ready");
        })(e),
        slideChangeTransitionEnd: e => (e => {
          lc[e.realIndex].play("ready");
        })(e)
      }
    });
    Xr.registerPlugin(Ll);
    const dc = ca.querySelector(".yard-touch"), fc = ca.querySelector(".aesthetics-touch"), uc = Array.from(ca.querySelectorAll(".aesthetics-touch")), pc = ca.querySelector(".choose__content");
    Xr.registerPlugin(Ll);
    const mc = ca.querySelector(".developer");
    Xr.registerPlugin(Ll);
    const hc = ca.querySelector(".aesthetics");
    Xr.registerPlugin(Ll);
    const gc = ca.querySelector(".choose"), yc = [ {
      tags: "country",
      elements: "geometry.fill",
      stylers: [ {
        color: "#8596ad"
      }, {
        zoom: 0,
        opacity: .8
      }, {
        zoom: 1,
        opacity: .8
      }, {
        zoom: 2,
        opacity: .8
      }, {
        zoom: 3,
        opacity: .8
      }, {
        zoom: 4,
        opacity: .8
      }, {
        zoom: 5,
        opacity: 1
      }, {
        zoom: 6,
        opacity: 1
      }, {
        zoom: 7,
        opacity: 1
      }, {
        zoom: 8,
        opacity: 1
      }, {
        zoom: 9,
        opacity: 1
      }, {
        zoom: 10,
        opacity: 1
      }, {
        zoom: 11,
        opacity: 1
      }, {
        zoom: 12,
        opacity: 1
      }, {
        zoom: 13,
        opacity: 1
      }, {
        zoom: 14,
        opacity: 1
      }, {
        zoom: 15,
        opacity: 1
      }, {
        zoom: 16,
        opacity: 1
      }, {
        zoom: 17,
        opacity: 1
      }, {
        zoom: 18,
        opacity: 1
      }, {
        zoom: 19,
        opacity: 1
      }, {
        zoom: 20,
        opacity: 1
      }, {
        zoom: 21,
        opacity: 1
      } ]
    }, {
      tags: "country",
      elements: "geometry.outline",
      stylers: [ {
        color: "#c3cbd5"
      }, {
        zoom: 0,
        opacity: .15
      }, {
        zoom: 1,
        opacity: .15
      }, {
        zoom: 2,
        opacity: .15
      }, {
        zoom: 3,
        opacity: .15
      }, {
        zoom: 4,
        opacity: .15
      }, {
        zoom: 5,
        opacity: .15
      }, {
        zoom: 6,
        opacity: .25
      }, {
        zoom: 7,
        opacity: .5
      }, {
        zoom: 8,
        opacity: .47
      }, {
        zoom: 9,
        opacity: .44
      }, {
        zoom: 10,
        opacity: .41
      }, {
        zoom: 11,
        opacity: .38
      }, {
        zoom: 12,
        opacity: .35
      }, {
        zoom: 13,
        opacity: .33
      }, {
        zoom: 14,
        opacity: .3
      }, {
        zoom: 15,
        opacity: .28
      }, {
        zoom: 16,
        opacity: .25
      }, {
        zoom: 17,
        opacity: .25
      }, {
        zoom: 18,
        opacity: .25
      }, {
        zoom: 19,
        opacity: .25
      }, {
        zoom: 20,
        opacity: .25
      }, {
        zoom: 21,
        opacity: .25
      } ]
    }, {
      tags: "region",
      elements: "geometry.fill",
      stylers: [ {
        zoom: 0,
        color: "#a3b0c2",
        opacity: .5
      }, {
        zoom: 1,
        color: "#a3b0c2",
        opacity: .5
      }, {
        zoom: 2,
        color: "#a3b0c2",
        opacity: .5
      }, {
        zoom: 3,
        color: "#a3b0c2",
        opacity: .5
      }, {
        zoom: 4,
        color: "#a3b0c2",
        opacity: .5
      }, {
        zoom: 5,
        color: "#a3b0c2",
        opacity: .5
      }, {
        zoom: 6,
        color: "#a3b0c2",
        opacity: 1
      }, {
        zoom: 7,
        color: "#a3b0c2",
        opacity: 1
      }, {
        zoom: 8,
        color: "#8596ad",
        opacity: 1
      }, {
        zoom: 9,
        color: "#8596ad",
        opacity: 1
      }, {
        zoom: 10,
        color: "#8596ad",
        opacity: 1
      }, {
        zoom: 11,
        color: "#8596ad",
        opacity: 1
      }, {
        zoom: 12,
        color: "#8596ad",
        opacity: 1
      }, {
        zoom: 13,
        color: "#8596ad",
        opacity: 1
      }, {
        zoom: 14,
        color: "#8596ad",
        opacity: 1
      }, {
        zoom: 15,
        color: "#8596ad",
        opacity: 1
      }, {
        zoom: 16,
        color: "#8596ad",
        opacity: 1
      }, {
        zoom: 17,
        color: "#8596ad",
        opacity: 1
      }, {
        zoom: 18,
        color: "#8596ad",
        opacity: 1
      }, {
        zoom: 19,
        color: "#8596ad",
        opacity: 1
      }, {
        zoom: 20,
        color: "#8596ad",
        opacity: 1
      }, {
        zoom: 21,
        color: "#8596ad",
        opacity: 1
      } ]
    }, {
      tags: "region",
      elements: "geometry.outline",
      stylers: [ {
        color: "#c3cbd5"
      }, {
        zoom: 0,
        opacity: .15
      }, {
        zoom: 1,
        opacity: .15
      }, {
        zoom: 2,
        opacity: .15
      }, {
        zoom: 3,
        opacity: .15
      }, {
        zoom: 4,
        opacity: .15
      }, {
        zoom: 5,
        opacity: .15
      }, {
        zoom: 6,
        opacity: .25
      }, {
        zoom: 7,
        opacity: .5
      }, {
        zoom: 8,
        opacity: .47
      }, {
        zoom: 9,
        opacity: .44
      }, {
        zoom: 10,
        opacity: .41
      }, {
        zoom: 11,
        opacity: .38
      }, {
        zoom: 12,
        opacity: .35
      }, {
        zoom: 13,
        opacity: .33
      }, {
        zoom: 14,
        opacity: .3
      }, {
        zoom: 15,
        opacity: .28
      }, {
        zoom: 16,
        opacity: .25
      }, {
        zoom: 17,
        opacity: .25
      }, {
        zoom: 18,
        opacity: .25
      }, {
        zoom: 19,
        opacity: .25
      }, {
        zoom: 20,
        opacity: .25
      }, {
        zoom: 21,
        opacity: .25
      } ]
    }, {
      tags: {
        any: "admin",
        none: [ "country", "region", "locality", "district", "address" ]
      },
      elements: "geometry.fill",
      stylers: [ {
        color: "#8596ad"
      }, {
        zoom: 0,
        opacity: .5
      }, {
        zoom: 1,
        opacity: .5
      }, {
        zoom: 2,
        opacity: .5
      }, {
        zoom: 3,
        opacity: .5
      }, {
        zoom: 4,
        opacity: .5
      }, {
        zoom: 5,
        opacity: .5
      }, {
        zoom: 6,
        opacity: 1
      }, {
        zoom: 7,
        opacity: 1
      }, {
        zoom: 8,
        opacity: 1
      }, {
        zoom: 9,
        opacity: 1
      }, {
        zoom: 10,
        opacity: 1
      }, {
        zoom: 11,
        opacity: 1
      }, {
        zoom: 12,
        opacity: 1
      }, {
        zoom: 13,
        opacity: 1
      }, {
        zoom: 14,
        opacity: 1
      }, {
        zoom: 15,
        opacity: 1
      }, {
        zoom: 16,
        opacity: 1
      }, {
        zoom: 17,
        opacity: 1
      }, {
        zoom: 18,
        opacity: 1
      }, {
        zoom: 19,
        opacity: 1
      }, {
        zoom: 20,
        opacity: 1
      }, {
        zoom: 21,
        opacity: 1
      } ]
    }, {
      tags: {
        any: "admin",
        none: [ "country", "region", "locality", "district", "address" ]
      },
      elements: "geometry.outline",
      stylers: [ {
        color: "#c3cbd5"
      }, {
        zoom: 0,
        opacity: .15
      }, {
        zoom: 1,
        opacity: .15
      }, {
        zoom: 2,
        opacity: .15
      }, {
        zoom: 3,
        opacity: .15
      }, {
        zoom: 4,
        opacity: .15
      }, {
        zoom: 5,
        opacity: .15
      }, {
        zoom: 6,
        opacity: .25
      }, {
        zoom: 7,
        opacity: .5
      }, {
        zoom: 8,
        opacity: .47
      }, {
        zoom: 9,
        opacity: .44
      }, {
        zoom: 10,
        opacity: .41
      }, {
        zoom: 11,
        opacity: .38
      }, {
        zoom: 12,
        opacity: .35
      }, {
        zoom: 13,
        opacity: .33
      }, {
        zoom: 14,
        opacity: .3
      }, {
        zoom: 15,
        opacity: .28
      }, {
        zoom: 16,
        opacity: .25
      }, {
        zoom: 17,
        opacity: .25
      }, {
        zoom: 18,
        opacity: .25
      }, {
        zoom: 19,
        opacity: .25
      }, {
        zoom: 20,
        opacity: .25
      }, {
        zoom: 21,
        opacity: .25
      } ]
    }, {
      tags: {
        any: "landcover",
        none: "vegetation"
      },
      stylers: [ {
        hue: "#d9dde3"
      } ]
    }, {
      tags: "vegetation",
      elements: "geometry",
      stylers: [ {
        zoom: 0,
        color: "#bcc3cd",
        opacity: .1
      }, {
        zoom: 1,
        color: "#bcc3cd",
        opacity: .1
      }, {
        zoom: 2,
        color: "#bcc3cd",
        opacity: .1
      }, {
        zoom: 3,
        color: "#bcc3cd",
        opacity: .1
      }, {
        zoom: 4,
        color: "#bcc3cd",
        opacity: .1
      }, {
        zoom: 5,
        color: "#bcc3cd",
        opacity: .1
      }, {
        zoom: 6,
        color: "#bcc3cd",
        opacity: .2
      }, {
        zoom: 7,
        color: "#d9dde3",
        opacity: .3
      }, {
        zoom: 8,
        color: "#d9dde3",
        opacity: .4
      }, {
        zoom: 9,
        color: "#d9dde3",
        opacity: .6
      }, {
        zoom: 10,
        color: "#d9dde3",
        opacity: .8
      }, {
        zoom: 11,
        color: "#d9dde3",
        opacity: 1
      }, {
        zoom: 12,
        color: "#d9dde3",
        opacity: 1
      }, {
        zoom: 13,
        color: "#d9dde3",
        opacity: 1
      }, {
        zoom: 14,
        color: "#dfe2e7",
        opacity: 1
      }, {
        zoom: 15,
        color: "#e5e7eb",
        opacity: 1
      }, {
        zoom: 16,
        color: "#e5e7eb",
        opacity: 1
      }, {
        zoom: 17,
        color: "#e5e7eb",
        opacity: 1
      }, {
        zoom: 18,
        color: "#e5e7eb",
        opacity: 1
      }, {
        zoom: 19,
        color: "#e5e7eb",
        opacity: 1
      }, {
        zoom: 20,
        color: "#e5e7eb",
        opacity: 1
      }, {
        zoom: 21,
        color: "#e5e7eb",
        opacity: 1
      } ]
    }, {
      tags: "park",
      elements: "geometry",
      stylers: [ {
        zoom: 0,
        color: "#d9dde3",
        opacity: .1
      }, {
        zoom: 1,
        color: "#d9dde3",
        opacity: .1
      }, {
        zoom: 2,
        color: "#d9dde3",
        opacity: .1
      }, {
        zoom: 3,
        color: "#d9dde3",
        opacity: .1
      }, {
        zoom: 4,
        color: "#d9dde3",
        opacity: .1
      }, {
        zoom: 5,
        color: "#d9dde3",
        opacity: .1
      }, {
        zoom: 6,
        color: "#d9dde3",
        opacity: .2
      }, {
        zoom: 7,
        color: "#d9dde3",
        opacity: .3
      }, {
        zoom: 8,
        color: "#d9dde3",
        opacity: .4
      }, {
        zoom: 9,
        color: "#d9dde3",
        opacity: .6
      }, {
        zoom: 10,
        color: "#d9dde3",
        opacity: .8
      }, {
        zoom: 11,
        color: "#d9dde3",
        opacity: 1
      }, {
        zoom: 12,
        color: "#d9dde3",
        opacity: 1
      }, {
        zoom: 13,
        color: "#d9dde3",
        opacity: 1
      }, {
        zoom: 14,
        color: "#dfe2e7",
        opacity: 1
      }, {
        zoom: 15,
        color: "#e5e7eb",
        opacity: 1
      }, {
        zoom: 16,
        color: "#e5e7eb",
        opacity: .9
      }, {
        zoom: 17,
        color: "#e5e7eb",
        opacity: .8
      }, {
        zoom: 18,
        color: "#e5e7eb",
        opacity: .7
      }, {
        zoom: 19,
        color: "#e5e7eb",
        opacity: .7
      }, {
        zoom: 20,
        color: "#e5e7eb",
        opacity: .7
      }, {
        zoom: 21,
        color: "#e5e7eb",
        opacity: .7
      } ]
    }, {
      tags: "national_park",
      elements: "geometry",
      stylers: [ {
        zoom: 0,
        color: "#d9dde3",
        opacity: .1
      }, {
        zoom: 1,
        color: "#d9dde3",
        opacity: .1
      }, {
        zoom: 2,
        color: "#d9dde3",
        opacity: .1
      }, {
        zoom: 3,
        color: "#d9dde3",
        opacity: .1
      }, {
        zoom: 4,
        color: "#d9dde3",
        opacity: .1
      }, {
        zoom: 5,
        color: "#d9dde3",
        opacity: .1
      }, {
        zoom: 6,
        color: "#d9dde3",
        opacity: .2
      }, {
        zoom: 7,
        color: "#d9dde3",
        opacity: .3
      }, {
        zoom: 8,
        color: "#d9dde3",
        opacity: .4
      }, {
        zoom: 9,
        color: "#d9dde3",
        opacity: .6
      }, {
        zoom: 10,
        color: "#d9dde3",
        opacity: .8
      }, {
        zoom: 11,
        color: "#d9dde3",
        opacity: 1
      }, {
        zoom: 12,
        color: "#d9dde3",
        opacity: 1
      }, {
        zoom: 13,
        color: "#d9dde3",
        opacity: 1
      }, {
        zoom: 14,
        color: "#dfe2e7",
        opacity: 1
      }, {
        zoom: 15,
        color: "#e5e7eb",
        opacity: 1
      }, {
        zoom: 16,
        color: "#e5e7eb",
        opacity: .7
      }, {
        zoom: 17,
        color: "#e5e7eb",
        opacity: .7
      }, {
        zoom: 18,
        color: "#e5e7eb",
        opacity: .7
      }, {
        zoom: 19,
        color: "#e5e7eb",
        opacity: .7
      }, {
        zoom: 20,
        color: "#e5e7eb",
        opacity: .7
      }, {
        zoom: 21,
        color: "#e5e7eb",
        opacity: .7
      } ]
    }, {
      tags: "cemetery",
      elements: "geometry",
      stylers: [ {
        zoom: 0,
        color: "#d9dde3"
      }, {
        zoom: 1,
        color: "#d9dde3"
      }, {
        zoom: 2,
        color: "#d9dde3"
      }, {
        zoom: 3,
        color: "#d9dde3"
      }, {
        zoom: 4,
        color: "#d9dde3"
      }, {
        zoom: 5,
        color: "#d9dde3"
      }, {
        zoom: 6,
        color: "#d9dde3"
      }, {
        zoom: 7,
        color: "#d9dde3"
      }, {
        zoom: 8,
        color: "#d9dde3"
      }, {
        zoom: 9,
        color: "#d9dde3"
      }, {
        zoom: 10,
        color: "#d9dde3"
      }, {
        zoom: 11,
        color: "#d9dde3"
      }, {
        zoom: 12,
        color: "#d9dde3"
      }, {
        zoom: 13,
        color: "#d9dde3"
      }, {
        zoom: 14,
        color: "#dfe2e7"
      }, {
        zoom: 15,
        color: "#e5e7eb"
      }, {
        zoom: 16,
        color: "#e5e7eb"
      }, {
        zoom: 17,
        color: "#e5e7eb"
      }, {
        zoom: 18,
        color: "#e5e7eb"
      }, {
        zoom: 19,
        color: "#e5e7eb"
      }, {
        zoom: 20,
        color: "#e5e7eb"
      }, {
        zoom: 21,
        color: "#e5e7eb"
      } ]
    }, {
      tags: "sports_ground",
      elements: "geometry",
      stylers: [ {
        zoom: 0,
        color: "#cad0d8",
        opacity: 0
      }, {
        zoom: 1,
        color: "#cad0d8",
        opacity: 0
      }, {
        zoom: 2,
        color: "#cad0d8",
        opacity: 0
      }, {
        zoom: 3,
        color: "#cad0d8",
        opacity: 0
      }, {
        zoom: 4,
        color: "#cad0d8",
        opacity: 0
      }, {
        zoom: 5,
        color: "#cad0d8",
        opacity: 0
      }, {
        zoom: 6,
        color: "#cad0d8",
        opacity: 0
      }, {
        zoom: 7,
        color: "#cad0d8",
        opacity: 0
      }, {
        zoom: 8,
        color: "#cad0d8",
        opacity: 0
      }, {
        zoom: 9,
        color: "#cad0d8",
        opacity: 0
      }, {
        zoom: 10,
        color: "#cad0d8",
        opacity: 0
      }, {
        zoom: 11,
        color: "#cad0d8",
        opacity: 0
      }, {
        zoom: 12,
        color: "#cad0d8",
        opacity: 0
      }, {
        zoom: 13,
        color: "#cad0d8",
        opacity: 0
      }, {
        zoom: 14,
        color: "#d0d5dc",
        opacity: 0
      }, {
        zoom: 15,
        color: "#d6dbe1",
        opacity: .5
      }, {
        zoom: 16,
        color: "#d7dce2",
        opacity: 1
      }, {
        zoom: 17,
        color: "#d8dde2",
        opacity: 1
      }, {
        zoom: 18,
        color: "#d9dde3",
        opacity: 1
      }, {
        zoom: 19,
        color: "#dadee4",
        opacity: 1
      }, {
        zoom: 20,
        color: "#dbdfe4",
        opacity: 1
      }, {
        zoom: 21,
        color: "#dce0e5",
        opacity: 1
      } ]
    }, {
      tags: "terrain",
      elements: "geometry",
      stylers: [ {
        hue: "#e7eaee"
      }, {
        zoom: 0,
        opacity: .3
      }, {
        zoom: 1,
        opacity: .3
      }, {
        zoom: 2,
        opacity: .3
      }, {
        zoom: 3,
        opacity: .3
      }, {
        zoom: 4,
        opacity: .3
      }, {
        zoom: 5,
        opacity: .35
      }, {
        zoom: 6,
        opacity: .4
      }, {
        zoom: 7,
        opacity: .6
      }, {
        zoom: 8,
        opacity: .8
      }, {
        zoom: 9,
        opacity: .9
      }, {
        zoom: 10,
        opacity: 1
      }, {
        zoom: 11,
        opacity: 1
      }, {
        zoom: 12,
        opacity: 1
      }, {
        zoom: 13,
        opacity: 1
      }, {
        zoom: 14,
        opacity: 1
      }, {
        zoom: 15,
        opacity: 1
      }, {
        zoom: 16,
        opacity: 1
      }, {
        zoom: 17,
        opacity: 1
      }, {
        zoom: 18,
        opacity: 1
      }, {
        zoom: 19,
        opacity: 1
      }, {
        zoom: 20,
        opacity: 1
      }, {
        zoom: 21,
        opacity: 1
      } ]
    }, {
      tags: "geographic_line",
      elements: "geometry",
      stylers: [ {
        color: "#708299"
      } ]
    }, {
      tags: "land",
      elements: "geometry",
      stylers: [ {
        zoom: 0,
        color: "#e7ebef"
      }, {
        zoom: 1,
        color: "#e7ebef"
      }, {
        zoom: 2,
        color: "#e7ebef"
      }, {
        zoom: 3,
        color: "#e7ebef"
      }, {
        zoom: 4,
        color: "#e7ebef"
      }, {
        zoom: 5,
        color: "#eaedf1"
      }, {
        zoom: 6,
        color: "#edf0f3"
      }, {
        zoom: 7,
        color: "#f0f2f5"
      }, {
        zoom: 8,
        color: "#f3f5f7"
      }, {
        zoom: 9,
        color: "#f3f5f7"
      }, {
        zoom: 10,
        color: "#f3f5f7"
      }, {
        zoom: 11,
        color: "#f3f5f7"
      }, {
        zoom: 12,
        color: "#f3f5f7"
      }, {
        zoom: 13,
        color: "#f3f5f7"
      }, {
        zoom: 14,
        color: "#f6f7f9"
      }, {
        zoom: 15,
        color: "#f9fafb"
      }, {
        zoom: 16,
        color: "#f9fafb"
      }, {
        zoom: 17,
        color: "#fafbfc"
      }, {
        zoom: 18,
        color: "#fafbfc"
      }, {
        zoom: 19,
        color: "#fbfbfc"
      }, {
        zoom: 20,
        color: "#fbfcfd"
      }, {
        zoom: 21,
        color: "#fcfcfd"
      } ]
    }, {
      tags: "residential",
      elements: "geometry",
      stylers: [ {
        zoom: 0,
        color: "#e7eaee",
        opacity: .5
      }, {
        zoom: 1,
        color: "#e7eaee",
        opacity: .5
      }, {
        zoom: 2,
        color: "#e7eaee",
        opacity: .5
      }, {
        zoom: 3,
        color: "#e7eaee",
        opacity: .5
      }, {
        zoom: 4,
        color: "#e7eaee",
        opacity: .5
      }, {
        zoom: 5,
        color: "#e7eaee",
        opacity: .5
      }, {
        zoom: 6,
        color: "#e7eaee",
        opacity: .5
      }, {
        zoom: 7,
        color: "#e7eaee",
        opacity: .5
      }, {
        zoom: 8,
        color: "#e7eaee",
        opacity: .5
      }, {
        zoom: 9,
        color: "#e7eaee",
        opacity: .5
      }, {
        zoom: 10,
        color: "#e7eaee",
        opacity: .5
      }, {
        zoom: 11,
        color: "#e7eaee",
        opacity: .5
      }, {
        zoom: 12,
        color: "#e7eaee",
        opacity: .5
      }, {
        zoom: 13,
        color: "#e7eaee",
        opacity: 1
      }, {
        zoom: 14,
        color: "#edeff2",
        opacity: 1
      }, {
        zoom: 15,
        color: "#f3f5f7",
        opacity: 1
      }, {
        zoom: 16,
        color: "#f4f6f8",
        opacity: 1
      }, {
        zoom: 17,
        color: "#f5f7f8",
        opacity: 1
      }, {
        zoom: 18,
        color: "#f6f7f9",
        opacity: 1
      }, {
        zoom: 19,
        color: "#f7f8fa",
        opacity: 1
      }, {
        zoom: 20,
        color: "#f8f9fa",
        opacity: 1
      }, {
        zoom: 21,
        color: "#f9fafb",
        opacity: 1
      } ]
    }, {
      tags: "locality",
      elements: "geometry",
      stylers: [ {
        zoom: 0,
        color: "#e7eaee"
      }, {
        zoom: 1,
        color: "#e7eaee"
      }, {
        zoom: 2,
        color: "#e7eaee"
      }, {
        zoom: 3,
        color: "#e7eaee"
      }, {
        zoom: 4,
        color: "#e7eaee"
      }, {
        zoom: 5,
        color: "#e7eaee"
      }, {
        zoom: 6,
        color: "#e7eaee"
      }, {
        zoom: 7,
        color: "#e7eaee"
      }, {
        zoom: 8,
        color: "#e7eaee"
      }, {
        zoom: 9,
        color: "#e7eaee"
      }, {
        zoom: 10,
        color: "#e7eaee"
      }, {
        zoom: 11,
        color: "#e7eaee"
      }, {
        zoom: 12,
        color: "#e7eaee"
      }, {
        zoom: 13,
        color: "#e7eaee"
      }, {
        zoom: 14,
        color: "#edeff2"
      }, {
        zoom: 15,
        color: "#f3f5f7"
      }, {
        zoom: 16,
        color: "#f4f6f8"
      }, {
        zoom: 17,
        color: "#f5f7f8"
      }, {
        zoom: 18,
        color: "#f6f7f9"
      }, {
        zoom: 19,
        color: "#f7f8fa"
      }, {
        zoom: 20,
        color: "#f8f9fa"
      }, {
        zoom: 21,
        color: "#f9fafb"
      } ]
    }, {
      tags: {
        any: "structure",
        none: [ "building", "fence" ]
      },
      elements: "geometry",
      stylers: [ {
        opacity: .9
      }, {
        zoom: 0,
        color: "#e7eaee"
      }, {
        zoom: 1,
        color: "#e7eaee"
      }, {
        zoom: 2,
        color: "#e7eaee"
      }, {
        zoom: 3,
        color: "#e7eaee"
      }, {
        zoom: 4,
        color: "#e7eaee"
      }, {
        zoom: 5,
        color: "#e7eaee"
      }, {
        zoom: 6,
        color: "#e7eaee"
      }, {
        zoom: 7,
        color: "#e7eaee"
      }, {
        zoom: 8,
        color: "#e7eaee"
      }, {
        zoom: 9,
        color: "#e7eaee"
      }, {
        zoom: 10,
        color: "#e7eaee"
      }, {
        zoom: 11,
        color: "#e7eaee"
      }, {
        zoom: 12,
        color: "#e7eaee"
      }, {
        zoom: 13,
        color: "#e7eaee"
      }, {
        zoom: 14,
        color: "#edeff2"
      }, {
        zoom: 15,
        color: "#f3f5f7"
      }, {
        zoom: 16,
        color: "#f4f6f8"
      }, {
        zoom: 17,
        color: "#f5f7f8"
      }, {
        zoom: 18,
        color: "#f6f7f9"
      }, {
        zoom: 19,
        color: "#f7f8fa"
      }, {
        zoom: 20,
        color: "#f8f9fa"
      }, {
        zoom: 21,
        color: "#f9fafb"
      } ]
    }, {
      tags: "building",
      elements: "geometry.fill",
      stylers: [ {
        color: "#dbe0e6"
      }, {
        zoom: 0,
        opacity: .7
      }, {
        zoom: 1,
        opacity: .7
      }, {
        zoom: 2,
        opacity: .7
      }, {
        zoom: 3,
        opacity: .7
      }, {
        zoom: 4,
        opacity: .7
      }, {
        zoom: 5,
        opacity: .7
      }, {
        zoom: 6,
        opacity: .7
      }, {
        zoom: 7,
        opacity: .7
      }, {
        zoom: 8,
        opacity: .7
      }, {
        zoom: 9,
        opacity: .7
      }, {
        zoom: 10,
        opacity: .7
      }, {
        zoom: 11,
        opacity: .7
      }, {
        zoom: 12,
        opacity: .7
      }, {
        zoom: 13,
        opacity: .7
      }, {
        zoom: 14,
        opacity: .7
      }, {
        zoom: 15,
        opacity: .7
      }, {
        zoom: 16,
        opacity: .9
      }, {
        zoom: 17,
        opacity: .6
      }, {
        zoom: 18,
        opacity: .6
      }, {
        zoom: 19,
        opacity: .6
      }, {
        zoom: 20,
        opacity: .6
      }, {
        zoom: 21,
        opacity: .6
      } ]
    }, {
      tags: "building",
      elements: "geometry.outline",
      stylers: [ {
        color: "#c2cad6"
      }, {
        zoom: 0,
        opacity: .5
      }, {
        zoom: 1,
        opacity: .5
      }, {
        zoom: 2,
        opacity: .5
      }, {
        zoom: 3,
        opacity: .5
      }, {
        zoom: 4,
        opacity: .5
      }, {
        zoom: 5,
        opacity: .5
      }, {
        zoom: 6,
        opacity: .5
      }, {
        zoom: 7,
        opacity: .5
      }, {
        zoom: 8,
        opacity: .5
      }, {
        zoom: 9,
        opacity: .5
      }, {
        zoom: 10,
        opacity: .5
      }, {
        zoom: 11,
        opacity: .5
      }, {
        zoom: 12,
        opacity: .5
      }, {
        zoom: 13,
        opacity: .5
      }, {
        zoom: 14,
        opacity: .5
      }, {
        zoom: 15,
        opacity: .5
      }, {
        zoom: 16,
        opacity: .5
      }, {
        zoom: 17,
        opacity: 1
      }, {
        zoom: 18,
        opacity: 1
      }, {
        zoom: 19,
        opacity: 1
      }, {
        zoom: 20,
        opacity: 1
      }, {
        zoom: 21,
        opacity: 1
      } ]
    }, {
      tags: {
        any: "urban_area",
        none: [ "residential", "industrial", "cemetery", "park", "medical", "sports_ground", "beach", "construction_site" ]
      },
      elements: "geometry",
      stylers: [ {
        zoom: 0,
        color: "#dbe0e6",
        opacity: 1
      }, {
        zoom: 1,
        color: "#dbe0e6",
        opacity: 1
      }, {
        zoom: 2,
        color: "#dbe0e6",
        opacity: 1
      }, {
        zoom: 3,
        color: "#dbe0e6",
        opacity: 1
      }, {
        zoom: 4,
        color: "#dbe0e6",
        opacity: 1
      }, {
        zoom: 5,
        color: "#dbe0e6",
        opacity: 1
      }, {
        zoom: 6,
        color: "#dbe0e6",
        opacity: 1
      }, {
        zoom: 7,
        color: "#dbe0e6",
        opacity: 1
      }, {
        zoom: 8,
        color: "#dbe0e6",
        opacity: 1
      }, {
        zoom: 9,
        color: "#dbe0e6",
        opacity: 1
      }, {
        zoom: 10,
        color: "#dbe0e6",
        opacity: 1
      }, {
        zoom: 11,
        color: "#dbe0e6",
        opacity: 1
      }, {
        zoom: 12,
        color: "#dbe0e6",
        opacity: 1
      }, {
        zoom: 13,
        color: "#dbe0e6",
        opacity: 1
      }, {
        zoom: 14,
        color: "#e2e6eb",
        opacity: 1
      }, {
        zoom: 15,
        color: "#eaedf0",
        opacity: 1
      }, {
        zoom: 16,
        color: "#f1f3f5",
        opacity: .67
      }, {
        zoom: 17,
        color: "#f9fafb",
        opacity: .33
      }, {
        zoom: 18,
        color: "#f9fafb",
        opacity: 0
      }, {
        zoom: 19,
        color: "#f9fafb",
        opacity: 0
      }, {
        zoom: 20,
        color: "#f9fafb",
        opacity: 0
      }, {
        zoom: 21,
        color: "#f9fafb",
        opacity: 0
      } ]
    }, {
      tags: "poi",
      elements: "label.icon",
      stylers: [ {
        color: "#798aa0"
      }, {
        "secondary-color": "#ffffff"
      }, {
        "tertiary-color": "#ffffff"
      } ]
    }, {
      tags: "poi",
      elements: "label.text.fill",
      stylers: [ {
        color: "#3f4b5a"
      } ]
    }, {
      tags: "poi",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "outdoor",
      elements: "label.icon",
      stylers: [ {
        color: "#798aa0"
      }, {
        "secondary-color": "#ffffff"
      }, {
        "tertiary-color": "#ffffff"
      } ]
    }, {
      tags: "outdoor",
      elements: "label.text.fill",
      stylers: [ {
        color: "#3f4b5a"
      } ]
    }, {
      tags: "outdoor",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "park",
      elements: "label.icon",
      stylers: [ {
        color: "#798aa0"
      }, {
        "secondary-color": "#ffffff"
      }, {
        "tertiary-color": "#ffffff"
      } ]
    }, {
      tags: "park",
      elements: "label.text.fill",
      stylers: [ {
        color: "#3f4b5a"
      } ]
    }, {
      tags: "park",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "cemetery",
      elements: "label.icon",
      stylers: [ {
        color: "#798aa0"
      }, {
        "secondary-color": "#ffffff"
      }, {
        "tertiary-color": "#ffffff"
      } ]
    }, {
      tags: "cemetery",
      elements: "label.text.fill",
      stylers: [ {
        color: "#3f4b5a"
      } ]
    }, {
      tags: "cemetery",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "beach",
      elements: "label.icon",
      stylers: [ {
        color: "#798aa0"
      }, {
        "secondary-color": "#ffffff"
      }, {
        "tertiary-color": "#ffffff"
      } ]
    }, {
      tags: "beach",
      elements: "label.text.fill",
      stylers: [ {
        color: "#3f4b5a"
      } ]
    }, {
      tags: "beach",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "medical",
      elements: "label.icon",
      stylers: [ {
        color: "#798aa0"
      }, {
        "secondary-color": "#ffffff"
      }, {
        "tertiary-color": "#ffffff"
      } ]
    }, {
      tags: "medical",
      elements: "label.text.fill",
      stylers: [ {
        color: "#3f4b5a"
      } ]
    }, {
      tags: "medical",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "shopping",
      elements: "label.icon",
      stylers: [ {
        color: "#798aa0"
      }, {
        "secondary-color": "#ffffff"
      }, {
        "tertiary-color": "#ffffff"
      } ]
    }, {
      tags: "shopping",
      elements: "label.text.fill",
      stylers: [ {
        color: "#3f4b5a"
      } ]
    }, {
      tags: "shopping",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "commercial_services",
      elements: "label.icon",
      stylers: [ {
        color: "#798aa0"
      }, {
        "secondary-color": "#ffffff"
      }, {
        "tertiary-color": "#ffffff"
      } ]
    }, {
      tags: "commercial_services",
      elements: "label.text.fill",
      stylers: [ {
        color: "#3f4b5a"
      } ]
    }, {
      tags: "commercial_services",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "food_and_drink",
      elements: "label.icon",
      stylers: [ {
        color: "#798aa0"
      }, {
        "secondary-color": "#ffffff"
      }, {
        "tertiary-color": "#ffffff"
      } ]
    }, {
      tags: "food_and_drink",
      elements: "label.text.fill",
      stylers: [ {
        color: "#3f4b5a"
      } ]
    }, {
      tags: "food_and_drink",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "road",
      elements: "label.icon",
      types: "point",
      stylers: [ {
        color: "#798aa0"
      }, {
        "secondary-color": "#ffffff"
      }, {
        "tertiary-color": "#ffffff"
      } ]
    }, {
      tags: "road",
      elements: "label.text.fill",
      types: "point",
      stylers: [ {
        color: "#ffffff"
      } ]
    }, {
      tags: "entrance",
      elements: "label.icon",
      stylers: [ {
        color: "#798aa0"
      }, {
        "secondary-color": "#ffffff"
      }, {
        hue: "#798aa0"
      } ]
    }, {
      tags: "locality",
      elements: "label.icon",
      stylers: [ {
        color: "#798aa0"
      }, {
        "secondary-color": "#ffffff"
      } ]
    }, {
      tags: "country",
      elements: "label.text.fill",
      stylers: [ {
        opacity: .8
      }, {
        color: "#5f7086"
      } ]
    }, {
      tags: "country",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "region",
      elements: "label.text.fill",
      stylers: [ {
        color: "#5f7086"
      }, {
        opacity: .8
      } ]
    }, {
      tags: "region",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "district",
      elements: "label.text.fill",
      stylers: [ {
        color: "#5f7086"
      }, {
        opacity: .8
      } ]
    }, {
      tags: "district",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: {
        any: "admin",
        none: [ "country", "region", "locality", "district", "address" ]
      },
      elements: "label.text.fill",
      stylers: [ {
        color: "#5f7086"
      } ]
    }, {
      tags: {
        any: "admin",
        none: [ "country", "region", "locality", "district", "address" ]
      },
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "locality",
      elements: "label.text.fill",
      stylers: [ {
        zoom: 0,
        color: "#3f4b5a"
      }, {
        zoom: 1,
        color: "#3f4b5a"
      }, {
        zoom: 2,
        color: "#3f4b5a"
      }, {
        zoom: 3,
        color: "#3f4b5a"
      }, {
        zoom: 4,
        color: "#3f4b5a"
      }, {
        zoom: 5,
        color: "#3d4958"
      }, {
        zoom: 6,
        color: "#3b4755"
      }, {
        zoom: 7,
        color: "#3a4553"
      }, {
        zoom: 8,
        color: "#384350"
      }, {
        zoom: 9,
        color: "#36414e"
      }, {
        zoom: 10,
        color: "#343f4b"
      }, {
        zoom: 11,
        color: "#343f4b"
      }, {
        zoom: 12,
        color: "#343f4b"
      }, {
        zoom: 13,
        color: "#343f4b"
      }, {
        zoom: 14,
        color: "#343f4b"
      }, {
        zoom: 15,
        color: "#343f4b"
      }, {
        zoom: 16,
        color: "#343f4b"
      }, {
        zoom: 17,
        color: "#343f4b"
      }, {
        zoom: 18,
        color: "#343f4b"
      }, {
        zoom: 19,
        color: "#343f4b"
      }, {
        zoom: 20,
        color: "#343f4b"
      }, {
        zoom: 21,
        color: "#343f4b"
      } ]
    }, {
      tags: "locality",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "road",
      elements: "label.text.fill",
      types: "polyline",
      stylers: [ {
        color: "#4a5768"
      } ]
    }, {
      tags: "road",
      elements: "label.text.outline",
      types: "polyline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "road",
      elements: "geometry.fill.pattern",
      types: "polyline",
      stylers: [ {
        scale: 1
      }, {
        color: "#798aa0"
      } ]
    }, {
      tags: "road",
      elements: "label.text.fill",
      types: "point",
      stylers: [ {
        color: "#ffffff"
      } ]
    }, {
      tags: "structure",
      elements: "label.text.fill",
      stylers: [ {
        color: "#556477"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "structure",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "address",
      elements: "label.text.fill",
      stylers: [ {
        color: "#556477"
      }, {
        zoom: 0,
        opacity: .9
      }, {
        zoom: 1,
        opacity: .9
      }, {
        zoom: 2,
        opacity: .9
      }, {
        zoom: 3,
        opacity: .9
      }, {
        zoom: 4,
        opacity: .9
      }, {
        zoom: 5,
        opacity: .9
      }, {
        zoom: 6,
        opacity: .9
      }, {
        zoom: 7,
        opacity: .9
      }, {
        zoom: 8,
        opacity: .9
      }, {
        zoom: 9,
        opacity: .9
      }, {
        zoom: 10,
        opacity: .9
      }, {
        zoom: 11,
        opacity: .9
      }, {
        zoom: 12,
        opacity: .9
      }, {
        zoom: 13,
        opacity: .9
      }, {
        zoom: 14,
        opacity: .9
      }, {
        zoom: 15,
        opacity: .9
      }, {
        zoom: 16,
        opacity: .9
      }, {
        zoom: 17,
        opacity: 1
      }, {
        zoom: 18,
        opacity: 1
      }, {
        zoom: 19,
        opacity: 1
      }, {
        zoom: 20,
        opacity: 1
      }, {
        zoom: 21,
        opacity: 1
      } ]
    }, {
      tags: "address",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .5
      } ]
    }, {
      tags: "landscape",
      elements: "label.text.fill",
      stylers: [ {
        zoom: 0,
        color: "#5f7086",
        opacity: 1
      }, {
        zoom: 1,
        color: "#5f7086",
        opacity: 1
      }, {
        zoom: 2,
        color: "#5f7086",
        opacity: 1
      }, {
        zoom: 3,
        color: "#5f7086",
        opacity: 1
      }, {
        zoom: 4,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 5,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 6,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 7,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 8,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 9,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 10,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 11,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 12,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 13,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 14,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 15,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 16,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 17,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 18,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 19,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 20,
        color: "#556477",
        opacity: .5
      }, {
        zoom: 21,
        color: "#556477",
        opacity: .5
      } ]
    }, {
      tags: "landscape",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      }, {
        zoom: 0,
        opacity: .5
      }, {
        zoom: 1,
        opacity: .5
      }, {
        zoom: 2,
        opacity: .5
      }, {
        zoom: 3,
        opacity: .5
      }, {
        zoom: 4,
        opacity: 0
      }, {
        zoom: 5,
        opacity: 0
      }, {
        zoom: 6,
        opacity: 0
      }, {
        zoom: 7,
        opacity: 0
      }, {
        zoom: 8,
        opacity: 0
      }, {
        zoom: 9,
        opacity: 0
      }, {
        zoom: 10,
        opacity: 0
      }, {
        zoom: 11,
        opacity: 0
      }, {
        zoom: 12,
        opacity: 0
      }, {
        zoom: 13,
        opacity: 0
      }, {
        zoom: 14,
        opacity: 0
      }, {
        zoom: 15,
        opacity: 0
      }, {
        zoom: 16,
        opacity: 0
      }, {
        zoom: 17,
        opacity: 0
      }, {
        zoom: 18,
        opacity: 0
      }, {
        zoom: 19,
        opacity: 0
      }, {
        zoom: 20,
        opacity: 0
      }, {
        zoom: 21,
        opacity: 0
      } ]
    }, {
      tags: "water",
      elements: "label.text.fill",
      stylers: [ {
        color: "#6d7f97"
      }, {
        opacity: .8
      } ]
    }, {
      tags: "water",
      elements: "label.text.outline",
      types: "polyline",
      stylers: [ {
        color: "#ffffff"
      }, {
        opacity: .2
      } ]
    }, {
      tags: {
        any: "road_1",
        none: "is_tunnel"
      },
      elements: "geometry.fill",
      stylers: [ {
        color: "#ffffff"
      }, {
        zoom: 0,
        scale: 0
      }, {
        zoom: 1,
        scale: 0
      }, {
        zoom: 2,
        scale: 0
      }, {
        zoom: 3,
        scale: 0
      }, {
        zoom: 4,
        scale: 0
      }, {
        zoom: 5,
        scale: 0
      }, {
        zoom: 6,
        scale: 2.97
      }, {
        zoom: 7,
        scale: 3.19
      }, {
        zoom: 8,
        scale: 3.53
      }, {
        zoom: 9,
        scale: 4
      }, {
        zoom: 10,
        scale: 3.61
      }, {
        zoom: 11,
        scale: 3.06
      }, {
        zoom: 12,
        scale: 2.64
      }, {
        zoom: 13,
        scale: 2.27
      }, {
        zoom: 14,
        scale: 2.03
      }, {
        zoom: 15,
        scale: 1.9
      }, {
        zoom: 16,
        scale: 1.86
      }, {
        zoom: 17,
        scale: 1.48
      }, {
        zoom: 18,
        scale: 1.21
      }, {
        zoom: 19,
        scale: 1.04
      }, {
        zoom: 20,
        scale: .94
      }, {
        zoom: 21,
        scale: .9
      } ]
    }, {
      tags: {
        any: "road_1"
      },
      elements: "geometry.outline",
      stylers: [ {
        zoom: 0,
        color: "#00000000",
        scale: 1.4
      }, {
        zoom: 1,
        color: "#00000000",
        scale: 1.4
      }, {
        zoom: 2,
        color: "#00000000",
        scale: 1.4
      }, {
        zoom: 3,
        color: "#00000000",
        scale: 1.4
      }, {
        zoom: 4,
        color: "#00000000",
        scale: 1.4
      }, {
        zoom: 5,
        color: "#00000000",
        scale: 1.4
      }, {
        zoom: 6,
        color: "#00000000",
        scale: 3.05
      }, {
        zoom: 7,
        color: "#00000000",
        scale: 3.05
      }, {
        zoom: 8,
        color: "#e1e5ea",
        scale: 3.15
      }, {
        zoom: 9,
        color: "#e7eaee",
        scale: 3.37
      }, {
        zoom: 10,
        color: "#e7eaee",
        scale: 3.36
      }, {
        zoom: 11,
        color: "#e7eaee",
        scale: 3.17
      }, {
        zoom: 12,
        color: "#e7eaee",
        scale: 3
      }, {
        zoom: 13,
        color: "#e7eaee",
        scale: 2.8
      }, {
        zoom: 14,
        color: "#edeff2",
        scale: 2.66
      }, {
        zoom: 15,
        color: "#edeff2",
        scale: 2.61
      }, {
        zoom: 16,
        color: "#eff1f4",
        scale: 2.64
      }, {
        zoom: 17,
        color: "#f1f3f5",
        scale: 2.14
      }, {
        zoom: 18,
        color: "#f4f5f7",
        scale: 1.79
      }, {
        zoom: 19,
        color: "#f6f7f9",
        scale: 1.55
      }, {
        zoom: 20,
        color: "#f7f8fa",
        scale: 1.41
      }, {
        zoom: 21,
        color: "#f9fafb",
        scale: 1.35
      } ]
    }, {
      tags: {
        any: "road_2",
        none: "is_tunnel"
      },
      elements: "geometry.fill",
      stylers: [ {
        color: "#ffffff"
      }, {
        zoom: 0,
        scale: 0
      }, {
        zoom: 1,
        scale: 0
      }, {
        zoom: 2,
        scale: 0
      }, {
        zoom: 3,
        scale: 0
      }, {
        zoom: 4,
        scale: 0
      }, {
        zoom: 5,
        scale: 0
      }, {
        zoom: 6,
        scale: 2.97
      }, {
        zoom: 7,
        scale: 3.19
      }, {
        zoom: 8,
        scale: 3.53
      }, {
        zoom: 9,
        scale: 4
      }, {
        zoom: 10,
        scale: 3.61
      }, {
        zoom: 11,
        scale: 3.06
      }, {
        zoom: 12,
        scale: 2.64
      }, {
        zoom: 13,
        scale: 2.27
      }, {
        zoom: 14,
        scale: 2.03
      }, {
        zoom: 15,
        scale: 1.9
      }, {
        zoom: 16,
        scale: 1.86
      }, {
        zoom: 17,
        scale: 1.48
      }, {
        zoom: 18,
        scale: 1.21
      }, {
        zoom: 19,
        scale: 1.04
      }, {
        zoom: 20,
        scale: .94
      }, {
        zoom: 21,
        scale: .9
      } ]
    }, {
      tags: {
        any: "road_2"
      },
      elements: "geometry.outline",
      stylers: [ {
        zoom: 0,
        color: "#00000000",
        scale: 1.4
      }, {
        zoom: 1,
        color: "#00000000",
        scale: 1.4
      }, {
        zoom: 2,
        color: "#00000000",
        scale: 1.4
      }, {
        zoom: 3,
        color: "#00000000",
        scale: 1.4
      }, {
        zoom: 4,
        color: "#00000000",
        scale: 1.4
      }, {
        zoom: 5,
        color: "#00000000",
        scale: 1.4
      }, {
        zoom: 6,
        color: "#00000000",
        scale: 3.05
      }, {
        zoom: 7,
        color: "#00000000",
        scale: 3.05
      }, {
        zoom: 8,
        color: "#e1e5ea",
        scale: 3.15
      }, {
        zoom: 9,
        color: "#e7eaee",
        scale: 3.37
      }, {
        zoom: 10,
        color: "#e7eaee",
        scale: 3.36
      }, {
        zoom: 11,
        color: "#e7eaee",
        scale: 3.17
      }, {
        zoom: 12,
        color: "#e7eaee",
        scale: 3
      }, {
        zoom: 13,
        color: "#e7eaee",
        scale: 2.8
      }, {
        zoom: 14,
        color: "#edeff2",
        scale: 2.66
      }, {
        zoom: 15,
        color: "#edeff2",
        scale: 2.61
      }, {
        zoom: 16,
        color: "#eff1f4",
        scale: 2.64
      }, {
        zoom: 17,
        color: "#f1f3f5",
        scale: 2.14
      }, {
        zoom: 18,
        color: "#f4f5f7",
        scale: 1.79
      }, {
        zoom: 19,
        color: "#f6f7f9",
        scale: 1.55
      }, {
        zoom: 20,
        color: "#f7f8fa",
        scale: 1.41
      }, {
        zoom: 21,
        color: "#f9fafb",
        scale: 1.35
      } ]
    }, {
      tags: {
        any: "road_3",
        none: "is_tunnel"
      },
      elements: "geometry.fill",
      stylers: [ {
        color: "#ffffff"
      }, {
        zoom: 0,
        scale: 0
      }, {
        zoom: 1,
        scale: 0
      }, {
        zoom: 2,
        scale: 0
      }, {
        zoom: 3,
        scale: 0
      }, {
        zoom: 4,
        scale: 0
      }, {
        zoom: 5,
        scale: 0
      }, {
        zoom: 6,
        scale: 0
      }, {
        zoom: 7,
        scale: 0
      }, {
        zoom: 8,
        scale: 0
      }, {
        zoom: 9,
        scale: 2.51
      }, {
        zoom: 10,
        scale: 2.62
      }, {
        zoom: 11,
        scale: 1.68
      }, {
        zoom: 12,
        scale: 1.67
      }, {
        zoom: 13,
        scale: 1.38
      }, {
        zoom: 14,
        scale: 1.19
      }, {
        zoom: 15,
        scale: 1.08
      }, {
        zoom: 16,
        scale: 1.04
      }, {
        zoom: 17,
        scale: .91
      }, {
        zoom: 18,
        scale: .84
      }, {
        zoom: 19,
        scale: .82
      }, {
        zoom: 20,
        scale: .84
      }, {
        zoom: 21,
        scale: .9
      } ]
    }, {
      tags: {
        any: "road_3"
      },
      elements: "geometry.outline",
      stylers: [ {
        zoom: 0,
        color: "#ffffff",
        scale: 1.6
      }, {
        zoom: 1,
        color: "#ffffff",
        scale: 1.6
      }, {
        zoom: 2,
        color: "#ffffff",
        scale: 1.6
      }, {
        zoom: 3,
        color: "#ffffff",
        scale: 1.6
      }, {
        zoom: 4,
        color: "#ffffff",
        scale: 1.6
      }, {
        zoom: 5,
        color: "#ffffff",
        scale: 1.6
      }, {
        zoom: 6,
        color: "#ffffff",
        scale: 1.6
      }, {
        zoom: 7,
        color: "#ffffff",
        scale: 1.6
      }, {
        zoom: 8,
        color: "#ffffff",
        scale: 1.29
      }, {
        zoom: 9,
        color: "#e7eaee",
        scale: 4.21
      }, {
        zoom: 10,
        color: "#e7eaee",
        scale: 2.74
      }, {
        zoom: 11,
        color: "#e7eaee",
        scale: 2.04
      }, {
        zoom: 12,
        color: "#e7eaee",
        scale: 2.13
      }, {
        zoom: 13,
        color: "#e7eaee",
        scale: 1.88
      }, {
        zoom: 14,
        color: "#edeff2",
        scale: 1.7
      }, {
        zoom: 15,
        color: "#edeff2",
        scale: 1.59
      }, {
        zoom: 16,
        color: "#eff1f4",
        scale: 1.55
      }, {
        zoom: 17,
        color: "#f1f3f5",
        scale: 1.37
      }, {
        zoom: 18,
        color: "#f4f5f7",
        scale: 1.27
      }, {
        zoom: 19,
        color: "#f6f7f9",
        scale: 1.23
      }, {
        zoom: 20,
        color: "#f7f8fa",
        scale: 1.26
      }, {
        zoom: 21,
        color: "#f9fafb",
        scale: 1.35
      } ]
    }, {
      tags: {
        any: "road_4",
        none: "is_tunnel"
      },
      elements: "geometry.fill",
      stylers: [ {
        color: "#ffffff"
      }, {
        zoom: 0,
        scale: 0
      }, {
        zoom: 1,
        scale: 0
      }, {
        zoom: 2,
        scale: 0
      }, {
        zoom: 3,
        scale: 0
      }, {
        zoom: 4,
        scale: 0
      }, {
        zoom: 5,
        scale: 0
      }, {
        zoom: 6,
        scale: 0
      }, {
        zoom: 7,
        scale: 0
      }, {
        zoom: 8,
        scale: 0
      }, {
        zoom: 9,
        scale: 0
      }, {
        zoom: 10,
        scale: 1.69
      }, {
        zoom: 11,
        scale: 1.26
      }, {
        zoom: 12,
        scale: 1.41
      }, {
        zoom: 13,
        scale: 1.19
      }, {
        zoom: 14,
        scale: 1.04
      }, {
        zoom: 15,
        scale: .97
      }, {
        zoom: 16,
        scale: 1.15
      }, {
        zoom: 17,
        scale: .99
      }, {
        zoom: 18,
        scale: .89
      }, {
        zoom: 19,
        scale: .85
      }, {
        zoom: 20,
        scale: .85
      }, {
        zoom: 21,
        scale: .9
      } ]
    }, {
      tags: {
        any: "road_4"
      },
      elements: "geometry.outline",
      stylers: [ {
        zoom: 0,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 1,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 2,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 3,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 4,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 5,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 6,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 7,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 8,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 9,
        color: "#ffffff",
        scale: 1.12
      }, {
        zoom: 10,
        color: "#e7eaee",
        scale: 1.9
      }, {
        zoom: 11,
        color: "#e7eaee",
        scale: 1.62
      }, {
        zoom: 12,
        color: "#e7eaee",
        scale: 1.83
      }, {
        zoom: 13,
        color: "#e7eaee",
        scale: 1.64
      }, {
        zoom: 14,
        color: "#edeff2",
        scale: 1.51
      }, {
        zoom: 15,
        color: "#edeff2",
        scale: 1.44
      }, {
        zoom: 16,
        color: "#eff1f4",
        scale: 1.69
      }, {
        zoom: 17,
        color: "#f1f3f5",
        scale: 1.47
      }, {
        zoom: 18,
        color: "#f4f5f7",
        scale: 1.34
      }, {
        zoom: 19,
        color: "#f6f7f9",
        scale: 1.28
      }, {
        zoom: 20,
        color: "#f7f8fa",
        scale: 1.28
      }, {
        zoom: 21,
        color: "#f9fafb",
        scale: 1.34
      } ]
    }, {
      tags: {
        any: "road_5",
        none: "is_tunnel"
      },
      elements: "geometry.fill",
      stylers: [ {
        color: "#ffffff"
      }, {
        zoom: 0,
        scale: 0
      }, {
        zoom: 1,
        scale: 0
      }, {
        zoom: 2,
        scale: 0
      }, {
        zoom: 3,
        scale: 0
      }, {
        zoom: 4,
        scale: 0
      }, {
        zoom: 5,
        scale: 0
      }, {
        zoom: 6,
        scale: 0
      }, {
        zoom: 7,
        scale: 0
      }, {
        zoom: 8,
        scale: 0
      }, {
        zoom: 9,
        scale: 0
      }, {
        zoom: 10,
        scale: 0
      }, {
        zoom: 11,
        scale: 0
      }, {
        zoom: 12,
        scale: 1.25
      }, {
        zoom: 13,
        scale: .95
      }, {
        zoom: 14,
        scale: .81
      }, {
        zoom: 15,
        scale: .95
      }, {
        zoom: 16,
        scale: 1.1
      }, {
        zoom: 17,
        scale: .93
      }, {
        zoom: 18,
        scale: .85
      }, {
        zoom: 19,
        scale: .82
      }, {
        zoom: 20,
        scale: .84
      }, {
        zoom: 21,
        scale: .9
      } ]
    }, {
      tags: {
        any: "road_5"
      },
      elements: "geometry.outline",
      stylers: [ {
        zoom: 0,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 1,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 2,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 3,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 4,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 5,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 6,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 7,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 8,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 9,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 10,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 11,
        color: "#ffffff",
        scale: .62
      }, {
        zoom: 12,
        color: "#e7eaee",
        scale: 1.61
      }, {
        zoom: 13,
        color: "#e7eaee",
        scale: 1.36
      }, {
        zoom: 14,
        color: "#edeff2",
        scale: 1.22
      }, {
        zoom: 15,
        color: "#edeff2",
        scale: 1.41
      }, {
        zoom: 16,
        color: "#eff1f4",
        scale: 1.63
      }, {
        zoom: 17,
        color: "#f1f3f5",
        scale: 1.4
      }, {
        zoom: 18,
        color: "#f4f5f7",
        scale: 1.27
      }, {
        zoom: 19,
        color: "#f6f7f9",
        scale: 1.23
      }, {
        zoom: 20,
        color: "#f7f8fa",
        scale: 1.25
      }, {
        zoom: 21,
        color: "#f9fafb",
        scale: 1.34
      } ]
    }, {
      tags: {
        any: "road_6",
        none: "is_tunnel"
      },
      elements: "geometry.fill",
      stylers: [ {
        color: "#ffffff"
      }, {
        zoom: 0,
        scale: 0
      }, {
        zoom: 1,
        scale: 0
      }, {
        zoom: 2,
        scale: 0
      }, {
        zoom: 3,
        scale: 0
      }, {
        zoom: 4,
        scale: 0
      }, {
        zoom: 5,
        scale: 0
      }, {
        zoom: 6,
        scale: 0
      }, {
        zoom: 7,
        scale: 0
      }, {
        zoom: 8,
        scale: 0
      }, {
        zoom: 9,
        scale: 0
      }, {
        zoom: 10,
        scale: 0
      }, {
        zoom: 11,
        scale: 0
      }, {
        zoom: 12,
        scale: 0
      }, {
        zoom: 13,
        scale: 2.25
      }, {
        zoom: 14,
        scale: 1.27
      }, {
        zoom: 15,
        scale: 1.25
      }, {
        zoom: 16,
        scale: 1.31
      }, {
        zoom: 17,
        scale: 1.04
      }, {
        zoom: 18,
        scale: .9
      }, {
        zoom: 19,
        scale: .85
      }, {
        zoom: 20,
        scale: .85
      }, {
        zoom: 21,
        scale: .9
      } ]
    }, {
      tags: {
        any: "road_6"
      },
      elements: "geometry.outline",
      stylers: [ {
        zoom: 0,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 1,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 2,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 3,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 4,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 5,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 6,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 7,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 8,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 9,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 10,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 11,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 12,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 13,
        color: "#e7eaee",
        scale: 2.31
      }, {
        zoom: 14,
        color: "#edeff2",
        scale: 1.7
      }, {
        zoom: 15,
        color: "#edeff2",
        scale: 1.76
      }, {
        zoom: 16,
        color: "#eff1f4",
        scale: 1.89
      }, {
        zoom: 17,
        color: "#f1f3f5",
        scale: 1.55
      }, {
        zoom: 18,
        color: "#f4f5f7",
        scale: 1.36
      }, {
        zoom: 19,
        color: "#f6f7f9",
        scale: 1.27
      }, {
        zoom: 20,
        color: "#f7f8fa",
        scale: 1.27
      }, {
        zoom: 21,
        color: "#f9fafb",
        scale: 1.34
      } ]
    }, {
      tags: {
        any: "road_7",
        none: "is_tunnel"
      },
      elements: "geometry.fill",
      stylers: [ {
        color: "#ffffff"
      }, {
        zoom: 0,
        scale: 0
      }, {
        zoom: 1,
        scale: 0
      }, {
        zoom: 2,
        scale: 0
      }, {
        zoom: 3,
        scale: 0
      }, {
        zoom: 4,
        scale: 0
      }, {
        zoom: 5,
        scale: 0
      }, {
        zoom: 6,
        scale: 0
      }, {
        zoom: 7,
        scale: 0
      }, {
        zoom: 8,
        scale: 0
      }, {
        zoom: 9,
        scale: 0
      }, {
        zoom: 10,
        scale: 0
      }, {
        zoom: 11,
        scale: 0
      }, {
        zoom: 12,
        scale: 0
      }, {
        zoom: 13,
        scale: 0
      }, {
        zoom: 14,
        scale: .9
      }, {
        zoom: 15,
        scale: .78
      }, {
        zoom: 16,
        scale: .88
      }, {
        zoom: 17,
        scale: .8
      }, {
        zoom: 18,
        scale: .78
      }, {
        zoom: 19,
        scale: .79
      }, {
        zoom: 20,
        scale: .83
      }, {
        zoom: 21,
        scale: .9
      } ]
    }, {
      tags: {
        any: "road_7"
      },
      elements: "geometry.outline",
      stylers: [ {
        zoom: 0,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 1,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 2,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 3,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 4,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 5,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 6,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 7,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 8,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 9,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 10,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 11,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 12,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 13,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 14,
        color: "#edeff2",
        scale: 1.31
      }, {
        zoom: 15,
        color: "#edeff2",
        scale: 1.19
      }, {
        zoom: 16,
        color: "#eff1f4",
        scale: 1.31
      }, {
        zoom: 17,
        color: "#f1f3f5",
        scale: 1.21
      }, {
        zoom: 18,
        color: "#f4f5f7",
        scale: 1.17
      }, {
        zoom: 19,
        color: "#f6f7f9",
        scale: 1.18
      }, {
        zoom: 20,
        color: "#f7f8fa",
        scale: 1.23
      }, {
        zoom: 21,
        color: "#f9fafb",
        scale: 1.33
      } ]
    }, {
      tags: {
        any: "road_minor",
        none: "is_tunnel"
      },
      elements: "geometry.fill",
      stylers: [ {
        color: "#ffffff"
      }, {
        zoom: 0,
        scale: 0
      }, {
        zoom: 1,
        scale: 0
      }, {
        zoom: 2,
        scale: 0
      }, {
        zoom: 3,
        scale: 0
      }, {
        zoom: 4,
        scale: 0
      }, {
        zoom: 5,
        scale: 0
      }, {
        zoom: 6,
        scale: 0
      }, {
        zoom: 7,
        scale: 0
      }, {
        zoom: 8,
        scale: 0
      }, {
        zoom: 9,
        scale: 0
      }, {
        zoom: 10,
        scale: 0
      }, {
        zoom: 11,
        scale: 0
      }, {
        zoom: 12,
        scale: 0
      }, {
        zoom: 13,
        scale: 0
      }, {
        zoom: 14,
        scale: 0
      }, {
        zoom: 15,
        scale: 0
      }, {
        zoom: 16,
        scale: .9
      }, {
        zoom: 17,
        scale: .9
      }, {
        zoom: 18,
        scale: .9
      }, {
        zoom: 19,
        scale: .9
      }, {
        zoom: 20,
        scale: .9
      }, {
        zoom: 21,
        scale: .9
      } ]
    }, {
      tags: {
        any: "road_minor"
      },
      elements: "geometry.outline",
      stylers: [ {
        zoom: 0,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 1,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 2,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 3,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 4,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 5,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 6,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 7,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 8,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 9,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 10,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 11,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 12,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 13,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 14,
        color: "#edeff2",
        scale: .4
      }, {
        zoom: 15,
        color: "#edeff2",
        scale: .4
      }, {
        zoom: 16,
        color: "#eff1f4",
        scale: 1.4
      }, {
        zoom: 17,
        color: "#f1f3f5",
        scale: 1.27
      }, {
        zoom: 18,
        color: "#f4f5f7",
        scale: 1.27
      }, {
        zoom: 19,
        color: "#f6f7f9",
        scale: 1.29
      }, {
        zoom: 20,
        color: "#f7f8fa",
        scale: 1.31
      }, {
        zoom: 21,
        color: "#f9fafb",
        scale: 1.32
      } ]
    }, {
      tags: {
        any: "road_unclassified",
        none: "is_tunnel"
      },
      elements: "geometry.fill",
      stylers: [ {
        color: "#ffffff"
      }, {
        zoom: 0,
        scale: 0
      }, {
        zoom: 1,
        scale: 0
      }, {
        zoom: 2,
        scale: 0
      }, {
        zoom: 3,
        scale: 0
      }, {
        zoom: 4,
        scale: 0
      }, {
        zoom: 5,
        scale: 0
      }, {
        zoom: 6,
        scale: 0
      }, {
        zoom: 7,
        scale: 0
      }, {
        zoom: 8,
        scale: 0
      }, {
        zoom: 9,
        scale: 0
      }, {
        zoom: 10,
        scale: 0
      }, {
        zoom: 11,
        scale: 0
      }, {
        zoom: 12,
        scale: 0
      }, {
        zoom: 13,
        scale: 0
      }, {
        zoom: 14,
        scale: 0
      }, {
        zoom: 15,
        scale: 0
      }, {
        zoom: 16,
        scale: .9
      }, {
        zoom: 17,
        scale: .9
      }, {
        zoom: 18,
        scale: .9
      }, {
        zoom: 19,
        scale: .9
      }, {
        zoom: 20,
        scale: .9
      }, {
        zoom: 21,
        scale: .9
      } ]
    }, {
      tags: {
        any: "road_unclassified"
      },
      elements: "geometry.outline",
      stylers: [ {
        zoom: 0,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 1,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 2,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 3,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 4,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 5,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 6,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 7,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 8,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 9,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 10,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 11,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 12,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 13,
        color: "#ffffff",
        scale: .4
      }, {
        zoom: 14,
        color: "#edeff2",
        scale: .4
      }, {
        zoom: 15,
        color: "#edeff2",
        scale: .4
      }, {
        zoom: 16,
        color: "#eff1f4",
        scale: 1.4
      }, {
        zoom: 17,
        color: "#f1f3f5",
        scale: 1.27
      }, {
        zoom: 18,
        color: "#f4f5f7",
        scale: 1.27
      }, {
        zoom: 19,
        color: "#f6f7f9",
        scale: 1.29
      }, {
        zoom: 20,
        color: "#f7f8fa",
        scale: 1.31
      }, {
        zoom: 21,
        color: "#f9fafb",
        scale: 1.32
      } ]
    }, {
      tags: {
        all: "is_tunnel",
        none: "path"
      },
      elements: "geometry.fill",
      stylers: [ {
        zoom: 0,
        color: "#e1e5ea"
      }, {
        zoom: 1,
        color: "#e1e5ea"
      }, {
        zoom: 2,
        color: "#e1e5ea"
      }, {
        zoom: 3,
        color: "#e1e5ea"
      }, {
        zoom: 4,
        color: "#e1e5ea"
      }, {
        zoom: 5,
        color: "#e1e5ea"
      }, {
        zoom: 6,
        color: "#e1e5ea"
      }, {
        zoom: 7,
        color: "#e1e5ea"
      }, {
        zoom: 8,
        color: "#e1e5ea"
      }, {
        zoom: 9,
        color: "#e1e5ea"
      }, {
        zoom: 10,
        color: "#e1e5ea"
      }, {
        zoom: 11,
        color: "#e1e5ea"
      }, {
        zoom: 12,
        color: "#e1e5ea"
      }, {
        zoom: 13,
        color: "#e1e5ea"
      }, {
        zoom: 14,
        color: "#e7eaee"
      }, {
        zoom: 15,
        color: "#edeff2"
      }, {
        zoom: 16,
        color: "#eef0f3"
      }, {
        zoom: 17,
        color: "#eff1f4"
      }, {
        zoom: 18,
        color: "#f0f2f4"
      }, {
        zoom: 19,
        color: "#f1f3f5"
      }, {
        zoom: 20,
        color: "#f2f4f6"
      }, {
        zoom: 21,
        color: "#f3f5f7"
      } ]
    }, {
      tags: {
        all: "path",
        none: "is_tunnel"
      },
      elements: "geometry.fill",
      stylers: [ {
        color: "#b4beca"
      } ]
    }, {
      tags: {
        all: "path",
        none: "is_tunnel"
      },
      elements: "geometry.outline",
      stylers: [ {
        opacity: .7
      }, {
        zoom: 0,
        color: "#e7eaee"
      }, {
        zoom: 1,
        color: "#e7eaee"
      }, {
        zoom: 2,
        color: "#e7eaee"
      }, {
        zoom: 3,
        color: "#e7eaee"
      }, {
        zoom: 4,
        color: "#e7eaee"
      }, {
        zoom: 5,
        color: "#e7eaee"
      }, {
        zoom: 6,
        color: "#e7eaee"
      }, {
        zoom: 7,
        color: "#e7eaee"
      }, {
        zoom: 8,
        color: "#e7eaee"
      }, {
        zoom: 9,
        color: "#e7eaee"
      }, {
        zoom: 10,
        color: "#e7eaee"
      }, {
        zoom: 11,
        color: "#e7eaee"
      }, {
        zoom: 12,
        color: "#e7eaee"
      }, {
        zoom: 13,
        color: "#e7eaee"
      }, {
        zoom: 14,
        color: "#edeff2"
      }, {
        zoom: 15,
        color: "#f3f5f7"
      }, {
        zoom: 16,
        color: "#f4f6f8"
      }, {
        zoom: 17,
        color: "#f5f7f8"
      }, {
        zoom: 18,
        color: "#f6f7f9"
      }, {
        zoom: 19,
        color: "#f7f8fa"
      }, {
        zoom: 20,
        color: "#f8f9fa"
      }, {
        zoom: 21,
        color: "#f9fafb"
      } ]
    }, {
      tags: "road_construction",
      elements: "geometry.fill",
      stylers: [ {
        color: "#ffffff"
      } ]
    }, {
      tags: "road_construction",
      elements: "geometry.outline",
      stylers: [ {
        zoom: 0,
        color: "#d2d8df"
      }, {
        zoom: 1,
        color: "#d2d8df"
      }, {
        zoom: 2,
        color: "#d2d8df"
      }, {
        zoom: 3,
        color: "#d2d8df"
      }, {
        zoom: 4,
        color: "#d2d8df"
      }, {
        zoom: 5,
        color: "#d2d8df"
      }, {
        zoom: 6,
        color: "#d2d8df"
      }, {
        zoom: 7,
        color: "#d2d8df"
      }, {
        zoom: 8,
        color: "#d2d8df"
      }, {
        zoom: 9,
        color: "#d2d8df"
      }, {
        zoom: 10,
        color: "#d2d8df"
      }, {
        zoom: 11,
        color: "#d2d8df"
      }, {
        zoom: 12,
        color: "#d2d8df"
      }, {
        zoom: 13,
        color: "#d2d8df"
      }, {
        zoom: 14,
        color: "#b4beca"
      }, {
        zoom: 15,
        color: "#d2d8df"
      }, {
        zoom: 16,
        color: "#d7dce2"
      }, {
        zoom: 17,
        color: "#dce1e6"
      }, {
        zoom: 18,
        color: "#e1e5e9"
      }, {
        zoom: 19,
        color: "#e6e9ed"
      }, {
        zoom: 20,
        color: "#ebeef0"
      }, {
        zoom: 21,
        color: "#f0f2f4"
      } ]
    }, {
      tags: {
        any: "ferry"
      },
      stylers: [ {
        color: "#a8b3c2"
      } ]
    }, {
      tags: "transit_location",
      elements: "label.icon",
      stylers: [ {
        hue: "#798aa0"
      }, {
        saturation: -.83
      } ]
    }, {
      tags: "transit_location",
      elements: "label.text.fill",
      stylers: [ {
        color: "#7a95b8"
      } ]
    }, {
      tags: "transit_location",
      elements: "label.text.outline",
      stylers: [ {
        color: "#ffffff"
      } ]
    }, {
      tags: "transit_schema",
      elements: "geometry.fill",
      stylers: [ {
        color: "#7a95b8"
      }, {
        scale: .7
      }, {
        zoom: 0,
        opacity: .6
      }, {
        zoom: 1,
        opacity: .6
      }, {
        zoom: 2,
        opacity: .6
      }, {
        zoom: 3,
        opacity: .6
      }, {
        zoom: 4,
        opacity: .6
      }, {
        zoom: 5,
        opacity: .6
      }, {
        zoom: 6,
        opacity: .6
      }, {
        zoom: 7,
        opacity: .6
      }, {
        zoom: 8,
        opacity: .6
      }, {
        zoom: 9,
        opacity: .6
      }, {
        zoom: 10,
        opacity: .6
      }, {
        zoom: 11,
        opacity: .6
      }, {
        zoom: 12,
        opacity: .6
      }, {
        zoom: 13,
        opacity: .6
      }, {
        zoom: 14,
        opacity: .6
      }, {
        zoom: 15,
        opacity: .5
      }, {
        zoom: 16,
        opacity: .4
      }, {
        zoom: 17,
        opacity: .4
      }, {
        zoom: 18,
        opacity: .4
      }, {
        zoom: 19,
        opacity: .4
      }, {
        zoom: 20,
        opacity: .4
      }, {
        zoom: 21,
        opacity: .4
      } ]
    }, {
      tags: "transit_schema",
      elements: "geometry.outline",
      stylers: [ {
        opacity: 0
      } ]
    }, {
      tags: "transit_line",
      elements: "geometry.fill.pattern",
      stylers: [ {
        color: "#a3b0c2"
      }, {
        zoom: 0,
        opacity: 0
      }, {
        zoom: 1,
        opacity: 0
      }, {
        zoom: 2,
        opacity: 0
      }, {
        zoom: 3,
        opacity: 0
      }, {
        zoom: 4,
        opacity: 0
      }, {
        zoom: 5,
        opacity: 0
      }, {
        zoom: 6,
        opacity: 0
      }, {
        zoom: 7,
        opacity: 0
      }, {
        zoom: 8,
        opacity: 0
      }, {
        zoom: 9,
        opacity: 0
      }, {
        zoom: 10,
        opacity: 0
      }, {
        zoom: 11,
        opacity: 0
      }, {
        zoom: 12,
        opacity: 0
      }, {
        zoom: 13,
        opacity: 1
      }, {
        zoom: 14,
        opacity: 1
      }, {
        zoom: 15,
        opacity: 1
      }, {
        zoom: 16,
        opacity: 1
      }, {
        zoom: 17,
        opacity: 1
      }, {
        zoom: 18,
        opacity: 1
      }, {
        zoom: 19,
        opacity: 1
      }, {
        zoom: 20,
        opacity: 1
      }, {
        zoom: 21,
        opacity: 1
      } ]
    }, {
      tags: "transit_line",
      elements: "geometry.fill",
      stylers: [ {
        color: "#a3b0c2"
      }, {
        scale: .4
      }, {
        zoom: 0,
        opacity: 0
      }, {
        zoom: 1,
        opacity: 0
      }, {
        zoom: 2,
        opacity: 0
      }, {
        zoom: 3,
        opacity: 0
      }, {
        zoom: 4,
        opacity: 0
      }, {
        zoom: 5,
        opacity: 0
      }, {
        zoom: 6,
        opacity: 0
      }, {
        zoom: 7,
        opacity: 0
      }, {
        zoom: 8,
        opacity: 0
      }, {
        zoom: 9,
        opacity: 0
      }, {
        zoom: 10,
        opacity: 0
      }, {
        zoom: 11,
        opacity: 0
      }, {
        zoom: 12,
        opacity: 0
      }, {
        zoom: 13,
        opacity: 1
      }, {
        zoom: 14,
        opacity: 1
      }, {
        zoom: 15,
        opacity: 1
      }, {
        zoom: 16,
        opacity: 1
      }, {
        zoom: 17,
        opacity: 1
      }, {
        zoom: 18,
        opacity: 1
      }, {
        zoom: 19,
        opacity: 1
      }, {
        zoom: 20,
        opacity: 1
      }, {
        zoom: 21,
        opacity: 1
      } ]
    }, {
      tags: "water",
      elements: "geometry",
      stylers: [ {
        zoom: 0,
        color: "#c6cdd7"
      }, {
        zoom: 1,
        color: "#c6cdd7"
      }, {
        zoom: 2,
        color: "#c6cdd7"
      }, {
        zoom: 3,
        color: "#c6cdd7"
      }, {
        zoom: 4,
        color: "#c6cdd7"
      }, {
        zoom: 5,
        color: "#c6cdd7"
      }, {
        zoom: 6,
        color: "#c6cdd7"
      }, {
        zoom: 7,
        color: "#c6cdd7"
      }, {
        zoom: 8,
        color: "#c8cfd8"
      }, {
        zoom: 9,
        color: "#cad0da"
      }, {
        zoom: 10,
        color: "#ccd2db"
      }, {
        zoom: 11,
        color: "#cdd3dc"
      }, {
        zoom: 12,
        color: "#ced4dc"
      }, {
        zoom: 13,
        color: "#cfd5dd"
      }, {
        zoom: 14,
        color: "#d0d6de"
      }, {
        zoom: 15,
        color: "#d2d8df"
      }, {
        zoom: 16,
        color: "#d3d9e0"
      }, {
        zoom: 17,
        color: "#d5dae1"
      }, {
        zoom: 18,
        color: "#d6dce3"
      }, {
        zoom: 19,
        color: "#d8dde4"
      }, {
        zoom: 20,
        color: "#d9dfe5"
      }, {
        zoom: 21,
        color: "#dbe0e6"
      } ]
    }, {
      tags: "water",
      elements: "geometry",
      types: "polyline",
      stylers: [ {
        zoom: 0,
        opacity: .4
      }, {
        zoom: 1,
        opacity: .4
      }, {
        zoom: 2,
        opacity: .4
      }, {
        zoom: 3,
        opacity: .4
      }, {
        zoom: 4,
        opacity: .6
      }, {
        zoom: 5,
        opacity: .8
      }, {
        zoom: 6,
        opacity: 1
      }, {
        zoom: 7,
        opacity: 1
      }, {
        zoom: 8,
        opacity: 1
      }, {
        zoom: 9,
        opacity: 1
      }, {
        zoom: 10,
        opacity: 1
      }, {
        zoom: 11,
        opacity: 1
      }, {
        zoom: 12,
        opacity: 1
      }, {
        zoom: 13,
        opacity: 1
      }, {
        zoom: 14,
        opacity: 1
      }, {
        zoom: 15,
        opacity: 1
      }, {
        zoom: 16,
        opacity: 1
      }, {
        zoom: 17,
        opacity: 1
      }, {
        zoom: 18,
        opacity: 1
      }, {
        zoom: 19,
        opacity: 1
      }, {
        zoom: 20,
        opacity: 1
      }, {
        zoom: 21,
        opacity: 1
      } ]
    }, {
      tags: "bathymetry",
      elements: "geometry",
      stylers: [ {
        hue: "#c6cdd7"
      } ]
    }, {
      tags: {
        any: [ "industrial", "construction_site" ]
      },
      elements: "geometry",
      stylers: [ {
        zoom: 0,
        color: "#e1e5ea"
      }, {
        zoom: 1,
        color: "#e1e5ea"
      }, {
        zoom: 2,
        color: "#e1e5ea"
      }, {
        zoom: 3,
        color: "#e1e5ea"
      }, {
        zoom: 4,
        color: "#e1e5ea"
      }, {
        zoom: 5,
        color: "#e1e5ea"
      }, {
        zoom: 6,
        color: "#e1e5ea"
      }, {
        zoom: 7,
        color: "#e1e5ea"
      }, {
        zoom: 8,
        color: "#e1e5ea"
      }, {
        zoom: 9,
        color: "#e1e5ea"
      }, {
        zoom: 10,
        color: "#e1e5ea"
      }, {
        zoom: 11,
        color: "#e1e5ea"
      }, {
        zoom: 12,
        color: "#e1e5ea"
      }, {
        zoom: 13,
        color: "#e1e5ea"
      }, {
        zoom: 14,
        color: "#e7eaee"
      }, {
        zoom: 15,
        color: "#edeff2"
      }, {
        zoom: 16,
        color: "#eef0f3"
      }, {
        zoom: 17,
        color: "#eff1f4"
      }, {
        zoom: 18,
        color: "#f0f2f4"
      }, {
        zoom: 19,
        color: "#f1f3f5"
      }, {
        zoom: 20,
        color: "#f2f4f6"
      }, {
        zoom: 21,
        color: "#f3f5f7"
      } ]
    }, {
      tags: {
        any: "transit",
        none: [ "transit_location", "transit_line", "transit_schema", "is_unclassified_transit" ]
      },
      elements: "geometry",
      stylers: [ {
        zoom: 0,
        color: "#e1e5ea"
      }, {
        zoom: 1,
        color: "#e1e5ea"
      }, {
        zoom: 2,
        color: "#e1e5ea"
      }, {
        zoom: 3,
        color: "#e1e5ea"
      }, {
        zoom: 4,
        color: "#e1e5ea"
      }, {
        zoom: 5,
        color: "#e1e5ea"
      }, {
        zoom: 6,
        color: "#e1e5ea"
      }, {
        zoom: 7,
        color: "#e1e5ea"
      }, {
        zoom: 8,
        color: "#e1e5ea"
      }, {
        zoom: 9,
        color: "#e1e5ea"
      }, {
        zoom: 10,
        color: "#e1e5ea"
      }, {
        zoom: 11,
        color: "#e1e5ea"
      }, {
        zoom: 12,
        color: "#e1e5ea"
      }, {
        zoom: 13,
        color: "#e1e5ea"
      }, {
        zoom: 14,
        color: "#e7eaee"
      }, {
        zoom: 15,
        color: "#edeff2"
      }, {
        zoom: 16,
        color: "#eef0f3"
      }, {
        zoom: 17,
        color: "#eff1f4"
      }, {
        zoom: 18,
        color: "#f0f2f4"
      }, {
        zoom: 19,
        color: "#f1f3f5"
      }, {
        zoom: 20,
        color: "#f2f4f6"
      }, {
        zoom: 21,
        color: "#f3f5f7"
      } ]
    }, {
      tags: "fence",
      elements: "geometry.fill",
      stylers: [ {
        color: "#d5dbe2"
      }, {
        zoom: 0,
        opacity: .75
      }, {
        zoom: 1,
        opacity: .75
      }, {
        zoom: 2,
        opacity: .75
      }, {
        zoom: 3,
        opacity: .75
      }, {
        zoom: 4,
        opacity: .75
      }, {
        zoom: 5,
        opacity: .75
      }, {
        zoom: 6,
        opacity: .75
      }, {
        zoom: 7,
        opacity: .75
      }, {
        zoom: 8,
        opacity: .75
      }, {
        zoom: 9,
        opacity: .75
      }, {
        zoom: 10,
        opacity: .75
      }, {
        zoom: 11,
        opacity: .75
      }, {
        zoom: 12,
        opacity: .75
      }, {
        zoom: 13,
        opacity: .75
      }, {
        zoom: 14,
        opacity: .75
      }, {
        zoom: 15,
        opacity: .75
      }, {
        zoom: 16,
        opacity: .75
      }, {
        zoom: 17,
        opacity: .45
      }, {
        zoom: 18,
        opacity: .45
      }, {
        zoom: 19,
        opacity: .45
      }, {
        zoom: 20,
        opacity: .45
      }, {
        zoom: 21,
        opacity: .45
      } ]
    }, {
      tags: "medical",
      elements: "geometry",
      stylers: [ {
        zoom: 0,
        color: "#e1e5ea"
      }, {
        zoom: 1,
        color: "#e1e5ea"
      }, {
        zoom: 2,
        color: "#e1e5ea"
      }, {
        zoom: 3,
        color: "#e1e5ea"
      }, {
        zoom: 4,
        color: "#e1e5ea"
      }, {
        zoom: 5,
        color: "#e1e5ea"
      }, {
        zoom: 6,
        color: "#e1e5ea"
      }, {
        zoom: 7,
        color: "#e1e5ea"
      }, {
        zoom: 8,
        color: "#e1e5ea"
      }, {
        zoom: 9,
        color: "#e1e5ea"
      }, {
        zoom: 10,
        color: "#e1e5ea"
      }, {
        zoom: 11,
        color: "#e1e5ea"
      }, {
        zoom: 12,
        color: "#e1e5ea"
      }, {
        zoom: 13,
        color: "#e1e5ea"
      }, {
        zoom: 14,
        color: "#e7eaee"
      }, {
        zoom: 15,
        color: "#edeff2"
      }, {
        zoom: 16,
        color: "#eef0f3"
      }, {
        zoom: 17,
        color: "#eff1f4"
      }, {
        zoom: 18,
        color: "#f0f2f4"
      }, {
        zoom: 19,
        color: "#f1f3f5"
      }, {
        zoom: 20,
        color: "#f2f4f6"
      }, {
        zoom: 21,
        color: "#f3f5f7"
      } ]
    }, {
      tags: "beach",
      elements: "geometry",
      stylers: [ {
        zoom: 0,
        color: "#e1e5ea",
        opacity: .3
      }, {
        zoom: 1,
        color: "#e1e5ea",
        opacity: .3
      }, {
        zoom: 2,
        color: "#e1e5ea",
        opacity: .3
      }, {
        zoom: 3,
        color: "#e1e5ea",
        opacity: .3
      }, {
        zoom: 4,
        color: "#e1e5ea",
        opacity: .3
      }, {
        zoom: 5,
        color: "#e1e5ea",
        opacity: .3
      }, {
        zoom: 6,
        color: "#e1e5ea",
        opacity: .3
      }, {
        zoom: 7,
        color: "#e1e5ea",
        opacity: .3
      }, {
        zoom: 8,
        color: "#e1e5ea",
        opacity: .3
      }, {
        zoom: 9,
        color: "#e1e5ea",
        opacity: .3
      }, {
        zoom: 10,
        color: "#e1e5ea",
        opacity: .3
      }, {
        zoom: 11,
        color: "#e1e5ea",
        opacity: .3
      }, {
        zoom: 12,
        color: "#e1e5ea",
        opacity: .3
      }, {
        zoom: 13,
        color: "#e1e5ea",
        opacity: .65
      }, {
        zoom: 14,
        color: "#e7eaee",
        opacity: 1
      }, {
        zoom: 15,
        color: "#edeff2",
        opacity: 1
      }, {
        zoom: 16,
        color: "#eef0f3",
        opacity: 1
      }, {
        zoom: 17,
        color: "#eff1f4",
        opacity: 1
      }, {
        zoom: 18,
        color: "#f0f2f4",
        opacity: 1
      }, {
        zoom: 19,
        color: "#f1f3f5",
        opacity: 1
      }, {
        zoom: 20,
        color: "#f2f4f6",
        opacity: 1
      }, {
        zoom: 21,
        color: "#f3f5f7",
        opacity: 1
      } ]
    }, {
      tags: {
        all: [ "is_tunnel", "path" ]
      },
      elements: "geometry.fill",
      stylers: [ {
        color: "#aeb9c6"
      }, {
        opacity: .3
      } ]
    }, {
      tags: {
        all: [ "is_tunnel", "path" ]
      },
      elements: "geometry.outline",
      stylers: [ {
        opacity: 0
      } ]
    }, {
      tags: "road_limited",
      elements: "geometry.fill",
      stylers: [ {
        color: "#c3cbd5"
      }, {
        zoom: 0,
        scale: 0
      }, {
        zoom: 1,
        scale: 0
      }, {
        zoom: 2,
        scale: 0
      }, {
        zoom: 3,
        scale: 0
      }, {
        zoom: 4,
        scale: 0
      }, {
        zoom: 5,
        scale: 0
      }, {
        zoom: 6,
        scale: 0
      }, {
        zoom: 7,
        scale: 0
      }, {
        zoom: 8,
        scale: 0
      }, {
        zoom: 9,
        scale: 0
      }, {
        zoom: 10,
        scale: 0
      }, {
        zoom: 11,
        scale: 0
      }, {
        zoom: 12,
        scale: 0
      }, {
        zoom: 13,
        scale: .1
      }, {
        zoom: 14,
        scale: .2
      }, {
        zoom: 15,
        scale: .3
      }, {
        zoom: 16,
        scale: .5
      }, {
        zoom: 17,
        scale: .6
      }, {
        zoom: 18,
        scale: .7
      }, {
        zoom: 19,
        scale: .79
      }, {
        zoom: 20,
        scale: .83
      }, {
        zoom: 21,
        scale: .9
      } ]
    }, {
      tags: "road_limited",
      elements: "geometry.outline",
      stylers: [ {
        zoom: 0,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 1,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 2,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 3,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 4,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 5,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 6,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 7,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 8,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 9,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 10,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 11,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 12,
        color: "#ffffff",
        scale: 1.4
      }, {
        zoom: 13,
        color: "#ffffff",
        scale: .1
      }, {
        zoom: 14,
        color: "#edeff2",
        scale: .2
      }, {
        zoom: 15,
        color: "#edeff2",
        scale: .3
      }, {
        zoom: 16,
        color: "#eff1f4",
        scale: .5
      }, {
        zoom: 17,
        color: "#f1f3f5",
        scale: .6
      }, {
        zoom: 18,
        color: "#f4f5f7",
        scale: .7
      }, {
        zoom: 19,
        color: "#f6f7f9",
        scale: 1.18
      }, {
        zoom: 20,
        color: "#f7f8fa",
        scale: 1.23
      }, {
        zoom: 21,
        color: "#f9fafb",
        scale: 1.33
      } ]
    }, {
      tags: {
        any: "landcover",
        none: "vegetation"
      },
      stylers: {
        visibility: "off"
      }
    } ], vc = document.createElement("div");
    vc.className = "near__marker";
    const zc = {
      coordinates: [ 30.94030068653868, 59.84294662775576 ]
    }, bc = ca.querySelector(".choose__content"), _c = () => {
      if (!bc) {
        return;
      }
      const e = bc.querySelector(".choose__left"), t = bc.querySelector(".choose__right"), o = bc.querySelector(".choose__bg");
      e.addEventListener("click", (r => {
        r.preventDefault(), Xr.timeline().to(t.querySelector(".choose-block"), {
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
        }, "<").to(o, {
          scale: 1.1,
          duration: 1
        }).then((() => {
          window.location.assign("/choose.html");
        }));
      })), t.addEventListener("click", (o => {
        o.preventDefault(), Xr.timeline().to(e.querySelector(".choose-block"), {
          display: "none",
          duration: .1
        }).fromTo(t, {
          width: "50%"
        }, {
          width: "100%",
          duration: 1
        }, "<").fromTo(e, {
          width: "50%"
        }, {
          width: 0,
          duration: 1
        }, "<").then((() => {
          window.location.assign("https://plan7.ru/catalog/adm/?page=zk&id=103&path=embed");
        }));
      }));
    };
    var wc = o(344);
    const xc = ca.querySelector(".js-accordion"), Tc = e => {
      if (ia < 769) {
        return;
      }
      e.forEach((e => {
        e.classList.add("aesthetics-tab__slide--cover");
      }));
      const t = e.filter((e => e.classList.contains("swiper-slide-prev")))[0], o = e.filter((e => e.classList.contains("swiper-slide-active")))[0];
      t && o && (t.classList.remove("aesthetics-tab__slide--cover"), o.classList.remove("aesthetics-tab__slide--cover"));
    }, Sc = e => {
      if ((e => {
        const t = e.slides.filter((e => e.classList.contains("swiper-slide-active")))[0];
        if (!t) {
          return;
        }
        const o = t.dataset.slide;
        Array.from(aesthetics.querySelectorAll(".tab-btn")).forEach((e => {
          e.classList.remove("selected"), e.dataset.tabContentId === o.split("-")[0] && e.classList.add("selected");
        }));
      })(e), ia < 769) {
        return;
      }
      e.slides.forEach((e => {
        Xr.set(e.querySelector(".aesthetics-tab__list"), {
          autoAlpha: 0,
          duration: .01
        });
      }));
      const t = e.slides.filter((e => e.classList.contains("swiper-slide-prev")))[0];
      Xr.to(t.querySelector(".aesthetics-tab__list"), {
        autoAlpha: 1,
        duration: 1
      });
    }, Ec = new ji(".js-aesthetics-tabs", {
      modules: [ Ui, Zi ],
      initt: !1,
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
      initialSlide: 0,
      scrollbar: {
        el: ".aesthetics-tab__scrollbar",
        draggable: !0
      },
      breakpoints: {
        320: {
          allowTouchMove: !0,
          speed: 300,
          initialSlide: 0,
          slidesPerView: "auto",
          slidesOffsetBefore: 0,
          centeredSlides: !1
        },
        769: {
          allowTouchMove: !1,
          initialSlide: 0,
          speed: 1e3,
          slidesPerView: "auto",
          slidesOffsetBefore: 200,
          centeredSlides: !0
        }
      },
      on: {
        slideChangeTransitionStart: e => {
          if (ia < 769) {
            return;
          }
          const t = e.slides[e.previousIndex], o = e.slides.filter((e => e.classList.contains("swiper-slide-active")))[0];
          o && t && (Xr.timeline().to(o, {
            width: "42.5%",
            duration: 1
          }).fromTo(t, {
            width: "42.5%"
          }, {
            width: "27%",
            duration: 1
          }, "<"), Tc(e.slides));
        },
        afterInit: e => {
          if ((e => {
            const t = ca.querySelector(".aesthetics");
            if (!t) {
              return;
            }
            Array.from(t.querySelectorAll(".tab-btn")).forEach((t => {
              t.addEventListener("click", (t => ((e, t) => {
                const o = t.target.dataset.tabContentId, r = e.slides.find((e => e.dataset.slide === `${o}-0`)).dataset.swiperSlideIndex;
                r && e.slideToLoop(r, 1e3);
              })(e, t)));
            }));
          })(e), ia < 769) {
            return;
          }
          const t = e.slides[e.realIndex], o = e.slides.filter((e => e.classList.contains("swiper-slide-prev")))[0];
          e.slides.forEach((e => {
            Xr.set(e.querySelector(".aesthetics-tab__list"), {
              autoAlpha: 0,
              duration: .01
            });
          })), t && (Xr.timeline().to(t, {
            width: "43.4%",
            duration: .1
          }).to(o.querySelector(".aesthetics-tab__list"), {
            autoAlpha: 1,
            duration: 1
          }), Tc(e.slides));
        },
        slideNextTransitionEnd: Sc,
        slidePrevTransitionEnd: Sc
      }
    });
    document.addEventListener("DOMContentLoaded", (() => {
      Sa.play().then((() => {
        _a.init(), _a.enable();
      })), ((e, t) => {
        const o = ca.querySelector(`.${e}`);
        if (!o) {
          return;
        }
        const r = o.querySelectorAll(".tab-btn"), i = o.querySelectorAll(".tab-content");
        ra[`${e}`] = r, ra[`${e}-tabs`] = i, r.forEach((e => {
          e.addEventListener("click", (e => {
            Array.from(r).forEach((e => {
              e.classList.remove("selected");
            })), e.target.classList.add("selected");
            const o = e.target.dataset.tabContentId;
            if (t) {
              const e = t.slides.map((e => e.dataset.slide)).indexOf(o);
              t.slideToLoop(e, 1e3);
            }
            const a = document.getElementById(o);
            a && (Array.from(i).forEach((e => {
              e.classList.add("hidden");
            })), a.classList.remove("hidden"));
          }));
        }));
      })("dubrovka", aa), fa && fa.addEventListener("click", ha), va && window.addEventListener("scroll", za), 
      wa.enable(), Ec.init(), (() => {
        if (!xa) {
          return;
        }
        Array.from(ca.querySelectorAll(".js-top")).forEach((e => {
          e.addEventListener("click", Ta);
        }));
      })(), Array.from(ca.querySelectorAll(".promo-slide__link")).forEach((e => {
        e.addEventListener("click", (t => sa(e, t)));
      })), (() => {
        if (ia < 769) {
          return;
        }
        const e = ca.querySelector(".dubrovka__title");
        if (!e) {
          return;
        }
        const t = Array.from(e.querySelectorAll("span"));
        t.forEach((e => {
          Yl({
            target: e,
            whitespace: !0,
            by: "chars"
          });
        }));
        const o = t.map((e => e.querySelector(".word")));
        Xr.timeline().set(e, {
          width: "100%"
        }).set(o, {
          flexGrow: 1
        }), Xr.timeline({
          scrollTrigger: {
            trigger: e,
            toggleActions: "restart none reverse none",
            start: "top 90%",
            end: "bottom 60%",
            scrub: 2
          }
        }).to(e, {
          width: ia > 1920 || ia > 1440 ? "65%" : "90%",
          duration: 1
        }).to(o, {
          flexGrow: 0,
          duration: 1
        }, "<");
      })(), Array.from(ca.querySelectorAll(".near-indication__line")).forEach((e => {
        Xr.to(e, {
          scrollTrigger: {
            trigger: e,
            toggleActions: "restart none reverse none",
            start: "top 80%",
            end: "top 60%",
            scrub: 1
          },
          width: "100%"
        });
      })), (() => {
        const e = Array.from(ca.querySelectorAll(".location-flag__line")), t = ca.querySelector(".location");
        if (!t) {
          return;
        }
        const o = t.querySelector(".location-logo__figure");
        e.forEach(((e, o) => {
          const r = t.querySelector(`.location-flag__title--${o + 1}`);
          Xr.timeline().set(r, {
            autoAlpha: 0
          }).set(e, {
            height: 0
          }), Xr.timeline({
            scrollTrigger: {
              trigger: r,
              toggleActions: "restart none reverse none",
              start: "top 90%",
              end: "top 60%",
              scrub: .5
            }
          }).to(e, {
            height: "100%"
          }).to(r, {
            autoAlpha: 1
          });
        })), Xr.to(o, {
          scrollTrigger: {
            trigger: t,
            toggleActions: "play none none pause",
            start: "top 50%",
            end: "+=300"
          },
          scale: 1,
          duration: 1
        });
      })(), (() => {
        let e;
        Hl && (Yl({
          target: Hl,
          whitespace: !0,
          by: "chars"
        }), e = Hl.querySelector(".word")), Jl && (ic.play(), ac.play(), Xr.to(Ql, {
          scrollTrigger: {
            trigger: Jl,
            toggleActions: "play none none none",
            start: "top 90%",
            end: "+=100",
            once: !0
          },
          autoAlpha: 1,
          y: 0
        }), Xr.to(Zl, {
          scrollTrigger: {
            trigger: Jl,
            toggleActions: "play none none none",
            start: "top 80%",
            end: "+=100",
            once: !0
          },
          autoAlpha: 1,
          y: 0
        })), Xl && (ec.play(), Xr.to(Xl, {
          scrollTrigger: {
            trigger: Xl,
            toggleActions: "play none none none",
            start: "top 70%",
            end: "+=100",
            once: !0
          },
          autoAlpha: 1,
          y: 0,
          duration: .5
        })), jl && (tc.play(), Xr.to(jl, {
          scrollTrigger: {
            trigger: jl,
            toggleActions: "play none none none",
            start: "top 100%",
            end: "+=100",
            once: !0
          },
          autoAlpha: 1,
          y: 0,
          duration: 1
        })), Wl && (oc.play(), Xr.to(Wl, {
          scrollTrigger: {
            trigger: Wl,
            toggleActions: "play none none pause",
            start: "top 100%",
            end: "+=100",
            once: !0
          },
          autoAlpha: 1,
          y: 0,
          duration: 1
        })), Ul && (rc.play(), Xr.to(Ul, {
          scrollTrigger: {
            trigger: Ul,
            toggleActions: "play none none pause",
            start: "top 70%",
            end: "+=100",
            once: !0
          },
          scale: 1,
          autoAlpha: 1,
          y: 0,
          duration: 1
        })), e && (ia < 769 ? Xr.set(e, {
          flexGrow: 0
        }) : Xr.to(e, {
          scrollTrigger: {
            trigger: Hl,
            toggleActions: "restart pause reverse pause",
            start: "top 90%",
            end: "bottom 60%",
            scrub: 2
          },
          flexGrow: 0,
          duration: 1
        }));
      })(), (() => {
        if (!sc) {
          return;
        }
        if (ia < 769) {
          return;
        }
        Array.from(sc.querySelectorAll(".circle-control__block")).forEach((e => {
          let t = 0, o = 0, r = 0, i = 0;
          const a = e.querySelector(".control");
          !function e() {
            r += .2 * (t - r), i += .2 * (o - i), a.style.left = r + "px", a.style.top = i + "px", 
            requestAnimationFrame(e);
          }(), e.addEventListener("mousemove", (function(e) {
            a.classList.add("circle-control__btn--active");
            const r = a.offsetWidth / 2;
            t = e.offsetX - r, o = e.offsetY - r;
          })), e.addEventListener("mouseleave", (function(e) {
            a.classList.remove("circle-control__btn--active");
          }));
        }));
      })(), (() => {
        if (!nc) {
          return;
        }
        const e = nc.querySelector(".title");
        if (!e) {
          return;
        }
        Array.from(e.querySelectorAll("span")).forEach((e => {
          Xr.timeline({
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
          }, "<").play(), Xr.timeline({
            scrollTrigger: {
              trigger: nc,
              toggleActions: "play none none none",
              start: "top 80%"
            }
          }).to(e, {
            backgroundPositionY: "100%",
            duration: 1
          }).to(e, {
            y: 0,
            duration: 1
          }, "<");
        }));
      })(), (() => {
        const e = ca.querySelector(".yard");
        if (!e) {
          return;
        }
        const t = e.querySelector(".yard__title"), o = e.querySelector(".yard__text"), r = e.querySelector(".yard__cover"), i = e.querySelector(".yard__pagination");
        Xr.timeline().set(t, {
          autoAlpha: 0,
          y: "200"
        }).set(o, {
          autoAlpha: 0,
          y: "200"
        }), ia > 768 ? Xr.timeline({
          scrollTrigger: {
            trigger: e,
            toggleActions: "play none none none",
            start: "top 80%",
            end: "+=300",
            once: !0
          }
        }).call((() => {
          cc.init();
        })).to(t, {
          autoAlpha: 1,
          y: 0,
          duration: 1
        }).to(o, {
          autoAlpha: 1,
          y: 0,
          duration: 1
        }, "<").to(r, {
          y: "100%",
          duration: 1
        }, "<").to(i, {
          autoAlpha: 1
        }) : (Xr.timeline({
          scrollTrigger: {
            trigger: e,
            toggleActions: "play none none none",
            start: "top 90%",
            end: "+=200",
            once: !0
          }
        }).to(r, {
          y: "100%",
          duration: 1
        }, "<").call((() => {
          cc.init();
        })).to(i, {
          autoAlpha: 1
        }), Xr.timeline({
          scrollTrigger: {
            trigger: t,
            toggleActions: "play none none none",
            start: "top 90%",
            end: "+=50",
            once: !0
          }
        }).to(t, {
          autoAlpha: 1,
          y: 0,
          duration: 1
        }).to(o, {
          autoAlpha: 1,
          y: 0,
          duration: 1
        }, "<"));
      })(), (() => {
        if (!dc) {
          return;
        }
        if (ia < 769) {
          return;
        }
        Array.from(dc.querySelectorAll(".yard-touch__block")).forEach((e => {
          let t = 0, o = 0, r = 0, i = 0;
          const a = e.querySelector(".control");
          !function e() {
            r += .2 * (t - r), i += .2 * (o - i), a.style.left = r + "px", a.style.top = i + "px", 
            requestAnimationFrame(e);
          }(), e.addEventListener("mousemove", (function(e) {
            a.classList.add("yard-touch__btn--active");
            const r = a.offsetWidth / 2;
            t = e.offsetX - r, o = e.offsetY - r;
          })), e.addEventListener("mouseleave", (function(e) {
            a.classList.remove("yard-touch__btn--active");
          }));
        }));
      })(), (() => {
        if (ia < 769) {
          return;
        }
        if (!fc) {
          return;
        }
        uc.map((e => Array.from(e.querySelectorAll(".aesthetics-touch__block")))).flat().forEach((e => {
          let t = 0, o = 0, r = 0, i = 0;
          const a = e.querySelector(".control");
          !function e() {
            r += .2 * (t - r), i += .2 * (o - i), a.style.left = r + "px", a.style.top = i + "px", 
            requestAnimationFrame(e);
          }(), e.addEventListener("mousemove", (function(e) {
            a.classList.add("aesthetics-touch__btn--active");
            const r = a.offsetWidth / 2;
            t = e.offsetX - r, o = e.offsetY - r;
          })), e.addEventListener("mouseleave", (function(e) {
            a.classList.remove("aesthetics-touch__btn--active");
          }));
        }));
      })(), (() => {
        if (!pc) {
          return;
        }
        if (ia < 769) {
          return;
        }
        Array.from(pc.querySelectorAll(".choose__control")).forEach((e => {
          let t = 0, o = 0, r = 0, i = 0;
          const a = e.querySelector(".control");
          !function e() {
            r += .2 * (t - r), i += .2 * (o - i), a.style.left = r + "px", a.style.top = i + "px", 
            requestAnimationFrame(e);
          }(), e.addEventListener("mousemove", (function(r) {
            a.classList.add("choose__circle--active"), e.classList.add("choose__control--active");
            const i = a.offsetWidth / 2;
            t = r.offsetX - i, o = r.offsetY - i;
          })), e.addEventListener("mouseleave", (function(t) {
            a.classList.remove("choose__circle--active"), e.classList.remove("choose__control--active");
          }));
        }));
      })(), (() => {
        if (!mc) {
          return;
        }
        const e = mc.querySelector(".developer__title--" + (ia < 769 ? "tb" : "dt")), t = mc.querySelector(".developer-info__logo"), o = mc.querySelector(".developer__figure-cover"), r = mc.querySelector(".info-block"), i = mc.querySelector(".info-list");
        Xr.set(o, {
          y: "-100%"
        }), Xr.set(i, {
          y: 100,
          autoAlpha: 0
        }), Xr.set(r, {
          y: 100,
          autoAlpha: 0
        }), Xr.timeline().fromTo(e, {
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
        }, "<").play(), Xr.timeline({
          scrollTrigger: {
            trigger: mc,
            toggleActions: "play none none none",
            start: ia < 769 ? "top 100%" : "top 60%",
            end: ia < 769 ? "+=200" : "+=300",
            once: !0
          }
        }).to(e, {
          autoAlpha: 1,
          y: 0,
          duration: .5
        }).to(t, {
          autoAlpha: 1,
          duration: .5
        }, "<"), Xr.timeline({
          scrollTrigger: {
            trigger: mc,
            toggleActions: "play none none none",
            start: "top 80%",
            end: "+=200",
            once: !0
          }
        }).to(i, {
          y: 0,
          autoAlpha: 1,
          duration: .5
        }).to(r, {
          y: 0,
          autoAlpha: 1,
          duration: .5
        }, "<").to(o, {
          y: 0,
          duration: 1
        });
      })(), (() => {
        const e = ca.querySelector(".aesthetics");
        if (!e) {
          return;
        }
        Array.from(e.querySelectorAll(".aesthetics-head__info")).forEach((e => {
          const t = e.querySelector(".aesthetics-head__mark");
          if (!t) {
            return;
          }
          const o = t.parentNode, r = e.querySelector(".aesthetics-head__text"), i = Xr.timeline({
            paused: !0
          }).fromTo(r, {
            width: `${r.clientWidth}px`
          }, {
            width: "0",
            duration: .5
          });
          i.play(), t.addEventListener("mousemove", (function() {
            o.classList.add("aesthetics-head__info--active"), i.reverse();
          })), t.addEventListener("mouseleave", (function() {
            o.classList.remove("aesthetics-head__info--active"), i.play();
          }));
        }));
      })(), (() => {
        if (ia < 769) {
          return;
        }
        if (!hc) {
          return;
        }
        const e = hc.querySelector(".aesthetics__title");
        Xr.timeline().set(e, {
          backgroundPositionY: "200%",
          y: "100%"
        }), Xr.timeline({
          scrollTrigger: {
            trigger: e,
            toggleActions: "play none reverse none",
            start: ia < 769 ? "top 100%" : "top 90%",
            end: ia < 769 ? "+=200" : "+=100"
          }
        }).to(e, {
          backgroundPositionY: "100%",
          duration: 1
        }).to(e, {
          y: 0,
          duration: 1
        }, "<");
      })(), (() => {
        if (!gc) {
          return;
        }
        const e = gc.querySelector(".choose__title");
        if (!e) {
          return;
        }
        const t = Array.from(e.querySelectorAll("span"));
        t.forEach((e => {
          Yl({
            target: e,
            whitespace: !0,
            by: "chars"
          });
        }));
        const o = t.map((e => e.querySelector(".word")));
        Xr.timeline().set(e, {
          width: "100%"
        }).set(o, {
          flexGrow: 1
        }), Xr.timeline({
          scrollTrigger: {
            trigger: e,
            toggleActions: "play pause reverse pause",
            start: "top 90%",
            end: "bottom 60%",
            scrub: 2
          }
        }).to(e, {
          width: ia > 1920 || ia > 1439 ? "65%" : "90%",
          duration: 1
        }).to(o, {
          flexGrow: 0,
          duration: 1
        }, "<");
      })(), (async () => {
        const e = ca.querySelector("#map");
        if (!e) {
          return;
        }
        await ymaps3.ready;
        const {YMap: t, YMapDefaultSchemeLayer: o, YMapDefaultFeaturesLayer: r, YMapMarker: i, YMapControls: a, YMapCollection: s, YMapControlButton: n} = ymaps3, l = new t(e, {
          location: {
            center: [ 30.938058, 59.84347 ],
            zoom: 16
          },
          behaviors: [ "drag" ]
        }), c = new a({
          position: "left"
        }), d = document.createElement("div");
        d.className = "zoom-control__btn zoom-control__btn--in";
        const f = document.createElement("div");
        f.className = "zoom-control__btn zoom-control__btn--out";
        const u = (new s).addChild(new n({
          element: d,
          onClick: () => l.update({
            location: {
              zoom: l.zoom + 1,
              duration: 500
            }
          })
        })).addChild(new n({
          element: f,
          onClick: () => l.update({
            location: {
              zoom: l.zoom - 1,
              duration: 500
            }
          })
        }));
        l.addChild(c), c.addChild(u), l.addChild(new o({
          customization: yc
        })), l.addChild(new r), l.addChild(new i(zc, vc));
      })(), (() => {
        if (!$l) {
          return;
        }
        const e = $l.querySelector(".near__inner");
        e && (Xr.set(e, {
          autoAlpha: 0
        }), Xr.to(e, {
          scrollTrigger: {
            trigger: e,
            toggleActions: "play none none none",
            start: "top 70%",
            end: "30% 70%",
            once: !0,
            scrub: !0
          },
          autoAlpha: 1,
          duration: 1
        }));
      })(), _c(), Vl(), 0 === xc.offsetHeight && 0 === xc.offsetWidth || xc && new wc(".js-accordion", {}), 
      (() => {
        if (ia < 769) {
          return;
        }
        const e = ca.querySelector(".footer");
        if (!e) {
          return;
        }
        const t = e.querySelector(".footer__top--absolute"), o = e.querySelector(".footer__top--fixed");
        if (!o || !t) {
          return;
        }
        const r = ca.querySelector(".dubrovka__content"), i = o.getBoundingClientRect();
        Xr.set(t, {
          autoAlpha: 0
        }), Xr.timeline({
          scrollTrigger: {
            trigger: t,
            start: `top ${i.top}px`,
            end: `top ${i.top}px`,
            toggleActions: "play none none reverse"
          }
        }).set(o, {
          autoAlpha: 0
        }).set(t, {
          autoAlpha: 1
        }), r && Xr.timeline({
          scrollTrigger: {
            trigger: r,
            toggleActions: "restart none reverse none",
            start: "top 100%",
            end: "+=100"
          }
        }).fromTo(o, {
          autoAlpha: 0
        }, {
          autoAlpha: 1
        });
      })();
    }));
  })();
})();