[![npm version](https://img.shields.io/npm/v/jquery-footnotes.svg)](https://www.npmjs.com/package/jquery-footnotes)

## Overview

**jquery-footnotes** is a jquery plugin to manage footnotes.

To use this plugin, create some HTML which contains footnote references; e.g.

```html
the syntax
```

And create the HTML for the footnote text; e.g.

```html
the footnote text
```

Then use the plugin to add some fancier styling and javascript around that:

```javascript
$("article").footnotes();
```

## Quick start

Use [JSdelivr](https://www.jsdelivr.com/package/npm/jquery-footnotes) to get latest version of JQuery and the plugin.
```html
<!--jquery-->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1"></script>

<!--jquery-footnotes javascript file-->
<script src="https://cdn.jsdelivr.net/npm/jquery-footnotes/js/jquery.footnotes.js"></script>   
``` 

## Install with NPM / Bower / Yarn

* [NPM](https://www.npmjs.com/package/jquery-footnotes) : npm install jquery-footnotes
* [Bower](https://bower.io/) : bower install jquery-footnotes
* [Yarn](https://yarnpkg.com/en/package/jquery-footnotes) : yarn add jquery-footnotes

## Sample output

some links to some sample output here

## Initialisation

The plugin formats text surrounding tabs so that they align with footnotes defined as options to the plugin, or as CSS styles.
```html
<p>Some example</p>
```

To initialise the plugin, call footnotes() on the element:
```javascript
$("p").footnotes();
```


## Settings

Most of these aren't implemented yet.


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
            
            

| Option | Data-Attr | Defaults | Type | Description |
| --- | --- | --- | --- | --- |
| `referenceSelector` | `data-referenceSelector` | `.footnote-ref`| string | A CSS selector for the elements containing footnote references |
| `footnoteSelector` | `data-footnoteSelector` | `.fn`| string | A CSS selector for the elements containing individual footnotes |

## Creating footnotes

Yada yada yada

## Events

Footnotes do not generate events

## Methods

WIP


## Dependencies

* <a href="http://jquery.com/" target="_blank">jQuery 1.8.x+</a>


## Usage

Add the following libraries to the page:
* jQuery
* jquery-footnotes.min.js

## Licensing

jquery-footnotes is licensed under the BSD 2-clause license.
