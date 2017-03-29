<template>
    <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
            <div class="input-group">
                <date ref="beginDate"
                      :initial-date="beginDate"
                      :ops="beginOps"
                      @change="changeBeginDate"></date>
                <span class="input-group-addon">至</span>
                <date ref="endDate"
                      :initial-date="endDate"
                      :ops="endOps"
                      style="border-radius: 0 4px 4px 0;"
                      @change="changeEndDate"></date>
            </div>
        </div>
    </div>
</template>
<script type="es6">
    import DateInput from './date';
    export default{
        name: 'dates',
        components: {
            date:DateInput
        },
        props: {
            beginPlaceholder: {
                type: String,
                default: '开始时间'
            },
            endPlaceholder: {
                type: String,
                default: '结束时间'
            },
            initialBeginDate: {
                type: [Number, String],
                default: ''
            },
            initialEndDate: {
                type: [Number, String],
                default: ''
            },
            beginOps: {
                type: Object,
                default(){
                    return {}
                }
            },
            endOps: {
                type: Object,
                default(){
                    return {}
                }
            },
            related: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                beginDate: this.initialBeginDate,
                endDate: this.initialEndDate
            }
        },
        methods: {
            getDates(){
                return {
                    begin: this.beginDate,
                    end: this.endDate
                }
            },
            changeBeginDate(date){
                this.beginDate=date;
                if(this.related){
                    this.interveneDate(date,this.endDate,true);
                }
            },
            changeEndDate(date){
                this.endDate=date;
                if(this.related){
                    this.interveneDate(this.beginDate,date,false);
                }
            },
            interveneDate(beginDate,endDate,beginRefer){
                var beginTime=beginDate==='' ? 0 : (new Date((beginDate+'').replace(/[^\d:]/g,'/')));
                var endTime=endDate === '' ? 0 : (new Date((endDate+'').replace(/[^\d:]/g,'/')));
                if (beginRefer && (endDate === '' || beginTime > endTime)) {
                    this.endDate=beginDate;
                }
                if(!beginRefer && (beginDate==='' || beginTime > endTime)){
                    this.beginDate=endDate;
                }
            }
        },
        watch: {
            initialBeginDate(newVal){
                this.beginDate = newVal;
            },
            initialEndDate(newVal){
                this.endDate = newVal;
            }
        }
    }




    //var time1 = $(this.$refs.startTime).jdPicker({
    //    date_format: "YYYY/MM/dd",
    //    time_start: "00:00:00",
    //    timeShow: 1,
    //    timeBtn: 1,
    //    change: function () {
    //        var t1 = this.input.val(),
    //                t2 = $(that.$refs.endTime).val();
    //        that.startTime = t1;
    //        if (t2 === '' || t1 > t2) {
    //            var t1End = t1.replace(/\d{2}:\d{2}:\d{2}/, '23:59:59');
    //            time2.setDateValue(t1End);
    //            that.endTime = t1End;
    //            time2.reBuild();
    //        }
    //    }
    //});
    //var time2 = $(this.$refs.endTime).jdPicker({
    //    date_format: "YYYY/MM/dd",
    //    time_start: "23:59:59",
    //    timeShow: 1,
    //    timeBtn: 1,
    //    change: function () {
    //        var t1 = $(that.$refs.startTime).val(),
    //                t2 = this.input.val();
    //        that.endTime = t2;
    //        if (t1 === '' || t1 > t2) {
    //            var t2Begin = t2.replace(/\d{2}:\d{2}:\d{2}/, '00:00:00');
    //            time1.setDateValue(t2Begin);
    //            that.startTime = t2Begin;
    //            time1.reBuild();
    //        }
    //    }
    //});
</script>