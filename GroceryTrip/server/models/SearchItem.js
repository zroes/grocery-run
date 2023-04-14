export class SearchItem {
  constructor(data) {
    this.name = data.description
    this.image = this.getImage(data.images)
    this.price = data.items[0].price ? data.items[0].price.regular : null
    this.size = data.items[0].size
    this.distance = data.distance || null
    this.store = data.store

  }
  getImage(images) {
    const imagesIndex = images.findIndex(i => i.perspective == 'front')
    const imgIndex = images[imagesIndex].sizes.findIndex(s => s.size == 'medium')
    return images[imagesIndex].sizes[imgIndex].url
  }
}