# DEPRECATED AND ARCHIVED!
> The OrderCloud team is re-focusing efforts on improving the [OrderCloud Javascript SDK](https://github.com/ordercloud-api/ordercloud-javascript-sdk) and moving away from a framework-specific SDK approach for Angular implementations. Application developers are urged to migrate their production Angular applications to the OrderCloud Javascript SDK during their next phase of new development, as this repository and corresponding npm package [`ordercloud-angular-sdk`](https://www.npmjs.com/package/ordercloud-angular-sdk) will no longer be maintained with the latest [OrderCloud API releases](https://ordercloud.io/release-notes).

# OrderCloud Angular 1.xx SDK

This Angular 1.xx SDK is a wrapper for the [OrderCloud Javascript SDK](https://github.com/ordercloud-api/OrderCloud-JavaScript-SDK) which is auto-generated from our [Swagger Spec](https://raw.githubusercontent.com/ordercloud-api/swagger/master/ordercloud_swagger.json)

### Getting Started

If you're new to ordercloud check out our [documentation](https://developer.ordercloud.io/documentation).

Additional SDK specific documentation can be found [here](https://developer.ordercloud.io/documentation/frameworks-and-sdks)

### Installation

1. Type the following into a terminal window:

```shell
bower install ordercloud-angular-sdk --save
```

2. include the ordercloud-angular-sdk module as a dependency:

```javascript
angular.module('YOUR_MODULE', ['ordercloud-angular-sdk'])
```

### Configuration

The SDK exposes `OrderCloudSDK.Config` to configure settings required to run. It receives the following parameters:
1. cookiePrefix // this determines what to prefix cookies as when saving them.
2. apiUrl // ordercloud.io base api url followed by the api version number (currently v1)
3. authurl // ordercloud.io base auth url

We recommend setting these in a run block like so:

```javascript
angular.module('YOUR_MODULE', ['ordercloud-javascript-sdk'])
    .run(function(OrderCloudSDK){
        var cookiePrefix = 'COOKIE_PREFIX_EXAMPLE'; // this can be any string - in the starter app we use the appname
        var apiVersion = 'v1'; //there is currently only one version of the API
        var apiurl = 'https://api.ordercloud.io'
        var authurl = 'https://auth.ordercloud.io'

        OrderCloudSDK.Config(cookiePrefix, apiurl + '/' + apiVersion, authurl);
    })
```

### Additional SDK Methods

In addition to the standard methods provided via the Javascript SDK, the following methods are added
to allow you to interact with tokens (stored in cookies) for a user as well as an impersonated user.


```javascript
OrderCloudSDK.GetToken();
OrderCloudSDK.SetToken(tokenToSet);
OrderCloudSDK.RemoveToken();

OrderCloudSDK.GetRefreshToken();
OrderCloudSDK.SetRefreshToken(tokenToSet);

OrderCloudSDK.GetImpersonationToken();
OrderCloudSDK.SetImpersonationToken(tokenToSet);
OrderCloudSDK.RemoveImpersonationToken();
```


### Example

The following example will show you how to:
1. log in as a user
2. set the user's token in cookies
3. make an API call to retrieve user's details

```javascript

var username = 'user123';
var password = 'foobar'
var clientid = '7FC87166-D42A-4F2D-9587-159D98156314' //you can find your app's client id in the [dashboard](https://developer.ordercloud.io/dashboard/applications)
var scope = ['FullAccess']; //this is an array of roles (permissions) being requested. More info on roles [here](https://developer.ordercloud.io/documentation/platform-guides/authentication/security-profiles)


OrderCloudSDK.Auth.Login(username, password, clientid, scope)
    .then(function(response){
        var token = response['access_token'];
        OrderCloudSDK.SetToken(token); //this token is now stored in browser cookies and will be used on any subsequent API call
        OrderCloudSDK.Me.Get()
            .then(function(currentUser){
                console.log('This user's name is ' + currentUser.FirstName + ' ' + currentUser.LastName);
            })
    })
```

### Additional Information

Be sure to check out our [API documentation](https://developer.ordercloud.io/documentation).

Additional SDK specific documentation can be found [here](https://developer.ordercloud.io/documentation/frameworks-and-sdks)
