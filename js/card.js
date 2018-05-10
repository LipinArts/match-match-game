class Card {
	constructor() {
		// Define variables
		this.matchedCard = document.getElementsByClassName('matched');
		this.totalTime = document.querySelector('.total-time');
		this.gameCard = document.getElementsByClassName('game-card');
		this.disabled = document.getElementsByClassName('disabled');
		this.home = document.getElementById('home');
		this.newGameButton = document.getElementById('new-game');
		this.form = document.getElementsByTagName('form');
		this.openedCards = [];
		this.card = document.getElementsByClassName('flipper');
		this.closeButton = document.getElementsByClassName('close');
		this.cardBorder = document.getElementsByClassName('content-back');
		this.popupWin = document.getElementById('overlay-win');
		this.totalTime = document.querySelector('.total-time');
		this.timer = document.querySelector('.timer');
		this.timerAnimate = document.querySelector('.icon-spin6');
		this.user = document.getElementsByClassName('user-name');
		this.email = document.getElementsByClassName('user-email');
		this.gameBoard = document.getElementById('game-board');
		this.gameContainer = document.getElementById('game-container');
		this.diffClassic = '';
		this.backImageClassic = '';
		this.diffHearthstone = '';
		this.backImageHearthstone = '';
		this.diffGwent = '';
		this.backImageGwent = '';
		// set user data
		this.userName = 'anonimys';
		this.userEmail = 'anonimys@mail.com';
		this.cards = [];
		this.volume = document.getElementById('volume');
		this.card = document.getElementsByClassName('flipper');
		this.cardBorder = document.getElementsByClassName('content-back');

		// launch all interior events
		this.registerEvents();
	}
	// register all interior events
	registerEvents() {
		this.getScore();
		this.cardEvents();
	}

	// Create check cards match function
	isMatched() {
		setTimeout(() => {
			this.openedCards[0].classList.add('hidden', 'matched');
			this.openedCards[1].classList.add('hidden', 'matched');
			this.openedCards[0].classList.remove('disabled');
			this.openedCards[1].classList.remove('disabled');
			this.openedCards = [];
			this.isWin();
		}, 1000);
	}
	//-------------------------------------------------------

	// Create check cards unmatch function
	isUnmatched() {
		setTimeout(() => {
			this.openedCards[0].firstChild.classList.remove('rotateY');
			this.openedCards[1].firstChild.classList.remove('rotateY');
			this.openedCards[0].classList.remove('disabled');
			this.openedCards[1].classList.remove('disabled');
			this.openedCards = [];
		}, 1000);
	}
	//------------------------------------------------------------
	// Create isWin function when game is over
	isWin() {
		if (this.matchedCard.length === this.cards.length) {
			this.popupWin.classList.add('show');
			this.totalTime.innerHTML = this.timer.textContent;
			this.timerAnimate.classList.remove('animate-spin');
			this.setScore();
		}
	}
	cardEvents() {
		// Event loop for the selection of game cards
		for (let i = 0; i < this.card.length; i++) {
			this.card[i].addEventListener(
				'click',
				() => {
					if (this.card[i].classList.contains('rotateY')) {
						return false;
					}
					for (let j = 0; j < this.card.length; j++) {
						this.card[j].classList.remove('rotateY');
						this.cardBorder[j].classList.remove('active-card');
					}
					this.card[i].classList.add('rotateY');
					this.cardBorder[i].classList.add('active-card');
				},
				true
			);
			this.closeButton[i].addEventListener('click', () => {
				this.card[i].classList.remove('rotateY');
				this.cardBorder[i].classList.remove('active-card');
			});
		}
		// Loop events for click on cards
		for (let i = 0; i < this.gameCard.length; i++) {
			this.gameCard[i].addEventListener(
				'click',
				() => {
					if (this.gameCard[i].classList.contains('disabled')) {
						this.openedCards = [];
						return false;
					} else if (this.disabled.length < 2) {
						this.gameCard[i].classList.add('disabled');
						this.gameCard[i].firstChild.classList.add('rotateY');
					}
				},
				true
			);
			this.gameCard[i].addEventListener(
				'click',
				() => {
					this.openedCards.push(this.gameCard[i]);
					if (this.openedCards.length === 2) {
						if (
							this.openedCards[0].getAttribute('data-attribute') ===
							this.openedCards[1].getAttribute('data-attribute')
						) {
							this.isMatched();
						} else {
							this.isUnmatched();
						}
					}
				},
				true
			);
		}
	}
	// Shuffle function
	shuffle(array) {
		this.m = array.length;
		this.t;
		this.i;
		// While there remain elements to shuffle
		while (this.m) {
			// Pick a remaining element…
			this.i = Math.floor(Math.random() * (this.m -= 1));
			// And swap it with the current element.
			this.t = array[this.m];
			array[this.m] = array[this.i];
			array[this.i] = this.t;
		}
		return array;
	}
	createBoard(diff, backImage, imgPath) {
		const allCards = [];
		let a = 1;
		for (let i = 0; i < 54; i++) {
			allCards[i] = a;
			a += 1;
		}
		// reset board
		this.gameBoard.innerHTML = '';
		this.cards = [];
		// rotate choose-game cards back
		for (let j = 0; j < this.card.length; j++) {
			this.card[j].classList.remove('rotateY');
			this.cardBorder[j].classList.remove('active-card');
		}

		// return volume ON icon
		this.volume.firstElementChild.classList.remove('icon-mute');
		this.volume.firstElementChild.classList.add('icon-sound');

		for (let i = 0; i < 3; i++) {
			if (this.user[i].value) {
				this.userName = this.user[i].value;
			}
			if (this.email[i].value) {
				this.userEmail = this.email[i].value;
			}
		}
		// shuffle all cards
		let html = '';
		this.shuffle(allCards);
		for (let i = 0; i < Number(diff); i++) {
			this.cards[i] = allCards[i];
			this.cards[i + 1] = allCards[i];
			i += 1;
		}
		this.shuffle(this.cards);
		// create cards in board
		for (let i = 0; i < this.cards.length; i++) {
			html += `<div class="game-card" data-attribute="${this.cards[i]}">`;
			html += '<div class="card-flipper">';
			html += '<div class="flip3D-front">';
			html += `<img src="${backImage}" alt="back image">`;
			html += '</div>';
			html += '<div class="flip3D-back">';
			html += `<img src="${imgPath}${this.cards[i]}.jpg" alt="image"></div>`;
			html += '</div>';
			html += '</div>';
		}
		let boardWidth = '1400px';
		if (diff === '12') {
			boardWidth = '630px';
		}
		if (diff === '20') {
			boardWidth = '770px';
		}
		if (diff === '32') {
			boardWidth = '1148px';
		}
		this.gameContainer.style.width = boardWidth;
		this.gameBoard.innerHTML = html;
		this.cardEvents();
	}

	getScore() {
		// Fetch localStorage Data
		this.tableScore = document.querySelector('.table');
		this.key = [];
		this.returnUserData = JSON.parse(window.localStorage.getItem('match-game'));

		let html = '';
		if (this.returnUserData) {
			for (let i = 0; i < Object.keys(this.returnUserData).length; i++) {
				this.key[i] = Object.keys(this.returnUserData)[i];
				html += '<tr>';
				html += `<td>${this.returnUserData[this.key[i]].user}</td>`;
				html += `<td>${this.returnUserData[this.key[i]].email}</td>`;
				html += `<td>${this.returnUserData[this.key[i]].time}</td>`;
				this.tableScore.innerHTML = html;
			}
		} else {
			this.returnUserData = {};
		}
	}
	setScore() {
		this.returnUserData = JSON.parse(window.localStorage.getItem('match-game'));
		if (!this.returnUserData) {
			this.returnUserData = {};
		}
		this.userData = {
			user: this.userName,
			email: this.userEmail,
			time: this.timer.textContent
		};
		this.returnUserData[this.userName] = this.userData;
		// set user data into localStorage
		this.serialuserData = JSON.stringify(this.returnUserData);
		window.localStorage.setItem('match-game', this.serialuserData);
		this.getScore();
	}
	// -------------------------------------------------
}
