import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Employee from "./Components/Employee";
import EmployeeDetail from "./Components/EmployeeDetail";
import "./App.css";

const Button = React.lazy(() => import("UIComponents/Button"));

function App(props) {
  const addEmployeeButton = () => {
    props.onAddEmployeeButtonHandler(true);
  };

  return (
    <Router>
      <div className="border border-secondary m-3">
        <div className="container mt-3">
          <div className="row">
            <div className="col-6">
              <h4>Employee Details</h4>
            </div>
            <div className="col-6">
              <Button
                className={"btn-primary"}
                buttonStyle={{ float: "right" }}
                label={"Add Employee"}
                onClick={addEmployeeButton}
              />
            </div>
          </div>
        </div>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Employee employeeDetails={props.employeeDetails} />
            )}
          />
          <Route
            exact
            path="/employeedetail/:employeeid"
            component={() => (
              <EmployeeDetail employeeDetails={props.employeeDetails} />
            )}
          />
        </Switch>
        <i className="m-3">
          Employee application in React (Exposed component= App)
        </i>
      </div>
    </Router>
  );
}

export default App;
