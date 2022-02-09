let images = [
  {
    url: "img/slider-01.jpg",
    city: "Rostov-on-Don LCD admiral",
    repair_time: "3.5 months",
    area: "81 m2",
    cost: "Upon request",
  },
  {
    url: "img/slider-02.jpg",
    city: "Sochi Thieves",
    repair_time: "4 months",
    area: "105 m2",
    cost: "Upon request",
  },
  {
    url: "img/slider-03.jpg",
    city: "Rostov-on-Don Patriotic",
    repair_time: "3 months",
    area: "93 m2",
    cost: "Upon request",
  },
];

function initSlider() {
  if (!images || !images.length) return;

  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  // let sliderTitle = document.querySelector (".js-projects__navigation");


  initImages();
  initArrows();
  initDots();
  // initTitle();


  //  вместо отдельного инита, просто сэтим первый(нулевой) слайд
  // типа по дефолту записываем инфу с 0 слайда
  changeInfo(0);

  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${
        index === 0 ? "active" : ""
      }" style="background-image:url(${
        images[index].url
      });" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }

  //  Предлагаю на изменение слайда точечно в темплейте менять занчения у дивов.

  // запили 1 метод для всей инфы, но реализовал ток город

  function changeInfo(imgIndx) {
    // достаем текущие данные из списка по ИД
    const img = images[imgIndx];
    // Если чет нашлось,
    if (img) {
      // достаем дом узел города по классу (который я сам для городоf написал в хтмл)
      const cityNode = document.querySelector(".js-ct");
      // если есть куда, то впихуем туда данные
      if (cityNode) cityNode.innerHTML = img.city;

      const repairNode = document.querySelector(".js-repair");
      if (repairNode) repairNode.innerHTML = img.repair_time

      const areaNode = document.querySelector(".js-area");
      if (areaNode) areaNode.innerHTML = img.area 

      const costNode = document.querySelector(".js-cost");
      if (costNode) costNode.innerHTML = img.cost
      //   тут продолжить для всех остальных данных таким же образом
    }
  }

  //    Перелистывание картинок (если не левая значит правая)

  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach((arrow) => {
      arrow.addEventListener("click", function () {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }

  //   ^^^^ Выше сделан слайдер (вебинар 1:10:00 минут) ^^^^^^^^

    // Перелистывание на заголовок попытка 1
  
    // function initTitle() {
    //   images.forEach((image, index) => {
    //     let title = `<div class="js-projects__navigation n${index} ${
    //       index === 0 ? "active" : ""
    //     }" data-index="${index}"></div>`;
    //     sliderTitle.innerHTML += title;
    //   });
    //   sliderTitle.querySelectorAll(".js-projects__navigation").forEach((title) => {
    //     title.addEventListener("click", function () {
    //       moveSlider(this.dataset.index);
    //     });
    //   });
    // }

      // Перелистывание на заголовок попытка 2

  // function initTitle() {
  //   sliderTitle.querySelectorAll(".js-projects__navigation").forEach((title) => {
  //     title.addEventListener("click", function (){
  //       let curTitle = +sliderImages.querySelector(".active").dataset.index;
  //       let nextTitle;
  //       if (title.classList.contains("left")) {
  //         nextTitle = curTitle === 0 ? images.length - 1 : curTitle - 1;
  //       } else {
  //         nextTitle = curTitle === images.length - 1 ? 0 : curTitle + 1;
  //       }
  //       moveSlider(nextTitle);
  //     })
  //   })
  // }

  //   Добавление точек

  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${
        index === 0 ? "active" : ""
      }" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach((dot) => {
      dot.addEventListener("click", function () {
        moveSlider(this.dataset.index);
      });
    });
  }


  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    sliderDots.querySelector(".active").classList.remove("active");
    sliderDots.querySelector(".n" + num).classList.add("active");
    // sliderTitle.querySelector(".active").classList.remove("active");
    // sliderTitle.querySelector(".n" + num).classList.add("active");
    
    changeInfo(num);
    
  }

}

document.addEventListener("DOMContentLoaded", initSlider);