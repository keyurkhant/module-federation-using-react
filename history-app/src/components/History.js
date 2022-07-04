import React, { useState, useEffect } from "react";

const History = (props) => {
  const [employeeHistoryList, setemployeeHistoryList] = useState([]);
  useEffect(() => {
    if (props.lastEmployee) {
      setemployeeHistoryList((prevEmployeeHistoryList) => {
        return [
          {
            ...props.lastEmployee,
            registeredDate: new Date().toISOString(),
          },
          ...prevEmployeeHistoryList,
        ];
      });
    }
  }, [props.lastEmployee]);
  console.log(employeeHistoryList);
  return (
    <div className="border border-secondary m-3">
      <div className="container mt-2">
        <h4>Registered employee logs</h4>
        {employeeHistoryList.length > 0 &&
          employeeHistoryList.map((employee) => {
            return (
              <div
                className="alert alert-primary"
                role="alert"
                key={employee.employeeID}
              >
                Employee {employee.employeeName} is registered successfully on{" "}
                {employee.registeredDate}.
              </div>
            );
          })}
        {employeeHistoryList.length === 0 && (
          <p>Opps! No one registered recently.</p>
        )}
      </div>
      <i className="m-3">
        History application in React ((Exposed component= History))
      </i>
    </div>
  );
};

export default History;
