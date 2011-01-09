(function() {

     var options = {
         enabled : true,
         forward : 's',
         backward : 'r',
         modKey : 'altKey'
     };

     // Get the keycode for every letter
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

     /**
      * Creates an iterator over the given tag, which cycles through
      * all the elements in the given body changing the focus.
      *
      * @param {DOMElement} body the body where the tags are searched
      * @param {String} tag the tag that identifies the elements for
      * the iterator
      * @return {Iterator} an iterator object with two methods, next
      * and previous, that change the focus to the next/previous
      * element of the given tag.
      */
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

     /**
      * Prevents an event from being propagated.
      */
     function stopEvent(ev) {
         ev.preventDefault();
         ev.stopPropagation();
     }

     /**
      * Initializes the iterator and sets up a handler to recognize
      * when a shortcut is pressed.
      */
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
