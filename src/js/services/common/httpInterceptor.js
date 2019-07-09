app.factory('httpInterceptor', ['$rootScope', '$q', 'commonService',
    function($rootScope, $q, commonService) {
        return {
            request: function(config){
                // $rootScope.pageLoading = true;
                // $(".page-controller").addClass('ui-page-loading');
                return config;
            },
            requestError: function(err){
                return $q.reject(err);
            },
            response: function(res){
                if(403 === res.resultCode) {
                    alert(403);
                }
                // $(".page-loading").removeClass('ui-page-loading');
                // $rootScope.pageLoading = false;
                return res;
            },
            responseError: function(err){
                if(-1 === err.status) {

                } else if(500 === err.status) {
                    commonService.showTips({
                        cssClass:'alert-fail',
                        msg:'系统升级中，请稍后再试！'
                    });
                    $('input[type="button"]').removeAttr('disabled').val('重试');
                }
                return $q.reject(err);
            }
        };
    }
]);