import {INote} from './noteInterface';

export class Note{

    constructor(){
    }

    renderNote(note: INote){
        const noteContainer: HTMLElement = document.getElementById("notes");

        const noteCard = document.createElement('div');
        noteCard.className = "note";
        noteCard.innerText = note.title + ' ' + note.body + ' ' + note.date;
        noteCard.style.backgroundColor = note.color;
        noteContainer.appendChild(noteCard);
    }

}