export const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Takes a string representing opening hours of a building from a Mapbox feature.
// Return an object representing hours of each day of the week.
// Handled examples: 
//    Mo-Fr 06:00-18:00
//    24/7
//    Mo-Th: 09:00-20:00; Fr,Sa 09:00-18:00; Su 12:15-18:00
const parseOpenHours = (str) => {
  var today = new Date();
  hrs = {
    Su: "Closed",
    Mo: "Closed",
    Tu: "Closed",
    We: "Closed",
    Th: "Closed",
    Fr: "Closed",
    Sa: "Closed",
    today: days[today.getDay()],
    open: false
  };

  if (str == "24/7") {
    hrs.Su = "0:00-24:00";
    hrs.Mo = "0:00-24:00";
    hrs.Tu = "0:00-24:00";
    hrs.We = "0:00-24:00";
    hrs.Th = "0:00-24:00";
    hrs.Fr = "0:00-24:00";
    hrs.Sa = "0:00-24:00";
    return hrs;
  } else {
    var chunks = str.split("; "); // Split listings into chunks separated by ;
    for (var i = 0; i < chunks.length; i++) {
      firstDigit = chunks[i].search(chunks[i].match(/\d/)); // index of first time
      var daysOnly = chunks[i].substring(0, firstDigit);
      var dayChunks = daysOnly.split(", ");
      var timePortion = chunks[i].substring(firstDigit);

      for (day in dayChunks) {
        dayName = dayChunks[day].replace(/ /g, "")

        if (dayName.includes("-")) { // range of days
          var [startDay, endDay] = dayName.split("-");
          hrs[startDay] = timePortion;
          currentDayIndex = days.indexOf(startDay);

          var currentDay = startDay;
          while (currentDay != endDay) {
            currentDayIndex += 1
            hrs[days[currentDayIndex]] = timePortion;
            break
          }
          hrs[endDay] = timePortion;

        } else { // single day
          hrs[dayName] = timePortion;
        }
      }
    }

    // Determine if this elevator path is open right now
    const todayHrs = hrs[hrs.today].split("-");
    // const currTime = ("00" + today.toLocaleTimeString()).slice(-8, -3);
    const now = parseInt(today.getHours() + "" + today.getMinutes());
    const regex = /:/i;
    if (todayHrs.length == 2) {
      let formattedOpenHr = todayHrs[0].replace(regex, "");
      let formattedEndHr = todayHrs[1].replace(regex, "");
      hrs.open = now > formattedOpenHr && now < formattedEndHr;
    }
    return hrs;
  }
};

export default parseOpenHours;
