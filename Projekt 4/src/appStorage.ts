export class AppStorage{

    noteTab: string[] = [];

    constructor(){
        this.getData();
    }

    saveData(data: any) {
        localStorage.setItem('noteTab', JSON.stringify(data));
    }
    
    getData() {
        const data = JSON.parse(localStorage.getItem('noteTab'));
        
        if(data && data.length > 0){
            data.forEach((note: string) => {
                console.log(`FromLocalStorage: ${note}`)
                this.noteTab.push(note);
            })
        }        
    }
}