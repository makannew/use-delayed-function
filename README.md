# use-delayed-function

> React hook to call a function with delay

[![NPM](https://img.shields.io/npm/v/use-delayed-function.svg)](https://www.npmjs.com/package/use-delayed-function) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


This hook provides a safe way to call a function with delay and it takes care of required cleanups. In addition, these delayed functions could chain together so it can be used to accomplish sequential (or asynchronous) tasks where we don't want to have sequential state changes.
```jsx
  const [delayedFunction, cancelIt] = useDelayedFunction(
    originalFunction,
    delay,
    rejectOnCancel
  )
```


## Use cases

It can be used for [debouncing](https://css-tricks.com/debouncing-throttling-explained-examples/#article-header-id-0) which simply delays all consecuative attempts to call a function and finally the last attempt runs if it persists for enough time.

It is also a handy tool for applying timing logics inside react components e.g. Showing a notification for few seconds.

Activities of this hook doesn't change state of the component (unless the called function set an state) so it won't cause extra rendering. The stateful version of this hook is [`use-delayed-state`](https://github.com/makannew/use-delayed-state)

## Install

```bash
npm install --save use-delayed-function
```

## Usage

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
As you can see in this line of code:
```jsx
    debounceChange(contentRef.current, e.target.value)
      .then(addStyleNow)
      .then(removeStyleLater)
```
First any changes debounced, then a css class added to show the changes and finally it will be removed after 1 second.

## Details

```jsx
  const [delayedFunction, cancelIt] = useDelayedFunction(
    originalFunction,
    delay,
    rejectOnCancel
  )
```

- ###`delayedFunction` 
Is a wrapper function which always returns a promise. It accepts and passes down arguments to the `originalFunction`.
It will resolve to `originalFunction` return value unless it canceled before.
If either new call to this function happened or canceled by `cancelIt` method it 





## License

MIT © [makannew](https://github.com/makannew)
