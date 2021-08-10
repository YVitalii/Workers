//const Worker = require('mongoose');
const {open} = require('fs/promises');
let fName=__dirname+"\\parsedUsers.json";
const WorkerModel= require('../workersModel.js');
//const conf=require('../../config.js').dbWorkers;
// ------------ логгер  --------------------
const log = require('../../../tools/log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";
let gTrace=0; //=1 глобальная трассировка (трассируется все)
// ----------- настройки логгера локальные --------------
// let logN=logName+"описание:";
// let trace=0;   trace = (gTrace!=0) ? gTrace : trace;
// trace ? log("i",logN,"Started") : null;

//console.log(conf);


if (! module.parent) {
  var Workers;
  (async function () {
    try {
     Workers = await WorkerModel();
    } catch (error) {
      console.log("--------------------\n MongoDB connect  error ! \n--------------------");
      console.log(error.message);
      new Error("Could not connect to base");
      process.exitCode=1;
      process.exit();
    }; //catch
  try {
    var fh = await open(fName,"r");
    let data =  JSON.parse(await fh.readFile({encoding:"utf8"}));
    await fh.close();
    for (var i = 0; i < data.length; i++) {
      let savedUser = await Workers.addWorker(data[i]);
      log("w","User saved:",savedUser);
    }

  } catch(e){
    console.log("---- error saving -----");
    console.error(e);
  };
}) ();

    // const user=  {
    //     "name": {
    //       "first": "Ден",
    //       "second": "Куюк",
    //       "patronyme": ""
    //     },
    //     "cardCode": "2A99B3B82BB",
    //     "uProx": {
    //       "todayWorkTime": 0,
    //       "lastEvent": {
    //         "date": "2021-08-06T12:47:48.467Z",
    //         "direction": 0
    //       },
    //       "monthEventList": []
    //     },
    //     "telegram": {
    //       "chatId": 0,
    //       "userName": ""
    //     }
    //   };
    //   //console.dir(Workers);
    //   try {
    //     // записываем тестового пользователя в базу
    //     let savedUser = await Workers.addWorker(user);
    //     log("w","User saved:",savedUser);
    //   } catch (e) {
    //     console.log("---- error saving -----");
    //     console.error(e);
    //   };
    //
    //   try {
    //     // ищем тестового пользователя в базе
    //     let item = await Workers.findByCard("2A99B3B82BB");
    //     log("w","User finded :");
    //     console.dir(item);
    //   } catch (e) {
    //     console.log("---- error finding -----");
    //     console.dir(e);
    //   } finally {
    //
    //   };
    //   try {
    //     // удаляем тестового пользователя в базу
    //     let savedUser = await Workers.deleteOne();
    //     log("w","User deleted:",savedUser);
    //   } catch (e) {
    //     console.log("---- error saving -----");
    //     console.error(e);
    //   };


  //start();


}
