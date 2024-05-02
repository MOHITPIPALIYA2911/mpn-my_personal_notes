console.log("main public");

console.time("helper public");
console.log("helper public");
console.timeEnd("helper public");
// const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
// const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
!(function (e, t) {
  if ("object" == typeof exports && "object" == typeof module) module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var n = t();
    for (var i in n) ("object" == typeof exports ? exports : e)[i] = n[i];
  }
})(self, function () {
  return (function () {
    "use strict";
    var e = {
        d: function (t, n) {
          for (var i in n) e.o(n, i) && !e.o(t, i) && Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
        },
        o: function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        },
        r: function (e) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        },
      },
      t = {};
    function n(e) {
      return (
        s(e) ||
        (function (e) {
          if (("undefined" != typeof Symbol && null != e[Symbol.iterator]) || null != e["@@iterator"]) return Array.from(e);
        })(e) ||
        r(e) ||
        o()
      );
    }
    function i(e, t) {
      return (
        s(e) ||
        (function (e, t) {
          var n = null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
          if (null != n) {
            var i,
              o,
              r,
              a,
              s = [],
              l = !0,
              u = !1;
            try {
              if (((r = (n = n.call(e)).next), 0 === t)) {
                if (Object(n) !== n) return;
                l = !1;
              } else for (; !(l = (i = r.call(n)).done) && (s.push(i.value), s.length !== t); l = !0);
            } catch (e) {
              (u = !0), (o = e);
            } finally {
              try {
                if (!l && null != n.return && ((a = n.return()), Object(a) !== a)) return;
              } finally {
                if (u) throw o;
              }
            }
            return s;
          }
        })(e, t) ||
        r(e, t) ||
        o()
      );
    }
    function o() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function r(e, t) {
      if (e) {
        if ("string" == typeof e) return a(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? a(e, t) : void 0;
      }
    }
    function a(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
      return i;
    }
    function s(e) {
      if (Array.isArray(e)) return e;
    }
    e.r(t),
      e.d(t, {
        Helpers: function () {
          return d;
        },
      });
    var l = ["transitionend", "webkitTransitionEnd", "oTransitionEnd"],
      u = ["transition", "MozTransition", "webkitTransition", "WebkitTransition", "OTransition"];
    function c(e) {
      throw new Error("Parameter required".concat(e ? ": `".concat(e, "`") : ""));
    }
    var d = {
      ROOT_EL: "undefined" != typeof window ? document.documentElement : null,
      LAYOUT_BREAKPOINT: 1200,
      RESIZE_DELAY: 200,
      menuPsScroll: null,
      mainMenu: null,
      _curStyle: null,
      _styleEl: null,
      _resizeTimeout: null,
      _resizeCallback: null,
      _transitionCallback: null,
      _transitionCallbackTimeout: null,
      _listeners: [],
      _initialized: !1,
      _autoUpdate: !1,
      _lastWindowHeight: 0,
      _scrollToActive: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500,
          n = this.getLayoutMenu();
        if (n) {
          var i = n.querySelector("li.menu-item.active:not(.open)");
          if (i) {
            var o = this.getLayoutMenu().querySelector(".menu-inner");
            if (("string" == typeof i && (i = document.querySelector(i)), "number" != typeof i && (i = i.getBoundingClientRect().top + o.scrollTop), i < parseInt((2 * o.clientHeight) / 3, 10))) return;
            var r = o.scrollTop,
              a = i - r - parseInt(o.clientHeight / 2, 10),
              s = +new Date();
            !0 === e
              ? (function e() {
                  var n,
                    i,
                    l,
                    u = +new Date() - s,
                    c = ((n = u), (i = r), (l = a), (n /= t / 2) < 1 ? (l / 2) * n * n + i : (-l / 2) * ((n -= 1) * (n - 2) - 1) + i);
                  (o.scrollTop = c), u < t ? requestAnimationFrame(e) : (o.scrollTop = a);
                })()
              : (o.scrollTop = a);
          }
        }
      },
      _swipeIn: function (e, t) {
        var n = window.Hammer;
        if (void 0 !== n && "string" == typeof e) {
          var i = document.querySelector(e);
          i && new n(i).on("panright", t);
        }
      },
      _swipeOut: function (e, t) {
        var n = window.Hammer;
        void 0 !== n &&
          "string" == typeof e &&
          setTimeout(function () {
            var i = document.querySelector(e);
            if (i) {
              var o = new n(i);
              o.get("pan").set({ direction: n.DIRECTION_ALL, threshold: 250 }), o.on("panleft", t);
            }
          }, 500);
      },
      _overlayTap: function (e, t) {
        var n = window.Hammer;
        if (void 0 !== n && "string" == typeof e) {
          var i = document.querySelector(e);
          i && new n(i).on("tap", t);
        }
      },
      _addClass: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.ROOT_EL;
        void 0 !== t.length
          ? t.forEach(function (t) {
              e.split(" ").forEach(function (e) {
                return t.classList.add(e);
              });
            })
          : e.split(" ").forEach(function (e) {
              return t.classList.add(e);
            });
      },
      _removeClass: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.ROOT_EL;
        void 0 !== t.length
          ? t.forEach(function (t) {
              e.split(" ").forEach(function (e) {
                return t.classList.remove(e);
              });
            })
          : e.split(" ").forEach(function (e) {
              return t.classList.remove(e);
            });
      },
      _toggleClass: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.ROOT_EL,
          t = arguments.length > 1 ? arguments[1] : void 0,
          n = arguments.length > 2 ? arguments[2] : void 0;
        e.classList.contains(t) ? e.classList.replace(t, n) : e.classList.replace(n, t);
      },
      _hasClass: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.ROOT_EL,
          n = !1;
        return (
          e.split(" ").forEach(function (e) {
            t.classList.contains(e) && (n = !0);
          }),
          n
        );
      },
      _findParent: function (e, t) {
        if ((e && "BODY" === e.tagName.toUpperCase()) || "HTML" === e.tagName.toUpperCase()) return null;
        for (e = e.parentNode; e && "BODY" !== e.tagName.toUpperCase() && !e.classList.contains(t); ) e = e.parentNode;
        return e && "BODY" !== e.tagName.toUpperCase() ? e : null;
      },
      _triggerWindowEvent: function (e) {
        var t;
        "undefined" != typeof window &&
          (document.createEvent ? ("function" == typeof Event ? (t = new Event(e)) : (t = document.createEvent("Event")).initEvent(e, !1, !0), window.dispatchEvent(t)) : window.fireEvent("on".concat(e), document.createEventObject()));
      },
      _triggerEvent: function (e) {
        this._triggerWindowEvent("layout".concat(e)),
          this._listeners
            .filter(function (t) {
              return t.event === e;
            })
            .forEach(function (e) {
              return e.callback.call(null);
            });
      },
      _updateInlineStyle: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        this._styleEl || ((this._styleEl = document.createElement("style")), (this._styleEl.type = "text/css"), document.head.appendChild(this._styleEl));
        var n =
          "\n.layout-menu-fixed .layout-navbar-full .layout-menu,\n.layout-menu-fixed-offcanvas .layout-navbar-full .layout-menu {\n  top: {navbarHeight}px !important;\n}\n.layout-page {\n  padding-top: {navbarHeight}px !important;\n}\n.content-wrapper {\n  padding-bottom: {footerHeight}px !important;\n}"
            .replace(/\{navbarHeight\}/gi, e)
            .replace(/\{footerHeight\}/gi, t);
        this._curStyle !== n && ((this._curStyle = n), (this._styleEl.textContent = n));
      },
      _removeInlineStyle: function () {
        this._styleEl && document.head.removeChild(this._styleEl), (this._styleEl = null), (this._curStyle = null);
      },
      _redrawLayoutMenu: function () {
        var e = this.getLayoutMenu();
        if (e && e.querySelector(".menu")) {
          var t = e.querySelector(".menu-inner"),
            n = t.scrollTop,
            i = document.documentElement.scrollTop;
          return (e.style.display = "none"), (e.style.display = ""), (t.scrollTop = n), (document.documentElement.scrollTop = i), !0;
        }
        return !1;
      },
      _supportsTransitionEnd: function () {
        if (window.QUnit) return !1;
        var e = document.body || document.documentElement;
        if (!e) return !1;
        var t = !1;
        return (
          u.forEach(function (n) {
            void 0 !== e.style[n] && (t = !0);
          }),
          t
        );
      },
      _getNavbarHeight: function () {
        var e = this,
          t = this.getLayoutNavbar();
        if (!t) return 0;
        if (!this.isSmallScreen()) return t.getBoundingClientRect().height;
        var n = t.cloneNode(!0);
        (n.id = null),
          (n.style.visibility = "hidden"),
          (n.style.position = "absolute"),
          Array.prototype.slice.call(n.querySelectorAll(".collapse.show")).forEach(function (t) {
            return e._removeClass("show", t);
          }),
          t.parentNode.insertBefore(n, t);
        var i = n.getBoundingClientRect().height;
        return n.parentNode.removeChild(n), i;
      },
      _getFooterHeight: function () {
        var e = this.getLayoutFooter();
        return e ? e.getBoundingClientRect().height : 0;
      },
      _getAnimationDuration: function (e) {
        var t = window.getComputedStyle(e).transitionDuration;
        return parseFloat(t) * (-1 !== t.indexOf("ms") ? 1 : 1e3);
      },
      _setMenuHoverState: function (e) {
        this[e ? "_addClass" : "_removeClass"]("layout-menu-hover");
      },
      _setCollapsed: function (e) {
        var t = this;
        this.isSmallScreen()
          ? e
            ? this._removeClass("layout-menu-expanded")
            : setTimeout(
                function () {
                  t._addClass("layout-menu-expanded");
                },
                this._redrawLayoutMenu() ? 5 : 0
              )
          : this[e ? "_addClass" : "_removeClass"]("layout-menu-collapsed");
      },
      _bindLayoutAnimationEndEvent: function (e, t) {
        var n = this,
          i = this.getMenu(),
          o = i ? this._getAnimationDuration(i) + 50 : 0;
        if (!o) return e.call(this), void t.call(this);
        (this._transitionCallback = function (e) {
          e.target === i && (n._unbindLayoutAnimationEndEvent(), t.call(n));
        }),
          l.forEach(function (e) {
            i.addEventListener(e, n._transitionCallback, !1);
          }),
          e.call(this),
          (this._transitionCallbackTimeout = setTimeout(function () {
            n._transitionCallback.call(n, { target: i });
          }, o));
      },
      _unbindLayoutAnimationEndEvent: function () {
        var e = this,
          t = this.getMenu();
        this._transitionCallbackTimeout && (clearTimeout(this._transitionCallbackTimeout), (this._transitionCallbackTimeout = null)),
          t &&
            this._transitionCallback &&
            l.forEach(function (n) {
              t.removeEventListener(n, e._transitionCallback, !1);
            }),
          this._transitionCallback && (this._transitionCallback = null);
      },
      _bindWindowResizeEvent: function () {
        var e = this;
        this._unbindWindowResizeEvent();
        var t = function () {
          e._resizeTimeout && (clearTimeout(e._resizeTimeout), (e._resizeTimeout = null)), e._triggerEvent("resize");
        };
        (this._resizeCallback = function () {
          e._resizeTimeout && clearTimeout(e._resizeTimeout), (e._resizeTimeout = setTimeout(t, e.RESIZE_DELAY));
        }),
          window.addEventListener("resize", this._resizeCallback, !1);
      },
      _unbindWindowResizeEvent: function () {
        this._resizeTimeout && (clearTimeout(this._resizeTimeout), (this._resizeTimeout = null)), this._resizeCallback && (window.removeEventListener("resize", this._resizeCallback, !1), (this._resizeCallback = null));
      },
      _bindMenuMouseEvents: function () {
        var e = this;
        if (!(this._menuMouseEnter && this._menuMouseLeave && this._windowTouchStart)) {
          var t = this.getLayoutMenu();
          if (!t) return this._unbindMenuMouseEvents();
          this._menuMouseEnter ||
            ((this._menuMouseEnter = function () {
              return e.isSmallScreen() || !e._hasClass("layout-menu-collapsed") || e.isOffcanvas() || e._hasClass("layout-transitioning") ? e._setMenuHoverState(!1) : e._setMenuHoverState(!0);
            }),
            t.addEventListener("mouseenter", this._menuMouseEnter, !1),
            t.addEventListener("touchstart", this._menuMouseEnter, !1)),
            this._menuMouseLeave ||
              ((this._menuMouseLeave = function () {
                e._setMenuHoverState(!1);
              }),
              t.addEventListener("mouseleave", this._menuMouseLeave, !1)),
            this._windowTouchStart ||
              ((this._windowTouchStart = function (t) {
                (t && t.target && e._findParent(t.target, ".layout-menu")) || e._setMenuHoverState(!1);
              }),
              window.addEventListener("touchstart", this._windowTouchStart, !0));
        }
      },
      _unbindMenuMouseEvents: function () {
        if (this._menuMouseEnter || this._menuMouseLeave || this._windowTouchStart) {
          var e = this.getLayoutMenu();
          this._menuMouseEnter && (e && (e.removeEventListener("mouseenter", this._menuMouseEnter, !1), e.removeEventListener("touchstart", this._menuMouseEnter, !1)), (this._menuMouseEnter = null)),
            this._menuMouseLeave && (e && e.removeEventListener("mouseleave", this._menuMouseLeave, !1), (this._menuMouseLeave = null)),
            this._windowTouchStart && (e && window.addEventListener("touchstart", this._windowTouchStart, !0), (this._windowTouchStart = null)),
            this._setMenuHoverState(!1);
        }
      },
      scrollToActive: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this._scrollToActive(e);
      },
      swipeIn: function (e, t) {
        this._swipeIn(e, t);
      },
      swipeOut: function (e, t) {
        this._swipeOut(e, t);
      },
      overlayTap: function (e, t) {
        this._overlayTap(e, t);
      },
      scrollPageTo: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500,
          n = document.scrollingElement;
        "string" == typeof e && (e = document.querySelector(e)), "number" != typeof e && (e = e.getBoundingClientRect().top + n.scrollTop);
        var i = n.scrollTop,
          o = e - i,
          r = +new Date();
        !(function a() {
          var s,
            l,
            u,
            c = +new Date() - r,
            d = ((s = c), (l = i), (u = o), (s /= t / 2) < 1 ? (u / 2) * s * s + l : (-u / 2) * ((s -= 1) * (s - 2) - 1) + l);
          (n.scrollTop = d), c < t ? requestAnimationFrame(a) : (n.scrollTop = e);
        })();
      },
      setCollapsed: function () {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : c("collapsed"),
          n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        this.getLayoutMenu() &&
          (this._unbindLayoutAnimationEndEvent(),
          n && this._supportsTransitionEnd()
            ? (this._addClass("layout-transitioning"),
              t && this._setMenuHoverState(!1),
              this._bindLayoutAnimationEndEvent(
                function () {
                  e._setCollapsed(t);
                },
                function () {
                  e._removeClass("layout-transitioning"), e._triggerWindowEvent("resize"), e._triggerEvent("toggle"), e._setMenuHoverState(!1);
                }
              ))
            : (this._addClass("layout-no-transition"),
              t && this._setMenuHoverState(!1),
              this._setCollapsed(t),
              setTimeout(function () {
                e._removeClass("layout-no-transition"), e._triggerWindowEvent("resize"), e._triggerEvent("toggle"), e._setMenuHoverState(!1);
              }, 1)));
      },
      toggleCollapsed: function () {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        this.setCollapsed(!this.isCollapsed(), e);
      },
      setPosition: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : c("fixed"),
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : c("offcanvas");
        this._removeClass("layout-menu-offcanvas layout-menu-fixed layout-menu-fixed-offcanvas"),
          !e && t ? this._addClass("layout-menu-offcanvas") : e && !t ? (this._addClass("layout-menu-fixed"), this._redrawLayoutMenu()) : e && t && (this._addClass("layout-menu-fixed-offcanvas"), this._redrawLayoutMenu()),
          this.update();
      },
      getLayoutMenu: function () {
        return document.querySelector(".layout-menu");
      },
      getMenu: function () {
        var e = this.getLayoutMenu();
        return e ? (this._hasClass("menu", e) ? e : e.querySelector(".menu")) : null;
      },
      getLayoutNavbar: function () {
        return document.querySelector(".layout-navbar");
      },
      getLayoutFooter: function () {
        return document.querySelector(".content-footer");
      },
      getLayoutContainer: function () {
        return document.querySelector(".layout-page");
      },
      setNavbar: function (e) {
        "sticky" === e
          ? (this._addClass("layout-navbar-fixed"), this._removeClass("layout-navbar-hidden"))
          : "hidden" === e
          ? (this._addClass("layout-navbar-hidden"), this._removeClass("layout-navbar-fixed"))
          : (this._removeClass("layout-navbar-hidden"), this._removeClass("layout-navbar-fixed")),
          this.update();
      },
      setFooterFixed: function () {
        this[(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : c("fixed")) ? "_addClass" : "_removeClass"]("layout-footer-fixed"), this.update();
      },
      setContentLayout: function () {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : c("contentLayout");
        setTimeout(function () {
          var n,
            i = document.querySelector(".content-wrapper > div"),
            o = document.querySelector(".layout-navbar"),
            r = document.querySelector(".layout-navbar > div"),
            a = document.querySelector(".layout-navbar .search-input-wrapper"),
            s = document.querySelector(".layout-navbar .search-input-wrapper .search-input"),
            l = document.querySelector(".content-footer > div"),
            u = [].slice.call(document.querySelectorAll(".container-fluid")),
            c = [].slice.call(document.querySelectorAll(".container-xxl")),
            d = document.querySelector(".menu-vertical"),
            f = !1;
          document.querySelector(".content-wrapper > .menu-horizontal > div") && ((f = !0), (n = document.querySelector(".content-wrapper > .menu-horizontal > div"))),
            "compact" === t
              ? (u.some(function (e) {
                  return [i, l].includes(e);
                }) && (e._removeClass("container-fluid", [i, l]), e._addClass("container-xxl", [i, l])),
                s && (e._removeClass("container-fluid", [s]), e._addClass("container-xxl", [s])),
                d &&
                  u.some(function (e) {
                    return [o].includes(e);
                  }) &&
                  (e._removeClass("container-fluid", [o]), e._addClass("container-xxl", [o])),
                f && (e._removeClass("container-fluid", n), e._addClass("container-xxl", n), r && (e._removeClass("container-fluid", r), e._addClass("container-xxl", r)), a && (e._removeClass("container-fluid", a), e._addClass("container-xxl", a))))
              : (c.some(function (e) {
                  return [i, l].includes(e);
                }) && (e._removeClass("container-xxl", [i, l]), e._addClass("container-fluid", [i, l])),
                s && (e._removeClass("container-xxl", [s]), e._addClass("container-fluid", [s])),
                d &&
                  c.some(function (e) {
                    return [o].includes(e);
                  }) &&
                  (e._removeClass("container-xxl", [o]), e._addClass("container-fluid", [o])),
                f && (e._removeClass("container-xxl", n), e._addClass("container-fluid", n), r && (e._removeClass("container-xxl", r), e._addClass("container-fluid", r)), a && (e._removeClass("container-xxl", a), e._addClass("container-fluid", a))));
        }, 100);
      },
      update: function () {
        ((this.getLayoutNavbar() && ((!this.isSmallScreen() && this.isLayoutNavbarFull() && this.isFixed()) || this.isNavbarFixed())) || (this.getLayoutFooter() && this.isFooterFixed())) &&
          this._updateInlineStyle(this._getNavbarHeight(), this._getFooterHeight()),
          this._bindMenuMouseEvents();
      },
      setAutoUpdate: function () {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : c("enable");
        t && !this._autoUpdate
          ? (this.on("resize.Helpers:autoUpdate", function () {
              return e.update();
            }),
            (this._autoUpdate = !0))
          : !t && this._autoUpdate && (this.off("resize.Helpers:autoUpdate"), (this._autoUpdate = !1));
      },
      updateCustomOptionCheck: function (e) {
        e.checked
          ? ("radio" === e.type &&
              [].slice.call(e.closest(".row").querySelectorAll(".custom-option")).map(function (e) {
                e.closest(".custom-option").classList.remove("checked");
              }),
            e.closest(".custom-option").classList.add("checked"))
          : e.closest(".custom-option").classList.remove("checked");
      },
      isRtl: function () {
        return "rtl" === document.querySelector("body").getAttribute("dir") || "rtl" === document.querySelector("html").getAttribute("dir");
      },
      isMobileDevice: function () {
        return void 0 !== window.orientation || -1 !== navigator.userAgent.indexOf("IEMobile");
      },
      isSmallScreen: function () {
        return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < this.LAYOUT_BREAKPOINT;
      },
      isLayoutNavbarFull: function () {
        return !!document.querySelector(".layout-wrapper.layout-navbar-full");
      },
      isCollapsed: function () {
        return this.isSmallScreen() ? !this._hasClass("layout-menu-expanded") : this._hasClass("layout-menu-collapsed");
      },
      isFixed: function () {
        return this._hasClass("layout-menu-fixed layout-menu-fixed-offcanvas");
      },
      isOffcanvas: function () {
        return this._hasClass("layout-menu-offcanvas layout-menu-fixed-offcanvas");
      },
      isNavbarFixed: function () {
        return this._hasClass("layout-navbar-fixed") || (!this.isSmallScreen() && this.isFixed() && this.isLayoutNavbarFull());
      },
      isFooterFixed: function () {
        return this._hasClass("layout-footer-fixed");
      },
      isLightStyle: function () {
        return document.documentElement.classList.contains("light-style");
      },
      isDarkStyle: function () {
        return document.documentElement.classList.contains("dark-style");
      },
      on: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : c("event"),
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : c("callback"),
          o = i(e.split("."), 1)[0],
          r = n(e.split(".")).slice(1);
        (r = r.join(".") || null), this._listeners.push({ event: o, namespace: r, callback: t });
      },
      off: function () {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : c("event"),
          o = i(t.split("."), 1)[0],
          r = n(t.split(".")).slice(1);
        (r = r.join(".") || null),
          this._listeners
            .filter(function (e) {
              return e.event === o && e.namespace === r;
            })
            .forEach(function (t) {
              return e._listeners.splice(e._listeners.indexOf(t), 1);
            });
      },
      init: function () {
        var e = this;
        this._initialized ||
          ((this._initialized = !0),
          this._updateInlineStyle(0),
          this._bindWindowResizeEvent(),
          this.off("init._Helpers"),
          this.on("init._Helpers", function () {
            e.off("resize._Helpers:redrawMenu"),
              e.on("resize._Helpers:redrawMenu", function () {
                e.isSmallScreen() && !e.isCollapsed() && e._redrawLayoutMenu();
              }),
              "number" == typeof document.documentMode &&
                document.documentMode < 11 &&
                (e.off("resize._Helpers:ie10RepaintBody"),
                e.on("resize._Helpers:ie10RepaintBody", function () {
                  if (!e.isFixed()) {
                    var t = document.documentElement.scrollTop;
                    (document.body.style.display = "none"), (document.body.style.display = "block"), (document.documentElement.scrollTop = t);
                  }
                }));
          }),
          this._triggerEvent("init"));
      },
      destroy: function () {
        var e = this;
        this._initialized &&
          ((this._initialized = !1),
          this._removeClass("layout-transitioning"),
          this._removeInlineStyle(),
          this._unbindLayoutAnimationEndEvent(),
          this._unbindWindowResizeEvent(),
          this._unbindMenuMouseEvents(),
          this.setAutoUpdate(!1),
          this.off("init._Helpers"),
          this._listeners
            .filter(function (e) {
              return "init" !== e.event;
            })
            .forEach(function (t) {
              return e._listeners.splice(e._listeners.indexOf(t), 1);
            }));
      },
      initPasswordToggle: function () {
        var e = document.querySelectorAll(".form-password-toggle i");
        null != e &&
          e.forEach(function (e) {
            e.addEventListener("click", function (t) {
              t.preventDefault();
              var n = e.closest(".form-password-toggle"),
                i = n.querySelector("i"),
                o = n.querySelector("input");
              "text" === o.getAttribute("type")
                ? (o.setAttribute("type", "password"), i.classList.replace("mdi-eye-outline", "mdi-eye-off-outline"))
                : "password" === o.getAttribute("type") && (o.setAttribute("type", "text"), i.classList.replace("mdi-eye-off-outline", "mdi-eye-outline"));
            });
          });
      },
      initCustomOptionCheck: function () {
        var e = this;
        [].slice.call(document.querySelectorAll(".custom-option .form-check-input")).map(function (t) {
          e.updateCustomOptionCheck(t),
            t.addEventListener("click", function (n) {
              e.updateCustomOptionCheck(t);
            });
        });
      },
      initSpeechToText: function () {
        var e = window.SpeechRecognition || window.webkitSpeechRecognition,
          t = document.querySelectorAll(".speech-to-text");
        if (null != e && null != t) {
          var n = new e();
          document.querySelectorAll(".speech-to-text i").forEach(function (e) {
            var t = !1;
            e.addEventListener("click", function () {
              e.closest(".input-group").querySelector(".form-control").focus(),
                (n.onspeechstart = function () {
                  t = !0;
                }),
                !1 === t && n.start(),
                (n.onerror = function () {
                  t = !1;
                }),
                (n.onresult = function (t) {
                  e.closest(".input-group").querySelector(".form-control").value = t.results[0][0].transcript;
                }),
                (n.onspeechend = function () {
                  (t = !1), n.stop();
                });
            });
          });
        }
      },
      navTabsAnimation: function () {
        setTimeout(function () {
          document.querySelectorAll(".nav-tabs").forEach(function (e) {
            var t = e.querySelector(".tab-slider");
            if (!t) {
              var n = document.createElement("span");
              n.setAttribute("class", "tab-slider"), (t = e.appendChild(n));
            }
            var i = e.closest(".nav-align-left") || e.closest(".nav-align-right"),
              o = function (n) {
                var o = n.parentElement.getBoundingClientRect(),
                  r = n.getBoundingClientRect(),
                  a = r.x - o.x,
                  s = e.closest(".nav-align-bottom");
                i
                  ? ((t.style.top = r.y - o.y + "px"), (t.style[e.closest(".nav-align-right") ? "inset-inline-start" : "inset-inline-end"] = 0), (t.style.height = r.height + "px"))
                  : ((t.style.left = a + "px"), (t.style.width = r.width + "px"), s || (t.style.bottom = 0));
              };
            e.addEventListener("click", function (e) {
              e.target.closest(".nav-item .active") && o(e.target.closest(".nav-item"));
            }),
              o(e.querySelector(".nav-link.active").closest(".nav-item"));
          });
        }, 50);
      },
      initNavbarDropdownScrollbar: function () {
        var e = document.querySelectorAll(".navbar-dropdown .scrollable-container"),
          t = window.PerfectScrollbar;
        void 0 !== t &&
          null != e &&
          e.forEach(function (e) {
            new t(e, { wheelPropagation: !1, suppressScrollX: !0 });
          });
      },
      ajaxCall: function (e) {
        return new Promise(function (t, n) {
          var i = new XMLHttpRequest();
          i.open("GET", e),
            (i.onload = function () {
              return 200 === i.status ? t(i.response) : n(Error(i.statusText));
            }),
            (i.onerror = function (e) {
              return n(Error("Network Error: ".concat(e)));
            }),
            i.send();
        });
      },
      initSidebarToggle: function () {
        document.querySelectorAll('[data-bs-toggle="sidebar"]').forEach(function (e) {
          e.addEventListener("click", function () {
            var t = e.getAttribute("data-target"),
              n = e.getAttribute("data-overlay"),
              i = document.querySelectorAll(".app-overlay");
            document.querySelectorAll(t).forEach(function (e) {
              e.classList.toggle("show"),
                null != n &&
                  !1 !== n &&
                  void 0 !== i &&
                  (e.classList.contains("show") ? i[0].classList.add("show") : i[0].classList.remove("show"),
                  i[0].addEventListener("click", function (t) {
                    t.currentTarget.classList.remove("show"), e.classList.remove("show");
                  }));
            });
          });
        });
      },
    };
    return (
      "undefined" != typeof window &&
        (d.init(),
        d.isMobileDevice() && window.chrome && document.documentElement.classList.add("layout-menu-100vh"),
        "complete" === document.readyState
          ? d.update()
          : document.addEventListener("DOMContentLoaded", function e() {
              d.update(), document.removeEventListener("DOMContentLoaded", e);
            })),
      t
    );
  })();
});

!(function (e, t) {
  if ("object" == typeof exports && "object" == typeof module) module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var n = t();
    for (var i in n) ("object" == typeof exports ? exports : e)[i] = n[i];
  }
})(self, function () {
  return (function () {
    "use strict";
    var e = {
        d: function (t, n) {
          for (var i in n) e.o(n, i) && !e.o(t, i) && Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
        },
        o: function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        },
        r: function (e) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        },
      },
      t = {};
    function n(e) {
      return (
        (n =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
              }),
        n(e)
      );
    }
    function i(e) {
      return (
        (function (e) {
          if (Array.isArray(e)) return o(e);
        })(e) ||
        (function (e) {
          if (("undefined" != typeof Symbol && null != e[Symbol.iterator]) || null != e["@@iterator"]) return Array.from(e);
        })(e) ||
        (function (e, t) {
          if (e) {
            if ("string" == typeof e) return o(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0;
          }
        })(e) ||
        (function () {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        })()
      );
    }
    function o(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
      return i;
    }
    function r(e, t) {
      for (var i = 0; i < t.length; i++) {
        var o = t[i];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          "value" in o && (o.writable = !0),
          Object.defineProperty(
            e,
            (void 0,
            (r = (function (e, t) {
              if ("object" !== n(e) || null === e) return e;
              var i = e[Symbol.toPrimitive];
              if (void 0 !== i) {
                var o = i.call(e, "string");
                if ("object" !== n(o)) return o;
                throw new TypeError("@@toPrimitive must return a primitive value.");
              }
              return String(e);
            })(o.key)),
            "symbol" === n(r) ? r : String(r)),
            o
          );
      }
      var r;
    }
    e.r(t),
      e.d(t, {
        Menu: function () {
          return l;
        },
      });
    var s = ["transitionend", "webkitTransitionEnd", "oTransitionEnd"],
      l = (function () {
        function e(t) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
          if (
            ((function (e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            })(this, e),
            (this._el = t),
            (this._horizontal = "horizontal" === n.orientation),
            (this._animate = !1 !== n.animate),
            (this._accordion = !1 !== n.accordion),
            (this._showDropdownOnHover = Boolean(n.showDropdownOnHover)),
            (this._closeChildren = Boolean(n.closeChildren)),
            (this._rtl = "rtl" === document.documentElement.getAttribute("dir") || "rtl" === document.body.getAttribute("dir")),
            (this._onOpen = n.onOpen || function () {}),
            (this._onOpened = n.onOpened || function () {}),
            (this._onClose = n.onClose || function () {}),
            (this._onClosed = n.onClosed || function () {}),
            (this._psScroll = null),
            (this._topParent = null),
            (this._menuBgClass = null),
            t.classList.add("menu"),
            t.classList[this._animate ? "remove" : "add"]("menu-no-animation"),
            this._horizontal)
          ) {
            t.classList.add("menu-horizontal"), t.classList.remove("menu-vertical"), (this._inner = t.querySelector(".menu-inner"));
            var o = this._inner.parentNode;
            (this._prevBtn = t.querySelector(".menu-horizontal-prev")),
              this._prevBtn || ((this._prevBtn = document.createElement("a")), (this._prevBtn.href = "#"), (this._prevBtn.className = "menu-horizontal-prev"), o.appendChild(this._prevBtn)),
              (this._wrapper = t.querySelector(".menu-horizontal-wrapper")),
              this._wrapper || ((this._wrapper = document.createElement("div")), (this._wrapper.className = "menu-horizontal-wrapper"), this._wrapper.appendChild(this._inner), o.appendChild(this._wrapper)),
              (this._nextBtn = t.querySelector(".menu-horizontal-next")),
              this._nextBtn || ((this._nextBtn = document.createElement("a")), (this._nextBtn.href = "#"), (this._nextBtn.className = "menu-horizontal-next"), o.appendChild(this._nextBtn)),
              (this._innerPosition = 0),
              this.update();
          } else {
            t.classList.add("menu-vertical"), t.classList.remove("menu-horizontal");
            var r = i || window.PerfectScrollbar;
            r
              ? ((this._scrollbar = new r(t.querySelector(".menu-inner"), { suppressScrollX: !0, wheelPropagation: !e._hasClass("layout-menu-fixed layout-menu-fixed-offcanvas") })), (window.Helpers.menuPsScroll = this._scrollbar))
              : t.querySelector(".menu-inner").classList.add("overflow-auto");
          }
          for (var s = t.classList, l = 0; l < s.length; l++) s[l].startsWith("bg-") && (this._menuBgClass = s[l]);
          t.setAttribute("data-bg-class", this._menuBgClass), this._horizontal && window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT && this.switchMenu("vertical"), this._bindEvents(), (t.menuInstance = this);
        }
        var t, n, o;
        return (
          (t = e),
          (n = [
            {
              key: "_bindEvents",
              value: function () {
                var t = this;
                (this._evntElClick = function (n) {
                  if (n.target.closest("ul") && n.target.closest("ul").classList.contains("menu-inner")) {
                    var i = e._findParent(n.target, "menu-item", !1);
                    i && (t._topParent = i.childNodes[0]);
                  }
                  var o = n.target.classList.contains("menu-toggle") ? n.target : e._findParent(n.target, "menu-toggle", !1);
                  o && (n.preventDefault(), "true" !== o.getAttribute("data-hover") && t.toggle(o));
                }),
                  ((!this._showDropdownOnHover && this._horizontal) || !this._horizontal || window.Helpers.isMobileDevice) && this._el.addEventListener("click", this._evntElClick),
                  (this._evntWindowResize = function () {
                    t.update(), t._lastWidth !== window.innerWidth && ((t._lastWidth = window.innerWidth), t.update());
                    var e = document.querySelector("[data-template^='horizontal-menu']");
                    t._horizontal || e || t.manageScroll();
                  }),
                  window.addEventListener("resize", this._evntWindowResize),
                  this._horizontal &&
                    ((this._evntPrevBtnClick = function (e) {
                      e.preventDefault(), t._prevBtn.classList.contains("disabled") || t._slide("prev");
                    }),
                    this._prevBtn.addEventListener("click", this._evntPrevBtnClick),
                    (this._evntNextBtnClick = function (e) {
                      e.preventDefault(), t._nextBtn.classList.contains("disabled") || t._slide("next");
                    }),
                    this._nextBtn.addEventListener("click", this._evntNextBtnClick),
                    (this._evntBodyClick = function (e) {
                      !t._inner.contains(e.target) && t._el.querySelectorAll(".menu-inner > .menu-item.open").length && t.closeAll();
                    }),
                    document.body.addEventListener("click", this._evntBodyClick),
                    this._showDropdownOnHover &&
                      ((this._evntElMouseOver = function (e) {
                        if (e.target !== e.currentTarget && !e.target.parentNode.classList.contains("open")) {
                          var n = e.target.classList.contains("menu-toggle") ? e.target : null;
                          n && (e.preventDefault(), "true" !== n.getAttribute("data-hover") && t.toggle(n));
                        }
                        e.stopPropagation();
                      }),
                      this._horizontal && window.screen.width > window.Helpers.LAYOUT_BREAKPOINT && this._el.addEventListener("mouseover", this._evntElMouseOver),
                      (this._evntElMouseOut = function (n) {
                        var i = n.currentTarget,
                          o = n.target,
                          r = n.toElement || n.relatedTarget;
                        if (
                          (o.closest("ul") && o.closest("ul").classList.contains("menu-inner") && (t._topParent = o),
                          o !== i && (o.parentNode.classList.contains("open") || !o.classList.contains("menu-toggle")) && r && r.parentNode && !r.parentNode.classList.contains("menu-link"))
                        ) {
                          if (t._topParent && !e.childOf(r, t._topParent.parentNode)) {
                            var s = t._topParent.classList.contains("menu-toggle") ? t._topParent : null;
                            s && (n.preventDefault(), "true" !== s.getAttribute("data-hover") && (t.toggle(s), (t._topParent = null)));
                          }
                          if (e.childOf(r, o.parentNode)) return;
                          var l = o.classList.contains("menu-toggle") ? o : null;
                          l && (n.preventDefault(), "true" !== l.getAttribute("data-hover") && t.toggle(l));
                        }
                        n.stopPropagation();
                      }),
                      this._horizontal && window.screen.width > window.Helpers.LAYOUT_BREAKPOINT && this._el.addEventListener("mouseout", this._evntElMouseOut)));
              },
            },
            {
              key: "_unbindEvents",
              value: function () {
                this._evntElClick && (this._el.removeEventListener("click", this._evntElClick), (this._evntElClick = null)),
                  this._evntElMouseOver && (this._el.removeEventListener("mouseover", this._evntElMouseOver), (this._evntElMouseOver = null)),
                  this._evntElMouseOut && (this._el.removeEventListener("mouseout", this._evntElMouseOut), (this._evntElMouseOut = null)),
                  this._evntWindowResize && (window.removeEventListener("resize", this._evntWindowResize), (this._evntWindowResize = null)),
                  this._evntBodyClick && (document.body.removeEventListener("click", this._evntBodyClick), (this._evntBodyClick = null)),
                  this._evntInnerMousemove && (this._inner.removeEventListener("mousemove", this._evntInnerMousemove), (this._evntInnerMousemove = null)),
                  this._evntInnerMouseleave && (this._inner.removeEventListener("mouseleave", this._evntInnerMouseleave), (this._evntInnerMouseleave = null));
              },
            },
            {
              key: "open",
              value: function (t) {
                var n = this,
                  i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this._closeChildren,
                  o = this._findUnopenedParent(e._getItem(t, !0), i);
                if (o) {
                  var r = e._getLink(o, !0);
                  e._promisify(this._onOpen, this, o, r, e._findMenu(o))
                    .then(function () {
                      n._horizontal && e._isRoot(o)
                        ? (n._toggleDropdown(!0, o, i), n._onOpened && n._onOpened(n, o, r, e._findMenu(o)))
                        : n._animate && !n._horizontal
                        ? (window.requestAnimationFrame(function () {
                            return n._toggleAnimation(!0, o, !1);
                          }),
                          n._accordion && n._closeOther(o, i))
                        : n._animate
                        ? (n._toggleDropdown(!0, o, i), n._onOpened && n._onOpened(n, o, r, e._findMenu(o)))
                        : (o.classList.add("open"), n._onOpened && n._onOpened(n, o, r, e._findMenu(o)), n._accordion && n._closeOther(o, i));
                    })
                    .catch(function () {});
                }
              },
            },
            {
              key: "close",
              value: function (t) {
                var n = this,
                  i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this._closeChildren,
                  o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                  r = e._getItem(t, !0),
                  s = e._getLink(t, !0);
                r.classList.contains("open") &&
                  !r.classList.contains("disabled") &&
                  e
                    ._promisify(this._onClose, this, r, s, e._findMenu(r), o)
                    .then(function () {
                      if (n._horizontal && e._isRoot(r)) n._toggleDropdown(!1, r, i), n._onClosed && n._onClosed(n, r, s, e._findMenu(r));
                      else if (n._animate && !n._horizontal)
                        window.requestAnimationFrame(function () {
                          return n._toggleAnimation(!1, r, i);
                        });
                      else {
                        if ((r.classList.remove("open"), i)) for (var t = r.querySelectorAll(".menu-item.open"), o = 0, l = t.length; o < l; o++) t[o].classList.remove("open");
                        n._onClosed && n._onClosed(n, r, s, e._findMenu(r));
                      }
                    })
                    .catch(function () {});
              },
            },
            {
              key: "_closeOther",
              value: function (t, n) {
                for (var i = e._findChild(t.parentNode, ["menu-item", "open"]), o = 0, r = i.length; o < r; o++) i[o] !== t && this.close(i[o], n);
              },
            },
            {
              key: "toggle",
              value: function (t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this._closeChildren,
                  i = e._getItem(t, !0);
                i.classList.contains("open") ? this.close(i, n) : this.open(i, n);
              },
            },
            {
              key: "_toggleDropdown",
              value: function (t, n, i) {
                var o = e._findMenu(n),
                  r = n,
                  s = !1;
                if (t) {
                  e._findParent(n, "menu-sub", !1) && ((s = !0), (n = this._topParent ? this._topParent.parentNode : n));
                  var l = Math.round(this._wrapper.getBoundingClientRect().width),
                    a = this._innerPosition,
                    u = this._getItemOffset(n),
                    c = Math.round(n.getBoundingClientRect().width);
                  u - 5 <= -1 * a ? (this._innerPosition = -1 * u) : u + a + c + 5 >= l && (this._innerPosition = c > l ? -1 * u : -1 * (u + c - l)), r.classList.add("open");
                  var d = Math.round(o.getBoundingClientRect().width);
                  s
                    ? u + this._innerPosition + 2 * d > l && d < l && d >= c && (o.style.left = [this._rtl ? "100%" : "-100%"])
                    : u + this._innerPosition + d > l && d < l && d > c && (o.style[this._rtl ? "marginRight" : "marginLeft"] = "-".concat(d - c, "px")),
                    this._closeOther(r, i),
                    this._updateSlider();
                } else {
                  var h = e._findChild(n, ["menu-toggle"]);
                  if ((h.length && h[0].removeAttribute("data-hover", "true"), n.classList.remove("open"), (o.style[this._rtl ? "marginRight" : "marginLeft"] = null), i))
                    for (var _ = o.querySelectorAll(".menu-item.open"), v = 0, m = _.length; v < m; v++) _[v].classList.remove("open");
                }
              },
            },
            {
              key: "_slide",
              value: function (e) {
                var t,
                  n = Math.round(this._wrapper.getBoundingClientRect().width),
                  i = this._innerWidth;
                "next" === e ? i + (t = this._getSlideNextPos()) < n && (t = n - i) : (t = this._getSlidePrevPos()) > 0 && (t = 0), (this._innerPosition = t), this.update();
              },
            },
            {
              key: "_getSlideNextPos",
              value: function () {
                for (var e = Math.round(this._wrapper.getBoundingClientRect().width), t = this._innerPosition, n = this._inner.childNodes[0], i = 0; n; ) {
                  if (n.tagName) {
                    var o = Math.round(n.getBoundingClientRect().width);
                    if (i + t - 5 <= e && i + t + o + 5 >= e) {
                      o > e && i === -1 * t && (i += o);
                      break;
                    }
                    i += o;
                  }
                  n = n.nextSibling;
                }
                return -1 * i;
              },
            },
            {
              key: "_getSlidePrevPos",
              value: function () {
                for (var e = Math.round(this._wrapper.getBoundingClientRect().width), t = this._innerPosition, n = this._inner.childNodes[0], i = 0; n; ) {
                  if (n.tagName) {
                    var o = Math.round(n.getBoundingClientRect().width);
                    if (i - 5 <= -1 * t && i + o + 5 >= -1 * t) {
                      o <= e && (i = i + o - e);
                      break;
                    }
                    i += o;
                  }
                  n = n.nextSibling;
                }
                return -1 * i;
              },
            },
            {
              key: "_findUnopenedParent",
              value: function (t, n) {
                for (var i = [], o = null; t; ) t.classList.contains("disabled") ? ((o = null), (i = [])) : (t.classList.contains("open") || (o = t), i.push(t)), (t = e._findParent(t, "menu-item", !1));
                if (!o) return null;
                if (1 === i.length) return o;
                for (var r = 0, s = (i = i.slice(0, i.indexOf(o))).length; r < s; r++)
                  if ((i[r].classList.add("open"), this._accordion))
                    for (var l = e._findChild(i[r].parentNode, ["menu-item", "open"]), a = 0, u = l.length; a < u; a++)
                      if (l[a] !== i[r] && (l[a].classList.remove("open"), n)) for (var c = l[a].querySelectorAll(".menu-item.open"), d = 0, h = c.length; d < h; d++) c[d].classList.remove("open");
                return o;
              },
            },
            {
              key: "_toggleAnimation",
              value: function (t, n, i) {
                var o = this,
                  r = e._getLink(n, !0),
                  s = e._findMenu(n);
                e._unbindAnimationEndEvent(n);
                var l = Math.round(r.getBoundingClientRect().height);
                n.style.overflow = "hidden";
                var a = function () {
                  n.classList.remove("menu-item-animating"), n.classList.remove("menu-item-closing"), (n.style.overflow = null), (n.style.height = null), o._horizontal || o.update();
                };
                t
                  ? ((n.style.height = "".concat(l, "px")),
                    n.classList.add("menu-item-animating"),
                    n.classList.add("open"),
                    e._bindAnimationEndEvent(n, function () {
                      a(), o._onOpened(o, n, r, s);
                    }),
                    setTimeout(function () {
                      n.style.height = "".concat(l + Math.round(s.getBoundingClientRect().height), "px");
                    }, 50))
                  : ((n.style.height = "".concat(l + Math.round(s.getBoundingClientRect().height), "px")),
                    n.classList.add("menu-item-animating"),
                    n.classList.add("menu-item-closing"),
                    e._bindAnimationEndEvent(n, function () {
                      if ((n.classList.remove("open"), a(), i)) for (var e = n.querySelectorAll(".menu-item.open"), t = 0, l = e.length; t < l; t++) e[t].classList.remove("open");
                      o._onClosed(o, n, r, s);
                    }),
                    setTimeout(function () {
                      n.style.height = "".concat(l, "px");
                    }, 50));
              },
            },
            {
              key: "_getItemOffset",
              value: function (e) {
                for (var t = this._inner.childNodes[0], n = 0; t !== e; ) t.tagName && (n += Math.round(t.getBoundingClientRect().width)), (t = t.nextSibling);
                return n;
              },
            },
            {
              key: "_updateSlider",
              value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                  t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                  n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                  i = null !== e ? e : Math.round(this._wrapper.getBoundingClientRect().width),
                  o = null !== t ? t : this._innerWidth,
                  r = null !== n ? n : this._innerPosition;
                o < i || window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT ? (this._prevBtn.classList.add("d-none"), this._nextBtn.classList.add("d-none")) : (this._prevBtn.classList.remove("d-none"), this._nextBtn.classList.remove("d-none")),
                  o > i &&
                    window.innerWidth > window.Helpers.LAYOUT_BREAKPOINT &&
                    (0 === r ? this._prevBtn.classList.add("disabled") : this._prevBtn.classList.remove("disabled"), o + r <= i ? this._nextBtn.classList.add("disabled") : this._nextBtn.classList.remove("disabled"));
              },
            },
            {
              key: "_innerWidth",
              get: function () {
                for (var e = this._inner.childNodes, t = 0, n = 0, i = e.length; n < i; n++) e[n].tagName && (t += Math.round(e[n].getBoundingClientRect().width));
                return t;
              },
            },
            {
              key: "_innerPosition",
              get: function () {
                return parseInt(this._inner.style[this._rtl ? "marginRight" : "marginLeft"] || "0px", 10);
              },
              set: function (e) {
                return (this._inner.style[this._rtl ? "marginRight" : "marginLeft"] = "".concat(e, "px")), e;
              },
            },
            {
              key: "closeAll",
              value: function () {
                for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._closeChildren, t = this._el.querySelectorAll(".menu-inner > .menu-item.open"), n = 0, i = t.length; n < i; n++) this.close(t[n], e);
              },
            },
            {
              key: "update",
              value: function () {
                if (this._horizontal) {
                  this.closeAll();
                  var e = Math.round(this._wrapper.getBoundingClientRect().width),
                    t = this._innerWidth,
                    n = this._innerPosition;
                  e - n > t && ((n = e - t) > 0 && (n = 0), (this._innerPosition = n)), this._updateSlider(e, t, n);
                } else this._scrollbar && this._scrollbar.update();
              },
            },
            {
              key: "manageScroll",
              value: function () {
                var e = window.PerfectScrollbar,
                  t = document.querySelector(".menu-inner");
                if (window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT) null !== this._scrollbar && (this._scrollbar.destroy(), (this._scrollbar = null)), t.classList.add("overflow-auto");
                else {
                  if (null === this._scrollbar) {
                    var n = new e(document.querySelector(".menu-inner"), { suppressScrollX: !0, wheelPropagation: !1 });
                    this._scrollbar = n;
                  }
                  t.classList.remove("overflow-auto");
                }
              },
            },
            {
              key: "switchMenu",
              value: function (e) {
                this._unbindEvents();
                var t = document.querySelector("nav.layout-navbar"),
                  n = document.querySelector("#navbar-collapse"),
                  o = document.querySelector("#layout-menu div"),
                  r = document.querySelector("#layout-menu"),
                  s = document.querySelector(".menu-horizontal-wrapper"),
                  l = document.querySelector(".menu-inner"),
                  a = document.querySelector(".app-brand"),
                  u = document.querySelector(".layout-menu-toggle"),
                  c = document.querySelectorAll(".menu-inner .active");
                if ("vertical" === e) {
                  var d, h;
                  (this._horizontal = !1),
                    o.insertBefore(a, s),
                    o.insertBefore(l, s),
                    o.classList.add("flex-column", "p-0"),
                    (d = r.classList).remove.apply(d, i(r.classList)),
                    (h = r.classList).add.apply(h, ["layout-menu", "menu", "menu-vertical"].concat([this._menuBgClass])),
                    a.classList.remove("d-none", "d-lg-flex"),
                    u.classList.remove("d-none"),
                    l.classList.add("overflow-auto");
                  for (var _ = 0; _ < c.length - 1; ++_) c[_].classList.add("open");
                } else {
                  var v, m;
                  (this._horizontal = !0),
                    t.children[0].insertBefore(a, n),
                    a.classList.add("d-none", "d-lg-flex"),
                    s.appendChild(l),
                    o.classList.remove("flex-column", "p-0"),
                    (v = r.classList).remove.apply(v, i(r.classList)),
                    (m = r.classList).add.apply(m, ["layout-menu-horizontal", "menu", "menu-horizontal", "container-fluid", "flex-grow-0"].concat([this._menuBgClass])),
                    u.classList.add("d-none"),
                    l.classList.remove("overflow-auto");
                  for (var p = 0; p < c.length; ++p) c[p].classList.remove("open");
                }
                this._bindEvents();
              },
            },
            {
              key: "destroy",
              value: function () {
                if (this._el) {
                  this._unbindEvents();
                  for (var t = this._el.querySelectorAll(".menu-item"), n = 0, i = t.length; n < i; n++)
                    e._unbindAnimationEndEvent(t[n]), t[n].classList.remove("menu-item-animating"), t[n].classList.remove("open"), (t[n].style.overflow = null), (t[n].style.height = null);
                  for (var o = this._el.querySelectorAll(".menu-menu"), r = 0, s = o.length; r < s; r++) (o[r].style.marginRight = null), (o[r].style.marginLeft = null);
                  this._el.classList.remove("menu-no-animation"),
                    this._wrapper &&
                      (this._prevBtn.parentNode.removeChild(this._prevBtn),
                      this._nextBtn.parentNode.removeChild(this._nextBtn),
                      this._wrapper.parentNode.insertBefore(this._inner, this._wrapper),
                      this._wrapper.parentNode.removeChild(this._wrapper),
                      (this._inner.style.marginLeft = null),
                      (this._inner.style.marginRight = null)),
                    (this._el.menuInstance = null),
                    delete this._el.menuInstance,
                    (this._el = null),
                    (this._horizontal = null),
                    (this._animate = null),
                    (this._accordion = null),
                    (this._showDropdownOnHover = null),
                    (this._closeChildren = null),
                    (this._rtl = null),
                    (this._onOpen = null),
                    (this._onOpened = null),
                    (this._onClose = null),
                    (this._onClosed = null),
                    this._scrollbar && (this._scrollbar.destroy(), (this._scrollbar = null)),
                    (this._inner = null),
                    (this._prevBtn = null),
                    (this._wrapper = null),
                    (this._nextBtn = null);
                }
              },
            },
          ]),
          (o = [
            {
              key: "childOf",
              value: function (e, t) {
                if (e.parentNode) {
                  for (; (e = e.parentNode) && e !== t; );
                  return !!e;
                }
                return !1;
              },
            },
            {
              key: "_isRoot",
              value: function (t) {
                return !e._findParent(t, "menu-item", !1);
              },
            },
            {
              key: "_findParent",
              value: function (e, t) {
                var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                if ("BODY" === e.tagName.toUpperCase()) return null;
                for (e = e.parentNode; "BODY" !== e.tagName.toUpperCase() && !e.classList.contains(t); ) e = e.parentNode;
                if (!(e = "BODY" !== e.tagName.toUpperCase() ? e : null) && n) throw new Error("Cannot find `.".concat(t, "` parent element"));
                return e;
              },
            },
            {
              key: "_findChild",
              value: function (e, t) {
                for (var n = e.childNodes, i = [], o = 0, r = n.length; o < r; o++)
                  if (n[o].classList) {
                    for (var s = 0, l = 0; l < t.length; l++) n[o].classList.contains(t[l]) && (s += 1);
                    t.length === s && i.push(n[o]);
                  }
                return i;
              },
            },
            {
              key: "_findMenu",
              value: function (e) {
                for (var t = e.childNodes[0], n = null; t && !n; ) t.classList && t.classList.contains("menu-sub") && (n = t), (t = t.nextSibling);
                if (!n) throw new Error("Cannot find `.menu-sub` element for the current `.menu-toggle`");
                return n;
              },
            },
            {
              key: "_hasClass",
              value: function (e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.Helpers.ROOT_EL,
                  n = !1;
                return (
                  e.split(" ").forEach(function (e) {
                    t.classList.contains(e) && (n = !0);
                  }),
                  n
                );
              },
            },
            {
              key: "_getItem",
              value: function (t, n) {
                var i = null,
                  o = n ? "menu-toggle" : "menu-link";
                if ((t.classList.contains("menu-item") ? e._findChild(t, [o]).length && (i = t) : t.classList.contains(o) && (i = t.parentNode.classList.contains("menu-item") ? t.parentNode : null), !i))
                  throw new Error("".concat(n ? "Toggable " : "", "`.menu-item` element not found."));
                return i;
              },
            },
            {
              key: "_getLink",
              value: function (t, n) {
                var i = [],
                  o = n ? "menu-toggle" : "menu-link";
                if ((t.classList.contains(o) ? (i = [t]) : t.classList.contains("menu-item") && (i = e._findChild(t, [o])), !i.length)) throw new Error("`".concat(o, "` element not found."));
                return i[0];
              },
            },
            {
              key: "_bindAnimationEndEvent",
              value: function (t, n) {
                var i = function (i) {
                    i.target === t && (e._unbindAnimationEndEvent(t), n(i));
                  },
                  o = window.getComputedStyle(t).transitionDuration;
                (o = parseFloat(o) * (-1 !== o.indexOf("ms") ? 1 : 1e3)),
                  (t._menuAnimationEndEventCb = i),
                  s.forEach(function (e) {
                    return t.addEventListener(e, t._menuAnimationEndEventCb, !1);
                  }),
                  (t._menuAnimationEndEventTimeout = setTimeout(function () {
                    i({ target: t });
                  }, o + 50));
              },
            },
            {
              key: "_promisify",
              value: function (e) {
                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
                var o = e.apply(void 0, n);
                return o instanceof Promise ? o : !1 === o ? Promise.reject() : Promise.resolve();
              },
            },
            {
              key: "_unbindAnimationEndEvent",
              value: function (e) {
                var t = e._menuAnimationEndEventCb;
                e._menuAnimationEndEventTimeout && (clearTimeout(e._menuAnimationEndEventTimeout), (e._menuAnimationEndEventTimeout = null)),
                  t &&
                    (s.forEach(function (n) {
                      return e.removeEventListener(n, t, !1);
                    }),
                    (e._menuAnimationEndEventCb = null));
              },
            },
            {
              key: "setDisabled",
              value: function (t, n) {
                e._getItem(t, !1).classList[n ? "add" : "remove"]("disabled");
              },
            },
            {
              key: "isActive",
              value: function (t) {
                return e._getItem(t, !1).classList.contains("active");
              },
            },
            {
              key: "isOpened",
              value: function (t) {
                return e._getItem(t, !1).classList.contains("open");
              },
            },
            {
              key: "isDisabled",
              value: function (t) {
                return e._getItem(t, !1).classList.contains("disabled");
              },
            },
          ]),
          n && r(t.prototype, n),
          o && r(t, o),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          e
        );
      })();
    return t;
  })();
});

let menu;
let animate;
let isHorizontalLayout = !1;
let templateName = document.documentElement.getAttribute("data-template");
let assetsPath = document.documentElement.getAttribute("data-assets-path");
document.getElementById("layout-menu") && (isHorizontalLayout = document.getElementById("layout-menu").classList.contains("menu-horizontal")),
  (function () {
    function e() {
      var e = document.querySelector(".layout-page");
      e && (0 < window.pageYOffset ? e.classList.add("window-scrolled") : e.classList.remove("window-scrolled"));
    }
    "undefined" != typeof Waves &&
      (Waves.init(),
      Waves.attach(".btn[class*='btn-']:not(.position-relative):not([class*='btn-outline-']):not([class*='btn-label-'])", ["waves-light"]),
      Waves.attach("[class*='btn-outline-']:not(.position-relative)"),
      Waves.attach("[class*='btn-label-']:not(.position-relative)"),
      Waves.attach(".pagination .page-item .page-link"),
      Waves.attach(".dropdown-menu .dropdown-item"),
      Waves.attach(".light-style .list-group .list-group-item-action"),
      Waves.attach(".dark-style .list-group .list-group-item-action", ["waves-light"]),
      Waves.attach(".nav-tabs:not(.nav-tabs-widget) .nav-item .nav-link"),
      Waves.attach(".nav-pills .nav-item .nav-link", ["waves-light"]),
      Waves.attach(".menu-vertical .menu-item .menu-link.menu-toggle")),
      setTimeout(() => {
        e();
      }, 200),
      (window.onscroll = function () {
        e();
      }),
      setTimeout(function () {
        window.Helpers.initCustomOptionCheck();
      }, 1e3),
      document.querySelectorAll("#layout-menu").forEach(function (e) {
        (menu = new Menu(e, {
          orientation: isHorizontalLayout ? "horizontal" : "vertical",
          closeChildren: !!isHorizontalLayout,
          showDropdownOnHover: localStorage.getItem("templateCustomizer-" + templateName + "--ShowDropdownOnHover")
            ? "true" === localStorage.getItem("templateCustomizer-" + templateName + "--ShowDropdownOnHover")
            : void 0 === window.templateCustomizer || window.templateCustomizer.settings.defaultShowDropdownOnHover,
        })),
          window.Helpers.scrollToActive((animate = !1)),
          (window.Helpers.mainMenu = menu);
      }),
      document.querySelectorAll(".layout-menu-toggle").forEach((e) => {
        e.addEventListener("click", (e) => {
          if ((e.preventDefault(), window.Helpers.toggleCollapsed(), config.enableMenuLocalStorage && !window.Helpers.isSmallScreen()))
            try {
              localStorage.setItem("templateCustomizer-" + templateName + "--LayoutCollapsed", String(window.Helpers.isCollapsed()));
              var t,
                a = document.querySelector(".template-customizer-layouts-options");
              a && ((t = window.Helpers.isCollapsed() ? "collapsed" : "expanded"), a.querySelector(`input[value="${t}"]`).click());
            } catch (e) {}
        });
      }),
      window.Helpers.swipeIn(".drag-target", function (e) {
        window.Helpers.setCollapsed(!1);
      }),
      window.Helpers.swipeOut("#layout-menu", function (e) {
        window.Helpers.isSmallScreen() && window.Helpers.setCollapsed(!0);
      });
    let t = document.getElementsByClassName("menu-inner"),
      a = document.getElementsByClassName("menu-inner-shadow")[0];
    0 < t.length &&
      a &&
      t[0].addEventListener("ps-scroll-y", function () {
        this.querySelector(".ps__thumb-y").offsetTop ? (a.style.display = "block") : (a.style.display = "none");
      });
    var n,
      o = document.querySelector(".dropdown-style-switcher"),
      s = localStorage.getItem("templateCustomizer-" + templateName + "--Style") || (window.templateCustomizer?.settings?.defaultStyle ?? "light"),
      o =
        (window.templateCustomizer &&
          o &&
          ([].slice.call(o.children[1].querySelectorAll(".dropdown-item")).forEach(function (e) {
            e.addEventListener("click", function () {
              var e = this.getAttribute("data-theme");
              "light" === e ? window.templateCustomizer.setStyle("light") : "dark" === e ? window.templateCustomizer.setStyle("dark") : window.templateCustomizer.setStyle("system");
            });
          }),
          (o = o.querySelector("i")),
          "light" === s
            ? (o.classList.add("mdi-weather-sunny"), new bootstrap.Tooltip(o, { title: "Light Mode", fallbackPlacements: ["bottom"] }))
            : "dark" === s
            ? (o.classList.add("mdi-weather-night"), new bootstrap.Tooltip(o, { title: "Dark Mode", fallbackPlacements: ["bottom"] }))
            : (o.classList.add("mdi-monitor"), new bootstrap.Tooltip(o, { title: "System Mode", fallbackPlacements: ["bottom"] }))),
        "system" === (n = s) && (n = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
        [].slice.call(document.querySelectorAll("[data-app-" + n + "-img]")).map(function (e) {
          var t = e.getAttribute("data-app-" + n + "-img");
          e.src = assetsPath + "img/" + t;
        }),
        "undefined" != typeof i18next &&
          "undefined" != typeof i18NextHttpBackend &&
          i18next
            .use(i18NextHttpBackend)
            .init({ lng: "en", debug: !1, fallbackLng: "en", backend: { loadPath: assetsPath + "json/locales/{{lng}}.json" }, returnObjects: !0 })
            .then(function (e) {
              i();
            }),
        document.getElementsByClassName("dropdown-language"));
    if (o.length) {
      var l = o[0].querySelectorAll(".dropdown-item");
      for (let e = 0; e < l.length; e++)
        l[e].addEventListener("click", function () {
          var e,
            t = this.getAttribute("data-language");
          for (e of this.parentNode.children) for (var a = e.parentElement.parentNode.firstChild; a; ) 1 === a.nodeType && a !== a.parentElement && a.querySelector(".dropdown-item").classList.remove("active"), (a = a.nextSibling);
          this.classList.add("active"),
            i18next.changeLanguage(t, (e, t) => {
              if (e) return console.log("something went wrong loading", e);
              i();
            });
        });
    }
    function i() {
      var e = document.querySelectorAll("[data-i18n]"),
        t = document.querySelector('.dropdown-item[data-language="' + i18next.language + '"]');
      t && t.click(),
        e.forEach(function (e) {
          e.innerHTML = i18next.t(e.dataset.i18n);
        });
    }
    s = document.querySelector(".dropdown-notifications-all");
    function r(e) {
      "show.bs.collapse" == e.type || "show.bs.collapse" == e.type ? e.target.closest(".accordion-item").classList.add("active") : e.target.closest(".accordion-item").classList.remove("active");
    }
    const c = document.querySelectorAll(".dropdown-notifications-read");
    s &&
      s.addEventListener("click", (e) => {
        c.forEach((e) => {
          e.closest(".dropdown-notifications-item").classList.add("marked-as-read");
        });
      }),
      c &&
        c.forEach((t) => {
          t.addEventListener("click", (e) => {
            t.closest(".dropdown-notifications-item").classList.toggle("marked-as-read");
          });
        }),
      document.querySelectorAll(".dropdown-notifications-archive").forEach((t) => {
        t.addEventListener("click", (e) => {
          t.closest(".dropdown-notifications-item").remove();
        });
      }),
      [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (e) {
        return new bootstrap.Tooltip(e);
      });
    [].slice.call(document.querySelectorAll(".accordion")).map(function (e) {
      e.addEventListener("show.bs.collapse", r), e.addEventListener("hide.bs.collapse", r);
    });
    if (
      (window.Helpers.setAutoUpdate(!0),
      window.Helpers.initPasswordToggle(),
      window.Helpers.initSpeechToText(),
      window.Helpers.navTabsAnimation(),
      window.Helpers.initNavbarDropdownScrollbar(),
      window.addEventListener(
        "resize",
        function (e) {
          window.innerWidth >= window.Helpers.LAYOUT_BREAKPOINT && document.querySelector(".search-input-wrapper") && (document.querySelector(".search-input-wrapper").classList.add("d-none"), (document.querySelector(".search-input").value = "")),
            document.querySelector("[data-template^='horizontal-menu']") &&
              setTimeout(function () {
                window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT
                  ? document.getElementById("layout-menu") && document.getElementById("layout-menu").classList.contains("menu-horizontal") && menu.switchMenu("vertical")
                  : document.getElementById("layout-menu") && document.getElementById("layout-menu").classList.contains("menu-vertical") && menu.switchMenu("horizontal");
              }, 100),
            window.Helpers.navTabsAnimation();
        },
        !0
      ),
      !isHorizontalLayout &&
        !window.Helpers.isSmallScreen() &&
        ("undefined" != typeof TemplateCustomizer && (window.templateCustomizer.settings.defaultMenuCollapsed ? window.Helpers.setCollapsed(!0, !1) : window.Helpers.setCollapsed(!1, !1)), "undefined" != typeof config) &&
        config.enableMenuLocalStorage)
    )
      try {
        null !== localStorage.getItem("templateCustomizer-" + templateName + "--LayoutCollapsed") && window.Helpers.setCollapsed("true" === localStorage.getItem("templateCustomizer-" + templateName + "--LayoutCollapsed"), !1);
      } catch (e) {}
  })(),
  "undefined" != typeof $ &&
    $(function () {
      window.Helpers.initSidebarToggle();
      var t,
        a,
        e,
        n = $(".search-toggler"),
        o = $(".search-input-wrapper"),
        s = $(".search-input"),
        l = $(".content-backdrop");
      n.length &&
        n.on("click", function () {
          o.length && (o.toggleClass("d-none"), s.focus());
        }),
        $(document).on("keydown", function (e) {
          var t = e.ctrlKey,
            e = 191 === e.which;
          t && e && o.length && (o.toggleClass("d-none"), s.focus());
        }),
        setTimeout(function () {
          var e = $(".twitter-typeahead");
          s.on("focus", function () {
            o.hasClass("container-xxl") ? (o.find(e).addClass("container-xxl"), e.removeClass("container-fluid")) : o.hasClass("container-fluid") && (o.find(e).addClass("container-fluid"), e.removeClass("container-xxl"));
          });
        }, 10),
        s.length &&
          ((t = function (n) {
            return function (t, e) {
              let a;
              (a = []),
                n.filter(function (e) {
                  if (e.name.toLowerCase().startsWith(t.toLowerCase())) a.push(e);
                  else {
                    if (e.name.toLowerCase().startsWith(t.toLowerCase()) || !e.name.toLowerCase().includes(t.toLowerCase())) return [];
                    a.push(e),
                      a.sort(function (e, t) {
                        return t.name < e.name ? 1 : -1;
                      });
                  }
                }),
                e(a);
            };
          }),
          (n = "search-vertical.json"),
          $("#layout-menu").hasClass("menu-horizontal") && (n = "search-horizontal.json"),
          (a = $.ajax({ url: assetsPath + "json/" + n, dataType: "json", async: !1 }).responseJSON),
          s.each(function () {
            var e = $(this);
            s
              .typeahead(
                { hint: !1, classNames: { menu: "tt-menu navbar-search-suggestion", cursor: "active", suggestion: "suggestion d-flex justify-content-between px-3 py-2 w-100" } },
                {
                  name: "pages",
                  display: "name",
                  limit: 5,
                  source: t(a.pages),
                  templates: {
                    header: '<h6 class="suggestions-header text-primary mb-0 mx-3 mt-3 pb-2">Pages</h6>',
                    suggestion: function ({ url: e, icon: t, name: a }) {
                      return '<a href="' + e + '"><div><i class="mdi ' + t + ' me-2"></i><span class="align-middle">' + a + "</span></div></a>";
                    },
                    notFound: '<div class="not-found px-3 py-2"><h6 class="suggestions-header text-primary mb-2">Pages</h6><p class="py-2 mb-0"><i class="mdi mdi-alert-circle-outline me-2 mdi-14px"></i> No Results Found</p></div>',
                  },
                },
                {
                  name: "files",
                  display: "name",
                  limit: 4,
                  source: t(a.files),
                  templates: {
                    header: '<h6 class="suggestions-header text-primary mb-0 mx-3 mt-3 pb-2">Files</h6>',
                    suggestion: function ({ src: e, name: t, subtitle: a, meta: n }) {
                      return (
                        '<a href="javascript:;"><div class="d-flex w-50"><img class="me-3" src="' +
                        assetsPath +
                        e +
                        '" alt="' +
                        t +
                        '" height="32"><div class="w-75"><h6 class="mb-0">' +
                        t +
                        '</h6><small class="text-muted">' +
                        a +
                        '</small></div></div><small class="text-muted">' +
                        n +
                        "</small></a>"
                      );
                    },
                    notFound: '<div class="not-found px-3 py-2"><h6 class="suggestions-header text-primary mb-2">Files</h6><p class="py-2 mb-0"><i class="mdi mdi-alert-circle-outline me-2 mdi-14px"></i> No Results Found</p></div>',
                  },
                },
                {
                  name: "members",
                  display: "name",
                  limit: 4,
                  source: t(a.members),
                  templates: {
                    header: '<h6 class="suggestions-header text-primary mb-0 mx-3 mt-3 pb-2">Members</h6>',
                    suggestion: function ({ name: e, src: t, subtitle: a }) {
                      return (
                        '<a href="app-user-view-account.html"><div class="d-flex align-items-center"><img class="rounded-circle me-3" src="' +
                        assetsPath +
                        t +
                        '" alt="' +
                        e +
                        '" height="32"><div class="user-info"><h6 class="mb-0">' +
                        e +
                        '</h6><small class="text-muted">' +
                        a +
                        "</small></div></div></a>"
                      );
                    },
                    notFound: '<div class="not-found px-3 py-2"><h6 class="suggestions-header text-primary mb-2">Members</h6><p class="py-2 mb-0"><i class="mdi mdi-alert-circle-outline me-2 mdi-14px"></i> No Results Found</p></div>',
                  },
                }
              )
              .bind("typeahead:render", function () {
                l.addClass("show").removeClass("fade");
              })
              .bind("typeahead:select", function (e, t) {
                t.url && (window.location = t.url);
              })
              .bind("typeahead:close", function () {
                s.val(""), e.typeahead("val", ""), o.addClass("d-none"), l.addClass("fade").removeClass("show");
              }),
              s.on("keyup", function () {
                "" == s.val() && l.addClass("fade").removeClass("show");
              });
          }),
          $(".navbar-search-suggestion").each(function () {
            e = new PerfectScrollbar($(this)[0], { wheelPropagation: !1, suppressScrollX: !0 });
          }),
          s.on("keyup", function () {
            e.update();
          }));
    });
