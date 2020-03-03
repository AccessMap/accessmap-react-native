const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const parseOpenHours = str => {
	var today = new Date();
	// example: Mo-Fr 06:00-18:00
	// example: 24/7
	// example: Mo-Th: 09:00-20:00; Fr,Sa 09:00-18:00; Su 12:15-18:00
	hrs = {
		Su: "",
		Mo: "",
		Tu: "",
		We: "",
		Th: "",
		Fr: "",
		Sa: "",
		today: days[today.getDay()]
	};
	if (str == "24/7") {
		hrs.Su = "0:00-24:00";
		hrs.Mo = "0:00-24:00";
		hrs.Tu = "0:00-24:00";
		hrs.We = "0:00-24:00";
		hrs.Th = "0:00-24:00";
		hrs.Fr = "0:00-24:00";
		hrs.Sa = "0:00-24:00";
		hrs.open = true;
		return hrs;
	} else {
		// Split listings into chunks
		var chunks = str.split("; ");
		// For each chunk, update the corresponding entries in hrs
		for (var i = 0; i < chunks.length; i++) {
			// If there is a hyphen, it is a range
			if (chunks[i][2] == "-") {
				var [startDay, endDay] = chunks[i].slice(0, 5).split("-");
				var inRange = false;
				for (var j = 0; j < days.length; j++) {
					if (!inRange && days[j] == startDay) {
						inRange = true;
					} else if (inRange && days[j] == endDay) {
						hrs[days[j]] = chunks[i].split(" ")[1];
						inRange = false;
					}

					if (inRange) {
						hrs[days[j]] = chunks[i].split(" ")[1];
					}
				}
			// If there is a comma, it only has two days
			} else if (chunks[i][2] == ",") {
				var [day1, day2] = chunks[i].slice(0, 5).split(",");
				var time = chunks[i].split(" ")[1];
				hrs[day1] = time;
				hrs[day2] = time;
			} else {
			// If no comma or hyphen, just one day
				hrs[chunks[i].slice(0, 2)] = chunks[i].split(" ")[1];
			}
		}

		// Determine if this elevator path is open right now
		const todayHrs = hrs[hrs.today].split("-");
		const currTime = ("00" + today.toLocaleTimeString()).slice(-8, -3);
		if (todayHrs.length == 2 && currTime >= todayHrs[0] && currTime <= todayHrs[1]) {
			hrs.open = true;
		} else {
			hrs.open = false;
		}

		return hrs;
	}
}

export default parseOpenHours;
