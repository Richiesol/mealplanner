"use strict";

var modal = document.getElementById("myModal");
var weekmenu = document.getElementById("weekmodal");
var startcookingmodal = document.getElementById("startcookingmodal");
var receipetext = document.getElementById("text");
var changebutton = document.getElementById("changebutton");
var btn = document.getElementById("edit");
var startcookingbutton = document.getElementById("startcookingbutton");
var changedish = document.getElementById("name_of_breakfast");
var span1 = document.getElementsByClassName("close")[0];
var closedish = document.getElementsByClassName("closedish")[0];
var closebutton = document.getElementsByClassName("closemodal")[0];
var dishname = document.getElementById("dishname");
var recipetitle = document.getElementById("recipetitle");
var leftarrow = document.getElementById("leftarrow");
var rightarrow = document.getElementById("rightarrow");
var weekDayDishText = document.getElementById("weekdish");
var buttonCount = 0;
var iter = 0;
let dishArray;
var lengthOfRecipe;
var listOfKeys;
let dish;
let weekDaysDishName;
let mealtype;

var existingData;
fetch("http://localhost:8000/receipebook.json")
  .then((response) => response.json())
  .then((json) => {
    existingData = json;
  });

function weekdishbutton(event) {
  let target = event.target;
  weekDaysDishName = target.closest(".dishbutton").firstElementChild;
  weekDayDishText.innerText = weekDaysDishName.innerText;
  weekmenu.style.display = "block";
  mealtype =
    target.closest(".meal").firstElementChild.firstElementChild
      .nextElementSibling;
}
function weekdishbuttonclick() {
  weekmenu.style.display = "none";
  dishname = weekDaysDishName;
  changedish.setAttribute("list", mealtype.innerText.toLowerCase());
  console.log(dishname.innerText);
  currentdishname.innerText = dishname.innerText;
  changedish.value = dishname.innerText;
  modal.style.display = "block";
}
function weekDishStartCooking(event) {
  weekmenu.style.display = "none";
  let target = event.target;
  dishname = target.closest(".innerbox").firstElementChild.nextElementSibling;
  dish = dishname.innerText;
  dishArray = dish.split("&");
  dish = dishArray[0].trim();
  recipe(dish);
  startcookingmodal.style.display = "block";
}

function buttonclick(event) {
  let target = event.target;
  dishname = target.closest(".innerbox").firstElementChild.nextElementSibling;
  let mealtype = target.closest(".box").lastElementChild;
  changedish.setAttribute("list", mealtype.innerText.toLowerCase());
  changedish.value = dishname.innerText;
  modal.style.display = "block";
}
function startcooking(event) {
  let target = event.target;
  dishname = target.closest(".innerbox").firstElementChild.nextElementSibling;
  dish = dishname.innerText;
  console.log(dish);
  dishArray = dish.split("&");
  dish = dishArray[0].trim();
  recipe(dish);
  startcookingmodal.style.display = "block";
}
span1.onclick = function close() {
  modal.style.display = "none";
};
closedish.onclick = function close() {
  weekmenu.style.display = "none";
};
closebutton.onclick = function close() {
  startcookingmodal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
function change_dish(event) {
  let target = event.target;
  let changeDish =
    target.closest(".editcontent").firstElementChild.nextElementSibling;
  changeDish.innerText = changedish.value;
  dishname.innerText = changedish.value;

  modal.style.display = "none";
}
leftarrow.onclick = function leftarrowclick() {
  if (buttonCount <= 0 && iter == 0) {
    buttonCount = 0;
    recipe(dish);
  } else if (buttonCount == 0 && iter > 0) {
    iter--;
    console.log(iter);
    dish = dishArray[iter].trim();
    recipe(dish);
  } else {
    buttonCount--;
    displayRecipe(dish);
  }
};
rightarrow.onclick = function rightarrowclick() {
  if (buttonCount == lengthOfRecipe - 1 && iter >= dishArray.length - 1) {
    buttonCount = 0;
    iter = 0;
    dish = dishArray[iter].trim();
    recipe(dish);
  } else if (buttonCount >= lengthOfRecipe - 1 && iter < dishArray.length - 1) {
    buttonCount = 0;
    iter++;

    dish = dishArray[iter].trim();
    recipe(dish);
  } else {
    buttonCount++;
    displayRecipe(dish);
  }
};
function recipe(dishname) {
  listOfKeys = Object.keys(existingData[dishname]);
  lengthOfRecipe = listOfKeys.length;
  recipetitle.innerText = listOfKeys[buttonCount];
  displayRecipe(dishname);
}
function displayRecipe(dishname) {
  // console.log(buttonCount)
  recipetitle.innerText = listOfKeys[buttonCount];
  var dishrecipe = existingData[dishname][listOfKeys[buttonCount]];
  receipetext.innerText = dishrecipe;
}
