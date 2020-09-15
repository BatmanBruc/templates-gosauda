$( document ).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();

    $("#colorpicker").spectrum({
        color: "#f00"
    });

    $("#colorpicker-btn").spectrum({
        color: "#333",
        move: function(color) {
            $(this).css("background-color", color.toHexString());
            $('.shop .btn').css("background-color", color.toHexString());
        },
    });

    $("#colorpicker-btn-text").spectrum({
        color: "#fff",
        move: function(color) {
            $(this).css("background-color", color.toHexString());
            $('.shop .btn').css("color", color.toHexString());
        },
    });

    $('.global-btn').click(function () {
        $('.settings-panel').addClass('show-global-settings')
    })


    $('.global-settings .btn-close').click(function () {
        $('.settings-panel').removeClass('show-global-settings')
    })

    let $fileInput = $('.file-input');
    let $droparea = $('.file-drop-area');

    $fileInput.on('dragenter focus click', function() {
        $droparea.addClass('is-active');
    });

// back to normal state
    $fileInput.on('dragleave blur drop', function() {
        $droparea.removeClass('is-active');
    });


});
