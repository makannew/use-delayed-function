/*
 * Example to show usage of use-delayed-function
 *
 * @link https://github.com/makannew/use-delayed-function
 * @file index.js
 * @author Makan Edrisi
 * @since 2020
 *
 */
import React, { useState } from 'react'
import SimpleExample from './simple-example'
import DebouncingExample from './debouncing-example'
import AsyncExample from './async-example'
import InitializingExample from './initializing-example'

const App = () => {
  const [example, setExample] = useState(1)

  return (
    <>
      {example === 1 ? <SimpleExample /> : null}
      {example === 2 ? <DebouncingExample /> : null}
      {example === 3 ? <AsyncExample /> : null}
      {example === 4 ? <InitializingExample /> : null}

      <div className='buttons'>
        <button onClick={() => setExample(1)}>
          Simple Example of 'use-delayed-function'
        </button>
        <button onClick={() => setExample(2)}>Debouncing Example</button>
        <button onClick={() => setExample(3)}>
          Async and side effect example
        </button>
        <button onClick={() => setExample(4)}>Initializing example</button>
      </div>
    </>
  )
}

export default App
