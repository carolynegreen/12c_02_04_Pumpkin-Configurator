"use strict";
window.addEventListener("DOMContentLoaded", start);

let elementToPaint;
// let svgCuttings;

async function start() {
  console.log("start");
  let respPumpkin = await fetch("img/pumpkin.svg");
  let svgPumpkin = await respPumpkin.text();
  document.querySelector("#pumpkin").innerHTML = svgPumpkin;

  let respMouths = await fetch("img/pumpkinMouths.svg");
  let svgMouths = await respMouths.text();
  let respEyes = await fetch("img/pumpkinEyes.svg");
  let svgEyes = await respEyes.text();
  let respNoses = await fetch("img/pumpkinNoses.svg");
  let svgNoses = await respNoses.text();

  //there are 6 items in each SVG. We need to somehow divide them up and place them in a flex or grid inside the options menu.
  //if this isn't possible I can save each item individually, but it's a lot of files to import.
  //#eyes #mouth #nose

  manipulateSVG();
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
