window.addEventListener('DOMContentLoaded', () => {

  /*змінні для видалення*/
  const deleteBtnAll = document.querySelectorAll('[data-deleteAll]'),
    deleteBtnInProgress = document.querySelectorAll('[data-inProgress]'),
    deleteBtnDone = document.querySelectorAll('[data-done]'),
    allLi = document.querySelectorAll('.all-js'),
    doneLi = document.querySelectorAll('.done-li'),
    inProgres = document.querySelectorAll('.in-progress'),
    deleteOn = document.querySelector('.delete-on'),
    closeModalDeleteBtn = document.querySelector('[data-close-delete-modal]'),
    deleteModal = document.querySelector('.delete-modal');




  /*Видалення Завдань */
  deleteBtnAll.forEach((item, i) => {
    function deleteTaskLocal(e) {
      e.preventDefault();
      deleteLi(allLi, i);
      closeModal(deleteModal);
    }
    item.addEventListener('click', function (e) {
      e.preventDefault();
      let touch = 'false';
      const target = e.target;
      showModal(deleteModal);
      deleteOn.addEventListener('click', deleteTaskLocal);
      closeModalDeleteBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeModal(deleteModal);
        deleteOn.removeEventListener('click', deleteTaskLocal);
      });
    });
  });
  /*Видалення Завдань які виконуються завдань*/
  deleteBtnInProgress.forEach((item, i) => {
    function deleteTaskLocal(e) {
      e.preventDefault();
      deleteLi(inProgres, i);
      closeModal(deleteModal);
    }
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const target = e.target;
      if (target === deleteBtnInProgress[i]) {
        showModal(deleteModal);
        deleteOn.addEventListener('click', deleteTaskLocal);
        closeModalDeleteBtn.addEventListener('click', function (e) {
          e.preventDefault();
          closeModal(deleteModal);
          deleteOn.removeEventListener('click', deleteTaskLocal);
        });
      }
    });
  });
  /*Видалення виконанених завдань*/
  deleteBtnDone.forEach((item, i) => {
    function deleteTaskLocal(e) {
      e.preventDefault();
      deleteLi(doneLi, i);
      closeModal(deleteModal);
    }
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const target = e.target;
      if (target === deleteBtnDone[i]) {
        showModal(deleteModal);
        deleteOn.addEventListener('click', deleteTaskLocal);
        closeModalDeleteBtn.addEventListener('click', function (e) {
          e.preventDefault();
          closeModal(deleteModal);
          deleteOn.removeEventListener('click', deleteTaskLocal);
        });
      }
    });
  });

  /*Функ видалення завдання */
  function deleteLi(list, index) {
    list[index].classList.add('fade-out');
    setTimeout(() => {
      list[index].remove();
    }, 600);

  }



















  /////Modal logik

  const btnAdd = document.querySelector('[data-add]'),
    modal = document.querySelector('.modal'),
    modalClose = document.querySelector('[data-close]'),
    body = document.querySelector('body');

  function showModal(modalWindow) {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    modalWindow.classList.add('fade');
    setTimeout(() => {
      modalWindow.classList.remove('fade');
    }, 600);
    body.style.overflow = 'hidden';
  }

  function closeModal(modalWindow) {
    modalWindow.classList.add('fade-out');

    setTimeout(() => {
      modalWindow.classList.add('hide');
      modalWindow.classList.remove('show');
    }, 550);

    setTimeout(() => {
      modalWindow.classList.remove('fade-out');
    }, 600);
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



})