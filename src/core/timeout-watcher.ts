


async function timeoutWatcher(interval: number, iterations: number, f: () => Boolean, g: () => void ) {
  console.log("in timeoutWatcher()")
  await (async function theLoop (iterations: number) {
    console.log("in theLoop(), interval,interations", iterations,iterations);
    setTimeout( 
      async function () {
        if (--iterations) {      // If i > 0, keep going
          console.log("Iteration#", iterations)
          if ( f() ) {
            console.log("... f() returned true", iterations);
            return;
          }
          console.log("... f() returned false",iterations);
          theLoop(iterations);   // Call the loop again, and pass it the current value of i
        } else {
          console.log("TIMEOUT!",iterations);
          g();
        }
      }, interval 
    );

  })(iterations);

}

export default timeoutWatcher;