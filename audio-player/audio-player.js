const audioPlayers = document.querySelectorAll('.audio-player');
audioPlayers.forEach((audioPlayer) => {
  if (audioPlayer) {
    const getTimeCodeFromNum = (num) => {
      let seconds = parseInt(num, 10);
      let minutes = parseInt(seconds / 60, 10);
      seconds -= minutes * 60;
      const hours = parseInt(minutes / 60, 10);
      minutes -= hours * 60;

      if (hours === 0) return `${minutes > 9 ? minutes : `0${minutes}`}:${String(seconds % 60).padStart(2, 0)}`;
      return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    };
    const audio = new Audio(audioPlayer.dataset.url);

    audio.addEventListener(
      'loadeddata',
      () => {
        audio.volume = 0.75;
      },
      false,
    );

    const timeline = audioPlayer.querySelector('.timeline');
    timeline.addEventListener('click', (e) => {
      const timelineWidth = window.getComputedStyle(timeline).width;
      const timeToSeek = parseInt((e.offsetX / parseInt(timelineWidth, 10)) * audio.duration, 10);
      audio.currentTime = (timeToSeek);
    }, false);

    setInterval(() => {
      const progressBar = audioPlayer.querySelector('.progress');
      progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
      const currentTime = audio.duration - audio.currentTime;
      if (!currentTime) {
        audioPlayer.querySelector('.time .current').textContent = '0:00';
      } else {
        audioPlayer.querySelector('.time .current').textContent = getTimeCodeFromNum(`${currentTime}`);
      }
    }, 500);

    const playBtn = audioPlayer.querySelector('.controls .toggle-play');
    playBtn.addEventListener(
      'click',
      () => {
        if (audio.paused) {
          playBtn.classList.remove('play');
          playBtn.classList.add('pause');
          audio.play();
        } else {
          playBtn.classList.remove('pause');
          playBtn.classList.add('play');
          audio.pause();
        }
      },
      false,
    );
  }
});