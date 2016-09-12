console.log('Loading function');

var aws = require('aws-sdk');
var s3 = new aws.S3({ apiVersion: '2006-03-01' });
var kinesis = new aws.Kinesis({ apiVersion: '2013-12-02' });
var STREAM_NAME = "pso2_action_logs_stream";

var postToKinesis = function(logs, callback, errCallback, lambdaContext) {
  if(logs.length > 1) {
    var params = {
      StreamName: STREAM_NAME,
      Records: logs
    }
    kinesis.putRecords(params, function(err, data) {
      if (err) {
        if (errCallback) errCallback(err);
        else console.log(err);
        lambdaContext.fail('Kinesis Error: ' + err);
      } else {
        if (callback) callback(data);
        else console.log(data);
        lambdaContext.succeed('success');
      }
    })
  } else if (logs.length > 0) {
    var params = {
      StreamName: STREAM_NAME,
      Data: logs[0],
      PartitionKey: "0"
    }
    kinesis.putRecord(params, function(err, data) {
      if (err) {
        if (errCallback) errCallback(err);
        else console.log(err);
        lambdaContext.fail('Kinesis Error: ' + err);
      }
      else {
        if (callback) callback(data);
        else console.log(data);
        lambdaContext.succeed('success');
      }
    });
  } else {
    console.log("No Data.");
    lambdaContext.succeed('success');
  }
};

exports.handler = function(event, context) {
  var bucket = event.Records[0].s3.bucket.name;
  var key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  var params = { Bucket: bucket, Key: key };
  s3.getObject(params, function(err, data) {
    if (err) {
      console.log(err);
      var message = "Error getting object " + key + " from bucket " + bucket +
        ". Make sure they exist and your bucket is in the same region as this function.";
      console.log(message);
      context.fail(message);
    } else {
      var logs = data.Body.toString().split("\n");
      postToKinesis(
        logs
          .filter(function(val) { return val.length > 0})
          .map(function(val) { return JSON.parse(val); })
          .filter(function(val) { return !val.message })
          .map(function(val, i) { return { Data: JSON.stringify(val), PartitionKey: i.toString() }; }),
        null,
        null,
        context
      );
    }
  });
};