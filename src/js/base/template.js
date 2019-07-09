angular.module('app').run(['$templateCache', function($templateCache) {
	$templateCache.put('template/bigImg.html', 
		'<div class="big-img" data-ng-click="close()" data-ng-show="imgShow">'+
		'	<div class="img-content">'+
		'		<img ng-src="{{img}}">'+
		'	</div>'+
		'</div>'
	)
}])