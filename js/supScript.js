const addZero = n => n < 10 ? '0' + n : n

const setAudioVolume = (event, playerName, player, changeIconFunction) => {
    const volumeProgress = document.querySelector(`.${playerName}-volume__progress`)
    if (event.target.classList.contains(`${playerName}-volume__progress-level`) || event.target.classList.contains(`${playerName}-volume__progress`)) {
        const volumeProgressHeight = volumeProgress.clientHeight
        const y = event.offsetY
        const volumeLevel = (y / volumeProgressHeight);
        player.volume = volumeLevel
    } else if (event.target.closest(`.${playerName}-volume`).matches(`.${playerName}-volume`)) {
        const volume = player.volume
        
        if (volume > 0 && volume <= 1) {
            player.volume = 0
            changeIconFunction(player.volume)
        } else {
            player.volume = 1
            changeIconFunction(player.volume)
        }
    }
}

export { addZero, setAudioVolume}