$( document ).ready(function() {
    setTimeout(function() {
        $('.templates-switch').addClass('up');
    }, 1000);

    $('.switch-hide').click(function () {
        $('.templates-switch').toggleClass('up');
        if ($('.templates-switch').hasClass("up")) {
            $(this).html("Скрыть панель");
        } else {
            $(this).html("Открыть панель");
        }
    })
});