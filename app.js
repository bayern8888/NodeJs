var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function (req, res, next) {
  superagent.get('http://www.8king.cn/')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items = [];
      $('.entry-title').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.text(),
          href: $element.find("a").attr('href')
        });
      });

      res.send(items);

      // var items02 = [];
      // $('.entry-summary').each(function(idx, element){
      //   var $element = $(element);
      //   items02.push({
      //     content: $element.find('p').text()
      //   });    
      // });

      // res.send(items02);


    });
});


app.listen(3000, function () {
  console.log('app is listening at port 3000');
});
