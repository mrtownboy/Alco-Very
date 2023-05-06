// Tag container element
// for gallery
const galleryContainer = document.querySelector(".gallery-container");
//carousal
const carouselContainer = document.querySelector(".carousel-container");
const carouselSlide = document.querySelector(".carousel-slide");
const carouselPrev = document.querySelector(".carousel-prev");
const carouselNext = document.querySelector(".carousel-next");

// Fetch the JSON file and parse it as an object
fetch("../js/cider-images.json")
  .then((response) => response.json())
  .then((data) => {
    console.log("data", data);
    // Call the functions to render the gallery and carousel
    renderGallery(data.images);
    renderCarousel(data.images);
  });

// Function to render the gallery
function renderGallery(images) {
  // Loop through the images
  images.forEach((image) => {
    // Create a new div element to wrap the image and caption
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");
    // create a new heading for name
    const title = document.createElement("h3");
    title.classList.add("title");
    title.innerText = image.name;

    // Create a new image element
    const img = document.createElement("img");
    img.src = image.image;
    img.alt = image.description;

    // Create a new caption element
    const caption = document.createElement("div");
    caption.classList.add("gallery-caption");
    caption.textContent = image.description;
    //  create a thumbnail for each
    const thumbnail = document.createElement("a");
    thumbnail.classList.add("gallery-thumbnail");
    thumbnail.href = image.image;
    // Append the image to the thumbnail element
    thumbnail.appendChild(img);
    // Append the image and caption to the gallery item
    galleryItem.appendChild(title);
    galleryItem.appendChild(thumbnail);
    galleryItem.appendChild(caption);
    // Append the gallery item to the container
    galleryContainer.appendChild(galleryItem);
  });
}
// Function to render the carousel

// Render the carousel
function renderCarousel(images) {
  // Loop through the images
  images.forEach((image) => {
    // Create a new image element
    const img = document.createElement("img");
    img.classList.add("carousel-items");
    img.src = image.image;
    img.alt = image.description;

    // Append the image to the carousel slide
    carouselSlide.appendChild(img);
  });

  // Set the current slide index to 0
  let currentSlide = 0;

  // Set the slide width based on the number of images
  const slideWidth = carouselContainer.clientWidth / images.length;
  carouselSlide.style.width = `${slideWidth * images.length}px`;

  // Handle the previous button click
  carouselPrev.addEventListener("click", () => {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = images.length - 1;
    }
    carouselSlide.style.transform = `translateX(-${
      currentSlide * slideWidth
    }px)`;
  });

  // Handle the next button click
  carouselNext.addEventListener("click", () => {
    currentSlide++;
    if (currentSlide >= images.length) {
      currentSlide = 0;
    }
    carouselSlide.style.transform = `translateX(-${
      currentSlide * slideWidth
    }px)`;
  });
  // Automatically slide the carousel every 1 seconds
  setInterval(() => {
    currentSlide++;
    if (currentSlide > images.length) {
      currentSlide = 1;
    }
    carouselSlide.style.transform = `translateX(-${
      currentSlide * slideWidth
    }px)`;
  }, 1000);
}
