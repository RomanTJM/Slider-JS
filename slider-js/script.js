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
  let sliderTitle = document.querySelector (".completed-projects-navigation");

  initImages();
  initArrows();
  initDots();
  initTitle();
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

  function changeInfo(imgIndx) {
    const img = images[imgIndx];
    if (img) {      
      const cityNode = document.querySelector(".js-ct");     
      if (cityNode) cityNode.innerHTML = img.city;
      const repairNode = document.querySelector(".js-repair");
      if (repairNode) repairNode.innerHTML = img.repair_time
      const areaNode = document.querySelector(".js-area");
      if (areaNode) areaNode.innerHTML = img.area 
      const costNode = document.querySelector(".js-cost");
      if (costNode) costNode.innerHTML = img.cost   
    }
  }

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
  
    function initTitle() {
      images.forEach((image, index) => {
        let title = `<li class="projects-navigation n${index} js-projects__navigation ${
          index === 0 ? "active" : ""
        } "data-index="${index}">${image.city}</li>`;
        sliderTitle.innerHTML += title;
      });
      sliderTitle.querySelectorAll(".js-projects__navigation").forEach((title) => {
        title.addEventListener("click", function () {
          moveSlider(this.dataset.index);
        });
      });
    }

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
    sliderTitle.querySelector(".active").classList.remove("active");
    sliderTitle.querySelector(".n" + num).classList.add("active");   
    changeInfo(num);
  }
}

document.addEventListener("DOMContentLoaded", initSlider);