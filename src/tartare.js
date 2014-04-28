/*
 * Tartare : AN AWESOME WAY TO RENDER MIXED CONTENT IN A RESPONSIVE GRID
 * Source : http://github.com/prenaudin/tartare
 *
 * Copyright (c) 2014 Pierre Renaudin
 * Licensed under the MIT license.
 */

+function ($) {
  'use strict';

  // UTILITIES methods
  var throttle = function (fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
      var context = scope || this;

      var now = +new Date(),
          args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }

  // TARTARE PUBLIC CLASS DEFINITION
  // ===============================

  var Tartare = function (element, options) {
    this.type       =
    this.options    =
    this.$element   = null

    // internal grid status
    this.left          = 0
    this.top           = 0
    this.rows          = 0
    this.columns       = 0
    this.numberPerRow  = null
    this.itemWidth     = null
    this.currentIndex  = 0

    this.init('tartare', element, options)
  }

   Tartare.DEFAULTS = {
    maxwidth     : 250,
    gutter       : 15,
    itemSelector : '.grid-item',
    height       : null
  }

  Tartare.prototype.init = function (type, element, options) {
    this.type       = type
    this.$element   = $(element)
    this.options    = this.getOptions(options)
    this.itemHeight = this.options.height
    this.refresh()

    var that = this
    $(window).on('resize.tartare', throttle(function(){
       that.refresh()
    }, 200))
  }

  Tartare.prototype.initItems = function() {
    this.$items = this.$element.find(this.options.itemSelector)
  }

  Tartare.prototype.getDefaults = function () {
    return Tartare.DEFAULTS
  }

  Tartare.prototype.getOptions = function (options) {
    if(!options) options = this.options
    options = $.extend({}, this.getDefaults(), options)
    return options
  }

  Tartare.prototype.getItemHeight = function (el) {
    return this.itemHeight || this.options.height || $(el).height()
  }

  Tartare.prototype.compute = function () {
    var containerWidth = this.$element.width()
    this.numberPerRow  = Math.floor((containerWidth + this.options.gutter) / (this.options.maxwidth + this.options.gutter)) + 1
    this.itemWidth     = Math.floor((containerWidth + this.options.gutter) / this.numberPerRow - this.options.gutter)
    this.itemHeight    = this.getItemHeight()

    var rows = Math.ceil(this.$items.length/this.numberPerRow)
    var containerHeight = rows * ( this.itemHeight + this.options.gutter )
    this.$element.css('height', containerHeight + 'px')
  }

  Tartare.prototype.placeItems = function (startIndex) {
    this.currentIndex  = startIndex ? startIndex : 0
    var that = this
    this.$items.each(function(i, el){
      that.place(el)
    })
  }

  Tartare.prototype.place = function (el, index) {
    index = index !== undefined ? index : this.currentIndex
    var column = index%this.numberPerRow + 1
    var row    = Math.floor(index/this.numberPerRow)
    var margin = 0
    if((index + 1) % this.numberPerRow !== 0){
      margin = this.options.gutter
    }

    this.itemHeight = this.getItemHeight(el)

    this.left   = (column - 1) * (this.itemWidth + this.options.gutter)
    this.top    = (row) * ( this.itemHeight + this.options.gutter )

    $(el).css({
      'width'    : this.itemWidth + 'px',
      'left'     : this.left + 'px',
      'top'      : this.top + 'px',
      'position' : 'absolute'
    })
    this.currentIndex++
  }

  Tartare.prototype.append = function(el) {
    this.place(el)
    this.$element.append(el)
    this.initItems()
    this.compute()
  }

  Tartare.prototype.prepend = function(el) {
    this.place(el, 0)
    this.$element.prepend(el)
    this.compute()
    this.placeItems(1)
    this.initItems()
  }

  Tartare.prototype.refresh = function () {
    delete this.itemHeight
    this.initItems()
    this.compute()
    this.placeItems()
  }

  Tartare.prototype.destroy = function () {
    $(window).off('resize.tartare')
    this.$element.off('.' + this.type).removeData(this.type)
  }

  // TARTARE PLUGIN DEFINITION
  // =========================
  var old = $.fn.tartare

  $.fn.tartare = function (option, params) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('tartare')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('tartare', (data = new Tartare(this, options)))
      if (typeof option == 'string') data[option](params)
    })
  };

  $.fn.tartare.Constructor = Tartare

  // TARTARE NO CONFLICT
  // ===================

  $.fn.tartare.noConflict = function () {
    $.fn.tartare = old
    return this
  }

}(jQuery);
