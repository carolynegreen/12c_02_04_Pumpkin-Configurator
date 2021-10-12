"use strict";
window.addEventListener("DOMContentLoaded", start);

let elementToPaint;
const settings = {
  lit: true,
  mouth: 1,
  eyes: 1,
  nose: 1,
};
// let svgCuttings;

async function start() {
  console.log("start");
  //Importing the main picture
  let respPumpkin = await fetch("img/pumpkin.svg");
  let svgPumpkin = await respPumpkin.text();
  document.querySelector("#pumpkin").innerHTML = svgPumpkin;

  setMenuListeners();
  manipulateSVG();
}

function manipulateSVG() {
  console.log("manipulation");
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
  document.querySelectorAll("#options #eyes .option").forEach((option) => option.addEventListener("click", importEyes));
  document.querySelectorAll("#options #nose .option").forEach((option) => option.addEventListener("click", importNose));
  document.querySelectorAll("#options #mouth .option").forEach((option) => option.addEventListener("click", importMouth));
  document.querySelector("#candle img").addEventListener("click", toggleLight);
  document.querySelector("#candle figcaption").addEventListener("click", toggleLight);
}

function toggleMenu() {
  document.querySelector("#nose").classList.add("hidden");
  document.querySelector("#eyes").classList.add("hidden");
  document.querySelector("#mouth").classList.add("hidden");
  document.querySelector("#background").classList.add("hidden");
  document.querySelector("#candle").classList.add("hidden");

  let idName = this.textContent.toLowerCase();
  document.querySelector(`#${idName}`).classList.remove("hidden");
}

function toggleLight() {
  if (settings.lit === true) {
    console.log("turn off light");
    settings.lit = false;
    document.querySelector("#candle img").src = "img/unlit-candle.png";
    document.querySelector("#candle figcaption").textContent = "click to turn on candle";
  } else {
    console.log("turn on light");
    settings.lit = true;
    document.querySelector("#candle img").src = "img/lit-candle.png";
    document.querySelector("#candle figcaption").textContent = "click to extinguish candle";
  }
}

async function importEyes(choice) {
  // console.log(choice.path[0].attributes[2].value);
  choice = choice.path[0].attributes[2].value;
  // console.log(document.querySelector(`#pumpkin-container img[src= "img/eye1.svg"]`));
  let respEye = await fetch(`img/eye${choice}.svg`);
  let svgEye = await respEye.text();
  document.querySelector("#pumpkin-container .eye").innerHTML = svgEye;
  if (settings.lit === true) {
    document.querySelectorAll(`#eyes${choice} path`).forEach(colorElementOrange);
    document.querySelectorAll(`#eyes${choice} #shell path`).forEach(colorElementBrown);
    function colorElementOrange(area) {
      area.style.fill = "#f9b332";
    }
    function colorElementBrown(area) {
      area.style.fill = "#b07e4a";
    }
  } else {
    document.querySelectorAll(`#eyes${choice} path`).forEach(colorElementBlack);
    document.querySelectorAll(`#eyes${choice} #shell path`).forEach(colorElementBrown);
    function colorElementBrown(area) {
      area.style.fill = "#432918";
    }
    function colorElementBlack(area) {
      area.style.fill = "black";
    }
  }
}

async function importNose(choice) {
  // console.log(choice.path[0].attributes[2].value);
  choice = choice.path[0].attributes[2].value;
  // console.log(document.querySelector(`#pumpkin-container img[src= "img/eye1.svg"]`));
  let respNose = await fetch(`img/nose${choice}.svg`);
  let svgNose = await respNose.text();
  document.querySelector("#pumpkin-container .nose").innerHTML = svgNose;
  if (settings.lit === true) {
    document.querySelectorAll(`#nose${choice} path`).forEach(colorElementOrange);
    document.querySelectorAll(`#nose${choice} #shell`).forEach(colorElementBrown);
    document.querySelectorAll(`#nose${choice} #shell path`).forEach(colorElementBrown);
    function colorElementOrange(area) {
      area.style.fill = "#f9b332";
    }
    function colorElementBrown(area) {
      area.style.fill = "#b07e4a";
    }
  } else {
    document.querySelectorAll(`#nose${choice} path`).forEach(colorElementBlack);
    document.querySelectorAll(`#nose${choice} #shell`).forEach(colorElementBrown);
    document.querySelectorAll(`#nose${choice} #shell path`).forEach(colorElementBrown);
    function colorElementBrown(area) {
      area.style.fill = "#432918";
    }
    function colorElementBlack(area) {
      area.style.fill = "black";
    }
  }
}

async function importMouth(choice) {
  // console.log(choice.path[0].attributes[2].value);
  choice = choice.path[0].attributes[2].value;
  // console.log(document.querySelector(`#pumpkin-container img[src= "img/eye1.svg"]`));
  let respMouth = await fetch(`img/mouth${choice}.svg`);
  let svgMouth = await respMouth.text();
  document.querySelector("#pumpkin-container .mouth").innerHTML = svgMouth;
  if (settings.lit === true) {
    document.querySelectorAll(`#mouth${choice} path`).forEach(colorElementOrange);
    document.querySelectorAll(`#mouth${choice} #shell path`).forEach(colorElementBrown);
    function colorElementOrange(area) {
      area.style.fill = "#f9b332";
    }
    function colorElementBrown(area) {
      area.style.fill = "#b07e4a";
    }
  } else {
    document.querySelectorAll(`#mouth${choice} path`).forEach(colorElementBlack);
    document.querySelectorAll(`#mouth${choice} #shell path`).forEach(colorElementBrown);
    function colorElementBrown(area) {
      area.style.fill = "#432918";
    }
    function colorElementBlack(area) {
      area.style.fill = "black";
    }
  }
}
