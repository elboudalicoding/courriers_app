const UserMail = require("../models/userMailModel");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

exports.sendMail = async (req, res) => {
  try {
    const { username, note, courrierId } = req.body;
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newMail = await UserMail.createMail({
      userId: user.id,
      note,
      courrierId,
    });

    // Send email with link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "oussamaelboudali691@gmail.com",
        pass: "xqaq enpl bmhu fprs", // Use the generated app password here
      },
    });

    const mailOptions = {
      from: "oussamaelboudali691@gmail.com",
      to: user.email,
      subject: "New Mail Notification",
      text: `You have a new mail. Click the link to view: http://localhost:3000/userMails/${user.id}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent: " + info.response);
    });

    res.status(200).json({ message: "Mail sent successfully", mail: newMail });
  } catch (error) {
    console.error("❌ Error sending mail:", error.message);
    res.status(500).json({ message: "Error sending mail" });
  }
};

exports.getUserMails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const mails = await UserMail.getMailsByUserId(userId);
    res.status(200).json(mails);
  } catch (error) {
    console.error("❌ Error fetching mails:", error.message);
    res.status(500).json({ message: "Error fetching mails" });
  }
};
