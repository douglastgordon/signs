const VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const makeFlaps = values => (
  values.map((value, idx) => ({
    id: `flap-${idx}`,
    top: value,
    bottom: values[(idx + 1) % values.length],
  }))
)

const FLAPS = makeFlaps(VALUES)
const TOPS = FLAPS.slice(0, FLAPS.length / 2).reverse()
const BOTTOMS = FLAPS.slice(FLAPS.length / 2)


const setZs = () => {
  const _setZs = flaps => {
    flaps.forEach(({ id }, idx) => {
      const flap = document.getElementById(id)
      flap.style.zIndex = idx === flaps.length - 1 ? idx + 1 : idx
    })
  }
  _setZs(TOPS)
  _setZs(BOTTOMS)
}


const getFlapNode = ({ id }) => document.getElementById(id).children[0]

const rotateDown = flap => getFlapNode(flap).style.transform = "rotateX(180deg)"
const rotateUp = flap => getFlapNode(flap).style.transform = "rotateX(0deg)"

const nextFlap = () => {
  const currentUp = TOPS.pop()
  rotateDown(currentUp)
  const currentDown = BOTTOMS.shift()
  rotateUp(currentDown)

  const flipDownFront = () => BOTTOMS.push(currentUp)
  const flipUpBack = () => TOPS.unshift(currentDown)
  flipDownFront()
  flipUpBack()
  setTimeout(setZs, 1000)
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


document.addEventListener("keydown", e => (e.key === "ArrowDown") && nextFlap())

{
  const flapsNode = document.getElementById("flaps")
  FLAPS.forEach(flapData => {
    const flap = makeFlapNode(flapData)
    flapsNode.appendChild(flap)
  });

  setZs()

  BOTTOMS.forEach(({ id }) => {
    const flapNode = document.getElementById(id).children[0]
    flapNode.style.transform = "rotateX(180deg)"
  })
}
