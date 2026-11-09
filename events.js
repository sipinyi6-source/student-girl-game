(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CampusEvents=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
const CARDS=[
  {
    "id": "notice",
    "title": "通知套娃",
    "lines": [
      "辅导员：请大家填写“是否收到填写通知的通知”。",
      "收到。我的人生正在被表单递归调用。"
    ],
    "delta": [
      3,
      -5,
      0
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "meeting",
    "title": "自愿参加，统一点名",
    "lines": [
      "学院临时组织两小时“高效利用时间”讲座。",
      "听完了。时间没了，利用率确实很高。"
    ],
    "delta": [
      4,
      -6,
      -1
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "inspection",
    "title": "宿舍文明考古",
    "lines": [
      "突击检查要求桌面不能出现与学习无关的物品。",
      "我把课本收起来了。它现在和我的学习关系不大。"
    ],
    "delta": [
      3,
      -4,
      0
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "system",
    "title": "教务系统冬眠",
    "lines": [
      "点开教务系统，转圈的图标比我更有上进心。",
      "它努力加载，我努力不加载情绪。"
    ],
    "delta": [
      2,
      -5,
      0
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "form",
    "title": "重复填写个人信息",
    "lines": [
      "同一个信息要填三遍。学院可能担心我中途换人。",
      "姓名没变，精神状态不保证。"
    ],
    "delta": [
      3,
      -4,
      0
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "water",
    "title": "热水限时返场",
    "lines": [
      "澡洗到一半，热水决定提前放假。",
      "这下冷静了。物理意义上的。"
    ],
    "delta": [
      2,
      -5,
      -2
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "laundry",
    "title": "洗衣机占领战",
    "lines": [
      "洗衣机转完了，主人还在人生的漂洗阶段。",
      "等了十分钟。我和衣服一起失去棱角。"
    ],
    "delta": [
      2,
      -4,
      0
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "printer",
    "title": "打印机只吃截止日期",
    "lines": [
      "打印机卡纸，卡住的刚好是最后一页。",
      "它对“最后期限”有自己的咀嚼方式。"
    ],
    "delta": [
      3,
      -3,
      0
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "cancel",
    "title": "会议取消通知",
    "lines": [
      "原定会议取消。取消通知没有要求再开会确认。",
      "罕见的人类文明进步，截图留念。"
    ],
    "delta": [
      -4,
      3,
      1
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "food",
    "title": "食堂隐藏补丁",
    "lines": [
      "阿姨今天没有抖勺，还说多吃一点。",
      "世界没有完全放弃我。至少土豆没有。"
    ],
    "delta": [
      -3,
      2,
      4
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "cat",
    "title": "校猫学术审查",
    "lines": [
      "猫坐在笔记上，拒绝发表任何修改意见。",
      "它不用考试，却拥有终审权。"
    ],
    "delta": [
      -4,
      -3,
      1
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "tea",
    "title": "一杯没有任务的热饮",
    "lines": [
      "朋友送来热饮，没有顺便要求帮忙签到。",
      "原来关心也可以不带附件。"
    ],
    "delta": [
      -4,
      -3,
      3
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "sun",
    "title": "窗边短暂营业",
    "lines": [
      "阳光落在桌角，刚好够放一只手。",
      "今天唯一不用预约的自习位。"
    ],
    "delta": [
      -3,
      -2,
      2
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "mail",
    "title": "家里发来一条消息",
    "lines": [
      "“饭吃了吗？”没有附带成绩查询链接。",
      "先回一句吃了，再去把这句话变成事实。"
    ],
    "delta": [
      -3,
      -2,
      3
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "sleepy",
    "title": "脑内后台更新",
    "lines": [
      "脑袋突然开始转圈，提示“请勿关闭电源”。",
      "我也没想关闭，它自己选择了低性能模式。"
    ],
    "delta": [
      1,
      -4,
      1
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "parcel",
    "title": "快递代取小确幸",
    "lines": [
      "室友顺手带回了我的快递。",
      "今天不必跋山涉水寻找一个塑料袋。"
    ],
    "delta": [
      -3,
      2,
      1
    ],
    "actions": null,
    "condition": null
  },
  {
    "id": "wifi",
    "title": "校园网替我断舍离",
    "lines": [
      "校园网掉线，唯一能打开的是缴费页面。",
      "原来互联网的尽头是财务处。"
    ],
    "delta": [
      2,
      -6,
      0
    ],
    "actions": [
      "surf",
      "magic"
    ],
    "condition": null
  },
  {
    "id": "comment",
    "title": "评论发送失败",
    "lines": [
      "刚写好的长篇回复没发出去。",
      "系统替我保留了最后一点神秘感。"
    ],
    "delta": [
      2,
      -7,
      0
    ],
    "actions": [
      "surf",
      "magic"
    ],
    "condition": null
  },
  {
    "id": "battery",
    "title": "手机电量发出辞职信",
    "lines": [
      "电量只剩一点，充电线还在床底。",
      "和网络和解的第一步：懒得弯腰。"
    ],
    "delta": [
      -1,
      -5,
      1
    ],
    "actions": [
      "surf",
      "magic"
    ],
    "condition": null
  },
  {
    "id": "ads",
    "title": "大师也要开会员",
    "lines": [
      "秘法看到关键处，弹出付费解锁。",
      "宇宙真理有点贵，先恢复唯物主义。"
    ],
    "delta": [
      -2,
      -7,
      0
    ],
    "actions": [
      "magic"
    ],
    "condition": null
  },
  {
    "id": "fact",
    "title": "辟谣比施法快",
    "lines": [
      "刚收藏的神秘理论，被原作者亲自辟谣了。",
      "魔法消失了。浏览记录没有。"
    ],
    "delta": [
      3,
      -6,
      0
    ],
    "actions": [
      "magic"
    ],
    "condition": null
  },
  {
    "id": "clip",
    "title": "三分钟讲完一生",
    "lines": [
      "短视频给我安排好了从入学到退休的人生。",
      "谢谢，先让我决定今晚吃什么。"
    ],
    "delta": [
      -2,
      -4,
      0
    ],
    "actions": [
      "surf"
    ],
    "condition": null
  },
  {
    "id": "meme",
    "title": "学术型表情包",
    "lines": [
      "群里出现了一张精准描述复习现状的图。",
      "收藏。这个知识点我永远不会忘。"
    ],
    "delta": [
      -3,
      3,
      0
    ],
    "actions": [
      "surf"
    ],
    "condition": null
  },
  {
    "id": "pillow",
    "title": "枕头谈判成功",
    "lines": [
      "枕头同意短期续约，不要求终身雇佣。",
      "醒了。劳动关系暂时解除。"
    ],
    "delta": [
      -3,
      -2,
      3
    ],
    "actions": [
      "rest"
    ],
    "condition": null
  },
  {
    "id": "alarm",
    "title": "闹钟客串反派",
    "lines": [
      "闹钟响了，我竟然一次就坐起来了。",
      "今天的奇迹额度可能用在这里了。"
    ],
    "delta": [
      -1,
      4,
      1
    ],
    "actions": [
      "rest"
    ],
    "condition": null
  },
  {
    "id": "neighbor",
    "title": "午睡配套装修",
    "lines": [
      "楼上准时开钻，提供免费的清醒服务。",
      "谢谢，差评会在醒来后补上。"
    ],
    "delta": [
      4,
      2,
      -2
    ],
    "actions": [
      "rest"
    ],
    "condition": null
  },
  {
    "id": "rain",
    "title": "散步附赠洗头",
    "lines": [
      "天气预报说没有雨。雨表示没收到通知。",
      "回来擦干头发。今天的世界观有点潮。"
    ],
    "delta": [
      2,
      -4,
      -2
    ],
    "actions": [
      "go_out"
    ],
    "condition": null
  },
  {
    "id": "wind",
    "title": "风替我翻页",
    "lines": [
      "风把脑子里那张吵闹的页面翻了过去。",
      "没有学到知识，但卸载了几个烦恼。"
    ],
    "delta": [
      -3,
      -3,
      2
    ],
    "actions": [
      "go_out"
    ],
    "condition": null
  },
  {
    "id": "flower",
    "title": "路边野花不参加排名",
    "lines": [
      "花开得很认真，没见它交周报。",
      "羡慕一种没有绩点的光合作用。"
    ],
    "delta": [
      -4,
      2,
      1
    ],
    "actions": [
      "go_out"
    ],
    "condition": null
  },
  {
    "id": "seat",
    "title": "自习位预约失败",
    "lines": [
      "预约系统提醒：请合理安排学习时间。",
      "好的，先安排一下没座位的时间。"
    ],
    "delta": [
      3,
      -5,
      0
    ],
    "actions": [
      "study"
    ],
    "condition": null
  },
  {
    "id": "notes",
    "title": "学霸笔记像加密文件",
    "lines": [
      "借到一份笔记，字迹工整，内容拒绝访问。",
      "我可能需要先选修“学霸语入门”。"
    ],
    "delta": [
      3,
      -4,
      0
    ],
    "actions": [
      "study"
    ],
    "condition": null
  },
  {
    "id": "solution",
    "title": "答案写着显然",
    "lines": [
      "解答只有两个字：显然。",
      "显然，我是这个显然的例外。"
    ],
    "delta": [
      4,
      -4,
      0
    ],
    "actions": [
      "study"
    ],
    "condition": null
  },
  {
    "id": "breakthrough",
    "title": "公式终于接上信号",
    "lines": [
      "卡住的思路突然通了。",
      "不是宇宙真理，是这道题。先庆祝这么多。"
    ],
    "delta": [
      -4,
      3,
      0
    ],
    "actions": [
      "study"
    ],
    "condition": null
  },
  {
    "id": "pen",
    "title": "笔没水了脑子也没了",
    "lines": [
      "笔芯罢工。我尊重劳动者的合法休息。",
      "换了一支笔。脑子暂时没有替换装。"
    ],
    "delta": [
      1,
      -3,
      0
    ],
    "actions": [
      "study"
    ],
    "condition": null
  },
  {
    "id": "period",
    "title": "本月例行维护",
    "lines": [
      "生理期来报到，小腹先替我按了暂停。",
      "日程表没留空，身体自己加了一行。"
    ],
    "delta": [
      2,
      -4,
      -3
    ],
    "actions": null,
    "condition": "period"
  },
  {
    "id": "warm",
    "title": "热水袋正式入职",
    "lines": [
      "热水袋接管了今天的部分后勤工作。",
      "我负责缓一缓，它负责暖一暖。"
    ],
    "delta": [
      -3,
      -2,
      3
    ],
    "actions": [
      "rest"
    ],
    "condition": "periodCare"
  },
  {
    "id": "friendcare",
    "title": "室友投递关怀包",
    "lines": [
      "室友递来需要的用品，还把窗帘拉好了。",
      "友情没有绩点，含金量倒是挺高。"
    ],
    "delta": [
      -4,
      1,
      2
    ],
    "actions": null,
    "condition": "periodCare"
  },
  {
    "id": "romance",
    "title": "消息提示音突然特殊",
    "lines": [
      "他发来一句“回去了吗”。",
      "只是普通问候。普通到我读了三遍。"
    ],
    "delta": [
      -3,
      3,
      0
    ],
    "actions": [
      "go_out"
    ],
    "condition": "romance"
  },
  {
    "id": "restchain",
    "title": "待办事项学会繁殖",
    "lines": [
      "昨天挪到今天的任务，又准备搬家了。",
      "我的计划没有拖延，只是在巡回演出。"
    ],
    "delta": [
      3,
      -4,
      0
    ],
    "actions": [
      "rest"
    ],
    "condition": "restchain"
  },
  {
    "id": "feedchain",
    "title": "收藏夹发来年终总结",
    "lines": [
      "收藏夹说：你收藏得很好，下次别收藏了。",
      "知识住进去了，我还没办入住。"
    ],
    "delta": [
      2,
      -5,
      0
    ],
    "actions": [
      "surf"
    ],
    "condition": "feedchain"
  },
  {
    "id": "magicchain",
    "title": "草稿比论文还长",
    "lines": [
      "回复框里的字数已经超过本周笔记。",
      "知识没有增加，标点符号很激动。"
    ],
    "delta": [
      3,
      -6,
      0
    ],
    "actions": [
      "magic"
    ],
    "condition": "magicchain"
  },
  {
    "id": "deadline",
    "title": "期末倒计时刷新",
    "lines": [
      "日历又翻了一页，课本还是那张熟悉的脸。",
      "它很专一。我很抱歉。"
    ],
    "delta": [
      3,
      -4,
      0
    ],
    "actions": null,
    "condition": "late"
  },
  {
    "id": "library",
    "title": "闭馆广播已上线",
    "lines": [
      "图书馆开始播放闭馆音乐。",
      "这是今天唯一准时下班的知识。"
    ],
    "delta": [
      2,
      -3,
      1
    ],
    "actions": [
      "study"
    ],
    "condition": "late"
  },
  {
    "id": "snack",
    "title": "夜宵救援小队",
    "lines": [
      "一小份夜宵抵达，肚子结束了抗议。",
      "先补给，再讨论拯救学期。"
    ],
    "delta": [
      -2,
      2,
      3
    ],
    "actions": null,
    "condition": "night"
  }
];
function eligible(c,s,a){const day=Math.floor(s.turn/3)+1;const period=s.history.find(h=>h.eventId==='period');if(c.actions&&!c.actions.includes(a))return false;if(s.history.slice(-5).some(h=>h.eventId===c.id))return false;switch(c.condition){case 'period':return day>=3&&!period;case 'periodCare':return !!period&&day-Math.ceil(period.turn/3)<=2;case 'romance':return s.chains.go_out.stage>0;case 'restchain':return s.chains.rest.stage>0;case 'feedchain':return s.chains.surf.stage>0;case 'magicchain':return s.chains.magic.stage>0;case 'late':return day>=10;case 'night':return s.turn%3===2;default:return true;}}
function pool(s,a){return CARDS.filter(c=>eligible(c,s,a)).map(c=>({card:c,weight:(c.actions?1.6:1)*(c.delta[1]<0?(s.stats.E>=65?2.5:s.stats.E<=30?.18:1):c.delta[1]>0?(s.stats.E<=30?3:s.stats.E>=65?.35:1):1)}));}
function draw(s,a,roll){const candidates=pool(s,a);let r=roll()*candidates.reduce((n,c)=>n+c.weight,0);for(const c of candidates){r-=c.weight;if(r<0)return c.card;}return candidates.at(-1).card;}
return {CARDS,pool,draw};});
