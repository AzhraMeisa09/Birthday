const correctPassword = "sayang"; 

// Login functionality
function attemptLogin() {
    const input = document.getElementById('loginInput');
    const error = document.getElementById('loginError');
    const password = input.value.toLowerCase().trim();
    
    if (password === correctPassword.toLowerCase()) {
        // Successful login
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainSite').style.display = 'block';
        startLoveCounter();
        
        // Initialize music player after login
        initializeMusicPlayer();
        
    } else {
        // Failed login
        error.textContent = 'Bukan itu panggilanku sayang... coba lagi ❤️';
        error.classList.add('show');
        input.value = '';
        input.style.borderColor = '#c07860';
        
        // Reset error after 3 seconds
        setTimeout(() => {
            error.classList.remove('show');
            input.style.borderColor = '#e0d5c7';
        }, 3000);
    }
}

// Allow Enter key to submit login
document.addEventListener('DOMContentLoaded', function() {
    const loginInput = document.getElementById('loginInput');
    if (loginInput) {
        loginInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                attemptLogin();
            }
        });
        
        // Focus on input when page loads
        loginInput.focus();
    }
});

// Navigation functionality
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section and activate nav button
    document.getElementById(sectionName).classList.add('active');
    document.getElementById('nav-' + sectionName).classList.add('active');
}

// Memory reveal functionality
function revealMemory(element) {
    const preview = element.querySelector('.preview');
    const fullText = element.querySelector('.full-text');
    
    if (preview && fullText) {
        if (preview.style.display !== 'none') {
            preview.style.display = 'none';
            fullText.style.display = 'block';
            
            // Add gentle highlight effect
            element.style.background = 'rgba(139, 117, 94, 0.05)';
            setTimeout(() => {
                element.style.background = 'rgba(255, 255, 255, 0.9)';
            }, 2000);
        }
    }
}

// Photo reveal functionality
function revealPhoto(element) {
    const placeholder = element.querySelector('.photo-placeholder');
    const reveal = element.querySelector('.photo-reveal');
    
    if (placeholder && reveal) {
        if (placeholder.style.display !== 'none') {
            placeholder.style.display = 'none';
            reveal.style.display = 'flex';
            
            // Add gentle scale effect
            element.style.transform = 'scale(1.02)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 300);
        }
    }
}

// Letter paragraph reveal functionality
function revealParagraph(element) {
    const preview = element.querySelector('.paragraph-preview');
    const full = element.querySelector('.paragraph-full');
    
    if (preview && full) {
        if (preview.style.display !== 'none') {
            preview.style.display = 'none';
            full.style.display = 'block';
            
            // Add gentle highlight effect
            element.style.background = 'rgba(139, 117, 94, 0.05)';
            setTimeout(() => {
                element.style.background = 'transparent';
            }, 2000);
        }
    }
}

// Love counter functionality
function startLoveCounter() {
    const startDate = new Date('2024-08-12'); // Ganti dengan tanggal mulai pacaran kalian
    
    function updateCounter() {
        const now = new Date();
        const diffTime = Math.abs(now - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const counter = document.getElementById('daysCounter');
        if (counter) {
            // Animate number change
            counter.style.transform = 'scale(1.1)';
            counter.textContent = diffDays;
            setTimeout(() => {
                counter.style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    // Update immediately and then every hour
    updateCounter();
    setInterval(updateCounter, 3600000); // Update every hour
}

// ===========================================
// MUSIC PLAYER FUNCTIONALITY
// ===========================================

// Music Player Configuration
const musicPlaylist = [
    {
        title: "Anything You Want",
        artist: "REALITY CLUB",
        src: "music/Anything You Want.mp3"
    },
    {
        title: "Birthday",
        artist: "Katy Perry", 
        src: "music/Birthday.mp3"
    },
    {
        title: "Super Trouper",
        artist: "ABBA",
        src: "music/Super Trouper.mp3"
    },
    {
        title: "22",
        artist: "Taylor Swift",
        src: "music/22.mp3"
    },
    {
        title: "Dancing Queen",
        artist: "ABBA",
        src: "music/dancingqueen.mp3"
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let currentAudio = null;

// Initialize Music Player
function initializeMusicPlayer() {
    console.log("Initializing music player...");
    
    // Create audio element
    currentAudio = new Audio();
    currentAudio.preload = 'metadata';
    currentAudio.loop = false;
    currentAudio.volume = 0.7;
    
    // Event listeners for audio
    currentAudio.addEventListener('loadedmetadata', updateDuration);
    currentAudio.addEventListener('timeupdate', updateProgress);
    currentAudio.addEventListener('ended', nextSong);
    currentAudio.addEventListener('error', handleAudioError);
    currentAudio.addEventListener('canplaythrough', function() {
        console.log("Audio can play through");
    });
    
    // Load first song
    loadSong(currentSongIndex);
    
    // Show music player
    const musicPlayer = document.getElementById('musicPlayer');
    if (musicPlayer) {
        musicPlayer.style.display = 'flex';
        console.log("Music player shown");
    } else {
        console.error("Music player element not found!");
    }
    
    // Create playlist
    createPlaylist();
    
    // Auto-play after first user interaction
    const autoPlayHandler = () => {
        playMusic();
        document.removeEventListener('click', autoPlayHandler);
    };
    document.addEventListener('click', autoPlayHandler, { once: true });
}

// Load song
function loadSong(index) {
    if (index < 0 || index >= musicPlaylist.length) return;
    
    const song = musicPlaylist[index];
    console.log("Loading song:", song.title);
    
    currentAudio.src = song.src;
    
    // Update UI
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    
    if (songTitle) songTitle.textContent = song.title;
    if (songArtist) songArtist.textContent = song.artist;
    
    // Reset progress
    const progressFill = document.getElementById('progressFill');
    if (progressFill) progressFill.style.width = '0%';
    
    // Update play button
    updatePlayButton();
}

// Toggle play/pause
function toggleMusic() {
    console.log("Toggle music, isPlaying:", isPlaying);
    
    if (!currentAudio) {
        console.error("No audio element!");
        return;
    }
    
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

// Play music
function playMusic() {
    if (!currentAudio) return;
    
    console.log("Playing music...");
    
    currentAudio.play().then(() => {
        isPlaying = true;
        updatePlayButton();
        console.log("Music started playing");
    }).catch(error => {
        console.log('Error playing audio:', error);
        handleAudioError();
    });
}

// Pause music
function pauseMusic() {
    if (!currentAudio) return;
    
    console.log("Pausing music...");
    currentAudio.pause();
    isPlaying = false;
    updatePlayButton();
}

// Update play button
function updatePlayButton() {
    const playIcon = document.getElementById('playIcon');
    if (playIcon) {
        playIcon.textContent = isPlaying ? '⏸️' : '▶️';
    }
}

// Next song
function nextSong() {
    console.log("Next song");
    currentSongIndex = (currentSongIndex + 1) % musicPlaylist.length;
    loadSong(currentSongIndex);
    
    if (isPlaying) {
        setTimeout(() => playMusic(), 100);
    }
    
    updatePlaylistUI();
}

// Previous song
function previousSong() {
    console.log("Previous song");
    currentSongIndex = currentSongIndex === 0 ? musicPlaylist.length - 1 : currentSongIndex - 1;
    loadSong(currentSongIndex);
    
    if (isPlaying) {
        setTimeout(() => playMusic(), 100);
    }
    
    updatePlaylistUI();
}

// Set volume
function setVolume(value) {
    if (currentAudio) {
        currentAudio.volume = value / 100;
        console.log("Volume set to:", value);
    }
}

// Seek music
function seekMusic(event) {
    if (!currentAudio || !currentAudio.duration) return;
    
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const seekTime = percent * currentAudio.duration;
    
    currentAudio.currentTime = seekTime;
}

// Update progress
function updateProgress() {
    if (!currentAudio || !currentAudio.duration) return;
    
    const percent = (currentAudio.currentTime / currentAudio.duration) * 100;
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = percent + '%';
    }
}

// Update duration (called when metadata is loaded)
function updateDuration() {
    if (currentAudio && currentAudio.duration) {
        console.log('Song duration:', formatTime(currentAudio.duration));
    }
}

// Format time helper
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

// Handle audio errors
function handleAudioError() {
    console.error('Audio error occurred');
    
    // Try next song if current one fails
    if (musicPlaylist.length > 1) {
        setTimeout(() => nextSong(), 1000);
    }
}

// Create playlist UI
function createPlaylist() {
    const playlistItems = document.getElementById('playlistItems');
    if (!playlistItems) return;
    
    playlistItems.innerHTML = '';
    
    musicPlaylist.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.className = 'song-item';
        if (index === currentSongIndex) {
            songItem.classList.add('active');
        }
        
        songItem.innerHTML = `
            <div class="song-title">${song.title}</div>
            <div class="song-artist">${song.artist}</div>
        `;
        
        songItem.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            updatePlaylistUI();
            
            if (isPlaying) {
                setTimeout(() => playMusic(), 100);
            }
        });
        
        playlistItems.appendChild(songItem);
    });
}

// Update playlist UI
function updatePlaylistUI() {
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Show playlist modal
function showPlaylist() {
    const playlistModal = document.getElementById('playlistModal');
    if (playlistModal) {
        playlistModal.style.display = 'flex';
    }
}

// Hide playlist modal
function hidePlaylist() {
    const playlistModal = document.getElementById('playlistModal');
    if (playlistModal) {
        playlistModal.style.display = 'none';
    }
}

// ===========================================
// ORIGINAL FUNCTIONALITY (PRESERVED)
// ===========================================

// Smooth scrolling for any internal links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add subtle entrance animation to main content
    setTimeout(() => {
        const mainSite = document.getElementById('mainSite');
        if (mainSite && mainSite.style.display !== 'none') {
            mainSite.style.opacity = '0';
            mainSite.style.display = 'block';
            mainSite.style.transition = 'opacity 1s ease-in-out';
            setTimeout(() => {
                mainSite.style.opacity = '1';
            }, 100);
        }
    }, 500);
});

// Prevent right-click to make it feel more special
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable F12 and other developer shortcuts
document.addEventListener('keydown', function(e) {
    // Music player keyboard shortcuts (only when logged in)
    const mainSite = document.getElementById('mainSite');
    if (mainSite && mainSite.style.display !== 'none' && currentAudio) {
        switch(e.code) {
            case 'Space':
                if (e.target.tagName !== 'INPUT') {
                    e.preventDefault();
                    toggleMusic();
                }
                break;
            case 'ArrowRight':
                if (e.ctrlKey) {
                    e.preventDefault();
                    nextSong();
                }
                break;
            case 'ArrowLeft':
                if (e.ctrlKey) {
                    e.preventDefault();
                    previousSong();
                }
                break;
        }
    }
    
    // Disable developer tools
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.ctrlKey && e.shiftKey && e.key === 'C') || 
        (e.ctrlKey && e.shiftKey && e.key === 'J') || 
        (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
    }
});

// Add gentle cursor effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.timeline-item, .photo-card, .letter-paragraph, .nav-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// Easter egg - subtle interaction for special moments
let clickCount = 0;
document.addEventListener('click', function(e) {
    // Don't trigger on buttons or interactive elements
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || 
        e.target.closest('.timeline-item') || e.target.closest('.photo-card') || 
        e.target.closest('.letter-paragraph')) {
        return;
    }
    
    clickCount++;
    if (clickCount === 7) { // Lucky number 7
        createSubtleHearts();
        clickCount = 0;
    }
});

// Subtle heart animation for easter egg
function createSubtleHearts() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '♡';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = Math.random() * window.innerHeight + 'px';
            heart.style.color = '#c07860';
            heart.style.fontSize = '20px';
            heart.style.zIndex = '999';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'gentleFade 2s ease-out forwards';
            heart.style.opacity = '0.7';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 200);
    }
}

// Close playlist when clicking outside
document.addEventListener('click', function(e) {
    const playlistModal = document.getElementById('playlistModal');
    const playlistContent = document.querySelector('.playlist-content');
    
    if (playlistModal && playlistModal.style.display === 'flex' && 
        playlistContent && !playlistContent.contains(e.target) && 
        !e.target.closest('.music-btn[onclick*="showPlaylist"]')) {
        hidePlaylist();
    }
});

// Progress indicator for revealed content
function updateProgress() {
    const totalMemories = document.querySelectorAll('.timeline-item').length;
    const revealedMemories = document.querySelectorAll('.timeline-item .full-text[style*="block"]').length;
    
    const totalPhotos = document.querySelectorAll('.photo-card').length;
    const revealedPhotos = document.querySelectorAll('.photo-card .photo-reveal[style*="flex"]').length;
    
    const totalParagraphs = document.querySelectorAll('.letter-paragraph').length;
    const revealedParagraphs = document.querySelectorAll('.letter-paragraph .paragraph-full[style*="block"]').length;
    
    const totalProgress = revealedMemories + revealedPhotos + revealedParagraphs;
    const maxProgress = totalMemories + totalPhotos + totalParagraphs;
    
    // You can use this to show completion status if needed
    console.log(`Progress: ${totalProgress}/${maxProgress} items revealed`);
}

console.log('🎵 Complete Script with Music Player Loaded! 🎵');