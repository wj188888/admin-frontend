/**
 * Created by Administrator on 2016/11/15.
 */
'use strict';

/**
 * 用户相关服务
 */
angular.module('app')
    .service('userManage',['httpService', 'CONFIG', function(httpService, CONFIG){
        /**
         * 查询所有角色
         * @param
         */
        this.findAllRole = function(){
            return httpService.http({
                method: 'get',
                url: '/role/findAllRole'
            });
        };
        /**
         * 创建用户
         * @param data
         */
        this.createUser = function(data){
            return httpService.http({
                method: 'post',
                url: '/adminUser/create',
                contentType: 'ajax',
                data:data
            });
        };
        /**
         * 编辑用户
         * @param id
         * @param data
         */
        this.editUser = function(id,data){
            return httpService.http({
                method: 'post',
                url: '/adminUser/'+ id +'/edit',
                //contentType: 'ajax',
                data:data
            });
        };

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
        /**
         * 创建角色
         *
         */
        this.createRole = function(data){
            return httpService.http({
                method: 'post',
                url: '/role/addRole',
                data:data
            });
        };
        /**
         * 根据id查询角色详情
         * @param id
         */
        this.findRoleDetail = function(id){
            return httpService.http({
                method: 'get',
                url: '/role/'+id
            });
        };
        /**
         * 编辑角色
         *
         */
        this.editRole = function(id,data){
            return httpService.http({
                method: 'post',
                url: '/role/' + id +'/edit',
                data:data
            });
        };
        /**
         * 禁用用户
         * @param id
         */
        this.freezeUseUser = function(id){
            return httpService.http({
                method: 'get',
                url: '/adminUser/'+id+'/manage'
            });
        };
        /**
         * 根据id查询用户详情
         * @param id
         */
        this.findUserDetail = function(id){
            return httpService.http({
                method: 'post',
                url: '/adminUser/'+id
            });
        };
        /**
         * 重置密码
         * @param id
         * @param data
         */
        this.resetPassword =  function(id,data){
            return httpService.http({
                method: 'get',
                url: '/adminUser/' + id + '/resetpassword',
                contentType: 'ajax',
                data:data
            });
        };
        /**
         * 删除角色
         * @param id
         */
        this.deleteRole = function(id){
            return httpService.http({
                method: 'post',
                url: '/role/'+ id +'/deleteRole'
            });
        };
        /**
         * 根据id获取角色已授权用户
         * @param id
         */
        this.roleDetail = function(id){
            return httpService.http({
                method: 'get',
                url: '/adminUser/'+ id +'/findGrantedUser'
            });
        };
        /**
         * 强制删除角色
         * @param id
         */
        this.forceDeleteRole = function(id){
            return httpService.http({
                method: 'post',
                url: '/role/'+ id +'/forceDelRole'
            });
        };
    }]);
