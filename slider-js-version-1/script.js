let images = [
  {
  url:"img/slider-01.jpg",
  title: 'Rostov-on-Don LCD admiral',
  city: 'Rostov-on-Don LCD admiral',
  repair_time: '3.5 months',
  area:'81 m2',
  cost: 'Upon request'
  },
  {
  url:"img/slider-02.jpg",
  title: 'Sochi Thieves',
  city: 'Sochi Thieves',
  repair_time: '4 months',
  area:'105 m2',
  cost: 'Upon request'
  },
  {
  url:"img/slider-03.jpg",
  title: 'Rostov-on-Don Patriotic',
  city: 'Rostov-on-Don Patriotic',
  repair_time: '3 months',
  area:'93 m2',
  cost: 'Upon request'
  },
];


function initSlider(options) {
  if (!images || !images.length) return;
  
  options = options || {
    titles: false,
    dots: true,
    autoplay: false
  };
  
  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  // let sliderCity = document.querySelector(".slider__images-title");
  
  initImages();
  initArrows();
  // initCity();

  //   ТОЧКИ!!!!
  
  if (options.dots) {
    initDots();
  }

  //   ТЕКСТ!!!!!
  
  if (options.titles) {
    initTitles();
  }

  //   АВТОПЕРЕЛИСТЫВАНИЕ!!!!
  
  if (options.autoplay) {
    initAutoplay();
  }
  
  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }

  // function initCity() {
  //   images.forEach((image, index) => {
  //     let cityDiv = `<div class="title n${index} ${index === 0? "active" : ""}" type="text":city(${images[index].city});" data-index="${index}"></div>`;
  //     sliderImages.innerHTML += cityDiv;
  //   });
  // }

  

  //    Перелистывание картинок (если не левая значит правая)
  
  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }


  //   ^^^^ Выше сделан слайдер (вебинар 1:10:00 минут) ^^^^^^^^

//   Добавление точек 
  
  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }
  
  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    // sliderCity.querySelector(".active").classList.remove("active");
    // sliderCity.querySelector(".n" + num).classList.add("active");
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
    if (options.titles) changeTitle(num);
  }

  //   Добавление текста
  
  function initTitles() {
    let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
    sliderImages.innerHTML += cropTitle(titleDiv, 50);
  }
  
  function changeTitle(num) {
    if (!images[num].title) return;
    let sliderTitle = sliderImages.querySelector(".slider__images-title");
    sliderTitle.innerText = cropTitle(images[num].title, 50);
  }
  
  function cropTitle(title, size) {
    if (title.length <= size) {
      return title;
    } else {
      return title.substr(0, size) + "...";
    }
  }
  
//   Добавление автоматического пролистывания

  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

let sliderOptions = {
  dots: true,
  titles: true,
  autoplay: false,
  autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});