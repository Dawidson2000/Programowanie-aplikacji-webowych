import {Notes} from "./notes";
import {AppStorage} from "./appStorage";
import {INote} from './noteInterface';

export class App {
    notes = new Notes();
    appStorage = new AppStorage();
    
    noteTitleInput: HTMLInputElement = document.querySelector('#noteTitleInput');
    noteBodyeInput: HTMLInputElement = document.querySelector('#noteBodyeInput');
    noteColorInput: HTMLInputElement = document.querySelector('#noteColorInput');
    notePinCheckBox: HTMLInputElement = document.querySelector('#pinNote');
    closeButton: HTMLButtonElement = document.querySelector('#newNoteButton');
    newNotePanel: HTMLElement = document.getElementById('newNotePanel');

    constructor() {
        this.setButtonsEvent();
        this.notes.loadNotesFromStorage();
        this.setInputsEvent();
    }

    setButtonsEvent() {
        this.closeButton.addEventListener('click', () =>this.notes.addNote(this.handleAddNote()));
        
        document.getElementById('showNewNotePanelBtn').addEventListener('click', ()=> this.setElementVisibility(this.newNotePanel));
    }
    
    setInputsEvent() {
        this.noteColorInput.addEventListener('input', () =>  this.changePanelColor(this.noteColorInput))

        this.noteTitleInput.addEventListener('input', ()=> this.setButtonActive(this.noteTitleInput))
    }


    setElementVisibility(element: HTMLElement){
        element.classList.toggle("visible");
        document.getElementById('showNewNotePanelBtn').classList.toggle('rotate');
        this.setDefaultValues(this.newNotePanel);
    }

    setButtonActive(noteTitleInput: HTMLInputElement){
             
        if(noteTitleInput.value)
           this.closeButton.classList.add("visible");
        else
            this.closeButton.classList.remove("visible");   
    }

    handleAddNote(): INote{
        const note = this.getNotesElements();
        
        this.setElementVisibility(this.newNotePanel);
        this.setDefaultValues(this.newNotePanel);
        this.setButtonActive(this.noteTitleInput);       
        
        return note;       
    }

    getNotesElements(): INote{
        const date = Date.now();
        
        console.log(this.noteTitleInput.value);
             
        return {title: this.noteTitleInput.value, 
                body: this.noteBodyeInput.value, 
                color: this.noteColorInput.value, 
                date: date, 
                isPinned: this.notePinCheckBox.checked};       
    }

    changePanelColor(colorInput: HTMLInputElement){
        const newNotePanel = document.getElementById("newNotePanel");
        newNotePanel.style.backgroundColor = colorInput.value;
    }

    setDefaultValues(newNotePanel: HTMLElement){
        this.notePinCheckBox.checked = false;
        this.noteTitleInput.value = '';
        this.noteBodyeInput.value = '';
        this.noteColorInput.value = '#202124';
        newNotePanel.style.backgroundColor = '#202124';
    }

}

