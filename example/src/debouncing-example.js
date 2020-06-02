import React, { useState, useRef } from 'react'
import useDelayedFunction from 'use-delayed-function'

const DebouncingExample = ({ defaultDelay = 900 }) => {
  const contentRef = useRef()
  const [delay, setDelay] = useState(defaultDelay)

  const [debounceChange] = useDelayedFunction(changeContent, delay)

  const [removeStyleLater] = useDelayedFunction(removeStyle, 1000)

  const [addStyleNow] = useDelayedFunction(addStyle)

  function changeContent(target, content) {
    target.innerHTML = content
    return target
  }

  function addStyle(target) {
    target.className = 'updating'
    return target
  }

  function removeStyle(target) {
    target.className = ''
  }

  function handleChange(e) {
    debounceChange(contentRef.current, e.target.value)
      .then(addStyleNow)
      .then(removeStyleLater)
  }

  return (
    <div>
      <div className='description'>
        <h3>Stateless debouncing</h3>
        <p>
          Debounced result will be shown after typing. Try it by typing in
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
            <p ref={contentRef}></p>
          </form>
        </div>
      </div>
      <div className='links'>
        <a href='https://github.com/makannew/use-delayed-function/blob/master/example/src/debouncing-example.js'>
          Source code
        </a>
        <a href='https://github.com/makannew/use-delayed-function'>
          use-delayed-function
        </a>
      </div>
    </div>
  )
}

export default DebouncingExample
