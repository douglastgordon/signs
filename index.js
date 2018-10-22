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

const makeSplitFlap = (i, topValue, bottomValue) => {
  const container = div(["flip-container"])
  const flap = div(["flap", "animate"])
  const top = div(["top"])
  const bottom = div(["bottom"])

  const topContent = document.createElement("span")
  topContent.innerHTML = topValue
  top.appendChild(topContent)

  const bottomContent = document.createElement("span")
  bottomContent.innerHTML = bottomValue
  bottom.appendChild(bottomContent)

  container.style.zIndex = Math.floor(5000 / (i + 1))

  container.appendChild(flap)
  flap.appendChild(top)
  flap.appendChild(bottom)
  return container
}

const isLastCard = () => currentTopId === totalFlaps - 1


const flip = () => {

  const currentUpFlapId = `flap-${currentTopId}`
  const currentDownFlapId = `flap-${(currentTopId - 1 + totalFlaps) % totalFlaps}`

  const resetFlaps = () => {
    const flapNodes = document.getElementsByClassName("flip-container")

    const toReset = Array.from(flapNodes).filter(flapNode => (
      flapNode.id !== currentUpFlapId && flapNode !== currentDownFlapId
    ))


    console.log(toReset)

    toReset.forEach(flapNode => {
      const index = flapNode.id.split("-")[1]
      console.log(flapNode)
      flapNode.children[0].style.transform = "rotateX(0deg)"
      flapNode.style.zIndex = Math.floor(5000 / (index + 1))
    })
  }

  if(isLastCard()) resetFlaps()

  const currentUpFlap = document.getElementById(currentUpFlapId)
  const currentDownFlap = document.getElementById(currentDownFlapId)
  currentUpFlap.children[0].style.transform = "rotateX(-180deg)"
  currentDownFlap.style.zIndex = 0
  // currentDownFlap

  currentTopId = (currentTopId + 1) % totalFlaps
}

document.addEventListener("keydown", e => (e.key === "ArrowDown") && flip())



{
  values.forEach((value, idx) => {
    const topValue = value
    const bottomValue = values[(idx + 1) % values.length]
    const flap = makeSplitFlap(idx, topValue, bottomValue)
    flap.id = `flap-${idx}`
    flaps.appendChild(flap)
  });
}
