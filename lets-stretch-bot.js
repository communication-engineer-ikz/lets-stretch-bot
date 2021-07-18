/* 参考
    * https://qiita.com/n_oshiumi/items/a1a02e03093825f41e01
*/
function letsStretchBot() {
    const stretch = getStretch();
    const ACCESS_TOKEN = getLetsStretchBotAccessToken();
    const USER_ID = getUserId();

    postToLINE(stretch, ACCESS_TOKEN, USER_ID);
}

function getStretch() {
    const spreadSheet = SpreadsheetApp.openById("11gVauC2W5g6W_3devWltEJC6xh5bCHfDK1OtRdRLS9Y");
    const sheet = spreadSheet.getSheetByName("Stretch");
    const lastRow = sheet.getLastRow();
    const StretchList = sheet.getRange(2, 1, lastRow).getValues();
    const stretch = StretchList[getRandomInt(0, lastRow - 2)][0];

    return stretch;
}

/* 参考
    * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

function postToLINE(message, ACCESS_TOKEN, USER_ID) {
    const line_endpoint = "https://api.line.me/v2/bot/message/push";
   
    const headers = {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + ACCESS_TOKEN,
    };

    const postData = {
        "to" : USER_ID,
        "messages" : [
            {
                "type": "text",
                "text": message
            }
        ]
    };

    var options = {
        "method" : "post",
        "headers" : headers,
        "muteHttpExceptions" : true,
        "payload" : JSON.stringify(postData)
    };

    //https://qiita.com/kunihiros/items/255070ba950a7ba95ae4
    try {
        const res = UrlFetchApp.fetch(line_endpoint, options);
        Logger.log(res);
    } catch(e) {
        Logger.log("Error:");
        Logger.log(e);
    }
}