
var modal = document.getElementById("myModal");
var startcookingmodal = document.getElementById("startcookingmodal");
var receipetext = document.getElementById("text");
var changebutton = document.getElementById("changebutton")
var btn = document.getElementById("edit");
var startcookingbutton =document.getElementById("startcookingbutton")
var currentdishname = document.getElementById("currentdishname");
var changedish = document.getElementById("name_of_breakfast");
var span1 = document.getElementsByClassName("close")[0];
var closebutton = document.getElementsByClassName("closemodal")[0];
var dishname = document.getElementById("dishname");
var recipetitle = document.getElementById("recipetitle");
var leftarrow = document.getElementById("leftarrow");
var rightarrow = document.getElementById("rightarrow");
var buttonCount = 0;
var iter =0;
let dishArray ;
var lengthOfRecipe;
var listOfKeys;
let dish;

var existingData;
fetch("http://localhost:8000/receipebook.json")
  .then((response) => response.json())
  .then((json) => {
    existingData = json });

btn.onclick = function() {
  modal.style.display = "block";
}
startcookingbutton.onclick = function() {
  dish =  dishname.innerText;
  dishArray = dish.split("&");
  dish = dishArray[0].trim();
  recipe(dish);
  startcookingmodal.style.display = "block";
}
span1.onclick = function close() {
  modal.style.display = "none";
}
closebutton.onclick = function close() {
  startcookingmodal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
changebutton.onclick = function(){
  console.log(changedish.value)
  currentdishname.innerText = changedish.value;
  dishname.innerText = changedish.value;
  modal.style.display = "none";
  
}
leftarrow.onclick =function leftarrowclick(){
  if(buttonCount<=0 && iter== 0){
    buttonCount = 0;
    recipe(dish);
  }
  else if(buttonCount == 0 && iter > 0){
    iter--;
    console.log(iter);
    dish = dishArray[iter].trim();
    recipe(dish);
  }
  else{
    buttonCount--;
    displayRecipe(dish);
  }
}
rightarrow.onclick =function rightarrowclick(){
  if(buttonCount == lengthOfRecipe-1 && iter >= dishArray.length-1){
    buttonCount = 0;
    iter =0;
    dish = dishArray[iter].trim();
    recipe(dish);
  }
  else if(buttonCount >= lengthOfRecipe-1 && iter < dishArray.length-1){
    buttonCount = 0;
    iter ++;
    
    dish = dishArray[iter].trim();
    recipe(dish);
  }
  else{
    buttonCount++;
    displayRecipe(dish);
  }

  
}
function recipe(dishname){
  listOfKeys= Object.keys(existingData[dishname]);
  lengthOfRecipe = listOfKeys.length;
  recipetitle.innerText = listOfKeys[buttonCount];
  displayRecipe(dishname);
}
function displayRecipe(dishname){
  // console.log(buttonCount)
  recipetitle.innerText = listOfKeys[buttonCount];
  var dishrecipe = existingData[dishname][listOfKeys[buttonCount]];
  receipetext.innerText = dishrecipe;
}


