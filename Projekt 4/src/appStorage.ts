import {INote} from './noteInterface';

export class AppStorage<INote>{

    noteTab: INote[] = [];

    constructor(){
        this.getData();
    }

    saveData(data: INote[]) {
        localStorage.setItem('noteTab', JSON.stringify(data));
    }
    
    getData(): INote[] {
        const data = JSON.parse(localStorage.getItem('noteTab'));
        this.noteTab = [];

        if(data && data.length > 0){
            data.forEach((note: INote) => {
                this.noteTab.push(note);
            })
        }
        return this.noteTab;        
    }

    deleteFromStorage(note: HTMLElement){
        const notes = this.getData();
        
        notes.forEach((element: any, index: number) =>{
            console.log(index);
            if(note.parentElement.id===element.date.toString())
                notes.splice(index, 1);
        })

        this.saveData(notes);
    }
}