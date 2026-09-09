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

    function updateActiveAboutTab() {
        var $navbar = $('#navbar');
        if (!$navbar.length || String($navbar.data('page-title') || '').toLowerCase() !== 'about') {
            return;
        }

        var $sectionTabs = $navbar.find('[data-nav-section]');
        var activeSection = 'about';
        var scrollPosition = window.pageYOffset + $navbar.outerHeight() + 32;

        $sectionTabs.each(function() {
            var sectionId = $(this).data('nav-section');
            var section = document.getElementById(sectionId);
            if (section && section.offsetTop <= scrollPosition) {
                activeSection = sectionId;
            }
        });

        if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight - 2) {
            var lastSection = $sectionTabs.last().data('nav-section');
            if (lastSection && document.getElementById(lastSection)) {
                activeSection = lastSection;
            }
        }

        $sectionTabs.removeClass('active').find('.nav-link').removeAttr('aria-current');
        $sectionTabs.filter('[data-nav-section="' + activeSection + '"]')
            .addClass('active')
            .find('.nav-link')
            .attr('aria-current', 'page');
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
    updateActiveAboutTab();
    $(window).on('scroll', function() {
        updateAboutHeaderLeftContent();
        updateActiveAboutTab();
    });
    $(window).on('resize', function() {
        updateAboutHeaderLeftContent();
        updateActiveAboutTab();
    });
    $(window).on('hashchange', function() {
        updateAboutHeaderLeftContent();
        updateActiveAboutTab();
    });
});
