/**
 * (c) 2010, Andrew Gwozdziewycz, GPL Licensed, see LICENSE
 */

(function($) {
   $.fn.fit = function(options) {
     var config = {
       'minsize': 1,
       'maxsize': 10000,
       'width': null,
       'height': null
     };

     if (options) {
       $.extend(config, options);
     }

     var fits = function(sz, node) {
       node.css('fontSize', sz + 'px');
       return node.outerWidth() <= config['width'] &&
         node.outerHeight() <= config['height'];
     };

     this.each(function() {
       var parent = $(this).parent();
       if (!config['height']) {
         config['height'] = parent.outerHeight();
       }
       if (!config['width']) {
         config['width'] = parent.outerWidth();
       }
                 
       var max = config['maxsize'];
       var min = config['minsize'];
       var iterations = 100;
       do {
         var hfs = max - min;
         var mid = min + (hfs / 2);
         if (fits(Math.floor(mid), $(this))) {
           min = mid + 1;
         }
         else {
           max = mid - 1;
         }
       } while (max > min && iterations--);

       $(this).css('fontSize', fits(Math.floor(mid), $(this)) ? mid + 'px': min + 'px');
     });
   };
})(jQuery);
