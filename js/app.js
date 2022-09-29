window.addEventListener('DOMContentLoaded', () => {
  /*Логіка */

  const allListParent = document.querySelector('.content__todo-list'),
    addListBtn = document.querySelector('[data-add-new]'),
    formAdd = document.querySelector('[data-form-add]'),
    closeModalDeleteBtn = document.querySelector('[data-close-delete-modal]'),
    deleteOn = document.querySelector('.delete-on'),
    inProgresList = document.querySelector('.in-progres-list'),
    doneList = document.querySelector('.done-list'),
    doneModal = document.querySelector('.done-modal'),
    helloModal = document.querySelector('.big-modal'),
    doneBtn = document.querySelector('[data-close-done-modal]'),
    finishBtn = document.querySelector('[data-done-task]');
  let nameTodo = document.querySelector('[data-name]');
  let textTodo = document.querySelector('[data-text]');

  /*Змінні для модалок */
  const deleteModal = document.querySelector('.delete-modal'),
    runModal = document.querySelector('.run-modal'),
    runBtn = document.querySelector('.run-on'),
    closeRunModal = document.querySelector('[data-close-run-modal]'),
    blur = document.querySelector('.big-wrapper'),
    btnAdd = document.querySelector('[data-add]'),
    modal = document.querySelector('.modal'),
    modalClose = document.querySelector('[data-close]'),
    body = document.querySelector('body');


  setTimeout(() => {
    setTimeout(() => {
      helloModal.classList.add('hide');
    }, 1400);
    helloModal.classList.add('fade-out-long');
  }, 1600);

  let todoList = [];
  let progresTodoList = [];
  let doneTodoList = [];
  let count;
  count = todoList.length;

  //підргузка данних

  if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    updateList();
    updateProgresList();
    updateDoneList();
  } 

  if (localStorage.getItem('progres')) {
    progresTodoList = JSON.parse(localStorage.getItem('progres'));
    updateProgresList();
   } 

  if (localStorage.getItem('done')) {
    doneTodoList = JSON.parse(localStorage.getItem('done'));
    updateProgresList();
    updateDoneList();
  } 

  addListBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (nameTodo.value && nameTodo.value.match(/^\s+$/) === null) {
      let newTtodo = {
        todoName: nameTodo.value,
        todoDescr: textTodo.value
      };
      todoList.push(newTtodo);
      localStorage.setItem('todo', JSON.stringify(todoList));
      updateList();
      formAdd.reset();
      closeModal(modal);
    } else {
      alert('Введіть назву завдання')
    }
  });


  function updateList() {
    allListParent.innerHTML = '';
    let todoLi = '';
    if (todoList) {
      const message = document.createElement('p');
      message.classList.add('message');
      message.innerHTML = 'У вас немає завдань, натисніть + щоб додати';
      allListParent.append(message);
    }
    /*Кількість невиконаних справ */
    count = todoList.length;
    document.querySelector('.content__todo-block-all').innerHTML = count;
    todoList.forEach((item, i) => {
      todoLi += `
   <li class="content__todo-list__li all-js">
            <div class="content__todo-top__wrapper">
              <p class="content__todo-name">${item.todoName}</p>
              <div class="content__todo-btns">
                <button data-go class="content__todo-go btns">Почати виконання</button>
                <button data-deleteAll class="content__todo-delete btns">Видалити</button>
                <div class="content__todo-status_ball go"></div>
              </div>
            </div>
            <div class="content__todo-botton__wrapper">
              <p class="content__todo-text">
                ${item.todoDescr}
              </p>
            </div>
          </li>
    `;
      allListParent.innerHTML = '';
      allListParent.innerHTML = todoLi;

    });

    /*Видалення справи */
    document.querySelectorAll('[data-deleteAll]').forEach((item, i) => {
      function deleteTaskLocal(e) {
        e.preventDefault();
        closeModal(deleteModal);
        console.log(todoList);
        todoList.splice(i, 1);
        localStorage.setItem('todo', JSON.stringify(todoList));
        updateList();
        deleteOn.removeEventListener('click', deleteTaskLocal);
      }
      item.addEventListener('click', function (e) {
        e.preventDefault();
        showModal(deleteModal);
        deleteOn.addEventListener('click', deleteTaskLocal);
        closeModalDeleteBtn.addEventListener('click', function (e) {
          e.preventDefault();
          closeModal(deleteModal);
          deleteOn.removeEventListener('click', deleteTaskLocal);/*перевірка на відхилення додання завдання*/
        });
      });
    });
    /*Початок виконання справи */
      document.querySelectorAll('[data-go]').forEach((item, i) => {
        function addTaskToInProgress(e) {
          e.preventDefault();
          let copyProgressObj = JSON.parse(JSON.stringify(todoList[i]));
          progresTodoList.push(copyProgressObj);
          updateProgresList();
          todoList.splice(i, 1);
          updateList();
          closeModal(runModal);
          localStorage.setItem('todo', JSON.stringify(todoList));
          localStorage.setItem('progres', JSON.stringify(progresTodoList));
          runBtn.removeEventListener('click', addTaskToInProgress);

        }
        item.addEventListener('click', (e) => {
          e.preventDefault();
          showModal(runModal);
          console.log(todoList);
          console.log(progresTodoList);
          runBtn.addEventListener('click', addTaskToInProgress);
          closeRunModal.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(runModal);
            runBtn.removeEventListener('click', addTaskToInProgress);
          });
        });
      });
  }


  function updateProgresList() {
    inProgresList.innerHTML = '';
    if (progresTodoList) {
      const message = document.createElement('p');
      message.classList.add('message');
      message.innerHTML = 'Почніть додавати справи, щоб їх виконувати';
      inProgresList.append(message);
    }
    /*Кількість невиконаних справ */
    count = progresTodoList.length;
    document.querySelector('.content__todo-block-inprogress').innerHTML = count;
    let progresLi = '';
    progresTodoList.forEach((item, i) => {
      progresLi += `
      <li class="content__todo-list__li in-progress">
            <div class="content__todo-top__wrapper">
              <p class="content__todo-name">${item.todoName}</p>
              <div class="content__todo-btns">
                <button data-done-task class="content__todo-go btns">Завершити</button>
                <button data-inProgress class="content__todo-delete btns">Видалити</button>
                <div class="content__todo-status_ball progress"></div>
              </div>
            </div>
            <div class="content__todo-botton__wrapper">
              <p class="content__todo-text">
                 ${item.todoDescr}
              </p>
            </div>
          </li>
      `;
      inProgresList.innerHTML = progresLi;

    });

    /*видалення справи*/
    document.querySelectorAll('[data-inProgress]').forEach((item, i) => {
      function deleteTaskLocal(e) {
        e.preventDefault();
        closeModal(deleteModal);
        progresTodoList.splice(i, 1);
        updateProgresList();
        localStorage.setItem('progres', JSON.stringify(progresTodoList));
        deleteOn.removeEventListener('click', deleteTaskLocal);
      }
      item.addEventListener('click', function (e) {
        e.preventDefault();
        showModal(deleteModal);
        deleteOn.addEventListener('click', deleteTaskLocal);
        closeModalDeleteBtn.addEventListener('click', function (e) {
          e.preventDefault();
          closeModal(deleteModal);
          item.removeEventListener('click', deleteTaskLocal);/*перевірка на відхилення додання завдання*/
        });
      });
    });

    /*Завешершення  справи */
    document.querySelectorAll('[data-done-task]').forEach((item, i) => {
      function addTaskToInProgress(e) {
        e.preventDefault();
        let copyProgressObj = JSON.parse(JSON.stringify(progresTodoList[i]));
        doneTodoList.push(copyProgressObj);
        progresTodoList.splice(i, 1);
        updateProgresList();
        updateDoneList();
        closeModal(doneModal);
        finishBtn.removeEventListener('click', addTaskToInProgress);
        localStorage.setItem('done', JSON.stringify(doneTodoList));
        localStorage.setItem('progres', JSON.stringify(progresTodoList));
      }
      item.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(doneModal);
        finishBtn.addEventListener('click', addTaskToInProgress);
        doneBtn.addEventListener('click', (e) => {
          e.preventDefault();
          closeModal(doneModal);
          finishBtn.removeEventListener('click', addTaskToInProgress);
        });
      });
    });
  }

  function updateDoneList() {
    doneList.innerHTML = '';
    if (doneTodoList) {
      const message = document.createElement('p');
      message.classList.add('message');
      message.innerHTML = 'У Вас немає виконаних справ';
      doneList.append(message);
    }
    /*Кількість невиконаних справ */
    count = doneTodoList.length;
    document.querySelector('.content__todo-block-done').innerHTML = count;
    let doneLi = '';
    doneTodoList.forEach((item, i) => {
      doneLi += `
      <li class="content__todo-list__li done-li">
            <div class="content__todo-top__wrapper">
              <p class="content__todo-name">${item.todoName}</p>
              <div class="content__todo-btns">
                <button data-done class="content__todo-delete btns">Видалити</button>
                <div class="content__todo-status_ball done"></div>
              </div>
            </div>
            <div class="content__todo-botton__wrapper">
              <p class="content__todo-text">
                  ${item.todoDescr}
              </p>
            </div>
          </li>    `;
      doneList.innerHTML = doneLi;


      /*видалення справи*/
      document.querySelectorAll('[data-done]').forEach((item, i) => {
        function deleteTaskLocal(e) {
          e.preventDefault();
          closeModal(deleteModal);
          doneTodoList.splice(i, 1);
          updateDoneList();
          localStorage.setItem('done', JSON.stringify(doneTodoList));
          deleteOn.removeEventListener('click', deleteTaskLocal);
        }
        item.addEventListener('click', function (e) {
          e.preventDefault();
          showModal(deleteModal);
          deleteOn.addEventListener('click', deleteTaskLocal);
          closeModalDeleteBtn.addEventListener('click', function (e) {
            e.preventDefault();
            closeModal(deleteModal);
            item.removeEventListener('click', deleteTaskLocal);/*перевірка на відхилення додання завдання*/
          });
        });
      });
    });
  }


  /*Функ видалення завдання */
  function deleteLi(list, index) {
    list[index].classList.add('fade-out');
    setTimeout(() => {
      list[index].remove();
    }, 600);
  }

  /////Modal logik


  function showModal(modalWindow) {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    modalWindow.classList.add('fade');
    blur.classList.add('blur');
    setTimeout(() => {
      modalWindow.classList.remove('fade');
    }, 300);
    body.style.overflow = 'hidden';
  }

  function closeModal(modalWindow) {
    modalWindow.classList.add('fade-out');
    blur.classList.remove('blur');
    setTimeout(() => {
      modalWindow.classList.add('hide');
      modalWindow.classList.remove('show');
    }, 250);

    setTimeout(() => {
      modalWindow.classList.remove('fade-out');
    }, 300);
    body.style.overflow = '';
  }

  btnAdd.addEventListener('click', () => {
    showModal(modal);
  });

  modal.addEventListener('click', function (e) {
    const target = e.target;
    if (target === modal) {
      closeModal(modal);
    }
  });

  modalClose.addEventListener('click', () => {
    closeModal(modal);
  });

});