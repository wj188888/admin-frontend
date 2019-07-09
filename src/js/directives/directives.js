app.directive('resizeHelp', ['$window', function ($window) {
    return {
        restrict:'A',
        scope: false,
        link: function (scope, element) {
            var w = angular.element($window);
            scope.getWindowDimensions = function () {
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            };

            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;
                if (newValue.w < 1235) {
                    scope.show.help = false;
                } else {
                    scope.show.help = true;
                }
            }, true);

            w.bind('resize', function () {
                scope.$apply();
            });
        }
    }
}]);

/*
* 用angularjs的形式兼容ie的placeholder
* */
app.directive('myPlaceholder', ['$compile', function($compile){
    return {
        restrict: 'A',
        scope: {},
        link: function(scope, ele, attr) {
            var input = document.createElement('input');
            var isSupportPlaceholder = 'placeholder' in input;
            if (!isSupportPlaceholder) {
                var fakePlaceholder = angular.element(
                    '<span class="plcaeholder-span">' + attr['placeholder'] + '</span>');
                fakePlaceholder.on('click', function(e){
                    e.stopPropagation();
                    ele.focus();
                });
                ele.before(fakePlaceholder);
                $compile(fakePlaceholder)(scope);
                ele.on('focus', function(){
                    fakePlaceholder.hide();
                }).on('blur', function(){
                    if (ele.val() === '') {
                        fakePlaceholder.show();
                    }
                });
            }
        }
    };
}]);

/*
* 用angularjs的方式写入echarts文件并使用
* */
app.directive('ngEcharts',[function(){
        return {
            link: function(scope,element,attrs,ctrl){
                function refreshChart(){
                    var theme = (scope.config && scope.config.theme)
                        ? scope.config.theme : 'default';
                    var chart = echarts.init(element[0],theme);
                    if(scope.config && scope.config.dataLoaded === false){
                        chart.showLoading();
                    }

                    if(scope.config && scope.config.dataLoaded){
                        chart.setOption(scope.option);
                        chart.resize();
                        chart.hideLoading();
                    }

                    if(scope.config && scope.config.event){
                        if(angular.isArray(scope.config.event)){
                            angular.forEach(scope.config.event,function(value,key){
                                for(var e in value){
                                    chart.on(e,value[e]);
                                }
                            });
                        }
                    }
                };
                //图表的canvas重画
                scope.$watch(
                    function() {
                        refreshChart();
                    }
                );
                //自定义参数 - config
                // event 定义事件
                // theme 主题名称
                // dataLoaded 数据是否加载

                scope.$watch(
                    function () { return scope.config; },
                    function (value) {if (value) {refreshChart();}},
                    true
                );

                //图表原生option
                scope.$watch(
                    function () { return scope.option; },
                    function (value) {if (value) {refreshChart();}},
                    true
                );
            },
            scope:{
                option:'=ecOption',
                config:'=ecConfig'
            },
            restrict:'EA'
        }
    }]);
/*
* 查看大图
* */
app.directive('bigImgComponent', ['$templateCache', function($templateCache) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            img: '=',
            imgShow: '='
        },
        template: $templateCache.get("template/bigImg.html"),
        controller: ['$scope', function($scope) {
            $scope.close = function() {
                $scope.img = '';
                $scope.imgShow = false;
            }
        }]
    }
}])