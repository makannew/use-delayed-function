# use-delayed-function

> React hook to call a function with delay

[![NPM](https://img.shields.io/npm/v/use-delayed-function.svg)](https://www.npmjs.com/package/use-delayed-function) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This hook provides a safe way to call a function with delay and it takes care of required cleanups. In addition, these delayed functions could chain together so it can be used to accomplish sequential (or asynchronous) tasks where we don't want to have sequential state changes.

## Use cases

It can be used for [debouncing](https://css-tricks.com/debouncing-throttling-explained-examples/#article-header-id-0) which simply delays all consecuative attempts to call a function and finally the last attempt runs if it persists for enough time.

It is also a handy tool for applying timing logics inside react components e.g. Showing a notification for few seconds.

Activities of this hook doesn't change state of the component (unless the called function set an state) so it won't cause extra rendering. The stateful version of this hook is [`use-delayed-state`](https://github.com/makannew/use-delayed-state)

## Install

```bash
npm install --save use-delayed-function
```

## Usage

In simple example a function called with delay to change content of a `div`.
```jsx
import React, { useRef } from 'react'

import useDelayedFunction from 'use-delayed-function'

const SimpleExample = ({ delay = 4000 }) => {
  const divRef = useRef()

  const [callWithDelay] = useDelayedFunction(changeInnerHTML, delay)

  function changeInnerHTML(newInnerHTML) {
    divRef.current.innerHTML = newInnerHTML
  }

  callWithDelay('This is the new InnerHTML')

  return (
    <div>
      <div ref={divRef}>
        {`This innerHTML will change in ${delay}ms`}
      </div>
    </div>
  )
}

export default SimpleExample

```


In debouncing example, when a change happened in textarea this line of code 
```jsx
debounceChange(e.target.value).then(addStyleNow).then(removeStyleLater)
```
debounce the change, then add style after change applied and finally remove the style after 1 second.
Note that `delay` could change dynamically through changing its state (it could be a prop as well).

```jsx
  const [delay, setDelay] = useState(defaultDelay)

  const [debounceChange] = useDelayedFunction(changeContent, delay)

  const [removeStyleLater] = useDelayedFunction(removeStyle, 1000)

  const [addStyleNow] = useDelayedFunction(addStyle)

  function changeContent(content) {
    contentRef.current.innerHTML = content
  }

  function removeStyle() {
    contentRef.current.className = ''
  }

  function addStyle() {
    contentRef.current.className = 'updating'
  }

  function handleChange(e) {
    debounceChange(e.target.value).then(addStyleNow).then(removeStyleLater)
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

## License

MIT © [makannew](https://github.com/makannew)
