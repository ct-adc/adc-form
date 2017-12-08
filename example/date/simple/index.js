/**
 * @author rubyisapm
 */
import Vue from 'vue';
import DateInput from '../../../src/date/date';
import DatesInput from '../../../src/date/dates';
new Vue({
    el: '#app',
    components: {
        date: DateInput,
        dates: DatesInput
    },
    data: {
        date: +new Date(),
        dateOps: {
            dateFormat: 'yyyy-MM-dd'
        },
        beginDate: +new Date(),
        endDate: +new Date(),
        beginTime: 0,
        endTime: 0
    },
    methods: {
        changeDate(date){
            console.log(date);
        },
        changeDates(){
            console.log(dates);
            var dates = this.$refs.dates.getDates(false);
            this.beginTime = dates.begin;
            this.endTime = dates.end;
        },
        getDate(){
            console.log(this.$refs.date.getDate(true));
            console.log(this.$refs.date.getDate(false));
        },
        getDates(){
            console.log(this.$refs.dates.getDates(true));
            console.log(this.$refs.dates.getDates(false,true));
            console.log(this.$refs.dates.getDates(false));
        },
        getDates2(){
            console.log(this.$refs.dates2.getDates(true, true));
            console.log(this.$refs.dates2.getDates(false, true));
        },
        setDates(){
            this.beginDate = 1484841600000;
            this.endDate = 1484841600000;
        }
    }
})