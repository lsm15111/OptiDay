import { Calendar, ChartColumn, CirclePlus, House } from "lucide-react";
import React from "react";
import { Link} from "react-router-dom";


function Sidebar() {

  return (
    <div className="sidebar">
      <div className="sideicon">
        <Link to={'/todo'}><CirclePlus className="text-white" size={40}/></Link></div>
      <div className="line" />
      <div className="sideicon">
        <Link to={'/'}><House className="text-white" size={40} /></Link></div>
      <div className="sideicon">
        <Link to={'/month'}><Calendar  className="text-white" size={40} /></Link></div>
      <div className="sideicon">
        <Link to={'/feedback'}><ChartColumn className="text-white" size={40} /></Link></div>
    </div>
  );
}

export default Sidebar