!function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports && "object" == typeof module ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t, e) {
    "use strict";

    function r(t, e, r, a) {
        for (var n = [], o = 0; o < t.length; o++) {
            var s = t[o];
            if (s) {
                var i = tinycolor(s), l = i.toHsl().l < .5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
                l += tinycolor.equals(e, s) ? " sp-thumb-active" : "";
                var c = i.toString(a.preferredFormat || "rgb"),
                    f = b ? "background-color:" + i.toRgbString() : "filter:" + i.toFilter();
                n.push('<span title="' + c + '" data-color="' + i.toRgbString() + '" class="' + l + '"><span class="sp-thumb-inner" style="' + f + ';"></span></span>')
            } else n.push('<span class="sp-thumb-el sp-clear-display" ><span class="sp-clear-palette-only" style="background-color: transparent;"></span></span>')
        }
        return "<div class='sp-cf " + r + "'>" + n.join("") + "</div>"
    }

    function a() {
        for (var t = 0; t < p.length; t++) p[t] && p[t].hide()
    }

    function n(e, r) {
        e.locale = e.locale || window.navigator.language, e.locale && (e.locale = e.locale.split("-")[0].toLowerCase()), "en" != e.locale && t.spectrum.localization[e.locale] && (e = t.extend({}, t.spectrum.localization[e.locale], e));
        var a = t.extend({}, d, e);
        return a.callbacks = {
            move: c(a.move, r),
            change: c(a.change, r),
            show: c(a.show, r),
            hide: c(a.hide, r),
            beforeShow: c(a.beforeShow, r)
        }, a
    }

    function o(o, i) {
        function c() {
            if (W.showPaletteOnly && (W.showPalette = !0), It.text(W.showPaletteOnly ? W.togglePaletteMoreText : W.togglePaletteLessText), W.palette) {
                pt = W.palette.slice(0), gt = t.isArray(pt[0]) ? pt : [pt], bt = {};
                for (var e = 0; e < gt.length; e++) for (var r = 0; r < gt[e].length; r++) {
                    var a = tinycolor(gt[e][r]).toRgbString();
                    bt[a] = !0
                }
                W.showPaletteOnly && !W.color && (Wt = "" === pt[0][0] ? pt[0][0] : Object.keys(bt)[0])
            }
            Ct.toggleClass("sp-flat", Y), Ct.toggleClass("sp-input-disabled", !W.showInput), Ct.toggleClass("sp-alpha-enabled", W.showAlpha), Ct.toggleClass("sp-clear-enabled", Jt), Ct.toggleClass("sp-buttons-disabled", !W.showButtons), Ct.toggleClass("sp-palette-buttons-disabled", !W.togglePaletteOnly), Ct.toggleClass("sp-palette-disabled", !W.showPalette), Ct.toggleClass("sp-palette-only", W.showPaletteOnly), Ct.toggleClass("sp-initial-disabled", !W.showInitial), Ct.addClass(W.className).addClass(W.containerClassName), I()
        }

        function d() {
            function e(e) {
                return e.data && e.data.ignore ? (O(t(e.target).closest(".sp-thumb-el").data("color")), q()) : (O(t(e.target).closest(".sp-thumb-el").data("color")), q(), W.hideAfterPaletteSelect ? (D(!0), F()) : D()), !1
            }

            if (g && Ct.find("*:not(input)").attr("unselectable", "on"), c(), Ut = t('<span class="sp-original-input-container"></span>'), ["margin"].forEach(function (t) {
                Ut.css(t, kt.css(t))
            }), "block" == kt.css("display") && Ut.css("display", "flex"), Bt) kt.after(Kt).hide(); else if ("text" == X) Ut.addClass("sp-colorize-container"), kt.addClass("spectrum sp-colorize").wrap(Ut); else if ("component" == X) {
                kt.addClass("spectrum").wrap(Ut);
                var r = t(["<div class='sp-colorize-container sp-add-on'>", "<div class='sp-colorize'></div> ", "</div>"].join(""));
                r.width(kt.outerHeight() + "px").css("border-radius", kt.css("border-radius")).css("border", kt.css("border")), kt.addClass("with-add-on").before(r)
            }
            if (Zt = kt.parent().find(".sp-colorize"), te = Zt.css("color"), ee = Zt.css("background-color"), Jt || Nt.hide(), Y) kt.after(Ct).hide(); else {
                var a = "parent" === W.appendTo ? kt.parent() : t(W.appendTo);
                1 !== a.length && (a = t("body")), a.append(Ct)
            }
            y(), Vt.on("click.spectrum touchstart.spectrum", function (e) {
                St || A(), e.stopPropagation(), t(e.target).is("input") || e.preventDefault()
            }), (kt.is(":disabled") || W.disabled === !0) && V(), Ct.click(l), [jt, kt].forEach(function (e) {
                e.change(function () {
                    P(e.val())
                }), e.on("paste", function () {
                    setTimeout(function () {
                        P(e.val())
                    }, 1)
                }), e.keydown(function (r) {
                    13 == r.keyCode && (P(t(e).val()), e == kt && F())
                })
            }), zt.text(W.cancelText), zt.on("click.spectrum", function (t) {
                t.stopPropagation(), t.preventDefault(), T(), F()
            }), Nt.attr("title", W.clearText), Nt.on("click.spectrum", function (t) {
                t.stopPropagation(), t.preventDefault(), Qt = !0, q(), Y && D(!0)
            }), Dt.text(W.chooseText), Dt.on("click.spectrum", function (t) {
                t.stopPropagation(), t.preventDefault(), g && jt.is(":focus") && jt.trigger("change"), E() && (D(!0), F())
            }), It.text(W.showPaletteOnly ? W.togglePaletteMoreText : W.togglePaletteLessText), It.on("click.spectrum", function (t) {
                t.stopPropagation(), t.preventDefault(), W.showPaletteOnly = !W.showPaletteOnly, W.showPaletteOnly || Y || Ct.css("left", "-=" + (Pt.outerWidth(!0) + 5)), c()
            }), f(Tt, function (t, e, r) {
                dt = t / it, Qt = !1, r.shiftKey && (dt = Math.round(10 * dt) / 10), q()
            }, S, C), f(Mt, function (t, e) {
                ft = parseFloat(e / ot), Qt = !1, W.showAlpha || (dt = 1), q()
            }, S, C), f(At, function (t, e, r) {
                if (r.shiftKey) {
                    if (!_t) {
                        var a = ut * rt, n = at - ht * at, o = Math.abs(t - a) > Math.abs(e - n);
                        _t = o ? "x" : "y"
                    }
                } else _t = null;
                var s = !_t || "x" === _t, i = !_t || "y" === _t;
                s && (ut = parseFloat(t / rt)), i && (ht = parseFloat((at - e) / at)), Qt = !1, W.showAlpha || (dt = 1), q()
            }, S, C), Wt ? (O(Wt), z(), Yt = tinycolor(Wt).format || W.preferredFormat, w(Wt)) : "" === Wt ? (O(Wt), z()) : z(), Y && R();
            var n = g ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
            Et.on(n, ".sp-thumb-el", e), qt.on(n, ".sp-thumb-el:nth-child(1)", {ignore: !0}, e)
        }

        function y() {
            if (Q) {
                try {
                    var e = window.localStorage, r = e[Q].split(",#");
                    r.length > 1 && (delete e[Q], t.each(r, function (t, e) {
                        w(e)
                    }))
                } catch (a) {
                }
                try {
                    vt = window.localStorage[Q].split(";")
                } catch (a) {
                }
            }
        }

        function w(e) {
            if (G) {
                var r = tinycolor(e).toRgbString();
                if (!bt[r] && -1 === t.inArray(r, vt)) for (vt.push(r); vt.length > mt;) vt.shift();
                if (Q) try {
                    window.localStorage[Q] = vt.join(";")
                } catch (a) {
                }
            }
        }

        function _() {
            var t = [];
            if (W.showPalette) for (var e = 0; e < vt.length; e++) {
                var r = tinycolor(vt[e]).toRgbString();
                bt[r] || t.push(vt[e])
            }
            return t.reverse().slice(0, W.maxSelectionSize)
        }

        function x() {
            var e = j(), a = t.map(gt, function (t, a) {
                return r(t, e, "sp-palette-row sp-palette-row-" + a, W)
            });
            y(), vt && a.push(r(_(), e, "sp-palette-row sp-palette-row-selection", W)), Et.html(a.join(""))
        }

        function k() {
            if (W.showInitial) {
                var t = Xt, e = j();
                qt.html(r([t, e], e, "sp-palette-row-initial", W))
            }
        }

        function S() {
            (0 >= at || 0 >= rt || 0 >= ot) && I(), et = !0, Ct.addClass(yt), _t = null, kt.trigger("dragstart.spectrum", [j()])
        }

        function C() {
            et = !1, Ct.removeClass(yt), kt.trigger("dragstop.spectrum", [j()])
        }

        function P(t) {
            if (wt) return void (wt = !1);
            if (null !== t && "" !== t || !Jt) {
                var e = tinycolor(t);
                e.isValid() ? (O(e), q(), D()) : jt.addClass("sp-validation-error")
            } else O(null), q(), D()
        }

        function A() {
            tt ? F() : R()
        }

        function R() {
            var e = t.Event("beforeShow.spectrum");
            return tt ? void I() : (kt.trigger(e, [j()]), void (U.beforeShow(j()) === !1 || e.isDefaultPrevented() || (a(), tt = !0, t(xt).on("keydown.spectrum", M), t(xt).on("click.spectrum", H), t(window).on("resize.spectrum", Z), Kt.addClass("sp-active"), Ct.removeClass("sp-hidden"), I(), z(), Xt = j(), k(), U.show(Xt), kt.trigger("show.spectrum", [Xt]))))
        }

        function M(t) {
            27 === t.keyCode && F()
        }

        function H(t) {
            2 != t.button && (et || (Gt ? D(!0) : T(), F()))
        }

        function F() {
            tt && !Y && (tt = !1, t(xt).off("keydown.spectrum", M), t(xt).off("click.spectrum", H), t(window).off("resize.spectrum", Z), Kt.removeClass("sp-active"), Ct.addClass("sp-hidden"), U.hide(j()), kt.trigger("hide.spectrum", [j()]))
        }

        function T() {
            O(Xt, !0), D(!0)
        }

        function O(t, r) {
            if (tinycolor.equals(t, j())) return void z();
            var a, n;
            t && t !== e || !Jt ? (Qt = !1, a = tinycolor(t), n = a.toHsv(), ft = n.h % 360 / 360, ut = n.s, ht = n.v, dt = n.a) : Qt = !0, z(), a && a.isValid() && !r && (Yt = W.preferredFormat || a.getFormat())
        }

        function j(t) {
            return t = t || {}, Jt && Qt ? null : tinycolor.fromRatio({
                h: ft,
                s: ut,
                v: ht,
                a: Math.round(1e3 * dt) / 1e3
            }, {format: t.format || Yt})
        }

        function E() {
            return !jt.hasClass("sp-validation-error")
        }

        function q() {
            z(), U.move(j()), kt.trigger("move.spectrum", [j()])
        }

        function z() {
            jt.removeClass("sp-validation-error"), N();
            var t = tinycolor.fromRatio({h: ft, s: 1, v: 1});
            At.css("background-color", t.toHexString());
            var e = Yt;
            1 > dt && (0 !== dt || "name" !== e) && ("hex" === e || "hex3" === e || "hex6" === e || "name" === e) && (e = "rgb");
            var r = j({format: e}), a = "";
            if ($t.removeClass("sp-clear-display"), $t.css("background-color", "transparent"), !r && Jt) $t.addClass("sp-clear-display"); else {
                var n = r.toHexString(), o = r.toRgbString();
                if (b || 1 === r.alpha ? $t.css("background-color", o) : ($t.css("background-color", "transparent"), $t.css("filter", r.toFilter())), W.showAlpha) {
                    var s = r.toRgb();
                    s.a = 0;
                    var i = tinycolor(s).toRgbString(), l = "linear-gradient(left, " + i + ", " + n + ")";
                    g ? Ft.css("filter", tinycolor(i).toFilter({gradientType: 1}, n)) : (Ft.css("background", "-webkit-" + l), Ft.css("background", "-moz-" + l), Ft.css("background", "-ms-" + l), Ft.css("background", "linear-gradient(to right, " + i + ", " + n + ")"))
                }
                a = r.toString(e)
            }
            if (W.showInput && jt.val(a), kt.val(a), "text" == W.type || "component" == W.type) {
                var c = r;
                if (c && Zt) {
                    var f = c.isLight() || c.getAlpha() < .4 ? "black" : "white";
                    Zt.css("background-color", c.toRgbString()).css("color", f)
                } else Zt.css("background-color", ee).css("color", te)
            }
            W.showPalette && x(), k()
        }

        function N() {
            var t = ut, e = ht;
            if (Jt && Qt) Ot.hide(), Ht.hide(), Rt.hide(); else {
                Ot.show(), Ht.show(), Rt.show();
                var r = t * rt, a = at - e * at;
                r = Math.max(-nt, Math.min(rt - nt, r - nt)), a = Math.max(-nt, Math.min(at - nt, a - nt)), Rt.css({
                    top: a + "px",
                    left: r + "px"
                });
                var n = dt * it;
                Ot.css({left: n - lt / 2 + "px"});
                var o = ft * ot;
                Ht.css({top: o - ct + "px"})
            }
        }

        function D(t) {
            var e = j(), r = "", a = !tinycolor.equals(e, Xt);
            e && (r = e.toString(Yt), w(e)), t && a && (U.change(e), wt = !0, kt.trigger("change", [e]))
        }

        function I() {
            tt && (rt = At.width(), at = At.height(), nt = Rt.height(), st = Mt.width(), ot = Mt.height(), ct = Ht.height(), it = Tt.width(), lt = Ot.width(), Y || (Ct.css("position", "absolute"), W.offset ? Ct.offset(W.offset) : Ct.offset(s(Ct, Vt))), N(), W.showPalette && x(), kt.trigger("reflow.spectrum"))
        }

        function L() {
            kt.show().removeClass("spectrum with-add-on sp-colorize"), Vt.off("click.spectrum touchstart.spectrum"), Ct.remove(), Kt.remove(), Zt && Zt.css("background-color", ee).css("color", te);
            var t = kt.closest(".sp-original-input-container");
            t.length > 0 && t.after(kt).remove(), p[ne.id] = null
        }

        function B(r, a) {
            return r === e ? t.extend({}, W) : a === e ? W[r] : (W[r] = a, "preferredFormat" === r && (Yt = W.preferredFormat), void c())
        }

        function K() {
            St = !1, kt.attr("disabled", !1), Vt.removeClass("sp-disabled")
        }

        function V() {
            F(), St = !0, kt.attr("disabled", !0), Vt.addClass("sp-disabled")
        }

        function $(t) {
            W.offset = t, I()
        }

        var W = n(i, o), X = W.type, Y = "flat" == X, G = W.showSelectionPalette, Q = W.localStorageKey, J = W.theme,
            U = W.callbacks, Z = u(I, 10), tt = !1, et = !1, rt = 0, at = 0, nt = 0, ot = 0, st = 0, it = 0, lt = 0,
            ct = 0, ft = 0, ut = 0, ht = 0, dt = 1, pt = [], gt = [], bt = {}, vt = W.selectionPalette.slice(0),
            mt = W.maxSelectionSize, yt = "sp-dragging", wt = !1, _t = null, xt = o.ownerDocument, kt = (xt.body, t(o)),
            St = !1, Ct = t(m, xt).addClass(J), Pt = Ct.find(".sp-picker-container"), At = Ct.find(".sp-color"),
            Rt = Ct.find(".sp-dragger"), Mt = Ct.find(".sp-hue"), Ht = Ct.find(".sp-slider"),
            Ft = Ct.find(".sp-alpha-inner"), Tt = Ct.find(".sp-alpha"), Ot = Ct.find(".sp-alpha-handle"),
            jt = Ct.find(".sp-input"), Et = Ct.find(".sp-palette"), qt = Ct.find(".sp-initial"),
            zt = Ct.find(".sp-cancel"), Nt = Ct.find(".sp-clear"), Dt = Ct.find(".sp-choose"),
            It = Ct.find(".sp-palette-toggle"), Lt = kt.is("input"),
            Bt = (Lt && "color" === kt.attr("type") && h(), Lt && "color" == X),
            Kt = Bt ? t(v).addClass(J).addClass(W.className).addClass(W.replacerClassName) : t([]), Vt = Bt ? Kt : kt,
            $t = Kt.find(".sp-preview-inner"), Wt = W.color || Lt && kt.val(), Xt = !1, Yt = W.preferredFormat,
            Gt = !W.showButtons || W.clickoutFiresChange, Qt = !Wt, Jt = W.allowEmpty, Ut = null, Zt = null, te = null,
            ee = null, re = kt.attr("id");
        if (re !== e && re.length > 0) {
            var ae = t('label[for="' + re + '"]');
            ae.length && ae.on("click", function (t) {
                return t.preventDefault(), kt.spectrum("show"), !1
            })
        }
        d();
        var ne = {
            show: R,
            hide: F,
            toggle: A,
            reflow: I,
            option: B,
            enable: K,
            disable: V,
            offset: $,
            set: function (t) {
                O(t), D()
            },
            get: j,
            destroy: L,
            container: Ct
        };
        return ne.id = p.push(ne) - 1, ne
    }

    function s(e, r) {
        var a = 0, n = e.outerWidth(), o = e.outerHeight(), s = r.outerHeight(), i = e[0].ownerDocument,
            l = i.documentElement, c = l.clientWidth + t(i).scrollLeft(), f = l.clientHeight + t(i).scrollTop(),
            u = r.offset(), h = u.left, d = u.top;
        return d += s, h -= Math.min(h, h + n > c && c > n ? Math.abs(h + n - c) : 0), d -= Math.min(d, d + o > f && f > o ? Math.abs(o + s - a) : a), {
            top: d,
            bottom: u.bottom,
            left: h,
            right: u.right,
            width: u.width,
            height: u.height
        }
    }

    function i() {
    }

    function l(t) {
        t.stopPropagation()
    }

    function c(t, e) {
        var r = Array.prototype.slice, a = r.call(arguments, 2);
        return function () {
            return t.apply(e, a.concat(r.call(arguments)))
        }
    }

    function f(e, r, a, n) {
        function o(t) {
            t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.returnValue = !1
        }

        function s(t) {
            if (f) {
                if (g && c.documentMode < 9 && !t.button) return l();
                var a = t.originalEvent && t.originalEvent.touches && t.originalEvent.touches[0],
                    n = a && a.pageX || t.pageX, s = a && a.pageY || t.pageY, i = Math.max(0, Math.min(n - u.left, d)),
                    b = Math.max(0, Math.min(s - u.top, h));
                p && o(t), r.apply(e, [i, b, t])
            }
        }

        function i(r) {
            var n = r.which ? 3 == r.which : 2 == r.button;
            n || f || a.apply(e, arguments) !== !1 && (f = !0, h = t(e).height(), d = t(e).width(), u = t(e).offset(), t(c).on(b), t(c.body).addClass("sp-dragging"), s(r), o(r))
        }

        function l() {
            f && (t(c).off(b), t(c.body).removeClass("sp-dragging"), setTimeout(function () {
                n.apply(e, arguments)
            }, 0)), f = !1
        }

        r = r || function () {
        }, a = a || function () {
        }, n = n || function () {
        };
        var c = document, f = !1, u = {}, h = 0, d = 0, p = "ontouchstart" in window, b = {};
        b.selectstart = o, b.dragstart = o, b["touchmove mousemove"] = s, b["touchend mouseup"] = l, t(e).on("touchstart mousedown", i)
    }

    function u(t, e, r) {
        var a;
        return function () {
            var n = this, o = arguments, s = function () {
                a = null, t.apply(n, o)
            };
            r && clearTimeout(a), (r || !a) && (a = setTimeout(s, e))
        }
    }

    function h() {
        return t.fn.spectrum.inputTypeColorSupport()
    }

    var d = {
            beforeShow: i,
            move: i,
            change: i,
            show: i,
            hide: i,
            color: !1,
            flat: !1,
            type: "",
            showInput: !1,
            allowEmpty: !0,
            showButtons: !0,
            clickoutFiresChange: !0,
            showInitial: !1,
            showPalette: !0,
            showPaletteOnly: !1,
            hideAfterPaletteSelect: !1,
            togglePaletteOnly: !1,
            showSelectionPalette: !0,
            localStorageKey: !1,
            appendTo: "body",
            maxSelectionSize: 8,
            locale: "en",
            cancelText: "Отмена",
            chooseText: "Выбрать",
            togglePaletteMoreText: "more",
            togglePaletteLessText: "less",
            clearText: "Clear Color Selection",
            noColorSelectedText: "No Color Selected",
            preferredFormat: "name",
            className: "",
            containerClassName: "",
            replacerClassName: "",
            showAlpha: !0,
            theme: "sp-light",
            palette: [["#000000", "#444444", "#5b5b5b", "#999999", "#bcbcbc", "#eeeeee", "#f3f6f4", "#ffffff"], ["#f44336", "#744700", "#ce7e00", "#8fce00", "#2986cc", "#16537e", "#6a329f", "#c90076"], ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"], ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"], ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"], ["#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"], ["#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"], ["#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]],
            selectionPalette: [],
            disabled: !1,
            offset: null
        }, p = [], g = !!/msie/i.exec(window.navigator.userAgent), b = function () {
            function t(t, e) {
                return !!~("" + t).indexOf(e)
            }

            var e = document.createElement("div"), r = e.style;
            return r.cssText = "background-color:rgba(0,0,0,.5)", t(r.backgroundColor, "rgba") || t(r.backgroundColor, "hsla")
        }(),
        v = ["<div class='sp-replacer'>", "<div class='sp-preview'><div class='sp-preview-inner'></div></div>", "<div class='sp-dd'>&#9660;</div>", "</div>"].join(""),
        m = function () {
            var t = "";
            if (g) for (var e = 1; 6 >= e; e++) t += "<div class='sp-" + e + "'></div>";
            return ["<div class='sp-container sp-hidden'>", "<div class='sp-palette-container'>", "<div class='sp-palette sp-thumb sp-cf'></div>", "<div class='sp-palette-button-container sp-cf'>", "<button type='button' class='sp-palette-toggle'></button>", "</div>", "</div>", "<div class='sp-picker-container'>", "<div class='sp-top sp-cf'>", "<div class='sp-fill'></div>", "<div class='sp-top-inner'>", "<div class='sp-color'>", "<div class='sp-sat'>", "<div class='sp-val'>", "<div class='sp-dragger'></div>", "</div>", "</div>", "</div>", "<div class='sp-clear sp-clear-display'>", "</div>", "<div class='sp-hue'>", "<div class='sp-slider'></div>", t, "</div>", "</div>", "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>", "</div>", "<div class='sp-input-container sp-cf'>", "<input class='sp-input' type='text' spellcheck='false'  />", "</div>", "<div class='sp-initial sp-thumb sp-cf'></div>", "<div class='sp-button-container sp-cf'>", "<button class='sp-cancel' href='#'></button>", "<button type='button' class='sp-choose'></button>", "</div>", "</div>", "</div>"].join("")
        }(), y = "spectrum.id";
    t.fn.spectrum = function (e, r) {
        if ("string" == typeof e) {
            var a = this, n = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                var r = p[t(this).data(y)];
                if (r) {
                    var o = r[e];
                    if (!o) throw new Error("Spectrum: no such method: '" + e + "'");
                    "get" == e ? a = r.get() : "container" == e ? a = r.container : "option" == e ? a = r.option.apply(r, n) : "destroy" == e ? (r.destroy(), t(this).removeData(y)) : o.apply(r, n)
                }
            }), a
        }
        return this.spectrum("destroy").each(function () {
            var r = t.extend({}, t(this).data(), e);
            t(this).is("input") ? r.flat || "flat" == r.type ? r.type = "flat" : "color" == t(this).attr("type") ? r.type = "color" : r.type = r.type || "component" : r.type = "noInput";
            var a = o(this, r);
            t(this).data(y, a.id)
        })
    }, t.fn.spectrum.load = !0, t.fn.spectrum.loadOpts = {}, t.fn.spectrum.draggable = f, t.fn.spectrum.defaults = d, t.fn.spectrum.inputTypeColorSupport = function w() {
        if ("undefined" == typeof w._cachedResult) {
            var e = t("<input type='color'/>")[0];
            w._cachedResult = "color" === e.type && "" !== e.value
        }
        return w._cachedResult
    }, t.spectrum = {}, t.spectrum.localization = {}, t.spectrum.palettes = {}, t.fn.spectrum.processNativeColorInputs = function () {
        var e = t("input[type=color]");
        e.length && !h() && e.spectrum({preferredFormat: "hex6"})
    }, function () {
        function t(t) {
            var r = {r: 0, g: 0, b: 0}, n = 1, s = !1, i = !1;
            return "string" == typeof t && (t = T(t)), "object" == typeof t && (t.hasOwnProperty("r") && t.hasOwnProperty("g") && t.hasOwnProperty("b") ? (r = e(t.r, t.g, t.b), s = !0, i = "%" === String(t.r).substr(-1) ? "prgb" : "rgb") : t.hasOwnProperty("h") && t.hasOwnProperty("s") && t.hasOwnProperty("v") ? (t.s = M(t.s), t.v = M(t.v), r = o(t.h, t.s, t.v), s = !0, i = "hsv") : t.hasOwnProperty("h") && t.hasOwnProperty("s") && t.hasOwnProperty("l") && (t.s = M(t.s), t.l = M(t.l), r = a(t.h, t.s, t.l), s = !0, i = "hsl"), t.hasOwnProperty("a") && (n = t.a)), n = x(n), {
                ok: s,
                format: t.format || i,
                r: N(255, D(r.r, 0)),
                g: N(255, D(r.g, 0)),
                b: N(255, D(r.b, 0)),
                a: n
            }
        }

        function e(t, e, r) {
            return {r: 255 * k(t, 255), g: 255 * k(e, 255), b: 255 * k(r, 255)}
        }

        function r(t, e, r) {
            t = k(t, 255), e = k(e, 255), r = k(r, 255);
            var a, n, o = D(t, e, r), s = N(t, e, r), i = (o + s) / 2;
            if (o == s) a = n = 0; else {
                var l = o - s;
                switch (n = i > .5 ? l / (2 - o - s) : l / (o + s), o) {
                    case t:
                        a = (e - r) / l + (r > e ? 6 : 0);
                        break;
                    case e:
                        a = (r - t) / l + 2;
                        break;
                    case r:
                        a = (t - e) / l + 4
                }
                a /= 6
            }
            return {h: a, s: n, l: i}
        }

        function a(t, e, r) {
            function a(t, e, r) {
                return 0 > r && (r += 1), r > 1 && (r -= 1), 1 / 6 > r ? t + 6 * (e - t) * r : .5 > r ? e : 2 / 3 > r ? t + (e - t) * (2 / 3 - r) * 6 : t
            }

            var n, o, s;
            if (t = k(t, 360), e = k(e, 100), r = k(r, 100), 0 === e) n = o = s = r; else {
                var i = .5 > r ? r * (1 + e) : r + e - r * e, l = 2 * r - i;
                n = a(l, i, t + 1 / 3), o = a(l, i, t), s = a(l, i, t - 1 / 3)
            }
            return {r: 255 * n, g: 255 * o, b: 255 * s}
        }

        function n(t, e, r) {
            t = k(t, 255), e = k(e, 255), r = k(r, 255);
            var a, n, o = D(t, e, r), s = N(t, e, r), i = o, l = o - s;
            if (n = 0 === o ? 0 : l / o, o == s) a = 0; else {
                switch (o) {
                    case t:
                        a = (e - r) / l + (r > e ? 6 : 0);
                        break;
                    case e:
                        a = (r - t) / l + 2;
                        break;
                    case r:
                        a = (t - e) / l + 4
                }
                a /= 6
            }
            return {h: a, s: n, v: i}
        }

        function o(t, e, r) {
            t = 6 * k(t, 360), e = k(e, 100), r = k(r, 100);
            var a = q.floor(t), n = t - a, o = r * (1 - e), s = r * (1 - n * e), i = r * (1 - (1 - n) * e), l = a % 6,
                c = [r, s, o, o, i, r][l], f = [i, r, r, s, o, o][l], u = [o, o, i, r, r, s][l];
            return {r: 255 * c, g: 255 * f, b: 255 * u}
        }

        function s(t, e, r, a) {
            var n = [R(z(t).toString(16)), R(z(e).toString(16)), R(z(r).toString(16))];
            return a && n[0].charAt(0) == n[0].charAt(1) && n[1].charAt(0) == n[1].charAt(1) && n[2].charAt(0) == n[2].charAt(1) ? n[0].charAt(0) + n[1].charAt(0) + n[2].charAt(0) : n.join("")
        }

        function i(t, e, r, a) {
            var n = [R(H(a)), R(z(t).toString(16)), R(z(e).toString(16)), R(z(r).toString(16))];
            return n.join("")
        }

        function l(t, e) {
            e = 0 === e ? 0 : e || 10;
            var r = L(t).toHsl();
            return r.s -= e / 100, r.s = S(r.s), L(r)
        }

        function c(t, e) {
            e = 0 === e ? 0 : e || 10;
            var r = L(t).toHsl();
            return r.s += e / 100, r.s = S(r.s), L(r)
        }

        function f(t) {
            return L(t).desaturate(100)
        }

        function u(t, e) {
            e = 0 === e ? 0 : e || 10;
            var r = L(t).toHsl();
            return r.l += e / 100, r.l = S(r.l), L(r)
        }

        function h(t, e) {
            e = 0 === e ? 0 : e || 10;
            var r = L(t).toRgb();
            return r.r = D(0, N(255, r.r - z(255 * -(e / 100)))), r.g = D(0, N(255, r.g - z(255 * -(e / 100)))), r.b = D(0, N(255, r.b - z(255 * -(e / 100)))), L(r)
        }

        function d(t, e) {
            e = 0 === e ? 0 : e || 10;
            var r = L(t).toHsl();
            return r.l -= e / 100, r.l = S(r.l), L(r)
        }

        function p(t, e) {
            var r = L(t).toHsl(), a = (z(r.h) + e) % 360;
            return r.h = 0 > a ? 360 + a : a, L(r)
        }

        function g(t) {
            var e = L(t).toHsl();
            return e.h = (e.h + 180) % 360, L(e)
        }

        function b(t) {
            var e = L(t).toHsl(), r = e.h;
            return [L(t), L({h: (r + 120) % 360, s: e.s, l: e.l}), L({h: (r + 240) % 360, s: e.s, l: e.l})]
        }

        function v(t) {
            var e = L(t).toHsl(), r = e.h;
            return [L(t), L({h: (r + 90) % 360, s: e.s, l: e.l}), L({
                h: (r + 180) % 360,
                s: e.s,
                l: e.l
            }), L({h: (r + 270) % 360, s: e.s, l: e.l})]
        }

        function m(t) {
            var e = L(t).toHsl(), r = e.h;
            return [L(t), L({h: (r + 72) % 360, s: e.s, l: e.l}), L({h: (r + 216) % 360, s: e.s, l: e.l})]
        }

        function y(t, e, r) {
            e = e || 6, r = r || 30;
            var a = L(t).toHsl(), n = 360 / r, o = [L(t)];
            for (a.h = (a.h - (n * e >> 1) + 720) % 360; --e;) a.h = (a.h + n) % 360, o.push(L(a));
            return o
        }

        function w(t, e) {
            e = e || 6;
            for (var r = L(t).toHsv(), a = r.h, n = r.s, o = r.v, s = [], i = 1 / e; e--;) s.push(L({
                h: a,
                s: n,
                v: o
            })), o = (o + i) % 1;
            return s
        }

        function _(t) {
            var e = {};
            for (var r in t) t.hasOwnProperty(r) && (e[t[r]] = r);
            return e
        }

        function x(t) {
            return t = parseFloat(t), (isNaN(t) || 0 > t || t > 1) && (t = 1), t
        }

        function k(t, e) {
            P(t) && (t = "100%");
            var r = A(t);
            return t = N(e, D(0, parseFloat(t))), r && (t = parseInt(t * e, 10) / 100), q.abs(t - e) < 1e-6 ? 1 : t % e / parseFloat(e)
        }

        function S(t) {
            return N(1, D(0, t))
        }

        function C(t) {
            return parseInt(t, 16)
        }

        function P(t) {
            return "string" == typeof t && -1 != t.indexOf(".") && 1 === parseFloat(t)
        }

        function A(t) {
            return "string" == typeof t && -1 != t.indexOf("%")
        }

        function R(t) {
            return 1 == t.length ? "0" + t : "" + t
        }

        function M(t) {
            return 1 >= t && (t = 100 * t + "%"), t
        }

        function H(t) {
            return Math.round(255 * parseFloat(t)).toString(16)
        }

        function F(t) {
            return C(t) / 255
        }

        function T(t) {
            t = t.replace(O, "").replace(j, "").toLowerCase();
            var e = !1;
            if (B[t]) t = B[t], e = !0; else if ("transparent" == t) return {r: 0, g: 0, b: 0, a: 0, format: "name"};
            var r;
            return (r = V.rgb.exec(t)) ? {r: r[1], g: r[2], b: r[3]} : (r = V.rgba.exec(t)) ? {
                r: r[1],
                g: r[2],
                b: r[3],
                a: r[4]
            } : (r = V.hsl.exec(t)) ? {h: r[1], s: r[2], l: r[3]} : (r = V.hsla.exec(t)) ? {
                h: r[1],
                s: r[2],
                l: r[3],
                a: r[4]
            } : (r = V.hsv.exec(t)) ? {h: r[1], s: r[2], v: r[3]} : (r = V.hsva.exec(t)) ? {
                h: r[1],
                s: r[2],
                v: r[3],
                a: r[4]
            } : (r = V.hex8.exec(t)) ? {
                a: F(r[1]),
                r: C(r[2]),
                g: C(r[3]),
                b: C(r[4]),
                format: e ? "name" : "hex8"
            } : (r = V.hex6.exec(t)) ? {
                r: C(r[1]),
                g: C(r[2]),
                b: C(r[3]),
                format: e ? "name" : "hex"
            } : (r = V.hex3.exec(t)) ? {
                r: C(r[1] + "" + r[1]),
                g: C(r[2] + "" + r[2]),
                b: C(r[3] + "" + r[3]),
                format: e ? "name" : "hex"
            } : !1
        }

        var O = /^[\s,#]+/, j = /\s+$/, E = 0, q = Math, z = q.round, N = q.min, D = q.max, I = q.random,
            L = function (e, r) {
                if (e = e ? e : "", r = r || {}, e instanceof L) return e;
                if (!(this instanceof L)) return new L(e, r);
                var a = t(e);
                this._originalInput = e, this._r = a.r, this._g = a.g, this._b = a.b, this._a = a.a, this._roundA = z(1e3 * this._a) / 1e3, this._format = r.format || a.format, this._gradientType = r.gradientType, this._r < 1 && (this._r = z(this._r)), this._g < 1 && (this._g = z(this._g)), this._b < 1 && (this._b = z(this._b)), this._ok = a.ok, this._tc_id = E++
            };
        L.prototype = {
            isDark: function () {
                return this.getBrightness() < 128
            }, isLight: function () {
                return !this.isDark()
            }, isValid: function () {
                return this._ok
            }, getOriginalInput: function () {
                return this._originalInput
            }, getFormat: function () {
                return this._format
            }, getAlpha: function () {
                return this._a
            }, getBrightness: function () {
                var t = this.toRgb();
                return (299 * t.r + 587 * t.g + 114 * t.b) / 1e3
            }, setAlpha: function (t) {
                return this._a = x(t), this._roundA = z(1e3 * this._a) / 1e3, this
            }, toHsv: function () {
                var t = n(this._r, this._g, this._b);
                return {h: 360 * t.h, s: t.s, v: t.v, a: this._a}
            }, toHsvString: function () {
                var t = n(this._r, this._g, this._b), e = z(360 * t.h), r = z(100 * t.s), a = z(100 * t.v);
                return 1 == this._a ? "hsv(" + e + ", " + r + "%, " + a + "%)" : "hsva(" + e + ", " + r + "%, " + a + "%, " + this._roundA + ")"
            }, toHsl: function () {
                var t = r(this._r, this._g, this._b);
                return {h: 360 * t.h, s: t.s, l: t.l, a: this._a}
            }, toHslString: function () {
                var t = r(this._r, this._g, this._b), e = z(360 * t.h), a = z(100 * t.s), n = z(100 * t.l);
                return 1 == this._a ? "hsl(" + e + ", " + a + "%, " + n + "%)" : "hsla(" + e + ", " + a + "%, " + n + "%, " + this._roundA + ")"
            }, toHex: function (t) {
                return s(this._r, this._g, this._b, t)
            }, toHexString: function (t) {
                return "#" + this.toHex(t)
            }, toHex8: function () {
                return i(this._r, this._g, this._b, this._a)
            }, toHex8String: function () {
                return "#" + this.toHex8()
            }, toRgb: function () {
                return {r: z(this._r), g: z(this._g), b: z(this._b), a: this._a}
            }, toRgbString: function () {
                return 1 == this._a ? "rgb(" + z(this._r) + ", " + z(this._g) + ", " + z(this._b) + ")" : "rgba(" + z(this._r) + ", " + z(this._g) + ", " + z(this._b) + ", " + this._roundA + ")"
            }, toPercentageRgb: function () {
                return {
                    r: z(100 * k(this._r, 255)) + "%",
                    g: z(100 * k(this._g, 255)) + "%",
                    b: z(100 * k(this._b, 255)) + "%",
                    a: this._a
                }
            }, toPercentageRgbString: function () {
                return 1 == this._a ? "rgb(" + z(100 * k(this._r, 255)) + "%, " + z(100 * k(this._g, 255)) + "%, " + z(100 * k(this._b, 255)) + "%)" : "rgba(" + z(100 * k(this._r, 255)) + "%, " + z(100 * k(this._g, 255)) + "%, " + z(100 * k(this._b, 255)) + "%, " + this._roundA + ")"
            }, toName: function () {
                return 0 === this._a ? "transparent" : this._a < 1 ? !1 : K[s(this._r, this._g, this._b, !0)] || !1
            }, toFilter: function (t) {
                var e = "#" + i(this._r, this._g, this._b, this._a), r = e,
                    a = this._gradientType ? "GradientType = 1, " : "";
                if (t) {
                    var n = L(t);
                    r = n.toHex8String()
                }
                return "progid:DXImageTransform.Microsoft.gradient(" + a + "startColorstr=" + e + ",endColorstr=" + r + ")"
            }, toString: function (t) {
                var e = !!t;
                t = t || this._format;
                var r = !1, a = this._a < 1 && this._a >= 0,
                    n = !e && a && ("hex" === t || "hex6" === t || "hex3" === t || "name" === t);
                return n ? "name" === t && 0 === this._a ? this.toName() : this.toRgbString() : ("rgb" === t && (r = this.toRgbString()), "prgb" === t && (r = this.toPercentageRgbString()), ("hex" === t || "hex6" === t) && (r = this.toHexString()), "hex3" === t && (r = this.toHexString(!0)), "hex8" === t && (r = this.toHex8String()), "name" === t && (r = this.toName()), "hsl" === t && (r = this.toHslString()), "hsv" === t && (r = this.toHsvString()), r || this.toHexString())
            }, _applyModification: function (t, e) {
                var r = t.apply(null, [this].concat([].slice.call(e)));
                return this._r = r._r, this._g = r._g, this._b = r._b, this.setAlpha(r._a), this
            }, lighten: function () {
                return this._applyModification(u, arguments)
            }, brighten: function () {
                return this._applyModification(h, arguments)
            }, darken: function () {
                return this._applyModification(d, arguments)
            }, desaturate: function () {
                return this._applyModification(l, arguments)
            }, saturate: function () {
                return this._applyModification(c, arguments)
            }, greyscale: function () {
                return this._applyModification(f, arguments)
            }, spin: function () {
                return this._applyModification(p, arguments)
            }, _applyCombination: function (t, e) {
                return t.apply(null, [this].concat([].slice.call(e)))
            }, analogous: function () {
                return this._applyCombination(y, arguments)
            }, complement: function () {
                return this._applyCombination(g, arguments)
            }, monochromatic: function () {
                return this._applyCombination(w, arguments)
            }, splitcomplement: function () {
                return this._applyCombination(m, arguments)
            }, triad: function () {
                return this._applyCombination(b, arguments)
            }, tetrad: function () {
                return this._applyCombination(v, arguments)
            }
        }, L.fromRatio = function (t, e) {
            if ("object" == typeof t) {
                var r = {};
                for (var a in t) t.hasOwnProperty(a) && ("a" === a ? r[a] = t[a] : r[a] = M(t[a]));
                t = r
            }
            return L(t, e)
        }, L.equals = function (t, e) {
            return t && e ? L(t).toRgbString() == L(e).toRgbString() : !1
        }, L.random = function () {
            return L.fromRatio({r: I(), g: I(), b: I()})
        }, L.mix = function (t, e, r) {
            r = 0 === r ? 0 : r || 50;
            var a, n = L(t).toRgb(), o = L(e).toRgb(), s = r / 100, i = 2 * s - 1, l = o.a - n.a;
            a = i * l == -1 ? i : (i + l) / (1 + i * l), a = (a + 1) / 2;
            var c = 1 - a,
                f = {r: o.r * a + n.r * c, g: o.g * a + n.g * c, b: o.b * a + n.b * c, a: o.a * s + n.a * (1 - s)};
            return L(f)
        }, L.readability = function (t, e) {
            var r = L(t), a = L(e), n = r.toRgb(), o = a.toRgb(), s = r.getBrightness(), i = a.getBrightness(),
                l = Math.max(n.r, o.r) - Math.min(n.r, o.r) + Math.max(n.g, o.g) - Math.min(n.g, o.g) + Math.max(n.b, o.b) - Math.min(n.b, o.b);
            return {brightness: Math.abs(s - i), color: l}
        }, L.isReadable = function (t, e) {
            var r = L.readability(t, e);
            return r.brightness > 125 && r.color > 500
        }, L.mostReadable = function (t, e) {
            for (var r = null, a = 0, n = !1, o = 0; o < e.length; o++) {
                var s = L.readability(t, e[o]), i = s.brightness > 125 && s.color > 500,
                    l = 3 * (s.brightness / 125) + s.color / 500;
                (i && !n || i && n && l > a || !i && !n && l > a) && (n = i, a = l, r = L(e[o]))
            }
            return r
        };
        var B = L.names = {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "0ff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000",
            blanchedalmond: "ffebcd",
            blue: "00f",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            burntsienna: "ea7e5d",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "0ff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgreen: "006400",
            darkgrey: "a9a9a9",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkslategrey: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dimgrey: "696969",
            dodgerblue: "1e90ff",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "f0f",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            green: "008000",
            greenyellow: "adff2f",
            grey: "808080",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgray: "d3d3d3",
            lightgreen: "90ee90",
            lightgrey: "d3d3d3",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslategray: "789",
            lightslategrey: "789",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "0f0",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "f0f",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370db",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "db7093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            rebeccapurple: "663399",
            red: "f00",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            slategrey: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            wheat: "f5deb3",
            white: "fff",
            whitesmoke: "f5f5f5",
            yellow: "ff0",
            yellowgreen: "9acd32"
        }, K = L.hexNames = _(B), V = function () {
            var t = "[-\\+]?\\d+%?", e = "[-\\+]?\\d*\\.\\d+%?", r = "(?:" + e + ")|(?:" + t + ")",
                a = "[\\s|\\(]+(" + r + ")[,|\\s]+(" + r + ")[,|\\s]+(" + r + ")\\s*\\)?",
                n = "[\\s|\\(]+(" + r + ")[,|\\s]+(" + r + ")[,|\\s]+(" + r + ")[,|\\s]+(" + r + ")\\s*\\)?";
            return {
                rgb: new RegExp("rgb" + a),
                rgba: new RegExp("rgba" + n),
                hsl: new RegExp("hsl" + a),
                hsla: new RegExp("hsla" + n),
                hsv: new RegExp("hsv" + a),
                hsva: new RegExp("hsva" + n),
                hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
            }
        }();
        window.tinycolor = L
    }(), t(function () {
        t.fn.spectrum.load && t.fn.spectrum.processNativeColorInputs()
    })
});
