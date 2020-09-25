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

let textField = new Vue({
    render: function (h) {
        return (
            createElement('div', {
                class: 'form-group'
            }, [
                createElement('label', {
                    domProps: {
                        innerHTML: label
                    }
                }),
                createElement('input', {
                    class: 'input',
                    attrs:{
                        type: 'file'
                    },
                    on: {
                    }
                })
            ])
        )
      },
    props: {
        id: {
            type: Number,
            default: null,
        },
        label: {
            type: String,
            default: '',
        },
    },
    data: {
    },
    watch: {

    },
    methods: {
    }
})
let imageField = new Vue({
    render: function (h) {
        return (
            createElement('div', {
                class: 'form-group'
            }, [
                createElement('label', {
                    domProps: {
                        innerHTML: label
                    }
                }),
                createElement('label', {
                    class: 'file-drop-area'
                },[
                    createElement('span', {
                        class: 'fake-btn',
                        domProps: {
                            innerHTML: 'Выберите файл <br />Или перетащите его сюда'
                        }
                    }),
                    createElement('input', {
                        class: 'file-input',
                        attrs:{
                            ref: 'file',
                            type: 'file'
                        },
                        on: {
                            change: onFileChange
                        }
                    })
                ])
            ])
        )
    },
    props: {
        id: {
            type: Number,
            default: null,
        },
        label: {
            type: String,
            default: '',
        },
    },
    data: {
    },
    watch: {

    },
    methods: {
    }
})
let groups = [
    {
        id: 1,
        name: 'nav-top',
        style: {
        }
    },
    {
        id: 2,
        name: 'info',
        style: {
        }
    }
];
let objects = [
    {
        id: 1,
        label: 'Баннер',
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
        label: 'Заголовок баннера',
        name: 'nav-top_link',
        type: 1,
        content: 'ЗАГОЛОВОК ВАШЕГО БАННЕРА'
    },
    {
        id: 5,
        id_object: 1,
        label: 'Изображение баннера',
        name: 'nav-top_link',
        type: 2,
        content: '../../img/bg_main.jpg'
    },
    {
        id: 6,
        id_group: 2,
        name: 'phone',
        type: 1,
        content: '+7 (999) 999 99 99'
    },
    {
        id: 7,
        id_group: 2,
        label: 'Изображение баннера',
        name: 'mail',
        type: 2,
        content: 'you.mail@gmail.com'
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
// for (let i = 0; i < groups.length; i++) {
//     const group = groups[i];
//     window.group_1 = new Vue({
//         data: {
//             style: group.style
//         },
//         watch: {
//             style(){
//                 this.$emit('changeStyle', this.style);
//                 console.log(this.style)
//             }
//         },
//         methods: {
//             changeColor(color){
//                 this.style = { ...this.style, color: color};
//             },
//             changeStyle(style){
//                 this.style = { ...this.style,...style};
//             }
//         }
//     })
//     for (let j = 0; j < elements.length; j++) {
//         const element = elements[j];
//         if(element.id_group != group.id)
//             continue;
//         let elem = new Vue({
//             el: '#element_' + element.id,
//             data: {
//                 style: group.style,
//                 editor: BalloonEditor,
//                 editorData: element.content
//             },
//             watch: {

//             },
//             methods: {
//                 onEditorInput(){
//                     console.log(this.editorData);
//                 },
//                 onChangeStyle(style){
//                     this.style = style;
//                 }
//             }
//         })
//         window.group_1.$on('changeStyle', elem.onChangeStyle)
//         $('style[data-cke="true"]').remove();
//         $('#element_' + element.id).click(()=>{
//             activeElem = window.group_1;
//             console.log(activeElem);
//         })
//     }
// }
// for (let i = 0; i < objects.length; i++) {
//     const object = objects[i];
//     let fields = [];
//     $('.global-settings .title').html(object.label);
//     $('.global-settings__fields').html('');
//     for (let j = 0; j < elements.length; j++) {
//         const element = elements[j];
//         if(element.id_object != object.id)
//             continue;

//         if(element.type == 1){
//             fields.push({
//                 id: element.id,
//                 label: element.label,
//                 type: 1
//             })
//             $('#element_' + element.id).click(()=>{
//                 activeElem = elem;
//                 console.log(activeElem);
//             })
//             $('style[data-cke="true"]').remove();
//         }else if(element.type == 2){
//             $('.global-settings__fields').append('\
//                 <div class="form-group" id="' + 'field_' + element.id +'">\
//                     <label for="font-select">' + element.label + '</label>\
//                     <div class="file-drop-area">\
//                         <span class="fake-btn">Выберите файл <br>Или перетащите его сюда </span>\
//                         <input v-on:change="onFileChange()" ref="file" class="file-input" type="file">\
//                     </div>\
//                 </div>\
//             ')
//             let elem = new Vue({
//                 el: '#element_' + element.id,
//                 data: {
//                     image: ''
//                 },
//                 methods: {
//                     changeImg(image){
//                         this.image = image;
//                     }
//                 }
//             })
//             let field = new Vue({
//                 el: '#field_' + element.id,
//                 data: {
//                     file: '',
//                     image: ''
//                 },
//                 methods: {
//                     onFileChange: function(e) {
//                         let file = this.$refs.file.files;
//                         if (!file.length)
//                             return;
//                         this.createImage(file[0]);
//                     },
//                     createImage: function(file) {
//                         let reader = new FileReader();
//                         let vm = this;
//                         reader.onload = function(e) {
//                             vm.image = e.target.result;
//                             elem.image = e.target.result;
//                         };
//                         reader.readAsDataURL(file);
//                     }
//                 }
//             })
//         }
//         let elem = new Vue({
//             render: function (h) {
//                 return (
//                     <div class="fields">
//                         <div class="form-group" id="' + 'field_' + element.id +'">
//                             <label for="font-select">' + element.label + '</label>
//                             <input type="text" />
//                         </div>
//                     </div>

//                 )
//               },
//             el: '#element_' + element.id,
//             data: {
//                 style: element.style,
//                 editor: BalloonEditor,
//                 editorData: element.content
//             },
//             watch: {

//             },
//             methods: {
//                 onEditorInput(){
//                     console.log(this.editorData);
//                 },
//                 changeColor(color){
//                     this.style = { ...this.style, color: color};
//                 },
//                 changeStyle(style){
//                     this.style = { ...this.style,...style};
//                 }
//             }
//         })
//     }
// }

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
    let style = $(elem).attr('style');
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
            group.$on('changeStyle', elem.changeStyle)
            $('style[data-cke="true"]').remove();
            console.log(elem)
            $(elem.$el).click(function(){
                activeElem = group;
            })
        })
    }

});
