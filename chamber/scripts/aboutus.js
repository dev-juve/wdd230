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