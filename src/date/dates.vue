<template>
    <div class="input-group">
        <date ref="beginDate"
              :initial-date="beginDate"
              :placeholder="beginPlaceholder"
              :ops="beginOps"
              @change="changeBeginDate"></date>
        <span class="input-group-addon">至</span>
        <date ref="endDate"
              :initial-date="endDate"
              :placeholder="endPlaceholder"
              :ops="endOps"
              style="border-radius: 0 4px 4px 0;"
              @change="changeEndDate"></date>
    </div>
</template>
<script type="es6">
    import DateInput from './date';
    export default{
        name: 'dates',
        components: {
            date: DateInput
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
                beginDate: '',
                endDate: ''
            }
        },
        created(){
            this.initDates();
        },
        methods: {
            initDates(){
                this.beginDate = this.initialBeginDate === 0 ? '' : this.initialBeginDate;
                this.endDate = this.initialEndDate === 0 ? '' : this.initialEndDate;
            },
            getDates(readable, endTransfered){
                var begin = this.$refs.beginDate.getDate(readable),
                        end = this.$refs.endDate.getDate(readable),
                        isSameDay = begin === end;
                if (isSameDay && !readable && endTransfered && (this.beginOps.type === 'date' || typeof this.beginOps.type === 'undefined') && (this.endOps.type === 'date' || typeof this.endOps.type === 'undefined')) {
                    end += 86400000 - 1;
                }
                return {
                    begin: begin,
                    end: end
                }
            },
            changeBeginDate(date){
                this.beginDate = date;
                if (date !== '' && this.related) {
                    this.interveneDate(date, this.endDate, true);
                }
                this.$nextTick(function() {
                    this.$emit('change', this.getDates(true));
                })
            },
            changeEndDate(date){
                this.endDate = date;
                if (date !== '' && this.related) {
                    this.interveneDate(this.beginDate, date, false);
                }
                this.$nextTick(function() {
                    this.$emit('change', this.getDates(true));
                })
            },
            interveneDate(beginDate, endDate, beginRefer){
                var beginTime;
                if (beginDate === '') {
                    beginTime = 0;
                } else if (parseInt(beginDate) === beginDate) {
                    beginTime = beginDate;
                } else {
                    beginTime = +new Date((beginDate + '').replace(/[^\d:]/g, '/'));
                }
                var endTime;
                if (endDate === '') {
                    endTime = 0;
                } else if (parseInt(endDate) === endDate) {
                    endTime = endDate;
                } else {
                    endTime = +new Date((endDate + '').replace(/[^\d:]/g, '/'));
                }
                if (beginRefer && (endDate === '' || beginTime > endTime)) {
                    this.endDate = beginDate;
                }
                if (!beginRefer && (beginDate === '' || beginTime > endTime)) {
                    this.beginDate = endDate;
                }
            }
        },
        watch: {
            initialBeginDate(newVal){
                this.beginDate = newVal === 0 ? '' : newVal;
            },
            initialEndDate(newVal){
                this.endDate = newVal === 0 ? '' : newVal;
            }
        }
    }
</script>
