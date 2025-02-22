import{a as w,S as v,i as h}from"./assets/vendor-CMSP9hSB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function l(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=l(r);fetch(r.href,a)}})();document.querySelector(".gallery");document.querySelector(".loader");function b(e){let{webformatURL:t,largeImageURL:l,tags:n,likes:r,views:a,comments:i,downloads:B}=e;return`
        <li class="gallery-item">  <div class="image-card">  <a class="gallery-link" href="${e.largeImageURL}">
              <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
            </a>
            <div class="gallery-meta">
              <ul class="gallery-stats">
                <li class="stats-item">
                  <span class="stats-label">Likes</span>
                  <span class="stats-value">${e.likes}</span>
                </li>
                <li class="stats-item">
                  <span class="stats-label">Views</span>
                  <span class="stats-value">${e.views}</span>
                </li>
                <li class="stats-item">
                  <span class="stats-label">Comments</span>
                  <span class="stats-value">${e.comments}</span>
                </li>
                <li class="stats-item">
                  <span class="stats-label">Downloads</span>
                  <span class="stats-value">${e.downloads}</span>
                </li>
              </ul>
            </div>
          </div>
        </li>
      `}function p(e){return!e||e.length===0?"":e.map(b).join("")}const q="48704705-de0108bea4c192368cade13d3",M="https://pixabay.com/api/",P=w.create({baseURL:M,params:{key:q,image_type:"photo",orientation:"horizontal",safesearch:!0}});async function f(e,t=1,l=40){try{return(await P.get("/",{params:{q:e,page:t,per_page:l}})).data}catch{return[]}}const o={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")},s={query:null,page:1,perPage:40,totalHits:0};let g=new v(".gallery a");o.form.addEventListener("submit",async e=>{if(e.preventDefault(),s.query=e.target.elements["search-query"].value.trim(),s.page=1,!s.query){console.warn("⚠️ Empty search query"),h.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}m(),c(),o.gallery.innerHTML="";try{const t=await f(s.query,s.page,s.perPage);if(s.total=t.totalHits,!t.hits||t.hits.length===0){d("Sorry, no images found. Try again!");return}o.gallery.innerHTML=p(t.hits),g.refresh(),L(t.totalHits,s.page,s.perPage)?S():u("We're sorry, but you've reached the end of search results.")}catch{d("An error occurred while fetching images. Check console.")}finally{y()}});o.loadMoreBtn.addEventListener("click",async()=>{m(),s.page+=1;try{const e=await f(s.query,s.page,s.perPage);if(!e.hits||e.hits.length===0){c(),u("We're sorry, but you've reached the end of search results.");return}o.gallery.insertAdjacentHTML("beforeend",p(e.hits)),g.refresh(),R(),L(s.total,s.page,s.perPage)||(c(),u("We're sorry, but you've reached the end of search results."))}catch{d("An error occurred while fetching images.")}finally{y()}});function m(){o.loader.classList.remove("hidden")}function y(){o.loader.classList.add("hidden")}function S(){o.loadMoreBtn.classList.remove("hidden")}function c(){o.loadMoreBtn.classList.add("hidden")}function d(e){h.error({title:"Error",message:e,position:"topRight"})}function u(e){h.info({title:"Message",message:e,position:"topRight"})}function R(){var t;const e=((t=o.gallery.firstElementChild)==null?void 0:t.getBoundingClientRect().height)||0;window.scrollBy({top:e*2,behavior:"smooth"})}function L(e,t,l){const n=Math.ceil(e/l);return t<n}
//# sourceMappingURL=index.js.map
