import { useEffect, useState } from "react";

function useLocalStorage(key, defaultValue = null) {
    // Retrieve data from localStorage when the component mounts
    const [data, setData] = useState(() => {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : defaultValue;
    });
  
    // Update localStorage whenever the data changes
    useEffect(() => {
      if (data === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(data));
      }
    }, [data, key]);
  
    return [data, setData];
  }
  
  export default useLocalStorage;
  