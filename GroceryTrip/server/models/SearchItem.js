export class SearchItem {
  constructor(data) {
    this.name = data.description ? data.description : data.name
    this.store = data.store
    this.image = this.getImage(data.images)
    this.price = this.getprice(data)
    this.size = this.getSize(data)
    this.locationId = data.locationId
    this.query = data.query
    this.distance = data.distance

  }
  getSize(data) {
    if (data.items) {
      return data.items[0].size
    } else {
      data.size
    }
  }
  getprice(data) {
    if (data.items) {
      return data.items[0].price ? data.items[0].price.regular : null
    }
    else {
      return data.price
    }
  }
  getImage(images) {
    if (this.store == "FRED MEYER") {
      const imagesIndex = images.findIndex(i => i.perspective == 'front')
      const imgIndex = images[imagesIndex].sizes.findIndex(s => s.size == 'medium')
      return images[imagesIndex].sizes[imgIndex].url

    }
    else if (this.store == 'Albertsons') {
      return images
    }
  }
}