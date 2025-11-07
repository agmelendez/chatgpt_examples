// Basic interactivity: theme toggle, copy email, download CV placeholder
(function(){
  const themeBtn = document.getElementById('themeToggle');
  const copyEmailBtn = document.getElementById('copyEmail');
  const emailLink = document.getElementById('emailLink');
  const downloadCv = document.getElementById('downloadCv');

  // Toggle theme (light/dark)
  themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
  });

  // Copy email to clipboard
  copyEmailBtn.addEventListener('click', async () => {
    const email = emailLink.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      copyEmailBtn.textContent = 'Copied!';
      setTimeout(()=> copyEmailBtn.textContent = 'Copy email', 1600);
    } catch (err) {
      copyEmailBtn.textContent = 'Copy failed';
      setTimeout(()=> copyEmailBtn.textContent = 'Copy email', 1600);
    }
  });

  // Create a small CV file on the fly to download (placeholder)
  downloadCv.addEventListener('click', (e) => {
    const cvText = `Curriculum Vitae - agmelendez

Summary:
- Short summary about yourself.

Skills:
- JavaScript
- Node.js
- etc.

Contact:
- your.email@example.com
- https://github.com/agmelendez
`;
    const blob = new Blob([cvText], {type: 'text/plain'});
    downloadCv.href = URL.createObjectURL(blob);
  });
})();