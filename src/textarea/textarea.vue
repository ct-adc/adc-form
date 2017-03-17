<template>
    <div class="panel panel-default">
        <div class="panel-body">
            <textarea v-model="content"></textarea>

        </div>
        <div class="panel-footer">
            <span :class="limitedLength!==-1 && content.length>limitedLength ? 'text-danger' : 'text-success'">{{content.length}}</span>
            <template v-if="limitedLength!==-1">
                /{{limitedLength}}
            </template>
        </div>
    </div>
</template>

<script type="es6">
    export default{
        name: 'ct-adc-textarea',
        props: {
            value: {
                type: String,
                default: ''
            },
            limitedLength: {
                type: Number,
                default: -1
            },
            cut: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                content: ''
            }
        },
        created(){
            this.initContent();
        },
        computed:{
            pass(){
                return this.limitedLength===-1 || (this.limitedLength!==-1 && this.content.length <= this.limitedLength);
            }
        },
        methods: {
            initContent(){
                this.content = this.value;
            },
            getContent(){
                return this.content;
            },
            isPass(){
                return this.pass;
            }
        },
        watch: {
            value(newVal){
                this.content = newVal;
            },
            content(newVal, oldVal){
                var cut = false;
                if (this.limitedLength!==-1 && newVal.length > this.limitedLength) {
                    if (this.cut) {
                        cut = true;
                    }
                }
                if (cut) {
                    this.content = newVal.substr(0, this.limitedLength);
                    //don't emit event in this circle. it will emit in the next watch
                } else {
                    if (newVal !== oldVal) {
                        this.$emit('change', newVal);
                    }
                }
            },
            pass(newVal,oldVal){
                if(newVal!==oldVal){
                    this.$emit('change-pass', newVal);
                }
            }
        }
    }
</script>
<style scoped>
    textarea {
        width: 100%;
        outline: none;
        border-color: transparent;
        resize: none;
        height: 200px;
    }
</style>