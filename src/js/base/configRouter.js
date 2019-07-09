'use strict';

/**
 * 路由配置
 */
angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('login');
            $stateProvider

                /**
                 * 登录
                 */
                .state('login', {
                    url: '/login',
                    templateUrl: 'tpl/base/login.html',
                    controller: 'login',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/base/js/login.js']);
                            }
                        ]
                    }
                })
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'tpl/app.html'
                })
                .state('app.dashboard-v1', {
                    url: '/dashboard-v1',
                    templateUrl: 'tpl/app_dashboard_v1.html'
                })
                .state('app.dashboard-v2', {
                    url: '/dashboard-v2',
                    templateUrl: 'tpl/app_dashboard_v2.html'
                })
                /**
                 * 系统管理
                 */
                .state('app.system', {
                    url: '/system',
                    abstract: true,
                    template: '<div ui-view></div>'
                })
                .state('app.system.menuList', {
                    url: '/menuList',
                    templateUrl: 'tpl/system/html/menuList.html',
                    controller: 'menuList',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/system/js/menuList.js']);
                            }
                        ]
                    }
                })
                .state('app.system.createMenu', {
                    url: '/createMenu/{id}',
                    templateUrl: 'tpl/system/html/createMenu.html',
                    controller: 'createMenu',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/system/js/createMenu.js']);
                            }
                        ]
                    }
                })
                /**
                 * 创建下级菜单
                 */
                .state('app.system.createNextMenu', {
                    url: '/createMenu/{fatherId}',
                    templateUrl: 'tpl/system/html/createMenu.html',
                    controller: 'createMenu',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/system/js/createMenu.js']);
                            }
                        ]
                    }
                })
              /**
               * 店铺认证
               */
                .state('app.shop', {
                    url: '/shop',
                    abstract: true,
                    template: '<div ui-view></div>'
                })
                /**
                 * 店铺认证
                 */
                .state('app.shop.shopVerify', {
                    url: '/shopVerify',
                    templateUrl: 'tpl/shop/html/shopVerify.html',
                     controller: 'shopVerify',
                     resolve: {
                         deps: ['$ocLazyLoad',
                             function ($ocLazyLoad) {
                                 return $ocLazyLoad.load(['tpl/shop/js/shopVerify.js']);
                             }
                         ]
                     }
                })
                //店铺认证申请列表
                .state('app.shop.shopApply', {
                    url: '/shopApply',
                    templateUrl: 'tpl/shop/html/shopApply.html',
                    controller: 'shopApply',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/shop/js/shopApply.js']);
                            }
                        ]
                    }
                })
                //店铺申请列表处理页面
                .state('app.shop.shopApplyHandle', {
                    url: '/shopApplyHandle',
                    templateUrl: 'tpl/shop/html/shopApplyHandle.html',
                    controller: 'shopApplyHandle',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/shop/js/shopApplyHandle.js']);
                            }
                        ]
                    }
                })
                .state('app.shop.shopVerifyHandle', {
                    url: '/shopVerifyHandle',
                    templateUrl: 'tpl/shop/html/shopVerifyHandle.html',
                    controller: 'shopVerifyHandle',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/shop/js/shopVerifyHandle.js']);
                            }
                        ]
                    }
                })
                /**
                 * 客服列表
                 */
                .state('app.shop.customerList', {
                    url: '/customerList',
                    templateUrl: 'tpl/shop/html/customerList.html',
                    controller: 'customerList',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/shop/js/customerList.js']);
                            }
                        ]
                    }
                })
                .state('app.shop.customerDetail', {
                    url: '/customerDetail/{id}',
                    templateUrl: 'tpl/shop/html/customerDetail.html',
                    controller: 'customerDetail',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/shop/js/customerDetail.js']);
                            }
                        ]
                    }
                })
                /**
                 * 车辆认证
                 */
                .state('app.shop.carVerify', {
                    url: '/carVerify',
                    templateUrl: 'tpl/shop/html/carVerify.html',
                    controller: 'carVerify',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/shop/js/carVerify.js']);
                            }
                        ]
                    }
                })

                /**
                 * 车辆-处理
                 */
                .state('app.shop.carVerifyHandle', {
                    url: '/carVerifyHandle',
                    templateUrl: 'tpl/shop/html/carVerifyHandle.html',
                    controller: 'carVerifyHandle',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/shop/js/carVerifyHandle.js']);
                            }
                        ]
                    }
                })

                /**
                 * 银行认证
                 */
                .state('app.shop.bankVerify', {
                    url: '/bankVerify',
                    templateUrl: 'tpl/shop/html/bankVerify.html',
                    controller: 'bankVerify',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/shop/js/bankVerify.js']);
                            }
                        ]
                    }
                })
                //银行认证申请列表
                .state('app.shop.bankApply', {
                    url: '/bankApply',
                    templateUrl: 'tpl/shop/html/bankApply.html',
                    controller: 'bankApply',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/shop/js/bankApply.js']);
                            }
                        ]
                    }
                })
                /**
                 * 汽车认证
                 */
                .state('app.shop.driverVerify', {
                    url: '/driverVerify',
                    templateUrl: 'tpl/shop/html/driverVerify.html',
                    controller: 'driverVerify',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/shop/js/driverVerify.js']);
                            }
                        ]
                    }
                })
                /**
                 * 汽车认证-处理
                 */
                .state('app.shop.driverVerifyHandle', {
                    url: '/driverVerifyHandle',
                    templateUrl: 'tpl/shop/html/driverVerifyHandle.html',
                    controller: 'driverVerifyHandle',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/shop/js/driverVerifyHandle.js']);
                            }
                        ]
                    }
                })
                /**
                 * 代制卡券-处理
                 */
                .state('app.shop.couponVerify', {
                    url: '/couponVerify',
                    templateUrl: 'tpl/shop/html/couponVerify.html',
                    controller: 'couponVerify',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/shop/js/couponVerify.js']);
                            }
                        ]
                    }
                })

                /**
                 * 司机详情
                 */
                .state('app.shop.driverDetail', {
                    url: '/driverDetail',
                    templateUrl: 'tpl/shop/html/driverDetail.html'
                })
                /**
                 * 店铺详情
                 */
                .state('app.shop.shopDetail', {
                    url: '/shopDetail',
                    templateUrl: 'tpl/shop/html/shopDetail.html'
                })
                /**
                 * 车站管理
                 */
                .state('app.stationManage', {
                    url: '/stationManage',
                    abstract: true,
                    template: '<div ui-view></div>'
                })
                /**
                 * 车站列表
                 */
                .state('app.stationManage.stationList', {
                    url: '/stationList',
                    templateUrl: 'tpl/stationManage/html/stationList.html',
                    controller: 'stationList',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/stationManage/js/stationList.js']);
                            }
                        ]
                    }
                })
                /**
                 * 创建车站
                 */
                .state('app.stationManage.createStation', {
                    url: '/createStation/{id}',
                    templateUrl: 'tpl/stationManage/html/createStation.html',
                    controller: 'createStation',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/stationManage/js/createStation.js']);
                            }
                        ]
                    }
                })
                /**
                 * 验票员列表
                 */
                .state('app.stationManage.personList', {
                    url: '/personList',
                    templateUrl: 'tpl/stationManage/html/personList.html',
                    controller: 'personList',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/stationManage/js/personList.js']);
                            }
                        ]
                    }
                })
                /**
                 * 创建账号
                 */
                .state('app.stationManage.createAccount', {
                    url: '/createAccount/{id}',
                    templateUrl: 'tpl/stationManage/html/createAccount.html',
                    controller: 'createAccount',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/stationManage/js/createAccount.js']);
                            }
                        ]
                    }
                })
                /**
                 * 站点列表
                 */
                .state('app.stationManage.siteList', {
                    url: '/siteList',
                    templateUrl: 'tpl/stationManage/html/siteList.html',
                    controller: 'siteList',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/stationManage/js/siteList.js']);
                            }
                        ]
                    }
                })
                /**
                 * 站点审核
                 */
                .state('app.stationManage.siteVerify', {
                    url: '/siteVerify/{id}',
                    templateUrl: 'tpl/stationManage/html/siteVerify.html',
                    controller: 'siteVerify',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/stationManage/js/siteVerify.js']);
                            }
                        ]
                    }
                })
                /**
                 * 车站详情
                 */
                .state('app.stationManage.stationDetail', {
                    url: '/stationDetail/{id}',
                    templateUrl: 'tpl/stationManage/html/stationDetail.html',
                    controller: 'stationDetail',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/stationManage/js/stationDetail.js']);
                            }
                        ]
                    }
                })
                /**
                 * 账号详情
                 */
                .state('app.stationManage.accountDetail', {
                    url: '/accountDetail/{id}',
                    templateUrl: 'tpl/stationManage/html/accountDetail.html',
                    controller: 'accountDetail',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/stationManage/js/accountDetail.js']);
                            }
                        ]
                    }
                })
                /**
                 * APP版本管理
                 */
                .state('app.appManage', {
                    url: '/appManage',
                    abstract: true,
                    template: '<div ui-view></div>'
                })
                /**
                 * 版本列表
                 */
                .state('app.appManage.versionList', {
                    url: '/versionList',
                    templateUrl: 'tpl/appManage/html/versionList.html',
                    controller: 'versionList',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/appManage/js/versionList.js']);
                            }
                        ]
                    }
                })
                /**
                 * 服务上架
                 */
                .state('app.appManage.serviceShelves', {
                    url: '/serviceShelves',
                    templateUrl: 'tpl/appManage/html/serviceShelves.html',
                    controller: 'serviceShelves',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'tpl/modal/js/followUpDetail.js',
                                    'tpl/modal/js/imprint.js'
                                ]).then(function(){
                                    return $ocLazyLoad.load(['tpl/appManage/js/serviceShelves.js']);
                                });
                            }
                        ]
                    }
                })
                /**
                 * 创建版本
                 */
                .state('app.appManage.createVersion', {
                    url: '/createVersion/{id}',
                    templateUrl: 'tpl/appManage/html/createVersion.html',
                    controller: 'createVersion',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/appManage/js/createVersion.js']);
                            }
                        ]
                    }
                })
                /**
                 * 编辑版本
                 */
                .state('app.appManage.editVersion', {
                    url: '/editVersion/{id}',
                    templateUrl: 'tpl/appManage/html/editVersion.html',
                    controller: 'editVersion',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'tpl/modal/js/versionInfo.js'
                                ]).then(function(){
                                    return $ocLazyLoad.load(['tpl/appManage/js/editVersion.js']);
                                });
                            }
                        ]
                    }
                })

           /*     /!**
                 * 后台用户管理
                 *!/
                .state('app.adminUser', {
                    url: '/adminUser',
                    abstract: true,
                    template: '<div ui-view></div>'
                })*/
                /**
                 * 创建用户
                 */
                .state('app.system.createUser', {
                    url: '/createUser/{id}',
                    templateUrl: 'tpl/adminUser/html/createUser.html',
                    controller: 'createUser',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/adminUser/js/createUser.js']);
                            }
                        ]
                    }
                })
                /**
                 * 创建角色
                 */
                .state('app.system.createRole', {
                    url: '/createRole/{id}',
                    templateUrl: 'tpl/adminUser/html/createRole.html',
                    controller: 'createRole',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/adminUser/js/createRole.js']);
                            }
                        ]
                    }
                })
                /**
                 * 用户列表
                 */
                .state('app.system.userList', {
                    url: '/userList',
                    templateUrl: 'tpl/adminUser/html/userList.html',
                    controller: 'userList',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/adminUser/js/userList.js']);
                            }
                        ]
                    }
                })
                /**
                 * 角色列表
                 */
                .state('app.system.roleList', {
                    url: '/roleList',
                    templateUrl: 'tpl/adminUser/html/roleList.html',
                    controller: 'roleList',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/adminUser/js/roleList.js']);
                            }
                        ]
                    }
                })
                /**
                 * 角色详情
                 */
                .state('app.system.roleDetail', {
                    url: '/roleDetail/{id}',
                    templateUrl: 'tpl/adminUser/html/roleDetail.html',
                    controller: 'roleDetail',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/adminUser/js/roleDetail.js']);
                            }
                        ]
                    }
                })

                /**
                 * 后台设置
                 */
                .state('app.adminSet', {
                    url: '/adminSet',
                    abstract: true,
                    template: '<div ui-view></div>'
                })
                /**
                 * 标签列表
                 */
                .state('app.adminSet.labelList', {
                    url: '/labelList',
                    templateUrl: 'tpl/adminSet/html/labelList.html',
                    controller: 'labelList',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/adminSet/js/labelList.js']);
                            }
                        ]
                    }
                })
                /**
                 * 创建驳回理由标签
                 */
                .state('app.adminSet.createLabel', {
                    url: '/createLabel',
                    templateUrl: 'tpl/adminSet/html/createLabel.html',
                    controller: 'createLabel',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/adminSet/js/createLabel.js']);
                            }
                        ]
                    }
                })
                /**
                 * 品牌约车计费标准
                 */
                .state('app.adminSet.brandCar', {
                    url: '/brandCar',
                    templateUrl: 'tpl/adminSet/html/brandCar.html',
                    controller: 'brandCar',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/adminSet/js/brandCar.js']);
                            }
                        ]
                    }
                })
                .state('app.adminSet.addRule', {
                    url: '/addRule/{id}',
                    templateUrl: 'tpl/adminSet/html/addRule.html',
                    controller: 'addRule',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/adminSet/js/addRule.js']);
                            }
                        ]
                    }
                })
                /**
                 * 资产
                 */
                .state('app.assetManage', {
                    url: '/assetManage',
                    abstract: true,
                    template: '<div ui-view></div>'
                })
                /**
                 * 提现管理
                 */
                .state('app.assetManage.drawList', {
                    url: '/drawList',
                    templateUrl: 'tpl/assetManage/html/drawList.html',
                    controller: 'drawList',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/assetManage/js/drawList.js']);
                            }
                        ]
                    }
                })
                /**
                 * 发票概况
                 */
                .state('app.assetManage.ticketGeneral', {
                    url: '/ticketGeneral',
                    templateUrl: 'tpl/assetManage/html/ticketGeneral.html',
                    controller: 'ticketGeneral',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/assetManage/js/ticketGeneral.js']);
                            }
                        ]
                    }
                })
                /**
                 * 支付渠道
                 */
                .state('app.assetManage.payChannel', {
                    url: '/payChannel',
                    templateUrl: 'tpl/assetManage/html/payChannel.html',
                    controller: 'payChannel',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/assetManage/js/payChannel.js']);
                            }
                        ]
                    }
                })
                /**
                 * 支付渠道详情
                 */
                .state('app.assetManage.payChannelDetail', {
                    url: '/payChannelDetail/{id}',
                    templateUrl: 'tpl/assetManage/html/payChannelDetail.html',
                    controller: 'payChannelDetail',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'tpl/modal/js/paySure.js'
                                ]).then(function(){
                                    return $ocLazyLoad.load(['tpl/assetManage/js/payChannelDetail.js']);
                                });
                            }
                        ]
                    }
                })
                /**
                 * 计费管理
                 */
                .state('app.assetManage.feeManage', {
                    url: '/feeManage',
                    templateUrl: 'tpl/assetManage/html/feeManage.html',
                    controller: 'feeManage',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/assetManage/js/feeManage.js']);
                            }
                        ]
                    }
                })
                /**
                 * 查看计费管理详情
                 */
                .state('app.assetManage.feeManageDetail', {
                    url: '/feeManageDetail/{id}',
                    templateUrl: 'tpl/assetManage/html/feeManageDetail.html',
                    controller: 'feeManageDetail',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/assetManage/js/feeManageDetail.js']);
                            }
                        ]
                    }
                })
                /**
                 * 新增计费规则第一步
                 */
                .state('app.assetManage.addNewFee', {
                    url: '/addNewFee',
                    templateUrl: 'tpl/assetManage/html/addNewFee.html',
                    controller: 'addNewFee',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/qiniu/js/plupload.full.min.js',
                                    'js/qiniu/js/ui.js',
                                    'js/qiniu/js/qiniu.js',
                                    'js/qiniu/js/highlight.js'
                                ]).then(function(){
                                    return $ocLazyLoad.load('tpl/assetManage/js/addNewFee.js');
                                });
                            }
                        ]
                    }
                })
                /**
                 * 新增计费规则第二步
                 */
                .state('app.assetManage.addNewFeeTwo', {
                    url: '/addNewFeeTwo',
                    templateUrl: 'tpl/assetManage/html/addNewFeeTwo.html',
                    controller: 'addNewFeeTwo',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/assetManage/js/addNewFeeTwo.js']);
                            }
                        ]
                    }
                })
                /**
                 * 默认计费
                 */
                .state('app.assetManage.addDefaultFee', {
                    url: '/addDefaultFee',
                    templateUrl: 'tpl/assetManage/html/addDefaultFee.html',
                    controller: 'addDefaultFee',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/assetManage/js/addDefaultFee.js']);
                            }
                        ]
                    }
                })
                /**
                 * 编辑默认计费
                 */
                .state('app.assetManage.editDefaultFee', {
                    url: '/editDefaultFee',
                    templateUrl: 'tpl/assetManage/html/editDefaultFee.html',
                    controller: 'editDefaultFee',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/assetManage/js/editDefaultFee.js']);
                            }
                        ]
                    }
                })
                /**
                 * 编辑规则第一步通过id
                 */
                .state('app.assetManage.addNewFeeEdit', {
                    url: '/addNewFeeEdit/{id}',
                    templateUrl: 'tpl/assetManage/html/addNewFeeEdit.html',
                    controller: 'addNewFeeEdit',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'js/qiniu/js/plupload.full.min.js',
                                    'js/qiniu/js/ui.js',
                                    'js/qiniu/js/qiniu.js',
                                    'js/qiniu/js/highlight.js'
                                ]).then(function(){
                                    return $ocLazyLoad.load('tpl/assetManage/js/addNewFeeEdit.js');
                                });
                            }
                        ]
                    }
                })
                /**
                 * 编辑规则第二步通过id
                 */
                .state('app.assetManage.addNewFeeTwoEdit', {
                    url: '/addNewFeeTwoEdit',
                    templateUrl: 'tpl/assetManage/html/addNewFeeTwoEdit.html',
                    controller: 'addNewFeeTwoEdit',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/assetManage/js/addNewFeeTwoEdit.js']);
                            }
                        ]
                    }
                })
                /**
                 * 编辑规则第二步通过id（默认规则）
                 */
                .state('app.assetManage.addDefaultFeeEdit', {
                    url: '/addDefaultFeeEdit',
                    templateUrl: 'tpl/assetManage/html/addDefaultFeeEdit.html',
                    controller: 'addDefaultFeeEdit',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/assetManage/js/addDefaultFeeEdit.js']);
                            }
                        ]
                    }
                })
                /**
                 * 对外开票开票申请列表
                 */
                .state('app.assetManage.makeInvoiceList', {
                    url: '/makeInvoiceList',
                    templateUrl: 'tpl/assetManage/html/makeInvoiceList.html',
                    controller: 'makeInvoiceList',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'tpl/modal/js/ticketDetail.js'
                                ]).then(function(){
                                    return $ocLazyLoad.load(['tpl/assetManage/js/makeInvoiceList.js']);
                                });
                            }
                        ]
                    }
                })
                /**
                 * 对外开票开票记录列表
                 */
                .state('app.assetManage.makeInvoiceRecord', {
                    url: '/makeInvoiceRecord',
                    templateUrl: 'tpl/assetManage/html/makeInvoiceRecord.html',
                    controller: 'makeInvoiceRecord',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/assetManage/js/makeInvoiceRecord.js']);
                            }
                        ]
                    }
                })
                /**
                 * 对账单
                 */
                .state('app.assetManage.accountDetail', {
                    url: '/accountDetail',
                    templateUrl: 'tpl/assetManage/html/accountDetail.html',
                    controller: 'accountDetail',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['tpl/assetManage/js/accountDetail.js']);
                            }
                        ]
                    }
                })

        }
    ]);
