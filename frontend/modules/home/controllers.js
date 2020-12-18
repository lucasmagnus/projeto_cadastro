'use strict';

angular.module('Home')

    .controller('HomeController',
        ['$scope', 'HomeService', '$rootScope', '$location', '$cookieStore',
            function ($scope, HomeService, $rootScope, $location, $cookieStore) {

                $scope.customers = []
                $scope.getAll = function (refresh = false) {
                    $scope.dataLoading = true;
                    HomeService.getCustomers(function (response) {
                        if (response.status == 401) {
                            if (refresh) {
                                $rootScope.globals = {};
                                $cookieStore.remove('globals');
                                $location.path('/');
                            } else {
                                HomeService.refreshToken(function (response) {
                                    if (response.status == 200) {
                                        $scope.getAll();
                                    } else {
                                        $rootScope.globals = {};
                                        $cookieStore.remove('globals');
                                        $location.path('/');
                                    }
                                });
                            }
                        } else if (response.status == 200) {
                            $scope.customers = response.data;
                        } else {
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                        }
                    });
                };

                $scope.deleteCustomer = function (customer) {
                    $scope.dataLoading = true;
                    HomeService.deleteCustomer(customer, function (response) {
                        if (response.status == 401) {
                            HomeService.refreshToken(function (response) {
                                if (response.status == 200) {
                                    $scope.getAll();
                                } else {
                                    $rootScope.globals = {};
                                    $cookieStore.remove('globals');
                                    $location.path('/');
                                }
                            });

                        } else if (response.status == 200) {
                            $scope.getAll();
                        } else {
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                        }
                    });
                };

                $scope.transformPhones = function (phones) {
                    var result = "";

                    phones.forEach(function (phone) {
                        result = result.length > 0 ? result + ', ' + phone.phone : phone.phone;
                    });

                    return result;
                };

                $scope.transformAdresses = function (adresses) {
                    var result = "";

                    adresses.forEach(function (address) {
                        var aux = address.street + ', nº' + address.number + " " + address.complement + ' - ' +
                            address.district + ' - ' + address.cep + " " + address.city + "/" + address.uf;
                            
                        var aux = address.isPrincipal == '1' ? aux + " (Principal) " : aux

                        result = result.length > 0 ? result + ' | ' + aux : aux;
                    });

                    return result;
                };


                $scope.getAll();

            }]);