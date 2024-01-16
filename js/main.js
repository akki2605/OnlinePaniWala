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


function formSubmit(url,data){
  $.ajax({
    url:url,
    type:"POST",
    contentType: false,
    processData: false,
    data: data,
    success: function(resData){
      if(resData !== undefined){
        // Hide first view
        $('#lead-form').hide();

        // Show thank you message element with a delay and transition
        var leadFormSubmitted = $('#lead-form-submitted');
        leadFormSubmitted.css({ transition: 'opacity 1s', opacity: '1', display: 'block' });
      }
    },
    error:function(error){
      alert('Form not submitted, Please try again!!!');
    }
  })
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
      var url = "https://docs.google.com/forms/d/e/1FAIpQLSfxLLS1TtOa1jYV96KfPe_btVMDFjjUcYgegLCEq8vtrXl6yw/formResponse?";

      var form_data = new FormData();
      form_data.append('entry.1763979098', fullname);
      form_data.append('entry.1982011633', phone);
      form_data.append('entry.164786112', city);
      form_data.append('entry.2073022026', $('#msg').val());

      formSubmit(url, form_data);
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