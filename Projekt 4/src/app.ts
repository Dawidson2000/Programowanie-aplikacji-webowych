import {Notes} from "./notes";
import {AppStorage} from "./appStorage";

export class App {
    notes: Notes;
    appStorage: AppStorage;

    constructor() {
        this.setButtonEvent();
        this.notes = new Notes();
        this.appStorage = new AppStorage();
        this.appStorage.getData();
    }

    setButtonEvent() {
        document.getElementById('newNoteButton').addEventListener('click', () =>this.notes.addNote(this.getCityInputValue()));
    }

    getCityInputValue(): string{
        const newNoteInput: HTMLInputElement = document.querySelector('#newNoteInput'); 
             
        return newNoteInput.value;       
    }
}

