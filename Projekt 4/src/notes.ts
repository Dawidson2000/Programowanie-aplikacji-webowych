import AppStorage from "./appStorage";
import {Note} from "./note";
import {INote} from './interfaces';

export class Notes{
    appStorage = new AppStorage();
    note = new Note();

    constructor(){
    }
    
    async addNote(note: INote){
        this.appStorage.saveNote(note);

        this.note.renderNote(note);
    }

    async loadNotesFromStorage(){
       const notes = await this.appStorage.getNotes() as INote[];
        notes.forEach((note: INote) => {
            this.note.renderNote(note)
        });
    }
}