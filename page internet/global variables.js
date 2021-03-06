/**
 * Contain all the useful global variables used to exchange file data through the different windows.
 * windows.js is not concerned because global variables of this file are purely technical and concern only ergonomics
 */

// array which contains the tsv file data
// Instantiated and used in readTsvFile.js
var graphArray = [];


// index of the curve (in the tsv file) which will be displayed
// Used in readTsvFile.js and paint.js
var displayCurveNo;


// array of boolean which describes which genes will be displayed
// Instantiated and used in readTsvFile.js
var selectedGenes = [];


// booleans which are set to true in onload function when corresponding file are read
// Instantiated in their respective onload function (in readTsvFile.js and readAnFile.js <- A CHANGER !!!), and used
// in the click event functions added in the same files
var tsvFileLoaded, anFileLoaded;


// p5 object which paints the graph in the tsv file
// Mainly used in paint.js
var graphSketch;