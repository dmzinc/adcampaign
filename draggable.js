var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine(
    "utils.Draggable",
    ["events.EventDispatcher", "TweenLite", "plugins.CSSPlugin"],
    function (a, b, c) {
      var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m = { css: {} },
        n = { css: {} },
        o = { css: {} },
        p = { css: {} },
        q = _gsScope._gsDefine.globals,
        r = {},
        s = { style: {} },
        t = _gsScope.document || {
          createElement: function () {
            return s;
          },
        },
        u = t.documentElement || {},
        v = function (a) {
          return t.createElementNS
            ? t.createElementNS("http://www.w3.org/1999/xhtml", a)
            : t.createElement(a);
        },
        w = v("div"),
        x = [],
        y = function () {
          return !1;
        },
        z = 180 / Math.PI,
        A = 999999999999999,
        B =
          Date.now ||
          function () {
            return new Date().getTime();
          },
        C = !(t.addEventListener || !t.all),
        D = t.createElement("div"),
        E = [],
        F = {},
        G = 0,
        H = /^(?:a|input|textarea|button|select)$/i,
        I = 0,
        J = -1 !== navigator.userAgent.toLowerCase().indexOf("android"),
        K = 0,
        L = {},
        M = {},
        N = function (a) {
          if (("string" == typeof a && (a = b.selector(a)), !a || a.nodeType))
            return [a];
          var c,
            d = [],
            e = a.length;
          for (c = 0; c !== e; d.push(a[c++]));
          return d;
        },
        O = function (a, b) {
          var c,
            d = {};
          if (b) for (c in a) d[c] = a[c] * b;
          else for (c in a) d[c] = a[c];
          return d;
        },
        P = function () {
          for (var a = E.length; --a > -1; ) E[a]();
        },
        Q = function (a) {
          E.push(a),
            1 === E.length && b.ticker.addEventListener("tick", P, this, !1, 1);
        },
        R = function (a) {
          for (var c = E.length; --c > -1; ) E[c] === a && E.splice(c, 1);
          b.to(S, 0, { overwrite: "all", delay: 15, onComplete: S });
        },
        S = function () {
          E.length || b.ticker.removeEventListener("tick", P);
        },
        T = function (a, b) {
          var c;
          for (c in b) void 0 === a[c] && (a[c] = b[c]);
          return a;
        },
        U = function () {
          return null != window.pageYOffset
            ? window.pageYOffset
            : null != t.scrollTop
            ? t.scrollTop
            : u.scrollTop || t.body.scrollTop || 0;
        },
        V = function () {
          return null != window.pageXOffset
            ? window.pageXOffset
            : null != t.scrollLeft
            ? t.scrollLeft
            : u.scrollLeft || t.body.scrollLeft || 0;
        },
        W = function (a, b) {
          Ja(a, "scroll", b), Y(a.parentNode) || W(a.parentNode, b);
        },
        X = function (a, b) {
          Ka(a, "scroll", b), Y(a.parentNode) || X(a.parentNode, b);
        },
        Y = function (a) {
          return !(
            a &&
            a !== u &&
            a !== t &&
            a !== t.body &&
            a !== window &&
            a.nodeType &&
            a.parentNode
          );
        },
        Z = function (a, b) {
          var c = "x" === b ? "Width" : "Height",
            d = "scroll" + c,
            e = "client" + c,
            f = t.body;
          return Math.max(
            0,
            Y(a)
              ? Math.max(u[d], f[d]) - (window["inner" + c] || u[e] || f[e])
              : a[d] - a[e]
          );
        },
        $ = function (a) {
          var b = Y(a),
            c = Z(a, "x"),
            d = Z(a, "y");
          b ? (a = M) : $(a.parentNode),
            (a._gsMaxScrollX = c),
            (a._gsMaxScrollY = d),
            (a._gsScrollX = a.scrollLeft || 0),
            (a._gsScrollY = a.scrollTop || 0);
        },
        _ = function (a, b) {
          return (
            (a = a || window.event),
            (r.pageX = a.clientX + t.body.scrollLeft + u.scrollLeft),
            (r.pageY = a.clientY + t.body.scrollTop + u.scrollTop),
            b && (a.returnValue = !1),
            r
          );
        },
        aa = function (a) {
          return a
            ? ("string" == typeof a && (a = b.selector(a)),
              a.length &&
                a !== window &&
                a[0] &&
                a[0].style &&
                !a.nodeType &&
                (a = a[0]),
              a === window || (a.nodeType && a.style) ? a : null)
            : a;
        },
        ba = function (a, b) {
          var c,
            e,
            f,
            g = a.style;
          if (void 0 === g[b]) {
            for (
              f = ["O", "Moz", "ms", "Ms", "Webkit"],
                e = 5,
                c = b.charAt(0).toUpperCase() + b.substr(1);
              --e > -1 && void 0 === g[f[e] + c];

            );
            if (0 > e) return "";
            (d = 3 === e ? "ms" : f[e]), (b = d + c);
          }
          return b;
        },
        ca = function (a, b, c) {
          var d = a.style;
          d &&
            (void 0 === d[b] && (b = ba(a, b)),
            null == c
              ? d.removeProperty
                ? d.removeProperty(b.replace(/([A-Z])/g, "-$1").toLowerCase())
                : d.removeAttribute(b)
              : void 0 !== d[b] && (d[b] = c));
        },
        da = t.defaultView ? t.defaultView.getComputedStyle : y,
        ea = /(?:Left|Right|Width)/i,
        fa = /(?:\d|\-|\+|=|#|\.)*/g,
        ga = function (a, b, c, d, e) {
          if ("px" === d || !d) return c;
          if ("auto" === d || !c) return 0;
          var f,
            g = ea.test(b),
            h = a,
            i = w.style,
            j = 0 > c;
          return (
            j && (c = -c),
            "%" === d && -1 !== b.indexOf("border")
              ? (f = (c / 100) * (g ? a.clientWidth : a.clientHeight))
              : ((i.cssText =
                  "border:0 solid red;position:" +
                  ia(a, "position", !0) +
                  ";line-height:0;"),
                "%" !== d && h.appendChild
                  ? (i[g ? "borderLeftWidth" : "borderTopWidth"] = c + d)
                  : ((h = a.parentNode || t.body),
                    (i[g ? "width" : "height"] = c + d)),
                h.appendChild(w),
                (f = parseFloat(w[g ? "offsetWidth" : "offsetHeight"])),
                h.removeChild(w),
                0 !== f || e || (f = ga(a, b, c, d, !0))),
            j ? -f : f
          );
        },
        ha = function (a, b) {
          if ("absolute" !== ia(a, "position", !0)) return 0;
          var c = "left" === b ? "Left" : "Top",
            d = ia(a, "margin" + c, !0);
          return (
            a["offset" + c] -
            (ga(a, b, parseFloat(d), (d + "").replace(fa, "")) || 0)
          );
        },
        ia = function (a, b, c) {
          var d,
            e = (a._gsTransform || {})[b];
          return e || 0 === e
            ? e
            : (a.style[b]
                ? (e = a.style[b])
                : (d = da(a))
                ? ((e = d.getPropertyValue(
                    b.replace(/([A-Z])/g, "-$1").toLowerCase()
                  )),
                  (e = e || d.length ? e : d[b]))
                : a.currentStyle && (e = a.currentStyle[b]),
              "auto" !== e || ("top" !== b && "left" !== b) || (e = ha(a, b)),
              c ? e : parseFloat(e) || 0);
        },
        ja = function (a, b, c) {
          var d = a.vars,
            e = d[c],
            f = a._listeners[b];
          "function" == typeof e &&
            e.apply(
              d[c + "Scope"] || d.callbackScope || a,
              d[c + "Params"] || [a.pointerEvent]
            ),
            f && a.dispatchEvent(b);
        },
        ka = function (a, b) {
          var c,
            d,
            e,
            f = aa(a);
          return f
            ? Ea(f, b)
            : void 0 !== a.left
            ? ((e = ya(b)),
              {
                left: a.left - e.x,
                top: a.top - e.y,
                width: a.width,
                height: a.height,
              })
            : ((d = a.min || a.minX || a.minRotation || 0),
              (c = a.min || a.minY || 0),
              {
                left: d,
                top: c,
                width: (a.max || a.maxX || a.maxRotation || 0) - d,
                height: (a.max || a.maxY || 0) - c,
              });
        },
        la = function () {
          if (!t.createElementNS) return (g = 0), void (h = !1);
          var a,
            b,
            c,
            d,
            e = v("div"),
            f = t.createElementNS("http://www.w3.org/2000/svg", "svg"),
            l = v("div"),
            m = e.style,
            n = t.body || u;
          t.body &&
            oa &&
            ((m.position = "absolute"),
            n.appendChild(l),
            l.appendChild(e),
            (d = e.offsetParent),
            (l.style[oa] = "rotate(1deg)"),
            (k = e.offsetParent === d),
            (l.style.position = "absolute"),
            (m.height = "10px"),
            (d = e.offsetTop),
            (l.style.border = "5px solid red"),
            (j = d !== e.offsetTop),
            n.removeChild(l)),
            (m = f.style),
            f.setAttributeNS(null, "width", "400px"),
            f.setAttributeNS(null, "height", "400px"),
            f.setAttributeNS(null, "viewBox", "0 0 400 400"),
            (m.display = "block"),
            (m.boxSizing = "border-box"),
            (m.border = "0px solid red"),
            (m.transform = "none"),
            (e.style.cssText =
              "width:100px;height:100px;overflow:scroll;-ms-overflow-style:none;"),
            n.appendChild(e),
            e.appendChild(f),
            (c = f.createSVGPoint().matrixTransform(f.getScreenCTM())),
            (b = c.y),
            (e.scrollTop = 100),
            (c.x = c.y = 0),
            (c = c.matrixTransform(f.getScreenCTM())),
            (i = b - c.y < 100.1 ? 0 : b - c.y - 150),
            e.removeChild(f),
            n.removeChild(e),
            n.appendChild(f),
            (a = f.getScreenCTM()),
            (b = a.e),
            (m.border = "50px solid red"),
            (a = f.getScreenCTM()),
            0 === b && 0 === a.e && 0 === a.f && 1 === a.a
              ? ((g = 1), (h = !0))
              : ((g = b !== a.e ? 1 : 0), (h = 1 !== a.a)),
            n.removeChild(f);
        },
        ma = "" !== ba(w, "perspective"),
        na = ba(w, "transformOrigin")
          .replace(/^ms/g, "Ms")
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase(),
        oa = ba(w, "transform"),
        pa = oa
          .replace(/^ms/g, "Ms")
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase(),
        qa = {},
        ra = {},
        sa = window.SVGElement,
        ta = function (a) {
          return !!(
            sa &&
            "function" == typeof a.getBBox &&
            a.getCTM &&
            (!a.parentNode || (a.parentNode.getBBox && a.parentNode.getCTM))
          );
        },
        ua =
          (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent) ||
            /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent)) &&
          parseFloat(RegExp.$1) < 11,
        va = [],
        wa = [],
        xa = function (a) {
          if (!a.getBoundingClientRect || !a.parentNode || !oa)
            return {
              offsetTop: 0,
              offsetLeft: 0,
              scaleX: 1,
              scaleY: 1,
              offsetParent: u,
            };
          if (
            Ta.cacheSVGData !== !1 &&
            a._dCache &&
            a._dCache.lastUpdate === b.ticker.frame
          )
            return a._dCache;
          var c,
            d,
            e,
            f,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r = a,
            s = za(a);
          if (((s.lastUpdate = b.ticker.frame), a.getBBox && !s.isSVGRoot)) {
            for (
              r = a.parentNode, c = a.getBBox();
              r && "svg" !== (r.nodeName + "").toLowerCase();

            )
              r = r.parentNode;
            return (
              (f = xa(r)),
              (s.offsetTop = c.y * f.scaleY),
              (s.offsetLeft = c.x * f.scaleX),
              (s.scaleX = f.scaleX),
              (s.scaleY = f.scaleY),
              (s.offsetParent = r || u),
              s
            );
          }
          for (
            e = s.offsetParent,
              e === t.body && (e = u),
              wa.length = va.length = 0;
            r &&
            ((j = ia(r, oa, !0)),
            "matrix(1, 0, 0, 1, 0, 0)" !== j &&
              "none" !== j &&
              "translate3d(0px, 0px, 0px)" !== j &&
              (wa.push(r), va.push(r.style[oa]), (r.style[oa] = "none")),
            r !== e);

          )
            r = r.parentNode;
          for (
            d = e.getBoundingClientRect(),
              j = a.getScreenCTM(),
              m = a.createSVGPoint(),
              l = m.matrixTransform(j),
              m.x = m.y = 10,
              m = m.matrixTransform(j),
              s.scaleX = (m.x - l.x) / 10,
              s.scaleY = (m.y - l.y) / 10,
              void 0 === g && la(),
              s.borderBox &&
                !h &&
                a.getAttribute("width") &&
                ((f = da(a) || {}),
                (n =
                  parseFloat(f.borderLeftWidth) +
                    parseFloat(f.borderRightWidth) || 0),
                (o =
                  parseFloat(f.borderTopWidth) +
                    parseFloat(f.borderBottomWidth) || 0),
                (p = parseFloat(f.width) || 0),
                (q = parseFloat(f.height) || 0),
                (s.scaleX *= (p - n) / p),
                (s.scaleY *= (q - o) / q)),
              i
                ? ((c = a.getBoundingClientRect()),
                  (s.offsetLeft = c.left - d.left),
                  (s.offsetTop = c.top - d.top))
                : ((s.offsetLeft = l.x - d.left), (s.offsetTop = l.y - d.top)),
              s.offsetParent = e,
              k = wa.length;
            --k > -1;

          )
            wa[k].style[oa] = va[k];
          return s;
        },
        ya = function (a, c) {
          if (((c = c || {}), !a || a === u || !a.parentNode || a === window))
            return { x: 0, y: 0 };
          var d = da(a),
            e = na && d ? d.getPropertyValue(na) : "50% 50%",
            f = e.split(" "),
            g =
              -1 !== e.indexOf("left")
                ? "0%"
                : -1 !== e.indexOf("right")
                ? "100%"
                : f[0],
            h =
              -1 !== e.indexOf("top")
                ? "0%"
                : -1 !== e.indexOf("bottom")
                ? "100%"
                : f[1];
          return (
            ("center" === h || null == h) && (h = "50%"),
            ("center" === g || isNaN(parseFloat(g))) && (g = "50%"),
            a.getBBox && ta(a)
              ? (a._gsTransform ||
                  (b.set(a, { x: "+=0", overwrite: !1 }),
                  void 0 === a._gsTransform.xOrigin &&
                    console.log("Draggable requires at least GSAP 1.17.0")),
                (e = a.getBBox()),
                (c.x = a._gsTransform.xOrigin - e.x),
                (c.y = a._gsTransform.yOrigin - e.y))
              : (a.getBBox &&
                  -1 !== (g + h).indexOf("%") &&
                  ((a = a.getBBox()),
                  (a = { offsetWidth: a.width, offsetHeight: a.height })),
                (c.x =
                  -1 !== g.indexOf("%")
                    ? (a.offsetWidth * parseFloat(g)) / 100
                    : parseFloat(g)),
                (c.y =
                  -1 !== h.indexOf("%")
                    ? (a.offsetHeight * parseFloat(h)) / 100
                    : parseFloat(h))),
            c
          );
        },
        za = function (a) {
          if (
            Ta.cacheSVGData !== !1 &&
            a._dCache &&
            a._dCache.lastUpdate === b.ticker.frame
          )
            return a._dCache;
          var c,
            d = (a._dCache = a._dCache || {}),
            e = da(a),
            f = a.getBBox && ta(a),
            g = "svg" === (a.nodeName + "").toLowerCase();
          if (
            ((d.isSVG = f),
            (d.isSVGRoot = g),
            (d.borderBox = "border-box" === e.boxSizing),
            (d.computedStyle = e),
            g)
          )
            (c = a.parentNode || u),
              c.insertBefore(w, a),
              (d.offsetParent = w.offsetParent || u),
              c.removeChild(w);
          else if (f) {
            for (
              c = a.parentNode;
              c && "svg" !== (c.nodeName + "").toLowerCase();

            )
              c = c.parentNode;
            d.offsetParent = c;
          } else d.offsetParent = a.offsetParent;
          return d;
        },
        Aa = function (a, b, c, d) {
          if (a === window || !a || !a.style || !a.parentNode)
            return [1, 0, 0, 1, 0, 0];
          var e,
            f,
            h,
            i,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            v,
            w,
            x = a._dCache || za(a),
            y = a.parentNode,
            z = y._dCache || za(y),
            A = x.computedStyle,
            B = x.isSVG ? z.offsetParent : y.offsetParent;
          return (
            (e =
              x.isSVG && -1 !== (a.style[oa] + "").indexOf("matrix")
                ? a.style[oa]
                : A
                ? A.getPropertyValue(pa)
                : a.currentStyle
                ? a.currentStyle[oa]
                : "1,0,0,1,0,0"),
            a.getBBox &&
              -1 !== (a.getAttribute("transform") + "").indexOf("matrix") &&
              (e = a.getAttribute("transform")),
            (e = (e + "").match(/(?:\-|\.|\b)(\d|\.|e\-)+/g) || [
              1, 0, 0, 1, 0, 0,
            ]),
            e.length > 6 && (e = [e[0], e[1], e[4], e[5], e[12], e[13]]),
            d
              ? (e[4] = e[5] = 0)
              : x.isSVG &&
                (l = a._gsTransform) &&
                (l.xOrigin || l.yOrigin) &&
                ((e[0] = parseFloat(e[0])),
                (e[1] = parseFloat(e[1])),
                (e[2] = parseFloat(e[2])),
                (e[3] = parseFloat(e[3])),
                (e[4] =
                  parseFloat(e[4]) -
                  (l.xOrigin - (l.xOrigin * e[0] + l.yOrigin * e[2]))),
                (e[5] =
                  parseFloat(e[5]) -
                  (l.yOrigin - (l.xOrigin * e[1] + l.yOrigin * e[3])))),
            b &&
              (void 0 === g && la(),
              (h = x.isSVG || x.isSVGRoot ? xa(a) : a),
              x.isSVG
                ? ((i = a.getBBox()),
                  (q = z.isSVGRoot ? { x: 0, y: 0 } : y.getBBox()),
                  (h = {
                    offsetLeft: i.x - q.x,
                    offsetTop: i.y - q.y,
                    offsetParent: x.offsetParent,
                  }))
                : x.isSVGRoot
                ? ((r = parseInt(A.borderTopWidth, 10) || 0),
                  (s = parseInt(A.borderLeftWidth, 10) || 0),
                  (v = (e[0] - g) * s + e[2] * r),
                  (w = e[1] * s + (e[3] - g) * r),
                  (m = b.x),
                  (n = b.y),
                  (o = m - (m * e[0] + n * e[2])),
                  (p = n - (m * e[1] + n * e[3])),
                  (e[4] = parseFloat(e[4]) + o),
                  (e[5] = parseFloat(e[5]) + p),
                  (b.x -= o),
                  (b.y -= p),
                  (m = h.scaleX),
                  (n = h.scaleY),
                  (b.x *= m),
                  (b.y *= n),
                  (e[0] *= m),
                  (e[1] *= n),
                  (e[2] *= m),
                  (e[3] *= n),
                  ua || ((b.x += v), (b.y += w)))
                : !j &&
                  a.offsetParent &&
                  ((b.x +=
                    parseInt(ia(a.offsetParent, "borderLeftWidth"), 10) || 0),
                  (b.y +=
                    parseInt(ia(a.offsetParent, "borderTopWidth"), 10) || 0)),
              (f = y === u || y === t.body),
              (e[4] =
                Number(e[4]) +
                b.x +
                (h.offsetLeft || 0) -
                c.x -
                (f ? 0 : y.scrollLeft || 0)),
              (e[5] =
                Number(e[5]) +
                b.y +
                (h.offsetTop || 0) -
                c.y -
                (f ? 0 : y.scrollTop || 0)),
              y &&
                "fixed" === ia(a, "position", A) &&
                ((e[4] += V()), (e[5] += U())),
              !y ||
                y === u ||
                B !== h.offsetParent ||
                z.isSVG ||
                (k && "100100" !== Aa(y).join("")) ||
                ((h = z.isSVGRoot ? xa(y) : y),
                (e[4] -= h.offsetLeft || 0),
                (e[5] -= h.offsetTop || 0),
                j ||
                  !z.offsetParent ||
                  x.isSVG ||
                  x.isSVGRoot ||
                  ((e[4] -=
                    parseInt(ia(z.offsetParent, "borderLeftWidth"), 10) || 0),
                  (e[5] -=
                    parseInt(ia(z.offsetParent, "borderTopWidth"), 10) || 0)))),
            e
          );
        },
        Ba = function (a, b) {
          if (!a || a === window || !a.parentNode) return [1, 0, 0, 1, 0, 0];
          for (
            var c,
              d,
              e,
              f,
              g,
              h,
              i,
              j,
              k = ya(a, qa),
              l = ya(a.parentNode, ra),
              m = Aa(a, k, l);
            (a = a.parentNode) && a.parentNode && a !== u;

          )
            (k = l),
              (l = ya(a.parentNode, k === qa ? ra : qa)),
              (i = Aa(a, k, l)),
              (c = m[0]),
              (d = m[1]),
              (e = m[2]),
              (f = m[3]),
              (g = m[4]),
              (h = m[5]),
              (m[0] = c * i[0] + d * i[2]),
              (m[1] = c * i[1] + d * i[3]),
              (m[2] = e * i[0] + f * i[2]),
              (m[3] = e * i[1] + f * i[3]),
              (m[4] = g * i[0] + h * i[2] + i[4]),
              (m[5] = g * i[1] + h * i[3] + i[5]);
          return (
            b &&
              ((c = m[0]),
              (d = m[1]),
              (e = m[2]),
              (f = m[3]),
              (g = m[4]),
              (h = m[5]),
              (j = c * f - d * e),
              (m[0] = f / j),
              (m[1] = -d / j),
              (m[2] = -e / j),
              (m[3] = c / j),
              (m[4] = (e * h - f * g) / j),
              (m[5] = -(c * h - d * g) / j)),
            m
          );
        },
        Ca = function (a, b, c, d, e) {
          a = aa(a);
          var f = Ba(a, !1, e),
            g = b.x,
            h = b.y;
          return (
            c && (ya(a, b), (g -= b.x), (h -= b.y)),
            (d = d === !0 ? b : d || {}),
            (d.x = g * f[0] + h * f[2] + f[4]),
            (d.y = g * f[1] + h * f[3] + f[5]),
            d
          );
        },
        Da = function (a, b, c) {
          var d = a.x * b[0] + a.y * b[2] + b[4],
            e = a.x * b[1] + a.y * b[3] + b[5];
          return (
            (a.x = d * c[0] + e * c[2] + c[4]),
            (a.y = d * c[1] + e * c[3] + c[5]),
            a
          );
        },
        Ea = function (a, b, c) {
          if (!(a = aa(a))) return null;
          b = aa(b);
          var d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            v,
            w,
            x,
            y,
            z,
            A,
            B = a.getBBox && ta(a);
          if (a === window)
            (g = U()),
              (e = V()),
              (f =
                e + (u.clientWidth || a.innerWidth || t.body.clientWidth || 0)),
              (h =
                g +
                ((a.innerHeight || 0) - 20 < u.clientHeight
                  ? u.clientHeight
                  : a.innerHeight || t.body.clientHeight || 0));
          else {
            if (void 0 === b || b === window) return a.getBoundingClientRect();
            (d = ya(a)),
              (e = -d.x),
              (g = -d.y),
              B
                ? ((o = a.getBBox()), (p = o.width), (q = o.height))
                : "svg" !== (a.nodeName + "").toLowerCase() && a.offsetWidth
                ? ((p = a.offsetWidth), (q = a.offsetHeight))
                : ((z = da(a)),
                  (p = parseFloat(z.width)),
                  (q = parseFloat(z.height))),
              (f = e + p),
              (h = g + q),
              "svg" !== a.nodeName.toLowerCase() ||
                C ||
                ((r = xa(a)),
                (A = r.computedStyle || {}),
                (w = (a.getAttribute("viewBox") || "0 0").split(" ")),
                (x = parseFloat(w[0])),
                (y = parseFloat(w[1])),
                (s = parseFloat(A.borderLeftWidth) || 0),
                (v = parseFloat(A.borderTopWidth) || 0),
                (f -= p - (p - s) / r.scaleX - x),
                (h -= q - (q - v) / r.scaleY - y),
                (e -= s / r.scaleX - x),
                (g -= v / r.scaleY - y),
                z &&
                  ((f += (parseFloat(A.borderRightWidth) + s) / r.scaleX),
                  (h += (v + parseFloat(A.borderBottomWidth)) / r.scaleY)));
          }
          return a === b
            ? { left: e, top: g, width: f - e, height: h - g }
            : ((i = Ba(a)),
              (j = Ba(b, !0)),
              (k = Da({ x: e, y: g }, i, j)),
              (l = Da({ x: f, y: g }, i, j)),
              (m = Da({ x: f, y: h }, i, j)),
              (n = Da({ x: e, y: h }, i, j)),
              (e = Math.min(k.x, l.x, m.x, n.x)),
              (g = Math.min(k.y, l.y, m.y, n.y)),
              (L.x = L.y = 0),
              c && ya(b, L),
              {
                left: e + L.x,
                top: g + L.y,
                width: Math.max(k.x, l.x, m.x, n.x) - e,
                height: Math.max(k.y, l.y, m.y, n.y) - g,
              });
        },
        Fa = function (a) {
          return a &&
            a.length &&
            a[0] &&
            ((a[0].nodeType && a[0].style && !a.nodeType) ||
              (a[0].length && a[0][0]))
            ? !0
            : !1;
        },
        Ga = function (a) {
          var b,
            c,
            d,
            e = [],
            f = a.length;
          for (b = 0; f > b; b++)
            if (((c = a[b]), Fa(c)))
              for (d = c.length, d = 0; d < c.length; d++) e.push(c[d]);
            else c && 0 !== c.length && e.push(c);
          return e;
        },
        Ha = "ontouchstart" in u && "orientation" in window,
        Ia = (function (a) {
          for (
            var b = a.split(","),
              c = (
                void 0 !== w.onpointerdown
                  ? "pointerdown,pointermove,pointerup,pointercancel"
                  : void 0 !== w.onmspointerdown
                  ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel"
                  : a
              ).split(","),
              d = {},
              e = 8;
            --e > -1;

          )
            (d[b[e]] = c[e]), (d[c[e]] = b[e]);
          return d;
        })("touchstart,touchmove,touchend,touchcancel"),
        Ja = function (a, b, c, d) {
          a.addEventListener
            ? a.addEventListener(Ia[b] || b, c, d)
            : a.attachEvent && a.attachEvent("on" + b, c);
        },
        Ka = function (a, b, c) {
          a.removeEventListener
            ? a.removeEventListener(Ia[b] || b, c)
            : a.detachEvent && a.detachEvent("on" + b, c);
        },
        La = function (a, b) {
          for (var c = a.length; --c > -1; )
            if (a[c].identifier === b) return !0;
          return !1;
        },
        Ma = function (a) {
          (e = a.touches && I < a.touches.length), Ka(a.target, "touchend", Ma);
        },
        Na = function (a) {
          (e = a.touches && I < a.touches.length), Ja(a.target, "touchend", Ma);
        },
        Oa = function (a, b, c, d, e, f) {
          var g,
            h,
            i,
            j = {};
          if (b)
            if (1 !== e && b instanceof Array) {
              if (((j.end = g = []), (i = b.length), "object" == typeof b[0]))
                for (h = 0; i > h; h++) g[h] = O(b[h], e);
              else for (h = 0; i > h; h++) g[h] = b[h] * e;
              (c += 1.1), (d -= 1.1);
            } else
              "function" == typeof b
                ? (j.end = function (c) {
                    var d,
                      f,
                      g = b.call(a, c);
                    if (1 !== e && "object" == typeof g) {
                      d = {};
                      for (f in g) d[f] = g[f] * e;
                      g = d;
                    }
                    return g;
                  })
                : (j.end = b);
          return (
            (c || 0 === c) && (j.max = c),
            (d || 0 === d) && (j.min = d),
            f && (j.velocity = 0),
            j
          );
        },
        Pa = function (a) {
          var b;
          return a && a.getAttribute && "BODY" !== a.nodeName
            ? "true" === (b = a.getAttribute("data-clickable")) ||
              ("false" !== b &&
                (a.onclick ||
                  H.test(a.nodeName + "") ||
                  "true" === a.getAttribute("contentEditable")))
              ? !0
              : Pa(a.parentNode)
            : !1;
        },
        Qa = function (a, b) {
          for (var c, d = a.length; --d > -1; )
            (c = a[d]),
              (c.ondragstart = c.onselectstart = b ? null : y),
              ca(c, "userSelect", b ? "text" : "none");
        },
        Ra = (function () {
          var a,
            b = t.createElement("div"),
            c = t.createElement("div"),
            d = c.style,
            e = t.body || w;
          return (
            (d.display = "inline-block"),
            (d.position = "relative"),
            (b.style.cssText = c.innerHTML =
              "width:90px; height:40px; padding:10px; overflow:auto; visibility: hidden"),
            b.appendChild(c),
            e.appendChild(b),
            (l = c.offsetHeight + 18 > b.scrollHeight),
            (d.width = "100%"),
            oa ||
              ((d.paddingRight = "500px"),
              (a = b.scrollLeft = b.scrollWidth - b.clientWidth),
              (d.left = "-90px"),
              (a = a !== b.scrollLeft)),
            e.removeChild(b),
            a
          );
        })(),
        Sa = function (a, c) {
          (a = aa(a)), (c = c || {});
          var d,
            e,
            f,
            g,
            h,
            i,
            j = t.createElement("div"),
            k = j.style,
            m = a.firstChild,
            n = 0,
            o = 0,
            p = a.scrollTop,
            q = a.scrollLeft,
            r = a.scrollWidth,
            s = a.scrollHeight,
            u = 0,
            v = 0,
            w = 0;
          ma && c.force3D !== !1
            ? ((h = "translate3d("), (i = "px,0px)"))
            : oa && ((h = "translate("), (i = "px)")),
            (this.scrollTop = function (a, b) {
              return arguments.length ? void this.top(-a, b) : -this.top();
            }),
            (this.scrollLeft = function (a, b) {
              return arguments.length ? void this.left(-a, b) : -this.left();
            }),
            (this.left = function (d, e) {
              if (!arguments.length) return -(a.scrollLeft + o);
              var f = a.scrollLeft - q,
                g = o;
              return (f > 2 || -2 > f) && !e
                ? ((q = a.scrollLeft),
                  b.killTweensOf(this, !0, { left: 1, scrollLeft: 1 }),
                  this.left(-q),
                  void (c.onKill && c.onKill()))
                : ((d = -d),
                  0 > d
                    ? ((o = (d - 0.5) | 0), (d = 0))
                    : d > v
                    ? ((o = (d - v) | 0), (d = v))
                    : (o = 0),
                  (o || g) &&
                    (h
                      ? this._suspendTransforms ||
                        (k[oa] = h + -o + "px," + -n + i)
                      : (k.left = -o + "px"),
                    Ra && o + u >= 0 && (k.paddingRight = o + u + "px")),
                  (a.scrollLeft = 0 | d),
                  void (q = a.scrollLeft));
            }),
            (this.top = function (d, e) {
              if (!arguments.length) return -(a.scrollTop + n);
              var f = a.scrollTop - p,
                g = n;
              return (f > 2 || -2 > f) && !e
                ? ((p = a.scrollTop),
                  b.killTweensOf(this, !0, { top: 1, scrollTop: 1 }),
                  this.top(-p),
                  void (c.onKill && c.onKill()))
                : ((d = -d),
                  0 > d
                    ? ((n = (d - 0.5) | 0), (d = 0))
                    : d > w
                    ? ((n = (d - w) | 0), (d = w))
                    : (n = 0),
                  (n || g) &&
                    (h
                      ? this._suspendTransforms ||
                        (k[oa] = h + -o + "px," + -n + i)
                      : (k.top = -n + "px")),
                  (a.scrollTop = 0 | d),
                  void (p = a.scrollTop));
            }),
            (this.maxScrollTop = function () {
              return w;
            }),
            (this.maxScrollLeft = function () {
              return v;
            }),
            (this.disable = function () {
              for (m = j.firstChild; m; )
                (g = m.nextSibling), a.appendChild(m), (m = g);
              a === j.parentNode && a.removeChild(j);
            }),
            (this.enable = function () {
              if (((m = a.firstChild), m !== j)) {
                for (; m; ) (g = m.nextSibling), j.appendChild(m), (m = g);
                a.appendChild(j), this.calibrate();
              }
            }),
            (this.calibrate = function (b) {
              var c,
                g,
                h = a.clientWidth === d;
              (p = a.scrollTop),
                (q = a.scrollLeft),
                (!h ||
                  a.clientHeight !== e ||
                  j.offsetHeight !== f ||
                  r !== a.scrollWidth ||
                  s !== a.scrollHeight ||
                  b) &&
                  ((n || o) &&
                    ((c = this.left()),
                    (g = this.top()),
                    this.left(-a.scrollLeft),
                    this.top(-a.scrollTop)),
                  (!h || b) &&
                    ((k.display = "block"),
                    (k.width = "auto"),
                    (k.paddingRight = "0px"),
                    (u = Math.max(0, a.scrollWidth - a.clientWidth)),
                    u &&
                      (u +=
                        ia(a, "paddingLeft") +
                        (l ? ia(a, "paddingRight") : 0))),
                  (k.display = "inline-block"),
                  (k.position = "relative"),
                  (k.overflow = "visible"),
                  (k.verticalAlign = "top"),
                  (k.width = "100%"),
                  (k.paddingRight = u + "px"),
                  l && (k.paddingBottom = ia(a, "paddingBottom", !0)),
                  C && (k.zoom = "1"),
                  (d = a.clientWidth),
                  (e = a.clientHeight),
                  (r = a.scrollWidth),
                  (s = a.scrollHeight),
                  (v = a.scrollWidth - d),
                  (w = a.scrollHeight - e),
                  (f = j.offsetHeight),
                  (k.display = "block"),
                  (c || g) && (this.left(c), this.top(g)));
            }),
            (this.content = j),
            (this.element = a),
            (this._suspendTransforms = !1),
            this.enable();
        },
        Ta = function (d, g) {
          a.call(this, d),
            (d = aa(d)),
            f || (f = q.com.greensock.plugins.ThrowPropsPlugin),
            (this.vars = g = O(g || {})),
            (this.target = d),
            (this.x = this.y = this.rotation = 0),
            (this.dragResistance = parseFloat(g.dragResistance) || 0),
            (this.edgeResistance = isNaN(g.edgeResistance)
              ? 1
              : parseFloat(g.edgeResistance) || 0),
            (this.lockAxis = g.lockAxis),
            (this.autoScroll = g.autoScroll || 0),
            (this.lockedAxis = null),
            (this.allowEventDefault = !!g.allowEventDefault);
          var h,
            i,
            j,
            k,
            l,
            r,
            s,
            v,
            w,
            y,
            E,
            H,
            P,
            S,
            U,
            V,
            Z,
            ba,
            da,
            ea,
            fa,
            ga,
            ha,
            la,
            ma,
            na,
            oa,
            pa,
            qa,
            ra,
            sa,
            ta,
            ua,
            va,
            wa = (g.type || (C ? "top,left" : "x,y")).toLowerCase(),
            xa = -1 !== wa.indexOf("x") || -1 !== wa.indexOf("y"),
            ya = -1 !== wa.indexOf("rotation"),
            za = ya ? "rotation" : xa ? "x" : "left",
            Aa = xa ? "y" : "top",
            Da =
              -1 !== wa.indexOf("x") ||
              -1 !== wa.indexOf("left") ||
              "scroll" === wa,
            Ea =
              -1 !== wa.indexOf("y") ||
              -1 !== wa.indexOf("top") ||
              "scroll" === wa,
            Fa = g.minimumMovement || 2,
            Ga = this,
            Ma = N(g.trigger || g.handle || d),
            Ra = {},
            Ua = 0,
            Va = !1,
            Wa = g.clickableTest || Pa,
            Ya = 0,
            Za = function (a) {
              if (Ga.autoScroll && Ga.isDragging && (Va || ba)) {
                var b,
                  c,
                  e,
                  f,
                  g,
                  h,
                  j,
                  k,
                  l = d,
                  m = 15 * Ga.autoScroll;
                for (
                  Va = !1,
                    M.scrollTop =
                      null != window.pageYOffset
                        ? window.pageYOffset
                        : null != u.scrollTop
                        ? u.scrollTop
                        : t.body.scrollTop,
                    M.scrollLeft =
                      null != window.pageXOffset
                        ? window.pageXOffset
                        : null != u.scrollLeft
                        ? u.scrollLeft
                        : t.body.scrollLeft,
                    f = Ga.pointerX - M.scrollLeft,
                    g = Ga.pointerY - M.scrollTop;
                  l && !c;

                )
                  (c = Y(l.parentNode)),
                    (b = c ? M : l.parentNode),
                    (e = c
                      ? {
                          bottom: Math.max(
                            u.clientHeight,
                            window.innerHeight || 0
                          ),
                          right: Math.max(
                            u.clientWidth,
                            window.innerWidth || 0
                          ),
                          left: 0,
                          top: 0,
                        }
                      : b.getBoundingClientRect()),
                    (h = j = 0),
                    Ea &&
                      ((k = b._gsMaxScrollY - b.scrollTop),
                      0 > k
                        ? (j = k)
                        : g > e.bottom - 40 && k
                        ? ((Va = !0),
                          (j = Math.min(
                            k,
                            (m * (1 - Math.max(0, e.bottom - g) / 40)) | 0
                          )))
                        : g < e.top + 40 &&
                          b.scrollTop &&
                          ((Va = !0),
                          (j = -Math.min(
                            b.scrollTop,
                            (m * (1 - Math.max(0, g - e.top) / 40)) | 0
                          ))),
                      j && (b.scrollTop += j)),
                    Da &&
                      ((k = b._gsMaxScrollX - b.scrollLeft),
                      0 > k
                        ? (h = k)
                        : f > e.right - 40 && k
                        ? ((Va = !0),
                          (h = Math.min(
                            k,
                            (m * (1 - Math.max(0, e.right - f) / 40)) | 0
                          )))
                        : f < e.left + 40 &&
                          b.scrollLeft &&
                          ((Va = !0),
                          (h = -Math.min(
                            b.scrollLeft,
                            (m * (1 - Math.max(0, f - e.left) / 40)) | 0
                          ))),
                      h && (b.scrollLeft += h)),
                    c &&
                      (h || j) &&
                      (window.scrollTo(b.scrollLeft, b.scrollTop),
                      lb(Ga.pointerX + h, Ga.pointerY + j)),
                    (l = b);
              }
              if (ba) {
                var n = Ga.x,
                  o = Ga.y,
                  p = 1e-6;
                p > n && n > -p && (n = 0),
                  p > o && o > -p && (o = 0),
                  ya
                    ? ((Ga.deltaX = n - qa.data.rotation),
                      (qa.data.rotation = Ga.rotation = n),
                      qa.setRatio(1))
                    : i
                    ? (Ea && ((Ga.deltaY = o - i.top()), i.top(o)),
                      Da && ((Ga.deltaX = n - i.left()), i.left(n)))
                    : xa
                    ? (Ea && ((Ga.deltaY = o - qa.data.y), (qa.data.y = o)),
                      Da && ((Ga.deltaX = n - qa.data.x), (qa.data.x = n)),
                      qa.setRatio(1))
                    : (Ea &&
                        ((Ga.deltaY = o - parseFloat(d.style.top || 0)),
                        (d.style.top = o + "px")),
                      Da &&
                        ((Ga.deltaY = n - parseFloat(d.style.left || 0)),
                        (d.style.left = n + "px"))),
                  !v ||
                    a ||
                    ta ||
                    ((ta = !0), ja(Ga, "drag", "onDrag"), (ta = !1));
              }
              ba = !1;
            },
            $a = function (a, c) {
              var e,
                f = Ga.x,
                g = Ga.y;
              d._gsTransform ||
                (!xa && !ya) ||
                b.set(d, { x: "+=0", overwrite: !1 }),
                xa
                  ? ((Ga.y = d._gsTransform.y), (Ga.x = d._gsTransform.x))
                  : ya
                  ? (Ga.x = Ga.rotation = d._gsTransform.rotation)
                  : i
                  ? ((Ga.y = i.top()), (Ga.x = i.left()))
                  : ((Ga.y = parseInt(d.style.top, 10) || 0),
                    (Ga.x = parseInt(d.style.left, 10) || 0)),
                (ea || fa || ga) &&
                  !c &&
                  (Ga.isDragging || Ga.isThrowing) &&
                  (ga &&
                    ((L.x = Ga.x),
                    (L.y = Ga.y),
                    (e = ga(L)),
                    e.x !== Ga.x && ((Ga.x = e.x), (ba = !0)),
                    e.y !== Ga.y && ((Ga.y = e.y), (ba = !0))),
                  ea &&
                    ((e = ea(Ga.x)),
                    e !== Ga.x &&
                      ((Ga.x = e), ya && (Ga.rotation = e), (ba = !0))),
                  fa && ((e = fa(Ga.y)), e !== Ga.y && (Ga.y = e), (ba = !0))),
                ba && Za(!0),
                a ||
                  ((Ga.deltaX = Ga.x - f),
                  (Ga.deltaY = Ga.y - g),
                  ja(Ga, "throwupdate", "onThrowUpdate"));
            },
            _a = function () {
              var a, b, c, e;
              (s = !1),
                i
                  ? (i.calibrate(),
                    (Ga.minX = y = -i.maxScrollLeft()),
                    (Ga.minY = H = -i.maxScrollTop()),
                    (Ga.maxX = w = Ga.maxY = E = 0),
                    (s = !0))
                  : g.bounds &&
                    ((a = ka(g.bounds, d.parentNode)),
                    ya
                      ? ((Ga.minX = y = a.left),
                        (Ga.maxX = w = a.left + a.width),
                        (Ga.minY = H = Ga.maxY = E = 0))
                      : void 0 !== g.bounds.maxX || void 0 !== g.bounds.maxY
                      ? ((a = g.bounds),
                        (Ga.minX = y = a.minX),
                        (Ga.minY = H = a.minY),
                        (Ga.maxX = w = a.maxX),
                        (Ga.maxY = E = a.maxY))
                      : ((b = ka(d, d.parentNode)),
                        (Ga.minX = y = ia(d, za) + a.left - b.left),
                        (Ga.minY = H = ia(d, Aa) + a.top - b.top),
                        (Ga.maxX = w = y + (a.width - b.width)),
                        (Ga.maxY = E = H + (a.height - b.height))),
                    y > w && ((Ga.minX = w), (Ga.maxX = w = y), (y = Ga.minX)),
                    H > E && ((Ga.minY = E), (Ga.maxY = E = H), (H = Ga.minY)),
                    ya && ((Ga.minRotation = y), (Ga.maxRotation = w)),
                    (s = !0)),
                g.liveSnap &&
                  ((c = g.liveSnap === !0 ? g.snap || {} : g.liveSnap),
                  (e = c instanceof Array || "function" == typeof c),
                  ya
                    ? ((ea = hb(e ? c : c.rotation, y, w, 1)), (fa = null))
                    : c.points
                    ? (ga = ib(
                        e ? c : c.points,
                        y,
                        w,
                        H,
                        E,
                        c.radius,
                        i ? -1 : 1
                      ))
                    : (Da &&
                        (ea = hb(
                          e ? c : c.x || c.left || c.scrollLeft,
                          y,
                          w,
                          i ? -1 : 1
                        )),
                      Ea &&
                        (fa = hb(
                          e ? c : c.y || c.top || c.scrollTop,
                          H,
                          E,
                          i ? -1 : 1
                        ))));
            },
            ab = function () {
              (Ga.isThrowing = !1), ja(Ga, "throwcomplete", "onThrowComplete");
            },
            bb = function () {
              Ga.isThrowing = !1;
            },
            cb = function (a, b) {
              var c, e, h, j;
              a && f
                ? (a === !0 &&
                    ((c = g.snap || g.liveSnap || {}),
                    (e = c instanceof Array || "function" == typeof c),
                    (a = {
                      resistance:
                        (g.throwResistance || g.resistance || 1e3) /
                        (ya ? 10 : 1),
                    }),
                    ya
                      ? (a.rotation = Oa(Ga, e ? c : c.rotation, w, y, 1, b))
                      : (Da &&
                          (a[za] = Oa(
                            Ga,
                            e ? c : c.points || c.x || c.left || c.scrollLeft,
                            w,
                            y,
                            i ? -1 : 1,
                            b || "x" === Ga.lockedAxis
                          )),
                        Ea &&
                          (a[Aa] = Oa(
                            Ga,
                            e ? c : c.points || c.y || c.top || c.scrollTop,
                            E,
                            H,
                            i ? -1 : 1,
                            b || "y" === Ga.lockedAxis
                          )),
                        (c.points ||
                          (c instanceof Array && "object" == typeof c[0])) &&
                          ((a.linkedProps = za + "," + Aa),
                          (a.radius = c.radius)))),
                  (Ga.isThrowing = !0),
                  (j = isNaN(g.overshootTolerance)
                    ? 1 === g.edgeResistance
                      ? 0
                      : 1 - Ga.edgeResistance + 0.2
                    : g.overshootTolerance),
                  (Ga.tween = h =
                    f.to(
                      i || d,
                      {
                        throwProps: a,
                        ease: g.ease || q.Power3.easeOut,
                        onComplete: ab,
                        onOverwrite: bb,
                        onUpdate: g.fastMode ? ja : $a,
                        onUpdateParams: g.fastMode
                          ? [Ga, "onthrowupdate", "onThrowUpdate"]
                          : c && c.radius
                          ? [!1, !0]
                          : x,
                      },
                      isNaN(g.maxDuration) ? 2 : g.maxDuration,
                      isNaN(g.minDuration)
                        ? 0 === j
                          ? 0
                          : 0.5
                        : g.minDuration,
                      j
                    )),
                  g.fastMode ||
                    (i && (i._suspendTransforms = !0),
                    h.render(h.duration(), !0, !0),
                    $a(!0, !0),
                    (Ga.endX = Ga.x),
                    (Ga.endY = Ga.y),
                    ya && (Ga.endRotation = Ga.x),
                    h.play(0),
                    $a(!0, !0),
                    i && (i._suspendTransforms = !1)))
                : s && Ga.applyBounds();
            },
            db = function (a) {
              var b,
                c,
                e,
                f,
                g,
                h,
                i,
                l,
                m,
                n = ma || [1, 0, 0, 1, 0, 0];
              (ma = Ba(d.parentNode, !0)),
                a &&
                  Ga.isPressed &&
                  n.join(",") !== ma.join(",") &&
                  ((b = n[0]),
                  (c = n[1]),
                  (e = n[2]),
                  (f = n[3]),
                  (g = n[4]),
                  (h = n[5]),
                  (i = b * f - c * e),
                  (l = j * (f / i) + k * (-e / i) + (e * h - f * g) / i),
                  (m = j * (-c / i) + k * (b / i) + -(b * h - c * g) / i),
                  (k = l * ma[1] + m * ma[3] + ma[5]),
                  (j = l * ma[0] + m * ma[2] + ma[4])),
                ma[1] ||
                  ma[2] ||
                  1 != ma[0] ||
                  1 != ma[3] ||
                  0 != ma[4] ||
                  0 != ma[5] ||
                  (ma = null);
            },
            eb = function () {
              var a = 1 - Ga.edgeResistance;
              db(!1),
                ma &&
                  ((j = Ga.pointerX * ma[0] + Ga.pointerY * ma[2] + ma[4]),
                  (k = Ga.pointerX * ma[1] + Ga.pointerY * ma[3] + ma[5])),
                ba && (lb(Ga.pointerX, Ga.pointerY), Za(!0)),
                i
                  ? (_a(), (r = i.top()), (l = i.left()))
                  : (fb() ? ($a(!0, !0), _a()) : Ga.applyBounds(),
                    ya
                      ? ((Z = Ca(d, { x: 0, y: 0 })),
                        $a(!0, !0),
                        (l = Ga.x),
                        (r = Ga.y =
                          Math.atan2(Z.y - Ga.pointerY, Ga.pointerX - Z.x) * z))
                      : ((oa = d.parentNode ? d.parentNode.scrollTop || 0 : 0),
                        (pa = d.parentNode ? d.parentNode.scrollLeft || 0 : 0),
                        (r = ia(d, Aa)),
                        (l = ia(d, za)))),
                s &&
                  a &&
                  (l > w
                    ? (l = w + (l - w) / a)
                    : y > l && (l = y - (y - l) / a),
                  ya ||
                    (r > E
                      ? (r = E + (r - E) / a)
                      : H > r && (r = H - (H - r) / a))),
                (Ga.startX = l),
                (Ga.startY = r);
            },
            fb = function () {
              return Ga.tween && Ga.tween.isActive();
            },
            gb = function () {
              !D.parentNode ||
                fb() ||
                Ga.isDragging ||
                D.parentNode.removeChild(D);
            },
            hb = function (a, b, c, d) {
              return "function" == typeof a
                ? function (e) {
                    var f = Ga.isPressed ? 1 - Ga.edgeResistance : 1;
                    return (
                      a.call(
                        Ga,
                        e > c ? c + (e - c) * f : b > e ? b + (e - b) * f : e
                      ) * d
                    );
                  }
                : a instanceof Array
                ? function (d) {
                    for (var e, f, g = a.length, h = 0, i = A; --g > -1; )
                      (e = a[g]),
                        (f = e - d),
                        0 > f && (f = -f),
                        i > f && e >= b && c >= e && ((h = g), (i = f));
                    return a[h];
                  }
                : isNaN(a)
                ? function (a) {
                    return a;
                  }
                : function () {
                    return a * d;
                  };
            },
            ib = function (a, b, c, d, e, f, g) {
              return (
                (f = f || A),
                "function" == typeof a
                  ? function (h) {
                      var i,
                        j,
                        k,
                        l = Ga.isPressed ? 1 - Ga.edgeResistance : 1,
                        m = h.x,
                        n = h.y;
                      return (
                        (h.x = m =
                          m > c
                            ? c + (m - c) * l
                            : b > m
                            ? b + (m - b) * l
                            : m),
                        (h.y = n =
                          n > e
                            ? e + (n - e) * l
                            : d > n
                            ? d + (n - d) * l
                            : n),
                        (i = a.call(Ga, h)),
                        i !== h && ((h.x = i.x), (h.y = i.y)),
                        1 !== g && ((h.x *= g), (h.y *= g)),
                        A > f &&
                          ((j = h.x - m),
                          (k = h.y - n),
                          Math.sqrt(j * j + k * k) > f &&
                            ((h.x = m), (h.y = n))),
                        h
                      );
                    }
                  : a instanceof Array
                  ? function (b) {
                      for (
                        var c, d, e, g, h = a.length, i = 0, j = A;
                        --h > -1;

                      )
                        (e = a[h]),
                          (c = e.x - b.x),
                          (d = e.y - b.y),
                          (g = Math.sqrt(c * c + d * d)),
                          j > g && ((i = h), (j = g));
                      return f >= j ? a[i] : b;
                    }
                  : function (a) {
                      return a;
                    }
              );
            },
            jb = function (a) {
              var c;
              if (
                !(
                  !h ||
                  Ga.isPressed ||
                  !a ||
                  (("mousedown" === a.type || "pointerdown" === a.type) &&
                    B() - Ya < 30 &&
                    Ia[Ga.pointerEvent.type])
                )
              ) {
                if (
                  ((na = fb()),
                  (Ga.pointerEvent = a),
                  Ia[a.type]
                    ? ((la =
                        -1 !== a.type.indexOf("touch")
                          ? a.currentTarget || a.target
                          : t),
                      Ja(la, "touchend", mb),
                      Ja(la, "touchmove", kb),
                      Ja(la, "touchcancel", mb),
                      Ja(t, "touchstart", Na))
                    : ((la = null), Ja(t, "mousemove", kb)),
                  (sa = null),
                  Ja(t, "mouseup", mb),
                  a && a.target && Ja(a.target, "mouseup", mb),
                  (ha = Wa.call(Ga, a.target) && !g.dragClickables))
                )
                  return (
                    Ja(a.target, "change", mb),
                    ja(Ga, "press", "onPress"),
                    void Qa(Ma, !0)
                  );
                if (
                  ((ra =
                    la && Da !== Ea && Ga.vars.allowNativeTouchScrolling !== !1
                      ? Da
                        ? "y"
                        : "x"
                      : !1),
                  C
                    ? (a = _(a, !0))
                    : ra ||
                      Ga.allowEventDefault ||
                      (a.preventDefault(),
                      a.preventManipulation && a.preventManipulation()),
                  a.changedTouches
                    ? ((a = U = a.changedTouches[0]), (V = a.identifier))
                    : a.pointerId
                    ? (V = a.pointerId)
                    : (U = V = null),
                  I++,
                  Q(Za),
                  (k = Ga.pointerY = a.pageY),
                  (j = Ga.pointerX = a.pageX),
                  (ra || Ga.autoScroll) && $(d.parentNode),
                  d.parentNode &&
                    (i ||
                      (Ga.autoScroll &&
                        !ya &&
                        d.parentNode._gsMaxScrollX &&
                        !D.parentNode)) &&
                    !d.getBBox &&
                    ((D.style.width = d.parentNode.scrollWidth + "px"),
                    d.parentNode.appendChild(D)),
                  eb(),
                  Ga.tween && Ga.tween.kill(),
                  (Ga.isThrowing = !1),
                  b.killTweensOf(i || d, !0, Ra),
                  i && b.killTweensOf(d, !0, { scrollTo: 1 }),
                  (Ga.tween = Ga.lockedAxis = null),
                  (g.zIndexBoost || (!ya && !i && g.zIndexBoost !== !1)) &&
                    (d.style.zIndex = Ta.zIndex++),
                  (Ga.isPressed = !0),
                  (v = !(!g.onDrag && !Ga._listeners.drag)),
                  !ya)
                )
                  for (c = Ma.length; --c > -1; )
                    ca(Ma[c], "cursor", g.cursor || "move");
                ja(Ga, "press", "onPress");
              }
            },
            kb = function (a) {
              var b,
                c,
                d,
                f,
                g,
                i,
                l = a;
              if (h && !e && Ga.isPressed && a) {
                if (((Ga.pointerEvent = a), (b = a.changedTouches))) {
                  if (((a = b[0]), a !== U && a.identifier !== V)) {
                    for (
                      f = b.length;
                      --f > -1 && (a = b[f]).identifier !== V;

                    );
                    if (0 > f) return;
                  }
                } else if (a.pointerId && V && a.pointerId !== V) return;
                if (C) a = _(a, !0);
                else {
                  if (
                    la &&
                    ra &&
                    !sa &&
                    ((c = a.pageX),
                    (d = a.pageY),
                    ma &&
                      ((f = c * ma[0] + d * ma[2] + ma[4]),
                      (d = c * ma[1] + d * ma[3] + ma[5]),
                      (c = f)),
                    (g = Math.abs(c - j)),
                    (i = Math.abs(d - k)),
                    ((g !== i && (g > Fa || i > Fa)) || (J && ra === sa)) &&
                      ((sa = g > i && Da ? "x" : "y"),
                      Ga.vars.lockAxisOnTouchScroll !== !1 &&
                        ((Ga.lockedAxis = "x" === sa ? "y" : "x"),
                        "function" == typeof Ga.vars.onLockAxis &&
                          Ga.vars.onLockAxis.call(Ga, l)),
                      J && ra === sa))
                  )
                    return void mb(l);
                  Ga.allowEventDefault ||
                    (ra && (!sa || ra === sa)) ||
                    l.cancelable === !1 ||
                    (l.preventDefault(),
                    l.preventManipulation && l.preventManipulation());
                }
                Ga.autoScroll && (Va = !0), lb(a.pageX, a.pageY);
              }
            },
            lb = function (a, b) {
              var c,
                d,
                e,
                f,
                g,
                h,
                i = 1 - Ga.dragResistance,
                m = 1 - Ga.edgeResistance;
              (Ga.pointerX = a),
                (Ga.pointerY = b),
                ya
                  ? ((f = Math.atan2(Z.y - b, a - Z.x) * z),
                    (g = Ga.y - f),
                    (Ga.y = f),
                    g > 180 ? (r -= 360) : -180 > g && (r += 360),
                    (e = l + (r - f) * i))
                  : (ma &&
                      ((h = a * ma[0] + b * ma[2] + ma[4]),
                      (b = a * ma[1] + b * ma[3] + ma[5]),
                      (a = h)),
                    (d = b - k),
                    (c = a - j),
                    Fa > d && d > -Fa && (d = 0),
                    Fa > c && c > -Fa && (c = 0),
                    (Ga.lockAxis || Ga.lockedAxis) &&
                      (c || d) &&
                      ((h = Ga.lockedAxis),
                      h ||
                        ((Ga.lockedAxis = h =
                          Da && Math.abs(c) > Math.abs(d)
                            ? "y"
                            : Ea
                            ? "x"
                            : null),
                        h &&
                          "function" == typeof Ga.vars.onLockAxis &&
                          Ga.vars.onLockAxis.call(Ga, Ga.pointerEvent)),
                      "y" === h ? (d = 0) : "x" === h && (c = 0)),
                    (e = l + c * i),
                    (f = r + d * i)),
                (ea || fa || ga) && (Ga.x !== e || (Ga.y !== f && !ya))
                  ? (ga &&
                      ((L.x = e), (L.y = f), (h = ga(L)), (e = h.x), (f = h.y)),
                    ea && (e = ea(e)),
                    fa && (f = fa(f)))
                  : s &&
                    (e > w
                      ? (e = w + (e - w) * m)
                      : y > e && (e = y + (e - y) * m),
                    ya ||
                      (f > E
                        ? (f = E + (f - E) * m)
                        : H > f && (f = H + (f - H) * m))),
                ya || ((e = Math.round(e)), (f = Math.round(f))),
                (Ga.x !== e || (Ga.y !== f && !ya)) &&
                  (ya
                    ? ((Ga.endRotation = Ga.x = Ga.endX = e), (ba = !0))
                    : (Ea && ((Ga.y = Ga.endY = f), (ba = !0)),
                      Da && ((Ga.x = Ga.endX = e), (ba = !0))),
                  !Ga.isDragging &&
                    Ga.isPressed &&
                    ((Ga.isDragging = !0), ja(Ga, "dragstart", "onDragStart")));
            },
            mb = function (a, c) {
              if (
                h &&
                Ga.isPressed &&
                (!a ||
                  null == V ||
                  c ||
                  !(
                    (a.pointerId && a.pointerId !== V) ||
                    (a.changedTouches && !La(a.changedTouches, V))
                  ))
              ) {
                Ga.isPressed = !1;
                var e,
                  f,
                  i,
                  j,
                  k,
                  l = a,
                  m = Ga.isDragging,
                  n = b.delayedCall(0.001, gb);
                if (
                  (la
                    ? (Ka(la, "touchend", mb),
                      Ka(la, "touchmove", kb),
                      Ka(la, "touchcancel", mb),
                      Ka(t, "touchstart", Na))
                    : Ka(t, "mousemove", kb),
                  Ka(t, "mouseup", mb),
                  a && a.target && Ka(a.target, "mouseup", mb),
                  (ba = !1),
                  ha)
                )
                  return (
                    a && Ka(a.target, "change", mb),
                    Qa(Ma, !1),
                    ja(Ga, "release", "onRelease"),
                    ja(Ga, "click", "onClick"),
                    void (ha = !1)
                  );
                if ((R(Za), !ya))
                  for (f = Ma.length; --f > -1; )
                    ca(Ma[f], "cursor", g.cursor || "move");
                if ((m && ((Ua = K = B()), (Ga.isDragging = !1)), I--, a)) {
                  if (
                    (C && (a = _(a, !1)),
                    (e = a.changedTouches),
                    e && ((a = e[0]), a !== U && a.identifier !== V))
                  ) {
                    for (
                      f = e.length;
                      --f > -1 && (a = e[f]).identifier !== V;

                    );
                    if (0 > f) return;
                  }
                  (Ga.pointerEvent = l),
                    (Ga.pointerX = a.pageX),
                    (Ga.pointerY = a.pageY);
                }
                return (
                  l && !m
                    ? (na && (g.snap || g.bounds) && cb(g.throwProps),
                      ja(Ga, "release", "onRelease"),
                      (J && "touchmove" === l.type) ||
                        (ja(Ga, "click", "onClick"),
                        (j = l.target || l.srcElement || d),
                        (Ya = B()),
                        (k = function () {
                          Ya !== ua &&
                            Ga.enabled() &&
                            !Ga.isPressed &&
                            (j.click
                              ? j.click()
                              : t.createEvent &&
                                ((i = t.createEvent("MouseEvents")),
                                i.initMouseEvent(
                                  "click",
                                  !0,
                                  !0,
                                  window,
                                  1,
                                  Ga.pointerEvent.screenX,
                                  Ga.pointerEvent.screenY,
                                  Ga.pointerX,
                                  Ga.pointerY,
                                  !1,
                                  !1,
                                  !1,
                                  !1,
                                  0,
                                  null
                                ),
                                j.dispatchEvent(i)));
                        }),
                        J || l.defaultPrevented || b.delayedCall(1e-5, k)))
                    : (cb(g.throwProps),
                      C ||
                        Ga.allowEventDefault ||
                        !l ||
                        (!g.dragClickables && Wa.call(Ga, l.target)) ||
                        !m ||
                        (ra && (!sa || ra !== sa)) ||
                        l.cancelable === !1 ||
                        (l.preventDefault(),
                        l.preventManipulation && l.preventManipulation()),
                      ja(Ga, "release", "onRelease")),
                  fb() && n.duration(Ga.tween.duration()),
                  m && ja(Ga, "dragend", "onDragEnd"),
                  !0
                );
              }
            },
            nb = function (a) {
              if (a && Ga.isDragging && !i) {
                var b = a.target || a.srcElement || d.parentNode,
                  c = b.scrollLeft - b._gsScrollX,
                  e = b.scrollTop - b._gsScrollY;
                (c || e) &&
                  (ma
                    ? ((j -= c * ma[0] + e * ma[2]),
                      (k -= e * ma[3] + c * ma[1]))
                    : ((j -= c), (k -= e)),
                  (b._gsScrollX += c),
                  (b._gsScrollY += e),
                  lb(Ga.pointerX, Ga.pointerY));
              }
            },
            ob = function (a) {
              var b = B(),
                c = 40 > b - Ya,
                d = 40 > b - Ua,
                e = c && ua === Ya,
                f = !!a.preventDefault,
                g = Ga.pointerEvent && Ga.pointerEvent.defaultPrevented,
                h = c && va === Ya,
                i = a.isTrusted || (null == a.isTrusted && c && e);
              return (
                f &&
                  (e || (d && Ga.vars.suppressClickOnDrag !== !1)) &&
                  a.stopImmediatePropagation(),
                !c ||
                (Ga.pointerEvent && Ga.pointerEvent.defaultPrevented) ||
                (e && i === h)
                  ? void (
                      (Ga.isPressed || d || c) &&
                      (f
                        ? (i && a.detail && c && !g) ||
                          (a.preventDefault(),
                          a.preventManipulation && a.preventManipulation())
                        : (a.returnValue = !1))
                    )
                  : (i && e && (va = Ya), void (ua = Ya))
              );
            };
          (da = Ta.get(this.target)),
            da && da.kill(),
            (this.startDrag = function (a) {
              jb(a),
                Ga.isDragging ||
                  ((Ga.isDragging = !0), ja(Ga, "dragstart", "onDragStart"));
            }),
            (this.drag = kb),
            (this.endDrag = function (a) {
              mb(a, !0);
            }),
            (this.timeSinceDrag = function () {
              return Ga.isDragging ? 0 : (B() - Ua) / 1e3;
            }),
            (this.hitTest = function (a, b) {
              return Ta.hitTest(Ga.target, a, b);
            }),
            (this.getDirection = function (a, b) {
              var c,
                d,
                e,
                g,
                h,
                i,
                j =
                  "velocity" === a && f
                    ? a
                    : "object" != typeof a || ya
                    ? "start"
                    : "element";
              return (
                "element" === j && ((h = Xa(Ga.target)), (i = Xa(a))),
                (c =
                  "start" === j
                    ? Ga.x - l
                    : "velocity" === j
                    ? f.getVelocity(this.target, za)
                    : h.left + h.width / 2 - (i.left + i.width / 2)),
                ya
                  ? 0 > c
                    ? "counter-clockwise"
                    : "clockwise"
                  : ((b = b || 2),
                    (d =
                      "start" === j
                        ? Ga.y - r
                        : "velocity" === j
                        ? f.getVelocity(this.target, Aa)
                        : h.top + h.height / 2 - (i.top + i.height / 2)),
                    (e = Math.abs(c / d)),
                    (g = 1 / b > e ? "" : 0 > c ? "left" : "right"),
                    b > e &&
                      ("" !== g && (g += "-"), (g += 0 > d ? "up" : "down")),
                    g)
              );
            }),
            (this.applyBounds = function (a) {
              var b, c, e, f, h, i;
              if (a && g.bounds !== a) return (g.bounds = a), Ga.update(!0);
              if (($a(!0), _a(), s)) {
                if (
                  ((b = Ga.x),
                  (c = Ga.y),
                  b > w ? (b = w) : y > b && (b = y),
                  c > E ? (c = E) : H > c && (c = H),
                  (Ga.x !== b || Ga.y !== c) &&
                    ((e = !0),
                    (Ga.x = Ga.endX = b),
                    ya ? (Ga.endRotation = b) : (Ga.y = Ga.endY = c),
                    (ba = !0),
                    Za(!0),
                    Ga.autoScroll && !Ga.isDragging))
                )
                  for (
                    $(d.parentNode),
                      f = d,
                      M.scrollTop =
                        null != window.pageYOffset
                          ? window.pageYOffset
                          : null != u.scrollTop
                          ? u.scrollTop
                          : t.body.scrollTop,
                      M.scrollLeft =
                        null != window.pageXOffset
                          ? window.pageXOffset
                          : null != u.scrollLeft
                          ? u.scrollLeft
                          : t.body.scrollLeft;
                    f && !i;

                  )
                    (i = Y(f.parentNode)),
                      (h = i ? M : f.parentNode),
                      Ea &&
                        h.scrollTop > h._gsMaxScrollY &&
                        (h.scrollTop = h._gsMaxScrollY),
                      Da &&
                        h.scrollLeft > h._gsMaxScrollX &&
                        (h.scrollLeft = h._gsMaxScrollX),
                      (f = h);
                Ga.isThrowing &&
                  (e ||
                    Ga.endX > w ||
                    Ga.endX < y ||
                    Ga.endY > E ||
                    Ga.endY < H) &&
                  cb(g.throwProps, e);
              }
              return Ga;
            }),
            (this.update = function (a, b, c) {
              var e = Ga.x,
                f = Ga.y;
              return (
                db(!b),
                a ? Ga.applyBounds() : (ba && c && Za(!0), $a(!0)),
                b && (lb(Ga.pointerX, Ga.pointerY), ba && Za(!0)),
                Ga.isPressed &&
                  !b &&
                  ((Da && Math.abs(e - Ga.x) > 0.01) ||
                    (Ea && Math.abs(f - Ga.y) > 0.01 && !ya)) &&
                  eb(),
                Ga.autoScroll &&
                  ($(d.parentNode), (Va = Ga.isDragging), Za(!0)),
                Ga.autoScroll && (X(d, nb), W(d, nb)),
                Ga
              );
            }),
            (this.enable = function (a) {
              var e, j, k;
              if ("soft" !== a) {
                for (j = Ma.length; --j > -1; )
                  (k = Ma[j]),
                    Ja(k, "mousedown", jb),
                    Ja(k, "touchstart", jb),
                    Ja(k, "click", ob, !0),
                    ya || ca(k, "cursor", g.cursor || "move"),
                    ca(k, "touchCallout", "none"),
                    ca(
                      k,
                      "touchAction",
                      Da === Ea ? "none" : Da ? "pan-y" : "pan-x"
                    );
                Qa(Ma, !1);
              }
              return (
                W(d, nb),
                (h = !0),
                f &&
                  "soft" !== a &&
                  f.track(i || d, xa ? "x,y" : ya ? "rotation" : "top,left"),
                i && i.enable(),
                (d._gsDragID = e = "d" + G++),
                (F[e] = this),
                i && (i.element._gsDragID = e),
                b.set(d, { x: "+=0", overwrite: !1 }),
                (qa = {
                  t: d,
                  data: C ? S : d._gsTransform,
                  tween: {},
                  setRatio: C
                    ? function () {
                        b.set(d, P);
                      }
                    : c._internals.setTransformRatio ||
                      c._internals.set3DTransformRatio,
                }),
                eb(),
                Ga.update(!0),
                Ga
              );
            }),
            (this.disable = function (a) {
              var b,
                c,
                e = Ga.isDragging;
              if (!ya)
                for (b = Ma.length; --b > -1; ) ca(Ma[b], "cursor", null);
              if ("soft" !== a) {
                for (b = Ma.length; --b > -1; )
                  (c = Ma[b]),
                    ca(c, "touchCallout", null),
                    ca(c, "touchAction", null),
                    Ka(c, "mousedown", jb),
                    Ka(c, "touchstart", jb),
                    Ka(c, "click", ob);
                Qa(Ma, !0),
                  la &&
                    (Ka(la, "touchcancel", mb),
                    Ka(la, "touchend", mb),
                    Ka(la, "touchmove", kb)),
                  Ka(t, "mouseup", mb),
                  Ka(t, "mousemove", kb);
              }
              return (
                X(d, nb),
                (h = !1),
                f &&
                  "soft" !== a &&
                  f.untrack(i || d, xa ? "x,y" : ya ? "rotation" : "top,left"),
                i && i.disable(),
                R(Za),
                (Ga.isDragging = Ga.isPressed = ha = !1),
                e && ja(Ga, "dragend", "onDragEnd"),
                Ga
              );
            }),
            (this.enabled = function (a, b) {
              return arguments.length ? (a ? Ga.enable(b) : Ga.disable(b)) : h;
            }),
            (this.kill = function () {
              return (
                (Ga.isThrowing = !1),
                b.killTweensOf(i || d, !0, Ra),
                Ga.disable(),
                delete F[d._gsDragID],
                Ga
              );
            }),
            -1 !== wa.indexOf("scroll") &&
              ((i = this.scrollProxy =
                new Sa(
                  d,
                  T(
                    {
                      onKill: function () {
                        Ga.isPressed && mb(null);
                      },
                    },
                    g
                  )
                )),
              (d.style.overflowY = Ea && !Ha ? "auto" : "hidden"),
              (d.style.overflowX = Da && !Ha ? "auto" : "hidden"),
              (d = i.content)),
            g.force3D !== !1 && b.set(d, { force3D: !0 }),
            ya ? (Ra.rotation = 1) : (Da && (Ra[za] = 1), Ea && (Ra[Aa] = 1)),
            ya
              ? ((P = p), (S = P.css), (P.overwrite = !1))
              : xa &&
                ((P = Da && Ea ? m : Da ? n : o),
                (S = P.css),
                (P.overwrite = !1)),
            this.enable();
        },
        Ua = (Ta.prototype = new a());
      (Ua.constructor = Ta),
        (Ua.pointerX =
          Ua.pointerY =
          Ua.startX =
          Ua.startY =
          Ua.deltaX =
          Ua.deltaY =
            0),
        (Ua.isDragging = Ua.isPressed = !1),
        (Ta.version = "0.15.0"),
        (Ta.zIndex = 1e3),
        Ja(t, "touchcancel", function () {}),
        Ja(t, "contextmenu", function (a) {
          var b;
          for (b in F) F[b].isPressed && F[b].endDrag();
        }),
        (Ta.create = function (a, c) {
          "string" == typeof a && (a = b.selector(a));
          for (
            var d = a && 0 !== a.length ? (Fa(a) ? Ga(a) : [a]) : [],
              e = d.length;
            --e > -1;

          )
            d[e] = new Ta(d[e], c);
          return d;
        }),
        (Ta.get = function (a) {
          return F[(aa(a) || {})._gsDragID];
        }),
        (Ta.timeSinceDrag = function () {
          return (B() - K) / 1e3;
        });
      var Va = {},
        Wa = function (a) {
          var b,
            c,
            d = 0,
            e = 0;
          for (a = aa(a), b = a.offsetWidth, c = a.offsetHeight; a; )
            (d += a.offsetTop), (e += a.offsetLeft), (a = a.offsetParent);
          return { top: d, left: e, width: b, height: c };
        },
        Xa = function (a, b) {
          if (a === window)
            return (
              (Va.left = Va.top = 0),
              (Va.width = Va.right =
                u.clientWidth || a.innerWidth || t.body.clientWidth || 0),
              (Va.height = Va.bottom =
                (a.innerHeight || 0) - 20 < u.clientHeight
                  ? u.clientHeight
                  : a.innerHeight || t.body.clientHeight || 0),
              Va
            );
          var c =
            a.pageX !== b
              ? {
                  left: a.pageX - V(),
                  top: a.pageY - U(),
                  right: a.pageX - V() + 1,
                  bottom: a.pageY - U() + 1,
                }
              : a.nodeType || a.left === b || a.top === b
              ? C
                ? Wa(a)
                : aa(a).getBoundingClientRect()
              : a;
          return (
            c.right === b && c.width !== b
              ? ((c.right = c.left + c.width), (c.bottom = c.top + c.height))
              : c.width === b &&
                (c = {
                  width: c.right - c.left,
                  height: c.bottom - c.top,
                  right: c.right,
                  left: c.left,
                  bottom: c.bottom,
                  top: c.top,
                }),
            c
          );
        };
      return (
        (Ta.hitTest = function (a, b, c) {
          if (a === b) return !1;
          var d,
            e,
            f,
            g = Xa(a),
            h = Xa(b),
            i =
              h.left > g.right ||
              h.right < g.left ||
              h.top > g.bottom ||
              h.bottom < g.top;
          return i || !c
            ? !i
            : ((f = -1 !== (c + "").indexOf("%")),
              (c = parseFloat(c) || 0),
              (d = {
                left: Math.max(g.left, h.left),
                top: Math.max(g.top, h.top),
              }),
              (d.width = Math.min(g.right, h.right) - d.left),
              (d.height = Math.min(g.bottom, h.bottom) - d.top),
              d.width < 0 || d.height < 0
                ? !1
                : f
                ? ((c *= 0.01),
                  (e = d.width * d.height),
                  e >= g.width * g.height * c || e >= h.width * h.height * c)
                : d.width > c && d.height > c);
        }),
        (D.style.cssText =
          "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;"),
        Ta
      );
    },
    !0
  );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (a) {
    "use strict";
    var b = function () {
      return (_gsScope.GreenSockGlobals || _gsScope)[a];
    };
    "function" == typeof define && define.amd
      ? define(["TweenLite", "CSSPlugin"], b)
      : "undefined" != typeof module &&
        module.exports &&
        (require("../TweenLite.js"),
        require("../plugins/CSSPlugin.js"),
        (module.exports = b()));
  })("Draggable");
