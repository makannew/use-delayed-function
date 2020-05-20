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
    <div className='container simple-example'>
      <div ref={divRef} className='description'>
        {`This content will change after ${delay}ms from component mounting`}
      </div>
      <div className='links'>
        <a href='https://github.com/makannew/use-delayed-function/blob/master/example/src/simple-example.js'>
          Source code
        </a>
        <a href='https://github.com/makannew/use-delayed-function'>
          use-delayed-function
        </a>
      </div>
    </div>
  )
}

export default SimpleExample
