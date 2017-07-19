# sectionizr
jQuery plugin for presenting UI in sections, one section at a time, each section being full width and full height, arranged horizontally or vertically. [See example](https://de-paule.github.io/sectionizr/) to appreciate its simplicity and beauty.

Sectionizr helps you present a rather bulky UI in a more friendly way, giving room for enough space for viewer comfort, and allowing them focus on what's important - overall, you can use sectionizr to break your UI into linked sections

### Usage
Sectionizr depends on its `sectionizr.css` file stylesheet to render the sections in such a way that they are compliant with the library's operations, so unless you've got an even cooler way to style them up (arrange them), ensure to include the file on your page
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