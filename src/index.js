const axios = require('axios')

const webhookUrl = process.env.WM_WEBHOOK_URL

const CHECK_NAME = process.env.WM_CHECK_NAME
const CHECK_OUTPUT = process.env.WM_CHECK_OUTPUT
const CHECK_EXIT_CODE = process.env.WM_CHECK_EXIT_CODE * 1 // to make sure it is a number

let exitLabel = 'ok'
let themeColor = '🟩'

if (CHECK_EXIT_CODE === 1) {
  exitLabel = 'warning'
  themeColor = '🟧'
}

if (CHECK_EXIT_CODE === 2) {
  exitLabel = 'critical'
  themeColor = '🟥'
}

let title = `${themeColor} Check "${CHECK_NAME}"`

let summary = `(${exitLabel}) ${CHECK_OUTPUT || ''}`

if (!summary) {
  summary = 'no output'
}

  ; (async () => {
    try {
      await axios.post(webhookUrl,
        {
          "blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": title
              }
            },
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": summary
              }
            }
          ]
        }
      )

      console.log(`Message sent to Slack via webhook.`)
      process.exit(0)
    } catch (error) {
      console.log(`Message has not been send to Slack via webhook.`)
      console.error(error.response || error)
      process.exit(2)
    }
  })()
