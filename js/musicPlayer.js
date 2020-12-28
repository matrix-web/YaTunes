import { addZero, setAudioVolume } from './supScript.js'

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio')
    const audioImg = document.querySelector('.audio-img')
    const audioHeader = document.querySelector('.audio-header')
    const audioPlayer = document.querySelector('.audio-player')
    const audioNavigation = document.querySelector('.audio-navigation')
    const audioButtonPlay = document.querySelector('.audio-button__play')
    const audioProgress = document.querySelector('.audio-progress')
    const audioProgressTiming = document.querySelector('.audio-progress__timing')
    const audioTimePassed = document.querySelector('.audio-time__passed')
    const audioTimeTotal = document.querySelector('.audio-time__total')
    const audioVolume = audio.querySelector('.audio-volume')
    const audioVolumeProgress = document.querySelector('.audio-volume__progress')
    const audioVolumeProgressLevel = document.querySelector('.audio-volume__progress-level')
    const audioVolumeIcon = document.querySelector('.audio-volume__icon i')

    const playList = ['hello', 'flow', 'speed']

    let trackIndex = 0

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused
        const track = playList[trackIndex]

        audioImg.src = `./audio/${track}.jpg`
        audioHeader.textContent = track.toUpperCase()
        audioPlayer.src = `./audio/${track}.mp3`

        if (isPlayed) {
            audioPlayer.pause()
        } else {
            audioPlayer.play()
        }
    }

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--
        } else {
            trackIndex = playList.length - 1
        }
        loadTrack()
    }

    const nextTrack = () => {
        if (trackIndex === playList.length - 1) {
            trackIndex = 0
        } else {
            trackIndex++
        }
        loadTrack()
    }

    const changeVolumeIcon = volume => {
        if (volume < 0.5) {
            audioVolumeIcon.classList.remove('fa-volume-up')
            audioVolumeIcon.classList.add('fa-volume-down')
        } else if (volume > 0.5) {
            audioVolumeIcon.classList.add('fa-volume-up')
            audioVolumeIcon.classList.remove('fa-volume-down')
        }
    }

    audioNavigation.addEventListener('click', event => {
        const target = event.target
        const track = playList[trackIndex]

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play')
            audioButtonPlay.classList.toggle('fa-play')
            audioButtonPlay.classList.toggle('fa-pause')

            if (audioPlayer.paused) {
                audioPlayer.play()
            } else {
                audioPlayer.pause()
            }
            audioHeader.textContent = track.toUpperCase()
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack()
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack()
        }
    })

    audioPlayer.addEventListener('ended', () => {
        nextTrack()
        audioPlayer.play()
    })

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration
        const currentTime = audioPlayer.currentTime
        const progress = (currentTime / duration) * 100

        const minutesPassed = Math.floor(currentTime / 60) || '0'
        const secondPassed = Math.floor(currentTime % 60) || '0'
        const minutesTotal = Math.floor(duration / 60) || '0'
        const secondsTotal = Math.floor(duration % 60) || '0'

        audioProgressTiming.style.width = `${progress}%`;

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondPassed)}`
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`
    })

    audioProgress.addEventListener('click', event => {
        const allWidth = audioProgress.clientWidth
        const x = event.offsetX
        const progress = (x / allWidth) * audioPlayer.duration
        audioPlayer.currentTime = progress
    })

    audioVolume.addEventListener('click', event => {
        setAudioVolume(event, 'audio', audioPlayer, changeVolumeIcon)
    })

    audioVolume.addEventListener('mouseover', (event) => {
        audioVolumeProgress.classList.add('volume__progress--active')
    })

    audioVolumeProgressLevel.addEventListener('mouseleave', (event) => {
        audioVolumeProgressLevel.closest('.audio-volume__progress').classList.remove('volume__progress--active')
    })

    audioPlayer.addEventListener('volumechange', event => {
        audioVolumeProgressLevel.style.height = `${audioPlayer.volume * 100}%`
        changeVolumeIcon(audioPlayer.volume)
        audioVolumeProgress.classList.remove('volume__progress--active')
    })

    return () => {
        if (!audioPlayer.paused) {
            audioPlayer.pause()
            audioPlayer.currentTime = 0
            audioButtonPlay.classList.toggle('fa-play')
            audioButtonPlay.classList.toggle('fa-pause')
        }
    }
}