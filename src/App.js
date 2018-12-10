import React, { Component } from 'react';
import ReactTable from "react-table"
import "react-table/react-table.css"

import { PGNs } from '@canboat/pgns'

const columns = [
  { Header: "PGN", accessor: "PGN"},
  { Header: "Name", accessor: "Description"},
]
class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactTable
          data={PGNs}
          columns={columns}
          minRows={1}
          pageSizeOptions={[100,200,300,400]}
          defaultPageSize={300}
          filterable
        />
      </div>
    );
  }
}

export default App;
