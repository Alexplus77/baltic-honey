const fs = require("fs");

exports.getSiteRules = (req, res) => {
  fs.readFile(`./MailSendler/${req.params.file}.txt`, "utf-8", (err, data) => {
    res.send(data);
  });
};
