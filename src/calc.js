// ===== Fuel calc core v2 (DOM-free) =====
const USG_L = 3.78541, IG_L = 4.54609;
const UNIT_L = { L: 1, USG: USG_L, IG: IG_L };
const N = x => (x === '' || x == null || x === '-' || isNaN(+x)) ? null : +x;
const sumN = arr => { const v = arr.map(N).filter(x => x != null); return v.length ? v.reduce((a, b) => a + b, 0) : null; };
const sub = (a, b) => (a == null || b == null) ? null : a - b;
const pct = (a, b) => (a == null || !b) ? null : a / b * 100;

// uplifts: [{v, r}], unit: 'L'|'USG'|'IG'  → raw (no rounding)
function fuelCalc(uplifts, unit, sgIn) {
  const sg = N(sgIn), m = UNIT_L[unit] || 1;
  const vals = (uplifts || []).map(u => N(u.v)).filter(x => x != null);
  if (!vals.length) return { sg, vol: null, L: null, USG: null, IG: null, kg: null };
  const vol = vals.reduce((a, b) => a + b, 0), L = vol * m;
  return { sg, vol, L, USG: L / USG_L, IG: L / IG_L, kg: sg ? L * sg : null };
}
const toL = (kg, sg) => (kg == null || !sg) ? null : kg / sg;

const AIRLINES = {
  EK: { code: 'EK', name: 'Emirates', types: ['B777 / A380'], units: ['L', 'USG'],
    form: 'Aircraft Fuel and Fluids Servicing Record',
    compute(v, f) {
      const A = N(v.A), C = N(v.C), D = N(v.D), G = N(v.G);
      const B = sub(A, C), E = sub(D, C), F = f.kg, H = sub(G, C), J = sub(F, H);
      return { B, E, reqL: toL(E, f.sg), F, H, J, Jp: pct(J, H), disc: J };
    } },
  UL: { code: 'UL', name: 'SriLankan', types: ['A330'], units: ['L', 'USG', 'IG'],
    form: 'Aircraft Journey Log — Fuel Data',
    tanks: ['L/O', 'L/I', 'CTR', 'R/I', 'R/O', 'TRIM'],
    compute(v, f) {
      const L = sumN(this.tanks.map((_, i) => v['pre_' + i])), E = sumN(this.tanks.map((_, i) => v['dep_' + i]));
      const J = N(v.J), K = N(v.K) ?? 0;
      const JKL = (J == null || L == null) ? null : J - K - L;
      const H = sub(E, L), GH = sub(f.kg, H);
      const req = sub(N(v.plan), L);
      return { L, E, JKL, F: L, G: f.kg, H, GH, GHp: pct(GH, H), req, reqL: toL(req, f.sg), disc: GH };
    } },
  LOT: { code: 'LO', name: 'LOT Polish', types: ['B787'], units: ['L'],
    form: 'Aircraft Technical Report — Fuel Record',
    tanks: ['Left', 'Center', 'Right'],
    compute(v, f) {
      const D1 = sumN(this.tanks.map((_, i) => v['dep_' + i]));
      const D2 = sumN(this.tanks.map((_, i) => v['adj_' + i]));
      const adj = sub(D2, D1);
      const up = f.kg, rem = sub(D1, up), arr = N(v.arr), diff = sub(rem, arr);
      const req = sub(N(v.plan), arr);
      return { D1, D2, adj, adjL: toL(adj, f.sg), up, upL: f.L, rem, diff, diffp: pct(diff, up), req, reqL: toL(req, f.sg), disc: diff };
    } },
  KC: { code: 'KC', name: 'Air Astana', types: ['B767'], units: ['L'],
    form: 'Technical Report KC/ENG/001A — Fuel Record',
    tanks: ['Left', 'Right', 'Centre'],
    compute(v, f) {
      const m = v.depUnit === 'kg' ? 1 : 1000;               // Depart / Adjust / Adj.Depart 단위 (기본 t)
      const pre = sumN(this.tanks.map((_, i) => v['pre_' + i]));
      const dep = sumN(this.tanks.map((_, i) => v['dep_' + i]));
      const hasAdj = this.tanks.some((_, i) => N(v['adj_' + i]) != null);
      const adjDep = this.tanks.map((_, i) => N(v['dep_' + i]) == null ? null : N(v['dep_' + i]) + (N(v['adj_' + i]) ?? 0));
      const adjTot = hasAdj ? sumN(adjDep) : null;
      const finalKg = (hasAdj ? adjTot : dep) == null ? null : (hasAdj ? adjTot : dep) * m;
      const calc = sub(finalKg, pre), dsc = sub(calc, f.kg);
      const req = sub(N(v.plan), pre);
      const o = { pre, dep, adjTot, calc, bowL: f.L, bow: f.kg, dsc, dscp: pct(dsc, f.kg), req, reqL: toL(req, f.sg), disc: dsc };
      this.tanks.forEach((_, i) => { o['adjDep_' + i] = hasAdj ? adjDep[i] : null; });
      return o;
    } },
  AI: { code: 'AI', name: 'Air India', types: ['B787', 'B777'], units: ['L'],
    form: 'Tech Log — Fuel Distribution / Fuel Uplift Data',
    tanks: ['LH', 'CWT/CTR', 'AUX/ACT FWD', 'ACT AFT1', 'ACT AFT2', 'RH'],
    compute(v, f) {
      const X = sumN(this.tanks.map((_, i) => v['pre_' + i])), Y = sumN(this.tanks.map((_, i) => v['dep_' + i]));
      const calc = sub(Y, X), dkg = sub(f.kg, calc);
      return { X, Y, gnd: sub(N(v.arr), X), planL: toL(N(v.plan), f.sg), upL: f.L, act: f.kg, calc, dkg, dp: pct(dkg, f.kg), disc: dkg };
    } },
};

function runAirline(id, st) {
  const a = AIRLINES[id];
  const f = fuelCalc(st.uplifts, st.bu || a.units[0], st.sg);
  return { f, o: a.compute(st.vals || {}, f) };
}

if (typeof module !== 'undefined') module.exports = { AIRLINES, fuelCalc, runAirline };
