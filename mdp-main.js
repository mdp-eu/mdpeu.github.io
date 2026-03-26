// MDP — main.js v2.0

// ── Safe storage ──
function storageGet(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
function storageSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }

// ── NAV scroll ──
window.addEventListener('scroll', function(){
  document.querySelector('nav') && document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 50);
});

// ── Reveal on scroll ──
var revealObs = new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.08, rootMargin:'0px 0px -24px 0px'});
document.querySelectorAll('.reveal').forEach(function(el){ revealObs.observe(el); });

// ── Smooth anchors ──
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var t = document.querySelector(a.getAttribute('href'));
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

// ── Lang switcher ──
var TRANSLATIONS = {
  it:{
    'nav-home':'Home','nav-movimento':'Movimento','nav-visione':'Visione',
    'nav-diaspora':'Diaspora','nav-documenti':'Documenti','nav-iscriviti':'Iscriviti',
    'footer-tagline':'Metodo. Responsabilità. Risultati.',
    'footer-nav':'Navigazione','footer-doc':'Documenti','footer-lang':'Lingua',
    'footer-sub':'Il movimento politico indipendente della diaspora macedone.'
  },
  mk:{
    'nav-home':'Дома','nav-movimento':'Движење','nav-visione':'Визија',
    'nav-diaspora':'Дијаспора','nav-documenti':'Документи','nav-iscriviti':'Зачлени се',
    'footer-tagline':'Метод. Одговорност. Резултати.',
    'footer-nav':'Навигација','footer-doc':'Документи','footer-lang':'Јазик',
    'footer-sub':'Независното политичко движење на македонската дијаспора.'
  }
};

function setLang(lang){
  storageSet('mdp-lang', lang);
  document.documentElement.setAttribute('data-lang', lang);
  document.querySelectorAll('.lang-btn').forEach(function(b){
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  var t = TRANSLATIONS[lang] || TRANSLATIONS['it'];
  document.querySelectorAll('[data-key]').forEach(function(el){
    var k = el.getAttribute('data-key');
    if(t[k]) el.textContent = t[k];
  });
  document.querySelectorAll('[data-ph]').forEach(function(el){
    var k = el.getAttribute('data-ph');
    if(t[k]) el.setAttribute('placeholder', t[k]);
  });
  // MK page links
  document.querySelectorAll('[data-mk-href]').forEach(function(el){
    el.href = lang === 'mk' ? el.getAttribute('data-mk-href') : el.getAttribute('data-it-href');
  });
}

// Init
document.addEventListener('DOMContentLoaded', function(){
  var saved = storageGet('mdp-lang') || 'it';
  setLang(saved);

  // Lang buttons
  document.querySelectorAll('.lang-btn').forEach(function(b){
    b.addEventListener('click', function(){ setLang(b.dataset.lang); });
  });
});
