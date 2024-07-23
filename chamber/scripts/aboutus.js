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


// SPOTLIGHT
    
const link = "./data/members.json";
let eligibleMembers = [];
let randomSelectedMembers = [];

const spotlightSection = document.querySelector("#special-spotlight");

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
    });
}