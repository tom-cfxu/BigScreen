$(function (){
    echart_Bar(); // 柱形图
    echart_line(); // 折线图
    echart_pie(); //饼图
    echart_realTimeData_line();//实时数据折线图
    echart_spie(); //小百分比饼图
    echart_gauge_oxygen(); // 仪表盘
    echart_gauge_temperature();  //温度仪表盘
    echart_gauge_humidity(); //湿度仪表盘

    tabEchart1();
    tabEchart2();
    tabEchart3();
    tabEchart4();
    tabEchart5();

    
    function echart_Bar(){
        var fontColor = '#fff';
        var fontSize=14;
        var myChart = echarts.init(document.getElementById('echart_bar'));
        var plan_xAxis=['设备1','设备2','设备3','设备4','设备5','设备6','设备7'];
        var borderRadius=50;
        var option={		
            xAxis: [{
                type: 'value',
                axisLabel:{
                    textStyle:{
                        color:fontColor, //x坐标轴文字颜色
                        fontSize:fontSize  //x坐标轴文字大小
                        }
                },
                axisLine:{
                    show:false
                },
                axisTick: {
                    show: false
                },
                splitLine: {show: false},
            }],
            yAxis: [{
                type: 'category',
                data: plan_xAxis,
                splitLine: {show: false},
                axisLabel:{
                    textStyle:{
                        color:fontColor, //x坐标轴文字颜色
                        fontSize:fontSize  //x坐标轴文字大小
                        }
                },
                axisLine:{
                    show:false
                },
                axisTick: {
                    show: false
                },
                offset: 10,
                nameTextStyle: {
                    fontSize: 15
                }
            }],
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    color: '#fff',
                    fontSize:fontSize
                }
            },
            grid: {
                left: '5%',
                top:'10%',
                bottom:'2%',
                containLabel:true
            },
            legend:{
                show:true,
                top: 'top',
                textStyle: {
                    color: '#fff',
                    fontSize:fontSize
                },			
                data:['电压']
            },
            series: [
                {
                    name: '电压',
                    type: 'bar',
                    itemStyle: 
                    {
                        normal: {
                            barBorderRadius: borderRadius,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: 'rgba(32,91,207,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(32,185,207,1)'
                            }], false),
                        },
                        label: {
                            show: true
                        },
                        emphasis: {
                            barBorderRadius: borderRadius,
                           }
                    },
                    barWidth : 30,
                    data:[12,96,63,16,52,43,12]
                },
            ]
        };
        //数据
        var data1=[
            [54,53,43,46,12,12,58],
            [12,96,63,16,52,43,12],
            [52,14,23,25,36,86,52],
            [98,18,21,52,28,12,63],
            [21,51,86,84,14,85,85],
            [34,91,36,38,63,73,12],
            [62,73,96,48,55,88,75],
        ];
        // 使用刚指定的配置项和数据显示图表。
        setInterval(getLastData,1000);
        function getLastData(){   //发送请求 获取数据
            var i=parseInt(Math.random()*data1.length);
            option.series[0].data=data1[i];
            myChart.setOption(option);
            window.addEventListener("resize",function(){
            myChart.resize(); //自适应
        });
        }
        getLastData();
    }
    function echart_line(){
        var fontColor = '#fff';
        var fontSize=14;
        var lineColor ='rgb(35,134,129)';
        var myChart = echarts.init(document.getElementById('echart_line'));
        function get10MinutesScale(){
            var currDate = new Date();  //获取当前时间  比如 Thu Dec 26 2019 14:15:52 GMT+0800 (中国标准时间)
            // console.log(currDate);
            var odd = currDate.getMinutes()%10; // 获取当前时间的分钟的个位数 5
            // console.log(odd);
            var returnArr = [];  //创建数组保存数据
            var differ = currDate.getMinutes()-odd; // 15-5=10
            // console.log(differ);
            var min = currDate.setMinutes(differ); //设置当前时间的分钟为currDate.getMinutes()-odd   10
            // console.log(min); 
            // console.log(currDate.getMinutes());  //10
            for(var i = 0; i <7; i++){
                returnArr.push(currDate.getHours()+":"+(currDate.getMinutes()<10?("0"+currDate.getMinutes()):currDate.getMinutes()));
                currDate.setMinutes(currDate.getMinutes()-10);  //过去10分钟
            }
            return returnArr;
        }
        var option={
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                top:20,
                right:5,
                textStyle:{
                    color:'white'
                },
                orient:'vertical',
                data:[
                        {name:'温度',icon:'circle'},
                        {name:'气压',icon:'circle'},
                        {name:'水位',icon:'circle'}
                    ]
            },
            grid: {
                left: '3%',
                right: '16%',
                bottom: '0%',
                top:'10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisTick:{show:false},
                axisLabel:{
                    textStyle:{
                        interval:0,  
                        rotate:40,
                        color:fontColor, //x坐标轴文字颜色
                        fontSize:fontSize  //x坐标轴文字大小
                        }
                },
                axisLine:{
                    show:true,
                    lineStyle:{
                        color: lineColor,
                        width: 1,
                        type: 'solid'
                    },
                },
                data:  get10MinutesScale()//
            },
            yAxis: {
                type: 'value',
                axisTick:{show:false},
                axisLabel:{
                    textStyle:{
                        color:fontColor, //y坐标轴文字颜色
                        fontSize:fontSize  //y坐标轴文字大小
                        }
                },
                axisLine:{
                    show:true,
                    lineStyle:{
                        // color: '#0B3148',
                        color: lineColor,
                        width: 1,
                        type: 'solid'
                    }
                },
                splitLine:{
                    show:false
                }
            },
            series: [
                        {
                            name:'温度',
                            type:'line',
                            itemStyle : {  
                                    normal : {  
                                    color:'#F3891B'
                                },
                                lineStyle:{
                                    normal:{
                                    color:'#F3891B',
                                    opacity:1
                                        }
                                }
                            },  
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'气压',
                            type:'line',
                            itemStyle : {  
                                    normal : {  
                                    color:'#006AD4'
                                },
                                lineStyle:{
                                    normal:{
                                    color:'#F3891B',
                                    opacity:1
                                        }
                                }
                            },
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'水位',
                            type:'line',
                            itemStyle : {  
                                    normal : {  
                                    color:'#009895'
                                },
                                lineStyle:{
                                    normal:{
                                    color:'#009895',
                                    opacity:1
                                        }
                                }
                            },
                            data:[150, 232, 201, 154, 190, 330, 410]
                        }
                    ]
            };
                //数据
            var  temperature = [
                [120, 322, 321, 177, 185, 325, 364],
                [223, 119, 185, 146, 338, 342, 352],
                [202, 362, 244, 132, 199, 230, 206],
                [234, 385, 143, 386, 122, 147, 197],
                [123, 221, 101, 124, 287, 155, 159]
            ];
            var  pressure = [
                [243, 242, 123, 234, 90, 145, 156],
                [120, 122, 321, 177, 185, 325, 364],
                [123, 121, 101, 124, 387, 124, 159],
                [234, 335, 143, 186, 122, 147,197],
                [242, 346, 258, 186, 175, 231, 458],
            ];
            var  waterLevel = [
                [158, 123, 231, 139, 132, 206, 127],
                [342, 346, 258, 186, 175, 131, 158],
                [231, 321, 321, 177, 185, 225, 264],
                [273, 121, 101, 124, 187, 132, 143],
                [132, 385, 543, 586, 122, 147, 192],
            ];
            setInterval(getLineData,2000);
            function getLineData(){
                var i = parseInt(Math.random()*temperature.length);
                var j = parseInt(Math.random()*pressure.length);
                var z = parseInt(Math.random()*waterLevel.length);
                option.series[0].data=temperature[i];
                option.series[1].data=pressure[z];
                option.series[2].data=waterLevel[j];
                myChart.setOption(option);
            }
            window.addEventListener("resize",function(){
                myChart.resize();
            });
            getLineData();
            
    }
    function echart_pie(){
        myChart=echarts.init(document.getElementById('echart_pie'));
        var option = {
            // backgroundColor: '#2c343c',
            color:["rgba(108, 92, 231,0.9)","rgba(214, 48, 49,0.9)","rgba(0, 206, 201,0.9)","rgba(9, 132, 227,0.9)","rgba(0, 184, 148,0.8)","rgba(232, 67, 147,0.9)","#0984e3"],
            // title: {
            //     text: 'Customized Pie',
            //     left: 'center',
            //     top: 20,
            //     textStyle: {
            //         color: '#fff'
            //     }
            // },
        
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['隧道监控','智慧楼宇','生产看板','交换机','风电','管廊'],
                textStyle: {
                            color: '#fff'
                }
            },
            visualMap: {
                show: false,
                min: 80,
                max: 400,
                inRange: {
                    // colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'各行业占比',
                    type:'pie',
                    radius : '60%',
                    center: ['55%', '50%'],
                    data:[
                        {value:320, name:'隧道监控'},
                        {value:400, name:'智慧楼宇'},
                        {value:470, name:'生产看板'},
                        {value:380, name:'交换机'},
                        {value:400, name:'风电'},
                        {value:480, name:'管廊'},
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    // label:false,
                    // label: {
                    //     normal: {
                    //         textStyle: {
                    //             color: '#fff'
                    //         }
                    //     }
                    // },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#fff'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            // color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
        
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        setTimeout(
            myChart.setOption(option)
        ,500)
            window.addEventListener("resize",function(){
                myChart.resize();
        });
    }
    function echart_realTimeData_line(){
        var fontColor = '#fff';
        var fontSize=14;
        var lineColor ='rgb(35,134,129)';
        var myChart = echarts.init(document.getElementById('echart_realTimeData_line'));
        var wdData=[25.1,25.4,25.5,25.7,25.7,25.1,25.2,25.8,25.5,26,25.1,24.9,24.3,24,24.9,25.3,];
            

        function randomNum(minNum, maxNum) {
            switch (arguments.length) {
                case 1:
                    return parseInt(Math.random() * minNum + 1);
                case 2:
                    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
                default:
                    return 0;
            }
        }
        Date.prototype.Format = function(fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            grid: {
                left: '2%',
                right: '4%',
                bottom: '6%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisTick: {
                    show: true
                },
                axisLabel:{
                    rotate:0,
                    textStyle:{
                        color:fontColor, //x坐标轴文字颜色
                        fontSize:fontSize  //x坐标轴文字大小
                        }
                },
                axisLine: {
                    // show:false,
                    lineStyle: {
                        color: lineColor,
                    }
                },
                data: (function() {
                    var now = new Date();
                    var res = [];
                    var len = 10; //显示个数
                    while (len--) {
                        // res.unshift(now.Format("hh:mm"));
                        res.unshift(now.Format("hh:mm:ss"));
                        now = new Date(now - 500);
                    }
                    return res;
                })(),
            }],
            yAxis: [{
                type: 'value',
                name: '',
                min: 24,
                max: 26,
                boundaryGap: false,
                axisTick: {
                    show: false
                },
                axisLine: {
                    // show:false,
                    lineStyle: {
                        color: lineColor,
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle:{
                        color:fontColor, //x坐标轴文字颜色
                        fontSize:fontSize  //x坐标轴文字大小
                    },
                },
                splitLine: false
            }],
            series: [{
                name: '',
                type: 'line',
                smooth: true,
                showSymbol: true,
                showAllSymbol: true,
                symbol: 'emptyCircle',
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color:'rgb(2,201,238)',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(2,201,238, 0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(32,180,207, 0.02)'
                        }], false),
                        shadowColor: 'rgba(3,198,240, 0.8)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        //#ff0066
                        color: 'rgb(43, 148, 255)',
                        borderColor: 'rgba(83, 165, 248, 0.0)',
                        borderWidth: 0
                    }
                },
                data: wdData //[220, 182, 191, 134, 150, 120, 110, 125, 145, 122]
            }, 
            ]
        };
            // 使用刚指定的配置项和数据显示图表。
            setInterval(function() {
                sub_wd = randomNum(245, 255)/10;
        
                wdData.shift();
                wdData.push(sub_wd);
        
                axisData = (new Date()).Format("hh:mm:ss");
                option.xAxis[0].data.shift();
                option.xAxis[0].data.push(axisData);
        
                myChart.setOption(option);
            }, 1500);
            // // 加载图表+自适应
            setTimeout(
                myChart.setOption(option)
            ,500)
            window.addEventListener("resize",function(){
                myChart.resize();
            });
    }
    function echart_spie(){
        var myChart=echarts.init(document.getElementById('echart_spie'))
        var data = [
            {value: 42,name: '芝麻智科'},
            {value: 23,name: '芝麻水务'},
            {value: 70,name: '芝麻自动化'},
        ];
        var option = {
            backgroundColor: 'rgba(0,0,0,0)',
            tooltip: {
                trigger: 'item',
                formatter: "{b}: <br/>{c} ({d}%)"
            },
            grid:{
                left:'0%',
                top:"2%",
                bottom:'5%',
                containLabel:true
            },
            color: [ '#20b9cf', '#2089cf', '#205bcf'],
            legend: { //图例组件，颜色和名字
                x: '60%',
                y: 'center',
                orient: 'vertical',
                itemGap: 12, //图例每项之间的间隔
                itemWidth: 10,
                itemHeight: 10,
                icon: 'rect',
                data: ['芝麻智科', '芝麻水务', '芝麻自动化'],
                textStyle: {
                    color: [],
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            series: [{
                name: '行业占比',
                type: 'pie',
                clockwise: false, //饼图的扇区是否是顺时针排布
                minAngle: 20, //最小的扇区角度（0 ~ 360）
                center: ['35%', '50%'], //饼图的中心（圆心）坐标
                radius: [40, 60], //饼图的半径
              //  avoidLabelOverlap: true, ////是否启用防止标签重叠
                itemStyle: { //图形样式
                    normal: {
                        borderColor: 'transparent',
                        borderWidth: 2,
                    },
                },
                label: { //标签的位置
                    normal: {
                        show: true,
                        position: 'inside', //标签的位置
                        formatter: "{d}%",
                        textStyle: {
                            color: '#fff',
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontWeight: 'bold'
                        }
                    }
                },
                data: data
            }, {
                name: '',
                type: 'pie',
                clockwise: false,
                silent: true,
                minAngle: 20, //最小的扇区角度（0 ~ 360）
                center: ['35%', '50%'], //饼图的中心（圆心）坐标
                radius: [0, 40], //饼图的半径
                itemStyle: { //图形样式
                    normal: {
                        borderColor: '#1e2239',
                        borderWidth: 1.5,
                        opacity: 0.21,
                    }
                },
                label: { //标签的位置
                    normal: {
                        show: false,
                    }
                },
                data: data
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        setTimeout(
            myChart.setOption(option)
        ,500)
        window.addEventListener("resize",function(){
            myChart.resize();
        })
    }
    function echart_gauge_oxygen(){
        var myChart=echarts.init(document.getElementById('echart_gauge_oxygen'));
        var option = {
            color:['#fff','#ddd','#abc'],
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    name: '氧气 %',
                    type: 'gauge',
                    splitNumber: 1,
                    startAngle: 210, //开始角度 左侧角度
                    endAngle: -30, //结束角度 右侧
                    center: ['50%', '50%'], //**调整仪表盘的位置**
                    axisLabel: {			// 刻度标签。
                        show: false,				// 是否显示标签,默认 true。
                        distance: 5,			// 标签与刻度线的距离,默认 5。
                        color: "#fff",			// 文字的颜色,默认 #fff。
                        fontSize: 15,			// 文字的字体大小,默认 5。
                        // 
                        formatter: "{value}",	// 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。 示例:// 使用字符串模板，模板变量为刻度默认标签 {value},如:formatter: '{value} kg'; // 使用函数模板，函数参数分别为刻度数值,如formatter: function (value) {return value + 'km/h';}
                    },
                    itemStyle: {			// 仪表盘指针样式。
                        color: 'auto',			// 指针颜色，默认(auto)取数值所在的区间的颜色
                        opacity: 1,				// 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                        borderWidth: 0,			// 描边线宽,默认 0。为 0 时无描边。
                        borderType: "solid",	// 柱条的描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'。
                    },
                    pointer: {				// 仪表盘指针。
                        show: true,				// 是否显示指针,默认 true。
                        length: "60%",			// 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
                        width: 6,				// 指针宽度,默认 8。
                    },
                    title: {				// 仪表盘标题。
                        show: true,				// 是否显示标题,默认 true。
                        offsetCenter: [0,"-50%"],//相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                        color: "#fff",			// 文字的颜色,默认 #333。
                        fontSize: 30,			// 文字的字体大小,默认 15。
                    },
                    axisLine: {
                        lineStyle: {
                            width: 20,
                            opacity: 1,
                            color:[[1, '#2063CF']],
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show:false,
                        // 刻度长度与轴线宽度一致，达到分隔的效果
                        length: 20,
                        // 增加刻度密度
                        splitNumber: 100,
                        lineStyle: {
                            // 增加刻度宽度
                            width: 3
                        }
                    },
                    detail: {formatter:'{value}%',fontSize: 30,},
                    data: [{value: 22, name: '氧气'}]
                }
            ]
        };
        setInterval(function () {
            option.series[0].data[0].value = (Math.random() * (30-15)+15).toFixed(1);
            myChart.setOption(option, true);
        },2000);
        setTimeout(
            myChart.setOption(option)
        ,500)
    }
    function echart_gauge_temperature(){
        var myChart= echarts.init(document.getElementById('echart_gauge_temperature'));
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    name: '业务指标',
                    type: 'gauge',
                    detail: {formatter:'{value}℃'},
                    data: [{value: 43, name: '温度'}],
                    startAngle: 210, //开始角度 左侧角度
                    endAngle: -30, //结束角度 右侧
                    title: {				// 仪表盘标题。
                        show: true,				// 是否显示标题,默认 true。
                        offsetCenter: [0,"-50%"],//相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                        color: "#fff",			// 文字的颜色,默认 #333。
                        fontSize: 30,			// 文字的字体大小,默认 15。
                    },
                    splitLine:false,
                    pointer: {				// 仪表盘指针。
                        show: true,				// 是否显示指针,默认 true。
                        length: "60%",			// 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
                        width: 6,				// 指针宽度,默认 8。
                    },
                    axisTick:{
                        show:false
                    },
                    axisLabel: {			// 刻度标签。
                        show: false
                    },
                    axisLine:{
                        lineStyle: {
                            width: 20,
                            opacity: 1,
                            color:[[1, '#FF8E00']],
                        }
                    }
                }
            ]
        };
        setInterval(function () {
            option.series[0].data[0].value = (Math.random() * (80-10)+10).toFixed(1) - 0;
            myChart.setOption(option, true);
            window.addEventListener("resize",function(){
            myChart.resize();
        })
        },2000);
        setTimeout(
            myChart.setOption(option)
        ,500)
    }
    function echart_gauge_humidity(){
        var myChart= echarts.init(document.getElementById('echart_gauge_humidity'));
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    name: '湿度',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data: [{value: 40, name: '湿度'}],
                    startAngle: 210, //开始角度 左侧角度
                    endAngle: -30, //结束角度 右侧
                    title: {				// 仪表盘标题。
                        show: true,				// 是否显示标题,默认 true。
                        offsetCenter: [0,"-50%"],//相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                        color: "#fff",			// 文字的颜色,默认 #333。
                        fontSize: 30,			// 文字的字体大小,默认 15。
                    },
                    splitLine:false,
                    pointer: {				// 仪表盘指针。
                        show: true,				// 是否显示指针,默认 true。
                        length: "60%",			// 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
                        width: 6,				// 指针宽度,默认 8。
                    },
                    axisTick:{
                        show:false
                    },
                    axisLabel: {			// 刻度标签。
                        show: false
                    },
                    axisLine:{
                        lineStyle: {
                            width: 20,
                            opacity: 1,
                            color:[[1, '#75CAFF']],
                        }
                    }
                }
            ]
        };
        setInterval(function () {
            option.series[0].data[0].value = (Math.random() * (100-30)+20).toFixed(0);
            myChart.setOption(option, true);
            window.addEventListener("resize",function(){
            myChart.resize();
        })
        },2000);
        setTimeout(
            myChart.setOption(option)
        ,500)
    };
    function tabEchart1(){
        var fontColor = '#fff';
        var fontSize=14;
        var lineColor ='rgb(35,134,129)';
        var myChart=echarts.init(document.getElementById('tabEchart1'));
        var base = +new Date(1968, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var date = [];
        
        var data = [Math.random() * 300];
        
        for (var i = 1; i < 20000; i++) {
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
        }
        
        var option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                top:'4%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date,
                axisLine: {
                    // show:false,
                    lineStyle: {
                        color: lineColor,
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle:{
                        color:fontColor, //x坐标轴文字颜色
                        fontSize:fontSize  //x坐标轴文字大小
                    },
                },
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                axisTick:false,
                axisLine: {
                    // show:false,
                    lineStyle: {
                        color: lineColor,
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle:{
                        color:fontColor, //x坐标轴文字颜色
                        fontSize:fontSize  //x坐标轴文字大小
                    },
                },
                splitLine:false
            },
            series: [
                {
                    name:'模拟数据',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: 'rgb(2,200,239)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(2,200,239,0.9)'
                        }, {
                            offset: 1,
                            color: 'rgba(2,200,239,0.02)'
                        }], false),
                    },
                    data: data
                }
            ]
        };
        setTimeout(
            myChart.setOption(option)
        ,500)
        setInterval(function(){
            myChart.setOption(option);
        },2000)
    }
    function tabEchart2(){
        var fontColor = '#fff';
        var fontSize=14;
        var lineColor ='rgb(35,134,129)';
        // function get10MinutesScale()
        // {
        // var currDate = new Date();
        // var odd = currDate.getMinutes()%10;
        // var returnArr = new Array();
        // currDate.setMinutes(currDate.getMinutes()-odd);
        // for(var i = 0; i <7; i++){
        //     returnArr.push(currDate.getHours()+":"+(currDate.getMinutes()<10?("0"+currDate.getMinutes()):currDate.getMinutes()));
        //     currDate.setMinutes(currDate.getMinutes()-10);
        // }
        // return returnArr;
        // }


        function getLatestDays(num)
        {
        var currentDay = new Date();
        var returnDays = [];
        for (var i = 0 ; i < num ; i++)
        {
            currentDay.setDate(currentDay.getDate() - 1);
            returnDays.push((currentDay.getMonth()+1)+"/"+currentDay.getDate());
        }
        return returnDays;
        }
        var myChart = echarts.init(document.getElementById("tabEchart2"));
        var lineColor ='rgb(35,134,129)';
        var option={
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                top:'4%',
                containLabel: true
            },
            xAxis :
            {
                type : 'category',
                boundaryGap : false,
                data : getLatestDays(31),
                axisLabel:{
                    textStyle:{
                        color:fontColor, //刻度颜色
                        fontSize:fontSize  //刻度大小
                    },
                    rotate:45,
                    interval:2
                },
                axisTick:{show:false},
                axisLine:{
                    show:true,
                    lineStyle:{
                        color: lineColor,
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            yAxis : 
            {
                type : 'value',
                axisTick:{show:false},
                axisLabel:{
                    textStyle:{
                        color:fontColor, //刻度颜色
                        fontSize:fontSize  //刻度大小
                        }
                },
                axisLine:{
                    show:true,
                    lineStyle:{
                        color: lineColor,
                        width: 1,
                        type: 'solid'
                    }
                },
                splitLine:{
                    show:false
                }
            },
            series : [
                {
                    name:'',
                    type:'line',
                    smooth:true,
                    areaStyle:{
                        normal:{
                            color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgba(0,129,255,0.8)'}, {offset: 1, color: 'rgba(0,129,255,0.02)' }], false),
                            opacity:0.8
                        }
                    },
                    itemStyle : {  
                            normal : {  
                                  color:'#007CFF'
                            },
                            lineStyle:{
                                normal:{
                                color:'#007CFF',
                                opacity:1
                            }
                        }
                    },
                    symbol:'none',
                    data:[48, 52, 45, 46, 89, 120, 110,100,88,96,88,45,78,67,89,103,104,56,45,104,112,132,120,110,89,95,90,89,102,110,110]
                }
            ]
        };
        setTimeout(
            myChart.setOption(option)
        ,500)
    }
    function tabEchart3(){
        var e1=['tab3_chart01',353,1000,'新增设备','总设备','#0088cc'];
        var e2=['tab3_chart02',482,1000,'新增设备','总设备','#FCCB00'];
        var e3=['tab3_chart03',562,1000,'新增设备','总设备','#6BC833'];
        tabEchart_pie('tab3_chart01',353,1000,'新增设备','总设备','#0088cc');
        tabEchart_pie('tab3_chart02',482,1000,'新增设备','总设备','#FCCB00');
        tabEchart_pie('tab3_chart03',562,1000,'新增设备','总设备','#6BC833');
        function tabEchart_pie(div,v1,v0,v1name,v0name,color){
            var myChart = echarts.init(document.getElementById(div));
            var option ={
                gird:{
                    left:'2%',
                    bottom:'2%',
                    containLabel:true,
                },
                series: [{	
                    type: 'pie',
                    radius: ['70%', '80%'],
                    color:color,
                    label: {
                        normal: {
                        position: 'center'
                        }
                    },
                    data: [{
                        value: v1,
                        name: v1name,
                        label: {
                            normal: {
                                formatter: v1 +'',
                                textStyle: {
                                    fontSize:20,
                                    color:'#fff',
                                }
                            }
                        }
                    }, 
                           {
                        value: v0,
                        name: v0name,
                        label: {
                            normal: {
                             formatter : function (params){
                            return '占比'+Math.round( v1/v0*100)+ '%'
                        },
                                textStyle: {
                                    color: '#aaa',
                                    fontSize: 12
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgba(255,255,255,.2)'
                            },
                            emphasis: {
                                color: '#fff'
                            }
                        },
                    }]
                }]
            };
            setTimeout(
                myChart.setOption(option)
            ,500)
            window.addEventListener("resize",function(){
                myChart.resize(); //自适应
            });
        }
    }
    function tabEchart4(){
        var myChart = echarts.init(document.getElementById('tabEchart4'));
        var plantCap = [{
            name: '工业',
            value: '222'
        }, {
            name: '农业',
            value: '115'
        }, {
            name: '互联网',
            value: '113'
        }, {
            name: '医疗',
            value: '95'
        }, {
            name: '文学',
            value: '92'
        },{
            name: '服装',
            value: '87'
        }];
        var datalist = [{
            offset: [56, 48],
            symbolSize: 110,
            // opacity: .95,
            color: 'rgba(73,188,247,.14)',
            
        }, {
        
            offset: [30, 70],
            symbolSize: 70,
            color: 'rgba(73,188,247,.14)'
        }, {
            offset: [0, 43],
            symbolSize: 60,
            color: 'rgba(73,188,247,.14)'
        
        }, {
            offset: [93, 30],
            symbolSize: 70,
            color: 'rgba(73,188,247,.14)'
        }, {
            offset: [26, 19],
            symbolSize: 65,
            color: 'rgba(73,188,247,.14)'
        }, {
            offset: [75, 75],
            symbolSize: 60,
            color: 'rgba(73,188,247,.14)'
        
        }];
 
        var datas = [];
        for (var i = 0; i < plantCap.length; i++) {
            var item = plantCap[i];
            var itemToStyle = datalist[i];
            datas.push({
                name: item.value + '\n' + item.name,
                value: itemToStyle.offset,
                symbolSize: itemToStyle.symbolSize,
                label: {
                    normal: {
                        textStyle: {
                            fontSize: 14
                        }
                    }
                },
        
                itemStyle: {
                    normal: {
                        color: itemToStyle.color,
                        opacity: itemToStyle.opacity
                    }
                },
            })
        }
        option = {
            grid: {
                show: false,
                top: 10,
                bottom: 10
            },
        
            xAxis: [{
                gridIndex: 0,
                type: 'value',
                show: false,
                min: 0,
                max: 100,
                nameLocation: 'middle',
                nameGap: 5
            }],
        
            yAxis: [{
                gridIndex: 0,
                min: 0,
                show: false,
                max: 100,
                nameLocation: 'middle',
                nameGap: 30
            }],
            series: [{
                type: 'scatter',
                symbol: 'circle',
                symbolSize: 120,
                label: {
                    normal: {
                        show: true,
                        formatter: '{b}',
                        color: '#FFF',
                        textStyle: {
                            fontSize: '30'
                        }
                    },
                },
                itemStyle: {
                    normal: {
                        color: '#F30'
                    }
                },
                data: datas
            }]
        
        };
        setTimeout(
            myChart.setOption(option)
        ,500)
            $(document).ready(function(){
            　　myChart.resize();  
            
        })
        window.addEventListener("resize", function () {
        　　myChart.resize();  
        });
    }
    function tabEchart5(){ 
    var fontColor = '#fff';
    var fontSize=14;
    var lineColor ='rgb(35,134,129)';
	var myChart = echarts.init(document.getElementById("tabEchart5"));
        option = {
            color: ['#623ad1', '#04957E'],
            tooltip: {},
            radar: [{
                indicator: [{
                        text: '气压报警',
                        max: 100
                    },
                    {
                        text: '设备故障',
                        max: 100
                    },
                    {
                        text: '温度报警',
                        max: 100
                    },
                    {
                        text: '电力故障',
                        max: 100
                    },
                    {
                        text: '环境异常',
                        max: 100
                    }
                ],
            gird:{
                containLabel:true,
                top:'10%',
            },
	        center: ['50%', '50%'],
	        radius: '70%',
	        startAngle: 90,
	        name: {
	            formatter: '{value}',
	            textStyle: {
	                fontSize: fontSize, //外圈标签字体大小
	                color: fontColor //外圈标签字体颜色
	            }
	        },
	        splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
	            show: true,
	            areaStyle: { // 分隔区域的样式设置。
	                color: [], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
	            }
	        },
	        axisLine: { //指向外圈文本的分隔线样式
	            lineStyle: {
	                color: lineColor
	            }
	        },
	        splitLine: {
	            lineStyle: {
	                color: lineColor, // 分隔线颜色
	                width: 1, // 分隔线线宽
	            }
	        }
	    }, ],
	    series: [{
	        name: '雷达图',
	        type: 'radar',
	        data: [
	        {
	            name: '2018',
	            value: [85, 65, 55, 90, 82],
	            areaStyle: {
                    normal: { // 单项区域填充样式
                        color: {
	                        type: 'linear',
	                        x: 0, //右
	                        y: 0, //下
	                        x2: 1, //左
	                        y2: 1, //上
	                        colorStops: [{
	                            offset: 0,
	                            color: '#6357D7'
	                        }, 
	                        {
	                            offset: 1,
	                            color: '#B62B2F'
	                        }],
	                        globalCoord: false
	                    },
	                    opacity: 1 // 区域透明度
	                }
	            },
	            symbolSize: 0, // 单个数据标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
	        }, {
	            name: '2019',
	            value: [50, 80, 45, 30, 75],
	            symbolSize:0,
	            areaStyle: {
	                normal: { // 单项区域填充样式
	                    color: {
	                        type: 'linear',
	                        x: 0, //右
	                        y: 0, //下
	                        x2: 1, //左
	                        y2: 1, //上
	                        colorStops: [{
	                            offset: 0,
	                            color: '#04957E'
	                        }, 
	                        {
	                            offset: 1,
	                            color: '#306eff'
	                        }],
	                        globalCoord: false
	                    },
	                    opacity: 1 // 区域透明度
	                    
	                }
	            },
	        }]
	    }]
    };
    setTimeout(
        myChart.setOption(option)
    ,500)
    window.addEventListener("resize", function () {
        　　myChart.resize();  
    });
    }
})