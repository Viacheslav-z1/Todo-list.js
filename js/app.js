window.addEventListener('DOMContentLoaded', () => {

  /*змінні для видалення*/
  const deleteBtnAll = document.querySelectorAll('[data-deleteAll]'),
    deleteBtnInProgress = document.querySelectorAll('[data-inProgress]'),
    deleteBtnDone = document.querySelectorAll('[data-done]'),
    allLi = document.querySelectorAll('.all-js'),
    doneLi = document.querySelectorAll('.done-li'),
    inProgres = document.querySelectorAll('.in-progress');

  /*Видалення Завдань */
  deleteBtnAll.forEach((item, i) => {
    item.addEventListener('click', function (e) {
      const target = e.target;
      if (target === deleteBtnAll[i]) {
        deleteLi(allLi, i);
      }
    });
  });
  /*Видалення Завдань які виконуються завдань*/
  deleteBtnInProgress.forEach((item, i) => {
    item.addEventListener('click', function (e) {
      const target = e.target;
      if (target === deleteBtnInProgress[i]) {
        deleteLi(inProgres, i);
      }
    });
  });
  /*Видалення виконанених завдань*/
  deleteBtnDone.forEach((item, i) => {
    item.addEventListener('click', function (e) {
      const target = e.target;
      if (target === deleteBtnDone[i]) {
        deleteLi(doneLi, i);
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