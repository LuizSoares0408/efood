class Products {
  title: string
  description: string
  image: string
  id: number

  constructor(id: number, description: string, image: string, title: string) {
    this.id = id
    this.description = description
    this.image = image
    this.title = title
  }
}

export default Products
