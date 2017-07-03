<template>
    <input type="text"
           class="form-control"
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
                    dateFormat:'yyyy/MM/dd',
                    timeFormat:'HH:mm:ss',
                    timeStart:'00:00:00',
                    timeBtn:true
                };
                return Object.assign(defaultOps,this.ops);
            }
        },
        methods: {
            getDate(readable){
                if(readable){
                    return this.date;
                }else{
                    return this.date==='' ? '' : +new Date(this.date.replace(/[^\d\:\s]/g,'\/'));
                }
            },
            initDate(){
                if (this.initialDate == parseInt(this.initialDate) && this.initialDate!==0) {
                    if (this.mixedOps.type === 'date') {
                        this.date = utility.dateFilter(this.initialDate, this.mixedOps.dateFormat)
                    } else {
                        this.date = utility.dateFilter(this.initialDate, this.mixedOps.dateFormat + ' '+this.mixedOps.timeFormat);
                    }
                } else if(this.initialDate!='' && this.initialDate!==0){
                    this.date = this.initialDate;
                }else{
                    this.date='';
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
                time_start: this.mixedOps.timeStart,
                timeBtn: this.mixedOps.timeBtn ? 1 : 0,
                change(){
                    var date = that.$refs.date.value;
                    that.date = date;
                    that.$emit('change', that.date);
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
