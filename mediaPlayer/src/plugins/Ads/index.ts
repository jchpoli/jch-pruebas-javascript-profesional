import MediaPlayer from '../../MediaPlayer'
import Ad from './IAd'
import Ads from './Ads'

class AdsPlugin {
  private ads: Ads
  private player: MediaPlayer
  private media: HTMLMediaElement
  private currentAd: Ad
  private adsContainer: HTMLElement

  constructor(listAds: Ad[]) {
    this.ads = Ads.getInstance(listAds)
    
    this.adsContainer = document.createElement('div')
    this.hanfleTimeUpdate = this.hanfleTimeUpdate.bind(this)
  }

  run(player: MediaPlayer) {
    this.player = player
    this.player.container.appendChild(this.adsContainer)
    this.media = this.player.media
    this.media.addEventListener('timeupdate', this.hanfleTimeUpdate)
  }

  private hanfleTimeUpdate(): void {
    const currenTime = Math.floor(this.media.currentTime)
    if (currenTime % 30 === 0) {
      this.renderAd()
    }
  }

  private renderAd(): void {
    if (this.currentAd) return
    const ad = this.ads.getAd()
    this.currentAd = ad
    this.adsContainer.innerHTML = `
      <div class="ads">
        <a class="ads__link" href="${this.currentAd.url}" target="_blank">
          <img class="ads__img" src="${this.currentAd.imageUrl}" />
          <divclass="ads__info">
            <h5 class="ads__title">${this.currentAd.title}</h5>
            <p class="ads__body">${this.currentAd.body}</p>
          </div>
        </a>
      </div
    `
    setTimeout(() => {
      this.currentAd = null
      this.adsContainer.innerHTML = null
    }, 10000)
  }
}

export default AdsPlugin
