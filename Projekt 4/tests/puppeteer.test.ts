import * as puppeteer from 'puppeteer';

describe('Add note test', () => {

    let prevNumberOfNotes: number;
    let newNumberOfNotes: number;
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

   const numberOfNotes = async (): Promise<number> => await page.evaluate(() => {
        const notes = document.getElementById('unpinnedNotes'); 
        return Promise.resolve(notes.childElementCount as unknown as number); 
    });

    beforeAll(async () => {
        //browser = await puppeteer.launch({headless: false, slowMo: 50});
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:8080/');
        
        prevNumberOfNotes = await numberOfNotes();
        
        await page.click("#showNewNotePanelBtn"); 
        await page.waitForSelector("#noteTitleInput");
        await page.type("#noteTitleInput", 'Przykładowy tytuł');
        await page.type("#noteBodyInput", 'Przykładowa treść');
        await page.screenshot({path: 'tests/before-screenshot.png'});
        await page.click("#newNoteButton");
        
        newNumberOfNotes = await numberOfNotes();
    }, 1500000); 
    
    it('note was added', async () => {       
        expect(newNumberOfNotes).toBeGreaterThan(prevNumberOfNotes);
    })

    afterAll(async () => {
        await page.screenshot({path: 'tests/after-screenshot.png'});
        await browser.close();
    })
});



