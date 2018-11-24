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
		console.log(
			"Sending email from ",
			pair.from.name,
			" to ",
			pair.to.name
		);
	}
};
