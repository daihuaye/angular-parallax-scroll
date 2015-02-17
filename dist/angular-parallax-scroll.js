(function(window, angular, undefined) {
    'use strict';

    angular
        .module('angular.parallaxScroll', [])
        .factory('angular.parallaxScroll.service', parallaxService)
        .directive('parallaxScroll', parallaxScroll);

    parallaxService.$inject = ['$window'];
    parallaxScroll.$inject = ['angular.parallaxScroll.service', '$parse'];

    function parallaxService($window) {
        var service = {
            bind: bind
        };

        return service;

        /////////////

        function bind(element, eventHandlers) {
            $(element).find('img').one('load', function() {
                updateParallax(element, eventHandlers, true);
            });

            $($window).on('scroll.parallax, resize.parallax', function() {
                updateParallax(element.find('div'), eventHandlers, false);
            });
        }

        function updateParallax(el, eventHandlers, initial) {
            var windowWidth = angular.element($window).attr('width'),
                $el = $(el),
                containerHeight = getContainerHeight($el, windowWidth),
                imgHeight = $el.find('img').height(),
                parallaxDist = imgHeight - containerHeight,
                top = $el.offset().top,
                bottom = top + containerHeight,
                scrollTop = $($window).scrollTop(),
                windowHeight = $window.innerHeight,
                windowBottom = scrollTop + windowHeight,
                percentScrolled =  (windowBottom - top) / (containerHeight + windowHeight),
                parallax = -1 * parallaxDist * percentScrolled;

            if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
                var translatePos = 'translate(0px,' + parallax + 'px)';
                $el.find('img').css({
                    'transform': translatePos,
                    '-webkit-transform': translatePos,
                    '-ms-transform': translatePos,
                    '-moz-transform': translatePos
                });
            }
            if (initial) {
                $el.find('img').css('display', 'block');
            }

            eventHandlers['scroll'] && eventHandlers['scroll'](event);
        }

        function getContainerHeight(el, windowWidth) {
            var height = el.height(),
                containerHeight;
            if (windowWidth < 992) {
                containerHeight = (height > 0) ? height : el.find('img').height();
            } else {
                containerHeight = (height > 0) ? height : 500;
            }
            return containerHeight;
        }
    }

    function parallaxScroll(parallaxService, $parse) {
        var directive = {
            link: link
        };

        return directive;

        ///////////

        function link(scope, element, attr) {
            var parallaxHandler = $parse(attr['parallaxScroll']),
                cssStyle = $parse(attr['style']),
                divClass = attr['parallaxClass'] || '',
                imgClass = attr['imgClass'] || '',
                imgDiv = '<div class="parallax"><img src= "' + attr['url'] + '" /></div>"',
                parallaxCss = {
                    'position': 'absolute',
                    'top': 0,
                    'left': 0,
                    'right': 0,
                    'bottom': 0,
                    'z-index': -1
                },
                defaultCSS = {
                    position: 'relative',
                    overflow: 'hidden',
                    height: '300px',
                    width: '100%',
                    display: 'block'
                },
                css = angular.extend({}, defaultCSS, cssStyle(scope));
            element
                .css(css)
                .append(imgDiv)
                .children()
                .addClass(divClass)
                .css(parallaxCss)
                .find('img')
                .css({'position': 'absolute', 'width': '100%' })
                .addClass(imgClass);

            parallaxService.bind(element, {
                'scroll': function(event) {
                    scope.$apply(function() {
                        parallaxHandler(scope, { $event: event });
                    });
                }
            });
        }
    }


})(window, window.angular);