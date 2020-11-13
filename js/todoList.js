export default class ToDoList {
    constructor() {
        this._list = [];
    }
    getList() {
        return this._list;
    }
    clearList() {
        this._list = [];
    }
    addItem(itemObj) {
        this._list.push(itemObj);
    }
    removeItem(id) {
        const list = this._list;
        var n = list.length;
        for( let i = 0; i < n; i++) {
            if(list[i]._id == id) {
                list.splice(i, 1);
                break;
            }
        }
    }
}