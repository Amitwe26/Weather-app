export const utilService = {
    getRandomInt,
    makeId,
    getRandomColor,
    getUserLocation
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function getRandomColor() {
    var colors = ['#00ca71', '#0085ff', '#fdab3d', '#e44258']
    var num = getRandomInt(0, 4)
    return colors[num]

}

function getUserLocation() {
    if (!navigator.geolocation) {
        return;
    } else {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
}
