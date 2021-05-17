import {Notes} from "./notes";
import {AppStorage} from "./appStorage";

export class App {
    notes = new Notes();
    appStorage = new AppStorage();

    constructor() {
        this.setButtonsEvent();
        this.notes.loadNotesFromStorage();
        this.setInputsEvent();
    }

    setButtonsEvent() {
        document.getElementById('newNoteButton').addEventListener('click', () =>this.notes.addNote(this.getNoteInputValue()));
        
        const newNotePanel: HTMLElement = document.getElementById('newNotePanel');
        document.getElementById('showNewNotePanelBtn').addEventListener('click', ()=> this.setElementVisibility(newNotePanel));
    }
    
    setInputsEvent() {
        const colorInput = <HTMLInputElement>document.getElementById('noteColorInput');
        colorInput.addEventListener('input', () =>  this.changePanelColor(colorInput))
    }

    setElementVisibility(Element: HTMLElement){
        Element.classList.toggle("visible");
        document.getElementById('showNewNotePanelBtn').classList.toggle('rotate');
    }

    getNoteInputValue(): string{
        const newNoteInput: HTMLInputElement = document.querySelector('#newNoteInput'); 
             
        return newNoteInput.value;       
    }

    changePanelColor(colorInput: HTMLInputElement){
        const newNotePanel = document.getElementById("newNotePanel");
        newNotePanel.style.backgroundColor = colorInput.value;
    }

}

