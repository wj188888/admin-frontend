/**
 * webServer
 */
var app = angular.module('app')
    .constant('CONFIG', {
        // webServer: 'http://10.50.50.219:8080/orange-admin',
        // webServer: 'http://10.50.50.218:8080',

        webServer: 'http://182.150.25.23:8080/orange-admin',
        // webServer: 'http://stg-admin.undunion.com/orange-admin',
        webServerExtra: 'http://10.50.50.224:8080/orange-firm',
        serverAnonymous:'/a',
        imgServer: 'http://www.qiniu.com'
    });