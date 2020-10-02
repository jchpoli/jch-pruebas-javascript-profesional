import Ad from './IAd'

class Ads {
  private static instance
  private ads: Ad[]
  private indexAd: number

  private constructor(ads: Ad[]) {
    this.ads = ads
    this.indexAd = 0
  }

  static getInstance(ads: Ad[]) {
    if (!Ads.instance) {
      Ads.instance = new Ads(ads)
    }
    return Ads.instance
  }

  getAd() {
    if (this.ads.length >= this.indexAd) {
      this.indexAd = 0
    }
    const index = this.indexAd++
    return this.ads[index]
  }
}

export default Ads
