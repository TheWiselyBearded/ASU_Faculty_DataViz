var cytoscape = require('cytoscape');
var $ = require("jquery");
var cytoData = require('./nLinks.json'); //(with path)// = JSON.stringify("nodes_convert.json");
let euler = require('cytoscape-euler');

cytoscape.use( euler );
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
// Assign formatted layout values.
cy.layout(options).run();
// var layout = cy.layout(options);    // Grab layout as variable to run it.
// layout.run();
// var layout = cy.layout({ name: 'random' });
//   layout.start()

let defaults = {
    name: 'euler',
    // The ideal length of a spring
    // - This acts as a hint for the edge length
    // - The edge length can be longer or shorter if the forces are set to extreme values
    springLength: edge => 80,
    // Hooke's law coefficient
    // - The value ranges on [0, 1]
    // - Lower values give looser springs
    // - Higher values give tighter springs
    springCoeff: edge => 0.0008,
    // The mass of the node in the physics simulation
    // - The mass affects the gravity node repulsion/attraction
    mass: node => 4,
    // Coulomb's law coefficient
    // - Makes the nodes repel each other for negative values
    // - Makes the nodes attract each other for positive values
    gravity: -1.2,
    // A force that pulls nodes towards the origin (0, 0)
    // Higher values keep the components less spread out
    pull: 0.001,
    // Theta coefficient from Barnes-Hut simulation
    // - Value ranges on [0, 1]
    // - Performance is better with smaller values
    // - Very small values may not create enough force to give a good result
    theta: 0.666,
    // Friction / drag coefficient to make the system stabilise over time
    dragCoeff: 0.02,
    // When the total of the squared position deltas is less than this value, the simulation ends
    movementThreshold: 1,
    // The amount of time passed per tick
    // - Larger values result in faster runtimes but might spread things out too far
    // - Smaller values produce more accurate results
    timeStep: 20,
    // The number of ticks per frame for animate:true
    // - A larger value reduces rendering cost but can be jerky
    // - A smaller value increases rendering cost but is smoother
    refresh: 10,
    // Whether to animate the layout
    // - true : Animate while the layout is running
    // - false : Just show the end result
    // - 'end' : Animate directly to the end result
    animate: true,
    // Animation duration used for animate:'end'
    animationDuration: undefined,
    // Easing for animate:'end'
    animationEasing: undefined,
    // Maximum iterations and time (in ms) before the layout will bail out
    // - A large value may allow for a better result
    // - A small value may make the layout end prematurely
    // - The layout may stop before this if it has settled
    maxIterations: 1000,
    maxSimulationTime: 4000,
    // Prevent the user grabbing nodes during the layout (usually with animate:true)
    ungrabifyWhileSimulating: false,
    // Whether to fit the viewport to the repositioned graph
    // true : Fits at end of layout for animate:false or animate:'end'; fits on each frame for animate:true
    fit: true,
    // Padding in rendered co-ordinates around the layout
    padding: 30,
    // Constrain layout bounds with one of
    // - { x1, y1, x2, y2 }
    // - { x1, y1, w, h }
    // - undefined / null : Unconstrained
    boundingBox: undefined,
    // Layout event callbacks; equivalent to `layout.one('layoutready', callback)` for example
    ready: function(){}, // on layoutready
    stop: function(){}, // on layoutstop
    // Whether to randomize the initial positions of the nodes
    // true : Use random positions within the bounding box
    // false : Use the current node positions as the initial positions
    randomize: false
  };
  cy.layout( defaults ).run();

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