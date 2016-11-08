# Sortablz

Sortablz is a plugin that adds the functionality of dynamically sorting elements to a WordPress page.

## Plugin Features
Sortablz is a jQuery based plugin that uses the shortcode [SORTABLZ] to load on only the page you want items sorted. Put the Shortcode anywhere on a WordPress page or post, and the javascript component will load after the page.

Numbers are sorted as strings, so that 24.3 comes before 3.

After the page loads, the plugin initially scans the page for sortable items (generally divs) and sort-by data about how to sort them. It determines which toggle is checked and sorts them. The plugin does not scan the page again, it saves sorting and sort-by data and simply re-orders them when a toggle is clicked. 

## Support
Email bonnie@zendgame.com with questions or comments.

##License
    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.
	
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

## Documentation

### How to use the plugin
To use Sortablz on a page, include the SORTABLZ shortcode on that page. It will only load and run the js on that page.

### Shortcodes
[SORTABLZ]

### The Sortablz Container(s)
All Sortablz toggles or targets must be in a container with the class "sortablz". If you have only one Sortablz on your page, you can apply this to the body tag.

### Sortablz Toggles
Sortablz Toggles should be radio input elements, because Sortablz relies on the native functionality of radios to uncheck other options when a new option is checked.
The "data-toggle" attribute must be set to "sortablz".
The "data-sortablz" attribute must be set to an alphanumeric key for that toggle. Each toggle has a different key.

<input type="radio" name="sortablz1" data-toggle="sortablz" data-sortablz="last" checked="true">Last Name<br />
<input type="radio" name="sortablz1" data-toggle="sortablz" data-sortablz="age" checked="true">Age<br />
<input type="radio" name="sortablz1" data-toggle="sortablz" data-sortablz="grade" checked="true">Last Grade Completed<br />

### Sortablz Targets
Sortablz targets are divs with the class "sortablz-target" containing a single element with class "sortablz-contents". The contents to be sorted is a div, but possibly also an article, aside, etc. 


### Sorting multiple groups
You can have more than one Sortablz container on a page, by adding the "sortablz" class to multiple containers. 
If your sortablz containers do not have unique ids, the plugin will generate and assign unique ids for them.
The ids are used as context for all jQuery DOM selectors.

This is ok:
	<div class="sortablz" id="students">
	...things to sort...
	</div>
	<div class="sortablz" id="teachers">
	...other things to sort in other ways...
	</div>

This is also ok:
	<div class="sortablz">
	...things to sort...
	</div>
	<div class="sortablz">
	...other things to sort in other ways...
	</div>

Sortablz containers many not be nested.

This is not ok:
	<div class="sortablz" id="people">
	...things to sort...
	<div class="sortablz" id="blond people">
	...other things to sort in other ways...
	</div>
	</div>


### Dependencies
jQuery: 
This Plugin depends on jquery core. If jquery core is not enqueued, it will be enqueued by the plugin.

Bootstrap: 
This plugin uses the Bootstrap class ".hidden". If you are not using Bootstrap, please define the hidden class as follows:
	.hidden {
		display: none !important;
		visibility: hidden !important;
	}


### Compatibility 

#### Filterz 
Sortablz will work with the Filterz plugin but you must be careful about how the elements are nested.

#### Safe Mode
If the order or content of the sorted elements will be changed by any other plugin or component, such as the Filterz plugin (also by Zendgame), add the data-sortablz-safemode attribute to the .sortablz container.
 <div class="sortablz" data-sortablz-safemode>

## Change log
1.0: Initial Release
1.1: Added data-sortablz-safemode to .sortablz to determine whether to reaquire inner HTML for elements on each sort. 