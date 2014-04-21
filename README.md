![Tartare](https://raw.github.com/prenaudin/tartare/master/examples/assets/tartare-logo.png)
### An awesome way to render mixed content in a responsive grid.

Display a grid of elements and handle the resizing of them.
No fuss here :
the library just maximizes the widths of elements of the same height.
Go play with your perfect grids and make Josef Müller-Brockmann proud !

![Example video](https://raw.github.com/prenaudin/tartare/master/examples/assets/tartare-example-video.gif)

### Getting Started

Grab your tartare in one of these magic ways :
- [Download the latest release](https://raw.github.com/prenaudin/tartare/master/src/tartare.js).
- Clone the repo: `git clone https://github.com/prenaudin/tartare.git`.
- Install with [Bower](http://bower.io): `bower install tartare`.


In your web page:
```html
<script src="jquery.js"></script>
<script src="src/tartare.js"></script>
<script>
$(function() {
  $('#my-grid').tartare(); // "awesome"
});
</script>
```

### Documentation
Call tartare with customisable options to suit your needs :
```javascript
$('#my-grid').tartare(
  itemSelector : ".grid-item", // selector to find the grid elements  
  gutter       : 15,           // gutter to add between the grid elements, in pixels
  minwidth     : 250           // minimum width for the grid elements, in pixels
  )
```

Public methods are available to refresh or destroy the plugin :
```javascript
$('#my-grid').tartare('refresh') // forces the grid to recompute
$('#my-grid').tartare('destroy') // destroys tartare
```

Add some CSS for lovely transitions (not included in this plugin) :
```css
ul li.grid-item {
  transition: left .35s ease, top .35s ease;
}
```

### Examples
You can see a live demo here : <http://prenaudin.github.com/tartare/examples>

### Author
Made with love by **Pierre Renaudin**
- <http://twitter.com/pierrerenaudin>
- <http://github.com/prenaudin>
- <http://prenaudin.net>

### License
Code released under [the MIT license](LICENSE)
