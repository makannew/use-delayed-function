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
      <div className='container simple-example'>
        <p
          ref={divRef}
        >{`This content will change ${delay}ms after mounting`}</p>
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
