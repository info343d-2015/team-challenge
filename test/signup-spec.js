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

describe('Last name Field', function() {

    var lastname_field = element(by.model('lastname'));
    var firstname_field = element(by.model('firstname'));

    beforeEach(function () {
        browser.get(url);
    });
    it('should be able to validate the last name field.', function() {
        
        lastname_field.sendKeys('Haugh');

        var notice = element(by.id('needLast'));

        expect(notice.isDisplayed()).toEqual(false);

    });

    it('should show a warning when the last name entered is not valid.', function() {
        lastname_field.sendKeys('');

        firstname_field.sendKeys('Ali');

        var notice = element(by.id('needLast'));

        expect(notice.isDisplayed()).toEqual(true);
    });

    it('should not be highlighted when the input is valid', function() {
        lastname_field.sendKeys('Haugh');

        console.log(lastname_field.classList);

        expect(lastname_field.getAttribute("class")).toContain('ng-valid');
    });

    it('should  be highlighted when the input is invalid', function() {
        lastname_field.sendKeys('');

        firstname_field.sendKeys('Ali');

        console.log(lastname_field.classList);

        expect(lastname_field.getAttribute("class")).toContain('ng-invalid');
    });
})