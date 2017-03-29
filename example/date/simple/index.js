/**
 * @author rubyisapm
 */
import Vue from 'vue';
import InputDate from '../../../src/date/date';
import InputDates from '../../../src/date/dates';
new Vue({
    el:'#app',
    components:{
        date:InputDate,
        dates:InputDates
    },
    data:{
        date:'2017/01/01'
    },
    methods:{
        change(date){
            console.log(date)
        },
        getDate(){
            var date=this.$refs.date.getDate();
            console.log(date);
        },
        getDates(){
            var dates=this.$refs.dates.getDates();
            console.log(dates)
        }
    }
})