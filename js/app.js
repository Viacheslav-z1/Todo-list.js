window.addEventListener('DOMContentLoaded',() =>{




















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

  btnAdd.addEventListener('click',() =>{
    showModal(modal);
  });

  modal.addEventListener('click', function (e) {
    const target = e.target;
    if (target === modal) {
      closeModal(modal);
    }
  });

  modalClose.addEventListener('click',()=>{
    closeModal(modal);
  });
});