angular.module('app').directive('pageData',["httpService","modelService","$state", "$timeout",function(httpService,modelService,$state,$timeout){
    return {
        restrict: 'EA',
        scope: {
            options: '='
        },
        template: " <div class='page-list clearfix'>"
        +" <div style='text-align: center;'>"
        +" <ul class='pagination' ng-show='true'>"
        +"  <li title='{{resultData.number == 0 ?\"已是第一页\":\"到第一页\"}}'  data-ng-click='toStart()'><span>&lt;&lt;</span></li>"
    +"  <li title='{{resultData.number == 0?\"已是第一页\":\"前一页\"}}'  data-ng-click='pre()'><span>&lt;</span></li>"


    +"  <li  data-ng-repeat='item in pageNos' ng-class='{active: item==(resultData.number+1), separate: false}' "
    +" data-ng-click='changeCurrentPage(item-1,$index)'>"
    +"   <span>{{ item }}</span>"
    +" </li>"
    +" <li title='{{ resultData.number == (resultData.totalPages-1)?\"已是最后一页\":\"后一页\"}}'  data-ng-click='next()'><span>&gt;</span></li>"
    +"    <li title='{{ resultData.number == (resultData.totalPages-1)?\"已是最后一页\":\"到最后一页\"}}'  data-ng-click='toEnd()'><span>&gt;&gt;</span></li>"

    +"    </ul>"

    +"   </div>"
    +"   <div class='page-total' ng-if='true' style='text-align: right;'>"
        +"    每页 <select data-ng-model='currentSelect' data-ng-change='changeSelect(currentSelect)' ng-options='option for option in selectLists'>"
    +"   </select>"
    +"    / 共 <strong>{{resultData.totalPages}}页</strong>,<strong>{{ resultData.totalElements }}</strong> 条"
    +"  </div>",
        replace: true,
        link: function($scope, element, attrs){
            // 接口参数处理
            if(!$scope.options.data){
                $scope.options.data = {};
            }
            $scope.options.data.pageNo = 0 ;
            $scope.options.data.pageSize = 10;
            // 页面分页显示
            $scope.selectLists = [10, 15, 20, 30, 50];
            // 默认选中第一个
            $scope.currentSelect = $scope.selectLists[0];

            // 获取数据
            $scope.findPage = function(){
                httpService.http({
                    method: $scope.options.method || 'get',
                    url: $scope.options.url,
                    contentType: 'ajax',
                    data: $scope.options.data
                }).success(function(data){
                    if(data.resultCode == 0){
                        // 所有返回信息
                        $scope.resultData = data.resultData;
                        $scope.options.dataList = $scope.resultData.content;
                        // console.log($scope.options.dataList);
                        // 初始化页面显示
                        $scope.initShow();
                    }else if(data.resultCode == '33'||data.resultCode == '31'||data.resultCode == '32'){
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                        $timeout(function () {
                            $state.go('login');
                        }, 1500);
                    } else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })
            }

            // 刷新数据
            $scope.options.refresh = function(data){
                // 绑定参数
                $scope.options.data = data;
                $scope.options.data.pageNo = 0;
                $scope.options.data.pageSize =  $scope.currentSelect;
                $scope.findPage();
            }
            $scope.findPage();
            $scope.pageNos = [];
            // 初始化页面显示
            $scope.initShow = function(){
                // 如果为5页及其以下 直接生成
                if($scope.resultData.totalPages<=5 || $scope.options.data.pageNo<=2){
                    $scope.pageNos = [];
                    var total = $scope.resultData.totalPages;
                    if($scope.resultData.totalPages>=5){
                        total = 5;
                    }
                    for(var i=1;i<=total;i++){
                        $scope.pageNos.push(i);
                    }
                }else{
                    // 如果大于5页
                    $scope.currentShowPage = $scope.options.data.pageNo+1;
                    //// 页面位置
                    //$scope.index = $scope.currentShowPage%5;
                    // 根据总也数和当前页数 拼接处页面显示素组
                    // 当前页和总页数相差关系
                    $scope.number = $scope.resultData.totalPages - $scope.currentShowPage;
                    $scope.getPageNos();
                }

            }

            // 生成页码  12 34567
            $scope.getPageNos = function(){
                // 判断是否产生新的分页
                if( $scope.index%5==2 ||  $scope.index%5==4){
                    return;
                }
                $scope.pageNos = [];
                // 产生新的分页
                // 完全正常显示
                if($scope.number>3){
                    var start = $scope.currentShowPage-2;
                    var end = $scope.currentShowPage+2;
                    for(var i = start;i<=end;i++ ){
                        $scope.pageNos.push(i);
                    }
                }else{
                    for(var i = $scope.currentShowPage-4+$scope.number;i<=$scope.resultData.totalPages;i++ ){
                        $scope.pageNos.push(i);
                    }
                }

            }

            // 变更下拉选项
            $scope.changeSelect = function(currentSelect){
                $scope.options.data.pageSize =  currentSelect;
                $scope.options.data.pageNo = 0;
                $scope.findPage();
            }

            // 到第一页
            $scope.toStart = function(){
                // 阻止查询
                if($scope.resultData.number == 0){
                    return;
                }
                $scope.options.data.pageNo = 0;
                $scope.findPage();
            }

            // 到最后一页
            $scope.toEnd = function(){
                // 阻止向后翻页
                if($scope.resultData.number == ($scope.resultData.totalPages-1)){
                    return;
                }
                // 获得最后一页的index 位置
                $scope.options.data.pageNo = $scope.resultData.totalPages-1;
                $scope.findPage();
            }

            // 向前翻页
            $scope.pre = function(){
                // 阻止向前翻页
                if($scope.resultData.number == 0){
                    return;
                }
                var index = $scope.getIndex();
                $scope.changeCurrentPage( $scope.options.data.pageNo-1,index);
            }

            // 向后翻页
            $scope.next = function(){
                // 阻止向后翻页
                if($scope.resultData.number == ($scope.resultData.totalPages-1)){
                    return;
                }
                var index = $scope.getIndex();
                $scope.changeCurrentPage( $scope.options.data.pageNo+1,index);
            }

            // 获得当前页序列号
            $scope.getIndex = function(){
                var index =  $scope.pageNos.indexOf($scope.options.data.pageNo);
                return index;
            }

            // 默认为1
            $scope.index = 1;
            // 变更当前页
            $scope.changeCurrentPage = function(item,index) {
                $scope.index = index+1;
                if(   $scope.options.data.pageNo == item){
                    return;
                }
                $scope.options.data.pageNo = item ;
                $scope.findPage();
            };

        }
    };
}]);
