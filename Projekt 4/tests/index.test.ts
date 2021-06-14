import {Note} from '../src/note';

describe("convertMilisecondsToHumanFriendlyDate", () => {
    let note: Note;
    const dateValues = [[1622571838521, '1.06.2021, 20:23:58'], [0, '1.01.1970, 01:00:00']];
    beforeAll(()=>{
        note = new Note();
    })
    test.each(dateValues)('calculate %i to be %s', (miliseconds:  number, expectedDate: string) => {
        const date = note.convertMilisecondsToHumanFriendlyDate(miliseconds);
        expect(date).toBe(expectedDate)
    })
})
