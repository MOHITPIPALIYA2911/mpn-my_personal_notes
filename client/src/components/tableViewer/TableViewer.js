// TableViewer.js
import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const TableViewer = ({ rowData, colDefs, onEdit, onDelete, onView, onRestore }) => {
  const pagination = true;
  const paginationPageSize = 5;
  const paginationPageSizeSelector = [5, 10, 25, 50];
  const updatedColDefs =
    onEdit || onView || onDelete || onRestore
      ? [
          ...colDefs,
          {
            headerName: "Actions",
            field: "action",
            cellRenderer: (params) => (
              <>
                <div className="navbar-nav flex-row align-items-center ms-auto">
                  {onEdit && (
                    <button
                      type="button"
                      style={{ height: "30px", width: "30px" }}
                      className="btn btn-icon btn-secondary m-2 mb-1"
                      onClick={() => {
                        console.log(params);
                        onEdit(params.data.idNumber);
                      }}
                    >
                      <span className="tf-icons mdi mdi-pencil"></span>
                    </button>
                  )}
                  {onView && (
                    <button
                      type="button"
                      style={{ height: "30px", width: "30px" }}
                      className="btn btn-icon btn-primary m-2 mb-1"
                      onClick={() => {
                        onView(params.data.idNumber);
                      }}
                    >
                      <span className="tf-icons mdi mdi-eye"></span>
                    </button>
                  )}
                  {onRestore && (
                    <button
                      type="button"
                      style={{ height: "30px", width: "100px" }}
                      className="btn btn-icon btn-info m-2 mb-1"
                      onClick={() => {
                        onRestore(params.data.idNumber, params.rowIndex);
                      }}
                    >
                      <span className="tf-icons mdi mdi-undo"> Restore</span>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      style={{ height: "30px", width: "30px" }}
                      className="btn btn-icon btn-danger m-2 mb-1"
                      onClick={() => {
                        onDelete(params.data.idNumber, params.rowIndex);
                      }}
                    >
                      <span className="tf-icons mdi mdi-delete"></span>
                    </button>
                  )}
                </div>
              </>
            ),
          },
        ]
      : [...colDefs];

  const gridOptions = {
    pagination: pagination,
    paginationPageSize: paginationPageSize,
    paginationPageSizeSelector: paginationPageSizeSelector,
    rowHeight: 55,
    suppressHorizontalScroll: true,
    autoSizeColumns: true,
    autoSizeColsMode: "firstColumn",
    autoSizePadding: 20,
  };

  return (
    <div className="ag-theme-quartz" style={{ height: 374 }}>
      <AgGridReact rowData={rowData} columnDefs={updatedColDefs} gridOptions={gridOptions} />
    </div>
  );
};

export default TableViewer;
