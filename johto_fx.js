const attacks={
 pikachu:{name:'Choque do Trovão',owner:'Pikachu',color:'#a5efff',type:'electric',x:265,y:491,dx:-112,dy:-46},
 electric:{name:'Choque do Trovão',owner:'Pikachu',color:'#b8f9ff',type:'electric',x:237,y:498,dx:32,dy:-52},
 ember:{name:'Brasas',owner:'Cyndaquil · Brasa',color:'#ffb374',type:'fire',x:187,y:515,dx:65,dy:-83},
 fire:{name:'Lança-Chamas',owner:'Arcanine',color:'#ffad71',type:'fire',x:208,y:506,dx:120,dy:-33},
 gust:{name:'Rajada de Vento',owner:'Pidgeotto',color:'#dedbf7',type:'wind',x:225,y:344,dx:-64,dy:137},
 wind:{name:'Rajada de Vento',owner:'Pidgeot',color:'#c6f5ee',type:'wind',x:172,y:328,dx:52,dy:150},
 iron:{name:'Resgate na correnteza',owner:'Machamp e Steelix',color:'#e7e0dc',type:'iron',x:222,y:507,dx:86,dy:-61},
 tail:{name:'Cauda de Ferro',owner:'Steelix',color:'#e2efff',type:'iron',x:227,y:503,dx:-73,dy:-80},
 mind:{name:'Confusão',owner:'Alakazam',color:'#e3b5ff',type:'mind',x:191,y:475,dx:0,dy:-92},
 sacred:{name:'Ho-Oh',owner:'Aparição lendária',color:'#ffe8a6',type:'sacred',x:180,y:279,dx:0,dy:0},
 horizon:{name:'Ho-Oh',owner:'No horizonte',color:'#ffe8a6',type:'sacred',x:265,y:260,dx:0,dy:0}
};
function clamp(x,a=0,b=1){return Math.max(a,Math.min(b,x))}
function ease(x){const u=clamp(x);return u*u*(3-2*u)}
function lightning(x,y,dx,dy,seed){
 let d='M'+x+' '+y;
 for(let i=1;i<=8;i++){const u=i/8;d+='L'+(x+dx*u+(i===8?0:(rand(i,seed)-.5)*31)).toFixed(1)+' '+(y+dy*u+(i===8?0:(rand(i,seed+9)-.5)*23)).toFixed(1);}
 return d;
}
function powerFx(cue,t,duration){
 const a=attacks[cue];if(!a||t<0||t>duration)return '';
 const u=clamp(t/duration), fade=ease(t/.27)*(1-ease((t-duration*.63)/(duration*.37)));
 const {x,y,dx,dy,color,type}=a, pulse=.84+.16*Math.sin(t*15);
 let v='';
 if(type==='electric'){
   v=E(x+dx*.5,y+dy*.5,90,65,'url(#ice)','opacity=".79"')+
   row(3,i=>{const z=lightning(x,y,dx,dy,1+Math.floor(t*10)+i*5);return L(z,'#64bdff',7-i, .26)+L(z,i?'#93dbff':'#f0fdff',i?1.25:2.55,pulse);})+
   row(15,i=>{const w=(u+i/15)%1;return E(x+dx*w+(rand(i,15)-.5)*34,y+dy*w+(rand(i,5)-.5)*38,1.35,1.35,'#e8faff')});
 }else if(type==='fire'){
   const spread=cue==='ember'?.62:1;
   v=E(x+dx*.48,y+dy*.48,112*spread,72*spread,'url(#hot)','opacity=".83"')+
   row(26,i=>{const p=(t*(.61+rand(i,6)*.65)+i*.097)%1;const f=spread*(1-p*.62)*(4+rand(i,1)*13);const a=(rand(i,2)-.5)*43*p;return E(x+dx*p,y+dy*p+a-f*.45,f*1.63,f,['#ff8a57','#f4ba72','#ffe3a2','#cb5449'][i%4],'opacity="'+((1-p)*.83)+'"');})+
   L('M'+x+' '+y+'q'+(dx*.32)+' '+(dy*.15-12)+' '+(dx*.54)+' '+(dy*.52),'#fff0b3',3,pulse);
 }else if(type==='wind'){
   v=row(9,i=>{const p=(t*.8+i*.14)%1;const sx=x+dx*p-74,sy=y+dy*p;return L('M'+sx+' '+sy+'q48-23 135-11','#eff5f3',1.2+(i%3)*.8,(1-p)*.64);})+
   row(17,i=>{const p=(t*.56+i*.115)%1;return E(x+dx*p+(rand(i,5)-.5)*133,y+dy*p+(rand(i,11)-.5)*56,3+rand(i,17)*6,.8,'#f5deb8','opacity=".39"');});
 }else if(type==='mind'){
   v=E(x,y-22,99,77,'url(#violet)')+
   row(5,i=>{const p=(t*.48+i*.2)%1;return E(x,y-18,12+87*p,6+47*p,'none','stroke="'+color+'" stroke-width="1.8" opacity="'+((1-p)*.82)+'"');})+
   row(7,i=>E(x+Math.cos(i*.9+t*2.6)*63,y-23+Math.sin(i*.9+t*2.6)*34,2.4,2.4,'#fff2ff'));
 }else if(type==='iron'){
   v=E(x+dx*.6,y+dy*.6,77,57,'url(#ice)','opacity=".35"')+
   L('M'+(x-62)+' '+(y+24)+'q46 2 '+(dx+71)+' '+(dy-17),'#e8e8ed',6*(1-u)+1,.74)+
   row(24,i=>{const p=(t*.62+i*.12)%1,angle=rand(i,35)*Math.PI*2;return L('M'+(x+dx*.55+Math.cos(angle)*p*92)+' '+(y+dy*.6+Math.sin(angle)*p*63)+'l'+(Math.cos(angle)*12*(1-p))+' '+(Math.sin(angle)*8*(1-p)),i%3?'#ffc880':'#e0eeff',1.7,(1-p)*.83);});
 }else{
   v=E(x,y,145,121,'url(#warm)','opacity=".72"')+
   row(7,i=>P('M'+(x-4+i*2)+' '+(y-30)+'L'+(x-156+i*44)+' 605h19Z','#fbe5ac','opacity="'+(.018+.017*Math.sin(t+i))+'"'))+
   row(27,i=>{const p=(t*.17+i*.097)%1;return E(x+(rand(i,21)-.5)*290,y+185*p,1+rand(i,8)*2,.7+rand(i,1)*1.6,['#ffeba6','#ed996e','#c6a7e8'][i%3],'opacity="'+(1-p)+'"');});
 }
 return G(v,'opacity="'+fade.toFixed(3)+'"');
}
function ambient(key,t){
 const rain=['storm','bridge','docks','raid'].includes(key);
 const sx=key==='storm'?t*166:t*127;
 return (rain?row(50,i=>{const x=(rand(i,74)*420-sx*.28)%420+20,y=(rand(i,9)*700+sx)%700-35;return L('M'+x.toFixed(1)+' '+y.toFixed(1)+'l-11 27','#c4d5ef',.8+rand(i,6),.18+rand(i,13)*.3);}) :
 row(23,i=>{const x=(rand(i,31)*365+t*(i%2?4:9))%365,y=(rand(i,91)*600+Math.sin(t*.7+i)*15+4*t)%605;return E(x.toFixed(1),y.toFixed(1),i%4?1:1.75,i%4?.85:1.4,'#f6d89d','opacity="'+(.09+rand(i,24)*.28)+'"');}))+
 (key==='storm'&&Math.sin(t*.77)>.995?G(L(lightning(241,39,-59,346,2),'#c9c9ff',6,.55)+L(lightning(241,39,-59,346,2),'#f4f0ff',2.2,.83)+R(0,0,360,640,'#d5c8f3','opacity=".12"')):'');
}

