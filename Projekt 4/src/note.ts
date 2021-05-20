import {INote} from './noteInterface';
import {AppStorage} from "./appStorage";

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

            const noteBody = document.createElement('p');
            noteBody.innerText = note.body;

            const date = document.createElement('span');
            date.innerText = this.convertMilisecondsToHumanFriendlyDate(note.date);

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = "+";
            deleteBtn.addEventListener('click', ()=>this.deleteNote(deleteBtn))
        
        noteCard.appendChild(titleHeader);
        noteCard.appendChild(noteBody);    
        noteCard.appendChild(date);
        noteCard.appendChild(deleteBtn);        
        
        noteCard.style.backgroundColor = note.color;
        
        if(note.color==="#202124")
            noteCard.style.border = '1px solid #80868b';

        if(note.isPinned) pinnedNotesContainer.appendChild(noteCard);
        else unpinnedNotesContainer.appendChild(noteCard);       
    }

    convertMilisecondsToHumanFriendlyDate(miliseconds: number): any{
        const dateObject = new Date(miliseconds);
        const humanDateFormat = dateObject.toLocaleString();

        return humanDateFormat;
    }

    deleteNote(note: HTMLElement){
        note.parentElement.remove();
 
        const notes = this.appStorage.getData() as INote[]

        notes.forEach((element: INote, index: number) =>{
            console.log(index);
            if(note.parentElement.id===element.date.toString())
                notes.splice(index, 1);
        })

        this.appStorage.saveData(notes);
    }

}