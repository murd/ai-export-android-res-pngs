# Scripts for Adobe Illustrator
Use these scripts to export Layers or Artboards to Android resolution PNG's (MDPI, HDPI, XHDPI, XXHDPI, XXXHDPI):
 - Simply make the first character in a Layer or Artboard "$" and have it unlocked
 - Run the Layer or Artboard script
 - It creates the drawable-mdpi, drawable-hdpi, drawable-xhdpi, drawable-xxhdpi and drawable-xxxhdpi folders
 - Then saves each Layer or Artboard as a PNG24 in those resolution buckets with their layer name
 - Ready to copy/paste into your Android project

For full explanation check out my blog:
http://murdochcarpenter.com/illustrator-script-export-android-multi-res-pngs/

## To install/run
Copy and paste the scripts into your Illustrator Scripts folder. On Windows this is *‘\Program Files\Adobe\Adobe Illustrator CC 2014\Presets\Scripts\’* and on Mac *‘\Applications\Adobe\Illustrator CC 2014\Presets\Scripts\’*. Then anytime you want to export the marked layers run **File > Scripts >** and select *‘ExportArtboardsAndroidResPNGs’* or *‘ExportLayersAndroidResPNGs’*.

Or alternatively run the script from anywhere on your HDD by selecting **File > Scripts > Other Script...** in the menu and then navigate to *‘ExportArtboardsAndroidResPNGs.jsx’* or *‘ExportLayersAndroidResPNGs.jsx’* and click *‘Open’*.

## Recommendation
While this gives you all the PNG assets you need. I would suggest running them through [PNGQuant](http://pngquant.org/) or similar to save on some filesize.
