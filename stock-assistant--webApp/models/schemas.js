const mongoose = require('mongoose');


var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Portfolio = mongoose.model( 'Portfolio' , new Schema({
    id  : ObjectId,
    username : String,
    stockname : String,
    quantity : String,
    date : String,
    total_investment : String,
    ticker : String,
    price: String
}))

module.exports = {Portfolio:Portfolio}
