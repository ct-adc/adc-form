<template>
    <input type="text"
           class="form-control"
           :placeholder="placeholder"
           ref="date"
           v-model="date">
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
            placeholder:{
                type:String,
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
                    dateFormat:'YYYY/mm/dd',
                    timeFormat:'HH:mm:ss',
                    timeStart:'00:00:00',
                    timeBtn:true
                };
                Object.assign(defaultOps,this.ops);
                return defaultOps;
            }
        },
        methods: {
            getDate(){
                return this.date;
            },
            initDate(){
                if (this.initialDate == parseInt(this.initialDate) && this.initialDate!==0) {
                    if (this.mixedOps.type === 'date') {
                        this.date = utility.dateFilter(this.initialDate, this.mixedOps.dateFormat.replace(/Y/g,'y'));
                    } else {
                        this.date = utility.dateFilter(this.initialDate, this.mixedOps.dateFormat.replace(/Y/g,'y') + ' '+this.mixedOps.timeFormat);
                    }
                } else {
                    this.date = this.initialDate;
                }
            },
            initDateInput(){
                var that = this;
                var ops = {
                    date_format: this.mixedOps.dateFormat,
                    timeShow: this.mixedOps.type === 'date' ? 0 : 1,
                    time_start: this.mixedOps.timeStart,
                    timeBtn: this.mixedOps.timeBtn ? 1 : 0,
                    change(){
                        that.date=that.$refs.date.value;
                        that.$emit('change', that.date);
                    }
                };
                $(this.$refs.date).jdPicker(ops);
            }
        },
        created(){
            this.initDate();
        },
        mounted(){
            this.initDateInput();
        },
        watch:{
            initialDate(){
                this.initDate();
            }
        }
    }
</script>
