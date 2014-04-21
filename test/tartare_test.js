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

  module('tartare');

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

  test('should destroy tartare', function () {
    var tartare = $('<div/>').tartare()
    ok(tartare.data('tartare'), 'tartare has data')
    tartare.tartare('destroy')
    ok(!$._data(tartare), 'tartare does not have data')
  })

}(jQuery));
