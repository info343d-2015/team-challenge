'use strict';
var url = 'http://localhost:8000/index.html';
var btn = element(by.id('signup'));
describe('Birthday Field', function() {
    var input = element(by.id('birthday'));
    beforeEach(function() {
        browser.get(url);
    });
    it('should reject non-dates', function() {
        input.sendKeys('foobar');
        expect(btn.isEnabled()).toEqual(false);
    });
});