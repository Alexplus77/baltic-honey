const nodemailer = require("nodemailer");

exports.sendToUserMail = (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "alexplus77@mail.ru", // generated ethereal user
        pass: "yeItbPN4Cts1phNkJ619", // generated ethereal password
      },
    });
    transporter.sendMail(
      {
        from: '"Балтийский мёд" <alexplus77@mail.ru>',
        to: req.body.usersList,
        subject: "Рассылка с сайта 'Балтийский мёд.'",
        html: req.body.mailText,
      },
      (err, info) => {
        if (err) throw "Ошибка отправки письма.";
        res.send("ok");
      }
    );
  } catch (e) {
    res.status(400).send({ message: e });
    console.log("error from sendToUserMail:", e);
  }
};
