
jQuery(document).ready(function($){
    var mobileMenu = $('.js_mobile-menu'),
        mobileContent = $('.js_mobile-content'),
        mobileItems = $('.js_mobile-content .nav-item'),
        closeMobileMenu = $('.js_close-mobile'),
        nav = $('.js_nav');

    mobileMenu.on('click', function() {
        toggleMobileMenu()
        OffScroll();
    });

    closeMobileMenu.on('click', function() {
        toggleMobileMenu()
        $(window).unbind('scroll');
    });

    mobileItems.on('click', function() {
        toggleMobileMenu()
        $(window).unbind('scroll');
    });

    nav.on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),   
            top = $(id).offset().top,
            delay = 300;
        $('body,html').animate({scrollTop: top}, delay);
    });
    
    function OffScroll () {
        var winScrollTop = $(window).scrollTop();
    
        $(window).bind('scroll',function () {
            $(window).scrollTop(winScrollTop);
        });
    }

    function toggleMobileMenu() {
        mobileContent.toggleClass('open-mobile');
    }
});