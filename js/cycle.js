(function() {

     var options = {
         enabled : true,
         forward : 's',
         backward : 'r',
         modKey : 'altKey'
     };

     var charKeyCodes = function() {
         var first, letters, codes, i;

         first = 65;
         letters = "abcdefghijklmnopqrstuvwxyz";
         codes = {};
         for(i = 0; i < letters.length; i++) {
             codes[letters.charAt(i)] = first + i;
         }
         return codes;
     }();

     function createIterator(body, tag) {
         var current, list;

         current = -1;
         list = body.getElementsByTagName(tag);

         return {
             next : function() {
                 if(list.length > 0) {
                     current = (current + 1) % list.length;
                     list[current].focus();
                 }
             },

             previous : function() {
                 if(list.length > 0) {
                     current = current <= 0 ? list.length - 1 : current - 1;
                     list[current].focus();
                 }
             }
         };
     }

     function stopEvent(ev) {
         ev.preventDefault();
         ev.stopPropagation();
     }

     function init(options) {
         var iterator;
         iterator = createIterator(document, 'textarea');
         document.addEventListener(
             'keydown',
             function(ev) {
                 if(ev[options.modKey] && ev.keyCode === charKeyCodes[options.forward]) {
                     iterator.next();
                     stopEvent(ev);
                 } else if (ev[options.modKey] && ev.keyCode === charKeyCodes[options.backward]) {
                     iterator.previous();
                     stopEvent(ev);
                 }
             }
         );
     }

     /* Main */
     init(options);
 })();
