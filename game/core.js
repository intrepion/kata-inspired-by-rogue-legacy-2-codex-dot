export const CLASSES = [
  {name:'Knight',hp:110,damage:25,speed:230,desc:'Sword arc · F raises a shield that blocks and counters.'},
  {name:'Ranger',hp:80,damage:20,speed:245,desc:'Bow fires arrows · F creates a healing canopy.'},
  {name:'Barbarian',hp:140,damage:34,speed:195,desc:'Heavy axe · F shouts, damaging nearby foes.'}
];
export const TRAITS = [
  {name:'Steady',gold:1,hp:1,desc:'No modifier.'},
  {name:'Fragile',gold:1.5,hp:.7,desc:'30% less health; +50% gold.'},
  {name:'Gilded',gold:1.25,hp:1,speed:.8,desc:'Slower movement; +25% gold.'},
  {name:'Fleet',gold:1.1,hp:.85,speed:1.2,desc:'Faster movement, less health; +10% gold.'}
];
export const RELICS = [
  {id:'edge',name:'Ember Edge',cost:35,desc:'+35% weapon damage.'},
  {id:'leech',name:'Blood Chalice',cost:40,desc:'Restore 5 health per enemy defeated.'},
  {id:'boots',name:'Wind Treads',cost:30,desc:'+20% movement speed.'},
  {id:'lens',name:'Arcane Lens',cost:35,desc:'Spells deal double damage.'}
];
export const blankSave=()=>({gold:0,vigor:0,might:0,generation:1,bosses:0,armor:0,mana:0,heirlooms:[],bossDefeated:false});
export function normalizeSave(input={}) { const s={...blankSave(),...input}; for(const k of ['gold','vigor','might','generation','bosses','armor','mana']) s[k]=Number.isFinite(s[k])?Math.max(0,Math.floor(s[k])):blankSave()[k]; s.heirlooms=Array.isArray(s.heirlooms)?s.heirlooms.filter(x=>x==='wings'):[]; s.bossDefeated=Boolean(s.bossDefeated)||s.bosses>0; return s; }
export function rng(seed){return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
export function heirs(random=Math.random){return Array.from({length:3},(_,i)=>({name:['Ash','Rowan','Ember','Briar','Wren','Morrow'][Math.floor(random()*6)]+' '+(i+1),classIndex:Math.floor(random()*CLASSES.length),traitIndex:Math.floor(random()*TRAITS.length)}))}
export function cost(level){return 50+level*40}
export function upgrade(save,key){if(!['vigor','might','armor','mana'].includes(key))return false;let price=cost(save[key]);if(save.gold<price)return false;save.gold-=price;save[key]++;return true}
export function hit(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y}
// A connected 3x3 maze, with a guaranteed path to each landmark and extra loops.
export function makeWorld(seed, bossDefeated=false){
 const random=rng(seed), rooms=Array.from({length:9},(_,id)=>({id,x:id%3,y:Math.floor(id/3),doors:[],type:'combat',visited:false,cleared:false,claimed:false,seed:Math.floor(random()*1e9)}));
 const seen=new Set([0]), stack=[0];
 while(stack.length){const i=stack[stack.length-1],x=i%3,y=Math.floor(i/3),neighbors=[[x-1,y],[x+1,y],[x,y-1],[x,y+1]].filter(([a,b])=>a>=0&&a<3&&b>=0&&b<3&&!seen.has(b*3+a)); if(!neighbors.length){stack.pop();continue}const [nx,ny]=neighbors[Math.floor(random()*neighbors.length)],n=ny*3+nx;rooms[i].doors.push(n);rooms[n].doors.push(i);seen.add(n);stack.push(n)}
 for(let i=0;i<9;i++)for(const n of [i%3<2?i+1:-1,i<6?i+3:-1])if(n>=0&&!rooms[i].doors.includes(n)&&random()<.3){rooms[i].doors.push(n);rooms[n].doors.push(i)}
 // Keep the sealed corner boss from becoming an articulation point.
 for(const [a,b] of [[4,5],[4,7]])if(!rooms[a].doors.includes(b)){rooms[a].doors.push(b);rooms[b].doors.push(a)}
 rooms[0].type='entrance';rooms[4].type='relic';rooms[7].type='relic';rooms[6].type='heirloom';rooms[8].type=bossDefeated?'treasure':'boss';rooms[2].type='treasure';
 return rooms;
}
export function resolveMax(base,resolve){return Math.max(1,Math.floor(base*Math.max(.25,Math.min(1,resolve/100))))}
export function acquireRelic(run,id){const relic=RELICS.find(r=>r.id===id);if(!relic||run.relics.includes(id))return false;run.relics.push(id);run.resolve-=relic.cost;run.maxHp=resolveMax(run.baseMaxHp,run.resolve);run.hp=Math.min(run.hp,run.maxHp);return true}
export function rewardGold(base,trait){return Math.round(base*TRAITS[trait].gold)}

export function bossLocked(room,save){return room.type==='boss'&&!save.heirlooms.includes('wings')}
export function trialReady(room,alive){return room.type==='heirloom'&&!room.claimed&&alive===0}
