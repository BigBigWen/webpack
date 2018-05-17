import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import {Text0} from './text-0'
import {Text1} from './text-1'
import {Text2} from './text-2'

ReactDOM.render(
  <h1>{Text0}{Text1}{Text2}</h1>,
  document.getElementById('root')
)
