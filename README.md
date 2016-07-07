# Script for Adobe Illustrator
Exports unlocked layers with first character "$" to Android resolution PNG's (MDPI, HDPI, XHDPI, XXHDPI, XXXHDPI) ready to paste into your Android Studio project. For full explanation check out my blog:
http://murdochcarpenter.com/illustrator-script-export-android-multi-res-pngs/

## To install
Copy and paste the script into your Illustrator Scripts folder. On Windows this is *‘\Program Files\Adobe\Adobe Illustrator CC 2014\Presets\Scripts\’* and on Mac *‘\Applications\Adobe\Illustrator CC 2014\Presets\Scripts\’*. Then anytime you want to export the marked layers run **File > Scripts > ExportAndroidResPNGs**.

## What the script does
- Turns off all layer visibility
- Exports each layer that is unlocked and has the first character "$"
- Saves into drawable-mdpi, drawable-hdpi, drawable-xhdpi, drawable-xxhdpi and drawable-xxxhdpi folders
- All ready to copy/paste into Android Studio

## Recommendation
While this gives you all the PNG assets you need. I would suggest running them through [PNGQuant](http://pngquant.org/) or similar to save on some filesize.
