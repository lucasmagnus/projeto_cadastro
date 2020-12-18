'use strict';

angular.module('Authentication')

    .controller('LoginController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService',
            function ($scope, $rootScope, $location, AuthenticationService) {
                AuthenticationService.ClearCredentials();

                $scope.login = function () {
                    $scope.dataLoading = true;
                    AuthenticationService.Login($scope.email, $scope.password, function (response) {
                        if (response.status == 200) {
                            AuthenticationService.SetCredentials($scope.email, response.data);
                            $location.path('/');
                        } else {
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                        }
                    });
                };

                $scope.register = function () {
                    $scope.dataLoading = true;
                    AuthenticationService.Register($scope.email, $scope.password, function (response) {
                        if (response.status == 200) {
                            AuthenticationService.Login($scope.email, $scope.password, function (response) {
                                if (response.status == 200) {
                                    AuthenticationService.SetCredentials($scope.email, response.data);
                                    $location.path('/');
                                } else {
                                    $scope.error = response.message;
                                    $scope.dataLoading = false;
                                }
                            });
                        } else {
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                        }
                    });
                };
            }]);