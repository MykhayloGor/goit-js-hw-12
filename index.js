import{a as v,S as b,i as n}from"./assets/vendor-C_7oAj77.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&e(u)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const m=document.querySelector(".gallery");document.querySelector(".loader");function p(a,s=!1){const o=a.map(e=>`
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
      `).join("");s?m.insertAdjacentHTML("beforeend",o):m.innerHTML=o}const w="48704705-de0108bea4c192368cade13d3",S="https://pixabay.com/api/",q=v.create({baseURL:S,params:{key:w,image_type:"photo",orientation:"horizontal",safesearch:!0}});let h=1;async function f(a,s=h,o=40){try{const e=await q.get("/",{params:{q:a,page:s,per_page:o}});return e.data.hits.length>0&&h++,e.data.hits}catch(e){return console.error("Error fetching images:",e),[]}}const g=document.querySelector(".search-form"),y=document.querySelector(".gallery"),i=document.querySelector(".loader"),c=document.querySelector(".load-more");let L=new b(".gallery a"),d=1,l="";g.addEventListener("submit",async a=>{if(a.preventDefault(),d=1,l=g.elements["search-query"].value.trim(),!l){n.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}y.innerHTML="",i.classList.remove("hidden"),c.classList.add("hidden");try{const s=await f(l,d);if(s.length===0){i.classList.add("hidden"),n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}p(s),L.refresh(),c.classList.remove("hidden"),setTimeout(()=>{i.classList.add("hidden")},200)}catch{setTimeout(()=>{i.classList.add("hidden")},200),n.error({title:"Error",message:"An error occurred while fetching images",position:"topRight"})}});c.addEventListener("click",async()=>{i.classList.remove("hidden"),d++;try{const a=await f(l,d);if(a.length===0){i.classList.add("hidden"),c.classList.add("hidden"),n.info({title:"Message",message:"We are sorry, but you've reached the end of search results.",position:"topRight"});return}p(a,!0),L.refresh();const s=y.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:s,behavior:"smooth"}),setTimeout(()=>{i.classList.add("hidden")},200)}catch{setTimeout(()=>{i.classList.add("hidden")},200),n.error({title:"Error",message:"An error occurred while fetching images",position:"topRight"})}});
//# sourceMappingURL=index.js.map
