import { Calendar, ChartColumn, CirclePlus, House, Plus, Search, Settings, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";


function Sidebar() {

  return (
    <div className="sidebar">
      <div className="sideicon">
        <Link to={'/add'}><CirclePlus className="text-white" size={30}/></Link></div>
      <div className="line" />
      <div className="m-1">
        <Link to={'/'}><House className="text-white" size={30} /></Link></div>
      <div className="sideicon">
        <Link to={'/todo'}><Calendar  className="text-white" size={30} /></Link></div>
      <div className="sideicon">
        <Link to={'/feedback'}><ChartColumn className="text-white" size={30} /></Link></div>
    </div>
  );
}

export default Sidebar