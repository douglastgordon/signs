const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const PUNCTUATION = [".", ",", ";", ";", "\"", "-"]
const SPACE = [" "]
const ALL = [DIGITS, LETTERS, PUNCTUATION, SPACE].flat()

const ALPHANUMERIC = DIGITS.concat(LETTERS)

const makeFlaps = (values, signID) => (
  values.map((value, idx) => ({
    id: `flap-${idx}-${signID}`,
    top: value,
    bottom: values[(idx + 1) % values.length],
  }))
)

const setZs = ({ tops, bottoms }) => {
  const nextUpNode = getFlapContainerNode(tops[tops.length - 2])
  nextUpNode.style.zIndex = 50
  const currentUpNode = getFlapContainerNode(tops[tops.length - 1])
  currentUpNode.style.zIndex = 100
  const previousDownNode = getFlapContainerNode(bottoms[bottoms.length - 2])
  previousDownNode.style.zIndex = 0
  const currentDownNode = getFlapContainerNode(bottoms[bottoms.length - 1])
  currentDownNode.style.zIndex = 50
}


const getFlapNode = data => getFlapContainerNode(data).children[0]
const getFlapContainerNode = ({ id }) => document.getElementById(id)

const rotateDown = flap => getFlapNode(flap).style.transform = "rotateX(180deg)"
const rotateUp = flap => getFlapNode(flap).style.transform = "rotateX(0deg)"

const nextFlap = FLAPDATA => {
  const { tops, bottoms } = FLAPDATA
  setZs(FLAPDATA)

  const currentUp = tops.pop()
  console.log(currentUp)
  rotateDown(currentUp)
  const currentDown = bottoms.shift()
  rotateUp(currentDown)

  const flipDownFront = () => bottoms.push(currentUp)
  const flipUpBack = () => tops.unshift(currentDown)
  flipDownFront()
  flipUpBack()

  // setTimeout(() => setZs(FLAPDATA), 600)
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
  flap.style.zIndex = 0
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

const flipTo = (FLAPDATA, value) => {
  const { values, tops } = FLAPDATA
    const interval = setInterval(() => {
      nextFlap(FLAPDATA)
      if (tops[tops.length - 1].top === value) {
        clearInterval(interval)
      }
    }, 600)
  return true
}

const createSign = (id, values=ALL) => {
  const FLAPDATA = createFlapData(values)
  createDOMFlap(FLAPDATA, id)
  return {
    increment: () => nextFlap(FLAPDATA),
    flipTo: (value) => flipTo(FLAPDATA, value),
    FLAPDATA,
  }
}


const sign = createSign("my-flap", DIGITS)
