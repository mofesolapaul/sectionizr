# sectionizr
jQuery plugin for presenting UI in sections, one section at a time, each section being full width and full height, arranged horizontally or vertically. [See example](https://mofesolapaul.github.io/sectionizr/) to appreciate its simplicity and beauty.

Sectionizr helps you present a rather bulky UI in a more friendly way, giving room for enough space for viewer comfort, and allowing them focus on what's important - overall, you can use sectionizr to break your UI into linked sections

>Sectionizr by default arranges your `<section></section>`'s horizontally, add 'vertical' class to a sectionizr to make it's sections stack vertically. Sections in a sectionizr have to really be `<section></section>`

### Usage
Sectionizr depends on its `sectionizr.css` stylesheet to render the sections in such a way that they are compliant with the library's operations, so unless you've got an even cooler way to style them up (arrange them), ensure to include the file on your page
```css
<link rel="stylesheet" href="path/to/sectionizr.css">
```
Include the script (1KB, compressed) in your project (node compatible also). `Note that jQuery must be present on the same page`.
```html
<script src="path/to/sectionizr[.min].js"></script>
```
Once all dependencies are in place, you need to initialize sectionizr on corresponding elements in the DOM
```javascript
let controlla = $('.sectionizr').sectionizr();
```
Remember to keep a pointer to your `sectionizr object` - that's how you control the _sectionized contents_ of your page.

If you have multiple (or nested) sectionizr's on the same page which share the same selector (e.g class name), Sectionizr will initialize them all and return an array, so you may store them like this
```javascript
let [controlla1, controlla2] = $('.sectionizr').sectionizr();
```
In the event that you need to fetch your sectionizr later on in the code (and you maybe forgot to initially keep a pointer to it as strongly advised above) you can retrieve the `sectionizr object` attached to the specifc DOM element it was initialized on. For example
```html
<div class="sectionizr">
    <section></section>
    <section></section>
</div>
```
```javascript
// for some strange reason, you do not assign the returned sectionizr object
$('.sectionizr').sectionizr();

// fret not, it's still there
var lateControlla = $('.sectionizr')[0].sectionizr;
```
Note that `.sectionizr` in the last example does not require parentheses, that's because it's not a function, it's merely the sectionizr object attached to its owner in the DOM.

Now that you have your _controlla_, you can begin to control the `sectionized content`. Available methods are shown in the table below:

| Method | Returns | Description |
| :----- | :-----: | :---------- |
| **next** | _boolean_ | Call `sectionizr.next()` to advance to the next section. if `false` is returned, it means forward movement can be performed (in English, means you're at the last section already there's no _next_) |
| **prev** | _boolean_ | Call `sectionizr.prev()` to reverse to the previous section. if `false` is returned, it means backwards movement can be performed (in English, means you're at the first section already there's no _prev_) |
| **step** | _void_ | Call `sectionizr.step(x)` to advance or reverse by `x steps`. Negative values go _x-steps_ backwards, for positive values, you already know how they work |
| **go** | _void_ | Call `sectionizr.go(x)` to jump to section number `x` |
| **first** | _void_ | Call `sectionizr.first()` to go directly to the first section |
| **last** | _void_ | Call `sectionizr.last()` to go directly to the last section |
| **hasNext** | _boolean_ | Call `sectionizr.hasNext()` to know if there's a section further away (if there's a _next_) |
| **hasPrev** | _boolean_ | Call `sectionizr.hasPrev()` to know if there's a section behind the current one (if there's a _prev_) |
| **refresh** | _void_ | Call `sectionizr.refresh()` to _(as the name clearly states)_ refresh the sectionizr |

#### Other stuff, cos I'm tired of writing already
| Properties |
| :--- |
| **sectionizr.el**: returns the element this sectionizr is bound to in the DOM |
| **sectionizr.sections**: returns an array of the DOM nodes (sections) contained in this sectionizr |
| **sectionizr.position**: indicates what position (not zero-based) the section in view is at |

_with love from [@mofesolapaul](https://about.me/mofesolapaul)_