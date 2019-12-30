import turboImg from '@a/turbo.png'
import './index.scss'
var global = Global

var list = function() {
  let str = ''
  for(let item in global) {
    let obj = global[item]
    let name = item
    str = str + `
    <div>
      <h4>${name}</h4>
      <ul>
        ${li(obj)}
      </ul>
    </div>
    `
  }
  return str
}

var li = function(obj) {
  let str = ''
  for(let item in obj) {
    let key = item
    let value = obj[item]
    str = str + `
      <li><a href=${value}>${key}</a></li>
    `
  }
  return str
}

document.querySelector('#entry').innerHTML = `
  <div class="app">
    <div class="logo">
      <img src=${turboImg} alt="">
    </div>
    <h3>WELCOME TO YOUR TURBO APP</h3>
    ${list()}
  </div>
`