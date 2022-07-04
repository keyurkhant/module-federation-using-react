import React from "react";
import { employeeDetails } from "../Constant";
import { Link } from "react-router-dom";

const Employee = (props) => {
  const employeeData = props.employeeDetails
    ? [...employeeDetails, ...props.employeeDetails]
    : employeeDetails;
  return (
    <div className="container mt-3">
      <div className="row mt-3">
        {employeeData.map((employee, index) => {
          return (
            <div
              className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-5"
              key={employee.employeeID}
            >
              <div className="card">
                <Link
                  to={{
                    pathname: `/employeedetail/${employee.employeeID}`,
                    id: employee.employeeID,
                    item: employee,
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{`#${employee.employeeID}`}</h5>
                    <p className="card-text">{employee.employeeName}</p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Employee;
