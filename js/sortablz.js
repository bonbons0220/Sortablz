/* ========================================================================
 * ZENDGAME: sortablz.js v1.a1
 * ========================================================================
 * What it does:
 * 
 *   Sorts html elements (generally divs) by specified fields.
 *   Values to sort by are in element data attributes.
 *   Toggles set the field to sort by.
 *   Supports more than one sortable list on a page.
 * 
 * ======================================================================== 
 * Copyright 2011-2016 IDIES
 * Licensed under MIT 
 * ======================================================================== */

+function ($) {
	
	'use strict';

	// Sortablz PUBLIC CLASS DEFINITION
	// ================================
	var Sortablz = {

	init: function( context, safe ){
			
			var tl = new Array();
			var dz = new Array();
			var o = new Array();
			var d= new Array();

			// create an array of the sorting toggles keys
			$( "[data-toggle=sortablz]" , context ).each( function(){
				o.push(tl.length);
				tl.push( $( this ).data( "sortablz" ) );
			});

			// set the function to call when a toggle is clicked
			if (safe) {
				$( "[data-toggle=sortablz]" , context ).each( function(){
					$(this).click( {
							which: $(this).data("sortablz"), 
							context : context
						} , Sortablz.safeupdate );
				});
			} else {
				$( "[data-toggle=sortablz]" , context ).each( function(){
					$(this).click( {
							which: $(this).data("sortablz"), 
							context : context
						} , Sortablz.update );
				});
			}
			
			// create a multi dimensional array of the sortable elements' data
			// n-1 columns hold the values to sort by, the nth column holds the html to show.
			$(".sortablz-target>.sortablz-contents" , context).each ( function() {
				d = Array();		
				tl.forEach( function( e ){ d.push( ( $( this ).data( e ) == undefined  ? "" : $( this ).data( e ).toString() ) ) }, this );
				d.push( this.outerHTML );
				dz.push( d );
			});
			
			//save toggles, initilized order, and data
			this[context] = { tl: tl, o: o, dz: dz};
		
			// manually click the selected toggle
			$( "[data-toggle=sortablz][checked]"  , context).click();
			
		},
				
		safeupdate: function( event ){
			
			var dz = new Array();
			var d= new Array();
			
			// get the data every time
			$(".sortablz-target>.sortablz-contents" , event.data.context).each ( function() {
				d = Array();		
				Sortablz[event.data.context].tl.forEach( function( e ){ d.push( ( $( this ).data( e ) == undefined  ? "" : $( this ).data( e ).toString() ) ) }, this );
				d.push( this.outerHTML );
				dz.push( d );
			});
			
			//save toggles, initilized order, and data
			Sortablz[event.data.context]['dz'] = dz;
			
			Sortablz.update( event ) ;
					
		},
				
		update: function( event ){
			var tndx = Sortablz[ event.data.context ].tl.indexOf( event.data.which );
			var i=0;
			var n=Sortablz[ event.data.context ].o.length;
			
			//rearrange the order
			Sortablz[ event.data.context ].o.splice( Sortablz[ event.data.context ].o.indexOf( tndx ) , 1 );			
			Sortablz[ event.data.context ].o.unshift( tndx );
			
			Sortablz[ event.data.context ].dz.sort( function( a , b ) {
				var by;
				for (var i=0; i<Sortablz[ event.data.context ].o.length ; i++) {

					by = Sortablz[ event.data.context ].o[i];					
					if ( 0 === a[ by ].length ) return 1;
					if ( 0 === b[ by ].length ) return -1;
					if ( a[by] !== b[by] ) return ( ( a[ by ]> b[ by ] ) ? 1 : -1 );
										
				}
				return -1 ;
			});
			
			$(".sortablz-target" , event.data.context ).each( function() {
				$(this).html( Sortablz[ event.data.context ].dz[i++][n]);
			});
		},
	}

	$(document).ready(function() {
		var safe, z=0;
		$(".sortablz").each( function() {
			$( this ).prop("id" , $( this ).prop("id").replace(/[^a-z0-9_]/gim,"") );
			//safe = ( ( $( this ).parents('.filterz').length + $( this ).children('.filterz').length ) ) ;
			safe = ( undefined != $( this ).data('sortablz-safemode') );
			if ( $( this ).prop("id").length == 0 ) $( this ).prop( "id" , "sortablz-" + z++ );
			Sortablz.init( "#" + $( this ).prop("id") , safe );
		});

		return;
		
	});
  
}(jQuery);
