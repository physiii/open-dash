(function(){
    var ngDragEventDirectives = {};

    angular.forEach(
        'drag dragend dragenter dragexit dragleave dragover dragstart drop'.split(' '),
        function(eventName) {
            var directiveName = 'ng' + eventName.charAt(0).toUpperCase() + eventName.slice(1);

            ngDragEventDirectives[directiveName] = ['$parse', '$rootScope', function($parse, $rootScope) {
                return {
                    restrict: 'A',
                    compile: function($element, attr) {
                        var fn = $parse(attr[directiveName], null, true);

                        return function ngDragEventHandler(scope, element) {
                            element.on(eventName, function(event) {
                                var callback = function() {
                                    fn(scope, {$event: event});
                                };

                                scope.$apply(callback);
                            });
                        };
                    }
                };
            }];
        }
    );

    angular
        .module('ngDrag', [])
        .directive(ngDragEventDirectives);
}());