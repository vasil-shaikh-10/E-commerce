const arrowIconLeft = '<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC \'-//W3C//DTD SVG 1.1//EN\'  \'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\'><svg height="50px" id="Layer_1" style="enable-background:new 0 0 50 50;" version="1.1" viewBox="0 0 512 512" width="50px" color="#fff" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 "/></svg>';

const slidesBegan = Array.from(document.querySelectorAll('.slide-ana a'));
const slidesNumbBegan = slidesBegan.length;

slidesBegan.forEach(slide => {
    const clone = slide.cloneNode(true);
    slide.parentNode.appendChild(clone);
});

var onAnimation = false;
var onControll = false;

const slides = Array.from(document.querySelectorAll('.slide-ana img'));

const prev = document.getElementById('slider-prev');
const next = document.getElementById('slider-next');

if (prev) {
    prev.innerHTML = arrowIconLeft;
    prev.addEventListener('click', function (envt) {
        onControll = true;
        goPrev();
    });
}

if (next) {
    next.innerHTML = arrowIconLeft;
    next.querySelector('svg').style.transform = 'rotate(180deg)';
    next.addEventListener('click', function () {
        onControll = true;
        goNext();
    });
}

for (let index = 0; index < slides.length; index++) {
    const element = slides[index];
    if (index == slidesNumbBegan) element.style.transform = "translateX(0)";
    else if (index < slidesNumbBegan) {
        element.style.display = "none";
        element.style.transform = "translateX(-100%)";
    }
    else {
        element.style.display = "none";
        element.style.transform = "translateX(100%)";
    }
}

function goNext() {
    if (!onAnimation) {
        onAnimation = true;
        slides[slidesNumbBegan + 1].style.display = "block";
        slides[slidesNumbBegan].style.transform = "translateX(-100%)";
        slides[slidesNumbBegan + 1].style.transform = "translateX(0)";

        const firstSlide = slides.shift();
        slides.push(firstSlide);
        setTimeout(function () {
            firstSlide.style.display = "none";
            firstSlide.style.transform = "translateX(100%)";
        }, 500);
        setTimeout(function () {
            firstSlide.style.display = "block";
            onAnimation = false;
        }, 600);
    }
}


function goPrev() {
    if (!onAnimation) {
        onAnimation = true;
        slides[slidesNumbBegan].style.transform = "translateX(100%)";
        slides[slidesNumbBegan - 1].style.transform = "translateX(0)";

        const lastSlide = slides.pop();
        slides.unshift(lastSlide);
        setTimeout(function () {
            lastSlide.style.display = "none";
            lastSlide.style.transform = "translateX(-100%)";
        }, 500);
        setTimeout(function () {
            lastSlide.style.display = "block";
            onAnimation = false;
        }, 600);
    }
}

document.addEventListener('keydown', function (e) {
    console.log("keydown: " + e.code + "\n");
    if (e.code === 'ArrowRight') {
        onControll = true;
        goNext();
    } else if (e.code === 'ArrowLeft') {
        onControll = true;
        goPrev();
    }
});

setInterval(function () {
    if (!onControll) goNext();
    else onControll = false;
}, 3000);

const cards = document.querySelectorAll(".card");
const cart = document.getElementById("cart");
const totalElement = document.getElementById("total");
const selectedItems = {};

function handleCardClick(event) {
  const card = event.currentTarget;
  const itemId = card.id;
  const itemName = card.querySelector("h2").textContent;
  const itemPrice = parseFloat(card.querySelector(".price").textContent);

  if (selectedItems[itemId]) {
    selectedItems[itemId].count++;
  } else {
    selectedItems[itemId] = {
      name: itemName,
      price: itemPrice,
      count: 1,
    };
  }

  updateCart();
}

function updateCart() {
  cart.innerHTML = "";
  let total = 0;

  for (const itemId in selectedItems) {
    const item = selectedItems[itemId];
    const listItem = document.createElement("li");
    const quantityContainer = document.createElement("div");
    const quantityText = document.createElement("span");
    const addButton = document.createElement("button");
    const subtractButton = document.createElement("button");

    addButton.textContent = "+";
    subtractButton.textContent = "-";

    quantityText.textContent = item.count;

    addButton.addEventListener("click", () => {
      addItem(itemId);
    });

    subtractButton.addEventListener("click", () => {
      removeItem(itemId);
    });

    const hr = document.createElement("hr");

    quantityContainer.appendChild(subtractButton);
    quantityContainer.appendChild(quantityText);
    quantityContainer.appendChild(addButton);
    quantityContainer.appendChild(hr);

    listItem.textContent = `${item.name} - $${item.price * item.count}`;
    listItem.appendChild(quantityContainer);
    cart.appendChild(listItem);

    total += item.price * item.count;
  }

  totalElement.textContent = `Total amount: $${total.toFixed(2)}`;
}

function addItem(itemId) {
  if (selectedItems[itemId]) {
    selectedItems[itemId].count++;
  }
  updateCart();
}

function removeItem(itemId) {
  if (selectedItems[itemId]) {
    selectedItems[itemId].count--;
    if (selectedItems[itemId].count <= 0) {
      delete selectedItems[itemId];
    }
  }
  updateCart();
}

cards.forEach((card) => {
  card.addEventListener("click", handleCardClick);
});
