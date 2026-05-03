document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const leadForm = document.getElementById('lead-form');
  const formSuccess = document.getElementById('form-success');
  const emiForm = document.getElementById('emi-form');
  const emiOutput = document.getElementById('emi-output');
  const interestOutput = document.getElementById('interest-output');
  const paymentOutput = document.getElementById('payment-output');

  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
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
