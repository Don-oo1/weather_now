


var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);







async function getData(){

    const response = await fetch("/api")
    const json = await response.json()
    item = json[json.length-1]

    if(item){
        const headLine = `It is ${item.condition} feels like ${item.feelslike_c}°C at ${item.latitude},${item.longitude}`
        let marker = L.marker([item.latitude, item.longitude]).addTo(map);
        marker.bindPopup(headLine).openPopup();
    }

    
    
}

getData()