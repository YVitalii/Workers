const mongoose = require('mongoose');
const conf=require('../../config.js').dbWorkers;
const WorkersSchema= require('./workersSchema.js');
var Schema= mongoose.Schema;
// ------------ логгер  --------------------
const log = require('../../tools/log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";
let gTrace=0; //=1 глобальная трассировка (трассируется все)
// ----------- настройки логгера локальные --------------
// let logN=logName+"описание:";
// let trace=0;   trace = (gTrace!=0) ? gTrace : trace;
// trace ? log("i",logN,"Started") : null;

// async function createConnection (){
//   // ----------- настройки логгера локальные --------------
//   let logN=logName+"createConnection():";
//   let trace=1;   trace = (gTrace!=0) ? gTrace : trace;
//   // trace ? log("i",logN,"Started") : null;
//   try {
//     var connection = await mongoose.connect(conf.url, conf.options);
//     log("i",logN,"MongoDB connected!");
//     return connection.model("Workers",WorkersSchema);
//
//   } catch (e) {
//     log("e",logN," MongoDB connection error !",e);
//     trace ? log("e",logN,"Error=") : null;
//     trace ? console.dir(e): null;
//     handleError(e);
//   }
// } //function createConnection

module.exports = new Schema(WorkersSchema);
