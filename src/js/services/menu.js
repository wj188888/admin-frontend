'use strict';
/**
 * 用户相关服务
 */
angular.module('app')
    .service('menu',['httpService', 'CONFIG', function(httpService, CONFIG){
        /**
         * 查询所有菜单
         *
         */
        this.findMenu = function(){
            return httpService.http({
                method: 'get',
                url: '/menu/findAll'
            });
        };

        this.createMenu = function(data){
            return httpService.http({
                method: 'post',
                url: '/menu/create',
                data:data
            });
        };
        /**
         * 编辑菜单
         * @param id
         * @param data
         */
        this.editMenu = function(id,data){
            return httpService.http({
                method: 'post',
                url: '/menu/'+ id +'/edit',
                data:data
            });
        };
        /**
         * 根据id查询用户详情
         * @param id
         */
        this.findMenuDetail = function(id){
            return httpService.http({
                method: 'get',
                url: '/menu/'+id
            });
        };


        this.deleteMenu = function(id){
            return httpService.http({
                method: 'post',
                url: '/menu/'+ id +'/deleteMenu'
            });
        };


    }]);
