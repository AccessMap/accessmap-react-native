const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const parseOpenHours = str => {
	// example: Mo-Fr 06:00-18:00
	// example: 24/7
	// example: Mo-Th: 09:00-20:00; Fr,Sa 09:00-18:00; Su 12:15-18:00
	if (str == "24/7") {
		return {
			Su: "0:00-24:00",
			Mo: "0:00-24:00",
			Tu: "0:00-24:00",
			We: "0:00-24:00",
			Th: "0:00-24:00",
			Fr: "0:00-24:00",
			Sa: "0:00-24:00",
		};
	} else {
		var hours = str.split("; ");
		console.log(hours);
		for (var i = 0; i < hours.length; i++) {
			if (hours[i].slice(2, 3) == "-") {
				console.log("range");
				var inRange = false;
				for (var j = 0; j < days.length; j++) {
					if (!inRange) {}
				}
			} else if (hours[i].slice(2, 3) == ",") {
				console.log("double");
			} else {
				console.log("just one day");
			}
		}
		return {};
	}
}

export default parseOpenHours;
