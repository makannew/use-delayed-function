import React, { useRef } from 'react'

import useDelayedFunction from 'use-delayed-function'

const CallbackExample = ({ delay = 4000 }) => {
  const divRef = useRef()

  const [callWithDelay] = useDelayedFunction(changeInnerHTML, delay)

  function changeInnerHTML(newInnerHTML) {
    divRef.current.innerHTML = newInnerHTML
  }

  callWithDelay('This is the new InnerHTML')

  return <div ref={divRef}>{`This innerHTML will change in ${delay}ms`}</div>
}

export default CallbackExample
