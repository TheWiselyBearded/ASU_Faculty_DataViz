// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"css/open-sans.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../fonts/OpenSans-Bold-webfont.eot":[["OpenSans-Bold-webfont.3eb10765.eot","fonts/OpenSans-Bold-webfont.eot"],"fonts/OpenSans-Bold-webfont.eot"],"./../fonts/OpenSans-Bold-webfont.woff":[["OpenSans-Bold-webfont.7db9977f.woff","fonts/OpenSans-Bold-webfont.woff"],"fonts/OpenSans-Bold-webfont.woff"],"./../fonts/OpenSans-Bold-webfont.ttf":[["OpenSans-Bold-webfont.129744bc.ttf","fonts/OpenSans-Bold-webfont.ttf"],"fonts/OpenSans-Bold-webfont.ttf"],"./../fonts/OpenSans-Bold-webfont.svg":[["OpenSans-Bold-webfont.d4de8ce8.svg","fonts/OpenSans-Bold-webfont.svg"],"fonts/OpenSans-Bold-webfont.svg"],"./../fonts/OpenSans-BoldItalic-webfont.eot":[["OpenSans-BoldItalic-webfont.733b4734.eot","fonts/OpenSans-BoldItalic-webfont.eot"],"fonts/OpenSans-BoldItalic-webfont.eot"],"./../fonts/OpenSans-BoldItalic-webfont.woff":[["OpenSans-BoldItalic-webfont.304fa0dd.woff","fonts/OpenSans-BoldItalic-webfont.woff"],"fonts/OpenSans-BoldItalic-webfont.woff"],"./../fonts/OpenSans-BoldItalic-webfont.ttf":[["OpenSans-BoldItalic-webfont.fc3637b6.ttf","fonts/OpenSans-BoldItalic-webfont.ttf"],"fonts/OpenSans-BoldItalic-webfont.ttf"],"./../fonts/OpenSans-BoldItalic-webfont.svg":[["OpenSans-BoldItalic-webfont.a2bd637b.svg","fonts/OpenSans-BoldItalic-webfont.svg"],"fonts/OpenSans-BoldItalic-webfont.svg"],"./../fonts/OpenSans-ExtraBold-webfont.eot":[["OpenSans-ExtraBold-webfont.dd277db5.eot","fonts/OpenSans-ExtraBold-webfont.eot"],"fonts/OpenSans-ExtraBold-webfont.eot"],"./../fonts/OpenSans-ExtraBold-webfont.woff":[["OpenSans-ExtraBold-webfont.d7911834.woff","fonts/OpenSans-ExtraBold-webfont.woff"],"fonts/OpenSans-ExtraBold-webfont.woff"],"./../fonts/OpenSans-ExtraBold-webfont.ttf":[["OpenSans-ExtraBold-webfont.3663ffac.ttf","fonts/OpenSans-ExtraBold-webfont.ttf"],"fonts/OpenSans-ExtraBold-webfont.ttf"],"./../fonts/OpenSans-ExtraBold-webfont.svg":[["OpenSans-ExtraBold-webfont.1cdd17e4.svg","fonts/OpenSans-ExtraBold-webfont.svg"],"fonts/OpenSans-ExtraBold-webfont.svg"],"./../fonts/OpenSans-ExtraBoldItalic-webfont.eot":[["OpenSans-ExtraBoldItalic-webfont.e9f8a2e7.eot","fonts/OpenSans-ExtraBoldItalic-webfont.eot"],"fonts/OpenSans-ExtraBoldItalic-webfont.eot"],"./../fonts/OpenSans-ExtraBoldItalic-webfont.woff":[["OpenSans-ExtraBoldItalic-webfont.fa218bdf.woff","fonts/OpenSans-ExtraBoldItalic-webfont.woff"],"fonts/OpenSans-ExtraBoldItalic-webfont.woff"],"./../fonts/OpenSans-ExtraBoldItalic-webfont.ttf":[["OpenSans-ExtraBoldItalic-webfont.1280f6c0.ttf","fonts/OpenSans-ExtraBoldItalic-webfont.ttf"],"fonts/OpenSans-ExtraBoldItalic-webfont.ttf"],"./../fonts/OpenSans-ExtraBoldItalic-webfont.svg":[["OpenSans-ExtraBoldItalic-webfont.323d4cbe.svg","fonts/OpenSans-ExtraBoldItalic-webfont.svg"],"fonts/OpenSans-ExtraBoldItalic-webfont.svg"],"./../fonts/OpenSans-Italic-webfont.eot":[["OpenSans-Italic-webfont.289f3210.eot","fonts/OpenSans-Italic-webfont.eot"],"fonts/OpenSans-Italic-webfont.eot"],"./../fonts/OpenSans-Italic-webfont.woff":[["OpenSans-Italic-webfont.b2f55de9.woff","fonts/OpenSans-Italic-webfont.woff"],"fonts/OpenSans-Italic-webfont.woff"],"./../fonts/OpenSans-Italic-webfont.ttf":[["OpenSans-Italic-webfont.9b9274db.ttf","fonts/OpenSans-Italic-webfont.ttf"],"fonts/OpenSans-Italic-webfont.ttf"],"./../fonts/OpenSans-Italic-webfont.svg":[["OpenSans-Italic-webfont.9f21086c.svg","fonts/OpenSans-Italic-webfont.svg"],"fonts/OpenSans-Italic-webfont.svg"],"./../fonts/OpenSans-Light-webfont.eot":[["OpenSans-Light-webfont.409c1879.eot","fonts/OpenSans-Light-webfont.eot"],"fonts/OpenSans-Light-webfont.eot"],"./../fonts/OpenSans-Light-webfont.woff":[["OpenSans-Light-webfont.81803074.woff","fonts/OpenSans-Light-webfont.woff"],"fonts/OpenSans-Light-webfont.woff"],"./../fonts/OpenSans-Light-webfont.ttf":[["OpenSans-Light-webfont.accf7087.ttf","fonts/OpenSans-Light-webfont.ttf"],"fonts/OpenSans-Light-webfont.ttf"],"./../fonts/OpenSans-Light-webfont.svg":[["OpenSans-Light-webfont.2de630a3.svg","fonts/OpenSans-Light-webfont.svg"],"fonts/OpenSans-Light-webfont.svg"],"./../fonts/OpenSans-LightItalic-webfont.eot":[["OpenSans-LightItalic-webfont.81f5a63f.eot","fonts/OpenSans-LightItalic-webfont.eot"],"fonts/OpenSans-LightItalic-webfont.eot"],"./../fonts/OpenSans-LightItalic-webfont.woff":[["OpenSans-LightItalic-webfont.ad1c28ad.woff","fonts/OpenSans-LightItalic-webfont.woff"],"fonts/OpenSans-LightItalic-webfont.woff"],"./../fonts/OpenSans-LightItalic-webfont.ttf":[["OpenSans-LightItalic-webfont.900a3855.ttf","fonts/OpenSans-LightItalic-webfont.ttf"],"fonts/OpenSans-LightItalic-webfont.ttf"],"./../fonts/OpenSans-LightItalic-webfont.svg":[["OpenSans-LightItalic-webfont.c7af558f.svg","fonts/OpenSans-LightItalic-webfont.svg"],"fonts/OpenSans-LightItalic-webfont.svg"],"./../fonts/OpenSans-Regular-webfont.eot":[["OpenSans-Regular-webfont.622df592.eot","fonts/OpenSans-Regular-webfont.eot"],"fonts/OpenSans-Regular-webfont.eot"],"./../fonts/OpenSans-Regular-webfont.woff":[["OpenSans-Regular-webfont.213a9b2a.woff","fonts/OpenSans-Regular-webfont.woff"],"fonts/OpenSans-Regular-webfont.woff"],"./../fonts/OpenSans-Regular-webfont.ttf":[["OpenSans-Regular-webfont.2358cf11.ttf","fonts/OpenSans-Regular-webfont.ttf"],"fonts/OpenSans-Regular-webfont.ttf"],"./../fonts/OpenSans-Regular-webfont.svg":[["OpenSans-Regular-webfont.567c20cd.svg","fonts/OpenSans-Regular-webfont.svg"],"fonts/OpenSans-Regular-webfont.svg"],"./../fonts/OpenSans-Semibold-webfont.eot":[["OpenSans-Semibold-webfont.72160124.eot","fonts/OpenSans-Semibold-webfont.eot"],"fonts/OpenSans-Semibold-webfont.eot"],"./../fonts/OpenSans-Semibold-webfont.woff":[["OpenSans-Semibold-webfont.e3514fdf.woff","fonts/OpenSans-Semibold-webfont.woff"],"fonts/OpenSans-Semibold-webfont.woff"],"./../fonts/OpenSans-Semibold-webfont.ttf":[["OpenSans-Semibold-webfont.b60e8bb2.ttf","fonts/OpenSans-Semibold-webfont.ttf"],"fonts/OpenSans-Semibold-webfont.ttf"],"./../fonts/OpenSans-Semibold-webfont.svg":[["OpenSans-Semibold-webfont.faf19ac6.svg","fonts/OpenSans-Semibold-webfont.svg"],"fonts/OpenSans-Semibold-webfont.svg"],"./../fonts/OpenSans-SemiboldItalic-webfont.eot":[["OpenSans-SemiboldItalic-webfont.7f35a0de.eot","fonts/OpenSans-SemiboldItalic-webfont.eot"],"fonts/OpenSans-SemiboldItalic-webfont.eot"],"./../fonts/OpenSans-SemiboldItalic-webfont.woff":[["OpenSans-SemiboldItalic-webfont.5ae00b1b.woff","fonts/OpenSans-SemiboldItalic-webfont.woff"],"fonts/OpenSans-SemiboldItalic-webfont.woff"],"./../fonts/OpenSans-SemiboldItalic-webfont.ttf":[["OpenSans-SemiboldItalic-webfont.cecab474.ttf","fonts/OpenSans-SemiboldItalic-webfont.ttf"],"fonts/OpenSans-SemiboldItalic-webfont.ttf"],"./../fonts/OpenSans-SemiboldItalic-webfont.svg":[["OpenSans-SemiboldItalic-webfont.71ae75ff.svg","fonts/OpenSans-SemiboldItalic-webfont.svg"],"fonts/OpenSans-SemiboldItalic-webfont.svg"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56408" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)