document.addEventListener('DOMContentLoaded', function () {
  const siteUrl = 'https://aarufinancesolution.com';
  const defaultDescription = 'Aaru Finance Solution offers trusted loan guidance in Ayodhya for home loan, personal loan, property loan, vehicle finance and business loan with simple process and customer-friendly support.';
  const pageSeo = {
    '/': {
      title: 'Aaru Finance Solution | Home Loan, Personal Loan & Vehicle Finance in Ayodhya',
      description: defaultDescription,
    },
    '/about': {
      title: 'About Aaru Finance Solution | Trusted Loan Consultant in Ayodhya',
      description: 'Learn about Aaru Finance Solution, a trusted finance guidance provider in Ayodhya offering home loan, personal loan, property loan, vehicle finance and business loan support.',
    },
    '/contact': {
      title: 'Contact Aaru Finance Solution | Loan Guidance in Ayodhya',
      description: 'Contact Aaru Finance Solution in Ayodhya for home loan, personal loan, property loan, vehicle finance and business loan assistance with customer-friendly support.',
    },
    '/services': {
      title: 'Loan Services in Ayodhya | Home, Personal, Property & Business Loans',
      description: 'Explore Aaru Finance Solution services for Home Loan in Ayodhya, Personal Loan in Ayodhya, Property Loan Consultant Ayodhya, Vehicle Finance Ayodhya and business loan help.',
    },
    '/home-loan': {
      title: 'Home Loan in Ayodhya | Aaru Finance Solution',
      description: 'Get Home Loan in Ayodhya guidance for buying, building or renovating a house. Aaru Finance Solution supports eligibility, documents, property papers and lender process in Ayodhya and Faizabad.',
    },
    '/personal-loan': {
      title: 'Personal Loan in Ayodhya | Aaru Finance Solution',
      description: 'Apply for Personal Loan in Ayodhya with Aaru Finance Solution. Get document guidance, eligibility support, EMI planning and local finance consultation in Ayodhya, Faizabad, Uttar Pradesh.',
    },
    '/property-loan': {
      title: 'Property Loan in Ayodhya | Aaru Finance Solution',
      description: 'Property Loan in Ayodhya guidance for residential or commercial property-backed finance. Get support for eligibility, property documents and bank/NBFC process from Aaru Finance Solution.',
    },
    '/vehicle-loan': {
      title: 'Vehicle Loan in Ayodhya | Aaru Finance Solution',
      description: 'Vehicle Loan in Ayodhya support for car loan, bike loan and commercial vehicle finance. Aaru Finance Solution helps with eligibility, documents and lender process in Ayodhya, Faizabad.',
    },
    '/vehicle-finance': {
      title: 'Vehicle Loan in Ayodhya | Aaru Finance Solution',
      description: 'Vehicle Loan in Ayodhya support for car loan, bike loan and commercial vehicle finance. Aaru Finance Solution helps with eligibility, documents and lender process in Ayodhya, Faizabad.',
    },
    '/business-loan': {
      title: 'Business Loan in Ayodhya | Aaru Finance Solution',
      description: 'Business Loan in Ayodhya guidance for shop owners, traders, MSMEs and self-employed professionals. Get document, eligibility and working capital loan support from Aaru Finance Solution.',
    },
    '/loan-against-property': {
      title: 'Loan Against Property in Ayodhya | Aaru Finance Solution',
      description: 'Loan Against Property in Ayodhya guidance for salaried, self-employed and business needs. Get support for documents, eligibility, valuation and lender process from Aaru Finance Solution.',
    },
    '/cibil-score-help': {
      title: 'CIBIL Score Help & Low CIBIL Loan Support in Ayodhya | Aaru Finance Solution',
      description: 'Get CIBIL Score Help and Low CIBIL Loan Support in Ayodhya. Aaru Finance Solution explains credit profile, document preparation and suitable loan guidance without guaranteed approval claims.',
    },
    '/blog': {
      title: 'Finance Blog Ayodhya | Loan Tips by Aaru Finance Solution',
      description: 'Read simple Hindi-English finance blogs by Aaru Finance Solution on home loan, personal loan, business loan, vehicle finance, EMI, CIBIL score and loan tips in Ayodhya.',
    },
  };

  function upsertHeadTag(selector, createTag, attributes) {
    const tag = document.head.querySelector(selector) || document.head.appendChild(document.createElement(createTag));
    Object.entries(attributes).forEach(([name, value]) => tag.setAttribute(name, value));
    return tag;
  }

  function applySeoMeta() {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    const seo = pageSeo[path] || pageSeo['/'];
    const canonicalUrl = `${siteUrl}${path === '/' ? '/' : `${path}/`}`;

    document.title = seo.title;
    upsertHeadTag('meta[name="description"]', 'meta', { name: 'description', content: seo.description });
    upsertHeadTag('meta[name="robots"]', 'meta', { name: 'robots', content: 'index, follow' });
    upsertHeadTag('link[rel="canonical"]', 'link', { rel: 'canonical', href: canonicalUrl });
    upsertHeadTag('meta[property="og:title"]', 'meta', { property: 'og:title', content: seo.title });
    upsertHeadTag('meta[property="og:description"]', 'meta', { property: 'og:description', content: seo.description });
    upsertHeadTag('meta[property="og:type"]', 'meta', { property: 'og:type', content: 'website' });
    upsertHeadTag('meta[property="og:url"]', 'meta', { property: 'og:url', content: canonicalUrl });
    upsertHeadTag('meta[property="og:site_name"]', 'meta', { property: 'og:site_name', content: 'Aaru Finance Solution' });
    upsertHeadTag('meta[name="twitter:card"]', 'meta', { name: 'twitter:card', content: 'summary_large_image' });
    upsertHeadTag('meta[name="twitter:title"]', 'meta', { name: 'twitter:title', content: seo.title });
    upsertHeadTag('meta[name="twitter:description"]', 'meta', { name: 'twitter:description', content: seo.description });
    upsertHeadTag('meta[name="twitter:image"]', 'meta', { name: 'twitter:image', content: `${siteUrl}/assets/lic-hfl-logo.svg` });
  }

  applySeoMeta();

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const leadForm = document.getElementById('lead-form');
  const formSuccess = document.getElementById('form-success');
  const blogSearch = document.getElementById('blog-search');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  if (blogSearch) {
    const blogCards = document.querySelectorAll('.blog-card');
    blogSearch.addEventListener('input', function () {
      const query = blogSearch.value.trim().toLowerCase();
      blogCards.forEach((card) => {
        card.style.display = card.textContent.toLowerCase().includes(query) ? '' : 'none';
      });
    });
  }

  if (!leadForm) return;

  leadForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('full-name');
    const mobile = document.getElementById('mobile-number');
    const city = document.getElementById('city');
    const loanType = document.getElementById('loan-type');
    const amount = document.getElementById('loan-amount-enquiry');
    const message = document.getElementById('message');
    const phoneDigits = mobile.value.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
    let errorMessage = '';

    if (!name.value.trim()) {
      errorMessage = 'Please enter your name.';
      name.focus();
    } else if (!/^\d{10}$/.test(phoneDigits)) {
      errorMessage = 'Please enter a valid 10-digit mobile number.';
      mobile.focus();
    } else if (!loanType.value) {
      errorMessage = 'Please select a loan type.';
      loanType.focus();
    } else if (!amount.value || Number(amount.value) < 10000) {
      errorMessage = 'Please enter a valid loan amount.';
      amount.focus();
    }

    if (errorMessage) {
      formSuccess.textContent = errorMessage;
      formSuccess.style.color = '#c0392b';
      return;
    }

    formSuccess.style.color = '#245b3f';
    formSuccess.textContent = 'Submitting your enquiry...';

    try {
      const formData = new FormData(leadForm);
      formData.set('Mobile Number', phoneDigits);
      formData.set('City', city.value || 'Ayodhya');
      formData.set('Message', message.value || 'Please contact me for loan assistance.');

      const response = await fetch(leadForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      leadForm.reset();
      formSuccess.style.color = '#245b3f';
      formSuccess.textContent = 'Thank you. Your enquiry has been submitted successfully.';
    } catch (error) {
      formSuccess.style.color = '#c0392b';
      formSuccess.textContent = 'Unable to submit right now. Please call 7985512592 or message us on WhatsApp.';
    }
  });
});
