<template>
    <input type="text"
           class="form-control"
           :placeholder="ops.placeholder"
           ref="date">
</template>
<script type="es6">
    import utility from 'ct-utility';
    export default{
        name: 'date',
        props: {
            initialDate:{
                type:[String,Number],
                default:''
            },
            ops: {
                type: Object,
                default(){
                    return {}
                }
            }
        },
        data(){
            return {
                date: ''
            }
        },
        computed:{
            mixedOps(){
                var defaultOps={
                    type:'date',
                    placeholder:'请选择',
                    dateFormat:'YYYY/MM/dd',
                    timeFormat:'HH:mm:ss',
                    timeStart:'00:00:00',
                    timeBtn:true
                };
                return Object.assign(defaultOps,this.ops);
            }
        },
        methods: {
            getDate(){
                return this.date;
            },
            initDate(){
                if (this.initialDate == parseInt(this.initialDate)) {
                    if (this.mixedOps.type === 'date') {
                        this.date = utility.dateFilter(this.initialDate, this.mixedOps.dateFormat)
                    } else {
                        this.date = utility.dateFilter(this.initialDate, this.mixedOps.dateFormat + ' '+this.mixedOps.timeFormat);
                    }
                } else {
                    this.date = this.initialDate;
                }
                this.$refs.date.value=this.date;
            }
        },
        mounted(){
            var that = this;
            that.initDate();
            var ops = {
                date_format: this.mixedOps.dateFormat,
                timeShow: this.mixedOps.type === 'date' ? 0 : 1,
                timeStart: this.mixedOps.timeStart,
                timeBtn: this.mixedOps.timeBtn ? 1 : 0,
                change(){
                    var date = that.$refs.date.value;
                    that.date = date;
                    that.$emit('change', date);
                }
            };
            $(this.$refs.date).jdPicker(ops);
            if (this.date != '') {
                this.$refs.date.value = this.date;
            }
        },
        watch:{
            initialDate(){
                this.initDate();
            }
        }
    }
</script>