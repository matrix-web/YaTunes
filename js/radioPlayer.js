import { setAudioVolume } from './supScript.js'

export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio')
    const radioCoverImg = document.querySelector(".radio-cover__img")
    const radioHeaderBig = document.querySelector(".radio-header__big")
    const radioNavigation = document.querySelector(".radio-navigation")
    const radioItem = document.querySelectorAll(".radio-item")
    const radioStop = document.querySelector(".radio-stop")

    const radioVolume = document.querySelector('.radio-volume')
    const radioVolumeProgress = document.querySelector('.radio-volume__progress')
    const radioVolumeProgressLevel = document.querySelector('.radio-volume__progress-level')
    const radioVolumeIcon = document.querySelector('.radio-volume__icon i')

    const audio = new Audio()
    audio.type = 'audio/aac';

    radioStop.disabled = true

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play')
            radioStop.classList.add('fa-play')
            radioStop.classList.remove('fa-stop')
        } else {
            radio.classList.add('play')
            radioStop.classList.remove('fa-play')
            radioStop.classList.add('fa-stop')
        }
    }

    const changeVolumeIcon = (volume) => {
        if (volume > 0 && volume < 0.5) {
            radioVolumeIcon.classList.remove('fa-volume-up')
            radioVolumeIcon.classList.add('fa-volume-down')
        } else if (volume > 0.5) {
            radioVolumeIcon.classList.add('fa-volume-up')
            radioVolumeIcon.classList.remove('fa-volume-down')
        } else if (volume === 0) {
            radioVolumeIcon.classList.remove('fa-volume-up')
            radioVolumeIcon.classList.add('fa-volume-off')
        }
    }

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'))
        elem.classList.add('select')
    }

    radioNavigation.addEventListener('change', event => {
        const target = event.target
        const parent = target.closest('.radio-item')
        const title = parent.querySelector('.radio-name').textContent
        const urlImg = parent.querySelector('.radio-img').src

        console.log(target.dataset.radioStation)

        selectItem(parent)
        radioHeaderBig.textContent = title
        radioCoverImg.src = urlImg
        audio.src = target.dataset.radioStation
        audio.play()
        changeIconPlay()

        radioStop.disabled = false
    })

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play()
        } else {
            audio.pause()
        }

        changeIconPlay()
    })

    radioVolume.addEventListener('click', event => {
        setAudioVolume(event, 'radio', audio, changeVolumeIcon)
    })
    
    radioVolume.addEventListener('mouseover', (event) => {
        radioVolumeProgress.classList.add('volume__progress--active')
    })

    radioVolumeProgressLevel.addEventListener('mouseleave', (event) => {
        radioVolumeProgressLevel.closest('.radio-volume__progress').classList.remove('volume__progress--active')
    })

    audio.addEventListener('volumechange', event => {
        radioVolumeProgressLevel.style.height = `${audio.volume * 100}%`
        changeVolumeIcon(audio.volume)
        radioVolumeProgress.classList.remove('volume__progress--active')
    })

    return () => {
        if (!audio.paused) {
            audio.pause()
            changeIconPlay()
        }
    }
}