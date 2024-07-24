// // Function to handle adding/removing the hamburger menu
function handleHamburgerMenu() {
    const width = window.innerWidth;
    const navigation = document.querySelector("nav");
    let menuButton = document.querySelector("#menuButton");

    if (width < 768) {
        // Add the hamburger menu if it doesn't exist
        if (!menuButton) {
            menuButton = document.createElement("button");
            navigation.setAttribute("class", "navigation");
            navigation.insertAdjacentElement("beforebegin", menuButton);
            menuButton.setAttribute("id", "menuButton");
            menuButton.addEventListener('click', () => {
                navigation.classList.toggle('open');
                menuButton.classList.toggle('open');
            });
        }
    } else {
        // Remove the hamburger menu if it exists
        if (menuButton) {
            menuButton.remove();
            navigation.classList.remove('navigation', 'open');
        }
    }
}

// Initial load
handleHamburgerMenu();

// Handle window resize
window.addEventListener('resize', handleHamburgerMenu);


// Active nav links effect
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
        else {
            link.classList.remove("active");
        }
    });
});


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
            // console.table(data);
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
