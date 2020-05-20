import React, { useState, useRef } from 'react'
import useDelayedFunction from 'use-delayed-function'

const AsyncExample = () => {
  const divRef = useRef()
  const [startButton, setStartButton] = useState(true)
  const [errState, setErrState] = useState(false)

  const [addContent, cancelAddContent] = useDelayedFunction(
    addContentAsync,
    0,
    true
  )

  function addContentAsync(content1, content2) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(content1 + content2)
      }, 2000)
    })
  }

  function showContent(target, content) {
    target.innerHTML = content
  }

  function handleClick() {
    if (startButton) {
      setStartButton(false)
      setErrState(false)
      showContent(divRef.current, 'adding content will be started soon')
      addContent('Hello', ' ')
        .then((result) => {
          showContent(divRef.current, result)
          return addContent(result, 'world')
        })
        .then((result) => {
          showContent(divRef.current, result)
          setStartButton(true)
        })
        .catch((err) => {
          setErrState(err)
        })
    } else {
      cancelAddContent()
      setStartButton(true)
      showContent(divRef.current, 'click to start async adding of content')
    }
  }

  return (
    <div>
      <div className='container async-example'>
        <p ref={divRef}>click to start async adding of content</p>
        <button onClick={handleClick} className={startButton ? '' : 'red'}>
          {startButton ? 'Start' : 'Stop'}
        </button>
        <p className='error'>
          {errState
            ? `${errState.message} @timestamp:${errState.timestamp}`
            : null}
        </p>
      </div>
    </div>
  )
}

export default AsyncExample
