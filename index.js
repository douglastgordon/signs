const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const VALUES = DIGITS.concat(LETTERS)

const makeFlaps = (values, signID) => (
  values.map((value, idx) => ({
    id: `flap-${idx}-${signID}`,
    top: value,
    bottom: values[(idx + 1) % values.length],
  }))
)


const setZs = ({ tops, bottoms }) => {
  const _setZs = flaps => {
    flaps.forEach(({ id }, idx) => {
      const flap = document.getElementById(id)
      flap.style.zIndex = idx === flaps.length - 1 ? idx + 1 : idx
    })
  }
  _setZs(tops)
  _setZs(bottoms)
}


const getFlapNode = ({ id }) => document.getElementById(id).children[0]

const rotateDown = flap => getFlapNode(flap).style.transform = "rotateX(180deg)"
const rotateUp = flap => getFlapNode(flap).style.transform = "rotateX(0deg)"

const nextFlap = FLAPDATA => {
  const { tops, bottoms } = FLAPDATA
  const currentUp = tops.pop()
  rotateDown(currentUp)
  const currentDown = bottoms.shift()
  rotateUp(currentDown)

  const flipDownFront = () => bottoms.push(currentUp)
  const flipUpBack = () => tops.unshift(currentDown)
  flipDownFront()
  flipUpBack()
  setTimeout(() => setZs(FLAPDATA), 1000)
}

const makeFlapNode = ({id, top, bottom}) => {

  const div = classNames => {
    const div = document.createElement("div")
    classNames.forEach(className => {
      div.classList.add(className)
    })
    return div
  }

  const span = innerHTML => {
    const span = document.createElement("span")
    span.innerHTML = innerHTML
    return span
  }

  const container = div(["flip-container"])
  container.id = id

  const flap = div(["flap", "animate"])
  const topNode = div(["top"])
  const bottomNode = div(["bottom"])

  topNode.appendChild(span(top))
  bottomNode.appendChild(span(bottom))
  container.appendChild(flap)
  flap.appendChild(topNode)
  flap.appendChild(bottomNode)
  return container
}


const randomNum = () => Math.floor(Math.random() * 10000000)


const createFlapData = values => {
  const id = randomNum()
  const flaps = makeFlaps(values, id)
  const totalValues = values.length
  return {
    id,
    flaps,
    values,
    totalValues,
    tops: flaps.slice(0, totalValues / 2).reverse(),
    bottoms: flaps.slice(flaps.length / 2),
  }
}

const createDOMFlap = ({ id, flaps, tops, bottoms }, parentId) => {
  const parentNode = document.getElementById(parentId)
  const flapsNode = document.createElement("article")
  flapsNode.classList.add("flaps")
  flapsNode.id = id
  parentNode.appendChild(flapsNode)

  flaps.forEach(flap => {
    const flapNode = makeFlapNode(flap)
    flapsNode.appendChild(flapNode)
  });

  setZs({tops, bottoms})

  bottoms.forEach(({ id }) => {
    const flapNode = document.getElementById(id).children[0]
    flapNode.style.transform = "rotateX(180deg)"
  })

}


const createSign = (values, id) => {
  const FLAPDATA = createFlapData(values)
  createDOMFlap(FLAPDATA, id)
  return {
    increment: () => nextFlap(FLAPDATA),
  }
}


const sign = createSign(DIGITS, "my-flap")
