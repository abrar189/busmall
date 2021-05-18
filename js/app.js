'use strict';

let attempts = 0;
let maxAttempts = 25;
let attemptsEL = document.getElementById('attempts');

let products = [];
let productImagesNames = [];
let productsClicks = [];
let productsViews = [];
let lastPhoto = [];
let leftImgEl = document.getElementById('leftImg');
let middelImgEl = document.getElementById('middleImg');
let rightImgEl = document.getElementById('rightImg');
function ProductImg(productName) {
  this.productName = productName.split('.')[0];
  this.path = 'img/' + productName;
  this.clicks = 0;
  this.views = 0;
  products.push(this);

}

let productImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',
  'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg',
  'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

for (let i = 0; i < productImages.length; i++) {
  new ProductImg(productImages[i]);
}

function randomImage() {
  return Math.floor(Math.random() * productImages.length);

}


let leftImage;
let middelImage;
let rightImage;

function render() {
  leftImage = randomImage();
  middelImage = randomImage();
  rightImage = randomImage();

  while (leftImage === middelImage || leftImage === rightImage || rightImage === middelImage || lastPhoto.includes(leftImage)
    || lastPhoto.includes(middelImage) || lastPhoto.includes(rightImage)) {
    leftImage = randomImage();
    middelImage = randomImage();
    rightImage = randomImage();
  }
  leftImgEl.setAttribute('src', products[leftImage].path);
  leftImgEl.setAttribute('title', products[leftImage].path);
  products[leftImage].views++;

  middelImgEl.setAttribute('src', products[middelImage].path);
  middelImgEl.setAttribute('title', products[middelImage].path);
  products[middelImage].views++;

  rightImgEl.setAttribute('src', products[rightImage].path);
  rightImgEl.setAttribute('title', products[rightImage].path);
  products[rightImage].views++;

  attemptsEL.textContent = attempts;
  lastPhoto[0] = leftImage;
  lastPhoto[1] = middelImage;
  lastPhoto[2] = rightImage;

}
render();

leftImgEl.addEventListener('click', handelClicks);
middelImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);
let result1 = document.getElementById('results-containar');
let button1 = document.createElement('botton');
let ulEl = document.getElementById('results');
function handelClicks(event) {
  attempts++;
  if (attempts <= maxAttempts) {
    if (event.target.id === 'leftImg') {
      products[leftImage].clicks++;

    } else if (event.target.id === 'middleImg') {
      products[middelImage].clicks++;
    } else (event.target.id === 'rightImg')
    {
      products[rightImage].clicks++;
    }
    render();

  } else {
    leftImgEl.removeEventListener('click', handelClicks);
    middelImgEl.removeEventListener('click', handelClicks);
    rightImgEl.removeEventListener('click', handelClicks);


    result1.appendChild(button1);
    button1.textContent = 'click hear';
    button1.addEventListener('click', result);



    function result(event) {

      let liEl;
      for (let i = 0; i < products.length; i++) {
        liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `${products[i].productName} has ${products[i].views} views and has ${products[i].clicks} clicks.`;
        productsClicks.push(products[i].clicks);
        productsViews.push(products[i].views);
        productImagesNames.push(products[i].productName);
      }

      //button1.removeEventListener('click', result);
      chartRender();
    }
  }
}
function chartRender() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productImagesNames,
      datasets: [{
        label: '# of Clicks',
        data: productsClicks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 3
      }, {
        label: '# of Views',
        data: productsViews,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

