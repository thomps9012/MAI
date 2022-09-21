/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
    let registry = {};

    // Used for `eval` and `importScripts` where we can't get script URL by other means.
    // In both cases, it's safe to use a global var because those functions are synchronous.
    let nextDefineUri;

    const singleRequire = (uri, parentUri) => {
        uri = new URL(uri + ".js", parentUri).href;
        return registry[uri] || (

            new Promise(resolve => {
                if ("document" in self) {
                    const script = document.createElement("script");
                    script.src = uri;
                    script.onload = resolve;
                    document.head.appendChild(script);
                } else {
                    nextDefineUri = uri;
                    importScripts(uri);
                    resolve();
                }
            })

                .then(() => {
                    let promise = registry[uri];
                    if (!promise) {
                        throw new Error(`Module ${uri} didn’t register its module`);
                    }
                    return promise;
                })
        );
    };

    self.define = (depsNames, factory) => {
        const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
        if (registry[uri]) {
            // Module is already loading or loaded.
            return;
        }
        let exports = {};
        const require = depUri => singleRequire(depUri, uri);
        const specialDeps = {
            module: { uri },
            exports,
            require
        };
        registry[uri] = Promise.all(depsNames.map(
            depName => specialDeps[depName] || require(depName)
        )).then(deps => {
            factory(...deps);
            return exports;
        });
    };
    // ensure to update all api call caches
    const apiCalls = [
        '/api/adult_questions',
        // '/api/adult_demographics',
        '/api/drug_behavior',
        // '/api/adult_sexual_behavior',
        // '/api/adult_risk_attitudes',
        '/api/youth_questions',
        '/api/youth_demographics',
        '/api/youth_sexual_behavior',
        '/api/youth_risk_attitudes',
        '/api/answers',
        '/api/count_records',
        '/api/testing_only',
        '/api/baselines',
        '/api/follow_ups',
        '/api/exits',
    ]
    const CUSTOM_CACHE = 'cached_api'
    self.addEventListener('install', (e) =>
        e.waitUntil(
            caches.open(CUSTOM_CACHE).then((cache) => cache.addAll(apiCalls))
        )
    );
    // deletes cache keys that are not part of the custom cache
    self.addEventListener('activate', (e) =>
        e.waitUntil(
            caches.keys().then((keyList) =>
                Promise.all(
                    keyList.map((key) => {
                        if (key !== CUSTOM_CACHE) {
                            return caches.delete(key);
                        }
                    })
                )
            ),
        )
    );

    const request = indexedDB.open('MAI_INFORMATION', 1)
    request.onupgradeneeded = function (event) {
        const db = event.target.result;
        db.createObjectStore('adult_questions'),
            db.createObjectStore('record_count'),
            db.createObjectStore('youth_questions'),
            db.createObjectStore('answers')
    }

    // Claim - the service worker is claimed after install.
    // When a service worker is initially registered, pages won't use it until the next load.
    // The clients.claim() method is used to claim the service worker immediately.
    self.addEventListener('activate', (e) => {
        e.waitUntil(clients.claim());
    });

    // Example of a simple cache-first network-first strategy
    // The service worker is checking the cache for a response and if it doesn't find it, it fetches it.
    self.addEventListener('fetch', (e) =>
        e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)))
    )
}
define(['./workbox-d1b0e804'], (function (workbox) {
    'use strict';

    /**
    * Welcome to your Workbox-powered service worker!
    *
    * You'll need to register this file in your web app.
    * See https://goo.gl/nhQhGp
    *
    * The rest of the code is auto-generated. Please don't update this file
    * directly; instead, make changes to your Workbox build configuration
    * and re-run your build process.
    * See https://goo.gl/2aRDsh
    */

    importScripts();
    self.skipWaiting();
    workbox.clientsClaim();
    workbox.registerRoute("/", new workbox.NetworkFirst({
        "cacheName": "start-url",
        plugins: [{
            cacheWillUpdate: async ({
                request,
                response,
                event,
                state
            }) => {
                if (response && response.type === 'opaqueredirect') {
                    return new Response(response.body, {
                        status: 200,
                        statusText: 'OK',
                        headers: response.headers
                    });
                }

                return response;
            }
        }]
    }), 'GET');
    workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
        "cacheName": "dev",
        plugins: []
    }), 'GET');

}));
//# sourceMappingURL=sw.js.map
