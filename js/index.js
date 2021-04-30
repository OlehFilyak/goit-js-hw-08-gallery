// Розбий завдання на кілька підзадач:

// Створення і рендер розмітки по масиву даних і наданим шаблоном.
// Реалізація делегування на галереї ul.js-gallery і отримання url великого зображення.
// Відкриття модального вікна при натисканні на елементі галереї.
// Підміна значення атрибута src елемента img.lightbox__image.
// Закриття модального вікна при натисканні на кнопку button[data-action=""close-lightbox"].
// Очищення значення атрибута src елемента img.lightbox__image. Це необхідно   для того, щоб при наступному відкритті модального вікна, поки вантажиться   зображення, ми не бачили попереднє.
// Стартові файли
// В папці src ти знайдеш стартові файли проєкту з базовою розміткою і   готовими стилями.
// В файлі gallery-items.js є масив об'єктів, які   містять інформацію про зображеннях: маленьке зображення, оригінальне і   опис.
// Розмітка елемента галереї
// Посилання на оригінальне зображення повинне зберігатися в data-атрибуті source на елементі img, і вказуватися в href посилання (це необхідно для доступності).

// <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li>
// Додатково
// Наступний функціонал не обов'язковий при здачі завдання, але буде хорошою практикою по роботі з подіями.

// Закриття модального вікна при натисканні на div.lightbox__overlay.
// Закриття модального вікна після натискання клавіші ESC.
// Перегортування зображень галереї у відкритому модальному вікні клавішами "вліво"   і "вправо".

// <!-- В этот список добавляй элементы галереи -->
// <ul class="gallery js-gallery"></ul>

// <!--
//   Модальное окно для полноразмерного изображения
//   Для того чтобы открыть, необходимо добавить на div.lightbox CSS-класс is-open
// -->
// <div class="lightbox js-lightbox">
//   <div class="lightbox__overlay"></div>

//   <div class="lightbox__content">
//     <img class="lightbox__image" src="" alt="" />
//   </div>

//   <button
//     type="button"
//     class="lightbox__button"
//     data-action="close-lightbox"
//   ></button>
// </div>

// Answer
import galleryItems from "./gallery-items.js";

//  ========= GET LINKS =============
const refs = {
  gallery: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  imgInModal: document.querySelector(".lightbox__image"),
};
// ========== ADD MARKUP ============
const markup = galleryItems.map(
  ({ preview, original, description }) => `
      <li class='gallery__item'>
      <a class="gallery__link" href='${original}'>
      <img class = 'gallery__image' src="${preview}" alt="${description}" data-source = ${original} />
      </a>
      </li>`
);
refs.gallery.insertAdjacentHTML("beforeend", markup.join(""));

// ========= FUNCTIONS =========
// ========= OPEN MODAL =========
refs.gallery.addEventListener("click", onModalOpen);
let activeIndex = null;
function onModalOpen(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }
  markup.forEach((el, ind) => {
    if (el.includes(e.target.src)) {
      activeIndex = ind;
      return;
    }
  });
  refs.modal.classList.add("is-open");
  refs.imgInModal.src = e.target.dataset.source;
  refs.imgInModal.alt = e.target.alt;
}

// ========= СLOSE MODAL =========
refs.modal.addEventListener("click", (e) => {
  if (e.target.nodeName !== "IMG") {
    closeModal();
  }
});
window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
function closeModal(e) {
  refs.modal.classList.remove("is-open");
  refs.imgInModal.src = "";
  refs.imgInModal.alt = "";
}

// ========= CHANGE IMG IN MODAL =========
window.addEventListener("keyup", changeImgInModal);

function changeImgInModal({ key }) {
  if (key === "ArrowRight" && galleryItems.length - 1 > activeIndex) {
    activeIndex += 1;
    refs.imgInModal.src = galleryItems[activeIndex].original;
    return;
  }
  if (key === "ArrowLeft" && activeIndex > 0) {
    activeIndex -= 1;
    refs.imgInModal.src = galleryItems[activeIndex].original;
    return;
  }
  if (key === "ArrowRight" && activeIndex === galleryItems.length - 1) {
    activeIndex = 0;
    refs.imgInModal.src = galleryItems[activeIndex].original;
    return;
  }
  if (key === "ArrowLeft" && activeIndex === 0) {
    activeIndex = galleryItems.length - 1;
    refs.imgInModal.src = galleryItems[activeIndex].original;
    return;
  }
}
