describe('Website funcionality', function() {
    it('should be able to add data', function() {
        browser
            .url('/login')
            .setValue('input[name=email]', 'tevin@tevin.tevin')
            .setValue('input[name=password]', 'tevin')
            .click('button[type=submit]')

        	.click('.btn-info')

        	.setValue('input[name=data-letter]', 'c')
            .setValue('input[name=data-frequency]', '10')
            .click('#add-data-button')

        	// var url = browser.getUrl()
        	console.log('Data is added!')
    })

    //edit data
    it('should be able to edit data', function() {
        browser
            .url('/login')
            .setValue('input[name=email]', 'tevin@tevin.tevin')
            .setValue('input[name=password]', 'tevin')
            .click('button[type=submit]')

        	.click('#edit-data-button:nth-child(1)')

        	.setValue('input[name=data-letter]', 'ddd')
            .setValue('input[name=data-frequency]', '12')
            .click('#add-data-button')

        	console.log('Data is edited!')
    })

    //delete data
    it('should be able to delete data', function() {
        browser
            .url('/login')
            .setValue('input[name=email]', 'tevin@tevin.tevin')
            .setValue('input[name=password]', 'tevin')
            .click('button[type=submit]')
            // .waitForVisible('#delete-data-button', 5000);
            .click('#delete-data-button')

        	console.log('Data is deleted!')
    })
})
