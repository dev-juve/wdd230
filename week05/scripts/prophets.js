const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const cards = document.querySelector("#cards");
async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        const card = document.createElement("section");
        const fullName = document.createElement("h2");
        const portrait = document.createElement("img");
        const dob = document.createElement("p");
        const pob = document.createElement("p");
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        dob.textContent = `Date of Birth: ${prophet.birthdate}`;
        pob.textContent = `Place of Birth: ${prophet.birthplace}`;
        portrait.setAttribute("src", `${prophet.imageurl}`);
        portrait.setAttribute("alt", "Prophet Portrait");
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "120");
        portrait.setAttribute("height", "150");
        portrait.setAttribute("class", "frame");
        card.appendChild(fullName);
        card.appendChild(dob);
        card.appendChild(pob);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
}