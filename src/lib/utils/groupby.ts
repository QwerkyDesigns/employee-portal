export interface Item {
    [key: string]: string
}

const groupByProperty = (items: Item[], property: string) =>
    items.reduce((acc, item) => {
        (acc[item[property] = acc[item[property]] || []).push(item);
        return acc;
    }, {});

/*
  { 
    'category 1': [
      { id: 1, name: 'item 1', category: 'category 1' },
      { id: 3, name: 'item 3', category: 'category 1' },
      { id: 5, name: 'item 5', category: 'category 1' }
    ],
    'category 2': [
      { id: 2, name: 'item 2', category: 'category 2' },
      { id: 4, name: 'item 4', category: 'category 2' }
    ]
  }
  */
