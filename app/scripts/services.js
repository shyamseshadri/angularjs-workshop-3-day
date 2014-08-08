angular.module('stockMarketApp')
  .factory('TodoService', [function() {
    var list = [
      {author: 'Me', label: 'Hello', completed: false, id: 1},
      {author: 'Shyam', label: 'Second', completed: true, id: 2},
      {author: 'Someone Else', label: 'Last', completed: false, id: 3}
    ];
    var index = 4;
    return {
      get: function() {
        return list;
      },
      add: function(todo) {
        todo.id = index;
        index++;
        list.push(todo);
        list = angular.copy(list);
      },
      remove: function(index) {
        list.splice(index, 1);
      }
    };
  }]);
