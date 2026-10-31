const fs=require('fs');
let t=fs.readFileSync('template.html','utf8');
t=t.replace('/*__CALC__*/',()=>fs.readFileSync('calc.js','utf8')).replace('/*__SAMPLES__*/',()=>fs.readFileSync('samples.js','utf8')).replace('/*__LOGOS__*/',()=>fs.readFileSync('logos.js','utf8'));
fs.writeFileSync('icn-fuel-calc.html',t);
