// Interactividad básica: tema, copiar correo, descarga de CV y desplazamiento suave
(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const copyEmailBtn = document.getElementById('copyEmail');
  const emailLink = document.getElementById('emailLink');
  const downloadCv = document.getElementById('downloadCv');
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = localStorage.getItem('theme');

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    themeBtn.textContent = isDark ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-label', isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
  }

  const initialTheme = storedTheme || (prefersDark.matches ? 'dark' : 'light');
  applyTheme(initialTheme);

  prefersDark.addEventListener('change', (event) => {
    if (!storedTheme) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });

  themeBtn.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    const nextTheme = isDark ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });

  if (copyEmailBtn && emailLink) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = emailLink.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        copyEmailBtn.textContent = 'Correo copiado';
        copyEmailBtn.disabled = true;
        setTimeout(() => {
          copyEmailBtn.textContent = 'Copiar correo';
          copyEmailBtn.disabled = false;
        }, 1800);
      } catch (err) {
        copyEmailBtn.textContent = 'Error al copiar';
        setTimeout(() => {
          copyEmailBtn.textContent = 'Copiar correo';
        }, 1800);
      }
    });
  }

  if (downloadCv) {
    downloadCv.addEventListener('click', (event) => {
      const cvText = `Currículum Vitae - agmelendez

Resumen
- Profesional enfocado en producto y experiencia de usuario.
- Especialista en frontends accesibles y escalables.

Habilidades clave
- JavaScript, TypeScript, React, Node.js
- Sistemas de diseño, accesibilidad web
- Liderazgo de equipos multidisciplinarios

Contacto
- hola@agmelendez.dev
- https://github.com/agmelendez
`;
      const blob = new Blob([cvText], { type: 'text/plain' });
      downloadCv.href = URL.createObjectURL(blob);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const target = targetId ? document.querySelector(targetId) : null;
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
