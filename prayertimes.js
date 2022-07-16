const fs = require('fs'); // Require filesystem
const path = __dirname + "\\prayerdata_2022.csv"; // Find path of data

let result; // Result for CSV conversion
const resultMap = new Map(); // Map of prayer times by date key
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');

// Set month based on month number
let monthText;
switch (today.getMonth()) {
    case 0:
        monthText = 'Jan'
        break;
    case 1:
        monthText = 'Feb'
        break;
    case 2:
        monthText = 'Mar'
        break;
    case 3:
        monthText = 'Apr'
        break;
    case 4:
        monthText = 'May'
        break;
    case 5:
        monthText = 'Jun'
        break;
    case 6:
        monthText = 'Jul'
        break;
    case 7:
        monthText = 'Aug'
        break;
    case 8:
        monthText = 'Sep'
        break;
    case 9:
        monthText = 'Oct'
        break;
    case 10:
        monthText = 'Nov'
        break;
    case 11:
        monthText = 'Dec'
        break;
    default:
        monthText = 'Error'
}

const date = dd + '-' + monthText;

// Convert csv string -> Array
const CSVToArray = (data, delimiter = ',', omitFirstRow = false) => {
    result = data
                .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
                .split('\r\n')
                .map(v => v.split(delimiter));
}

fs.readFile(path, 'utf-8', (err, d) => {
    if (err) {
        console.log(err);
        return;
    }

    CSVToArray(d);

    result.forEach(e => {
        resultMap.set(e[0], {
                        "date": e[0], 
                        "day": e[1], 
                        "fajr_begin": e[2], "fajr_jamaah": e[3],
                        "sunrise": e[4],
                        "dhuhr_begin": e[5], "dhuhr_jamaah": e[6],
                        "asr_begin_1": e[7], "asr_begin_2": e[8], "asr_jamaah": e[9],
                        "maghrib_begin": e[10], "maghrib_jamaah": e[11],
                        "isha_begin": e[12], "isha_jamaah": e[13]
                    })
    });

    newfun();
});

const newfun = () => {
    console.log(resultMap.get(date));
}