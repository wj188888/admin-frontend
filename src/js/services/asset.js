'use strict';

/**
 * 资产相关服务
 */
angular.module('app')
    .service('asset',['httpService', 'CONFIG', function(httpService, CONFIG){
        /**
         * 提现处理
         * @param data
         * @returns {*}
         */
        this.dealDrawOrder = function(data){
            return httpService.http({
                method: 'get',
                url: '/withdrawal/handle',
                data:data
            });
        };
        /**
         * 发票概况
         * @returns {*}
         */
        this.findTicketStatistic = function(){
            return httpService.http({
                method: 'get',
                url: '/invoiceRecord/getInvoiceOverview'
            });
        };
        //查询开票详情
        this.findTicketDetail =  function(id){
            return httpService.http({
                method: 'get',
                url: '/invoiceRecord/' + id,
            });
        };
        //编辑发票信息
        this.editTicketRecord =  function(id,data){
            return httpService.http({
                method: 'post',
                url: '/invoiceRecord/' + id + '/edit',
                data:data
            });
        };
        //获取所有快递公司接口
        this.findAllCompany =  function(){
            return httpService.http({
                method: 'get',
                url: '/logisticsCompany/findAll'
            });
        };
        //获取物流信息
        this.getLogisticInfo =  function(data){
            return httpService.http({
                method: 'get',
                url: '/invoiceRecord/getLogisticsInfo',
                data:data,
                contentType:'ajax'
            });
        };

        /****对账单******/
        //查询所有店铺
        this.findAllStore =  function(){
            return httpService.http({
                method: 'get',
                url: '/store/findAll'
            });
        };

        /****对账单******/
        //查询所有店铺
        this.findAllStoreNew =  function(data){
            return httpService.http({
                method: 'get',
                url: '/store/findAll',
                data:data
            });
        };

        /****支付渠道******/
        // 切换支付渠道
        this.changePayChannel =  function(id){
            return httpService.http({
                method: 'post',
                url: '/payAccountStatistic/' + id + '/shift',
                contentType: 'ajax'
            });
        };

        /****支付渠道******/
        // 查询支付渠道详情通过Id
        this.payChannelDetailById =  function(id){
            return httpService.http({
                method: 'get',
                url: '/payAccountStatistic/' + id ,
                contentType: 'ajax'
            });
        };

        /****支付渠道******/
        // 支付确认付款
        this.payChannelConfirmById =  function(id,data){
            return httpService.http({
                method: 'post',
                url: '/payAccountStatistic/' + id + '/confirm',
                contentType: 'ajax',
                data:data
            });
        };

        /****计费管理******/
        // 查询计费管理列表
        this.findFeeRateConfig =  function(){
            return httpService.http({
                method: 'get',
                url: '/feeRateConfig/find',
                contentType: 'ajax'
            });
        };

        /****计费管理******/
        // 创建计费规则
        this.createFeeRateConfig =  function(data){
            return httpService.http({
                method: 'post',
                url: '/feeRateConfig/create',
                // contentType: 'ajax',
                data:data
            });
        };

        /****计费管理******/
        // 查询默认计费规则
        this.getCommonConfig =  function(){
            return httpService.http({
                method: 'get',
                url: '/feeRateConfig/getCommonConfig',
            });
        };

        /****计费管理******/
        // 创建计费规则
        this.editDefaultFeeRateConfig =  function(id,data){
            return httpService.http({
                method: 'post',
                url: '/feeRateConfig/' + id + '/edit',
                data:data
            });
        };

        // 编辑计费规则通过Id查询信息
        this.feeRateConfigById =  function(id){
            return httpService.http({
                method: 'get',
                url: '/feeRateConfig/' + id ,
            });
        };

    }]);

