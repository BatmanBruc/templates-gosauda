let settingsPanel = new Vue({
    el: '.settings-panel',
    data: {
        activeElem: null,
        openText: false,
        openGlobal: false,
        openSetting: false
    },
    watch: {
        activeElem(){
            console.log(this.activeElem);
            if(this.activeElem != null){
                $('.text-settings #font-family').val(this.activeElem.$data.style['font-family']);
                $('.text-settings #font-size').val(this.activeElem.$data.style['font-size']);
                $('.text-settings #font-weight').val(this.activeElem.$data.style['font-weight']);
                $('.text-settings #colorpicker').spectrum('set', this.activeElem.$data.style['color']);
                $('#colorpicker').css('background', this.activeElem.$data.style['color']);
                this.openText = true;
                this.openGlobal = false;
                this.openSetting = false;
            }
            else{
                this.openText = false;
            } 
        }
    },
    computed:{
    },
    methods: {
        openGlobalStyle(){
            this.activeElem = null;
            if(this.openGlobal){
                this.openGlobal = false;
            }else{
                this.openGlobal = true;
                this.openSetting = false;
                this.openText = false;
            }
            
        },
        openSettings(){
            this.activeElem = null;
            if(this.openSetting){
                this.openSetting = false;
            }else{
                this.openSetting = true;
                this.openText = false;
                this.openGlobal = false;
            }
            
        },
        changeBanner(){
            let file = this.$refs.fileBanner.files;
            if (!file.length)
                return;
            this.createImage(file[0], (e) => {
                $('.banner-img img').attr('src', e.target.result )
            });
        },
        changeLogo(){
            let file = this.$refs.fileLogo.files;
            if (!file.length)
                return;
            this.createImage(file[0], (e) => {
                $('.logo').attr('src', e.target.result )
            });
        },
        createImage: function(file, callback) {
            let reader = new FileReader();
            reader.onload = callback;
            reader.readAsDataURL(file);
        }
    }
})
$( document ).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('a').click(function(){
        return false;
    })
    $("global-settings #colorpicker-btn").spectrum({
        color: "#333",
        move: function(color) {
            $('.icon-setting, .card-price, .link').css('color', color);
            $('.border-setting').css('border-color', color);
            $('.background-setting').css('background', color);
            
        },
    });
    $('global-settings #font-select').change((event)=>{
        console.log(event.target.value)
        $('.shop *:not(.icon)').css('font-family', event.target.value)
    })
    // $("#colorpicker-btn-text").spectrum({
    //     color: "#fff",
    //     move: function(color) {
    //         $(this).css("background-color", color.toHexString());
    //         $('.shop .btn').css("color", color.toHexString());
    //     },
    // });

    $('.global-btn').click(function () {
        $('.settings-panel').addClass('show-global-settings')
    })
    $('.settings-btn').click(function(){
        $('.settings-panel').addClass('show-options-settings')
    })

    $('.global-settings .btn-close').click(function () {
        $('.settings-panel').removeClass('show-global-settings')
    })
    $('#main-color .color-options__item').click(function (){
        let color = $(this).attr('color');
        $('.icon-setting, .card-price, .link').css('color', color);
        $('.border-setting').css('border-color', color);
        $('.background-setting').css('background', color);
    })
    $('#background-color .color-options__item').click(function (){
        let color = $(this).attr('color');
        $('.shop').css('background', color);
    })
    let hoverColor = '#26cae5';
    $('#hover-link-color .color-options__item').click(function (){
        let color = $(this).attr('color');
        hoverColor = color;
    })
    $('a').hover(function (){
        $(this).css('color', hoverColor);
    },function (){
        $(this).css('color', '');
    },)
    // let $fileInput = $('.file-input');
    // let $droparea = $('.file-drop-area');

    // $fileInput.on('dragenter focus click', function() {
    //     $droparea.addClass('is-active');
    // });

    // $fileInput.on('dragleave blur drop', function() {
    //     $droparea.removeClass('is-active');
    // });

    // $fileInput.on('change', function() {
    //     var filesCount = $(this)[0].files.length;
    //     var $textContainer = $(this).prev();

    //     if (filesCount === 1) {
    //         // if single file is selected, show file name
    //         var fileName = $(this).val().split('\\').pop();
    //         $textContainer.text(fileName);
    //     } else {
    //         // otherwise show number of files
    //         $textContainer.text(filesCount + ' files selected');
    //     }
    // });
    // let fieldImg = new Vue({
    //     el: '#file-input',
    //     data: {
    //         file: '',
    //         image: '',
    //         open: false
    //     },
    //     methods: {
    //         close(){
    //             this.open = false;
    //         },
    //         onFileChange: function(e) {
    //             let file = this.$refs.file.files;
    //             console.log(file)
    //             if (!file.length)
    //                 return;
    //             this.createImage(file[0]);
    //         },
    //         createImage: function(file) {
    //             let reader = new FileReader();
    //             let vm = this;
    //             reader.onload = (e) => {
    //                 vm.image = e.target.result;
    //                 this.$emit('loadImg', e.target.result);
    //                 console.log(e.target.result)
    //                 $('.banner-img img').attr('src', e.target.result )
    //             };
    //             reader.readAsDataURL(file);
    //         }
    //     }
    // })
});
$('.shop').click(function(){
    console.log(1)
    settingsPanel.$data.activeElem = null;
    return false;
});
Vue.use( CKEditor );

$(".text-settings #colorpicker").spectrum({
    color: "#f00",
    move: function(color) {
        if(settingsPanel.$data.activeElem)
            settingsPanel.$data.activeElem.changeColor(color)
    },
});
$('.text-settings select').change(function(){
    let property = $(this).attr('name');
    let value = $(this).val();
    console.log(settingsPanel.$data.activeElem);
    if(settingsPanel.$data.activeElem)
        settingsPanel.$data.activeElem.changeStyle({
            [property]: value
        })
})
const creatGroup = (style) =>{
    return new Vue({
        data: {
            style: style
        },
        watch: {
            style(){
                this.$emit('changeStyle', this.style);
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
}
const creatElement = (elem) =>{
    let content = $(elem).html();
    let style = $(elem).attr('styleParams');
    let selector = $(elem).attr('name');
    $(elem).attr(':style', 'style');
    $(elem).html('<ckeditor @input="onEditorInput" :editor="editor" v-model="editorData"></ckeditor>')
    return new Vue({
        el: '.element[name="' + selector + '"]',
        data: {
            style: style,
            editor: BalloonEditor,
            editorData: content
        },
        watch: {
            
        },
        methods: {
            onEditorInput(){
                console.log(this.editorData);
            },
            changeColor(color){
                this.style = { ...this.style, color: color};
            },
            changeStyle(style){
                console.log(style);
                this.style = { ...this.style,...style};
            }
        }
    }) 
}
const creatFragment = (elem) =>{
    let content = $(elem).html();
    let style = $(elem).attr('styleParams');
    let selector = $(elem).attr('name');
    $(elem).attr(':style', 'style');
    return new Vue({
        el: elem,
        data: {
            style: style,
        },
        watch: {
            
        },
        methods: {
            onEditorInput(){
                console.log(this.editorData);
            },
            changeColor(color){
                this.style = { ...this.style, color: color};
            },
            changeStyle(style){
                console.log(style);
                this.style = { ...this.style,...style};
            }
        }
    }) 
}
const creatFragmentImg = (elem) =>{
    let content = $(elem).html();
    let style = $(elem).attr('styleParams');
    let selector = $(elem).attr('name');
    let src = $(elem).attr('src');
    $(elem).attr(':style', 'style');
    return new Vue({
        el: elem,
        data: {
            style: style,
            img: src
        },
        watch: {
            
        },
        methods: {
            loadImg(img){
                this.img = img;
            },
            changeColor(color){
                this.style = { ...this.style, color: color};
            },
            changeStyle(style){
                console.log(style);
                this.style = { ...this.style,...style};
            }
        }
    }) 
}

let predGroup;
$('.group-element').each(function(){
    let groupName = $(this).attr('group');
    if(groupName == predGroup){
        return;
    }else{
        predGroup = groupName;
        let style = $(this).attr('style');
        let group = creatGroup(style);
        $('.group-element[group="' + groupName + '"]').each(function(){
            let elem = creatElement(this);
            group.changeStyle({
                'font-family': $(elem.$el).css('font-family'),
                'font-size': $(elem.$el).css('font-size'),
                'font-weight': $(elem.$el).css('font-weight'),
                'color': $(elem.$el).css('color')
            })
            group.$on('changeStyle', elem.changeStyle)
            $('style[data-cke="true"]').remove();
            $(elem.$el).click(function(){
                setTimeout(()=>{
                    settingsPanel.$data.activeElem = group;
                },200)
                
            })
        })
    }
    $('.ck-body-wrapper').remove();
});
$('.group-fragment').each(function(){
    let groupName = $(this).attr('group');
    if(groupName == predGroup){
        return;
    }else{
        predGroup = groupName;
        let style = $(this).attr('style');
        let group = creatGroup(style);
        $('.group-fragment[group="' + groupName + '"]').each(function(){
            let elem = creatFragment(this);
            group.changeStyle({
                'font-family': $(elem.$el).css('font-family'),
                'font-size': $(elem.$el).css('font-size'),
                'font-weight': $(elem.$el).css('font-weight'),
                'color': $(elem.$el).css('color')
            })
            group.$on('changeStyle', elem.changeStyle)
            $('style[data-cke="true"]').remove();
            $(elem.$el).click(function(){
                setTimeout(()=>{
                    settingsPanel.$data.activeElem = group;
                },200)
            })
        })
    }
});
$('.element:not(.group-element)').each(function(){
    let elem = creatElement(this);
    elem.changeStyle({
        'font-family': $(elem.$el).css('font-family'),
        'font-size': $(elem.$el).css('font-size'),
        'font-weight': $(elem.$el).css('font-weight'),
        'color': $(elem.$el).css('color')
    })
    elem.$on('changeStyle', elem.changeStyle)
    $('style[data-cke="true"]').remove();
    $(elem.$el).click(function(){
        setTimeout(()=>{
            settingsPanel.$data.activeElem = elem;
        },200)
    })
    $('.ck-body-wrapper').remove();
});

$('.fragment:not(.group-fragment)').each(function(){
    let elem
    if(this.nodeName == 'IMG'){
        elem = creatFragmentImg(this);
        console.log(elem.$el);
        elem.$on('loadimg', elem.changeStyle)
        $(elem.$el).click(function(){
            fieldImg.$on('loadImg', elem.loadImg)
            fieldImg.$data.open = true;
        })
    }else{
        elem = creatFragment(this);
        elem.changeStyle({
            'font-family': $(elem.$el).css('font-family'),
            'font-size': $(elem.$el).css('font-size'),
            'font-weight': $(elem.$el).css('font-weight'),
            'color': $(elem.$el).css('color')
        })
        $(elem.$el).click(function(){
            setTimeout(()=>{
                settingsPanel.$data.activeElem = elem;
            },200)
        })
    }
    $('style[data-cke="true"]').remove();
});

$('#InstagramInput').change(function(e){
    $('#instagram-link').attr('href', 'https://www.instagram.com/' + e.target.value)
})
$('#WhatsappInput').change(function(e){
    $('#whatsapp-link').attr('href', 'https://wa.me/' + e.target.value)
})
// axios.get('https://suggest-maps.yandex.kz/suggest-geo', {
//     params:{
//       outformat: "json",
//       part: `Казахстан, ${this.state.address}`,
//       lang: 'ru_KZ',
//       bases: "geo", //"country, province, locality, district, street, house",
//       v: 9
//     }
//   })