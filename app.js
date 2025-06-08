let btn = document.querySelector('.add');
let div1 = document.querySelector('.add-item');
let parentDiv = document.querySelector('.parent');
let emptyMsg = document.querySelector('.empty-msg');

// Load saved items from localStorage on startup
window.addEventListener('load', () => {
    const savedItems = JSON.parse(localStorage.getItem('bookie_items')) || [];
    savedItems.forEach(({ title, link }) => {
        createSavedItem(link, title);
    });
    updateEmptyMessage();
});

function updateEmptyMessage() {
    if (parentDiv.querySelectorAll('.links').length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
    }
}

btn.addEventListener('click', function () {
    let div = document.createElement('div');
    div.classList.add('input-div');

    let inp1 = document.createElement('input');
    let inp2 = document.createElement('input');
    let doneBtn = document.createElement('button');

    inp1.placeholder = "Enter Link";
    inp2.placeholder = "Enter Title";
    doneBtn.innerText = 'Done';

    // Style
    [inp1, inp2].forEach(input => {
        input.style.backgroundColor = 'white';
        input.style.border = '2px solid rgba(48, 28, 28, 0.38)';
        input.style.marginRight = '20px';
        input.style.height = "30px";
        input.style.borderRadius = '10px';
    });

    doneBtn.style.marginRight = '20px';

    div.appendChild(inp1);
    div.appendChild(inp2);
    div.appendChild(doneBtn);
    div1.appendChild(div);

    btn.style.display = 'none';

    let exitBtn = document.createElement('button');
    exitBtn.innerText = "Exit";
    div.appendChild(exitBtn);
    inp1.focus();

    inp2.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            doneBtn.click();
        }
    });

    exitBtn.addEventListener('click', function () {
        div.remove();
        btn.style.display = 'block';
    });

    doneBtn.addEventListener('click', function () {
        if (inp1.value.trim() === "" || inp2.value.trim() === "") {
            alert('All fields are compulsory');
            return;
        }

        createSavedItem(inp1.value, inp2.value);
        saveItem(inp1.value, inp2.value);

        div.remove();
        btn.style.display = 'block';
        updateEmptyMessage();
        alert('New Item Added Successfully!');
    });
});

function createSavedItem(link, title) {
    let newDiv = document.createElement('div');
    newDiv.classList.add('links');

    let linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.innerText = title;
    linkElement.target = '_blank';

    let dltBtn = document.createElement('button');
    dltBtn.innerText = "Delete";
    dltBtn.classList.add('deleteBtn');

    dltBtn.addEventListener('click', function () {
        newDiv.remove();
        deleteItem(link, title);
        updateEmptyMessage();
    });

    newDiv.appendChild(dltBtn);
    newDiv.appendChild(linkElement);
    parentDiv.appendChild(newDiv);
}

// Save to localStorage
function saveItem(link, title) {
    const items = JSON.parse(localStorage.getItem('bookie_items')) || [];
    items.push({ link, title });
    localStorage.setItem('bookie_items', JSON.stringify(items));
}

// Delete from localStorage
function deleteItem(link, title) {
    let items = JSON.parse(localStorage.getItem('bookie_items')) || [];
    items = items.filter(item => item.link !== link || item.title !== title);
    localStorage.setItem('bookie_items', JSON.stringify(items));
}
