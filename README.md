# whoopsmonitor-alert-slack-webhook
Alert that sends message to the Slack via its webhook.

## Build
```sh
docker build -t whoopsmonitor-alert-slack-webhook .
```

## Run image
```bash
docker run --rm --env-file .env whoopsmonitor-alert-slack-webhook
```

## Environmental variables
- `WM_WEBHOOK_URL` - URL of the webhook on Slack.

### Example
Details of the check in Whoops Monitor configuration tab or for the `.env` file.

```yaml
WM_WEBHOOK_URL=http://...
```

## Alert specification
Please read further details in the [alert docs](https://github.com/whoopsmonitor/whoopsmonitor/blob/master/docs/custom-alert.md).
