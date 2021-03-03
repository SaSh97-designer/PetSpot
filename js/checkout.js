'use strict';

let loadedPetCart;
let tableBody = document.getElementsByTagName('tbody')[0];
let personalInfo = document.getElementById('personalInfo');
personalInfo.addEventListener('submit', handlePersonalInfoSubmit);
tableBody.addEventListener('click', removeItemFromCart);

function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

function loadCart() {
  const cartPets = JSON.parse(localStorage.getItem('petCart')) || [];
  loadedPetCart = new PetCart(cartPets);
}

loadCart();

function showCart() {
  for (let i in loadedPetCart.adoptedPets) {
    let tableRow = document.createElement('tr');
    tableBody.appendChild(tableRow);
    let linkDelete = document.createElement('td');
    tableRow.appendChild(linkDelete);
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    linkDelete.appendChild(deleteButton);
    let breed = document.createElement('td');
    tableRow.appendChild(breed);
    breed.textContent = loadedPetCart.adoptedPets[i].breed;
    let age = document.createElement('td');
    tableRow.appendChild(age);
    age.textContent = loadedPetCart.adoptedPets[i].age;
    let price = document.createElement('td');
    tableRow.appendChild(price);
    price.textContent = loadedPetCart.adoptedPets[i].price;
    let pictureData = document.createElement('td');
    tableRow.appendChild(pictureData);
    let picture = document.createElement('img');
    pictureData.appendChild(picture);
    for (let j in petArr) {
      if (petArr[j].source == loadedPetCart.adoptedPets[i].source) {
        picture.src = petArr[j].source;
      }
    }
  }

}

function clearCart() {
  tableBody.innerHTML = '';
}

function removeItemFromCart(event) {
  console.log(event);
  let itemIndex = event.path[2].rowIndex - 1;
  console.log(itemIndex);
  let deletedRow = tableBody.childNodes[itemIndex];
  tableBody.removeChild(deletedRow);
  let newArr = loadedPetCart.removePet(itemIndex);
  localStorage.setItem('petCart', JSON.stringify(newArr));
}

renderCart();

const loadedReviewsArr = JSON.parse(localStorage.getItem('reviews')) || [];
let loadedReviews = new Review(loadedReviewsArr);



const submitPersonalInfoNotif = window.createNotification({});
function handlePersonalInfoSubmit(event) {

  submitPersonalInfoNotif({
    title: 'Order Have been Submitted!',
    message: 'Notification Message',
    // close on click
    closeOnClick: true,

    // displays close button
    displayCloseButton: false,

    // nfc-top-left
    // nfc-bottom-right
    // nfc-bottom-left
    positionClass: 'nfc-top-right',

    // callback
    onclick: false,

    // timeout in milliseconds
    showDuration: 3500,

    // success, info, warning, error, and none
    theme: 'success'
  });

  event.preventDefault();
  let newReview = new NewReview(event.target.fullName.value, event.target.review.value);
  loadedReviews.addReview(newReview);
  loadedReviews.saveReviewToStorage();
  personalInfo.reset();
}

let loadedAccessoriesCart;
let tBAccessories = document.getElementById('tBAccessories');
tBAccessories.addEventListener('click', removeAccessoryFromCart);

function renderAccessoriesCart() {
  loadAccessoryCart();
  clearAccessoryCart();
  showAccessoryCart();
}

function loadAccessoryCart() {
  const accessoriesCart = JSON.parse(localStorage.getItem('accessoriesCart')) || [];
  loadedAccessoriesCart = new AccessoriesCart(accessoriesCart);
}

loadAccessoryCart();

function showAccessoryCart() {
  for (let i in loadedAccessoriesCart.cartAccessories) {
    let tableRow = document.createElement('tr');
    tBAccessories.appendChild(tableRow);
    let linkDelete = document.createElement('td');
    tableRow.appendChild(linkDelete);
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    linkDelete.appendChild(deleteButton);
    let type = document.createElement('td');
    tableRow.appendChild(type);
    type.textContent = loadedAccessoriesCart.cartAccessories[i].type;
    let price = document.createElement('td');
    tableRow.appendChild(price);
    price.textContent = loadedAccessoriesCart.cartAccessories[i].price;
    let pictureData = document.createElement('td');
    tableRow.appendChild(pictureData);
    let picture = document.createElement('img');
    pictureData.appendChild(picture);
    for (let j in accessoriesArr) {
      if (accessoriesArr[j].src == loadedAccessoriesCart.cartAccessories[i].src) {
        picture.src = accessoriesArr[j].src;
      }
    }
  }

}

function clearAccessoryCart() {
  tBAccessories.innerHTML = '';
}

const removeAccessoryNotif = window.createNotification({});
function removeAccessoryFromCart(event) {
  removeAccessoryNotif({
    title: 'Item has been removed',
    message: 'Notification Message',
    // close on click
    closeOnClick: true,

    // displays close button
    displayCloseButton: false,

    // nfc-top-left
    // nfc-bottom-right
    // nfc-bottom-left
    positionClass: 'nfc-top-right',

    // callback
    onclick: false,

    // timeout in milliseconds
    showDuration: 3500,

    // success, info, warning, error, and none
    theme: 'warning'
  });
  console.log(event);
  let itemIndex = event.path[2].rowIndex - 1;
  console.log(itemIndex);
  let deletedRow = tBAccessories.childNodes[itemIndex];
  tBAccessories.removeChild(deletedRow);
  let newArr = loadedAccessoriesCart.removeAccessory(itemIndex);
  localStorage.setItem('accessoriesCart', JSON.stringify(newArr));
}

renderAccessoriesCart();
