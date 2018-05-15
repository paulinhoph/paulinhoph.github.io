// Navegação da página
$('.scroll').click(function(event){
    event.preventDefault();
    var id = $(this).attr('href'),
        targetOffset = $(id).offset().top,
        menuHeight = $('.navbar').innerHeight();
    $('html, body').animate({
        scrollTop: targetOffset - menuHeight
    }, 500);
});

// Menu Mobile
$(".navbar-links").addClass("closed");
$('.navbar-bars').click(function(){
    if($(".navbar-links").hasClass("closed")) {
        $(".navbar-links").animate({top:'8vh'},{duration:400}).removeClass("closed");
    }
    else {
        $(".navbar-links").animate({top:'-18vh'},{duration:400}).addClass("closed");
    }
});
$('.navbar-link').click(function(){
        $(".navbar-links").animate({top:'-18vh'},{duration:400}).addClass("closed");
});