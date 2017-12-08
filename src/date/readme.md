## date & dates

日期组件封装，分别封装单个时间/日期和开始结束时间/日期组合

## [在线demo](https://codepen.io/rubyisapm/pen/eWQMQB?editors=1010)

## 使用

从npm安装ct-adc-form

```
npm install ct-adc-form
```
在代码中使用

```
import form from 'ct-adc-form';
var DateInput=form.DateInput;
var DatesInput=form.DatesInput;
Vue.component(DateInput.name,DateInput);
Vue.component(DatesInput.name,DatesInput);
```

## 参数说明

### date参数说明

参数 | 描述 | 类型 | 默认值
--- | --- | --- | ---
initialDate | 开始日期初始值 | String,Number | ''
ops | 日期的配置项 | Object | 见备注

### dates参数说明

参数 | 描述 | 类型 | 默认值
--- | --- | --- | ---
initialBeginDate | 开始日期初始值(可以是符合格式的日期或者时间戳) | String,Number | ''
beginPlaceholder | 开始日期的placeholder | String | '请选择'
beginOps | 开始日期的配置项 | Object | 见备注
initialEndDate | 结束日期初始值(可以是符合格式的日期或者时间戳) | String,Number | ''
endPlaceholder | 结束日期的placeholder | String | '请选择'
endOps | 结束日期的配置项 | Object | 见备注
related | 开始结束日期是否要联动 | Boolean | false

**备注:**默认选项

```
{
    type:'date',
    dateFormat:'yyyy/MM/dd',
    timeFormat:'HH:mm:ss',
    timeStart:'00:00:00',
    timeBtn:true,
    monthNames:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    shortMonthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    shortMonthNames2: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    shortDayNames: ["日", "一", "二", "三", "四", "五", "六"],
    errorOutOfRange: "选择的日期不符合规则",
    selectableDays: [0, 1, 2, 3, 4, 5, 6],
    nonSelectable: [],
    recNonSelectable: [],
    startOfWeek: 1,
    showWeek: false,
    selectWeek: false,
    weekLabel: "周",
    dateMin: "",// 符合dateFormat设置的日期，如'2017-09-01' 注意：该参数只能用于配置日期 设置后小于该日期将无法被选择
    dateMax: "" // 符合dateFormat设置的日期，如'2017-09-01' 注意：该参数只能用于配置日期 设置后大于该日期将无法被选择
}
```

### 事件

#### change

单一日期组件的date的change事件返回该组件的结果日期，格式为组件选项中的定义格式。

开始结束日期组件dates的change事件返回一个对象，开始结束日期

### 方法

#### getDate

参数: readable 是否返回格式化的日期，如果为false，则返回时间戳

用于单一日期组件，获取当前的日期.

#### getDates

参数1: readable
是否返回格式化的日期，如果为false，则返回时间戳

参数2: endTransfered
如果开始结束日期为同一天，且选择类型为日期类型时，是否处理结束日期的时间戳，即是否需要加上一天的毫秒数-1;
如果开始结束日期为同一天，且选择类型为日期时间类型时，是否处理结束日期的时间戳，即是否需要999毫秒数;

用于开始结束日期组件，获取当前的开始结束日期

注：当type为'date'，且开发者希望获取结束日期的时间为23:59:59秒时，无需添加ops.timeStart属性，
只需将该方法的endTransfered参数设置为true即可

## 注意

组件中日期的传入支持时间戳，当检测到传入的初始日期为时间戳时会自动转换。
当获取时间时也可以获取时间戳格式的结果，但事件被触发时默认回传格式化的日期

## 已知的bug

1. 当设置type:datetime & ralated:true & dateMax dateMin 时，先选择前面的日期，后面的日期在点击input时被清空



