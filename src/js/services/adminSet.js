/**
 * Created by Administrator on 2016/11/24.
 */
'use strict';
angular.module('app')
    .service('adminSet',['httpService', 'CONFIG', function(httpService, CONFIG){
        /**
         * 创建标签
         * @param data
         */
        this.createLabel = function(data){
            return httpService.http({
                method: 'post',
                url: '/rebutLabel/create',
                data:data
            });
        };
        /**
         * 编辑用户
         * @param id
         * @param data
         */
        this.editLabel = function(id,data){
            return httpService.http({
                method: 'post',
                url: '/rebutLabel/'+ id +'/edit',
                data:data
            });
        };
        /**
         * 删除标签
         * @param id
         */
        this.deleteLabel = function(id){
            return httpService.http({
                method: 'post',
                url: '/rebutLabel/'+id+'/delete'
            });
        };
        /**
         * 批量删除标签
         * @param data
         */
        this.batchDeleteLabel = function(data){
            return httpService.http({
                method: 'post',
                url: '/rebutLabel/batchDelete',
                contentType: 'ajax',
                data:data
            });
        };
        /**
         * 创建品牌约车计费标准参数
         * @param data
         */
        this.createRule = function(data){
            return httpService.http({
                method: 'post',
                url: '/chStandardChargingRule/create',
                data:data
            });
        };
        /**
         * 编辑品牌约车计费标准参数
         * @param data,id
         */
        this.editRule = function(data,id){
            return httpService.http({
                method: 'post',
                url: '/chStandardChargingRule/' + id + '/edit',
                data:data
            });
        };

        /**
         * 获取品牌约车详情
         * @param id
         */
        this.getRuleDetail = function(id){
            return httpService.http({
                method: 'get',
                url: '/chStandardChargingRule/' + id
            });
        };
        /**
         * 删除城市计价
         * @param id
         */
        this.deleteCityPrice = function(id){
            return httpService.http({
                method: 'post',
                url: '/chStandardChargingRule/' + id + '/delete',
                contentType: 'ajax',
            });
        };

    }]);

