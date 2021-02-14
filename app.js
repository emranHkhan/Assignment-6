const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';


const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))//found the bug and fixed it.
    .catch(err => console.log(err))
}


// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {

    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = `<img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div);
  })

}

let slideIndex = 0;
const selectItem = (event, img) => {
  const searchText = document.getElementById('search').value;
  document.querySelector('.modal-title').innerText = searchText.toUpperCase();
  document.getElementById('modal-img').src = event.target.src;
  
  let element = event.target;
  element.classList.add('added');
  let item = sliders.indexOf(img);

  if (item === -1) {
    sliders.push(img);
  } else {
    // added the toggle effect.
    sliders.pop(img);
    element.classList.remove('added');
  }
}


// -------------------SLIDER-------------------
var timer;
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })


  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);

}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

// ---------------------END OF SLIDER-----------------

searchBtn.addEventListener('click', function () {
  document.querySelector('.my-section').classList.add('d-none');
  document.querySelector('.feature-gallery').innerHTML = '';
  document.getElementById('duration').value = '';
  document.getElementById('error-message').innerText = '';
  NatureSearch();


});

const searchField = document.getElementById("search");
searchField.addEventListener("keyup", function (event) {

  if (event.key === "Enter") {

    document.getElementById("search-btn").click();

  }
});

//---------Modified Slider with fixed Bug----------
sliderBtn.addEventListener('click', function () {

  document.querySelector('.my-section').classList.remove('d-none');
  const duration = document.getElementById('duration').value;
  if (duration >= 0) {

    document.getElementById('main-title').innerText = 'Slider is running';
    createSlider();

  }

  else {
    document.getElementById('error-message').innerText = `${duration} is not valid!`
  }

});

const NatureSearch = () => {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
}

// -------------------Additional Features-----------------
document.getElementById('more-images-btn').addEventListener('click', function () {
  document.querySelector('.feature-gallery').innerHTML = "";
  document.querySelector('.feature-gallery').classList.remove('d-none');
  const imageType = document.getElementById('search').value;
  fetch(`https://pixabay.com/api/?key=${KEY}=${imageType}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showFeatureImages(data.hits))
    .catch(err => console.log(err));

});

const showFeatureImages = (images) => {

  images.forEach(image => {

    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    let anchor = document.createElement('a');
    anchor.setAttribute('data-toggle', 'modal');
    anchor.setAttribute('data-target', '#exampleModal');
    div.appendChild(anchor);
    anchor.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    document.querySelector('.feature-gallery').appendChild(div);
    
  })

}

