import {AppStorage} from "./appStorage";
import {Note} from "./note";

export class Notes{
    appStorage = new AppStorage();
    note = new Note();

    constructor(){
    }
    
    addNote(note: string){
        this.appStorage.noteTab.push(note.toLowerCase());
        console.log(this.appStorage.noteTab);
        
        this.appStorage.saveData(this.appStorage.noteTab);

        this.note.renderNote(note);
    }

    loadNotesFromStorage(){
       const notes = this.appStorage.getData();

       notes.forEach((element: string) => {
           this.note.renderNote(element)
       });
    }
}