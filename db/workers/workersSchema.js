const mongoose = require('mongoose');
var Schema= mongoose.Schema;
// ------------ логгер  --------------------
const log = require('../../tools/log.js'); // логер
let logName="<"+(__filename.replace(__dirname,"")).slice(1)+">:";
let gTrace=0; //=1 глобальная трассировка (трассируется все)

//const workersShema = require('./workersShema.js');
//mongodb://express:Danya@localhost:27017/lazer?authSource=WorkersDB&readPreference=primary&appname=Express&ssl=false
const EventShema = new Schema ({
  token:{ // id сообщения на сервере 
    type:Number,
    required:true,
  },
  date: {
    type:Date,
    required:true,
  },
  direction:{
    type:Number,
    required:true,
  },
  directionTitle:String
});
var WorkerSchema= new Schema({
    name: {
      first:  { //имя
        type:String,
        required:true,
      },
      second:   { //фамилия
        type:String,
        required:true,
      },
      patronyme:   { //отчество
        type:String,
      } },
    cardCode:   { // код чип-карты
      type:String,
      unique:true,
      index:true,
      required:true,
    },
    uProx: {
      todayWorkTime: {
        type:Number,
        default:0
      } , // время прибывания на работе сегодня
      lastEvent: { // последнее событие
        date: Date, // время
        direction: Number // направление
      },
      monthEventList: [EventShema]
    },
    telegram: { // настройки чата Telegram
      chatId: {
        type:Number,
        default:0,
      },
      userName: {
        type:String,
        default:""
      }
    }
});


/*
  Добавляет пользователя в базу. Проверка происходит на уровне схемы.
*/
WorkerSchema.statics.addWorker = async function (user) {
  // ----------- настройки логгера локальные --------------
  let logN=logName+"addWorker("+user+"):";
  let trace=1;   trace = (gTrace!=0) ? gTrace : trace;
  trace ? log("i",logN,"Started") : null;
  //  ----- логика  -----------------
  //console.dir(this);
  try {
    let item = await this.create(user);
    trace ? log("i",logN,"user=\n",item) : null;
    return item
  } catch (e) {
    handleError(e);
    trace ? log("e",logN,"err=\n") : null;
    trace ? console.dir(e) : null;
  }
}; //addWorker




/*
  ищет пользователя в базе по номеру RFID- метки
*/

WorkerSchema.statics.findByCard = async function (card) {
  // ----------- настройки логгера локальные --------------
  let logN=logName+"findByCard("+card+"):";
  let trace=0;   trace = (gTrace!=0) ? gTrace : trace;
  trace ? log("i",logN,"Started") : null;
  //  ----- логика  -----------------
  let data = await this.findOne({cardCode:card});
  trace ? log("i",logN,"data=") : null;
  trace ? console.dir(data._doc) : null;
  if (data) {return data._doc}; // если есть данные, возвращаем их
  return null // или возвращаем null
} //findByCard

module.exports=WorkerSchema;
