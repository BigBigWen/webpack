import {Text0} from './text-0'
import {Text1} from './text-1'
import {Text2} from './text-2'

const textFun = (...arg) => {
  console.log(...arg)
  let P = document.createElement('p')
  P.innerHTML = arg.join('')
  console.log(P)
  document.getElementById('root').appendChild(P)
}
textFun(Text0, Text1, Text2)
