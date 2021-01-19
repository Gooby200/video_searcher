'use strict';

(function(angular){

  var _template =  'app/components/file/file.html';

  var app = angular.module('file', []);
  
  app.component('file',{
      bindings: {
        data: '='
      },
      templateUrl: _template,
      controller: FileController,
      controllerAs: 'c'
    });
  
  
  function FileController($scope){
    var self = this;
    
    self.$onInit = init;
    
    function init(){
        $scope.file = self.data;
    }

    //convert first letter to upper case and reset to lower
    $scope.titleCase = function(input) {
      if (input) {
        let ret = input.split('');
        if (input.length > 0)
          ret[0] = ret[0].toUpperCase();
          if (input.length > 1)
            for (let i = 1; i < input.length; i++)
              ret[i] = ret[i].toLowerCase();
        return ret.join('');
      }
      return input;
    };
  }
  
})(window.angular);