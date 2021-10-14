"use strict";
window.addEventListener("DOMContentLoaded", start);
window.addEventListener("resize", setHeight);

let currentColor = "";
const resetColor = "";
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

  //botton reset click
  document.querySelector("#reset").addEventListener("click", resetColors);

  setHeight();
  setMenuListeners();
  manipulateSVG();
}

function setColor(part, colorFill) {
  part.style.fill = colorFill;
}

function manipulateSVG() {
  console.log("manipulation");

  selectPumpkinGroups();
  noClickOnShadows();
  document.querySelectorAll(".g_to_interact_with").forEach(prepareArea);
}

function selectPumpkinGroups() {
  document.querySelector("#stem").classList.add("g_to_interact_with");
  document.querySelector("#slicesA").classList.add("g_to_interact_with");
  document.querySelector("#slicesB").classList.add("g_to_interact_with");
  colorPumpkin();
}

function noClickOnShadows() {
  console.log("noClickOnShadows");
  document.querySelector("#new_shadow_Image").style.pointerEvents = "none";
  document.querySelector("#new_shadow_Image").style.zIndex = "20";
}

function prepareArea(area) {
  //set a start color + cursor
  area.style.fill = "#f2ecde";
  area.style.cursor = "pointer";

  //finding the paths inside each area and removing their fill
  area.querySelectorAll("path").forEach(removeFill);
  function removeFill(path) {
    path.removeAttribute("fill");
  }
  area.style.zIndex = "20";
}

function colorPumpkin() {
  stem.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
  });

  sliceA.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
  });

  sliceB.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
  });

  document.querySelectorAll("circle").forEach((element) => {
    element.addEventListener("click", (event) => {
      currentColor = event.target.style.fill;
      //styling the dashed stroke color on hover (it's black when you start)
      document.querySelectorAll("path").forEach((path) => {
        path.addEventListener("mouseover", () => {
          path.style.stroke = currentColor;
        });
      });
    });
  });
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
  //closing all tabs
  document.querySelector("#nose").classList.add("hidden");
  document.querySelector("#eyes").classList.add("hidden");
  document.querySelector("#mouth").classList.add("hidden");
  document.querySelector("#background").classList.add("hidden");
  document.querySelector("#candle").classList.add("hidden");

  //removing selected class from all categories
  document.querySelector("#categories div:nth-of-type(1)").classList.remove("selected");
  document.querySelector("#categories div:nth-of-type(2)").classList.remove("selected");
  document.querySelector("#categories div:nth-of-type(3)").classList.remove("selected");
  document.querySelector("#categories div:nth-of-type(4)").classList.remove("selected");
  document.querySelector("#categories div:nth-of-type(5)").classList.remove("selected");

  //adding selected class to the chosen option
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

  //remove hidden class from chosen option
  let idName = this.textContent.toLowerCase();
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

  //color face based on light
  colorEye();
  colorMouth();
  colorNose();
}

function setEyes(choice) {
  if (this.textContent.trim() === "No Eyes") {
    document.querySelector("#pumpkin-container .eye").innerHTML = "";
  } else {
    choice = choice.path[0].attributes[2].value;
    settings.eyes = choice;
    importEyes();
  }
}

async function importEyes() {
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
  if (this.textContent.trim() === "No Nose") {
    console.log("no nose");
    document.querySelector("#pumpkin-container .nose").innerHTML = "";
  } else {
    choice = choice.path[0].attributes[2].value;
    settings.nose = choice;
    importNose();
  }
}

async function importNose() {
  let respNose = await fetch(`img/nose${settings.nose}.svg`);
  let svgNose = await respNose.text();
  animate("nose");
  document.querySelector("#pumpkin-container .nose").innerHTML = svgNose;

  colorNose();
}

function colorNose() {
  //first we decide if the light is lit or not
  //using different colors for the depth of the shell and the inside of the pumpkin
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
  // console.log(this.textContent.trim());
  if (this.textContent.trim() === "No Mouth") {
    console.log("no mouth");
    document.querySelector("#pumpkin-container .mouth").innerHTML = "";
  } else {
    choice = choice.path[0].attributes[2].value;
    settings.mouth = choice;
    importMouth();
  }
}

async function importMouth() {
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

function resetColors() {
  console.log("color reset");
  //reset current color

  Array.from(stem.children).forEach((child) => {
    setColor(child, resetColor);
  });

  Array.from(sliceA.children).forEach((child) => {
    setColor(child, resetColor);
  });

  Array.from(sliceB.children).forEach((child) => {
    setColor(child, resetColor);
  });
}

function setHeight() {
  let height = document.querySelector("#pumpkin").offsetHeight;
  document.querySelector(".sidenavigation").style.height = `${height - 33}px`;
  document.querySelector("#colors").style.height = `${height}px`;
}
