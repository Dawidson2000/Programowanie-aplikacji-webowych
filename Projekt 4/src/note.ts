import {INote} from './interfaces';

import AppStorage from "./AppStorage";
import {Notes} from "./notes";

export class Note{
    appStorage = new AppStorage();

    constructor(){
    }

    renderNote(note: INote){
        const unpinnedNotesContainer: HTMLElement = document.getElementById("unpinnedNotes");
        const pinnedNotesContainer: HTMLElement = document.getElementById("pinnedNotes");

        const noteCard = document.createElement('div');
        noteCard.className = "note";
        noteCard.id = note.date.toString();
            const titleHeader = document.createElement('h2')
            titleHeader.innerText = note.title;
            titleHeader.addEventListener('blur', () => this.editNote(titleHeader, 'title'))
            titleHeader.setAttribute('role', 'textbox');
            titleHeader.contentEditable = 'true';

            const noteBody = document.createElement('p');
            noteBody.innerText = note.body;
            noteBody.addEventListener('blur', () => this.editNote(noteBody, 'body'))
            noteBody.style.backgroundColor = note.color;
            noteBody.setAttribute('role', 'textbox');
            noteBody.contentEditable = 'true';
            
            const date = document.createElement('span');
            date.innerText = this.convertMilisecondsToHumanFriendlyDate(note.date);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = "deleteBtn";
            deleteBtn.innerText = "+";
            deleteBtn.addEventListener('click', ()=>this.deleteNote(deleteBtn))

            const pinBtn = document.createElement('button');
            pinBtn.className = "pinBtn";
                const pinIcon = document.createElement('i');
                pinIcon.className = "icon-pin";
            pinBtn.appendChild(pinIcon);
            pinBtn.addEventListener('click', ()=>this.pinNote(pinBtn))
        
        noteCard.appendChild(titleHeader);
        noteCard.appendChild(noteBody);    
        noteCard.appendChild(date);
        noteCard.appendChild(deleteBtn);
        noteCard.appendChild(pinBtn);  
        
        noteCard.style.backgroundColor = note.color;
        
        if(note.color==="#202124")
            noteCard.style.border = '1px solid #80868b';

        if(note.isPinned) pinnedNotesContainer.prepend(noteCard);
        else unpinnedNotesContainer.prepend(noteCard);       
    }

    convertMilisecondsToHumanFriendlyDate(miliseconds: number): string{
        const dateObject = new Date(miliseconds);
        const humanDateFormat = dateObject.toLocaleString();

        return humanDateFormat;
    }

    async deleteNote(note: HTMLElement){
        note.parentElement.remove();
        
        const notes = await this.appStorage.getNotes();

        notes.forEach(async (element: INote, index: number) =>{
            console.log(index);
            if(note.parentElement.id===element.date.toString()){                 
                this.appStorage.deleteFromStorage(element);
            }
                
        })
    }

    async editNote(note: HTMLElement, noteElement: string){
        const notes = await this.appStorage.getNotes() as INote[];
        
        notes.forEach((element: INote, index: number) =>{
            if(note.parentElement.id===element.date.toString()){
                if(noteElement==='body')
                    element.body = note.innerText;
                else  if(noteElement==='title')
                    element.title = note.innerText;
 
            element.date = Date.now();
            
            this.appStorage.updateNote(element);
            }                
        })
        

       //GIGA NIESWIEŻE
        this.refreshNote(notes);
    }

    async pinNote(note: HTMLElement){
        const notes = await this.appStorage.getNotes() as INote[];;

        notes.forEach((element: INote, index: number) =>{
            if(note.parentElement.id===element.date.toString()){
               element.isPinned = !element.isPinned;
               this.appStorage.updateNote(element);          
            }                
        })

       //GIGA NIESWIEŻE
       this.refreshNote(notes);
      
    }

    refreshNote(notes: INote[]){
        document.getElementById('pinnedNotes').innerHTML = null;
        document.getElementById('unpinnedNotes').innerHTML = null;
        
        notes.forEach((note: INote) => {
            this.renderNote(note)
        }); 
    }

}