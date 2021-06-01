import {INote, IStorage} from './interfaces';

import firebase from 'firebase';
import {firebaseConfig} from './firebaseConfig';

import {config, storageType} from './config';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export class LocalStorage implements IStorage{

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

    async deleteFromStorage(note: HTMLElement){
        const notes = await this.getNotes();
        
        notes.forEach((element: INote, index: number) =>{
            console.log(index);
            if(note.parentElement.id===element.date.toString())
                notes.splice(index, 1);
        })

        localStorage.setItem('noteTab', JSON.stringify(notes));
    }
}

export class AppFirestoreStorage implements IStorage{

    noteTab: INote[] = [];
      
    constructor(){     
    }
    
    async saveNote(note: INote){
        const res = await db.collection('notes').add(note);
    }

    async getNotes(): Promise<INote[]>{
        /*const data  = await db.collection('notes').get().then(res => (res.docs.map((res) =>{
            res.data()
        }))) as INote[]*/

        const res = await db.collection('notes').get().then(res => ({
            data: res.docs.map((res) => ({
                data: res.data(),
                id: res.id
            }))
        }));

        const data = res.data.map((note) => ({
            ...note.data,
            id: note.id,
        }));
   
        console.log(data);
        this.noteTab = [];

       
        return Promise.resolve(data as unknown as INote[]);        
    }

    async deleteFromStorage(note: HTMLElement){      
        const notes = await this.getNotes();

        notes.forEach(async (element: any, index: number) =>{
            console.log(index);
            if(note.parentElement.id===element.date.toString())
                await db.collection('notes').doc(element.id).delete();
        })
    }

    async updateNote(note: INote) {
        await db.collection('notes').doc(note.id).update(note);
    }

}

let AppStorage: typeof AppFirestoreStorage | typeof LocalStorage;

switch (config.storageType) {
    case storageType.AppFirestoreStorage:
        AppStorage = AppFirestoreStorage; break;
    case storageType.LocalStorage:
        AppStorage = LocalStorage; break;
    default:
        AppStorage = LocalStorage;
}

export default AppStorage;
