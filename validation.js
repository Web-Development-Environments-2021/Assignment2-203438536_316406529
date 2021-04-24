$(function() {
    $.validator.setDefaults({
      errorClass: 'help-block',
      highlight: function(element) {
        $(element)
          .closest('.form-group')
          .addClass('has-error');
      },
      unhighlight: function(element) {
        $(element)
          .closest('.form-group')
          .removeClass('has-error');
      },
      errorPlacement: function (error, element) {
        if (element.prop('type') === 'checkbox') {
          error.insertAfter(element.parent());
        } else {
          error.insertAfter(element);
        }
      }
    });
  
    $.validator.addMethod('strongPassword', function(value, element) {
        // alert("enter pass valid");
      return this.optional(element) 
        || value.length >= 6
        && /\d/.test(value)
        && /[a-z]/i.test(value);
    }, 'Your password must be at least 6 characters long and contain at least one number and one char\'.')

    $.validator.addMethod('userExist',function(value, element){
       
        // alert("enter user vaild");
        var checkUserNamrValid = checkIfUsernameExist(value);
        // alert(checkUserNamrValid);
        return checkUserNamrValid;
    },'The user name is already exist in the system.')

    $("#register-form").validate({
      rules: {
        userName:{
          required:true,
          userExist:true,  
        },
        email: {
          required: true,
          email: true,
          remote: "http://localhost:3000/inputValidator"
        },
        password: {
          required: true,
          strongPassword: true
        },
        password2: {
          required: true,
          equalTo: '#password'
        },
        firstName: {
          required: true,
          nowhitespace: true,
          lettersonly: true
        },
        secondName: {
          required: true,
          nowhitespace: true,
          lettersonly: true
        },
        birthDate:{
            required: true
        }
      },
      messages: {
        email: {
          required: 'Please enter an email address.',
          email: 'Please enter a <em>valid</em> email address.',
          remote: $.validator.format("{0} is already associated with an account.")
        },
        userName:{
            required:'Please enter username..'


        }
      }
    });
  
  });
  function checkIfUsernameExist(username){
      //true- valid username, false- already exist
      for(var i=0; i < usersDB.length; i++ ){
          var check = usersDB[i].userName;
          if(usersDB[i].userName == username){
              return false;
          }
      }
      return true;
};

function submitRegister(){
    // alert($('#register-form').valid());
    if ($('#register-form').valid()){
        alert($('#userNameIn').val());
        usersDB.push({
            userName: $('#userNameIn').val(),
            password: $('#password').val(),
            fullName: $('#firstNameIn').val(),
            email: $('#emailIn').val(),
            birthDate: new Date($('#datepicker').val())
        });
        // $('register-form').data('validate').resetForm();
        // clearValidation($('register-form'));
        // document.getElementById('register-form').reset()
        // $('register-form').resetForm();

        document.getElementById("userNameIn").value = "";
        document.getElementById("password").value = "";
        document.getElementById("firstNameIn").value = "";
        document.getElementById("emailIn").value = "";
        document.getElementById("datepicker").value = "";


    }
}
// function clearValidation(formElement){
//     //Internal $.validator is exposed through $(form).validate()
//     var validator = $('register-form').validate();
//     //Iterate through named elements inside of the form, and mark them as error free
//     $('[name]',formElement).each(function(){
//       validator.successList.push(this);//mark as error free
//       validator.showErrors();//remove error messages if present
//     });
//     validator.resetForm();//remove error class on name elements and clear history
//     validator.reset();//remove all error and success data
//    }
//    //used
//    var myForm = document.getElementById("register-form");
//    clearValidation(myForm);

