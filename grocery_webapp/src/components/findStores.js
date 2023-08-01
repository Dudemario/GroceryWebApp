const fs = require('fs');

function findStores(lat, lng) {
    var link = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=5000&type=grocery_or_supermarket&key=AIzaSyCa4Wmnqf-Bxd7CKsNj4NPyaxVbTNkuKVo`;
    console.log(link);
    return fetch(link)
        .then(response => {
            return response.json().then(fake => {
                let info = fake.results
                console.log(info)
                var text = {}
                for (var i = 0; i < info.length; i++) {
                    //distance = Math.abs(Math.acos(Math.sin(lat)*Math.sin(info[i].geometry.location.lat)+Math.cos(lng)*Math.cos(info[i].geometry.location.lng)*Math.cos(info[i].geometry.location.lng-lng))*6371)
                    text[`${info[i].name}`] = `${Math.abs(Math.acos(Math.sin(lat)*Math.sin(info[i].geometry.location.lat)+Math.cos(lng)*Math.cos(info[i].geometry.location.lng)*Math.cos(info[i].geometry.location.lng-lng))*6.371)}`
                }
                /*fs.appendFile('/geolocation.csv', text, (err) => {
                    if (err) throw err;
                });*/
                console.log("YeE" + JSON.stringify(text));
                return JSON.stringify(text)

            })
        })
}

export default findStores;