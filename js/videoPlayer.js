import { addZero, setAudioVolume } from './supScript.js'

export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player')
    const videoButtonPlay = document.querySelector('.video-button__play')
    const videoButtonStop = document.querySelector('.video-button__stop')
    const videoProgress = document.querySelector('.video-progress')
    const videoTimePassed = document.querySelector('.video-time__passed')
    const videoTimeTotal = document.querySelector('.video-time__total')

    const videoVolume = document.querySelector('.video-volume')
    const videoVolumeProgress = document.querySelector('.video-volume__progress')
    const videoVolumeProgressLevel = document.querySelector('.video-volume__progress-level')
    const videoVolumeIcon = document.querySelector('.video-volume__icon i')
    
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause')
            videoButtonPlay.classList.add('fa-play')
        } else {
            videoButtonPlay.classList.add('fa-pause')
            videoButtonPlay.classList.remove('fa-play')
        }
    }

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play()
        } else {
            videoPlayer.pause()
        }
    }

    const stopPlay = () => {
        videoPlayer.pause()
        videoPlayer.currentTime = 0
    }

    const changeVolumeIcon = (volume) => {
        if (volume > 0 && volume < 0.5) {
            videoVolumeIcon.classList.remove('fa-volume-up')
            videoVolumeIcon.classList.add('fa-volume-down')
        } else if (volume > 0.5) {
            videoVolumeIcon.classList.add('fa-volume-up')
            videoVolumeIcon.classList.remove('fa-volume-down')
        } else if (volume === 0) {
            videoVolumeIcon.classList.remove('fa-volume-up')
            videoVolumeIcon.classList.add('fa-volume-off')
        }
    }

    videoPlayer.addEventListener('click', togglePlay)
    videoButtonPlay.addEventListener('click', togglePlay)

    videoPlayer.addEventListener('play', toggleIcon)
    videoPlayer.addEventListener('pause', toggleIcon)

    videoButtonStop.addEventListener('click', stopPlay)

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime
        const duration = videoPlayer.duration

        videoProgress.value = (currentTime / duration) * 100

        let minutePassed = Math.floor(currentTime / 60)
        let secondsPassed = Math.floor(currentTime % 60)

        let minuteTotal = Math.floor(duration / 60)
        let secondsTotal = Math.floor(duration % 60)

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`
    })

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration
        const value = videoProgress.value

        videoPlayer.currentTime = (value * duration) / 100
    })

    videoVolume.addEventListener('click', event => {
        setAudioVolume(event, 'video', videoPlayer, changeVolumeIcon)
    })
    
    videoVolume.addEventListener('mouseover', (event) => {
        videoVolumeProgress.classList.add('volume__progress--active')
    })

    videoVolumeProgressLevel.addEventListener('mouseleave', (event) => {
        videoVolumeProgressLevel.closest('.video-volume__progress').classList.remove('volume__progress--active')
    })

    videoPlayer.addEventListener('volumechange', event => {
        videoVolumeProgressLevel.style.height = `${videoPlayer.volume * 100}%`
        changeVolumeIcon(videoPlayer.volume)
        videoVolumeProgress.classList.remove('volume__progress--active')
    })

    return () => {
        if (!videoPlayer.paused) {
            videoPlayer.pause()
            videoPlayer.currentTime = 0
            toggleIcon()
        }
    }
}