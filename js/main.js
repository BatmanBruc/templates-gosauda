let settingsPanel = new Vue({
    el: '.settings-panel',
    data: {
        activeElem: null
    },
    watch: {

    },
    computed:{
        active(){
            if(this.activeElem != null)
                return true
            else
                return false
        }
    },
    methods: {
    }
})
Vue.use( CKEditor );
let timeOutForColorPicker;
$("#colorpicker").spectrum({
    color: "#f00",
    move: function(color) {
        if(settingsPanel.$data.activeElem)
            settingsPanel.$data.activeElem.changeColor(color)
    },
});
$('.dropdown-menu input[type="radio"]').click(function(){
    let property = $(this).attr('name');
    let value = $(this).attr('value');
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
            group.$on('changeStyle', elem.changeStyle)
            $('style[data-cke="true"]').remove();
            $(elem.$el).click(function(){
                settingsPanel.$data.activeElem = group;
            })
        })
    }
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
            group.$on('changeStyle', elem.changeStyle)
            $('style[data-cke="true"]').remove();
            $(elem.$el).click(function(){
                console.log(elem);
                settingsPanel.$data.activeElem = group;
            })
        })
    }
});
$('.element:not(.group-element)').each(function(){
    let elem = creatElement(this);
    elem.$on('changeStyle', elem.changeStyle)
    $('style[data-cke="true"]').remove();
    $(elem.$el).click(function(){
        settingsPanel.$data.activeElem = elem;
    })
});
let fieldImg = new Vue({
    el: '#file-input',
    data: {
        file: '',
        image: '',
        open: false
    },
    methods: {
        close(){
            this.open = false;
        },
        onFileChange: function(e) {
            let file = this.$refs.file.files;
            if (!file.length)
                return;
            this.createImage(file[0]);
        },
        createImage: function(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.image = e.target.result;
                this.$emit('loadImg', e.target.result);
                this.open = false;
            };
            reader.readAsDataURL(file);
        }
    }
})
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
        $(elem.$el).click(function(){
            console.log(elem)
            settingsPanel.$data.activeElem = elem;
        })
    }
    $('style[data-cke="true"]').remove();
});


