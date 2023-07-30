const fs = require('fs');

function findStores(lat, lng) {
    var link = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=1500&type=store&key=AIzaSyCa4Wmnqf-Bxd7CKsNj4NPyaxVbTNkuKVo`;
    var config = {
        method: 'get',
        headers: {}
    }

    /*fetch(link, config)
        .then(response => {
            let fake = response.json()
            let info = fake.results
            console.log(info)
            var text = 'location,name,distance\n'
            for (var i = 0; i < info.length; i++) {
                //distance = Math.abs(Math.acos(Math.sin(lat)*Math.sin(info[i].geometry.location.lat)+Math.cos(lng)*Math.cos(info[i].geometry.location.lng)*Math.cos(info[i].geometry.location.lng-lng))*6371)
                text += `${JSON.stringify(info[i].geometry.location)},${info[i].name},${Math.abs(Math.acos(Math.sin(lat)*Math.sin(info[i].geometry.location.lat)+Math.cos(lng)*Math.cos(info[i].geometry.location.lng)*Math.cos(info[i].geometry.location.lng-lng))*6371)}\n`
            }
            fs.writeFile('geolocation.csv', text, (err) => {
                if (err) throw err;
            });
        })*/
}

export default findStores;