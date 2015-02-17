angular-parallax-scroll
=============

Simple parallex effect directives for image content on foreground content scrolling with angular js >= 1.2. ( [Demo]() )

## Install

+ Add this line to your *bower.json* dependencies and run *bower install* afterwards.

>
``` JavaScript
"angular-parallax-scroll": ">= 1.0.0"
```

+ Include the required source file (this path or similar)

>
``` html
<script src="bower_components/dist/angular-parallax-scroll.min.js"></script>
```

+ Inject the `angular.parallaxScroll` module into your app.

>
``` JavaScript
angular.module('app', ['angular.parallaxScroll']);
```

## Usage

#### Module Name (Dependency)

* angular.parallaxScroll

#### Directives

* parallax-scroll

## Attribute Usage
| attribute  | 	Description  | note |
|------------|----------------|---|
| `parallax-scroll="{callbackHandler(event)}"` | **parallax-scroll** is the main directive. `callbackHandler` is to receive data when data is populated. `event` return jQuery Event object |
| `url="Image Url"` | **url** is a required for image tag | default: **Can't not be empty** |
| `parallax-class="className"` | **parallax-class** is a class name to append the parallax div wihch is the outer div of image tag | default: **empty string** |
| `style="styleCSS"` | **style** is a style object of current scope CSS object | default: `{ position: 'relative', overflow: 'hidden', height: '300px', width: '100%', display: 'block' }` |
| `img-class="className"` | **img-class** is a class name of the image tag | default: **empty string** |

## Example

>
```html
<body ng-controller="AppCtrl">
    <h1>Scroll down</h1>
    <div class="container">
        <div parallax-scroll="handler($event)" url="http://stuckincustoms.smugmug.com/Portfolio/i-khJF5DB/0/X3/Trey%20Ratcliff%20-%20China%202011%20-%20A%20Great%20Wall%20at%20Sunset.jpg"
        style="parallaxStyle"
        parallax-class="parallaxClass"
        img-class="CustomImage">
        </div>
    </div>
</body>
```

>
```JavaScript
var app = angular.module('app', [ 'angular.parallaxScroll' ]);
app.controller('AppCtrl', function AppCtrl($scope) {
    $scope.handler = function(event) {
        console.log('callback handler');
    };
    $scope.parallaxStyle = {
        'height': '300px'
    };
});
```

## Copyright & License

Released under the [MIT license](LICENSE.txt).
