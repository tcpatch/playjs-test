import React, { useRef, useState, useEffect } from 'react'

// todo put in css
const dropZoneStyle = {
  width: "90px",
  height: "60px",
  background: "#AAAAAA",
  color: "#FFFFFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2%"
}

//const DropZone = (day, dayMenu, setDayMenu) => {
function DropZone(day, dayMenu, setDayMenu) {
//class NewRecipe extends React.Component {
 
  useEffect(() => {
    const boundingRect = document.getElementById(`${day}DropZone`).getBoundingClientRect();
    const x = boundingRect.x;
    const y = boundingRect.y;
    const width = boundingRect.width;
    const height = boundingRect.height;
    const x2 = x + width;
    const y2 = y + height;
    const dmenu = {...dayMenu};
    dmenu['dragStopZones'][day] = {x1: x,
                                   x2: x2,
                                   y1: y,
                                   y2: y2};
    dmenu['userSelectedRecipes'][day] = {
      breakfast: '',
      lunch: '',
      dinner: ''
    }
    setDayMenu(dmenu);
  }, []);

  const handleOnClick = (event) => {
    const dmenu = {...dayMenu};
    const dropZoneDay = event.target.innerHTML;
    dmenu['showDayModal'] = true;
    dmenu['currentDay'] = dropZoneDay;
    setDayMenu(dmenu);
  }

  return (
    <div
    id={`${day}DropZone`}
    className='noSelect'
    style={ dropZoneStyle }
    onClick={ handleOnClick }
     >
    {day}
    </div>
  )  
}

function DropZones(dayMenu, setDayMenu) {
  
  const [daysOfTheWeek, setDaysOfTheWeek] = useState(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']);
  
  return(
    <div>
      {daysOfTheWeek.map((x) => {
        return (
          <div>
           {DropZone(x, dayMenu, setDayMenu)}
          </div>
        );
      })}
    </div>
  )
}

export default DropZones