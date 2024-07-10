// // Lazy loading images
// document.addEventListener("DOMContentLoaded", function() {
//     let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

//     if ("IntersectionObserver" in window) {
//         let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
//             entries.forEach(function(entry) {
//                 if (entry.isIntersecting) {
//                     let lazyImage = entry.target;
//                     lazyImage.src = lazyImage.dataset.src;
//                     lazyImage.classList.remove("lazy");
//                     lazyImageObserver.unobserve(lazyImage);
//                 }
//             });
//         });

//         lazyImages.forEach(function(lazyImage) {
//             lazyImageObserver.observe(lazyImage);
//         });
//     } else {
//         // Fallback for browsers that don't support IntersectionObserver
//         let lazyLoad = function() {
//             lazyImages.forEach(function(lazyImage) {
//                 if (lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0 && getComputedStyle(lazyImage).display !== "none") {
//                     lazyImage.src = lazyImage.dataset.src;
//                     lazyImage.classList.remove("lazy");
//                 }
//             });

//             if (lazyImages.length === 0) {
//                 document.removeEventListener("scroll", lazyLoad);
//                 window.removeEventListener("resize", lazyLoad);
//                 window.removeEventListener("orientationchange", lazyLoad);
//             }
//         };

//         document.addEventListener("scroll", lazyLoad);
//         window.addEventListener("resize", lazyLoad);
//         window.addEventListener("orientationchange", lazyLoad);
//     }
// });


document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById('calendar');
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let html = '<table>';
    html += '<tr><th colspan="7">' + monthNames[date.getMonth()] + ' ' + date.getFullYear() + '</th></tr>';
    html += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';

    date.setDate(1);
    let day = date.getDay();

    html += '<tr>';
    for (let i = 0; i < day; i++) {
        html += '<td></td>';
    }

    while (date.getMonth() === new Date().getMonth()) {
        html += '<td>' + date.getDate() + '</td>';
        if (date.getDay() === 6) {
            html += '</tr><tr>';
        }
        date.setDate(date.getDate() + 1);
    }

    while (date.getDay() !== 0) {
        html += '<td></td>';
        date.setDate(date.getDate() + 1);
    }
    html += '</tr></table>';

    calendar.innerHTML = html;
});


// Local storage for visit message
const visitorGreeting = document.getElementById("visitorGreeting");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (lastVisit) {
    const diff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (diff < 1) {
        visitorGreeting.textContent = "Back so soon! Awesome!";
    } else {
        visitorGreeting.textContent = `You last visited ${diff} ${diff === 1 ? 'day' : 'days'} ago.`;
    }
} else {
    visitorGreeting.textContent = "Welcome! Let us know if you have any questions.";
}

localStorage.setItem("lastVisit", now);
