# use-delayed-function

> React hook to call a function with delay

[![NPM](https://img.shields.io/npm/v/use-delayed-function.svg)](https://www.npmjs.com/package/use-delayed-function) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


This hook provides a safe way to call a function with delay and it takes care of required cleanups. 

It doesn't have state and it won't cause extra rendering, so it is useful for sequential (or asynchronous) tasks where we want chain async functions on top of each others.


## Install

```bash
npm install --save use-delayed-function
```

General structure:
```jsx
  const [delayedFunction, cancelIt] = useDelayedFunction(
    originalFunction,
    delay,
    rejectOnCancel
  )
```

General usage format:
```
delayedFunction(para).then(result=>{setState(result)})
```


## Use cases

It can be used for [debouncing](https://css-tricks.com/debouncing-throttling-explained-examples/#article-header-id-0) which simply delays all consecuative attempts to call a function and finally the last attempt runs if it persists enough time.

It is also a handy tool for applying timing logics inside react components e.g. Showing a notification for few seconds.

It is also a good choice to handle initializing stage of a component. Combination of calling functions, async task or even changing states in sequence can be handled through promise chain provided behind the scene. This kind of behaviour is mostly desirable while initializing a component.

Activities of this hook doesn't change state of the component (unless the called function set an state) so it won't cause extra rendering. The stateful version of this hook is [`use-delayed-state`](https://github.com/makannew/use-delayed-state)


## How to use

To see deployed examples and source codes click [here](https://makannew.github.io/use-delayed-function/).

The most simplest use case is calling a function in future. In below example `changeContentLater` is a function that will call `changeContent` with delay.
Note that `delay` is a prop (it could be a local state as well) and it dynamically controls delay value.

```jsx
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

```


In debouncing example any debounced changes in textarea appears in another paragraph.

```jsx
  const [debounceChange] = useDelayedFunction(changeContent, 900)

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
      <textarea
        type='text'
        placeholder='Type something'
        onChange={handleChange}
      />
      <p ref={contentRef}></p>
    </div>
  )

```
As you can see in this line of code we can easily manage the timing logic that we want.
```jsx
    debounceChange(contentRef.current, e.target.value)
      .then(addStyleNow)
      .then(removeStyleLater)
```


## Details

```jsx
  const [delayedFunction, cancelIt] = useDelayedFunction(
    originalFunction,
    delay,
    rejectOnCancel
  )
```

- #### `delayedFunction` 
  - Is a function wrapped around the `originalFunction` and always returns a promise. 
  - It accepts and passes down arguments to the `originalFunction`.
  - It will resolve to return value of the `originalFunction`.
  - If "originalFunction" is an async function the best time for `setState` or DOM manipulation tasks is where it resolved.
    `delayedFunction(para).then(doSetState)`
  - Consecutive calls to this function will cancel previous unfinished calls. 
  
- #### `cancelIt(doNotReject)`
  - Is a function which will cancel any pending call to `originalFunction`.
  - If it was too late and `originalFunction` already fired it will break the chain and ignore its return value.
  - Calling this function will cause reject of `delayedFunction` if `rejectOnCancel===true` otherwise it leaves
    the promise in pending state to be removed by garbage collector.
  - If `doNotReject==true` it won't reject the promise even `rejectOnCancel===true`
  
- #### `originalFunction`
  - It can be a regular or async function
  - It can accept arguments and return values
  - `setState` or DOM manipulation tasks can be done inside this function with no worries if they are synchronous.
  - Any `setState` or DOM manipulation based on async processes is forbidden inside this function because it throw errors if
    component was unmounted. For this purpose use this format
    `delayedFunction(para).then(result=>{setState(result)})`
    
  
- #### `delay`
  - Is the delay before calling the `originalFunction`
  - Is in milliseconds
  - If not specified considered as 0
  - It could be a `useRef` object so delay value loaded from `refObject.current`
  - If it specified by a prop,state or ref, runtime value of delay will change if they change
  
- #### `rejectOnCancel`
  - Is an optional boolian parameter. If not specified considered as `false`
  - If `rejectOnCancel==true` the canceled calls will reject to 
    `{ message: 'Function call canceled', timestamp: Date.now() }`
  - It is useful for tracking canceled calls








## License

MIT © [makannew](https://github.com/makannew)
