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
        date:'2017/01/01',
        beginDate:'2017/01/01',
        endDate:'2017/09/09'
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