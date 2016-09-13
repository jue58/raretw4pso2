console.log('Loading function');

var aws = require('aws-sdk');
var Twitter = require('twitter');

// Change to the chipertext of API keys of your Twitter App
var ciphertext = "AQECAHiqpDcQbHQp7plsxs2+eSJSjJeV5U9ImXI7Kov+TFezxwAAAREwggENBgkqhkiG9w0BBwaggf8wgfwCAQAwgfYGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM+ln0V51kcZTrN1skAgEQgIHIo+W9DiGLHLO6kky0hlUyUcPtBSg+H+EQ1jePAIPLoSy2k/y5LgotDd7gt+ts/BsJG24ibP3SnhNSQ1YQpco/1Jg8JPNhEp/CQM3plZz8O6HQvQu0GnqR9nVA/9cfL99q9Z5ccucCcx4+EwejBUS2NWxbb07AwnFw5DpA/BkP+Zy6QRyRhl4IvJwz9dMzxlzienENXg+sUxO20knH6PB+FbDssgkrzG1A9SDBQsgWaoM18p/zqjYAMg6PbA6MI4LpxnpOlqQq9EY="

exports.handler = function(event, context) {
  event.Records.forEach(function(record) {
    var payload = new Buffer(record.kinesis.data, 'base64').toString('utf-8');
    console.log('Decoded payload:', payload);
  });
  var choseData = JSON.parse(new Buffer(event.Records[0].kinesis.data, 'base64').toString());
  console.log(choseData);
  kms = new aws.KMS({ region: 'us-east-1' });
  kms.decrypt({ CiphertextBlob: new Buffer(ciphertext, 'base64') }, function (err, data) {
    if (err) {
      console.log("token string decrypt error: " + err);
      context.fail(err);
    } else {
      text = data.Plaintext.toString('ascii');
      console.log('text string = ' + text);
      keys = text.split(",");
      var client = new Twitter({
        consumer_key: keys[0],
        consumer_secret: keys[1],
        access_token_key: keys[2],
        access_token_secret: keys[3]
      });
      if (choseData.meseta) {
        console.log("meseta: " + choseData.meseta);
        context.succeed("Successfully processed " + event.Records.length + " records.");
        return;
      }

      client.post("statuses/update", { status: choseData.char_name + " は " + choseData.item + "をゲットした！\nTest Mode." }, function(error, tweet, response) {
        console.log(tweet);

        context.succeed("Successfully processed " + event.Records.length + " records.");
      });
    }
  });
};