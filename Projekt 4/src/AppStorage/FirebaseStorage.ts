import {INote, IStorage} from '../interfaces';

import firebase from 'firebase';
import {firebaseConfig} from '../firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export class AppFirestoreStorage implements IStorage{

    noteTab: INote[] = [];
      
    constructor(){     
    }
    
    async saveNote(note: INote){
        const res = await db.collection('notes').add(note);
    }

    async getNotes(): Promise<INote[]>{
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
        
        this.noteTab = [];

       
        return Promise.resolve(data as unknown as INote[]);        
    }

    async deleteFromStorage(note: INote){      
        await db.collection('notes').doc(note.id).delete();
    }

    async updateNote(note: INote) {
        await db.collection('notes').doc(note.id).update(note);
    }

}