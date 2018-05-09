var app = angular.module('app');

app.controller('DashboardController', function ($scope, $rootScope, $location, $mdDialog) {
    $scope.buttons = [
        {
            label: 'Navigation',
            icon: 'globe',
            hidden: false,
            onClick: () => $location.path('navigation')
        },
        {
            label: 'Remote',
            icon: 'mobile-alt',
            isDisabled: () => { return !$scope.remoteDeviceConnected; },
            hidden: false,
            onClick: (ev) => {
                function DialogController ($scope, $mdDialog, message) {
                    $scope.message = message;
                    $scope.onClick = $mdDialog.cancel;

                    $rootScope.$watch('remoteDeviceConnected', (isConnected) => {
                        if (isConnected) { $mdDialog.cancel(); }
                    }, true);
                }

                if (!$scope.remoteDeviceConnected) {
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'main/dashboard/alert.tmpl.html',
                        clickOutsideToClose: true,
                        targetEvent: ev,
                        locals: {
                            message: 'Please Connect MDD'
                        }
                    });
                    return;
                }

                $location.path("remote");
            }
        },
        {
            label: 'Media',
            icon: 'headphones',
            hidden: false,
            onClick: () => $location.path("media")
        },
        {
            label: 'Bluetooth',
            icon: 'bluetooth-b',
            iconStyle: 'fab',
            hidden: false,
            onClick: () => $location.path('settings/bluetooth')
        },
        {
            label: 'Radio',
            icon: 'music',
            hidden: false,
            onClick: () => $location.path('radio')
        },
        {
            label: 'Settings',
            icon: 'cogs',
            hidden: false,
            onClick: () => $location.path("settings")
        },
        {
            label: 'Can',
            icon: 'car',
            hidden: false,
            onClick: () => $location.path('can')
        },
        {
            label: 'Camera',
            icon: 'camera-retro',
            hidden: false,
            onClick: () => $location.path('camera')
        }
    ];

    $scope.columns = $scope.buttons.filter(function (button) { return !button.hidden; }).length > 3 ? 2 : 1;
});
