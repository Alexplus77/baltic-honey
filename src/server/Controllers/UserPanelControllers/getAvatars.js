const fs = require("fs");
exports.getAvatars = (req, res) => {
  const avatars = fs.readdirSync("avatars").map((avatar) => {
    return { name: avatar, path: `${process.env.URL_IMAGE}avatars/${avatar}` };
  });
  res.send(avatars);
};
