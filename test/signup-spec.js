'use strict';
var url = 'http://localhost:8000/index.html';
var btn = element(by.id('signup'));
describe('Birthday Field', function() {
    var input = element(by.id('birthday'));
    var firstName = element(by.id('first-name'));
    var dateError = element(by.id('birthday-invalidDate'));
    var ageError = element(by.id('birthday-invalidAge'));
    beforeEach(function() {
        browser.get(url);
    });
    it('should reject non-dates', function() {
        input.sendKeys('foobar');
        firstName.sendKeys('');
        expect(input.getAttribute('class')).toContain('ng-invalid');
        expect(dateError.isDisplayed()).toEqual(true);
        expect(ageError.isDisplayed()).toEqual(false);
        expect(btn.isEnabled()).toEqual(false);
    });
    it('should reject under 13', function() {
        input.sendKeys('11/16/2015');
        firstName.sendKeys('');
        expect(input.getAttribute('class')).toContain('ng-invalid');
        expect(dateError.isDisplayed()).toEqual(false);
        expect(ageError.isDisplayed()).toEqual(true);
        expect(btn.isEnabled()).toEqual(false);
    })
    it('should accept a valid date', function() {
        input.sendKeys('11/16/2001');
        firstName.sendKeys('');
        expect(input.getAttribute('class')).toContain('ng-valid');
        expect(dateError.isDisplayed()).toEqual(false);
        expect(ageError.isDisplayed()).toEqual(false);
    })
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
});