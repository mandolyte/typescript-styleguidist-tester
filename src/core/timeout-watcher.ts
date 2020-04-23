
async function bp_totals(delay,iterations,setVal) {
  // function to convert object to a map
  const obj_to_map = ( ob => {
    const mp = new Map();
    Object.keys ( ob ).forEach (k => { mp.set(k, ob[k]) });
    return mp;
  });

  let resourcePrefixes = ['uta-','utw-','utq-','utn-','ult-','ust-'];
  // ult,ust,utn,utq,utw,uta
  let ult_total = 0;
  let ust_total = 0;
  let utn_total = 0;
  let utq_total = 0;
  let utw_total = 0;
  let uta_total = 0;
  
  await (async function theLoop (iterations) {
    setTimeout( async function () {
      let tbid = await bpstore.getItem('bookid');
      if ( tbid === null ) {
        setVal("Please run BookPackageRollup")
      } else if (--iterations) {      // If i > 0, keep going
        const bookarray = tbid.split(",");
        let all_map = new Map();
        let resource_map = new Map();
        let allPresent = true;

        for ( let ri = 0; ri < resourcePrefixes.length; ri++ ) {
          for ( let bi = 0; bi < bookarray.length; bi++ ) {
            let lsk = resourcePrefixes[ri]+bookarray[bi];
            let x = await bpstore.getItem(lsk);
            if ( x === null ) {
              allPresent = false;
              console.log("iter",iterations,",missing:",lsk);
              break;
            }
            resource_map.set(lsk,x)
          }
        }

        if ( allPresent ) {
          console.log("All Present!");
          //
          // process uta: dedup first
          //
          let uta_dedup = new Map();
          for ( let [k,v] of resource_map.entries() ) {
            if ( k.startsWith("uta") ) {
              //let o = JSON.parse(v);
              let omap = obj_to_map(v.detail_article_map);
              for ( let [x,y] of omap.entries() ) {
                // Key x is the uta article
                if ( uta_dedup.get(x) ) { continue; }
                uta_dedup.set(x,y.wordFrequency);
              }
            }
          }
          // add in uta contribution
          for ( let v of uta_dedup.values() ) {
            let y = obj_to_map(v);
            for ( let [m,n] of y.entries() ) {
              let z = all_map.get(m);
              if ( z === undefined ) z = 0;
              all_map.set(m, z + n);
              uta_total = uta_total + n;
            }
          }
          //
          // process utw: dedup first
          //
          let utw_dedup = new Map();
          for ( let [k,v] of resource_map.entries() ) {
            if ( k.startsWith("utw") ) {
              //let o = JSON.parse(v);
              let omap = obj_to_map(v.detail_article_map);
              for ( let [x,y] of omap.entries() ) {
                // Key x is the utw article
                if ( utw_dedup.get(x) ) { continue; }
                utw_dedup.set(x,y.wordFrequency);
              }
            }
          }
          // add in utw contribution
          for ( let v of utw_dedup.values() ) {
            let y = obj_to_map(v);
            for ( let [m,n] of y.entries() ) {
              let z = all_map.get(m);
              if ( z === undefined ) z = 0;
              all_map.set(m, z + n);
              utw_total = utw_total + n;
            }
          }

          //console.log("Post UTA/W all_map",all_map)
          // sum over resources
          for ( let [k,v] of resource_map.entries() ) {
            if ( k.startsWith("uta") ) {
              continue;
            } else if ( k.startsWith("utw") ) {
              continue;
            } else {
              //let x = obj_to_map(JSON.parse(v));
              let x = obj_to_map(v);
              let y = obj_to_map(x.get('wordFrequency'));
              for ( let [m,n] of y.entries() ) {
                let z = all_map.get(m);
                if ( z === undefined ) z = 0;
                all_map.set(m, z + n);
                if ( k.startsWith("ult") ) {
                  ult_total = ult_total + n;
                } else if ( k.startsWith("ust") ) {
                  ust_total = ust_total + n;
                } else if ( k.startsWith("utn") ) {
                  utn_total = utn_total + n;
                } else if ( k.startsWith("utq") ) {
                  utq_total = utq_total + n;
                }
              }
            }
          }

          let totalPackcageWordCount = 0;
          for ( let c of all_map.values() ) {
            totalPackcageWordCount = totalPackcageWordCount + c;
          }
        
          let wf = wc.map_to_obj(all_map);
          let mt = wc.wf_to_mt(wf);
          // ult,ust,utn,utq,utw,uta

          let rootTitle = 'Book Packages Total Word Count: '+ totalPackcageWordCount.toLocaleString();
          let bodyTitle = 'Details'
    //                    <Typography variant="h5" >{cav.bookTitleById(skey)}</Typography>

          setVal(
            <Paper>
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                defaultExpanded={['1','2']}
              >
                <TreeItem nodeId="1" label={<Typography variant="h5">{rootTitle}</Typography>}>
                  <TreeItem nodeId="2" label={<Typography variant="h6">Book Packages Subtotals</Typography>}>
                    <Typography variant="body2" gutterBottom>
                      <ul>
                      <li>ULT <strong>{ult_total.toLocaleString()}</strong> </li>
                      <li>UST <strong>{ust_total.toLocaleString()}</strong> </li>
                      <li>UTA <strong>{uta_total.toLocaleString()}</strong> </li>
                      <li>UTW <strong>{utw_total.toLocaleString()}</strong> </li>
                      <li>UTN <strong>{utn_total.toLocaleString()}</strong> </li>
                      <li>UTQ <strong>{utq_total.toLocaleString()}</strong> </li>
                      </ul>
                    </Typography>
                  </TreeItem>
                  <TreeItem nodeId="3" label={<Typography variant="h6">{bodyTitle}</Typography>}>
                    <MaterialTable
                      icons={tableIcons}
                      title={mt.title}
                      columns={mt.columns}
                      data={mt.data}
                      options={mt.options}
                    />
                  </TreeItem>
                </TreeItem>
              </TreeView>
            </Paper>
          ); 
          return;
        }
        theLoop(iterations);   // Call the loop again, and pass it the current value of i
      } else {
        console.log("timeout on iter=",iterations)
        setVal("timeout")
      }
    }, delay);
  })(iterations);
}
