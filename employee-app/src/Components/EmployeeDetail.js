import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { employeeDetails } from "../Constant";

function EmployeeDetail(props) {
  const { employeeid } = useParams();
  const employeeID = parseInt(employeeid);
  const employeeData = props.employeeDetails
    ? [...employeeDetails, ...props.employeeDetails]
    : employeeDetails;
  const index = employeeData.findIndex(
    (employee) => employee.employeeID === employeeID
  );
  const employeeDetail = employeeData[index];

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col mb-5">
          <div className="card">
            {Object.keys(employeeDetail).length > 0 && (
              <div className="card-body">
                <p className="card-text">
                  Employee ID: {employeeDetail.employeeID}
                </p>
                <p className="card-text">
                  Employee Name: {employeeDetail.employeeName}
                </p>
                <p className="card-text">
                  Employee Detail: {employeeDetail.employeeDetail}
                </p>
              </div>
            )}
            {Object.keys(employeeDetail).length === 0 && (
              <p>Opps! Looks like there isn't any employee entry.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;
