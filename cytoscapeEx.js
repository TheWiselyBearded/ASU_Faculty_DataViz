// import {cytoscape} from 'cytoscape';
// const cytoscape = require('https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.3.3/cytoscape.esm.js');

var cytoscape = require('cytoscape');

window.cytoscape = cytoscape;

var getJSON = require('get-json')
const csvFilePath = './nodes.csv';
const csv = require('csvtojson');
var $ = require("jquery");

var cytoData = require('./nLinks.json'); //(with path)// = JSON.stringify("nodes_convert.json");

console.log("lol",cytoData);

/*var cy = cytoscape({
    container: document.getElementById('cy'),
    elements: {
        nodes: [
            {data: { id: 'a' }},
            {data: { id: 'b' }}],
        edges: [{data: { id: 'ab', source: 'a', target: 'b' }}]
    },
    style: [{selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(id)'
            }},{
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle'
            }}],
    layout: {name: 'grid',rows: 1}});
*/
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
        },{
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

let nodes = cy.nodes();
nodes.forEach( n => {
    // console.log("Node", n.data());
    // console.log("Indegrees:\t" + n.indegree(false));

 });
// console.log(nodes);
// console.log("lol");