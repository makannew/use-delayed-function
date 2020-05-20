import React, { useState, useRef, useEffect } from 'react'

import useDelayedFunction from 'use-delayed-function'

const InitializingExample = () => {
  const divRef = useRef()

  function initialize() {}
  useEffect(() => {}, [])

  return (
    <div ref={divRef} className='container initializing-example'>
      <p>{`Loading`}</p>
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
