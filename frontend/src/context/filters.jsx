

import { createContext } from "react";
import { useState } from "react";


export const FilterContext = createContext(null);




export function FilterProvider({children}){
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedRangeDate, setSelectedRangeDate] = useState(null);
  const [data, setData] = useState([]);

  
  return <FilterContext.Provider value={
    {
      selectedMonth, 
      setSelectedMonth,
      selectedDay,
      setSelectedDay,
      selectedRangeDate,
      setSelectedRangeDate,
      selectedEmployee,
      setSelectedEmployee,
      data, setData
      }}>
    {children}
  </FilterContext.Provider>
}