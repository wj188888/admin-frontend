angular.module('app')
    .service('version',['httpService', function(httpService) {
        // 创建版本
        this.createVersion =  function(data){
            return httpService.http({
                method: 'post',
                url: '/appVersion/create',
                data:data
            });
        };
        // 编辑版本
        this.editVersion =  function(id,data){
            return httpService.http({
                method: 'post',
                url: '/appVersion/'+ id + '/edit',
                data:data
            });
        };
        // 根据id查询版本详情
        this.searchDetailById =  function(id){
            return httpService.http({
                method: 'get',
                url: '/appVersion/' + id
            });
        };
        //跟进
        this.followingAppReleaseInfo =  function(data){
            return httpService.http({
                method: 'post',
                contentType: 'ajax',
                url: '/appReleaseInfo/following',
                data:data
            });
        };
        //历史版本
        this.findAppVersionHis =  function(data){
            return httpService.http({
                method: 'get',
                url: '/appVersionHis/find',
                data:data
            });
        };
        //历史版本信息
        this.appVersionHisInfo =  function(id,data){
            return httpService.http({
                method: 'get',
                url: '/appVersionHis/' + id,
                data:data
            });
        };
        //历史版本信息删除
        this.deleteAppVersionHis =  function(id){
            return httpService.http({
                method: 'post',
                url: '/appVersionHis/' + id + '/delete'
            });
        };
        //获取可添加的app类型
        this.getNewAppTypeAppVersion =  function(data){
            return httpService.http({
                method: 'get',
                url: '/appVersion/getNewAppType',
                data:data
            });
        };
        //修改开关状态
        this.changeSwitchAppVersion =  function(data){
            return httpService.http({
                method: 'post',
                url: '/appVersion/changeSwitch',
                data:data,
                contentType: 'ajax'
            });
        };


    }]);
