export interface INote{
    id: string;
    title: string;
    body: string;
    color: string;
    date: number;
    isPinned: boolean;
}
export interface IStorage{
    saveNote: (note: INote) => Promise<void>;
    getNotes: () => Promise<INote[]>;
    updateNote: (note: INote) => Promise<void>;
    deleteFromStorage: (note: INote) => Promise<void>;
}