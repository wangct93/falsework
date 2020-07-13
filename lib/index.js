

const config = require('./config');

start();

async function start(){
  await downloadTemplate();
  await install();
}



function downloadTemplate(){
  const downloadGitRepo = require('download-git-repo');
  return new Promise((cb,eb) => {
    downloadGitRepo(`direct:${config.template}`,process.cwd(),{clone:true},(err) => {
      if(err){
        console.log(err);
        eb(err);
      }else{
        cb();
      }
    });
  })

}

function install(){
  return spawn('npm',['install']);
}

function spawn(command,args = [],options = {}){
  return new Promise((cb,eb) => {
    const crossSpawn = require('cross-spawn');
    if(Array.isArray(args)){
      options = {
        stdio: 'inherit',
        ...options,
      };
    }else{
      options = {
        stdio: 'inherit',
        ...args,
      };
      args = [];
    }
    const cp = crossSpawn(command,args,options);
    cp.on('close',(code) => {
      if(code){
        eb(code);
      }else{
        cb(code);
      }
    });
  })
}
