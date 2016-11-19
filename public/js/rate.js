var count = 0;
var count1 = 0;
var count2 = 0;
var count3 = 0;
var count4 = 0;
var ratingCounter = 0;

function evenNumber(elementIndex) {
	document.getElementsByClassName('circle')[elementIndex].style.backgroundColor = "white";
	ratingCounter = ratingCounter - 1;
	document.getElementsByName('ratings_five')[0].value = ratingCounter;

}

function oddNumber(elementIndex) {
	document.getElementsByClassName('circle')[elementIndex].style.backgroundColor = "#589442";
	ratingCounter = ratingCounter + 1;
	document.getElementsByName('ratings_five')[0].value = ratingCounter;
}

document.getElementsByClassName('circle')[0].addEventListener('click', function() {
	if (count % 2 === 0) {
        oddNumber(0);
    }
    else {
        evenNumber(0);
    }

    count++;
});

document.getElementsByClassName('circle')[1].addEventListener('click', function() {
	if (count1 % 2 === 0) {
        oddNumber(1);
    }
    else {
        evenNumber(1);
    }

    count1++;
});

document.getElementsByClassName('circle')[2].addEventListener('click', function() {
	if (count2 % 2 === 0) {
        oddNumber(2);
    }
    else {
        evenNumber(2);
    }

    count2++;
});

document.getElementsByClassName('circle')[3].addEventListener('click', function() {
	if (count3 % 2 === 0) {
        oddNumber(3);
    }
    else {
        evenNumber(3);
    }

    count3++;
});

document.getElementsByClassName('circle')[4].addEventListener('click', function() {
	if (count4 % 2 === 0) {
        oddNumber(4);
    }
    else {
        evenNumber(4);
    }

    count4++;
});

document.getElementsByName('ratings_five')[0].value = 'jjjj';

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
