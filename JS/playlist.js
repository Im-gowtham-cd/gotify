document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.querySelector('.custom-audio-player');
    const audio = document.getElementById('audio-element');
    const playBtn = audioPlayer.querySelector('.play-pause-btn');
    const prevBtn = audioPlayer.querySelector('.prev-btn');
    const nextBtn = audioPlayer.querySelector('.next-btn');
    const shuffleBtn = audioPlayer.querySelector('.shuffle-btn');
    const repeatBtn = audioPlayer.querySelector('.repeat-btn');
    const progressBar = audioPlayer.querySelector('.progress-bar');
    const progress = audioPlayer.querySelector('.progress');
    const currentTimeSpan = audioPlayer.querySelector('.time-display.current');
    const durationSpan = audioPlayer.querySelector('.time-display.duration');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeBtn = document.querySelector('.volume-btn');
    
    const songs = [
        {
            title: "Melina do job",
            artist: "GoTamu",
            path: "../AUDIO/Melina do job.mp3.mp3",
            cover: "../IMAGE/G3.jpg"
        },
        {
            title: "Chamber Of Reflection",
            artist: "Mac DeMarco",
            path: "../AUDIO/Chamber Of Reflection.mp3",
            cover: "../IMAGE/COR.jpg"
        },
        {
            title: "Kannungala Chellangala",
            artist: "Yuvan Shankar Raja",
            path: "../AUDIO/Kannungala Chellangala - Video Song _ Nenjam Marappathillai _ Yuvan Shankar Raja _ Selvaraghavan.mp3",
            cover: "../IMAGE/KC.jpg"
        },
        {
            title: "Kamisama Hajimemashita",
            artist: "Shuichi Mabe",
            path: "../AUDIO/Kamisama Hajimemashita.mp3",
            cover: "../IMAGE/KH.jpg"
        },
        {
            title: "Ennoda Laila",
            artist: " Ramana Gogula",
            path: "../AUDIO/Ennoda Laila.mp3",
            cover: "../IMAGE/EL.jpg"
        },
        {
            title: "I walk this earth all by myself",
            artist: "EKKSTACY",
            path: "../AUDIO/EKKSTACY - i walk this earth all by myself [Official Lyric Video].mp3",
            cover: "../IMAGE/IWTE.jpg"
        },
        {
            title: "Andha Kanna Paathaakaa",
            artist: " Anirudh Ravichander",
            path: "../AUDIO/Master - Andha Kanna Paathaakaa Lyric _ Thalapathy Vijay _ Anirudh Ravichander _ Lokesh Kanagaraj.mp3",
            cover: "../IMAGE/AKP.jpg"
        },
        {
            title: "Karuthavanlaam Galeejaam",
            artist: " Anirudh Ravichander",
            path: "../AUDIO/Velaikkaran - Karuthavanlaam Galeejaam Video _ Sivakarthikeyan, Nayanthara _ Anirudh.mp3",
            cover: "../IMAGE/KG.jpg"
        },
        {
            title: "What is Love",
            artist: "Twice",
            path: "../AUDIO/TWICE What is Love MV.mp3",
            cover: "../IMAGE/KG.jpg"
        },
        {
            title: "Super Tuna",
            artist: "Jin",
            path: "../AUDIO/_ _Jin_ ___ __ _Super Tuna__ Special Video.mp3",
            cover: "../IMAGE/KG.jpg"
        },
        {
            title: "Fake Love",
            artist: "MDP",
            path: "../AUDIO/BTS _______ FAKE LOVE Orchestral Cover.mp3",
            cover: "../IMAGE/KG.jpg"
        },
        {
            title: "GO GO",
            artist: "BTS",
            path: "../AUDIO/Bulletproof Boy Scouts _BTS_ _ Go _Go Go_ than worrying _BTS COUNTDOWN_171012.mp3",
            cover: "../IMAGE/KG.jpg"
        }
    ];
    
    let currentSongIndex = 0;
    let isShuffleOn = false;
    let totalDuration = 0; // Track total duration of all songs

    function loadSong(songIndex) {
        const song = songs[songIndex];
        audio.src = song.path;

        if (document.querySelector('.now-playing-title')) {
            document.querySelector('.now-playing-title').textContent = song.title;
            document.querySelector('.now-playing-artist').textContent = song.artist;
            document.querySelector('.now-playing-cover').src = song.cover;
        }

        const songElements = document.querySelectorAll('.song-item');
        songElements.forEach((element, index) => {
            if (index === songIndex) {
                element.classList.add('active-song');
            } else {
                element.classList.remove('active-song');
            }
        });
        
        audio.load();
    }

    function generateSongList() {
        const songListContainer = document.querySelector('.song-list');
        if (!songListContainer) return;
        
        songListContainer.innerHTML = '';
        totalDuration = 0; // Reset total duration
        
        songs.forEach((song, index) => {
            const songElement = document.createElement('div');
            songElement.classList.add('song-item');
            songElement.innerHTML = `
                <div class="song-number">${index + 1}</div>
                <div class="song-info">
                    <img src="${song.cover}" alt="${song.title}" class="song-cover">
                    <div class="song-details">
                        <div class="song-title">${song.title}</div>
                        <div class="song-artist">${song.artist}</div>
                    </div>
                </div>
                <div class="song-duration" data-index="${index}">--:--</div>
            `;
            
            songElement.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                audio.play();
                playBtn.innerHTML = "<i class='bx bx-pause' style='color: #000;'></i>";
            });
            
            songListContainer.appendChild(songElement);
            
            loadSongDuration(song.path, index);
        });
        
        // Update total songs count
        const totalSongsElement = document.getElementById('totalSongs');
        if (totalSongsElement) {
            totalSongsElement.textContent = songs.length;
        }
    }

    function loadSongDuration(songPath, index) {
        const tempAudio = new Audio(songPath);
        
        tempAudio.addEventListener('loadedmetadata', () => {
            const duration = tempAudio.duration;
            const durationElement = document.querySelector(`.song-duration[data-index="${index}"]`);
            
            if (durationElement) {
                durationElement.textContent = formatTime(duration);
            }
            
            // Add to total duration
            totalDuration += duration;
            
            // Update total duration display after each song is loaded
            updateTotalDuration();
            
            tempAudio.remove();
        });
        
        tempAudio.addEventListener('error', () => {
            const durationElement = document.querySelector(`.song-duration[data-index="${index}"]`);
            
            if (durationElement) {
                durationElement.textContent = "Error";
            }
            
            tempAudio.remove();
        });
    }
    
    // Function to update the total duration display
    function updateTotalDuration() {
        const totalDurationElement = document.getElementById('totalDuration');
        if (totalDurationElement) {
            totalDurationElement.textContent = formatTime(totalDuration);
        }
    }

    generateSongList();
    loadSong(currentSongIndex);

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = "<i class='bx bx-pause'></i>";
        } else {
            audio.pause();
            playBtn.innerHTML = "<i class='bx bx-play'></i>";
        }
    });

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        currentTimeSpan.textContent = formatTime(currentTime);
        if (!isNaN(duration)) {
            durationSpan.textContent = formatTime(duration);
        }
    });

    progressBar.addEventListener('click', (e) => {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });

    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            audio.volume = volume;
            
            if (volume === 0) {
                volumeBtn.innerHTML = "<i class='bx bx-volume-mute'></i>";
            } else if (volume < 0.5) {
                volumeBtn.innerHTML = "<i class='bx bx-volume-low'></i>";
            } else {
                volumeBtn.innerHTML = "<i class='bx bx-volume-full'></i>";
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        if (isShuffleOn) {
            playRandomSong();
        } else {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(currentSongIndex);
            audio.play();
            playBtn.innerHTML = "<i class='bx bx-pause'></i>";
        }
    });

    nextBtn.addEventListener('click', () => {
        if (isShuffleOn) {
            playRandomSong();
        } else {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong(currentSongIndex);
            audio.play();
            playBtn.innerHTML = "<i class='bx bx-pause'></i>";
        }
    });

    function playRandomSong() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === currentSongIndex && songs.length > 1);
        
        currentSongIndex = randomIndex;
        loadSong(currentSongIndex);
        audio.play();
        playBtn.innerHTML = "<i class='bx bx-pause'></i>";
    }

    audio.addEventListener('ended', () => {
        if (repeatBtn.classList.contains('active')) {
            audio.currentTime = 0;
            audio.play();
        } else if (isShuffleOn) {
            playRandomSong();
        } else {
            nextBtn.click();
        }
    });

    shuffleBtn.addEventListener('click', () => {
        isShuffleOn = !isShuffleOn;
        shuffleBtn.classList.toggle('active');
        
        if (isShuffleOn) {
            shuffleBtn.style.color = '#1ed760';
        } else {
            shuffleBtn.style.color = '#b3b3b3';
        }
    });

    repeatBtn.addEventListener('click', () => {
        repeatBtn.classList.toggle('active');
        
        if (repeatBtn.classList.contains('active')) {
            repeatBtn.style.color = '#1ed760';
            audio.loop = true;
        } else {
            repeatBtn.style.color = '#b3b3b3';
            audio.loop = false;
        }
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
});