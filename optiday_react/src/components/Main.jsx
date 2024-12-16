import { useEffect, useState } from "react";
import Todoslist from "./Todoslist"


function Main(){
    const categories = {
        work: {
          name: "업무",
          color: "bg-blue-100",
        },
        meeting: {
          name: "미팅",
          color: "bg-yellow-100",
        },
        personal: {
          name: "개인",
          color: "bg-green-100",
        },
        urgent: {
          name: "긴급",
          color: "bg-red-100",
        },
      };
      const [currentTime, setCurrentTime] = useState(new Date());
      
      const generateHeatmapData = () => {
        const months = 12;
        return Array.from(
          {
            length: months,
          },
          () =>
            Array.from(
              {
                length: 7,
              },
              () =>
                Object.keys(categories)[
                  Math.floor(Math.random() * Object.keys(categories).length)
                ],
            ),
        );
      };
      const [heatmapData] = useState(generateHeatmapData());
      useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
      }, []);
    
    return(
        <div className="main contents">
            <div className="p-3">
            <Todoslist/>
            </div>
            <div className="w-100 p-3">
                <div className="feedback p-3 rounded">피드백
                  

                </div>

              </div>
        </div>
    )
}
export default Main