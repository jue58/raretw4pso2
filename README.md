# raretw4pso2

## prepare

### lambda
Execute `npm install -g node-lambda` then execute `npm install` in each lambda project.

Add deploy.env file to each lambda project and change env settings as you want. see also: [node-lambda](https://github.com/motdotla/node-lambda)

```:deploy.env
AWS_ACCESS_KEY_ID=<your key ID>
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

## development

### lambda
Add .env file to each lambda project and change env settings for development environment.

```:.env
AWS_ACCESS_KEY_ID=<your key ID>
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
you can debug these lambda codes. see also: [node-lambda](https://github.com/motdotla/node-lambda)

```json:envent.json
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