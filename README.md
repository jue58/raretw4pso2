# raretw4pso2

## Prepare

### Lambda
Execute `npm install -g node-lambda` then execute `npm install` in each lambda project.

Add deploy.env file to each lambda project and change env settings as you want.

```
AWS_ACCESS_KEY_ID=<your access key ID>
AWS_SECRET_ACCESS_KEY=<your secret access key>
AWS_SESSION_TOKEN=
AWS_ROLE_ARN=
AWS_REGION=ap-northeast-1
AWS_FUNCTION_NAME=
AWS_HANDLER=index.handler
AWS_MODE=event
AWS_MEMORY_SIZE=128
AWS_TIMEOUT=3
AWS_DESCRIPTION=
AWS_RUNTIME=nodejs
```
see also: [node-lambda](https://github.com/motdotla/node-lambda)

#### raretw4pso2_tweet_weapon
You need to create your Twitter App for this project. Then change ciphertext in index.js to these API keys of your Twitter App.

You should encrypt your API keys with below format by KMS of AWS.

```
<consumer_key>,<consumer_secret>,<access_token_key>,<access_token_secret>
```

## Development

### Lambda
Add .env file to each lambda project and change env settings for development environment.

```
AWS_ACCESS_KEY_ID=<your access key ID>
AWS_SECRET_ACCESS_KEY=<your secret access key>
AWS_SESSION_TOKEN=
AWS_ROLE_ARN=
AWS_REGION=ap-northeast-1
AWS_FUNCTION_NAME=
AWS_HANDLER=index.handler
AWS_MODE=event
AWS_MEMORY_SIZE=128
AWS_TIMEOUT=3
AWS_DESCRIPTION=
AWS_RUNTIME=nodejs
```

If you need, you can add event.json to each lambda project.
You can debug these lambda codes.

```json
{
  "Records": [
    {
      "s3": {
        "bucket": {
          "name": "backet name"
        },
        "object": {
          "key": "object key"
        }
      }
    }
  ]
}
```

see also: [node-lambda](https://github.com/motdotla/node-lambda)
