const pageHeader = document.querySelector('.page-header');
const mainNav = pageHeader.querySelector('.main-nav');
const mainNavToggle = mainNav.querySelector('.main-nav__toggle');
const mainNavLinks = mainNav.querySelectorAll('a');

const form = pageHeader.querySelector('.form');
const nameInput = form.querySelector('input[type="text"]');
const phoneInput = form.querySelector('input[type="tel"]');

if (mainNav) {
  mainNav.classList.remove('main-nav--opened', 'main-nav--no-js');
}

if (mainNavToggle) {
  mainNavToggle.addEventListener('click', () => {
    mainNav.classList.toggle('main-nav--opened');

    if (mainNav.classList.contains('main-nav--opened')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });
}

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
  const phoneNumberPattern = /(?:\(?\+\d{2}\)?\s*)?\d+(?:[ -]*\d+)*$/;
  if (!phoneNumberPattern.test(phoneInput.value)) {
    phoneInput.setCustomValidity('Номер телефона может содержать только цифры');
  } else {
    phoneInput.setCustomValidity('');
  }
  phoneInput.reportValidity();
});


// smooth scroll
mainNavLinks.forEach((link) => {
  link.addEventListener('click', function(evt) {
    evt.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  });
});
