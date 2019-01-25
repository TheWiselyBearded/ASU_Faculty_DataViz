// import cytoscape from 'cytoscape';
// const cytoscape = require('cytoscape');
// const cytoscape = require('https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.3.3/cytoscape.esm.js');

const csvFilePath='./nodes.csv';
const csv=require('csvtojson');
// var jquery = require('jquery');
// var contextMenus = require('cytoscape-context-menus');
// contextMenus( cytoscape, jquery ); // register extension

var cytoData = $.getJSON(csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj); 
}));
// var cytoData = $.getJSON("nodes_converted.json")

var cy = cytoscape({
    // very commonly used options
    container: $('#cy'),
    elements: cytoData,
    style: [{
        selector: 'node',
        style: {
            'label': 'data(label)',
            'width': '60px',
            'height': '60px',
            'color': 'blue',
            'background-fit': 'contain',
            'background-clip': 'none'
        }
    }, {
        selector: 'edge',
        style: {
           'text-background-color': 'yellow',
            'text-background-opacity': 0.4,
            'width': '6px',
            'target-arrow-shape': 'triangle',
            'control-point-step-size': '140px'
        }
    }],
    layout: { name: 'grid' /* , ... */ },
  
    // initial viewport state:
    zoom: 1,
    pan: { x: 0, y: 0 },
  
    // interaction options:
    minZoom: 1e-50,
    maxZoom: 1e50,
    zoomingEnabled: true,
    userZoomingEnabled: true,
    panningEnabled: true,
    userPanningEnabled: true,
    boxSelectionEnabled: false,
    selectionType: 'single',
    touchTapThreshold: 8,
    desktopTapThreshold: 4,
    autolock: false,
    autoungrabify: false,
    autounselectify: false,
  
    // rendering options:
    headless: false,
    styleEnabled: true,
    hideEdgesOnViewport: false,
    hideLabelsOnViewport: false,
    textureOnViewport: false,
    motionBlur: false,
    motionBlurOpacity: 0.2,
    wheelSensitivity: 1,
    pixelRatio: 'auto'
  });


