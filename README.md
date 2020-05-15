# use-delayed-function

> React hook to call function with delay

[![NPM](https://img.shields.io/npm/v/use-delayed-function.svg)](https://www.npmjs.com/package/use-delayed-function) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This hook provide a safe way to call a function with delay and it takes care of all required cleanup. 

## Install

```bash
npm install --save use-delayed-function
```

## Usage

```jsx
const App = ({ delay = 4000 }) => {
  const divRef = useRef()
  
  const [changeWithDelay] = useDelayedFunction(changeInnerHTML, delay)

  function changeInnerHTML(newInnerHTML) {
    divRef.current.innerHTML = newInnerHTML
  }

  changeWithDelay('This is the new InnerHTML')

  return <div ref={divRef}>{`This innerHTML will change in ${delay}ms`}</div>
}

export default App
```

## License

MIT © [makannew](https://github.com/makannew)
