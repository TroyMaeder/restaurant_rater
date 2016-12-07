var restaurantRating = 0;

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
});

function turnCirclesWhite() {
  for (var i = 0; i < 5; i++) {
    document.getElementsByClassName('circle')[i].style.backgroundColor = "white";
  }
}

function turnCirclesGreen(amountClicked) {
  for (var j = 0; j < amountClicked; j++) {
    document.getElementsByClassName('circle')[j].style.backgroundColor = "#589442";
  }
}

document.getElementById('circle_one').addEventListener('click', function() {
  turnCirclesWhite();
  turnCirclesGreen(1);
  restaurantRating = 1;
  document.getElementById('review_counter').value = restaurantRating;
});

document.getElementById('circle_two').addEventListener('click', function() {
  turnCirclesWhite();
  turnCirclesGreen(2);
  restaurantRating = 2;
  document.getElementById('review_counter').value = restaurantRating;
});

document.getElementById('circle_three').addEventListener('click', function() {
  turnCirclesWhite();
  turnCirclesGreen(3);
  restaurantRating = 3;
  document.getElementById('review_counter').value = restaurantRating;
});

document.getElementById('circle_four').addEventListener('click', function() {
  turnCirclesWhite();
  turnCirclesGreen(4);
  restaurantRating = 4;
  document.getElementById('review_counter').value = restaurantRating;
});

document.getElementById('circle_five').addEventListener('click', function() {
  turnCirclesWhite();
  turnCirclesGreen(5);
  restaurantRating = 5;
  document.getElementById('review_counter').value  = restaurantRating;
});
