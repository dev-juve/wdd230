const getDate = new Date();
const option = {
    year: "numeric"
}
const setDate = getDate.toLocaleDateString("en-US", option);

const yearPlaceHolder = document.getElementById("year");
const lastModif = document.getElementById("lastModified");

yearPlaceHolder.textContent = `${setDate}`;
lastModif.textContent = `${getDate}`;

