const imgParent = document.getElementById('heroes-select')

const left = document.getElementById('left')
const other = document.getElementById('right')
const main = document.getElementById('main')
const reset = document.getElementById('reset')
const title = document.getElementById('title')

const initialImg = imgParent.cloneNode(true)
const initialLeft = left.cloneNode(true)
const initialOther = other.cloneNode(true)
const initialMain = main.cloneNode(true)
const initialReset = reset.cloneNode(true)
const intialTitle = title.cloneNode(true)

let leftIsPicking = true

let select = left

let bans = 0

let players = 0

let gameState = 'banning'

main.onclick = function () {
  if (gameState === 'start') {
    gameState = 'vs'
    main.innerHTML = gameState.toUpperCase()
    reset.style.display = 'none'
    imgParent.innerHTML = initialImg.innerHTML
    imgParent.parentNode.children[0].style.display = 'none'
    title.style.display = 'block'
  }
  return
}

const refresh = () => {
  imgParent.innerHTML = initialImg.innerHTML
  left.innerHTML = initialLeft.innerHTML
  other.innerHTML = initialOther.innerHTML
  main.innerHTML = initialMain.innerHTML
  reset.style = initialReset.style
  title.style = intialTitle.style

  leftIsPicking = true

  select = left

  bans = 0

  players = 0

  gameState = 'banning'

  run()
}

const selection = {
  banning: (img, banInInt, obj) => {
    select.children[0].children[banInInt].children[0].src = obj.img
    imgParent.removeChild(img)
    bans++
  },
  picking: (img, player, obj) => {
    const mainDiv = select.children[2].children[player].children[0]

    const imgDom = leftIsPicking ? mainDiv.children[0] : mainDiv.children[1]

    const detailDom = leftIsPicking ? mainDiv.children[1] : mainDiv.children[0]

    imgDom.src = obj.img

    detailDom.children[0].innerHTML = obj.name
    detailDom.children[1].innerHTML = obj.role

    imgParent.removeChild(img)
    players++
  },
}

const onClick = (img, object) => {
  if (gameState === 'vs') return

  let useInt = gameState === 'banning' ? bans : players
  const banInInt = parseInt(useInt / 2)

  selection[gameState]?.(img, banInInt, object)

  useInt = gameState === 'banning' ? bans : players

  const count = gameState === 'banning' ? 3 : 5

  if (parseInt(useInt / 2) === count)
    gameState = gameState === 'banning' ? 'picking' : 'start'

  main.innerHTML = gameState.toUpperCase()

  if (gameState === 'start') {
    main.style.cursor = 'pointer'
    left.children[1].innerHTML = ''
    other.children[1].innerHTML = ''
    return
  }

  leftIsPicking = !leftIsPicking
  select = leftIsPicking ? left : other

  left.children[1].innerHTML = leftIsPicking
    ? gameState === 'banning'
      ? 'Banning...'
      : gameState === 'picking'
      ? 'Picking...'
      : undefined
    : 'Please wait...'

  other.children[1].innerHTML = !leftIsPicking
    ? gameState === 'banning'
      ? 'Banning...'
      : gameState === 'picking'
      ? 'Picking...'
      : undefined
    : 'Please wait...'
  return
}

const run = () => {
  data.heroes.forEach((data) => {
    const img = document.createElement('img')
    img.className = 'hero add-margin'
    img.src = data.img
    img.style.cursor = 'pointer'
    img.onclick = function () {
      onClick(img, data)
    }
    imgParent.append(img)
  })
}

run()
