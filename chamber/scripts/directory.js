document.addEventListener("DOMContentLoaded", () => {
    const directoryContainer = document.getElementById('directory');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');

    fetch('./data/members.json')
        .then(response => response.json())
        .then(data => displayMembers(data, 'grid'));

    gridViewButton.addEventListener('click', () => {
        fetch('./data/members.json')
            .then(response => response.json())
            .then(data => displayMembers(data, 'grid'));
    });

    listViewButton.addEventListener('click', () => {
        fetch('./data/members.json')
            .then(response => response.json())
            .then(data => displayMembers(data, 'list'));
    });

    function displayMembers(members, view) {
        directoryContainer.innerHTML = '';
        if (view === 'grid') {
            directoryContainer.className = 'grid';
            members.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.className = 'member-card';
                memberCard.innerHTML = `
                    <img src="${member.image}" alt="${member.name} loading="lazy" width="auto" height="80">
                    <h2>${member.name}</h2>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                    <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
                    <p>${member.description}</p>
                `;
                directoryContainer.appendChild(memberCard);
            });
        } else if (view === 'list') {
            directoryContainer.className = 'list';
            members.forEach(member => {
                const memberItem = document.createElement('div');
                memberItem.className = 'member-item';
                memberItem.innerHTML = `
                    <img src="${member.image}" loading="lazy" width="auto" height="80" alt="${member.name}">
                    <div>
                        <h2>${member.name}</h2>
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                        <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
                        <p>${member.description}</p>
                    </div>
                `;
                directoryContainer.appendChild(memberItem);
            });
        }
    }
});


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