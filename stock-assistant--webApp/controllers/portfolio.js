var spawn = require("child_process").spawn;
var yfinance = require('yfinance');
var urllib = require('urllib');
var cheerio = require('cheerio');

var Portfolio = require('../models/schemas').Portfolio;
var stockData = [];

exports.portHome = (req,res) => {
    res.render("portfolio/port-home" , {title : "Portfolio-Home"});
}
exports.stockHome = (req,res) => {
  urllib.request('https://newsapi.org/v1/articles?source=cnbc&sortBy=top&apiKey=6c7d7bd4178549e59528575ac07be75e', function (err, data, na) {
    var newsobj = JSON.parse(data.toString())
    var news = [];
    console.log(newsobj);
    newsobj.articles.forEach((object)=>{
      news.push("AUTHORs : " + object.author+ "<br>" + "TITLE : "+"<a href="+"'"+object.url+"'"+ ">"+object.title+"</a><br>"+"DESCRIPTION : "+object.description)
    });
    res.render("portfolio/search-stock" , {title : "Search Stock" , news : news})
  });

}
exports.stockSearch = (req,res) => {
  var pyProcess = spawn('python', [__dirname + "/../misc-libraries/py-scripts/name-ticker.py"]);
  dataString = '';
  pyProcess.stdout.on('data', function(data){
      dataString = data.toString();
  });
  pyProcess.stdout.on('end', function(){
    // console.log(dataString.trim());
    yfinance.getHistorical(dataString.trim(), '2017-02-01', '2017-03-20', function (err, data) {
      // console.log(data);
      yfinance.getQuotes(dataString.trim(), function (err, quote_data) {
        temp = quote_data[0];
        stockData = [];
        stockData.push(req.body.stock + " / " + dataString.trim() );
        stockData.push(temp);
        stockData.push(data);
        stockData.push(dataString.trim());
        quote_data = [];
        keys = Object.keys(temp);
        keys.forEach((element) => {
          if (temp[element] !== null) {
            element = element[0].toUpperCase()+element.slice(1)
            quote_data.push(element + " : " + temp[element])
          }
        });
        res.render('portfolio/search-stock', {raw_data  : JSON.stringify(data) , quote_data : (quote_data) });
      });
    });
  });
  var name = req.body.stock;
  pyProcess.stdin.write(JSON.stringify(name.toString()));
  pyProcess.stdin.end();
}
exports.portHome = (req,res) => {
  res.render('portfolio/port-home' , {company : stockData[0] , date : new Date().toString()});
}

exports.displayPortfolio = (req,res) => {
  var sending = []
  var sent_len = 0 ;
  var days_gain = {} ;
  var overall_gain = {} ;
  var net_worth = 0;
  var net_investment = 0;
  Portfolio.find({username : req.user.username} , (err,data) => {
    data.forEach((user_prefs) => {
      yfinance.getQuotes(user_prefs["ticker"], function (err, quote_data) {
        var ticker = user_prefs["ticker"];
        var og = parseFloat(quote_data[0]["Ask"]) * parseFloat(user_prefs["quantity"]) - parseFloat(user_prefs["total_investment"]);
        overall_gain[ticker] = og ;
        var dg = (parseFloat(quote_data[0]["Ask"]) - parseFloat(quote_data[0]["PreviousClose"])) * parseFloat(user_prefs["quantity"])
        days_gain[ticker] = dg;
        net_worth = net_worth +  parseFloat(quote_data[0]["Ask"]) * parseFloat(user_prefs["quantity"])
        net_investment = net_investment + parseFloat(user_prefs["total_investment"])
        sending.push(user_prefs["stockname"] + " Overall Gain : " +  overall_gain[ticker]  + " Day's Gain : " + days_gain[ticker] + " Total Investment : "+ user_prefs["total_investment"] + " Current Asking Price : "+  quote_data[0]["Ask"] );
        sent_len = sent_len + 1 ;
        if(sent_len == data.length) {
          res.render("portfolio/display-portfolio" , {data1 : sending});
        }
      })
    })
  })
}
exports.addPortfolio = (req,res) => {
  Portfolio.find({username : req.user.username , ticker: stockData[3]} , (err , data) => {
      if (data.length == 0) {
        console.log("if");
        var portfolio = new Portfolio ({
          username : req.user.username,
          stockname : stockData[0],
          quantity : req.body.quantity,
          date : req.body.date,
          price : parseFloat(stockData[1]["Ask"]),
          total_investment : parseFloat(stockData[1]["Ask"]) * req.body.quantity,
          ticker : stockData[3]
        });
        portfolio.save((err)=>{
          res.redirect("/display-portfolio");
        })
      } else {
        console.log("else");
        data[0].quantity = parseFloat(data[0].quantity) + parseFloat(req.body.quantity)
        data[0].total_investment = parseFloat(data[0].total_investment) + (parseFloat(stockData[1]["Ask"]) * req.body.quantity)
        data[0].save((err) => {
          res.redirect("/display-portfolio");
        })
      }
  })
}
