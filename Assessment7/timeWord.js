const numsToWords = {
    0: 'twelve',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
    30: 'thirty', 
    40: 'fourty',
    50: 'fifty',
}

function getHours(hours) {
    return numsToWords[hours % 12];
}

function getAmPm(hours) {
    if (hours > 11) {
        return 'pm';
    } else {
        return 'am';
    }
}

function getMinutes(minutes) {
    let ones = minutes % 10;
    let tens = minutes - ones;

    
    if (minutes === 0) {
        return "o'clock";
    } else if (minutes < 10) {
        return `oh ${numsToWords[minutes]}`;
    } else if (minutes < 20){
        return `${numsToWords[minutes]}`
    } else {
        let ret = `${numsToWords[tens]}`;
        if (ones) {
            ret += ` ${numsToWords[ones]}`
        }
        return ret;
    }
    
}

function timeWord(time) {
    let hours = time.slice(0,2);
    let minutes = time.slice(3);

    hours = +hours;
    minutes = +minutes;

    if (hours === 0 && minutes === 0){
        return 'midnight';
        exit();
    }
    if(hours === 12 && minutes === 0) {
        return 'noon';
        exit();
    }

    return `${getHours(hours)} ${getMinutes(minutes)} ${getAmPm(hours)}`;
}

module.exports = timeWord;