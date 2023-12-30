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