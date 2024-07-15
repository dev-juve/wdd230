const rangevalue = document.getElementById("rangevalue");
const range = document.getElementById("homepage-rating");

// RANGE event listener
range.addEventListener('change', displayRatingValue);
range.addEventListener('input', displayRatingValue);

function displayRatingValue() {
    rangevalue.innerHTML = range.value;
}


document.getElementById("homepage-rating").addEventListener('input', function() {
    document.getElementById("rangevalue").innerText = this.value;
});

document.querySelector('.homepage-form').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        document.getElementById('password').value = '';
        document.getElementById('confirm-password').value = '';
        document.getElementById('password').focus();
        event.preventDefault();
    }
});

