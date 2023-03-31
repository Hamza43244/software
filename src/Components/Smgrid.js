import React from "react";
import { Table } from "react-bootstrap";
import { FidgetSpinner } from "react-loader-spinner";

const SMGrid = (props) => {
  const { title, columns, datasource, isLoading } = props;

  return (
    <div>
      <h2 className="text-center text-success my-3">{title}</h2>
      {isLoading ? (
        <Table striped bordered hover>
          <thead className="bg-success">
            <tr>
              {columns && Array.isArray(columns) && columns.length > 0
                ? columns.map((x, i) => <th key={i}>{x.displayName}</th>)
                : null}
            </tr>
          </thead>
          <tbody>
            {datasource && Array.isArray(datasource) && datasource.length > 0
              ? datasource.map((x, i) => (
                  <tr key={i}>
                    {columns.map((e, ind) => (
                      <td key={ind}>
                        {e.displayField ? e.displayField(x) : x[e.key]}
                      </td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      ) : (
        <FidgetSpinner visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        ballColors={["#ff0000", "#00ff00", " #ffffff"]}
        backgroundColor="#F4442E" />
      )}
    </div>    
  );
};

export default SMGrid;
