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

// comment



// function handleHamburgerMenu() {
//     const width = window.innerWidth;
//     const navigation = document.querySelector("nav");
//     let menuButton = document.querySelector("#menuButton");

//     if (width <= 768) {
//         // Add the hamburger menu if it doesn't exist
//         if (!menuButton) {
//             menuButton = document.createElement("button");
//             navigation.setAttribute("class", "navigation");
//             navigation.insertAdjacentElement("beforebegin", menuButton);
//             menuButton.setAttribute("id", "menuButton");
//             menuButton.textContent = "☰";
//             menuButton.style.fontSize = '1.5rem';
//             menuButton.style.border = 'none';
//             menuButton.style.background = 'none';
//             menuButton.style.color = 'white';
//             menuButton.style.position = 'absolute';
//             menuButton.style.top = '1rem';
//             menuButton.style.right = '1rem';
//             menuButton.style.cursor = 'pointer';
//             menuButton.addEventListener('click', () => {
//                 navigation.classList.toggle('open');
//                 menuButton.classList.toggle('open');
//             });
//         }
//     } else {
//         // Remove the hamburger menu if it exists
//         if (menuButton) {
//             menuButton.remove();
//             navigation.classList.remove('navigation', 'open');
//         }
//     }
// }

// // Initial load
// handleHamburgerMenu();

// // Handle window resize
// window.addEventListener('resize', handleHamburgerMenu);