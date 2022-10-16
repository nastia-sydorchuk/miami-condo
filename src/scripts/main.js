'use strict';

// Disable scroll

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#menu') {
    document.body.classList.add('page__body--with-menu');
  } else {
    document.body.classList.remove('page__body--with-menu');
  }
});

// Form validation

const form = document.querySelector('form');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');
const successMessage = document.querySelector('.contact-us__message');

const inputs = [emailInput, messageInput, nameInput];
let formIsValid = false;
let isValidating = false;

const isEmailValid = (email) => {
  // eslint-disable-next-line
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email.toLowerCase());
};

const resetInput = (element) => {
  element.previousElementSibling.classList.add('form-field__message--hidden');
  element.classList.remove('form-field--invalid');
};

const invalidateInput = (element) => {
  element.previousElementSibling.classList
    .remove('form-field__message--hidden');
  element.classList.add('form-field--invalid');
};

const validateInputs = () => {
  if (!isValidating) {
    return;
  }

  inputs.forEach(resetInput);
  formIsValid = true;

  if (!nameInput.value.trim()) {
    invalidateInput(nameInput);
    formIsValid = false;
  }

  if (!messageInput.value.trim()) {
    invalidateInput(messageInput);
    formIsValid = false;
  }

  if (!isEmailValid(emailInput.value)) {
    invalidateInput(emailInput);
    formIsValid = false;
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  isValidating = true;
  validateInputs();

  if (formIsValid) {
    form.remove();
    successMessage.classList.remove('contact-us__message--hidden');
  }
});

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    resetInput(input);
  });
});
