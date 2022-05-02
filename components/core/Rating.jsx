import { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'

const Rating = ({ value }) => {

  const [stars, setStars] = useState(0)

  const range = (params) => {
    if (params < 1) {
      return 0
    }
    if (params >= 1 && params <= 1.7499) {
      return 1
    }

    if (params >= 1.75 && params <= 2.7499) {
      return 2
    }

    if (params >= 2.75 && params <= 3.7499) {
      return 3
    }

    if (params >= 3.75 && params <= 4.7499) {
      return 4
    }
    if (params >= 4.75 && params >= 5) {
      return 5
    }
    return 0
  }

  useEffect(() => {
    switch (range(value)) {
      case 0:
        setStars(0)
        break
      case 1:
        setStars(1)
        break

      case 2:
        setStars(2)
        break

      case 3:
        setStars(3)
        break
      case 4:
        setStars(4)
        break
      case 5:
        setStars(5)
        break
      default:
        setStars(0)
    }
  }, [value])
  const numArr = () => {
    const arr = []
    for (let i = 0; i < stars; i = +1) {
      arr.push(i)
    }
    return arr
  }

  return (
    <div>
      {numArr().map((i) => <AiFillStar key={i}/>)}
    </div>
  )
}
export default Rating