/**
 * Created by Administrator on 2016/10/17.
 */
angular.module('app')
    .service('station',['httpService', function(httpService) {
        // 根据车站归属
        this.findStationList =  function(data){
            return httpService.http({
                method: 'post',
                url: '/station/find',
                data:data
            });
        };
        // 判断车站是否存在
        this.isNameExit =  function(data){
            return httpService.http({
                method: 'post',
                url: '/station/nameExist',
                data:data
            });
        };
        // 根据id查询车站详情
        this.findStationById =  function(id){
            return httpService.http({
                method: 'get',
                url: '/station/' + id,
                contentType: 'ajax'
            });
        };
        //冻结车站
        this.freezeStationPort =  function(id){
            return httpService.http({
                method: 'post',
                url: '/station/' + id + '/freeze',
                contentType: 'ajax'
            });
        };
        //启用车站
        this.enableStationPort =  function(id){
            return httpService.http({
                method: 'post',
                url: '/station/' + id + '/enable',
                contentType: 'ajax'
            });
        };
        // 创建车站
        this.createStationPort =  function(data){
            return httpService.http({
                method: 'post',
                url: '/station/create',
                data:data
            });
        };
        // 根据id编辑车站
        this.editStationById =  function(id,data){
            return httpService.http({
                method: 'post',
                url: '/station/' + id +'/edit',
                data:data
            });
        };

        //创建账号
        this.createAccountPort =  function(data){
            return httpService.http({
                method: 'post',
                url: '/stationUser/create',
                contentType: 'ajax',
                data:data
            });
        };

        //编辑账号
        this.editAccountById =  function(id,data){
            return httpService.http({
                method: 'post',
                url: '/stationUser/'+ id + '/edit',
                data:data
            });
        };
        // 根据id查询账号详情
        this.findAccountById =  function(id){
            return httpService.http({
                method: 'get',
                url: '/stationUser/' + id,
                contentType: 'ajax'
            });
        };
        // 判断用户是否存在
        this.isUserExit =  function(data){
            return httpService.http({
                method: 'post',
                url: '/stationUser/usernameExist',
                contentType: 'ajax',
                data:data
            });
        };
        // 启用用户
        this.enableUser =  function(id){
            return httpService.http({
                method: 'post',
                url: '/stationUser/' + id + '/enable',
                contentType: 'ajax'
            });
        };
        // 禁用用户
        this.freezeUser =  function(id){
            return httpService.http({
                method: 'post',
                url: '/stationUser/' + id + '/freeze',
                contentType: 'ajax'
            });
        };
        // 用户重置密码
        this.resetPassword =  function(id,data){
            return httpService.http({
                method: 'post',
                url: '/stationUser/' + id + '/resetPassword',
                contentType: 'ajax',
                data:data
            });
        };
        //查询所有平台
        this.findAllPlats =  function(){
            return httpService.http({
                method: 'get',
                url: '/store/findAll'
            });
        };
        //查询所有平台
        this.getSiteData =  function(id){
            return httpService.http({
                method: 'get',
                url: '/site/' + id
            });
        };
        // 站点审核
        this.siteQualification =  function(data){
            return httpService.http({
                method: 'post',
                url: '/site/qualification',
                contentType: 'ajax',
                data:data
            });
        };
    }]);