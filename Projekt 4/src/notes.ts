import {AppStorage} from "./appStorage";
import {Note} from "./note";
import {INote} from './noteInterface';

export class Notes{
    appStorage = new AppStorage();
    note = new Note();

    constructor(){
    }
    
    addNote(note: INote){
        this.appStorage.noteTab.push(note);
        console.log(this.appStorage.noteTab);
        
        this.appStorage.saveData(this.appStorage.noteTab);

        this.note.renderNote(note);
    }

    loadNotesFromStorage(){
       const notes = this.appStorage.getData() as INote[];

        notes.forEach((note: INote) => {
            this.note.renderNote(note)
        });
    }
}