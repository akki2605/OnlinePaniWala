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


function formSubmit(url,data){
  $.ajax({
    url:url,
    type:"POST",
    contentType: false,
    processData: false,
    data: data,
    success: function(resData){
      if(resData){
        // Hide first view
        const leadForm = document.getElementById('lead-form');
      
        leadForm.style.display = 'none';

        // Show thank you message element with a delay and transition
        const leadFormSubmitted = document.getElementById('lead-form-submitted');
        leadFormSubmitted.style.transition = 'opacity 1s';
        leadFormSubmitted.style.opacity = '1';
        leadFormSubmitted.style.display = 'block';
      }
    },
    error:function(error){
      console.log('error',error);
      alert('your form not post');
    }
  })
}

$(document).ready(function(){
  
  $(document).on('submit','#enquire-form',function(e){
    e.preventDefault();

    var errors = $('.formerror');
    errors.each(function() {
      $(this).text('');
    });


    var fullname= $('#fullname').val().trim();
    var phone= $('#phone').val().trim();
    var city= $('#city').val().trim();
    
    if((fullname.length<2) || !(/^([a-z]+(-| )?)+$/i).test(fullname)){
      document.getElementsByClassName('formerror')[0].style.display = 'block';
      $('.formerror:eq(0)').text('*Please enter name correctly');
    }
    else if(!(/^\d{10}$/).test(phone)){
      document.getElementsByClassName('formerror')[0].style.display = 'block';
      $('.formerror:eq(0)').text('*Please enter phone number correctly');
    }
    else if(!(/^([a-z]+(-| )?)+$/i).test(city)){
      document.getElementsByClassName('formerror')[1].style.display = 'block';
      $('.formerror:eq(1)').text('*Please enter city correctly');
    }
    else{
      var url="https://docs.google.com/forms/d/e/1FAIpQLSfxLLS1TtOa1jYV96KfPe_btVMDFjjUcYgegLCEq8vtrXl6yw/formResponse?";

      var form_data=new FormData();
      form_data.append('entry.1763979098', fullname)
      form_data.append('entry.1982011633', phone)
      form_data.append('entry.164786112', city)
      form_data.append('entry.2073022026', $('#msg').val())

      formSubmit(url,form_data);
    }

  })  
})

function closeForm() {
  // Hide the thank-you message
  document.getElementById('lead-form-submitted').style.display = 'none';

  // Show the initial form
  var leadForm = document.getElementById('lead-form');
  leadForm.style.display = 'block';

  document.getElementById('enquire-form').reset();
}