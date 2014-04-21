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

    // set to true to enable debug
    this.debug = true

    // internal grid status
    this.left         = 0
    this.top          = 0
    this.rows         = 0
    this.columns      = 0
    this.numberPerRow = null
    this.itemHeight   = null
    this.itemWidth    = null

    this.init('tartare', element, options)
  }

   Tartare.DEFAULTS = {
    minwidth     : 250,
    gutter       : 15,
    itemSelector : '.grid-item'
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
    if (this.debug) console.time('Tartare - compute')
    var containerWidth   = this.$element.width()
    this.numberPerRow = Math.floor((containerWidth + this.options.gutter) / (this.options.minwidth + this.options.gutter)) + 1
    this.itemWidth    = Math.floor((containerWidth + this.options.gutter) / this.numberPerRow - this.options.gutter)

    var that = this
    this.$items.each(function(i, el){
      that.append(i, el)
    })

    var rows = Math.ceil(this.$items.length/this.numberPerRow)
    var containerHeight = rows * ( this.itemHeight + this.options.gutter )
    this.$element.css('height', containerHeight + 'px')
    if (this.debug) console.timeEnd('Tartare - compute')
  }

  Tartare.prototype.append = function (i, el) {
    var column = i%this.numberPerRow + 1
    var row    = Math.floor(i/this.numberPerRow)
    var margin = 0
    if((i + 1) % this.numberPerRow !== 0){
      margin = this.options.gutter
    }
    this.itemHeight = this.itemHeight || $(el).height()

    this.left   = (column - 1) * (this.itemWidth + this.options.gutter)
    this.top    = (row) * ( this.itemHeight + this.options.gutter )

    $(el).css({
      'width'        : this.itemWidth + 'px',
      'left'         : this.left + 'px',
      'top'          : this.top + 'px',
      'position'     : 'absolute'
    })
  }

  Tartare.prototype.refresh = function () {
    delete this.itemHeight
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
  };

  $.fn.tartare.Constructor = Tartare

  // TARTARE NO CONFLICT
  // ===================

  $.fn.tartare.noConflict = function () {
    $.fn.tartare = old
    return this
  }

}(jQuery);
