if(!self.define){let e,s={};const t=(t,i)=>(t=new URL(t+".js",i).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(i,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let r={};const c=e=>t(e,a),u={module:{uri:a},exports:r,require:c};s[a]=Promise.all(i.map((e=>u[e]||c(e)))).then((e=>(n(...e),r)))}}define(["./workbox-75794ccf"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/MAI-adult-screenshot.png",revision:"cde0bbe70aed9a4fd2fe3ece30d8dcd8"},{url:"/_next/static/H94ENh5AuB58v-t9rHw2Y/_buildManifest.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/H94ENh5AuB58v-t9rHw2Y/_middlewareManifest.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/H94ENh5AuB58v-t9rHw2Y/_ssgManifest.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/392-f9d4cd563b3c3906.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/main-50770868367ef490.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/_app-4f163ec2b9361704.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/admin/add/answer_choice-86a0e5abeb09f8fc.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/admin/add/interview_section-63f55130dfc77dd9.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/admin/answer_choices-dbd2af033841842e.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/admin/client_detail/%5Bid%5D-4993325de1b4cf52.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/admin/client_detail/edit/%5Bid%5D-31f56a52503374d3.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/admin/clients-1e32c06d75071594.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/admin/edit/answer_choice-51a8ec050eea9b76.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/admin/edit/gift_cards/amounts-f08120c9ac31f04c.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/admin/edit/gift_cards/types-4687b94aabed243e.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/admin/edit/interview_section-de17cf102d8f0086.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/admin/edit/question-ad96ee575ab4e383.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/admin/interview_detail/%5Bid%5D-52e7d504017023f4.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/admin/interview_detail/edit/%5Bid%5D-b417f4af1a83ff63.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/admin/interviews-da36dfd8a053c67b.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/gift_card/%5Bid%5D/detail-85025f6ea1aa90f8.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/gift_card/%5Bid%5D/disperse-ead5245983649b5d.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/gift_card/%5Bid%5D/edit-dd685393b1ccd687.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/gift_card/records-09e4dcd1dda3d3b2.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/index-43fcf80c06877e8a.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/interview-8c0e6caf335c132a.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/interview/adult/demographics-0adc66b378ced3d5.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/interview/adult/drug_behavior-50d5955f8d451693.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/interview/adult/risk_attitudes-996a82de11542a13.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/interview/adult/sexual_behavior-ae41c32dbec05506.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/interview/review-9c84e27b2c883aa2.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/interview/success-0ce5b70c06dafd45.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/interview/youth/demographics-9260ddbf7fb47f0d.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/interview/youth/drug_behavior-e590ae03c4e7db8a.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/interview/youth/risk_attitudes-6eb1e61b98870890.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/pages/interview/youth/sexual_behavior-14e1499c01429007.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/chunks/webpack-9b312e20a4e32339.js",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/_next/static/css/45a8b354b2998f6f.css",revision:"H94ENh5AuB58v-t9rHw2Y"},{url:"/manifest.json",revision:"9649f284c9668a083caf6a149e242cce"},{url:"/nora_favicon.png",revision:"25cbe44b33c6850add321785620cdc81"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
