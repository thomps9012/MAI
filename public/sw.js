if(!self.define){let e,s={};const i=(i,t)=>(i=new URL(i+".js",t).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(t,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>i(e,a),u={module:{uri:a},exports:c,require:r};s[a]=Promise.all(t.map((e=>u[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-75794ccf"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/MAI-adult-screenshot.png",revision:"cde0bbe70aed9a4fd2fe3ece30d8dcd8"},{url:"/_next/static/chunks/100-eb70941fa7b4b446.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/main-50770868367ef490.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/_app-f28449e9cacd653a.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/add/answer_choice-fbabc126121b9c55.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/add/gift_card/amount-e9a1e92c6e1504cd.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/add/gift_card/type-27c8d8b4e1a7c810.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/add/interview_question-ca67d3cea53e395d.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/add/interview_section-63f55130dfc77dd9.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/add/testing_agency-9283c47e68ffc266.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/answer_choices-1ea4669a70801cb3.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/client_detail/%5Bid%5D-30756819eac1f457.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/client_detail/edit/%5Bid%5D-263eebdbb036dcdc.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/clients-53ce867126e447b7.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/edit/%5Bid%5D/answer_choice-463a9dd90877dc8b.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/edit/%5Bid%5D/gift_cards/amounts-a15162f49059c548.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/edit/%5Bid%5D/gift_cards/types-e89f12fdc633d192.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/edit/%5Bid%5D/interview_section-5a488e01f96cec99.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/edit/%5Bid%5D/question-cf681d9a8fa9ede3.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/edit/%5Bid%5D/testing_agencies-025bf6072fda938c.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/gift_cards-34c8803144a5b6b7.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/interview_detail/%5Btype%5D/%5Bid%5D-bf1a52f56fb93b5d.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/interview_detail/%5Btype%5D/edit/%5Bid%5D-32c30eb258850087.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/interviews-c58946aed95209a7.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/admin/questions-082094bc0e347bc8.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/gift_card/%5Bid%5D/detail-f1143876a6ad2d49.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/gift_card/%5Bid%5D/disperse-23e58ca33a20c942.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/gift_card/%5Bid%5D/edit-ba107d0e60bad79c.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/gift_card/records-bf25687439ef27e0.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/index-297d74825af1a4fb.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/interview-e3be26979ee6d044.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/interview/adult/demographics-46e09a53e48bd9c2.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/interview/adult/drug_behavior-5e42b72cfe0676ca.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/interview/adult/risk_attitudes-25a2ec97a1d6afcd.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/interview/adult/sexual_behavior-9afb3a26f7424a72.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/interview/review-ab6274fd2b2446af.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/interview/success-abcf0b8688a90348.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/interview/youth/demographics-fd2798c027196dd4.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/interview/youth/drug_behavior-316ab431e1087281.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/interview/youth/risk_attitudes-9eefa282f5733eb3.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/pages/interview/youth/sexual_behavior-cb2dceeca6182eaa.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/chunks/webpack-9b312e20a4e32339.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/css/180e3512b0e79298.css",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/qZeuvL0VxlJP4psOw1V4C/_buildManifest.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/qZeuvL0VxlJP4psOw1V4C/_middlewareManifest.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/_next/static/qZeuvL0VxlJP4psOw1V4C/_ssgManifest.js",revision:"qZeuvL0VxlJP4psOw1V4C"},{url:"/manifest.json",revision:"9649f284c9668a083caf6a149e242cce"},{url:"/nora_favicon.png",revision:"25cbe44b33c6850add321785620cdc81"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
