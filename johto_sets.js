const palettes={
 storm:['#161a38','#735b78','#344057','#312b46'],arrival:['#213a52','#df9a69','#52715f','#42564c'],creek:['#243649','#929779','#52655e','#3b5150'],shelter:['#222b47','#ac7f69','#49566b','#424b46'],village:['#344458','#ebb479','#677b66','#635848'],lab:['#27394b','#c4926f','#566766','#44394a'],starter:['#2b3f53','#d9a376','#52655d','#4e4149'],route:['#294b66','#efbc81','#5f876a','#627653'],gym:['#333d59','#d6a178','#6f777d','#69544f'],rematch:['#43516b','#f0b77c','#858080','#6b5a51'],letter:['#151c37','#786679','#394763','#4b3741'],market:['#3a5269','#ebbb87','#61786c','#665b4e'],fire:['#2a364d','#e5a071','#656e71','#694c50'],bridge:['#182842','#858fa0','#4f6074','#394552'],strategy:['#232746','#ad807c','#5a596e','#4c3c50'],ruins:['#2b3953','#ad9290','#5d6a75','#544a56'],docks:['#141f39','#6a708b','#3e4b6a','#302d49'],raid:['#181e34','#856078','#4a4664','#473846'],council:['#303950','#dca179','#626779','#624a52'],stair:['#303a55','#e7a981','#6b6c83','#6b504e'],phoenix:['#3b3a62','#ffc584','#87777e','#534b58'],works:['#395770','#e8c38f','#687c6d','#6d6957'],choice:['#292740','#9c6872','#5a586b','#533c47'],vote:['#3a475f','#e2b284','#7d787a','#6e5b55'],horizon:['#22375d','#f2b788','#807b8a','#505a60']
};
function row(n,fn){return many(n,fn)}
function rand(i,seed=1){const s=Math.sin(i*127.1+seed*331.3)*43758.5453123;return s-Math.floor(s)}
function rig(body,x,y,s=1,mode='breathe',phase=0){
 return G(G(body,'data-anim="'+mode+'" data-phase="'+phase+'"'),'transform="translate('+x+' '+y+') scale('+s+')"');
}
const shadow=(x,y,w)=>E(x,y,w,w*.17,'#131b2e','opacity=".35"');
function nap(x,y,s=1,face='stern',hat=true,pose='breathe'){
 return shadow(x,y+s*163,Math.abs(s)*34)+rig(rig(cape,-4,0,1,'cloth')+uniform+rig(napHead(face,hat),0,0,1,'head'),x,y,s,pose);
}
function ally(id,x,y,s=1){return shadow(x,y+s*130,s*32)+rig(person(id),x,y,s,'breathe',x*.05)}
function animal(kind,x,y,s=1,pose='breathe',flip=false){
 const bodies={pikachu:pika,brasa,leafling,croc,arcanine:dog,steelix:iron,alakazam:mind,machamp:mach,sentret};
 const body=kind==='brasa'?bodies[kind]+G(P('M-22 10Q-39-7-35-25Q-28-16-23-37Q-15-23-13-14Q-10-22-7-25Q4-11-10 6Z','#e98256')+P('M-23 5Q-33-7-23-19Q-20-11-13-17Q-9-5-16 4Z','#ffcd7d'),'data-brasa-flame="" opacity=".30"'):bodies[kind];
 return shadow(x,y+s*31,s*(kind==='steelix'?70:28))+rig(G(body,'data-actor="'+kind+'"'+(flip?' data-flip="true"':'')),x,y,s,pose,x*.04);
}
const prop=(id,x,y,s=1,mode='still')=>rig(U(id),x,y,s,mode);
const bird=(type,x,y,s)=>rig(G(wings(type),'data-actor="'+type+'"'),x,y,s,'fly');
function roof(x,y,w,h){
 return P('M'+x+' '+(y+h)+'Q'+(x+w*.2)+' '+(y+h*.64)+' '+(x+w*.43)+' '+y+'L'+(x+w*.57)+' '+y+'Q'+(x+w*.8)+' '+(y+h*.64)+' '+(x+w)+' '+(y+h)+'Q'+(x+w*.5)+' '+(y+h*1.32)+' '+x+' '+(y+h)+'Z','url(#tile)','stroke="#283043" stroke-width="1.15"')+
 L('M'+(x+8)+' '+(y+h*.93)+'Q'+(x+w*.5)+' '+(y+h*1.13)+' '+(x+w-8)+' '+(y+h*.93),'#c6ad91',.85,.55)+
 row(9,i=>L('M'+(x+w*(.44+i*.015))+' '+(y+2)+'Q'+(x+w*(.31+i*.047))+' '+(y+h*.64)+' '+(x+w*(.08+i*.105))+' '+(y+h*1.02),'#8a91a0',.7,.55));
}
function house(x,y,s,lit=true){
 return G(R(-35,-44,70,71,'url(#wood)')+R(-31,-36,62,53,'#bb8a71')+
 row(4,i=>R(-32+i*18,-41,3,65,'#674e51'))+
 R(-24,-26,17,23,lit?'#f0b975':'#667086')+R(8,-26,17,23,lit?'#e4a672':'#5d6d85')+
 L('M-15-26v23m-9-12h17M17-26v23M8-15h17','#6b4c4b',.95)+R(-7,-8,14,34,'#504153')+
 roof(-48,-82,96,42)+R(-37,23,74,5,'#65505a'),'transform="translate('+x+' '+y+') scale('+s+')"');
}
function tower(x,y,s){
 return G(row(4,i=>{const w=70-i*12,z=-46*i;return R(-w*.36,z-9,w*.72,46,'#905b51')+R(-w*.3,z-4,w*.6,29,'#c58c67')+R(-w*.13,z-6,w*.26,34,'#463749')+L('M'+(-w*.29)+' '+(z+21)+'h'+(w*.58),'#e1a66f',1.2)+roof(-w/2,z-33,w,24);})+
 L('M0-167v-23M-6-174h12M-5-180h10','#dba875',1.6)+E(0,-190,2,3,'#dfb574'),'transform="translate('+x+' '+y+') scale('+s+')"');
}
function pine(x,y,s,c){return G(U('pine',x,y,s),'style="color:'+c+'"')}
function grass(x,y,s,c){return G(U('grass',x,y,s),'style="color:'+c+'"')}
function range(y,amp,seed,color){
 const pts=Array.from({length:18},(_,i)=>[-92+i*32,y-rand(i,seed)*amp-amp*.25*Math.sin(i*.75)]);
 let d='M'+pts[0].join(' ');for(let i=1;i<pts.length;i++){const [x,v]=pts[i], [a,b]=pts[i-1];d+=' Q'+a+' '+b+' '+((a+x)/2)+' '+((b+v)/2);}
 return P(d+'L470 720H-94Z',color)+G(row(15,i=>{const [x,v]=pts[i+1];return L('M'+(x-23)+' '+(v+29)+'l'+(12+rand(i,seed)*24)+' '+(11+rand(i,5)*36),'#e3ceac',.7,.16);}));
}
function world(key){
 const [a,b,ridge,ground]=palettes[key];const night=['storm','letter','shelter','docks','raid','choice'].includes(key);
 const light=key==='phoenix'?'#fff0af':night?'#c3c8e9':'#ffd99c';
 const trees=['storm','arrival','creek','shelter','village','route','works','horizon','fire','bridge','ruins'].includes(key);
 const seed=key.charCodeAt(0)+key.length;
 const back=E(key==='horizon'?258:246,225,124,130,'url(#warm)','opacity="'+(night?.20:.66)+'"')+
 E(246,219,night?11:24,night?11:24,light,'opacity=".76"')+
 (night?row(32,i=>E(rand(i,25)*360,70+rand(i,43)*240,.6+rand(i,1),.6+rand(i,1),'#e2d6e3','opacity=".26"')):'')+
 rig(row(8,i=>E(-70+i*78,190+rand(i,7)*143,54+rand(i,3)*51,6+rand(i,8)*10,night?'#9290ac':'#eacbb6','opacity="'+(.05+rand(i,29)*.11)+'"')),0,0,1,'cloud')+
 range(422,157,seed,ridge)+range(467,96,seed+2,ground)+
 G(row(13,i=>E(-80+i*46,436+rand(i,6)*38,51,9,'#d4cbcc','opacity=".11"')),'data-anim="mist"')+
 (trees?row(21,i=>pine(-36+i*21,479+rand(i,22)*28,.36+rand(i,11)*.5, i%2?'#384e54':'#4a5c60')):'');
 return {a,b,back,ground};
}
function terrain(c,road=false){
 return P('M-72 502Q47 453 122 473T249 476Q319 440 435 500V690H-72Z',c)+
 (road?P('M173 474Q129 514 110 546L27 680H365L239 530Q205 503 192 475Z','#a88970')+L('M177 488q-40 61-53 128M193 481q45 61 77 99','#e9ba8f',1.2,.48):'')+
 row(45,i=>{const x=rand(i,18)*440-40,y=478+rand(i,13)*180;return E(x,y,1+rand(i,6)*5,.5+rand(i,10)*1.6,i%4?'#b29b7a':'#182536','opacity=".34"');});
}
function interior(type){
 const lab=type==='lab'||type==='starter'||type==='strategy';const shade=type==='letter'||type==='choice';
 return R(-75,143,510,400,shade?'#373149':'#544350')+R(26,188,308,255,'url(#wood)')+
 R(42,204,276,211,shade?'#454963':'#ba967e')+
 row(11,i=>L('M'+(45+i*27)+' 203v213','#684c50',2,.65))+
 R(111,202,137,181,shade?'#626984':'#e8b48b')+P('M111 356q40-71 71-52 18-25 66 18v61H111Z','#6f7888')+
 L('M111 264h137m-137 58h137m-92-120v181m46-181v181','#514251',3,.9)+
 row(8,i=>L('M-70 '+(441+i*18)+'h510','#211d30',1,.38))+
 R(-70,420,500,300,'url(#wood)')+row(13,i=>L('M'+(i*47-110)+' 430 '+(i*70-140)+' 680','#936356',1,.42))+
 (lab?row(4,i=>R(255+i*12,305-i%2*8,8,36+i%2*8,['#bf9569','#80788f','#769b93','#b47565'][i])):'')+
 prop('lantern',66,249,.85,'sway');
}
function table(map=false){
 return P('M17 489 319 489 385 574-22 574Z','url(#wood)','stroke="#34283a" stroke-width="2"')+
 L('M-9 565h372M31 498h278','#c99a6d',1.4,.8)+
 (map?P('M74 505 249 501 283 548 67 550Z','url(#paper)','stroke="#d1ad86" stroke-width="1"')+
 L('M82 537q43-14 56-2t28-11 36-11 57 18M122 511l19 10 2 24','#7e775f',1.35)+
 L('M92 535 139 523 167 536 223 517 255 531','#a74e58',1.3):'');
}
function village(theme='village'){
 const n=theme==='docks'?4:5;
 return row(n,i=>house(-10+i*90,389+rand(i,36)*28,.83+rand(i,3)*.39,true))+
 L('M-12 345Q158 385 380 332','#544350',1.35)+row(7,i=>prop('lantern',13+i*55,356+Math.sin(i*.45)*14,.57,'sway'));
}
function river(){
 return P('M-60 499Q68 463 177 479T431 464V685H-60Z','url(#river)')+
 rig(row(25,i=>{const y=492+rand(i,31)*153,x=rand(i,44)*420-35;return L('M'+x+' '+y+'q16-3 '+(22+i%5*9)+'-1','#d9c7ba',.6+rand(i,17),.18+rand(i,2)*.22)}),0,0,1,'river');
}
function sceneArt(key){
 const w=world(key),base=terrain(w.ground,true);
 const Br=(x=218,y=523,s=.83)=>animal('brasa',x,y,s,'breathe');
 const open=base+pine(4,508,1.55,'#2d4047')+pine(355,513,1.82,'#293b45');
 const frame=(who)=>interior(key)+who;
 let middle='',front='';
 switch(key){
 case 'storm':
 middle=base+row(6,i=>pine(-32+i*76,483+i%2*36,1.65,'#253248'))+
 rig(P('M-70 51Q-69 17-30 22l29 1 34-40 20-6 16 9 15 7-8 16-20-2-15 29-26 14 10 49-8 4-19-39-15 3-8 29-10 3 3-44-28 28-7-1 18-38Z','#73535a','stroke="#262a3e" stroke-width="2"')+L('M-62 30q21-10 48-3l30 4m24-30 31 7M-70 48q-23 7-30-19','#c58978',2,.64)+P('M-50 22h41l-5 20-39-5Z','#8d454d')+G(uniform+napHead('shock'),'transform="translate(-15 -52) scale(.50)"')+prop('lantern',77,19,.7,'sway'),160,427,1.12,'walk');
 break;
 case 'arrival':
 middle=open+G(nap(0,0,.78,'shock',false),'transform="translate(161 472) rotate(-29)"')+animal('pikachu',267,513,.87,'hop');
 front=grass(328,590,1.9,'#536b56');
 break;
 case 'creek':
 middle=terrain(w.ground)+river()+P('M-24 530Q38 483 91 520L102 564-30 611Z','#56616a')+L('M-14 546q72-47 108-17','#b8b1a0',1.3,.62)+nap(82,425,.77,'stern',false)+row(5,i=>E(260+i*9,463+i%2*5,5,5,'#789cb6'));
 break;
 case 'shelter':
 middle=base+P('M-49 510Q9 348 97 393l32 64-33 48Z','#424054')+L('M-12 476Q25 379 92 400M21 442l31-37','#a1908b',1.35,.55)+nap(121,432,.74,'stern',false)+prop('box',187,530,.35)+animal('pikachu',271,497,.68,'breathe')+E(72,534,78,57,'url(#warm)','opacity=".56"')+rig(P('M-15 13Q-21-7-5-23L-6-7 5-32Q20-6 14 10Z','#ee995f')+P('M-7 12Q-12 0 1-14q10 19 5 26Z','#ffce81'),74,526,.68,'flicker');
 break;
 case 'village':
 middle=base+village()+nap(111,420,.82,'soft',false)+ally('nara',254,441,.66)+prop('coin',166,498,.58)+rig(P('M-58-10 58-7 51 30-49 37Z','#d9c6aa','stroke="#876e70"')+L('M-49 26 46 19','#9d8c84',1,.6),176,478,.69,'cloth');
 break;
 case 'lab':
 middle=frame(nap(101,423,.81,'shock',false)+ally('elm',259,424,.81)+table()+prop('orb',165,515,.74,'float')+animal('pikachu',236,512,.47)+R(249,476,53,40,'#252d46','rx="3" stroke="#bd9b80"')+R(254,480,43,28,'#78c4bb','opacity=".58"')+row(4,i=>L('M259 '+(486+i*5)+'h'+(9+i*5),'#c3ffdc',1.15)));
 break;
 case 'starter':
 middle=frame(nap(91,404,.83,'soft',false)+ally('elm',273,416,.74)+table()+animal('leafling',78,526,.63)+animal('croc',173,525,.66,'hop')+Br(263,522,.78));
 break;
 case 'route':
 middle=open+nap(109,418,.84,'stern',true,'walk')+ally('nara',236,432,.75)+Br(176,543,.67)+row(3,i=>animal('sentret',56+i*126,548-i%2*19,.49,'hop'))+row(14,i=>grass(-10+i*30,567+rand(i,7)*16,.72+rand(i,8)*.5,'#72855c'));
 break;
 case 'gym': case 'rematch':
 middle=interior(key)+P('M52 408h257l88 160H-30Z','#7c7278')+E(180,493,135,40,'none','stroke="#d7b998" stroke-width="1.2"')+L('M181 453v81','#d7b998',1.2)+E(181,494,23,9,'none','stroke="#d7b998" stroke-width="1.2"')+nap(68,441,.72,key==='gym'?'shock':'stern',false)+ally('falkner',294,411,.66)+Br(181,526,.88)+bird('pidgeotto',233,344,.63)+(key==='rematch'?prop('badge',310,516,.8,'float'):'');
 break;
 case 'letter':
 middle=frame(nap(132,421,.91,'soft',false)+ally('nara',265,440,.65)+table()+prop('letter',176,521,.73)+prop('lamp',292,510,.7,'flicker')+prop('box',123,532,.29));
 break;
 case 'market':
 middle=base+village()+nap(121,430,.79)+ally('host',241,426,.73)+prop('box',296,540,.7)+prop('box',48,533,.68)+Br(164,533,.49);
 break;
 case 'fire':
 middle=terrain(w.ground)+P('M265 433l30-25 48 1 40 40 7 102-112-9Z','#746273')+L('M277 445l53-23 20 25m-61 20 54 7 27 24m-88 9 39-13','#b4938c',1.7,.65)+nap(79,421,.83,'shock')+ally('nara',266,423,.62)+animal('arcanine',154,517,.81,'breathe')+Br(63,557,.45);
 break;
 case 'bridge':
 middle=river()+P('M-30 490 134 468 174 480 160 508-25 531ZM213 471 390 482V522L235 513Z','url(#wood)')+L('M-19 475 135 455m102 2 149 12','#c29676',4)+row(10,i=>L('M'+(-14+i*41)+' '+(484+Math.abs(4-i)*2)+'v28','#d19e7f',1.1,.52))+
 nap(69,407,.75)+bird('pidgeot',166,297,.7)+animal('steelix',265,495,.62,'breathe')+animal('machamp',170,483,.53)+L('M91 476Q169 524 277 475','#e2ba86',1.7);
 break;
 case 'strategy':
 middle=frame(nap(92,419,.8,'stern',false)+ally('elm',268,427,.67)+table(true)+animal('alakazam',193,460,.78,'float')+row(4,i=>rig(P('M-4 6-7-4 3-9 9 2Z','#cd986f'),121+i*33,520-i%2*14,.8,'float',i)));
 break;
 case 'ruins':
 middle=base+P('M21 476l16-115 27 11 1 53 42-13 22 64ZM238 470l13-80 26 5 7-40 38 18 24 105Z','#655460')+L('M38 364l10 70m240-72-2 69m20-53 9 72','#a0817d',1.5,.53)+nap(117,425,.78,'soft',false)+ally('morty',257,413,.81)+E(181,535,20,8,'#ad9290')+E(181,532,16,4,'#5b7685')+prop('coin',211,539,.26);
 break;
 case 'docks':
 middle=river()+village(key)+P('M-54 525 145 482 386 521V644H-54Z','#594451')+row(14,i=>L('M'+(-20+i*33)+' 527l-16 99','#b08676',1,.49))+nap(100,414,.84)+ally('guard',255,420,.67)+prop('box',301,530,.68)+prop('lantern',191,480,.88,'sway');
 break;
 case 'raid':
 middle=interior(key)+R(113,293,128,209,'#22293b')+L('M113 293h128v209M113 293v209','#98705e',5)+nap(78,428,.75,'stern',false)+animal('steelix',251,511,.58)+animal('pikachu',225,545,.39)+prop('box',264,540,1)+prop('box',151,551,.7)+prop('lantern',127,503,.8,'sway');
 break;
 case 'council': case 'vote':
 middle=frame(ally('guard',53,428,.77)+ally('host',296,433,.72)+nap(175,413,.91,key==='vote'?'soft':'stern',false)+table(true)+prop('letter',283,522,.55)+prop('badge',114,532,.35));
 break;
 case 'stair':
 middle=base+G(tower(191,464,1.72),'opacity=".92"')+P('M-35 530 279 332 369 358 43 584Z','#624b51')+row(9,i=>L('M'+(i*34-25)+' '+(530-i*21)+'l97 29','#b08775',2,.76))+nap(110,422,.76,'stern',true,'walk')+ally('morty',252,383,.75)+prop('lantern',193,472,.65,'sway');
 break;
 case 'phoenix':
 middle=tower(284,501,1.03)+tower(45,539,.65)+roof(-71,463,501,129)+nap(102,482,.68,'soft',false)+ally('morty',270,484,.67)+bird('hooh',181,289,1.03);
 front=E(173,262,165,130,'url(#warm)','opacity=".21"');
 break;
 case 'works':
 middle=base+village()+nap(89,422,.76,'soft',false)+ally('nara',264,433,.73)+Br(201,529,.68)+table(true)+prop('badge',227,529,.42);
 break;
 case 'choice':
 middle=frame(nap(160,408,.98,'stern',false)+ally('guard',284,426,.7)+table()+E(187,521,44,25,'url(#warm)')+rig(E(-13,0,7,6,'none','stroke="#e4bd85" stroke-width="3"')+L('M-5 0h24v5m-8-5v4','#e4bd85',3.2),190,518,1,'float')+prop('letter',83,527,.56));
 break;
 default:
 middle=open+rig(
  P('M-22 76-28 145-14 149-1 102 12 149 28 147 23 76Z','#2a2c3c')+
  P('M-23 130-30 148-38 155-35 161-11 159-10 134ZM15 134l-1 25 26 2 4-6-15-8-4-14Z','#1c2738')+
  P('M-19-18Q-26-47-9-60q22-8 33 15l-4 30-10 11-18-3Z','#342a35')+
  L('M-18-41q3-18 19-19m-13 14q6-11 18-9','#ae785e',1.1,.58)+
  P('M-23-10q-16 8-23 22l-11 49 16 13 14-30-10 65 28-5 12-8 12 13 27-9-13-61 14 32 14-13-9-50-26-17Z','url(#coat)','stroke="#172037" stroke-width="2"')+
  L('M-28 0q27 15 57 0M-1 17v74m-38-75-12 44m88-48 13 44','#8e9baa',1.2,.68)+
  L('M-25-10 24-10','#bb8063',4)+L('M-32 12l-11 5m77-6 12 5','#e3ad71',3)+
  P('M-53 61q-4 11 5 16l8-7Z','url(#skin)')+U('letter',-50,76,.24),
  157,459,.91,'breathe')+Br(238,571,.62)+bird('hooh',265,260,.39);
 }
 if(!front)front=G(row(10,i=>grass(-34+i*46,640+rand(i,4)*23,.67+rand(i,9)*1.05,'#243943')),'opacity=".67" data-anim="foreground"');
 return { ...w, middle, front };
}

