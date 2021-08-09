const moment = require('moment');

module.exports = function createAdaptiveCard(useremail, usercountry){
    var card = {};
    let now=moment();
    card = {
      "toPersonEmail": useremail,
      "attachments": [
        {
          "contentType": "application/vnd.microsoft.card.adaptive",
          "content": {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.2",
            "body": [
              {
                "type": "TextBlock",
                "text": "Login Request - DENEPS Web App",
                "weight": "Bolder",
                "size": "Medium"
              },
              {
                "type": "ColumnSet",
                "columns": [
                  {
                    "type": "Column",
                    "width": "20px",
                    "items": [
                      {
                        "type": "Image",
                        "url": "https://www.hangtimemedia.com/wp-content/uploads/2018/06/location-icon-png-3.png",
                        "height": "20px"
                      }
                    ]
                  },
                  {
                    "type": "Column",
                    "width": "90px",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": "Location",
                        "wrap": true
                      }
                    ]
                  },
                  {
                    "id":"usercountry",
                    "type": "Column",
                    "width": "stretch",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": usercountry,
                        "wrap": true
                      }
                    ]
                  }
                ]
              },
              {
                "type": "ColumnSet",
                "columns": [
                  {
                    "type": "Column",
                    "width": "auto",
                    "items": [
                      {
                        "type": "Image",
                        "url": "https://www.radtrainingassociates.com/wp-content/uploads/2015/09/clock-grey.png",
                        "height": "15px"
                      }
                    ]
                  },
                  {
                    "type": "Column",
                    "width": "90px",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": "Date & Time",
                        "wrap": true
                      }
                    ]
                  },
                  {
                    "type": "Column",
                    "width": "stretch",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": now.format("DD-MMM-YYYY, HH:mm:ss (Z)"),
                        "wrap": true
                      }
                    ]
                  }
                ]
              },
              {
                "type": "ActionSet",
                "actions": [
                  {
                    "type": "Action.Submit",
                    "title": "APPROVE",
                    "id": "approve",
                    "style": "positive",
                    "data": {
                      "success": true
                    }
                  },
                  {
                    "type": "Action.Submit",
                    "title": "DENY",
                    "id": "deny",
                    "style": "destructive",
                    "data": {
                      "success": false,
                      "msg": "User denied login"
                    }
                  }
                ]
              }
            ]
          }
        }
      ],
      "text": "Hey!"
    }
    return card;
  }

