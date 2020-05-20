import React, { useState, useRef, useEffect } from 'react'

import useDelayedFunction from 'use-delayed-function'

const InitializingExample = () => {
  const divRef = useRef()

  function initialize() {}
  useEffect(() => {}, [])

  return <div ref={divRef}>{`Loading`}</div>
}

export default InitializingExample
