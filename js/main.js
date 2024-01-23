function scrollToSection(sectionId) {
  $('#' + sectionId).get(0).scrollIntoView({ behavior: 'smooth' });
}

function toggleAnswer(element) {
  // Find the parent FAQ item
  var faqItem = $(element).parent();

  // Toggle the class to expand/collapse
  faqItem.toggleClass('expanded');

  // Find the answer within the FAQ item
  var faqAnswer = faqItem.find('.faq-answer');

  // Toggle the max-height property
  if (faqItem.hasClass('expanded')) {
    faqAnswer.css('max-height', faqAnswer.prop('scrollHeight') + 'px');
  } else {
    faqAnswer.css('max-height', '0');
  }
}



$(document).ready(function () {
  $('#enquire-form').submit(function (e) {
    e.preventDefault();

    var errors = $('.formerror');
    errors.each(function () {
      $(this).text('').hide();
    });

    var fullname = $('#fullname').val().trim();
    var phone = $('#phone').val().trim();
    var city = $('#city').val().trim();

    if ((fullname.length < 2) || !(/^([a-z]+(-| )?)+$/i).test(fullname)) {
      $('.formerror:eq(0)').show();
      $('.formerror:eq(0)').text('*Please enter name correctly');
    } else if (!(/^\d{10}$/).test(phone)) {
      $('.formerror:eq(0)').show();
      $('.formerror:eq(0)').text('*Please enter phone number correctly');
    } else if (!(/^([a-z]+(-| )?)+$/i).test(city)) {
      $('.formerror:eq(1)').show();
      $('.formerror:eq(1)').text('*Please enter city correctly');
    } else {
      var emailSubmitUrl = "submitForm.php";

      // var form_data = new FormData();
      var form_data = $(this).serialize();
      
      console.log(form_data)
      $.ajax({
        url: 'submitForm.php',
        type: "post",
        dataType: "json",
        data: form_data,
        success: function (emailResData) {
          console.log(emailResData)

          if (emailResData.status === 'success') {
            // Hide first view
            $('#lead-form').hide();
      
            // Show thank you message element with a delay and transition
            var leadFormSubmitted = $('#lead-form-submitted');
            leadFormSubmitted.css({ transition: 'opacity 1s', opacity: '1', display: 'block' });
          } else {
            // Handle email submission error if needed
            console.error('Error submitting email form: error');
          }
        },
        error: function (emailError) {
          // Handle email submission error if needed
          alert("failed!!!!")
          console.error(emailError.responseText);
        }
      });
      // formSubmit(url, form_data);
    }
  });
});

function closeForm() {
  // Hide the thank-you message
  $('#lead-form-submitted').hide();

  // Show the initial form
  $('#lead-form').show();

  $('#enquire-form').trigger('reset');

}