const DELAY = 300;

const debounce = (func) => {
  let timer; // for the setTimeout function and so it can be cleared
  return function (...args) {
    // the function returned from debounce
    const context = this;
    if (timer) clearTimeout(timer); //every time the user hits a key under 300 ms, the invocation for function handleChange reset the timer,  in other words, cancel the previous plans with handleChange
    timer = setTimeout(() => {
      // this sets the time out to run after the 300 ms
      timer = null;
      func.apply(context, args);
    }, DELAY);
  };
};

export default debounce;
