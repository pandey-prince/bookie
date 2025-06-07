let btn = document.querySelector('.add');
let div1 = document.querySelector('.add-item');
let parentDiv = document.querySelector('.parent');
let emptyMsg = document.querySelector('.empty-msg');
function updateEmptyMessage() {
    if (parentDiv.children.length <= 1) { // Only the <p> exists
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
    }
}





btn.addEventListener('click', function () {
    console.log('button clicked');

    let div = document.createElement('div');
    div.style.opacity = 1;
    div.classList.add('input-div');

    let inp1 = document.createElement('input');
    let inp2 = document.createElement('input');
    let doneBtn = document.createElement('button');
    inp1.style.backgroundColor = 'white';
    inp2.style.backgroundColor = 'white';
    inp1.style.border = '2px solid rgba(48, 28, 28, 0.38)';
    inp2.style.border= '2px solid rgba(48, 28, 28, 0.38)';
    inp1.style.marginRight  =  '20px';
    inp2.style.marginRight  =  '20px'
    inp1.style.height = "30px";
    inp2.style.height = "30px";
    inp1.style.borderRadius = '10px';
    inp2.style.borderRadius = '10px';
    inp1.placeholder = "Enter Link";
    inp2.placeholder = "Enter Title";
    doneBtn.innerText = 'Done';

    doneBtn.style.margin = '0';
    doneBtn.style.marginRight = '20px';

    

    div.appendChild(inp1);
    div.appendChild(inp2);
    div.appendChild(doneBtn);
    div1.appendChild(div);

    btn.style.display = 'none';

    let exitBtn  = document.createElement('button');
    exitBtn.innerText = "Exit";
    exitBtn.style.margin = '0'
    div.appendChild(exitBtn);
    inp1.focus();
    inp2.addEventListener('keydown',function(event)
{
    if(event.key==='Enter')
    {
       doneBtn.click();
    }
})

    exitBtn.addEventListener('click',function(){
        div.remove();
        btn.style.display = 'block';
        
    })

    doneBtn.addEventListener('click', function () {

        if(inp1.value.trim().length == 0 || inp2.value.trim().length == 0)
        {
            alert('All field Compulsory');
            return;
        }
        let linkElement = document.createElement('a');
        linkElement.href = inp1.value;
        linkElement.innerText = inp2.value;
        linkElement.target = '_blank';

        console.log("item added");
        alert('New Item Added Successfully!');
        
        let newDiv = document.createElement('div');
        let dltBtn = document.createElement('button');
        dltBtn.innerText = "Delete";
        dltBtn.classList.add('deleteBtn');
        newDiv.appendChild(dltBtn);

        newDiv.classList.add('links');
        newDiv.appendChild(linkElement);

        dltBtn.addEventListener('click', function () {
        newDiv.remove();
        updateEmptyMessage();
       });
        

        parentDiv.appendChild(newDiv);

        // Cleanup
        div.remove();
        btn.style.display = 'block';
        updateEmptyMessage();
        
    });

});

