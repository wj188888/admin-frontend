'use strict';

/**
 * 入口
 */
angular.module('app')
    .run(['$rootScope', '$state', '$stateParams', '$timeout', 'commonService', '$localStorage',
        function ($rootScope, $state, $stateParams, $timeout, commonService, $localStorage) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            /**
             * 路由切换开始时的处理
             */
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

               var noLogin = ['login'];
               if($.inArray(toState.name, noLogin) > -1) return;
               if(!$localStorage.Authorization){
                   event.preventDefault();
                   $timeout(function(){
                       $state.go('login');
                   }, 1500);
               }
               /* 按钮样式 */
                $rootScope.$on('$viewContentLoaded', function() {

                    setTimeout(function() {
                        if($rootScope.showfooter) {
                            var scrollHeight = $($('.page-controller')[0]).height() - window.innerHeight + 230;
                        }else{
                            var scrollHeight = $($('.page-controller')[0]).height() - window.innerHeight;
                        }
                        if(scrollHeight >= 0) {
                            $('.button-suspension').css({'position': 'fixed', 'bottom': 0});
                        }else{
                            $('.button-suspension').css({'position': 'relative', 'bottom': 0});
                        }
                        $('.button-suspension').css('width', $('.page-controller').css('width'));
                    }, 500)
                })
                $(window).on('resize', function(){
                    if($rootScope.showfooter) {
                        var scrollHeight = $($('.page-controller')[0]).height() - window.innerHeight + 230;
                    }else{
                        var scrollHeight = $($('.page-controller')[0]).height() - window.innerHeight;
                    }
                    if(scrollHeight >= 0) {
                        $('.button-suspension').css({'position': 'fixed', 'bottom': 0});
                    }else{
                        $('.button-suspension').css({'position': 'relative', 'bottom': 0});
                    }
                    $('.button-suspension').css('width', $('.page-controller').css('width'));
                });
                // 确定按钮位置
                $(window).scroll(function(){
                　　var scrollTop = $(this).scrollTop();
                　　var scrollHeight = $(document).height();
                　　var windowHeight = $(this).height();
                    var bottom = -(scrollHeight-windowHeight-scrollTop-50);
                　　if((scrollTop + windowHeight > scrollHeight - 50)&&($('.button-suspension').css('position') == 'fixed')){
                        $('.button-suspension').css({'position': 'fixed', 'bottom': bottom});
                　　}else{
                        $('.button-suspension').css({'position': 'fixed', 'bottom': 0});
                    }
                });
            });

        }
    ])
    .controller('AppCtrl', ['$rootScope', '$scope', '$translate', '$localStorage', '$window', '$state', 'getMenu', '$timeout', 'modelService',
        function( $rootScope, $scope, $translate, $localStorage, $window, $state, getMenu, $timeout, modelService ) {
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

            // config
            $scope.app = {
                name: 'undunion',
                version: '1.0.0',
                copyright:'&copy; 2016 橙客',
                color: {
                    primary: '#7266ba',
                    info:    '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger:  '#f05050',
                    light:   '#e8eff0',
                    dark:    '#3a3f51',
                    black:   '#1c2b36'
                },
                settings: {
                    "themeID":"1",
                    "navbarHeaderColor":"bg-black",
                    "navbarCollapseColor":"bg-white-only",
                    "asideColor":"bg-black",
                    "headerFixed":true,
                    "asideFixed":false,
                    "asideFolded":false,
                    "asideDock":false,
                    "container":false
                }
            };

            if ( angular.isDefined($localStorage.settings) ) {
                $scope.app.settings = $localStorage.settings;
            } else {
                $localStorage.settings = $scope.app.settings;
            }
            $scope.$watch('app.settings', function(){
                if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
                    $scope.app.settings.headerFixed = true;
                }
                $localStorage.settings = $scope.app.settings;
            }, true);

            $scope.lang = { isopen: false };
            $scope.langs = {ch:'ch', en:'English'};
            $scope.selectLang =  "ch";
            $scope.setLang = function(langKey, $event) {
                $scope.selectLang = $scope.langs[langKey];
                $translate.use(langKey);
                $scope.lang.isopen = !$scope.lang.isopen;
            };

            function isSmartDevice( $window ){
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }

            //页面刷新重新获取菜单
            if($localStorage.menus&&$localStorage.hasMenu){
                $rootScope.menus = $localStorage.menus
            }
            if($localStorage.showUserName){
                $rootScope.showUserName = $localStorage.showUserName;
            }else{
                $rootScope.showUserName = '用户名';
            }
            /**
             * 退出登录
             */
            $scope.logout = function(){
                //$localStorage.$reset();
                modelService.Alarm('danger', '退出成功', true, 1000);
                $timeout(function(){
                    $state.go('login');
                },500);
            };


        }]);