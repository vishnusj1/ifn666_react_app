import React from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

function Table({ data }) {
let columnDefs = [];
const rowData = data;

if (Array.isArray(data) && data.length > 0) {
  // If data is available, generate columnDefs based on data
  columnDefs = Object.keys(data[0]).map((key) => ({
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    field: key,
    sortable:true,
    cellRenderer: function (params) {
      return <Link to={`/stocks/${params.data.symbol}`}>{params.value}</Link>;
    },
  }));
} else {
  // If data is not available or empty, display a default message
  columnDefs = [
    {
      headerName: 'No Data Available',
      field: 'nodata',
    },
  ];
}

  
  
  return (
    <div className="ag-theme-alpine" style={{ height: '500px', width: '600px' }}>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} pagination={true} paginationPageSize = {10} animateRows={true}/>
    </div>
  );
}

export default Table;
