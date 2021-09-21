import { Typography } from "@material-ui/core";
import { useState, useEffect } from "react";

function MyAppBarTime(params) {
  const [time, setTime] = useState("");

  useEffect(() => {
    let secTimer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  return <Typography variant="body2">{time}</Typography>;
}

export default MyAppBarTime;
