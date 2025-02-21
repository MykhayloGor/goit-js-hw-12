import{a as L,S as w,i as u}from"./assets/vendor-CMSP9hSB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function l(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=l(s);fetch(s.href,a)}})();document.querySelector(".gallery");document.querySelector(".loader");function v(e){let{webformatURL:t,largeImageURL:l,tags:n,likes:s,views:a,comments:i,downloads:R}=e;return`
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
      `}function g(e){return e.map(v).join("")}const b="48704705-de0108bea4c192368cade13d3",q="https://pixabay.com/api/",M=L.create({baseURL:q,params:{key:b,image_type:"photo",orientation:"horizontal",safesearch:!0}});async function f(e,t=1,l=40){try{return(await M.get("/",{params:{q:e,page:t,per_page:l}})).data.hits}catch{return[]}}const o={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")},r={query:null,page:1,perPage:40};let m=new w(".gallery a");o.form.addEventListener("submit",async e=>{if(e.preventDefault(),r.query=e.target.elements["search-query"].value.trim(),r.page=1,!r.query){u.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}h(),c(),o.gallery.innerHTML="";try{const t=await f(r.query,r.page,r.perPage);if(r.total=t.totalHits,!t||t.length===0){d("Sorry, no images found. Try again!");return}o.gallery.innerHTML=g(t),m.refresh(),P()}catch{d("An error occurred while fetching images. Check console.")}finally{y()}});o.loadMoreBtn.addEventListener("click",async()=>{h(),r.page+=1;try{const e=await f(r.query,r.page,r.perPage);if(!e||e.length===0){c(),p("We're sorry, but you've reached the end of search results.");return}o.gallery.insertAdjacentHTML("beforeend",g(e)),m.refresh(),S();const t=Math.ceil(r.total/r.perPage);r.page>=t&&(c(),p("We're sorry, but you've reached the end of search results."))}catch{d("An error occurred while fetching images.")}finally{y()}});function h(){o.loader.classList.remove("hidden")}function y(){setTimeout(()=>{o.loader.classList.add("hidden")},200)}function P(){o.loadMoreBtn.classList.remove("hidden")}function c(){o.loadMoreBtn.classList.add("hidden")}function d(e){u.error({title:"Error",message:e,position:"topRight"})}function p(e){u.info({title:"Message",message:e,position:"topRight"})}function S(){var t;const e=((t=o.gallery.firstElementChild)==null?void 0:t.getBoundingClientRect().height)||0;window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
