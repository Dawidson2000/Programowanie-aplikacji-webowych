import {INote, IStorage} from '../interfaces';

import firebase from 'firebase';
import {firebaseConfig} from '../firebaseConfig';

export class AppLocalStorage implements IStorage{

    noteTab: INote[] = [];

    constructor(){
        this.getNotes();
    }

    async saveNote(note: INote) {
        const notes = await this.getNotes();
        notes.push(note);
        localStorage.setItem('noteTab', JSON.stringify(notes));
    }
    
    async getNotes(): Promise<INote[]> {
        const data = JSON.parse(localStorage.getItem('noteTab'));
        this.noteTab = [];

        if(data && data.length > 0){
            data.forEach((note: INote) => {
                this.noteTab.push(note);
            })
        }
        return this.noteTab;        
    }

    async updateNote(note: INote){  
        const notes = JSON.parse(localStorage.getItem('noteTab'));
        
        const existingIndex = notes.findIndex((elem: INote) => elem.id === note.id);
        notes[existingIndex] = note;

        localStorage.setItem('noteTab', JSON.stringify(notes));
    }

    async deleteFromStorage(note: INote){
        const notes = JSON.parse(localStorage.getItem('noteTab'));
        notes.splice(notes.findIndex((elem: INote) => elem.id === note.id), 1);

        localStorage.setItem('noteTab', JSON.stringify(notes));
    }
}