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
        this.beginDate = date;
        if (this.related) {
          this.interveneDate(date, this.endDate, true);
        }
        this.$emit('change', this.getDates());
      },
      changeEndDate(date){
        this.endDate = date;
        if (this.related) {
          this.interveneDate(this.beginDate, date, false);
        }
        this.$emit('change', this.getDates());
      },
      interveneDate(beginDate, endDate, beginRefer){
        var beginTime = beginDate === '' ? 0 : (new Date((beginDate + '').replace(/[^\d:]/g, '/')));
        var endTime = endDate === '' ? 0 : (new Date((endDate + '').replace(/[^\d:]/g, '/')));
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
        this.beginDate = newVal;
      },
      initialEndDate(newVal){
          this.endDate = newVal;
      }
    }
  }
</script>
