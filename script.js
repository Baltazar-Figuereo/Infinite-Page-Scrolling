const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0
let photosArray = [];

const count = 10;
const apiKey = "rG7g_8Rz15sQ7HpPZ_yYDpBEUfp8cdEJAfyo8xTuJo4";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    console.log("imaged loaded")
    imagesLoaded++;

    if(imagesLoaded === totalImages) {
        ready = true;
        console.log()
    }
}

function displayPhoto(photosArray) {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    console.log("Total images = ", totalImages);

    photosArray.forEach(photo => {
        const item = document.createElement("a");
        item.setAttribute("href", photo.links.html);
        item.setAttribute("target", "_blank");
        
        const img = document.createElement("img");
        img.setAttribute("src", photo.urls.regular);
        img.setAttribute("alt", photo.alt_description)
        img.setAttribute("title", photo.alt_description)

        img.addEventListener("load", imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();

        displayPhoto(photosArray);
        //console.log(photosArray)
    }
    catch(error) {
        console.log(error);
    }
}


window.addEventListener("scroll", ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready ) {
        ready = false;
        getPhotos();
    }
})

getPhotos();