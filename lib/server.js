var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(app.get('port'), function() {
  console.log('SMS Proxy App listening on port', app.get('port'));
});

require('dotenv').config();
var config = require(__dirname + '/../config');

// var SmsProxy = require('./SmsProxy');
// var smsProxy = new SmsProxy(config);

// var options = {
//   host: 'https://uyzhap3720.execute-api.us-west-1.amazonaws.com/qa/sc/v1/addRequest',
//   path: '/',
//   port: '80',
//   method: 'POST'
// };

// callback = function(response) {
//   var str = ''
//   response.on('data', function (chunk) {
//     str += chunk;
//   });

//   response.on('end', function () {
//     console.log(str);
//   });
// }

// var requesthttp = http.request(options, callback);
// //This is the data we are posting, it needs to be a string or a buffer


app.post('/inbound-sms', function(req, res) {
  var from = req.body.msisdn;
  var to = req.body.to;
  var text = req.body.text;
  
  //smsProxy.p roxySms(from, to, text)
  console.log(from, to, text)
  // requesthttp.write("data");
  // requesthttp.end();

  request.post(
    `https://uyzhap3720.execute-api.us-west-1.amazonaws.com/qa/sc/v1/addRequest/message/${text}/phone/${from}`,
    function (error, response, body) {
      console.log('lets request');
        if (!error && response.statusCode == 200) {
            console.log(body)
          //   request.post(
          //     `https://api.particle.io/v1/devices/55ff72066678505547171367/led?access_token=5f7e10e6a144da11ab244f3fd594fcbdd83afe13`, {json: {arg: 'on'} },
          //     function (error, response, body) {
          //       console.log('robot started', response.statusCode, body);
          //         if (!error && response.statusCode == 200) {
          //             console.log(body)

          //             setTimeout(function(){ 
          //               request.post(
          //                 `https://api.particle.io/v1/devices/55ff72066678505547171367/led?access_token=5f7e10e6a144da11ab244f3fd594fcbdd83afe13`, {json: {arg: 'off'} },
          //                 function (error, response, body) {
          //                   console.log('robot stopped', response.statusCode, body);
          //                     if (!error && response.statusCode == 200) {
          //                         console.log(body)
                                  
          //                     }
          //                 }
          //             );
          //              }, 5000);
                
          //         }
          //     }
          // );

        }
    }
);

  res.sendStatus(200);
});

app.get('/robot-start', function(req, res) {
  request.post(
    `https://api.particle.io/v1/devices/55ff72066678505547171367/led?access_token=5f7e10e6a144da11ab244f3fd594fcbdd83afe13`, {json: {arg: 'on'} },
    function (error, response, body) {
      console.log('robot started', response.statusCode, body);
        if (!error && response.statusCode == 200) {
            console.log(body)
            res.send('On Rescue!!');
            
        }
    }
);

});

app.get('/robot-stop', function(req, res) {
  request.post(
    `https://api.particle.io/v1/devices/55ff72066678505547171367/led?access_token=5f7e10e6a144da11ab244f3fd594fcbdd83afe13`, {json: {arg: 'off'} },
    function (error, response, body) {
      console.log('robot started', response.statusCode, body);
        if (!error && response.statusCode == 200) {
            console.log(body)
            res.send('Rescued!!');
            
        }
    }
);

});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/particle', function(req, res) {
  console.log('here is the request');
  res.send('Hello World!');
});

