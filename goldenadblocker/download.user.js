// ==UserScript==
// @name         GoldenAdblocker
// @namespace    https://ilomero.com/
// @version      1.2.7
// @description  Removes 99% of ads from YouTube :) auto-loading the latest version. (v5 loader)
// @author       Ilomero.com
// @updateURL    https://ilomero.com/goldenadblocker/download.user.js
// @downloadURL  https://ilomero.com/goldenadblocker/download.user.js
// @match        *://m.youtube.com/*
// @match        *://www.youtube.com/*
// @match        *://youtube.com/*
// @match        *://*.wikipedia.org/*
// @icon         https://ilomero.com/goldenadblocker/favicon.ico
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    if (window.trustedTypes && window.trustedTypes.createPolicy && !window.trustedTypes.defaultPolicy) {
        window.trustedTypes.createPolicy('default', {
            createHTML: string => string,
            createScriptURL: string => string,
            createScript: string => string
        });
    }

    function goldenAdblocker_load(loadAttempts) {
        if (loadAttempts >= 9) {
            alert('GoldenAdblocker could not be loaded! Please refresh the page to try again.');
            return;
        }

        loadAttempts++;

        fetch('https://ilomero.com/goldenadblocker/main.js')
            .then(response => response.text())
            .then(data => {
                const element = document.createElement('script');
                element.innerHTML = data;
                document.head.appendChild(element);
            })
            .catch(() => {
                setTimeout(() => {
                    goldenAdblocker_load(loadAttempts);
                }, 500);
            });
    }

    goldenAdblocker_load(0);
})();
