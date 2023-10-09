var currentPanel = 1;
var totalPanels = 0;
var autoPlay = true;
var timePassed = 0;
var timeToChange = 3;
var photoWidth = 0;

function autoAdvance() {
    if(window.timePassed == window.timeToChange) {
        window.timePassed = 0;
        if(autoPlay == true) {
            if(window.currentPanel == window.totalPanels){
                $('.slider_nav a.slider_nav_item:nth-child(1)').trigger('click');
            } else {
                $('.slider_nav a.slider_nav_item:nth-child('+(window.currentPanel+1)+')').trigger('click');
            }         
        }
    } else {
        window.timePassed += 1;
    } 
};

$(document).ready(function() {
    
    setInterval(autoAdvance, 1000);

    window.photoWidth = $('.slider_container').width();

    $('.slider_container').hover(
        function() {
            window.autoPlay = false;
            $(this).removeClass('autoplay');
        },
        function(){
            window.autoPlay = true;
            window.timePassed = 0;
            $(this).addClass('autoplay');
        }
    );

    //Preload

    $('.slider_panels img').imgpreload(function(){
        initializeSlider();
    });

    //Generate photo lineup

    $('img.slider_panel_photo').each(function(index){
        var photoWidth = $('.slider_container').width();
        var photoHeight = $('.slider_container').height();
        var photoPosition = index * photoWidth;
        $('.slider_photos').append('<img class = "slider_photo" src="'+$(this).attr('src')+'" alt="'+$(this).attr('alt')+'" width="'+photoWidth+'" height="'+photoHeight+'" />');
    });

    $('.slider_photos img:last-child').clone().insertBefore('.slider_photos img:first-child');
    $('.slider_photos img:nth-child(2)').clone().insertAfter('.slider_photos img:last-child');
    $('.slider_photos img').each(function(index){
        var photoPosition = index * window.photoWidth;
        $(this).css('left', photoPosition + 'px');
        $('.slider_photos').css('width', photoPosition + window.photoWidth + 'px');
    });

    $('.slider_photos').css('left', '-' +window.photoWidth+ 'px');
    //Generate navigation links

    $('.slider_panels .slider_panel').each(function(index){
        $('.slider_nav').append('<a class="slider_nav_item"></a>');
        window.totalPanels = index + 1;
    });

    //Set up navigation links

    $('.slider_nav a.slider_nav_item').click(function(index) {

        //Set the navigation state

        $('.slider_nav a.slider_nav_item').removeClass('selected');
        $(this).addClass('selected');

        var navClicked = $(this).index();
        
        var distanceToMove = window.photoWidth * (-1);
        var newPhotoPosition = (navClicked * distanceToMove) - window.photoWidth + 'px';
        
        if(window.currentPanel == window.totalPanels && navClicked == 0){
            newPhotoPosition = (window.photoWidth * (window.totalPanels + 1) * -1) + 'px';
            $('.slider_photos').animate({left: newPhotoPosition}, 1000, function() {
                $('.slider_photos').css('left', '-' +window.photoWidth+ 'px');
            });
        } else if (window.currentPanel == 1 && navClicked == (window.totalPanels - 1)) {
            newPhotoPosition = '0px';
            $('.slider_photos').animate({left: newPhotoPosition}, 1000, function() {
                $('.slider_photos').css('left', '-' +(window.photoWidth * window.totalPanels)+ 'px');
            });
        } else {
            $('.slider_photos').animate({left: newPhotoPosition}, 1000);
        }

        window.currentPanel = navClicked + 1;

    });

    function initializeSlider () {
        $('.slider_nav a.slider_nav_item:first').addClass('selected');
        $('.slider_photos').fadeIn(1500);
    }
});