function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  }

function toggleAnswer(element) {
  // Find the parent FAQ item
  var faqItem = element.parentNode;

  // Toggle the class to expand/collapse
  faqItem.classList.toggle('expanded');

  // Find the answer within the FAQ item
  var faqAnswer = faqItem.querySelector('.faq-answer');

  // Toggle the max-height property
  if (faqItem.classList.contains('expanded')) {
    faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
  } else {
    faqAnswer.style.maxHeight = '0';
  }
}


window.addEventListener("load", function() {
  const form = document.getElementById('enquire-form');
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
      // // Hide first view
      const leadForm = document.getElementById('lead-form');

      setTimeout(() => {
        leadForm.style.display = 'none';

        // Show thank you message element with a delay and transition
        const leadFormSubmitted = document.getElementById('lead-form-submitted');
        leadFormSubmitted.style.transition = 'opacity 1s';
        leadFormSubmitted.style.opacity = '1';
        leadFormSubmitted.style.display = 'block';
      }, 500);
      
    })
  });
});

function closeForm() {
  // Hide the thank-you message
  document.getElementById('lead-form-submitted').style.display = 'none';

  // Show the initial form
  var leadForm = document.getElementById('lead-form');
  leadForm.style.display = 'block';

  document.getElementById('enquire-form').reset();
}

