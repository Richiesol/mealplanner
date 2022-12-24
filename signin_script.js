const emailId = document.getElementById("email");
const password = document.getElementById("password");
const signinButton = document.getElementById("login");

var emailID;
var Password;
var existingData;

fetch("http://localhost:8000/test.json")
  .then((response) => response.json())
  .then((json) => (existingData = json));

emailId.addEventListener("change", function () {
  emailID = emailId.value;
  if(!(emailID in existingData)){
    alert("Email id not found");
    emailId.value="";
    signinButton.disabled = "disabled"
  }
  else{
    signinButton.removeAttribute("disabled")
  }
});
password.addEventListener("change", function () {
  Password = password.value;
  if(existingData[emailID].password != Password){
    alert("Invalid credentials")
    password.value ="";
    signinButton.disabled = "disabled"
}
else{
    signinButton.removeAttribute("disabled")
  }
});


