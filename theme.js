// Theme toggling functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Set up theme toggle listener
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
});

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
    updateToggleButton(theme);
}

function updateToggleButton(theme) {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        if (theme === 'dark') {
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            toggleBtn.setAttribute('title', 'Switch to light mode');
        } else {
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            toggleBtn.setAttribute('title', 'Switch to dark mode');
        }
    }
} 