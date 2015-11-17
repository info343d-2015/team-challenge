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

    // Validates that any non-dates present the correct error
    it('should reject non-dates', function() {
        input.sendKeys('foobar');
        firstName.sendKeys('');
        expect(input.getAttribute('class')).toContain('ng-invalid');
        expect(dateError.isDisplayed()).toEqual(true);
        expect(ageError.isDisplayed()).toEqual(false);
        expect(btn.isEnabled()).toEqual(false);
    });

    // Validates that dates under 13 years present the correct error
    it('should reject under 13', function() {
        input.sendKeys('11/16/2015');
        firstName.sendKeys('');
        expect(input.getAttribute('class')).toContain('ng-invalid');
        expect(dateError.isDisplayed()).toEqual(false);
        expect(ageError.isDisplayed()).toEqual(true);
        expect(btn.isEnabled()).toEqual(false);
    });

    // Displays no errors on a valid date
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
    var notice = element(by.id('needLast'));

    beforeEach(function () {
        browser.get(url);
    });

    // If valid input is given, no error shown
    it('should be able to validate the last name field.', function() {
        lastname_field.sendKeys('Haugh');
        expect(notice.isDisplayed()).toEqual(false);
    });

    // Displays Error if no last name is provided
    it('should show a warning when the last name entered is not valid.', function() {
        lastname_field.sendKeys('');
        firstname_field.sendKeys('Ali');
        expect(notice.isDisplayed()).toEqual(true);
    });

    // Confirms that the input is considered valid
    it('should not be highlighted when the input is valid', function() {
        lastname_field.sendKeys('Haugh');
        expect(lastname_field.getAttribute("class")).toContain('ng-valid');
    });

    // Confirms that the input is considered invalid
    it('should  be highlighted when the input is invalid', function() {
        lastname_field.sendKeys('');
        firstname_field.sendKeys('Ali');
        expect(lastname_field.getAttribute("class")).toContain('ng-invalid');
    });
});

describe('Password Fields', function() {
    var pass1 = element(by.id('password'));
    var pass2 = element(by.id('confirmP'));

    var matchAlert = element(by.id('match-alert'));
    var reqAlert = element(by.id('required-alert'));
    var changeFocus = element(by.id('first-name'));

    beforeEach(function() {
        browser.get(url);
    });

    // Should display empty error when no entry
    it('should be required', function() {
        pass1.sendKeys('');
        changeFocus.sendKeys('');

        expect(reqAlert.isDisplayed()).toEqual(true);
        expect(matchAlert.isDisplayed()).toEqual(false);
    });

    // Should display no errors when inputs match
    it('should match', function() {
        pass1.sendKeys('test');
        pass2.sendKeys('test');
        changeFocus.sendKeys('');

        expect(matchAlert.isDisplayed()).toEqual(false);
        expect(reqAlert.isDisplayed()).toEqual(false);
    });

    // Should display an error stating that the passwords do not match
    it('should display an error if it does not match', function() {
        pass1.sendKeys('test');
        pass2.sendKeys('not test');
        changeFocus.sendKeys('');

        expect(matchAlert.isDisplayed()).toEqual(true);
        expect(reqAlert.isDisplayed()).toEqual(false);
    });
});

describe('Submit buttons', function() {

    var email = element(by.id('email'));
    var first = element(by.id('first-name'));
    var last = element(by.id('lastname'));
    var birth = element(by.id('birthday'));
    var pass = element(by.id('password'));
    var confirm = element(by.id('confirmP'));

    // Re-enters valid data into each field prior to each test
    beforeEach(function () {
        browser.get(url);
        email.sendKeys('abc1@gmail.com');
        expect(submit.isEnabled()).toEqual(false);
        first.sendKeys('john');
        expect(submit.isEnabled()).toEqual(false);
        last.sendKeys('smith');
        expect(submit.isEnabled()).toEqual(false);
        birth.sendKeys('12/12/2000');
        expect(submit.isEnabled()).toEqual(false);
        pass.sendKeys('password');
        expect(submit.isEnabled()).toEqual(false);
        confirm.sendKeys('password');
    });


    var submit = element(by.id('signup'));
    var reset = element(by.id('reset'));
    var message = element(by.id("success-alert"));

    // Confirms that a message is displayed upon successful submission
    it('should display a confirmation message when clicked', function() {
        expect(message.isDisplayed()).toEqual(false);
        submit.click();
        expect(message.isDisplayed()).toEqual(true);
    });

    // Validates that all fields are empty after the button is clicked
    it('button should clear all inputs when clicked', function() {
       submit.click();
       expect(email.getText()).toEqual("");
       expect(first.getText()).toEqual("");
       expect(last.getText()).toEqual("");
       expect(birth.getText()).toEqual("");
       expect(pass.getText()).toEqual("");
       expect(confirm.getText()).toEqual("");

    });

    // Validates that the reset button clears the form without showing the alert
    it('reset button should reset form', function() {
        reset.click();
        expect(message.isDisplayed()).toEqual(false);
        expect(email.getText()).toEqual("");
        expect(first.getText()).toEqual("");
        expect(last.getText()).toEqual("");
        expect(birth.getText()).toEqual("");
        expect(pass.getText()).toEqual("");
        expect(confirm.getText()).toEqual("");
    });

    // Confirms that the submit button is disabled
    it('should be disabled until form is valid', function() {
        expect(submit.isEnabled()).toEqual(true);
    });

});

describe('Email', function(){
	var input = element(by.model('email'));
	var firstname = element(by.model('firstname'));
	var message1 = element(by.id('emailblankmessage'));
	var message2 = element(by.id('emailerrormessage'));

	beforeEach(function() {
        browser.get(url);
    });

    // If the input is blank, the specific error is shown
	it('should reject blank', function(){
		input.sendKeys('');
		firstname.sendKeys('');
		expect( message1.isDisplayed()).toEqual(true);
		expect( message2.isDisplayed()).toEqual(false);
		expect(input.getAttribute('class')).toContain("ng-invalid");
	});

    // If the email is invalid, an invalid warning is shown
	it('should reject invalid', function(){
		var input = element(by.model('email'));
		input.sendKeys('invalidstuff');
		firstname.sendKeys('');
		expect( message2.isDisplayed()).toEqual(true);
		expect( message1.isDisplayed()).toEqual(false);
		expect(input.getAttribute('class')).toContain("ng-invalid");
	});

    // If the email is valid, no errors are shown
	it('hide error messages', function(){
		var input = element(by.model('email'));
		input.sendKeys('something@right.com'); 
		firstname.sendKeys('');
		expect( message1.isDisplayed()).toEqual(false);
		expect( message2.isDisplayed()).toEqual(false);
		expect(input.getAttribute('class')).toContain("ng-valid");
	});
});