const fs = require("fs");

exports.getSiteRules = (req, res) => {
  fs.readFile("./MailSendler/siteRulesText.txt", "utf-8", (err, data) => {
    res.send(data);
    console.log(data);
  });
};
