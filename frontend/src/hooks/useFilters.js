// useFilters.js

import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import axiosInstance, { apiUrl } from "../api/axiosIntance";
import { FilterContext } from "../context/filters";

export const useFilters = () => {
  const {
    selectedMonth,
    setSelectedMonth,
    selectedEmployee,
    setSelectedEmployee,
    selectedDay,
    setSelectedDay,
    selectedRangeDate,
    setSelectedRangeDate,
    data,
    setData,
  } = useContext(FilterContext);
  const [edata, setEdata] = useState([]);
  //
  const fetchFilterData = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedMonth) {
        const formattedMonth = format(selectedMonth, "MM-yyyy");
        params.append("monthly", formattedMonth);
      }

      if (selectedDay) {
        const formattedDay = format(selectedDay, "dd");
        params.append("day", formattedDay);
      }
      if (selectedEmployee) {
        params.append("employee", selectedEmployee);
      }
      if (selectedRangeDate) {
        const startDate = format(selectedRangeDate[0], "yyyy-MM-dd");
        const endDate = format(selectedRangeDate[1], "yyyy-MM-dd");
        params.append("date_range_after", startDate);
        params.append("date_range_before", endDate);
      }
      const url = `${apiUrl}/rondas/?${params.toString()}`;
      const res = await axiosInstance.get(url);
      setData(res.data);
    } catch (error) {
      console.log(error.message);
      setData([]);
    }
  };
  //
  const fetchEmployeeData = async () => {
    try {
      const res = await axiosInstance.get("/employees/");
      console.log(res.data);

      setEdata(res.data);
    } catch (error) {
      console.log(error.message);
      setEdata([]);
    }
  };
  //
  useEffect(() => {
    console.log("ejecutando useEffect for list employees");
    fetchEmployeeData();
  }, []);

  //
  useEffect(() => {
    fetchFilterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay, selectedMonth, selectedRangeDate, selectedEmployee]);

  return {
    selectedDay,
    setSelectedDay,
    selectedMonth,
    selectedEmployee,
    setSelectedEmployee,
    setSelectedRangeDate,
    data,
    setSelectedMonth,
    edata,
  };
};

export default useFilters;
