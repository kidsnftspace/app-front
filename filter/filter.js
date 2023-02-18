var filterName = document.querySelector(".filter-info .name"),
  filterValue = document.querySelector(".filter-info .value"),
  filterValueSaturation = document.querySelector(
    ".filter-info-saturation .value"
  ),
  filterSlider = document.querySelector(".slider input"),
  filterSliderSaturation = document.querySelector(".sliderSaturation input"),
  rotateOptions = document.querySelectorAll(".rotate button"),
  previewImg = document.querySelector(".preview-img img"),
  resetFilterBtn = document.querySelector(".reset-filter"),
  chooseImgBtn = document.querySelector(".choose-img"),
  saveImgBtn = document.querySelector(".save-img");

var brightness = "100",
  saturation = "100",
  inversion = "0",
  grayscale = "0";
var rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

filterSliderSaturation.max = "200";
filterSliderSaturation.value = saturation;
filterValueSaturation.innerText = `${saturation}%`;

filterSlider.max = "200";
filterSlider.value = brightness;
filterValue.innerText = `${brightness}%`;

var angleInDegrees = 0;

previewImg.addEventListener("load", () => {
  resetFilterBtn.click();
  document.querySelector(".container").classList.remove("disable");
});

var applyFilter = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

var updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  filterValueSaturation.innerText = `${filterSliderSaturation.value}%`;

  saturation = filterSliderSaturation.value;
  brightness = filterSlider.value;

  applyFilter();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id === "left") {
      rotate -= 90;
      if (angleInDegrees == 0) angleInDegrees = 270;
      else angleInDegrees = (angleInDegrees - 90) % 360;
    } else {
      rotate += 90;
      angleInDegrees = (angleInDegrees + 90) % 360;
      
    }
    applyFilter();
  });
});

var resetFilter = () => {
  brightness = "100";
  saturation = "100";
  inversion = "0";
  grayscale = "0";
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  saturation = filterSliderSaturation.value;
  brightness = filterSlider.value;
  applyFilter();
};

var saveImage = () => {
    
  var image = new Image();
  image.src = document.getElementById("preview-img-pic").src;

  const canvas = document.createElement("canvas");
  canvas.id = "image_finish";

  if (angleInDegrees == 90 || angleInDegrees == 270) {
    canvas.width = image.height;
    canvas.height = image.width;
  } else {
    canvas.width = image.width;
    canvas.height = image.height;
  }

  const ctx = canvas.getContext("2d");

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;

  if (rotate !== 0) {
    if (angleInDegrees == 90 || angleInDegrees == 270) {
      ctx.translate(image.height / 2, image.width / 2);
    } else {
      ctx.translate(image.width / 2, image.height / 2);
    }
    ctx.rotate((angleInDegrees * Math.PI) / 180);
  } else {
    ctx.translate(canvas.width / 2, canvas.height / 2);
  }

  ctx.drawImage(image, -image.width / 2, -image.height / 2);

  var canvas_container = document.getElementById("canvas_content");
  canvas_container.appendChild(canvas);

  filterName = "";
  filterValue = "";
  filterValueSaturation = "";
  filterSlider = "";
  filterSliderSaturation = "";
  rotateOptions = "";
  previewImg = "";
  resetFilterBtn = "";
  chooseImgBtn = "";
  saveImgBtn = "";

  (brightness = ""), (saturation = ""), (inversion = ""), (grayscale = "");
  (applyFilter = ""), (updateFilter = ""), (resetFilter = ""), (saveImage = "");
};

filterSlider.addEventListener("input", updateFilter);
filterSliderSaturation.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);

