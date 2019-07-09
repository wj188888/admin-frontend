/**
 * 常量
 */
var app = angular.module('app')
    .constant('CONSTANTS', {
        /* 城际分类 */
        CITY_BUS: '城际专线',
        CITY_EXPRESS_BUS: '城际快车',
        CITY_SPECIAL_BUS: '城际专车',
        /* 机场分类 */
        AIRPORT_BUS: '接送飞机',
        AIRPORT_EXPRESS_BUS: '机场快车',
        AIRPORT_SPECIAL_BUS: '机场专车',
        /* 景点分类 */
        TOUR_BUS: '旅游专线',
        TOUR_SCENIC: '旅游',
        TOUR_LINE: '车票',
        /* 工作分类 */
        WORK_BUS: '工作班车',
        WORK_SHUTTLE_BUS: '工作班车',
        WORK_COMPANY_BUS: '企业班车',
        /* 校园分类 */
        SCHOOL_BUS: '校园班车',
        SCHOOL_SHUTTLE_BUS: '校园班车',
        SCHOOL_SPECIAL_BUS: '校园专车',
        /* 接站分类 */
        TRAIN_STATION_BUS: '接送火车',
        TRAIN_EXPRESS_BUS: '接站快车',
        TRAIN_SPECIAL_BUS: '接站专车',
        /* 线路包车分类 */
        LINE_BUS: '线路包车',
        LINE_CHARTER_BUS: '线路包车',
        LINE_CAR_POOL_BUS: '线路拼车',
        /* 定制分类名称 */
        CUSTOM_BUS: '定制包车',
        /* 车站班车分类名称 */
        STATION_BUS: '车站班车',
        STATION_FIXED_BUS: '固定班',
        STATION_STREAM_BUS: '流水班',
        /* 品牌约车 */
        CAR_HAILING: '品牌约车',
        /* 品牌约车 */
        TAXI: '出租的士',
        /*车辆年检*/
        CAR_INSPECTION: '车辆年检',
        CAR_TYPE_PASSENGER_CAR: '营运载客汽车',
        CAR_TYPE_FREIGHT_CAR: '大中型非营运汽车',
        CAR_TYPE_MOTOR_CAR: '摩托车',
        CAR_TYPE_TRACTOR_CAR: '拖拉机和其他车辆',
        CAR_TYPE_SALOON_CAR: '小微型非营运汽车',
        /*自驾租车*/
        CAR_RENTAL:'自驾租车',
        /*景点专线*/
        SCENIC_BUS:'景点专线',
        /*微信小店*/
        GOODS:'微信小店',

        //私有站点
        privateSiteTypes: [
            {value: 1, name: '汽车站点', clicked: false},
            {value: 2, name: '景区站点', clicked: false},
            {value: 3, name: '火车站点', clicked: false},
            {value: 6, name: '飞机站点', clicked: false}
        ],

        /* 省份数组 */
        listOfProvinces: [ '赣', '川', '津', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘', '皖', '鲁', '新', '苏', '浙', '鄂', '桂', '甘', '晋', '蒙', '陕', '吉', '闽', '贵', '粤', '青', '藏', '京', '宁', '琼'],
        /* 黄牌/蓝牌 */
        licensePlatTypes: [{name: '黄牌', value: 0},{name: '蓝牌', value: 1}],
        /*隶属关系*/
        belongType: [{name:'合营',value:0},{name:'公营',value:1}],
        /*司机角色*/
        driverRole: [{name:'司机+车主',value:0},{name:'司机',value:1},{name:'车主',value:2}],
        // 司机类型
        categoryDriver: [{name:'常规司机',value:0}, {name:'网约车司机',value:1}],
        // 车辆类型
        categoryCar: [{name:'常规车辆',value:0}, {name:'网约车',value:1}],
        // 车牌类型
        licensePlatType: [{name:'黄牌',value:0},{name:'蓝牌',value:1}],
        // 站点类型
        siteType: [{value:1,name:'汽车站点'},{value:2,name:'景区站点'},{value:3,name:'火车站点'},{value:4,name:'汽车站点'},{value:5,name:'酒店站点'},{value:6,name:'机场站点'},{value:7,name:'租车站点'},{value:8,name:'学校站点'}],
        regExp:{
            tel: /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/,
            idCard: /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,
            idCard15: /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/,
            idCard18: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,
            number: /^[+]?[0-9]*$/,
            znumber: /^\+?[1-9][0-9]*$/,
            filter:/<\/?[^>]*>/g,
            zi:/^[\u4E00-\u9FFF]+$/,
            http:/(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/,
            floatPoint: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+]?[0-9]+)?$/,
            bankCard: /^(\d{16}|\d{19})$/
        },
        compressImage: '?imageMogr2/thumbnail/500x/strip/quality/50/format/webp'
    });