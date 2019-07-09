/**
 * Created by Administrator on 2016/10/12.
 */
angular.module('app')
    .service('shop',['httpService', function(httpService) {

        // 更改店铺状态
        this.findStoreChangeStatus = function (data) {
            return httpService.http({
                method: 'get',
                url: '/store/qualification',
                contentType: 'ajax',
                data: data
            });
        };

        // 更改车辆认证状态
        // 1 通过 2 驳回
        this.findCarChangeStatus = function (data) {
            return httpService.http({
                method: 'post',
                url: '/car/qualification',
                contentType: 'ajax',
                data: data
            });
        };

        // 更改司机认证状态
        this.findDriverChangeStatus = function (data) {
            console.log(data);
            return httpService.http({
                method: 'post',
                url: '/driver/qualification',
                contentType: 'ajax',
                data: data
            });
        };

        // 更改店铺状态
        this.findStoreById = function (data) {
            return httpService.http({
                method: 'get',
                url: '/store/'+data.id,
                contentType: 'ajax',
                data: data
            });
        };
        // 获取车辆
        this.findCarById = function (data) {
            return httpService.http({
                method: 'get',
                url: '/car/'+data.id,
                contentType: 'ajax',
                data: data
            });
        };
        // 获取司机
        this.findDriverById = function (data) {
            return httpService.http({
                method: 'get',
                url: '/driver/'+data.id,
                contentType: 'ajax',
                data: data
            });
        };

        // 查询驳回标签
        this.findLabels = function (data) {
            return httpService.http({
                method: 'get',
                url: '/rebutLabel/find',
                data: data
            });
        };
        // 银行认证处理
        this.bankCardHandle = function (data) {
            return httpService.http({
                method: 'post',
                url: '/bankCar/handle',
                contentType:'ajax',
                data: data
            });
        };
        // 平台认证申请列表详情
        this.findApplyById = function (id) {
            console.log(id);
            return httpService.http({
                method: 'get',
                url: '/storeVerify/' + id
            });
        };
        // 平台认证申请列表处理
        this.handlePlatApply = function (data) {
            return httpService.http({
                method: 'post',
                url: '/storeVerify/qualification',
                contentType: 'ajax',
                data: data
            });
        };
        //银行认证申请列表处理
        this.handleBankApply = function (data) {
            return httpService.http({
                method: 'post',
                url: '/storeVerify/handle',
                contentType: 'ajax',
                data: data
            });
        };
        // 平台认证申请列表详情
        this.getCustomerData = function (id) {
            return httpService.http({
                method: 'get',
                url: '/firmUser/' + id
            });
        };
    }]);