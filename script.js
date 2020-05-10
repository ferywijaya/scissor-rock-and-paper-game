const arr_option = [];
var i = 0;
var pScore = 0;
var cScore = 0;
var tempChoose = [];

while (i < 10) {
  arr_option.push('scissors', 'rock', 'paper');
  i++;
}

const playBtn = document.querySelector('.intro button');
const introScreen = document.querySelector('.intro');
const matchContent = document.querySelector('.content');
playBtn.addEventListener('click', function () {
  introScreen.classList.add('fadeOut');
  matchContent.classList.add('fadeIn');
});
function rules(comp, player) {
  if (player == comp) return 'DRAW!';
  if (player == 'scissors')
    return comp == 'paper' ? 'PLAYER WINS!' : 'COMPUTER WINS!';
  if (player == 'rock')
    return comp == 'scissors' ? 'PLAYER WINS!' : 'COMPUTER WINS!';
  if (player == 'paper')
    return comp == 'rock' ? 'PLAYER WINS!' : 'COMPUTER WINS!';
}

function updateScore() {
  var pS = document.querySelector('.score .player-score p');
  var cS = document.querySelector('.score .computer-score p');
  pS.innerHTML = pScore;
  cS.innerHTML = cScore;
}

document.addEventListener('click', function (e) {
  e = e; // || window.event;
  var playerChoose = e.target.className; // || e.srcElement;
  const selector = document.getElementsByClassName('img-komputer')[0];

  var i = 0;
  var refInt = '';

  const callback = () => {
    var randIndex = Math.floor(Math.random() * arr_option.length);
    var compChoose = arr_option[randIndex];

    selector.src = 'img/' + compChoose + '.png';
    if (++i === arr_option.length - 1) {
      var info = document.getElementsByClassName('info')[0];

      result = rules(compChoose, playerChoose);
      if (result == 'PLAYER WINS!') {
        pScore++;
        info.innerHTML = result;
      } else if (result == 'COMPUTER WINS!') {
        cScore++;
        info.innerHTML = result;
      } else {
        info.innerHTML = result;
      }
      updateScore();

      clearInterval(refInt);
    }
  };

  if (arr_option.includes(playerChoose)) {
    if (tempChoose.length == 0) {
      tempChoose.push(playerChoose);
      document.querySelector('.' + tempChoose[0]).setAttribute('id', 'active');
    } else {
      tempChoose.push(playerChoose);
      if (tempChoose.length == 2) {
        document.querySelector('.' + tempChoose[0]).removeAttribute('id');
        document
          .querySelector('.' + tempChoose[1])
          .setAttribute('id', 'active');
        console.log(tempChoose);
      }
      tempChoose.shift();
    }

    refInt = setInterval(callback, 50);
  }
});
