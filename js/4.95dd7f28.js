(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"8b24":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t._self._c;return e("q-page",{staticClass:"flex flex-center full-width column wrap"},[e("div",{staticClass:"q-pa-md column q-gutter-y-md eighty-width"},[e("q-input",{staticClass:"col",attrs:{type:"textarea",autogrow:"",autofocus:"",outlined:"",placeholder:"VnStat Json 文件链接，以换行分隔"},model:{value:t.input.rawUrls,callback:function(e){t.$set(t.input,"rawUrls",e)},expression:"input.rawUrls"}}),e("q-btn",{staticClass:"col",attrs:{dense:"",color:"primary"},on:{click:t.reCalcCacheUrls}},[t._v("提交")]),e("q-select",{staticClass:"col-6",attrs:{label:"VnStat Json 文件链接",disable:0===t.urlOpts.length,options:t.urlOpts},model:{value:t.selectUrl,callback:function(e){t.selectUrl=e},expression:"selectUrl"}}),e("q-select",{staticClass:"col-6",attrs:{label:"网络接口",disable:0===t.interfaceOpts.length,options:t.interfaceOpts},model:{value:t.selectInf,callback:function(e){t.selectInf=e},expression:"selectInf"}})],1),e("div",{staticClass:"column eighty-width"},[t.interfaceData?e("vn-dashboard",{attrs:{interfaceData:t.interfaceData,"c-time":t.cTime,"u-time":t.uTime}}):t._e()],1)])},s=[],i=(a("ddb0"),a("a79d"),a("caad"),function(){var t=this,e=t._self._c;return e("div",{staticClass:"full-width q-gutter-y-sm"},[e("div",{staticClass:"flex flex-center q-gutter-sm"},t._l(t.badgeArr,(function(t,a){return e("q-badge",{key:a,attrs:{color:t.color,label:t.label}})})),1),e("div",{staticClass:"flex flex-center column full-width"},[e("vn-chat",{attrs:{"chart-name":"24h流量(GB)","chart-data":t.latest24h,width:t.cusWidth()}}),e("vn-chat",{attrs:{"chart-name":"日流量(GB)","chart-data":t.latest30d,width:t.cusWidth(),height:500}}),e("div",{staticClass:"flex flex-center no-warp q-gutter-x-sm"},[e("vn-chat",{attrs:{"chart-name":"Top10天流量(GB)","chart-data":t.top10d,width:t.cusWidth(.42),height:300}}),e("vn-chat",{attrs:{"chart-name":"月流量(GB)","chart-data":t.latestMonth,width:t.cusWidth(.36),height:300}})],1)],1)])}),l=[],n=a("5a0c"),o=a.n(n),c=a("0122"),d=a.n(c);function h(t,e="YYYY/MM/DD HH:mm"){let{date:a,time:r}=t;return null!==a&&void 0!==a&&a.month&&(a.month-=1),o()({...a,...r}).format(e)}function u(t,e=!0,a=1073741824){let r="";return r+=t?(t/a).toFixed(2):"0",r=parseFloat(r),e&&(r+="GB"),r}o.a.extend(d.a);var p=function(){var t=this,e=t._self._c;return e("div",[e("Bar",{attrs:{"chart-options":t.chartOptions,"chart-data":t.chartDataCom,width:t.width,height:t.height}})],1)},f=[],b=a("7b97"),g=a("dd61"),m=a("36c4");a("cadc");Date.now();function D(t,e){let a=void 0===e?.5:1-e;return Object(m["a"])(t).alpha(a).rgbString()}const v={red:"rgb(255, 99, 132)",orange:"rgb(255, 159, 64)",yellow:"rgb(255, 205, 86)",green:"rgb(75, 192, 192)",blue:"rgb(54, 162, 235)",blue_1:"rgb(5, 162, 235)",blue_5:"rgb(25, 99, 132)",purple:"rgb(153, 102, 255)",grey:"rgb(201, 203, 207)"};v.red,v.orange,v.yellow,v.green,v.blue,v.purple,v.grey;g["c"].register(...g["k"]);var y={name:"VnChart",components:{Bar:b["a"]},props:{chartName:{type:String,default:"Bar Chart"},chartData:{type:Object,default:()=>({})},width:{type:Number,default:400},height:{type:Number,default:400}},computed:{chartOptions(){return{responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:this.chartName}},interaction:{intersect:!1,mode:"index",axis:"xy"},scales:{x:{display:!0},y:{display:!0}}}},chartDataCom(){return this.chartData&&Object.keys(this.chartData).length>0?this.chartData:this.sample}},data(){return{sample:{labels:["January","February","March"],datasets:[{label:"My First dataset",borderColor:v.red,backgroundColor:D(v.red,.5),borderWidth:2,borderRadius:5,data:[40,20,12]},{label:"Small Radius",borderColor:v.blue,backgroundColor:D(v.blue,.5),borderWidth:2,borderRadius:5,borderSkipped:!1,data:[40,20,12]}]}}},methods:{initChart(){}},beforeMount(){this.initChart()}},w=y,U=a("2877"),x=Object(U["a"])(w,p,f,!1,null,"3bd7f7a9",null),C=x.exports,Y={name:"VnDashboard",components:{VnChat:C},props:{interfaceData:{type:Object,required:!0},cTime:{type:String,required:!0},uTime:{type:String,required:!0}},computed:{latest24h(){var t;let e=(null===(t=this.interfaceData)||void 0===t?void 0:t.traffic.hour.slice(-24))||[],a=this.getData(e,"DD-HH");return a=this.additionDs(a,!0),a},latest30d(){var t;let e=(null===(t=this.interfaceData)||void 0===t?void 0:t.traffic.day.slice(-30))||[],a=this.getData(e,"MM/DD");return a=this.additionDs(a,!1),a},top10d(){var t;let e=(null===(t=this.interfaceData)||void 0===t?void 0:t.traffic.top.slice(-10))||[],a=this.getData(e,"MM/DD");a.labels=a.labels.reverse();for(let r=0;r<a.datasets.length;r++)a.datasets[r].data=a.datasets[r].data.reverse();return a=this.additionDs(a,!0),a},latestMonth(){var t;let e=(null===(t=this.interfaceData)||void 0===t?void 0:t.traffic.month)||[],a=this.getData(e,"YYYY/MM");return a=this.additionDs(a,!1),a},latestYear(){var t;let e=(null===(t=this.interfaceData)||void 0===t?void 0:t.traffic.year)||[],a=this.getData(e,"YYYY");return a=this.additionDs(a,!1),a},badgeArr(){return[`安装时间: ${this.cTime}`,`更新时间: ${this.uTime}`,`接口总上传: ${u(this.interfaceData.traffic.total.tx)}`,`接口总下载: ${u(this.interfaceData.traffic.total.rx)}`].map((t=>({label:t,color:"teal"})))}},methods:{formatTraffic(t,e="YYYY/MM/DD"){return t.map((t=>({tx:u(t.tx,!1),rx:u(t.rx,!1),label:h(t,e)})))},getDatasets(t,e="上传",a="tx",r=v.blue,s="bar"){return{type:s,label:e,data:t.map((t=>t[a])),borderColor:r,backgroundColor:D(r,.5),borderWidth:2,borderRadius:5,borderSkipped:!1}},getData(t,e="YYYY/MM/DD"){const a=this.formatTraffic(t,e),r=a.map((t=>t.label)),s=[];return s.push(this.getDatasets(a,"上传","tx",v.blue)),s.push(this.getDatasets(a,"下载","rx",v.red)),{labels:r,datasets:s}},cusWidth(t=.8,e=.8){const a=this.$q.platform.is.mobile,r=window.innerWidth;return this.$log.debug(a,this.$q.platform,this.$q.screen),this.$log.debug(this.$q.screen.availWidth,window.innerWidth),a?r*e:r*t},additionDs(t,e=!1){let a=t,r=0;if(e){const e=[],s=v.yellow;t.datasets[0].data.forEach((a=>{e.push(a+t.datasets[1].data[r]),r++})),a.datasets.push({type:"line",label:"总流量",data:e,borderColor:s,cubicInterpolationMode:"monotone",tension:.4,borderSkipped:!1})}else{const[e,s]=[[],[]];let[i,l]=[0,0];t.datasets[0].data.forEach((a=>{i+=a,l+=t.datasets[1].data[r],r+=1,e.push(i),s.push(l)}));const n=v.blue_1,o=v.blue_5;a.datasets.push({type:"line",label:"上传总流量",data:e,borderColor:n,cubicInterpolationMode:"monotone",tension:.4,borderSkipped:!1}),a.datasets.push({type:"line",label:"下载总流量",data:e,borderColor:o,cubicInterpolationMode:"monotone",tension:.4,borderSkipped:!1})}return a}}},q=Y,M=a("58a8"),$=a("eebe"),O=a.n($),S=Object(U["a"])(q,i,l,!1,null,"4eb23760",null),k=S.exports;O()(S,"components",{QBadge:M["a"]});var I={name:"PageIndex",components:{VnDashboard:k},data(){return{input:{rawUrls:""},selectUrl:"",selectInf:"",cacheUrls:{},cacheKey:"vnstat_cache_urls"}},computed:{urlOpts(){return this.cacheUrls?[...Object.keys(this.cacheUrls)]:[]},interfaceOpts(){var t;const e=null===(t=this.cacheUrls[this.selectUrl])||void 0===t?void 0:t.data;if(!e)return[];const a=e["jsonversion"];return a&&parseInt(a)>1?e.interfaces.map((t=>t.name)):(this.$q.notify({message:`VnStat Json 文件版本不支持: ${a}`,type:"warning"}),[])},interfaceData(){if(0===this.urlOpts.length||0===this.interfaceOpts.length)return;let t=this.cacheUrls[this.selectUrl];return t.data.interfaces.find((t=>t.name===this.selectInf))},cTime(){return this.interfaceData?h(this.interfaceData.created,"YYYY/MM/DD"):""},uTime(){const t=this.interfaceData;return t?h(t.updated,"YYYY/MM/DD HH:mm"):""}},methods:{reCalcCacheUrls(){const t=this.input.rawUrls?this.input.rawUrls.split("\n").filter((t=>t.startsWith("http"))):[];if(0===t.length)return this.$q.notify({caption:"请填写有效HTTP链接",type:"warning"});let e={};t.forEach((t=>{const a=this.cacheUrls[t];e[t]=a?JSON.parse(JSON.stringify(a)):{loaded:!1,data:void 0}})),this.cacheUrls=e,(!this.selectUrl||t.indexOf(this.selectUrl)<0)&&(this.selectUrl=t[0])},fetchUrl(t){this.$log.debug(typeof t,t);const e=this.cacheUrls[t]||{};return e.loaded?e.data:(this.$q.loading.show({message:`请求: ${t} 中...`}),this.$axios.get(t).then((a=>{const r="string"===typeof a.data?JSON.parse(a.data):a.data;return e.loaded=!0,e.data=r,this.cacheUrls[t]=e,r})).catch((t=>this.$q.notify({message:"URL 加载失败",caption:t.message,type:"error"}))).finally((()=>{this.$q.loading.hide()})))},saveToCache(t){this.$q.localStorage.set(this.cacheKey,t)}},watch:{async selectUrl(t){this.$log.debug(typeof t,t),await this.fetchUrl(this.selectUrl),this.selectInf=this.interfaceOpts[0]||""},async selectInf(t){this.$log.debug(typeof t,t),this.saveToCache(this.input.rawUrls)}},mounted(){const t=this.$q.localStorage.getItem(this.cacheKey);this.$log.debug("afterMount",t),t&&(this.input.rawUrls=t),!t&&window.location.host.includes("github")&&(this.input.rawUrls="https://raw.githubusercontent.com/IITII/VNSTAT-DASHBOARD/main/docs/demo.json"),this.input.rawUrls&&this.reCalcCacheUrls()}},T=I,_=a("9989"),W=a("27f9"),B=a("9c40"),j=a("ddd8"),J=Object(U["a"])(T,r,s,!1,null,null,null);e["default"]=J.exports;O()(J,"components",{QPage:_["a"],QInput:W["a"],QBtn:B["a"],QSelect:j["a"]})}}]);