if (!self.define) {
  let e,
    s = {};
  const i = (i, n) => (
    (i = new URL(i + ".js", n).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, t) => {
    const a =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[a]) return;
    let c = {};
    const r = (e) => i(e, a),
      o = { module: { uri: a }, exports: c, require: r };
    s[a] = Promise.all(n.map((e) => o[e] || r(e))).then((e) => (t(...e), c));
  };
}
define(["./workbox-75794ccf"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/MAI-adult-screenshot.png",
          revision: "cde0bbe70aed9a4fd2fe3ece30d8dcd8",
        },
        {
          url: "/_next/static/GXPKYOs32GDqjr8GjinEo/_buildManifest.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/GXPKYOs32GDqjr8GjinEo/_middlewareManifest.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/GXPKYOs32GDqjr8GjinEo/_ssgManifest.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/100-eb70941fa7b4b446.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/framework-5f4595e5518b5600.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/main-50770868367ef490.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/_app-c9a02ec84cb5225f.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/_error-2280fa386d040b66.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/add/answer_choice-41ae0d303991cf12.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/add/gift_card/amount-28eb363fd4c4cbfe.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/add/gift_card/type-036388cf689bc38f.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/add/interview_question-9cf0e3506599b76a.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/add/interview_section-63f55130dfc77dd9.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/add/testing_agency-6d09f18c4888d632.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/answer_choices-12fbe7eb09795dcb.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/client_detail/%5Bid%5D-4bad7e5f5634cff2.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/client_detail/edit/%5Bid%5D-2205ad59d4b0069b.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/clients-bcd26cd11e9a3d5b.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/edit/%5Bid%5D/answer_choice-eb6498d65933f3ce.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/edit/%5Bid%5D/gift_cards/amounts-ea0c3f3e7b0d9bc2.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/edit/%5Bid%5D/gift_cards/types-f893b691e706a326.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/edit/%5Bid%5D/interview_section-3cdb968de45ebca8.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/edit/%5Bid%5D/question-76c59d376c726636.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/edit/%5Bid%5D/testing_agencies-481ff9feda499e1f.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/gift_cards-827ecfcc8e145148.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/interview_detail/%5Btype%5D/%5Bid%5D-8c7c250518a203b6.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/interview_detail/%5Btype%5D/edit/%5Badult%5D/%5Bid%5D-4b4081f7c52e8b79.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/interview_detail/%5Btype%5D/edit/%5Badult%5D/%5Bid%5D/demographics-7752ce0724a61f56.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/interview_detail/%5Btype%5D/edit/%5Badult%5D/%5Bid%5D/drug_behavior-c99e7d082c317cae.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/interview_detail/%5Btype%5D/edit/%5Badult%5D/%5Bid%5D/risk_attitudes-cf344390d903531c.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/interview_detail/%5Btype%5D/edit/%5Badult%5D/%5Bid%5D/sexual_behavior-5c4dca4fe8253e7f.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/interview_detail/%5Btype%5D/edit/%5Badult%5D/%5Bid%5D/success-a79bc3383bfe507f.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/interviews-719756a49d8969e5.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/admin/questions-1c92adce444e5df2.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/gift_card/%5Bid%5D/detail-31e43f19f87b2f7c.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/gift_card/%5Bid%5D/disperse-f6c7fb3d104fada0.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/gift_card/%5Bid%5D/edit-ac9c9d8005a40e3a.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/gift_card/records-154cf13566862778.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/index-7bf54076e9df9adc.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/interview-70896e99b834d2c4.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/interview/adult/demographics-5c02e6f6e0c058e3.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/interview/adult/drug_behavior-0640497f9e2122aa.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/interview/adult/risk_attitudes-1a16388ef9e2f0da.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/interview/adult/sexual_behavior-2c79148b58495b0f.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/interview/review-eb4ec3674392f4c7.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/interview/success-a2947a2e82588c56.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/interview/youth/demographics-c8153bbf37fc3e10.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/interview/youth/drug_behavior-a6d64030cb7dc039.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/interview/youth/risk_attitudes-9b81660294758222.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/pages/interview/youth/sexual_behavior-6443b4da2d22a257.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/chunks/webpack-9b312e20a4e32339.js",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        {
          url: "/_next/static/css/2767074a696a731e.css",
          revision: "GXPKYOs32GDqjr8GjinEo",
        },
        { url: "/manifest.json", revision: "9649f284c9668a083caf6a149e242cce" },
        {
          url: "/nora_favicon.png",
          revision: "25cbe44b33c6850add321785620cdc81",
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: i,
              state: n,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
