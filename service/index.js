axios.get('https://to-do-list-nodejs-43as.onrender.com/note')
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

        arrowBtn.appendChild(arrowIcon);
        titleDiv.appendChild(title);
        titleDiv.appendChild(arrowBtn);
        noteDiv.appendChild(titleDiv);

        const description = document.createElement('p');
        description.textContent = element.description;
        description.classList.add('description', 'hidden');

        noteDiv.appendChild(description);
        noteContainer.appendChild(noteDiv);

        titleDiv.addEventListener('click', () => {
            showMore(description, arrowIcon);
        });
    });
  })
  .catch(error => {
    console.error('Erro ao buscar notas:', error);
  });

function showMore(description, arrowIcon) {
    description.classList.toggle('hidden');
    arrowIcon.textContent = description.classList.contains('hidden') ? 'keyboard_arrow_down' : 'keyboard_arrow_up';
}

const noteCreate = {
    title: '',
    description: ''
};

document.getElementById('noteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const titleValue = document.getElementById('title').value;
    const descriptionValue = document.getElementById('description').value;

    noteCreate.title = titleValue;
    noteCreate.description = descriptionValue;

    console.log("Nota Criada:", noteCreate);

    axios.post('https://to-do-list-nodejs-43as.onrender.com/note', noteCreate)
    .then(
        console.log("Sucesso")
    ) .catch (e => {
        console.log(e)
    })
});