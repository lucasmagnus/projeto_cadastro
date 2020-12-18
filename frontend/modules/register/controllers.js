'use strict';

angular.module('Register')

    .controller('RegisterController',
        ['$scope', 'RegisterService', '$rootScope', '$location', '$cookieStore',
            function ($scope, RegisterService, $rootScope, $location, $cookieStore) {

                $scope.customer = {}
                $scope.customer = {
                    phones: [],
                    adresses: []
                }

                $scope.addPhone = function (phone) {
                    if (!phone || phone.length < 6) {
                        $scope.error_phone = "Telefone inválido!";
                    } else {
                        $scope.error_phone = undefined;
                        $scope.customer.phones.push({ "phone": angular.copy(phone) });
                        delete $scope.phone
                    }
                }

                $scope.removePhone = function (phone) {
                    const index = $scope.customer.phones.indexOf(phone)
                    if (index > -1) {
                        $scope.customer.phones.splice(index, 1);
                    }
                }

                $scope.addAddress = function (address) {

                    if (!address || address.street.length < 1) {
                        $scope.error_address = "Informe o logradouro!";
                    } else if (!address.number || address.number.length < 1) {
                        $scope.error_address = "Informe o número!";
                    } else if (!address.district || address.district.length < 1) {
                        $scope.error_address = "Informe o bairro!";
                    } else if (!address.cep || address.cep.length < 5) {
                        $scope.error_address = "Informe o CEP!";
                    } else if (!address.city || address.city.length < 2) {
                        $scope.error_address = "Informe a cidade!";
                    } else if (!address.uf || address.uf.length < 2) {
                        $scope.error_address = "Informe a UF!";
                    } else {

                        if (!address.isPrincipal) {
                            address.isPrincipal = 0
                        } else if (address.isPrincipal) {
                            $scope.customer.adresses.forEach(function (item, i) {
                                item.isPrincipal = 0;
                            })

                            address.isPrincipal = 1
                        }

                        $scope.error_address = undefined;
                        $scope.customer.adresses.push(angular.copy(address));
                        delete $scope.address
                    }

                }

                $scope.removeAddress = function (address) {
                    const index = $scope.customer.adresses.indexOf(address)
                    if (index > -1) {
                        $scope.customer.adresses.splice(index, 1);
                    }
                }

                $scope.save = function (refresh = false) {
                    $scope.message_save = undefined;

                    if (!$scope.customer.name || $scope.customer.name.length < 3) {
                        $scope.message_save_error = "Informe um nome válido!";
                    } else if (!$scope.customer.cnpjCpf || $scope.customer.cnpjCpf.length < 11) {
                        $scope.message_save_error = undefined;
                        $scope.message_save_error = "Informe um CPF ou CNPJ válido!";
                    } else {

                        $scope.dataLoading = true;
                        RegisterService.saveCustomer($scope.customer, function (response) {
                            if (response.status == 401) {
                                if (refresh) {
                                    $rootScope.globals = {};
                                    $cookieStore.remove('globals');
                                    $location.path('/');
                                } else {
                                    RegisterService.refreshToken(function (response) {
                                        if (response.status == 200) {
                                            $scope.save(true)
                                        } else {
                                            $rootScope.globals = {};
                                            $cookieStore.remove('globals');
                                            $location.path('/');
                                        }
                                    });
                                }
                            } else if (response.status == 200) {
                                console.log("Salvo com sucesso!")
                                $scope.message_save = "Salvo com sucesso!";
                                $scope.message_save_error = undefined;
                            } else {
                                $scope.message_save_error = response.message;
                                $scope.dataLoading = false;
                            }
                        });
                    }
                };
            }]);