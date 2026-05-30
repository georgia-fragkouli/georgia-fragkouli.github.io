$(document).ready(function() {
    function updateAboutHeaderLeftContent() {
        var $navbar = $('#navbar');
        if (!$navbar.length) {
            return;
        }

        var pageTitle = String($navbar.data('page-title') || '').toLowerCase();
        if (pageTitle !== 'about') {
            return;
        }

        var $name = $('#navbar-name');
        var $social = $('#navbar-about-social');
        var aboutTitle = document.getElementById('about');

        if (!aboutTitle) {
            return;
        }

        var titleRect = aboutTitle.getBoundingClientRect();
        var navbarRect = $navbar[0].getBoundingClientRect();
        var navbarBottom = navbarRect.bottom;
        var titleVisible = titleRect.bottom > navbarBottom && titleRect.top < window.innerHeight;
        var showName = !titleVisible;

        if ($name.length) {
            $name.toggleClass('d-none', !showName);
        }
        if ($social.length) {
            $social.toggleClass('d-none', showName);
        }
    }

    $('a.abstract').click(function() {
        $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
    });
    $('a.bibtex').click(function() {
        $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
    });

    var $themeToggle = $('#theme-toggle');

    function setTheme(theme) {
        var isDark = theme === 'dark';
        document.documentElement.classList.toggle('dark-mode', isDark);
        try {
            localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
        } catch (e) {}

        if ($themeToggle.length) {
            var $icon = $themeToggle.find('i');
            $icon.removeClass('fa-sun fa-moon').addClass(isDark ? 'fa-sun' : 'fa-moon');
            $themeToggle.attr('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }

    if ($themeToggle.length) {
        var storedTheme = 'light';
        try {
            storedTheme = localStorage.getItem('site-theme') || 'light';
        } catch (e) {}
        setTheme(storedTheme === 'dark' ? 'dark' : 'light');

        $themeToggle.click(function() {
            var isDark = document.documentElement.classList.contains('dark-mode');
            setTheme(isDark ? 'light' : 'dark');
        });
    }

    updateAboutHeaderLeftContent();
    $(window).on('scroll', updateAboutHeaderLeftContent);
    $(window).on('resize', updateAboutHeaderLeftContent);
    $(window).on('hashchange', updateAboutHeaderLeftContent);
});
