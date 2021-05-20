import {INote} from './noteInterface';

export class Note{

    constructor(){
    }

    renderNote(note: INote){
        const unpinnedNotesContainer: HTMLElement = document.getElementById("unpinnedNotes");
        const pinnedNotesContainer: HTMLElement = document.getElementById("pinnedNotes");

        const noteCard = document.createElement('div');
        noteCard.className = "note";
        noteCard.innerText = note.title + ' ' + note.body + ' ' + note.date + note.isPinned;
        noteCard.style.backgroundColor = note.color;
        
        if(note.isPinned) pinnedNotesContainer.appendChild(noteCard);
        else unpinnedNotesContainer.appendChild(noteCard);
        
    }

}