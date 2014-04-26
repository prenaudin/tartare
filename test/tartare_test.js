(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('tartare')

  var defaultOptions = {
    numberItems    : 6,
    gutter         : 15,
    maxwidth       : 200,
    containerWidth : 630,
    itemSelector   : 'li',
    itemHeight     : 30
  }

  var generateGrid = function (options) {
    options = $.extend({}, defaultOptions, options)
    var container = $('<ul/>').css('width', options.containerWidth + 'px')
    for( var i = 0; i< options.numberItems; i++) {
      container.append($('<li/>').css('height', options.itemHeight + 'px'))
    }
    $('#qunit-fixture').append(container)
    container.tartare(options)
  }

  var checkItemsPositions = function(positions){
    for ( var p = 0; p < positions.length; p++){
      var item = $($('#qunit-fixture ul li').get(p))
      // console.log(positions[p], $($('#qunit-fixture ul li').get(p)).position());
      if(item.position().left !== positions[p].left || item.position().top !== positions[p].top ) return false
    }
    return true
  }

  test('should provide no conflict', function () {
    var tartare = $.fn.tartare.noConflict()
    ok(!$.fn.tartare, 'tartare was set back to undefined (org value)')
    $.fn.tartare = tartare
  })

  test('should be defined on jquery object', function () {
    var div = $('<div></div>')
    ok(div.tartare, 'tartare method is defined')
  })

  test('should return element', function () {
    var div = $('<div></div>')
    ok(div.tartare() == div, 'document.body returned')
  })

  test('should expose default settings', function () {
    ok(!!$.fn.tartare.Constructor.DEFAULTS, 'defaults is defined')
  })

  test('should render a grid by maximizing the width #1', function(){
    generateGrid()
    ok(checkItemsPositions(
      [{ left:0, top: 0}, {left: 161, top: 0}, {left: 322, top: 0}, {left: 483, top: 0}, {left: 0, top: 45}, {left: 161, top: 45}]
    ), 'grid is correctly rendered')
  })

  test('should render a grid by maximizing the width #2', function(){
    generateGrid({numberItems: 1})
    ok(checkItemsPositions(
      [{ left:0, top: 0}]
    ), 'grid is correctly rendered')
  })

  test('should destroy tartare', function () {
    var tartare = $('<div/>').tartare()
    ok(tartare.data('tartare'), 'tartare has data')
    tartare.tartare('destroy')
    ok(!tartare.data('tartare'), 'tartare does not have data')
  })

}(jQuery));
