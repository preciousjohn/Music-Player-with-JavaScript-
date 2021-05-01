const musicWrap = document.querySelector('.music-wrap')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

//song title

const songs = ['Energy', 'Jon', 'Sia']

// Keep track of songs
let songIndex = 2;

//initally load song
loadSong(songs[songIndex])

//update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

function playSong(){
    musicWrap.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
    
}
function pauseSong(){
    musicWrap.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

//previous and next button functions
function prevSong(){
    songIndex--

    if (songIndex < 0){
        songIndex = songs.length - 1  //this is a loop. When the prev is clicked for a song playing last it should go back to the first song
    }

    loadSong(songs[songIndex])

    playSong()
}
function nextSong(){
    songIndex++

    if (songIndex > songs.length - 1){
        songIndex = 0 //this is a loop. When the prev is clicked for a song playing last it should go back to the first song
    }

    loadSong(songs[songIndex])

    playSong()
}

//updateProgress function
function updateProgress (e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%` //width of the progress
}

//add progress control
function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX 
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

//play button
//addes event listeners for pause & play
playBtn.addEventListener('click', () => {
    const isPlaying = musicWrap.classList.contains('play')

    if (isPlaying){
        pauseSong()
    }
    else{
        playSong()
    }
})


//previous & next button
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

//add progress bar
audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

//keep the song playing even after it ends
audio.addEventListener('ended', nextSong)
