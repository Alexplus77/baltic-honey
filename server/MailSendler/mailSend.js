const fs = require("fs");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

exports.mailSend = async (userData, mail) => {
  const errorSendMail = `Не возможно отправить письмо на почту: ${userData.email}! Может быть такого адреса почты не существует.`;
  const mailHtml = fs
    .readFileSync(path.join(__dirname, mail), "utf-8")
    .toString();
  const template = ejs.compile(mailHtml);
  const replace = {
    siteLink: process.env.URL_IMAGE,
    userEmail: userData.email,
    userPassword: userData.password,
    userAvatar: userData.avatar,
  };
  const htmlToSend = template(replace);
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "alexplus77@mail.ru", // generated ethereal user
      pass: "yeItbPN4Cts1phNkJ619", // generated ethereal password
    },
  });
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: '"Балтийский мёд" <alexplus77@mail.ru>',
        to: userData.email,
        subject: "Регистрационные данные",
        text: "This message with attachments.",
        html: htmlToSend,
      },
      (err, info) => {
        if (err) {
          return reject(errorSendMail);
        } else {
          resolve(info);
        }
      }
    );
  });
};
