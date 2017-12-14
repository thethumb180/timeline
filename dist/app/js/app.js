(function ($) {

    browserWidth = (function () {
        if ($(window).width()) {
            return $(window).width();
        } else if (window.innerWidth) {
            return window.innerWidth;
        } else {
            return document.documentElement.clientWidth;
        }
    })();

    timeline = (function () {

        var dateArray = [
            ['02.06.2015', 'Lorem ipsum dolor sit amet', 'fa-heart'],
            ['11.06.2015', 'Lorem ipsum dolor sit amet', 'fa-flask'],
            ['15.06.2015', 'Lorem ipsum dolor sit amet', 'fa-gavel'],
            ['22.06.2015', 'Lorem ipsum dolor sit amet', 'fa-graduation-cap'],
            ['30.06.2015', 'Lorem ipsum dolor sit amet', 'fa-trophy']
        ];

        var init = function (year, month, current) {
            setPoints(year, month, current);
            findPoints(current);
        };

        var setPoints = function (year, month, current) {
            var d = new Date(year, month, 0).getDate(),
                itemWidth = 100 / d,
                preZero = '0';

            for (var i = 1; i <= d; i++) {
                if (i >= 10) {
                    preZero = ''
                }
                $('.day-list').append('<li data-day="' + preZero + i + '.' + month + '.' + year + '" class="day-list__item"></li>');
            };

            if (browserWidth >= 768) {
                $('.day-list li').css('width', itemWidth + '%');
                setScroll(current, itemWidth);
            }

        };

        var setScroll = function (current, itemWidth) {

            var dayListW = $('.day-list').width(),
                itemOfsetWidth = (19 / dayListW) * 100,
                scrollOfsetWidth = (182 / dayListW) * 100,
                scrollWidth = (itemWidth * current) - itemOfsetWidth;

                if (scrollWidth < scrollOfsetWidth) {
                    $('.timeline__progress-bar').addClass('remove-after');
                }

                $('.timeline__progress-bar').animate({
                    width: (itemWidth * current) - itemOfsetWidth + '%',
                }, 2000);
        };

        var findPoints = function (current) {

            dateArrayLength = dateArray.length;

            for (var i = 0; i < dateArrayLength; i++) {

                var dateDay = dateArray[i][0],
                    res = dateDay.split('.'),
                    wrapperBefore = '';

                if (Number(res[0]) <= Number(current)) {
                    wrapperBefore = 'icon-wrapper--before"'
                }
                $('.day-list li[data-day="' + dateArray[i][0] + '"]').addClass('day-list__item--selected').append('<span class="icon-wrapper ' + wrapperBefore + '"><i class="fa ' + dateArray[i][2] + '" aria-hidden="true"></i></span>'
                    + '<div class="tooltip"><span class="tooltip__date">' + dateArray[i][0] + '</span><p class="tooltip__name">' + dateArray[i][1] + '</p></div>');
            }
        };

        return {
            init: init
        };
    })();

    timeline.init('2015', '06', '10');

}(jQuery));