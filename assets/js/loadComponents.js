
document.addEventListener("DOMContentLoaded", () => {
    // Load Header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // Re-initialize any header scripts here if necessary
            const navToggle = document.querySelector('.nav-toggle');
            const mobileNav = document.querySelector('.mobile-nav');
            if (navToggle && mobileNav) {
                navToggle.addEventListener('click', () => {
                    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
                    navToggle.setAttribute('aria-expanded', !expanded);
                    mobileNav.classList.toggle('open');
                });
            }
            
            // Re-initialize mobile dropdown toggle
            const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
            const mobileDropdown = document.querySelector('.mobile-dropdown');
            if (mobileDropdownToggle && mobileDropdown) {
                mobileDropdownToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    mobileDropdown.classList.toggle('open');
                });
            }
            
            // Highlight active link
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('.site-header a').forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                }
            });
        });

    // Load Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            document.getElementById('footer-placeholder').querySelectorAll('[data-year]').forEach(el => {
                el.textContent = new Date().getFullYear();
            });
        });
});
