'use strict';

/**
 * 地址相关服务
 */
angular.module('app')
    .service('region',['httpService', 'CONFIG', function(httpService, CONFIG){

        /**
         * 查询省市区
         * @param data
         * @returns {*}
         */
        this.findSubRegions =  function(data){
            return httpService.http({
                method: 'get',
                url: '/region' + CONFIG.serverAnonymous +'/findSubRegions',
                data:data
            });
        };
        /**
         * 根据省市县名字获得id
         * @param data /region/a/findAssociateRegions
         * @returns {*}
         */
        this.findIdByName =  function(data){
            return httpService.http({
                method: 'get',
                url: '/region' + CONFIG.serverAnonymous +'/findAssociateRegions',
                data:data
            });
        };
        /**
         * 根据省市县id获得本身
         * @param data /region/a/findAssociateRegions
         * @returns {*}
         */
        this.findObjById =  function(id){
            return httpService.http({
                method: 'get',
                url: '/region/' + id,
                contentType: 'ajax'
            });
        };
        
    }]);

