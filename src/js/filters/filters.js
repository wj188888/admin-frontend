'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
    .filter('fromNow', function () {
        return function (date) {
            return moment(date).fromNow();
        }
    })
    .filter('eachPrc', function () {
        //循环服务产品、班次
        return function (data) {
            if (data) {
                return data.join('、');
            }
        }
    })

    .filter('formatPhoneNum', function () {
        //格式化电话
        return function (phone) {
            if (phone) {
                return phone.substr(0, 3) + ' - ' + phone.substr(3, 4) + ' - ' + phone.substr(7, 4);
            }
        }
    })
    .filter('formatBankId', function () {
        //格式银行卡号
        return function (bank) {
            if (bank) {
                var length  = bank.length;
                var less =  length-16;
                var number;
                if(length>16){
                    number = bank.substr(0, 4) + ' - ' + bank.substr(4, 4) + ' - ' + bank.substr(8, 4) + ' - '+ bank.substr(12, 4) + ' - ' + bank.substr(-less);
                }else{
                    number = bank.substr(0, 4) + ' - ' + bank.substr(4, 4) + ' - ' + bank.substr(8, 4) + ' - '+ bank.substr(12, 4);
                }
                return number;
            }
        }
    })
    .filter('productName', ['CONSTANTS', function (CONSTANTS) {
        // 根据产品的code转为name
        return function (code) {
            return CONSTANTS[code];
        }
    }])
    .filter('belongType', ['CONSTANTS', function (CONSTANTS) {
        // 根据产品的code转为name
        return function (code) {
            return CONSTANTS['belongType'][code].name || '暂无';
        }
    }])
    .filter('sites', ['CONSTANTS', function (CONSTANTS) {
        // 将站点type转换成name
        return function (code) {
            var arr = [];
            for(var x in code) {
                arr.push(CONSTANTS.siteType[code[x]-1].name)
            }
            return arr.join(',');
        }
    }])
    .filter('belongTypeCar', ['CONSTANTS', function (CONSTANTS) {
        // 将隶属关系转换成name
        return function (type) {
            return CONSTANTS.belongType[type||0].name || '暂无';
        }
    }])
    .filter('vmCarType', function() {
        return function(data) {
            if(data == 0) {
                return '特大型客车';
            }else if(data == 1) {
                return '大型客车';
            }else if(data == 2) {
                return '中型客车';
            }else if(data == 3) {
                return '小型客车';
            }else if(data == 4) {
                return '乘用车';
            }
        }
    })
    .filter('vmCarLevel', function() {
        return function(data) {
            if(data == 0) {
                return '高三级';
            }else if(data == 1) {
                return '高二级';
            }else if(data == 2) {
                return '高一级';
            }else if(data == 3) {
                return '中级';
            }else if(data == 4) {
                return '普通级';
            }
        }
    })
    /**
     * 浮点数转化为百分数
     */
        .filter('formatPercent', function () {
            return function (data) {
                var percent = '';
                if (data === 0) {
                    percent = 0;
                } else {
                    percent = (data * 100).toFixed(2) ;
                }
                return percent;
            }
        })
    //班车类型
     .filter('vmShuttleType', function() {
        return function(data) {
            if(data == 'COUNTY_INSIDE') {
                return '县内班车客运';
            }else if(data == 'COUNTY_OUTSIDE') {
                return '县际班车客运';
            }else if(data == 'CITY_SHUTTLE') {
                return '市际班车客运';
            }else if(data == 'PROVINCE_SHUTTLE') {
                return '省际班车客运';
            }else if(data == 'COUNTRY_SHUTTLE') {
                return '出入境班车客运';
            }
        }
    })
    .filter('displacementFilter', function() {
        return function(data) {
            if(data) {
                if(data.indexOf('T') < 0 ) {
                    return data+'L'
                }else{
                    return data;
                }
            }
        }
  });