describe('dd', function(){

    it('dd', async function() {

        await browser.driver.manage().window().setSize(1920, 1080);
        await browser.driver.get('https://angular.io/');

    });

});