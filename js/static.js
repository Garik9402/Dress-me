

const scartchBox = document.querySelectorAll('.scratch-box')
const popupNo = document.querySelector('.popup-no');
const popupCongratulation = document.querySelector('.popup-congratulation');
const scratchMoney = document.querySelectorAll('.scratch-money')
const scratchEmpty = document.querySelectorAll('.scratch-empty')
let $body = document.body;

// Открытие  попапов в зависимости от типа скрэтча
const openPopup = (event) => {
   const moneyBlock = event.currentTarget.querySelector('.scratch-money');
   const emptyBlock = event.currentTarget.querySelector('.scratch-empty');
   $body.style.overflowX = 'hidden';
   if (moneyBlock) {
      moneyBlock.classList.add('scratch-money--active');
      setTimeout(() => {
         popupCongratulation.classList.add('popup-congratulation--active');
      }, 600);
   }
   else {
      emptyBlock.classList.add('scratch-empty--active');
      setTimeout(() => {
         popupNo.classList.add('popup-no--active');
      }, 600);
   }
}


scartchBox.forEach(block => {
   block.addEventListener('click', openPopup);

});

// Функция которая добавыляет класс к родителю, для добавления стиля.
function pointFunc() {
   scartchBox.forEach(box => {
      box.addEventListener('click', () => {
         box.classList.add('scratch-box--pointer-no')
      })
   })
}
pointFunc()

// добавляем в Прогресс-бар сумму и увеличиваем его исходя из переданной суммы.
const progress = document.querySelector('.controls__progress')
let progressBarText = document.querySelector('.progress-bar-text-increase');
const priceElement = document.querySelector('.money-count')
const popupFinal = document.querySelector('.popup-final')


scartchBox.forEach(box => {
   const countMoney = box.querySelector('.count-money');
   if (countMoney) {
      box.addEventListener('click', () => {
         const price = parseInt(countMoney.textContent);
         const amount = 500;
         const currentSum = parseInt(progressBarText.textContent);
         const newSum = currentSum + price;
         progressBarText.textContent = newSum;
         const progressPercentage = (newSum / amount) * 100;
         progress.style.width = progressPercentage + '%';
         if (progress.style.width === '100%') {
            setTimeout(() => {
               popupCongratulation.classList.remove('popup-congratulation--active');
               popupFinal.classList.add('popup-final--active');
            }, 600);
         }
      });
   }
});

//Закрытие попап финала
const popupFinalBtn = document.querySelector('.popup-final__btn')
popupFinalBtn.addEventListener('click', () => {
   popupFinal.classList.remove('popup-final--active');
})

// Функция, меняющая порядок блоков случайным образом и приводящая их в исходное состояние
const shuffleBlocks = () => {
   scratchMoney.forEach(elem => {
      elem.classList.remove('scratch-money--active')
   })
   scratchEmpty.forEach(elem => {
      elem.classList.remove('scratch-empty--active')
   })
   popupNo.classList.remove('popup-no--active');
   $body.style = ''
   const blocksArray = Array.from(scartchBox);
   blocksArray.sort(() => Math.random() - 0.5);
   const parentElement = scartchBox[0].parentNode;
   blocksArray.forEach(block => parentElement.appendChild(block));
};

const btnTryAgaine = document.querySelector('.popup-no__btn');

// Кнопка которая начинает новую игру
btnTryAgaine.addEventListener('click', () => {
   shuffleBlocks()
   scartchBox.forEach(box => {
      box.classList.remove('scratch-box--pointer-no')
   })
   progressBarText.textContent = '0'
   progress.style.width = 0 + '%';

});


// Закрытие попапа  Congratulation и продолжение выбора
const btnCongratulation = document.querySelector('.popup-congratulation__btn')
btnCongratulation.addEventListener('click', () => {
   popupCongratulation.classList.remove('popup-congratulation--active');
   $body.style = ''

})

//Якорь
const btnGet = document.querySelector('.controls__btn')
function scrollToButton() {
   const scratchsNode = document.querySelector(".scratchs");
   scratchsNode.scrollIntoView({ behavior: "smooth" });
}
btnGet.addEventListener('click', scrollToButton)


// при перезагрузки странцы Scratchs меняются рандомно
window.onload = function () {
   shuffleBlocks()
};


