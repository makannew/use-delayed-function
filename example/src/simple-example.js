import React, { useRef } from 'react'

import useDelayedFunction from 'use-delayed-function'

const SimpleExample = ({ delay = 4000 }) => {
  const divRef = useRef()

  const [callWithDelay] = useDelayedFunction(changeInnerHTML, delay)

  function changeInnerHTML(newInnerHTML) {
    divRef.current.innerHTML = newInnerHTML
  }

  callWithDelay('This is the new InnerHTML')

  const sourceCode = `import React, { useRef } from 'react'
import useDelayedFunction from 'use-delayed-function'

const SimpleExample = ({ delay = 4000 }) => {
const divRef = useRef()

const [callWithDelay] = useDelayedFunction(changeInnerHTML, delay)

function changeInnerHTML(newInnerHTML) {
  divRef.current.innerHTML = newInnerHTML
}

callWithDelay('This is the new InnerHTML')

return (
  <div
    ref={divRef}
    className='container'
  >{\`This innerHTML will change in ${delay}ms\`}</div>
)
}

export default SimpleExample`

  return (
    <div>
      <div ref={divRef} className='container'>
        {`This innerHTML will change in ${delay}ms`}
      </div>
      <code>{sourceCode}</code>
    </div>
  )
}

export default SimpleExample
