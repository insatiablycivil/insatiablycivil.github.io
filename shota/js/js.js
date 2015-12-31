$(document).ready(function() {
    $(window).resize(function() {
        if($(window).width() >= "500") {
            $("header > nav").css("display", "block");
            if($("#logo").attr('class') == "menuDown") {
                $("#logo").removeClass("MenuDown");
                $("#logo").addClass("MenuUp");
            }
        } else {
            $("header > nav").slideUp("medium");
            $("header > nav > ul > li > nav").slideUp("medium");
        }
    });

    $("#navToggle a").click(function(e){
        if($(window).width() <= "500") {
            e.preventDefault();    
            $("#logo").toggleClass("menuUp menuDown");
            $("header > nav").slideToggle("medium");
            $("header > nav > ul > li > nav").slideUp("medium");
        }
    });
    
    $("header > nav > ul > li").click(function(e){
        if($( window ).width() <= "500") {
            e.preventDefault();
            $(this).find("nav").slideToggle("medium");
        }
    });


});
