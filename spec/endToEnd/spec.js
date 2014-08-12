describe('angularjs homepage', function() {

     it('NavigationBar should work', function() {
        browser.get('/');
        element(by.id('createSentence')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/createSentence');
        element(by.id('topFive')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/topFive');
        element(by.id('home')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/');
    });


    it('should show the modal to share the sentence', function() {
        browser.get('/');
        element(by.id('shareSentence')).click();
        browser.sleep(5000);
      expect(element(by.id('shareModalContent.html')).isDisplayed()).toBe(true);
    });


    it('should have a title', function() {
        browser.get('/');

        expect(browser.getTitle()).toEqual('NoSentenceSense');
    });

    it('Test of create Sentence valid input', function() {
        browser.get('/');
        element(by.id('createSentence')).click();
        element(by.model('user')).sendKeys('protractorTest');
        element(by.model('mail')).sendKeys('test@protractor.com');
        element(by.model('sentenceIn')).sendKeys('This is an endToEnd test');
        expect(element(by.id('errorMessage')).getText()).toEqual('');
        expect(element(by.id('confirmButton')).isEnabled()).toBe(true);

    });

    it('Test of create Sentence invalid input no input at all', function() {
        browser.get('/');
        element(by.id('createSentence')).click();
        element(by.model('user')).sendKeys('');
        element(by.model('mail')).sendKeys('');
        element(by.model('sentenceIn')).sendKeys('');
        expect(element(by.id('errorMessage')).getText()).toEqual('Bitte füllen sie alle Pflichtfelder aus !');
        expect(element(by.id('confirmButton')).isEnabled()).toBe(false);


    });

    it('Test of create Sentence invalid input no mail and sentence', function() {

         browser.get('/');
        element(by.id('createSentence')).click();
        element(by.model('user')).sendKeys('protractorTest');
        element(by.model('mail')).sendKeys('');
        element(by.model('sentenceIn')).sendKeys('');
        expect(element(by.id('errorMessage')).getText()).toEqual('Bitte füllen sie alle Pflichtfelder aus !');
        expect(element(by.id('confirmButton')).isEnabled()).toBe(false);


    });


    it('Test of create Sentence invalid input no sentence ', function() {
          browser.get('/');
        element(by.id('createSentence')).click();
        element(by.model('user')).sendKeys('protractorTest');
        element(by.model('mail')).sendKeys('test@protractor.com');
        element(by.model('sentenceIn')).sendKeys('');
        expect(element(by.id('errorMessage')).getText()).toEqual('Bitte füllen sie alle Pflichtfelder aus !');
        expect(element(by.id('confirmButton')).isEnabled()).toBe(false);


    });


    it('Test of create Sentence invalid input mail input isn´t a mailaddress', function() {
        browser.get('/');
        element(by.id('createSentence')).click();
        element(by.model('user')).sendKeys('protractorTest');
        element(by.model('mail')).sendKeys('testmailNoAt');
        element(by.model('sentenceIn')).sendKeys('This is a Sentence');
        expect(element(by.id('errorMessage')).getText()).toEqual('Bitte füllen sie alle Pflichtfelder aus !');
        expect(element(by.id('confirmButton')).isEnabled()).toBe(false);

    });

     it('invalid captcha', function() {

     	browser.get('/');
        element(by.id('createSentence')).click();
        element(by.model('user')).sendKeys('protractorTest');
        element(by.model('mail')).sendKeys('test@protractor.com');
        element(by.model('sentenceIn')).sendKeys('This is an endToEnd test');
        element(by.id('confirmButton')).click();
        expect(element(by.id('errorMessage')).getText()).toEqual('');
        expect(element(by.id('confirmButton')).isEnabled()).toBe(true);
        expect(element(by.id('captchaError')).getText()).toBe('Das Captcha war falsch veruchen sie es erneut');
       

    });


     it('vote Sense should increase the senselessness', function(){
        browser.get('/');
        var percentBefore = element(by.id('sentencePercentage')).getText();
        element(by.id('senseButton')).click();
        expect(element(by.id('sentencePercentage')).getText()).notToEqual(percentBefore);
     });




    /*it('should create a  new sentence', function() {
    browser.get('/');
    element.(by.id('home')).click();

    expect(browser.getTitle()).toEqual('NoSentenceSense');
  });

    it('Test of vote Buttons', function() {
    browser.get('/');

    expect(browser.getTitle()).toEqual('NoSentenceSense');
  	});

  	 it('Test of Modals', function() {
    browser.get('/');

    expect(browser.getTitle()).toEqual('NoSentenceSense');
  	});*/


});
