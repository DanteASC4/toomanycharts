(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) s(n);
  new MutationObserver((n) => {
    for (const r of n)
      if (r.type === 'childList')
        for (const i of r.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function u(n) {
    const r = {};
    return (
      n.integrity && (r.integrity = n.integrity),
      n.referrerPolicy && (r.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === 'use-credentials'
        ? (r.credentials = 'include')
        : n.crossOrigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    );
  }
  function s(n) {
    if (n.ep) return;
    n.ep = !0;
    const r = u(n);
    fetch(n.href, r);
  }
})();
/**
 * anime.js - ESM
 * @version v4.1.1
 * @author Julian Garnier
 * @license MIT
 * @copyright (c) 2025 Julian Garnier
 * @see https://animejs.com
 */ const gt = typeof window < 'u',
  Ds = gt ? window : null,
  nu = gt ? document : null,
  Z = { OBJECT: 0, ATTRIBUTE: 1, CSS: 2, TRANSFORM: 3, CSS_VAR: 4 },
  L = { NUMBER: 0, UNIT: 1, COLOR: 2, COMPLEX: 3 },
  ze = { NONE: 0, AUTO: 1, FORCE: 2 },
  _e = { replace: 0, none: 1, blend: 2 },
  Mr = Symbol(),
  Pn = Symbol(),
  Yi = Symbol(),
  gs = Symbol(),
  U0 = Symbol(),
  G = 1e-11,
  Qi = 1e12,
  qt = 1e3,
  Sn = 120,
  Mt = '',
  ea = (() => {
    const t = new Map();
    return (
      t.set('x', 'translateX'),
      t.set('y', 'translateY'),
      t.set('z', 'translateZ'),
      t
    );
  })(),
  ta = [
    'translateX',
    'translateY',
    'translateZ',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'scale',
    'scaleX',
    'scaleY',
    'scaleZ',
    'skew',
    'skewX',
    'skewY',
    'perspective',
    'matrix',
    'matrix3d',
  ],
  ua = ta.reduce((t, e) => ({ ...t, [e]: e + '(' }), {}),
  Ae = () => {},
  $0 = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,
  H0 = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,
  G0 = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,
  j0 =
    /hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,
  z0 =
    /hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,
  Or = /[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,
  K0 = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,
  W0 = /([a-z])([A-Z])/g,
  X0 = /(\w+)(\([^)]+\)+)/g,
  sa = {
    id: null,
    keyframes: null,
    playbackEase: null,
    playbackRate: 1,
    frameRate: Sn,
    loop: 0,
    reversed: !1,
    alternate: !1,
    autoplay: !0,
    duration: qt,
    delay: 0,
    loopDelay: 0,
    ease: 'out(2)',
    composition: _e.replace,
    modifier: (t) => t,
    onBegin: Ae,
    onBeforeUpdate: Ae,
    onUpdate: Ae,
    onLoop: Ae,
    onPause: Ae,
    onComplete: Ae,
    onRender: Ae,
  },
  J0 = { root: nu },
  ie = { defaults: sa, precision: 4, timeScale: 1, tickThreshold: 200 },
  na = { version: '4.1.1', engine: null };
gt && (Ds.AnimeJS || (Ds.AnimeJS = []), Ds.AnimeJS.push(na));
const Z0 = (t) => t.replace(W0, '$1-$2').toLowerCase(),
  uu = (t, e) => t.indexOf(e) === 0,
  Cu = Date.now,
  ru = Array.isArray,
  Ls = (t) => t && t.constructor === Object,
  Y0 = (t) => typeof t == 'number' && !isNaN(t),
  ms = (t) => typeof t == 'string',
  vu = (t) => typeof t == 'function',
  V = (t) => typeof t > 'u',
  Is = (t) => V(t) || t === null,
  ra = (t) => gt && t instanceof SVGElement,
  ia = (t) => $0.test(t),
  aa = (t) => uu(t, 'rgb'),
  oa = (t) => uu(t, 'hsl'),
  Q0 = (t) => ia(t) || aa(t) || oa(t),
  Yu = (t) => !ie.defaults.hasOwnProperty(t),
  Bu = (t) => (ms(t) ? parseFloat(t) : t),
  Jt = Math.pow,
  ec = Math.sqrt,
  tc = Math.sin,
  uc = Math.cos,
  xn = Math.abs,
  sc = Math.ceil,
  qn = Math.floor,
  nc = Math.asin,
  _u = Math.PI,
  yn = Math.round,
  ge = (t, e, u) => (t < e ? e : t > u ? u : t),
  kr = {},
  Y = (t, e) => {
    if (e < 0) return t;
    if (!e) return yn(t);
    let u = kr[e];
    return u || (u = kr[e] = 10 ** e), yn(t * u) / u;
  },
  rc = (t, e) =>
    ru(e)
      ? e.reduce((u, s) => (xn(s - t) < xn(u - t) ? s : u))
      : e
      ? yn(t / e) * e
      : t,
  xt = (t, e, u) => t + (e - t) * u,
  Bn = (t, e, u) => {
    const s = 10 ** (u || 0);
    return qn((Math.random() * (e - t + 1 / s) + t) * s) / s;
  },
  ic = (t) => {
    let e = t.length,
      u,
      s;
    for (; e; ) (s = Bn(0, --e)), (u = t[e]), (t[e] = t[s]), (t[s] = u);
    return t;
  },
  Fn = (t) => (t === 1 / 0 ? Qi : t === -1 / 0 ? -1e12 : t),
  xu = (t) => (t <= G ? G : Fn(Y(t, 11))),
  we = (t) => (ru(t) ? [...t] : t),
  ac = (t, e) => {
    const u = { ...t };
    for (let s in e) {
      const n = t[s];
      u[s] = V(n) ? e[s] : n;
    }
    return u;
  },
  Q = (t, e, u, s = '_prev', n = '_next') => {
    let r = t._head,
      i = n;
    for (u && ((r = t._tail), (i = s)); r; ) {
      const a = r[i];
      e(r), (r = a);
    }
  },
  yt = (t, e, u = '_prev', s = '_next') => {
    const n = e[u],
      r = e[s];
    n ? (n[s] = r) : (t._head = r),
      r ? (r[u] = n) : (t._tail = n),
      (e[u] = null),
      (e[s] = null);
  },
  eu = (t, e, u, s = '_prev', n = '_next') => {
    let r = t._tail;
    for (; r && u && u(r, e); ) r = r[s];
    const i = r ? r[n] : t._head;
    r ? (r[n] = e) : (t._head = e),
      i ? (i[s] = e) : (t._tail = e),
      (e[s] = r),
      (e[n] = i);
  },
  oc = (t) => {
    let e;
    return (...u) => {
      let s, n, r, i;
      e &&
        ((s = e.currentIteration),
        (n = e.iterationProgress),
        (r = e.reversed),
        (i = e._alternate),
        e.revert());
      const a = t(...u);
      return (
        a && !vu(a) && a.revert && (e = a),
        V(n) ||
          ((e.currentIteration = s),
          (e.iterationProgress = (i && s % 2 ? !r : r) ? 1 - n : n)),
        a || Ae
      );
    };
  };
class ca {
  constructor(e = 0) {
    (this.deltaTime = 0),
      (this._currentTime = e),
      (this._elapsedTime = e),
      (this._startTime = e),
      (this._lastTime = e),
      (this._scheduledTime = 0),
      (this._frameDuration = Y(qt / Sn, 0)),
      (this._fps = Sn),
      (this._speed = 1),
      (this._hasChildren = !1),
      (this._head = null),
      (this._tail = null);
  }
  get fps() {
    return this._fps;
  }
  set fps(e) {
    const u = this._frameDuration,
      s = +e,
      n = s < G ? G : s,
      r = Y(qt / n, 0);
    (this._fps = n), (this._frameDuration = r), (this._scheduledTime += r - u);
  }
  get speed() {
    return this._speed;
  }
  set speed(e) {
    const u = +e;
    this._speed = u < G ? G : u;
  }
  requestTick(e) {
    const u = this._scheduledTime,
      s = this._elapsedTime;
    if (((this._elapsedTime += e - s), s < u)) return ze.NONE;
    const n = this._frameDuration,
      r = s - u;
    return (this._scheduledTime += r < n ? n : r), ze.AUTO;
  }
  computeDeltaTime(e) {
    const u = e - this._lastTime;
    return (this.deltaTime = u), (this._lastTime = e), u;
  }
}
const Qu = (t, e, u, s, n) => {
    const r = t.parent,
      i = t.duration,
      a = t.completed,
      o = t.iterationDuration,
      c = t.iterationCount,
      l = t._currentIteration,
      f = t._loopDelay,
      p = t._reversed,
      h = t._alternate,
      m = t._hasChildren,
      v = t._delay,
      _ = t._currentTime,
      A = v + o,
      F = e - v,
      M = ge(_, -v, i),
      U = ge(F, -v, i),
      N = F - _,
      O = U > 0,
      ee = U >= i,
      z = i <= G,
      Ce = n === ze.FORCE;
    let ce = 0,
      q = F,
      W = 0;
    if (c > 1) {
      const me = ~~(U / (o + (ee ? 0 : f)));
      (t._currentIteration = ge(me, 0, c)),
        ee && t._currentIteration--,
        (ce = t._currentIteration % 2),
        (q = U % (o + f) || 0);
    }
    const be = p ^ (h && ce),
      te = t._ease;
    let X = ee ? (be ? 0 : i) : be ? o - q : q;
    te && (X = o * te(X / o) || 0);
    const I = (r ? r.backwards : F < _) ? !be : !!be;
    if (
      ((t._currentTime = F),
      (t._iterationTime = X),
      (t.backwards = I),
      O && !t.began
        ? ((t.began = !0), !u && !(r && (I || !r.began)) && t.onBegin(t))
        : F <= 0 && (t.began = !1),
      !u && !m && O && t._currentIteration !== l && t.onLoop(t),
      Ce ||
        (n === ze.AUTO &&
          ((e >= v && e <= A) || (e <= v && M > v) || (e >= A && M !== i))) ||
        (X >= A && M !== i) ||
        (X <= v && M > 0) ||
        (e <= M && M === i && a) ||
        (ee && !a && z))
    ) {
      if ((O && (t.computeDeltaTime(M), u || t.onBeforeUpdate(t)), !m)) {
        const me = Ce || (I ? N * -1 : N) >= ie.tickThreshold,
          K = t._offset + (r ? r._offset : 0) + v + X;
        let y = t._head,
          se,
          ve,
          Ht,
          Nt,
          Ve = 0;
        for (; y; ) {
          const Re = y._composition,
            Ue = y._currentTime,
            Pe = y._changeDuration,
            hu = y._absoluteStartTime + y._changeDuration,
            ut = y._nextRep,
            $e = y._prevRep,
            lt = Re !== _e.none;
          if (
            (me ||
              ((Ue !== Pe || K <= hu + (ut ? ut._delay : 0)) &&
                (Ue !== 0 || K >= y._absoluteStartTime))) &&
            (!lt ||
              (!y._isOverridden &&
                (!y._isOverlapped || K <= hu) &&
                (!ut || ut._isOverridden || K <= ut._absoluteStartTime) &&
                (!$e ||
                  $e._isOverridden ||
                  K >= $e._absoluteStartTime + $e._changeDuration + y._delay)))
          ) {
            const dt = (y._currentTime = ge(X - y._startTime, 0, Pe)),
              le = y._ease(dt / y._updateDuration),
              De = y._modifier,
              Ke = y._valueType,
              Ee = y._tweenType,
              Le = Ee === Z.OBJECT,
              Gt = Ke === L.NUMBER,
              st = (Gt && Le) || le === 0 || le === 1 ? -1 : ie.precision;
            let Ie, jt;
            if (Gt) Ie = jt = De(Y(xt(y._fromNumber, y._toNumber, le), st));
            else if (Ke === L.UNIT)
              (jt = De(Y(xt(y._fromNumber, y._toNumber, le), st))),
                (Ie = `${jt}${y._unit}`);
            else if (Ke === L.COLOR) {
              const ne = y._fromNumbers,
                nt = y._toNumbers,
                rt = Y(ge(De(xt(ne[0], nt[0], le)), 0, 255), 0),
                ft = Y(ge(De(xt(ne[1], nt[1], le)), 0, 255), 0),
                ku = Y(ge(De(xt(ne[2], nt[2], le)), 0, 255), 0),
                zt = ge(De(Y(xt(ne[3], nt[3], le), st)), 0, 1);
              if (((Ie = `rgba(${rt},${ft},${ku},${zt})`), lt)) {
                const Rt = y._numbers;
                (Rt[0] = rt), (Rt[1] = ft), (Rt[2] = ku), (Rt[3] = zt);
              }
            } else if (Ke === L.COMPLEX) {
              Ie = y._strings[0];
              for (let ne = 0, nt = y._toNumbers.length; ne < nt; ne++) {
                const rt = De(
                    Y(xt(y._fromNumbers[ne], y._toNumbers[ne], le), st)
                  ),
                  ft = y._strings[ne + 1];
                (Ie += `${ft ? rt + ft : rt}`), lt && (y._numbers[ne] = rt);
              }
            }
            if ((lt && (y._number = jt), !s && Re !== _e.blend)) {
              const ne = y.property;
              (se = y.target),
                Le
                  ? (se[ne] = Ie)
                  : Ee === Z.ATTRIBUTE
                  ? se.setAttribute(ne, Ie)
                  : ((ve = se.style),
                    Ee === Z.TRANSFORM
                      ? (se !== Ht && ((Ht = se), (Nt = se[gs])),
                        (Nt[ne] = Ie),
                        (Ve = 1))
                      : Ee === Z.CSS
                      ? (ve[ne] = Ie)
                      : Ee === Z.CSS_VAR && ve.setProperty(ne, Ie)),
                O && (W = 1);
            } else y._value = Ie;
          }
          if (Ve && y._renderTransforms) {
            let dt = Mt;
            for (let le in Nt) dt += `${ua[le]}${Nt[le]}) `;
            (ve.transform = dt), (Ve = 0);
          }
          y = y._next;
        }
        !u && W && t.onRender(t);
      }
      !u && O && t.onUpdate(t);
    }
    return (
      r && z
        ? !u &&
          ((r.began && !I && F >= i && !a) || (I && F <= G && a)) &&
          (t.onComplete(t), (t.completed = !I))
        : O && ee
        ? c === 1 / 0
          ? (t._startTime += t.duration)
          : t._currentIteration >= c - 1 &&
            ((t.paused = !0),
            !a &&
              !m &&
              ((t.completed = !0),
              !u &&
                !(r && (I || !r.began)) &&
                (t.onComplete(t), t._resolve(t))))
        : (t.completed = !1),
      W
    );
  },
  Zt = (t, e, u, s, n) => {
    const r = t._currentIteration;
    if ((Qu(t, e, u, s, n), t._hasChildren)) {
      const i = t,
        a = i.backwards,
        o = s ? e : i._iterationTime,
        c = Cu();
      let l = 0,
        f = !0;
      if (!s && i._currentIteration !== r) {
        const p = i.iterationDuration;
        Q(i, (h) => {
          if (!a)
            !h.completed &&
              !h.backwards &&
              h._currentTime < h.iterationDuration &&
              Qu(h, p, u, 1, ze.FORCE),
              (h.began = !1),
              (h.completed = !1);
          else {
            const m = h.duration,
              v = h._offset + h._delay,
              _ = v + m;
            !u && m <= G && (!v || _ === p) && h.onComplete(h);
          }
        }),
          u || i.onLoop(i);
      }
      Q(
        i,
        (p) => {
          const h = Y((o - p._offset) * p._speed, 12),
            m = p._fps < i._fps ? p.requestTick(c) : n;
          (l += Qu(p, h, u, s, m)), !p.completed && f && (f = !1);
        },
        a
      ),
        !u && l && i.onRender(i),
        f &&
          i._currentTime >= i.duration &&
          ((i.paused = !0),
          i.completed ||
            ((i.completed = !0), u || (i.onComplete(i), i._resolve(i))));
    }
  },
  su = { animation: null, update: Ae },
  cc = (t) => {
    let e = su.animation;
    return (
      e ||
        ((e = {
          duration: G,
          computeDeltaTime: Ae,
          _offset: 0,
          _delay: 0,
          _head: null,
          _tail: null,
        }),
        (su.animation = e),
        (su.update = () => {
          t.forEach((u) => {
            for (let s in u) {
              const n = u[s],
                r = n._head;
              if (r) {
                const i = r._valueType,
                  a =
                    i === L.COMPLEX || i === L.COLOR
                      ? we(r._fromNumbers)
                      : null;
                let o = r._fromNumber,
                  c = n._tail;
                for (; c && c !== r; ) {
                  if (a)
                    for (let l = 0, f = c._numbers.length; l < f; l++)
                      a[l] += c._numbers[l];
                  else o += c._number;
                  c = c._prevAdd;
                }
                (r._toNumber = o), (r._toNumbers = a);
              }
            }
          }),
            Qu(e, 1, 1, 0, ze.FORCE);
        })),
      e
    );
  },
  la = gt ? requestAnimationFrame : setImmediate,
  lc = gt ? cancelAnimationFrame : clearImmediate;
class dc extends ca {
  constructor(e) {
    super(e),
      (this.useDefaultMainLoop = !0),
      (this.pauseOnDocumentHidden = !0),
      (this.defaults = sa),
      (this.paused = !!(gt && nu.hidden)),
      (this.reqId = null);
  }
  update() {
    const e = (this._currentTime = Cu());
    if (this.requestTick(e)) {
      this.computeDeltaTime(e);
      const u = this._speed,
        s = this._fps;
      let n = this._head;
      for (; n; ) {
        const r = n._next;
        n.paused
          ? (yt(this, n),
            (this._hasChildren = !!this._tail),
            (n._running = !1),
            n.completed && !n._cancelled && n.cancel())
          : Zt(
              n,
              (e - n._startTime) * n._speed * u,
              0,
              0,
              n._fps < s ? n.requestTick(e) : ze.AUTO
            ),
          (n = r);
      }
      su.update();
    }
  }
  wake() {
    return (
      this.useDefaultMainLoop &&
        !this.reqId &&
        !this.paused &&
        (this.reqId = la(da)),
      this
    );
  }
  pause() {
    return (this.paused = !0), fc();
  }
  resume() {
    if (this.paused)
      return (this.paused = !1), Q(this, (e) => e.resetTime()), this.wake();
  }
  get speed() {
    return this._speed * (ie.timeScale === 1 ? 1 : qt);
  }
  set speed(e) {
    (this._speed = e * ie.timeScale), Q(this, (u) => (u.speed = u._speed));
  }
  get timeUnit() {
    return ie.timeScale === 1 ? 'ms' : 's';
  }
  set timeUnit(e) {
    const s = e === 's',
      n = s ? 0.001 : 1;
    if (ie.timeScale !== n) {
      (ie.timeScale = n), (ie.tickThreshold = 200 * n);
      const r = s ? 0.001 : qt;
      (this.defaults.duration *= r), (this._speed *= r);
    }
  }
  get precision() {
    return ie.precision;
  }
  set precision(e) {
    ie.precision = e;
  }
}
const re = (() => {
    const t = new dc(Cu());
    return (
      gt &&
        ((na.engine = t),
        nu.addEventListener('visibilitychange', () => {
          t.pauseOnDocumentHidden && (nu.hidden ? t.pause() : t.resume());
        })),
      t
    );
  })(),
  da = () => {
    re._head ? ((re.reqId = la(da)), re.update()) : (re.reqId = 0);
  },
  fc = () => (lc(re.reqId), (re.reqId = 0), re),
  hc = (t, e, u) => {
    const s = t.style.transform;
    let n;
    if (s) {
      const r = t[gs];
      let i;
      for (; (i = X0.exec(s)); ) {
        const a = i[1],
          o = i[2].slice(1, -1);
        (r[a] = o), a === e && ((n = o), u && (u[e] = o));
      }
    }
    return s && !V(n)
      ? n
      : uu(e, 'scale')
      ? '1'
      : uu(e, 'rotate') || uu(e, 'skew')
      ? '0deg'
      : '0px';
  };
function Pr(t) {
  const e = ms(t) ? J0.root.querySelectorAll(t) : t;
  if (e instanceof NodeList || e instanceof HTMLCollection) return e;
}
function fa(t) {
  if (Is(t)) return [];
  if (ru(t)) {
    const u = t.flat(1 / 0),
      s = [];
    for (let n = 0, r = u.length; n < r; n++) {
      const i = u[n];
      if (!Is(i)) {
        const a = Pr(i);
        if (a)
          for (let o = 0, c = a.length; o < c; o++) {
            const l = a[o];
            if (!Is(l)) {
              let f = !1;
              for (let p = 0, h = s.length; p < h; p++)
                if (s[p] === l) {
                  f = !0;
                  break;
                }
              f || s.push(l);
            }
          }
        else {
          let o = !1;
          for (let c = 0, l = s.length; c < l; c++)
            if (s[c] === i) {
              o = !0;
              break;
            }
          o || s.push(i);
        }
      }
    }
    return s;
  }
  if (!gt) return [t];
  const e = Pr(t);
  return e ? Array.from(e) : [t];
}
function Vn(t) {
  const e = fa(t),
    u = e.length;
  if (u)
    for (let s = 0; s < u; s++) {
      const n = e[s];
      if (!n[Mr]) {
        n[Mr] = !0;
        const r = ra(n);
        (n.nodeType || r) && ((n[Pn] = !0), (n[Yi] = r), (n[gs] = {}));
      }
    }
  return e;
}
const bc = ['opacity', 'rotate', 'overflow', 'color'],
  pc = (t, e) => {
    if (bc.includes(e)) return !1;
    if (t.getAttribute(e) || e in t) {
      if (e === 'scale') {
        const u = t.parentNode;
        return u && u.tagName === 'filter';
      }
      return !0;
    }
  },
  gc = (t) => {
    const e = H0.exec(t) || G0.exec(t),
      u = V(e[4]) ? 1 : +e[4];
    return [+e[1], +e[2], +e[3], u];
  },
  mc = (t) => {
    const e = t.length,
      u = e === 4 || e === 5;
    return [
      +('0x' + t[1] + t[u ? 1 : 2]),
      +('0x' + t[u ? 2 : 3] + t[u ? 2 : 4]),
      +('0x' + t[u ? 3 : 5] + t[u ? 3 : 6]),
      e === 5 || e === 9
        ? +(+('0x' + t[u ? 4 : 7] + t[u ? 4 : 8]) / 255).toFixed(3)
        : 1,
    ];
  },
  Ms = (t, e, u) => (
    u < 0 && (u += 1),
    u > 1 && (u -= 1),
    u < 1 / 6
      ? t + (e - t) * 6 * u
      : u < 1 / 2
      ? e
      : u < 2 / 3
      ? t + (e - t) * (2 / 3 - u) * 6
      : t
  ),
  Sc = (t) => {
    const e = j0.exec(t) || z0.exec(t),
      u = +e[1] / 360,
      s = +e[2] / 100,
      n = +e[3] / 100,
      r = V(e[4]) ? 1 : +e[4];
    let i, a, o;
    if (s === 0) i = a = o = n;
    else {
      const c = n < 0.5 ? n * (1 + s) : n + s - n * s,
        l = 2 * n - c;
      (i = Y(Ms(l, c, u + 1 / 3) * 255, 0)),
        (a = Y(Ms(l, c, u) * 255, 0)),
        (o = Y(Ms(l, c, u - 1 / 3) * 255, 0));
    }
    return [i, a, o, r];
  },
  xc = (t) => (aa(t) ? gc(t) : ia(t) ? mc(t) : oa(t) ? Sc(t) : [0, 0, 0, 1]),
  xe = (t, e) => (V(t) ? e : t),
  mt = (t, e, u, s, n) => {
    if (vu(t)) {
      const r = () => {
        const i = t(e, u, s);
        return isNaN(+i) ? i || 0 : +i;
      };
      return n && (n.func = r), r();
    } else return t;
  },
  Un = (t, e) =>
    t[Pn]
      ? t[Yi] && pc(t, e)
        ? Z.ATTRIBUTE
        : ta.includes(e) || ea.get(e)
        ? Z.TRANSFORM
        : uu(e, '--')
        ? Z.CSS_VAR
        : e in t.style
        ? Z.CSS
        : e in t
        ? Z.OBJECT
        : Z.ATTRIBUTE
      : Z.OBJECT,
  qr = (t, e, u) => {
    const s = t.style[e];
    s && u && (u[e] = s);
    const n = s || getComputedStyle(t[U0] || t).getPropertyValue(e);
    return n === 'auto' ? '0' : n;
  },
  Yt = (t, e, u, s) => {
    const n = V(u) ? Un(t, e) : u;
    return n === Z.OBJECT
      ? t[e] || 0
      : n === Z.ATTRIBUTE
      ? t.getAttribute(e)
      : n === Z.TRANSFORM
      ? hc(t, e, s)
      : n === Z.CSS_VAR
      ? qr(t, e, s).trimStart()
      : qr(t, e, s);
  },
  Br = (t, e, u) => (u === '-' ? t - e : u === '+' ? t + e : t * e),
  $n = () => ({ t: L.NUMBER, n: 0, u: null, o: null, d: null, s: null }),
  Xe = (t, e) => {
    if (
      ((e.t = L.NUMBER),
      (e.n = 0),
      (e.u = null),
      (e.o = null),
      (e.d = null),
      (e.s = null),
      !t)
    )
      return e;
    const u = +t;
    if (isNaN(u)) {
      let s = t;
      s[1] === '=' && ((e.o = s[0]), (s = s.slice(2)));
      const n = s.includes(' ') ? !1 : K0.exec(s);
      if (n) return (e.t = L.UNIT), (e.n = +n[1]), (e.u = n[2]), e;
      if (e.o) return (e.n = +s), e;
      if (Q0(s)) return (e.t = L.COLOR), (e.d = xc(s)), e;
      {
        const r = s.match(Or);
        return (
          (e.t = L.COMPLEX),
          (e.d = r ? r.map(Number) : []),
          (e.s = s.split(Or) || []),
          e
        );
      }
    } else return (e.n = u), e;
  },
  Fr = (t, e) => (
    (e.t = t._valueType),
    (e.n = t._toNumber),
    (e.u = t._unit),
    (e.o = null),
    (e.d = we(t._toNumbers)),
    (e.s = we(t._strings)),
    e
  ),
  Ge = $n(),
  is = { _rep: new WeakMap(), _add: new Map() },
  Hn = (t, e, u = '_rep') => {
    const s = is[u];
    let n = s.get(t);
    return (
      n || ((n = {}), s.set(t, n)),
      n[e] ? n[e] : (n[e] = { _head: null, _tail: null })
    );
  },
  yc = (t, e) => t._isOverridden || t._absoluteStartTime > e._absoluteStartTime,
  es = (t) => {
    (t._isOverlapped = 1),
      (t._isOverridden = 1),
      (t._changeDuration = G),
      (t._currentTime = G);
  },
  ha = (t, e) => {
    const u = t._composition;
    if (u === _e.replace) {
      const s = t._absoluteStartTime;
      eu(e, t, yc, '_prevRep', '_nextRep');
      const n = t._prevRep;
      if (n) {
        const r = n.parent,
          i = n._absoluteStartTime + n._changeDuration;
        if (
          t.parent.id !== r.id &&
          r.iterationCount > 1 &&
          i + (r.duration - r.iterationDuration) > s
        ) {
          es(n);
          let c = n._prevRep;
          for (; c && c.parent.id === r.id; ) es(c), (c = c._prevRep);
        }
        const a = s - t._delay;
        if (i > a) {
          const c = n._startTime,
            l = i - (c + n._updateDuration);
          (n._changeDuration = a - l - c),
            (n._currentTime = n._changeDuration),
            (n._isOverlapped = 1),
            n._changeDuration < G && es(n);
        }
        let o = !0;
        if (
          (Q(r, (c) => {
            c._isOverlapped || (o = !1);
          }),
          o)
        ) {
          const c = r.parent;
          if (c) {
            let l = !0;
            Q(c, (f) => {
              f !== r &&
                Q(f, (p) => {
                  p._isOverlapped || (l = !1);
                });
            }),
              l && c.cancel();
          } else r.cancel();
        }
      }
    } else if (u === _e.blend) {
      const s = Hn(t.target, t.property, '_add'),
        n = cc(is._add);
      let r = s._head;
      r ||
        ((r = { ...t }),
        (r._composition = _e.replace),
        (r._updateDuration = G),
        (r._startTime = 0),
        (r._numbers = we(t._fromNumbers)),
        (r._number = 0),
        (r._next = null),
        (r._prev = null),
        eu(s, r),
        eu(n, r));
      const i = t._toNumber;
      if (
        ((t._fromNumber = r._fromNumber - i),
        (t._toNumber = 0),
        (t._numbers = we(t._fromNumbers)),
        (t._number = 0),
        (r._fromNumber = i),
        t._toNumbers)
      ) {
        const a = we(t._toNumbers);
        a &&
          a.forEach((o, c) => {
            (t._fromNumbers[c] = r._fromNumbers[c] - o), (t._toNumbers[c] = 0);
          }),
          (r._fromNumbers = a);
      }
      eu(s, t, null, '_prevAdd', '_nextAdd');
    }
    return t;
  },
  ba = (t) => {
    const e = t._composition;
    if (e !== _e.none) {
      const u = t.target,
        s = t.property,
        i = is._rep.get(u)[s];
      if ((yt(i, t, '_prevRep', '_nextRep'), e === _e.blend)) {
        const a = is._add,
          o = a.get(u);
        if (!o) return;
        const c = o[s],
          l = su.animation;
        yt(c, t, '_prevAdd', '_nextAdd');
        const f = c._head;
        if (f && f === c._tail) {
          yt(c, f, '_prevAdd', '_nextAdd'), yt(l, f);
          let p = !0;
          for (let h in o)
            if (o[h]._head) {
              p = !1;
              break;
            }
          p && a.delete(u);
        }
      }
    }
    return t;
  },
  Vr = (t) => ((t.paused = !0), (t.began = !1), (t.completed = !1), t),
  Tn = (t) => (
    t._cancelled &&
      (t._hasChildren
        ? Q(t, Tn)
        : Q(t, (e) => {
            e._composition !== _e.none && ha(e, Hn(e.target, e.property));
          }),
      (t._cancelled = 0)),
    t
  );
let Tc = 0;
class pa extends ca {
  constructor(e = {}, u = null, s = 0) {
    super(0);
    const {
        id: n,
        delay: r,
        duration: i,
        reversed: a,
        alternate: o,
        loop: c,
        loopDelay: l,
        autoplay: f,
        frameRate: p,
        playbackRate: h,
        onComplete: m,
        onLoop: v,
        onPause: _,
        onBegin: A,
        onBeforeUpdate: F,
        onUpdate: M,
      } = e,
      U = u ? 0 : re._elapsedTime,
      N = u ? u.defaults : ie.defaults,
      O = vu(r) || V(r) ? N.delay : +r,
      ee = vu(i) || V(i) ? 1 / 0 : +i,
      z = xe(c, N.loop),
      Ce = xe(l, N.loopDelay),
      ce = z === !0 || z === 1 / 0 || z < 0 ? 1 / 0 : z + 1;
    let q = 0;
    if (u) q = s;
    else {
      let W = Cu();
      re.paused && (re.requestTick(W), (W = re._elapsedTime)),
        (q = W - re._startTime);
    }
    (this.id = V(n) ? ++Tc : n),
      (this.parent = u),
      (this.duration = Fn((ee + Ce) * ce - Ce) || G),
      (this.backwards = !1),
      (this.paused = !0),
      (this.began = !1),
      (this.completed = !1),
      (this.onBegin = A || N.onBegin),
      (this.onBeforeUpdate = F || N.onBeforeUpdate),
      (this.onUpdate = M || N.onUpdate),
      (this.onLoop = v || N.onLoop),
      (this.onPause = _ || N.onPause),
      (this.onComplete = m || N.onComplete),
      (this.iterationDuration = ee),
      (this.iterationCount = ce),
      (this._autoplay = u ? !1 : xe(f, N.autoplay)),
      (this._offset = q),
      (this._delay = O),
      (this._loopDelay = Ce),
      (this._iterationTime = 0),
      (this._currentIteration = 0),
      (this._resolve = Ae),
      (this._running = !1),
      (this._reversed = +xe(a, N.reversed)),
      (this._reverse = this._reversed),
      (this._cancelled = 0),
      (this._alternate = xe(o, N.alternate)),
      (this._prev = null),
      (this._next = null),
      (this._elapsedTime = U),
      (this._startTime = U),
      (this._lastTime = U),
      (this._fps = xe(p, N.frameRate)),
      (this._speed = xe(h, N.playbackRate));
  }
  get cancelled() {
    return !!this._cancelled;
  }
  set cancelled(e) {
    e ? this.cancel() : this.reset(1).play();
  }
  get currentTime() {
    return ge(Y(this._currentTime, ie.precision), -this._delay, this.duration);
  }
  set currentTime(e) {
    const u = this.paused;
    this.pause().seek(+e), u || this.resume();
  }
  get iterationCurrentTime() {
    return Y(this._iterationTime, ie.precision);
  }
  set iterationCurrentTime(e) {
    this.currentTime = this.iterationDuration * this._currentIteration + e;
  }
  get progress() {
    return ge(Y(this._currentTime / this.duration, 10), 0, 1);
  }
  set progress(e) {
    this.currentTime = this.duration * e;
  }
  get iterationProgress() {
    return ge(Y(this._iterationTime / this.iterationDuration, 10), 0, 1);
  }
  set iterationProgress(e) {
    const u = this.iterationDuration;
    this.currentTime = u * this._currentIteration + u * e;
  }
  get currentIteration() {
    return this._currentIteration;
  }
  set currentIteration(e) {
    this.currentTime =
      this.iterationDuration * ge(+e, 0, this.iterationCount - 1);
  }
  get reversed() {
    return !!this._reversed;
  }
  set reversed(e) {
    e ? this.reverse() : this.play();
  }
  get speed() {
    return super.speed;
  }
  set speed(e) {
    (super.speed = e), this.resetTime();
  }
  reset(e = 0) {
    return (
      Tn(this),
      this._reversed && !this._reverse && (this.reversed = !1),
      (this._iterationTime = this.iterationDuration),
      Zt(this, 0, 1, e, ze.FORCE),
      Vr(this),
      this._hasChildren && Q(this, Vr),
      this
    );
  }
  init(e = 0) {
    (this.fps = this._fps),
      (this.speed = this._speed),
      !e && this._hasChildren && Zt(this, this.duration, 1, e, ze.FORCE),
      this.reset(e);
    const u = this._autoplay;
    return u === !0 ? this.resume() : u && !V(u.linked) && u.link(this), this;
  }
  resetTime() {
    const e = 1 / (this._speed * re._speed);
    return (
      (this._startTime = Cu() - (this._currentTime + this._delay) * e), this
    );
  }
  pause() {
    return this.paused ? this : ((this.paused = !0), this.onPause(this), this);
  }
  resume() {
    return this.paused
      ? ((this.paused = !1),
        this.duration <= G && !this._hasChildren
          ? Zt(this, G, 0, 0, ze.FORCE)
          : (this._running ||
              (eu(re, this), (re._hasChildren = !0), (this._running = !0)),
            this.resetTime(),
            (this._startTime -= 12),
            re.wake()),
        this)
      : this;
  }
  restart() {
    return this.reset(0).resume();
  }
  seek(e, u = 0, s = 0) {
    Tn(this), (this.completed = !1);
    const n = this.paused;
    return (
      (this.paused = !0),
      Zt(this, e + this._delay, ~~u, ~~s, ze.AUTO),
      n ? this : this.resume()
    );
  }
  alternate() {
    const e = this._reversed,
      u = this.iterationCount,
      s = this.iterationDuration,
      n = u === 1 / 0 ? qn(Qi / s) : u;
    return (
      (this._reversed = +(this._alternate && !(n % 2) ? e : !e)),
      u === 1 / 0
        ? (this.iterationProgress = this._reversed
            ? 1 - this.iterationProgress
            : this.iterationProgress)
        : this.seek(s * n - this._currentTime),
      this.resetTime(),
      this
    );
  }
  play() {
    return this._reversed && this.alternate(), this.resume();
  }
  reverse() {
    return this._reversed || this.alternate(), this.resume();
  }
  cancel() {
    return (
      this._hasChildren ? Q(this, (e) => e.cancel(), !0) : Q(this, ba),
      (this._cancelled = 1),
      this.pause()
    );
  }
  stretch(e) {
    const u = this.duration,
      s = xu(e);
    if (u === s) return this;
    const n = e / u,
      r = e <= G;
    return (
      (this.duration = r ? G : s),
      (this.iterationDuration = r ? G : xu(this.iterationDuration * n)),
      (this._offset *= n),
      (this._delay *= n),
      (this._loopDelay *= n),
      this
    );
  }
  revert() {
    Zt(this, 0, 1, 0, ze.AUTO);
    const e = this._autoplay;
    return e && e.linked && e.linked === this && e.revert(), this.cancel();
  }
  complete() {
    return this.seek(this.duration).cancel();
  }
  then(e = Ae) {
    const u = this.then,
      s = () => {
        (this.then = null), e(this), (this.then = u), (this._resolve = Ae);
      };
    return new Promise(
      (n) => (
        (this._resolve = () => n(s())), this.completed && this._resolve(), this
      )
    );
  }
}
const iu = (t) => t,
  ga = (t, e, u) =>
    (((1 - 3 * u + 3 * e) * t + (3 * u - 6 * e)) * t + 3 * e) * t,
  Cc = (t, e, u) => {
    let s = 0,
      n = 1,
      r,
      i,
      a = 0;
    do (i = s + (n - s) / 2), (r = ga(i, e, u) - t), r > 0 ? (n = i) : (s = i);
    while (xn(r) > 1e-7 && ++a < 100);
    return i;
  },
  vc = (t = 0.5, e = 0, u = 0.5, s = 1) =>
    t === e && u === s
      ? iu
      : (n) => (n === 0 || n === 1 ? n : ga(Cc(n, t, u), e, s)),
  Ec = (t = 10, e) => {
    const u = e ? sc : qn;
    return (s) => u(ge(s, 0, 1) * t) * (1 / t);
  },
  ma = (...t) => {
    const e = t.length;
    if (!e) return iu;
    const u = e - 1,
      s = t[0],
      n = t[u],
      r = [0],
      i = [Bu(s)];
    for (let a = 1; a < u; a++) {
      const o = t[a],
        c = ms(o) ? o.trim().split(' ') : [o],
        l = c[0],
        f = c[1];
      r.push(V(f) ? a / u : Bu(f) / 100), i.push(Bu(l));
    }
    return (
      i.push(Bu(n)),
      r.push(1),
      function (o) {
        for (let c = 1, l = r.length; c < l; c++) {
          const f = r[c];
          if (o <= f) {
            const p = r[c - 1],
              h = i[c - 1];
            return h + ((i[c] - h) * (o - p)) / (f - p);
          }
        }
        return i[i.length - 1];
      }
    );
  },
  wc = (t = 10, e = 1) => {
    const u = [0],
      s = t - 1;
    for (let n = 1; n < s; n++) {
      const r = u[n - 1],
        i = n / s,
        a = (n + 1) / s,
        o = i + (a - i) * Math.random(),
        c = i * (1 - e) + o * e;
      u.push(ge(c, r, 1));
    }
    return u.push(1), ma(...u);
  },
  Ac = _u / 2,
  Ur = _u * 2,
  bu =
    (t = 1.68) =>
    (e) =>
      Jt(e, +t),
  $r = {
    [Mt]: bu,
    Quad: bu(2),
    Cubic: bu(3),
    Quart: bu(4),
    Quint: bu(5),
    Sine: (t) => 1 - uc(t * Ac),
    Circ: (t) => 1 - ec(1 - t * t),
    Expo: (t) => (t ? Jt(2, 10 * t - 10) : 0),
    Bounce: (t) => {
      let e,
        u = 4;
      for (; t < ((e = Jt(2, --u)) - 1) / 11; );
      return 1 / Jt(4, 3 - u) - 7.5625 * Jt((e * 3 - 2) / 22 - t, 2);
    },
    Back:
      (t = 1.70158) =>
      (e) =>
        (+t + 1) * e * e * e - +t * e * e,
    Elastic: (t = 1, e = 0.3) => {
      const u = ge(+t, 1, 10),
        s = ge(+e, G, 2),
        n = (s / Ur) * nc(1 / u),
        r = Ur / s;
      return (i) =>
        i === 0 || i === 1
          ? i
          : -u * Jt(2, -10 * (1 - i)) * tc((1 - i - n) * r);
    },
  },
  Cn = {
    in: (t) => (e) => t(e),
    out: (t) => (e) => 1 - t(1 - e),
    inOut: (t) => (e) => e < 0.5 ? t(e * 2) / 2 : 1 - t(e * -2 + 2) / 2,
    outIn: (t) => (e) =>
      e < 0.5 ? (1 - t(1 - e * 2)) / 2 : (t(e * 2 - 1) + 1) / 2,
  },
  _c = (t, e, u) => {
    if (u[t]) return u[t];
    if (t.indexOf('(') <= -1) {
      const n =
        Cn[t] || t.includes('Back') || t.includes('Elastic') ? e[t]() : e[t];
      return n ? (u[t] = n) : iu;
    } else {
      const s = t.slice(0, -1).split('('),
        n = e[s[0]];
      return n ? (u[t] = n(...s[1].split(','))) : iu;
    }
  },
  Nc = (() => {
    const t = { linear: ma, irregular: wc, steps: Ec, cubicBezier: vc };
    for (let e in Cn)
      for (let u in $r) {
        const s = $r[u],
          n = Cn[e];
        t[e + u] =
          u === Mt || u === 'Back' || u === 'Elastic'
            ? (r, i) => n(s(r, i))
            : n(s);
      }
    return t;
  })(),
  Rc = { linear: iu },
  Hr = (t) => (vu(t) ? t : ms(t) ? _c(t, Nc, Rc) : iu),
  Gr = {},
  Gn = (t, e, u) => {
    if (u === Z.TRANSFORM) {
      const s = ea.get(t);
      return s || t;
    } else if (u === Z.CSS || (u === Z.ATTRIBUTE && ra(e) && t in e.style)) {
      const s = Gr[t];
      if (s) return s;
      {
        const n = t && Z0(t);
        return (Gr[t] = n), n;
      }
    } else return t;
  },
  Os = { deg: 1, rad: 180 / _u, turn: 360 },
  jr = {},
  Sa = (t, e, u, s = !1) => {
    const n = e.u,
      r = e.n;
    if (e.t === L.UNIT && n === u) return e;
    const i = r + n + u,
      a = jr[i];
    if (!V(a) && !s) e.n = a;
    else {
      let o;
      if (n in Os) o = (r * Os[n]) / Os[u];
      else {
        const l = t.cloneNode(),
          f = t.parentNode,
          p = f && f !== nu ? f : nu.body;
        p.appendChild(l);
        const h = l.style;
        h.width = 100 + n;
        const m = l.offsetWidth || 100;
        h.width = 100 + u;
        const v = l.offsetWidth || 100,
          _ = m / v;
        p.removeChild(l), (o = _ * r);
      }
      (e.n = o), (jr[i] = o);
    }
    return e.t, L.UNIT, (e.u = u), e;
  },
  jn = (t) => {
    if (t._hasChildren) Q(t, jn, !0);
    else {
      const e = t;
      e.pause(),
        Q(e, (u) => {
          const s = u.property,
            n = u.target;
          if (n[Pn]) {
            const r = n.style,
              i = e._inlineStyles[s];
            if (u._tweenType === Z.TRANSFORM) {
              const a = n[gs];
              if (
                (V(i) || i === Mt ? delete a[s] : (a[s] = i),
                u._renderTransforms)
              )
                if (!Object.keys(a).length) r.removeProperty('transform');
                else {
                  let o = Mt;
                  for (let c in a) o += ua[c] + a[c] + ') ';
                  r.transform = o;
                }
            } else V(i) || i === Mt ? r.removeProperty(s) : (r[s] = i);
            e._tail === u &&
              e.targets.forEach((a) => {
                a.getAttribute &&
                  a.getAttribute('style') === Mt &&
                  a.removeAttribute('style');
              });
          }
        });
    }
    return t;
  },
  w = $n(),
  D = $n(),
  Fu = { func: null },
  Vu = [null],
  Kt = [null, null],
  Uu = { to: null };
let Dc = 0,
  St,
  it;
const Lc = (t, e) => {
  const u = {};
  if (ru(t)) {
    const s = [].concat(...t.map((n) => Object.keys(n))).filter(Yu);
    for (let n = 0, r = s.length; n < r; n++) {
      const i = s[n],
        a = t.map((o) => {
          const c = {};
          for (let l in o) {
            const f = o[l];
            Yu(l) ? l === i && (c.to = f) : (c[l] = f);
          }
          return c;
        });
      u[i] = a;
    }
  } else {
    const s = xe(e.duration, ie.defaults.duration);
    Object.keys(t)
      .map((r) => ({ o: parseFloat(r) / 100, p: t[r] }))
      .sort((r, i) => r.o - i.o)
      .forEach((r) => {
        const i = r.o,
          a = r.p;
        for (let o in a)
          if (Yu(o)) {
            let c = u[o];
            c || (c = u[o] = []);
            const l = i * s;
            let f = c.length,
              p = c[f - 1];
            const h = { to: a[o] };
            let m = 0;
            for (let v = 0; v < f; v++) m += c[v].duration;
            f === 1 && (h.from = p.to),
              a.ease && (h.ease = a.ease),
              (h.duration = l - (f ? m : 0)),
              c.push(h);
          }
        return r;
      });
    for (let r in u) {
      const i = u[r];
      let a;
      for (let o = 0, c = i.length; o < c; o++) {
        const l = i[o],
          f = l.ease;
        (l.ease = a || void 0), (a = f);
      }
      i[0].duration || i.shift();
    }
  }
  return u;
};
class xa extends pa {
  constructor(e, u, s, n, r = !1, i = 0, a = 0) {
    super(u, s, n);
    const o = Vn(e),
      c = o.length,
      l = u.keyframes,
      f = l ? ac(Lc(l, u), u) : u,
      {
        delay: p,
        duration: h,
        ease: m,
        playbackEase: v,
        modifier: _,
        composition: A,
        onRender: F,
      } = f,
      M = s ? s.defaults : ie.defaults,
      U = xe(v, M.playbackEase),
      N = U ? Hr(U) : null,
      O = !V(m) && !V(m.ease),
      ee = O ? m.ease : xe(m, N ? 'linear' : M.ease),
      z = O ? m.duration : xe(h, M.duration),
      Ce = xe(p, M.delay),
      ce = _ || M.modifier,
      q = V(A) && c >= qt ? _e.none : V(A) ? M.composition : A,
      W = {},
      be = this._offset + (s ? s._offset : 0);
    let te = NaN,
      X = NaN,
      I = 0,
      me = 0;
    for (let K = 0; K < c; K++) {
      const y = o[K],
        se = i || K,
        ve = a || c;
      let Ht = NaN,
        Nt = NaN;
      for (let Ve in f)
        if (Yu(Ve)) {
          const Re = Un(y, Ve),
            Ue = Gn(Ve, y, Re);
          let Pe = f[Ve];
          const hu = ru(Pe);
          if ((r && !hu && ((Kt[0] = Pe), (Kt[1] = Pe), (Pe = Kt)), hu)) {
            const De = Pe.length,
              Ke = !Ls(Pe[0]);
            De === 2 && Ke
              ? ((Uu.to = Pe), (Vu[0] = Uu), (St = Vu))
              : De > 2 && Ke
              ? ((St = []),
                Pe.forEach((Ee, Le) => {
                  Le
                    ? Le === 1
                      ? ((Kt[1] = Ee), St.push(Kt))
                      : St.push(Ee)
                    : (Kt[0] = Ee);
                }))
              : (St = Pe);
          } else (Vu[0] = Pe), (St = Vu);
          let ut = null,
            $e = null,
            lt = NaN,
            dt = 0,
            le = 0;
          for (let De = St.length; le < De; le++) {
            const Ke = St[le];
            Ls(Ke) ? (it = Ke) : ((Uu.to = Ke), (it = Uu)), (Fu.func = null);
            const Ee = mt(it.to, y, se, ve, Fu);
            let Le;
            Ls(Ee) && !V(Ee.to) ? ((it = Ee), (Le = Ee.to)) : (Le = Ee);
            const Gt = mt(it.from, y, se, ve),
              st = it.ease,
              Ie = !V(st) && !V(st.ease),
              jt = Ie ? st.ease : st || ee,
              ne = Ie
                ? st.duration
                : mt(
                    xe(it.duration, De > 1 ? mt(z, y, se, ve) / De : z),
                    y,
                    se,
                    ve
                  ),
              nt = mt(xe(it.delay, le ? 0 : Ce), y, se, ve),
              rt = mt(xe(it.composition, q), y, se, ve),
              ft = Y0(rt) ? rt : _e[rt],
              ku = it.modifier || ce,
              zt = !V(Gt),
              Rt = !V(Le),
              Pu = ru(Le),
              V0 = Pu || (zt && Rt),
              _s = $e ? dt + nt : nt,
              Ns = be + _s;
            !me && (zt || Pu) && (me = 1);
            let He = $e;
            if (ft !== _e.none) {
              ut || (ut = Hn(y, Ue));
              let j = ut._head;
              for (; j && !j._isOverridden && j._absoluteStartTime <= Ns; )
                if (
                  ((He = j), (j = j._nextRep), j && j._absoluteStartTime >= Ns)
                )
                  for (; j; ) es(j), (j = j._nextRep);
            }
            if (
              (V0
                ? (Xe(Pu ? mt(Le[0], y, se, ve) : Gt, w),
                  Xe(Pu ? mt(Le[1], y, se, ve, Fu) : Le, D),
                  w.t === L.NUMBER &&
                    (He
                      ? He._valueType === L.UNIT &&
                        ((w.t = L.UNIT), (w.u = He._unit))
                      : (Xe(Yt(y, Ue, Re, W), Ge),
                        Ge.t === L.UNIT && ((w.t = L.UNIT), (w.u = Ge.u)))))
                : (Rt
                    ? Xe(Le, D)
                    : $e
                    ? Fr($e, D)
                    : Xe(
                        s && He && He.parent.parent === s
                          ? He._value
                          : Yt(y, Ue, Re, W),
                        D
                      ),
                  zt
                    ? Xe(Gt, w)
                    : $e
                    ? Fr($e, w)
                    : Xe(
                        s && He && He.parent.parent === s
                          ? He._value
                          : Yt(y, Ue, Re, W),
                        w
                      )),
              w.o &&
                (w.n = Br(
                  He ? He._toNumber : Xe(Yt(y, Ue, Re, W), Ge).n,
                  w.n,
                  w.o
                )),
              D.o && (D.n = Br(w.n, D.n, D.o)),
              w.t !== D.t)
            ) {
              if (w.t === L.COMPLEX || D.t === L.COMPLEX) {
                const j = w.t === L.COMPLEX ? w : D,
                  Se = w.t === L.COMPLEX ? D : w;
                (Se.t = L.COMPLEX),
                  (Se.s = we(j.s)),
                  (Se.d = j.d.map(() => Se.n));
              } else if (w.t === L.UNIT || D.t === L.UNIT) {
                const j = w.t === L.UNIT ? w : D,
                  Se = w.t === L.UNIT ? D : w;
                (Se.t = L.UNIT), (Se.u = j.u);
              } else if (w.t === L.COLOR || D.t === L.COLOR) {
                const j = w.t === L.COLOR ? w : D,
                  Se = w.t === L.COLOR ? D : w;
                (Se.t = L.COLOR), (Se.s = j.s), (Se.d = [0, 0, 0, 1]);
              }
            }
            if (w.u !== D.u) {
              let j = D.u ? w : D;
              j = Sa(y, j, D.u ? D.u : w.u, !1);
            }
            if (D.d && w.d && D.d.length !== w.d.length) {
              const j = w.d.length > D.d.length ? w : D,
                Se = j === w ? D : w;
              (Se.d = j.d.map((m1, Ir) => (V(Se.d[Ir]) ? 0 : Se.d[Ir]))),
                (Se.s = we(j.s));
            }
            const Rs = Y(+ne || G, 12),
              qu = {
                parent: this,
                id: Dc++,
                property: Ue,
                target: y,
                _value: null,
                _func: Fu.func,
                _ease: Hr(jt),
                _fromNumbers: we(w.d),
                _toNumbers: we(D.d),
                _strings: we(D.s),
                _fromNumber: w.n,
                _toNumber: D.n,
                _numbers: we(w.d),
                _number: w.n,
                _unit: D.u,
                _modifier: ku,
                _currentTime: 0,
                _startTime: _s,
                _delay: +nt,
                _updateDuration: Rs,
                _changeDuration: Rs,
                _absoluteStartTime: Ns,
                _tweenType: Re,
                _valueType: D.t,
                _composition: ft,
                _isOverlapped: 0,
                _isOverridden: 0,
                _renderTransforms: 0,
                _prevRep: null,
                _nextRep: null,
                _prevAdd: null,
                _nextAdd: null,
                _prev: null,
                _next: null,
              };
            ft !== _e.none && ha(qu, ut),
              isNaN(lt) && (lt = qu._startTime),
              (dt = Y(_s + Rs, 12)),
              ($e = qu),
              I++,
              eu(this, qu);
          }
          (isNaN(X) || lt < X) && (X = lt),
            (isNaN(te) || dt > te) && (te = dt),
            Re === Z.TRANSFORM && ((Ht = I - le), (Nt = I));
        }
      if (!isNaN(Ht)) {
        let Ve = 0;
        Q(this, (Re) => {
          Ve >= Ht &&
            Ve < Nt &&
            ((Re._renderTransforms = 1),
            Re._composition === _e.blend &&
              Q(su.animation, (Ue) => {
                Ue.id === Re.id && (Ue._renderTransforms = 1);
              })),
            Ve++;
        });
      }
    }
    c ||
      console.warn(
        "No target found. Make sure the element you're trying to animate is accessible before creating your animation."
      ),
      X
        ? (Q(this, (K) => {
            K._startTime - K._delay || (K._delay -= X), (K._startTime -= X);
          }),
          (te -= X))
        : (X = 0),
      te || ((te = G), (this.iterationCount = 0)),
      (this.targets = o),
      (this.duration =
        te === G
          ? G
          : Fn(
              (te + this._loopDelay) * this.iterationCount - this._loopDelay
            ) || G),
      (this.onRender = F || M.onRender),
      (this._ease = N),
      (this._delay = X),
      (this.iterationDuration = te),
      (this._inlineStyles = W),
      !this._autoplay && me && this.onRender(this);
  }
  stretch(e) {
    const u = this.duration;
    if (u === xu(e)) return this;
    const s = e / u;
    return (
      Q(this, (n) => {
        (n._updateDuration = xu(n._updateDuration * s)),
          (n._changeDuration = xu(n._changeDuration * s)),
          (n._currentTime *= s),
          (n._startTime *= s),
          (n._absoluteStartTime *= s);
      }),
      super.stretch(e)
    );
  }
  refresh() {
    return (
      Q(this, (e) => {
        const u = e._func;
        if (u) {
          const s = Yt(e.target, e.property, e._tweenType);
          Xe(s, Ge),
            Xe(u(), D),
            (e._fromNumbers = we(Ge.d)),
            (e._fromNumber = Ge.n),
            (e._toNumbers = we(D.d)),
            (e._strings = we(D.s)),
            (e._toNumber = D.n);
        }
      }),
      this
    );
  }
  revert() {
    return super.revert(), jn(this);
  }
  then(e) {
    return super.then(e);
  }
}
const Ic = (t, e) => new xa(t, e, null, 0, !1).init(),
  zr = { _head: null, _tail: null },
  Mc = (t, e, u) => {
    let s = zr._head;
    for (; s; ) {
      const n = s._next,
        r = s.$el === t,
        i = !e || s.property === e,
        a = !u || s.parent === u;
      if (r && i && a) {
        const o = s.animation;
        try {
          o.commitStyles();
        } catch {}
        o.cancel(), yt(zr, s);
        const c = s.parent;
        c &&
          (c._completed++,
          c.animations.length === c._completed &&
            ((c.completed = !0),
            c.muteCallbacks ||
              ((c.paused = !0), c.onComplete(c), c._resolve(c))));
      }
      s = n;
    }
  },
  Oc = (t = Ae) =>
    new pa({ duration: 1 * ie.timeScale, onComplete: t }, null, 0).resume();
function kc(t, e, u) {
  const s = Vn(t);
  if (!s.length) return;
  const [n] = s,
    r = Un(n, e),
    i = Gn(e, n, r);
  let a = Yt(n, i);
  if (V(u)) return a;
  if ((Xe(a, Ge), Ge.t === L.NUMBER || Ge.t === L.UNIT)) {
    if (u === !1) return Ge.n;
    {
      const o = Sa(n, Ge, u, !1);
      return `${Y(o.n, ie.precision)}${o.u}`;
    }
  }
}
const Pc = (t, e) => {
    if (!V(e))
      return (
        (e.duration = G),
        (e.composition = xe(e.composition, _e.none)),
        new xa(t, e, null, 0, !0).resume()
      );
  },
  Kr = (t, e, u) => {
    let s = !1;
    return (
      Q(
        e,
        (n) => {
          const r = n.target;
          if (t.includes(r)) {
            const i = n.property,
              a = n._tweenType,
              o = Gn(u, r, a);
            (!o || (o && o === i)) &&
              (n.parent._tail === n &&
                n._tweenType === Z.TRANSFORM &&
                n._prev &&
                n._prev._tweenType === Z.TRANSFORM &&
                (n._prev._renderTransforms = 1),
              yt(e, n),
              ba(n),
              (s = !0));
          }
        },
        !0
      ),
      s
    );
  },
  ya = (t, e, u) => {
    const s = fa(t),
      n = e || re,
      r = e && e.controlAnimation && e;
    for (let a = 0, o = s.length; a < o; a++) {
      const c = s[a];
      Mc(c, u, r);
    }
    let i;
    if (n._hasChildren) {
      let a = 0;
      Q(
        n,
        (o) => {
          if (!o._hasChildren)
            if (((i = Kr(s, o, u)), i && !o._head)) o.cancel(), yt(n, o);
            else {
              const l = o._offset + o._delay + o.duration;
              l > a && (a = l);
            }
          o._head ? ya(t, o, u) : (o._hasChildren = !1);
        },
        !0
      ),
        V(n.iterationDuration) || (n.iterationDuration = a);
    } else i = Kr(s, n, u);
    return i && !n._head && ((n._hasChildren = !1), n.cancel && n.cancel()), s;
  },
  qc = oc,
  Bc = (t) => t[Bn(0, t.length - 1)],
  Fc = (t, e) => (+t).toFixed(e),
  Vc = (t, e, u) => `${t}`.padStart(e, u),
  Uc = (t, e, u) => `${t}`.padEnd(e, u),
  $c = (t, e, u) => ((((t - e) % (u - e)) + (u - e)) % (u - e)) + e,
  Hc = (t, e, u, s, n) => s + ((t - e) / (u - e)) * (n - s),
  Gc = (t) => (t * _u) / 180,
  jc = (t) => (t * 180) / _u,
  zc = (t, e, u, s) => {
    let n = qt / ie.defaults.frameRate;
    if (s !== !1) {
      const i = s || (re._hasChildren && re);
      i && i.deltaTime && (n = i.deltaTime);
    }
    const r = 1 - Math.exp(-u * n * 0.1);
    return u ? (u === 1 ? e : (1 - r) * t + r * e) : t;
  },
  Kc =
    (t, e = 0) =>
    (...u) =>
      e ? (s) => t(...u, s) : (s) => t(s, ...u),
  Ta =
    (t) =>
    (...e) => {
      const u = t(...e);
      return new Proxy(Ae, {
        apply: (s, n, [r]) => u(r),
        get: (s, n) =>
          Ta((...r) => {
            const i = Ca[n](...r);
            return (a) => i(u(a));
          }),
      });
    },
  We =
    (t, e = 0) =>
    (...u) =>
      (u.length < t.length ? Ta(Kc(t, e)) : t)(...u),
  Ca = {
    $: Vn,
    get: kc,
    set: Pc,
    remove: ya,
    cleanInlineStyles: jn,
    random: Bn,
    randomPick: Bc,
    shuffle: ic,
    lerp: zc,
    sync: Oc,
    keepTime: qc,
    clamp: We(ge),
    round: We(Y),
    snap: We(rc),
    wrap: We($c),
    interpolate: We(xt, 1),
    mapRange: We(Hc),
    roundPad: We(Fc),
    padStart: We(Vc),
    padEnd: We(Uc),
    degToRad: We(Gc),
    radToDeg: We(jc),
  },
  as = Symbol('changed'),
  Qt = Symbol('classList'),
  Je = Symbol('CustomElements'),
  $u = Symbol('content'),
  ks = Symbol('dataset'),
  Dt = Symbol('doctype'),
  vn = Symbol('DOMParser'),
  T = Symbol('end'),
  pu = Symbol('EventTarget'),
  ts = Symbol('globals'),
  Ze = Symbol('image'),
  ou = Symbol('mime'),
  Tt = Symbol('MutationObserver'),
  S = Symbol('next'),
  va = Symbol('ownerElement'),
  fe = Symbol('prev'),
  ye = Symbol('private'),
  Wt = Symbol('sheet'),
  Me = Symbol('start'),
  Ps = Symbol('style'),
  yu = Symbol('upgrade'),
  H = Symbol('value'),
  Wc = new Uint16Array(
    'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'
      .split('')
      .map((t) => t.charCodeAt(0))
  ),
  Xc = new Uint16Array(
    'Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢'
      .split('')
      .map((t) => t.charCodeAt(0))
  );
var qs;
const Jc = new Map([
    [0, 65533],
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376],
  ]),
  Wr =
    (qs = String.fromCodePoint) !== null && qs !== void 0
      ? qs
      : function (t) {
          let e = '';
          return (
            t > 65535 &&
              ((t -= 65536),
              (e += String.fromCharCode(((t >>> 10) & 1023) | 55296)),
              (t = 56320 | (t & 1023))),
            (e += String.fromCharCode(t)),
            e
          );
        };
function Zc(t) {
  var e;
  return (t >= 55296 && t <= 57343) || t > 1114111
    ? 65533
    : (e = Jc.get(t)) !== null && e !== void 0
    ? e
    : t;
}
var he;
(function (t) {
  (t[(t.NUM = 35)] = 'NUM'),
    (t[(t.SEMI = 59)] = 'SEMI'),
    (t[(t.EQUALS = 61)] = 'EQUALS'),
    (t[(t.ZERO = 48)] = 'ZERO'),
    (t[(t.NINE = 57)] = 'NINE'),
    (t[(t.LOWER_A = 97)] = 'LOWER_A'),
    (t[(t.LOWER_F = 102)] = 'LOWER_F'),
    (t[(t.LOWER_X = 120)] = 'LOWER_X'),
    (t[(t.LOWER_Z = 122)] = 'LOWER_Z'),
    (t[(t.UPPER_A = 65)] = 'UPPER_A'),
    (t[(t.UPPER_F = 70)] = 'UPPER_F'),
    (t[(t.UPPER_Z = 90)] = 'UPPER_Z');
})(he || (he = {}));
const Yc = 32;
var Ct;
(function (t) {
  (t[(t.VALUE_LENGTH = 49152)] = 'VALUE_LENGTH'),
    (t[(t.BRANCH_LENGTH = 16256)] = 'BRANCH_LENGTH'),
    (t[(t.JUMP_TABLE = 127)] = 'JUMP_TABLE');
})(Ct || (Ct = {}));
function En(t) {
  return t >= he.ZERO && t <= he.NINE;
}
function Qc(t) {
  return (
    (t >= he.UPPER_A && t <= he.UPPER_F) || (t >= he.LOWER_A && t <= he.LOWER_F)
  );
}
function el(t) {
  return (
    (t >= he.UPPER_A && t <= he.UPPER_Z) ||
    (t >= he.LOWER_A && t <= he.LOWER_Z) ||
    En(t)
  );
}
function tl(t) {
  return t === he.EQUALS || el(t);
}
var de;
(function (t) {
  (t[(t.EntityStart = 0)] = 'EntityStart'),
    (t[(t.NumericStart = 1)] = 'NumericStart'),
    (t[(t.NumericDecimal = 2)] = 'NumericDecimal'),
    (t[(t.NumericHex = 3)] = 'NumericHex'),
    (t[(t.NamedEntity = 4)] = 'NamedEntity');
})(de || (de = {}));
var at;
(function (t) {
  (t[(t.Legacy = 0)] = 'Legacy'),
    (t[(t.Strict = 1)] = 'Strict'),
    (t[(t.Attribute = 2)] = 'Attribute');
})(at || (at = {}));
class ul {
  constructor(e, u, s) {
    (this.decodeTree = e),
      (this.emitCodePoint = u),
      (this.errors = s),
      (this.state = de.EntityStart),
      (this.consumed = 1),
      (this.result = 0),
      (this.treeIndex = 0),
      (this.excess = 1),
      (this.decodeMode = at.Strict);
  }
  startEntity(e) {
    (this.decodeMode = e),
      (this.state = de.EntityStart),
      (this.result = 0),
      (this.treeIndex = 0),
      (this.excess = 1),
      (this.consumed = 1);
  }
  write(e, u) {
    switch (this.state) {
      case de.EntityStart:
        return e.charCodeAt(u) === he.NUM
          ? ((this.state = de.NumericStart),
            (this.consumed += 1),
            this.stateNumericStart(e, u + 1))
          : ((this.state = de.NamedEntity), this.stateNamedEntity(e, u));
      case de.NumericStart:
        return this.stateNumericStart(e, u);
      case de.NumericDecimal:
        return this.stateNumericDecimal(e, u);
      case de.NumericHex:
        return this.stateNumericHex(e, u);
      case de.NamedEntity:
        return this.stateNamedEntity(e, u);
    }
  }
  stateNumericStart(e, u) {
    return u >= e.length
      ? -1
      : (e.charCodeAt(u) | Yc) === he.LOWER_X
      ? ((this.state = de.NumericHex),
        (this.consumed += 1),
        this.stateNumericHex(e, u + 1))
      : ((this.state = de.NumericDecimal), this.stateNumericDecimal(e, u));
  }
  addToNumericResult(e, u, s, n) {
    if (u !== s) {
      const r = s - u;
      (this.result =
        this.result * Math.pow(n, r) + Number.parseInt(e.substr(u, r), n)),
        (this.consumed += r);
    }
  }
  stateNumericHex(e, u) {
    const s = u;
    for (; u < e.length; ) {
      const n = e.charCodeAt(u);
      if (En(n) || Qc(n)) u += 1;
      else
        return (
          this.addToNumericResult(e, s, u, 16), this.emitNumericEntity(n, 3)
        );
    }
    return this.addToNumericResult(e, s, u, 16), -1;
  }
  stateNumericDecimal(e, u) {
    const s = u;
    for (; u < e.length; ) {
      const n = e.charCodeAt(u);
      if (En(n)) u += 1;
      else
        return (
          this.addToNumericResult(e, s, u, 10), this.emitNumericEntity(n, 2)
        );
    }
    return this.addToNumericResult(e, s, u, 10), -1;
  }
  emitNumericEntity(e, u) {
    var s;
    if (this.consumed <= u)
      return (
        (s = this.errors) === null ||
          s === void 0 ||
          s.absenceOfDigitsInNumericCharacterReference(this.consumed),
        0
      );
    if (e === he.SEMI) this.consumed += 1;
    else if (this.decodeMode === at.Strict) return 0;
    return (
      this.emitCodePoint(Zc(this.result), this.consumed),
      this.errors &&
        (e !== he.SEMI && this.errors.missingSemicolonAfterCharacterReference(),
        this.errors.validateNumericCharacterReference(this.result)),
      this.consumed
    );
  }
  stateNamedEntity(e, u) {
    const { decodeTree: s } = this;
    let n = s[this.treeIndex],
      r = (n & Ct.VALUE_LENGTH) >> 14;
    for (; u < e.length; u++, this.excess++) {
      const i = e.charCodeAt(u);
      if (
        ((this.treeIndex = sl(s, n, this.treeIndex + Math.max(1, r), i)),
        this.treeIndex < 0)
      )
        return this.result === 0 ||
          (this.decodeMode === at.Attribute && (r === 0 || tl(i)))
          ? 0
          : this.emitNotTerminatedNamedEntity();
      if (
        ((n = s[this.treeIndex]), (r = (n & Ct.VALUE_LENGTH) >> 14), r !== 0)
      ) {
        if (i === he.SEMI)
          return this.emitNamedEntityData(
            this.treeIndex,
            r,
            this.consumed + this.excess
          );
        this.decodeMode !== at.Strict &&
          ((this.result = this.treeIndex),
          (this.consumed += this.excess),
          (this.excess = 0));
      }
    }
    return -1;
  }
  emitNotTerminatedNamedEntity() {
    var e;
    const { result: u, decodeTree: s } = this,
      n = (s[u] & Ct.VALUE_LENGTH) >> 14;
    return (
      this.emitNamedEntityData(u, n, this.consumed),
      (e = this.errors) === null ||
        e === void 0 ||
        e.missingSemicolonAfterCharacterReference(),
      this.consumed
    );
  }
  emitNamedEntityData(e, u, s) {
    const { decodeTree: n } = this;
    return (
      this.emitCodePoint(u === 1 ? n[e] & ~Ct.VALUE_LENGTH : n[e + 1], s),
      u === 3 && this.emitCodePoint(n[e + 2], s),
      s
    );
  }
  end() {
    var e;
    switch (this.state) {
      case de.NamedEntity:
        return this.result !== 0 &&
          (this.decodeMode !== at.Attribute || this.result === this.treeIndex)
          ? this.emitNotTerminatedNamedEntity()
          : 0;
      case de.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case de.NumericHex:
        return this.emitNumericEntity(0, 3);
      case de.NumericStart:
        return (
          (e = this.errors) === null ||
            e === void 0 ||
            e.absenceOfDigitsInNumericCharacterReference(this.consumed),
          0
        );
      case de.EntityStart:
        return 0;
    }
  }
}
function sl(t, e, u, s) {
  const n = (e & Ct.BRANCH_LENGTH) >> 7,
    r = e & Ct.JUMP_TABLE;
  if (n === 0) return r !== 0 && s === r ? u : -1;
  if (r) {
    const o = s - r;
    return o < 0 || o >= n ? -1 : t[u + o] - 1;
  }
  let i = u,
    a = i + n - 1;
  for (; i <= a; ) {
    const o = (i + a) >>> 1,
      c = t[o];
    if (c < s) i = o + 1;
    else if (c > s) a = o - 1;
    else return t[o + n];
  }
  return -1;
}
var C;
(function (t) {
  (t[(t.Tab = 9)] = 'Tab'),
    (t[(t.NewLine = 10)] = 'NewLine'),
    (t[(t.FormFeed = 12)] = 'FormFeed'),
    (t[(t.CarriageReturn = 13)] = 'CarriageReturn'),
    (t[(t.Space = 32)] = 'Space'),
    (t[(t.ExclamationMark = 33)] = 'ExclamationMark'),
    (t[(t.Number = 35)] = 'Number'),
    (t[(t.Amp = 38)] = 'Amp'),
    (t[(t.SingleQuote = 39)] = 'SingleQuote'),
    (t[(t.DoubleQuote = 34)] = 'DoubleQuote'),
    (t[(t.Dash = 45)] = 'Dash'),
    (t[(t.Slash = 47)] = 'Slash'),
    (t[(t.Zero = 48)] = 'Zero'),
    (t[(t.Nine = 57)] = 'Nine'),
    (t[(t.Semi = 59)] = 'Semi'),
    (t[(t.Lt = 60)] = 'Lt'),
    (t[(t.Eq = 61)] = 'Eq'),
    (t[(t.Gt = 62)] = 'Gt'),
    (t[(t.Questionmark = 63)] = 'Questionmark'),
    (t[(t.UpperA = 65)] = 'UpperA'),
    (t[(t.LowerA = 97)] = 'LowerA'),
    (t[(t.UpperF = 70)] = 'UpperF'),
    (t[(t.LowerF = 102)] = 'LowerF'),
    (t[(t.UpperZ = 90)] = 'UpperZ'),
    (t[(t.LowerZ = 122)] = 'LowerZ'),
    (t[(t.LowerX = 120)] = 'LowerX'),
    (t[(t.OpeningSquareBracket = 91)] = 'OpeningSquareBracket');
})(C || (C = {}));
var b;
(function (t) {
  (t[(t.Text = 1)] = 'Text'),
    (t[(t.BeforeTagName = 2)] = 'BeforeTagName'),
    (t[(t.InTagName = 3)] = 'InTagName'),
    (t[(t.InSelfClosingTag = 4)] = 'InSelfClosingTag'),
    (t[(t.BeforeClosingTagName = 5)] = 'BeforeClosingTagName'),
    (t[(t.InClosingTagName = 6)] = 'InClosingTagName'),
    (t[(t.AfterClosingTagName = 7)] = 'AfterClosingTagName'),
    (t[(t.BeforeAttributeName = 8)] = 'BeforeAttributeName'),
    (t[(t.InAttributeName = 9)] = 'InAttributeName'),
    (t[(t.AfterAttributeName = 10)] = 'AfterAttributeName'),
    (t[(t.BeforeAttributeValue = 11)] = 'BeforeAttributeValue'),
    (t[(t.InAttributeValueDq = 12)] = 'InAttributeValueDq'),
    (t[(t.InAttributeValueSq = 13)] = 'InAttributeValueSq'),
    (t[(t.InAttributeValueNq = 14)] = 'InAttributeValueNq'),
    (t[(t.BeforeDeclaration = 15)] = 'BeforeDeclaration'),
    (t[(t.InDeclaration = 16)] = 'InDeclaration'),
    (t[(t.InProcessingInstruction = 17)] = 'InProcessingInstruction'),
    (t[(t.BeforeComment = 18)] = 'BeforeComment'),
    (t[(t.CDATASequence = 19)] = 'CDATASequence'),
    (t[(t.InSpecialComment = 20)] = 'InSpecialComment'),
    (t[(t.InCommentLike = 21)] = 'InCommentLike'),
    (t[(t.BeforeSpecialS = 22)] = 'BeforeSpecialS'),
    (t[(t.BeforeSpecialT = 23)] = 'BeforeSpecialT'),
    (t[(t.SpecialStartSequence = 24)] = 'SpecialStartSequence'),
    (t[(t.InSpecialTag = 25)] = 'InSpecialTag'),
    (t[(t.InEntity = 26)] = 'InEntity');
})(b || (b = {}));
function ht(t) {
  return (
    t === C.Space ||
    t === C.NewLine ||
    t === C.Tab ||
    t === C.FormFeed ||
    t === C.CarriageReturn
  );
}
function Hu(t) {
  return t === C.Slash || t === C.Gt || ht(t);
}
function nl(t) {
  return (t >= C.LowerA && t <= C.LowerZ) || (t >= C.UpperA && t <= C.UpperZ);
}
var Ye;
(function (t) {
  (t[(t.NoValue = 0)] = 'NoValue'),
    (t[(t.Unquoted = 1)] = 'Unquoted'),
    (t[(t.Single = 2)] = 'Single'),
    (t[(t.Double = 3)] = 'Double');
})(Ye || (Ye = {}));
const ue = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  CdataEnd: new Uint8Array([93, 93, 62]),
  CommentEnd: new Uint8Array([45, 45, 62]),
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  TextareaEnd: new Uint8Array([60, 47, 116, 101, 120, 116, 97, 114, 101, 97]),
  XmpEnd: new Uint8Array([60, 47, 120, 109, 112]),
};
class Ea {
  constructor({ xmlMode: e = !1, decodeEntities: u = !0 }, s) {
    (this.cbs = s),
      (this.state = b.Text),
      (this.buffer = ''),
      (this.sectionStart = 0),
      (this.index = 0),
      (this.entityStart = 0),
      (this.baseState = b.Text),
      (this.isSpecial = !1),
      (this.running = !0),
      (this.offset = 0),
      (this.currentSequence = void 0),
      (this.sequenceIndex = 0),
      (this.xmlMode = e),
      (this.decodeEntities = u),
      (this.entityDecoder = new ul(e ? Xc : Wc, (n, r) =>
        this.emitCodePoint(n, r)
      ));
  }
  reset() {
    (this.state = b.Text),
      (this.buffer = ''),
      (this.sectionStart = 0),
      (this.index = 0),
      (this.baseState = b.Text),
      (this.currentSequence = void 0),
      (this.running = !0),
      (this.offset = 0);
  }
  write(e) {
    (this.offset += this.buffer.length), (this.buffer = e), this.parse();
  }
  end() {
    this.running && this.finish();
  }
  pause() {
    this.running = !1;
  }
  resume() {
    (this.running = !0),
      this.index < this.buffer.length + this.offset && this.parse();
  }
  stateText(e) {
    e === C.Lt || (!this.decodeEntities && this.fastForwardTo(C.Lt))
      ? (this.index > this.sectionStart &&
          this.cbs.ontext(this.sectionStart, this.index),
        (this.state = b.BeforeTagName),
        (this.sectionStart = this.index))
      : this.decodeEntities && e === C.Amp && this.startEntity();
  }
  stateSpecialStartSequence(e) {
    const u = this.sequenceIndex === this.currentSequence.length;
    if (!(u ? Hu(e) : (e | 32) === this.currentSequence[this.sequenceIndex]))
      this.isSpecial = !1;
    else if (!u) {
      this.sequenceIndex++;
      return;
    }
    (this.sequenceIndex = 0),
      (this.state = b.InTagName),
      this.stateInTagName(e);
  }
  stateInSpecialTag(e) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (e === C.Gt || ht(e)) {
        const u = this.index - this.currentSequence.length;
        if (this.sectionStart < u) {
          const s = this.index;
          (this.index = u),
            this.cbs.ontext(this.sectionStart, u),
            (this.index = s);
        }
        (this.isSpecial = !1),
          (this.sectionStart = u + 2),
          this.stateInClosingTagName(e);
        return;
      }
      this.sequenceIndex = 0;
    }
    (e | 32) === this.currentSequence[this.sequenceIndex]
      ? (this.sequenceIndex += 1)
      : this.sequenceIndex === 0
      ? this.currentSequence === ue.TitleEnd
        ? this.decodeEntities && e === C.Amp && this.startEntity()
        : this.fastForwardTo(C.Lt) && (this.sequenceIndex = 1)
      : (this.sequenceIndex = +(e === C.Lt));
  }
  stateCDATASequence(e) {
    e === ue.Cdata[this.sequenceIndex]
      ? ++this.sequenceIndex === ue.Cdata.length &&
        ((this.state = b.InCommentLike),
        (this.currentSequence = ue.CdataEnd),
        (this.sequenceIndex = 0),
        (this.sectionStart = this.index + 1))
      : ((this.sequenceIndex = 0),
        (this.state = b.InDeclaration),
        this.stateInDeclaration(e));
  }
  fastForwardTo(e) {
    for (; ++this.index < this.buffer.length + this.offset; )
      if (this.buffer.charCodeAt(this.index - this.offset) === e) return !0;
    return (this.index = this.buffer.length + this.offset - 1), !1;
  }
  stateInCommentLike(e) {
    e === this.currentSequence[this.sequenceIndex]
      ? ++this.sequenceIndex === this.currentSequence.length &&
        (this.currentSequence === ue.CdataEnd
          ? this.cbs.oncdata(this.sectionStart, this.index, 2)
          : this.cbs.oncomment(this.sectionStart, this.index, 2),
        (this.sequenceIndex = 0),
        (this.sectionStart = this.index + 1),
        (this.state = b.Text))
      : this.sequenceIndex === 0
      ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1)
      : e !== this.currentSequence[this.sequenceIndex - 1] &&
        (this.sequenceIndex = 0);
  }
  isTagStartChar(e) {
    return this.xmlMode ? !Hu(e) : nl(e);
  }
  startSpecial(e, u) {
    (this.isSpecial = !0),
      (this.currentSequence = e),
      (this.sequenceIndex = u),
      (this.state = b.SpecialStartSequence);
  }
  stateBeforeTagName(e) {
    if (e === C.ExclamationMark)
      (this.state = b.BeforeDeclaration), (this.sectionStart = this.index + 1);
    else if (e === C.Questionmark)
      (this.state = b.InProcessingInstruction),
        (this.sectionStart = this.index + 1);
    else if (this.isTagStartChar(e)) {
      const u = e | 32;
      (this.sectionStart = this.index),
        this.xmlMode
          ? (this.state = b.InTagName)
          : u === ue.ScriptEnd[2]
          ? (this.state = b.BeforeSpecialS)
          : u === ue.TitleEnd[2] || u === ue.XmpEnd[2]
          ? (this.state = b.BeforeSpecialT)
          : (this.state = b.InTagName);
    } else
      e === C.Slash
        ? (this.state = b.BeforeClosingTagName)
        : ((this.state = b.Text), this.stateText(e));
  }
  stateInTagName(e) {
    Hu(e) &&
      (this.cbs.onopentagname(this.sectionStart, this.index),
      (this.sectionStart = -1),
      (this.state = b.BeforeAttributeName),
      this.stateBeforeAttributeName(e));
  }
  stateBeforeClosingTagName(e) {
    ht(e) ||
      (e === C.Gt
        ? (this.state = b.Text)
        : ((this.state = this.isTagStartChar(e)
            ? b.InClosingTagName
            : b.InSpecialComment),
          (this.sectionStart = this.index)));
  }
  stateInClosingTagName(e) {
    (e === C.Gt || ht(e)) &&
      (this.cbs.onclosetag(this.sectionStart, this.index),
      (this.sectionStart = -1),
      (this.state = b.AfterClosingTagName),
      this.stateAfterClosingTagName(e));
  }
  stateAfterClosingTagName(e) {
    (e === C.Gt || this.fastForwardTo(C.Gt)) &&
      ((this.state = b.Text), (this.sectionStart = this.index + 1));
  }
  stateBeforeAttributeName(e) {
    e === C.Gt
      ? (this.cbs.onopentagend(this.index),
        this.isSpecial
          ? ((this.state = b.InSpecialTag), (this.sequenceIndex = 0))
          : (this.state = b.Text),
        (this.sectionStart = this.index + 1))
      : e === C.Slash
      ? (this.state = b.InSelfClosingTag)
      : ht(e) ||
        ((this.state = b.InAttributeName), (this.sectionStart = this.index));
  }
  stateInSelfClosingTag(e) {
    e === C.Gt
      ? (this.cbs.onselfclosingtag(this.index),
        (this.state = b.Text),
        (this.sectionStart = this.index + 1),
        (this.isSpecial = !1))
      : ht(e) ||
        ((this.state = b.BeforeAttributeName),
        this.stateBeforeAttributeName(e));
  }
  stateInAttributeName(e) {
    (e === C.Eq || Hu(e)) &&
      (this.cbs.onattribname(this.sectionStart, this.index),
      (this.sectionStart = this.index),
      (this.state = b.AfterAttributeName),
      this.stateAfterAttributeName(e));
  }
  stateAfterAttributeName(e) {
    e === C.Eq
      ? (this.state = b.BeforeAttributeValue)
      : e === C.Slash || e === C.Gt
      ? (this.cbs.onattribend(Ye.NoValue, this.sectionStart),
        (this.sectionStart = -1),
        (this.state = b.BeforeAttributeName),
        this.stateBeforeAttributeName(e))
      : ht(e) ||
        (this.cbs.onattribend(Ye.NoValue, this.sectionStart),
        (this.state = b.InAttributeName),
        (this.sectionStart = this.index));
  }
  stateBeforeAttributeValue(e) {
    e === C.DoubleQuote
      ? ((this.state = b.InAttributeValueDq),
        (this.sectionStart = this.index + 1))
      : e === C.SingleQuote
      ? ((this.state = b.InAttributeValueSq),
        (this.sectionStart = this.index + 1))
      : ht(e) ||
        ((this.sectionStart = this.index),
        (this.state = b.InAttributeValueNq),
        this.stateInAttributeValueNoQuotes(e));
  }
  handleInAttributeValue(e, u) {
    e === u || (!this.decodeEntities && this.fastForwardTo(u))
      ? (this.cbs.onattribdata(this.sectionStart, this.index),
        (this.sectionStart = -1),
        this.cbs.onattribend(
          u === C.DoubleQuote ? Ye.Double : Ye.Single,
          this.index + 1
        ),
        (this.state = b.BeforeAttributeName))
      : this.decodeEntities && e === C.Amp && this.startEntity();
  }
  stateInAttributeValueDoubleQuotes(e) {
    this.handleInAttributeValue(e, C.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(e) {
    this.handleInAttributeValue(e, C.SingleQuote);
  }
  stateInAttributeValueNoQuotes(e) {
    ht(e) || e === C.Gt
      ? (this.cbs.onattribdata(this.sectionStart, this.index),
        (this.sectionStart = -1),
        this.cbs.onattribend(Ye.Unquoted, this.index),
        (this.state = b.BeforeAttributeName),
        this.stateBeforeAttributeName(e))
      : this.decodeEntities && e === C.Amp && this.startEntity();
  }
  stateBeforeDeclaration(e) {
    e === C.OpeningSquareBracket
      ? ((this.state = b.CDATASequence), (this.sequenceIndex = 0))
      : (this.state = e === C.Dash ? b.BeforeComment : b.InDeclaration);
  }
  stateInDeclaration(e) {
    (e === C.Gt || this.fastForwardTo(C.Gt)) &&
      (this.cbs.ondeclaration(this.sectionStart, this.index),
      (this.state = b.Text),
      (this.sectionStart = this.index + 1));
  }
  stateInProcessingInstruction(e) {
    (e === C.Gt || this.fastForwardTo(C.Gt)) &&
      (this.cbs.onprocessinginstruction(this.sectionStart, this.index),
      (this.state = b.Text),
      (this.sectionStart = this.index + 1));
  }
  stateBeforeComment(e) {
    e === C.Dash
      ? ((this.state = b.InCommentLike),
        (this.currentSequence = ue.CommentEnd),
        (this.sequenceIndex = 2),
        (this.sectionStart = this.index + 1))
      : (this.state = b.InDeclaration);
  }
  stateInSpecialComment(e) {
    (e === C.Gt || this.fastForwardTo(C.Gt)) &&
      (this.cbs.oncomment(this.sectionStart, this.index, 0),
      (this.state = b.Text),
      (this.sectionStart = this.index + 1));
  }
  stateBeforeSpecialS(e) {
    const u = e | 32;
    u === ue.ScriptEnd[3]
      ? this.startSpecial(ue.ScriptEnd, 4)
      : u === ue.StyleEnd[3]
      ? this.startSpecial(ue.StyleEnd, 4)
      : ((this.state = b.InTagName), this.stateInTagName(e));
  }
  stateBeforeSpecialT(e) {
    switch (e | 32) {
      case ue.TitleEnd[3]: {
        this.startSpecial(ue.TitleEnd, 4);
        break;
      }
      case ue.TextareaEnd[3]: {
        this.startSpecial(ue.TextareaEnd, 4);
        break;
      }
      case ue.XmpEnd[3]: {
        this.startSpecial(ue.XmpEnd, 4);
        break;
      }
      default:
        (this.state = b.InTagName), this.stateInTagName(e);
    }
  }
  startEntity() {
    (this.baseState = this.state),
      (this.state = b.InEntity),
      (this.entityStart = this.index),
      this.entityDecoder.startEntity(
        this.xmlMode
          ? at.Strict
          : this.baseState === b.Text || this.baseState === b.InSpecialTag
          ? at.Legacy
          : at.Attribute
      );
  }
  stateInEntity() {
    const e = this.entityDecoder.write(this.buffer, this.index - this.offset);
    e >= 0
      ? ((this.state = this.baseState),
        e === 0 && (this.index = this.entityStart))
      : (this.index = this.offset + this.buffer.length - 1);
  }
  cleanup() {
    this.running &&
      this.sectionStart !== this.index &&
      (this.state === b.Text ||
      (this.state === b.InSpecialTag && this.sequenceIndex === 0)
        ? (this.cbs.ontext(this.sectionStart, this.index),
          (this.sectionStart = this.index))
        : (this.state === b.InAttributeValueDq ||
            this.state === b.InAttributeValueSq ||
            this.state === b.InAttributeValueNq) &&
          (this.cbs.onattribdata(this.sectionStart, this.index),
          (this.sectionStart = this.index)));
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  parse() {
    for (; this.shouldContinue(); ) {
      const e = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case b.Text: {
          this.stateText(e);
          break;
        }
        case b.SpecialStartSequence: {
          this.stateSpecialStartSequence(e);
          break;
        }
        case b.InSpecialTag: {
          this.stateInSpecialTag(e);
          break;
        }
        case b.CDATASequence: {
          this.stateCDATASequence(e);
          break;
        }
        case b.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(e);
          break;
        }
        case b.InAttributeName: {
          this.stateInAttributeName(e);
          break;
        }
        case b.InCommentLike: {
          this.stateInCommentLike(e);
          break;
        }
        case b.InSpecialComment: {
          this.stateInSpecialComment(e);
          break;
        }
        case b.BeforeAttributeName: {
          this.stateBeforeAttributeName(e);
          break;
        }
        case b.InTagName: {
          this.stateInTagName(e);
          break;
        }
        case b.InClosingTagName: {
          this.stateInClosingTagName(e);
          break;
        }
        case b.BeforeTagName: {
          this.stateBeforeTagName(e);
          break;
        }
        case b.AfterAttributeName: {
          this.stateAfterAttributeName(e);
          break;
        }
        case b.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(e);
          break;
        }
        case b.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(e);
          break;
        }
        case b.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(e);
          break;
        }
        case b.AfterClosingTagName: {
          this.stateAfterClosingTagName(e);
          break;
        }
        case b.BeforeSpecialS: {
          this.stateBeforeSpecialS(e);
          break;
        }
        case b.BeforeSpecialT: {
          this.stateBeforeSpecialT(e);
          break;
        }
        case b.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(e);
          break;
        }
        case b.InSelfClosingTag: {
          this.stateInSelfClosingTag(e);
          break;
        }
        case b.InDeclaration: {
          this.stateInDeclaration(e);
          break;
        }
        case b.BeforeDeclaration: {
          this.stateBeforeDeclaration(e);
          break;
        }
        case b.BeforeComment: {
          this.stateBeforeComment(e);
          break;
        }
        case b.InProcessingInstruction: {
          this.stateInProcessingInstruction(e);
          break;
        }
        case b.InEntity: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    this.state === b.InEntity &&
      (this.entityDecoder.end(), (this.state = this.baseState)),
      this.handleTrailingData(),
      this.cbs.onend();
  }
  handleTrailingData() {
    const e = this.buffer.length + this.offset;
    this.sectionStart >= e ||
      (this.state === b.InCommentLike
        ? this.currentSequence === ue.CdataEnd
          ? this.cbs.oncdata(this.sectionStart, e, 0)
          : this.cbs.oncomment(this.sectionStart, e, 0)
        : this.state === b.InTagName ||
          this.state === b.BeforeAttributeName ||
          this.state === b.BeforeAttributeValue ||
          this.state === b.AfterAttributeName ||
          this.state === b.InAttributeName ||
          this.state === b.InAttributeValueSq ||
          this.state === b.InAttributeValueDq ||
          this.state === b.InAttributeValueNq ||
          this.state === b.InClosingTagName ||
          this.cbs.ontext(this.sectionStart, e));
  }
  emitCodePoint(e, u) {
    this.baseState !== b.Text && this.baseState !== b.InSpecialTag
      ? (this.sectionStart < this.entityStart &&
          this.cbs.onattribdata(this.sectionStart, this.entityStart),
        (this.sectionStart = this.entityStart + u),
        (this.index = this.sectionStart - 1),
        this.cbs.onattribentity(e))
      : (this.sectionStart < this.entityStart &&
          this.cbs.ontext(this.sectionStart, this.entityStart),
        (this.sectionStart = this.entityStart + u),
        (this.index = this.sectionStart - 1),
        this.cbs.ontextentity(e, this.sectionStart));
  }
}
const Xt = new Set([
    'input',
    'option',
    'optgroup',
    'select',
    'button',
    'datalist',
    'textarea',
  ]),
  $ = new Set(['p']),
  Xr = new Set(['thead', 'tbody']),
  Jr = new Set(['dd', 'dt']),
  Zr = new Set(['rt', 'rp']),
  rl = new Map([
    ['tr', new Set(['tr', 'th', 'td'])],
    ['th', new Set(['th'])],
    ['td', new Set(['thead', 'th', 'td'])],
    ['body', new Set(['head', 'link', 'script'])],
    ['li', new Set(['li'])],
    ['p', $],
    ['h1', $],
    ['h2', $],
    ['h3', $],
    ['h4', $],
    ['h5', $],
    ['h6', $],
    ['select', Xt],
    ['input', Xt],
    ['output', Xt],
    ['button', Xt],
    ['datalist', Xt],
    ['textarea', Xt],
    ['option', new Set(['option'])],
    ['optgroup', new Set(['optgroup', 'option'])],
    ['dd', Jr],
    ['dt', Jr],
    ['address', $],
    ['article', $],
    ['aside', $],
    ['blockquote', $],
    ['details', $],
    ['div', $],
    ['dl', $],
    ['fieldset', $],
    ['figcaption', $],
    ['figure', $],
    ['footer', $],
    ['form', $],
    ['header', $],
    ['hr', $],
    ['main', $],
    ['nav', $],
    ['ol', $],
    ['pre', $],
    ['section', $],
    ['table', $],
    ['ul', $],
    ['rt', Zr],
    ['rp', Zr],
    ['tbody', Xr],
    ['tfoot', Xr],
  ]),
  il = new Set([
    'area',
    'base',
    'basefont',
    'br',
    'col',
    'command',
    'embed',
    'frame',
    'hr',
    'img',
    'input',
    'isindex',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
  ]),
  Yr = new Set(['math', 'svg']),
  Qr = new Set([
    'mi',
    'mo',
    'mn',
    'ms',
    'mtext',
    'annotation-xml',
    'foreignobject',
    'desc',
    'title',
  ]),
  al = /\s|\//;
let Ss = class {
  constructor(e, u = {}) {
    var s, n, r, i, a, o;
    (this.options = u),
      (this.startIndex = 0),
      (this.endIndex = 0),
      (this.openTagStart = 0),
      (this.tagname = ''),
      (this.attribname = ''),
      (this.attribvalue = ''),
      (this.attribs = null),
      (this.stack = []),
      (this.buffers = []),
      (this.bufferOffset = 0),
      (this.writeIndex = 0),
      (this.ended = !1),
      (this.cbs = e ?? {}),
      (this.htmlMode = !this.options.xmlMode),
      (this.lowerCaseTagNames =
        (s = u.lowerCaseTags) !== null && s !== void 0 ? s : this.htmlMode),
      (this.lowerCaseAttributeNames =
        (n = u.lowerCaseAttributeNames) !== null && n !== void 0
          ? n
          : this.htmlMode),
      (this.recognizeSelfClosing =
        (r = u.recognizeSelfClosing) !== null && r !== void 0
          ? r
          : !this.htmlMode),
      (this.tokenizer = new (
        (i = u.Tokenizer) !== null && i !== void 0 ? i : Ea
      )(this.options, this)),
      (this.foreignContext = [!this.htmlMode]),
      (o = (a = this.cbs).onparserinit) === null ||
        o === void 0 ||
        o.call(a, this);
  }
  ontext(e, u) {
    var s, n;
    const r = this.getSlice(e, u);
    (this.endIndex = u - 1),
      (n = (s = this.cbs).ontext) === null || n === void 0 || n.call(s, r),
      (this.startIndex = u);
  }
  ontextentity(e, u) {
    var s, n;
    (this.endIndex = u - 1),
      (n = (s = this.cbs).ontext) === null || n === void 0 || n.call(s, Wr(e)),
      (this.startIndex = u);
  }
  isVoidElement(e) {
    return this.htmlMode && il.has(e);
  }
  onopentagname(e, u) {
    this.endIndex = u;
    let s = this.getSlice(e, u);
    this.lowerCaseTagNames && (s = s.toLowerCase()), this.emitOpenTag(s);
  }
  emitOpenTag(e) {
    var u, s, n, r;
    (this.openTagStart = this.startIndex), (this.tagname = e);
    const i = this.htmlMode && rl.get(e);
    if (i)
      for (; this.stack.length > 0 && i.has(this.stack[0]); ) {
        const a = this.stack.shift();
        (s = (u = this.cbs).onclosetag) === null ||
          s === void 0 ||
          s.call(u, a, !0);
      }
    this.isVoidElement(e) ||
      (this.stack.unshift(e),
      this.htmlMode &&
        (Yr.has(e)
          ? this.foreignContext.unshift(!0)
          : Qr.has(e) && this.foreignContext.unshift(!1))),
      (r = (n = this.cbs).onopentagname) === null ||
        r === void 0 ||
        r.call(n, e),
      this.cbs.onopentag && (this.attribs = {});
  }
  endOpenTag(e) {
    var u, s;
    (this.startIndex = this.openTagStart),
      this.attribs &&
        ((s = (u = this.cbs).onopentag) === null ||
          s === void 0 ||
          s.call(u, this.tagname, this.attribs, e),
        (this.attribs = null)),
      this.cbs.onclosetag &&
        this.isVoidElement(this.tagname) &&
        this.cbs.onclosetag(this.tagname, !0),
      (this.tagname = '');
  }
  onopentagend(e) {
    (this.endIndex = e), this.endOpenTag(!1), (this.startIndex = e + 1);
  }
  onclosetag(e, u) {
    var s, n, r, i, a, o, c, l;
    this.endIndex = u;
    let f = this.getSlice(e, u);
    if (
      (this.lowerCaseTagNames && (f = f.toLowerCase()),
      this.htmlMode && (Yr.has(f) || Qr.has(f)) && this.foreignContext.shift(),
      this.isVoidElement(f))
    )
      this.htmlMode &&
        f === 'br' &&
        ((i = (r = this.cbs).onopentagname) === null ||
          i === void 0 ||
          i.call(r, 'br'),
        (o = (a = this.cbs).onopentag) === null ||
          o === void 0 ||
          o.call(a, 'br', {}, !0),
        (l = (c = this.cbs).onclosetag) === null ||
          l === void 0 ||
          l.call(c, 'br', !1));
    else {
      const p = this.stack.indexOf(f);
      if (p !== -1)
        for (let h = 0; h <= p; h++) {
          const m = this.stack.shift();
          (n = (s = this.cbs).onclosetag) === null ||
            n === void 0 ||
            n.call(s, m, h !== p);
        }
      else
        this.htmlMode &&
          f === 'p' &&
          (this.emitOpenTag('p'), this.closeCurrentTag(!0));
    }
    this.startIndex = u + 1;
  }
  onselfclosingtag(e) {
    (this.endIndex = e),
      this.recognizeSelfClosing || this.foreignContext[0]
        ? (this.closeCurrentTag(!1), (this.startIndex = e + 1))
        : this.onopentagend(e);
  }
  closeCurrentTag(e) {
    var u, s;
    const n = this.tagname;
    this.endOpenTag(e),
      this.stack[0] === n &&
        ((s = (u = this.cbs).onclosetag) === null ||
          s === void 0 ||
          s.call(u, n, !e),
        this.stack.shift());
  }
  onattribname(e, u) {
    this.startIndex = e;
    const s = this.getSlice(e, u);
    this.attribname = this.lowerCaseAttributeNames ? s.toLowerCase() : s;
  }
  onattribdata(e, u) {
    this.attribvalue += this.getSlice(e, u);
  }
  onattribentity(e) {
    this.attribvalue += Wr(e);
  }
  onattribend(e, u) {
    var s, n;
    (this.endIndex = u),
      (n = (s = this.cbs).onattribute) === null ||
        n === void 0 ||
        n.call(
          s,
          this.attribname,
          this.attribvalue,
          e === Ye.Double
            ? '"'
            : e === Ye.Single
            ? "'"
            : e === Ye.NoValue
            ? void 0
            : null
        ),
      this.attribs &&
        !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) &&
        (this.attribs[this.attribname] = this.attribvalue),
      (this.attribvalue = '');
  }
  getInstructionName(e) {
    const u = e.search(al);
    let s = u < 0 ? e : e.substr(0, u);
    return this.lowerCaseTagNames && (s = s.toLowerCase()), s;
  }
  ondeclaration(e, u) {
    this.endIndex = u;
    const s = this.getSlice(e, u);
    if (this.cbs.onprocessinginstruction) {
      const n = this.getInstructionName(s);
      this.cbs.onprocessinginstruction(`!${n}`, `!${s}`);
    }
    this.startIndex = u + 1;
  }
  onprocessinginstruction(e, u) {
    this.endIndex = u;
    const s = this.getSlice(e, u);
    if (this.cbs.onprocessinginstruction) {
      const n = this.getInstructionName(s);
      this.cbs.onprocessinginstruction(`?${n}`, `?${s}`);
    }
    this.startIndex = u + 1;
  }
  oncomment(e, u, s) {
    var n, r, i, a;
    (this.endIndex = u),
      (r = (n = this.cbs).oncomment) === null ||
        r === void 0 ||
        r.call(n, this.getSlice(e, u - s)),
      (a = (i = this.cbs).oncommentend) === null || a === void 0 || a.call(i),
      (this.startIndex = u + 1);
  }
  oncdata(e, u, s) {
    var n, r, i, a, o, c, l, f, p, h;
    this.endIndex = u;
    const m = this.getSlice(e, u - s);
    !this.htmlMode || this.options.recognizeCDATA
      ? ((r = (n = this.cbs).oncdatastart) === null ||
          r === void 0 ||
          r.call(n),
        (a = (i = this.cbs).ontext) === null || a === void 0 || a.call(i, m),
        (c = (o = this.cbs).oncdataend) === null || c === void 0 || c.call(o))
      : ((f = (l = this.cbs).oncomment) === null ||
          f === void 0 ||
          f.call(l, `[CDATA[${m}]]`),
        (h = (p = this.cbs).oncommentend) === null ||
          h === void 0 ||
          h.call(p)),
      (this.startIndex = u + 1);
  }
  onend() {
    var e, u;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let s = 0; s < this.stack.length; s++)
        this.cbs.onclosetag(this.stack[s], !0);
    }
    (u = (e = this.cbs).onend) === null || u === void 0 || u.call(e);
  }
  reset() {
    var e, u, s, n;
    (u = (e = this.cbs).onreset) === null || u === void 0 || u.call(e),
      this.tokenizer.reset(),
      (this.tagname = ''),
      (this.attribname = ''),
      (this.attribs = null),
      (this.stack.length = 0),
      (this.startIndex = 0),
      (this.endIndex = 0),
      (n = (s = this.cbs).onparserinit) === null ||
        n === void 0 ||
        n.call(s, this),
      (this.buffers.length = 0),
      (this.foreignContext.length = 0),
      this.foreignContext.unshift(!this.htmlMode),
      (this.bufferOffset = 0),
      (this.writeIndex = 0),
      (this.ended = !1);
  }
  parseComplete(e) {
    this.reset(), this.end(e);
  }
  getSlice(e, u) {
    for (; e - this.bufferOffset >= this.buffers[0].length; )
      this.shiftBuffer();
    let s = this.buffers[0].slice(e - this.bufferOffset, u - this.bufferOffset);
    for (; u - this.bufferOffset > this.buffers[0].length; )
      this.shiftBuffer(),
        (s += this.buffers[0].slice(0, u - this.bufferOffset));
    return s;
  }
  shiftBuffer() {
    (this.bufferOffset += this.buffers[0].length),
      this.writeIndex--,
      this.buffers.shift();
  }
  write(e) {
    var u, s;
    if (this.ended) {
      (s = (u = this.cbs).onerror) === null ||
        s === void 0 ||
        s.call(u, new Error('.write() after done!'));
      return;
    }
    this.buffers.push(e),
      this.tokenizer.running && (this.tokenizer.write(e), this.writeIndex++);
  }
  end(e) {
    var u, s;
    if (this.ended) {
      (s = (u = this.cbs).onerror) === null ||
        s === void 0 ||
        s.call(u, new Error('.end() after done!'));
      return;
    }
    e && this.write(e), (this.ended = !0), this.tokenizer.end();
  }
  pause() {
    this.tokenizer.pause();
  }
  resume() {
    for (
      this.tokenizer.resume();
      this.tokenizer.running && this.writeIndex < this.buffers.length;

    )
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    this.ended && this.tokenizer.end();
  }
  parseChunk(e) {
    this.write(e);
  }
  done(e) {
    this.end(e);
  }
};
var P;
(function (t) {
  (t.Root = 'root'),
    (t.Text = 'text'),
    (t.Directive = 'directive'),
    (t.Comment = 'comment'),
    (t.Script = 'script'),
    (t.Style = 'style'),
    (t.Tag = 'tag'),
    (t.CDATA = 'cdata'),
    (t.Doctype = 'doctype');
})(P || (P = {}));
function wa(t) {
  return t.type === P.Tag || t.type === P.Script || t.type === P.Style;
}
const Aa = P.Root,
  _a = P.Text,
  Na = P.Directive,
  Ra = P.Comment,
  Da = P.Script,
  La = P.Style,
  Ia = P.Tag,
  Ma = P.CDATA,
  Oa = P.Doctype,
  ol = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        CDATA: Ma,
        Comment: Ra,
        Directive: Na,
        Doctype: Oa,
        get ElementType() {
          return P;
        },
        Root: Aa,
        Script: Da,
        Style: La,
        Tag: Ia,
        Text: _a,
        isTag: wa,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  );
let ka = class {
  constructor() {
    (this.parent = null),
      (this.prev = null),
      (this.next = null),
      (this.startIndex = null),
      (this.endIndex = null);
  }
  get parentNode() {
    return this.parent;
  }
  set parentNode(e) {
    this.parent = e;
  }
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(e) {
    this.prev = e;
  }
  get nextSibling() {
    return this.next;
  }
  set nextSibling(e) {
    this.next = e;
  }
  cloneNode(e = !1) {
    return Ua(this, e);
  }
};
class zn extends ka {
  constructor(e) {
    super(), (this.data = e);
  }
  get nodeValue() {
    return this.data;
  }
  set nodeValue(e) {
    this.data = e;
  }
}
let wn = class extends zn {
    constructor() {
      super(...arguments), (this.type = P.Text);
    }
    get nodeType() {
      return 3;
    }
  },
  Pa = class extends zn {
    constructor() {
      super(...arguments), (this.type = P.Comment);
    }
    get nodeType() {
      return 8;
    }
  };
class qa extends zn {
  constructor(e, u) {
    super(u), (this.name = e), (this.type = P.Directive);
  }
  get nodeType() {
    return 1;
  }
}
class Kn extends ka {
  constructor(e) {
    super(), (this.children = e);
  }
  get firstChild() {
    var e;
    return (e = this.children[0]) !== null && e !== void 0 ? e : null;
  }
  get lastChild() {
    return this.children.length > 0
      ? this.children[this.children.length - 1]
      : null;
  }
  get childNodes() {
    return this.children;
  }
  set childNodes(e) {
    this.children = e;
  }
}
class Ba extends Kn {
  constructor() {
    super(...arguments), (this.type = P.CDATA);
  }
  get nodeType() {
    return 4;
  }
}
let An = class extends Kn {
    constructor() {
      super(...arguments), (this.type = P.Root);
    }
    get nodeType() {
      return 9;
    }
  },
  Fa = class extends Kn {
    constructor(
      e,
      u,
      s = [],
      n = e === 'script' ? P.Script : e === 'style' ? P.Style : P.Tag
    ) {
      super(s), (this.name = e), (this.attribs = u), (this.type = n);
    }
    get nodeType() {
      return 1;
    }
    get tagName() {
      return this.name;
    }
    set tagName(e) {
      this.name = e;
    }
    get attributes() {
      return Object.keys(this.attribs).map((e) => {
        var u, s;
        return {
          name: e,
          value: this.attribs[e],
          namespace:
            (u = this['x-attribsNamespace']) === null || u === void 0
              ? void 0
              : u[e],
          prefix:
            (s = this['x-attribsPrefix']) === null || s === void 0
              ? void 0
              : s[e],
        };
      });
    }
  };
function qe(t) {
  return wa(t);
}
function xs(t) {
  return t.type === P.CDATA;
}
function Bt(t) {
  return t.type === P.Text;
}
function Wn(t) {
  return t.type === P.Comment;
}
function cl(t) {
  return t.type === P.Directive;
}
function Va(t) {
  return t.type === P.Root;
}
function tt(t) {
  return Object.prototype.hasOwnProperty.call(t, 'children');
}
function Ua(t, e = !1) {
  let u;
  if (Bt(t)) u = new wn(t.data);
  else if (Wn(t)) u = new Pa(t.data);
  else if (qe(t)) {
    const s = e ? Bs(t.children) : [],
      n = new Fa(t.name, { ...t.attribs }, s);
    s.forEach((r) => (r.parent = n)),
      t.namespace != null && (n.namespace = t.namespace),
      t['x-attribsNamespace'] &&
        (n['x-attribsNamespace'] = { ...t['x-attribsNamespace'] }),
      t['x-attribsPrefix'] &&
        (n['x-attribsPrefix'] = { ...t['x-attribsPrefix'] }),
      (u = n);
  } else if (xs(t)) {
    const s = e ? Bs(t.children) : [],
      n = new Ba(s);
    s.forEach((r) => (r.parent = n)), (u = n);
  } else if (Va(t)) {
    const s = e ? Bs(t.children) : [],
      n = new An(s);
    s.forEach((r) => (r.parent = n)),
      t['x-mode'] && (n['x-mode'] = t['x-mode']),
      (u = n);
  } else if (cl(t)) {
    const s = new qa(t.name, t.data);
    t['x-name'] != null &&
      ((s['x-name'] = t['x-name']),
      (s['x-publicId'] = t['x-publicId']),
      (s['x-systemId'] = t['x-systemId'])),
      (u = s);
  } else throw new Error(`Not implemented yet: ${t.type}`);
  return (
    (u.startIndex = t.startIndex),
    (u.endIndex = t.endIndex),
    t.sourceCodeLocation != null &&
      (u.sourceCodeLocation = t.sourceCodeLocation),
    u
  );
}
function Bs(t) {
  const e = t.map((u) => Ua(u, !0));
  for (let u = 1; u < e.length; u++)
    (e[u].prev = e[u - 1]), (e[u - 1].next = e[u]);
  return e;
}
const ei = { withStartIndices: !1, withEndIndices: !1, xmlMode: !1 };
class Eu {
  constructor(e, u, s) {
    (this.dom = []),
      (this.root = new An(this.dom)),
      (this.done = !1),
      (this.tagStack = [this.root]),
      (this.lastNode = null),
      (this.parser = null),
      typeof u == 'function' && ((s = u), (u = ei)),
      typeof e == 'object' && ((u = e), (e = void 0)),
      (this.callback = e ?? null),
      (this.options = u ?? ei),
      (this.elementCB = s ?? null);
  }
  onparserinit(e) {
    this.parser = e;
  }
  onreset() {
    (this.dom = []),
      (this.root = new An(this.dom)),
      (this.done = !1),
      (this.tagStack = [this.root]),
      (this.lastNode = null),
      (this.parser = null);
  }
  onend() {
    this.done ||
      ((this.done = !0), (this.parser = null), this.handleCallback(null));
  }
  onerror(e) {
    this.handleCallback(e);
  }
  onclosetag() {
    this.lastNode = null;
    const e = this.tagStack.pop();
    this.options.withEndIndices && (e.endIndex = this.parser.endIndex),
      this.elementCB && this.elementCB(e);
  }
  onopentag(e, u) {
    const s = this.options.xmlMode ? P.Tag : void 0,
      n = new Fa(e, u, void 0, s);
    this.addNode(n), this.tagStack.push(n);
  }
  ontext(e) {
    const { lastNode: u } = this;
    if (u && u.type === P.Text)
      (u.data += e),
        this.options.withEndIndices && (u.endIndex = this.parser.endIndex);
    else {
      const s = new wn(e);
      this.addNode(s), (this.lastNode = s);
    }
  }
  oncomment(e) {
    if (this.lastNode && this.lastNode.type === P.Comment) {
      this.lastNode.data += e;
      return;
    }
    const u = new Pa(e);
    this.addNode(u), (this.lastNode = u);
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const e = new wn(''),
      u = new Ba([e]);
    this.addNode(u), (e.parent = u), (this.lastNode = e);
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(e, u) {
    const s = new qa(e, u);
    this.addNode(s);
  }
  handleCallback(e) {
    if (typeof this.callback == 'function') this.callback(e, this.dom);
    else if (e) throw e;
  }
  addNode(e) {
    const u = this.tagStack[this.tagStack.length - 1],
      s = u.children[u.children.length - 1];
    this.options.withStartIndices && (e.startIndex = this.parser.startIndex),
      this.options.withEndIndices && (e.endIndex = this.parser.endIndex),
      u.children.push(e),
      s && ((e.prev = s), (s.next = e)),
      (e.parent = u),
      (this.lastNode = null);
  }
}
const ti = /["&'<>$\x80-\uFFFF]/g,
  ll = new Map([
    [34, '&quot;'],
    [38, '&amp;'],
    [39, '&apos;'],
    [60, '&lt;'],
    [62, '&gt;'],
  ]),
  dl =
    String.prototype.codePointAt != null
      ? (t, e) => t.codePointAt(e)
      : (t, e) =>
          (t.charCodeAt(e) & 64512) === 55296
            ? (t.charCodeAt(e) - 55296) * 1024 +
              t.charCodeAt(e + 1) -
              56320 +
              65536
            : t.charCodeAt(e);
function $a(t) {
  let e = '',
    u = 0,
    s;
  for (; (s = ti.exec(t)) !== null; ) {
    const n = s.index,
      r = t.charCodeAt(n),
      i = ll.get(r);
    i !== void 0
      ? ((e += t.substring(u, n) + i), (u = n + 1))
      : ((e += `${t.substring(u, n)}&#x${dl(t, n).toString(16)};`),
        (u = ti.lastIndex += +((r & 64512) === 55296)));
  }
  return e + t.substr(u);
}
function Ha(t, e) {
  return function (s) {
    let n,
      r = 0,
      i = '';
    for (; (n = t.exec(s)); )
      r !== n.index && (i += s.substring(r, n.index)),
        (i += e.get(n[0].charCodeAt(0))),
        (r = n.index + 1);
    return i + s.substring(r);
  };
}
const fl = Ha(
    /["&\u00A0]/g,
    new Map([
      [34, '&quot;'],
      [38, '&amp;'],
      [160, '&nbsp;'],
    ])
  ),
  hl = Ha(
    /[&<>\u00A0]/g,
    new Map([
      [38, '&amp;'],
      [60, '&lt;'],
      [62, '&gt;'],
      [160, '&nbsp;'],
    ])
  ),
  bl = new Map(
    [
      'altGlyph',
      'altGlyphDef',
      'altGlyphItem',
      'animateColor',
      'animateMotion',
      'animateTransform',
      'clipPath',
      'feBlend',
      'feColorMatrix',
      'feComponentTransfer',
      'feComposite',
      'feConvolveMatrix',
      'feDiffuseLighting',
      'feDisplacementMap',
      'feDistantLight',
      'feDropShadow',
      'feFlood',
      'feFuncA',
      'feFuncB',
      'feFuncG',
      'feFuncR',
      'feGaussianBlur',
      'feImage',
      'feMerge',
      'feMergeNode',
      'feMorphology',
      'feOffset',
      'fePointLight',
      'feSpecularLighting',
      'feSpotLight',
      'feTile',
      'feTurbulence',
      'foreignObject',
      'glyphRef',
      'linearGradient',
      'radialGradient',
      'textPath',
    ].map((t) => [t.toLowerCase(), t])
  ),
  pl = new Map(
    [
      'definitionURL',
      'attributeName',
      'attributeType',
      'baseFrequency',
      'baseProfile',
      'calcMode',
      'clipPathUnits',
      'diffuseConstant',
      'edgeMode',
      'filterUnits',
      'glyphRef',
      'gradientTransform',
      'gradientUnits',
      'kernelMatrix',
      'kernelUnitLength',
      'keyPoints',
      'keySplines',
      'keyTimes',
      'lengthAdjust',
      'limitingConeAngle',
      'markerHeight',
      'markerUnits',
      'markerWidth',
      'maskContentUnits',
      'maskUnits',
      'numOctaves',
      'pathLength',
      'patternContentUnits',
      'patternTransform',
      'patternUnits',
      'pointsAtX',
      'pointsAtY',
      'pointsAtZ',
      'preserveAlpha',
      'preserveAspectRatio',
      'primitiveUnits',
      'refX',
      'refY',
      'repeatCount',
      'repeatDur',
      'requiredExtensions',
      'requiredFeatures',
      'specularConstant',
      'specularExponent',
      'spreadMethod',
      'startOffset',
      'stdDeviation',
      'stitchTiles',
      'surfaceScale',
      'systemLanguage',
      'tableValues',
      'targetX',
      'targetY',
      'textLength',
      'viewBox',
      'viewTarget',
      'xChannelSelector',
      'yChannelSelector',
      'zoomAndPan',
    ].map((t) => [t.toLowerCase(), t])
  ),
  gl = new Set([
    'style',
    'script',
    'xmp',
    'iframe',
    'noembed',
    'noframes',
    'plaintext',
    'noscript',
  ]);
function ml(t) {
  return t.replace(/"/g, '&quot;');
}
function Sl(t, e) {
  var u;
  if (!t) return;
  const s =
    ((u = e.encodeEntities) !== null && u !== void 0 ? u : e.decodeEntities) ===
    !1
      ? ml
      : e.xmlMode || e.encodeEntities !== 'utf8'
      ? $a
      : fl;
  return Object.keys(t)
    .map((n) => {
      var r, i;
      const a = (r = t[n]) !== null && r !== void 0 ? r : '';
      return (
        e.xmlMode === 'foreign' &&
          (n = (i = pl.get(n)) !== null && i !== void 0 ? i : n),
        !e.emptyAttrs && !e.xmlMode && a === '' ? n : `${n}="${s(a)}"`
      );
    })
    .join(' ');
}
const ui = new Set([
  'area',
  'base',
  'basefont',
  'br',
  'col',
  'command',
  'embed',
  'frame',
  'hr',
  'img',
  'input',
  'isindex',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);
function Xn(t, e = {}) {
  const u = 'length' in t ? t : [t];
  let s = '';
  for (let n = 0; n < u.length; n++) s += xl(u[n], e);
  return s;
}
function xl(t, e) {
  switch (t.type) {
    case Aa:
      return Xn(t.children, e);
    case Oa:
    case Na:
      return vl(t);
    case Ra:
      return Al(t);
    case Ma:
      return wl(t);
    case Da:
    case La:
    case Ia:
      return Cl(t, e);
    case _a:
      return El(t, e);
  }
}
const yl = new Set([
    'mi',
    'mo',
    'mn',
    'ms',
    'mtext',
    'annotation-xml',
    'foreignObject',
    'desc',
    'title',
  ]),
  Tl = new Set(['svg', 'math']);
function Cl(t, e) {
  var u;
  e.xmlMode === 'foreign' &&
    ((t.name = (u = bl.get(t.name)) !== null && u !== void 0 ? u : t.name),
    t.parent && yl.has(t.parent.name) && (e = { ...e, xmlMode: !1 })),
    !e.xmlMode && Tl.has(t.name) && (e = { ...e, xmlMode: 'foreign' });
  let s = `<${t.name}`;
  const n = Sl(t.attribs, e);
  return (
    n && (s += ` ${n}`),
    t.children.length === 0 &&
    (e.xmlMode ? e.selfClosingTags !== !1 : e.selfClosingTags && ui.has(t.name))
      ? (e.xmlMode || (s += ' '), (s += '/>'))
      : ((s += '>'),
        t.children.length > 0 && (s += Xn(t.children, e)),
        (e.xmlMode || !ui.has(t.name)) && (s += `</${t.name}>`)),
    s
  );
}
function vl(t) {
  return `<${t.data}>`;
}
function El(t, e) {
  var u;
  let s = t.data || '';
  return (
    ((u = e.encodeEntities) !== null && u !== void 0 ? u : e.decodeEntities) !==
      !1 &&
      !(!e.xmlMode && t.parent && gl.has(t.parent.name)) &&
      (s = e.xmlMode || e.encodeEntities !== 'utf8' ? $a(s) : hl(s)),
    s
  );
}
function wl(t) {
  return `<![CDATA[${t.children[0].data}]]>`;
}
function Al(t) {
  return `<!--${t.data}-->`;
}
function Ga(t, e) {
  return Xn(t, e);
}
function _l(t, e) {
  return tt(t) ? t.children.map((u) => Ga(u, e)).join('') : '';
}
function us(t) {
  return Array.isArray(t)
    ? t.map(us).join('')
    : qe(t)
    ? t.name === 'br'
      ? `
`
      : us(t.children)
    : xs(t)
    ? us(t.children)
    : Bt(t)
    ? t.data
    : '';
}
function os(t) {
  return Array.isArray(t)
    ? t.map(os).join('')
    : tt(t) && !Wn(t)
    ? os(t.children)
    : Bt(t)
    ? t.data
    : '';
}
function _n(t) {
  return Array.isArray(t)
    ? t.map(_n).join('')
    : tt(t) && (t.type === P.Tag || xs(t))
    ? _n(t.children)
    : Bt(t)
    ? t.data
    : '';
}
function ja(t) {
  return tt(t) ? t.children : [];
}
function za(t) {
  return t.parent || null;
}
function Nl(t) {
  const e = za(t);
  if (e != null) return ja(e);
  const u = [t];
  let { prev: s, next: n } = t;
  for (; s != null; ) u.unshift(s), ({ prev: s } = s);
  for (; n != null; ) u.push(n), ({ next: n } = n);
  return u;
}
function Rl(t, e) {
  var u;
  return (u = t.attribs) === null || u === void 0 ? void 0 : u[e];
}
function Dl(t, e) {
  return (
    t.attribs != null &&
    Object.prototype.hasOwnProperty.call(t.attribs, e) &&
    t.attribs[e] != null
  );
}
function Ll(t) {
  return t.name;
}
function Il(t) {
  let { next: e } = t;
  for (; e !== null && !qe(e); ) ({ next: e } = e);
  return e;
}
function Ml(t) {
  let { prev: e } = t;
  for (; e !== null && !qe(e); ) ({ prev: e } = e);
  return e;
}
function Nu(t) {
  if (
    (t.prev && (t.prev.next = t.next),
    t.next && (t.next.prev = t.prev),
    t.parent)
  ) {
    const e = t.parent.children,
      u = e.lastIndexOf(t);
    u >= 0 && e.splice(u, 1);
  }
  (t.next = null), (t.prev = null), (t.parent = null);
}
function Ol(t, e) {
  const u = (e.prev = t.prev);
  u && (u.next = e);
  const s = (e.next = t.next);
  s && (s.prev = e);
  const n = (e.parent = t.parent);
  if (n) {
    const r = n.children;
    (r[r.lastIndexOf(t)] = e), (t.parent = null);
  }
}
function kl(t, e) {
  if ((Nu(e), (e.next = null), (e.parent = t), t.children.push(e) > 1)) {
    const u = t.children[t.children.length - 2];
    (u.next = e), (e.prev = u);
  } else e.prev = null;
}
function Pl(t, e) {
  Nu(e);
  const { parent: u } = t,
    s = t.next;
  if (((e.next = s), (e.prev = t), (t.next = e), (e.parent = u), s)) {
    if (((s.prev = e), u)) {
      const n = u.children;
      n.splice(n.lastIndexOf(s), 0, e);
    }
  } else u && u.children.push(e);
}
function ql(t, e) {
  if ((Nu(e), (e.parent = t), (e.prev = null), t.children.unshift(e) !== 1)) {
    const u = t.children[1];
    (u.prev = e), (e.next = u);
  } else e.next = null;
}
function Bl(t, e) {
  Nu(e);
  const { parent: u } = t;
  if (u) {
    const s = u.children;
    s.splice(s.indexOf(t), 0, e);
  }
  t.prev && (t.prev.next = e),
    (e.parent = u),
    (e.prev = t.prev),
    (e.next = t),
    (t.prev = e);
}
function Ru(t, e, u = !0, s = 1 / 0) {
  return Ka(t, Array.isArray(e) ? e : [e], u, s);
}
function Ka(t, e, u, s) {
  const n = [],
    r = [Array.isArray(e) ? e : [e]],
    i = [0];
  for (;;) {
    if (i[0] >= r[0].length) {
      if (i.length === 1) return n;
      r.shift(), i.shift();
      continue;
    }
    const a = r[0][i[0]++];
    if (t(a) && (n.push(a), --s <= 0)) return n;
    u &&
      tt(a) &&
      a.children.length > 0 &&
      (i.unshift(0), r.unshift(a.children));
  }
}
function Fl(t, e) {
  return e.find(t);
}
function Jn(t, e, u = !0) {
  const s = Array.isArray(e) ? e : [e];
  for (let n = 0; n < s.length; n++) {
    const r = s[n];
    if (qe(r) && t(r)) return r;
    if (u && tt(r) && r.children.length > 0) {
      const i = Jn(t, r.children, !0);
      if (i) return i;
    }
  }
  return null;
}
function Wa(t, e) {
  return (Array.isArray(e) ? e : [e]).some(
    (u) => (qe(u) && t(u)) || (tt(u) && Wa(t, u.children))
  );
}
function Vl(t, e) {
  const u = [],
    s = [Array.isArray(e) ? e : [e]],
    n = [0];
  for (;;) {
    if (n[0] >= s[0].length) {
      if (s.length === 1) return u;
      s.shift(), n.shift();
      continue;
    }
    const r = s[0][n[0]++];
    qe(r) && t(r) && u.push(r),
      tt(r) && r.children.length > 0 && (n.unshift(0), s.unshift(r.children));
  }
}
const cs = {
  tag_name(t) {
    return typeof t == 'function'
      ? (e) => qe(e) && t(e.name)
      : t === '*'
      ? qe
      : (e) => qe(e) && e.name === t;
  },
  tag_type(t) {
    return typeof t == 'function' ? (e) => t(e.type) : (e) => e.type === t;
  },
  tag_contains(t) {
    return typeof t == 'function'
      ? (e) => Bt(e) && t(e.data)
      : (e) => Bt(e) && e.data === t;
  },
};
function Zn(t, e) {
  return typeof e == 'function'
    ? (u) => qe(u) && e(u.attribs[t])
    : (u) => qe(u) && u.attribs[t] === e;
}
function Ul(t, e) {
  return (u) => t(u) || e(u);
}
function Xa(t) {
  const e = Object.keys(t).map((u) => {
    const s = t[u];
    return Object.prototype.hasOwnProperty.call(cs, u) ? cs[u](s) : Zn(u, s);
  });
  return e.length === 0 ? null : e.reduce(Ul);
}
function $l(t, e) {
  const u = Xa(t);
  return u ? u(e) : !0;
}
function Hl(t, e, u, s = 1 / 0) {
  const n = Xa(t);
  return n ? Ru(n, e, u, s) : [];
}
function Gl(t, e, u = !0) {
  return Array.isArray(e) || (e = [e]), Jn(Zn('id', t), e, u);
}
function cu(t, e, u = !0, s = 1 / 0) {
  return Ru(cs.tag_name(t), e, u, s);
}
function jl(t, e, u = !0, s = 1 / 0) {
  return Ru(Zn('class', t), e, u, s);
}
function zl(t, e, u = !0, s = 1 / 0) {
  return Ru(cs.tag_type(t), e, u, s);
}
function Kl(t) {
  let e = t.length;
  for (; --e >= 0; ) {
    const u = t[e];
    if (e > 0 && t.lastIndexOf(u, e - 1) >= 0) {
      t.splice(e, 1);
      continue;
    }
    for (let s = u.parent; s; s = s.parent)
      if (t.includes(s)) {
        t.splice(e, 1);
        break;
      }
  }
  return t;
}
var je;
(function (t) {
  (t[(t.DISCONNECTED = 1)] = 'DISCONNECTED'),
    (t[(t.PRECEDING = 2)] = 'PRECEDING'),
    (t[(t.FOLLOWING = 4)] = 'FOLLOWING'),
    (t[(t.CONTAINS = 8)] = 'CONTAINS'),
    (t[(t.CONTAINED_BY = 16)] = 'CONTAINED_BY');
})(je || (je = {}));
function Ja(t, e) {
  const u = [],
    s = [];
  if (t === e) return 0;
  let n = tt(t) ? t : t.parent;
  for (; n; ) u.unshift(n), (n = n.parent);
  for (n = tt(e) ? e : e.parent; n; ) s.unshift(n), (n = n.parent);
  const r = Math.min(u.length, s.length);
  let i = 0;
  for (; i < r && u[i] === s[i]; ) i++;
  if (i === 0) return je.DISCONNECTED;
  const a = u[i - 1],
    o = a.children,
    c = u[i],
    l = s[i];
  return o.indexOf(c) > o.indexOf(l)
    ? a === e
      ? je.FOLLOWING | je.CONTAINED_BY
      : je.FOLLOWING
    : a === t
    ? je.PRECEDING | je.CONTAINS
    : je.PRECEDING;
}
function Wl(t) {
  return (
    (t = t.filter((e, u, s) => !s.includes(e, u + 1))),
    t.sort((e, u) => {
      const s = Ja(e, u);
      return s & je.PRECEDING ? -1 : s & je.FOLLOWING ? 1 : 0;
    }),
    t
  );
}
function Yn(t) {
  const e = ls(Ql, t);
  return e ? (e.name === 'feed' ? Xl(e) : Jl(e)) : null;
}
function Xl(t) {
  var e;
  const u = t.children,
    s = {
      type: 'atom',
      items: cu('entry', u).map((i) => {
        var a;
        const { children: o } = i,
          c = { media: Za(o) };
        Oe(c, 'id', 'id', o), Oe(c, 'title', 'title', o);
        const l =
          (a = ls('link', o)) === null || a === void 0
            ? void 0
            : a.attribs.href;
        l && (c.link = l);
        const f = vt('summary', o) || vt('content', o);
        f && (c.description = f);
        const p = vt('updated', o);
        return p && (c.pubDate = new Date(p)), c;
      }),
    };
  Oe(s, 'id', 'id', u), Oe(s, 'title', 'title', u);
  const n =
    (e = ls('link', u)) === null || e === void 0 ? void 0 : e.attribs.href;
  n && (s.link = n), Oe(s, 'description', 'subtitle', u);
  const r = vt('updated', u);
  return r && (s.updated = new Date(r)), Oe(s, 'author', 'email', u, !0), s;
}
function Jl(t) {
  var e, u;
  const s =
      (u =
        (e = ls('channel', t.children)) === null || e === void 0
          ? void 0
          : e.children) !== null && u !== void 0
        ? u
        : [],
    n = {
      type: t.name.substr(0, 3),
      id: '',
      items: cu('item', t.children).map((i) => {
        const { children: a } = i,
          o = { media: Za(a) };
        Oe(o, 'id', 'guid', a),
          Oe(o, 'title', 'title', a),
          Oe(o, 'link', 'link', a),
          Oe(o, 'description', 'description', a);
        const c = vt('pubDate', a) || vt('dc:date', a);
        return c && (o.pubDate = new Date(c)), o;
      }),
    };
  Oe(n, 'title', 'title', s),
    Oe(n, 'link', 'link', s),
    Oe(n, 'description', 'description', s);
  const r = vt('lastBuildDate', s);
  return (
    r && (n.updated = new Date(r)), Oe(n, 'author', 'managingEditor', s, !0), n
  );
}
const Zl = ['url', 'type', 'lang'],
  Yl = [
    'fileSize',
    'bitrate',
    'framerate',
    'samplingrate',
    'channels',
    'duration',
    'height',
    'width',
  ];
function Za(t) {
  return cu('media:content', t).map((e) => {
    const { attribs: u } = e,
      s = { medium: u.medium, isDefault: !!u.isDefault };
    for (const n of Zl) u[n] && (s[n] = u[n]);
    for (const n of Yl) u[n] && (s[n] = parseInt(u[n], 10));
    return u.expression && (s.expression = u.expression), s;
  });
}
function ls(t, e) {
  return cu(t, e, !0, 1)[0];
}
function vt(t, e, u = !1) {
  return os(cu(t, e, u, 1)).trim();
}
function Oe(t, e, u, s, n = !1) {
  const r = vt(u, s, n);
  r && (t[e] = r);
}
function Ql(t) {
  return t === 'rss' || t === 'feed' || t === 'rdf:RDF';
}
const Qn = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      get DocumentPosition() {
        return je;
      },
      append: Pl,
      appendChild: kl,
      compareDocumentPosition: Ja,
      existsOne: Wa,
      filter: Ru,
      find: Ka,
      findAll: Vl,
      findOne: Jn,
      findOneChild: Fl,
      getAttributeValue: Rl,
      getChildren: ja,
      getElementById: Gl,
      getElements: Hl,
      getElementsByClassName: jl,
      getElementsByTagName: cu,
      getElementsByTagType: zl,
      getFeed: Yn,
      getInnerHTML: _l,
      getName: Ll,
      getOuterHTML: Ga,
      getParent: za,
      getSiblings: Nl,
      getText: us,
      hasAttrib: Dl,
      hasChildren: tt,
      innerText: _n,
      isCDATA: xs,
      isComment: Wn,
      isDocument: Va,
      isTag: qe,
      isText: Bt,
      nextElementSibling: Il,
      prepend: Bl,
      prependChild: ql,
      prevElementSibling: Ml,
      removeElement: Nu,
      removeSubsets: Kl,
      replaceElement: Ol,
      testElement: $l,
      textContent: os,
      uniqueSort: Wl,
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
);
function Ya(t, e) {
  const u = new Eu(void 0, e);
  return new Ss(u, e).end(t), u.root;
}
function Qa(t, e) {
  return Ya(t, e).children;
}
function ed(t, e, u) {
  const s = new Eu((n) => t(n, s.root), e, u);
  return new Ss(s, e);
}
function td(t, e, u) {
  const s = new Eu(t, e, u);
  return new Ss(s, e);
}
const ud = { xmlMode: !0 };
function sd(t, e = ud) {
  return Yn(Qa(t, e));
}
const nd = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        DefaultHandler: Eu,
        DomHandler: Eu,
        DomUtils: Qn,
        ElementType: ol,
        Parser: Ss,
        get QuoteType() {
          return Ye;
        },
        Tokenizer: Ea,
        createDocumentStream: ed,
        createDomStream: td,
        getFeed: Yn,
        parseDOM: Qa,
        parseDocument: Ya,
        parseFeed: sd,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  At = -1,
  k = 1,
  pe = 2,
  Te = 3,
  ct = 4,
  pt = 8,
  Ot = 9,
  au = 10,
  bt = 11,
  rd = new Set([
    'ARTICLE',
    'ASIDE',
    'BLOCKQUOTE',
    'BODY',
    'BR',
    'BUTTON',
    'CANVAS',
    'CAPTION',
    'COL',
    'COLGROUP',
    'DD',
    'DIV',
    'DL',
    'DT',
    'EMBED',
    'FIELDSET',
    'FIGCAPTION',
    'FIGURE',
    'FOOTER',
    'FORM',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'LI',
    'UL',
    'OL',
    'P',
  ]),
  id = -1,
  ad = 1,
  od = 4,
  cd = 8,
  ld = 128,
  dd = 1,
  si = 2,
  ni = 4,
  fd = 8,
  hd = 16,
  bd = 32,
  ds = 'http://www.w3.org/2000/svg',
  {
    assign: pd,
    create: gd,
    defineProperties: md,
    entries: Sd,
    keys: xd,
    setPrototypeOf: Ne,
  } = Object,
  kt = String,
  ke = (t) => (t.nodeType === k ? t[T] : t),
  _t = ({ ownerDocument: t }) => t[ou].ignoreCase,
  et = (t, e) => {
    (t[S] = e), (e[fe] = t);
  },
  eo = (t, e, u) => {
    et(t, e), et(ke(e), u);
  },
  to = (t, e, u, s) => {
    et(t, e), et(ke(u), s);
  },
  ys = (t, e, u) => {
    et(t, e), et(e, u);
  },
  Nn = ({ localName: t, ownerDocument: e }) =>
    e[ou].ignoreCase ? t.toUpperCase() : t,
  uo = (t, e) => {
    t && (t[S] = e), e && (e[fe] = t);
  },
  so = (t, e) => {
    const u = t.createDocumentFragment(),
      s = t.createElement('');
    s.innerHTML = e;
    const { firstChild: n, lastChild: r } = s;
    if (n) {
      to(u, n, r, u[T]);
      let i = n;
      do i.parentNode = u;
      while (i !== r && (i = ke(i)[S]));
    }
    return u;
  },
  Et = new WeakMap();
let Ts = !1;
const tu = new WeakMap(),
  Ft = new WeakMap(),
  Cs = (t, e, u, s) => {
    Ts &&
      Ft.has(t) &&
      t.attributeChangedCallback &&
      t.constructor.observedAttributes.includes(e) &&
      t.attributeChangedCallback(e, u, s);
  },
  no = (t, e) => (u) => {
    if (Ft.has(u)) {
      const s = Ft.get(u);
      s.connected !== e &&
        u.isConnected === e &&
        ((s.connected = e), t in u && u[t]());
    }
  },
  ri = no('connectedCallback', !0),
  Rn = (t) => {
    if (Ts) {
      ri(t), Et.has(t) && (t = Et.get(t).shadowRoot);
      let { [S]: e, [T]: u } = t;
      for (; e !== u; ) e.nodeType === k && ri(e), (e = e[S]);
    }
  },
  ii = no('disconnectedCallback', !1),
  yd = (t) => {
    if (Ts) {
      ii(t), Et.has(t) && (t = Et.get(t).shadowRoot);
      let { [S]: e, [T]: u } = t;
      for (; e !== u; ) e.nodeType === k && ii(e), (e = e[S]);
    }
  };
class Td {
  constructor(e) {
    (this.ownerDocument = e),
      (this.registry = new Map()),
      (this.waiting = new Map()),
      (this.active = !1);
  }
  define(e, u, s = {}) {
    const { ownerDocument: n, registry: r, waiting: i } = this;
    if (r.has(e)) throw new Error('unable to redefine ' + e);
    if (tu.has(u)) throw new Error('unable to redefine the same class: ' + u);
    this.active = Ts = !0;
    const { extends: a } = s;
    tu.set(u, {
      ownerDocument: n,
      options: { is: a ? e : '' },
      localName: a || e,
    });
    const o = a
      ? (c) => c.localName === a && c.getAttribute('is') === e
      : (c) => c.localName === e;
    if ((r.set(e, { Class: u, check: o }), i.has(e))) {
      for (const c of i.get(e)) c(u);
      i.delete(e);
    }
    n.querySelectorAll(a ? `${a}[is="${e}"]` : e).forEach(this.upgrade, this);
  }
  upgrade(e) {
    if (Ft.has(e)) return;
    const { ownerDocument: u, registry: s } = this,
      n = e.getAttribute('is') || e.localName;
    if (s.has(n)) {
      const { Class: r, check: i } = s.get(n);
      if (i(e)) {
        const { attributes: a, isConnected: o } = e;
        for (const l of a) e.removeAttributeNode(l);
        const c = Sd(e);
        for (const [l] of c) delete e[l];
        Ne(e, r.prototype),
          (u[yu] = { element: e, values: c }),
          new r(u, n),
          Ft.set(e, { connected: o });
        for (const l of a) e.setAttributeNode(l);
        o && e.connectedCallback && e.connectedCallback();
      }
    }
  }
  whenDefined(e) {
    const { registry: u, waiting: s } = this;
    return new Promise((n) => {
      u.has(e)
        ? n(u.get(e).Class)
        : (s.has(e) || s.set(e, []), s.get(e).push(n));
    });
  }
  get(e) {
    const u = this.registry.get(e);
    return u && u.Class;
  }
  getName(e) {
    if (tu.has(e)) {
      const { localName: u } = tu.get(e);
      return u;
    }
    return null;
  }
}
const { Parser: Cd } = nd,
  Lt = (t, e, u) => {
    const s = t[T];
    return (
      (e.parentNode = t), eo(s[fe], e, s), u && e.nodeType === k && Rn(e), e
    );
  },
  vd = (t, e, u, s, n) => {
    (u[H] = s),
      (u.ownerElement = t),
      ys(e[fe], u, e),
      u.name === 'class' && (t.className = s),
      n && Cs(t, u.name, null, s);
  },
  ro = (t, e, u) => {
    const { active: s, registry: n } = t[Je];
    let r = t,
      i = null,
      a = !1;
    const o = new Cd(
      {
        onprocessinginstruction(c, l) {
          c.toLowerCase() === '!doctype' &&
            (t.doctype = l.slice(c.length).trim());
        },
        onopentag(c, l) {
          let f = !0;
          if (e) {
            if (i)
              (r = Lt(r, t.createElementNS(ds, c), s)),
                (r.ownerSVGElement = i),
                (f = !1);
            else if (c === 'svg' || c === 'SVG')
              (i = t.createElementNS(ds, c)), (r = Lt(r, i, s)), (f = !1);
            else if (s) {
              const h = c.includes('-') ? c : l.is || '';
              if (h && n.has(h)) {
                const { Class: m } = n.get(h);
                (r = Lt(r, new m(), s)), delete l.is, (f = !1);
              }
            }
          }
          f && (r = Lt(r, t.createElement(c), !1));
          let p = r[T];
          for (const h of xd(l)) vd(r, p, t.createAttribute(h), l[h], s);
        },
        oncomment(c) {
          Lt(r, t.createComment(c), s);
        },
        ontext(c) {
          a ? Lt(r, t.createCDATASection(c), s) : Lt(r, t.createTextNode(c), s);
        },
        oncdatastart() {
          a = !0;
        },
        oncdataend() {
          a = !1;
        },
        onclosetag() {
          e && r === i && (i = null), (r = r.parentNode);
        },
      },
      { lowerCaseAttributeNames: !1, decodeEntities: !0, xmlMode: !e }
    );
    return o.write(u), o.end(), t;
  },
  fs = new Map(),
  oe = (t, e) => {
    for (const u of [].concat(t)) fs.set(u, e), fs.set(u.toUpperCase(), e);
  };
function io(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default')
    ? t.default
    : t;
}
function Ed(t) {
  if (Object.prototype.hasOwnProperty.call(t, '__esModule')) return t;
  var e = t.default;
  if (typeof e == 'function') {
    var u = function s() {
      var n = !1;
      try {
        n = this instanceof s;
      } catch {}
      return n
        ? Reflect.construct(e, arguments, this.constructor)
        : e.apply(this, arguments);
    };
    u.prototype = e.prototype;
  } else u = {};
  return (
    Object.defineProperty(u, '__esModule', { value: !0 }),
    Object.keys(t).forEach(function (s) {
      var n = Object.getOwnPropertyDescriptor(t, s);
      Object.defineProperty(
        u,
        s,
        n.get
          ? n
          : {
              enumerable: !0,
              get: function () {
                return t[s];
              },
            }
      );
    }),
    u
  );
}
var Gu = {};
const wd = {},
  Ad = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: wd },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  _d = Ed(Ad);
var ai;
function Nd() {
  if (ai) return Gu;
  ai = 1;
  try {
    const { performance: t } = _d;
    Gu.performance = t;
  } catch {
    Gu.performance = {
      now() {
        return +new Date();
      },
    };
  }
  return Gu;
}
var Rd = Nd();
const ao = ({ [S]: t, [T]: e }, u) => {
    for (; t !== e; ) {
      switch (t.nodeType) {
        case pe:
          oo(t, u);
          break;
        case Te:
        case pt:
        case ct:
          co(t, u);
          break;
        case k:
          fo(t, u), (t = ke(t));
          break;
        case au:
          lo(t, u);
          break;
      }
      t = t[S];
    }
    const s = u.length - 1,
      n = u[s];
    typeof n == 'number' && n < 0 ? (u[s] += At) : u.push(At);
  },
  oo = (t, e) => {
    e.push(pe, t.name);
    const u = t[H].trim();
    u && e.push(u);
  },
  co = (t, e) => {
    const u = t[H];
    u.trim() && e.push(t.nodeType, u);
  },
  Dd = (t, e) => {
    e.push(t.nodeType), ao(t, e);
  },
  lo = ({ name: t, publicId: e, systemId: u }, s) => {
    s.push(au, t), e && s.push(e), u && s.push(u);
  },
  fo = (t, e) => {
    e.push(k, t.localName), ao(t, e);
  },
  ho = (t, e, u, s, n, r, i) => ({
    type: t,
    target: e,
    addedNodes: s,
    removedNodes: n,
    attributeName: r,
    oldValue: i,
    previousSibling: u?.previousSibling || null,
    nextSibling: u?.nextSibling || null,
  }),
  oi = (t, e, u, s, n, r) => {
    if (!s || s.includes(u)) {
      const { callback: i, records: a, scheduled: o } = t;
      a.push(ho('attributes', e, null, [], [], u, n ? r : void 0)),
        o ||
          ((t.scheduled = !0),
          Promise.resolve().then(() => {
            (t.scheduled = !1), i(a.splice(0), t);
          }));
    }
  },
  er = (t, e, u) => {
    const { ownerDocument: s } = t,
      { active: n, observers: r } = s[Tt];
    if (n) {
      for (const i of r)
        for (const [
          a,
          {
            childList: o,
            subtree: c,
            attributes: l,
            attributeFilter: f,
            attributeOldValue: p,
          },
        ] of i.nodes)
          if (o) {
            if (
              (c && (a === s || a.contains(t))) ||
              (!c && a.children.includes(t))
            ) {
              oi(i, t, e, f, p, u);
              break;
            }
          } else if (l && a === t) {
            oi(i, t, e, f, p, u);
            break;
          }
    }
  },
  Tu = (t, e) => {
    const { ownerDocument: u } = t,
      { active: s, observers: n } = u[Tt];
    if (s) {
      for (const r of n)
        for (const [
          i,
          { subtree: a, childList: o, characterData: c },
        ] of r.nodes)
          if (
            o &&
            ((e && (i === e || (a && i.contains(e)))) ||
              (!e &&
                ((a && (i === u || i.contains(t))) ||
                  (!a && i[c ? 'childNodes' : 'children'].includes(t)))))
          ) {
            const { callback: l, records: f, scheduled: p } = r;
            f.push(ho('childList', i, t, e ? [] : [t], e ? [t] : [])),
              p ||
                ((r.scheduled = !0),
                Promise.resolve().then(() => {
                  (r.scheduled = !1), l(f.splice(0), r);
                }));
            break;
          }
    }
  };
class Ld {
  constructor(e) {
    const u = new Set();
    (this.observers = u),
      (this.active = !1),
      (this.class = class {
        constructor(n) {
          (this.callback = n),
            (this.nodes = new Map()),
            (this.records = []),
            (this.scheduled = !1);
        }
        disconnect() {
          this.records.splice(0),
            this.nodes.clear(),
            u.delete(this),
            (e[Tt].active = !!u.size);
        }
        observe(
          n,
          r = {
            subtree: !1,
            childList: !1,
            attributes: !1,
            attributeFilter: null,
            attributeOldValue: !1,
            characterData: !1,
          }
        ) {
          ('attributeOldValue' in r || 'attributeFilter' in r) &&
            (r.attributes = !0),
            (r.childList = !!r.childList),
            (r.subtree = !!r.subtree),
            this.nodes.set(n, r),
            u.add(this),
            (e[Tt].active = !0);
        }
        takeRecords() {
          return this.records.splice(0);
        }
      });
  }
}
const Id = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'class',
    'contenteditable',
    'controls',
    'default',
    'defer',
    'disabled',
    'draggable',
    'formnovalidate',
    'hidden',
    'id',
    'ismap',
    'itemscope',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected',
    'style',
    'truespeed',
  ]),
  Dn = (t, e) => {
    const { [H]: u, name: s } = e;
    (e.ownerElement = t),
      ys(t, e, t[S]),
      s === 'class' && (t.className = u),
      er(t, s, null),
      Cs(t, s, null, u);
  },
  ci = (t, e) => {
    const { [H]: u, name: s } = e;
    et(e[fe], e[S]),
      (e.ownerElement = e[fe] = e[S] = null),
      s === 'class' && (t[Qt] = null),
      er(t, s, u),
      Cs(t, s, u, null);
  },
  B = {
    get(t, e) {
      return t.hasAttribute(e);
    },
    set(t, e, u) {
      u ? t.setAttribute(e, '') : t.removeAttribute(e);
    },
  },
  wt = {
    get(t, e) {
      return parseFloat(t.getAttribute(e) || 0);
    },
    set(t, e, u) {
      t.setAttribute(e, u);
    },
  },
  g = {
    get(t, e) {
      return t.getAttribute(e) || '';
    },
    set(t, e, u) {
      t.setAttribute(e, u);
    },
  },
  ss = new WeakMap();
function Md(t, e) {
  return (
    typeof e == 'function' ? e.call(t.target, t) : e.handleEvent(t),
    t._stopImmediatePropagationFlag
  );
}
function Od({ currentTarget: t, target: e }) {
  const u = ss.get(t);
  if (u && u.has(this.type)) {
    const s = u.get(this.type);
    t === e
      ? (this.eventPhase = this.AT_TARGET)
      : (this.eventPhase = this.BUBBLING_PHASE),
      (this.currentTarget = t),
      (this.target = e);
    for (const [n, r] of s)
      if ((r && r.once && s.delete(n), Md(this, n))) break;
    return delete this.currentTarget, delete this.target, this.cancelBubble;
  }
}
class tr {
  constructor() {
    ss.set(this, new Map());
  }
  _getParent() {
    return null;
  }
  addEventListener(e, u, s) {
    const n = ss.get(this);
    n.has(e) || n.set(e, new Map()), n.get(e).set(u, s);
  }
  removeEventListener(e, u) {
    const s = ss.get(this);
    if (s.has(e)) {
      const n = s.get(e);
      n.delete(u) && !n.size && s.delete(e);
    }
  }
  dispatchEvent(e) {
    let u = this;
    for (e.eventPhase = e.CAPTURING_PHASE; u; )
      u.dispatchEvent && e._path.push({ currentTarget: u, target: this }),
        (u = e.bubbles && u._getParent && u._getParent());
    return (
      e._path.some(Od, e),
      (e._path = []),
      (e.eventPhase = e.NONE),
      !e.defaultPrevented
    );
  }
}
let ot = class extends Array {
  item(e) {
    return e < this.length ? this[e] : null;
  }
};
const li = ({ parentNode: t }) => {
  let e = 0;
  for (; t; ) e++, (t = t.parentNode);
  return e;
};
let $t = class extends tr {
  static get ELEMENT_NODE() {
    return k;
  }
  static get ATTRIBUTE_NODE() {
    return pe;
  }
  static get TEXT_NODE() {
    return Te;
  }
  static get CDATA_SECTION_NODE() {
    return ct;
  }
  static get COMMENT_NODE() {
    return pt;
  }
  static get DOCUMENT_NODE() {
    return Ot;
  }
  static get DOCUMENT_FRAGMENT_NODE() {
    return bt;
  }
  static get DOCUMENT_TYPE_NODE() {
    return au;
  }
  constructor(e, u, s) {
    super(),
      (this.ownerDocument = e),
      (this.localName = u),
      (this.nodeType = s),
      (this.parentNode = null),
      (this[S] = null),
      (this[fe] = null);
  }
  get ELEMENT_NODE() {
    return k;
  }
  get ATTRIBUTE_NODE() {
    return pe;
  }
  get TEXT_NODE() {
    return Te;
  }
  get CDATA_SECTION_NODE() {
    return ct;
  }
  get COMMENT_NODE() {
    return pt;
  }
  get DOCUMENT_NODE() {
    return Ot;
  }
  get DOCUMENT_FRAGMENT_NODE() {
    return bt;
  }
  get DOCUMENT_TYPE_NODE() {
    return au;
  }
  get baseURI() {
    const e = this.nodeType === Ot ? this : this.ownerDocument;
    if (e) {
      const u = e.querySelector('base');
      if (u) return u.getAttribute('href');
      const { location: s } = e.defaultView;
      if (s) return s.href;
    }
    return null;
  }
  get isConnected() {
    return !1;
  }
  get nodeName() {
    return this.localName;
  }
  get parentElement() {
    return null;
  }
  get previousSibling() {
    return null;
  }
  get previousElementSibling() {
    return null;
  }
  get nextSibling() {
    return null;
  }
  get nextElementSibling() {
    return null;
  }
  get childNodes() {
    return new ot();
  }
  get firstChild() {
    return null;
  }
  get lastChild() {
    return null;
  }
  get nodeValue() {
    return null;
  }
  set nodeValue(e) {}
  get textContent() {
    return null;
  }
  set textContent(e) {}
  normalize() {}
  cloneNode() {
    return null;
  }
  contains() {
    return !1;
  }
  insertBefore(e, u) {
    return e;
  }
  appendChild(e) {
    return e;
  }
  replaceChild(e, u) {
    return u;
  }
  removeChild(e) {
    return e;
  }
  toString() {
    return '';
  }
  hasChildNodes() {
    return !!this.lastChild;
  }
  isSameNode(e) {
    return this === e;
  }
  compareDocumentPosition(e) {
    let u = 0;
    if (this !== e) {
      let s = li(this),
        n = li(e);
      if (s < n) (u += ni), this.contains(e) && (u += hd);
      else if (n < s) (u += si), e.contains(this) && (u += fd);
      else if (s && n) {
        const { childNodes: r } = this.parentNode;
        r.indexOf(this) < r.indexOf(e) ? (u += ni) : (u += si);
      }
      (!s || !n) && ((u += bd), (u += dd));
    }
    return u;
  }
  isEqualNode(e) {
    if (this === e) return !0;
    if (this.nodeType === e.nodeType) {
      switch (this.nodeType) {
        case Ot:
        case bt: {
          const u = this.childNodes,
            s = e.childNodes;
          return (
            u.length === s.length && u.every((n, r) => n.isEqualNode(s[r]))
          );
        }
      }
      return this.toString() === e.toString();
    }
    return !1;
  }
  _getParent() {
    return this.parentNode;
  }
  getRootNode() {
    let e = this;
    for (; e.parentNode; ) e = e.parentNode;
    return e;
  }
};
const { replace: kd } = '',
  Pd = /[<>&\xA0]/g,
  qd = { ' ': '&#160;', '&': '&amp;', '<': '&lt;', '>': '&gt;' },
  Bd = (t) => qd[t],
  ur = (t) => kd.call(t, Pd, Bd),
  Fd = /"/g;
let Du = class bo extends $t {
  constructor(e, u, s = '') {
    super(e, u, pe),
      (this.ownerElement = null),
      (this.name = kt(u)),
      (this[H] = kt(s)),
      (this[as] = !1);
  }
  get value() {
    return this[H];
  }
  set value(e) {
    const { [H]: u, name: s, ownerElement: n } = this;
    (this[H] = kt(e)),
      (this[as] = !0),
      n && (er(n, s, u), Cs(n, s, u, this[H]));
  }
  cloneNode() {
    const { ownerDocument: e, name: u, [H]: s } = this;
    return new bo(e, u, s);
  }
  toString() {
    const { name: e, [H]: u } = this;
    if (Id.has(e) && !u) return _t(this) ? e : `${e}=""`;
    const s = (_t(this) ? u : ur(u)).replace(Fd, '&quot;');
    return `${e}="${s}"`;
  }
  toJSON() {
    const e = [];
    return oo(this, e), e;
  }
};
const po = ({ ownerDocument: t, parentNode: e }) => {
    for (; e; ) {
      if (e === t) return !0;
      e = e.parentNode || e.host;
    }
    return !1;
  },
  go = ({ parentNode: t }) => {
    if (t)
      switch (t.nodeType) {
        case Ot:
        case bt:
          return null;
      }
    return t;
  },
  wu = ({ [fe]: t }) => {
    switch (t ? t.nodeType : 0) {
      case At:
        return t[Me];
      case Te:
      case pt:
      case ct:
        return t;
    }
    return null;
  },
  Pt = (t) => {
    const e = ke(t)[S];
    return e && (e.nodeType === At ? null : e);
  },
  sr = (t) => {
    let e = Pt(t);
    for (; e && e.nodeType !== k; ) e = Pt(e);
    return e;
  },
  mo = (t) => {
    let e = wu(t);
    for (; e && e.nodeType !== k; ) e = wu(e);
    return e;
  },
  nr = (t, e) => {
    const u = t.createDocumentFragment();
    return u.append(...e), u;
  },
  So = (t, e) => {
    const { ownerDocument: u, parentNode: s } = t;
    s && s.insertBefore(nr(u, e), t);
  },
  xo = (t, e) => {
    const { ownerDocument: u, parentNode: s } = t;
    s && s.insertBefore(nr(u, e), ke(t)[S]);
  },
  rr = (t, e) => {
    const { ownerDocument: u, parentNode: s } = t;
    s &&
      (e.includes(t) && rr(t, [(t = t.cloneNode())]),
      s.insertBefore(nr(u, e), t),
      t.remove());
  },
  yo = (t, e, u) => {
    const { parentNode: s, nodeType: n } = e;
    (t || u) && (uo(t, u), (e[fe] = null), (ke(e)[S] = null)),
      s && ((e.parentNode = null), Tu(e, s), n === k && yd(e));
  };
let Lu = class extends $t {
    constructor(e, u, s, n) {
      super(e, u, s), (this[H] = kt(n));
    }
    get isConnected() {
      return po(this);
    }
    get parentElement() {
      return go(this);
    }
    get previousSibling() {
      return wu(this);
    }
    get nextSibling() {
      return Pt(this);
    }
    get previousElementSibling() {
      return mo(this);
    }
    get nextElementSibling() {
      return sr(this);
    }
    before(...e) {
      So(this, e);
    }
    after(...e) {
      xo(this, e);
    }
    replaceWith(...e) {
      rr(this, e);
    }
    remove() {
      yo(this[fe], this, this[S]);
    }
    get data() {
      return this[H];
    }
    set data(e) {
      (this[H] = kt(e)), Tu(this, this.parentNode);
    }
    get nodeValue() {
      return this.data;
    }
    set nodeValue(e) {
      this.data = e;
    }
    get textContent() {
      return this.data;
    }
    set textContent(e) {
      this.data = e;
    }
    get length() {
      return this.data.length;
    }
    substringData(e, u) {
      return this.data.substr(e, u);
    }
    appendData(e) {
      this.data += e;
    }
    insertData(e, u) {
      const { data: s } = this;
      this.data = s.slice(0, e) + u + s.slice(e);
    }
    deleteData(e, u) {
      const { data: s } = this;
      this.data = s.slice(0, e) + s.slice(e + u);
    }
    replaceData(e, u, s) {
      const { data: n } = this;
      this.data = n.slice(0, e) + s + n.slice(e + u);
    }
    toJSON() {
      const e = [];
      return co(this, e), e;
    }
  },
  ir = class To extends Lu {
    constructor(e, u = '') {
      super(e, '#cdatasection', ct, u);
    }
    cloneNode() {
      const { ownerDocument: e, [H]: u } = this;
      return new To(e, u);
    }
    toString() {
      return `<![CDATA[${this[H]}]]>`;
    }
  },
  ar = class Co extends Lu {
    constructor(e, u = '') {
      super(e, '#comment', pt, u);
    }
    cloneNode() {
      const { ownerDocument: e, [H]: u } = this;
      return new Co(e, u);
    }
    toString() {
      return `<!--${this[H]}-->`;
    }
  };
var Fs, di;
function Vd() {
  return (
    di ||
      ((di = 1),
      (Fs = {
        trueFunc: function () {
          return !0;
        },
        falseFunc: function () {
          return !1;
        },
      })),
    Fs
  );
}
var Ud = Vd();
const R = io(Ud);
var E;
(function (t) {
  (t.Attribute = 'attribute'),
    (t.Pseudo = 'pseudo'),
    (t.PseudoElement = 'pseudo-element'),
    (t.Tag = 'tag'),
    (t.Universal = 'universal'),
    (t.Adjacent = 'adjacent'),
    (t.Child = 'child'),
    (t.Descendant = 'descendant'),
    (t.Parent = 'parent'),
    (t.Sibling = 'sibling'),
    (t.ColumnCombinator = 'column-combinator');
})(E || (E = {}));
var ae;
(function (t) {
  (t.Any = 'any'),
    (t.Element = 'element'),
    (t.End = 'end'),
    (t.Equals = 'equals'),
    (t.Exists = 'exists'),
    (t.Hyphen = 'hyphen'),
    (t.Not = 'not'),
    (t.Start = 'start');
})(ae || (ae = {}));
const fi = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,
  $d = /\\([\da-f]{1,6}\s?|(\s)|.)/gi,
  Hd = new Map([
    [126, ae.Element],
    [94, ae.Start],
    [36, ae.End],
    [42, ae.Any],
    [33, ae.Not],
    [124, ae.Hyphen],
  ]),
  Gd = new Set([
    'has',
    'not',
    'matches',
    'is',
    'where',
    'host',
    'host-context',
  ]);
function jd(t) {
  switch (t.type) {
    case E.Adjacent:
    case E.Child:
    case E.Descendant:
    case E.Parent:
    case E.Sibling:
    case E.ColumnCombinator:
      return !0;
    default:
      return !1;
  }
}
const zd = new Set(['contains', 'icontains']);
function Kd(t, e, u) {
  const s = parseInt(e, 16) - 65536;
  return s !== s || u
    ? e
    : s < 0
    ? String.fromCharCode(s + 65536)
    : String.fromCharCode((s >> 10) | 55296, (s & 1023) | 56320);
}
function gu(t) {
  return t.replace($d, Kd);
}
function Vs(t) {
  return t === 39 || t === 34;
}
function hi(t) {
  return t === 32 || t === 9 || t === 10 || t === 12 || t === 13;
}
function vo(t) {
  const e = [],
    u = Eo(e, `${t}`, 0);
  if (u < t.length) throw new Error(`Unmatched selector: ${t.slice(u)}`);
  return e;
}
function Eo(t, e, u) {
  let s = [];
  function n(p) {
    const h = e.slice(u + p).match(fi);
    if (!h) throw new Error(`Expected name, found ${e.slice(u)}`);
    const [m] = h;
    return (u += p + m.length), gu(m);
  }
  function r(p) {
    for (u += p; u < e.length && hi(e.charCodeAt(u)); ) u++;
  }
  function i() {
    u += 1;
    const p = u;
    let h = 1;
    for (; h > 0 && u < e.length; u++)
      e.charCodeAt(u) === 40 && !a(u)
        ? h++
        : e.charCodeAt(u) === 41 && !a(u) && h--;
    if (h) throw new Error('Parenthesis not matched');
    return gu(e.slice(p, u - 1));
  }
  function a(p) {
    let h = 0;
    for (; e.charCodeAt(--p) === 92; ) h++;
    return (h & 1) === 1;
  }
  function o() {
    if (s.length > 0 && jd(s[s.length - 1]))
      throw new Error('Did not expect successive traversals.');
  }
  function c(p) {
    if (s.length > 0 && s[s.length - 1].type === E.Descendant) {
      s[s.length - 1].type = p;
      return;
    }
    o(), s.push({ type: p });
  }
  function l(p, h) {
    s.push({
      type: E.Attribute,
      name: p,
      action: h,
      value: n(1),
      namespace: null,
      ignoreCase: 'quirks',
    });
  }
  function f() {
    if (
      (s.length && s[s.length - 1].type === E.Descendant && s.pop(),
      s.length === 0)
    )
      throw new Error('Empty sub-selector');
    t.push(s);
  }
  if ((r(0), e.length === u)) return u;
  e: for (; u < e.length; ) {
    const p = e.charCodeAt(u);
    switch (p) {
      case 32:
      case 9:
      case 10:
      case 12:
      case 13: {
        (s.length === 0 || s[0].type !== E.Descendant) &&
          (o(), s.push({ type: E.Descendant })),
          r(1);
        break;
      }
      case 62: {
        c(E.Child), r(1);
        break;
      }
      case 60: {
        c(E.Parent), r(1);
        break;
      }
      case 126: {
        c(E.Sibling), r(1);
        break;
      }
      case 43: {
        c(E.Adjacent), r(1);
        break;
      }
      case 46: {
        l('class', ae.Element);
        break;
      }
      case 35: {
        l('id', ae.Equals);
        break;
      }
      case 91: {
        r(1);
        let h,
          m = null;
        e.charCodeAt(u) === 124
          ? (h = n(1))
          : e.startsWith('*|', u)
          ? ((m = '*'), (h = n(2)))
          : ((h = n(0)),
            e.charCodeAt(u) === 124 &&
              e.charCodeAt(u + 1) !== 61 &&
              ((m = h), (h = n(1)))),
          r(0);
        let v = ae.Exists;
        const _ = Hd.get(e.charCodeAt(u));
        if (_) {
          if (((v = _), e.charCodeAt(u + 1) !== 61))
            throw new Error('Expected `=`');
          r(2);
        } else e.charCodeAt(u) === 61 && ((v = ae.Equals), r(1));
        let A = '',
          F = null;
        if (v !== 'exists') {
          if (Vs(e.charCodeAt(u))) {
            const N = e.charCodeAt(u);
            let O = u + 1;
            for (; O < e.length && (e.charCodeAt(O) !== N || a(O)); ) O += 1;
            if (e.charCodeAt(O) !== N)
              throw new Error("Attribute value didn't end");
            (A = gu(e.slice(u + 1, O))), (u = O + 1);
          } else {
            const N = u;
            for (
              ;
              u < e.length &&
              ((!hi(e.charCodeAt(u)) && e.charCodeAt(u) !== 93) || a(u));

            )
              u += 1;
            A = gu(e.slice(N, u));
          }
          r(0);
          const U = e.charCodeAt(u) | 32;
          U === 115 ? ((F = !1), r(1)) : U === 105 && ((F = !0), r(1));
        }
        if (e.charCodeAt(u) !== 93)
          throw new Error("Attribute selector didn't terminate");
        u += 1;
        const M = {
          type: E.Attribute,
          name: h,
          action: v,
          value: A,
          namespace: m,
          ignoreCase: F,
        };
        s.push(M);
        break;
      }
      case 58: {
        if (e.charCodeAt(u + 1) === 58) {
          s.push({
            type: E.PseudoElement,
            name: n(2).toLowerCase(),
            data: e.charCodeAt(u) === 40 ? i() : null,
          });
          continue;
        }
        const h = n(1).toLowerCase();
        let m = null;
        if (e.charCodeAt(u) === 40)
          if (Gd.has(h)) {
            if (Vs(e.charCodeAt(u + 1)))
              throw new Error(`Pseudo-selector ${h} cannot be quoted`);
            if (((m = []), (u = Eo(m, e, u + 1)), e.charCodeAt(u) !== 41))
              throw new Error(`Missing closing parenthesis in :${h} (${e})`);
            u += 1;
          } else {
            if (((m = i()), zd.has(h))) {
              const v = m.charCodeAt(0);
              v === m.charCodeAt(m.length - 1) && Vs(v) && (m = m.slice(1, -1));
            }
            m = gu(m);
          }
        s.push({ type: E.Pseudo, name: h, data: m });
        break;
      }
      case 44: {
        f(), (s = []), r(1);
        break;
      }
      default: {
        if (e.startsWith('/*', u)) {
          const v = e.indexOf('*/', u + 2);
          if (v < 0) throw new Error('Comment was not terminated');
          (u = v + 2), s.length === 0 && r(0);
          break;
        }
        let h = null,
          m;
        if (p === 42) (u += 1), (m = '*');
        else if (p === 124) {
          if (((m = ''), e.charCodeAt(u + 1) === 124)) {
            c(E.ColumnCombinator), r(2);
            break;
          }
        } else if (fi.test(e.slice(u))) m = n(0);
        else break e;
        e.charCodeAt(u) === 124 &&
          e.charCodeAt(u + 1) !== 124 &&
          ((h = m),
          e.charCodeAt(u + 1) === 42 ? ((m = '*'), (u += 2)) : (m = n(1))),
          s.push(
            m === '*'
              ? { type: E.Universal, namespace: h }
              : { type: E.Tag, name: m, namespace: h }
          );
      }
    }
  }
  return f(), u;
}
const wo = new Map([
  [E.Universal, 50],
  [E.Tag, 30],
  [E.Attribute, 1],
  [E.Pseudo, 0],
]);
function or(t) {
  return !wo.has(t.type);
}
const Wd = new Map([
  [ae.Exists, 10],
  [ae.Equals, 8],
  [ae.Not, 7],
  [ae.Start, 6],
  [ae.End, 6],
  [ae.Any, 5],
]);
function Xd(t) {
  const e = t.map(Ao);
  for (let u = 1; u < t.length; u++) {
    const s = e[u];
    if (!(s < 0))
      for (let n = u - 1; n >= 0 && s < e[n]; n--) {
        const r = t[n + 1];
        (t[n + 1] = t[n]), (t[n] = r), (e[n + 1] = e[n]), (e[n] = s);
      }
  }
}
function Ao(t) {
  var e, u;
  let s = (e = wo.get(t.type)) !== null && e !== void 0 ? e : -1;
  return (
    t.type === E.Attribute
      ? ((s = (u = Wd.get(t.action)) !== null && u !== void 0 ? u : 4),
        t.action === ae.Equals && t.name === 'id' && (s = 9),
        t.ignoreCase && (s >>= 1))
      : t.type === E.Pseudo &&
        (t.data
          ? t.name === 'has' || t.name === 'contains'
            ? (s = 0)
            : Array.isArray(t.data)
            ? ((s = Math.min(...t.data.map((n) => Math.min(...n.map(Ao))))),
              s < 0 && (s = 0))
            : (s = 2)
          : (s = 3)),
    s
  );
}
const Jd = /[-[\]{}()*+?.,\\^$|#\s]/g;
function bi(t) {
  return t.replace(Jd, '\\$&');
}
const Zd = new Set([
  'accept',
  'accept-charset',
  'align',
  'alink',
  'axis',
  'bgcolor',
  'charset',
  'checked',
  'clear',
  'codetype',
  'color',
  'compact',
  'declare',
  'defer',
  'dir',
  'direction',
  'disabled',
  'enctype',
  'face',
  'frame',
  'hreflang',
  'http-equiv',
  'lang',
  'language',
  'link',
  'media',
  'method',
  'multiple',
  'nohref',
  'noresize',
  'noshade',
  'nowrap',
  'readonly',
  'rel',
  'rev',
  'rules',
  'scope',
  'scrolling',
  'selected',
  'shape',
  'target',
  'text',
  'type',
  'valign',
  'valuetype',
  'vlink',
]);
function It(t, e) {
  return typeof t.ignoreCase == 'boolean'
    ? t.ignoreCase
    : t.ignoreCase === 'quirks'
    ? !!e.quirksMode
    : !e.xmlMode && Zd.has(t.name);
}
const Yd = {
    equals(t, e, u) {
      const { adapter: s } = u,
        { name: n } = e;
      let { value: r } = e;
      return It(e, u)
        ? ((r = r.toLowerCase()),
          (i) => {
            const a = s.getAttributeValue(i, n);
            return (
              a != null &&
              a.length === r.length &&
              a.toLowerCase() === r &&
              t(i)
            );
          })
        : (i) => s.getAttributeValue(i, n) === r && t(i);
    },
    hyphen(t, e, u) {
      const { adapter: s } = u,
        { name: n } = e;
      let { value: r } = e;
      const i = r.length;
      return It(e, u)
        ? ((r = r.toLowerCase()),
          function (o) {
            const c = s.getAttributeValue(o, n);
            return (
              c != null &&
              (c.length === i || c.charAt(i) === '-') &&
              c.substr(0, i).toLowerCase() === r &&
              t(o)
            );
          })
        : function (o) {
            const c = s.getAttributeValue(o, n);
            return (
              c != null &&
              (c.length === i || c.charAt(i) === '-') &&
              c.substr(0, i) === r &&
              t(o)
            );
          };
    },
    element(t, e, u) {
      const { adapter: s } = u,
        { name: n, value: r } = e;
      if (/\s/.test(r)) return R.falseFunc;
      const i = new RegExp(`(?:^|\\s)${bi(r)}(?:$|\\s)`, It(e, u) ? 'i' : '');
      return function (o) {
        const c = s.getAttributeValue(o, n);
        return c != null && c.length >= r.length && i.test(c) && t(o);
      };
    },
    exists(t, { name: e }, { adapter: u }) {
      return (s) => u.hasAttrib(s, e) && t(s);
    },
    start(t, e, u) {
      const { adapter: s } = u,
        { name: n } = e;
      let { value: r } = e;
      const i = r.length;
      return i === 0
        ? R.falseFunc
        : It(e, u)
        ? ((r = r.toLowerCase()),
          (a) => {
            const o = s.getAttributeValue(a, n);
            return (
              o != null &&
              o.length >= i &&
              o.substr(0, i).toLowerCase() === r &&
              t(a)
            );
          })
        : (a) => {
            var o;
            return (
              !!(
                !((o = s.getAttributeValue(a, n)) === null || o === void 0) &&
                o.startsWith(r)
              ) && t(a)
            );
          };
    },
    end(t, e, u) {
      const { adapter: s } = u,
        { name: n } = e;
      let { value: r } = e;
      const i = -r.length;
      return i === 0
        ? R.falseFunc
        : It(e, u)
        ? ((r = r.toLowerCase()),
          (a) => {
            var o;
            return (
              ((o = s.getAttributeValue(a, n)) === null || o === void 0
                ? void 0
                : o.substr(i).toLowerCase()) === r && t(a)
            );
          })
        : (a) => {
            var o;
            return (
              !!(
                !((o = s.getAttributeValue(a, n)) === null || o === void 0) &&
                o.endsWith(r)
              ) && t(a)
            );
          };
    },
    any(t, e, u) {
      const { adapter: s } = u,
        { name: n, value: r } = e;
      if (r === '') return R.falseFunc;
      if (It(e, u)) {
        const i = new RegExp(bi(r), 'i');
        return function (o) {
          const c = s.getAttributeValue(o, n);
          return c != null && c.length >= r.length && i.test(c) && t(o);
        };
      }
      return (i) => {
        var a;
        return (
          !!(
            !((a = s.getAttributeValue(i, n)) === null || a === void 0) &&
            a.includes(r)
          ) && t(i)
        );
      };
    },
    not(t, e, u) {
      const { adapter: s } = u,
        { name: n } = e;
      let { value: r } = e;
      return r === ''
        ? (i) => !!s.getAttributeValue(i, n) && t(i)
        : It(e, u)
        ? ((r = r.toLowerCase()),
          (i) => {
            const a = s.getAttributeValue(i, n);
            return (
              (a == null || a.length !== r.length || a.toLowerCase() !== r) &&
              t(i)
            );
          })
        : (i) => s.getAttributeValue(i, n) !== r && t(i);
    },
  },
  Qd = new Set([9, 10, 12, 13, 32]),
  pi = 48,
  ef = 57;
function tf(t) {
  if (((t = t.trim().toLowerCase()), t === 'even')) return [2, 0];
  if (t === 'odd') return [2, 1];
  let e = 0,
    u = 0,
    s = r(),
    n = i();
  if (
    (e < t.length &&
      t.charAt(e) === 'n' &&
      (e++,
      (u = s * (n ?? 1)),
      a(),
      e < t.length ? ((s = r()), a(), (n = i())) : (s = n = 0)),
    n === null || e < t.length)
  )
    throw new Error(`n-th rule couldn't be parsed ('${t}')`);
  return [u, s * n];
  function r() {
    return t.charAt(e) === '-' ? (e++, -1) : (t.charAt(e) === '+' && e++, 1);
  }
  function i() {
    const o = e;
    let c = 0;
    for (; e < t.length && t.charCodeAt(e) >= pi && t.charCodeAt(e) <= ef; )
      (c = c * 10 + (t.charCodeAt(e) - pi)), e++;
    return e === o ? null : c;
  }
  function a() {
    for (; e < t.length && Qd.has(t.charCodeAt(e)); ) e++;
  }
}
function uf(t) {
  const e = t[0],
    u = t[1] - 1;
  if (u < 0 && e <= 0) return R.falseFunc;
  if (e === -1) return (r) => r <= u;
  if (e === 0) return (r) => r === u;
  if (e === 1) return u < 0 ? R.trueFunc : (r) => r >= u;
  const s = Math.abs(e),
    n = ((u % s) + s) % s;
  return e > 1 ? (r) => r >= u && r % s === n : (r) => r <= u && r % s === n;
}
function ju(t) {
  return uf(tf(t));
}
function zu(t, e) {
  return (u) => {
    const s = e.getParent(u);
    return s != null && e.isTag(s) && t(u);
  };
}
const Ln = {
  contains(t, e, { adapter: u }) {
    return function (n) {
      return t(n) && u.getText(n).includes(e);
    };
  },
  icontains(t, e, { adapter: u }) {
    const s = e.toLowerCase();
    return function (r) {
      return t(r) && u.getText(r).toLowerCase().includes(s);
    };
  },
  'nth-child'(t, e, { adapter: u, equals: s }) {
    const n = ju(e);
    return n === R.falseFunc
      ? R.falseFunc
      : n === R.trueFunc
      ? zu(t, u)
      : function (i) {
          const a = u.getSiblings(i);
          let o = 0;
          for (let c = 0; c < a.length && !s(i, a[c]); c++)
            u.isTag(a[c]) && o++;
          return n(o) && t(i);
        };
  },
  'nth-last-child'(t, e, { adapter: u, equals: s }) {
    const n = ju(e);
    return n === R.falseFunc
      ? R.falseFunc
      : n === R.trueFunc
      ? zu(t, u)
      : function (i) {
          const a = u.getSiblings(i);
          let o = 0;
          for (let c = a.length - 1; c >= 0 && !s(i, a[c]); c--)
            u.isTag(a[c]) && o++;
          return n(o) && t(i);
        };
  },
  'nth-of-type'(t, e, { adapter: u, equals: s }) {
    const n = ju(e);
    return n === R.falseFunc
      ? R.falseFunc
      : n === R.trueFunc
      ? zu(t, u)
      : function (i) {
          const a = u.getSiblings(i);
          let o = 0;
          for (let c = 0; c < a.length; c++) {
            const l = a[c];
            if (s(i, l)) break;
            u.isTag(l) && u.getName(l) === u.getName(i) && o++;
          }
          return n(o) && t(i);
        };
  },
  'nth-last-of-type'(t, e, { adapter: u, equals: s }) {
    const n = ju(e);
    return n === R.falseFunc
      ? R.falseFunc
      : n === R.trueFunc
      ? zu(t, u)
      : function (i) {
          const a = u.getSiblings(i);
          let o = 0;
          for (let c = a.length - 1; c >= 0; c--) {
            const l = a[c];
            if (s(i, l)) break;
            u.isTag(l) && u.getName(l) === u.getName(i) && o++;
          }
          return n(o) && t(i);
        };
  },
  root(t, e, { adapter: u }) {
    return (s) => {
      const n = u.getParent(s);
      return (n == null || !u.isTag(n)) && t(s);
    };
  },
  scope(t, e, u, s) {
    const { equals: n } = u;
    return !s || s.length === 0
      ? Ln.root(t, e, u)
      : s.length === 1
      ? (r) => n(s[0], r) && t(r)
      : (r) => s.includes(r) && t(r);
  },
  hover: Us('isHovered'),
  visited: Us('isVisited'),
  active: Us('isActive'),
};
function Us(t) {
  return function (u, s, { adapter: n }) {
    const r = n[t];
    return typeof r != 'function'
      ? R.falseFunc
      : function (a) {
          return r(a) && u(a);
        };
  };
}
const gi = {
  empty(t, { adapter: e }) {
    return !e.getChildren(t).some((u) => e.isTag(u) || e.getText(u) !== '');
  },
  'first-child'(t, { adapter: e, equals: u }) {
    if (e.prevElementSibling) return e.prevElementSibling(t) == null;
    const s = e.getSiblings(t).find((n) => e.isTag(n));
    return s != null && u(t, s);
  },
  'last-child'(t, { adapter: e, equals: u }) {
    const s = e.getSiblings(t);
    for (let n = s.length - 1; n >= 0; n--) {
      if (u(t, s[n])) return !0;
      if (e.isTag(s[n])) break;
    }
    return !1;
  },
  'first-of-type'(t, { adapter: e, equals: u }) {
    const s = e.getSiblings(t),
      n = e.getName(t);
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      if (u(t, i)) return !0;
      if (e.isTag(i) && e.getName(i) === n) break;
    }
    return !1;
  },
  'last-of-type'(t, { adapter: e, equals: u }) {
    const s = e.getSiblings(t),
      n = e.getName(t);
    for (let r = s.length - 1; r >= 0; r--) {
      const i = s[r];
      if (u(t, i)) return !0;
      if (e.isTag(i) && e.getName(i) === n) break;
    }
    return !1;
  },
  'only-of-type'(t, { adapter: e, equals: u }) {
    const s = e.getName(t);
    return e
      .getSiblings(t)
      .every((n) => u(t, n) || !e.isTag(n) || e.getName(n) !== s);
  },
  'only-child'(t, { adapter: e, equals: u }) {
    return e.getSiblings(t).every((s) => u(t, s) || !e.isTag(s));
  },
};
function mi(t, e, u, s) {
  if (u === null) {
    if (t.length > s)
      throw new Error(`Pseudo-class :${e} requires an argument`);
  } else if (t.length === s)
    throw new Error(`Pseudo-class :${e} doesn't have any arguments`);
}
const sf = {
    'any-link': ':is(a, area, link)[href]',
    link: ':any-link:not(:visited)',
    disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
    enabled: ':not(:disabled)',
    checked:
      ':is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)',
    required: ':is(input, select, textarea)[required]',
    optional: ':is(input, select, textarea):not([required])',
    selected:
      'option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)',
    checkbox: '[type=checkbox]',
    file: '[type=file]',
    password: '[type=password]',
    radio: '[type=radio]',
    reset: '[type=reset]',
    image: '[type=image]',
    submit: '[type=submit]',
    parent: ':not(:empty)',
    header: ':is(h1, h2, h3, h4, h5, h6)',
    button: ':is(button, input[type=button])',
    input: ':is(input, textarea, select, button)',
    text: "input:is(:not([type!='']), [type=text])",
  },
  _o = {};
function No(t, e) {
  return t === R.falseFunc ? R.falseFunc : (u) => e.isTag(u) && t(u);
}
function nf(t, e) {
  const u = e.getSiblings(t);
  if (u.length <= 1) return [];
  const s = u.indexOf(t);
  return s < 0 || s === u.length - 1 ? [] : u.slice(s + 1).filter(e.isTag);
}
function In(t) {
  return {
    xmlMode: !!t.xmlMode,
    lowerCaseAttributeNames: !!t.lowerCaseAttributeNames,
    lowerCaseTags: !!t.lowerCaseTags,
    quirksMode: !!t.quirksMode,
    cacheResults: !!t.cacheResults,
    pseudos: t.pseudos,
    adapter: t.adapter,
    equals: t.equals,
  };
}
const $s = (t, e, u, s, n) => {
    const r = n(e, In(u), s);
    return r === R.trueFunc
      ? t
      : r === R.falseFunc
      ? R.falseFunc
      : (i) => r(i) && t(i);
  },
  Hs = {
    is: $s,
    matches: $s,
    where: $s,
    not(t, e, u, s, n) {
      const r = n(e, In(u), s);
      return r === R.falseFunc
        ? t
        : r === R.trueFunc
        ? R.falseFunc
        : (i) => !r(i) && t(i);
    },
    has(t, e, u, s, n) {
      const { adapter: r } = u,
        i = In(u);
      i.relativeSelector = !0;
      const a = e.some((l) => l.some(or)) ? [_o] : void 0,
        o = n(e, i, a);
      if (o === R.falseFunc) return R.falseFunc;
      const c = No(o, r);
      if (a && o !== R.trueFunc) {
        const { shouldTestNextSiblings: l = !1 } = o;
        return (f) => {
          if (!t(f)) return !1;
          a[0] = f;
          const p = r.getChildren(f),
            h = l ? [...p, ...nf(f, r)] : p;
          return r.existsOne(c, h);
        };
      }
      return (l) => t(l) && r.existsOne(c, r.getChildren(l));
    },
  };
function rf(t, e, u, s, n) {
  var r;
  const { name: i, data: a } = e;
  if (Array.isArray(a)) {
    if (!(i in Hs)) throw new Error(`Unknown pseudo-class :${i}(${a})`);
    return Hs[i](t, a, u, s, n);
  }
  const o = (r = u.pseudos) === null || r === void 0 ? void 0 : r[i],
    c = typeof o == 'string' ? o : sf[i];
  if (typeof c == 'string') {
    if (a != null) throw new Error(`Pseudo ${i} doesn't have any arguments`);
    const l = vo(c);
    return Hs.is(t, l, u, s, n);
  }
  if (typeof o == 'function') return mi(o, i, a, 1), (l) => o(l, a) && t(l);
  if (i in Ln) return Ln[i](t, a, u, s);
  if (i in gi) {
    const l = gi[i];
    return mi(l, i, a, 2), (f) => l(f, u, a) && t(f);
  }
  throw new Error(`Unknown pseudo-class :${i}`);
}
function Gs(t, e) {
  const u = e.getParent(t);
  return u && e.isTag(u) ? u : null;
}
function af(t, e, u, s, n) {
  const { adapter: r, equals: i } = u;
  switch (e.type) {
    case E.PseudoElement:
      throw new Error('Pseudo-elements are not supported by css-select');
    case E.ColumnCombinator:
      throw new Error('Column combinators are not yet supported by css-select');
    case E.Attribute: {
      if (e.namespace != null)
        throw new Error(
          'Namespaced attributes are not yet supported by css-select'
        );
      return (
        (!u.xmlMode || u.lowerCaseAttributeNames) &&
          (e.name = e.name.toLowerCase()),
        Yd[e.action](t, e, u)
      );
    }
    case E.Pseudo:
      return rf(t, e, u, s, n);
    case E.Tag: {
      if (e.namespace != null)
        throw new Error(
          'Namespaced tag names are not yet supported by css-select'
        );
      let { name: a } = e;
      return (
        (!u.xmlMode || u.lowerCaseTags) && (a = a.toLowerCase()),
        function (c) {
          return r.getName(c) === a && t(c);
        }
      );
    }
    case E.Descendant: {
      if (u.cacheResults === !1 || typeof WeakSet > 'u')
        return function (c) {
          let l = c;
          for (; (l = Gs(l, r)); ) if (t(l)) return !0;
          return !1;
        };
      const a = new WeakSet();
      return function (c) {
        let l = c;
        for (; (l = Gs(l, r)); )
          if (!a.has(l)) {
            if (r.isTag(l) && t(l)) return !0;
            a.add(l);
          }
        return !1;
      };
    }
    case '_flexibleDescendant':
      return function (o) {
        let c = o;
        do if (t(c)) return !0;
        while ((c = Gs(c, r)));
        return !1;
      };
    case E.Parent:
      return function (o) {
        return r.getChildren(o).some((c) => r.isTag(c) && t(c));
      };
    case E.Child:
      return function (o) {
        const c = r.getParent(o);
        return c != null && r.isTag(c) && t(c);
      };
    case E.Sibling:
      return function (o) {
        const c = r.getSiblings(o);
        for (let l = 0; l < c.length; l++) {
          const f = c[l];
          if (i(o, f)) break;
          if (r.isTag(f) && t(f)) return !0;
        }
        return !1;
      };
    case E.Adjacent:
      return r.prevElementSibling
        ? function (o) {
            const c = r.prevElementSibling(o);
            return c != null && t(c);
          }
        : function (o) {
            const c = r.getSiblings(o);
            let l;
            for (let f = 0; f < c.length; f++) {
              const p = c[f];
              if (i(o, p)) break;
              r.isTag(p) && (l = p);
            }
            return !!l && t(l);
          };
    case E.Universal: {
      if (e.namespace != null && e.namespace !== '*')
        throw new Error(
          'Namespaced universal selectors are not yet supported by css-select'
        );
      return t;
    }
  }
}
function Ro(t, e, u) {
  const s = of(t, e, u);
  return No(s, e.adapter);
}
function of(t, e, u) {
  const s = typeof t == 'string' ? vo(t) : t;
  return Lo(s, e, u);
}
function Do(t) {
  return (
    t.type === E.Pseudo &&
    (t.name === 'scope' ||
      (Array.isArray(t.data) && t.data.some((e) => e.some(Do))))
  );
}
const cf = { type: E.Descendant },
  lf = { type: '_flexibleDescendant' },
  df = { type: E.Pseudo, name: 'scope', data: null };
function ff(t, { adapter: e }, u) {
  const s = !!u?.every((n) => {
    const r = e.isTag(n) && e.getParent(n);
    return n === _o || (r && e.isTag(r));
  });
  for (const n of t) {
    if (!(n.length > 0 && or(n[0]) && n[0].type !== E.Descendant))
      if (s && !n.some(Do)) n.unshift(cf);
      else continue;
    n.unshift(df);
  }
}
function Lo(t, e, u) {
  var s;
  t.forEach(Xd), (u = (s = e.context) !== null && s !== void 0 ? s : u);
  const n = Array.isArray(u),
    r = u && (Array.isArray(u) ? u : [u]);
  if (e.relativeSelector !== !1) ff(t, e, r);
  else if (t.some((o) => o.length > 0 && or(o[0])))
    throw new Error(
      'Relative selectors are not allowed when the `relativeSelector` option is disabled'
    );
  let i = !1;
  const a = t
    .map((o) => {
      if (o.length >= 2) {
        const [c, l] = o;
        c.type !== E.Pseudo ||
          c.name !== 'scope' ||
          (n && l.type === E.Descendant
            ? (o[1] = lf)
            : (l.type === E.Adjacent || l.type === E.Sibling) && (i = !0));
      }
      return hf(o, e, r);
    })
    .reduce(bf, R.falseFunc);
  return (a.shouldTestNextSiblings = i), a;
}
function hf(t, e, u) {
  var s;
  return t.reduce(
    (n, r) => (n === R.falseFunc ? R.falseFunc : af(n, r, e, u, Lo)),
    (s = e.rootFunc) !== null && s !== void 0 ? s : R.trueFunc
  );
}
function bf(t, e) {
  return e === R.falseFunc || t === R.trueFunc
    ? t
    : t === R.falseFunc || e === R.trueFunc
    ? e
    : function (s) {
        return t(s) || e(s);
      };
}
const Io = (t, e) => t === e,
  pf = { adapter: Qn, equals: Io };
function Mo(t) {
  var e, u, s, n;
  const r = t ?? pf;
  return (
    ((e = r.adapter) !== null && e !== void 0) || (r.adapter = Qn),
    ((u = r.equals) !== null && u !== void 0) ||
      (r.equals =
        (n = (s = r.adapter) === null || s === void 0 ? void 0 : s.equals) !==
          null && n !== void 0
          ? n
          : Io),
    r
  );
}
function gf(t) {
  return function (u, s, n) {
    const r = Mo(s);
    return t(u, r, n);
  };
}
const mf = gf(Ro);
function Sf(t, e, u) {
  const s = Mo(u);
  return (typeof e == 'function' ? e : Ro(e, s))(t);
}
const { isArray: xf } = Array,
  vs = ({ nodeType: t }) => t === k,
  Oo = (t, e) => e.some((u) => vs(u) && (t(u) || Oo(t, lu(u)))),
  yf = (t, e) => (e === 'class' ? t.classList.value : t.getAttribute(e)),
  lu = ({ childNodes: t }) => t,
  Tf = (t) => {
    const { localName: e } = t;
    return _t(t) ? e.toLowerCase() : e;
  },
  Cf = ({ parentNode: t }) => t,
  vf = (t) => {
    const { parentNode: e } = t;
    return e ? lu(e) : t;
  },
  Mn = (t) =>
    xf(t)
      ? t.map(Mn).join('')
      : vs(t)
      ? Mn(lu(t))
      : t.nodeType === Te
      ? t.data
      : '',
  Ef = (t, e) => t.hasAttribute(e),
  wf = (t) => {
    let { length: e } = t;
    for (; e--; ) {
      const u = t[e];
      if (e && -1 < t.lastIndexOf(u, e - 1)) {
        t.splice(e, 1);
        continue;
      }
      for (let { parentNode: s } = u; s; s = s.parentNode)
        if (t.includes(s)) {
          t.splice(e, 1);
          break;
        }
    }
    return t;
  },
  ko = (t, e) => {
    const u = [];
    for (const s of e) vs(s) && (t(s) && u.push(s), u.push(...ko(t, lu(s))));
    return u;
  },
  Po = (t, e) => {
    for (let u of e) if (t(u) || (u = Po(t, lu(u)))) return u;
    return null;
  },
  qo = {
    isTag: vs,
    existsOne: Oo,
    getAttributeValue: yf,
    getChildren: lu,
    getName: Tf,
    getParent: Cf,
    getSiblings: vf,
    getText: Mn,
    hasAttrib: Ef,
    removeSubsets: wf,
    findAll: ko,
    findOne: Po,
  },
  On = (t, e) =>
    mf(e, {
      context: e.includes(':scope') ? t : void 0,
      xmlMode: !_t(t),
      adapter: qo,
    }),
  Af = (t, e) =>
    Sf(t, e, {
      strict: !0,
      context: e.includes(':scope') ? t : void 0,
      xmlMode: !_t(t),
      adapter: qo,
    });
let Iu = class Bo extends Lu {
  constructor(e, u = '') {
    super(e, '#text', Te, u);
  }
  get wholeText() {
    const e = [];
    let { previousSibling: u, nextSibling: s } = this;
    for (; u && u.nodeType === Te; ) {
      e.unshift(u[H]);
      u = u.previousSibling;
    }
    for (e.push(this[H]); s && s.nodeType === Te; ) {
      e.push(s[H]);
      s = s.nextSibling;
    }
    return e.join('');
  }
  cloneNode() {
    const { ownerDocument: e, [H]: u } = this;
    return new Bo(e, u);
  }
  toString() {
    return ur(this[H]);
  }
};
const _f = (t) => t instanceof $t,
  js = (t, e, u) => {
    const { ownerDocument: s } = t;
    for (const n of u) t.insertBefore(_f(n) ? n : new Iu(s, n), e);
  };
class Fo extends $t {
  constructor(e, u, s) {
    super(e, u, s),
      (this[ye] = null),
      (this[S] = this[T] =
        {
          [S]: null,
          [fe]: this,
          [Me]: this,
          nodeType: At,
          ownerDocument: this.ownerDocument,
          parentNode: null,
        });
  }
  get childNodes() {
    const e = new ot();
    let { firstChild: u } = this;
    for (; u; ) e.push(u), (u = Pt(u));
    return e;
  }
  get children() {
    const e = new ot();
    let { firstElementChild: u } = this;
    for (; u; ) e.push(u), (u = sr(u));
    return e;
  }
  get firstChild() {
    let { [S]: e, [T]: u } = this;
    for (; e.nodeType === pe; ) e = e[S];
    return e === u ? null : e;
  }
  get firstElementChild() {
    let { firstChild: e } = this;
    for (; e; ) {
      if (e.nodeType === k) return e;
      e = Pt(e);
    }
    return null;
  }
  get lastChild() {
    const e = this[T][fe];
    switch (e.nodeType) {
      case At:
        return e[Me];
      case pe:
        return null;
    }
    return e === this ? null : e;
  }
  get lastElementChild() {
    let { lastChild: e } = this;
    for (; e; ) {
      if (e.nodeType === k) return e;
      e = wu(e);
    }
    return null;
  }
  get childElementCount() {
    return this.children.length;
  }
  prepend(...e) {
    js(this, this.firstChild, e);
  }
  append(...e) {
    js(this, this[T], e);
  }
  replaceChildren(...e) {
    let { [S]: u, [T]: s } = this;
    for (; u !== s && u.nodeType === pe; ) u = u[S];
    for (; u !== s; ) {
      const n = ke(u)[S];
      u.remove(), (u = n);
    }
    e.length && js(this, s, e);
  }
  getElementsByClassName(e) {
    const u = new ot();
    let { [S]: s, [T]: n } = this;
    for (; s !== n; )
      s.nodeType === k &&
        s.hasAttribute('class') &&
        s.classList.has(e) &&
        u.push(s),
        (s = s[S]);
    return u;
  }
  getElementsByTagName(e) {
    const u = new ot();
    let { [S]: s, [T]: n } = this;
    for (; s !== n; )
      s.nodeType === k && (s.localName === e || Nn(s) === e) && u.push(s),
        (s = s[S]);
    return u;
  }
  querySelector(e) {
    const u = On(this, e);
    let { [S]: s, [T]: n } = this;
    for (; s !== n; ) {
      if (s.nodeType === k && u(s)) return s;
      s = s.nodeType === k && s.localName === 'template' ? s[T] : s[S];
    }
    return null;
  }
  querySelectorAll(e) {
    const u = On(this, e),
      s = new ot();
    let { [S]: n, [T]: r } = this;
    for (; n !== r; )
      n.nodeType === k && u(n) && s.push(n),
        (n = n.nodeType === k && n.localName === 'template' ? n[T] : n[S]);
    return s;
  }
  appendChild(e) {
    return this.insertBefore(e, this[T]);
  }
  contains(e) {
    let u = e;
    for (; u && u !== this; ) u = u.parentNode;
    return u === this;
  }
  insertBefore(e, u = null) {
    if (e === u) return e;
    if (e === this) throw new Error('unable to append a node to itself');
    const s = u || this[T];
    switch (e.nodeType) {
      case k:
        e.remove(), (e.parentNode = this), eo(s[fe], e, s), Tu(e, null), Rn(e);
        break;
      case bt: {
        let { [ye]: n, firstChild: r, lastChild: i } = e;
        if (r) {
          to(s[fe], r, i, s), et(e, e[T]), n && n.replaceChildren();
          do (r.parentNode = this), Tu(r, null), r.nodeType === k && Rn(r);
          while (r !== i && (r = Pt(r)));
        }
        break;
      }
      case Te:
      case pt:
      case ct:
        e.remove();
      default:
        (e.parentNode = this), ys(s[fe], e, s), Tu(e, null);
        break;
    }
    return e;
  }
  normalize() {
    let { [S]: e, [T]: u } = this;
    for (; e !== u; ) {
      const { [S]: s, [fe]: n, nodeType: r } = e;
      r === Te &&
        (e[H]
          ? n &&
            n.nodeType === Te &&
            ((n.textContent += e.textContent), e.remove())
          : e.remove()),
        (e = s);
    }
  }
  removeChild(e) {
    if (e.parentNode !== this) throw new Error('node is not a child');
    return e.remove(), e;
  }
  replaceChild(e, u) {
    const s = ke(u)[S];
    return u.remove(), this.insertBefore(e, s), u;
  }
}
class cr extends Fo {
  getElementById(e) {
    let { [S]: u, [T]: s } = this;
    for (; u !== s; ) {
      if (u.nodeType === k && u.id === e) return u;
      u = u[S];
    }
    return null;
  }
  cloneNode(e) {
    const { ownerDocument: u, constructor: s } = this,
      n = new s(u);
    if (e) {
      const { [T]: r } = n;
      for (const i of this.childNodes) n.insertBefore(i.cloneNode(e), r);
    }
    return n;
  }
  toString() {
    const { childNodes: e, localName: u } = this;
    return `<${u}>${e.join('')}</${u}>`;
  }
  toJSON() {
    const e = [];
    return Dd(this, e), e;
  }
}
let lr = class extends cr {
    constructor(e) {
      super(e, '#document-fragment', bt);
    }
  },
  hs = class Vo extends $t {
    constructor(e, u, s = '', n = '') {
      super(e, '#document-type', au),
        (this.name = u),
        (this.publicId = s),
        (this.systemId = n);
    }
    cloneNode() {
      const { ownerDocument: e, name: u, publicId: s, systemId: n } = this;
      return new Vo(e, u, s, n);
    }
    toString() {
      const { name: e, publicId: u, systemId: s } = this,
        n = 0 < u.length,
        r = [e];
      return (
        n && r.push('PUBLIC', `"${u}"`),
        s.length && (n || r.push('SYSTEM'), r.push(`"${s}"`)),
        `<!DOCTYPE ${r.join(' ')}>`
      );
    }
    toJSON() {
      const e = [];
      return lo(this, e), e;
    }
  };
const Uo = (t) => t.childNodes.join(''),
  $o = (t, e) => {
    const { ownerDocument: u } = t,
      { constructor: s } = u,
      n = new s();
    n[Je] = u[Je];
    const { childNodes: r } = ro(n, _t(t), e);
    t.replaceChildren(...r.map(Ho, u));
  };
function Ho(t) {
  switch (((t.ownerDocument = this), t.nodeType)) {
    case k:
    case bt:
      t.childNodes.forEach(Ho, this);
      break;
  }
  return t;
}
const ns = (t) =>
    t
      .replace(/(([A-Z0-9])([A-Z0-9][a-z]))|(([a-z0-9]+)([A-Z]))/g, '$2$5-$3$6')
      .toLowerCase(),
  rs = new WeakMap(),
  zs = (t) => `data-${ns(t)}`,
  Nf = (t) => t.slice(5).replace(/-([a-z])/g, (e, u) => u.toUpperCase()),
  Rf = {
    get(t, e) {
      if (e in t) return rs.get(t).getAttribute(zs(e));
    },
    set(t, e, u) {
      return (t[e] = u), rs.get(t).setAttribute(zs(e), u), !0;
    },
    deleteProperty(t, e) {
      return e in t && rs.get(t).removeAttribute(zs(e)), delete t[e];
    },
  };
class Go {
  constructor(e) {
    for (const { name: u, value: s } of e.attributes)
      /^data-/.test(u) && (this[Nf(u)] = s);
    return rs.set(this, e), new Proxy(this, Rf);
  }
}
Ne(Go.prototype, null);
const { add: Df } = Set.prototype,
  Si = (t, e) => {
    for (const u of e) u && Df.call(t, u);
  },
  mu = ({ [va]: t, value: e }) => {
    const u = t.getAttributeNode('class');
    u ? (u.value = e) : Dn(t, new Du(t.ownerDocument, 'class', e));
  };
class Lf extends Set {
  constructor(e) {
    super(), (this[va] = e);
    const u = e.getAttributeNode('class');
    u && Si(this, u.value.split(/\s+/));
  }
  get length() {
    return this.size;
  }
  get value() {
    return [...this].join(' ');
  }
  add(...e) {
    Si(this, e), mu(this);
  }
  contains(e) {
    return this.has(e);
  }
  remove(...e) {
    for (const u of e) this.delete(u);
    mu(this);
  }
  toggle(e, u) {
    if (this.has(e)) {
      if (u) return !0;
      this.delete(e), mu(this);
    } else if (u || arguments.length === 1) return super.add(e), mu(this), !0;
    return !1;
  }
  replace(e, u) {
    return this.has(e) ? (this.delete(e), super.add(u), mu(this), !0) : !1;
  }
  supports() {
    return !0;
  }
}
const bs = new WeakMap(),
  kn = (t) => [...t.keys()].filter((e) => e !== ye),
  ps = (t) => {
    const e = bs.get(t).getAttributeNode('style');
    if ((!e || e[as] || t.get(ye) !== e) && (t.clear(), e)) {
      t.set(ye, e);
      for (const u of e[H].split(/\s*;\s*/)) {
        let [s, ...n] = u.split(':');
        if (n.length > 0) {
          s = s.trim();
          const r = n.join(':').trim();
          s && r && t.set(s, r);
        }
      }
    }
    return e;
  },
  Ku = {
    get(t, e) {
      return e in If
        ? t[e]
        : (ps(t),
          e === 'length'
            ? kn(t).length
            : /^\d+$/.test(e)
            ? kn(t)[e]
            : t.get(ns(e)));
    },
    set(t, e, u) {
      if (e === 'cssText') t[e] = u;
      else {
        let s = ps(t);
        if ((u == null ? t.delete(ns(e)) : t.set(ns(e), u), !s)) {
          const n = bs.get(t);
          (s = n.ownerDocument.createAttribute('style')),
            n.setAttributeNode(s),
            t.set(ye, s);
        }
        (s[as] = !1), (s[H] = t.toString());
      }
      return !0;
    },
  };
let jo = class extends Map {
  constructor(e) {
    return super(), bs.set(this, e), new Proxy(this, Ku);
  }
  get cssText() {
    return this.toString();
  }
  set cssText(e) {
    bs.get(this).setAttribute('style', e);
  }
  getPropertyValue(e) {
    const u = this[ye];
    return Ku.get(u, e);
  }
  setProperty(e, u) {
    const s = this[ye];
    Ku.set(s, e, u);
  }
  removeProperty(e) {
    const u = this[ye];
    Ku.set(u, e, null);
  }
  [Symbol.iterator]() {
    const e = this[ye];
    ps(e);
    const u = kn(e),
      { length: s } = u;
    let n = 0;
    return {
      next() {
        const r = n === s;
        return { done: r, value: r ? null : u[n++] };
      },
    };
  }
  get [ye]() {
    return this;
  }
  toString() {
    const e = this[ye];
    ps(e);
    const u = [];
    return e.forEach(Mf, u), u.join(';');
  }
};
const { prototype: If } = jo;
function Mf(t, e) {
  e !== ye && this.push(`${e}:${t}`);
}
const xi = 3,
  yi = 2,
  Ti = 1,
  Ci = 0;
function Of(t) {
  return t.currentTarget;
}
class Vt {
  static get BUBBLING_PHASE() {
    return xi;
  }
  static get AT_TARGET() {
    return yi;
  }
  static get CAPTURING_PHASE() {
    return Ti;
  }
  static get NONE() {
    return Ci;
  }
  constructor(e, u = {}) {
    (this.type = e),
      (this.bubbles = !!u.bubbles),
      (this.cancelBubble = !1),
      (this._stopImmediatePropagationFlag = !1),
      (this.cancelable = !!u.cancelable),
      (this.eventPhase = this.NONE),
      (this.timeStamp = Date.now()),
      (this.defaultPrevented = !1),
      (this.originalTarget = null),
      (this.returnValue = null),
      (this.srcElement = null),
      (this.target = null),
      (this._path = []);
  }
  get BUBBLING_PHASE() {
    return xi;
  }
  get AT_TARGET() {
    return yi;
  }
  get CAPTURING_PHASE() {
    return Ti;
  }
  get NONE() {
    return Ci;
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
  composedPath() {
    return this._path.map(Of);
  }
  stopPropagation() {
    this.cancelBubble = !0;
  }
  stopImmediatePropagation() {
    this.stopPropagation(), (this._stopImmediatePropagationFlag = !0);
  }
}
class zo extends Array {
  constructor(e) {
    super(), (this.ownerElement = e);
  }
  getNamedItem(e) {
    return this.ownerElement.getAttributeNode(e);
  }
  setNamedItem(e) {
    this.ownerElement.setAttributeNode(e), this.unshift(e);
  }
  removeNamedItem(e) {
    const u = this.getNamedItem(e);
    this.ownerElement.removeAttribute(e), this.splice(this.indexOf(u), 1);
  }
  item(e) {
    return e < this.length ? this[e] : null;
  }
  getNamedItemNS(e, u) {
    return this.getNamedItem(u);
  }
  setNamedItemNS(e, u) {
    return this.setNamedItem(u);
  }
  removeNamedItemNS(e, u) {
    return this.removeNamedItem(u);
  }
}
let dr = class extends cr {
  constructor(e) {
    super(e.ownerDocument, '#shadow-root', bt), (this.host = e);
  }
  get innerHTML() {
    return Uo(this);
  }
  set innerHTML(e) {
    $o(this, e);
  }
};
const kf = {
    get(t, e) {
      return e in t ? t[e] : t.find(({ name: u }) => u === e);
    },
  },
  vi = (t, e, u) => {
    if ('ownerSVGElement' in e) {
      const s = t.createElementNS(ds, u);
      return (s.ownerSVGElement = e.ownerSVGElement), s;
    }
    return t.createElement(u);
  },
  Pf = ({ localName: t, ownerDocument: e }) => e[ou].voidElements.test(t);
let Mu = class extends Fo {
  constructor(e, u) {
    super(e, u, k), (this[Qt] = null), (this[ks] = null), (this[Ps] = null);
  }
  get isConnected() {
    return po(this);
  }
  get parentElement() {
    return go(this);
  }
  get previousSibling() {
    return wu(this);
  }
  get nextSibling() {
    return Pt(this);
  }
  get namespaceURI() {
    return 'http://www.w3.org/1999/xhtml';
  }
  get previousElementSibling() {
    return mo(this);
  }
  get nextElementSibling() {
    return sr(this);
  }
  before(...e) {
    So(this, e);
  }
  after(...e) {
    xo(this, e);
  }
  replaceWith(...e) {
    rr(this, e);
  }
  remove() {
    yo(this[fe], this, this[T][S]);
  }
  get id() {
    return g.get(this, 'id');
  }
  set id(e) {
    g.set(this, 'id', e);
  }
  get className() {
    return this.classList.value;
  }
  set className(e) {
    const { classList: u } = this;
    u.clear(), u.add(...kt(e).split(/\s+/));
  }
  get nodeName() {
    return Nn(this);
  }
  get tagName() {
    return Nn(this);
  }
  get classList() {
    return this[Qt] || (this[Qt] = new Lf(this));
  }
  get dataset() {
    return this[ks] || (this[ks] = new Go(this));
  }
  getBoundingClientRect() {
    return {
      x: 0,
      y: 0,
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    };
  }
  get nonce() {
    return g.get(this, 'nonce');
  }
  set nonce(e) {
    g.set(this, 'nonce', e);
  }
  get style() {
    return this[Ps] || (this[Ps] = new jo(this));
  }
  get tabIndex() {
    return wt.get(this, 'tabindex') || -1;
  }
  set tabIndex(e) {
    wt.set(this, 'tabindex', e);
  }
  get slot() {
    return g.get(this, 'slot');
  }
  set slot(e) {
    g.set(this, 'slot', e);
  }
  get innerText() {
    const e = [];
    let { [S]: u, [T]: s } = this;
    for (; u !== s; )
      u.nodeType === Te
        ? e.push(u.textContent.replace(/\s+/g, ' '))
        : e.length &&
          u[S] != s &&
          rd.has(u.tagName) &&
          e.push(`
`),
        (u = u[S]);
    return e.join('');
  }
  get textContent() {
    const e = [];
    let { [S]: u, [T]: s } = this;
    for (; u !== s; ) {
      const n = u.nodeType;
      (n === Te || n === ct) && e.push(u.textContent), (u = u[S]);
    }
    return e.join('');
  }
  set textContent(e) {
    this.replaceChildren(),
      e != null && e !== '' && this.appendChild(new Iu(this.ownerDocument, e));
  }
  get innerHTML() {
    return Uo(this);
  }
  set innerHTML(e) {
    $o(this, e);
  }
  get outerHTML() {
    return this.toString();
  }
  set outerHTML(e) {
    const u = this.ownerDocument.createElement('');
    (u.innerHTML = e), this.replaceWith(...u.childNodes);
  }
  get attributes() {
    const e = new zo(this);
    let u = this[S];
    for (; u.nodeType === pe; ) e.push(u), (u = u[S]);
    return new Proxy(e, kf);
  }
  focus() {
    this.dispatchEvent(new Vt('focus'));
  }
  getAttribute(e) {
    if (e === 'class') return this.className;
    const u = this.getAttributeNode(e);
    return u && (_t(this) ? u.value : ur(u.value));
  }
  getAttributeNode(e) {
    let u = this[S];
    for (; u.nodeType === pe; ) {
      if (u.name === e) return u;
      u = u[S];
    }
    return null;
  }
  getAttributeNames() {
    const e = new ot();
    let u = this[S];
    for (; u.nodeType === pe; ) e.push(u.name), (u = u[S]);
    return e;
  }
  hasAttribute(e) {
    return !!this.getAttributeNode(e);
  }
  hasAttributes() {
    return this[S].nodeType === pe;
  }
  removeAttribute(e) {
    e === 'class' && this[Qt] && this[Qt].clear();
    let u = this[S];
    for (; u.nodeType === pe; ) {
      if (u.name === e) {
        ci(this, u);
        return;
      }
      u = u[S];
    }
  }
  removeAttributeNode(e) {
    let u = this[S];
    for (; u.nodeType === pe; ) {
      if (u === e) {
        ci(this, u);
        return;
      }
      u = u[S];
    }
  }
  setAttribute(e, u) {
    if (e === 'class') this.className = u;
    else {
      const s = this.getAttributeNode(e);
      s ? (s.value = u) : Dn(this, new Du(this.ownerDocument, e, u));
    }
  }
  setAttributeNode(e) {
    const { name: u } = e,
      s = this.getAttributeNode(u);
    if (s !== e) {
      s && this.removeAttributeNode(s);
      const { ownerElement: n } = e;
      n && n.removeAttributeNode(e), Dn(this, e);
    }
    return s;
  }
  toggleAttribute(e, u) {
    return this.hasAttribute(e)
      ? u
        ? !0
        : (this.removeAttribute(e), !1)
      : u || arguments.length === 1
      ? (this.setAttribute(e, ''), !0)
      : !1;
  }
  get shadowRoot() {
    if (Et.has(this)) {
      const { mode: e, shadowRoot: u } = Et.get(this);
      if (e === 'open') return u;
    }
    return null;
  }
  attachShadow(e) {
    if (Et.has(this)) throw new Error('operation not supported');
    const u = new dr(this);
    return Et.set(this, { mode: e.mode, shadowRoot: u }), u;
  }
  matches(e) {
    return Af(this, e);
  }
  closest(e) {
    let u = this;
    const s = On(u, e);
    for (; u && !s(u); ) u = u.parentElement;
    return u;
  }
  insertAdjacentElement(e, u) {
    const { parentElement: s } = this;
    switch (e) {
      case 'beforebegin':
        if (s) {
          s.insertBefore(u, this);
          break;
        }
        return null;
      case 'afterbegin':
        this.insertBefore(u, this.firstChild);
        break;
      case 'beforeend':
        this.insertBefore(u, null);
        break;
      case 'afterend':
        if (s) {
          s.insertBefore(u, this.nextSibling);
          break;
        }
        return null;
    }
    return u;
  }
  insertAdjacentHTML(e, u) {
    this.insertAdjacentElement(e, so(this.ownerDocument, u));
  }
  insertAdjacentText(e, u) {
    const s = this.ownerDocument.createTextNode(u);
    this.insertAdjacentElement(e, s);
  }
  cloneNode(e = !1) {
    const { ownerDocument: u, localName: s } = this,
      n = (l) => {
        (l.parentNode = i), et(a, l), (a = l);
      },
      r = vi(u, this, s);
    let i = r,
      a = r,
      { [S]: o, [T]: c } = this;
    for (; o !== c && (e || o.nodeType === pe); ) {
      switch (o.nodeType) {
        case At:
          et(a, i[T]), (a = i[T]), (i = i.parentNode);
          break;
        case k: {
          const l = vi(u, o, o.localName);
          n(l), (i = l);
          break;
        }
        case pe: {
          const l = o.cloneNode(e);
          (l.ownerElement = i), n(l);
          break;
        }
        case Te:
        case pt:
        case ct:
          n(o.cloneNode(e));
          break;
      }
      o = o[S];
    }
    return et(a, r[T]), r;
  }
  toString() {
    const e = [],
      { [T]: u } = this;
    let s = { [S]: this },
      n = !1;
    do
      switch (((s = s[S]), s.nodeType)) {
        case pe: {
          const r = ' ' + s;
          switch (r) {
            case ' id':
            case ' class':
            case ' style':
              break;
            default:
              e.push(r);
          }
          break;
        }
        case At: {
          const r = s[Me];
          n
            ? ('ownerSVGElement' in r
                ? e.push(' />')
                : Pf(r)
                ? e.push(_t(r) ? '>' : ' />')
                : e.push(`></${r.localName}>`),
              (n = !1))
            : e.push(`</${r.localName}>`);
          break;
        }
        case k:
          n && e.push('>'),
            s.toString !== this.toString
              ? (e.push(s.toString()), (s = s[T]), (n = !1))
              : (e.push(`<${s.localName}`), (n = !0));
          break;
        case Te:
        case pt:
        case ct:
          e.push((n ? '>' : '') + s), (n = !1);
          break;
      }
    while (s !== u);
    return e.join('');
  }
  toJSON() {
    const e = [];
    return fo(this, e), e;
  }
  getAttributeNS(e, u) {
    return this.getAttribute(u);
  }
  getElementsByTagNameNS(e, u) {
    return this.getElementsByTagName(u);
  }
  hasAttributeNS(e, u) {
    return this.hasAttribute(u);
  }
  removeAttributeNS(e, u) {
    this.removeAttribute(u);
  }
  setAttributeNS(e, u, s) {
    this.setAttribute(u, s);
  }
  setAttributeNodeNS(e) {
    return this.setAttributeNode(e);
  }
};
const Ks = new WeakMap(),
  qf = {
    get(t, e) {
      return t[e];
    },
    set(t, e, u) {
      return (t[e] = u), !0;
    },
  };
let Au = class extends Mu {
  constructor(e, u, s = null) {
    super(e, u), (this.ownerSVGElement = s);
  }
  get className() {
    return (
      Ks.has(this) || Ks.set(this, new Proxy({ baseVal: '', animVal: '' }, qf)),
      Ks.get(this)
    );
  }
  set className(e) {
    const { classList: u } = this;
    u.clear(), u.add(...kt(e).split(/\s+/));
  }
  get namespaceURI() {
    return 'http://www.w3.org/2000/svg';
  }
  getAttribute(e) {
    return e === 'class'
      ? [...this.classList].join(' ')
      : super.getAttribute(e);
  }
  setAttribute(e, u) {
    if (e === 'class') this.className = u;
    else if (e === 'style') {
      const { className: s } = this;
      s.baseVal = s.animVal = u;
    }
    super.setAttribute(e, u);
  }
};
const Be = () => {
  throw new TypeError('Illegal constructor');
};
function fr() {
  Be();
}
Ne(fr, Du);
fr.prototype = Du.prototype;
function hr() {
  Be();
}
Ne(hr, ir);
hr.prototype = ir.prototype;
function br() {
  Be();
}
Ne(br, Lu);
br.prototype = Lu.prototype;
function pr() {
  Be();
}
Ne(pr, ar);
pr.prototype = ar.prototype;
function gr() {
  Be();
}
Ne(gr, lr);
gr.prototype = lr.prototype;
function mr() {
  Be();
}
Ne(mr, hs);
mr.prototype = hs.prototype;
function Sr() {
  Be();
}
Ne(Sr, Mu);
Sr.prototype = Mu.prototype;
function xr() {
  Be();
}
Ne(xr, $t);
xr.prototype = $t.prototype;
function yr() {
  Be();
}
Ne(yr, dr);
yr.prototype = dr.prototype;
function Tr() {
  Be();
}
Ne(Tr, Iu);
Tr.prototype = Iu.prototype;
function Cr() {
  Be();
}
Ne(Cr, Au);
Cr.prototype = Au.prototype;
const Bf = {
    Attr: fr,
    CDATASection: hr,
    CharacterData: br,
    Comment: pr,
    DocumentFragment: gr,
    DocumentType: mr,
    Element: Sr,
    Node: xr,
    ShadowRoot: yr,
    Text: Tr,
    SVGElement: Cr,
  },
  Su = new WeakMap(),
  d = {
    get(t, e) {
      return (Su.has(t) && Su.get(t)[e]) || null;
    },
    set(t, e, u) {
      Su.has(t) || Su.set(t, {});
      const s = Su.get(t),
        n = e.slice(2);
      s[e] && t.removeEventListener(n, s[e], !1),
        (s[e] = u) && t.addEventListener(n, u, !1);
    },
  };
class x extends Mu {
  static get observedAttributes() {
    return [];
  }
  constructor(e = null, u = '') {
    super(e, u);
    const s = !e;
    let n;
    if (s) {
      const { constructor: r } = this;
      if (!tu.has(r))
        throw new Error('unable to initialize this Custom Element');
      ({ ownerDocument: e, localName: u, options: n } = tu.get(r));
    }
    if (e[yu]) {
      const { element: r, values: i } = e[yu];
      e[yu] = null;
      for (const [a, o] of i) r[a] = o;
      return r;
    }
    s &&
      ((this.ownerDocument = this[T].ownerDocument = e),
      (this.localName = u),
      Ft.set(this, { connected: !1 }),
      n.is && this.setAttribute('is', n.is));
  }
  blur() {
    this.dispatchEvent(new Vt('blur'));
  }
  click() {
    const e = new Vt('click', { bubbles: !0, cancelable: !0 });
    (e.button = 0), this.dispatchEvent(e);
  }
  get accessKeyLabel() {
    const { accessKey: e } = this;
    return e && `Alt+Shift+${e}`;
  }
  get isContentEditable() {
    return this.hasAttribute('contenteditable');
  }
  get contentEditable() {
    return B.get(this, 'contenteditable');
  }
  set contentEditable(e) {
    B.set(this, 'contenteditable', e);
  }
  get draggable() {
    return B.get(this, 'draggable');
  }
  set draggable(e) {
    B.set(this, 'draggable', e);
  }
  get hidden() {
    return B.get(this, 'hidden');
  }
  set hidden(e) {
    B.set(this, 'hidden', e);
  }
  get spellcheck() {
    return B.get(this, 'spellcheck');
  }
  set spellcheck(e) {
    B.set(this, 'spellcheck', e);
  }
  get accessKey() {
    return g.get(this, 'accesskey');
  }
  set accessKey(e) {
    g.set(this, 'accesskey', e);
  }
  get dir() {
    return g.get(this, 'dir');
  }
  set dir(e) {
    g.set(this, 'dir', e);
  }
  get lang() {
    return g.get(this, 'lang');
  }
  set lang(e) {
    g.set(this, 'lang', e);
  }
  get title() {
    return g.get(this, 'title');
  }
  set title(e) {
    g.set(this, 'title', e);
  }
  get onabort() {
    return d.get(this, 'onabort');
  }
  set onabort(e) {
    d.set(this, 'onabort', e);
  }
  get onblur() {
    return d.get(this, 'onblur');
  }
  set onblur(e) {
    d.set(this, 'onblur', e);
  }
  get oncancel() {
    return d.get(this, 'oncancel');
  }
  set oncancel(e) {
    d.set(this, 'oncancel', e);
  }
  get oncanplay() {
    return d.get(this, 'oncanplay');
  }
  set oncanplay(e) {
    d.set(this, 'oncanplay', e);
  }
  get oncanplaythrough() {
    return d.get(this, 'oncanplaythrough');
  }
  set oncanplaythrough(e) {
    d.set(this, 'oncanplaythrough', e);
  }
  get onchange() {
    return d.get(this, 'onchange');
  }
  set onchange(e) {
    d.set(this, 'onchange', e);
  }
  get onclick() {
    return d.get(this, 'onclick');
  }
  set onclick(e) {
    d.set(this, 'onclick', e);
  }
  get onclose() {
    return d.get(this, 'onclose');
  }
  set onclose(e) {
    d.set(this, 'onclose', e);
  }
  get oncontextmenu() {
    return d.get(this, 'oncontextmenu');
  }
  set oncontextmenu(e) {
    d.set(this, 'oncontextmenu', e);
  }
  get oncuechange() {
    return d.get(this, 'oncuechange');
  }
  set oncuechange(e) {
    d.set(this, 'oncuechange', e);
  }
  get ondblclick() {
    return d.get(this, 'ondblclick');
  }
  set ondblclick(e) {
    d.set(this, 'ondblclick', e);
  }
  get ondrag() {
    return d.get(this, 'ondrag');
  }
  set ondrag(e) {
    d.set(this, 'ondrag', e);
  }
  get ondragend() {
    return d.get(this, 'ondragend');
  }
  set ondragend(e) {
    d.set(this, 'ondragend', e);
  }
  get ondragenter() {
    return d.get(this, 'ondragenter');
  }
  set ondragenter(e) {
    d.set(this, 'ondragenter', e);
  }
  get ondragleave() {
    return d.get(this, 'ondragleave');
  }
  set ondragleave(e) {
    d.set(this, 'ondragleave', e);
  }
  get ondragover() {
    return d.get(this, 'ondragover');
  }
  set ondragover(e) {
    d.set(this, 'ondragover', e);
  }
  get ondragstart() {
    return d.get(this, 'ondragstart');
  }
  set ondragstart(e) {
    d.set(this, 'ondragstart', e);
  }
  get ondrop() {
    return d.get(this, 'ondrop');
  }
  set ondrop(e) {
    d.set(this, 'ondrop', e);
  }
  get ondurationchange() {
    return d.get(this, 'ondurationchange');
  }
  set ondurationchange(e) {
    d.set(this, 'ondurationchange', e);
  }
  get onemptied() {
    return d.get(this, 'onemptied');
  }
  set onemptied(e) {
    d.set(this, 'onemptied', e);
  }
  get onended() {
    return d.get(this, 'onended');
  }
  set onended(e) {
    d.set(this, 'onended', e);
  }
  get onerror() {
    return d.get(this, 'onerror');
  }
  set onerror(e) {
    d.set(this, 'onerror', e);
  }
  get onfocus() {
    return d.get(this, 'onfocus');
  }
  set onfocus(e) {
    d.set(this, 'onfocus', e);
  }
  get oninput() {
    return d.get(this, 'oninput');
  }
  set oninput(e) {
    d.set(this, 'oninput', e);
  }
  get oninvalid() {
    return d.get(this, 'oninvalid');
  }
  set oninvalid(e) {
    d.set(this, 'oninvalid', e);
  }
  get onkeydown() {
    return d.get(this, 'onkeydown');
  }
  set onkeydown(e) {
    d.set(this, 'onkeydown', e);
  }
  get onkeypress() {
    return d.get(this, 'onkeypress');
  }
  set onkeypress(e) {
    d.set(this, 'onkeypress', e);
  }
  get onkeyup() {
    return d.get(this, 'onkeyup');
  }
  set onkeyup(e) {
    d.set(this, 'onkeyup', e);
  }
  get onload() {
    return d.get(this, 'onload');
  }
  set onload(e) {
    d.set(this, 'onload', e);
  }
  get onloadeddata() {
    return d.get(this, 'onloadeddata');
  }
  set onloadeddata(e) {
    d.set(this, 'onloadeddata', e);
  }
  get onloadedmetadata() {
    return d.get(this, 'onloadedmetadata');
  }
  set onloadedmetadata(e) {
    d.set(this, 'onloadedmetadata', e);
  }
  get onloadstart() {
    return d.get(this, 'onloadstart');
  }
  set onloadstart(e) {
    d.set(this, 'onloadstart', e);
  }
  get onmousedown() {
    return d.get(this, 'onmousedown');
  }
  set onmousedown(e) {
    d.set(this, 'onmousedown', e);
  }
  get onmouseenter() {
    return d.get(this, 'onmouseenter');
  }
  set onmouseenter(e) {
    d.set(this, 'onmouseenter', e);
  }
  get onmouseleave() {
    return d.get(this, 'onmouseleave');
  }
  set onmouseleave(e) {
    d.set(this, 'onmouseleave', e);
  }
  get onmousemove() {
    return d.get(this, 'onmousemove');
  }
  set onmousemove(e) {
    d.set(this, 'onmousemove', e);
  }
  get onmouseout() {
    return d.get(this, 'onmouseout');
  }
  set onmouseout(e) {
    d.set(this, 'onmouseout', e);
  }
  get onmouseover() {
    return d.get(this, 'onmouseover');
  }
  set onmouseover(e) {
    d.set(this, 'onmouseover', e);
  }
  get onmouseup() {
    return d.get(this, 'onmouseup');
  }
  set onmouseup(e) {
    d.set(this, 'onmouseup', e);
  }
  get onmousewheel() {
    return d.get(this, 'onmousewheel');
  }
  set onmousewheel(e) {
    d.set(this, 'onmousewheel', e);
  }
  get onpause() {
    return d.get(this, 'onpause');
  }
  set onpause(e) {
    d.set(this, 'onpause', e);
  }
  get onplay() {
    return d.get(this, 'onplay');
  }
  set onplay(e) {
    d.set(this, 'onplay', e);
  }
  get onplaying() {
    return d.get(this, 'onplaying');
  }
  set onplaying(e) {
    d.set(this, 'onplaying', e);
  }
  get onprogress() {
    return d.get(this, 'onprogress');
  }
  set onprogress(e) {
    d.set(this, 'onprogress', e);
  }
  get onratechange() {
    return d.get(this, 'onratechange');
  }
  set onratechange(e) {
    d.set(this, 'onratechange', e);
  }
  get onreset() {
    return d.get(this, 'onreset');
  }
  set onreset(e) {
    d.set(this, 'onreset', e);
  }
  get onresize() {
    return d.get(this, 'onresize');
  }
  set onresize(e) {
    d.set(this, 'onresize', e);
  }
  get onscroll() {
    return d.get(this, 'onscroll');
  }
  set onscroll(e) {
    d.set(this, 'onscroll', e);
  }
  get onseeked() {
    return d.get(this, 'onseeked');
  }
  set onseeked(e) {
    d.set(this, 'onseeked', e);
  }
  get onseeking() {
    return d.get(this, 'onseeking');
  }
  set onseeking(e) {
    d.set(this, 'onseeking', e);
  }
  get onselect() {
    return d.get(this, 'onselect');
  }
  set onselect(e) {
    d.set(this, 'onselect', e);
  }
  get onshow() {
    return d.get(this, 'onshow');
  }
  set onshow(e) {
    d.set(this, 'onshow', e);
  }
  get onstalled() {
    return d.get(this, 'onstalled');
  }
  set onstalled(e) {
    d.set(this, 'onstalled', e);
  }
  get onsubmit() {
    return d.get(this, 'onsubmit');
  }
  set onsubmit(e) {
    d.set(this, 'onsubmit', e);
  }
  get onsuspend() {
    return d.get(this, 'onsuspend');
  }
  set onsuspend(e) {
    d.set(this, 'onsuspend', e);
  }
  get ontimeupdate() {
    return d.get(this, 'ontimeupdate');
  }
  set ontimeupdate(e) {
    d.set(this, 'ontimeupdate', e);
  }
  get ontoggle() {
    return d.get(this, 'ontoggle');
  }
  set ontoggle(e) {
    d.set(this, 'ontoggle', e);
  }
  get onvolumechange() {
    return d.get(this, 'onvolumechange');
  }
  set onvolumechange(e) {
    d.set(this, 'onvolumechange', e);
  }
  get onwaiting() {
    return d.get(this, 'onwaiting');
  }
  set onwaiting(e) {
    d.set(this, 'onwaiting', e);
  }
  get onauxclick() {
    return d.get(this, 'onauxclick');
  }
  set onauxclick(e) {
    d.set(this, 'onauxclick', e);
  }
  get ongotpointercapture() {
    return d.get(this, 'ongotpointercapture');
  }
  set ongotpointercapture(e) {
    d.set(this, 'ongotpointercapture', e);
  }
  get onlostpointercapture() {
    return d.get(this, 'onlostpointercapture');
  }
  set onlostpointercapture(e) {
    d.set(this, 'onlostpointercapture', e);
  }
  get onpointercancel() {
    return d.get(this, 'onpointercancel');
  }
  set onpointercancel(e) {
    d.set(this, 'onpointercancel', e);
  }
  get onpointerdown() {
    return d.get(this, 'onpointerdown');
  }
  set onpointerdown(e) {
    d.set(this, 'onpointerdown', e);
  }
  get onpointerenter() {
    return d.get(this, 'onpointerenter');
  }
  set onpointerenter(e) {
    d.set(this, 'onpointerenter', e);
  }
  get onpointerleave() {
    return d.get(this, 'onpointerleave');
  }
  set onpointerleave(e) {
    d.set(this, 'onpointerleave', e);
  }
  get onpointermove() {
    return d.get(this, 'onpointermove');
  }
  set onpointermove(e) {
    d.set(this, 'onpointermove', e);
  }
  get onpointerout() {
    return d.get(this, 'onpointerout');
  }
  set onpointerout(e) {
    d.set(this, 'onpointerout', e);
  }
  get onpointerover() {
    return d.get(this, 'onpointerover');
  }
  set onpointerover(e) {
    d.set(this, 'onpointerover', e);
  }
  get onpointerup() {
    return d.get(this, 'onpointerup');
  }
  set onpointerup(e) {
    d.set(this, 'onpointerup', e);
  }
}
const Ko = 'template';
class Wo extends x {
  constructor(e) {
    super(e, Ko);
    const u = this.ownerDocument.createDocumentFragment();
    (this[$u] = u)[ye] = this;
  }
  get content() {
    if (this.hasChildNodes() && !this[$u].hasChildNodes())
      for (const e of this.childNodes) this[$u].appendChild(e.cloneNode(!0));
    return this[$u];
  }
}
oe(Ko, Wo);
class Ff extends x {
  constructor(e, u = 'html') {
    super(e, u);
  }
}
const { toString: Vf } = x.prototype;
class Es extends x {
  get innerHTML() {
    return this.textContent;
  }
  set innerHTML(e) {
    this.textContent = e;
  }
  toString() {
    return Vf.call(this.cloneNode()).replace(
      '><',
      () => `>${this.textContent}<`
    );
  }
}
const Xo = 'script';
class Jo extends Es {
  constructor(e, u = Xo) {
    super(e, u);
  }
  get type() {
    return g.get(this, 'type');
  }
  set type(e) {
    g.set(this, 'type', e);
  }
  get src() {
    return g.get(this, 'src');
  }
  set src(e) {
    g.set(this, 'src', e);
  }
  get defer() {
    return B.get(this, 'defer');
  }
  set defer(e) {
    B.set(this, 'defer', e);
  }
  get crossOrigin() {
    return g.get(this, 'crossorigin');
  }
  set crossOrigin(e) {
    g.set(this, 'crossorigin', e);
  }
  get nomodule() {
    return B.get(this, 'nomodule');
  }
  set nomodule(e) {
    B.set(this, 'nomodule', e);
  }
  get referrerPolicy() {
    return g.get(this, 'referrerpolicy');
  }
  set referrerPolicy(e) {
    g.set(this, 'referrerpolicy', e);
  }
  get nonce() {
    return g.get(this, 'nonce');
  }
  set nonce(e) {
    g.set(this, 'nonce', e);
  }
  get async() {
    return B.get(this, 'async');
  }
  set async(e) {
    B.set(this, 'async', e);
  }
  get text() {
    return this.textContent;
  }
  set text(e) {
    this.textContent = e;
  }
}
oe(Xo, Jo);
class Uf extends x {
  constructor(e, u = 'frame') {
    super(e, u);
  }
}
const Zo = 'iframe';
class Yo extends x {
  constructor(e, u = Zo) {
    super(e, u);
  }
  get src() {
    return g.get(this, 'src');
  }
  set src(e) {
    g.set(this, 'src', e);
  }
  get srcdoc() {
    return g.get(this, 'srcdoc');
  }
  set srcdoc(e) {
    g.set(this, 'srcdoc', e);
  }
  get name() {
    return g.get(this, 'name');
  }
  set name(e) {
    g.set(this, 'name', e);
  }
  get allow() {
    return g.get(this, 'allow');
  }
  set allow(e) {
    g.set(this, 'allow', e);
  }
  get allowFullscreen() {
    return B.get(this, 'allowfullscreen');
  }
  set allowFullscreen(e) {
    B.set(this, 'allowfullscreen', e);
  }
  get referrerPolicy() {
    return g.get(this, 'referrerpolicy');
  }
  set referrerPolicy(e) {
    g.set(this, 'referrerpolicy', e);
  }
  get loading() {
    return g.get(this, 'loading');
  }
  set loading(e) {
    g.set(this, 'loading', e);
  }
}
oe(Zo, Yo);
class $f extends x {
  constructor(e, u = 'object') {
    super(e, u);
  }
}
class Hf extends x {
  constructor(e, u = 'head') {
    super(e, u);
  }
}
class Gf extends x {
  constructor(e, u = 'body') {
    super(e, u);
  }
}
var J = {},
  Ws = {},
  Xs = {},
  Js = {},
  Zs = {},
  Ei;
function Qo() {
  if (Ei) return Zs;
  Ei = 1;
  var t = {};
  return (
    (t.StyleSheet = function () {
      this.parentStyleSheet = null;
    }),
    (Zs.StyleSheet = t.StyleSheet),
    Zs
  );
}
var Ys = {},
  Qs = {},
  wi;
function Fe() {
  if (wi) return Qs;
  wi = 1;
  var t = {};
  return (
    (t.CSSRule = function () {
      (this.parentRule = null), (this.parentStyleSheet = null);
    }),
    (t.CSSRule.UNKNOWN_RULE = 0),
    (t.CSSRule.STYLE_RULE = 1),
    (t.CSSRule.CHARSET_RULE = 2),
    (t.CSSRule.IMPORT_RULE = 3),
    (t.CSSRule.MEDIA_RULE = 4),
    (t.CSSRule.FONT_FACE_RULE = 5),
    (t.CSSRule.PAGE_RULE = 6),
    (t.CSSRule.KEYFRAMES_RULE = 7),
    (t.CSSRule.KEYFRAME_RULE = 8),
    (t.CSSRule.MARGIN_RULE = 9),
    (t.CSSRule.NAMESPACE_RULE = 10),
    (t.CSSRule.COUNTER_STYLE_RULE = 11),
    (t.CSSRule.SUPPORTS_RULE = 12),
    (t.CSSRule.DOCUMENT_RULE = 13),
    (t.CSSRule.FONT_FEATURE_VALUES_RULE = 14),
    (t.CSSRule.VIEWPORT_RULE = 15),
    (t.CSSRule.REGION_STYLE_RULE = 16),
    (t.CSSRule.prototype = { constructor: t.CSSRule }),
    (Qs.CSSRule = t.CSSRule),
    Qs
  );
}
var Ai;
function ws() {
  if (Ai) return Ys;
  Ai = 1;
  var t = {
    CSSStyleDeclaration: fu().CSSStyleDeclaration,
    CSSRule: Fe().CSSRule,
  };
  return (
    (t.CSSStyleRule = function () {
      t.CSSRule.call(this),
        (this.selectorText = ''),
        (this.style = new t.CSSStyleDeclaration()),
        (this.style.parentRule = this);
    }),
    (t.CSSStyleRule.prototype = new t.CSSRule()),
    (t.CSSStyleRule.prototype.constructor = t.CSSStyleRule),
    (t.CSSStyleRule.prototype.type = 1),
    Object.defineProperty(t.CSSStyleRule.prototype, 'cssText', {
      get: function () {
        var e;
        return (
          this.selectorText
            ? (e = this.selectorText + ' {' + this.style.cssText + '}')
            : (e = ''),
          e
        );
      },
      set: function (e) {
        var u = t.CSSStyleRule.parse(e);
        (this.style = u.style), (this.selectorText = u.selectorText);
      },
    }),
    (t.CSSStyleRule.parse = function (e) {
      for (
        var u = 0,
          s = 'selector',
          n,
          r = u,
          i = '',
          a = { selector: !0, value: !0 },
          o = new t.CSSStyleRule(),
          c,
          l = '',
          f;
        (f = e.charAt(u));
        u++
      )
        switch (f) {
          case ' ':
          case '	':
          case '\r':
          case `
`:
          case '\f':
            if (a[s])
              switch (e.charAt(u - 1)) {
                case ' ':
                case '	':
                case '\r':
                case `
`:
                case '\f':
                  break;
                default:
                  i += ' ';
                  break;
              }
            break;
          case '"':
            if (((r = u + 1), (n = e.indexOf('"', r) + 1), !n))
              throw '" is missing';
            (i += e.slice(u, n)), (u = n - 1);
            break;
          case "'":
            if (((r = u + 1), (n = e.indexOf("'", r) + 1), !n))
              throw "' is missing";
            (i += e.slice(u, n)), (u = n - 1);
            break;
          case '/':
            if (e.charAt(u + 1) === '*') {
              if (((u += 2), (n = e.indexOf('*/', u)), n === -1))
                throw new SyntaxError('Missing */');
              u = n + 1;
            } else i += f;
            break;
          case '{':
            s === 'selector' &&
              ((o.selectorText = i.trim()), (i = ''), (s = 'name'));
            break;
          case ':':
            s === 'name' ? ((c = i.trim()), (i = ''), (s = 'value')) : (i += f);
            break;
          case '!':
            s === 'value' && e.indexOf('!important', u) === u
              ? ((l = 'important'), (u += 9))
              : (i += f);
            break;
          case ';':
            s === 'value'
              ? (o.style.setProperty(c, i.trim(), l),
                (l = ''),
                (i = ''),
                (s = 'name'))
              : (i += f);
            break;
          case '}':
            if (s === 'value')
              o.style.setProperty(c, i.trim(), l), (l = ''), (i = '');
            else {
              if (s === 'name') break;
              i += f;
            }
            s = 'selector';
            break;
          default:
            i += f;
            break;
        }
      return o;
    }),
    (Ys.CSSStyleRule = t.CSSStyleRule),
    Ys
  );
}
var _i;
function As() {
  if (_i) return Js;
  _i = 1;
  var t = { StyleSheet: Qo().StyleSheet, CSSStyleRule: ws().CSSStyleRule };
  return (
    (t.CSSStyleSheet = function () {
      t.StyleSheet.call(this), (this.cssRules = []);
    }),
    (t.CSSStyleSheet.prototype = new t.StyleSheet()),
    (t.CSSStyleSheet.prototype.constructor = t.CSSStyleSheet),
    (t.CSSStyleSheet.prototype.insertRule = function (e, u) {
      if (u < 0 || u > this.cssRules.length)
        throw new RangeError('INDEX_SIZE_ERR');
      var s = t.parse(e).cssRules[0];
      return (s.parentStyleSheet = this), this.cssRules.splice(u, 0, s), u;
    }),
    (t.CSSStyleSheet.prototype.deleteRule = function (e) {
      if (e < 0 || e >= this.cssRules.length)
        throw new RangeError('INDEX_SIZE_ERR');
      this.cssRules.splice(e, 1);
    }),
    (t.CSSStyleSheet.prototype.toString = function () {
      for (var e = '', u = this.cssRules, s = 0; s < u.length; s++)
        e +=
          u[s].cssText +
          `
`;
      return e;
    }),
    (Js.CSSStyleSheet = t.CSSStyleSheet),
    (t.parse = Nr().parse),
    Js
  );
}
var en = {},
  tn = {},
  Ni;
function vr() {
  if (Ni) return tn;
  Ni = 1;
  var t = {};
  return (
    (t.MediaList = function () {
      this.length = 0;
    }),
    (t.MediaList.prototype = {
      constructor: t.MediaList,
      get mediaText() {
        return Array.prototype.join.call(this, ', ');
      },
      set mediaText(e) {
        for (
          var u = e.split(','), s = (this.length = u.length), n = 0;
          n < s;
          n++
        )
          this[n] = u[n].trim();
      },
      appendMedium: function (e) {
        Array.prototype.indexOf.call(this, e) === -1 &&
          ((this[this.length] = e), this.length++);
      },
      deleteMedium: function (e) {
        var u = Array.prototype.indexOf.call(this, e);
        u !== -1 && Array.prototype.splice.call(this, u, 1);
      },
    }),
    (tn.MediaList = t.MediaList),
    tn
  );
}
var Ri;
function e0() {
  if (Ri) return en;
  Ri = 1;
  var t = {
    CSSRule: Fe().CSSRule,
    CSSStyleSheet: As().CSSStyleSheet,
    MediaList: vr().MediaList,
  };
  return (
    (t.CSSImportRule = function () {
      t.CSSRule.call(this),
        (this.href = ''),
        (this.media = new t.MediaList()),
        (this.styleSheet = new t.CSSStyleSheet());
    }),
    (t.CSSImportRule.prototype = new t.CSSRule()),
    (t.CSSImportRule.prototype.constructor = t.CSSImportRule),
    (t.CSSImportRule.prototype.type = 3),
    Object.defineProperty(t.CSSImportRule.prototype, 'cssText', {
      get: function () {
        var e = this.media.mediaText;
        return '@import url(' + this.href + ')' + (e ? ' ' + e : '') + ';';
      },
      set: function (e) {
        for (var u = 0, s = '', n = '', r, i; (i = e.charAt(u)); u++)
          switch (i) {
            case ' ':
            case '	':
            case '\r':
            case `
`:
            case '\f':
              s === 'after-import' ? (s = 'url') : (n += i);
              break;
            case '@':
              !s &&
                e.indexOf('@import', u) === u &&
                ((s = 'after-import'), (u += 6), (n = ''));
              break;
            case 'u':
              if (s === 'url' && e.indexOf('url(', u) === u) {
                if (((r = e.indexOf(')', u + 1)), r === -1))
                  throw u + ': ")" not found';
                u += 4;
                var a = e.slice(u, r);
                a[0] === a[a.length - 1] &&
                  (a[0] === '"' || a[0] === "'") &&
                  (a = a.slice(1, -1)),
                  (this.href = a),
                  (u = r),
                  (s = 'media');
              }
              break;
            case '"':
              if (s === 'url') {
                if (((r = e.indexOf('"', u + 1)), !r))
                  throw u + `: '"' not found`;
                (this.href = e.slice(u + 1, r)), (u = r), (s = 'media');
              }
              break;
            case "'":
              if (s === 'url') {
                if (((r = e.indexOf("'", u + 1)), !r))
                  throw u + `: "'" not found`;
                (this.href = e.slice(u + 1, r)), (u = r), (s = 'media');
              }
              break;
            case ';':
              s === 'media' && n && (this.media.mediaText = n.trim());
              break;
            default:
              s === 'media' && (n += i);
              break;
          }
      },
    }),
    (en.CSSImportRule = t.CSSImportRule),
    en
  );
}
var un = {},
  Di;
function du() {
  if (Di) return un;
  Di = 1;
  var t = { CSSRule: Fe().CSSRule };
  return (
    (t.CSSGroupingRule = function () {
      t.CSSRule.call(this), (this.cssRules = []);
    }),
    (t.CSSGroupingRule.prototype = new t.CSSRule()),
    (t.CSSGroupingRule.prototype.constructor = t.CSSGroupingRule),
    (t.CSSGroupingRule.prototype.insertRule = function (u, s) {
      if (s < 0 || s > this.cssRules.length)
        throw new RangeError('INDEX_SIZE_ERR');
      var n = t.parse(u).cssRules[0];
      return (n.parentRule = this), this.cssRules.splice(s, 0, n), s;
    }),
    (t.CSSGroupingRule.prototype.deleteRule = function (u) {
      if (u < 0 || u >= this.cssRules.length)
        throw new RangeError('INDEX_SIZE_ERR');
      this.cssRules.splice(u, 1)[0].parentRule = null;
    }),
    (un.CSSGroupingRule = t.CSSGroupingRule),
    un
  );
}
var sn = {},
  nn = {},
  Li;
function Ou() {
  if (Li) return nn;
  Li = 1;
  var t = { CSSRule: Fe().CSSRule, CSSGroupingRule: du().CSSGroupingRule };
  return (
    (t.CSSConditionRule = function () {
      t.CSSGroupingRule.call(this), (this.cssRules = []);
    }),
    (t.CSSConditionRule.prototype = new t.CSSGroupingRule()),
    (t.CSSConditionRule.prototype.constructor = t.CSSConditionRule),
    (t.CSSConditionRule.prototype.conditionText = ''),
    (t.CSSConditionRule.prototype.cssText = ''),
    (nn.CSSConditionRule = t.CSSConditionRule),
    nn
  );
}
var Ii;
function Er() {
  if (Ii) return sn;
  Ii = 1;
  var t = {
    CSSRule: Fe().CSSRule,
    CSSGroupingRule: du().CSSGroupingRule,
    CSSConditionRule: Ou().CSSConditionRule,
    MediaList: vr().MediaList,
  };
  return (
    (t.CSSMediaRule = function () {
      t.CSSConditionRule.call(this), (this.media = new t.MediaList());
    }),
    (t.CSSMediaRule.prototype = new t.CSSConditionRule()),
    (t.CSSMediaRule.prototype.constructor = t.CSSMediaRule),
    (t.CSSMediaRule.prototype.type = 4),
    Object.defineProperties(t.CSSMediaRule.prototype, {
      conditionText: {
        get: function () {
          return this.media.mediaText;
        },
        set: function (e) {
          this.media.mediaText = e;
        },
        configurable: !0,
        enumerable: !0,
      },
      cssText: {
        get: function () {
          for (var e = [], u = 0, s = this.cssRules.length; u < s; u++)
            e.push(this.cssRules[u].cssText);
          return '@media ' + this.media.mediaText + ' {' + e.join('') + '}';
        },
        configurable: !0,
        enumerable: !0,
      },
    }),
    (sn.CSSMediaRule = t.CSSMediaRule),
    sn
  );
}
var rn = {},
  Mi;
function wr() {
  if (Mi) return rn;
  Mi = 1;
  var t = {
    CSSRule: Fe().CSSRule,
    CSSGroupingRule: du().CSSGroupingRule,
    CSSConditionRule: Ou().CSSConditionRule,
  };
  return (
    (t.CSSSupportsRule = function () {
      t.CSSConditionRule.call(this);
    }),
    (t.CSSSupportsRule.prototype = new t.CSSConditionRule()),
    (t.CSSSupportsRule.prototype.constructor = t.CSSSupportsRule),
    (t.CSSSupportsRule.prototype.type = 12),
    Object.defineProperty(t.CSSSupportsRule.prototype, 'cssText', {
      get: function () {
        for (var e = [], u = 0, s = this.cssRules.length; u < s; u++)
          e.push(this.cssRules[u].cssText);
        return '@supports ' + this.conditionText + ' {' + e.join('') + '}';
      },
    }),
    (rn.CSSSupportsRule = t.CSSSupportsRule),
    rn
  );
}
var an = {},
  Oi;
function t0() {
  if (Oi) return an;
  Oi = 1;
  var t = {
    CSSStyleDeclaration: fu().CSSStyleDeclaration,
    CSSRule: Fe().CSSRule,
  };
  return (
    (t.CSSFontFaceRule = function () {
      t.CSSRule.call(this),
        (this.style = new t.CSSStyleDeclaration()),
        (this.style.parentRule = this);
    }),
    (t.CSSFontFaceRule.prototype = new t.CSSRule()),
    (t.CSSFontFaceRule.prototype.constructor = t.CSSFontFaceRule),
    (t.CSSFontFaceRule.prototype.type = 5),
    Object.defineProperty(t.CSSFontFaceRule.prototype, 'cssText', {
      get: function () {
        return '@font-face {' + this.style.cssText + '}';
      },
    }),
    (an.CSSFontFaceRule = t.CSSFontFaceRule),
    an
  );
}
var on = {},
  ki;
function u0() {
  if (ki) return on;
  ki = 1;
  var t = { CSSRule: Fe().CSSRule };
  return (
    (t.CSSHostRule = function () {
      t.CSSRule.call(this), (this.cssRules = []);
    }),
    (t.CSSHostRule.prototype = new t.CSSRule()),
    (t.CSSHostRule.prototype.constructor = t.CSSHostRule),
    (t.CSSHostRule.prototype.type = 1001),
    Object.defineProperty(t.CSSHostRule.prototype, 'cssText', {
      get: function () {
        for (var e = [], u = 0, s = this.cssRules.length; u < s; u++)
          e.push(this.cssRules[u].cssText);
        return '@host {' + e.join('') + '}';
      },
    }),
    (on.CSSHostRule = t.CSSHostRule),
    on
  );
}
var cn = {},
  Pi;
function Ar() {
  if (Pi) return cn;
  Pi = 1;
  var t = {
    CSSRule: Fe().CSSRule,
    CSSStyleDeclaration: fu().CSSStyleDeclaration,
  };
  return (
    (t.CSSKeyframeRule = function () {
      t.CSSRule.call(this),
        (this.keyText = ''),
        (this.style = new t.CSSStyleDeclaration()),
        (this.style.parentRule = this);
    }),
    (t.CSSKeyframeRule.prototype = new t.CSSRule()),
    (t.CSSKeyframeRule.prototype.constructor = t.CSSKeyframeRule),
    (t.CSSKeyframeRule.prototype.type = 8),
    Object.defineProperty(t.CSSKeyframeRule.prototype, 'cssText', {
      get: function () {
        return this.keyText + ' {' + this.style.cssText + '} ';
      },
    }),
    (cn.CSSKeyframeRule = t.CSSKeyframeRule),
    cn
  );
}
var ln = {},
  qi;
function _r() {
  if (qi) return ln;
  qi = 1;
  var t = { CSSRule: Fe().CSSRule };
  return (
    (t.CSSKeyframesRule = function () {
      t.CSSRule.call(this), (this.name = ''), (this.cssRules = []);
    }),
    (t.CSSKeyframesRule.prototype = new t.CSSRule()),
    (t.CSSKeyframesRule.prototype.constructor = t.CSSKeyframesRule),
    (t.CSSKeyframesRule.prototype.type = 7),
    Object.defineProperty(t.CSSKeyframesRule.prototype, 'cssText', {
      get: function () {
        for (var e = [], u = 0, s = this.cssRules.length; u < s; u++)
          e.push('  ' + this.cssRules[u].cssText);
        return (
          '@' +
          (this._vendorPrefix || '') +
          'keyframes ' +
          this.name +
          ` {
` +
          e.join(`
`) +
          `
}`
        );
      },
    }),
    (ln.CSSKeyframesRule = t.CSSKeyframesRule),
    ln
  );
}
var dn = {},
  fn = {},
  Bi;
function s0() {
  if (Bi) return fn;
  Bi = 1;
  var t = {};
  return (
    (t.CSSValue = function () {}),
    (t.CSSValue.prototype = {
      constructor: t.CSSValue,
      set cssText(e) {
        var u = this._getConstructorName();
        throw new Error(
          'DOMException: property "cssText" of "' +
            u +
            '" is readonly and can not be replaced with "' +
            e +
            '"!'
        );
      },
      get cssText() {
        var e = this._getConstructorName();
        throw new Error('getter "cssText" of "' + e + '" is not implemented!');
      },
      _getConstructorName: function () {
        var e = this.constructor.toString(),
          u = e.match(/function\s([^\(]+)/),
          s = u[1];
        return s;
      },
    }),
    (fn.CSSValue = t.CSSValue),
    fn
  );
}
var Fi;
function n0() {
  if (Fi) return dn;
  Fi = 1;
  var t = { CSSValue: s0().CSSValue };
  return (
    (t.CSSValueExpression = function (u, s) {
      (this._token = u), (this._idx = s);
    }),
    (t.CSSValueExpression.prototype = new t.CSSValue()),
    (t.CSSValueExpression.prototype.constructor = t.CSSValueExpression),
    (t.CSSValueExpression.prototype.parse = function () {
      for (
        var e = this._token, u = this._idx, s = '', n = '', r = '', i, a = [];
        ;
        ++u
      ) {
        if (((s = e.charAt(u)), s === '')) {
          r = 'css expression error: unfinished expression!';
          break;
        }
        switch (s) {
          case '(':
            a.push(s), (n += s);
            break;
          case ')':
            a.pop(s), (n += s);
            break;
          case '/':
            (i = this._parseJSComment(e, u))
              ? i.error
                ? (r =
                    'css expression error: unfinished comment in expression!')
                : (u = i.idx)
              : (i = this._parseJSRexExp(e, u))
              ? ((u = i.idx), (n += i.text))
              : (n += s);
            break;
          case "'":
          case '"':
            (i = this._parseJSString(e, u, s)),
              i ? ((u = i.idx), (n += i.text)) : (n += s);
            break;
          default:
            n += s;
            break;
        }
        if (r || a.length === 0) break;
      }
      var o;
      return r ? (o = { error: r }) : (o = { idx: u, expression: n }), o;
    }),
    (t.CSSValueExpression.prototype._parseJSComment = function (e, u) {
      var s = e.charAt(u + 1),
        n;
      if (s === '/' || s === '*') {
        var r = u,
          i,
          a;
        if (
          (s === '/'
            ? (a = `
`)
            : s === '*' && (a = '*/'),
          (i = e.indexOf(a, r + 1 + 1)),
          i !== -1)
        )
          return (
            (i = i + a.length - 1),
            (n = e.substring(u, i + 1)),
            { idx: i, text: n }
          );
        var o = 'css expression error: unfinished comment in expression!';
        return { error: o };
      } else return !1;
    }),
    (t.CSSValueExpression.prototype._parseJSString = function (e, u, s) {
      var n = this._findMatchedIdx(e, u, s),
        r;
      return n === -1
        ? !1
        : ((r = e.substring(u, n + s.length)), { idx: n, text: r });
    }),
    (t.CSSValueExpression.prototype._parseJSRexExp = function (e, u) {
      var s = e.substring(0, u).replace(/\s+$/, ''),
        n = [
          /^$/,
          /\($/,
          /\[$/,
          /\!$/,
          /\+$/,
          /\-$/,
          /\*$/,
          /\/\s+/,
          /\%$/,
          /\=$/,
          /\>$/,
          /<$/,
          /\&$/,
          /\|$/,
          /\^$/,
          /\~$/,
          /\?$/,
          /\,$/,
          /delete$/,
          /in$/,
          /instanceof$/,
          /new$/,
          /typeof$/,
          /void$/,
        ],
        r = n.some(function (a) {
          return a.test(s);
        });
      if (r) {
        var i = '/';
        return this._parseJSString(e, u, i);
      } else return !1;
    }),
    (t.CSSValueExpression.prototype._findMatchedIdx = function (e, u, s) {
      for (var n = u, r, i = -1; ; )
        if (((r = e.indexOf(s, n + 1)), r === -1)) {
          r = i;
          break;
        } else {
          var a = e.substring(u + 1, r),
            o = a.match(/\\+$/);
          if (!o || o[0] % 2 === 0) break;
          n = r;
        }
      var c = e.indexOf(
        `
`,
        u + 1
      );
      return c < r && (r = i), r;
    }),
    (dn.CSSValueExpression = t.CSSValueExpression),
    dn
  );
}
var hn = {},
  bn = {},
  Vi;
function r0() {
  if (Vi) return bn;
  Vi = 1;
  var t = {};
  return (
    (t.MatcherList = function () {
      this.length = 0;
    }),
    (t.MatcherList.prototype = {
      constructor: t.MatcherList,
      get matcherText() {
        return Array.prototype.join.call(this, ', ');
      },
      set matcherText(e) {
        for (
          var u = e.split(','), s = (this.length = u.length), n = 0;
          n < s;
          n++
        )
          this[n] = u[n].trim();
      },
      appendMatcher: function (e) {
        Array.prototype.indexOf.call(this, e) === -1 &&
          ((this[this.length] = e), this.length++);
      },
      deleteMatcher: function (e) {
        var u = Array.prototype.indexOf.call(this, e);
        u !== -1 && Array.prototype.splice.call(this, u, 1);
      },
    }),
    (bn.MatcherList = t.MatcherList),
    bn
  );
}
var Ui;
function i0() {
  if (Ui) return hn;
  Ui = 1;
  var t = { CSSRule: Fe().CSSRule, MatcherList: r0().MatcherList };
  return (
    (t.CSSDocumentRule = function () {
      t.CSSRule.call(this),
        (this.matcher = new t.MatcherList()),
        (this.cssRules = []);
    }),
    (t.CSSDocumentRule.prototype = new t.CSSRule()),
    (t.CSSDocumentRule.prototype.constructor = t.CSSDocumentRule),
    (t.CSSDocumentRule.prototype.type = 10),
    Object.defineProperty(t.CSSDocumentRule.prototype, 'cssText', {
      get: function () {
        for (var e = [], u = 0, s = this.cssRules.length; u < s; u++)
          e.push(this.cssRules[u].cssText);
        return (
          '@-moz-document ' + this.matcher.matcherText + ' {' + e.join('') + '}'
        );
      },
    }),
    (hn.CSSDocumentRule = t.CSSDocumentRule),
    hn
  );
}
var $i;
function Nr() {
  if ($i) return Xs;
  $i = 1;
  var t = {};
  return (
    (t.parse = function (u) {
      for (
        var s = 0,
          n = 'before-selector',
          r,
          i = '',
          a = 0,
          o = {
            selector: !0,
            value: !0,
            'value-parenthesis': !0,
            atRule: !0,
            'importRule-begin': !0,
            importRule: !0,
            atBlock: !0,
            conditionBlock: !0,
            'documentRule-begin': !0,
          },
          c = new t.CSSStyleSheet(),
          l = c,
          f,
          p = [],
          h = !1,
          m,
          v,
          _ = '',
          A,
          F,
          M,
          U,
          N,
          O,
          ee,
          z,
          Ce = /@(-(?:\w+-)+)?keyframes/g,
          ce = function (te) {
            var X = u.substring(0, s).split(`
`),
              I = X.length,
              me = X.pop().length + 1,
              K = new Error(te + ' (line ' + I + ', char ' + me + ')');
            throw ((K.line = I), (K.char = me), (K.styleSheet = c), K);
          },
          q;
        (q = u.charAt(s));
        s++
      )
        switch (q) {
          case ' ':
          case '	':
          case '\r':
          case `
`:
          case '\f':
            o[n] && (i += q);
            break;
          case '"':
            r = s + 1;
            do (r = u.indexOf('"', r) + 1), r || ce('Unmatched "');
            while (u[r - 2] === '\\');
            switch (((i += u.slice(s, r)), (s = r - 1), n)) {
              case 'before-value':
                n = 'value';
                break;
              case 'importRule-begin':
                n = 'importRule';
                break;
            }
            break;
          case "'":
            r = s + 1;
            do (r = u.indexOf("'", r) + 1), r || ce("Unmatched '");
            while (u[r - 2] === '\\');
            switch (((i += u.slice(s, r)), (s = r - 1), n)) {
              case 'before-value':
                n = 'value';
                break;
              case 'importRule-begin':
                n = 'importRule';
                break;
            }
            break;
          case '/':
            u.charAt(s + 1) === '*'
              ? ((s += 2),
                (r = u.indexOf('*/', s)),
                r === -1 ? ce('Missing */') : (s = r + 1))
              : (i += q),
              n === 'importRule-begin' && ((i += ' '), (n = 'importRule'));
            break;
          case '@':
            if (u.indexOf('@-moz-document', s) === s) {
              (n = 'documentRule-begin'),
                (ee = new t.CSSDocumentRule()),
                (ee.__starts = s),
                (s += 13),
                (i = '');
              break;
            } else if (u.indexOf('@media', s) === s) {
              (n = 'atBlock'),
                (F = new t.CSSMediaRule()),
                (F.__starts = s),
                (s += 5),
                (i = '');
              break;
            } else if (u.indexOf('@supports', s) === s) {
              (n = 'conditionBlock'),
                (M = new t.CSSSupportsRule()),
                (M.__starts = s),
                (s += 8),
                (i = '');
              break;
            } else if (u.indexOf('@host', s) === s) {
              (n = 'hostRule-begin'),
                (s += 4),
                (z = new t.CSSHostRule()),
                (z.__starts = s),
                (i = '');
              break;
            } else if (u.indexOf('@import', s) === s) {
              (n = 'importRule-begin'), (s += 6), (i += '@import');
              break;
            } else if (u.indexOf('@font-face', s) === s) {
              (n = 'fontFaceRule-begin'),
                (s += 9),
                (N = new t.CSSFontFaceRule()),
                (N.__starts = s),
                (i = '');
              break;
            } else {
              Ce.lastIndex = s;
              var W = Ce.exec(u);
              if (W && W.index === s) {
                (n = 'keyframesRule-begin'),
                  (O = new t.CSSKeyframesRule()),
                  (O.__starts = s),
                  (O._vendorPrefix = W[1]),
                  (s += W[0].length - 1),
                  (i = '');
                break;
              } else n === 'selector' && (n = 'atRule');
            }
            i += q;
            break;
          case '{':
            n === 'selector' || n === 'atRule'
              ? ((A.selectorText = i.trim()),
                (A.style.__starts = s),
                (i = ''),
                (n = 'before-name'))
              : n === 'atBlock'
              ? ((F.media.mediaText = i.trim()),
                f && p.push(f),
                (l = f = F),
                (F.parentStyleSheet = c),
                (i = ''),
                (n = 'before-selector'))
              : n === 'conditionBlock'
              ? ((M.conditionText = i.trim()),
                f && p.push(f),
                (l = f = M),
                (M.parentStyleSheet = c),
                (i = ''),
                (n = 'before-selector'))
              : n === 'hostRule-begin'
              ? (f && p.push(f),
                (l = f = z),
                (z.parentStyleSheet = c),
                (i = ''),
                (n = 'before-selector'))
              : n === 'fontFaceRule-begin'
              ? (f && (N.parentRule = f),
                (N.parentStyleSheet = c),
                (A = N),
                (i = ''),
                (n = 'before-name'))
              : n === 'keyframesRule-begin'
              ? ((O.name = i.trim()),
                f && (p.push(f), (O.parentRule = f)),
                (O.parentStyleSheet = c),
                (l = f = O),
                (i = ''),
                (n = 'keyframeRule-begin'))
              : n === 'keyframeRule-begin'
              ? ((A = new t.CSSKeyframeRule()),
                (A.keyText = i.trim()),
                (A.__starts = s),
                (i = ''),
                (n = 'before-name'))
              : n === 'documentRule-begin' &&
                ((ee.matcher.matcherText = i.trim()),
                f && (p.push(f), (ee.parentRule = f)),
                (l = f = ee),
                (ee.parentStyleSheet = c),
                (i = ''),
                (n = 'before-selector'));
            break;
          case ':':
            n === 'name'
              ? ((v = i.trim()), (i = ''), (n = 'before-value'))
              : (i += q);
            break;
          case '(':
            if (n === 'value')
              if (i.trim() === 'expression') {
                var be = new t.CSSValueExpression(u, s).parse();
                be.error ? ce(be.error) : ((i += be.expression), (s = be.idx));
              } else (n = 'value-parenthesis'), (a = 1), (i += q);
            else n === 'value-parenthesis' && a++, (i += q);
            break;
          case ')':
            n === 'value-parenthesis' && (a--, a === 0 && (n = 'value')),
              (i += q);
            break;
          case '!':
            n === 'value' && u.indexOf('!important', s) === s
              ? ((_ = 'important'), (s += 9))
              : (i += q);
            break;
          case ';':
            switch (n) {
              case 'value':
                A.style.setProperty(v, i.trim(), _),
                  (_ = ''),
                  (i = ''),
                  (n = 'before-name');
                break;
              case 'atRule':
                (i = ''), (n = 'before-selector');
                break;
              case 'importRule':
                (U = new t.CSSImportRule()),
                  (U.parentStyleSheet = U.styleSheet.parentStyleSheet = c),
                  (U.cssText = i + q),
                  c.cssRules.push(U),
                  (i = ''),
                  (n = 'before-selector');
                break;
              default:
                i += q;
                break;
            }
            break;
          case '}':
            switch (n) {
              case 'value':
                A.style.setProperty(v, i.trim(), _), (_ = '');
              case 'before-name':
              case 'name':
                (A.__ends = s + 1),
                  f && (A.parentRule = f),
                  (A.parentStyleSheet = c),
                  l.cssRules.push(A),
                  (i = ''),
                  l.constructor === t.CSSKeyframesRule
                    ? (n = 'keyframeRule-begin')
                    : (n = 'before-selector');
                break;
              case 'keyframeRule-begin':
              case 'before-selector':
              case 'selector':
                for (
                  f || ce('Unexpected }'), h = p.length > 0;
                  p.length > 0;

                ) {
                  if (
                    ((f = p.pop()),
                    f.constructor.name === 'CSSMediaRule' ||
                      f.constructor.name === 'CSSSupportsRule')
                  ) {
                    (m = l), (l = f), l.cssRules.push(m);
                    break;
                  }
                  p.length === 0 && (h = !1);
                }
                h ||
                  ((l.__ends = s + 1), c.cssRules.push(l), (l = c), (f = null)),
                  (i = ''),
                  (n = 'before-selector');
                break;
            }
            break;
          default:
            switch (n) {
              case 'before-selector':
                (n = 'selector'), (A = new t.CSSStyleRule()), (A.__starts = s);
                break;
              case 'before-name':
                n = 'name';
                break;
              case 'before-value':
                n = 'value';
                break;
              case 'importRule-begin':
                n = 'importRule';
                break;
            }
            i += q;
            break;
        }
      return c;
    }),
    (Xs.parse = t.parse),
    (t.CSSStyleSheet = As().CSSStyleSheet),
    (t.CSSStyleRule = ws().CSSStyleRule),
    (t.CSSImportRule = e0().CSSImportRule),
    (t.CSSGroupingRule = du().CSSGroupingRule),
    (t.CSSMediaRule = Er().CSSMediaRule),
    (t.CSSConditionRule = Ou().CSSConditionRule),
    (t.CSSSupportsRule = wr().CSSSupportsRule),
    (t.CSSFontFaceRule = t0().CSSFontFaceRule),
    (t.CSSHostRule = u0().CSSHostRule),
    (t.CSSStyleDeclaration = fu().CSSStyleDeclaration),
    (t.CSSKeyframeRule = Ar().CSSKeyframeRule),
    (t.CSSKeyframesRule = _r().CSSKeyframesRule),
    (t.CSSValueExpression = n0().CSSValueExpression),
    (t.CSSDocumentRule = i0().CSSDocumentRule),
    Xs
  );
}
var Hi;
function fu() {
  if (Hi) return Ws;
  Hi = 1;
  var t = {};
  return (
    (t.CSSStyleDeclaration = function () {
      (this.length = 0), (this.parentRule = null), (this._importants = {});
    }),
    (t.CSSStyleDeclaration.prototype = {
      constructor: t.CSSStyleDeclaration,
      getPropertyValue: function (e) {
        return this[e] || '';
      },
      setProperty: function (e, u, s) {
        if (this[e]) {
          var n = Array.prototype.indexOf.call(this, e);
          n < 0 && ((this[this.length] = e), this.length++);
        } else (this[this.length] = e), this.length++;
        (this[e] = u + ''), (this._importants[e] = s);
      },
      removeProperty: function (e) {
        if (!(e in this)) return '';
        var u = Array.prototype.indexOf.call(this, e);
        if (u < 0) return '';
        var s = this[e];
        return (this[e] = ''), Array.prototype.splice.call(this, u, 1), s;
      },
      getPropertyCSSValue: function () {},
      getPropertyPriority: function (e) {
        return this._importants[e] || '';
      },
      getPropertyShorthand: function () {},
      isPropertyImplicit: function () {},
      get cssText() {
        for (var e = [], u = 0, s = this.length; u < s; ++u) {
          var n = this[u],
            r = this.getPropertyValue(n),
            i = this.getPropertyPriority(n);
          i && (i = ' !' + i), (e[u] = n + ': ' + r + i + ';');
        }
        return e.join(' ');
      },
      set cssText(e) {
        var u, s;
        for (u = this.length; u--; ) (s = this[u]), (this[s] = '');
        Array.prototype.splice.call(this, 0, this.length),
          (this._importants = {});
        var n = t.parse('#bogus{' + e + '}').cssRules[0].style,
          r = n.length;
        for (u = 0; u < r; ++u)
          (s = n[u]),
            this.setProperty(
              n[u],
              n.getPropertyValue(s),
              n.getPropertyPriority(s)
            );
      },
    }),
    (Ws.CSSStyleDeclaration = t.CSSStyleDeclaration),
    (t.parse = Nr().parse),
    Ws
  );
}
var pn = {},
  Gi;
function jf() {
  if (Gi) return pn;
  Gi = 1;
  var t = {
    CSSStyleSheet: As().CSSStyleSheet,
    CSSRule: Fe().CSSRule,
    CSSStyleRule: ws().CSSStyleRule,
    CSSGroupingRule: du().CSSGroupingRule,
    CSSConditionRule: Ou().CSSConditionRule,
    CSSMediaRule: Er().CSSMediaRule,
    CSSSupportsRule: wr().CSSSupportsRule,
    CSSStyleDeclaration: fu().CSSStyleDeclaration,
    CSSKeyframeRule: Ar().CSSKeyframeRule,
    CSSKeyframesRule: _r().CSSKeyframesRule,
  };
  return (
    (t.clone = function e(u) {
      var s = new t.CSSStyleSheet(),
        n = u.cssRules;
      if (!n) return s;
      for (var r = 0, i = n.length; r < i; r++) {
        var a = n[r],
          o = (s.cssRules[r] = new a.constructor()),
          c = a.style;
        if (c) {
          for (
            var l = (o.style = new t.CSSStyleDeclaration()),
              f = 0,
              p = c.length;
            f < p;
            f++
          ) {
            var h = (l[f] = c[f]);
            (l[h] = c[h]), (l._importants[h] = c.getPropertyPriority(h));
          }
          l.length = c.length;
        }
        a.hasOwnProperty('keyText') && (o.keyText = a.keyText),
          a.hasOwnProperty('selectorText') && (o.selectorText = a.selectorText),
          a.hasOwnProperty('mediaText') && (o.mediaText = a.mediaText),
          a.hasOwnProperty('conditionText') &&
            (o.conditionText = a.conditionText),
          a.hasOwnProperty('cssRules') && (o.cssRules = e(a).cssRules);
      }
      return s;
    }),
    (pn.clone = t.clone),
    pn
  );
}
var ji;
function zf() {
  return (
    ji ||
      ((ji = 1),
      (J.CSSStyleDeclaration = fu().CSSStyleDeclaration),
      (J.CSSRule = Fe().CSSRule),
      (J.CSSGroupingRule = du().CSSGroupingRule),
      (J.CSSConditionRule = Ou().CSSConditionRule),
      (J.CSSStyleRule = ws().CSSStyleRule),
      (J.MediaList = vr().MediaList),
      (J.CSSMediaRule = Er().CSSMediaRule),
      (J.CSSSupportsRule = wr().CSSSupportsRule),
      (J.CSSImportRule = e0().CSSImportRule),
      (J.CSSFontFaceRule = t0().CSSFontFaceRule),
      (J.CSSHostRule = u0().CSSHostRule),
      (J.StyleSheet = Qo().StyleSheet),
      (J.CSSStyleSheet = As().CSSStyleSheet),
      (J.CSSKeyframesRule = _r().CSSKeyframesRule),
      (J.CSSKeyframeRule = Ar().CSSKeyframeRule),
      (J.MatcherList = r0().MatcherList),
      (J.CSSDocumentRule = i0().CSSDocumentRule),
      (J.CSSValue = s0().CSSValue),
      (J.CSSValueExpression = n0().CSSValueExpression),
      (J.parse = Nr().parse),
      (J.clone = jf().clone)),
    J
  );
}
var Kf = zf();
const a0 = 'style';
class o0 extends Es {
  constructor(e, u = a0) {
    super(e, u), (this[Wt] = null);
  }
  get sheet() {
    const e = this[Wt];
    return e !== null ? e : (this[Wt] = Kf.parse(this.textContent));
  }
  get innerHTML() {
    return super.innerHTML || '';
  }
  set innerHTML(e) {
    (super.textContent = e), (this[Wt] = null);
  }
  get innerText() {
    return super.innerText || '';
  }
  set innerText(e) {
    (super.textContent = e), (this[Wt] = null);
  }
  get textContent() {
    return super.textContent || '';
  }
  set textContent(e) {
    (super.textContent = e), (this[Wt] = null);
  }
}
oe(a0, o0);
class c0 extends x {
  constructor(e, u = 'time') {
    super(e, u);
  }
  get dateTime() {
    return g.get(this, 'datetime');
  }
  set dateTime(e) {
    g.set(this, 'datetime', e);
  }
}
oe('time', c0);
class Wf extends x {
  constructor(e, u = 'fieldset') {
    super(e, u);
  }
}
class Xf extends x {
  constructor(e, u = 'embed') {
    super(e, u);
  }
}
class Jf extends x {
  constructor(e, u = 'hr') {
    super(e, u);
  }
}
class Zf extends x {
  constructor(e, u = 'progress') {
    super(e, u);
  }
}
class Yf extends x {
  constructor(e, u = 'p') {
    super(e, u);
  }
}
class Qf extends x {
  constructor(e, u = 'table') {
    super(e, u);
  }
}
class eh extends x {
  constructor(e, u = 'frameset') {
    super(e, u);
  }
}
class th extends x {
  constructor(e, u = 'li') {
    super(e, u);
  }
}
class uh extends x {
  constructor(e, u = 'base') {
    super(e, u);
  }
}
class sh extends x {
  constructor(e, u = 'datalist') {
    super(e, u);
  }
}
const l0 = 'input';
class d0 extends x {
  constructor(e, u = l0) {
    super(e, u);
  }
  get autofocus() {
    return B.get(this, 'autofocus') || -1;
  }
  set autofocus(e) {
    B.set(this, 'autofocus', e);
  }
  get disabled() {
    return B.get(this, 'disabled');
  }
  set disabled(e) {
    B.set(this, 'disabled', e);
  }
  get name() {
    return this.getAttribute('name');
  }
  set name(e) {
    this.setAttribute('name', e);
  }
  get placeholder() {
    return this.getAttribute('placeholder');
  }
  set placeholder(e) {
    this.setAttribute('placeholder', e);
  }
  get type() {
    return this.getAttribute('type');
  }
  set type(e) {
    this.setAttribute('type', e);
  }
  get value() {
    return g.get(this, 'value');
  }
  set value(e) {
    g.set(this, 'value', e);
  }
}
oe(l0, d0);
class nh extends x {
  constructor(e, u = 'param') {
    super(e, u);
  }
}
class rh extends x {
  constructor(e, u = 'media') {
    super(e, u);
  }
}
class ih extends x {
  constructor(e, u = 'audio') {
    super(e, u);
  }
}
const f0 = 'h1';
class h0 extends x {
  constructor(e, u = f0) {
    super(e, u);
  }
}
oe([f0, 'h2', 'h3', 'h4', 'h5', 'h6'], h0);
class ah extends x {
  constructor(e, u = 'dir') {
    super(e, u);
  }
}
class oh extends x {
  constructor(e, u = 'quote') {
    super(e, u);
  }
}
var Wu = { exports: {} },
  gn,
  zi;
function ch() {
  if (zi) return gn;
  zi = 1;
  class t {
    constructor(u, s) {
      (this.width = u), (this.height = s);
    }
    getContext() {
      return null;
    }
    toDataURL() {
      return '';
    }
  }
  return (gn = { createCanvas: (e, u) => new t(e, u) }), gn;
}
var Ki;
function lh() {
  if (Ki) return Wu.exports;
  Ki = 1;
  try {
    Wu.exports = require('canvas');
  } catch {
    Wu.exports = ch();
  }
  return Wu.exports;
}
var dh = lh();
const fh = io(dh),
  { createCanvas: hh } = fh,
  b0 = 'canvas';
class p0 extends x {
  constructor(e, u = b0) {
    super(e, u), (this[Ze] = hh(300, 150));
  }
  get width() {
    return this[Ze].width;
  }
  set width(e) {
    wt.set(this, 'width', e), (this[Ze].width = e);
  }
  get height() {
    return this[Ze].height;
  }
  set height(e) {
    wt.set(this, 'height', e), (this[Ze].height = e);
  }
  getContext(e) {
    return this[Ze].getContext(e);
  }
  toDataURL(...e) {
    return this[Ze].toDataURL(...e);
  }
}
oe(b0, p0);
class bh extends x {
  constructor(e, u = 'legend') {
    super(e, u);
  }
}
const g0 = 'option';
class m0 extends x {
  constructor(e, u = g0) {
    super(e, u);
  }
  get value() {
    return g.get(this, 'value');
  }
  set value(e) {
    g.set(this, 'value', e);
  }
  get selected() {
    return B.get(this, 'selected');
  }
  set selected(e) {
    const u = this.parentElement?.querySelector('option[selected]');
    u && u !== this && (u.selected = !1), B.set(this, 'selected', e);
  }
}
oe(g0, m0);
class ph extends x {
  constructor(e, u = 'span') {
    super(e, u);
  }
}
class gh extends x {
  constructor(e, u = 'meter') {
    super(e, u);
  }
}
class mh extends x {
  constructor(e, u = 'video') {
    super(e, u);
  }
}
class Sh extends x {
  constructor(e, u = 'td') {
    super(e, u);
  }
}
const S0 = 'title';
class x0 extends Es {
  constructor(e, u = S0) {
    super(e, u);
  }
}
oe(S0, x0);
class xh extends x {
  constructor(e, u = 'output') {
    super(e, u);
  }
}
class yh extends x {
  constructor(e, u = 'tr') {
    super(e, u);
  }
}
class Th extends x {
  constructor(e, u = 'data') {
    super(e, u);
  }
}
class Ch extends x {
  constructor(e, u = 'menu') {
    super(e, u);
  }
}
const y0 = 'select';
class T0 extends x {
  constructor(e, u = y0) {
    super(e, u);
  }
  get options() {
    let e = new ot(),
      { firstElementChild: u } = this;
    for (; u; )
      u.tagName === 'OPTGROUP' ? e.push(...u.children) : e.push(u),
        (u = u.nextElementSibling);
    return e;
  }
  get disabled() {
    return B.get(this, 'disabled');
  }
  set disabled(e) {
    B.set(this, 'disabled', e);
  }
  get name() {
    return this.getAttribute('name');
  }
  set name(e) {
    this.setAttribute('name', e);
  }
  get value() {
    return this.querySelector('option[selected]')?.value;
  }
}
oe(y0, T0);
class vh extends x {
  constructor(e, u = 'br') {
    super(e, u);
  }
}
const C0 = 'button';
class v0 extends x {
  constructor(e, u = C0) {
    super(e, u);
  }
  get disabled() {
    return B.get(this, 'disabled');
  }
  set disabled(e) {
    B.set(this, 'disabled', e);
  }
  get name() {
    return this.getAttribute('name');
  }
  set name(e) {
    this.setAttribute('name', e);
  }
  get type() {
    return this.getAttribute('type');
  }
  set type(e) {
    this.setAttribute('type', e);
  }
}
oe(C0, v0);
class Eh extends x {
  constructor(e, u = 'map') {
    super(e, u);
  }
}
class wh extends x {
  constructor(e, u = 'optgroup') {
    super(e, u);
  }
}
class Ah extends x {
  constructor(e, u = 'dl') {
    super(e, u);
  }
}
const E0 = 'textarea';
class w0 extends Es {
  constructor(e, u = E0) {
    super(e, u);
  }
  get disabled() {
    return B.get(this, 'disabled');
  }
  set disabled(e) {
    B.set(this, 'disabled', e);
  }
  get name() {
    return this.getAttribute('name');
  }
  set name(e) {
    this.setAttribute('name', e);
  }
  get placeholder() {
    return this.getAttribute('placeholder');
  }
  set placeholder(e) {
    this.setAttribute('placeholder', e);
  }
  get type() {
    return this.getAttribute('type');
  }
  set type(e) {
    this.setAttribute('type', e);
  }
  get value() {
    return this.textContent;
  }
  set value(e) {
    this.textContent = e;
  }
}
oe(E0, w0);
class _h extends x {
  constructor(e, u = 'font') {
    super(e, u);
  }
}
class Nh extends x {
  constructor(e, u = 'div') {
    super(e, u);
  }
}
const A0 = 'link';
class _0 extends x {
  constructor(e, u = A0) {
    super(e, u);
  }
  get disabled() {
    return B.get(this, 'disabled');
  }
  set disabled(e) {
    B.set(this, 'disabled', e);
  }
  get href() {
    return g.get(this, 'href').trim();
  }
  set href(e) {
    g.set(this, 'href', e);
  }
  get hreflang() {
    return g.get(this, 'hreflang');
  }
  set hreflang(e) {
    g.set(this, 'hreflang', e);
  }
  get media() {
    return g.get(this, 'media');
  }
  set media(e) {
    g.set(this, 'media', e);
  }
  get rel() {
    return g.get(this, 'rel');
  }
  set rel(e) {
    g.set(this, 'rel', e);
  }
  get type() {
    return g.get(this, 'type');
  }
  set type(e) {
    g.set(this, 'type', e);
  }
}
oe(A0, _0);
const N0 = 'slot';
class R0 extends x {
  constructor(e, u = N0) {
    super(e, u);
  }
  get name() {
    return this.getAttribute('name');
  }
  set name(e) {
    this.setAttribute('name', e);
  }
  assign() {}
  assignedNodes(e) {
    const u = !!this.name,
      s = this.getRootNode().host?.childNodes ?? [];
    let n;
    if (
      (u
        ? (n = [...s].filter((r) => r.slot === this.name))
        : (n = [...s].filter((r) => !r.slot)),
      e?.flatten)
    ) {
      const r = [];
      for (let i of n)
        i.localName === 'slot'
          ? r.push(...i.assignedNodes({ flatten: !0 }))
          : r.push(i);
      n = r;
    }
    return n.length ? n : [...this.childNodes];
  }
  assignedElements(e) {
    const u = this.assignedNodes(e).filter((s) => s.nodeType === 1);
    return u.length ? u : [...this.children];
  }
}
oe(N0, R0);
class Rh extends x {
  constructor(e, u = 'form') {
    super(e, u);
  }
}
const D0 = 'img';
class Rr extends x {
  constructor(e, u = D0) {
    super(e, u);
  }
  get alt() {
    return g.get(this, 'alt');
  }
  set alt(e) {
    g.set(this, 'alt', e);
  }
  get sizes() {
    return g.get(this, 'sizes');
  }
  set sizes(e) {
    g.set(this, 'sizes', e);
  }
  get src() {
    return g.get(this, 'src');
  }
  set src(e) {
    g.set(this, 'src', e);
  }
  get srcset() {
    return g.get(this, 'srcset');
  }
  set srcset(e) {
    g.set(this, 'srcset', e);
  }
  get title() {
    return g.get(this, 'title');
  }
  set title(e) {
    g.set(this, 'title', e);
  }
  get width() {
    return wt.get(this, 'width');
  }
  set width(e) {
    wt.set(this, 'width', e);
  }
  get height() {
    return wt.get(this, 'height');
  }
  set height(e) {
    wt.set(this, 'height', e);
  }
}
oe(D0, Rr);
class Dh extends x {
  constructor(e, u = 'pre') {
    super(e, u);
  }
}
class Lh extends x {
  constructor(e, u = 'ul') {
    super(e, u);
  }
}
const L0 = 'meta';
class I0 extends x {
  constructor(e, u = L0) {
    super(e, u);
  }
  get name() {
    return g.get(this, 'name');
  }
  set name(e) {
    g.set(this, 'name', e);
  }
  get httpEquiv() {
    return g.get(this, 'http-equiv');
  }
  set httpEquiv(e) {
    g.set(this, 'http-equiv', e);
  }
  get content() {
    return g.get(this, 'content');
  }
  set content(e) {
    g.set(this, 'content', e);
  }
  get charset() {
    return g.get(this, 'charset');
  }
  set charset(e) {
    g.set(this, 'charset', e);
  }
  get media() {
    return g.get(this, 'media');
  }
  set media(e) {
    g.set(this, 'media', e);
  }
}
oe(L0, I0);
class Ih extends x {
  constructor(e, u = 'picture') {
    super(e, u);
  }
}
class Mh extends x {
  constructor(e, u = 'area') {
    super(e, u);
  }
}
class Oh extends x {
  constructor(e, u = 'ol') {
    super(e, u);
  }
}
class kh extends x {
  constructor(e, u = 'caption') {
    super(e, u);
  }
}
const M0 = 'a';
class O0 extends x {
  constructor(e, u = M0) {
    super(e, u);
  }
  get href() {
    return encodeURI(decodeURI(g.get(this, 'href'))).trim();
  }
  set href(e) {
    g.set(this, 'href', decodeURI(e));
  }
  get download() {
    return encodeURI(decodeURI(g.get(this, 'download')));
  }
  set download(e) {
    g.set(this, 'download', decodeURI(e));
  }
  get target() {
    return g.get(this, 'target');
  }
  set target(e) {
    g.set(this, 'target', e);
  }
  get type() {
    return g.get(this, 'type');
  }
  set type(e) {
    g.set(this, 'type', e);
  }
  get rel() {
    return g.get(this, 'rel');
  }
  set rel(e) {
    g.set(this, 'rel', e);
  }
}
oe(M0, O0);
class Ph extends x {
  constructor(e, u = 'label') {
    super(e, u);
  }
}
class qh extends x {
  constructor(e, u = 'unknown') {
    super(e, u);
  }
}
class Bh extends x {
  constructor(e, u = 'mod') {
    super(e, u);
  }
}
class Fh extends x {
  constructor(e, u = 'details') {
    super(e, u);
  }
}
const k0 = 'source';
class P0 extends x {
  constructor(e, u = k0) {
    super(e, u);
  }
  get src() {
    return g.get(this, 'src');
  }
  set src(e) {
    g.set(this, 'src', e);
  }
  get srcset() {
    return g.get(this, 'srcset');
  }
  set srcset(e) {
    g.set(this, 'srcset', e);
  }
  get sizes() {
    return g.get(this, 'sizes');
  }
  set sizes(e) {
    g.set(this, 'sizes', e);
  }
  get type() {
    return g.get(this, 'type');
  }
  set type(e) {
    g.set(this, 'type', e);
  }
}
oe(k0, P0);
class Vh extends x {
  constructor(e, u = 'track') {
    super(e, u);
  }
}
class Uh extends x {
  constructor(e, u = 'marquee') {
    super(e, u);
  }
}
const $h = {
    HTMLElement: x,
    HTMLTemplateElement: Wo,
    HTMLHtmlElement: Ff,
    HTMLScriptElement: Jo,
    HTMLFrameElement: Uf,
    HTMLIFrameElement: Yo,
    HTMLObjectElement: $f,
    HTMLHeadElement: Hf,
    HTMLBodyElement: Gf,
    HTMLStyleElement: o0,
    HTMLTimeElement: c0,
    HTMLFieldSetElement: Wf,
    HTMLEmbedElement: Xf,
    HTMLHRElement: Jf,
    HTMLProgressElement: Zf,
    HTMLParagraphElement: Yf,
    HTMLTableElement: Qf,
    HTMLFrameSetElement: eh,
    HTMLLIElement: th,
    HTMLBaseElement: uh,
    HTMLDataListElement: sh,
    HTMLInputElement: d0,
    HTMLParamElement: nh,
    HTMLMediaElement: rh,
    HTMLAudioElement: ih,
    HTMLHeadingElement: h0,
    HTMLDirectoryElement: ah,
    HTMLQuoteElement: oh,
    HTMLCanvasElement: p0,
    HTMLLegendElement: bh,
    HTMLOptionElement: m0,
    HTMLSpanElement: ph,
    HTMLMeterElement: gh,
    HTMLVideoElement: mh,
    HTMLTableCellElement: Sh,
    HTMLTitleElement: x0,
    HTMLOutputElement: xh,
    HTMLTableRowElement: yh,
    HTMLDataElement: Th,
    HTMLMenuElement: Ch,
    HTMLSelectElement: T0,
    HTMLBRElement: vh,
    HTMLButtonElement: v0,
    HTMLMapElement: Eh,
    HTMLOptGroupElement: wh,
    HTMLDListElement: Ah,
    HTMLTextAreaElement: w0,
    HTMLFontElement: _h,
    HTMLDivElement: Nh,
    HTMLLinkElement: _0,
    HTMLSlotElement: R0,
    HTMLFormElement: Rh,
    HTMLImageElement: Rr,
    HTMLPreElement: Dh,
    HTMLUListElement: Lh,
    HTMLMetaElement: I0,
    HTMLPictureElement: Ih,
    HTMLAreaElement: Mh,
    HTMLOListElement: Oh,
    HTMLTableCaptionElement: kh,
    HTMLAnchorElement: O0,
    HTMLLabelElement: Ph,
    HTMLUnknownElement: qh,
    HTMLModElement: Bh,
    HTMLDetailsElement: Fh,
    HTMLSourceElement: P0,
    HTMLTrackElement: Vh,
    HTMLMarqueeElement: Uh,
  },
  Xu = { test: () => !0 },
  Hh = {
    'text/html': {
      docType: '<!DOCTYPE html>',
      ignoreCase: !0,
      voidElements:
        /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,
    },
    'image/svg+xml': {
      docType: '<?xml version="1.0" encoding="utf-8"?>',
      ignoreCase: !1,
      voidElements: Xu,
    },
    'text/xml': {
      docType: '<?xml version="1.0" encoding="utf-8"?>',
      ignoreCase: !1,
      voidElements: Xu,
    },
    'application/xml': {
      docType: '<?xml version="1.0" encoding="utf-8"?>',
      ignoreCase: !1,
      voidElements: Xu,
    },
    'application/xhtml+xml': {
      docType: '<?xml version="1.0" encoding="utf-8"?>',
      ignoreCase: !1,
      voidElements: Xu,
    },
  };
class q0 extends Vt {
  constructor(e, u = {}) {
    super(e, u), (this.detail = u.detail);
  }
}
class Gh extends Vt {
  constructor(e, u = {}) {
    super(e, u),
      (this.inputType = u.inputType),
      (this.data = u.data),
      (this.dataTransfer = u.dataTransfer),
      (this.isComposing = u.isComposing || !1),
      (this.ranges = u.ranges);
  }
}
const jh = (t) =>
    class extends Rr {
      constructor(u, s) {
        switch ((super(t), arguments.length)) {
          case 1:
            (this.height = u), (this.width = u);
            break;
          case 2:
            (this.height = s), (this.width = u);
            break;
        }
      }
    },
  Wi = ({ [Me]: t, [T]: e }, u = null) => {
    uo(t[fe], e[S]);
    do {
      const s = ke(t),
        n = s === e ? s : s[S];
      u ? u.insertBefore(t, u[T]) : t.remove(), (t = n);
    } while (t !== e);
  };
class Dr {
  constructor() {
    (this[Me] = null), (this[T] = null), (this.commonAncestorContainer = null);
  }
  insertNode(e) {
    this[T].parentNode.insertBefore(e, this[Me]);
  }
  selectNode(e) {
    (this[Me] = e), (this[T] = ke(e));
  }
  selectNodeContents(e) {
    this.selectNode(e), (this.commonAncestorContainer = e);
  }
  surroundContents(e) {
    e.replaceChildren(this.extractContents());
  }
  setStartBefore(e) {
    this[Me] = e;
  }
  setStartAfter(e) {
    this[Me] = e.nextSibling;
  }
  setEndBefore(e) {
    this[T] = ke(e.previousSibling);
  }
  setEndAfter(e) {
    this[T] = ke(e);
  }
  cloneContents() {
    let { [Me]: e, [T]: u } = this;
    const s = e.ownerDocument.createDocumentFragment();
    for (; e !== u; )
      s.insertBefore(e.cloneNode(!0), s[T]), (e = ke(e)), e !== u && (e = e[S]);
    return s;
  }
  deleteContents() {
    Wi(this);
  }
  extractContents() {
    const e = this[Me].ownerDocument.createDocumentFragment();
    return Wi(this, e), e;
  }
  createContextualFragment(e) {
    const { commonAncestorContainer: u } = this,
      s = 'ownerSVGElement' in u,
      n = s ? u.ownerDocument : u;
    let r = so(n, e);
    if (s) {
      const i = [...r.childNodes];
      (r = n.createDocumentFragment()),
        Object.setPrototypeOf(r, Au.prototype),
        (r.ownerSVGElement = n);
      for (const a of i)
        Object.setPrototypeOf(a, Au.prototype),
          (a.ownerSVGElement = n),
          r.appendChild(a);
    } else this.selectNode(r);
    return r;
  }
  cloneRange() {
    const e = new Dr();
    return (e[Me] = this[Me]), (e[T] = this[T]), e;
  }
}
const zh = ({ nodeType: t }, e) => {
  switch (t) {
    case k:
      return e & ad;
    case Te:
      return e & od;
    case pt:
      return e & ld;
    case ct:
      return e & cd;
  }
  return 0;
};
class Kh {
  constructor(e, u = id) {
    (this.root = e), (this.currentNode = e), (this.whatToShow = u);
    let { [S]: s, [T]: n } = e;
    if (e.nodeType === Ot) {
      const { documentElement: i } = e;
      (s = i), (n = i[T]);
    }
    const r = [];
    for (; s && s !== n; ) zh(s, u) && r.push(s), (s = s[S]);
    this[ye] = { i: 0, nodes: r };
  }
  nextNode() {
    const e = this[ye];
    return (
      (this.currentNode = e.i < e.nodes.length ? e.nodes[e.i++] : null),
      this.currentNode
    );
  }
}
const Xi = (t, e, u) => {
    let { [S]: s, [T]: n } = e;
    return t.call({ ownerDocument: e, [S]: s, [T]: n }, u);
  },
  B0 = pd({}, Bf, $h, {
    CustomEvent: q0,
    Event: Vt,
    EventTarget: tr,
    InputEvent: Gh,
    NamedNodeMap: zo,
    NodeList: ot,
  }),
  Ju = new WeakMap();
let Ut = class extends cr {
  constructor(e) {
    super(null, '#document', Ot),
      (this[Je] = { active: !1, registry: null }),
      (this[Tt] = { active: !1, class: null }),
      (this[ou] = Hh[e]),
      (this[Dt] = null),
      (this[vn] = null),
      (this[ts] = null),
      (this[Ze] = null),
      (this[yu] = null);
  }
  get defaultView() {
    return (
      Ju.has(this) ||
        Ju.set(
          this,
          new Proxy(globalThis, {
            set: (e, u, s) => {
              switch (u) {
                case 'addEventListener':
                case 'removeEventListener':
                case 'dispatchEvent':
                  this[pu][u] = s;
                  break;
                default:
                  e[u] = s;
                  break;
              }
              return !0;
            },
            get: (e, u) => {
              switch (u) {
                case 'addEventListener':
                case 'removeEventListener':
                case 'dispatchEvent':
                  if (!this[pu]) {
                    const s = (this[pu] = new tr());
                    (s.dispatchEvent = s.dispatchEvent.bind(s)),
                      (s.addEventListener = s.addEventListener.bind(s)),
                      (s.removeEventListener = s.removeEventListener.bind(s));
                  }
                  return this[pu][u];
                case 'document':
                  return this;
                case 'navigator':
                  return {
                    userAgent:
                      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
                  };
                case 'window':
                  return Ju.get(this);
                case 'customElements':
                  return (
                    this[Je].registry || (this[Je] = new Td(this)), this[Je]
                  );
                case 'performance':
                  return Rd.performance;
                case 'DOMParser':
                  return this[vn];
                case 'Image':
                  return this[Ze] || (this[Ze] = jh(this)), this[Ze];
                case 'MutationObserver':
                  return (
                    this[Tt].class || (this[Tt] = new Ld(this)), this[Tt].class
                  );
              }
              return (this[ts] && this[ts][u]) || B0[u] || e[u];
            },
          })
        ),
      Ju.get(this)
    );
  }
  get doctype() {
    const e = this[Dt];
    if (e) return e;
    const { firstChild: u } = this;
    return u && u.nodeType === au ? (this[Dt] = u) : null;
  }
  set doctype(e) {
    if (
      /^([a-z:]+)(\s+system|\s+public(\s+"([^"]+)")?)?(\s+"([^"]+)")?/i.test(e)
    ) {
      const { $1: u, $4: s, $6: n } = RegExp;
      (this[Dt] = new hs(this, u, s, n)), ys(this, this[Dt], this[S]);
    }
  }
  get documentElement() {
    return this.firstElementChild;
  }
  get isConnected() {
    return !0;
  }
  _getParent() {
    return this[pu];
  }
  createAttribute(e) {
    return new Du(this, e);
  }
  createCDATASection(e) {
    return new ir(this, e);
  }
  createComment(e) {
    return new ar(this, e);
  }
  createDocumentFragment() {
    return new lr(this);
  }
  createDocumentType(e, u, s) {
    return new hs(this, e, u, s);
  }
  createElement(e) {
    return new Mu(this, e);
  }
  createRange() {
    const e = new Dr();
    return (e.commonAncestorContainer = this), e;
  }
  createTextNode(e) {
    return new Iu(this, e);
  }
  createTreeWalker(e, u = -1) {
    return new Kh(e, u);
  }
  createNodeIterator(e, u = -1) {
    return this.createTreeWalker(e, u);
  }
  createEvent(e) {
    const u = gd(e === 'Event' ? new Vt('') : new q0(''));
    return (
      (u.initEvent = u.initCustomEvent =
        (s, n = !1, r = !1, i) => {
          (u.bubbles = !!n),
            md(u, {
              type: { value: s },
              canBubble: { value: n },
              cancelable: { value: r },
              detail: { value: i },
            });
        }),
      u
    );
  }
  cloneNode(e = !1) {
    const { constructor: u, [Je]: s, [Dt]: n } = this,
      r = new u();
    if (((r[Je] = s), e)) {
      const i = r[T],
        { childNodes: a } = this;
      for (let { length: o } = a, c = 0; c < o; c++)
        r.insertBefore(a[c].cloneNode(!0), i);
      n && (r[Dt] = a[0]);
    }
    return r;
  }
  importNode(e) {
    const u = 1 < arguments.length && !!arguments[1],
      s = e.cloneNode(u),
      { [Je]: n } = this,
      { active: r } = n,
      i = (a) => {
        const { ownerDocument: o, nodeType: c } = a;
        (a.ownerDocument = this), r && o !== this && c === k && n.upgrade(a);
      };
    if ((i(s), u))
      switch (s.nodeType) {
        case k:
        case bt: {
          let { [S]: a, [T]: o } = s;
          for (; a !== o; ) a.nodeType === k && i(a), (a = a[S]);
          break;
        }
      }
    return s;
  }
  toString() {
    return this.childNodes.join('');
  }
  querySelector(e) {
    return Xi(super.querySelector, this, e);
  }
  querySelectorAll(e) {
    return Xi(super.querySelectorAll, this, e);
  }
  getElementsByTagNameNS(e, u) {
    return this.getElementsByTagName(u);
  }
  createAttributeNS(e, u) {
    return this.createAttribute(u);
  }
  createElementNS(e, u, s) {
    return e === ds ? new Au(this, u, null) : this.createElement(u, s);
  }
};
Ne(
  (B0.Document = function () {
    Be();
  }),
  Ut
).prototype = Ut.prototype;
const Wh = (t, e, u, s) => {
  if (!e && fs.has(u)) {
    const i = fs.get(u);
    return new i(t, u);
  }
  const {
    [Je]: { active: n, registry: r },
  } = t;
  if (n) {
    const i = e ? s.is : u;
    if (r.has(i)) {
      const { Class: a } = r.get(i),
        o = new a(t, u);
      return Ft.set(o, { connected: !1 }), o;
    }
  }
  return new x(t, u);
};
class Xh extends Ut {
  constructor() {
    super('text/html');
  }
  get all() {
    const e = new ot();
    let { [S]: u, [T]: s } = this;
    for (; u !== s; ) {
      switch (u.nodeType) {
        case k:
          e.push(u);
          break;
      }
      u = u[S];
    }
    return e;
  }
  get head() {
    const { documentElement: e } = this;
    let { firstElementChild: u } = e;
    return (
      (!u || u.tagName !== 'HEAD') &&
        ((u = this.createElement('head')), e.prepend(u)),
      u
    );
  }
  get body() {
    const { head: e } = this;
    let { nextElementSibling: u } = e;
    return (
      (!u || u.tagName !== 'BODY') &&
        ((u = this.createElement('body')), e.after(u)),
      u
    );
  }
  get title() {
    const { head: e } = this;
    return e.getElementsByTagName('title').at(0)?.textContent || '';
  }
  set title(e) {
    const { head: u } = this;
    let s = u.getElementsByTagName('title').at(0);
    s
      ? (s.textContent = e)
      : (u.insertBefore(this.createElement('title'), u.firstChild).textContent =
          e);
  }
  createElement(e, u) {
    const s = !!(u && u.is),
      n = Wh(this, s, e, u);
    return s && n.setAttribute('is', u.is), n;
  }
}
class Jh extends Ut {
  constructor() {
    super('image/svg+xml');
  }
  toString() {
    return this[ou].docType + super.toString();
  }
}
class Zh extends Ut {
  constructor() {
    super('text/xml');
  }
  toString() {
    return this[ou].docType + super.toString();
  }
}
class Lr {
  parseFromString(e, u, s = null) {
    let n = !1,
      r;
    return (
      u === 'text/html'
        ? ((n = !0), (r = new Xh()))
        : u === 'image/svg+xml'
        ? (r = new Jh())
        : (r = new Zh()),
      (r[vn] = Lr),
      s && (r[ts] = s),
      n &&
        e === '...' &&
        (e = '<!doctype html><html><head></head><body></body></html>'),
      e ? ro(r, n, e) : r
    );
  }
}
const Yh = (t, e = null) =>
  new Lr().parseFromString(t, 'text/html', e).defaultView;
function Qh() {
  Be();
}
Ne(Qh, Ut).prototype = Ut.prototype;
const Qe = (t) => {
    if (typeof document < 'u' && document instanceof Document)
      return document.createElementNS('http://www.w3.org/2000/svg', t);
    {
      const { document: e } = Yh(
        '<!doctype html><html><head></head><body></body></html>'
      );
      return e.createElementNS('http://www.w3.org/2000/svg', t);
    }
  },
  e1 = (t, e) => {
    const u = Qe('svg');
    return (
      u.setAttribute('width', `${e}`),
      u.setAttribute('height', `${t}`),
      u.setAttribute('viewBox', `0 0 ${e} ${t}`),
      u.setAttribute('xmlns', 'http://www.w3.org/2000/svg'),
      u.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink'),
      u
    );
  },
  Zu = 15,
  t1 = (
    t,
    e,
    u,
    s,
    n,
    r,
    i,
    a,
    { width: o, height: c },
    { barClass: l, textClass: f }
  ) => {
    const p = Qe('text'),
      h = Qe('rect');
    let m = 0,
      v = 0,
      _ = u,
      A = i,
      F = 0,
      M = 0;
    if (((m = i * 2 * t + n), e === 'left')) {
      const N = A;
      (A = _), (_ = N);
      const O = m;
      (m = v), (v = O), (F = A + Zu), (M = v + _ * 0.5);
    } else if (e === 'top') (F = m + A * 0.25), (M = _ + Zu);
    else if (e === 'right') {
      const N = A;
      (A = _),
        (_ = N),
        (v = m),
        (m = o - A),
        (F = m - Zu * 2),
        (M = v + _ * 0.5);
    } else e === 'bottom' && ((v = c - _), (F = m + A * 0.25), (M = v - Zu));
    return (
      r !== i &&
        (e === 'top' || e === 'bottom'
          ? ((A = r), (m += Math.abs(i * 0.5 - r)))
          : ((_ = r), (v += Math.abs(i * 0.5 - r)))),
      h.setAttribute('fill', a),
      h.setAttribute('x', `${m}`),
      h.setAttribute('y', `${v}`),
      h.setAttribute('width', `${A}`),
      h.setAttribute('height', `${_}`),
      h.setAttribute('title', `Bar value of ${u}`),
      h.classList.add(l),
      p.setAttribute('fill', a),
      p.setAttribute('x', `${F}`),
      p.setAttribute('y', `${M}`),
      p.setAttribute('title', `Bar label ${s}`),
      (p.textContent = s),
      f && p.classList.add(f),
      [h, p]
    );
  };
function u1(t, e, u) {
  if (!Number.isFinite(t))
    throw new RangeError(`Cannot generate a random number: min cannot be ${t}`);
  if (!Number.isFinite(e))
    throw new RangeError(`Cannot generate a random number: max cannot be ${e}`);
  if (e < t)
    throw new RangeError(
      `Cannot generate a random number as max must be greater than or equal to min: max=${e}, min=${t}`
    );
  const s = (0, Math.random)(),
    n = t * (1 - s) + e * s;
  return n >= t && n < e ? n : t;
}
function s1(t, e, u) {
  return Math.floor(u1(Math.ceil(t), Math.floor(e) + 1));
}
new Uint8Array(new Uint16Array([1]).buffer)[0];
const n1 = new Uint8Array(4);
new DataView(n1.buffer);
const r1 = new Uint8Array(8);
new DataView(r1.buffer);
const i1 = (t, e) => {
    let u = e;
    for (; u !== 0; ) t.push(''), u--;
  },
  a1 = (t, e) => {
    let u = e;
    for (; u !== 0; ) t.push(0), u--;
  },
  F0 = (t = 8) => {
    const e = 'abdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let u = '';
    for (let s = 0; s < t; s++) u += e[s1(0, e.length - 1)];
    return u;
  },
  o1 = (t, e = 'left-to-right', u) => {
    const s = Qe('defs'),
      n = Qe('linearGradient'),
      r = F0();
    n.id = r;
    const i = 1 / (t.length - 1);
    for (let a = 0; a < t.length; a++) {
      const o = Qe('stop'),
        c = a * i * 100;
      o.setAttribute('offset', `${c}%`),
        o.setAttribute('stop-color', t[a % t.length]),
        n.appendChild(o);
    }
    if (
      (s.appendChild(n),
      e === 'left-to-right' || e === 'right-to-left'
        ? n.setAttribute('gradientTransform', 'rotate(180,0.5,0.5)')
        : e === 'top-to-bottom'
        ? n.setAttribute('gradientTransform', 'rotate(90,0.5,0.5)')
        : e === 'bottom-to-top'
        ? n.setAttribute('gradientTransform', 'rotate(270,0.5,0.5)')
        : n.setAttribute('gradientTransform', `rotate(${e},0.5,0.5)`),
      u === 'individual')
    )
      return [s, r, null];
    {
      const a = Qe('rect');
      return (
        a.setAttribute('x', '0'),
        a.setAttribute('y', '0'),
        a.setAttribute('width', '100%'),
        a.setAttribute('height', '100%'),
        a.setAttribute('fill', `url('#${r}')`),
        [s, r, a]
      );
    }
  },
  c1 = (t) => {
    const e = F0(),
      u = Qe('mask');
    u.id = e;
    const s = Qe('rect');
    s.setAttribute('x', '0'),
      s.setAttribute('y', '0'),
      s.setAttribute('width', '100%'),
      s.setAttribute('height', '100%'),
      s.setAttribute('fill', '#000000'),
      u.appendChild(s);
    for (const n of t) {
      const r = n.cloneNode();
      r.setAttribute('fill', '#ffffff'),
        u.appendChild(r),
        r.getAttribute('title') && r.removeAttribute('title');
    }
    return [e, u];
  },
  mn = { size: 300, placement: 'bottom' },
  l1 = (t) => Math.round(t / 10) * 10,
  d1 = (t) => l1(Math.max(...t)),
  Ji = (t, e) => t / e / 2,
  Zi = (t, e) => t / e / 4;
function f1({
  data: t,
  labels: e = [],
  height: u,
  width: s,
  gap: n,
  max: r,
  placement: i,
  barWidth: a,
  groupClass: o,
  parentClass: c,
  barClass: l,
  textClass: f,
  barGroupClass: p,
  textGroupClass: h,
  colors: m,
  gradientColors: v,
  gradientMode: _,
  gradientDirection: A,
}) {
  if (
    (r || (r = d1(t)),
    u || (u = mn.size),
    s || (s = mn.size),
    i || (i = mn.placement),
    e.length < t.length)
  ) {
    const I = Math.abs(e.length - t.length);
    i1(e, I);
  }
  if (t.length < e.length) {
    const I = Math.abs(e.length - t.length);
    a1(t, I);
  }
  const U = t.length,
    N = Ji(i === 'top' || i === 'bottom' ? s : u, U);
  a || (a = N), n || (n = Zi(i === 'top' || i === 'bottom' ? s : u, U));
  const O = a * U + (n * U - 1),
    ee = i === 'top' || i === 'bottom';
  ((ee && O > s) || (!ee && O > u)) &&
    console.warn('toomanychart might exceed given size bounds');
  const z = e1(u, s);
  i === 'top' || (i === 'bottom' && t.some((I) => I > s))
    ? z.setAttribute('viewBox', `0 0 ${s} ${r}`)
    : t.some((I) => I > u) && z.setAttribute('viewBox', `0 0 ${r} ${u}`);
  let Ce = !1,
    ce = null,
    q = null,
    W = null;
  if (v) {
    (Ce = !0), _ || (_ = 'individual');
    const [I, me, K] = o1(v, A, _);
    (ce = me), (q = I), (W = K);
  }
  q && z.appendChild(q);
  const be = Qe('g'),
    te = Qe('g');
  o && (be.classList.add(o), te.classList.add(o)),
    p && be.classList.add(p),
    h && te.classList.add(h),
    be.classList.add('nc-bargroup'),
    te.classList.add('nc-textgroup');
  const X = [];
  for (let I = 0; I < t.length; I++) {
    const me = e[I],
      K = t[I],
      y =
        Ce && ce
          ? _ === 'continuous'
            ? 'transparent'
            : `url('#${ce}')`
          : m && m.length > 0
          ? m[I % m.length]
          : '#ffffff',
      [se, ve] = t1(
        I,
        i,
        K,
        me,
        n,
        a,
        N,
        y,
        { width: s, height: u },
        { textClass: f, barClass: l }
      );
    be.appendChild(se),
      te.appendChild(ve),
      _ === 'continuous' && ce && X.push(se);
  }
  if (Ce && q && W && _ === 'continuous') {
    const [I, me] = c1(X);
    q.appendChild(me), W.setAttribute('mask', `url('#${I}')`), z.appendChild(W);
  }
  return z.appendChild(be), z.appendChild(te), c && z.classList.add(c), z;
}
const h1 = () => {
  Ca.set('.el-bar', { transformOrigin: 'bottom center', scaleY: 0 }),
    Ic('.el-bar', { scaleY: [0, 1], duration: 3e3, ease: 'linear' });
};
function b1() {
  const t = document.createElement('div'),
    e = f1({ data: [50, 100, 30], barClass: 'el-bar' });
  return (
    e &&
      (t.appendChild(e),
      setTimeout(() => {
        h1();
      }, 100)),
    t
  );
}
const p1 = document.querySelector('#app'),
  g1 = b1();
p1.appendChild(g1);
