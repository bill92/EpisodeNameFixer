# fileNameFixer
Command line application for changing all filenames in a folder to a neater format for tv shows

# Installation
```
npm install -g show-filename-fixer
```

# Usage
cd into the desired folder and run
```
fixer
```

Tidys up ugly downloaded show filenames. Eg dj.kHaLed.S01E01.Torrent.DoWnLoAdEd.from.mp4 becomes S01E01.mp4

If you specify a show name, fixer will add the episode name to the filename. Run:
```
fixer --show="American Dad"
```
This will change dj.kHaLed.S01E01.Torrent.DoWnLoAdEd.from.mp4 to
S01E01 - Pilot.mp4
