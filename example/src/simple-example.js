import React, { useRef, useEffect } from 'react'

import useDelayedFunction from 'use-delayed-function'

const SimpleExample = ({ delay = 4000 }) => {
  const divRef = useRef()

  const [changeContentLater] = useDelayedFunction(changeContent, delay)

  function changeContent(target, content) {
    target.innerHTML = content
  }

  useEffect(() => {
    changeContentLater(divRef.current, 'This is the new content')
  }, [])

  return (
    <div>
      <div ref={divRef} className='description'>
        {`This content will change after ${delay}ms from component mounting`}
      </div>
    </div>
  )
}

export default SimpleExample
