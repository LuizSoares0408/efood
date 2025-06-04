class Food {
  title: string
  category: string
  description: string
  image: string
  destaque: boolean
  nota: string
  id: number

  constructor(
    id: number,
    category: string,
    description: string,
    image: string,
    title: string,
    destaque: boolean,
    nota: string
  ) {
    this.id = id
    this.category = category
    this.description = description
    this.image = image
    this.title = title
    this.destaque = destaque
    this.nota = nota
  }
}

export default Food
