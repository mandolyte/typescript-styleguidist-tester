import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import timeoutWatcher from '../../core/timeout-watcher';

type TimeoutWatcherProps = {
  interval: number,
  iterations: number,
  watchFunction: () => Boolean,
  timeoutFunction: () => Boolean
}

export const TimeoutWatcher = ({ interval, iterations, watchFunction, timeoutFunction }: TimeoutWatcherProps) => {
    const [value, setValue] = useState(<CircularProgress />);
    let _interval = interval;
    let _iterations = iterations;
    if ( _interval === undefined ) _interval = 1000; // milliseconds
    if ( _iterations === undefined ) _iterations = 1000;

    function getRandomArbitrary(min: number, max:number) {
      return Math.random() * (max - min) + min;
    }

    const watchFunctionTest = () => {
      const x = getRandomArbitrary(0,100);
      if ( x >= 80 ) {
        setValue(<div>It is done</div>)
        return true;
      }
      return false;
    }

    const timeoutFunctionTest = () => {
        setValue(<div>It timed out!</div>)
    }

    const wf = watchFunction ? watchFunction : watchFunctionTest;
    const tf = timeoutFunction ? timeoutFunction : timeoutFunctionTest;

    console.log("_interval,_iterations",_interval,_iterations)
    useEffect( () => {
      const fetchData = async () => {
        await timeoutWatcher(_interval,_iterations,wf,tf);
      };
      fetchData();
    },[]); // eslint-disable-line react-hooks/exhaustive-deps
    // the parameter [] allows the effect to skip if value unchanged
    // an empty [] will only update on mount of component
    return (
      <div>
        {value}
      </div>
    );
  };
  
  export default TimeoutWatcher;