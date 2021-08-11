var express = require('express');
var router = express.Router();
const conn = require('../db/connection.js');
const Workers = conn.model("Workers");

// ------------ логгер  --------------------
const log = require('../tools/log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";
let gTrace=0; //=1 глобальная трассировка (трассируется все)
// ----------- настройки логгера локальные --------------
// let logN=logName+"описание:";
// let trace=0;   trace = (gTrace!=0) ? gTrace : trace;
// trace ? log("i",logN,"Started") : null;



/* ----------- Получить пользователя из базы по параметру cardCode --------------
  выполняется 1 раз для всех запросов, где есть параметр cardCode
*/
router.param("cardCode", async function (req,res,next,cardCode) {
  // ----------- настройки логгера локальные --------------
  let logN=logName+":"+req.originalUrl+":router.param:";
  let trace=0;   trace = (gTrace!=0) ? gTrace : trace;
  trace ? log("i",logN,"Started") : null;
  trace ? console.dir(req.params) : null;
  // --------  логика  ----------------
  let data = await Workers.findByCard(req.params.cardCode); // ищем работника
  if (! data) {
    //такой работник  не найден
    let c = req.params.cardCode;
    res.status(404).send({
      err:{
        ru:"Работника карта: '" + c + "' не найден!",
        ua:"Працівника карта: '" + c + "' не знайдено!",
        en:"Worker card: '" + c + "' not found!"
      },
      data:null
    }); // res
    return
  } //if (! data);
  // сохраняем пользователя в запросе
  req["worker"]=data;
  trace ? log("i",logN,"\nWorker finded! req.worker=\n") : null;
  trace ? console.dir(req.worker) : null;
  next();
}); //router.param("cardCode"

/* ----------- Получить пользователя по номеру карты -------------- */
router.get('/worker/:cardCode', async function(req, res, next) {
  // ----------- настройки логгера локальные --------------
  let logN=logName+":"+req.originalUrl+":";
  let trace=1;   trace = (gTrace!=0) ? gTrace : trace;
  trace ? log("i",logN,"Started",req.params) : null;

  let data = req.worker;//await Workers.findByCard(req.params.cardCode);
  let worker={
    name: {
      first: data.name.first,
      second: data.name.second,
      patronyme: data.name.patronyme
    },
    cardCode:data.cardCode,
    uProx: {
        lastEvent:data.uProx.lastEvent,
        todayWorkTime:data.uProx.todayWorkTime
    }
  };


  res.status(200).send({err:null,data:worker});
});
/* ----------- Получить историю проходов  пользователя по номеру карты -------------- */
router.get('/eventsList/:cardCode', async function(req, res, next) {
  // ----------- настройки логгера локальные --------------
  let logN=logName+":"+req.originalUrl+":";
  let trace=1;   trace = (gTrace!=0) ? gTrace : trace;
  trace ? log("i",logN,"Started") : null;
  trace ? console.dir(req.params) : null;
  let data = req.worker;
  let list={
    cardCode:data.cardCode,
    monthEventsList: data.uProx.monthEventList,

  };
  trace ? log("i",logN,"\nWorker finded:\n") : null;
  trace ? console.dir(list) : null;
  res.status(200).send({err:null,data:list});
});


module.exports = router;
