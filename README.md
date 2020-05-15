# use-delayed-function

> React hook to call a function with delay

[![NPM](https://img.shields.io/npm/v/use-delayed-function.svg)](https://www.npmjs.com/package/use-delayed-function) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This hook provides a safe way to call a function with delay and it takes care of all required cleanup. 

## Use cases

It can be used for [debouncing](https://css-tricks.com/debouncing-throttling-explained-examples/#article-header-id-0) which simply delays all consecuative attempts to call a function and if the last call persist for enough time it runs.

It is also a handy tool for applying timing logics inside react components e.g. Showing a notification for few seconds.

Activities of this hook doesn't change state of the component(unless called function does) so it doesn't cause rendering. This is the main feature of this hook, the stateful version of this hook is [`use-delayed-state`](https://github.com/makannew/use-delayed-state)

## Install

```bash
npm install --save use-delayed-function
```

## Usage

```jsx
import React, { useRef} from 'react'

import useDelayedFunction from 'use-delayed-function'

const App = ({ delay = 4000 }) => {
  const divRef = useRef()

  const [callWithDelay] = useDelayedFunction(changeInnerHTML, delay)

  function changeInnerHTML(newInnerHTML) {
    divRef.current.innerHTML = newInnerHTML
  }

  callWithDelay('This is the new InnerHTML')

  return <div ref={divRef}>{`This innerHTML will change in ${delay}ms`}</div>
}

export default App
```

## License

MIT © [makannew](https://github.com/makannew)
