const pageHeader = document.querySelector('.page-header');
const mainNav = pageHeader.querySelector('.main-nav');
const mainNavToggle = mainNav.querySelector('.main-nav__toggle');

const form = pageHeader.querySelector('.form');
const nameInput = form.querySelector('input[type="text"]');
const phoneInput = form.querySelector('input[type="tel"]');

pageHeader.classList.remove('page-header--no-js');
mainNav.classList.remove('main-nav--opened', 'main-nav--no-js');

mainNavToggle.addEventListener('click', () => {
  mainNav.classList.toggle('main-nav--opened');
});

let isStorageSupport = true;
let storageName = '';
let storagePhone = '';

try {
  storageName = localStorage.getItem('name');
  storagePhone = localStorage.getItem('phone');
} catch (err) {
  isStorageSupport = false;
}

if (storageName) {
  nameInput.value = storageName;
}
if (storagePhone) {
  phoneInput.value = storagePhone;
}

form.addEventListener('submit', (evt) => {
  if (!nameInput.value || !phoneInput.value) {
    evt.preventDefault();
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', nameInput.value);
      localStorage.setItem('phone', phoneInput.value);
    }
  }
});

phoneInput.addEventListener('input', () => {
  const phoneNumberPattern = /^\d{11}$/;
  if (!phoneNumberPattern.test(phoneInput.value)) {
    phoneInput.setCustomValidity('Номер телефона может содержать только цифры');
  } else {
    phoneInput.setCustomValidity('');
  }
  phoneInput.reportValidity();
});
