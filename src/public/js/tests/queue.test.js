import {Queue} from '../queue.js';


describe('The Queue', () => {
    it('works', () => {
        let queue = new Queue;
        
        expect(queue).toBeInstanceOf(Queue);
    });


    test('test recognizes different objects', () => {
        let obj = {
            "subject": "g",
            "todo": "h",
            "details": "",
            "due": "2020-04-07T06:00:00.000Z",
            "points": "1"
        };

        let obj2 = {
            "subject": "g",
            "todo": "h",
            "details": "",
            "due": "2020-04-07T06:00:00.000Z",
            "points": "2"
        };

        let category = 'Homework';
        let queue = new Queue;

        queue.pushTo(category, obj);
    
        expect(queue.queue[category][0]).not.toEqual(obj2);
    });


    it('allows a new item to be pushed to the que', () => {
        let obj = {
            "subject": "g",
            "todo": "h",
            "details": "",
            "due": "2020-04-07T06:00:00.000Z",
            "points": "1"
        };

          let category = 'Homework';

          let queue = new Queue;
          queue.pushTo(category, obj);

          expect(queue.queue[category][0]).toEqual(obj);
    });


    it('allows 2 new items to be pushed to the que', () => {
        let obj = {
            "subject": "g",
            "todo": "h",
            "details": "",
            "due": "2020-04-07T06:00:00.000Z",
            "points": "1"
        };

        let obj2 = {
            "subject": "g",
            "todo": "k",
            "details": "",
            "due": "2020-04-25T06:00:00.000Z",
            "points": "1"
        };

        let queue = new Queue;
        let category = 'Homework';

        queue.pushTo(category, obj);
        queue.pushTo(category, obj2);
    
        expect(queue.queue[category].length).toEqual(2);
    });
});