export class SearchItem {
    constructor(data) {
        this.name = data.description
        this.image = this.getImage(data.images)
        this.price = data.items[0].price.regular
        this.size = data.items[0].size
        this.distance = data.distance
        this.store = data.store

    }
    getImage(images) {
        const sizes = images.findIndex(i => i.perspective == 'front')
        const img = sizes.sizes.findIndex(s => s.size == 'medium')
        return img
    }
}