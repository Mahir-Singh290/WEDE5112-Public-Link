// Function to open the lightbox
function openLightbox(imageSrc) {
    // Get the lightbox container
    const lightbox = document.getElementById("lightbox");

    // Get the large image
    const lightboxImage = document.getElementById("lightboxImage");

    // Set the large image to the clicked image
    lightboxImage.src = imageSrc;

    // Display the lightbox by unhiding it
    lightbox.style.display = "flex";
}

// Function to close the lightbox
function closeLightBox() {
    // Hide the lightbox
    document.getElementById("lightbox").style.display = "none";
}