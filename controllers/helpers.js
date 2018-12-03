const emailer = require("../config/emailer.js");
const pairEmail = require("./pairemail.js");
const adminEmail = require("./adminemail.js");
const confirmationEmail = require("./confirmationemail.js");

function randomNumber(n) {
	return Math.floor(Math.random() * n);
}

function makeArray(n) {
	var pairingArray = [];

	for (var i = 0; i < n; i++) {
		pairingArray.push(i);
	}

	return pairingArray;
}

function shuffleArray(array) {
	for (var i = 0; i < array.length; i++) {
		var ranNum = randomNumber(array.length);

		var temp = array[i];
		array[i] = array[ranNum];
		array[ranNum] = temp;
	}

	return array;
}

function makePairsObject(shuffledArray) {
	var pairs = {};

	for (var i = 0; i < shuffledArray.length; i++) {
		if (i === shuffledArray.length - 1) {
			pairs[shuffledArray[i]] = shuffledArray[0];
		} else {
			pairs[shuffledArray[i]] = shuffledArray[i + 1];
		}
	}

	return pairs;
}

function makeNameArray(pairedIndexes, array) {
	var pairNamesArray = [];

	for (var i = 0; i < array.length; i++) {
		pairNamesArray[i] = {
			from: array[i],
			to: array[pairedIndexes[i]]
		};
	}

	return pairNamesArray;
}

module.exports = {
	getPairs: function(participants) {
		var originalArray = makeArray(participants.length);
		var shuffledArray = shuffleArray(originalArray);
		var pairsObject = makePairsObject(shuffledArray);
		var pairs = makeNameArray(pairsObject, participants);
		return pairs;
	},
	sendPairEmail: function(pair) {
		emailer.sendMail({
			to: pair.from.email,
			from: '"Secret Sanda Sender 🎅" <secretsantasenderemail@gmail.com>',
			subject: "Your Secret Santa!!",
			html: pairEmail.html(
				pair.from.name,
				pair.to.name,
				pair.to.likes,
				pair.to.dislikes
			)
		});
	},
	sendAdminEmail: function(admin) {
		emailer.sendMail({
			to: admin.emailAddress,
			from: '"Secret Sanda Sender 🎅" <secretsantasenderemail@gmail.com>',
			subject: "Your Secret Santa Registration Link",
			html: adminEmail.html(
				"http://www.secretsantasender.com/registration/" + admin._id
			)
		});
	},
	sendConfirmationEmail: function(participant) {
		emailer.sendMail({
			to: participant.email,
			from: '"Secret Sanda Sender 🎅" <secretsantasenderemail@gmail.com>',
			subject: "Your Secret Santa Confirmation Link",
			html: confirmationEmail.html(
				participant.name,
				"www.secretsantasender.com/confirmation/" + participant._id
			)
		});
	}
};
