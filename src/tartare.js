/*
 * Tartare : AN AWESOME WAY TO RENDER MIXED CONTENT IN A RESPONSIVE GRID
 * Source : http://github.com/prenaudin/tartare
 *
 * Copyright (c) 2014 Pierre Renaudin
 * Licensed under the MIT license.
 */

+function ($) {
  'use strict';

  // TARTARE PUBLIC CLASS DEFINITION
  // ===============================

  var Tartare = function (element, options) {
    this.type       =
    this.options    =
    this.$element   = null

    this.init('tartare', element, options)
  }

   Tartare.DEFAULTS = {
    left         : 0,
    top          : 0,
    minwidth     : 250,
    gutter       : 15,
    rows         : 0,
    columns      : 0,
    itemSelector : '.grid-item',
    numberPerRow : null,
    itemHeight   : null,
    itemWidth    : null
  }

  Tartare.prototype.init = function (type, element, options) {
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$items    = this.$element.find(this.options.itemSelector)
    this.compute()

    var that = this
    $(window).on('resize.tartare', function(){
       that.refresh()
    })
  }

  Tartare.prototype.getDefaults = function () {
    return Tartare.DEFAULTS
  }

  Tartare.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), options)
    return options
  }

  Tartare.prototype.compute = function () {
    var containerWidth   = this.$element.width()
    this.options.numberPerRow = Math.floor((containerWidth + this.options.gutter) / (this.options.minwidth + this.options.gutter)) + 1
    this.options.itemWidth    = Math.floor((containerWidth + this.options.gutter) / this.options.numberPerRow - this.options.gutter)

    var that = this
    this.$items.each(function(i, el){
      that.append(i, el)
    })

    var rows = Math.ceil(this.$items.length/this.options.numberPerRow)
    var containerHeight = rows * ( this.options.itemHeight + this.options.gutter )
    this.$element.css('height', containerHeight + 'px')
  }

  Tartare.prototype.append = function (i, el) {
    var column = i%this.options.numberPerRow + 1
    var row    = Math.floor(i/this.options.numberPerRow)
    var margin = 0
    if((i + 1) % this.options.numberPerRow !== 0){
      margin = this.options.gutter
    }
    this.options.itemHeight = $(el).height()

    this.options.left   = (column - 1) * (this.options.itemWidth + this.options.gutter)
    this.options.top    = (row) * ( this.options.itemHeight + this.options.gutter )

    $(el).css({
      'width'        : this.options.itemWidth + 'px',
      'left'         : this.options.left + 'px',
      'top'          : this.options.top + 'px',
      'position'     : 'absolute'
    })
  }

  Tartare.prototype.refresh = function () {
    this.compute()
  }

  Tartare.prototype.destroy = function () {
    $(window).off('resize.tartare')
    this.$element.off('.' + this.type).removeData(this.type)
  }

  // TARTARE PLUGIN DEFINITION
  // =========================
  var old = $.fn.tartare

  $.fn.tartare = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('tartare')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('tartare', (data = new Tartare(this, options)))
      if (typeof option == 'string') data[option]()
    })

    // $(window).resize(function(){
    //   sizeGrid($containerEl, $els, options);
    // });
  };

  $.fn.tartare.Constructor = Tartare

  // TARTARE NO CONFLICT
  // ===================

  $.fn.tartare.noConflict = function () {
    $.fn.tartare = old
    return this
  }

}(jQuery);
