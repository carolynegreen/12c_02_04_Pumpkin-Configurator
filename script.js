"use strict";
window.addEventListener("DOMContentLoaded", start);

let elementToPaint;
let currentColor = "orange";
const settings = {
  lit: true,
  mouth: 1,
  eyes: 1,
  nose: 1,
};
let stem;
let sliceA;
let sliceB;

async function start() {
  console.log("start");
  //Importing the main picture
  let respPumpkin = await fetch("img/pumpkin.svg");
  let svgPumpkin = await respPumpkin.text();
  document.querySelector("#pumpkin").innerHTML = svgPumpkin;

  stem = document.querySelector("#stem");
  sliceA = document.querySelector("#slicesA");
  sliceB = document.querySelector("#slicesB");

  setMenuListeners();
  manipulateSVG();
}

function setColor(part, colorFill) {
  part.style.fill = colorFill;
}

function manipulateSVG() {
  console.log("manipulation");

  setColor(stem, currentColor);
  setColor(sliceA, currentColor);
  setColor(sliceB, currentColor);

  stem.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
  });

  document.querySelectorAll("circle").forEach((element) => {
    element.addEventListener("click", (event) => {
      currentColor = event.target.style.fill;
      console.log(currentColor);
    });
  });

  // importEyes(2);
  selectPumpkinGroups();
  noClickOnShadows();
  document.querySelectorAll(".g_to_interact_with").forEach(prepareArea);
}

function selectPumpkinGroups() {
  document.querySelector("#stem").classList.add("g_to_interact_with");
  document.querySelector("#slicesA").classList.add("g_to_interact_with");
  document.querySelector("#slicesB").classList.add("g_to_interact_with");
}

function noClickOnShadows() {
  console.log("noClickOnShadows");
  document.querySelector("#new_shadow_Image").style.pointerEvents = "none";
  document.querySelector("#new_shadow_Image").style.zIndex = "20";
}

function prepareArea(area) {
  if (localStorage.getItem(area.id) === null) {
    area.style.fill = "#f2ecde";
  } else {
    area.style.fill = localStorage.getItem(area.id);
  }
  area.style.cursor = "pointer";

  area.querySelectorAll("path").forEach(removeFill);
  function removeFill(path) {
    path.removeAttribute("fill");
  }
  area.style.zIndex = "20";
  area.addEventListener("click", setElementToPaint);
}

function setElementToPaint() {
  elementToPaint = this;
  document.querySelectorAll(".g_to_interact_with").forEach(removeStroke);
  elementToPaint.style.stroke = "orange";
  elementToPaint.style.strokeWidth = "25";
  elementToPaint.style.strokeDasharray = "100";
}

function removeStroke(area) {
  area.style.stroke = "none";
}

function setMenuListeners() {
  document.querySelector("#categories div:nth-of-type(1)").addEventListener("click", toggleMenu);
  document.querySelector("#categories div:nth-of-type(2)").addEventListener("click", toggleMenu);
  document.querySelector("#categories div:nth-of-type(3)").addEventListener("click", toggleMenu);
  document.querySelector("#categories div:nth-of-type(4)").addEventListener("click", toggleMenu);
  document.querySelector("#categories div:nth-of-type(5)").addEventListener("click", toggleMenu);
  document.querySelectorAll("#options #eyes .option").forEach((option) => option.addEventListener("click", setEyes));
  document.querySelectorAll("#options #nose .option").forEach((option) => option.addEventListener("click", setNose));
  document.querySelectorAll("#options #mouth .option").forEach((option) => option.addEventListener("click", setMouth));
  document.querySelector("#candle img").addEventListener("click", toggleLight);
  document.querySelector("#candle figcaption").addEventListener("click", toggleLight);
  document.querySelectorAll("#background figure").forEach((option) => option.addEventListener("click", toggleBackground));
}

function toggleMenu() {
  document.querySelector("#nose").classList.add("hidden");
  document.querySelector("#eyes").classList.add("hidden");
  document.querySelector("#mouth").classList.add("hidden");
  document.querySelector("#background").classList.add("hidden");
  document.querySelector("#candle").classList.add("hidden");

  let idName = this.textContent.toLowerCase();

  document.querySelector("#categories div:nth-of-type(1)").classList.remove("selected");
  document.querySelector("#categories div:nth-of-type(2)").classList.remove("selected");
  document.querySelector("#categories div:nth-of-type(3)").classList.remove("selected");
  document.querySelector("#categories div:nth-of-type(4)").classList.remove("selected");
  document.querySelector("#categories div:nth-of-type(5)").classList.remove("selected");

  if (this.textContent === "Eyes") {
    document.querySelector("#categories div:nth-of-type(1)").classList.add("selected");
  } else if (this.textContent === "Nose") {
    document.querySelector("#categories div:nth-of-type(2)").classList.add("selected");
  } else if (this.textContent === "Mouth") {
    document.querySelector("#categories div:nth-of-type(3)").classList.add("selected");
  } else if (this.textContent === "Background") {
    document.querySelector("#categories div:nth-of-type(4)").classList.add("selected");
  } else if (this.textContent === "Candle") {
    document.querySelector("#categories div:nth-of-type(5)").classList.add("selected");
  }

  document.querySelector(`#${idName}`).classList.remove("hidden");
}

function toggleLight() {
  if (settings.lit === true) {
    console.log("turn off light");
    settings.lit = false;
    document.querySelector("#candle img").src = "img/unlit-candle.png";
    document.querySelector("#candle figcaption").textContent = "light candle";
  } else {
    console.log("turn on light");
    settings.lit = true;
    document.querySelector("#candle img").src = "img/lit-candle.png";
    document.querySelector("#candle figcaption").textContent = "extinguish candle";
  }

  colorEye();
  colorMouth();
  colorNose();
}

function setEyes(choice) {
  choice = choice.path[0].attributes[2].value;
  settings.eyes = choice;
  importEyes();
}

async function importEyes() {
  // console.log(choice.path[0].attributes[2].value);
  // choice = choice.path[0].attributes[2].value;
  // console.log(document.querySelector(`#pumpkin-container img[src= "img/eye1.svg"]`));
  let respEye = await fetch(`img/eye${settings.eyes}.svg`);
  let svgEye = await respEye.text();
  animate("eye");
  document.querySelector("#pumpkin-container .eye").innerHTML = svgEye;

  colorEye();
}

function colorEye() {
  if (settings.lit === true) {
    document.querySelectorAll(`#eyes${settings.eyes} path`).forEach(colorElementOrange);
    document.querySelectorAll(`#eyes${settings.eyes} #shell path`).forEach(colorElementBrown);
    function colorElementOrange(area) {
      area.style.fill = "#f9b332";
    }
    function colorElementBrown(area) {
      area.style.fill = "#b07e4a";
    }
  } else {
    document.querySelectorAll(`#eyes${settings.eyes} path`).forEach(colorElementBlack);
    document.querySelectorAll(`#eyes${settings.eyes} #shell path`).forEach(colorElementBrown);
    function colorElementBrown(area) {
      area.style.fill = "#432918";
    }
    function colorElementBlack(area) {
      area.style.fill = "black";
    }
  }
}

function setNose(choice) {
  choice = choice.path[0].attributes[2].value;
  settings.nose = choice;
  importNose();
}

async function importNose() {
  // console.log(choice.path[0].attributes[2].value);
  // choice = choice.path[0].attributes[2].value;
  // console.log(document.querySelector(`#pumpkin-container img[src= "img/eye1.svg"]`));
  let respNose = await fetch(`img/nose${settings.nose}.svg`);
  let svgNose = await respNose.text();
  animate("nose");
  document.querySelector("#pumpkin-container .nose").innerHTML = svgNose;

  colorNose();
}

function colorNose() {
  if (settings.lit === true) {
    document.querySelectorAll(`#nose${settings.nose} path`).forEach(colorElementOrange);
    document.querySelectorAll(`#nose${settings.nose} #shell`).forEach(colorElementBrown);
    document.querySelectorAll(`#nose${settings.nose} #shell path`).forEach(colorElementBrown);
    function colorElementOrange(area) {
      area.style.fill = "#f9b332";
    }
    function colorElementBrown(area) {
      area.style.fill = "#b07e4a";
    }
  } else {
    document.querySelectorAll(`#nose${settings.nose} path`).forEach(colorElementBlack);
    document.querySelectorAll(`#nose${settings.nose} #shell`).forEach(colorElementBrown);
    document.querySelectorAll(`#nose${settings.nose} #shell path`).forEach(colorElementBrown);
    function colorElementBrown(area) {
      area.style.fill = "#432918";
    }
    function colorElementBlack(area) {
      area.style.fill = "black";
    }
  }
}

function setMouth(choice) {
  choice = choice.path[0].attributes[2].value;
  settings.mouth = choice;
  importMouth();
}

async function importMouth() {
  // console.log(choice.path[0].attributes[2].value);
  // choice = choice.path[0].attributes[2].value;
  // console.log(document.querySelector(`#pumpkin-container img[src= "img/eye1.svg"]`));
  let respMouth = await fetch(`img/mouth${settings.mouth}.svg`);
  let svgMouth = await respMouth.text();

  animate("mouth");
  document.querySelector("#pumpkin-container .mouth").innerHTML = svgMouth;

  colorMouth();
}

function colorMouth() {
  if (settings.lit === true) {
    document.querySelectorAll(`#mouth${settings.mouth} path`).forEach(colorElementOrange);
    document.querySelectorAll(`#mouth${settings.mouth} #shell path`).forEach(colorElementBrown);
    function colorElementOrange(area) {
      area.style.fill = "#f9b332";
    }
    function colorElementBrown(area) {
      area.style.fill = "#b07e4a";
    }
  } else {
    document.querySelectorAll(`#mouth${settings.mouth} path`).forEach(colorElementBlack);
    document.querySelectorAll(`#mouth${settings.mouth} #shell path`).forEach(colorElementBrown);
    function colorElementBrown(area) {
      area.style.fill = "#432918";
    }
    function colorElementBlack(area) {
      area.style.fill = "black";
    }
  }
}

function toggleBackground() {
  console.log("toggle background");
  // document.querySelector("#pumpkin-container .background").backgroundImage.src = `"url('${this.dataset.feature}')"`;
  document.querySelector("#pumpkin-container .background").style.backgroundImage = "url('" + this.dataset.feature + "')";
}

function animate(type) {
  let width = document.querySelector("#pumpkin").offsetWidth;
  let place;
  if (type === "eye") {
    place = (width / 100) * 30;
  } else if (type === "mouth") {
    place = (width / 100) * 60;
  } else if (type === "nose") {
    place = (width / 100) * 45;
  }

  const properties = {
    duration: 400,
    iterations: 1,
    easing: "ease-in-out",
  };

  const keyframes = [
    { transform: `scale(0) translate(0,${place}px)`, offset: 0, opacity: 0 },
    { transform: `scale(1) translate(0,0)`, offset: 1, opacity: 1 },
  ];

  let animation = document.querySelector(`#pumpkin-container .${type}`).animate(keyframes, properties);

  animation.onfinish = () => {
    animation.cancel();
  };
}
