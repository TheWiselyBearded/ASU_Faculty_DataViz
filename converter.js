var $ = jQuery = require('jquery');
// require('./jquery.csv.js');
// const csv=require('csvtojson');
const csvFilePath='./nodes.csv';
var csv = require('csv'); 
// loads the csv module referenced above.
var data = csv(csvFilePath); 
// var data = $.get(csvFilePath);//$.csv.toObjects(csvFilePath);

// csv()
// .fromFile(csvFilePath)
// .then((jsonObj)=>{
//     console.log(jsonObj);
//     /**
//      * [
//      * 	{a:"1", b:"2", c:"3"},
//      * 	{a:"4", b:"5". c:"6"}
//      * ]
//      */ 
// })
//var csv is the CSV file with headers

function csvJSON(csv){

    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");
    console.log("??");
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        console.log(obj);
        result.push(obj);
  
    }
    // return result; //JavaScript object
    return JSON.stringify(result); //JSON
}
 console.log(csvJSON(data));
// Async / await usage
// const jsonArray=await csv().fromFile(csvFilePath);