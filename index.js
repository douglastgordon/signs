let currentTopId = 0
let totalFlaps = 10

const div = classNames => {
  const div = document.createElement("div")
  classNames.forEach(className => {
    div.classList.add(className)
  })
  return div
}

const makeSplitFlap = () => {
  const container = div(["flip-container"])
  const flap = div(["flap"])
  const top = div(["top"])
  const bottom = div(["bottom"])
  container.appendChild(flap)
  flap.appendChild(top)
  flap.appendChild(bottom)
  return container
}


const flip = () => {
  // const myFlap = document.getElementsByClassName("flap")[0]
  // if (myFlap.classList.contains("up")) {
  //   myFlap.style.transform = ""
  //   myFlap.style.transform = "rotateX(-180deg)"
  //   myFlap.classList.remove("up")
  // } else {
  //   myFlap.style.transform = "rotateX(-360deg)"
  //   myFlap.classList.add("up")
  // }

  const currentUpFlap = document.getElementById(`flap-${currentTopId}`)

  currentUpFlap.children[0].style.transform = "rotateX(-180deg)"
  currentTopId = (currentTopId + 1) % totalFlaps
}

document.addEventListener("keydown", e => (e.key === "ArrowDown") && flip())

{
  for(let i = 0; i < totalFlaps; i += 1) {
    const flap = makeSplitFlap()
    flap.id = `flap-${i}`
    flaps.appendChild(flap)
  }
}
