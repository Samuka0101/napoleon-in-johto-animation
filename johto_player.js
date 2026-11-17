const $=id=>document.getElementById(id);
const stage=$('stage'), seek=$('seek'), captions=$('caption'), chapters=$('chapters');
const title=$('scene-title'), act=$('scene-act'), move=$('move'), cover=$('cover');
const worldLayers=[$('distance'),$('middle'),$('foreground'),$('powers')];
$('defs').innerHTML=svgDefs+'<linearGradient id="sky" x2="0" y2="1"><stop id="sky-a"/><stop id="sky-b" offset="1"/></linearGradient>';
const timeline=[];
let runtime=0;
for (const [number,chapter] of story.entries()){
 chapter.start=runtime;
 for(const [shot,item] of chapter.lines.entries()){
  const [text,cue]=Array.isArray(item)?item:[item,null];
  const words=text.split(/\s+/);
  const pages=[];
  for(let first=0;first<words.length;){
   let last=Math.min(first+12,words.length);
   if(last<words.length){
    for(let k=last;k>=first+6;k--){
     if(/[,.!?;:][”"]?$/.test(words[k-1])){last=k;break;}
    }
   }
   pages.push({first,last,text:words.slice(first,last).join(' ')});
   first=last;
  }
  const duration=Math.max(4.5,words.length*.411+1.8+(cue?1.3:0));
  timeline.push({text,cue,words,pages,duration,start:runtime,end:runtime+duration,number,shot});
  runtime+=duration;
 }
}
function timestamp(t){return Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');}
seek.max=String(runtime);
for(const [i,s] of story.entries()){
 const option=document.createElement('option');
 option.value=i;
 option.textContent=timestamp(s.start)+'  '+s.title;
 chapters.appendChild(option);
}
$('duration').textContent=timestamp(runtime);
$('progress-total').textContent=timestamp(runtime);
const synth=window.speechSynthesis;
let position=0, running=false, voiceEnabled=true, soundEnabled=true, showCaptions=true;
let active=-1, chapter=-1, painted=NaN, previousTime=0, speech=null, nextWord=null;
let rigs=[], wingRigs=[], flames=[], actors=[], lastFx=0, lastCue='', lastMove='', fxBucket=-1;
let audio=null, audioGain=null, ambGain=null, hum=null;
function startAudio(){
 if(!soundEnabled)return;
 const Context=window.AudioContext||window.webkitAudioContext;
 if(!Context)return;
 if(!audio){
  audio=new Context();
  audioGain=audio.createGain(); audioGain.gain.value=Number($('volume').value);
  audioGain.connect(audio.destination);
  ambGain=audio.createGain();ambGain.gain.value=0;ambGain.connect(audioGain);
  hum=[55,82.41,110].map((f,i)=>{
   const tone=audio.createOscillator(), weight=audio.createGain();
   tone.type=i===1?'triangle':'sine';tone.frequency.value=f;
   weight.gain.value=[.42,.17,.11][i];tone.connect(weight).connect(ambGain);tone.start();
   return tone;
  });
 }
 audio.resume().catch(()=>{});
 setAmbience();
}
function setAmbience(){
 if(!audio)return;
 const roots=[55,65.41,49,58.27,43.65];
 const i=Math.floor(Math.max(0,chapter)/5)%roots.length;
 for(const [j,n] of hum.entries())n.frequency.setTargetAtTime(roots[i]*[1,1.5,2][j],audio.currentTime,.65);
 ambGain.gain.setTargetAtTime(running&&soundEnabled ? .034 : 0,audio.currentTime,.2);
}
function soundCue(cue){
 if(!audio||!soundEnabled||!running||!attacks[cue])return;
 const type=attacks[cue].type, now=audio.currentTime;
 const length=type==='sacred'?1.15:.6;
 const source=audio.createOscillator(), gain=audio.createGain(), filter=audio.createBiquadFilter();
 source.type=type==='electric'?'triangle':'sine';
 const pitch={electric:380,fire:115,wind:144,iron:213,mind:328,sacred:493}[type];
 source.frequency.setValueAtTime(pitch,now);source.frequency.exponentialRampToValueAtTime(type==='sacred'?pitch*1.45:pitch*.57,now+length);
 filter.type='lowpass';filter.frequency.value=type==='electric'?1800:1000;
 gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.064,now+.09);gain.gain.exponentialRampToValueAtTime(.0001,now+length);
 source.connect(filter).connect(gain).connect(audioGain);source.start(now);source.stop(now+length+.01);
 source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect()};
}
function clearSpeech(){
 if(speech)speech.onend=speech.onerror=speech.onboundary=null;
 if(synth)synth.cancel();
 speech=null;nextWord=null;
}
function speak(clip){
 if(!synth||!voiceEnabled||typeof SpeechSynthesisUtterance==='undefined')return;
 const speechVoices=synth.getVoices();
 const pt=speechVoices.find(v=>v.lang.toLowerCase()==='pt-br')||speechVoices.find(v=>v.lang.toLowerCase().startsWith('pt'));
 if(speechVoices.length&&!pt){$('voice-note').hidden=false;return;}
 const base=Math.min(clip.words.length-1,Math.floor(clip.words.length*clamp((position-clip.start)/clip.duration,0,.95)));
 const u=new SpeechSynthesisUtterance(clip.words.slice(base).join(' '));
 if(pt)u.voice=pt;
 u.lang=pt?.lang||'pt-BR';u.rate=1.02;u.pitch=.88;u.volume=Number($('volume').value);
 speech=u;nextWord=null;
 u.onboundary=e=>{
  if(speech===u&&e.name==='word')nextWord=base+(e.charIndex===0?0:u.text.slice(0,e.charIndex).trim().split(/\s+/).length);
 };
 u.onend=u.onerror=()=>{if(speech===u){speech=null;nextWord=clip.words.length-1;}};
 try{if(synth.paused)synth.resume();synth.speak(u);}catch{speech=null;$('voice-note').hidden=false;}
}
function paintChapter(number){
 chapter=number;
 const s=story[number],art=sceneArt(s.set);
 $('sky-a').setAttribute('stop-color',art.a);$('sky-b').setAttribute('stop-color',art.b);
 $('distance').innerHTML=art.back;$('middle').innerHTML=art.middle;$('foreground').innerHTML=art.front;
 $('powers').innerHTML='';$('air').innerHTML='';
 rigs=[...$('film').querySelectorAll('[data-anim]')].map(el=>({el,mode:el.dataset.anim,phase:Number(el.dataset.phase)||0}));
 wingRigs=[...$('film').querySelectorAll('[data-wing]')];flames=[...$('film').querySelectorAll('[data-brasa-flame]')];
 actors=[...$('film').querySelectorAll('[data-actor]')];
 act.textContent=s.act;title.textContent=s.title;chapters.value=String(number);
 fxBucket=-1;setAmbience();
}
function updateRigs(t,cue,amount){
 for(const {el,mode,phase} of rigs){
  const a=t+phase,w=Math.sin(a*1.9),b=Math.sin(a*.8);
  let m='';
  switch(mode){
  case 'breathe':m='translate('+(b*.8)+' '+(w*.83)+')';break;
  case 'head':m='rotate('+(w*1.23)+' 0 -10)';break;
  case 'walk':m='translate('+(Math.sin(a*.55)*7)+' '+(Math.abs(Math.sin(a*5))*3)+') rotate('+(w*1.3)+')';break;
  case 'cloth':m='rotate('+(w*4.1)+' -22 0)';break;
  case 'sway':m='rotate('+(b*7)+' 0 -15)';break;
  case 'float':m='translate(0 '+(w*5+(cue==='mind'?-amount*7:0))+') rotate('+(b*3)+')';break;
  case 'flicker':m='scale('+(1+w*.09)+' '+(1+Math.sin(a*11)*.1)+')';break;
  case 'hop':m='translate('+(w*2)+' '+(-Math.pow(Math.max(0,w),4)*7)+')';break;
  case 'fly':m='translate('+(Math.sin(a*.44)*26)+' '+(Math.sin(a*1.66)*10)+') rotate('+(Math.sin(a*1.22)*6)+')';break;
  case 'cloud':m='translate('+(Math.sin(a*.08)*35)+' '+(b*2)+')';break;
  case 'mist':m='translate('+(Math.sin(a*.14)*30)+' 0)';break;
  case 'river':m='translate('+(Math.sin(a*.91)*10)+' 0)';break;
  case 'foreground':m='translate('+(w*3)+' 0)';break;
  }
  if(m)el.setAttribute('transform',m);
 }
 for(const wing of wingRigs){
  const n=Number(wing.dataset.wing);
  wing.setAttribute('transform','rotate('+(n*(14*Math.sin(t*4.1)+3*Math.sin(t*7.2)))+')');
 }
 for(const flame of flames){
  flame.setAttribute('opacity',String(.22+.11*Math.sin(t*9)+(cue==='ember'?amount*.64:0)));
  flame.setAttribute('transform','translate(0 '+(Math.sin(t*11)*1.4)+')');
 }
 const attacker={pikachu:'pikachu',electric:'pikachu',ember:'brasa',fire:'arcanine',gust:'pidgeotto',wind:'pidgeot',iron:'steelix',tail:'steelix',mind:'alakazam'}[cue];
 for(const el of actors){
  const launch=el.dataset.actor===attacker ? amount : 0;
  const recoil=cue==='gust'&&el.dataset.actor==='brasa' ? amount : 0;
  const ending=el.dataset.actor==='hooh'&&story[chapter].set==='horizon';
  const departure=ending?ease((t-25)/19):0;
  el.setAttribute('opacity',String(1-departure));
  el.setAttribute('transform','translate('+(launch*6-recoil*13+departure*165)+' '+(-launch*3+recoil*2-departure*81)+') rotate('+(launch*-4+recoil*12)+') scale('+(el.dataset.flip?-1:1)+' 1)');
 }
}
function paint(t,force=false){
 if(!force&&t===painted)return;
 painted=t;
 let i=timeline.findIndex(c=>t<c.end);
 if(i<0)i=timeline.length-1;
 const c=timeline[i];
 if(c.number!==chapter)paintChapter(c.number);
 if(i!==active){
  clearSpeech();active=i;lastCue='';
  if(running)speak(c);
 }
 const key=story[c.number].set;
 const elapsed=t-c.start,p=clamp(elapsed/c.duration),local=t-story[c.number].start;
 const fxStart=c.cue?Math.min(4,c.duration*.22):0;
 const effectTime=elapsed-fxStart, fxDuration=c.cue&&attacks[c.cue].type==='sacred'?7.2:4.1;
 const hasEffect=Boolean(c.cue&&effectTime>=0&&effectTime<fxDuration);
 const amount=hasEffect?ease(effectTime/.25)*(1-ease((effectTime-fxDuration*.54)/(fxDuration*.46))):0;
 const focus=c.shot%4;
 const wide=['storm','bridge','phoenix','horizon','route','stair'].includes(key);
 const zoom=1.035+(focus===1?.21:focus===2?.123:focus===3?.075:0)+(wide?-.048:0)+p*.047;
 const cameraX=(focus===1?-5:focus===2?5:0)+Math.sin(local*.15)*2.8;
 const cameraY=(focus===1?10:focus===3?-6:3)-(['gym','rematch','route','starter'].includes(key)?10:0);
 for(const [j,el] of worldLayers.entries()){
  const depth=[.45,1,1.48,1][j];
  el.setAttribute('transform','translate('+(180+cameraX*depth)+' '+(397+cameraY*depth)+') scale('+zoom+') translate(-180 -397)');
 }
 updateRigs(local,hasEffect?c.cue:null,amount);
 if(hasEffect&&lastCue!==c.cue){lastCue=c.cue;if(running)soundCue(c.cue);}
 const bucket=Math.floor(t*22);
 if(bucket!==fxBucket||force){
  fxBucket=bucket;
  $('powers').innerHTML=hasEffect?powerFx(c.cue,effectTime,fxDuration):'';
  $('air').innerHTML=ambient(key,local);
 }
 const newMove=hasEffect?c.cue:'';
 if(newMove!==lastMove){
  lastMove=newMove;
  if(newMove){
   const a=attacks[newMove];
   $('move-owner').textContent=a.owner;$('move-name').textContent=a.name;
   move.style.setProperty('--power',a.color);
  }
  move.classList.toggle('live',!!newMove);
 }
 move.style.opacity=hasEffect?String(Math.min(1,amount*1.5)):'0';
 stage.style.setProperty('--cut',String(local<.55?.58*(1-ease(local/.55)):0));
 title.style.opacity=local<5.5?String(1-ease((local-3.9)/1.6)):'0';
 const guessed=Math.floor(c.words.length*clamp(p,0,.999));
 const at=Math.min(c.words.length-1,nextWord??guessed);
 const line=c.pages.find(page=>at<page.last).text;
 if(captions.textContent!==line)captions.textContent=line;
 seek.value=String(t);$('now').textContent=timestamp(t);
 seek.style.setProperty('--progress',(100*t/runtime).toFixed(2)+'%');
}
function syncControls(){
 $('play').textContent=running?'❚❚':'▶';
 $('play').setAttribute('aria-label',running?'Pausar':'Reproduzir');
 stage.classList.toggle('paused',!running);
 setAmbience();
}
function toggle(){
 if(position>=runtime){position=0;active=-1;}
 running=!running;cover.hidden=true;
 if(running){
  startAudio();
  if(synth?.paused&&speech)synth.resume();
  else if(!speech&&active>=0)speak(timeline[active]);
 }else if(synth&&speech)synth.pause();
 syncControls();paint(position,true);
}
function jump(time){
 clearSpeech();active=-1;position=clamp(time,0,runtime-.001);cover.hidden=true;
 paint(position,true);
}
function frame(now){
 const dt=previousTime?Math.min(.095,(now-previousTime)/1000):0;previousTime=now;
 if(running){
  let target=Math.min(runtime,position+dt);
  const c=timeline[active];
  if(c&&speech&&target>=c.end&&voiceEnabled){
   lastFx+=dt;
   if(lastFx<7)target=c.end-.0001;
   else{clearSpeech();lastFx=0;}
  }else lastFx=0;
  position=target;
  if(position>=runtime){
   running=false;clearSpeech();syncControls();cover.hidden=false;
   $('cover-label').textContent='O LIMITE DO PODER';$('begin').textContent='↻ Assistir novamente';
  }
  paint(position);
 }
 requestAnimationFrame(frame);
}
$('play').onclick=$('begin').onclick=toggle;
seek.oninput=()=>jump(Number(seek.value));
chapters.onchange=()=>jump(story[Number(chapters.value)].start+.001);
$('voice').onclick=()=>{
 voiceEnabled=!voiceEnabled;clearSpeech();
 $('voice').setAttribute('aria-pressed',String(voiceEnabled));$('voice').textContent=voiceEnabled?'Voz ligada':'Voz desligada';
 if(running&&voiceEnabled)speak(timeline[active]);
};
$('ambience').onclick=()=>{
 soundEnabled=!soundEnabled;
 $('ambience').setAttribute('aria-pressed',String(soundEnabled));$('ambience').textContent=soundEnabled?'Som ligado':'Som desligado';
 if(running&&soundEnabled)startAudio();setAmbience();
};
$('subtitles').onclick=()=>{
 showCaptions=!showCaptions;captions.hidden=!showCaptions;$('subtitles').setAttribute('aria-pressed',String(showCaptions));
};
$('volume').oninput=()=>{
 if(audioGain)audioGain.gain.setTargetAtTime(Number($('volume').value),audio.currentTime,.07);
 if(running&&speech){clearSpeech();speak(timeline[active]);}
};
document.addEventListener('keydown',e=>{
 if(e.code==='Space'&&e.target===document.body){e.preventDefault();toggle();}
 if(e.code==='Escape'&&running)toggle();
});
window.addEventListener('pagehide',()=>{clearSpeech();if(audio)audio.suspend().catch(()=>{});});
paint(0,true);requestAnimationFrame(frame);

