$.fn.scale = function(ops) {
    
    function Scale(el, img) {

        var $parent = settings.parent || el.parent(),
            parent = {
                width: $parent.width(),
                height: $parent.height()
            },
            element = {
                width: img.width,
                height: img.height
            },
            imageRatio = element.width / element.height,
            css = {},
            b, f;


        $parent.css({
            position: 'relative',
            overflow: 'hidden',
            display: 'block'
        });

        if (settings.type === 'center') {
            return {
                position: 'absolute',
                width: 'auto',
                height: 'auto',
                left: (parent.width - element.width) / 2,
                top: (parent.height - element.height) / 2
            }
        }

        if (settings.center) {
            css = {
                position: 'absolute',
                left: 0,
                top: 0
            }
        }

        b = (parent.width / parent.height) > imageRatio;
        f = settings.type == 'fill';

        if ((b || !f) && (!b || f)) {

            css.width = '100%';
            css.height = 'auto';

            if (settings.center) {
                css.top = (parent.height - parent.width / imageRatio) / 2
            }
            return css;
        }

        css.width = 'auto';
        css.height = '100%';

        if (settings.center) {
            css.left = (parent.width - parent.height * imageRatio) / 2
        }
        return css;

    }

    var settings = $.extend({
        type: 'fill',
        center: true
    }, ops);

    return this.each(function() {

        var $this = $(this);
        if ($this.prop('tagName') === 'IMG') {
            var image = new Image();

            image.onload = function() {
                $this.css(Scale($this, image));
            };

            image.src = $this.prop('src');
        }

    });

};
