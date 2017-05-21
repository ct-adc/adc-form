/**
 * @author rubyisapm
 */
import Vue from 'vue';
import DateInput from '../../../src/date/date';
import DatesInput from '../../../src/date/dates';
new Vue({
    el:'#app',
    components:{
        date:DateInput,
        dates:DatesInput
    },
    data:{
        date:1492272000000,
        dateOps:{
            dateFormat:'yyyy-MM-dd'
        },
        beginDate:1484841600000,
        endDate:0
    },
    methods:{
        changeDate(date){
            console.log(date);
        },
        changeDates(dates){
            console.log(dates)
        },
        getDate(){
            console.log(this.$refs.date.getDate(true));
            console.log(this.$refs.date.getDate(false));
        },
        getDates(){
            console.log(this.$refs.dates.getDates(true));
            console.log(this.$refs.dates.getDates(false));
        },
        getDates2(){
            console.log(this.$refs.dates2.getDates(true,true));
            console.log(this.$refs.dates2.getDates(false,true));
        }
    }
})