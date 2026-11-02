export const CLASSES=[{name:'Knight',hp:100,damage:24,range:66,speed:235,desc:'Balanced blade and sturdy armor.'},{name:'Ranger',hp:75,damage:16,range:350,speed:245,desc:'Fires a long-range arrow.'},{name:'Barbarian',hp:135,damage:35,range:76,speed:190,desc:'Heavy axe; slower but powerful.'}];
export const TRAITS=[{name:'Steady',gold:1,hp:1,desc:'No modifier.'},{name:'Fragile',gold:1.5,hp:.7,desc:'30% less health, 50% more gold.'},{name:'Gilded',gold:1.25,hp:1,desc:'25% more gold, slower movement.',speed:.8},{name:'Fleet',gold:1,hp:.85,desc:'Faster movement, 15% less health.',speed:1.2}];
export function rng(seed){return ()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}}
export function heirs(random=Math.random){return Array.from({length:3},(_,i)=>({name:['Ash','Rowan','Ember','Briar','Wren','Morrow'][Math.floor(random()*6)]+' '+(i+1),classIndex:Math.floor(random()*CLASSES.length),traitIndex:Math.floor(random()*TRAITS.length)}))}
export function makeRooms(seed){let r=rng(seed);return Array.from({length:6},(_,i)=>({enemies:i===0?1:i===5?1:2+Math.floor(r()*2),platforms:[{x:180+Math.floor(r()*80),y:365,w:130},{x:480+Math.floor(r()*90),y:290,w:135}],boss:i===5,reward:25+Math.floor(r()*16)}))}
export function cost(level){return 50+level*40}
export function upgrade(save,key){if(!['vigor','might'].includes(key))return false;let price=cost(save[key]);if(save.gold<price)return false;save.gold-=price;save[key]++;return true}
export function hit(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y}
