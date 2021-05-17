export class Note{
    constructor(){
    }

    renderNote(title: string){
        const noteContainer: HTMLElement = document.getElementById("notes");

        const note = document.createElement('div');
        note.className = "note";
        note.innerText = title;
        noteContainer.appendChild(note);
    }

}