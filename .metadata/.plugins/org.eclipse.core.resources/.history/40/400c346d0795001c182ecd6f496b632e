
// revelar senha para o usuário;

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
  
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('bi-eye');
});

// ----
function onlyNumbers(matricula) {
    var newVal = document.getElementByName(matricula).value;
    if (isNaN(newVal)) {
        document.getElementByName(matricula).value = newVal.replace(/[^0-9.]/g, "");
    }
}


