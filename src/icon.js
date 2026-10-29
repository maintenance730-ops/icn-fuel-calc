const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const n of [192,512]){const p=await b.newPage({viewport:{width:n,height:n}});
await p.setContent(`<body style="margin:0"><div style="width:${n}px;height:${n}px;background:#121417;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Arial Narrow,Arial,sans-serif;color:#f4f4f2">
<div style="font-weight:700;font-size:${n*.26}px;letter-spacing:${n*.01}px;line-height:1">FUEL</div>
<div style="margin-top:${n*.05}px;border:${n*.015}px solid #f4f4f2;padding:${n*.01}px ${n*.04}px;font-weight:700;font-size:${n*.1}px;letter-spacing:${n*.015}px">JET A-1</div>
<div style="margin-top:${n*.05}px;font-size:${n*.085}px;color:#95b5ff;font-family:monospace">ICN</div></div></body>`);
await p.screenshot({path:`pwa/icon-${n}.png`});}
await b.close();})();
