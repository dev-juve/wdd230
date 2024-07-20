const baseURL = "https://dev-juve.github.io/wdd230/";
const linksURL = "https://dev-juve.github.io/wdd230/data/links.json";

async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayLinks(data.weeks); // Pass only 'weeks' to the function
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayLinks(weeks) {
    const learningActivities = document.getElementById('learning-activities');
    learningActivities.innerHTML = ''; // Clear any existing content

    weeks.forEach(week => {
        const weekItem = document.createElement('li');
        weekItem.textContent = `${week.week}: `;

        week.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.textContent = link.title;
            linkElement.target = "_blank"; // Open in new tab

            weekItem.appendChild(linkElement);
            weekItem.appendChild(document.createTextNode(' | ')); // Add separator
        });

        // Remove the last separator
        weekItem.lastChild.remove();

        learningActivities.appendChild(weekItem);
    });
}

getLinks();
