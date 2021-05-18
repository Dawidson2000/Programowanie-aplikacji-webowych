import {Notes} from "./notes";
import {AppStorage} from "./appStorage";
import {INote} from './noteInterface';

export class App {
    notes = new Notes();
    appStorage = new AppStorage();

    constructor() {
        this.setButtonsEvent();
        this.notes.loadNotesFromStorage();
        this.setInputsEvent();
    }

    setButtonsEvent() {
        document.getElementById('newNoteButton').addEventListener('click', () =>this.notes.addNote(this.handleAddNote()));
        
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

    handleAddNote(): INote{
        const newNotePanel: HTMLElement = document.getElementById('newNotePanel');
        this.setElementVisibility(newNotePanel);
        const note = this.getNotesElements();
        
        this.setDefaultValues(newNotePanel);       
        return note;       
    }

    getNotesElements(): INote{
        const noteTitleInput: HTMLInputElement = document.querySelector('#noteTitleInput');
        const noteBodyeInput: HTMLInputElement = document.querySelector('#noteBodyeInput');
        const noteColorInput: HTMLInputElement = document.querySelector('#noteColorInput');
        const date = Date.now(); 
             
        return {title: noteTitleInput.value, body: noteBodyeInput.value, color: noteColorInput.value, date: date};       
    }

    changePanelColor(colorInput: HTMLInputElement){
        const newNotePanel = document.getElementById("newNotePanel");
        newNotePanel.style.backgroundColor = colorInput.value;
    }

    setDefaultValues(newNotePanel: HTMLElement){
        const noteTitleInput: HTMLInputElement = document.querySelector('#noteTitleInput');
        const noteBodyeInput: HTMLInputElement = document.querySelector('#noteBodyeInput');
        const noteColorInput: HTMLInputElement = document.querySelector('#noteColorInput'); 

        noteTitleInput.value = null;
        noteBodyeInput.value = null;
        newNotePanel.style.backgroundColor = '#202124';
    }

}

