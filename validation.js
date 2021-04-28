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
    },'Username already exist in the system.')

    $("#register-form").validate({
      rules: {
        userName:{
          required:true,
          userExist:true,  
        },
        email: {
          required: true,
          email: true,
          remote: "https://localhost:3000/inputValidator"
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
        birthDay:{
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
        // alert($('#userNameIn').val());
        usersDB.push({
            userName: $('#userNameIn').val(),
            password: $('#password').val(),
            fullName: $('#firstNameIn').val(),
            email: $('#emailIn').val(),
            birthDate: new Date($('#datepicker').val())
        });
     
        document.getElementById("userNameIn").value = "";
        document.getElementById("password").value = "";
        document.getElementById("passwordRe").value = "";
        document.getElementById("firstNameIn").value = "";
        document.getElementById("emailIn").value = "";
        document.getElementById("datepicker").value = "";
        document.getElementById("lastnameIn").value = "";
        displayLogin();

    }
}
