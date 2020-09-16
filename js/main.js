$( document ).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();

    

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

    $fileInput.on('dragleave blur drop', function() {
        $droparea.removeClass('is-active');
    });

    $fileInput.on('change', function() {
        var filesCount = $(this)[0].files.length;
        var $textContainer = $(this).prev();

        if (filesCount === 1) {
            // if single file is selected, show file name
            var fileName = $(this).val().split('\\').pop();
            $textContainer.text(fileName);
        } else {
            // otherwise show number of files
            $textContainer.text(filesCount + ' files selected');
        }
    });
});
let groups = [
    {
        id: 1,
        name: 'nav-top',
        style: {
            'color': 'red',
            'font-size': '16px'
        }
    }
];
let objects = [
    {
        id: 1,
        name: 'banner',
    }
];
let elements = [
    {
        id: 1,
        id_group: 1,
        name: 'nav-top_link',
        content: 'Главная'
    },
    {
        id: 2,
        id_group: 1,
        name: 'nav-top_link',
        content: 'О компании'
    },
    {
        id: 3,
        id_group: 1,
        name: 'nav-top_link',
        content: 'Каталог'
    },
    {
        id: 4,
        id_object: 1,
        name: 'nav-top_link',
        type: 1,
        content: 'ЗАГОЛОВОК ВАШЕГО БАННЕРА'
    },
    {
        id: 5,
        id_object: 1,
        name: 'nav-top_link',
        type: 2,
        content: '../../img/bg_main.jpg'
    }
];
Vue.use( CKEditor );
let activeElem;
let timeOutForColorPicker;
$("#colorpicker").spectrum({
    color: "#f00",
    move: function(color) {
        if(activeElem)
            activeElem.changeColor(color)
    },
});
$('.dropdown-item').click(function(){
    let property = $(this).parent().attr('aria-labelledby');
    let value = $(this).text();
    if(activeElem)
        activeElem.changeStyle({
            [property]: value
        })
})
for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    window.group_1 = new Vue({
        data: {
            style: group.style
        },
        watch: {
            style(){
                this.$emit('changeStyle', this.style);
                console.log(this.style)
            }
        },
        methods: {
            changeColor(color){
                this.style = { ...this.style, color: color};
            },
            changeStyle(style){
                this.style = { ...this.style,...style};
            }
        }
    })    
    for (let j = 0; j < elements.length; j++) {
        const element = elements[j];
        let elem = new Vue({
            el: '#element_' + element.id,
            data: {
                style: group.style,
                editor: BalloonEditor,
                editorData: element.content
            },
            watch: {
                
            },
            methods: {
                onEditorInput(){
                    console.log(this.editorData);
                },
                onChangeStyle(style){
                    this.style = style;
                }
            }
        })
        window.group_1.$on('changeStyle', elem.onChangeStyle)
        $('style[data-cke="true"]').remove();
        $('#element_' + element.id).click(()=>{
            activeElem = window.group_1;
            console.log(activeElem);
        })
    }
}
for (let i = 0; i < groups.length; i++) {

}