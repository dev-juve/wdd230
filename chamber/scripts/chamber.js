
// Open Weather API Implementation
    // Today Weather
const currentTemp = document.querySelector("#current-weather");
const weatherForcast = document.querySelector(".weather-forcast");
const icon = document.createElement('img');
const iconPlaceholder = document.querySelector("#icon");
const url = "https://api.openweathermap.org/data/2.5/weather?lat=18.554935655303765&lon=-72.31811131478877&appid=7a980356dd8212c636fe928d334a418a&units=metric";

async function getWeatherData() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayWeatherInfo(data);
        }
        else {
            throw Error(await response.text());
        }
    }
    catch(error) {
        console.log(error);
    }
}

getWeatherData();

const displayWeatherInfo = (data) => {
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", `${data.weather[0].description}`);
    icon.setAttribute("width", "40");
    icon.setAttribute("height", "40");
    iconPlaceholder.appendChild(icon);
    currentTemp.innerHTML = `${data.main.temp}&deg;C - ${data.weather[0].description}`;
}

    // Three day weather forecast
    document.addEventListener('DOMContentLoaded', () => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=Port-au-Prince&units=metric&appid=7a980356dd8212c636fe928d334a418a`;
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const forecastElement = document.getElementById('weather-forecast');
                const forecastData = processForecastData(data);
                forecastData.forEach(day => {
                    const dayElement = document.createElement('div');
                    dayElement.className = 'forecast-day';
                    dayElement.innerHTML = `
                        <h4>${day.dayName}</h4>
                        <p>Temperature: ${day.temp} °C</p>
                        <p>Weather: ${day.weather}</p>
                    `;
                    forecastElement.appendChild(dayElement);
                });
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    
        function processForecastData(data) {
            const forecast = [];
            const dailyData = {};
            const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
            data.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    
                if (dayName !== today) {
                    if (!dailyData[dayName]) {
                        dailyData[dayName] = {
                            temps: [],
                            weather: item.weather[0].description,
                        };
                    }
                    dailyData[dayName].temps.push(item.main.temp);
                }
            });
    
            for (const [dayName, info] of Object.entries(dailyData)) {
                if (forecast.length >= 3) break; // Limit to 3 days
                forecast.push({
                    dayName: dayName,
                    temp: average(info.temps),
                    weather: info.weather,
                });
            }
    
            return forecast;
        }
    
        function average(arr) {
            const sum = arr.reduce((a, b) => a + b, 0);
            return (sum / arr.length).toFixed(1);
        }
    });

// SPOTLIGHT
    
const link = "./data/members.json";
let eligibleMembers = [];
let randomSelectedMembers = [];

const spotlightSection = document.querySelector(".spotlights");

async function getEligibleMembersList() {
    const response = await fetch(link);
    if (response.ok) {
        const data = await response.json();
        data.forEach(member => {
            if (member.membershipLevel === "Gold" || member.membershipLevel === "Silver") {
                eligibleMembers.push(member);
            }
        });
        getRandomMembers(eligibleMembers);
        displayEligibleMembers(randomSelectedMembers); // Call to display members after selection
    } else {
        console.error("Failed to fetch the members data.");
    }
}

getEligibleMembersList();

const getRandomMembers = (list) => {
    while (randomSelectedMembers.length < 2 && list.length > 0) {
        const randomIndex = Math.floor(Math.random() * list.length);
        const member = list[randomIndex];
        randomSelectedMembers.push(member);
        list.splice(randomIndex, 1);
    }
}

function displayEligibleMembers(list) {
    list.forEach(selectedMember => {
        const memberPlaceholder = document.createElement("div");
        memberPlaceholder.setAttribute("class", "spotlighted-company");
        memberPlaceholder.innerHTML = `
            <img src="${selectedMember.image}" alt="${selectedMember.name}" loading="lazy" width="auto" height="80">
            <h3>${selectedMember.name}</h3>
            <p><strong>Address:</strong> ${selectedMember.address}</p>
            <p><strong>Phone:</strong> ${selectedMember.phone}</p>
            <p><strong>Website:</strong> <a href="${selectedMember.website}" target="_blank">${selectedMember.website}</a></p>
            <p><strong>Membership Level:</strong> ${selectedMember.membershipLevel}</p>
            <p>${selectedMember.description}</p>`;
        spotlightSection.appendChild(memberPlaceholder);
        if (document.querySelector("#special-spotlight")) {
            const spotlightSection = document.querySelector("#special-spotliht");
            spotlightSection.appendChild(memberPlaceholder);
        }
    });
}


// UPCOMING EVENTS
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('banner');
    const closeBannerButton = document.getElementById('closeBanner');
    
    const currentDay = new Date().getDay();
    const isBannerDay = currentDay >= 1 && currentDay <= 3; // Monday (1), Tuesday (2), Wednesday (3)

    if (isBannerDay) {
        banner.style.display = 'block';
    }

    closeBannerButton.addEventListener('click', () => {
        banner.style.display = 'none';
    });
});

    document.addEventListener("DOMContentLoaded", function() {
        const events = [
            {
                title: "Annual Business Expo",
                date: "September 15, 2024",
                location: "Karibe Convention Center, Juvenat 7, P-au-P",
                description: "Join us for our Annual Business Expo, where local businesses showcase their products and services. This is a great opportunity for networking and learning about new business trends."
            },
            {
                title: "Chamber of Commerce Awards Gala",
                date: "November 20, 2024",
                location: "Marriott Hotel, Turgeau, P-au-P",
                description: "Celebrate the achievements of our local businesses at our annual Awards Gala. Enjoy an evening of fine dining, entertainment, and recognition of outstanding businesses in our community."
            },
            {
                title: "Holiday Networking Event",
                date: "December 10, 2024",
                location: "Yanvalou Câfé-Bar-Restaurant, Pacot, P-au-P",
                description: "Ring in the holiday season with fellow business owners and community leaders at our Holiday Networking Event. This is a wonderful opportunity to build relationships and enjoy some festive cheer."
            },
            {
                title: "Spring Business Forum",
                date: "March 25, 2025",
                location: "University of Port-au-Prince Auditorium",
                description: "Our Spring Business Forum features keynote speakers, panel discussions, and workshops on the latest business strategies and innovations. Don’t miss this opportunity to gain valuable insights and grow your business."
            },
            {
                title: "Summer Networking Picnic",
                date: "July 10, 2025",
                location: "Fort Jacques & Alexandre, Kenscoff",
                description: "Enjoy a relaxed afternoon of networking and fun at our Summer Networking Picnic. This family-friendly event includes games, food, and opportunities to connect with other business owners."
            }
        ];

        let currentIndex = 0;

        function displayEvent(index) {
            const event = events[index];
            const eventContainer = document.getElementById("event-container");
            eventContainer.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p>${event.description}</p>
            `;
        }

        document.getElementById("prev-event").addEventListener("click", function() {
            currentIndex = (currentIndex - 1 + events.length) % events.length;
            displayEvent(currentIndex);
        });

        document.getElementById("next-event").addEventListener("click", function() {
            currentIndex = (currentIndex + 1) % events.length;
            displayEvent(currentIndex);
        });

        // Initial display
        displayEvent(currentIndex);
    });

