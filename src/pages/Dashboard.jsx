// helper functions
import { useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

import React from "react";

const Dashboard = () => {
  const { userName } = useLoaderData();

  return (
    <div>
      <h1>{userName}</h1>Dashboard
    </div>
  );
};

export default Dashboard;
