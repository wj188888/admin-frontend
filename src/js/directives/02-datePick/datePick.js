/**
 * @description : 日期工具类(用于页面日期选择)
 * @date 2016-9-14 14:23:33
 * @author liaohao
 */
angular.module('app').directive('datePick',['$timeout', 'datePickerService', function($timeout, datePickerService){
    return {
        restrict: 'A',
        require:'?ngModel',
        link: function($scope, element, attrs, model){
            $timeout(function() {
                var pickType = 0;
                var id = '#'+attrs.id;
                if(attrs.format == 'YYYY-MM-DD hh:mm:ss') {
                    pickType = 0;
                } else if(attrs.format == 'YYYY-MM-DD') {
                    pickType = 1;
                } else if(attrs.format == 'hh:mm') {
                    pickType = 2;
                }
                datePickerService.setConfig(id, pickType);
                if(pickType == 1) {
                    if(attrs.mindatelimit == 'true') {
                        $(id).datepicker( "option", "minDate", " " );
                    }
                    if(attrs.maxdatelimit == 'true') {
                        $(id).datepicker( "option", "maxDate", " " );
                    }
                } else if(pickType == 0) {
                    if(attrs.mindatelimit == 'true') {
                        $(id).datetimepicker( "option", "minDate", " " );
                    }
                    if(attrs.maxdatelimit == 'true') {
                        $(id).datetimepicker( "option", "maxDate", " " );
                    }
                }

            },0)
        }
    };
}]);
