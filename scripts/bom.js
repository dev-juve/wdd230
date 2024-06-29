const inputField = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

button.addEventListener("click", () => {
    if (inputField != "") {
        const li = document.createElement("li");
        const delButton = document.createElement("button");
        li.innerHTML = `${inputField.value}`;
        delButton.textContent = "❌";
        li.append(delButton);
        list.append(li);
        delButton.addEventListener("click", () => {
            list.removeChild(li);
            inputField.focus();
        });
        inputField.value = "";

    }
    else {
        alert("Make sure you enter a chapter");
        inputField.focus();
    }

});