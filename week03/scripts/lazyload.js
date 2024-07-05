document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach(img => {
        img.src = img.getAttribute('data-src');
    });

    // Update last modified date
    document.getElementById('lastModified').textContent = document.lastModified;
});
