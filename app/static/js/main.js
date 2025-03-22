// Утилиты для работы с DOM
const dom = {
    get: selector => document.querySelector(selector),
    getAll: selector => document.querySelectorAll(selector),
    addClass: (element, className) => element.classList.add(className),
    removeClass: (element, className) => element.classList.remove(className),
    toggle: (element, className) => element.classList.toggle(className)
  };
  
  // Инициализация при загрузке страницы
  document.addEventListener('DOMContentLoaded', function() {
    // Добавляем текущий год в футер
    const currentYear = new Date().getFullYear();
    const footerYear = dom.get('.footer');
    if (footerYear) {
      footerYear.innerHTML = footerYear.innerHTML.replace('{{ now.year }}', currentYear);
    }
  
    // Автоматически скрывать алерты через 5 секунд
    const alerts = dom.getAll('.alert');
    alerts.forEach(alert => {
      setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => {
          alert.style.display = 'none';
        }, 500);
      }, 5000);
    });
  
    // Настройка мобильного меню (если будет добавлено)
    const mobileMenuToggle = dom.get('.mobile-menu-toggle');
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => {
        const nav = dom.get('.main-nav');
        if (nav) {
          dom.toggle(nav, 'show');
        }
      });
    }
  });