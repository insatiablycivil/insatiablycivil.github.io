$(document).ready(function() {
    $(window).resize(function() {

        if($(window).width() >= "490") {
            $("header > nav").toggle(false);
            $("header > nav > ul > li > nav").toggle(false);
            $("header > nav").css("display", "block");

                if($("#logo").attr('class') == "menuDown") {
                $("#logo").removeClass("MenuDown");
                $("#logo").addClass("MenuUp");
        }    
        } else {
            $("header > nav").toggle(false);
            $("header > nav > ul > li > nav").toggle(false);
        }
    });

    $("#navToggle a").click(function(e){
        if($(window).width() < "490") {
            e.preventDefault();  
            $("#logo").toggleClass("menuUp menuDown");
            $("header > nav").slideToggle("medium");
            $("header > nav > ul > li > nav").slideUp("medium");
        }
    });
    
    $("header > nav > ul > li").click(function(e){
        e.preventDefault();
        if($(window).width() < "490") {
            $(this).find("nav").slideToggle("medium");
        }
    }).children().not("a").click(function(e) {
        if($(window).width() < "490") {
            return false;
        }
    });

    $("header > nav > ul > li").hover(function(e){
        if($(window).width() >= "490") {
            $(this).find("nav").slideToggle("medium");
        }
    });

    $(window).scroll(function () {
        if($(window).width() >= "490") {
            if ($(window).scrollTop() > 197) {
                $('header > nav').addClass('navbar-fixed');
                $("#main").css("margin-top", "56px");
            } else {
                $('header > nav').removeClass('navbar-fixed');
                $("#main").css("margin-top", "15px");
            }
        } else {
                $('header > nav').removeClass('navbar-fixed');
                $("#main").css("margin-top", "15px");            
        }
    });   
});