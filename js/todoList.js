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
    upItem(id) {
        const list = this._list;
        var n = list.length;
        var i = 0;
        for(i = 0; i < n; i++){
            if(list[i]._id == id){
                break;
            }
        }
        if(i != 0){
            this.swapItem(i-1, i);
        }
    }
    downItem(id) {
        const list = this._list;
        var n = list.length;
        var i = 0;
        for(i = 0; i < n; i++){
            if(list[i]._id == id){
                break;
            }
        }
        if(i != n-1){
            this.swapItem(i, i+1);
        }
    }
    swapItem(i, j) {
        var temp = this._list[i];
        this._list[i] = this._list[j];
        this._list[j] = temp;
    }
}