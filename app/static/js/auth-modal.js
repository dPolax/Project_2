document.addEventListener('DOMContentLoaded', function() {
    // Элементы модальных окон
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const closeBtns = document.querySelectorAll('.close');
    
    // Формы аутентификации
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Переключатели между формами
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
  
    // Открытие модальных окон
    if (loginButton) {
      loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
      });
    }
    
    if (registerButton) {
      registerButton.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'block';
      });
    }
    
    // Закрытие модальных окон
    closeBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
        clearErrors();
      });
    });
    
    // Закрытие по клику вне модального окна
    window.addEventListener('click', function(e) {
      if (e.target === loginModal) {
        loginModal.style.display = 'none';
        clearErrors();
      }
      if (e.target === registerModal) {
        registerModal.style.display = 'none';
        clearErrors();
      }
    });
    
    // Переключение между формами
    if (switchToRegister) {
      switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
        clearErrors();
      });
    }
    
    if (switchToLogin) {
      switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
        clearErrors();
      });
    }
    
    // Отправка форм через AJAX
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sendForm(this, 'login');
      });
    }
    
    if (registerForm) {
      registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sendForm(this, 'register');
      });
    }
    
    // Функция отправки формы
    function sendForm(form, formType) {
      clearErrors();
      
      const formData = new FormData(form);
      
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Перенаправление, если успешно
          window.location.href = data.redirect;
        } else {
          // Отображение ошибок
          displayErrors(data.errors, formType);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    
    // Функция очистки ошибок
    function clearErrors() {
      const errorElements = document.querySelectorAll('.error');
      errorElements.forEach(element => {
        element.textContent = '';
      });
    }
    
    // Функция отображения ошибок
    function displayErrors(errors, formType) {
      if (!errors) return;
      
      Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${formType}-${field}-error`);
        if (errorElement) {
          errorElement.textContent = errors[field][0];
        }
      });
    }
  });