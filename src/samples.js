// 양식 사진(2026-10) 값으로 만든 예시 데이터 (KC·LOT 10/31, AI·UL 11/1~2 실제 급유값)
const SAMPLES = {
  EK: { sg: '0.793', bu: 'L', uplifts: [{ v: '162228', r: '' }], vals: { A: '23100', C: '22700', D: '152800', G: '152800', frz: '-47', rcpt: '3-26669MO', sup: 'ASIANA AIRPORT' } },
  UL: { sg: '0.7925', bu: 'USG', uplifts: [{ v: '15832', r: '4467708' }], vals: { pre_1: '4480', pre_3: '4480', dep_0: '2890', dep_1: '24040', dep_2: '40', dep_3: '24140', dep_4: '2930', dep_5: '2390', Ein: '56400', Fin: '8900', rcpt: '4467708', grade: 'JET A-1' } },
  LOT: { sg: '0.790', bu: 'L', uplifts: [{ v: '91575', r: '3-26670225' }], vals: { arr: '8100', dep_0: '16700', dep_1: '47500', dep_2: '16700', gs_0: 'G', gs_1: 'G', gs_2: 'G', ft1: 'JET A-1' } },
  KC: { sg: '0.7895', bu: 'USG', uplifts: [{ v: '7000', r: '4467584' }], vals: { pre_0: '9.2', pre_1: '9.2', pre_2: '0.0', dep_0: '18.0', dep_1: '18.0', dep_2: '4.0', sup: 'KAS' } },
  AI: { sg: '0.788', bu: 'L', uplifts: [{ v: '47352', r: '' }], vals: { acType: 'B787', mode: 'elog', erc: '3-26671143', eq: '51117', eu: 'L', esg: '0.7920', efob: '4300', evd: 'ASIANA AIRPORT', arr: '5500', pre_0: '2800', pre_5: '2700', dep_0: '16600', dep_1: '9800', dep_5: '16700', plan: '43000', sup: 'ASIANA' } },
};
if (typeof module !== 'undefined') module.exports = { SAMPLES };
