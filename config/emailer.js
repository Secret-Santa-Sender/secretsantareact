const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true, // use SSL
	auth: {
		user: "kinderplaymates@gmail.com",
		pass: "administrator9900"
	}
});

module.exports = {
	send: function(req, res) {
		transporter.sendMail(req.body, (error, info) => {
			if (error) {
				return console.log("this is an emailer error: ", error);
			}
			console.log("Message sent: %s", info.messageId);
		});

		res.send({ message: "OK" });
	},

	sendMail: function(body) {
		transporter.sendMail(body, (error, info) => {
			if (error) {
				return console.log("this is an emailer error: ", error);
			}
			console.log("Message sent: %s", info.messageId);
		});
	}
};
