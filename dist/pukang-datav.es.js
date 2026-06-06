import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, nextTick as c, normalizeClass as l, normalizeStyle as u, onBeforeUnmount as d, onMounted as f, openBlock as p, ref as m, renderList as h, renderSlot as g, resolveDynamicComponent as _, toDisplayString as v, watch as y, withCtx as b } from "vue";
import * as x from "echarts";
//#region \0plugin-vue:export-helper
var S = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, C = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvChart" }, {
	__name: "index",
	props: {
		option: {
			type: Object,
			default: () => ({})
		},
		height: {
			type: [Number, String],
			default: 320
		},
		width: {
			type: [Number, String],
			default: "100%"
		},
		theme: {
			type: [String, Object],
			default: ""
		},
		renderer: {
			type: String,
			default: "canvas",
			validator: (e) => ["canvas", "svg"].includes(e)
		},
		notMerge: {
			type: Boolean,
			default: !1
		},
		lazyUpdate: {
			type: Boolean,
			default: !1
		},
		loading: {
			type: Boolean,
			default: !1
		},
		autoResize: {
			type: Boolean,
			default: !0
		}
	},
	setup(e, { expose: n }) {
		let r = e, o = m(), s, l, h = (e) => typeof e == "number" ? `${e}px` : e, g = t(() => ({
			width: h(r.width),
			height: h(r.height)
		})), _ = () => {
			s && (s.setOption(r.option, r.notMerge, r.lazyUpdate), r.loading ? s.showLoading("default", {
				color: "#18d7ff",
				textColor: "#eaf7ff",
				maskColor: "rgba(7, 24, 45, 0.36)"
			}) : s.hideLoading());
		}, v = () => {
			s?.resize();
		}, b = async () => {
			await c(), !(!o.value || s) && (s = x.init(o.value, r.theme || void 0, { renderer: r.renderer }), _(), r.autoResize && window.ResizeObserver && (l = new ResizeObserver(() => v()), l.observe(o.value)));
		};
		return y(() => r.option, () => _(), { deep: !0 }), y(() => r.loading, () => _()), f(() => {
			b();
		}), d(() => {
			l?.disconnect(), s?.dispose(), s = void 0;
		}), n({
			getChart: () => s,
			resize: v,
			setOption: _
		}), (e, t) => (p(), i("div", {
			class: "pk-dv-chart",
			style: u(g.value)
		}, [a("div", {
			ref_key: "chartRef",
			ref: o,
			class: "pk-dv-chart__canvas"
		}, null, 512)], 4));
	}
}), [["__scopeId", "data-v-fd449bbd"]]), w = (e) => Object.prototype.toString.call(e) === "[object Object]", T = (e, t) => Array.isArray(e) && Array.isArray(t) ? e.map((e, n) => {
	let r = t[n];
	return r === void 0 ? e : T(e, r);
}).concat(t.slice(e.length)) : w(e) && w(t) ? Object.keys(t).reduce((e, n) => ({
	...e,
	[n]: T(e[n], t[n])
}), { ...e }) : t === void 0 ? e : t, E = /*@__PURE__*/ Object.assign({ name: "PkDvBarChart" }, {
	__name: "index",
	props: {
		data: {
			type: Array,
			default: () => []
		},
		xField: {
			type: String,
			default: "name"
		},
		yField: {
			type: String,
			default: "value"
		},
		height: {
			type: [Number, String],
			default: 320
		},
		horizontal: {
			type: Boolean,
			default: !1
		},
		color: {
			type: String,
			default: "#18d7ff"
		},
		option: {
			type: Object,
			default: () => ({})
		}
	},
	setup(e) {
		let r = e, i = t(() => r.data.map((e) => e[r.xField])), a = t(() => r.data.map((e) => e[r.yField])), o = t(() => ({
			type: "category",
			data: i.value,
			axisLine: { lineStyle: { color: "rgba(234, 247, 255, 0.26)" } },
			axisLabel: { color: "rgba(234, 247, 255, 0.68)" },
			axisTick: { show: !1 }
		})), s = {
			type: "value",
			splitLine: { lineStyle: { color: "rgba(234, 247, 255, 0.08)" } },
			axisLabel: { color: "rgba(234, 247, 255, 0.68)" }
		}, c = t(() => T({
			color: [r.color],
			grid: {
				top: 24,
				right: 18,
				bottom: r.horizontal ? 18 : 30,
				left: r.horizontal ? 72 : 42
			},
			tooltip: {
				trigger: "axis",
				backgroundColor: "rgba(7, 24, 45, 0.92)",
				borderColor: "rgba(24, 215, 255, 0.28)",
				textStyle: { color: "#eaf7ff" }
			},
			xAxis: r.horizontal ? s : o.value,
			yAxis: r.horizontal ? o.value : s,
			series: [{
				type: "bar",
				data: a.value,
				barWidth: r.horizontal ? 12 : 18,
				itemStyle: {
					borderRadius: r.horizontal ? [
						0,
						8,
						8,
						0
					] : [
						8,
						8,
						0,
						0
					],
					color: {
						type: "linear",
						x: 0,
						y: 0,
						x2: +!!r.horizontal,
						y2: +!r.horizontal,
						colorStops: [{
							offset: 0,
							color: r.color
						}, {
							offset: 1,
							color: "rgba(72, 240, 182, 0.45)"
						}]
					}
				}
			}]
		}, r.option));
		return (t, r) => (p(), n(C, {
			option: c.value,
			height: e.height
		}, null, 8, ["option", "height"]));
	}
}), ee = {
	key: 0,
	class: "pk-dv-border-box__title"
}, D = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvBorderBox" }, {
	__name: "index",
	props: {
		title: {
			type: String,
			default: ""
		},
		variant: {
			type: String,
			default: "primary",
			validator: (e) => [
				"primary",
				"success",
				"warning"
			].includes(e)
		},
		padding: {
			type: String,
			default: "16px"
		},
		glow: {
			type: Boolean,
			default: !0
		},
		scan: {
			type: Boolean,
			default: !1
		},
		pulse: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		return (t, n) => (p(), i("section", { class: l(["pk-dv-border-box", [`pk-dv-border-box--${e.variant}`, {
			"pk-dv-border-box--glow": e.glow,
			"pk-dv-border-box--scan": e.scan,
			"pk-dv-border-box--pulse": e.pulse
		}]]) }, [
			n[1] ||= a("span", { class: "pk-dv-border-box__corner pk-dv-border-box__corner--tl" }, null, -1),
			n[2] ||= a("span", { class: "pk-dv-border-box__corner pk-dv-border-box__corner--tr" }, null, -1),
			n[3] ||= a("span", { class: "pk-dv-border-box__corner pk-dv-border-box__corner--bl" }, null, -1),
			n[4] ||= a("span", { class: "pk-dv-border-box__corner pk-dv-border-box__corner--br" }, null, -1),
			a("div", {
				class: "pk-dv-border-box__body",
				style: u({ padding: e.padding })
			}, [e.title || t.$slots.title ? (p(), i("div", ee, [n[0] ||= a("span", { class: "pk-dv-border-box__title-mark" }, null, -1), g(t.$slots, "title", {}, () => [o(v(e.title), 1)], !0)])) : r("", !0), g(t.$slots, "default", {}, void 0, !0)], 4)
		], 2));
	}
}), [["__scopeId", "data-v-f7cc845f"]]), O = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvCell" }, {
	__name: "index",
	props: {
		colSpan: {
			type: [Number, String],
			default: 1
		},
		rowSpan: {
			type: [Number, String],
			default: 1
		},
		minHeight: {
			type: [Number, String],
			default: ""
		}
	},
	setup(e) {
		let n = e, r = (e) => {
			if (!(e === "" || e == null)) return typeof e == "number" ? `${e}px` : e;
		}, a = t(() => ({
			gridColumn: `span ${Number(n.colSpan) || 1}`,
			gridRow: `span ${Number(n.rowSpan) || 1}`,
			minHeight: r(n.minHeight)
		}));
		return (e, t) => (p(), i("div", {
			class: "pk-dv-cell",
			style: u(a.value)
		}, [g(e.$slots, "default", {}, void 0, !0)], 4));
	}
}), [["__scopeId", "data-v-502cd283"]]), te = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvDecoration" }, {
	__name: "index",
	props: {
		type: {
			type: String,
			default: "line",
			validator: (e) => [
				"line",
				"bars",
				"corner",
				"divider"
			].includes(e)
		},
		reverse: {
			type: Boolean,
			default: !1
		},
		animated: {
			type: Boolean,
			default: !0
		}
	},
	setup(n) {
		let r = n, a = t(() => r.type === "bars" ? 5 : 1);
		return (t, r) => (p(), i("div", { class: l(["pk-dv-decoration", [`pk-dv-decoration--${n.type}`, {
			"pk-dv-decoration--reverse": n.reverse,
			"pk-dv-decoration--animated": n.animated
		}]]) }, [(p(!0), i(e, null, h(a.value, (e) => (p(), i("span", {
			key: e,
			class: "pk-dv-decoration__item"
		}))), 128))], 2));
	}
}), [["__scopeId", "data-v-ab670f40"]]), ne = { class: "pk-dv-digital-number" }, re = {
	key: 0,
	class: "pk-dv-digital-number__affix"
}, ie = { class: "pk-dv-digital-number__value" }, ae = {
	key: 1,
	class: "pk-dv-digital-number__affix"
}, k = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvDigitalNumber" }, {
	__name: "index",
	props: {
		value: {
			type: Number,
			default: 0
		},
		duration: {
			type: Number,
			default: 900
		},
		precision: {
			type: Number,
			default: 0
		},
		separator: {
			type: Boolean,
			default: !0
		},
		prefix: {
			type: String,
			default: ""
		},
		suffix: {
			type: String,
			default: ""
		}
	},
	setup(e) {
		let n = e, o = m(0), s = 0, c = (e) => {
			let t = Number(e).toFixed(n.precision);
			if (!n.separator) return t;
			let [r, i] = t.split("."), a = r.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return i ? `${a}.${i}` : a;
		}, l = t(() => c(o.value)), u = (e, t) => {
			cancelAnimationFrame(s);
			let r = performance.now(), i = e - t, a = (c) => {
				let l = Math.min((c - r) / n.duration, 1);
				o.value = t + i * (1 - (1 - l) ** 3), l < 1 ? s = requestAnimationFrame(a) : o.value = e;
			};
			s = requestAnimationFrame(a);
		};
		return y(() => n.value, (e, t) => {
			u(e, t ?? 0);
		}, { immediate: !0 }), d(() => {
			cancelAnimationFrame(s);
		}), (t, n) => (p(), i("span", ne, [
			e.prefix ? (p(), i("span", re, v(e.prefix), 1)) : r("", !0),
			a("span", ie, v(l.value), 1),
			e.suffix ? (p(), i("span", ae, v(e.suffix), 1)) : r("", !0)
		]));
	}
}), [["__scopeId", "data-v-a26a4d42"]]), A = /*@__PURE__*/ Object.assign({ name: "PkDvGaugeChart" }, {
	__name: "index",
	props: {
		value: {
			type: Number,
			default: 0
		},
		name: {
			type: String,
			default: ""
		},
		unit: {
			type: String,
			default: "%"
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
		height: {
			type: [Number, String],
			default: 320
		},
		option: {
			type: Object,
			default: () => ({})
		}
	},
	setup(e) {
		let r = e, i = t(() => T({ series: [{
			type: "gauge",
			min: r.min,
			max: r.max,
			startAngle: 210,
			endAngle: -30,
			progress: {
				show: !0,
				width: 12,
				itemStyle: { color: "#18d7ff" }
			},
			axisLine: { lineStyle: {
				width: 12,
				color: [[1, "rgba(234, 247, 255, 0.12)"]]
			} },
			axisTick: { show: !1 },
			splitLine: {
				length: 10,
				lineStyle: { color: "rgba(234, 247, 255, 0.32)" }
			},
			axisLabel: {
				color: "rgba(234, 247, 255, 0.58)",
				distance: 18
			},
			pointer: {
				width: 4,
				itemStyle: { color: "#18d7ff" }
			},
			anchor: {
				show: !0,
				size: 10,
				itemStyle: { color: "#18d7ff" }
			},
			detail: {
				valueAnimation: !0,
				formatter: `{value}${r.unit}`,
				color: "#18d7ff",
				fontSize: 28,
				offsetCenter: [0, "58%"]
			},
			title: {
				color: "rgba(234, 247, 255, 0.68)",
				fontSize: 13,
				offsetCenter: [0, "82%"]
			},
			data: [{
				value: r.value,
				name: r.name
			}]
		}] }, r.option));
		return (t, r) => (p(), n(C, {
			option: i.value,
			height: e.height
		}, null, 8, ["option", "height"]));
	}
}), oe = { class: "pk-dv-glow-title__main" }, se = {
	key: 0,
	class: "pk-dv-glow-title__accent"
}, ce = {
	key: 1,
	class: "pk-dv-glow-title__sub"
}, j = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvGlowTitle" }, {
	__name: "index",
	props: {
		title: {
			type: String,
			default: ""
		},
		subTitle: {
			type: String,
			default: ""
		},
		tag: {
			type: String,
			default: "h3"
		},
		variant: {
			type: String,
			default: "default",
			validator: (e) => ["default", "panel"].includes(e)
		},
		extraText: {
			type: String,
			default: ""
		},
		center: {
			type: Boolean,
			default: !1
		},
		accent: {
			type: Boolean,
			default: !0
		},
		animated: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["extra-click"],
	setup(e) {
		return (t, s) => (p(), i("div", { class: l(["pk-dv-glow-title", [`pk-dv-glow-title--${e.variant}`, {
			"pk-dv-glow-title--center": e.center,
			"pk-dv-glow-title--animated": e.animated
		}]]) }, [a("div", oe, [
			e.accent ? (p(), i("span", se)) : r("", !0),
			(p(), n(_(e.tag), { class: "pk-dv-glow-title__text" }, {
				default: b(() => [g(t.$slots, "default", {}, () => [o(v(e.title), 1)], !0)]),
				_: 3
			})),
			e.subTitle ? (p(), i("span", ce, v(e.subTitle), 1)) : r("", !0)
		]), e.variant === "panel" && (e.extraText || t.$slots.extra) ? (p(), i("button", {
			key: 0,
			type: "button",
			class: "pk-dv-glow-title__extra",
			onClick: s[0] ||= (e) => t.$emit("extra-click", e)
		}, [g(t.$slots, "extra", {}, () => [o(v(e.extraText), 1)], !0)])) : r("", !0)], 2));
	}
}), [["__scopeId", "data-v-6cb6fb86"]]), M = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvGradientPanel" }, {
	__name: "index",
	props: {
		tag: {
			type: String,
			default: "div"
		},
		direction: {
			type: String,
			default: "left-to-right",
			validator: (e) => [
				"left-to-right",
				"right-to-left",
				"both"
			].includes(e)
		},
		color: {
			type: String,
			default: "#1f3e7a"
		},
		height: {
			type: [Number, String],
			default: 42
		},
		width: {
			type: [Number, String],
			default: "100%"
		},
		padding: {
			type: String,
			default: "0"
		},
		radius: {
			type: [Number, String],
			default: 0
		},
		middleStop: {
			type: Number,
			default: 21
		},
		solidStop: {
			type: Number,
			default: 85
		},
		middleOpacity: {
			type: Number,
			default: .2
		},
		solidOpacity: {
			type: Number,
			default: 1
		},
		bordered: {
			type: Boolean,
			default: !1
		},
		borderColor: {
			type: String,
			default: "rgba(24, 215, 255, 0.34)"
		},
		glow: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let a = e, o = (e) => {
			if (!(e === "" || e == null)) return typeof e == "number" ? `${e}px` : e;
		}, s = (e, t, n) => Math.min(Math.max(Number(e) || 0, t), n), c = (e, t) => {
			let n = String(e).trim();
			if (!n.startsWith("#")) return n;
			let r = n.slice(1), i = r.length === 3 ? r.split("").map((e) => e + e).join("") : r.slice(0, 6);
			return i.length === 6 ? `rgba(${parseInt(i.slice(0, 2), 16)}, ${parseInt(i.slice(2, 4), 16)}, ${parseInt(i.slice(4, 6), 16)}, ${s(t, 0, 1)})` : n;
		}, d = t(() => {
			if (a.direction === "both") {
				let e = c(a.color, 0), t = c(a.color, a.middleOpacity), n = c(a.color, a.solidOpacity);
				return `linear-gradient(90deg, ${e}, ${t} ${s(a.middleStop, 0, 50)}%, ${n} 50%, ${t} ${100 - s(a.middleStop, 0, 50)}%, ${e})`;
			}
			let e = a.direction === "left-to-right" ? "270deg" : "90deg", t = c(a.color, 0), n = c(a.color, a.middleOpacity), r = c(a.color, a.solidOpacity);
			return `linear-gradient(${e}, ${t}, ${n} ${s(a.middleStop, 0, 100)}%, ${r} ${s(a.solidStop, 0, 100)}%)`;
		}), f = t(() => ({
			width: o(a.width),
			height: o(a.height),
			borderRadius: o(a.radius),
			borderColor: a.bordered ? a.borderColor : void 0,
			background: d.value
		})), m = t(() => ({ padding: a.padding }));
		return (t, a) => (p(), n(_(e.tag), {
			class: l(["pk-dv-gradient-panel", {
				"pk-dv-gradient-panel--bordered": e.bordered,
				"pk-dv-gradient-panel--glow": e.glow
			}]),
			style: u(f.value)
		}, {
			default: b(() => [t.$slots.default ? (p(), i("div", {
				key: 0,
				class: "pk-dv-gradient-panel__content",
				style: u(m.value)
			}, [g(t.$slots, "default", {}, void 0, !0)], 4)) : r("", !0)]),
			_: 3
		}, 8, ["class", "style"]));
	}
}), [["__scopeId", "data-v-8a854602"]]), N = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvGrid" }, {
	__name: "index",
	props: {
		columns: {
			type: [Number, String],
			default: 12
		},
		rows: {
			type: [Number, String],
			default: ""
		},
		gap: {
			type: String,
			default: "16px"
		},
		minColumnWidth: {
			type: String,
			default: ""
		},
		dense: {
			type: Boolean,
			default: !0
		}
	},
	setup(e) {
		let n = e, r = t(() => {
			let e = Number(n.columns) || 12, t = Number(n.rows);
			return {
				gap: n.gap,
				gridAutoFlow: n.dense ? "row dense" : "row",
				gridTemplateColumns: n.minColumnWidth ? `repeat(auto-fit, minmax(${n.minColumnWidth}, 1fr))` : `repeat(${e}, minmax(0, 1fr))`,
				gridTemplateRows: Number.isFinite(t) && t > 0 ? `repeat(${t}, minmax(0, 1fr))` : void 0
			};
		});
		return (e, t) => (p(), i("div", {
			class: "pk-dv-grid",
			style: u(r.value)
		}, [g(e.$slots, "default", {}, void 0, !0)], 4));
	}
}), [["__scopeId", "data-v-f1e67a96"]]), P = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvGroup" }, {
	__name: "index",
	props: {
		direction: {
			type: String,
			default: "row",
			validator: (e) => ["row", "column"].includes(e)
		},
		gap: {
			type: String,
			default: "12px"
		},
		align: {
			type: String,
			default: "stretch"
		},
		justify: {
			type: String,
			default: "flex-start"
		},
		wrap: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let n = e, r = t(() => ({
			display: "flex",
			flexDirection: n.direction,
			flexWrap: n.wrap ? "wrap" : "nowrap",
			gap: n.gap,
			alignItems: n.align,
			justifyContent: n.justify
		}));
		return (e, t) => (p(), i("div", {
			class: "pk-dv-group",
			style: u(r.value)
		}, [g(e.$slots, "default", {}, void 0, !0)], 4));
	}
}), [["__scopeId", "data-v-3763f794"]]), le = { class: "pk-dv-header-title__center" }, ue = { class: "pk-dv-header-title__main" }, de = {
	key: 0,
	class: "pk-dv-header-title__sub"
}, F = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvHeaderTitle" }, {
	__name: "index",
	props: {
		title: {
			type: String,
			default: ""
		},
		subTitle: {
			type: String,
			default: ""
		},
		tag: {
			type: String,
			default: "h1"
		},
		animated: {
			type: Boolean,
			default: !0
		}
	},
	setup(e) {
		return (t, s) => (p(), i("header", { class: l(["pk-dv-header-title", { "pk-dv-header-title--animated": e.animated }]) }, [a("div", le, [
			s[0] ||= a("div", { class: "pk-dv-header-title__line pk-dv-header-title__line--left" }, null, -1),
			a("div", ue, [(p(), n(_(e.tag), { class: "pk-dv-header-title__text" }, {
				default: b(() => [g(t.$slots, "default", {}, () => [o(v(e.title), 1)], !0)]),
				_: 3
			})), e.subTitle ? (p(), i("div", de, v(e.subTitle), 1)) : r("", !0)]),
			s[1] ||= a("div", { class: "pk-dv-header-title__line pk-dv-header-title__line--right" }, null, -1)
		])], 2));
	}
}), [["__scopeId", "data-v-3c0da242"]]), I = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvLayer" }, {
	__name: "index",
	props: {
		x: {
			type: [Number, String],
			default: 0
		},
		y: {
			type: [Number, String],
			default: 0
		},
		width: {
			type: [Number, String],
			default: "auto"
		},
		height: {
			type: [Number, String],
			default: "auto"
		},
		zIndex: {
			type: [Number, String],
			default: "auto"
		}
	},
	setup(e) {
		let n = e, r = (e) => e === "auto" ? "auto" : typeof e == "number" ? `${e}px` : e, a = t(() => ({
			left: r(n.x),
			top: r(n.y),
			width: r(n.width),
			height: r(n.height),
			zIndex: n.zIndex
		}));
		return (e, t) => (p(), i("div", {
			class: "pk-dv-layer",
			style: u(a.value)
		}, [g(e.$slots, "default", {}, void 0, !0)], 4));
	}
}), [["__scopeId", "data-v-09fb4d0a"]]), L = /*@__PURE__*/ Object.assign({ name: "PkDvLineChart" }, {
	__name: "index",
	props: {
		data: {
			type: Array,
			default: () => []
		},
		xField: {
			type: String,
			default: "name"
		},
		yField: {
			type: String,
			default: "value"
		},
		height: {
			type: [Number, String],
			default: 320
		},
		smooth: {
			type: Boolean,
			default: !0
		},
		area: {
			type: Boolean,
			default: !0
		},
		color: {
			type: String,
			default: "#18d7ff"
		},
		option: {
			type: Object,
			default: () => ({})
		}
	},
	setup(e) {
		let r = e, i = t(() => T({
			color: [r.color],
			grid: {
				top: 28,
				right: 18,
				bottom: 28,
				left: 42
			},
			tooltip: {
				trigger: "axis",
				backgroundColor: "rgba(7, 24, 45, 0.92)",
				borderColor: "rgba(24, 215, 255, 0.28)",
				textStyle: { color: "#eaf7ff" }
			},
			xAxis: {
				type: "category",
				boundaryGap: !1,
				data: r.data.map((e) => e[r.xField]),
				axisLine: { lineStyle: { color: "rgba(234, 247, 255, 0.26)" } },
				axisLabel: { color: "rgba(234, 247, 255, 0.68)" },
				axisTick: { show: !1 }
			},
			yAxis: {
				type: "value",
				splitLine: { lineStyle: { color: "rgba(234, 247, 255, 0.08)" } },
				axisLabel: { color: "rgba(234, 247, 255, 0.68)" }
			},
			series: [{
				type: "line",
				smooth: r.smooth,
				symbol: "circle",
				symbolSize: 7,
				data: r.data.map((e) => e[r.yField]),
				lineStyle: { width: 3 },
				areaStyle: r.area ? { opacity: .22 } : void 0
			}]
		}, r.option));
		return (t, r) => (p(), n(C, {
			option: i.value,
			height: e.height
		}, null, 8, ["option", "height"]));
	}
}), R = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvMapCanvas" }, {
	__name: "index",
	props: {
		height: {
			type: [Number, String],
			default: 420
		},
		background: {
			type: String,
			default: ""
		}
	},
	setup(e) {
		let n = e, r = (e) => typeof e == "number" ? `${e}px` : e, o = t(() => ({
			height: r(n.height),
			background: n.background || void 0
		}));
		return (e, t) => (p(), i("div", {
			class: "pk-dv-map-canvas",
			style: u(o.value)
		}, [t[0] ||= a("div", { class: "pk-dv-map-canvas__grid" }, null, -1), g(e.$slots, "default", {}, void 0, !0)], 4));
	}
}), [["__scopeId", "data-v-1c21d597"]]), fe = { class: "pk-dv-flyline-map" }, pe = {
	class: "pk-dv-flyline-map__svg",
	viewBox: "0 0 100 100",
	preserveAspectRatio: "none",
	"aria-hidden": "true"
}, me = ["d"], z = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvFlylineMap" }, {
	__name: "index",
	props: {
		lines: {
			type: Array,
			default: () => []
		},
		height: {
			type: [Number, String],
			default: 420
		},
		background: {
			type: String,
			default: ""
		},
		duration: {
			type: Number,
			default: 3.2
		}
	},
	setup(n) {
		let r = n, c = (e) => {
			let t = e.source || e.from, n = e.target || e.to, r = (t.x + n.x) / 2, i = Math.min(t.y, n.y) - Math.abs(n.x - t.x) * .18 - 8;
			return `M ${t.x} ${t.y} Q ${r} ${i} ${n.x} ${n.y}`;
		}, l = (e, t) => e.name ?? `${e.source?.name}-${e.target?.name}-${t}`, d = t(() => {
			let e = [];
			return r.lines.forEach((t) => {
				(t.source || t.from) && e.push(t.source || t.from), (t.target || t.to) && e.push(t.target || t.to);
			}), e;
		});
		return (t, r) => (p(), i("div", fe, [s(R, {
			height: n.height,
			background: n.background
		}, {
			default: b(() => [
				(p(), i("svg", pe, [r[0] ||= a("defs", null, [a("linearGradient", {
					id: "pk-dv-flyline-gradient",
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "0%"
				}, [
					a("stop", {
						offset: "0%",
						"stop-color": "rgba(24, 215, 255, 0)"
					}),
					a("stop", {
						offset: "45%",
						"stop-color": "rgba(24, 215, 255, 0.48)"
					}),
					a("stop", {
						offset: "100%",
						"stop-color": "rgba(72, 240, 182, 0.95)"
					})
				])], -1), (p(!0), i(e, null, h(n.lines, (e, t) => (p(), i("path", {
					key: l(e, t),
					class: "pk-dv-flyline-map__line",
					style: u({
						animationDelay: `${t * .28}s`,
						animationDuration: `${n.duration}s`
					}),
					d: c(e)
				}, null, 12, me))), 128))])),
				(p(!0), i(e, null, h(d.value, (e, t) => (p(), i("button", {
					key: `${e.name || t}-${t}`,
					class: "pk-dv-flyline-map__point",
					style: u({
						left: `${e.x}%`,
						top: `${e.y}%`
					}),
					type: "button"
				}, [r[1] ||= a("span", null, null, -1), o(" " + v(e.name), 1)], 4))), 128)),
				g(t.$slots, "default", {}, void 0, !0)
			]),
			_: 3
		}, 8, ["height", "background"])]));
	}
}), [["__scopeId", "data-v-132bb9ea"]]), he = {
	key: 0,
	class: "pk-dv-geo-panel__header"
}, ge = { class: "pk-dv-geo-panel__body" }, B = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvGeoPanel" }, {
	__name: "index",
	props: {
		title: {
			type: String,
			default: ""
		},
		x: {
			type: [Number, String],
			default: 50
		},
		y: {
			type: [Number, String],
			default: 50
		},
		width: {
			type: [Number, String],
			default: 220
		}
	},
	setup(e) {
		let n = e, s = (e) => typeof e == "number" ? `${e}%` : e, c = (e) => typeof e == "number" ? `${e}px` : e, l = t(() => ({
			left: s(n.x),
			top: s(n.y),
			width: c(n.width)
		}));
		return (t, n) => (p(), i("section", {
			class: "pk-dv-geo-panel",
			style: u(l.value)
		}, [e.title || t.$slots.title ? (p(), i("header", he, [g(t.$slots, "title", {}, () => [o(v(e.title), 1)], !0)])) : r("", !0), a("div", ge, [g(t.$slots, "default", {}, void 0, !0)])], 4));
	}
}), [["__scopeId", "data-v-4e50f10e"]]), V = "南海诸岛", H = "__pk_dv_south_sea_original__", U = "__pk_dv_south_sea_frame__", W = /*@__PURE__*/ Object.assign({ name: "PkDvMapChina" }, {
	__name: "index",
	props: {
		geoJson: {
			type: Object,
			default: null
		},
		mapName: {
			type: String,
			default: "china"
		},
		data: {
			type: Array,
			default: () => []
		},
		height: {
			type: [Number, String],
			default: 420
		},
		option: {
			type: Object,
			default: () => ({})
		},
		southSeaInset: {
			type: Boolean,
			default: !0
		},
		southSeaInsetBounds: {
			type: Object,
			default: () => ({
				minX: 124.6,
				minY: 18.1,
				maxX: 130.4,
				maxY: 25
			})
		}
	},
	setup(e) {
		let r = e, i = (e = {}) => e.name === V || e.name === H || e.adcode === "100000_JD" || e.adchar === "JD", a = (e, t = []) => (Array.isArray(e) && (typeof e[0] == "number" && typeof e[1] == "number" ? t.push(e) : e.forEach((e) => a(e, t))), t), o = (e) => {
			let t = a(e?.geometry?.coordinates);
			if (!t.length) return null;
			let n = t.map((e) => e[0]), r = t.map((e) => e[1]);
			return {
				minX: Math.min(...n),
				minY: Math.min(...r),
				maxX: Math.max(...n),
				maxY: Math.max(...r)
			};
		}, s = (e) => {
			let t = o(e);
			if (!t) return null;
			let n = (t.maxX - t.minX) * .03, r = (t.maxY - t.minY) * .03, i = t.minX - n, a = t.minY - r, s = t.maxX + n, c = t.maxY + r, l = [(i + s) / 2, a + (c - a) * .08];
			return {
				type: "Feature",
				properties: {
					name: U,
					pkDvSynthetic: !0,
					cp: l,
					center: l,
					centroid: l
				},
				geometry: {
					type: "Polygon",
					coordinates: [[
						[i, c],
						[s, c],
						[s, a],
						[i, a],
						[i, c]
					]]
				}
			};
		}, c = (e, t, n) => {
			if (!Array.isArray(e)) return e;
			if (typeof e[0] == "number" && typeof e[1] == "number") {
				let r = t.maxX - t.minX || 1, i = t.maxY - t.minY || 1, a = n.maxX - n.minX, o = n.maxY - n.minY, s = n.minX + (e[0] - t.minX) / r * a, c = n.minY + (e[1] - t.minY) / i * o;
				return e.length > 2 ? [
					s,
					c,
					...e.slice(2)
				] : [s, c];
			}
			return e.map((e) => c(e, t, n));
		}, l = (e) => {
			let t = o(e);
			if (!r.southSeaInset || !t) return e;
			let n = r.southSeaInsetBounds;
			return {
				...e,
				properties: {
					...e.properties,
					center: [(n.minX + n.maxX) / 2, n.minY + (n.maxY - n.minY) * .18],
					centroid: [(n.minX + n.maxX) / 2, n.minY + (n.maxY - n.minY) * .18]
				},
				geometry: {
					...e.geometry,
					coordinates: c(e.geometry.coordinates, t, n)
				}
			};
		}, u = {
			name: V,
			label: { show: !1 },
			itemStyle: {
				areaColor: "rgba(24, 215, 255, 0.1)",
				borderColor: "#18d7ff",
				borderWidth: 1,
				shadowBlur: 10,
				shadowColor: "rgba(24, 215, 255, 0.26)"
			},
			emphasis: {
				label: { show: !1 },
				itemStyle: {
					areaColor: "rgba(24, 215, 255, 0.18)",
					borderColor: "#18d7ff",
					borderWidth: 1.2
				}
			}
		}, d = {
			name: U,
			value: 0,
			label: {
				show: !0,
				color: "rgba(234, 247, 255, 0.9)",
				fontSize: 10,
				formatter: V
			},
			itemStyle: {
				areaColor: "rgba(24, 215, 255, 0.02)",
				borderColor: "#18d7ff",
				borderWidth: 1,
				shadowBlur: 10,
				shadowColor: "rgba(24, 215, 255, 0.28)"
			},
			emphasis: {
				disabled: !0,
				label: {
					show: !0,
					color: "#fff",
					formatter: V
				},
				itemStyle: {
					areaColor: "rgba(24, 215, 255, 0.02)",
					borderColor: "#18d7ff",
					borderWidth: 1
				}
			}
		}, f = {
			name: H,
			value: 0,
			label: { show: !1 },
			itemStyle: {
				areaColor: "rgba(24, 215, 255, 0.08)",
				borderColor: "rgba(24, 215, 255, 0.7)",
				borderWidth: 1
			},
			emphasis: {
				disabled: !0,
				label: { show: !1 }
			}
		}, m = t(() => {
			if (!r.geoJson?.features) return r.geoJson;
			let e = [], t = [];
			r.geoJson.features.forEach((n) => {
				let a = n.properties || {};
				if (!i(a)) {
					e.push(n);
					return;
				}
				let o = {
					...n,
					properties: {
						...a,
						name: a.name || V
					}
				};
				if (!r.southSeaInset) {
					e.push(o);
					return;
				}
				e.push({
					...n,
					properties: {
						...a,
						name: H,
						pkDvSouthSeaOriginal: !0
					}
				}), t.push(l(o));
			});
			let n = e.concat(t), a = t.find((e) => i(e.properties)) || n.find((e) => e.properties?.name === V), o = n.some((e) => e.properties?.name === U) ? null : s(a);
			return {
				...r.geoJson,
				features: o ? n.concat(o) : n
			};
		}), h = t(() => m.value?.features?.some((e) => e.properties?.name === V)), g = t(() => m.value?.features?.some((e) => e.properties?.name === H)), _ = t(() => {
			let e = [...r.data], t = e.some((e) => e.name === V), n = e.some((e) => e.name === H), i = e.some((e) => e.name === U);
			return h.value && !t && e.push({
				...u,
				value: 0
			}), g.value && !n && e.push(f), h.value && !i && e.push(d), e;
		});
		y(() => [m.value, r.mapName], () => {
			m.value && x.registerMap(r.mapName, m.value);
		}, { immediate: !0 });
		let v = (e) => {
			let t = String(e.name || "");
			return t === U || t === H ? "" : (t === "100000_JD" || t === "JD" ? V : t).replace("维吾尔自治区", "").replace("壮族自治区", "").replace("回族自治区", "").replace("特别行政区", "").replace("自治区", "").replace("省", "").replace("市", "");
		}, b = t(() => T({
			tooltip: {
				trigger: "item",
				backgroundColor: "rgba(7, 24, 45, 0.92)",
				borderColor: "rgba(24, 215, 255, 0.28)",
				textStyle: { color: "#eaf7ff" },
				formatter: (e) => e.name === U || e.name === H ? V : e.name
			},
			visualMap: {
				show: !1,
				min: 0,
				max: Math.max(...r.data.map((e) => Number(e.value) || 0), 100),
				inRange: { color: ["rgba(24, 215, 255, 0.18)", "rgba(24, 215, 255, 0.72)"] }
			},
			series: [{
				type: "map",
				map: r.mapName,
				roam: !1,
				layoutCenter: ["50%", "50%"],
				layoutSize: "88%",
				data: _.value,
				label: {
					show: !0,
					color: "rgba(234, 247, 255, 0.76)",
					fontSize: 11,
					formatter: v
				},
				regions: [
					{
						name: V,
						...u
					},
					f,
					d
				],
				itemStyle: {
					areaColor: "rgba(24, 215, 255, 0.16)",
					borderColor: "rgba(24, 215, 255, 0.65)",
					borderWidth: 1
				},
				emphasis: {
					label: { color: "#fff" },
					itemStyle: { areaColor: "#18d7ff" }
				}
			}]
		}, r.option));
		return (t, r) => (p(), n(C, {
			option: b.value,
			height: e.height
		}, null, 8, ["option", "height"]));
	}
}), _e = ["type", "disabled"], ve = { class: "pk-dv-menu-button__text" }, G = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvMenuButton" }, {
	__name: "index",
	props: {
		label: {
			type: String,
			default: ""
		},
		active: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		block: {
			type: Boolean,
			default: !1
		},
		size: {
			type: String,
			default: "medium",
			validator: (e) => [
				"small",
				"medium",
				"large"
			].includes(e)
		},
		width: {
			type: [Number, String],
			default: ""
		},
		type: {
			type: String,
			default: "button"
		}
	},
	emits: ["click"],
	setup(e, { emit: n }) {
		let r = e, s = n, c = (e) => {
			if (!(e === "" || e == null)) return typeof e == "number" ? `${e}px` : e;
		}, d = t(() => ({ width: c(r.width) })), f = (e) => {
			r.disabled || s("click", e);
		};
		return (t, n) => (p(), i("button", {
			class: l(["pk-dv-menu-button", [`pk-dv-menu-button--${e.size}`, {
				"pk-dv-menu-button--active": e.active,
				"pk-dv-menu-button--disabled": e.disabled,
				"pk-dv-menu-button--block": e.block
			}]]),
			type: e.type,
			disabled: e.disabled,
			style: u(d.value),
			onClick: f
		}, [
			n[0] ||= a("span", { class: "pk-dv-menu-button__shine" }, null, -1),
			n[1] ||= a("span", { class: "pk-dv-menu-button__edge pk-dv-menu-button__edge--left" }, null, -1),
			n[2] ||= a("span", { class: "pk-dv-menu-button__edge pk-dv-menu-button__edge--right" }, null, -1),
			a("span", ve, [g(t.$slots, "default", {}, () => [o(v(e.label), 1)], !0)])
		], 14, _e));
	}
}), [["__scopeId", "data-v-2949b52f"]]), ye = {
	key: 0,
	class: "pk-dv-panel__header"
}, be = { class: "pk-dv-panel__title-wrap" }, xe = { class: "pk-dv-panel__title" }, Se = {
	key: 0,
	class: "pk-dv-panel__subtitle"
}, Ce = {
	key: 0,
	class: "pk-dv-panel__extra"
}, K = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvPanel" }, {
	__name: "index",
	props: {
		title: {
			type: String,
			default: ""
		},
		subtitle: {
			type: String,
			default: ""
		},
		height: {
			type: [Number, String],
			default: ""
		},
		padding: {
			type: String,
			default: "16px"
		},
		background: {
			type: String,
			default: ""
		},
		bordered: {
			type: Boolean,
			default: !0
		},
		shadow: {
			type: Boolean,
			default: !0
		},
		compact: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let n = e, o = (e) => {
			if (!(e === "" || e == null)) return typeof e == "number" ? `${e}px` : e;
		}, s = t(() => ({
			height: o(n.height),
			background: n.background || void 0
		})), c = t(() => ({ padding: n.compact ? "10px" : n.padding }));
		return (t, n) => (p(), i("section", {
			class: l(["pk-dv-panel", {
				"pk-dv-panel--bordered": e.bordered,
				"pk-dv-panel--shadow": e.shadow,
				"pk-dv-panel--compact": e.compact
			}]),
			style: u(s.value)
		}, [e.title || e.subtitle || t.$slots.title || t.$slots.extra ? (p(), i("header", ye, [a("div", be, [g(t.$slots, "title", {}, () => [a("h3", xe, v(e.title), 1)], !0), e.subtitle ? (p(), i("p", Se, v(e.subtitle), 1)) : r("", !0)]), t.$slots.extra ? (p(), i("div", Ce, [g(t.$slots, "extra", {}, void 0, !0)])) : r("", !0)])) : r("", !0), a("div", {
			class: "pk-dv-panel__body",
			style: u(c.value)
		}, [g(t.$slots, "default", {}, void 0, !0)], 4)], 6));
	}
}), [["__scopeId", "data-v-ffaea9ec"]]), q = /*@__PURE__*/ Object.assign({ name: "PkDvPieChart" }, {
	__name: "index",
	props: {
		data: {
			type: Array,
			default: () => []
		},
		height: {
			type: [Number, String],
			default: 320
		},
		radius: {
			type: Array,
			default: () => ["48%", "70%"]
		},
		roseType: {
			type: [Boolean, String],
			default: !1
		},
		option: {
			type: Object,
			default: () => ({})
		}
	},
	setup(e) {
		let r = e, i = t(() => T({
			color: [
				"#18d7ff",
				"#48f0b6",
				"#ffd166",
				"#ff5d73",
				"#8f7cff",
				"#5aa7ff"
			],
			tooltip: {
				trigger: "item",
				backgroundColor: "rgba(7, 24, 45, 0.92)",
				borderColor: "rgba(24, 215, 255, 0.28)",
				textStyle: { color: "#eaf7ff" }
			},
			legend: {
				bottom: 0,
				textStyle: { color: "rgba(234, 247, 255, 0.68)" },
				itemWidth: 10,
				itemHeight: 10
			},
			series: [{
				type: "pie",
				radius: r.radius,
				center: ["50%", "44%"],
				roseType: r.roseType,
				data: r.data,
				label: { color: "rgba(234, 247, 255, 0.78)" },
				labelLine: { lineStyle: { color: "rgba(234, 247, 255, 0.3)" } },
				itemStyle: {
					borderColor: "#07182d",
					borderWidth: 2
				}
			}]
		}, r.option));
		return (t, r) => (p(), n(C, {
			option: i.value,
			height: e.height
		}, null, 8, ["option", "height"]));
	}
}), we = { class: "pk-dv-point-map" }, Te = ["onClick"], Ee = {
	key: 0,
	class: "pk-dv-point-map__label"
}, J = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvPointMap" }, {
	__name: "index",
	props: {
		points: {
			type: Array,
			default: () => []
		},
		height: {
			type: [Number, String],
			default: 420
		},
		background: {
			type: String,
			default: ""
		},
		rowKey: {
			type: String,
			default: "name"
		},
		showLabel: {
			type: Boolean,
			default: !0
		},
		pulse: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["point-click"],
	setup(t) {
		let n = (e, t) => e.name ?? e.id ?? t;
		return (o, c) => (p(), i("div", we, [s(R, {
			height: t.height,
			background: t.background
		}, {
			default: b(() => [(p(!0), i(e, null, h(t.points, (e, s) => (p(), i("button", {
				key: n(e, s),
				class: l(["pk-dv-point-map__point", [`pk-dv-point-map__point--${e.type || "primary"}`, { "pk-dv-point-map__point--pulse": t.pulse }]]),
				style: u({
					left: `${e.x}%`,
					top: `${e.y}%`
				}),
				type: "button",
				onClick: (t) => o.$emit("point-click", e)
			}, [c[0] ||= a("span", { class: "pk-dv-point-map__dot" }, null, -1), t.showLabel ? (p(), i("span", Ee, v(e.name), 1)) : r("", !0)], 14, Te))), 128)), g(o.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["height", "background"])]));
	}
}), [["__scopeId", "data-v-32d0c33f"]]), De = {
	key: 0,
	class: "pk-dv-progress__header"
}, Oe = { key: 0 }, Y = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvProgress" }, {
	__name: "index",
	props: {
		value: {
			type: Number,
			default: 0
		},
		label: {
			type: String,
			default: ""
		},
		height: {
			type: [Number, String],
			default: 8
		},
		status: {
			type: String,
			default: "primary",
			validator: (e) => [
				"primary",
				"success",
				"warning",
				"danger"
			].includes(e)
		},
		showValue: {
			type: Boolean,
			default: !0
		},
		animated: {
			type: Boolean,
			default: !0
		}
	},
	setup(e) {
		let n = e, o = t(() => Math.max(0, Math.min(Math.round(n.value), 100))), s = t(() => typeof n.height == "number" ? `${n.height}px` : n.height);
		return (t, n) => (p(), i("div", { class: l(["pk-dv-progress", [`pk-dv-progress--${e.status}`, { "pk-dv-progress--animated": e.animated }]]) }, [e.label || e.showValue ? (p(), i("div", De, [a("span", null, v(e.label), 1), e.showValue ? (p(), i("span", Oe, v(o.value) + "%", 1)) : r("", !0)])) : r("", !0), a("div", {
			class: "pk-dv-progress__track",
			style: u({ height: s.value })
		}, [a("span", {
			class: "pk-dv-progress__bar",
			style: u({ width: `${o.value}%` })
		}, null, 4)], 4)], 2));
	}
}), [["__scopeId", "data-v-ccfff55e"]]), X = /*@__PURE__*/ Object.assign({ name: "PkDvRadarChart" }, {
	__name: "index",
	props: {
		indicators: {
			type: Array,
			default: () => []
		},
		values: {
			type: Array,
			default: () => []
		},
		name: {
			type: String,
			default: "综合评分"
		},
		height: {
			type: [Number, String],
			default: 320
		},
		option: {
			type: Object,
			default: () => ({})
		}
	},
	setup(e) {
		let r = e, i = t(() => T({
			tooltip: {
				backgroundColor: "rgba(7, 24, 45, 0.92)",
				borderColor: "rgba(24, 215, 255, 0.28)",
				textStyle: { color: "#eaf7ff" }
			},
			radar: {
				radius: "66%",
				indicator: r.indicators,
				axisName: { color: "rgba(234, 247, 255, 0.72)" },
				splitLine: { lineStyle: { color: "rgba(24, 215, 255, 0.18)" } },
				splitArea: { areaStyle: { color: ["rgba(24, 215, 255, 0.04)", "rgba(24, 215, 255, 0.08)"] } },
				axisLine: { lineStyle: { color: "rgba(24, 215, 255, 0.16)" } }
			},
			series: [{
				type: "radar",
				data: [{
					value: r.values,
					name: r.name
				}],
				symbolSize: 6,
				lineStyle: {
					color: "#18d7ff",
					width: 2
				},
				areaStyle: { color: "rgba(24, 215, 255, 0.22)" },
				itemStyle: { color: "#18d7ff" }
			}]
		}, r.option));
		return (t, r) => (p(), n(C, {
			option: i.value,
			height: e.height
		}, null, 8, ["option", "height"]));
	}
}), ke = { class: "pk-dv-rank-list" }, Ae = { class: "pk-dv-rank-list__index" }, je = { class: "pk-dv-rank-list__content" }, Me = { class: "pk-dv-rank-list__row" }, Ne = { class: "pk-dv-rank-list__name" }, Pe = { class: "pk-dv-rank-list__value" }, Fe = { class: "pk-dv-rank-list__track" }, Z = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvRankList" }, {
	__name: "index",
	props: {
		items: {
			type: Array,
			default: () => []
		},
		max: {
			type: Number,
			default: 0
		},
		limit: {
			type: Number,
			default: 8
		},
		rowKey: {
			type: String,
			default: "name"
		}
	},
	setup(n) {
		let r = n, o = t(() => r.items.slice(0, r.limit)), s = t(() => r.max || Math.max(...r.items.map((e) => Number(e.value) || 0), 1)), c = (e) => e.percent === void 0 ? Math.max(0, Math.min((Number(e.value) || 0) / s.value * 100, 100)) : Math.max(0, Math.min(Number(e.percent), 100)), l = (e, t) => e[r.rowKey] ?? t;
		return (t, n) => (p(), i("div", ke, [(p(!0), i(e, null, h(o.value, (e, t) => (p(), i("div", {
			key: l(e, t),
			class: "pk-dv-rank-list__item"
		}, [a("span", Ae, v(t + 1), 1), a("div", je, [a("div", Me, [a("span", Ne, v(e.name), 1), a("span", Pe, v(e.value), 1)]), a("div", Fe, [a("span", {
			class: "pk-dv-rank-list__bar",
			style: u({ width: `${c(e)}%` })
		}, null, 4)])])]))), 128))]));
	}
}), [["__scopeId", "data-v-1bb06fe5"]]), Ie = {
	class: "pk-dv-ring-progress__svg",
	viewBox: "0 0 120 120",
	"aria-hidden": "true"
}, Le = ["stroke-dashoffset"], Re = { class: "pk-dv-ring-progress__content" }, ze = { key: 0 }, Q = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvRingProgress" }, {
	__name: "index",
	props: {
		value: {
			type: Number,
			default: 0
		},
		label: {
			type: String,
			default: ""
		},
		size: {
			type: [Number, String],
			default: 120
		},
		strokeWidth: {
			type: Number,
			default: 8
		},
		status: {
			type: String,
			default: "primary",
			validator: (e) => [
				"primary",
				"success",
				"warning",
				"danger"
			].includes(e)
		},
		animated: {
			type: Boolean,
			default: !0
		}
	},
	setup(e) {
		let n = e, o = t(() => Math.max(0, Math.min(Math.round(n.value), 100))), s = 2 * Math.PI * 52, c = t(() => s * (1 - o.value / 100)), d = t(() => typeof n.size == "number" ? `${n.size}px` : n.size), f = {
			primary: "var(--pk-datav-primary)",
			success: "var(--pk-datav-accent)",
			warning: "var(--pk-datav-warning)",
			danger: "var(--pk-datav-danger)"
		}, m = t(() => ({
			width: d.value,
			height: d.value,
			"--pk-dv-ring-progress-color": f[n.status],
			"--pk-dv-ring-progress-stroke": n.strokeWidth
		}));
		return (t, n) => (p(), i("div", {
			class: l(["pk-dv-ring-progress", { "pk-dv-ring-progress--animated": e.animated }]),
			style: u(m.value)
		}, [(p(), i("svg", Ie, [n[0] ||= a("circle", {
			class: "pk-dv-ring-progress__track",
			cx: "60",
			cy: "60",
			r: "52"
		}, null, -1), a("circle", {
			class: "pk-dv-ring-progress__bar",
			cx: "60",
			cy: "60",
			r: "52",
			"stroke-dasharray": s,
			"stroke-dashoffset": c.value
		}, null, 8, Le)])), a("div", Re, [a("strong", null, v(o.value) + "%", 1), e.label ? (p(), i("span", ze, v(e.label), 1)) : r("", !0)])], 6));
	}
}), [["__scopeId", "data-v-42c25c29"]]), $ = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvScreen" }, {
	__name: "index",
	props: {
		width: {
			type: [Number, String],
			default: 1920
		},
		height: {
			type: [Number, String],
			default: 1080
		},
		background: {
			type: String,
			default: "#061527"
		},
		fit: {
			type: String,
			default: "contain",
			validator: (e) => [
				"contain",
				"cover",
				"fill",
				"none"
			].includes(e)
		},
		center: {
			type: Boolean,
			default: !0
		},
		overflow: {
			type: String,
			default: "hidden"
		}
	},
	setup(e) {
		let n = e, r = m(null), o = m({
			x: 1,
			y: 1
		}), s = t(() => Number(n.width) || 1920), l = t(() => Number(n.height) || 1080), h = t(() => ({
			background: n.background,
			overflow: n.overflow
		})), _ = t(() => ({
			width: `${s.value}px`,
			height: `${l.value}px`,
			transform: `scale(${o.value.x}, ${o.value.y})`,
			transformOrigin: n.center ? "center center" : "left top"
		})), v = () => {
			let e = r.value;
			if (!e || n.fit === "none") {
				o.value = {
					x: 1,
					y: 1
				};
				return;
			}
			let t = e.getBoundingClientRect(), i = t.width / s.value, a = t.height / l.value;
			if (n.fit === "fill") {
				o.value = {
					x: i,
					y: a
				};
				return;
			}
			let c = n.fit === "cover" ? Math.max(i, a) : Math.min(i, a);
			o.value = {
				x: c,
				y: c
			};
		};
		return f(() => {
			c(v), window.addEventListener("resize", v);
		}), d(() => {
			window.removeEventListener("resize", v);
		}), (e, t) => (p(), i("div", {
			class: "pk-dv-screen",
			style: u(h.value)
		}, [a("div", {
			ref_key: "viewportRef",
			ref: r,
			class: "pk-dv-screen__viewport"
		}, [a("div", {
			class: "pk-dv-screen__canvas",
			style: u(_.value)
		}, [g(e.$slots, "default", {}, void 0, !0)], 4)], 512)], 4));
	}
}), [["__scopeId", "data-v-771b78d7"]]), Be = {
	key: 0,
	class: "pk-dv-scroll-notice__label"
}, Ve = { class: "pk-dv-scroll-notice__viewport" }, He = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvScrollNotice" }, {
	__name: "index",
	props: {
		items: {
			type: Array,
			default: () => []
		},
		label: {
			type: String,
			default: "NOTICE"
		},
		duration: {
			type: Number,
			default: 18
		},
		field: {
			type: String,
			default: "text"
		},
		shine: {
			type: Boolean,
			default: !0
		}
	},
	setup(n) {
		let o = n, s = t(() => o.items.length ? o.items.concat(o.items) : []), c = (e) => typeof e == "string" ? e : e?.[o.field] ?? "";
		return (t, o) => (p(), i("div", { class: l(["pk-dv-scroll-notice", { "pk-dv-scroll-notice--shine": n.shine }]) }, [n.label ? (p(), i("span", Be, v(n.label), 1)) : r("", !0), a("div", Ve, [a("div", {
			class: "pk-dv-scroll-notice__track",
			style: u({ animationDuration: `${n.duration}s` })
		}, [(p(!0), i(e, null, h(s.value, (e, t) => (p(), i("span", {
			key: `${t}-${c(e)}`,
			class: "pk-dv-scroll-notice__item"
		}, v(c(e)), 1))), 128))], 4)])], 2));
	}
}), [["__scopeId", "data-v-5ac20e0c"]]), Ue = { class: "pk-dv-scroll-table" }, We = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvScrollTable" }, {
	__name: "index",
	props: {
		columns: {
			type: Array,
			default: () => []
		},
		rows: {
			type: Array,
			default: () => []
		},
		rowKey: {
			type: String,
			default: "id"
		},
		height: {
			type: [Number, String],
			default: 220
		},
		rowHeight: {
			type: Number,
			default: 38
		},
		autoScroll: {
			type: Boolean,
			default: !0
		},
		duration: {
			type: Number,
			default: 12
		}
	},
	setup(n) {
		let r = n, o = t(() => typeof r.height == "number" ? `${r.height}px` : r.height), s = t(() => r.autoScroll && r.rows.length * r.rowHeight > Number.parseFloat(o.value)), c = t(() => s.value ? r.rows.concat(r.rows) : r.rows), d = t(() => ({ gridTemplateColumns: r.columns.map((e) => e.width || "1fr").join(" ") })), f = t(() => ({
			"--pk-dv-scroll-table-duration": `${r.duration}s`,
			"--pk-dv-scroll-table-row-height": `${r.rowHeight}px`
		})), m = (e, t) => e[r.rowKey] ?? t;
		return (t, r) => (p(), i("div", Ue, [a("div", {
			class: "pk-dv-scroll-table__header",
			style: u(d.value)
		}, [(p(!0), i(e, null, h(n.columns, (e) => (p(), i("span", { key: e.key }, v(e.title), 1))), 128))], 4), a("div", {
			class: "pk-dv-scroll-table__body",
			style: u({ height: o.value })
		}, [a("div", {
			class: l(["pk-dv-scroll-table__track", { "pk-dv-scroll-table__track--animate": s.value }]),
			style: u(f.value)
		}, [(p(!0), i(e, null, h(c.value, (t, r) => (p(), i("div", {
			key: `${m(t, r)}-${r}`,
			class: l(["pk-dv-scroll-table__row", { "pk-dv-scroll-table__row--warning": t.warning }]),
			style: u(d.value)
		}, [(p(!0), i(e, null, h(n.columns, (e) => (p(), i("span", { key: e.key }, v(t[e.key]), 1))), 128))], 6))), 128))], 6)], 4)]));
	}
}), [["__scopeId", "data-v-9a564f01"]]), Ge = { class: "pk-dv-stat-card__header" }, Ke = { class: "pk-dv-stat-card__title" }, qe = { class: "pk-dv-stat-card__value-row" }, Je = {
	key: 0,
	class: "pk-dv-stat-card__prefix"
}, Ye = { class: "pk-dv-stat-card__value" }, Xe = {
	key: 1,
	class: "pk-dv-stat-card__unit"
}, Ze = {
	key: 0,
	class: "pk-dv-stat-card__footer"
}, Qe = { key: 0 }, $e = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvStatCard" }, {
	__name: "index",
	props: {
		title: {
			type: String,
			default: ""
		},
		value: {
			type: [Number, String],
			default: 0
		},
		prefix: {
			type: String,
			default: ""
		},
		unit: {
			type: String,
			default: ""
		},
		subtitle: {
			type: String,
			default: ""
		},
		trend: {
			type: [Number, String],
			default: ""
		},
		trendDirection: {
			type: String,
			default: "up",
			validator: (e) => [
				"up",
				"down",
				"flat"
			].includes(e)
		},
		status: {
			type: String,
			default: "primary",
			validator: (e) => [
				"primary",
				"success",
				"warning",
				"danger"
			].includes(e)
		},
		precision: {
			type: Number,
			default: -1
		},
		separator: {
			type: Boolean,
			default: !0
		}
	},
	setup(e) {
		let n = e, s = (e) => {
			let t = Number(e);
			if (!Number.isFinite(t)) return e;
			let r = n.precision >= 0 ? t.toFixed(n.precision) : String(e);
			if (!n.separator) return r;
			let [i, a] = r.split("."), o = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return a ? `${o}.${a}` : o;
		}, c = t(() => s(n.value)), u = t(() => n.trend === "" || n.trend === void 0 || n.trend === null ? "" : typeof n.trend == "number" ? `${Math.abs(n.trend)}%` : n.trend), d = t(() => `pk-dv-stat-card__trend--${n.trendDirection}`), f = t(() => ({
			up: "↑",
			down: "↓",
			flat: "→"
		})[n.trendDirection]);
		return (t, n) => (p(), i("section", { class: l(["pk-dv-stat-card", `pk-dv-stat-card--${e.status}`]) }, [
			a("div", Ge, [a("span", Ke, v(e.title), 1), g(t.$slots, "extra", {}, void 0, !0)]),
			a("div", qe, [
				e.prefix ? (p(), i("span", Je, v(e.prefix), 1)) : r("", !0),
				a("span", Ye, v(c.value), 1),
				e.unit ? (p(), i("span", Xe, v(e.unit), 1)) : r("", !0)
			]),
			e.subtitle || u.value ? (p(), i("div", Ze, [e.subtitle ? (p(), i("span", Qe, v(e.subtitle), 1)) : r("", !0), u.value ? (p(), i("span", {
				key: 1,
				class: l(["pk-dv-stat-card__trend", d.value])
			}, [a("span", null, v(f.value), 1), o(" " + v(u.value), 1)], 2)) : r("", !0)])) : r("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-5a77564e"]]), et = {
	key: 0,
	class: "pk-dv-status-dot__text"
}, tt = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvStatusDot" }, {
	__name: "index",
	props: {
		type: {
			type: String,
			default: "online",
			validator: (e) => [
				"online",
				"offline",
				"warning",
				"danger",
				"processing"
			].includes(e)
		},
		text: {
			type: String,
			default: ""
		},
		pulse: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		return (t, n) => (p(), i("span", { class: l(["pk-dv-status-dot", [`pk-dv-status-dot--${e.type}`, { "pk-dv-status-dot--pulse": e.pulse }]]) }, [n[0] ||= a("span", { class: "pk-dv-status-dot__point" }, null, -1), e.text ? (p(), i("span", et, v(e.text), 1)) : r("", !0)], 2));
	}
}), [["__scopeId", "data-v-196f0e0a"]]), nt = ["datetime"], rt = /*#__PURE__*/ S(/* @__PURE__ */ Object.assign({ name: "PkDvTime" }, {
	__name: "index",
	props: {
		format: {
			type: String,
			default: "YYYY-MM-DD HH:mm:ss"
		},
		interval: {
			type: Number,
			default: 1e3
		}
	},
	setup(e) {
		let n = e, r = m(/* @__PURE__ */ new Date()), a = [
			"Sun",
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat"
		], o = (e) => String(e).padStart(2, "0"), s = t(() => {
			let e = r.value, t = {
				YYYY: e.getFullYear(),
				MM: o(e.getMonth() + 1),
				DD: o(e.getDate()),
				HH: o(e.getHours()),
				mm: o(e.getMinutes()),
				ss: o(e.getSeconds()),
				ddd: a[e.getDay()]
			};
			return Object.entries(t).reduce((e, [t, n]) => e.replaceAll(t, n), n.format);
		}), c = t(() => r.value.toISOString()), l = window.setInterval(() => {
			r.value = /* @__PURE__ */ new Date();
		}, n.interval);
		return d(() => {
			window.clearInterval(l);
		}), (e, t) => (p(), i("time", {
			class: "pk-dv-time",
			datetime: c.value
		}, v(s.value), 9, nt));
	}
}), [["__scopeId", "data-v-18d9c478"]]), it = [
	$,
	K,
	N,
	O,
	P,
	F,
	G,
	M,
	I,
	$e,
	k,
	Z,
	We,
	tt,
	rt,
	D,
	te,
	j,
	He,
	Y,
	Q,
	C,
	L,
	E,
	q,
	A,
	X,
	R,
	J,
	z,
	B,
	W
], at = (e) => e.replace(/^Pk/, "pk").replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ot = { install: (e) => {
	it.forEach((t) => {
		t?.name && e.component(at(t.name), t);
	});
} };
//#endregion
export { E as PkDvBarChart, D as PkDvBorderBox, O as PkDvCell, C as PkDvChart, te as PkDvDecoration, k as PkDvDigitalNumber, z as PkDvFlylineMap, A as PkDvGaugeChart, B as PkDvGeoPanel, j as PkDvGlowTitle, M as PkDvGradientPanel, N as PkDvGrid, P as PkDvGroup, F as PkDvHeaderTitle, I as PkDvLayer, L as PkDvLineChart, R as PkDvMapCanvas, W as PkDvMapChina, G as PkDvMenuButton, K as PkDvPanel, q as PkDvPieChart, J as PkDvPointMap, Y as PkDvProgress, X as PkDvRadarChart, Z as PkDvRankList, Q as PkDvRingProgress, $ as PkDvScreen, He as PkDvScrollNotice, We as PkDvScrollTable, $e as PkDvStatCard, tt as PkDvStatusDot, rt as PkDvTime, ot as default };
