angular.module('app')
.directive('ztree', function () {
    return {
        restrict: 'AE',
        require: '?ngModel',
        scope: {
            ztreeConfig: '='
        },
        link: function ($scope, element) {
            var setting = {
                check: {
                    enable: true,
                    //chkboxType: {
                    //    "Y": "",
                    //    "N": ""
                    //}
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onCheck: function (event, treeId, treeNode, clickFlag) {
                        var zTree = $.fn.zTree.getZTreeObj("ztree"),
                            nodes = zTree.getCheckedNodes(true);
                        $scope.ztreeConfig.menuList = [];
                        for (var i = 0; i < nodes.length; i++) {
                            $scope.ztreeConfig.menuList.push(nodes[i].id)
                        }
                    }
                }
            };

            function addMenu(list) {
                $scope.ztreeConfig.addResource.then(function( res ) {
                    if( res.data.resultCode == 0 ){
                        var zNodes = [];
                        angular.forEach(res.data.resultData, function(value, key){
                            var temp = {};
                            if(list && list.length > 0){
                                angular.forEach(list, function(value1, key1){
                                    if(value.id == value1){
                                        temp.checked=true;
                                    }
                                })
                            }
                            temp.id = value.id;
                            temp.pId = value.fatherId || 0;
                            temp.name = value.menu_name;
                            temp.open = true;
                            zNodes.push(temp);
                        });
                        $.fn.zTree.init(element, setting, zNodes);
                    }
                }, function( res ) {
                    console.log( res.data.resultMsg );
                });
            }

            if($scope.ztreeConfig.editResource){
                $scope.ztreeConfig.editResource.success(function (data) {
                    if (data.resultCode == '0') {
                        addMenu(data.resultData.menuId);
                    } else {
                        console.log( res.data.resultMsg );
                    }
                })
            }else{
                addMenu()
            }
        }
    };
});
