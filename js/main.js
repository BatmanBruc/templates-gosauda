$( document ).ready(function() {
    $("#colorpicker").spectrum({
        color: "#f00"
    });

    $('.global-btn').click(function () {
        $('.settings-panel').addClass('show-global-settings')
    })

    $('body').click(function (event)
    {
        if(!$(event.target).closest('.settings-panel').length && !$(event.target).is('.settings-panel')) {
            $(".settings-panel").removeClass('show-global-settings')
        }
    });
});
