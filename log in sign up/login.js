function sign() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    let conform=document.getElementById("sec_pass").value;


    window.localStorage.setItem("inp_email", email);
    if(pass == conform){
        window.localStorage.setItem("inp_pass", pass);
        window.localStorage.setItem("conf1",conform);
        window.location.href="home.html";
    }
    else{
        alert("please enter vaild password...");
    }
}
function Login() {
  let Email = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  
  let storedSignup = JSON.parse(window.localStorage.getItem("inp_email")) || [];

  let user = storedSignup.find(user => user.email === Email && user.passwoard === password);

  if(!user){
    window.location.href="home.html";
}
else{
    alert("please enter vaild password...");
}
}
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginLink = document.getElementById('login-link');
const signupLink = document.getElementById('signup-link');

loginLink.addEventListener('click', (event) => {
  event.preventDefault();
  signupForm.style.display = 'none';
  loginForm.style.display = 'block';

  setTimeout(() => {
    signupForm.style.opacity = 0;
    loginForm.style.opacity = 1;
  }, 10);
});

signupLink.addEventListener('click', (event) => {
  event.preventDefault();
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';

  setTimeout(() => {
    loginForm.style.opacity = 0;
    signupForm.style.opacity = 1;
  }, 10);
});