let urlOne = document.getElementById("urlOne");
urlOne.addEventListener("change", (event) => {
  let lengthUrlOne = event.target.value.length;
  document.getElementById("urlOneLabel").innerHTML = lengthUrlOne;
});

let urlTwo = document.getElementById("urlTwo");
urlTwo.addEventListener("change", (event) => {
  let lengthUrlTwo = event.target.value.length;
  document.getElementById("urlTwoLabel").innerHTML = lengthUrlTwo
});
