import React, { useState, useRef, useEffect } from 'react'

import useDelayedFunction from 'use-delayed-function'

const App = () => {
  const pRef = useRef()
  const [delay, setDelay] = useState(900)

  const changePContent = (content) => {
    pRef.current.innerHTML = content
    pRef.current.className = 'updating'
    updating()
  }

  const removeUpdateStyle = () => {
    pRef.current.className = ''
  }

  const [changeWithDelay] = useDelayedFunction(changePContent, delay)

  const [updating] = useDelayedFunction(removeUpdateStyle, 1000)

  function handleChange(e) {
    changeWithDelay(e.target.value)
  }

  return (
    <div>
      <div className='description'>
        <h3>Stateless debouncing</h3>
        <p>
          Result will be updated after debouncing delay. Try it by typing in
          textarea.
        </p>
      </div>

      <div className='container'>
        <div className='form-container'>
          <form>
            <h4>Real-time value</h4>

            <textarea
              type='text'
              placeholder='Type something'
              onChange={handleChange}
            />
            <label htmlFor='delay'>{`Debouncing delay ${delay}ms`}</label>
            <input
              type='range'
              id='delay'
              name='delay'
              value={delay}
              min={0}
              max={2000}
              step={20}
              onChange={(e) => {
                setDelay(e.target.value)
              }}
            />
          </form>
        </div>
        <div className='form-container'>
          <form>
            <h4>Debounced result</h4>
            <p ref={pRef}></p>
          </form>
        </div>
      </div>
      <div className='links'>
        <a href='https://github.com/makannew/use-delayed-function/blob/master/example/src/App.js'>
          Source code
        </a>
        <a href='https://github.com/makannew/use-delayed-function'>
          use-delayed-function
        </a>
      </div>
    </div>
  )
}

export default App
