export class AppStorage{

    noteTab: string[] = [];

    constructor(){
        this.getData();
    }

    saveData(data: any) {
        localStorage.setItem('noteTab', JSON.stringify(data));
    }
    
    getData():string[] {
        const data = JSON.parse(localStorage.getItem('noteTab'));
        this.noteTab = [];

        if(data && data.length > 0){
            data.forEach((note: string) => {
                this.noteTab.push(note);
            })
        }
        return this.noteTab;        
    }
}