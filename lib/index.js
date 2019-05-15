

const config = require('./config');

const downloadGitRepo = require('download-git-repo');

downloadGitRepo(`direct:${config.template}`,process.cwd(),{clone:true},(err) => {
  if(err){
    console.log(err);
  }
});