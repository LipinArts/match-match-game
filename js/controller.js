class Controller {
  constructor(layout) {
    // Define audio variables
    this.music = '';
    this.volume = document.getElementById('volume');

    this.layout = layout;
    this.imgPathClassic = 'img/classic/cards/';
    this.imgPathHearth = 'img/hearthstone/cards/';
    this.imgPathGwent = 'img/gwent/cards/';
    this.form = document.getElementsByTagName('form');
    this.home = document.getElementById('home');
    this.newGameButton = document.getElementById('new-game');
    // Define popup variables
    this.rules = document.getElementById('rules');
    this.popupRules = document.getElementById('overlay-rules');
    this.closeRules = document.getElementById('popup-rules-close');
    this.score = document.getElementById('score');
    this.popupScore = document.getElementById('overlay-score');
    this.closeScore = document.getElementById('popup-score-close');
    this.popupWin = document.getElementById('overlay-win');
    this.closeWin = document.getElementById('popup-win-close');

    // Define timer variables
    this.timer = document.querySelector('.timer');
    this.timerAnimate = document.querySelector('.icon-spin6');
    this.gameControls = document.querySelector('.game-controls');
    this.totalTime = document.querySelector('.total-time');
    // // Define timer variables
    this.timer = document.querySelector('.timer');
    this.timerAnimate = document.querySelector('.icon-spin6');
    this.gameControls = document.querySelector('.game-controls');

    // Define start game buttons variables
    this.chooseGame = document.querySelector('.inner-wrapper');
    this.gameWrapper = document.querySelector('.game-wrapper');
    this.startGameClassic = document.getElementById('start-classic');
    this.startGameHearthstone = document.getElementById('start-hearthstone');
    this.startGameGwent = document.getElementById('start-gwent');
    this.popupWin = document.getElementById('overlay-win');
    this.totalTime = document.querySelector('.total-time');
    this.timer = document.querySelector('.timer');
    this.timerAnimate = document.querySelector('.icon-spin6');
    this.matchedCard = document.getElementsByClassName('matched');
    // launch all interior events
    this.registerEvents();
  }

  // register all interior events
  registerEvents() {
    this.openPopups();
    this.closePopups();
    this.loadAudio();
    this.soundPause();
    // Load background music when game page opened
    this.music = this.loadAudio('wardruna.mp3');
    setTimeout(() => {
      this.music.play();
    }, 5000);
    this.startClassic();
    this.startHearthstone();
    this.startGwent();
    this.startNewGame();
  }

  // Create background audio function
  loadAudio(...args) {
    this.audio = document.createElement('audio');
    this.source = document.createElement('source');
    this.audio.setAttribute('loop', '');
    this.audio.volume = 0.6;
    for (let i = 0; i < args.length; i++) {
      this.source.src = `music/${args[i]}`;
      this.audio.appendChild(this.source);
    }
    const obj = {
      dom: false,
      state: 'stop',
      play() {
        this.dom.play();
        this.state = 'play';
      },
      pause() {
        this.dom.pause();
        this.state = 'pause';
      }
    };
    obj.dom = this.audio;
    return obj;
  }
  soundPause() {
    this.volume.addEventListener('click', () => {
      if (this.music.state === 'pause') {
        this.music.play();
        this.volume.firstElementChild.classList.remove('icon-mute');
        this.volume.firstElementChild.classList.add('icon-sound');
      } else {
        this.music.pause();
        this.volume.firstElementChild.classList.remove('icon-sound');
        this.volume.firstElementChild.classList.add('icon-mute');
      }
    });
  }
  openPopups() {
    // Event for open rules popup
    this.rules.addEventListener(
      'click',
      () => {
        this.popupScore.classList.remove('show');
        this.popupWin.classList.remove('show');
        this.popupRules.classList.toggle('show');
      },
      true
    );
    // Event for open score popup
    this.score.addEventListener(
      'click',
      () => {
        this.popupRules.classList.remove('show');
        this.popupWin.classList.remove('show');
        this.popupScore.classList.toggle('show');
      },
      true
    );
  }

  closePopups() {
    // Event for close rules popup
    this.closeRules.addEventListener('click', () => {
      this.popupRules.classList.remove('show');
    });
    // Event for close score popup
    this.closeScore.addEventListener('click', () => {
      this.popupScore.classList.remove('show');
    });
    this.closeWin.addEventListener(
      'click',
      () => {
        this.popupWin.classList.remove('show');
      },
      true
    );
  }

  startTimer() {
    const startTime = new Date().getTime();
    this.gameControls.classList.add('show');
    this.timerAnimate.classList.add('animate-spin');
    this.interval = setInterval(() => {
      let now = new Date().getTime();
      let distance = now - startTime;

      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let secs = Math.floor((distance % (1000 * 60)) / 1000);

      this.timer.innerHTML = `<span>${mins}</span> mins <span>${secs}</span> secs`;
    }, 1000);
  }
  resetTimer() {
    const secs = 0;
    const mins = 0;
    this.timer.innerHTML = `<span>${mins}</span> mins <span>${secs}</span> secs`;
    clearInterval(this.interval);
  }

  startClassic() {
    // Event for start Classic game
    this.startGameClassic.addEventListener('click', () => {
      this.diffClassic = document.querySelectorAll(
        'input[name=game-diff-classic]:checked'
      )[0].value;
      this.backImageClassic = document.querySelectorAll(
        'input[name=back-image-classic]:checked'
      )[0].value;
      this.chooseGame.classList.add('hidden');
      this.gameWrapper.classList.add('show');

      this.resetTimer();
      this.layout.createBoard(
        this.diffClassic,
        this.backImageClassic,
        this.imgPathClassic
      );
      this.startTimer('jan,01,1970,00:00:00');
      this.music.pause();
      this.music = this.loadAudio('warrior.mp3');
      setTimeout(() => {
        this.music.play();
      }, 5000);
    });
  }
  startHearthstone() {
    // Event for start Hearthstone game
    this.startGameHearthstone.addEventListener(
      'click',
      () => {
        this.diffHearthstone = document.querySelectorAll(
          'input[name=game-diff-hearthstone]:checked'
        )[0].value;
        this.backImageHearthstone = document.querySelectorAll(
          'input[name=back-image-hearthstone]:checked'
        )[0].value;
        this.chooseGame.classList.add('hidden');
        this.gameWrapper.classList.add('show');
        this.resetTimer();
        this.layout.createBoard(
          this.diffHearthstone,
          this.backImageHearthstone,
          this.imgPathHearth
        );
        this.startTimer('jan,01,1970,00:00:00');
        this.music.pause();
        this.music = this.loadAudio('hearthstone.mp3');
        setTimeout(() => {
          this.music.play();
        }, 5000);
      },
      true
    );
  }

  startGwent() {
    // Event for start Gwent game
    this.startGameGwent.addEventListener(
      'click',
      () => {
        this.diffGwent = document.querySelectorAll(
          'input[name=game-diff-gwent]:checked'
        )[0].value;
        this.backImageGwent = document.querySelectorAll(
          'input[name=back-image-gwent]:checked'
        )[0].value;
        this.chooseGame.classList.add('hidden');
        this.gameWrapper.classList.add('show');
        this.resetTimer();
        this.layout.createBoard(
          this.diffGwent,
          this.backImageGwent,
          this.imgPathGwent
        );
        this.startTimer('jan,01,1970,00:00:00');
        this.music.pause();
        this.music = null;
        this.music = this.loadAudio('gwent.mp3');
        setTimeout(() => {
          this.music.play();
        }, 5000);
      },
      true
    );
  }

  // Events for start new game buttons
  startNewGame() {
    this.home.addEventListener(
      'click',
      () => {
        this.popupWin.classList.remove('show');
        this.chooseGame.classList.remove('hidden');
        this.gameWrapper.classList.remove('show');
        for (let j = 0; j < this.form.length; j++) {
          this.form[j].reset();
        }
        this.volume.firstElementChild.classList.remove('icon-mute');
        this.volume.firstElementChild.classList.add('icon-sound');
        this.music.pause();
        this.music = this.loadAudio('wardruna.mp3');
        setTimeout(() => {
          this.music.play();
        }, 5000);
      },
      true
    );
    this.newGameButton.addEventListener(
      'click',
      () => {
        this.popupWin.classList.remove('show');
        this.chooseGame.classList.remove('hidden');
        this.gameWrapper.classList.remove('show');
        for (let j = 0; j < this.form.length; j++) {
          this.form[j].reset();
        }
        this.volume.firstElementChild.classList.remove('icon-mute');
        this.volume.firstElementChild.classList.add('icon-sound');
        this.music.pause();
        this.music = this.loadAudio('wardruna.mp3');
        setTimeout(() => {
          this.music.play();
        }, 5000);
      },
      true
    );
  }

  // -------------------------------------------------------------
}
