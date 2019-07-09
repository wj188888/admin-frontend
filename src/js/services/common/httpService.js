'use strict';

/**
 * http请求
 */
angular.module('app')
    .service('httpService', ['$http', 'CONFIG', '$localStorage',
        function ($http, CONFIG, $localStorage) {
            var contentType = {
                ajax: 'application/x-www-form-urlencoded;charset=utf-8'
            };

            this.http = function (param) {
                var url;
                if (param.url.indexOf('http') > -1) {
                    url = param.url
                } else {
                    url = CONFIG.webServer + param.url;
                }
                var httpConfig = {
                    method: param.method || 'get',
                    url: url
                };
                httpConfig.params = {};
                if (httpConfig.method === 'post') {
                    httpConfig.data = param.data;
                } else {
                    httpConfig.params = param.data || {};
                }

                //解决跨域Cookie丢失
                if (param.withCredentials) {
                    httpConfig.withCredentials = true;
                }


                httpConfig.headers = {};
                //TOKEN
                if (!param.notNeedToken && $localStorage.Authorization) {
                    httpConfig.headers['X-Auth-Token'] = $localStorage.Authorization;
                }

                /**暂时这样使用 -sta*/
                //httpConfig.headers['X-Auth-Token'] = 'orange eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzc4MTEwODQ3MiIsInJvbGVzIjoiIiwiaWF0IjoxNDc2Nzc5ODk1LCJpc3MiOiI1N2U4ODBhNDY3OTA3ZjBhMmZmNGViMjIiLCJleHAiOjE0NzY3ODE2OTV9.Bs81V0by7qtU7A82itYYXEqwI4xjBEqSbqe2jK1VHyw';
                //httpConfig.headers['USER_ID'] = '1';

                /**暂时这样使用 -end*/

                ////登录用户ID
                //if(!param.notNeedStoreId && $localStorage.USER_ID){
                //    httpConfig.headers['USER_ID'] = $localStorage.USER_ID;
                //}

                //改变请求头
                if (param.contentType) {
                    httpConfig.headers['Content-Type'] = contentType[param.contentType];
                    httpConfig.headers['Accept'] = 'application/json';
                    httpConfig.transformRequest = function (data) {
                        if (data) {
                            return $.param(data);
                        }
                    };
                }

                return $http(httpConfig);
            };

            this.ajaxProxy = function (param) {
                var result;
                $.ajax({
                    type: param.method || 'get',
                    dataType: 'json',
                    async: param.async || true,
                    url: param.url,
                    data: param.data,
                    beforeSend: function (request) {
                        //TOKEN
                        if (param.needToken && $localStorage.Authorization) {
                            request.setRequestHeader('X-Auth-Token', $localStorage.Authorization);
                        }

                        //平台ID
                        if (param.needToken && $localStorage.STORE_ID) {
                            request.setRequestHeader('USER_ID', $localStorage.USER_ID);
                        }
                    },
                    success: function (data) {
                        result = data;
                    }
                });
                return result;
            }
        }
    ]);