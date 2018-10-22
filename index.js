const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const totalFlaps = values.length
let currentTopId = 0

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

const makeSplitFlap = (idx, topValue, bottomValue) => {
  const container = div(["flip-container"])
  container.id = `flap-${idx}`
  container.style.zIndex = Math.floor(5000 / (idx + 1))

  const flap = div(["flap", "animate"])
  const top = div(["top"])
  const bottom = div(["bottom"])

  top.appendChild(span(topValue))
  bottom.appendChild(span(bottomValue))
  container.appendChild(flap)
  flap.appendChild(top)
  flap.appendChild(bottom)
  return container
}

const isLastCard = () => currentTopId === totalFlaps - 1

const currentUpFlap = () => document.getElementById(`flap-${currentTopId}`)
const currentDownIdx = () => (currentTopId - 1 + totalFlaps) % totalFlaps
const currentDownFlap = () => document.getElementById(`flap-${currentDownIdx()}`)

const getFlapByIndex = idx => document.getElementById(`flap-${(idx + totalFlaps) % totalFlaps}`)

const flipDown = idx => {
  const flap = getFlapByIndex(idx)
  flap.children[0].style.transform = "rotateX(-180deg)"
}

const increaseTopId = () => currentTopId = (currentTopId + 1) % totalFlaps


const sink = idx => {
  const flap = getFlapByIndex(idx)
  flap.style.zIndex = idx % (totalFlaps - 1)
}

const flip = () => {

  // const currentUpFlapId = `flap-${currentTopId}`
  // const currentDownFlap = `flap-${currentDownIdx}`

  // const resetFlaps = () => {
  //   const flapNodes = document.getElementsByClassName("flip-container")
  //
  //   const toReset = Array.from(flapNodes).filter(flapNode => (
  //     flapNode.id !== currentUpFlapId && flapNode !== currentDownFlapId
  //   ))
  //
  //   toReset.forEach(flapNode => {
  //     const index = flapNode.id.split("-")[1]
  //     console.log(flapNode)
  //     flapNode.children[0].style.transform = "rotateX(0deg)"
  //     flapNode.style.zIndex = Math.floor(5000 / (index + 1))
  //   })
  // }
  //
  // if(isLastCard()) resetFlaps()


  flipDown(currentTopId)
  sink(currentTopId - 1)
  increaseTopId()
}



document.addEventListener("keydown", e => (e.key === "ArrowDown") && flip())



{
  values.forEach((value, idx) => {
    const topValue = value
    const bottomValue = values[(idx + 1) % values.length]
    const flap = makeSplitFlap(idx, topValue, bottomValue)
    flaps.appendChild(flap)
  });

  const lastFlapIdx = values.length - 1
  flipDown(lastFlapIdx)
  sink(lastFlapIdx)
}
