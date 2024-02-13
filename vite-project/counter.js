export function setupCounter(element) {
  const setCounter = (count) => {
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter())
}
