import React, {useState, useEffect} from "react";

function processMofs(mofs) {
  return mofs.map(mof => {
    let parts = mof.key.split("|");
    if (parts.length === 1) {
      if (parts[0].startsWith("http")) {
        parts = [null, parts[0]];
      } else {
        parts = [parts[0], null];
      }
    }
    return {
      measurementType: parts[0],
      measurementTypeID: parts[1],
      records: mof.records
    };
  });
}

function App() {

  const [mofs, setMofs] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.obis.org/facet?facets=measurementTypeCombination&dropped=include&absence=include&size=10000")
    .then(res => res.json())
    .then(result => setMofs(processMofs(result.results.measurementTypeCombination)));
  }, []);

  useEffect(() => {
    const newMofs = mofs.map((mof) => {
      if (!mof.measurementType || !mof.measurementType.toLowerCase().includes(search)) {
        mof.hide = true;
      } else {
        mof.hide = false;
      }
      return mof;
    });
    console.log(newMofs)
    setMofs(newMofs);
  }, [search]);

  function viewDatasets(mof) {
    window.scrollTo(0, 0);
    setDatasets([]);
    let url = "https://api.obis.org/dataset?dropped=include&absence=include&";
    if (mof.measurementType) {
      url = url + "measurementtype=" + mof.measurementType + "&";
    }
    if (mof.measurementTypeID) {
      url = url + "measurementtypeid" + mof.measurementTypeID + "&";
    }
    fetch(url)
    .then(res => res.json())
    .then(result => setDatasets(result.results));
  }
  
  return (
    <div className="App container-fluid">
      <header className="App-header">
        <h1>MoF viewer</h1>

        <div className="pt-2 pb-2">
          <input placeholder="search" type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
        </div>

        {
          datasets && datasets.length > 0 &&
          <div>
            <h2>Datasets</h2>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>title</th>
                  <th>records</th>
                </tr>
              </thead>
              <tbody>
                {
                  datasets.map((dataset, i) => <tr key={i}>
                    <td><a href={"https://obis.org/dataset/" + dataset.id} target="_blank">{dataset.title}</a></td>
                    <td>{dataset.records}</td>
                  </tr>) 
                }
              </tbody>
            </table>
          </div>
        }

        <h2>Measurement types</h2>

        {
          mofs && mofs.length > 0 ? 
          <table Name="table table-sm">
            <thead>
              <tr>
                <th>measurementType</th>
                <th>measurementTypeID</th>
                <th>records</th>
              </tr>
            </thead>
            <tbody>
              {
                mofs.filter(mof => !mof.hide).map((mof, i) => <tr key={i}>
                  <td>{mof.measurementType}</td>
                  <td>{mof.measurementTypeID}</td>
                  <td className="text-primary cursor-pointer" onClick={() => viewDatasets(mof)}>{mof.records}</td>
                </tr>) 
              }
            </tbody>
          </table>
          : <p>Loading...</p>
        }

      </header>
    </div>
  );
}

export default App;
