const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover"); // Change this line
const progressPercentage = document.getElementById("progress-percentage"); 
//title 
const songs = ["BRIANNA - Lost in Istanbul", "Kygo & Selena Gomez - It Ain t Me", "Taylor Swift - Cruel Summer"];
const songImageMap = {
  "BRIANNA - Lost in Istanbul": "https://i.ytimg.com/vi/Y_h1C94ZpzA/maxresdefault.jpg",
  "Kygo & Selena Gomez - It Ain't Me":"img/download2.jpg",
  "Taylor Swift - Cruel Summer": "/img/download.jpg",
  // Add more songs and image URLs as needed
} 
//keep track of song
let songIndex = 1
// initially load song details into DOM

loadSong(songs[songIndex])
//update song details
function loadSong(song) {
  title.innerText = song
  audio.src = `music/${song}.mp3`
  cover.src = songImageMap[song]

}
//play Song
function playSong(song) {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')
  audio.play()
}
//pause Song
function pauseSong(song) {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')
  audio.pause()
}
//!prev song

function prevSong() {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  playSong()
}
//! next song

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// ? update progress bar  
function updateProgress(e) {
  const { duration, currentTime } = e.target;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  progressPercentage.textContent = `${Math.round(progressPercent)}%`;
}
//set progress bar

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  const newTime = (clickX / width) * duration;
  audio.currentTime = newTime;
}


//event listener
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains('play')

  if (isPlaying) {
    pauseSong()

  } else {
    playSong()
  }
})
//change song
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
//time/song update
audio.addEventListener('timeupdate', updateProgress)
// ? click on progress bar
progressContainer.addEventListener('click', setProgress)
// song ends
audio.addEventListener('ended', nextSong)
// !popup

