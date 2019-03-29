var cytoscape = require('cytoscape');
var $ = require("jquery");
var cytoData = require('./nLinks.json'); //(with path)// = JSON.stringify("nodes_convert.json");
window.cytoscape = cytoscape;
// console.log("lol", cytoData);

var cy = cytoscape({
    container: document.getElementById('cy'),
    elements: cytoData,
    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': 'mapData(group_code, 0, 29, rgb(10,250,0), rgb(245,0,220))',
                'label': 'data(id)',
                'width': "mapData(links, 0, 10, 20, 60)",
                "height": "mapData(links, 0, 10, 20, 60)",
            }
        }, {
            selector: 'edge',
            style: {
                'width': 2,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle'
            }
        }
    ],
    layout: {
        name: 'grid',
        rows: 1
    }
});

// Layout
// http://js.cytoscape.org/#layouts
let options = {
    name: 'circle',
    fit: true, // whether to fit the viewport to the graph
    padding: 30, // the padding on fit
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
    radius: undefined, // the radius of the circle
    startAngle: 3 / 2 * Math.PI, // where nodes start in radians
    sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
    clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
    sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled
    animateFilter: function (node, i) { return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop
    transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 

};

cy.layout(options);
var layout = cy.layout(options);
layout.run();
// var layout = cy.layout({ name: 'random' });
//   layout.start()

// Iterate over each node by copying ref.
let nodes = cy.nodes();
let lastNodeSearch = 0;
let lastNodeColor = 0;

nodes.forEach(n => {
    // console.log("Node", n.data());
    // console.log("Indegrees:\t" + n.indegree(false));
});

let priorNode = 0;

cy.$('node').on('grab', function (e) {
    console.log("E",e);
    if (priorNode != 0) {
        priorNode.target.connectedEdges().style({ 'line-color': '#ccc' });
    }
    var ele = e.target;
    ele.connectedEdges().style({ 'line-color': 'red' });
    priorNode = e;
});

// Tinapple,David A

// JQuery Search Feature
$("#submit").on("click", function () {
    let name = $("input:text").val();    
    let nodes = cy.nodes();
    nodes.forEach(n => {
        if (n.data().id == name || n.data().id.includes(name)) {    // TODO: Format data to be last name, first name
            // console.log(n.data());
            // console.log("FOUND", n.data().id);
            // console.log("N", cy.nodes(findNode).connectedEdges());            
            var findNode = '[id = ' + '"' + name + '"' + ']'
            lastNodeColor = cy.nodes(findNode).style('background-color');
            console.log("col",lastNodeColor);
            cy.nodes(findNode).style('background-color', 'magenta');  
            cy.nodes(findNode).connectedEdges().style({ 'line-color': 'red' });
            if (lastNodeColor != 0) {
                // cy.nodes(lastNodeSearch).style('background-color', lastNodeColor)       
            }   
            lastNodeSearch = findNode;       // Assign reference to past node.
        } else if (n.data().group == name) {    // Matching group code.            
            // console.log("FOUND", n.data().id);
            var findNode = '[id = ' + '"' + name + '"' + ']'
            cy.nodes(findNode).style('background-color', 'magenta');
            //TODO: Update edge connections and coloring references.            
        }
    })

});

// Press enter to submit once typing.
$('#name').keydown(function (event) {
    var keyCode = (event.keyCode ? event.keyCode : event.which);
    if (keyCode == '13') {
        $('#submit').trigger('click');
    }
});

// Allow auto-comlete of input.
// function complete(){
//     let nodes = cy.nodes();
//     $( "#name" ).autocomplete({
//          source: nodes
//       });   
// }

// complete();