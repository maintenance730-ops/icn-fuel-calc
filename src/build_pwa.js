const fs=require('fs');const t=fs.readFileSync('icn-fuel-calc.html','utf8');
const base='<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}</style>\n';
const pwaHead='<meta name="theme-color" content="#121417"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="Fuel Calc">\n<link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icon-192.png"><link rel="apple-touch-icon" href="apple-touch-icon.png">\n';
const body=t.replace('<style>','</head><body>\n<style>');
const sw='<script>if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost")){navigator.serviceWorker.register("sw.js")}</script>\n';
fs.writeFileSync('pwa/index.html','<!doctype html>\n<html lang="ko"><head><meta charset="utf-8">'+base+pwaHead+body+'\n'+sw+'</body></html>');
fs.writeFileSync('ICN_Fuel_Calc_offline.html','<!doctype html>\n<html lang="ko"><head><meta charset="utf-8">'+base+body+'\n</body></html>');
let w=fs.readFileSync('pwa/sw.js','utf8');const m=w.match(/icn-fuel-v(\d+)/);w=w.replace(m[0],'icn-fuel-v'+(+m[1]+1));fs.writeFileSync('pwa/sw.js',w);
console.log('sw cache', 'icn-fuel-v'+(+m[1]+1));
