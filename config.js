var config={};
config["dbWorkers"]={
  //
  url:"mongodb://express:Danya@localhost:27017/workers?authSource=WorkersDB&readPreference=primary&appname=Express&ssl=false",
  options:{useNewUrlParser: true, useUnifiedTopology:true ,useFindAndModify:false}
}
module.exports=config;
