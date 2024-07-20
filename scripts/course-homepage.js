// Function to handle adding/removing the hamburger menu
function handleHamburgerMenu() {
    const width = window.innerWidth;
    const navigation = document.querySelector("nav");
    let menuButton = document.querySelector("#menuButton");

    if (width < 500) {
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

// Dark mode code
let imgSource = document.querySelector("#source");
let heroDefault = document.querySelector("#hero-img");

const modeButton = document.querySelector("#mode");
const main = document.querySelector("main");
const cardHeaders = document.querySelectorAll("h2");
const section1 = document.querySelector("#section-1");

modeButton.addEventListener("click", () => {
	if (modeButton.textContent.includes("🕶️")) {
		main.style.background = "#000";
		main.style.color = "#fff";
        imgSource.setAttribute("srcset", "./images/02-Port-au-Prince-Haiti-Temple-night-small.webp");
        heroDefault.setAttribute("src", "./images/02-Port-au-Prince-Haiti-Temple-night-large.webp");
        cardHeaders.forEach(cardHeader => {
            cardHeader.style.color = "black";
        });
        
        // Set white background for a elements in #section-1
        let section1Links = section1.querySelectorAll("a");
        section1Links.forEach(link => {
            link.style.backgroundColor = "white";
        });

		modeButton.textContent = "🔆";
	} else {
		main.style.background = "transparent";
		main.style.color = "#000";
        imgSource.setAttribute("srcset", "./images/01-Port-au-Prince-Haiti-Temple-daylight-small.webp");
        heroDefault.setAttribute("src", "./images/01-Port-au-Prince-Haiti-Temple-daylight-large.webp");
        
        // Remove white background for a elements in #section-1
        let section1Links = section1.querySelectorAll("a");
        section1Links.forEach(link => {
            link.style.backgroundColor = "";
        });

		modeButton.textContent = "🕶️";
	}
});

// Number of visits
const numVisits = document.querySelector("#numVisits");
let visits = Number(window.localStorage.getItem("numOfVisits"));

if (visits !== 0) {
    numVisits.textContent = `${visits}`;
} else {
    numVisits.textContent = "This is your first visit. Welcome!";
    visits++;
}

visits++;

window.localStorage.setItem("numOfVisits", visits);


// Open Weather API Implementation
const icon = document.querySelector("#icon");
const temperature = document.querySelector("#temp");
const description = document.querySelector("#desc");
const url = "https://api.openweathermap.org/data/2.5/weather?lat=18.554935655303765&lon=-72.31811131478877&appid=7a980356dd8212c636fe928d334a418a&units=imperial";

async function getWeatherData() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.table(data);
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
    temperature.innerHTML = `${data.main.temp}&deg;F`;
    description.textContent = `- ${data.weather[0].description}`;
}