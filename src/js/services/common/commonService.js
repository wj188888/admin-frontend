angular.module('app')
    .service('commonService', ['$timeout','CONSTANTS',
        function ($timeout,CONSTANTS) {
            this.dateTimeToDate = function(dateTime){
                return dateTime ? dateTime.split(' ')[0] : '';
            };

            this.dateToDateTime = function(dateStr){
                return dateStr ? dateStr + ' 00:00:00' : '';
            };

            this.showTips = function(option){
                var $tips = $('.alert-container') || '';
                if($tips.size() == 0){
                    $tips = $('<div class="alert-container">' +
                        '<div class="alert-box" id="J_alertBox">' +
                        '<p class="alert-msg"></p>' +
                        '</div>' +
                        '</div>');
                    $(document.body).append($tips);
                }
                if(option.cssClass){
                    $tips.find('#J_alertBox').attr('class', 'alert-box ' + option.cssClass);
                }else{
                    $tips.find('#J_alertBox').attr('class','alert-box');
                }
                $tips.find('.alert-msg').html(option.msg);
                if($tips.css('display')=='none'){
                    $tips.fadeIn();
                    $timeout(function(){
                        $tips.hide();
                    }, 1500);
                }
            };

            this.copyNotNullDriver = function(obj1, obj2) {
                var that = this;

                for(var x in obj2) {
                    if(!that.isEmpty(obj2[x])) {
                        if(typeof obj2[x] == 'object') {
                            for(var j in obj2[x]) {
                                if(!obj1[x]) {
                                    obj1[x] = {};
                                }
                                obj1[x][j] = obj2[x][j];
                            }
                        }else{
                            obj1[x] = obj2[x];
                        }
                    }
                }

                return angular.copy(obj1);
            };

            this.dateFormat = {
                /**
                 * [dateConversion 获取系统时间格式为YYYY-MM-DD HH:MM:SS]
                 * 对Date的扩展，将 Date 转化为指定格式的String
                 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
                 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
                 例子：
                 curDateTime(new Date(),"yyyy-MM-dd hh:mm:ss.S") ==> 2016-07-02 08:09:04.423
                 curDateTime(new Date(),"yyyy-M-d h:m:s.S")      ==> 2016-7-2 8:9:4.18
                 curDateTime(new Date(),"yyyy-MM-dd")      ==> 2016-7-2
                 * @param  {[object]} ObjDate [日期对象(new date();)]
                 * @param  {[string]} fmt     [日期格式]
                 * @return {[type]}         [description]
                 */
                dateConversion: function (ObjDate, fmt) {
                    var d = ObjDate || new Date();
                    var k = "";
                    fmt = fmt || 'yyyy-MM-dd hh:mm:ss'; //默认全格式日期时间
                    var o = {
                        "M+": d.getMonth() + 1, //月份
                        "d+": d.getDate(), //日
                        "h+": d.getHours(), //小时
                        "m+": d.getMinutes(), //分
                        "s+": d.getSeconds(), //秒
                        "q+": Math.floor((d.getMonth() + 3) / 3), //季度
                        S: d.getMilliseconds() //毫秒
                    };
                    if (/(y+)/.test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
                    }
                    for (k in o) {
                        if (new RegExp("(" + k + ")").test(fmt)) {
                            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
                                ? (o[k])
                                : (String("00" + o[k]).substr(String("" + o[k]).length)));
                        }
                    }
                    return fmt;
                },
                /*
                 *   功能:实现VBScript的DateAdd功能.
                 *   参数:interval,字符串表达式，表示要添加的时间间隔.
                 *   参数:number,数值表达式，表示要添加的时间间隔的个数.
                 *   参数:date,时间对象.
                 *   返回:新的时间对象. 格式为YYYY-MM-DD HH:MM:SS
                 *   var   now   =   new   Date();
                 *   var   newDate   =   dateAdd(now, "d", 5);
                 */
                dateAdd: function (date, interval, number) {
                    switch (interval) {
                        case "y":
                            date.setFullYear(date.getFullYear() + number);
                            return date;
                        case "q":
                            date.setMonth(date.getMonth() + number * 3);
                            return date;
                        case "mon":
                            date.setMonth(date.getMonth() + number);
                            return date;
                        case "w":
                            date.setDate(date.getDate() + number * 7);
                            return date;
                        case "d":
                            date.setDate(date.getDate() + number);
                            return date;
                        case "h":
                            date.setHours(date.getHours() + number);
                            return date;
                        case "m":
                            date.setMinutes(date.getMinutes() + number);
                            return date;
                        case "s":
                            date.setSeconds(date.getSeconds() + number);
                            return date;
                        default:
                            date.setDate(date.getDate() + number);
                            return date;
                    }
                },
                /* 对两个YYYY-MM-DD HH:MM:SS时间进行比较 */
                dateComptime: function (beginTime, endTime) {
                    //var beginTime = "2009-09-21 00:00:00";
                    //var endTime = "2009-09-21 00:00:01";
                    var beginTimes = beginTime.substring(0, 10).split('-');
                    var endTimes = endTime.substring(0, 10).split('-');
                    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
                    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
                    //alert(Date.parse(endTime));
                    //alert(Date.parse(beginTime));
                    var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
                    if (a < 0) {  //alert("endTime小!");
                        return "small";
                    } else if (a > 0) {
                        //alert("endTime大!");
                        return "big";
                    } else if (a === 0) {
                        //alert("时间相等!");
                        return "equal";
                    } else {
                        return 'exception';
                    }
                },
                /* 比较两个YYYY-MM-DD 的时间格式 */
                dateContrast: function (a, b) {
                    var arr = a.split("-");
                    var starttime = new Date(arr[0], arr[1], arr[2]);
                    var starttimes = starttime.getTime();
                    var arrs = b.split("-");
                    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
                    var lktimes = lktime.getTime();
                    if (starttimes >= lktimes) {
                        return false;
                    }
                    return true;
                },
                /*
                 取得日期数据信息
                 参数 interval 表示数据类型
                 Y年M月D日 W星期 WW周 H时 N分 S秒
                 */
                datePart: function (data, interval) {
                    var myDate = data;
                    var partStr = '';
                    var Week = ['日', '一', '二', '三', '四', '五', '六'];
                    switch (interval) {
                        case 'y':
                            partStr = myDate.getFullYear();
                            break;
                        case 'm':
                            partStr = myDate.getMonth() + 1;
                            break;
                        case 'd':
                            partStr = myDate.getDate();
                            break;
                        case 'w':
                            partStr = Week[myDate.getDay()];
                            break;
                        case 'ww':
                            partStr = myDate.WeekNumOfYear();
                            break;
                        case 'h':
                            partStr = myDate.getHours();
                            break;
                        case 'n':
                            partStr = myDate.getMinutes();
                            break;
                        case 's':
                            partStr = myDate.getSeconds();
                            break;
                    }
                    return partStr;
                },
                /* 将小时分钟秒转换为毫秒  时间固定固定格式为 'HH:mm:ss' */
                dateParseInt: function (data) {
                    if (data) {
                        var sp = data.split(':');
                        var Ts = 0;
                        if (sp.length === 3) {
                            Ts = parseInt(data.split(':')[0]) * 3600 + parseInt(data.split(':')[1]) * 60 + parseInt(data.split(':')[2]);
                        }
                        return Ts;
                    } else {
                        return 0;
                    }
                },
                /* 计算两个时间的时差 */
                dateDiff: function (interval, beginDate, endDate) {
                    var beginTime = "",
                        endTime = "";
                    if (beginDate && beginDate !== "" && endDate && endDate !== "") {
                        beginTime = new Date(Date.parse(beginDate.replace(/-/g, "/"))).getTime();
                        endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
                    } else {
                        return undefined;
                    }
                    switch (interval) {
                        // 计算秒差
                        case "s":
                            return parseInt((endTime - beginTime) / 1000);

                        // 计算分差
                        case "n":
                            return parseInt((endTime - beginTime) / 60000);

                        // 计算时差
                        case "h":
                            return parseInt((endTime - beginTime) / 3600000);

                        // 计算日差
                        case "d":
                            return parseInt(Math.round((endTime - beginTime) / 86400000));

                        // 计算周差
                        case "w":
                            return parseInt((endTime - beginTime) / (86400000 * 7));

                        // 计算月差
                        case "m":
                            return (endTime.getMonth() + 1) + ((endTime.getFullYear() - beginTime.getFullYear()) * 12) - (beginTime.getMonth() + 1);

                        // 计算年差
                        case "y":
                            return endTime.getFullYear() - beginTime.getFullYear();

                        // 输入有误
                        default:
                            return undefined;
                    }
                },
                /* 计算两个日期相差的天数 */
                dateDayDiff: function (startDate, endDate) {
                    var days = 0,
                        startTime = 0,
                        endTime = 0;
                    if (startDate && startDate !== "" && endDate && endDate !== "") {
                        startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
                        endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
                        days = Math.abs(endTime - startTime) / (1000 * 60 * 60 * 24);
                    }
                    return days + 1;
                },
                // 获取某一日期之前N天的日期
                getDateBeforeDays: function (date, days) {
                    date = new Date(new Date(date).getTime() - days * 24 * 3600000);
                    return dateOperation.toString(date, 'yyyy-MM-dd');
                },
                // 日期格式化
                toString: function (date, format) {
                    var y = 0, m = 0, d = 0, fmt = null;
                    if (date.length === 8 && parseInt(date, 10) / 100000000 > 0) {
                        date = date.split('');
                        date.splice(4, 0, '-');
                        date.splice(7, 0, '-');
                        date = date.join('');
                    }
                    if (typeof date === 'string' || typeof date === 'number') {
                        date = new Date(date);
                    }
                    y = date.getFullYear();
                    m = date.getMonth() + 1;
                    d = date.getUTCDate();
                    fmt = {
                        'yyyy-MM-dd': y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d),
                        'yyyy/MM/dd': y + '/' + (m < 10 ? ('0' + m) : m) + '/' + (d < 10 ? ('0' + d) : d),
                        'yyyy.MM.dd': y + '.' + (m < 10 ? ('0' + m) : m) + '.' + (d < 10 ? ('0' + d) : d),
                        'yyyy-M-d': y + '-' + m + '-' + d,
                        'yyyy/M/d': y + '/' + m + '/' + d,
                        'yyyy.M.d': y + '.' + m + '.' + d,
                        'yy-M-d': y % 100 + '-' + m + '-' + d,
                        'yy/M/d': y % 100 + '/' + m + '/' + d,
                        'yy.M.d': y % 100 + '.' + m + '.' + d,
                        'yy/MM/dd': y % 100 + '/' + (m < 10 ? ('0' + m) : m) + '/' + (d < 10 ? ('0' + d) : d),
                        '年月日': y + '年' + (m < 10 ? ('0' + m) : m) + '月' + (d < 10 ? ('0' + d) : d + '日'),
                        '日月年': (d < 10 ? ('0' + d) : d + '日' + (m < 10 ? ('0' + m) : m) + '月' + y + '年')
                    };
                    return fmt[format];
                }
            };

            this.getSearchDay = function() {
                var yesterday = this.dateFormat.dateAdd(new Date(), "d", -1);
                var sevenDay = this.dateFormat.dateAdd(new Date(), "d", -7);
                var monthDay = this.dateFormat.dateAdd(new Date(), "d", -30);
                var lastMonth = this.dateFormat.dateAdd(new Date(), 'mon', -1);
                return {
                    today: this.dateFormat.dateConversion(new Date(), 'yyyy-MM-dd'),
                    yesterday: this.dateFormat.dateConversion(yesterday, 'yyyy-MM-dd'),
                    sevenDay:   this.dateFormat.dateConversion(sevenDay, 'yyyy-MM-dd'),
                    monthDay: this.dateFormat.dateConversion(monthDay, 'yyyy-MM-dd'),
                    lastMonth: this.dateFormat.dateConversion(lastMonth, 'yyyy-MM')
                }
            };
            /**
             *产品的类型
             */
            this.product = {
                // 枚举类型
                enumeration :[
                    {name: '全部', code: ''},
                    {name: CONSTANTS.CITY_BUS, code: 'CITY_BUS'},
                    {name: CONSTANTS.AIRPORT_BUS, code: 'AIRPORT_BUS'},
                    {name: CONSTANTS.TOUR_BUS, code: 'TOUR_BUS'},
                    {name: CONSTANTS.WORK_BUS, code: 'WORK_BUS'},
                    {name: CONSTANTS.SCHOOL_BUS, code: 'SCHOOL_BUS'},
                    {name: CONSTANTS.TRAIN_STATION_BUS, code: 'TRAIN_STATION_BUS'},
                    {name: CONSTANTS.LINE_BUS, code: 'LINE_BUS'},
                    {name: CONSTANTS.CUSTOM_BUS, code: 'CUSTOM_BUS'},
                    {name: CONSTANTS.STATION_BUS, code: 'STATION_BUS'},
                    {name: CONSTANTS.CAR_HAILING, code: 'CAR_HAILING'},
                    {name: CONSTANTS.TAXI, code: 'TAXI'},
                    {name: CONSTANTS.CAR_INSPECTION, code: 'CAR_INSPECTION'}
                ],
                // 产品app选择类型
                app_enumeration :[
                    {name: CONSTANTS.CITY_BUS, code: 'CITY_BUS'},
                    {name: CONSTANTS.AIRPORT_BUS, code: 'AIRPORT_BUS'},
                    {name: CONSTANTS.TOUR_BUS, code: 'TOUR_BUS'},
                    {name: CONSTANTS.WORK_BUS, code: 'WORK_BUS'},
                    {name: CONSTANTS.SCHOOL_BUS, code: 'SCHOOL_BUS'},
                    {name: CONSTANTS.TRAIN_STATION_BUS, code: 'TRAIN_STATION_BUS'},
                    {name: CONSTANTS.LINE_BUS, code: 'LINE_BUS'},
                    {name: CONSTANTS.CUSTOM_BUS, code: 'CUSTOM_BUS'},
                    {name: CONSTANTS.STATION_BUS, code: 'STATION_BUS'},
                    {name: CONSTANTS.CAR_HAILING, code: 'CAR_HAILING'}
                ],
                // 城际——二级分类
                city_class: [
                    {name: CONSTANTS.CITY_EXPRESS_BUS, code: 'CITY_EXPRESS_BUS'},
                    {name: CONSTANTS.CITY_SPECIAL_BUS, code: 'CITY_SPECIAL_BUS'}
                ],
                // 飞机——二级分类
                airport_class: [
                    {name: CONSTANTS.AIRPORT_EXPRESS_BUS, code: 'AIRPORT_EXPRESS_BUS'},
                    {name: CONSTANTS.AIRPORT_SPECIAL_BUS, code: 'AIRPORT_SPECIAL_BUS'}
                ],
                // 景点——二级分类
                tour_class: [
                    {name: CONSTANTS.TOUR_SCENIC, code: 'TOUR_SCENIC'},
                    {name: CONSTANTS.TOUR_LINE, code: 'TOUR_LINE'}
                ],
                // 工作——二级分类
                work_class: [
                    {name: CONSTANTS.WORK_SHUTTLE_BUS, code: 'WORK_SHUTTLE_BUS'},
                    {name: CONSTANTS.WORK_COMPANY_BUS, code: 'WORK_COMPANY_BUS'}
                ],
                // 校园——二级分类
                school_class: [
                    {name: CONSTANTS.SCHOOL_SHUTTLE_BUS, code: 'SCHOOL_SHUTTLE_BUS'},
                    {name: CONSTANTS.SCHOOL_SPECIAL_BUS, code: 'SCHOOL_SPECIAL_BUS'}
                ],
                // 接站——二级分类
                train_station_class: [
                    {name: CONSTANTS.TRAIN_EXPRESS_BUS, code: 'TRAIN_EXPRESS_BUS'},
                    {name: CONSTANTS.TRAIN_SPECIAL_BUS, code: 'TRAIN_SPECIAL_BUS'}
                ],
                // 定制包车——线路包车
                custom_line_class: [
                    {name: CONSTANTS.CUSTOM_BUS, code: 'CUSTOM_BUS'},
                    {name: CONSTANTS.LINE_BUS, code: 'LINE_BUS'}
                ],
                // 线路包车——二级分类
                line_class: [
                    {name: CONSTANTS.LINE_CHARTER_BUS, code: 'LINE_CHARTER_BUS'},
                    {name: CONSTANTS.LINE_CAR_POOL_BUS, code: 'LINE_CAR_POOL_BUS'}
                ],
                // 车站班车——二级分类
                station_bus: [
                    {name: CONSTANTS.STATION_FIXED_BUS, code: 'STATION_FIXED_BUS'},
                    {name: CONSTANTS.STATION_STREAM_BUS, code: 'STATION_STREAM_BUS'}
                ],
                // code数组转换为name
                switchToWord: function(code) {
                    var data = [];
                    angular.forEach(code, function(value, key) {
                        data.push(CONSTANTS[value]);
                    })
                    return data;
                }
            };
            // 判断是否为空
            this.isEmpty = function(data) {
                if(data == null || data == '' || typeof data == undefined) {
                    return true;
                } else {
                    return false;
                }
            };
              this.copyNotNull = function(obj1, obj2) {
                var that = this;
                for(var x in obj2) {
                    if(!that.isEmpty(obj2[x])) {
                        if(typeof obj2[x] == 'object') {
                            obj1[x] = angular.copy(obj2[x]);
                        } else {
                            obj1[x] = obj2[x];
                        }
                    }
                }

                return angular.copy(obj1);
            };
        }
    ]);
angular.module('app').service('datePickerService',['$timeout','CONSTANTS', function($timeout, CONSTANTS) {
    /*
    * @func 配置日期时间选择相关参数
    * @param target {String}: 元素id或者类名 如'#timer','.timer'
    * @param defaultConfig {Number}: 默认配置类型 0：日期+时间(yy:mm:dd hh:mm:ss) 1：只有日期(yy:mm:dd) 2：只有时间（hh:mm）
    * @param configs {Object}: 自定义配置
    * */
    this.setConfig = function(target, defaultConfig, configs) {
        // 当前配置
        var currentConfig = {};
        var configTypes = [
            {
                timeOnlyTitle: '选择时间',
                timeText: '时间',
                hourText: '小时',
                minuteText: '分钟',
                secondText: '秒钟',
                millisecText: '毫秒',
                microsecText: '微秒',
                timezoneText: '时区',
                currentText: '当前时间',
                closeText: '关闭',
                timeFormat: 'HH:mm:ss',
                dateFormat: "yy-mm-dd",
                changeMonth: true,
                changeYear: true,
                /*addSliderAccess: true,
                sliderAccessArgs: { touchonly: false },*/
                monthNamesShort: [1,2,3,4,5,6,7,8,9,10,11,12],
                onClose: function(dateTime, obj) {
                    $(target).trigger('blur');
                }
            },
            {
                timeOnlyTitle: '选择时间',
                timeText: '时间',
                hourText: '小时',
                minuteText: '分钟',
                secondText: '秒钟',
                millisecText: '毫秒',
                microsecText: '微秒',
                timezoneText: '时区',
                currentText: '当前时间',
                closeText: '关闭',
                timeFormat: 'HH:mm:ss',
                dateFormat: "yy-mm-dd",
                changeMonth: true,
                changeYear: true,
                monthNamesShort: [1,2,3,4,5,6,7,8,9,10,11,12],
                onClose: function(dateTime, obj) {
                    $(target).trigger('blur');
                }
            },
            {
                timeOnlyTitle: '选择时间',
                timeText: '时间',
                hourText: '小时',
                minuteText: '分钟',
                secondText: '秒钟',
                millisecText: '毫秒',
                microsecText: '微秒',
                timezoneText: '时区',
                currentText: '当前时间',
                closeText: '关闭',
                timeFormat: 'HH:mm',
                dateFormat: "yy-mm-dd",
                // controlType: 'select',
                changeMonth: true,
                changeYear: true,
                monthNamesShort: [1,2,3,4,5,6,7,8,9,10,11,12],
                onClose: function(dateTime, obj) {
                    $(target).trigger('blur');
                }
            }
        ];
        // 如果没有传配置类型和自定义配置，默认设置配置类型0
        if(!defaultConfig && !configs) {
            $(target).datetimepicker(configTypes[0]);
        } else if (defaultConfig && !configs) {
            if(defaultConfig == 0) {
                $(target).datetimepicker(configTypes[defaultConfig]);
            } else if(defaultConfig == 1) {
                $(target).datepicker(configTypes[defaultConfig]);
            } else if(defaultConfig == 2) {
                $(target).timepicker(configTypes[defaultConfig]);
            }
        } else if((defaultConfig||defaultConfig==0) && configs) {
            $.extend(configTypes[defaultConfig], configs);
            if(defaultConfig == 0) {
                $(target).datetimepicker(configTypes[defaultConfig]);
            } else if(defaultConfig == 1) {
                $(target).datepicker(configTypes[defaultConfig]);
            } else if(defaultConfig == 2) {
                $(target).timepicker(configTypes[defaultConfig]);
            }
        }
    }
}]);