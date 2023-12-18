(function($) {

    $.fn.extend({
        footnote: function(verb, p1, p2) {
            if (typeof verb == 'undefined') {
                verb = 'init';
            } else if (typeof verb == 'object') { 
                p1 = verb; verb = 'refresh';
            }
            this.each(function() {
                new $.Footnote(this, verb, p1, p2);
            });
            return this;
        }
    });


    $.Footnote = function( el, verb, p1, p2 ) {
        var $el = $(el);
    
        if (verb=='init') {
            init($el, p1);
            
        //} else if (verb=='option') {
        //    option($el, p1, p2);

        } else if (verb=='destroy') {
            var data = $el.data('footnote');
            if (data) {
                resetFootnote($el /*, data.tabElement, data.tabClass, false, true*/);
                $el.data('footnote', null);
            }
        }
    };

    // option defaults
    $.Footnote.defaults = {
        'refresh' : {
        	'referenceSelector' : '.footnote-ref',
        	'footnoteSelector'  : '.fn',
        	
        	// none of these are implemented but might be if I ever npm this thing:
        	
            'footnoteContainer' : null, // separate element that contains the .fn elements. maybe. look who knows.
            'referenceTemplate' : null,
            'footnoteTemplate' : null,
            // overrides the animations
            'shine': 'yellow', // probably need something a bit more obvious than this on the back links, as the fnref divs are pretty small
            'onClickReference' : null, // an event handler when the fn ref is clicked
            'onClickBack' : null, // an event handler when the fn back is clicked

            // lifecycle events. because I think a footnote plugin needs these for some reason.
            'beforeInit' : null,   // an event handler called after template initialisation
            'afterInit' : null,   // an event handler called after template initialisation
            'beforeDestroy' : null,
            'afterDestroy' : null, 
        }
    }
    
    
    function init($el, _options) {
        var data = {
        };
        $el.data('footnote', data); // necessary ?
        // _refresh($el, data);
        
        // if (_options == 'data') { _options = dataAttributes; }
        var options = $.extend( {}, $.Footnote.defaults['refresh'], /*dataAttributes,*/ $el.data('footnote'), _options);
        
        var count = 0;
        
        $(options.referenceSelector, $el).each(function(i, el) { 
        	count++;
        	
        	var fnRefEl = $(el);
        	var ref = fnRefEl.attr('data-ref');
        	var fnEl = $(options.footnoteSelector + '[data-ref="' + ref + '"]');
        	var showBack = fnEl.attr('data-showBack') != 'false';
        	
        	// no real point putting IDs on here as they'd only be used if javascript is disabled
        	// which would prevent the IDs from being added in the first place
			fnRefEl.html(count); // '[' + count + ']'
			
			if ($('p', fnEl).length == 0) {
				fnEl.wrapInner('<p>');
			}
			// var wrapEl = $();
			var wrapEl = fnEl.wrap('<li class="footnote"></li>');
			var numberEl = $('<a href="#" class="footnote-number-link">&nbsp;</a>');
			wrapEl.before(numberEl);
			
			// animate on toEl, scroll to sctollToEl if it's defined
			function animateScroll(e, toEl, scrollToEl) {
				var fromAnimEl = $('<div style="position:absolute;"><svg class = "button" expanded = "true" height = "50px" width = "50px">' +
				  '<circle class="linkFromCircle" cx = "50%" cy = "50%" r = "48%" stroke = "#000000" stroke-width = "1px" fill = "none" />' +
        	      '</svg></div>');
				$('body').append(fromAnimEl);
        	    fromAnimEl.offset({left: e.pageX-25, top: e.pageY-25});
        	    window.setTimeout(function() { fromAnimEl.remove(); }, 1000);
        	    
        	    // scroll position of bottom of page is one window.height above it
        	    if (typeof scrollToEl == 'undefined') { scrollToEl = toEl; }
        	    var scrollTo = Math.min( $(document).height() - window.innerHeight, scrollToEl.offset().top);
        	    var scrollDistance = scrollTo - $(window).scrollTop();
        	    if (scrollDistance > 0 && scrollDistance < window.innerHeight) {
        	    	delayMsec = 0; // target element is visible
        	    } else {
	        	    $([document.documentElement, document.body]).animate(
	        	    	{ scrollTop: scrollTo }, 
	        	    	2000, 'easeInOutCubic');
	        	    // @TODO if there's a manual scroll event, abort the animation
	        	    scrollDistance = Math.abs(scrollDistance);
					var delayMsec = scrollDistance  < 50 ? 0 : 
					  (scrollDistance < 100 ? 1000 :
					  1500);
				}
				window.setTimeout(function() {        	    	
	        	    var toPosition = toEl.offset();
	        	    var toAnimEl = $('<div style="position:absolute;"><svg class = "button" expanded = "true" height = "100px" width = "100px">' +
					  '<circle class="linkToCircle" cx = "50%" cy = "50%" r = "25%" stroke = "#000000" stroke-width = "1px" fill = "none" />' +
	        	      '</svg></div>');
					$('body').append(toAnimEl);
	        	    toAnimEl.offset({left: toPosition.left + toEl.outerWidth()/2 -50, 
	        	    	 top: toPosition.top + toEl.outerHeight()/2 -50});
	        	    window.setTimeout(function() { toAnimEl.remove(); }, 1000);
	        	}, delayMsec);
				
			}
			
			fnRefEl.on('click', function(e) {
				animateScroll(e, numberEl);
        		return false; 
			});
			numberEl.on('click', function(e) {
				animateScroll(e, fnRefEl, fnRefEl.closest('p'));
        		return false; 
			});
			
			if (showBack) {
				var backEl = $('<a href="#" class="footnote-back">' +
					'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 -410 2048 2048"><g transform="matrix(1 0 0 -1 0 1638)"><path fill="currentColor" d="M173 740l469 469v-382h758q126 0 214.5 88.5t88.5 213.5q0 126 -88 214t-214 88h-167v173h167q197 0 336 -139t139 -336t-139.5 -336t-336.5 -139h-758v-383z"></path></g></svg>' +
					'</a>');
				$('p', fnEl).last().append(backEl);
				backEl.add(numberEl).on('click', function(e) {
					animateScroll(e, fnRefEl, fnRefEl.closest('p'));
					return false;
				});
			}


			
        });
    }
    
})($);

// just the easing used in the foonote animation, in case jquery-ui isn't on the page
// $.easing.jswing = $.easing.swing;
$.extend($.easing,
{
	    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    }
});	


