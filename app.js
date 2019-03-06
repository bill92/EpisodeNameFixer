#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
let tvmaze = require('tvmaze-node')
var argv = require('yargs').argv;
let show = argv.show;
let cwd = process.cwd()
let folder = cwd;
let re =  /(.*)\D(\d{1,2})[ex\-](\d{1,2})/i;


//If the show has been specified
//Query the api to name to give add episode title to filename
if(show){
  tvmaze.search(show, function(error, response) {
    if(error){
      console.log(error)
    }else{
      //Returns a list of shows matching the episode title
      let found = JSON.parse(response);

      //Find the show with closest match to query
      for(let i = 0; i < found.length; i++){
        if (found[i].show.name.toUpperCase() == show.toUpperCase()){
          id = found[i].show.id;
          break;
        }
      }

      //If the show has been found
      if(id){
        //Find all the files in the folder
        fs.readdirSync(folder).forEach(file => {
          let ext = path.extname(file);


          //Match the regular expression to find the episode files
          searchResults = file.match(re);
          if(searchResults){
            //Parse regex finding season number and episode number
            let season = parseInt(searchResults[2]);
            let episode = parseInt(searchResults[3]);

            //Query the api for the episode
            tvmaze.showById(id, "episodesbynumber", [season,episode], function(error, response) {
              if (error){
                console.log(error)
              }else{

                let ext = path.extname(file);

                searchResults = file.match(re);
                let episode = JSON.parse(response);
                let epsname = episode.name;
                //Comment this
                //Rename the file
                let fixedFilename = "S" + searchResults[2] + "E" + searchResults[3] + " - " + epsname + ext;
                // And undo this comment to change output to 01 - episodename.ext
                // let fixedFilename = searchResults[3] + " - " + epsname + ext;
                console.log(fixedFilename);
                fs.renameSync(folder + "/" + file, folder + "/" + fixedFilename);
              }
            })


          }
        })
      }




    }
  })
}else{
  //If the show has not been specified
  //Rename to episode numbers in format S01E02.ext
  let folder = cwd;
  fs.readdirSync(folder).forEach(file => {
    let ext = path.extname(file);


    searchResults = file.match(re);
    if(searchResults){
      //Parse the regex result
      let season = parseInt(searchResults[2]);
      let episode = parseInt(searchResults[3]);

      //Rename the file
      let fixedFilename = "S" + searchResults[2] + "E" + searchResults[3] + ext;
      console.log(fixedFilename);
      fs.renameSync(folder + "/" + file, folder + "/" + fixedFilename);
    }
  })
}
