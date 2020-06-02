import React, { useState, useRef, useEffect } from 'react'

import useDelayedFunction from 'use-delayed-function'

const InitializingExample = ({ propA = 'prop A', propB = 'prop B' }) => {
  const divRef = useRef()

  const [state, setState] = useState(null)

  function initialize() {}
  useEffect(() => {
    setState(propA + ' ' + propB)
  }, [propA, propB])

  return (
    <div>
      <div ref={divRef} className='container initializing-example'>
        <p>{`Loading`}</p>
      </div>
      <div className='links'>
        <a href='https://github.com/makannew/use-delayed-function/blob/master/example/src/initializing-example.js'>
          Source code
        </a>
        <a href='https://github.com/makannew/use-delayed-function'>
          use-delayed-function
        </a>
      </div>
    </div>
  )
}

export default InitializingExample
