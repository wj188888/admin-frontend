'use strict';

/**
 * 司机服务
 */
angular.module('app')
    .service('qiniu',['httpService', 'CONFIG', '$localStorage',
        function(httpService, CONFIG, $localStorage) {
            /**
             * 获取七牛上传TOKEN
             * @returns {string}
             */
            this.getUploadToken = function () {
                var token = '';
                $.ajax({
                    type:'get',
                    url: CONFIG.webServer + '/qiniu/getUploadToken.do',
                    headers:{
                        'X-Auth-Token':$localStorage.Authorization
                    },
                    async:false,
                    dataType:'json',
                    success:function(data){
                        if(data.resultCode == 0){
                            token = data.resultData.token;
                        }
                    }
                });
                return token;
            };

            /**
             * 获取七牛上传空间URL
             * @returns {string}
             */
            this.getUploadUrl = function () {
                var domain = '';
                $.ajax({
                    type:'get',
                    url: CONFIG.webServer + '/qiniu/getUploadUrl.do',
                    headers:{
                        'X-Auth-Token':$localStorage.Authorization
                    },
                    async:false,
                    dataType:'json',
                    success:function(data){
                        domain = data;
                    }
                });
                return domain;
            };
        }
    ]);
