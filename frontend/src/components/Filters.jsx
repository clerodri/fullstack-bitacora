import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";

import { useFilters } from "../hooks/useFilters";

function Filters() {
  const {
    selectedMonth,
    setSelectedMonth,
    selectedDay,
    setSelectedDay,
    setSelectedRangeDate,
    selectedEmployee,
    setSelectedEmployee,
    edata,
  } = useFilters();

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };
  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };
  const handleDayChange = (date) => {
    setSelectedDay(date);
  };
  const handleRangeDaysChange = (date) => {
    setSelectedRangeDate(date);
  };
  console.log(edata);

  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center p-5 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex flex-row gap-5 justify-center items-center">
          <div>
            <label>Day: </label>
            <DatePicker
              showIcon
              selected={selectedDay}
              dateFormat="dd"
              onChange={handleDayChange}
              isClearable
              placeholderText="Select  Day"
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label>Month: </label>
            <DatePicker
              selected={selectedMonth}
              showIcon
              onChange={handleMonthChange}
              dateFormat="MM/yyyy"
              isClearable
              showMonthYearPicker
              placeholderText="Select  Month"
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="date-range-picker">
            <label>Range Days: </label>
            <DateRangePicker
              format="MM/dd/yyyy"
              size="lg"
              placeholder="Select Date Range"
              showOneCalendar
              onChange={handleRangeDaysChange}
              showHeader={false}
            />
          </div>
          <div>
            <label>Employees: </label>
            <select
              className="p-2 border rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedEmployee ? selectedEmployee : ""}
              onChange={handleEmployeeChange}
            >
              <option value=""> ---- </option>
              {edata?.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstname + " " + employee.lastname}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filters;
