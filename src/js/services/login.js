'use strict';

/**
 * 用户相关服务
 */
angular.module('app')
    .service('login',['httpService', 'CONFIG', function(httpService, CONFIG){
        /**
         * 登录
         * @param data
         * @returns {*}
         */
        this.loginUrl = function(data){
            return httpService.http({
                method: 'post',
                url: '/adminUser/a/login',
                contentType: 'ajax',
                notNeedToken:true,
                data:data
            });
        };
        /**
         * 是否显示验证码
         * @param phone
         * @returns {*}
         */
        this.showLoginVerifyCode = function(phone){
            return httpService.http({
                method: 'get',
                url: '/adminUser/a/showLoginVerifyCode?usernameOrPhone='+phone
            });
        };

    }]);