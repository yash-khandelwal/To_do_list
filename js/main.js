import ToDoList from "./todoList.js";
import ToDoItem from "./todoItem.js";

const toDoList = new ToDoList();

// Launch app
document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    // Add Listeners 
    const itemEntryForm = document.getElementById("itemEntryForm");
    itemEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        precessSubmission();
    });

    const clearItems = document.getElementById("clearItems");
    clearItems.addEventListener("click", (event) => {
        const list = toDoList.getList();
        if(list.length){
            const confirmed = confirm("Are you sure you want to clear the entire list?");
            if(confirmed){
                toDoList.clearList();
                updatePresistentData(toDoList.getList());
                refreshThePage();
            }
        }
    })

    // Procedural

    // load list object
    loadListObject();
    // refresh the page
    refreshThePage();
};

const loadListObject = () => {
    const storedList = localStorage.getItem("myToDoList");
    if( typeof storedList !== "string") return;
    const parsedList = JSON.parse(storedList);
    parsedList.forEach(itemObj => {
        const newToDoItem = createNewItem(itemObj._id, itemObj._item);
        toDoList.addItem(newToDoItem);
    });
};

const refreshThePage = () => {
    clearListDisplay();
    renderList();
    clearItemEntryFeild();
    setFocusOnItemEntryFeild();
};

const clearListDisplay = () => {
    const parentElement = document.getElementById("listItems");
    deleteContents(parentElement);
};

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while(child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const renderList = () => {
    const list = toDoList.getList();
    list.forEach(item => {
        buildListItem(item);
    });
};

const buildListItem = (item) => {
    const div = document.createElement("div");
    div.className = "item";
    const check = document.createElement("input");
    check.type = "checkbox";
    check.id = item.getId();
    check.tabIndex = 0;
    addClickListenerToCheckbox(check);
    const label = document.createElement("label");
    label.htmlFor = item.getId();
    label.textContent = item.getItem();
    const up = document.createElement("button");
    up.innerHTML = "&uarr;";
    up.className = "btn";
    up.id = item.getId();
    addClickListenerToUpBtn(up);
    const down = document.createElement("button");
    down.innerHTML = "&darr;";
    down.className = "btn";
    down.id = item.getId();
    addClickListenerToDownBtn(down);
    div.appendChild(check);
    div.appendChild(label);
    const child_div = document.createElement("div");
    child_div.className = "prioritise";
    child_div.appendChild(up);
    child_div.appendChild(down);
    div.appendChild(child_div);
    const container = document.getElementById("listItems");
    container.appendChild(div);
};

const addClickListenerToCheckbox = (checkbox) => {
    checkbox.addEventListener("click", (event) => {
        toDoList.removeItem(checkbox.id);
        updatePresistentData(toDoList.getList());
        setTimeout(() => {
            refreshThePage();
        }, 2000);
    });
};

const addClickListenerToUpBtn = (button) => {
    button.addEventListener("click", (event) => {
        toDoList.upItem(button.id);
        updatePresistentData(toDoList.getList());
        setTimeout(() => {
            refreshThePage();
        }, 100);
    });
}; 

const addClickListenerToDownBtn = (button) => {
    button.addEventListener("click", (event) => {
        toDoList.downItem(button.id);
        updatePresistentData(toDoList.getList());
        setTimeout(() => {
            refreshThePage();
        }, 100);
    });
};

const updatePresistentData = (listArray) => {
    localStorage.setItem("myToDoList", JSON.stringify(listArray));
};

const clearItemEntryFeild = () => {
    document.getElementById("newItem").value = "";
};

const setFocusOnItemEntryFeild = () => {
    document.getElementById("newItem").focus();
};

const precessSubmission = () => {
    const newEntryText = getNewEntry();
    if(!newEntryText.length) {
        return;
    }
    const nextItemId = calcNextItemId();
    const toDoItem = createNewItem(nextItemId, newEntryText);
    toDoList.addItem(toDoItem);
    updatePresistentData(toDoList.getList());
    refreshThePage();
};

const getNewEntry = () => {
    return document.getElementById("newItem").value.trim();
};

const calcNextItemId = () => {
    let nextItemId = 1;
    const list = toDoList.getList();
    if(list.length > 0){
        nextItemId = list[list.length - 1].getId() + 1;
    }
    return nextItemId;
};

const createNewItem = (itemId, itemText) => {
    const toDo = new ToDoItem();
    toDo.setId(itemId);
    toDo.setItem(itemText);
    return toDo;
};