//yizo库
require('../Library/Array')
let Controller = require('./controller');
let Model = require('./model');
let {Code} = require('../Code/code');
let {Interface,Route} = require('./interface');
let { ValidationError, BaseError }= require('./error');
let Validate =require('./validate');
let encrypt = require('./encrypt')
let request = require('./request')
global['yizo'] = {
    Controller,Model,Interface,Route,ValidationError, BaseError ,Validate,encrypt ,Code,request
}
