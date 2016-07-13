// AUTHOR:      Murdoch Carpenter
// DATE:        08 July 2016
// MODIFIED:    --
// VERSION:     1
// DETAILS:     Exports artboards with first character "$" to iOS resolution PNG's (@1x, @2x, @3x) ready to paste into your iOS project.
// HOW TO:	http://murdochcarpenter.com/illustrator-script-export-android-multi-res-pngs/

var folderName = "ios";

// artboards with this special character as the first char will be exported
var exportArtboardWithTag = "$";

// dpi resolutions as percentages from AI file @1x
var x1_DPI = 100;    // 1x
var x2_DPI = 200;    // 2x
var x3_DPI = 300;    // 3x
var differentSizes = 3;

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
    
    // count for artboards exported
    var artboardsExported = 0;

    // check for special character on artboards
    for (var i = 0; i < doc.artboards.length; i++) {
        // char found
        if (doc.artboards[i].name.substring(0, 1) == exportArtboardWithTag) {
            
            // make sure the artboard is selected and active
            doc.artboards.setActiveArtboardIndex(i);
            
            // save PNGs
            var savePath = doc.path;
            savePath.changePath(folderName + "/" + doc.artboards[i].name.substring(1, doc.artboards[i].name.length));
            savePNGtoDisk(savePath, x1_DPI);
            
            savePath = doc.path;
            savePath.changePath(folderName + "/" + doc.artboards[i].name.substring(1, doc.artboards[i].name.length) + "@2x");
            savePNGtoDisk(savePath, x2_DPI);
            
            savePath = doc.path;
            savePath.changePath(folderName + "/" + doc.artboards[i].name.substring(1, doc.artboards[i].name.length) + "@3x");
            savePNGtoDisk(savePath, x3_DPI);

            artboardsExported++;
        }
    }
    
    // alert what has been exported
    if (artboardsExported > 1) {
        alert(artboardsExported + " artboards, " + (artboardsExported*differentSizes) + " images exported that you didn't have to do manually. Victory!");
    } else if (artboardsExported > 0) {
        alert(artboardsExported + " artboard, " + (artboardsExported*differentSizes) + " images exported that you didn't have to do manually. Victory!");
    } else {
        alert(artboardsExported + " artboards found to export!. Artboards must have the '" + exportArtboardWithTag + "' special character. Fail.");
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