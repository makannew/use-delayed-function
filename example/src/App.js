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
import ReturnValueExample from './return-value-example'
import CallbackExample from './callback-example'

const App = () => {
  const [example, setExample] = useState(1)

  return (
    <>
      {example === 1 ? <SimpleExample /> : null}
      {example === 2 ? <DebouncingExample /> : null}
      {example === 3 ? <ReturnValueExample /> : null}
      {example === 4 ? <CallbackExample /> : null}

      <div className='buttons'>
        <button onClick={() => setExample(1)}>
          Simple Example of 'use-delayed-function'
        </button>
        <button onClick={() => setExample(2)}>Debouncing Example</button>
        <button onClick={() => setExample(3)}>
          Function return value example
        </button>
        <button onClick={() => setExample(4)}>Function callback example</button>
      </div>
    </>
  )
}

export default App
