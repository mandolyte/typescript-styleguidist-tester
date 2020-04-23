


async function timeoutWatcher(interval: number, iterations: number, f: () => Boolean, g: () => void ) {
  
  await (async function theLoop (iterations: number) {
    console.log("interval,interations", iterations,iterations);
    setTimeout( 
      async function () {
        if (--iterations) {      // If i > 0, keep going
          if ( f() ) {
            console.log("f() returned true");
            return;
          }
          console.log("f() returned false on iteration",iterations);
          theLoop(iterations);   // Call the loop again, and pass it the current value of i
        } else {
          console.log("timeout on iteration",iterations);
          g();
        }
      }, interval 
    );

  })(iterations);

}

export default timeoutWatcher;