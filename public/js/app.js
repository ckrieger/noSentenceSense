angular.module('sampleApp', [ 'ngClipboard','ngRoute','ngTouch', 'appRoutes', 'MainCtrl', 'SentenceCtrl','UserCtrl', 'TopFiveCtrl', 'HeaderCtrl','ModalCtrl', 'MainService']).config(['ngClipProvider', function(ngClipProvider) {
    ngClipProvider.setPath("//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.swf");
  }]);;