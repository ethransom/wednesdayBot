let timezones = [
	[14, 'Republic of Kiribati'],
	[13, 'Australia'],
	[12, 'New Zealand'],
	[11, 'Soloman Islands'],
	[10, 'Sydney, Australia'],
	[9, 'Tokyo, Japan'],
	[8, 'Beijing, China'],
	[7, 'Bangkok, Thailand'],
	[6, 'Kazakhstan'],
	[5, 'Pakistan'],
	[4, 'Azerbaijan'],
	[3, 'Moscow, Russia'],
	[2, 'Cairo, Egypt'],
	[1, 'Paris, France'],
	[0, 'London, England'],
	[-1, 'Cape Verde Islands'],
	[-2, 'South Sandwich Islands'],
	[-3, 'Rio de Janeiro, Brazil'],
	[-4, 'Halifax, Nova Scotia'],
	[-5, 'New York City'],
	[-6, 'Chicago'],
	[-7, 'Utah Triangle'],
	[-8, 'Los Angeles'],
	[-9, 'Anchorage, Alaska'],
	[-10, 'Hawaii'],
	[-11, 'Midway Island'],
	[-12, 'Baker Island'],
];

let priorityTimezones = timezones.map(function (tz) {
	return [Math.abs(tz[0] + 7), tz[0], tz[1]];
}).sort(function (a, b) {
	if (a[0] < b[0]) return -1;
	if (a[0] > b[0]) return 1;
	return 0;
}).map(function (tz) {
	return [tz[1], tz[2]];
});

function calcTime(offset) {
	let d = new Date();

	let utc = d.getTime() + (d.getTimezoneOffset() * 60000);

	let nd = new Date(utc + (3600000 * offset));

	return nd.toString();
}

function isWednesday(offset) {
	return calcTime(offset).indexOf('Wed') !== -1;
}

function getWednesdays() {
	return timezones.map(function (tz) {
		let day = calcTime(tz[0]);
		return [day.indexOf('Wed') !== -1, tz[1], day];
	});
}

function isWednesdaySomewhere() {
	for (let tz of priorityTimezones) {
		if (isWednesday(tz[0])) {
			return tz;
		}
	}

	return null;
}

function getStatus() {
    if (isWednesday(-7)) {
        return "🎉 It is Wednesday, my dudes 🎉";
    }

    let tz = isWednesdaySomewhere();
    if (tz) {
        return "🎉 It is Wednesday in " + tz[1] + ", my dudes 🎉";
    }

    return "🐸 It is not yet Wednesday, my pals";
}

function wednesdayHandler(req, res) {
    let j = {
        "response_type": "in_channel",
        "text": getStatus(),
    }
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(j));
}

exports.isItWednesday = wednesdayHandler;

// app.get('/', wednesdayHandler);

// app.listen(3000, () => console.log('Wednesday listening on port 3000!'));