/*
 * tartare
 *
 *
 * Copyright (c) 2014 Pierre Renaudin
 * Licensed under the MIT license.
 */

(function ($) {

  var appendGridItem = function(i, el, options){
    var column = i%options.numberPerRow + 1;
    var row    = Math.floor(i/options.numberPerRow);
    var margin = 0;
    if((i + 1) % options.numberPerRow !== 0){
      margin = options.gutter;
    };
    options.itemHeight = $(el).height();

    options.left   = (column - 1) * (options.itemWidth + options.gutter);
    options.top    = (row) * ( options.itemHeight + options.gutter );

    $(el).css({
      'width'        : options.itemWidth + 'px',
      'left'         : options.left + 'px',
      'top'          : options.top + 'px',
      'position'     : 'absolute'
    });
  };

  var sizeGrid = function($containerEl, $items, options){
    var containerWidth   = $containerEl.width();
    options.numberPerRow = Math.floor((containerWidth + options.gutter) / (options.minwidth + options.gutter)) + 1;
    options.itemWidth    = Math.floor((containerWidth + options.gutter) / options.numberPerRow - options.gutter);

    $items.each(function(i, el){
      appendGridItem(i, el, options);
    });

    rows = Math.ceil($items.length/options.numberPerRow)
    containerHeight = rows * ( options.itemHeight + options.gutter )
    $containerEl.css('height', containerHeight + 'px');
  };

  // Static method default options.
  defaultOptions = {
    left         : 0,
    top          : 0,
    minwidth     : 250,
    gutter       : 15,
    rows         : 0,
    columns      : 0,
    numberPerRow : null,
    itemHeight   : null,
    itemWidth    : null
  };

  // Collection method.
  $.fn.tartare = function (options) {
    options = $.extend({}, defaultOptions, options);

    $containerEl = this;
    $els = this.find('.grid-item');

    console.log($els);
    sizeGrid($containerEl, $els, options);
    $(window).resize(function(){
      sizeGrid($containerEl, $els, options);
    });
    return this;
  };


}(jQuery));
