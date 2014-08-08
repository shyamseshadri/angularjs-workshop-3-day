angular.module('stockMarketApp')
  .controller('ListCtrl', ['TodoService', function(TodoService) {
  var self = this;

    self.getTodos = TodoService.get;
    self.remove = TodoService.remove;

}])
  .controller('AddCtrl', ['TodoService',
    function(TodoService) {
  var self = this;

      self.todo = {
        author: 'Shyam',
        label: '',
        completed: false
      };
  self.add = function() {
    TodoService.add(self.todo);
    self.todo = {
      author: 'Shyam',
      label: '',
      completed: false
    };
  };
}]);

