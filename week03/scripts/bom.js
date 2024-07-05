const inputField = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

let chaptersArray = getChapterList() || [];

chaptersArray.forEach(chapter => { 
    displayList(chapter);
});

button.addEventListener("click", () => {
    if (inputField.value != "") {
        displayList(inputField.value);
        chaptersArray.push(inputField.value);
        setChapterList();
        inputField.value = "";
        inputField.focus();
    }
});

function displayList(item) {
    const li = document.createElement("li"); // Create li element here
    const delButton = document.createElement("button");
    li.textContent = `${item}`;
    delButton.textContent = "❌";
    li.append(delButton);
    list.append(li);
    delButton.addEventListener("click", () => {
        list.removeChild(li);
        chaptersArray = chaptersArray.filter(chapter => chapter !== item);
        setChapterList();
    });
}

function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}
