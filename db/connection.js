const mongoose = require('mongoose');
const conf=require('../config.js').dbWorkers;
//const WorkersSchema= ;
//var Schema= mongoose.Schema;
// ------------ логгер  --------------------
const log = require('../tools/log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";
let gTrace=0; //=1 глобальная трассировка (трассируется все)
// ----------- настройки логгера локальные --------------
// let logN=logName+"описание:";
// let trace=0;   trace = (gTrace!=0) ? gTrace : trace;
// trace ? log("i",logN,"Started") : null;

// connections/fast.js

const conn = mongoose.createConnection(conf.url, conf.options,(err) => {
  if (err) {throw(err); return}
  log('i',logName,"--------------- MongoDB connection established -----------------");
});

conn.model('Workers', require('./workers/workersSchema.js'));

module.exports = conn;
