/**
 * 懒加载
 */
angular.module('app')
    .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
            app.controller = $controllerProvider.register;
            app.directive  = $compileProvider.directive;
            app.filter     = $filterProvider.register;
            app.factory    = $provide.factory;
            app.service    = $provide.service;
            app.constant   = $provide.constant;
            app.value      = $provide.value;
        }
    ])
    .config(['$translateProvider',
        function($translateProvider){
            $translateProvider.useStaticFilesLoader({
                prefix: 'l10n/',
                suffix: '.js'
            });
            $translateProvider.preferredLanguage('ch');
        }
    ]);