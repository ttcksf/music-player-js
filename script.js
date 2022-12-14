document.addEventListener("DOMContentLoaded", () => {
  const tracksList = [
    {
      audioSrc: "./tracks/friends.mp3",
      coverSrc: "./images/friends.jpeg",
      name: "friends",
      desc: "iri - friends",
      id: 0,
    },
    {
      audioSrc: "./tracks/ienai.mp3",
      coverSrc: "./images/ienai.jpeg",
      name: "言えない",
      desc: "iri - neon",
      id: 1,
    },
    {
      audioSrc: "./tracks/matenro.mp3",
      coverSrc: "./images/matenro.jpeg",
      name: "摩天楼",
      desc: "iri - neon",
      id: 2,
    },
    {
      audioSrc: "./tracks/sparkle.mp3",
      coverSrc: "./images/sparkle.jpeg",
      name: "Sparkle",
      desc: "iri - Sparkle",
      id: 3,
    },
    {
      audioSrc: "./tracks/starlights.mp3",
      coverSrc: "./images/starlights.jpeg",
      name: "STARLIGHTS",
      desc: "iri - STARLIGHTS",
      id: 4,
    },
    {
      audioSrc: "./tracks/uzu.mp3",
      coverSrc: "./images/uzu.jpeg",
      name: "渦",
      desc: "iri - neon",
      id: 5,
    },
  ];

  // variables
  const currentTrackName = document.querySelector("header h3");
  const currentTrackDesc = document.querySelector("header p");
  const currentTrackCover = document.querySelector("header img");
  const currentTrackAudio = document.querySelector("audio");
  const playPauseBtn = document.querySelector(".event-playPause");
  const muteUnmuteBtn = document.querySelector(".event-muteUnmute");
  const playNextBtn = document.querySelector(".event-next");
  const playPrevBtn = document.querySelector(".event-prev");
  const progress = document.querySelector(".slider-progress");
  const currentTrackTime = document.querySelector(".count-current");
  const finalTrackTime = document.querySelector(".count-final");

  // add tracks to my page
  (function addMyTrackList() {
    for (let track of tracksList) {
      let li = document.createElement("li");
      li.id = track.id;
      li.innerHTML = `<span class="track-number">0${track.id}</span>
      <img class="track-img" src=${track.coverSrc} alt="" />
      <div class="track-detail">
        <p class="track-detail_name">${track.name}</p>
        <p class="track-detail_desc"><small>${track.desc}</small></p>
      </div>`;

      document.querySelector("ul").appendChild(li);

      (function (id) {
        li.addEventListener("click", () => {
          playSelectedTrack(id);
        });
      })(track.id);
    }
  })();

  let trackId = 0;

  const loadTrack = (songId) => {
    const song = tracksList.find((track) => track.id === songId);

    const { audioSrc, coverSrc, name, desc } = song;

    currentTrackName.innerHTML = name;
    currentTrackDesc.innerHTML = desc;
    currentTrackAudio.src = audioSrc;
    currentTrackCover.src = coverSrc;
  };

  const playSelectedTrack = (songId) => {
    trackId = songId;
    loadTrack(songId);
    playTrack();
  };

  loadTrack(trackId);

  const playTrack = () => {
    playPauseBtn.classList.remove("fa-play");
    playPauseBtn.classList.add("fa-pause");

    currentTrackAudio.play();
  };

  const pauseTrack = () => {
    playPauseBtn.classList.remove("fa-pause");
    playPauseBtn.classList.add("fa-play");

    currentTrackAudio.pause();
  };

  const playPrevTrack = () => {
    trackId--;

    if (trackId < 0) {
      trackId = tracksList.length - 1;
    }

    loadTrack(trackId);
    playTrack();
  };

  const playNextTrack = () => {
    trackId++;

    if (trackId > tracksList.length - 1) {
      trackId = 0;
    }

    loadTrack(trackId);
    playTrack();
  };

  const muteUnmuteTrack = () => {
    if (currentTrackAudio.muted) {
      currentTrackAudio.muted = false;
      muteUnmuteBtn.classList.remove("fa-volume-mute");
      muteUnmuteBtn.classList.add("fa-volume-up");
    } else {
      currentTrackAudio.muted = true;
      muteUnmuteBtn.classList.remove("fa-volume-up");
      muteUnmuteBtn.classList.add("fa-volume-mute");
    }
  };

  const updateProgress = () => {
    const currentTime = currentTrackAudio.currentTime;
    const trackDuration = currentTrackAudio.duration;
    const percent = (currentTime / trackDuration) * 100;
    // timeline slider update
    progress.style.width = percent + "%";
    let curMins = Math.floor(currentTime / 60);
    let curSecs = Math.floor(currentTime - curMins * 60);
    let durMins = Math.floor(trackDuration / 60) || "--";
    let durSecs = Math.floor(trackDuration - durMins * 60) || "--";

    if (curMins < 10) {
      curMins = `0${curMins}`;
    }
    if (curSecs < 10) {
      curSecs = `0${curSecs}`;
    }
    if (durMins < 10) {
      durMins = `0${durMins}`;
    }
    if (durSecs < 10) {
      durSecs = `0${durSecs}`;
    }

    currentTrackTime.innerText = `${curMins}:${curSecs}`;
    finalTrackTime.innerText = `${durMins}:${durSecs}`;
  };

  // events
  playPauseBtn.addEventListener("click", () => {
    const currentPlaying = playPauseBtn.classList.contains("fa-pause");

    currentPlaying ? pauseTrack() : playTrack();
  });

  muteUnmuteBtn.addEventListener("click", () => {
    muteUnmuteTrack();
  });

  playNextBtn.addEventListener("click", () => {
    playNextTrack();
  });

  playPrevBtn.addEventListener("click", () => {
    playPrevTrack();
  });

  currentTrackAudio.addEventListener("timeupdate", () => {
    updateProgress();
  });
});
