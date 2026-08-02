/* =====================================================
   LE BURGER MAÎCHE — script.js
   ===================================================== */
const FORMSPREE = 'https://formspree.io/f/xqervwqg';

const MEATS  = ['Steak','Poulet','Kebab','Köfte','Merguez','Cordon bleu','Tenders','Nuggets','Falafel'];
const SAUCES = ['Blanche','Algérienne','Samouraï','Harissa','Biggy','Andalouse','Barbecue','Ketchup','Mayonnaise','Curry','Sans sauce'];
const GRATIN = ['Cheddar','Raclette','Mozzarella','Sans gratinage'];
const DRINKS = ['Coca','Coca Zéro','Fanta','Sprite','Ice Tea','Oasis','Eau','Eau pétillante'];

const opt   = (label,price,note)=>({label,price:price||0,note});
const sauceStep = ()=>({id:'sauces',key:'Sauces',type:'multi',title:'Vos sauces',sub:'2 maximum',opts:SAUCES.map(s=>opt(s)),max:2,optional:true});
const drinkStep = (showIf)=>({id:'boisson',key:'Boisson',type:'single',title:'Votre boisson',opts:DRINKS.map(d=>opt(d)),showIf});
const menuSteps = ()=>[
  {id:'formule',key:'Formule',type:'single',title:'En menu ?',sub:'frites + boisson',opts:[opt('Non, seul'),opt('En menu (+3€)',3)]},
  drinkStep(sel=>sel.formule && sel.formule.price>0)
];

const CATS = [
  {key:'pizza', emoji:'🍕', label:'Pizza', steps:[
    {id:'choix',key:'Pizza',base:true,type:'single',title:'Quelle pizza ?',opts:[
      opt('Margharita',7),opt('4 fromages',8),opt('4 saisons',9),opt('Kebab',10),opt('Sucuk',10,'saucisse turque')]},
    {id:'supp',key:'Supplément',type:'single',title:'Un supplément ?',opts:[opt('Non merci'),opt('Avec supplément',1)]}
  ]},
  {key:'tacos', emoji:'🌯', label:'Tacos', steps:[
    {id:'taille',key:'Taille',base:true,type:'single',title:'La taille ?',opts:[
      Object.assign(opt('M — 1 viande',9),{meat:1}),
      Object.assign(opt('L — 2 viandes',11),{meat:2}),
      Object.assign(opt('XL — 3 viandes',13),{meat:3}),
      Object.assign(opt('XXL — 4 viandes',15),{meat:4})]},
    {id:'viandes',key:'Viandes',type:'multi',title:'Choisissez vos viandes',opts:MEATS.map(m=>opt(m)),meatFrom:'taille'},
    sauceStep(),
    {id:'gratin',key:'Gratin',type:'single',title:'Le gratinage (offert)',opts:GRATIN.map(g=>opt(g))},
    ...menuSteps()
  ]},
  {key:'kebab', emoji:'🥙', label:'Kebab', steps:[
    {id:'format',key:'Format',base:true,type:'single',title:'Quel format ?',opts:[
      opt('Sandwich kebab',8),opt('Galette (dürüm) kebab',8),opt('Maxi kebab',10)]},
    sauceStep(),
    {id:'supp',key:'Supplément viande',type:'single',title:'Supplément viande ?',opts:[opt('Non'),opt('Oui (+2€)',2)]},
    ...menuSteps()
  ]},
  {key:'panini', emoji:'🥖', label:'Panini', steps:[
    {id:'choix',key:'Panini',base:true,type:'single',title:'Quel panini ?',opts:[
      opt('Panini kebab',8),opt('Panini poulet',9),opt('Panini 4 fromages',8),opt('Panini steak 180g',9),opt('Panini mix',10)]},
    sauceStep(),
    ...menuSteps()
  ]},
  {key:'burger', emoji:'🍔', label:'Burger', steps:[
    {id:'choix',key:'Burger',base:true,type:'single',title:'Quel burger ?',opts:[
      opt('Burger 180g',12),opt('Burger maxi 360g',15),opt('Chicken',8),opt('Big chicken',10),
      opt('Le Burger spécial',17,'onion rings, sauce spéciale'),opt('Le Burger mix',17,'poulet et steak de bœuf')]},
    sauceStep(),
    {id:'supp',key:'Suppléments',type:'multi',title:'Suppléments (option)',opts:[opt('Fromage',1),opt('Œuf',1.5)],optional:true},
    ...menuSteps()
  ]},
  {key:'sandwich', emoji:'🥪', label:'Sandwich', steps:[
    {id:'choix',key:'Sandwich',base:true,type:'single',title:'Quel sandwich ?',opts:[
      opt('Kebab',8),opt('Köfte',8),opt('Américain',9),opt('Cordon bleu',8,'avec fromage'),opt('Falafel',8),opt('Merguez',9),opt('Toast',8)]},
    sauceStep(),
    ...menuSteps()
  ]},
  {key:'durum', emoji:'🌯', label:'Dürüm', steps:[
    {id:'choix',key:'Dürüm',base:true,type:'single',title:'Quel dürüm ?',opts:[
      opt('Dürüm kebab',8),opt('Maxi kebab',10),opt('Dürüm poulet',9),opt('Dürüm steak',9),opt('Dürüm merguez',9),opt('Dürüm falafel',9)]},
    sauceStep(),
    {id:'supp',key:'Supplément viande',type:'single',title:'Supplément viande ?',opts:[opt('Non'),opt('Oui (+2€)',2)]},
    ...menuSteps()
  ]},
  {key:'assiette', emoji:'🍽️', label:'Assiette', steps:[
    {id:'choix',key:'Assiette',base:true,type:'single',title:'Quelle assiette ?',sub:'salade + frites + bulgur',opts:[
      opt('Assiette kebab',13),opt('Assiette köfte',14),opt('Assiette falafel',14),opt('Assiette steak',14),
      opt('Assiette merguez',14),opt('Assiette mix',15,'kebab + köfte'),opt('Assiette adana',16),
      opt('Assiette poulet',16),opt('Assiette pilons de poulet',16),opt('Assiette mix spécial 3 viandes',19)]},
    sauceStep()
  ]},
  {key:'pides', emoji:'🫓', label:'Pides', steps:[
    {id:'choix',key:'Pide',base:true,type:'single',title:'Quel pide ?',opts:[
      opt('Pide fromage',7),opt('Pide viande hachée',9),opt('Pide épinards',7),opt('Mix',10,'viande et fromage')]}
  ]},
  {key:'lahmacun', emoji:'🌾', label:'Lahmacun', steps:[
    {id:'choix',key:'Lahmacun',base:true,type:'single',title:'Quel lahmacun ?',opts:[
      opt('Seul',5),opt('Kebab',7),opt('Poulet',7),opt('Mix',8,'poulet et kebab')]},
    sauceStep()
  ]},
  {key:'barquette', emoji:'🍟', label:'Barquette', steps:[
    {id:'choix',key:'Barquette',base:true,type:'single',title:'Votre barquette ?',opts:[
      opt('Tenders (5)',6),opt('Nuggets (5)',6),opt('Mozza sticks (5)',6),opt('Onion rings (5)',5),opt('Falafel (5)',7),
      opt('Frites petite',2.5),opt('Frites moyenne',4),opt('Frites grande',5),opt('Frites cheddar',3.5)]},
    {id:'sauces',key:'Sauce',type:'multi',title:'Une sauce ? (option)',opts:SAUCES.map(s=>opt(s)),max:2,optional:true}
  ]},
  {key:'salade', emoji:'🥗', label:'Salade', steps:[
    {id:'choix',key:'Salade',base:true,type:'single',title:'Quelle salade ?',opts:[
      opt('César',8),opt('Coban',7,'salade du berger'),opt('Salade composée de poulet',8),opt('Salade de saison',7)]}
  ]},
  {key:'collation', emoji:'🍚', label:'Collation', steps:[
    {id:'choix',key:'Collation',base:true,type:'single',title:'Quelle collation ? (riz)',opts:[
      opt('Pois chiches',6),opt('Kebab',7),opt('Poulet',8)]},
    sauceStep(),
    {id:'supp',key:'Supplément',type:'single',title:'Un supplément ?',opts:[opt('Non'),opt('Oui (+2€)',2)]}
  ]},
  {key:'menus', emoji:'🎯', label:'Menu', steps:[
    {id:'choix',key:'Menu',base:true,type:'single',title:'Quel menu ?',opts:[
      opt('Étudiant 1',10,'kebab + frites + boisson'),opt('Étudiant 2',11,'tacos M + frites + boisson'),
      opt('Étudiant 3',11,'burger 100g + frites + boisson'),opt('Enfant',9,'1 viande + frites + boisson + jouet')]},
    drinkStep(()=>true)
  ]},
  {key:'dessert', emoji:'🍰', label:'Dessert', steps:[
    {id:'choix',key:'Dessert',base:true,type:'single',title:'Quel dessert ?',opts:[
      opt('Baklava (3 pièces)',4),opt('Tiramisu',4)]}
  ]}
];

/* --------- utils --------- */
function fmtEuro(n){ if(n==null) return ''; return (Number.isInteger(n)? String(n) : n.toFixed(2).replace('.',',')) + ' €'; }
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function icons(){ if(window.lucide) lucide.createIcons(); }

/* --------- état --------- */
let cart = [];
let cur  = null;

const modal=document.getElementById('orderModal');
const wizBody=document.getElementById('wizBody');
const wizFoot=document.getElementById('wizFoot');
const wizTitle=document.getElementById('wizTitle');
const wizSub=document.getElementById('wizSub');
const wizBack=document.getElementById('wizBack');
const navLinks=document.getElementById('navLinks');
const floatOrder=document.getElementById('floatOrder');

function setHead(t,s){ wizTitle.textContent=t; wizSub.textContent=s||''; }

/* --------- compteur panier animé --------- */
function updateCartBadge(){
  const n=cart.length;
  document.querySelectorAll('.cart-count').forEach(b=>{
    b.textContent=n; b.hidden=n===0;
    if(n>0){ b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
  });
}

/* --------- écran catégories --------- */
function screenCats(){
  cur=null;
  wizBack.hidden = cart.length===0;
  wizBack.onclick = ()=> cart.length? screenCart() : null;
  setHead('Je commande','Choisissez une catégorie');
  wizBody.innerHTML='<div class="cat-grid">'+CATS.map((c,i)=>
    `<button class="cat-btn" data-i="${i}"><span class="emo">${c.emoji}</span>${esc(c.label)}</button>`).join('')+'</div>';
  wizBody.querySelectorAll('.cat-btn').forEach(b=>b.onclick=()=>startCat(+b.dataset.i));
  wizFoot.innerHTML='';
  if(cart.length){
    const total=cart.reduce((s,i)=>s+i.price,0);
    wizFoot.innerHTML=`<button class="wiz-next" id="goCart"><i data-lucide="shopping-bag"></i> Voir ma commande (${cart.length}) — ${fmtEuro(total)}</button>`;
    document.getElementById('goCart').onclick=screenCart;
  }
  icons();
}

function startCat(i){ cur={cat:CATS[i],steps:CATS[i].steps,idx:-1,sel:{}}; goStep(1); }

function goStep(dir){
  let i=cur.idx+dir;
  while(i>=0 && i<cur.steps.length){
    const st=cur.steps[i];
    if(!st.showIf || st.showIf(cur.sel)){ cur.idx=i; return renderStep(st); }
    i+=dir;
  }
  if(i>=cur.steps.length) return finishItem();
  return screenCats();
}

function renderStep(st){
  wizBack.hidden=false; wizBack.onclick=()=>goStep(-1);
  const stepNo=cur.steps.filter((s,k)=>k<=cur.idx && (!s.showIf||s.showIf(cur.sel))).length;
  setHead(cur.cat.emoji+' '+cur.cat.label,'Étape '+stepNo);

  let title=st.title;
  if(st.meatFrom){ const n=(cur.sel[st.meatFrom]||{}).meat||0; title='Choisissez vos '+n+' viande'+(n>1?'s':''); }

  let html=`<div class="wiz-step-title">${esc(title)}</div>`;
  if(st.sub) html+=`<div class="wiz-step-sub">${esc(st.sub)}</div>`;

  if(st.type==='single'){
    html+=st.opts.map((o,k)=>
      `<button class="opt-btn" data-k="${k}"><span class="op-name">${esc(o.label)}${o.note?`<small>${esc(o.note)}</small>`:''}</span>${o.price?`<span class="op-price">${fmtEuro(o.price)}</span>`:''}</button>`).join('');
    wizBody.innerHTML=html;
    wizBody.querySelectorAll('.opt-btn').forEach(b=>b.onclick=()=>{ cur.sel[st.id]=st.opts[+b.dataset.k]; goStep(1); });
    wizFoot.innerHTML='';
  } else {
    const chosen=cur.sel[st.id]||[];
    const exact=st.meatFrom ? ((cur.sel[st.meatFrom]||{}).meat||0) : null;
    html+='<div class="chips">'+st.opts.map((o,k)=>{
      const on=chosen.some(c=>c.label===o.label);
      return `<span class="chip ${on?'on':''}" data-k="${k}">${esc(o.label)}${o.price?` +${fmtEuro(o.price)}`:''}</span>`;
    }).join('')+'</div>';
    wizBody.innerHTML=html;

    const refresh=()=>{
      const cho=cur.sel[st.id]||[]; const max=exact!=null?exact:st.max;
      wizBody.querySelectorAll('.chip').forEach(ch=>{
        const o=st.opts[+ch.dataset.k]; const on=cho.some(c=>c.label===o.label);
        ch.classList.toggle('on',on);
        ch.classList.toggle('dis', max!=null && cho.length>=max && !on);
      });
      let ok=true,hint='';
      if(exact!=null){ ok=cho.length===exact; hint=cho.length+'/'+exact+' viande'+(exact>1?'s':''); }
      else if(st.max){ hint=cho.length+'/'+st.max; ok=st.optional?true:cho.length>=1; }
      else ok=st.optional?true:cho.length>=1;
      nextBtn.disabled=!ok; hintEl.textContent=hint;
    };
    wizBody.querySelectorAll('.chip').forEach(ch=>ch.onclick=()=>{
      const o=st.opts[+ch.dataset.k]; let cho=cur.sel[st.id]||[];
      const idx=cho.findIndex(c=>c.label===o.label); const max=exact!=null?exact:st.max;
      if(idx>=0) cho.splice(idx,1); else { if(max!=null&&cho.length>=max) return; cho.push(o); }
      cur.sel[st.id]=cho; refresh();
    });
    wizFoot.innerHTML=`<div class="wiz-hint" id="wizHint"></div><button class="wiz-next" id="wizNext">Continuer <i data-lucide="arrow-right"></i></button>`;
    var nextBtn=document.getElementById('wizNext'), hintEl=document.getElementById('wizHint');
    nextBtn.onclick=()=>goStep(1); refresh();
  }
  icons();
}

function computeItem(){
  let price=0,base='',details=[];
  cur.steps.forEach(st=>{
    const v=cur.sel[st.id]; if(v==null) return;
    if(st.type==='single'){
      price+=v.price||0;
      if(st.base){ base=v.label+(v.note?' ('+v.note+')':''); }
      else if(st.id==='formule' && !(v.price>0)){}
      else if((/^(non|sans)/i).test(v.label) && st.id!=='gratin'){}
      else details.push(st.key+' : '+v.label);
    } else {
      if(v.length){ price+=v.reduce((s,o)=>s+(o.price||0),0); details.push(st.key+' : '+v.map(o=>o.label).join(', ')); }
    }
  });
  return { title:cur.cat.emoji+' '+cur.cat.label+(base?' — '+base:''), price, details };
}
function finishItem(){ cart.push(computeItem()); updateCartBadge(); screenCart(); }

/* --------- écran panier --------- */
function screenCart(){
  cur=null; wizBack.hidden=false; wizBack.onclick=screenCats;
  setHead('Ma commande', cart.length+' article'+(cart.length>1?'s':''));
  if(!cart.length){
    wizBody.innerHTML='<div class="cart-empty">Votre panier est vide.</div>';
    wizFoot.innerHTML='<button class="wiz-next" id="addMore"><i data-lucide="plus"></i> Ajouter un article</button>';
    document.getElementById('addMore').onclick=screenCats; icons(); return;
  }
  const total=cart.reduce((s,i)=>s+i.price,0);
  wizBody.innerHTML=cart.map((it,k)=>`
    <div class="cart-item">
      <div class="ci-top"><div class="ci-name">${esc(it.title)}</div><div class="ci-price">${fmtEuro(it.price)}</div></div>
      ${it.details.length?`<div class="ci-det">${it.details.map(esc).join('<br>')}</div>`:''}
      <button class="ci-rm" data-k="${k}"><i data-lucide="x"></i> Retirer</button>
    </div>`).join('')+`<div class="cart-total"><span>Total</span><span class="ct-val">${fmtEuro(total)}</span></div>`;
  wizBody.querySelectorAll('.ci-rm').forEach(b=>b.onclick=()=>{ cart.splice(+b.dataset.k,1); updateCartBadge(); screenCart(); });
  wizFoot.innerHTML=`<button class="wiz-second" id="addMore">+ Ajouter un article</button>
    <button class="wiz-next" id="toContact">Valider ma commande <i data-lucide="arrow-right"></i></button>`;
  document.getElementById('addMore').onclick=screenCats;
  document.getElementById('toContact').onclick=screenContact;
  icons();
}

/* --------- écran coordonnées --------- */
function screenContact(){
  wizBack.hidden=false; wizBack.onclick=screenCart;
  setHead('Mes coordonnées','Dernière étape');
  wizBody.innerHTML=`
    <div class="field"><label>Nom et prénom</label><input id="c-nom" type="text" placeholder="Ex : Jean Dupont"></div>
    <div class="field"><label>Téléphone</label><input id="c-tel" type="tel" placeholder="Ex : 06 12 34 56 78"></div>
    <div class="field"><label>Mode</label>
      <div class="mode-toggle" id="c-mode">
        <label class="active"><input type="radio" name="cmode" value="À emporter" checked><i data-lucide="shopping-bag"></i> À emporter</label>
        <label><input type="radio" name="cmode" value="Livraison"><i data-lucide="bike"></i> Livraison</label>
      </div>
    </div>
    <div class="field" id="c-addr-field" hidden><label>Adresse de livraison</label><input id="c-addr" type="text" placeholder="Adresse sur le plateau de Maîche"></div>
    <div class="field"><label>Remarque (option)</label><textarea id="c-note" placeholder="Allergies, précisions, heure souhaitée…"></textarea></div>
    <div class="form-status" id="c-status"></div>`;
  const modeWrap=document.getElementById('c-mode'), addrField=document.getElementById('c-addr-field');
  modeWrap.querySelectorAll('label').forEach(l=>l.onclick=()=>{
    modeWrap.querySelectorAll('label').forEach(x=>x.classList.remove('active'));
    l.classList.add('active');
    addrField.hidden = l.querySelector('input').value!=='Livraison';
  });
  const total=cart.reduce((s,i)=>s+i.price,0);
  wizFoot.innerHTML=`<button class="wiz-next" id="sendOrder"><i data-lucide="send"></i> Envoyer ma commande — ${fmtEuro(total)}</button>
    <p class="call-instead">Ou appelez directement : <a href="tel:0953086288">09 53 08 62 88</a></p>`;
  document.getElementById('sendOrder').onclick=sendOrder;
  icons();
}

async function sendOrder(){
  const nom=document.getElementById('c-nom').value.trim();
  const tel=document.getElementById('c-tel').value.trim();
  const mode=document.querySelector('input[name="cmode"]:checked').value;
  const addr=(document.getElementById('c-addr')||{}).value||'';
  const note=document.getElementById('c-note').value.trim();
  const st=document.getElementById('c-status'); st.className='form-status';
  if(!nom||!tel){ st.className='form-status err'; st.textContent='⚠️ Indiquez votre nom et votre téléphone.'; return; }
  if(mode==='Livraison' && !addr.trim()){ st.className='form-status err'; st.textContent='⚠️ Indiquez votre adresse de livraison.'; return; }
  if(FORMSPREE.includes('VOTRE_ID')){ st.className='form-status err'; st.textContent='⚠️ Formulaire non configuré.'; return; }

  const total=cart.reduce((s,i)=>s+i.price,0);
  const cmdText=cart.map((it,k)=>`${k+1}. ${it.title} — ${fmtEuro(it.price)}`+(it.details.length?`\n   ${it.details.join(' | ')}`:'')).join('\n')+`\n\nTOTAL : ${fmtEuro(total)}`;

  const fd=new FormData();
  fd.append('_subject','Nouvelle commande — Le Burger Maîche');
  fd.append('Nom',nom); fd.append('Téléphone',tel); fd.append('Mode',mode);
  if(mode==='Livraison') fd.append('Adresse',addr);
  if(note) fd.append('Remarque',note);
  fd.append('Commande',cmdText); fd.append('Total',fmtEuro(total));

  const btn=document.getElementById('sendOrder'); btn.disabled=true; btn.textContent='Envoi…';
  try{
    const res=await fetch(FORMSPREE,{method:'POST',body:fd,headers:{'Accept':'application/json'}});
    if(res.ok){
      cart=[]; updateCartBadge();
      setHead('Merci !','Commande envoyée'); wizBack.hidden=true;
      wizBody.innerHTML=`<div class="wiz-success"><div class="sc"><i data-lucide="check"></i></div><h4>Commande envoyée !</h4><p>Nous vous rappelons très vite au numéro indiqué pour confirmer.</p></div>`;
      wizFoot.innerHTML='<button class="wiz-next" id="okClose">Fermer</button>';
      document.getElementById('okClose').onclick=closeModal; icons();
    }else throw new Error('server');
  }catch(e){
    st.className='form-status err'; st.innerHTML="❌ L'envoi a échoué. Appelez-nous au <a href='tel:0953086288'>09 53 08 62 88</a>.";
    btn.disabled=false; btn.innerHTML='<i data-lucide="send"></i> Envoyer ma commande — '+fmtEuro(total); icons();
  }
}

/* --------- ouverture modale --------- */
function openModal(){ modal.hidden=false; document.body.style.overflow='hidden'; navLinks.classList.remove('show'); floatOrder.style.display='none'; cart.length?screenCart():screenCats(); }
function closeModal(){ modal.hidden=true; document.body.style.overflow=''; floatOrder.style.display=''; }
document.querySelectorAll('.js-open-order').forEach(b=>b.addEventListener('click',openModal));
document.getElementById('closeOrder').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{ if(e.target===modal) closeModal(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&!modal.hidden) closeModal(); });

/* --------- nav + vues --------- */
document.getElementById('burgerBtn').addEventListener('click',()=>navLinks.classList.toggle('show'));
const homeView=document.getElementById('homeView'), carteView=document.getElementById('carteView');
function showCarte(){homeView.hidden=true;carteView.hidden=false;navLinks.classList.remove('show');window.scrollTo({top:0});revealScan();}
function showHome(t){carteView.hidden=true;homeView.hidden=false;navLinks.classList.remove('show');if(t){const el=document.getElementById(t);if(el){el.scrollIntoView({behavior:'smooth'});return;}}window.scrollTo({top:0});}
document.querySelectorAll('.js-carte').forEach(b=>b.addEventListener('click',showCarte));
document.querySelectorAll('.js-home').forEach(b=>b.addEventListener('click',()=>showHome()));
document.getElementById('brandLink').addEventListener('click',()=>showHome());
document.querySelectorAll('.js-home-link').forEach(a=>a.addEventListener('click',()=>showHome(a.dataset.target)));

/* --------- nav ombre au scroll --------- */
const navEl=document.querySelector('header.nav');
addEventListener('scroll',()=>navEl.classList.toggle('scrolled',scrollY>10),{passive:true});

/* --------- apparition au scroll --------- */
const io=new IntersectionObserver((es)=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }),{threshold:.12});
function revealScan(){ document.querySelectorAll('.reveal:not(.in)').forEach(el=>io.observe(el)); }
revealScan();

/* --------- horaires --------- */
document.getElementById('year').textContent=new Date().getFullYear();
const HOURS={0:{label:'Dimanche',ranges:[[660,1350]]},1:{label:'Lundi',ranges:[],closed:true},2:{label:'Mardi',ranges:[[660,900],[1020,1350]]},3:{label:'Mercredi',ranges:[[660,870],[1020,1350]]},4:{label:'Jeudi',ranges:[[660,900],[1020,1350]]},5:{label:'Vendredi',ranges:[[660,900],[1020,1380]]},6:{label:'Samedi',ranges:[[660,900],[1050,1380]]}};
const dorder=[6,0,1,2,3,4,5];
const fmt=m=>String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');
const rangesText=d=>d.closed?'<span class="closed">Fermé</span>':d.ranges.map(r=>fmt(r[0])+'–'+fmt(r[1])).join(' · ');
const now=new Date(),todayIdx=now.getDay(),mins=now.getHours()*60+now.getMinutes();
document.getElementById('hoursList').innerHTML=dorder.map(i=>{const d=HOURS[i],t=i===todayIdx;return '<div class="hours-row '+(t?'today':'')+'"><span class="day">'+d.label+(t?'<span class="today-badge">AUJ.</span>':'')+'</span><span class="times">'+rangesText(d)+'</span></div>';}).join('');
const today=HOURS[todayIdx];
const isOpen=!today.closed&&today.ranges.some(r=>mins>=r[0]&&mins<r[1]);
const pill=document.getElementById('statusPill'),txt=document.getElementById('statusText');
if(isOpen){const c=today.ranges.find(r=>mins>=r[0]&&mins<r[1]);pill.classList.add('open');txt.textContent='Ouvert maintenant · jusqu\u2019à '+fmt(c[1]);}
else{pill.classList.add('closed');let next=null;for(let s=0;s<=7&&!next;s++){const d=HOURS[(todayIdx+s)%7];if(d.closed)continue;for(const r of d.ranges){if(s===0&&mins>=r[0])continue;next={day:s===0?"aujourd'hui":(s===1?'demain':d.label.toLowerCase()),time:fmt(r[0])};break;}}txt.textContent=next?('Fermé · ouvre '+next.day+' à '+next.time):'Fermé actuellement';}

/* --------- init icônes --------- */
icons();
