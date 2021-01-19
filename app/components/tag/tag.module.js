'use strict';

(function(angular){

  var _template =  'app/components/tag/tag.html';

  var app = angular.module('tag', []);
  
  app.component('tag',{
      bindings: {
        data: '=',
        eraseable: '='
      },
      templateUrl: _template,
      controller: TagController,
      controllerAs: 'c'
  });
  
  
  function TagController($scope){
    var self = this;
    
    self.$onInit = init;
    
    function init(){
      $scope.tag = self.data;
      $scope.eraseable = self.eraseable;
    }   
    
    $scope.remove = function() {
      //here we should probably call the app controller to remove the tag from the file
      //but we need to collect the file within the bindings first in order to send that out
      alert('remove tag ' + $scope.tag + ' from this file.');
    }
  }
  
})(window.angular);