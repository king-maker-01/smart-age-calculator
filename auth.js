// basic form validation and show/hide password logic

function setupAuth() {
  // login form handling
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const emailError = document.getElementById('emailError');
      const passwordError = document.getElementById('passwordError');
      emailError.textContent = '';
      passwordError.textContent = '';
      if (!email.value) {
        emailError.textContent = 'Email is required';
        valid = false;
      }
      if (!password.value) {
        passwordError.textContent = 'Password is required';
        valid = false;
      }
      if (valid) {
        // normally submit to server
        alert('Login successful (demo)');
        loginForm.reset();
      }
    });
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const name = document.getElementById('fullname');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const confirm = document.getElementById('confirm');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const passwordError = document.getElementById('passwordError');
      const confirmError = document.getElementById('confirmError');
      nameError.textContent = '';
      emailError.textContent = '';
      passwordError.textContent = '';
      confirmError.textContent = '';
      if (!name.value) {
        nameError.textContent = 'Full name is required';
        valid = false;
      }
      if (!email.value) {
        emailError.textContent = 'Email is required';
        valid = false;
      }
      if (!password.value) {
        passwordError.textContent = 'Password is required';
        valid = false;
      }
      if (password.value && confirm.value !== password.value) {
        confirmError.textContent = 'Passwords do not match';
        valid = false;
      }
      if (valid) {
        alert('Account created (demo)');
        signupForm.reset();
      }
    });
  }

  // toggle password visibility
  document.querySelectorAll('.show-pass').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
      } else {
        input.type = 'password';
        btn.textContent = '👁️';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', setupAuth);
