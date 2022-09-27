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
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const target = e.target;
      if (target === deleteBtnAll[i]) {
        showModal(deleteModal);
        deleteOn.addEventListener('click',function () {
          deleteLi(allLi, i);
          closeModal(deleteModal);
        });
        closeModalDeleteBtn.addEventListener('click',function (e) {
          e.preventDefault();
          closeModal(deleteModal);
        });
      }
    });
  });
  /*Видалення Завдань які виконуються завдань*/
  deleteBtnInProgress.forEach((item, i) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const target = e.target;
      if (target === deleteBtnInProgress[i]) {
        showModal(deleteModal);
        deleteOn.addEventListener('click', function (e) {
          e.preventDefault();
          deleteLi(inProgres, i);
          closeModal(deleteModal);
        });
        closeModalDeleteBtn.addEventListener('click', function (e) {
          e.preventDefault();
          closeModal(deleteModal);
        });
      }
    });
  });
  /*Видалення виконанених завдань*/
  deleteBtnDone.forEach((item, i) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const target = e.target;
      if (target === deleteBtnDone[i]) {
        showModal(deleteModal);
        deleteOn.addEventListener('click', function (e) {
          e.preventDefault();
          deleteLi(doneLi, i);
          closeModal(deleteModal);
        });
        closeModalDeleteBtn.addEventListener('click', function (e) {
          e.preventDefault();
          closeModal(deleteModal);
        });
      }
    });
  });




















  /////Modal logik

  const btnAdd = document.querySelector('[data-add]'),
    modal = document.querySelector('.modal'),
    modalClose = document.querySelector('[data-close]'),
    body = document.querySelector('body');

  function showModal(modalWindow) {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    body.style.overflow = 'hidden';
  }

  function closeModal(modalWindow) {
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    body.style.overflow = '';
  }

  function deleteLi(list, index) {
    list[index].remove();
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