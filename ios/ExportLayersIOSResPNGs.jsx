// AUTHOR:      Murdoch Carpenter
// DATE:        08 July 2016
// MODIFIED:    --
// VERSION:     1
// DETAILS:     Exports layers with first character "$" to iOS resolution PNG's (@1x, @2x, @3x) ready to paste into your iOS project.
// HOW TO:	http://murdochcarpenter.com/illustrator-script-export-android-multi-res-pngs/

var folderName = "ios";

// layers with this special character as the first char will be exported
var exportLayerWithTag = "$";

// dpi resolutions as percentages from AI file @1x
var x1_DPI = 100;    // 1x
var x2_DPI = 200;    // 2x
var x3_DPI = 300;    // 3x
var differentSizes = 3;

// store visible layers to restore
var visibleLayersToRestore = new Array();

// current AI file
var doc = app.activeDocument;

// check document has been saved
if (doc.path != "") {
    // check each directory exists, if not then create
    var folderPath = doc.path + "/" + folderName; 
    var folderDirectory = new Folder(folderPath);

    if (!folderDirectory.exists) {
        var newfolder = new Folder(folderPath);
        newfolder.create();
    }

    // hide all layers and store visible
    for (var i = 0; i < doc.layers.length; i++) { 
        if (doc.layers[i].visible == true) {
            visibleLayersToRestore.push(i);
        }
        doc.layers[i].visible = false; 
    }
    
    // count exported layers
    var layersExported = 0;

    // check for special character and unlocked layer - if so, then export
    for (var i = 0; i < doc.layers.length; i++) {
        if ((!doc.layers[i].locked)) {
            if (doc.layers[i].name.substring(0, 1) == exportLayerWithTag) {   
                doc.layers[i].visible = true;

                var savePath = doc.path;
                savePath.changePath(folderName + "/" + doc.layers[i].name.substring(1, doc.layers[i].name.length));
                savePNGtoDisk(savePath, x1_DPI);
                
                savePath = doc.path;
                savePath.changePath(folderName + "/" + doc.layers[i].name.substring(1, doc.layers[i].name.length) + "@2x");
                savePNGtoDisk(savePath, x2_DPI);
                
                savePath = doc.path;
                savePath.changePath(folderName + "/" + doc.layers[i].name.substring(1, doc.layers[i].name.length) + "@3x");
                savePNGtoDisk(savePath, x3_DPI);

                doc.layers[i].visible = false;

                layersExported++;
            }
        }
    }
    
    // alert the user what has been exported
    if (layersExported > 1) {
        alert(layersExported + " layers, " + (layersExported*differentSizes) + " images exported that you didn't have to do manually. Victory!");
    } else if (layersExported > 0) {
        alert(layersExported + " layer, " + (layersExported*differentSizes) + " images exported that you didn't have to do manually. Victory!");
    } else {
        alert(layersExported + " layers found to export!. Layers must have the '" + exportLayerWithTag + "' special character and be unlocked. Fail.");
    }
    
    // restore visible layers
    for (var l = 0; l < visibleLayersToRestore.length; l++) {
        doc.layers[visibleLayersToRestore[l]].visible = true;
    }
    
} else {
    alert("Please SAVE your document before running this Script!");
}

// save the PNG to disk
function savePNGtoDisk(file, scale) {
    // set PNG export options
    var exportOptions = new ExportOptionsPNG24();
    exportOptions.transparency = true;
    exportOptions.antiAliasing = true;
    exportOptions.horizontalScale = scale
    exportOptions.verticalScale = scale;
    exportOptions.artBoardClipping = true;
    // save to disk
    doc.exportFile(file, ExportType.PNG24, exportOptions);
}