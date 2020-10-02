import MediaPlayer from '../MediaPlayer'

class AutoPause {
  private threshold: number
  private player: MediaPlayer
  constructor() {
    this.threshold = 0.25
    this.handleIntersection = this.handleIntersection.bind(this)
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
  }
  run(player) {
    this.player = player
    const observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.threshold,
    })
    observer.observe(player.media)

    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  }

  /**
   *
   * @param {*Objetos que se están observando} entries
   */
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    const entry = entries[0]
    const isVisible = entry.intersectionRatio > this.threshold
    isVisible ? this.player.play() : this.player.pause()
  }

  private handleVisibilityChange(): void {
    const isVisible = document.visibilityState === 'visible'
    isVisible ? this.player.play() : this.player.pause()
  }
}

export default AutoPause
