
function BookPackageTotals({
    delay,
    iterations,
    classes,
    style,
  }) 
  {
    const [_totals, setVal] = useState(<CircularProgress />);
    let _delay = delay;
    let _iterations = iterations;
    if ( _delay === undefined ) _delay = 1000;
    if ( _iterations === undefined ) _iterations = 1000;
    useEffect( () => {
      const fetchData = async () => {
        await bp_totals(_delay,_iterations,setVal);
      };
      fetchData();
    }, []); 
    // the parameter [] allows the effect to skip if value unchanged
    // an empty [] will only update on mount of component
    return (
      <div className={classes.root}>
        {_totals}
      </div>
    );
  };
  