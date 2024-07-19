const baseURL = "https://dev-juve.github.io/wdd230/";
const linksURL = "https://dev-juve.github.io/wdd230/data/links.json";

async function getLinks() {
    try {
    const response = await fetch(linksURL);
    const data = await response.json();
    if (data.ok) {
        console.table(data);
    }
    else {
        throw Error(await response.text());
    }
    }

    catch (error) {
        console.log(error);
    }
    
}