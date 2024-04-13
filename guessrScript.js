
const map = L.map('map').setView([59.32460795459639, 18.069763183593754], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

let marker;
let lat;
let lng;
map.on('click', function(e) {
    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker(e.latlng).addTo(map);

    lat = e.latlng.lat;
    lng = e.latlng.lng;
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
});

const slider = document.getElementById('slider');
const button = document.getElementById('button');
const value = document.getElementById("sliderValue");

value.textContent = slider.value;

// Slider
slider.addEventListener('input', function(event) {
    console.log(this.value);
    value.textContent = event.target.value;
});



let entries = [
    { 
        place: { latitude:59.412269630136215, longitude:  18.01160211322496 }, 
        time: 1955,
        description: "Baldersskolan Interiör, barn i kapprum.",
        imgSrc: "img1.jpg"
    },
    { 
        place: { latitude: 59.41202774029971, longitude: 18.01091228552754 }, 
        time: 1955,
        description: "Baldersskolan Exteriör med barn på gungbräda i förgrunden",
        imgSrc: "img2.jpg"
    },
    { 
        place: { latitude: 59.40256935316905, longitude: 18.082515467890158}, 
        time: 1945,
        description: "Studentexamen firande. Ungdomarna på Viktor Rydbergs samskola i Djursholm väntar på studentexamensresultatet.",
        imgSrc: "img3.jpg"
    },
    { 
        place: { latitude: 59.41167291848856, longitude:  18.090661524773573}, 
        time: 1910,
        description: "Villa Lagercrantz Exteriör",
        imgSrc:"img4.jpg"
    },
    { 
        place: { latitude: 59.39651718087574, longitude: 18.089000890229492}, 
        time: 1950,
        description: "Djursholm, hållplatsen Restauranten.",
        imgSrc: "img5.jpg"
    },
    { 
        place: { latitude: 59.41286825636376, longitude:  18.057568762037185}, 
        time: 1906,
        description: "Djursholms Ekeby. Före detta Ekeby",
        imgSrc: "img6.jpg"
    },
    { 
        place: { latitude: 59.41283891235778, longitude:  18.057790044267456}, 
        time: 1955,
        description: "Danderyd station som tidigare hette Djursholms Ekeby",
        imgSrc: "img7.png"
    },
    { 
        place: { latitude: 59.382034398110484, longitude: 18.04661429934863 }, 
        time: 1895,
        description: "Kungatåg på Stocksundsbron., Svenska Järnvägarna",
        imgSrc:"img8.png"
    },
    { 
        place: { latitude: 59.38200405490854, longitude: 18.04103301451491}, 
        time: 1920,
        description: "Svenska Järnvägarna",
        imgSrc: "img9.png"
    },
    { 
        place: { latitude: 59.38990772858837, longitude: 18.044919243862385}, 
        time: 1906,
        description: "Mörby verkstad under Byggnad Sverige.",
        imgSrc: "img10.png"
    },
    { 
        place: { latitude: 59.39234391438639, longitude: 18.04730644108673}, 
        time: 1906,
        description: "järnvägsstationen i mörby",
        imgSrc:"img11.png"
    },
    { 
        place: { latitude:59.38853016959553, longitude: 18.0447765306432}, 
        time: 1882,
        description: "Mörby verkstad, 1982",
        imgSrc:"img12.png"
    },
    { 
        place: { latitude: 59.39799403057119, longitude: 18.059060236621235}, 
        time: 1950,
        description: "Djursholm Ösby järnvägsstation.",
        imgSrc: "img13.png"
    },
    { 
        place: { latitude: 59.40036245947087, longitude: 18.096431856029586}, 
        time: 1978,
        description: "Motorvagn vid hållplats Germania på Djursholm i Stockholm.",
        imgSrc: "img14.jpg"
    },
    { 
        place: { latitude: 59.41281359188077, longitude: 18.09181986690491}, 
        time: 1953,
        description: "Villa Ranängen",
        imgSrc: "img15.jpg"
    },
    { 
        place: { latitude: 59.40286574284629, longitude: 18.08246859678026 }, 
        time: 2000,
        description: "Årsmöte i Djursholm 2000. Öppningsprogram med körsång.",
        imgSrc: "img16.jpg"
    },
    { 
        place: { latitude: 59.39451228685377, longitude: 18.089496802031462}, 
        time: 2010,
        description: "Djursholms kapell nattetid",
        imgSrc: "img17.jpg"
    },
    { 
        place: { latitude: 41.89707605095913, longitude: 12.483615998098678}, 
        time: 2018,
        description: "Museo delle Cere",
        imgSrc: "img18.jpg"
    },
    { 
        place: { latitude: 59.397212453173566, longitude: 18.053860012250524}, 
        time: 2019,
        description: "Pojke med katt",
        imgSrc: "img19.jpg"
    },
    { 
        place: { latitude: 58.20376322762715, longitude: 11.458523471269533}, 
        time: 2019,
        description: "Fyllekörning",
        imgSrc: "img20.jpg"
    }  
];

let usedIndex = [];
function getRandomEntry(){
    let randomIndex = Math.floor(Math.random() * entries.length);
    while(usedIndex.includes(randomIndex)){
        randomIndex = Math.floor(Math.random() * entries.length);
    }
    usedIndex.push(randomIndex);
    return entries[randomIndex];
}

document.addEventListener('DOMContentLoaded', function() {
    initialize();
});

let entry;
function initialize(){
    let image  = document.getElementById("image");
    entry = getRandomEntry();
    image.src = "img/" + entry.imgSrc
}

//knapp
let buttonState = 0;
button.addEventListener('click', function() {
    if(buttonState == 0){
        const sliderValue = slider.value;
        let resDistance = calculateDistance(lat,lng,entry.place.latitude,entry.place.longitude);
    
        //display this in the alert
        let diffYear = Math.abs(sliderValue-entry.time);
    
        let actualLocationMarker = L.marker([entry.place.latitude, entry.place.longitude]).addTo(map);
        // Create a polyline from the marker to the entry's place
        const points = [
            [lat, lng],
            [entry.place.latitude, entry.place.longitude]
        ];
        polyline = L.polyline(points, { color: 'red' }).addTo(map);
    
        alert("You were " + Math.round(resDistance) + " meters away" +
              "\nDifference in Years: " + diffYear +
              "\nDescription " +  entry.description);

        buttonState++;
    } else if(buttonState == 1){
        reset()
        buttonState = 0;
    }


});

function reset(){
    if (marker) {
        map.removeLayer(marker);
    }
    map.setView([59.32460795459639, 18.069763183593754], 12);

    entry = getRandomEntry();
    image.src = "img/" + entry.imgSrc

    // Remove existing marker and polyline if they exist
    if (marker) {
        map.removeLayer(marker);
    }
    if (polyline) {
        map.removeLayer(polyline);
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1); 
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in kilometers
    return distance * 1000; // Convert to meters
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}