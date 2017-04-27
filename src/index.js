var ocSDK = require('ordercloud-javascript-sdk');

angular.module('ordercloud-angular-sdk', [
    'ngCookies'
])
    .factory('OrderCloudSDK', OrderCloudService)
;

function OrderCloudService($cookies, $rootScope, $q) {
    var sdk = {},
        authTokenCookieName, impersonationTokenCookieName, refreshTokenCookieName,
        defaultClient = ocSDK.ApiClient.instance,
        oauth2 = defaultClient.authentications['oauth2'];
    
    for(var method in ocSDK) {
        if (ocSDK.hasOwnProperty(method)) {
            sdk[method] = {};
            for (var apiCall in ocSDK[method]) {
                if (ocSDK[method].hasOwnProperty(apiCall)) {
                    sdk[method][apiCall] = (function() {
                        var useMethod = method,
                            useApiCall = apiCall;
                        return function() {
                            var dfd = $q.defer();
                            dfd.resolve(ocSDK[useMethod][useApiCall].apply(ocSDK[useMethod], arguments));
                            return dfd.promise;
                        }
                    })();
                }
            }
        }
    }

    var _config = function(cookiePrefix, apiurl, authurl) {
        authTokenCookieName = cookiePrefix + '.token';
        impersonationTokenCookieName = cookiePrefix + '.impersonation.token';
        refreshTokenCookieName = cookiePrefix + '.refresh.token';
        if (apiurl !== null) {
            ocSDK.ApiClient.instance.baseApiPath = apiurl;
        }
        if (authurl !== null) {
            ocSDK.ApiClient.instance.baseAuthPath = authurl;
        }
        _getToken();
        _getImpersonationToken();
    }

    var _getToken = function() {
        var token = $cookies.get(authTokenCookieName);
        oauth2.accessToken = token;
        return token;
    };

    var _getImpersonationToken = function() {
        var token = $cookies.get(impersonationTokenCookieName);
        oauth2.impersonationToken = token;
        return token;
    };

    var _getRefreshToken = function() {
        var token = $cookies.get(refreshTokenCookieName);
        return token;
    }

    var _setToken = function(token) {
        oauth2.accessToken = token;
        $cookies.put(authTokenCookieName, token);
    };

    var _setImpersonationToken = function(token) {
        oauth2.impersonationToken = token;
        $cookies.put(impersonationTokenCookieName, token);
    };

    var _setRefreshToken = function(token) {
        $cookies.put(refreshTokenCookieName, token);
    }

    sdk.Config = _config;
    sdk.GetToken = _getToken;
    sdk.GetImpersonationToken = _getImpersonationToken;
    sdk.GetRefreshToken = _getRefreshToken;
    sdk.SetToken = _setToken;
    sdk.SetImpersonationToken = _setImpersonationToken;
    sdk.SetRefreshToken = _setRefreshToken;

    //init authentication for page refresh
    _getToken();
    _getImpersonationToken();

    return sdk;
}