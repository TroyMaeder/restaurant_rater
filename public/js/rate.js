let ifClicked0 = false;
let ifClicked1 = false;
let ifClicked2 = false;
let ifClicked3 = false;
let ifClicked4 = false;

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

document.getElementsByClassName('circle')[0].addEventListener('click', function() {

	if (ifClicked0 == true) {
		for (var i = 1; i < 5; i++) {
			console.log(' it is true');
			document.getElementsByClassName('circle')[i].style.backgroundColor = 'white';
			// document.getElementsByClassName('circle')[0].style.backgroundColor = "#589442";
		}
		ifClicked0 = false;
		ifClicked1 = false;
		ifClicked2 = false;
		ifClicked3 = false;
		ifClicked4 = false;
	} else {
		document.getElementsByClassName('circle')[0].style.backgroundColor = "#589442";
		ifClicked0 = true;
  }
});




document.getElementsByClassName('circle')[1].addEventListener('click', function() {
	if (ifClicked1 == true) {
		for (var i = 2; i < 5; i++) {
			document.getElementsByClassName('circle')[i].style.backgroundColor = 'white';
		}
		ifClicked2 = false;
		ifClicked3 = false;
		ifClicked4 = false;
	} else {
  	for (var i = 1; i >= 0; i--) {
			document.getElementsByClassName('circle')[i].style.backgroundColor = "#589442";
		}
		ifClicked0 = true;
		ifClicked1 = true;
  }
});

document.getElementsByClassName('circle')[2].addEventListener('click', function() {
	if (ifClicked2 == true) {
		for (var i = 3; i < 5; i++) {
			document.getElementsByClassName('circle')[i].style.backgroundColor = "white";
  	}
		ifClicked3 = false;
		ifClicked4 = false;
	} else {
		for (var i = 2; i >= 0; i--) {
			document.getElementsByClassName('circle')[i].style.backgroundColor = "#589442";
		}
		ifClicked0 = true;
		ifClicked1 = true;
		ifClicked2 = true;
  }
});

document.getElementsByClassName('circle')[3].addEventListener('click', function() {
	if (ifClicked3 == true) {
		for (var i = 4; i < 5; i++) {
			document.getElementsByClassName('circle')[i].style.backgroundColor = "white";
  	}
		ifClicked4 = false;

	} else {
		for (var i = 3; i >= 0; i--) {
			document.getElementsByClassName('circle')[i].style.backgroundColor = "#589442";
		}
		ifClicked0 = true;
		ifClicked1 = true;
		ifClicked2 = true;
		ifClicked3 = true;
  }
});

document.getElementsByClassName('circle')[4].addEventListener('click', function() {
	if (ifClicked4 == true) {
			document.getElementsByClassName('circle')[i].style.backgroundColor = "white";
			ifClicked4 = false;
	} else {
		for (var i = 4; i >= 0; i--) {
			document.getElementsByClassName('circle')[i].style.backgroundColor = "#589442";
		}
		ifClicked0 = true;
		ifClicked1 = true;
		ifClicked2 = true;
		ifClicked3 = true;
	}
});
