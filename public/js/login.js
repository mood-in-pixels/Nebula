$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var usernameInput = $("input#username-input");
  var passwordInput = $("input#password-input");
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };
    if (!userData.username || !userData.password) {
      return;
    }
    // If we have an username and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  });
  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  
  function loginUser(username, password) {
    $.post("/api/login", {
      username: username,
      password: password
    })

  // function loginUser(username, password) {
  //   console.log('we hit loginUser')

  //   $.ajax({
  //       url: "/api/login",
  //       headers: {"Content-Type" : "application/json"},
  //       // ContentType : "application/json",
  //       method: "POST",
  //       processData: false,
  //       body: JSON.stringify ({
  //       "username": username, 
  //       "password": password
  //       }),
  //       dataType: "JSON",
  //       contentType: "application/json"
  //   })
   // $.ajax({
   //    method: "POST",
   //    url: "/api/login",
   //    crossDomain:true, 
   //    dataType: "json",
   //    data:JSON.stringify({username: "username", password: "password"})
   //   }).done(function ( data ) {
   //        alert("ajax callback response:"+JSON.stringify(data));
       // })

    .then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    })
    // Response.TrySkipIisCustomErrors = true;
    .catch(function(err) {
      console.log(err);
    });
  }
});