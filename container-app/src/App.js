import React, { useState, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

const Header = React.lazy(() => import("Header/App"));
const Employee = React.lazy(() => import("Employee/App"));
const AddEmployee = React.lazy(() => import("Employee/AddEmployee"));
const History = React.lazy(() => import("History/History"));
console.log(History);

const App = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [isAddEmployee, setIsAddEmployee] = useState(false);

  const onAddEmployeeButtonHandler = (isAddEmployeeValue) => {
    setIsAddEmployee(isAddEmployeeValue);
  };

  const onAddEmployeeHandler = (employeeData) => {
    setIsAddEmployee(false);
    setEmployeeList((prevEmployeeList) => {
      return [
        ...prevEmployeeList,
        {
          employeeID: employeeData.employeeID,
          employeeName: employeeData.employeeName,
          employeeDetail: employeeData.employeeDetail,
        },
      ];
    });
  };

  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <div className="row">
          {!isAddEmployee && (
            <div className="col-md-6">
              <Employee
                employeeDetails={employeeList}
                onAddEmployeeButtonHandler={onAddEmployeeButtonHandler}
              />
            </div>
          )}
          <Suspense fallback={<h2>Loading...</h2>}>
            {isAddEmployee && (
              <div className="col-md-6">
                <AddEmployee onAddEmployee={onAddEmployeeHandler} />
              </div>
            )}
          </Suspense>
          <div className="col-md-6">
              <History lastEmployee={employeeList[employeeList.length - 1]}/>
          </div>
        </div>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
