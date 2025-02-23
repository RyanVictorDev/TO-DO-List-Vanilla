axios.get('https://to-do-list-nodejs-43as.onrender.com/note')
  .then(response => {
    console.log('Notas:', response.data);
    
    const noteContainer = document.getElementById('note');
    
    noteContainer.innerHTML = '';

    for (let index = 0; index < response.data.length; index++) {
        const element = response.data[index];
        
        if (element.finished == true) {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('noteItem');

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('titleItem');
    
            const title = document.createElement('p');
            title.textContent = element.title;

            const arrowBtn = document.createElement('button');

            const arrowIcon = document.createElement('i');
            arrowIcon.classList.add('material-icons');
            arrowIcon.textContent = 'keyboard_arrow_down';

            arrowBtn.appendChild(arrowIcon)
    
            // const description = document.createElement('p');
            // description.textContent = element.description;

            titleDiv.appendChild(title);
            titleDiv.appendChild(arrowBtn);
    
            // Adicionando o título e descrição dentro do quadrado
            noteDiv.appendChild(titleDiv);
            // noteDiv.appendChild(description);
    
            noteContainer.appendChild(noteDiv);
        } else {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('noteItemPending');

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('titleItem');
    
            const title = document.createElement('p');
            title.textContent = element.title;
    
            const arrowBtn = document.createElement('button');

            const arrowIcon = document.createElement('i');
            arrowIcon.classList.add('material-icons');
            arrowIcon.textContent = 'keyboard_arrow_down';

            arrowBtn.appendChild(arrowIcon)

            titleDiv.appendChild(title);
            titleDiv.appendChild(arrowBtn);
    
            // Adicionando o título e descrição dentro do quadrado
            noteDiv.appendChild(titleDiv);
    
            noteContainer.appendChild(noteDiv);
        }
    }
  })
  .catch(error => {
    console.error('Erro ao buscar notas:', error);
  });
