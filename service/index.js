window.onload = () => {
    fethNotes()
}

function fethNotes() {
    axios.get('https://to-do-list-nodejs-43as.onrender.com/note/user/1')
    .then(response => {
        console.log('Notas:', response.data);
    
        const noteContainer = document.getElementById('note');
        noteContainer.innerHTML = '';

        response.data.forEach(element => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add(element.finished ? 'noteItem' : 'noteItemPending');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('titleItem');

        const title = document.createElement('p');
        title.textContent = element.title;

        const arrowBtn = document.createElement('button');
        arrowBtn.classList.add('arrow-btn');

        const arrowIcon = document.createElement('i');
        arrowIcon.classList.add('material-icons');
        arrowIcon.textContent = 'keyboard_arrow_down';

        const description = document.createElement('p');
        description.textContent = element.description;
        description.classList.add('description', 'hidden');

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions', 'hidden');

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.onclick = () => deleteNote(element.id);

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('material-icons');
        deleteIcon.textContent = 'delete'

        deleteButton.appendChild(deleteIcon);
        actionsDiv.appendChild(deleteButton);

        const finishButton = document.createElement('button');
        finishButton.classList.add('finishButton');
        finishButton.onclick = () => deleteNote(element.id);

        const checkIcon = document.createElement('i');
        checkIcon.classList.add('material-icons');
        checkIcon.textContent = 'check';

        finishButton.appendChild(checkIcon);
        actionsDiv.appendChild(finishButton);
        finishButton.onclick = () => checkNote(element.id);

        arrowBtn.appendChild(arrowIcon);
        titleDiv.appendChild(title);
        titleDiv.appendChild(arrowBtn);
        noteDiv.appendChild(titleDiv);

        noteDiv.appendChild(description);
        noteDiv.appendChild(actionsDiv);
        noteContainer.appendChild(noteDiv);

        titleDiv.addEventListener('click', () => {
            showMore(description, actionsDiv, arrowIcon);
        });
        });
    })
    .catch(error => {
        console.error('Erro ao buscar notas:', error);
    })    
}


function showMore(description, actionsDiv, arrowIcon) {
    description.classList.toggle('hidden');
    actionsDiv.classList.toggle('hidden');
    arrowIcon.textContent = description.classList.contains('hidden') ? 'keyboard_arrow_down' : 'keyboard_arrow_up';
}
 
const noteCreate = {
    title: '',
    description: '',
    userId: '1'
};

document.getElementById('noteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const titleValue = document.getElementById('title').value;
    const descriptionValue = document.getElementById('description').value;

    noteCreate.title = titleValue;
    noteCreate.description = descriptionValue;

    console.log("Nota Criada:", noteCreate);

    axios.post('https://to-do-list-nodejs-43as.onrender.com/note', noteCreate)
    .then( () => {
        window.location.href = "/index.html",
        console.log("Sucesso")
    }) .catch (e => {
        console.log(e)
    })
});

function deleteNote(id) {
    axios.delete('https://to-do-list-nodejs-43as.onrender.com/note/' + id)
    .then( () => {
        console.log('Sucesso'),
        fethNotes()
    }) .catch (e => {
        console.log('IH RAPAZ', e)
    })
}

function checkNote(id) {
    axios.put('https://to-do-list-nodejs-43as.onrender.com/note/finish/' + id)
    .then(() => {
        console.log('Sucesso!');
        fethNotes(); 
    })
    .catch(e => {
        console.log('Deu ruim', e);
    });
}
