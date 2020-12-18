'use strict';

angular.module('Home')

    .factory('HomeService',
        ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
            function (Base64, $http, $cookieStore, $rootScope, $timeout) {
                var service = {};

                service.getCustomers = function (callback) {

                    var currentUser = $cookieStore.get('globals').currentUser

                    $http({
                        method: 'GET',
                        url: 'http://localhost:8090/customer/',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + currentUser.accessToken,

                        },
                    }).then(function successCallback(response) {

                        if (response.status != 200) {
                            response.message = 'Dados de acesso inválidos!';
                        }

                        callback(response);

                    }, function errorCallback(response) {
                        response.message = 'Erro ao acessar servidor!';
                        callback(response);
                    });
                };

                service.deleteCustomer = function (customer, callback) {

                    var currentUser = $cookieStore.get('globals').currentUser
                    customer.active = 0;

                    $http({
                        method: 'PUT',
                        url: 'http://localhost:8090/customer/',
                        data: customer,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + currentUser.accessToken,

                        },
                    }).then(function successCallback(response) {

                        if (response.status != 200) {
                            response.message = 'Dados de acesso inválidos!';
                        }

                        callback(response);

                    }, function errorCallback(response) {
                        response.message = 'Erro ao acessar servidor!';
                        callback(response);
                    });
                };

                service.refreshToken = function (callback) {
                    var authdata = Base64.encode("client" + ':' + "123")
                    var currentUser = $cookieStore.get('globals').currentUser

                    $http({
                        method: 'POST',
                        url: 'http://localhost:8090/oauth/token',
                        params: { 'grant_type': "refresh_token", 'refresh_token': currentUser.refreshToken},
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Basic ' + authdata,
                        },
                    }).then(function successCallback(response) {
                        callback(response);
                    }, function errorCallback(response) {
                        callback(response);
                    });
                };

                return service;
            }])

    .factory('Base64', function () {

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },

            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };

    });