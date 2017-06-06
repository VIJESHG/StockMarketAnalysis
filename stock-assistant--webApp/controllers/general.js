var spawn = require("child_process").spawn;
var yfinance = require('yfinance');
var urllib = require('urllib');
var cheerio = require('cheerio')


exports.info = (req,res) => {
  urllib.request('https://www.google.com/finance' ,function (err, data, r) {
    if (err) {
      throw err; // you need to handle error
    }
    var $ = cheerio.load(data.toString())
    res.render('general/info', {markets : $('#markets').toString().trim(), curr : $('#currencies').toString().trim()})
  });

}
exports.generalForm = (req , res) => {
  res.render("general/general-form");
}
exports.restHandler = (req, res) => {
  var url = "http://localhost:6543/" + "predictstock/" + req.body.name + "/" + req.body.sd + "/" + req.body.ed + "/" + req.body.psd + "/" + req.body.ped
  res.send(url);
}
exports.scrapper = (req,res) => {
  urllib.request('http://finance.yahoo.com/quote/GOOG?ltr=1' ,function (err, data, r) {
    console.log(data.toString());
    var $ = cheerio.load(r);
    res.send($(".Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)"))
  });
}
