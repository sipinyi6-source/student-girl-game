(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.Game=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const VERSION=2;
const SUBJECTS=[{id:'physical_chemistry',name:'物理化学',symbol:'ΔG',desc:'从热力学到反应速率'},{id:'organic_chemistry',name:'有机化学',symbol:'⌬',desc:'和碳原子重新认识一下'},{id:'probability_statistics',name:'概率论与数理统计',symbol:'P(A)',desc:'生活至少还有一点概率'},{id:'general_physics',name:'普通物理',symbol:'∑F',desc:'让世界稍微有点道理'}];
const ACTIONS={study:{name:'复习功课',delta:[7,5,-4],base:2,k:.5,icon:'▤'},go_out:{name:'外出走走',delta:[-12,-5,2],base:5,k:.7,icon:'✿'},surf:{name:'上网冲浪',delta:[-4,6,-2],base:8,k:1,icon:'◎'},magic:{name:'使用魔法',delta:[12,16,-7],base:25,k:1.5,icon:'✧'},rest:{name:'休息一下',delta:[-8,-12,12],base:4,k:.4,icon:'☾'}};
const ENDINGS=[
{id:'E01',rank:1,title:'更高，更快，更强',type:'post',icon:'★',scene:['我好像找到了比期末更适合我的赛场。','下次见面，记得看体育频道。'],body:'休学申请交了。\n下一个目标：奥运会。'},
{id:'E02',rank:1,title:'病假条',type:'notice',icon:'✚',scene:['今天可能没办法复习了。','我在医院。'],body:'病假申请\n状态：住院中\n期末考试：暂缓参加'},
{id:'E03',rank:1,title:'四大皆空',type:'post',icon:'❀',scene:['我想明白了。','这次，真的放下了。'],body:'决定出家。\n这次真的不卷了。'},
{id:'E04',rank:1,title:'网荒人生',type:'post',icon:'↗',scene:['我准备换一种方式更新动态了。','新链接已经放好了。'],body:'My OnlyFans is finally live! ♡\nSubscribe here: [link]'},
{id:'E05',rank:1,title:'省电模式',type:'sleep',icon:'☾',scene:['先这样吧。','正在进入省电模式……'],body:'POWER SAVING MODE\n省电模式'},
{id:'E06',rank:1,title:'宇宙真理',type:'editor',icon:'✦',scene:['先别问考试。','我有一个能解释一切的理论。'],body:'关于世界运行规律的最终解释\n\n我终于全都明白了。'},
{id:'E07',rank:0,title:'恋爱结局',type:'chat',icon:'♡',scene:['我找到男朋友啦~','那我是不是就不用你监督我学习了'],body:'对方：那我们算是在一起了吗？\n我：嗯。\n我：明天也一起出去走走吧。'},
{id:'E08',rank:0,title:'明天再说',type:'reminder',icon:'◷',scene:['再休息一下。','明天一定。'],body:'待办：复习\n提醒时间：明天\n\n明天再提醒我'},
{id:'E09',rank:0,title:'下一条',type:'feed',icon:'↓',scene:['最后一条，看完就学。','……再下一条。'],body:'你已看完当前内容。\n\n正在加载更多……'},
{id:'E10',rank:0,title:'空虚人生',type:'note',icon:'□',scene:['刚才明明还觉得会好起来。','怎么还是这样。'],body:'未命名备忘录\n\n好像什么都填不满。\n算了。'},
{id:'E11',rank:0,title:'键政人生',type:'editor',icon:'⌨',scene:['等等，这条我必须回复。','你先别催，我马上写完。'],body:'关于这件事，我必须说两句。\n\n继续添加文字……'},
{id:'E12',rank:2,title:'下学期见',type:'notice',icon:'✓',scene:['都过了？','那我可以把这些窗口关掉了吧。'],body:'教务通知\n\n下一学期将于31天后开始'},
{id:'E13',rank:2,title:'未完待续',type:'notice',icon:'…',scene:['还有没过的……','先等通知吧。'],body:'教务通知\n\n补考通知将于下周一发布'}
];
const CARDS=[{title:'窗边的一小块阳光',text:'发了会儿呆，心情倒是轻了一点。',delta:[-3,0,3]},{title:'隔壁的装修声',text:'耳机已经开到最大了。',delta:[5,3,0]},{title:'被一道题绊住',text:'盯了好久，突然连题目都不认识了。',delta:[5,-3,0]},{title:'朋友送来的热饮',text:'杯子还是暖的。今天也没有那么糟。',delta:[-5,0,3]},{title:'忘记吃午饭',text:'从笔记里抬起头，才发现已经过了饭点。',delta:[0,-3,-5]},{title:'终于找到思路',text:'那些乱七八糟的符号，好像接上了。',delta:[-3,5,0]}];
const CHAINS={
go_out:[{title:'常走的那条路',lines:['今天散步的时候，碰到一个也在附近上课的男生。','聊了两句。他说，下次见。只是随便聊聊啦！']},{title:'不是偶遇的偶遇',lines:['他问我明天还会不会走那条路。','我说……看复习进度吧。你别用那种眼神看我。']}],
rest:[{title:'再延后一点点',lines:['闹钟响的时候，枕头刚好变得特别舒服。','我把提醒往后挪了一点点。真的只有一点点。']},{title:'明天的待办清单',lines:['我已经把计划重新写好了。','开始时间嘛……改成明天了。看起来是不是整齐多了？']}],
surf:[{title:'猜你喜欢',lines:['这个账号发的东西居然每条都戳中我。','关注一下应该不算浪费时间吧？']},{title:'没看完的收藏夹',lines:['我收藏了好多“考完再看”。','可是它们总在推荐里出现……我就先看个开头。']}],
magic:[{title:'一点不科学的甜头',lines:['刚才那一下，好像真的有什么不一样。','也许我不用每件事都按原来的办法来？']},{title:'越来越响的回声',lines:['最近脑子里的想法，安静不下来了。','有时候觉得什么都懂，有时候又觉得什么都没有。']}]
};
const TALK={
study:[['字都认识，连起来怎么像外星语。','笔记翻过去了，脑子还停在上一页。','我刚才是在思考，还是在盯着桌角发呆？','今天的注意力好像出门忘带钥匙了。','课本：你好。我：我们见过吗？','这一页我看了很久。它也看了我很久。'],['这部分终于顺着读下来了。好，先不慌。','记完了！字有点歪，但态度是端正的。','刚刚把几个概念重新理了一遍。脑子暂时在线。','今天也向期末挪近了一小步。','那道题我重新做过了，这次没跳步骤哦。','笔记补上了。现在允许我喝口水吧。'],['欸，原来它们是这样连起来的！','今天的脑子好像偷偷更新了版本。','这道题我居然自己想通了。快夸我一下。','刚刚那种思路通了的感觉，还挺上瘾的。','我的笔追上了我的脑子！难得难得。','今天有点厉害。让我得意一小会儿。']],
rest:['枕头给我的建议是：先深呼吸。','我要和我的枕头约会……','我回来了。刚才差点和被子签长期合同。','水喝了，肩膀也转了。现在可以慢慢来。','这次真的只是休息，没有偷偷刷手机。','电量回来一点，开机速度也快了。','躺平片刻，不代表永久注销努力账号。','刚才做了个梦，梦里的我把闹钟关了。','伸个懒腰……怎么感觉骨头都在鼓掌。','休息完成。请把我的课本重新递过来。'],
go_out:['外面的风还挺舒服的。走着走着就不皱眉了。','绕了一小圈。树叶比我的笔记有条理。','今天的云像一块没擦干净的橡皮。','发现一条很安静的小路，下次带你看看。','走到路口又折回来了。没迷路，是散步。','看见一只猫晒太阳。它好像没有期末。','鞋带系紧了，乱七八糟的心情也松开了。','空气不错。脑袋终于不只装着公式了。','我没有走很远，刚好够把烦恼吹散一点。','回来啦。外面的世界今天也在正常运行。'],
surf:['打开之前说好了只看一会儿的……对吧。','这个表情包必须保存，具有很高的学术价值。','我刚看了一个学习方法。看方法也算努力吧？','推荐页怎么知道我现在不想看课本。','笑完了。让我看看刚才时间跑到哪里去了。','收藏了一堆“以后有空看”。以后好忙啊。','今天网上的人依然很有精神。','本来想查一道题，结果看起了猫。','我已经关掉一个窗口了，值得表扬吧。','最后一条是个很有弹性的概念……'],
magic:['咳，一些不太科学的小手段。先别告诉课本。','如果有用，叫灵感；没用，就叫仪式感。','我刚才是不是给自己加了一个奇怪的状态。','这个看起来不错……','万达广场……？','其实地球是方的。','好像有一点点效果，又好像是我想多了。','这招没有写在教材里，保密哦。','我宣布，这次也算一次实验。','心跳有点快。下次还是先喝口水。']
};
const STUDY_LINES={"physical_chemistry":"我的大脑在熵增。","organic_chemistry":"为什么脑子锈住了，难不成我是无机物？","probability_statistics":"和元神抽卡有关系吗。","general_physics":"物理物理，云里雾里。"};
const YOUR_LINES={rest:['先给脑袋放个小假。','休息一下，别硬撑。','今天也允许自己喘口气。','放下课本，缓一缓。'],go_out:['出去透口气吧。','走一小圈，回来再说。','让风帮你整理一下思路。','今天的天空值得看一眼。'],surf:['上会儿网，记得回来。','允许你看一会儿屏幕。','换换频道，但别忘了时间。','休息一下眼前的公式吧。'],magic:['试试那个不科学的办法？','这次也算实验吧。','我还能再看一会。','小心一点，再试试看。']};
function pickTalk(state,action,result){const pool=action==='study'?TALK.study[result]:TALK[action];const recent=state.history.filter(h=>h.action===action).map(h=>h.text);const unused=pool.filter(t=>!recent.includes(t));if(unused.length)return unused[state.history.filter(h=>h.action===action).length%unused.length];const last=recent.at(-1);const candidates=pool.filter(t=>t!==last);return candidates[state.turn%candidates.length];}
function migrateSave(input){if(!input||typeof input!=='object')return input;const s=JSON.parse(JSON.stringify(input));if(s.version===1){s.version=VERSION;s.chains=Object.fromEntries(Object.keys(CHAINS).map(a=>[a,{stage:0,lastDay:0}]));s.pendingEvent=null;}return s;}

const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function random(s){let x=s.rng>>>0;x^=x<<13;x^=x>>>17;x^=x<<5;s.rng=x>>>0;return s.rng/4294967296;}
function initial(seed=Date.now(),cards=true){return {version:VERSION,turn:0,stats:{D:30,E:35,H:85},points:Object.fromEntries(SUBJECTS.map(x=>[x.id,0])),rng:(seed>>>0)||1,settings:{cards},chains:Object.fromEntries(Object.keys(CHAINS).map(a=>[a,{stage:0,lastDay:0}])),pendingEvent:null,ending:null,sceneStep:0,stage:'playing',exam:null,history:[],messages:[{who:'girl',text:'还有14天就期末了……'},{who:'girl',text:'这次真的要开始复习了。你会监督我的，对吧？'}]};}
function eventProbability(action,s){const a=ACTIONS[action];if(!a)throw Error('Invalid action');return clamp(a.base+a.k*(.12*s.D+.15*s.E+.08*(100-s.H)),0,90)/100;}
function learningProbabilities(s){let x=(s.D>=80?.15:0)+(s.E>=80?.15:0)+(s.H<=25?.2:0);return [.3+x,.5-x,.2];}
function magicProbability(s){return clamp(50+.6*(s.D-s.E),10,90)/100;}
function passProbability(points){if(!Number.isInteger(points)||points<0)throw Error('Invalid points');return points<=2?.05:points===3?.2:points===4?.45:points===5?.75:points===6?.9:points===7?.98:1;}
function extremeCandidates(s){return [s.H>=100?'E01':null,s.H<=0?'E02':null,s.D<=0?'E03':null,s.D>=100?'E04':null,s.E<=0?'E05':null,s.E>=100?'E06':null].filter(Boolean);}
function resolve(candidates){return ENDINGS.filter(e=>candidates.includes(e.id)).sort((a,b)=>a.rank-b.rank||a.id.localeCompare(b.id))[0]?.id||null;}
function act(state,action,subject,rngOverride){if(state.stage!=='playing'||state.turn>=42||state.pendingEvent)throw Error('Game ended');if(!ACTIONS[action])throw Error('Invalid action');if(action==='study'&&!SUBJECTS.some(x=>x.id===subject))throw Error('Select subject');const s=JSON.parse(JSON.stringify(state));const roll=rngOverride||(()=>random(s));const before={...s.stats};const a=ACTIONS[action];let result=null,card=null,special=null;const delta=[...a.delta];
if(action==='study'){const p=learningProbabilities(before),r=roll();result=r<p[0]?0:r<p[0]+p[1]?1:2;s.points[subject]+=result;}
const today=Math.floor(s.turn/3)+1;
const eligible=action==='study'||s.chains[action].lastDay<today;
const hit=eligible&&roll()<eventProbability(action,before);
if(hit){if(action==='study'){if(s.settings.cards){card=CARDS[Math.min(CARDS.length-1,Math.floor(roll()*CARDS.length))];card.delta.forEach((v,i)=>delta[i]+=v);}}else {const chain=s.chains[action];chain.stage=Math.min(3,chain.stage+1);chain.lastDay=today;if(chain.stage<3){const scene=CHAINS[action][chain.stage-1];s.pendingEvent={action,stage:chain.stage,title:scene.title,lines:[...scene.lines]};}else if(action==='magic')special=roll()<magicProbability(before)?'E10':'E11';else special={go_out:'E07',rest:'E08',surf:'E09'}[action];}}
['D','E','H'].forEach((key,i)=>s.stats[key]+=delta[i]);s.turn++;
let chosen=resolve([...extremeCandidates(s.stats),...(special?[special]:[])]);
if(!chosen&&s.turn===42){s.exam=SUBJECTS.map(sub=>({id:sub.id,passed:roll()<passProbability(s.points[sub.id])}));chosen=s.exam.every(x=>x.passed)?'E12':'E13';}
const subjectName=SUBJECTS.find(x=>x.id===subject)?.name;
const text=pickTalk(s,action,result);
const actionCount=s.history.filter(h=>h.action===action).length;
s.history.push({turn:s.turn,action,label:subjectName?`复习 · ${subjectName}`:a.name,delta,card:card?.title||s.pendingEvent?.title||null,text});s.messages.push({who:'you',text:subjectName?STUDY_LINES[subject]:YOUR_LINES[action][actionCount%YOUR_LINES[action].length]},{who:'girl',text});if(card)s.messages.push({who:'event',text:`${card.title} · ${card.text}`});if(s.pendingEvent){s.messages.push({who:'event',text:s.pendingEvent.title},...s.pendingEvent.lines.map(text=>({who:'girl',text})));}s.messages=s.messages.slice(-36);if(chosen){s.pendingEvent=null;s.ending=chosen;s.stage='scene';s.sceneStep=0;}return s;}
function advanceScene(s,skip=false){if(s.stage!=='scene')return s;const n=JSON.parse(JSON.stringify(s));const e=ENDINGS.find(x=>x.id===n.ending);n.sceneStep++;if(skip||n.sceneStep>=e.scene.length)n.stage='ended';return n;}
function validSave(s){return !!s&&s.chains&&Object.keys(CHAINS).every(k=>s.chains[k]&&Number.isInteger(s.chains[k].stage)&&s.chains[k].stage>=0&&s.chains[k].stage<=3&&Number.isInteger(s.chains[k].lastDay)&&s.chains[k].lastDay>=0&&s.chains[k].lastDay<=14)&&(s.pendingEvent===null||(s.pendingEvent&&CHAINS[s.pendingEvent.action]&&[1,2].includes(s.pendingEvent.stage)&&typeof s.pendingEvent.title==='string'&&Array.isArray(s.pendingEvent.lines)&&s.pendingEvent.lines.length===2&&s.pendingEvent.lines.every(x=>typeof x==='string')))&&s.version===VERSION&&Number.isInteger(s.turn)&&s.turn>=0&&s.turn<=42&&s.stats&&['D','E','H'].every(k=>Number.isFinite(s.stats[k])&&s.stats[k]>=-100&&s.stats[k]<=200)&&s.points&&SUBJECTS.every(x=>Number.isInteger(s.points[x.id])&&s.points[x.id]>=0&&s.points[x.id]<=84)&&Number.isInteger(s.rng)&&s.rng>0&&['playing','scene','ended'].includes(s.stage)&&(s.stage==='playing'?(s.ending===null&&s.turn<42&&extremeCandidates(s.stats).length===0):ENDINGS.some(e=>e.id===s.ending))&&Array.isArray(s.messages)&&s.messages.length<=36&&s.messages.every(m=>['girl','you','event'].includes(m.who)&&typeof m.text==='string')&&Array.isArray(s.history)&&s.history.length===s.turn&&s.history.every(h=>typeof h.label==='string'&&typeof h.text==='string'&&Array.isArray(h.delta)&&h.delta.length===3&&h.delta.every(Number.isFinite))&&s.settings&&typeof s.settings.cards==='boolean'&&Number.isInteger(s.sceneStep)&&s.sceneStep>=0&&s.sceneStep<=2;}
return {VERSION,SUBJECTS,ACTIONS,ENDINGS,CARDS,CHAINS,TALK,YOUR_LINES,STUDY_LINES,migrateSave,initial,act,advanceScene,eventProbability,learningProbabilities,magicProbability,passProbability,extremeCandidates,resolve,validSave};
});

