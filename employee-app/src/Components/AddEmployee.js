import React, { useState } from "react";

const Button = React.lazy(() => import("UIComponents/Button"));

const AddEmployee = (props) => {
  const [employeeID, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeDetail, setEmployeeDetail] = useState("");

  const handleEmployeeId = (e) => {
    setEmployeeId(parseInt(e.target.value));
  };

  const handleEmployeeName = (e) => {
    setEmployeeName(e.target.value);
  };

  const handleEmployeeDetail = (e) => {
    setEmployeeDetail(e.target.value);
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const employeeData = { employeeID, employeeName, employeeDetail };
    props.onAddEmployee(employeeData);
    setEmployeeId("");
    setEmployeeName("");
    setEmployeeDetail("");
  };

  return (
    <div className="border border-secondary m-3">
      <div className="container">
        <h4>New Employee Registration</h4>
        <form onSubmit={handleAddEmployee}>
          <div className="form-group mb-2">
            <label htmlFor="employeeId">Employee ID</label>
            <input
              type="number"
              className="form-control"
              id="employeeId"
              value={employeeID}
              onChange={handleEmployeeId}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="employeeName">Employee Name</label>
            <input
              type="text"
              className="form-control"
              id="employeeName"
              value={employeeName}
              onChange={handleEmployeeName}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="employeeDetail">Employee Detail</label>
            <input
              type="text"
              className="form-control"
              id="employeeDetail"
              value={employeeDetail}
              onChange={handleEmployeeDetail}
            />
          </div>
          <Button
            className={"btn-primary mt-3 mb-3"}
            label={"Add Employee"}
            type={"submit"}
          />
        </form>
      </div>
      <i className="m-3">
        Employee application in React ((Exposed component= AddEmployee))
      </i>
    </div>
  );
};

export default AddEmployee;
