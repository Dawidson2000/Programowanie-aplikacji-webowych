import {AppStorage} from "./appStorage";

export class Notes{
    appStorage = new AppStorage();

    constructor(){
    }
    
    addNote(note: string){
        this.appStorage.noteTab.push(note.toLowerCase());
        console.log(this.appStorage.noteTab);

        this.appStorage.saveData(this.appStorage.noteTab);
    }
}