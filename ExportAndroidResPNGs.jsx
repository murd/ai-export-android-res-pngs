// AUTHOR:      Murdoch Carpenter
// DATE:        15 July 2014
// MODIFIED:    07 July 2016
// VERSION:     1.1.1
// DETAILS:     Exports unlocked layers with first character "$" to Android resolution PNG's (MDPI, HDPI, XHDPI, XXHDPI, XXXHDPI) ready to paste into your Android Studio project.
// HOW TO:	http://murdochcarpenter.com/illustrator-script-export-android-multi-res-pngs/

var mediumFolderName = "drawable-mdpi";
var highFolderName = "drawable-hdpi";
var xHighFolderName = "drawable-xhdpi";
var xxHighFolderName = "drawable-xxhdpi";
var xxxHighFolderName = "drawable-xxxhdpi";

// layers with this special character as the first char will be exported
var exportLayerWithTag = "$";

// android dpi resolutions as percentages from AI file at mdpi
var mediumDPI = 100;    // 1x
var highDPI = 150;      // 1.5x
var xHighDPI = 200;     // 2x
var xxHighDPI = 300;    // 3x
var xxxHighDPI = 400;    // 4x
var differentSizes = 5;

// current AI file
var doc = app.activeDocument;

// check document has been saved
if (doc.path != "") {
    // check each directory exists, if not then create
    var mediumFolderPath = doc.path + "/" + mediumFolderName;
    var highFolderPath = doc.path + "/" + highFolderName;
    var xHighFolderPath = doc.path + "/" + xHighFolderName;
    var xxHighFolderPath = doc.path + "/" + xxHighFolderName;
    var xxxHighFolderPath = doc.path + "/" + xxxHighFolderName;
    
    var mediumFolderDirectory = new Folder(mediumFolderPath);
    var highFolderDirectory = new Folder(highFolderPath);
    var xHighFolderDirectory = new Folder(xHighFolderPath);
    var xxHighFolderDirectory = new Folder(xxHighFolderPath);
    var xxxHighFolderDirectory = new Folder(xxxHighFolderPath);

    if (!mediumFolderDirectory.exists) {
        var newMediumFolder = new Folder(mediumFolderPath);
        newMediumFolder.create();
    }
    if (!highFolderDirectory.exists) {
        var newHighFolder = new Folder(highFolderPath);
        newHighFolder.create();
    }
    if (!xHighFolderDirectory.exists) {
        var newXHighFolder = new Folder(xHighFolderPath);
        newXHighFolder.create();
    }
    if (!xxHighFolderDirectory.exists) {
        var newXXHighFolder = new Folder(xxHighFolderPath);
        newXXHighFolder.create();
    }
    if (!xxxHighFolderDirectory.exists) {
        var newXXXHighFolder = new Folder(xxxHighFolderPath);
        newXXXHighFolder.create();
    }

    // hide all layers
    for (var i = 0; i < doc.layers.length; i++) { 
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
                savePath.changePath(mediumFolderName + "/" + doc.layers[i].name.substring(1, doc.layers[i].name.length));
                savePNGtoDisk(savePath, mediumDPI)
                
                savePath = doc.path;
                savePath.changePath(highFolderName + "/" + doc.layers[i].name.substring(1, doc.layers[i].name.length));
                savePNGtoDisk(savePath, highDPI)
                
                savePath = doc.path;
                savePath.changePath(xHighFolderName + "/" + doc.layers[i].name.substring(1, doc.layers[i].name.length));
                savePNGtoDisk(savePath, xHighDPI)
                
                savePath = doc.path;
                savePath.changePath(xxHighFolderName + "/" + doc.layers[i].name.substring(1, doc.layers[i].name.length));
                savePNGtoDisk(savePath, xxHighDPI)

                savePath = doc.path;
                savePath.changePath(xxxHighFolderName + "/" + doc.layers[i].name.substring(1, doc.layers[i].name.length));
                savePNGtoDisk(savePath, xxxHighDPI)

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
