function submitWif() {
}

$( "#email-field" ).keyup(function() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String($('#email-field').val()).toLowerCase())) {
        $('#email-validation-error').hide();
        $("#email-field").removeClass('is-danger');
    } else {
        $('#email-validation-error').show();
        $("#email-field").addClass('is-danger');
    }
  });
