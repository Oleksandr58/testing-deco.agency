jQuery(document).ready(function($){

     // VARIABLES //

    var mobileMenu = $('.js_mobile-menu'),
    mobileContent = $('.js_mobile-content'),
    mobileItems = $('.js_mobile-content .nav-item'),
    closeMobileMenu = $('.js_close-mobile'),
    nav = $('.js_nav'),
    services = $('.services-item'),
    servicesitem = $('.item-wrap'),
    modal = $('.modal'),
    accordeonHeader = $('.js_accordeon .interest-header'),
    accordeonContent = $('.js_accordeon .interest-content'),
    animationTime = 1000;

    // MOBILE MENU //

    mobileMenu.on('click', function() {
        toggleMobileMenu();
        OffScroll();
    });

    closeMobileMenu.on('click', function() {
        toggleMobileMenu();
        $(window).unbind('scroll');
    });

    mobileItems.on('click', function() {
        toggleMobileMenu();
        $(window).unbind('scroll');
    });

    // FLEXIBLE NAVIGATION SCROLL //

    nav.on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),   
            top = $(id).offset().top,
            delay = 300;
        $('body,html').animate({scrollTop: top}, delay);
    });
    
    // MODAL IN SERVICES //

    services.on('click', function() {
        if ( $(this).find(servicesitem).hasClass('open-item') ) {
            services.find(servicesitem).removeClass('open-item');
            $(this).next().slideToggle(animationTime);
            return;
        }
        services.find(servicesitem).removeClass('open-item');
        modal.slideUp(animationTime);
        $(this).find(servicesitem).addClass('open-item');
        $(this).next().slideToggle(animationTime);
    });

    // ACCORDEON INTEREST IN REQUEST //

    accordeonHeader.on('click', function() {
        accordeonContent.slideToggle(animationTime);
        accordeonHeader.toggleClass('interest-close');
    });

    // FUNCTION //
    
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
