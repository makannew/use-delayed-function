import React, { useState, useRef, useEffect } from 'react'
import useDelayedFunction from 'use-delayed-function'

const ReturnValueExample = () => {
  const divRef = useRef()
  const [clickCount, setClickCount] = useState(0)

  const [addWithDelay] = useDelayedFunction(getSecondValue, 0, true)

  function getSecondValue(prevMessage, message) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(prevMessage + message)
      }, 2000)
    })
  }

  useEffect(() => {
    addWithDelay('Hello', ' ')
      .then((result) => {
        divRef.current.innerHTML = result
        return addWithDelay(result, 'world')
      })
      .then((result) => {
        divRef.current.innerHTML = result
      })
      .catch((err) => console.log('rejected', err))
  }, [])

  return (
    <div>
      <div ref={divRef} className='container'>
        wait...
      </div>
      <button
        onClick={() => setClickCount(clickCount + 1)}
      >{`Click count: ${clickCount}`}</button>
    </div>
  )
}

export default ReturnValueExample
