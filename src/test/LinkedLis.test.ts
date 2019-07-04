import LinkedList from '../ts/Linkedlist';

describe('LinkedList', () => {
  describe('constructor', () => {
    it('instatiates an empty LinkedList when no arguments are given', () => {
      const linkedList = new LinkedList();
      expect(linkedList.size).toBe(0);
    });

    it('instantiates a LinkedList with all arguments in the correct order', () => {
      const initialValues = [10, 2, 4, 1, 0];
      const linkedList = new LinkedList(...initialValues);
      
      expect(linkedList.size).toBe(initialValues.length);

      const initialValueFoundCount = initialValues.reduce((agg, cur, index) => {
        if (linkedList.get(index) !== cur) {
          return agg;
        }

        return agg + 1;
      }, 0);

      expect(initialValueFoundCount).toBe(initialValues.length);
    });
  });
});