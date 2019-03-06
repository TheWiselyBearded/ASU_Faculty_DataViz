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
})({"js/cytoscape-cola.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
Copyright (c) The Cytoscape Consortium

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
;

(function () {
  'use strict'; // registers the extension on a cytoscape lib ref

  var register = function register(cytoscape, cola) {
    if (!cytoscape || !cola) {
      return;
    } // can't register if cytoscape unspecified


    var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;

    var isString = function isString(o) {
      return _typeof(o) === _typeof('');
    };

    var isNumber = function isNumber(o) {
      return _typeof(o) === _typeof(0);
    };

    var isObject = function isObject(o) {
      return o != null && _typeof(o) === _typeof({});
    }; // default layout options


    var defaults = {
      animate: true,
      // whether to show the layout as it's running
      refresh: 1,
      // number of ticks per frame; higher is faster but more jerky
      maxSimulationTime: 4000,
      // max length in ms to run the layout
      ungrabifyWhileSimulating: false,
      // so you can't drag nodes during layout
      fit: true,
      // on every layout reposition of nodes, fit the viewport
      padding: 30,
      // padding around the simulation
      boundingBox: undefined,
      // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      // layout event callbacks
      ready: function ready() {},
      // on layoutready
      stop: function stop() {},
      // on layoutstop
      // positioning options
      randomize: false,
      // use random node positions at beginning of layout
      avoidOverlap: true,
      // if true, prevents overlap of node bounding boxes
      handleDisconnected: true,
      // if true, avoids disconnected components from overlapping
      nodeSpacing: function nodeSpacing(node) {
        return 10;
      },
      // extra spacing around nodes
      flow: undefined,
      // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
      alignment: undefined,
      // relative alignment constraints on nodes, e.g. function( node ){ return { x: 0, y: 1 } }
      // different methods of specifying edge length
      // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
      edgeLength: undefined,
      // sets edge length directly in simulation
      edgeSymDiffLength: undefined,
      // symmetric diff edge length in simulation
      edgeJaccardLength: undefined,
      // jaccard edge length in simulation
      // iterations of cola algorithm; uses default values on undefined
      unconstrIter: undefined,
      // unconstrained initial layout iterations
      userConstIter: undefined,
      // initial layout iterations with user-specified constraints
      allConstIter: undefined,
      // initial layout iterations with all constraints including non-overlap
      // infinite layout options
      infinite: false // overrides all other options for a forces-all-the-time mode

    }; // constructor
    // options : object containing layout options

    function ColaLayout(options) {
      var opts = this.options = {};

      for (var i in defaults) {
        opts[i] = defaults[i];
      }

      for (var i in options) {
        opts[i] = options[i];
      }
    } // runs the layout


    ColaLayout.prototype.run = function () {
      var layout = this;
      var options = this.options;
      layout.manuallyStopped = false;
      var cy = options.cy; // cy is automatically populated for us in the constructor

      var eles = options.eles;
      var nodes = eles.nodes();
      var edges = eles.edges();
      var ready = false;
      var bb = options.boundingBox || {
        x1: 0,
        y1: 0,
        w: cy.width(),
        h: cy.height()
      };

      if (bb.x2 === undefined) {
        bb.x2 = bb.x1 + bb.w;
      }

      if (bb.w === undefined) {
        bb.w = bb.x2 - bb.x1;
      }

      if (bb.y2 === undefined) {
        bb.y2 = bb.y1 + bb.h;
      }

      if (bb.h === undefined) {
        bb.h = bb.y2 - bb.y1;
      }

      var typeoffn = _typeof(function () {});

      var getOptVal = function getOptVal(val, ele) {
        if (_typeof(val) === typeoffn) {
          var fn = val;
          return fn.apply(ele, [ele]);
        } else {
          return val;
        }
      };

      var updateNodePositions = function updateNodePositions() {
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          var scratch = node.scratch('cola'); // update node dims

          if (!scratch.updatedDims) {
            var padding = getOptVal(options.nodeSpacing, node);
            scratch.width = node.outerWidth() + 2 * padding;
            scratch.height = node.outerHeight() + 2 * padding;
          }
        }

        nodes.positions(function (i, node) {
          var scratch = node.scratch().cola;
          var retPos;

          if (!node.grabbed() && !node.isParent()) {
            retPos = {
              x: bb.x1 + scratch.x,
              y: bb.y1 + scratch.y
            };

            if (!isNumber(retPos.x) || !isNumber(retPos.y)) {
              retPos = undefined;
            }
          }

          return retPos;
        });
        nodes.updateCompoundBounds(); // because the way this layout sets positions is buggy for some reason; ref #878

        if (!ready) {
          onReady();
          ready = true;
        }

        if (options.fit) {
          cy.fit(options.padding);
        }
      };

      var onDone = function onDone() {
        if (options.ungrabifyWhileSimulating) {
          grabbableNodes.grabify();
        }

        cy.off('destroy', destroyHandler);
        nodes.off('grab free position', grabHandler);
        nodes.off('lock unlock', lockHandler); // trigger layoutstop when the layout stops (e.g. finishes)

        layout.one('layoutstop', options.stop);
        layout.trigger({
          type: 'layoutstop',
          layout: layout
        });
      };

      var onReady = function onReady() {
        // trigger layoutready when each node has had its position set at least once
        layout.one('layoutready', options.ready);
        layout.trigger({
          type: 'layoutready',
          layout: layout
        });
      };

      var ticksPerFrame = options.refresh;
      var tickSkip = 1; // frames until a tick; used to slow down sim for debugging

      if (options.refresh < 0) {
        tickSkip = Math.abs(options.refresh);
        ticksPerFrame = 1;
      } else {
        ticksPerFrame = Math.max(1, ticksPerFrame); // at least 1
      }

      var adaptor = layout.adaptor = cola.adaptor({
        trigger: function trigger(e) {
          // on sim event
          var TICK = cola.EventType ? cola.EventType.tick : null;
          var END = cola.EventType ? cola.EventType.end : null;

          switch (e.type) {
            case 'tick':
            case TICK:
              if (options.animate) {
                updateNodePositions();
              }

              break;

            case 'end':
            case END:
              updateNodePositions();

              if (!options.infinite) {
                onDone();
              }

              break;
          }
        },
        kick: function kick() {
          // kick off the simulation
          //var skip = 0;
          var inftick = function inftick() {
            if (layout.manuallyStopped) {
              onDone();
              return true;
            }

            var ret = adaptor.tick();

            if (ret && options.infinite) {
              // resume layout if done
              adaptor.resume(); // resume => new kick
            }

            return ret; // allow regular finish b/c of new kick
          };

          var multitick = function multitick() {
            // multiple ticks in a row
            var ret; // skip ticks to slow down layout for debugging
            // var thisSkip = skip;
            // skip = (skip + 1) % tickSkip;
            // if( thisSkip !== 0 ){
            //   return false;
            // }

            for (var i = 0; i < ticksPerFrame && !ret; i++) {
              ret = ret || inftick(); // pick up true ret vals => sim done
            }

            return ret;
          };

          if (options.animate) {
            var frame = function frame() {
              if (multitick()) {
                return;
              }

              raf(frame);
            };

            raf(frame);
          } else {
            while (!inftick()) {}
          }
        },
        on: function on(type, listener) {},
        // dummy; not needed
        drag: function drag() {} // not needed for our case

      });
      layout.adaptor = adaptor; // if set no grabbing during layout

      var grabbableNodes = nodes.filter(':grabbable');

      if (options.ungrabifyWhileSimulating) {
        grabbableNodes.ungrabify();
      }

      var destroyHandler;
      cy.one('destroy', destroyHandler = function destroyHandler(e) {
        layout.stop();
      }); // handle node dragging

      var grabHandler;
      nodes.on('grab free position', grabHandler = function grabHandler(e) {
        var node = this;
        var scrCola = node.scratch().cola;
        var pos = node.position();

        switch (e.type) {
          case 'grab':
            adaptor.dragstart(scrCola);
            adaptor.resume();
            break;

          case 'free':
            adaptor.dragend(scrCola);
            break;

          case 'position':
            // only update when different (i.e. manual .position() call or drag) so we don't loop needlessly
            if (scrCola.x !== pos.x - bb.x1 || scrCola.y !== pos.y - bb.y1) {
              scrCola.px = pos.x - bb.x1;
              scrCola.py = pos.y - bb.y1;
              adaptor.resume();
            }

            break;
        }
      });
      var lockHandler;
      nodes.on('lock unlock', lockHandler = function lockHandler(e) {
        var node = this;
        var scrCola = node.scratch().cola;
        scrCola.fixed = node.locked();

        if (node.locked()) {
          adaptor.dragstart(scrCola);
        } else {
          adaptor.dragend(scrCola);
        }
      });
      var nonparentNodes = nodes.stdFilter(function (node) {
        return !node.isParent();
      }); // add nodes to cola

      adaptor.nodes(nonparentNodes.map(function (node, i) {
        var padding = getOptVal(options.nodeSpacing, node);
        var pos = node.position();
        var nbb = node.boundingBox();
        var struct = node.scratch().cola = {
          x: options.randomize || pos.x === undefined ? Math.round(Math.random() * bb.w) : pos.x,
          y: options.randomize || pos.y === undefined ? Math.round(Math.random() * bb.h) : pos.y,
          width: nbb.w + 2 * padding,
          height: nbb.h + 2 * padding,
          index: i,
          fixed: node.locked()
        };
        return struct;
      }));

      if (options.alignment) {
        // then set alignment constraints
        var offsetsX = [];
        var offsetsY = [];
        nonparentNodes.forEach(function (node) {
          var align = getOptVal(options.alignment, node);
          var scrCola = node.scratch().cola;
          var index = scrCola.index;

          if (!align) {
            return;
          }

          if (align.x != null) {
            offsetsX.push({
              node: index,
              offset: align.x
            });
          }

          if (align.y != null) {
            offsetsY.push({
              node: index,
              offset: align.y
            });
          }
        }); // add alignment constraints on nodes

        var constraints = [];

        if (offsetsX.length > 0) {
          constraints.push({
            type: 'alignment',
            axis: 'x',
            offsets: offsetsX
          });
        }

        if (offsetsY.length > 0) {
          constraints.push({
            type: 'alignment',
            axis: 'y',
            offsets: offsetsY
          });
        }

        adaptor.constraints(constraints);
      } // add compound nodes to cola


      adaptor.groups(nodes.stdFilter(function (node) {
        return node.isParent();
      }).map(function (node, i) {
        // add basic group incl leaf nodes
        var optPadding = getOptVal(options.nodeSpacing, node);

        var getPadding = function getPadding(d) {
          return parseFloat(node.style('padding-' + d));
        };

        var pleft = getPadding('left') + optPadding;
        var pright = getPadding('right') + optPadding;
        var ptop = getPadding('top') + optPadding;
        var pbottom = getPadding('bottom') + optPadding;
        node.scratch().cola = {
          index: i,
          padding: Math.max(pleft, pright, ptop, pbottom),
          // leaves should only contain direct descendants (children),
          // not the leaves of nested compound nodes or any nodes that are compounds themselves
          leaves: node.children().stdFilter(function (child) {
            return !child.isParent();
          }).map(function (child) {
            return child[0].scratch().cola.index;
          }),
          fixed: node.locked()
        };
        return node;
      }).map(function (node) {
        // add subgroups
        node.scratch().cola.groups = node.children().stdFilter(function (child) {
          return child.isParent();
        }).map(function (child) {
          return child.scratch().cola.index;
        });
        return node.scratch().cola;
      })); // get the edge length setting mechanism

      var length;
      var lengthFnName;

      if (options.edgeLength != null) {
        length = options.edgeLength;
        lengthFnName = 'linkDistance';
      } else if (options.edgeSymDiffLength != null) {
        length = options.edgeSymDiffLength;
        lengthFnName = 'symmetricDiffLinkLengths';
      } else if (options.edgeJaccardLength != null) {
        length = options.edgeJaccardLength;
        lengthFnName = 'jaccardLinkLengths';
      } else {
        length = 100;
        lengthFnName = 'linkDistance';
      }

      var lengthGetter = function lengthGetter(link) {
        return link.calcLength;
      }; // add the edges to cola


      adaptor.links(edges.stdFilter(function (edge) {
        return !edge.source().isParent() && !edge.target().isParent();
      }).map(function (edge, i) {
        var c = edge.scratch().cola = {
          source: edge.source()[0].scratch().cola.index,
          target: edge.target()[0].scratch().cola.index
        };

        if (length != null) {
          c.calcLength = getOptVal(length, edge);
        }

        return c;
      }));
      adaptor.size([bb.w, bb.h]);

      if (length != null) {
        adaptor[lengthFnName](lengthGetter);
      } // set the flow of cola


      if (options.flow) {
        var flow;
        var defAxis = 'y';
        var defMinSep = 50;

        if (isString(options.flow)) {
          flow = {
            axis: options.flow,
            minSeparation: defMinSep
          };
        } else if (isNumber(options.flow)) {
          flow = {
            axis: defAxis,
            minSeparation: options.flow
          };
        } else if (isObject(options.flow)) {
          flow = options.flow;
          flow.axis = flow.axis || defAxis;
          flow.minSeparation = flow.minSeparation != null ? flow.minSeparation : defMinSep;
        } else {
          // e.g. options.flow: true
          flow = {
            axis: defAxis,
            minSeparation: defMinSep
          };
        }

        adaptor.flowLayout(flow.axis, flow.minSeparation);
      }

      layout.trigger({
        type: 'layoutstart',
        layout: layout
      });
      adaptor.avoidOverlaps(options.avoidOverlap).handleDisconnected(options.handleDisconnected).start(options.unconstrIter, options.userConstIter, options.allConstIter);

      if (!options.infinite) {
        setTimeout(function () {
          if (!layout.manuallyStopped) {
            adaptor.stop();
          }
        }, options.maxSimulationTime);
      }

      return this; // chaining
    }; // called on continuous layouts to stop them before they finish


    ColaLayout.prototype.stop = function () {
      if (this.adaptor) {
        this.manuallyStopped = true;
        this.adaptor.stop();
      }

      return this; // chaining
    };

    cytoscape('layout', 'cola', ColaLayout);
  };

  if (typeof module !== 'undefined' && module.exports) {
    // expose as a commonjs module
    module.exports = register;
  }

  if (typeof define !== 'undefined' && define.amd) {
    // expose as an amd/requirejs module
    define('cytoscape-cola', function () {
      return register;
    });
  }

  if (typeof cytoscape !== 'undefined' && typeof cola !== 'undefined') {
    // expose to global cytoscape (i.e. window.cytoscape)
    register(cytoscape, cola);
  }
})();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53761" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/cytoscape-cola.js"], null)
//# sourceMappingURL=/cytoscape-cola.2dd2899f.map