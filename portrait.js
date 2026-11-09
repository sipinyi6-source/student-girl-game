(function(root){
'use strict';
function expression(s){if(s.stats.H<=25)return 'tired';if(s.stats.D>=80)return 'worried';if(s.stats.E>=80)return 'excited';if(s.stats.E<=20)return 'tired';return 'neutral';}
const names={neutral:'平静',tired:'疲惫',worried:'担忧',excited:'亢奋'};
let started=false,ready=false,timer,closeTimer;
function update(s){const current=expression(s);if(typeof document==='undefined')return;const layer=document.querySelector('#girlLayer');if(!layer)return;layer.dataset.expression=current;layer.setAttribute('aria-label','女孩：'+names[current]);const img=document.querySelector('#girlExpression');if(img.getAttribute('src')!=='girl-'+current+'.png')img.src='girl-'+current+'.png';layer.classList.toggle('paused',s.stage!=='playing');}
function start(){if(started)return;started=true;const layer=document.querySelector('#girlLayer'),blink=document.querySelector('#girlBlink'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
function stop(){clearTimeout(timer);clearTimeout(closeTimer);blink.classList.remove('closed');}
function schedule(){stop();if(!ready||document.hidden||reduce.matches||layer.classList.contains('paused'))return;timer=setTimeout(()=>{if(document.hidden)return;blink.classList.add('closed');closeTimer=setTimeout(()=>{blink.classList.remove('closed');schedule();},140);},3200+Math.random()*2400);}
Promise.all(['room-background','girl-neutral','girl-blink','girl-tired','girl-worried','girl-excited'].map(name=>new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=reject;img.src=name+'.png';}))).then(()=>{ready=true;document.querySelector('.room-fallback').hidden=true;document.querySelector('.room-background').hidden=false;layer.hidden=false;schedule();}).catch(()=>{});
document.addEventListener('visibilitychange',schedule);reduce.addEventListener('change',schedule);new MutationObserver(schedule).observe(layer,{attributes:true,attributeFilter:['class']});window.addEventListener('pagehide',stop);
}
const api={expression,update,start};if(typeof module==='object'&&module.exports)module.exports=api;else root.Portrait=api;
})(typeof globalThis!=='undefined'?globalThis:this);
