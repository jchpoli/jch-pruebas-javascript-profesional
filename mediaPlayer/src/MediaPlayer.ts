class MediaPlayer {
  media: HTMLMediaElement
  plugins: any
  container: HTMLElement

  constructor(config) {
    this.media = config.el
    this.plugins = config.plugins || []
    this.initPlayer()
    this.initPlugins()
  }
  private initPlayer() {
    this.container = document.createElement('div')
    this.container.style.position = 'relative'
    this.media.parentNode.insertBefore(this.container, this.media)
    this.container.appendChild(this.media)
  }
  private initPlugins(): void {
    this.plugins.forEach((plugin) => {
      plugin.run(this)
    })
  }
  play() {
    this.media.play()
  }
  pause() {
    this.media.pause()
  }
  tooglePlay() {
    this.media.paused ? this.play() : this.pause()
  }
  mute() {
    this.media.muted = true
  }
  unmute() {
    this.media.muted = false
  }
  toogleMute() {
    this.media.muted ? this.unmute() : this.mute()
  }
}

export default MediaPlayer
