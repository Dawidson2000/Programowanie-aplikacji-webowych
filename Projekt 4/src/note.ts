import {INote} from './noteInterface';

export class Note{

    constructor(){
    }

    renderNote(note: INote){
        const unpinnedNotesContainer: HTMLElement = document.getElementById("unpinnedNotes");
        const pinnedNotesContainer: HTMLElement = document.getElementById("pinnedNotes");

        const noteCard = document.createElement('div');
        noteCard.className = "note";
            const titleHeader = document.createElement('h2')
            titleHeader.innerText = note.title;

            const noteBody = document.createElement('p');
            noteBody.innerText = note.body;

            const date = document.createElement('span');
            date.innerText = this.convertMilisecondsToHumanFriendlyDate(note.date);
        
        noteCard.appendChild(titleHeader);
        noteCard.appendChild(noteBody);    
        noteCard.appendChild(date);        
        
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

}