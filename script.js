document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const leadForm = document.getElementById('lead-form');
  const formSuccess = document.getElementById('form-success');
  const emiForm = document.getElementById('emi-form');
  const emiOutput = document.getElementById('emi-output');
  const interestOutput = document.getElementById('interest-output');
  const paymentOutput = document.getElementById('payment-output');
  const loanPopup = document.getElementById('loan-popup');
  const popupCard = loanPopup ? loanPopup.querySelector('.loan-popup__card') : null;
  const popupCloseControls = loanPopup ? loanPopup.querySelectorAll('[data-popup-close]') : [];
  const popupStorageKey = 'aaruLoanPopupClosedAt';
  const popupCooldown = 24 * 60 * 60 * 1000;
  const forcePopup = new URLSearchParams(window.location.search).get('popup') === '1';
  let popupTimer;

  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });

  function popupRecentlyClosed() {
    const closedAt = Number(localStorage.getItem(popupStorageKey));
    return closedAt && Date.now() - closedAt < popupCooldown;
  }

  function openLoanPopup() {
    if (!loanPopup) return;
    loanPopup.classList.add('is-open');
    loanPopup.setAttribute('aria-hidden', 'false');
    if (popupCard) popupCard.focus();
  }

  function closeLoanPopup() {
    if (!loanPopup) return;
    loanPopup.classList.remove('is-open');
    loanPopup.setAttribute('aria-hidden', 'true');
    localStorage.setItem(popupStorageKey, String(Date.now()));
  }

  if (loanPopup && (forcePopup || !popupRecentlyClosed())) {
    popupTimer = window.setTimeout(openLoanPopup, forcePopup ? 300 : 5000);
  }

  popupCloseControls.forEach((control) => {
    control.addEventListener('click', function () {
      window.clearTimeout(popupTimer);
      closeLoanPopup();
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && loanPopup && loanPopup.classList.contains('is-open')) {
      closeLoanPopup();
    }
  });

  leadForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('full-name');
    const mobile = document.getElementById('mobile-number');
    const city = document.getElementById('city');
    const loanType = document.getElementById('loan-type');
    const amount = document.getElementById('loan-amount-enquiry');
    const message = document.getElementById('message');

    const phonePattern = /^\d{10}$/;
    let valid = true;
    let errorMessage = '';

    if (!name.value.trim()) {
      valid = false;
      errorMessage = 'Please enter your name.';
      name.focus();
    } else if (!phonePattern.test(mobile.value.trim())) {
      valid = false;
      errorMessage = 'Please enter a valid 10-digit mobile number.';
      mobile.focus();
    } else if (!city.value.trim()) {
      valid = false;
      errorMessage = 'Please provide your city.';
      city.focus();
    } else if (!loanType.value) {
      valid = false;
      errorMessage = 'Please select a loan type.';
      loanType.focus();
    } else if (!amount.value || Number(amount.value) < 10000) {
      valid = false;
      errorMessage = 'Please enter a valid loan amount.';
      amount.focus();
    } else if (!message.value.trim()) {
      valid = false;
      errorMessage = 'Please share a brief message.';
      message.focus();
    }

    if (!valid) {
      formSuccess.textContent = errorMessage;
      formSuccess.style.color = '#c0392b';
      return;
    }

    formSuccess.style.color = '#245b3f';
    formSuccess.textContent = 'Submitting your enquiry...';
    leadForm.submit();
  });

  emiForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const principal = Number(document.getElementById('loan-amount').value);
    const annualRate = Number(document.getElementById('interest-rate').value);
    const months = Number(document.getElementById('tenure-months').value);

    if (principal <= 0 || annualRate <= 0 || months <= 0) {
      emiOutput.textContent = '₹0';
      interestOutput.textContent = '₹0';
      paymentOutput.textContent = '₹0';
      return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const factor = Math.pow(1 + monthlyRate, months);
    const emi = (principal * monthlyRate * factor) / (factor - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    emiOutput.textContent = `₹${emi.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    interestOutput.textContent = `₹${totalInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    paymentOutput.textContent = `₹${totalPayment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  });
});
