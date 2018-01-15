const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");

let missed = 0;

const startButton = document.getElementsByClassName("btn__reset")[0];
startButton.addEventListener("click", function() {
  document.getElementById("overlay").style.display ='none';
  restart();
});

const phrases = [
  'hello my name is chris',
  'I am the best',
  'No you are the best',
  'We are all awesome',
  'Two mice fell into a bucket of cream',
  'Which mouse am I Frank'
]

function getRandomPhraseAsArray(arr) {
  const arrayLength = arr.length;
  const randomIndex = Math.floor((Math.random() * arrayLength));
  return  arr[randomIndex].split("");
}


function addPhraseToDisplay(arr) {
  document.querySelector("#phrase").innerHTML = "";
  for (let i = 0, len = arr.length; i < len; i++) {
    if(arr[i] !== " ") {
      document.getElementById("phrase").innerHTML += "<li class='letter'>" + arr[i] + "</li>";
    }
    else
      document.getElementById("phrase").innerHTML += "  &nbsp;";
  }
}




function checkLetter(char) {
  const letterClass = document.getElementsByClassName("letter");
  let check = 0;
  for(let i=0; i<letterClass.length; i++) {
    if(char === letterClass[i].innerHTML.toLowerCase()) {
      letterClass[i].className += " show";
      check++;
    }
  }
  if(check > 0) return char;
  else return null;
}


function checkWin() {
	const show = document.getElementsByClassName('show');
	const letter = document.getElementsByClassName('letter');
	let result;
	if(show.length === letter.length){
		result = 'win';
		decision(result);
	}
	else if(missed >= 5){
		result = 'lose';
		decision(result);
	}
}

function decision(result) {
    const btnStart = document.getElementsByClassName('btn__reset')[0];
		overlay.className = result;
		overlay.style.display = 'flex';
		overlay.children[0].innerHTML = 'You ' +result+'!';
		btnStart.innerHTML = 'Restart game';

}

function restart() {
  //let ulPhrase = document.getElementById('phrase').getElementsByTagName('ul')[0];
  let ulPhrase = document.querySelector('#phrase');
  const btnLetter = document.getElementsByTagName('button');
  const img = document.getElementsByTagName('img');
	missed = 0;
	ulPhrase.innerHTML = "";
	for (let i = 0; i <img.length; i++) {
	 	img[i].src = "images/liveHeart.png";
	}
	for (let i = 0; i < btnLetter.length; i++) {
		btnLetter[i].classList.remove('chosen');
		btnLetter[i].disabled = false;
	}
  let phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
}



const btnLetter = document.getElementsByTagName('button');

for(let i = 0; i < btnLetter.length; i++ ){
	  btnLetter[i].addEventListener('click', (e)=>{
		const btn = e.target.innerHTML;
		const letterFound = checkLetter(btn);

		btnLetter[i].className = 'chosen';
		btnLetter[i].disabled = true;

		if (letterFound === null && missed < 5) {
			document.getElementsByTagName('img')[4-missed].src ="./images/lostHeart.png";
			missed++;
		}
		checkWin();
	});
}
