// // Function to handle adding/removing the hamburger menu
function handleHamburgerMenu() {
    const width = window.innerWidth;
    const navigation = document.querySelector("nav");
    const header = document.querySelector("#hook");
    let menuButton = document.querySelector("#menuButton");

    if (width < 500) {
        // Add the hamburger menu if it doesn't exist
        if (!menuButton) {
            header.style.fontSize = "1.3rem";
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


// dark mode code

const modeButton = document.querySelector("#mode");
const main = document.querySelector("main");
let cardHeaders = document.querySelectorAll("h2");

modeButton.addEventListener("click", () => {
	if (modeButton.textContent.includes("🕶️")) {
		main.style.background = "#000";
		main.style.color = "#fff";
        cardHeaders.forEach(cardHeader => {
            cardHeader.style.color = "black";
        });

		modeButton.textContent = "🔆";
	} else {
		main.style.background = "transparent";
		main.style.color = "#000";
		modeButton.textContent = "🕶️";
	}
});

