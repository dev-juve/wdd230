const dateTime = new Date();

const options1 = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
};

const options2 = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
};

const year = document.querySelector("#year");
const lastModif = document.querySelector("#lastModified");
year.innerHTML = new Date().getFullYear();
lastModif.innerHTML = `Last Modification: ${dateTime.toLocaleDateString("en-US", options1)}, ${dateTime.toLocaleTimeString("en-US", options2)}`;
lastModif.style.color = "darkblue"
