import React, {useState, useEffect} from "react";
import { useDebouncedEffect } from "./useDebouncedEffect";
import Linkify from "react-linkify";

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

const nf = new Intl.NumberFormat();

const componentDecorator = (href, text, key) => (
  <a href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
  </a>
);

function App() {

  const [mofs, setMofs] = useState([]);
  const [mof, setMof] = useState(null);
  const [datasets, setDatasets] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("records");
  const [datasetsLoading, setDatasetsLoading] = useState(false);

  useDebouncedEffect(() => {
    if (mofs && mofs.length > 0) {
      const newMofs = mofs.map((m) => {
        if (!m.measurementType || !m.measurementType.toLowerCase().includes(search.toLowerCase())) {
          m.hide = true;
        } else {
          m.hide = false;
        }
        return m;
      });
      setMofs(newMofs);
    }
  }, 500, [search]);

  useEffect(() => {
    fetch("https://api.obis.org/facet?facets=measurementTypeCombination&dropped=include&absence=include&size=10000")
    .then(res => res.json())
    .then(result => setMofs(processMofs(result.results.measurementTypeCombination)));
  }, []);

  useEffect(() => {
    if (sort && mofs && mofs.length > 0) {
      const newMofs = [...mofs];
      const ascending = sort === "records" ? -1 : 1;
      newMofs.sort((a, b) => {
        if (!a[sort]) return ascending;
        if (!b[sort]) return -ascending;
        return (a === null || a === "" || a[sort] > b[sort]) ? ascending : -ascending;
      });
      setMofs(newMofs);
    }
  }, [sort])

  function fetchLabel(i) {
    const id = mofs[i].measurementTypeID;
    if (id && id.startsWith("http://vocab.nerc.ac.uk/collection")) {
      const url = id + "?_profile=skos&_mediatype=application/json"
      fetch(url)
      .then(res => res.json())
      .then(results => {
        if (results && results.length > 0 && "http://www.w3.org/2004/02/skos/core#prefLabel" in results[0]) {
          const label = results[0]["http://www.w3.org/2004/02/skos/core#prefLabel"][0]["@value"]
          const newMofs = [...mofs];
          newMofs[i].prefLabel = label;
          setMofs(newMofs);
        }
      });
    }
  }

  function viewDatasets(mof) {
    window.scrollTo(0, 0);
    setMof(mof);
    setDatasets([]);
    setDatasetsLoading(true);
    let url = "https://api.obis.org/dataset?dropped=include&absence=include&";
    if (mof.measurementType) {
      url = url + "measurementtype=" + mof.measurementType + "&";
    }
    if (mof.measurementTypeID) {
      url = url + "measurementtypeid" + mof.measurementTypeID + "&";
    }
    fetch(url)
    .then(res => res.json())
    .then(result => {
      setDatasets(result.results);
      setDatasetsLoading(false);
    });
  }
  
  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light px-4 py-3">
        <a className="text-xl navbar-brand" href="#">OBIS Measurement Types</a>
      </nav>

      <div className="container-fluid pt-3">
        <div className="row">
          <div className="col-xl-6 col-md-8 col-sm-12">
            <p>This is an overview of all measurementType(ID) combinations in the OBIS database. Click the number of records in the last column to see the datasets containing a specific measurementType(ID) combination.</p>
            <p>Issues at <a href="https://github.com/iobis/mof-viewer" target="_blank" rel="noopener noreferrer">https://github.com/iobis/mof-viewer</a>.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h3>Datasets</h3>

            { datasetsLoading && <p className="loading">Loading datasets...</p> }

            { datasets && datasets.length > 0 &&
              <div>
                <p>Datasets for <b>{ mof.measurementType } { mof.measurementTypeID }</b></p>
                <table className="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th>title</th>
                      <th>node</th>
                      <th>records</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      datasets.map((dataset, i) => <tr key={i}>
                        <td><a href={"https://obis.org/dataset/" + dataset.id} target="_blank">{dataset.title}</a></td>
                        <td>{dataset.nodes.map(x => x.name).join(", ")}</td>
                        <td>{nf.format(dataset.records)}</td>
                      </tr>) 
                    }
                  </tbody>
                </table>
              </div>
            }

            { !datasetsLoading && datasets && datasets.length === 0 && <p>No datasets selected.</p> }

            <h3>Measurement types</h3>

            <div className="pt-2 pb-2">
              <div className="form-group row">
                <label className="col-sm-1 col-form-label" htmlFor="search">Search</label>
                <div className="col-sm-4">
                  <input className="form-control form-control-md" id="search" type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                </div>
              </div>
            </div>

            {
              mofs && mofs.length > 0 ? 
              <table className="table table-sm table-hover">
                <thead>
                  <tr>
                    <th className="cursor-pointer text-nowrap" onClick={() => setSort("measurementType")}>measurementType { sort === "measurementType" && <span className="ml-1">&darr;</span> }</th>
                    <th className="cursor-pointer text-nowrap" onClick={() => setSort("measurementTypeID")}>measurementTypeID { sort === "measurementTypeID" && <span className="ml-1">&darr;</span> }</th>
                    <th className="cursor-pointer text-nowrap">prefLabel</th>
                    <th className="cursor-pointer text-nowrap" onClick={() => setSort("records")}>records { sort === "records" && <span className="ml-1">&darr;</span> }</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    mofs.filter(mof => !mof.hide).map((mof, i) => <tr key={i}>
                      <td>{mof.measurementType}</td>
                      <td><Linkify componentDecorator={componentDecorator}>{mof.measurementTypeID}</Linkify></td>
                      <td>{mof.prefLabel ? mof.prefLabel : mof.measurementTypeID ? <span className="text-primary cursor-pointer" onClick={() => fetchLabel(i)}>find</span> : ""}</td>
                      <td className="text-primary cursor-pointer" onClick={() => viewDatasets(mof)}>{nf.format(mof.records)}</td>
                    </tr>) 
                  }
                </tbody>
              </table>
              : <p className="loading">Loading measurement types...</p>
            }

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
