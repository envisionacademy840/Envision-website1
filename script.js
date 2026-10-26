(function(){
var NAV=[['index.html','Home'],['about.html','About Us'],['courses.html','Courses'],['career-support.html','Career Support'],['contact.html','Contact Us']];
var here=location.pathname.split('/').pop()||'index.html';
var cur=/^(digital-marketing|software-development|human-resources)/.test(here)?'courses.html':here;
var h=document.getElementById('site-header');
if(h){h.className='hd';h.innerHTML='<div class="wrap"><a class="logo" href="index.html">Envision Academy</a><button class="menu" aria-expanded="false" aria-controls="nav">Menu</button><nav class="nav" id="nav" aria-label="Main">'+
NAV.map(function(n){return '<a href="'+n[0]+'"'+(n[0]===cur?' aria-current="page"':'')+'>'+n[1]+'</a>'}).join('')+'<a class="btn" href="contact.html">Request Details</a></nav></div>';
var m=h.querySelector('.menu'),nv=h.querySelector('.nav');
m.addEventListener('click',function(){var o=nv.classList.toggle('open');m.setAttribute('aria-expanded',o)});}
var f=document.getElementById('site-footer');
if(f){f.className='ft';f.innerHTML='<div class="wrap"><div><h4>Envision Academy</h4><p>Professional learning and career development across Digital Marketing, Software Development and Human Resources.</p></div>'+
'<div><h4>Quick Links</h4><ul>'+NAV.map(function(n){return '<li><a href="'+n[0]+'">'+n[1]+'</a></li>'}).join('')+'</ul></div>'+
'<div><h4>Courses</h4><ul><li><a href="digital-marketing.html">Digital Marketing</a></li><li><a href="software-development.html">Software Development</a></li><li><a href="human-resources.html">Human Resources</a></li><li><a href="privacy.html">Privacy Policy</a></li></ul></div>'+
'<small>Phone: [Verified phone number] · Email: [Verified email address] · Mumbai, Maharashtra<br>© '+new Date().getFullYear()+' Envision Academy. All rights reserved.</small></div>';}

/* Thank-you page only opens after a successful submission */
if(document.body.dataset.guard){if(!sessionStorage.getItem('enquirySent'))location.replace('contact.html');else sessionStorage.removeItem('enquirySent');}

/* Enquiry form */
var FORM_ENDPOINT=''; // TODO: set to your form service URL (e.g. Formspree). Empty = demo mode, nothing is sent.
var form=document.getElementById('enquiry');
if(form){
function err(el,msg){var s=el.parentNode.querySelector('.err');if(!s){s=document.createElement('span');s.className='err';s.setAttribute('role','alert');el.parentNode.appendChild(s)}s.textContent=msg;el.setAttribute('aria-invalid',msg?'true':'false')}
form.addEventListener('submit',function(e){
e.preventDefault();var ok=true,q=function(n){return form.elements[n]};
var rules=[['name',function(v){return v.trim().length>1},'Enter your full name.'],
['email',function(v){return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)},'Enter a valid email address.'],
['mobile',function(v){return /^[+\d][\d\s-]{8,14}$/.test(v.trim())},'Enter a valid mobile number.'],
['course',function(v){return !!v},'Choose a course of interest.'],
['status',function(v){return !!v},'Choose your current status.']];
rules.forEach(function(r){var el=q(r[0]),good=r[1](el.value);err(el,good?'':r[2]);if(!good)ok=false});
var c=q('consent');err(c,c.checked?'':'Please agree so we can contact you.');if(!c.checked)ok=false;
if(!ok){form.querySelector('[aria-invalid="true"]').focus();return}
var done=function(){sessionStorage.setItem('enquirySent','1');location.href='thank-you.html'};
if(!FORM_ENDPOINT){done();return}
fetch(FORM_ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)})
.then(function(r){if(r.ok)done();else throw 0}).catch(function(){var b=document.getElementById('form-status');b.textContent='We could not send your enquiry. Please try again or contact us directly.'});
});}
})();
