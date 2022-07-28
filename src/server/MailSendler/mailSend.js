const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

exports.mailSend = async (userData) => {
  const mailHtml = fs
    .readFileSync(path.join(__dirname, "./mail.html"), "utf-8")
    .toString();
  const template = ejs.compile(mailHtml);
  const replace = {
    userEmail: userData.email,
    userPassword: userData.password,
    userAvatar: encodeURI(userData.avatar),
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
  await transporter.sendMail({
    from: '"Балтийский мёд" <alexplus77@mail.ru>',
    to: userData.email,
    subject: "Регистрационные данные",
    text: "This message with attachments.",
    html: htmlToSend,
  });
};
