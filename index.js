const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
let currentDownZ = 0

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

const upperZIndex = idx => Math.floor(5000 / (idx + 1))

const makeSplitFlap = (idx, topValue, bottomValue) => {
  const container = div(["flip-container"])
  container.id = `flap-${idx}`
  container.style.zIndex = upperZIndex(idx)

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

const isLastCard = () => currentTopId === totalFlaps - 2

const currentUpFlap = () => document.getElementById(`flap-${currentTopId}`)
const currentDownIdx = () => (currentTopId - 1 + totalFlaps) % totalFlaps
const currentDownFlap = () => document.getElementById(`flap-${currentDownIdx()}`)

const getFlapByIndex = idx => document.getElementById(`flap-${(idx + totalFlaps) % totalFlaps}`)


const increaseTopId = () => currentTopId = (currentTopId + 1) % totalFlaps


const flipDown = idx => {
  const flap = getFlapByIndex(idx)
  flap.children[0].classList.add("animate")
  flap.children[0].style.transform = "rotateX(-180deg)"
}

const sink = idx => {
  const flap = getFlapByIndex(idx)
  flap.style.zIndex = currentDownZ + 1
  currentDownZ = currentDownZ + 1
}

const rise = idx => {
  const flap = getFlapByIndex(idx)
  flap.style.display = "none"
  flap.children[0].classList.remove("animate")
  flap.children[0].style.transform = "rotateX(0deg)"
  flap.style.zIndex = upperZIndex(idx)
  flap.style.display = "flex"
}





const flip = () => {
  const resetFlaps = () => {
    const currentUpFlap = getFlapByIndex(currentTopId)
    currentUpFlap.style.zIndex = 5000
    currentDownZ = 0
    values.forEach((value, idx) => {
      if (idx !== currentTopId && idx !== currentTopId - 1) {
        rise(idx)
      }
    })
  }

  if(isLastCard()) resetFlaps()
  flipDown(currentTopId)
  console.log(currentTopId)
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
