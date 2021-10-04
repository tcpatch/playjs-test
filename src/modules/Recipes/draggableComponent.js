import React, { useRef, useState, useEffect } from 'react'

const draggableStyle = {
  width: "max-content",
  background: "#FF9900",
  color: "#FFFFFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

const DraggableComponent = (displayText, dayMenu, setDayMenu) => {
  const [pressed, setPressed] = useState(false);
  const [displayName, setDisplayName] = useState(displayText);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [startPos, setStartPos] = useState({x: 0, y: 0});
  const ref = useRef()

  // Monitor changes to position state and update DOM
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
    }
  }, [position])
  
  function isInside(x, y, x1, y1, x2, y2) {
    let xInside = false;
    let yInside = false;
    let x1Corrected = x1;
    let x2Corrected = x2;
    let y1Corrected = y1;
    let y2Corrected = y2;
    if ( x2 < x1 ) {
      x2Corrected = x1;
      x1Corrected = x2;
    }
    if ( y2 < y1 ) {
      y2Corrected = x1;
      y1Corrected = x2;
    }
    if ( x >= x1Corrected && x <= x2Corrected ) {
      xInside = true;
    }
    
    if ( y >= y1Corrected && y <= y2Corrected ) {
      yInside = true;
    }
    if ( xInside && yInside ) {
      return true;
    } else {
      return false;
    }
  }
  
  function checkInDropZone(x, y) {
    const dropZones = dayMenu['dragStopZones'];
    const dzKeys = Object.keys(dropZones);
    for (let i=0; i<dzKeys.length; i++) {
      let day = dzKeys[i];
      let dropZone = dropZones[day];
      if ( isInside(x, y, dropZone.x1, dropZone.y1, dropZone.x2, dropZone.y2) ) {
        return day;
      }
    }
    return false;
  }

  // Update the current position if mouse is down
  const onMouseMove = (event) => {
    // todo update for mouse
    if (pressed) {
      setPosition({
        x: position.x + event.movementX,
        y: position.y + event.movementY
      })
    }
  }
  
  const onTouchMove = (event) => {
  // TODO add wait until highlight text
  if (pressed) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Touch#touch_area
      const elStyle = window.getComputedStyle(event.touches[0].target);
      const h = parseInt(elStyle.height, 10);
      const w = parseInt(elStyle.width, 10);
      const offTop = event.touches[0].target.offsetTop;
      const parentOffTop = event.touches[0].target.parentNode.offsetTop;
      //console.log(event.touches[0].pageY, event.touches[0].screenY, event.touches[0].clientY, offTop, parentOffTop, event.touches[0].target.parentNode.clientHeight, event.touches[0].target.clientHeight);
      //console.log(event.touches[0].target.parentNode.parentNode.parentNode.offsetTop);
      // todo inline if for if off page on x set 0
      setPosition({
        x: event.touches[0].pageX - event.touches[0].target.parentNode.clientWidth + (w / 2.0),// + event.touches[0].target.offsetLeft - event.touches[0].target.parentNode.parentNode.parentNode.offsetLeft,
        //x: 0,
        y: event.touches[0].pageY - h - event.touches[0].target.parentNode.parentNode.parentNode.offsetTop - event.touches[0].target.parentNode.clientHeight - offTop
        //y: event.touches[0].pageY - h - offTop - parentOffTop - event.touches[0].target.parentNode.clientHeight - event.touches[0].target.clientHeight
        //x: event.touches[0].screenX - event.touches[0].radiusX - 100,
       // y: event.touches[0].screenY - event.touches[0].radiusY - h
      })
    }
  event.preventDefault();
  }
  
  const onTouchEnd = (event) => {
    // TODO check if in any dropZone and open meal modal 
    setPressed(false);
    const x = event.changedTouches[0].pageX;
    const y = event.changedTouches[0].pageY;
    const dropZoneDay = checkInDropZone(x, y);
    if (dropZoneDay) {
      const dmenu = {...dayMenu};
      dmenu['showDayModal'] = true;
      dmenu['currentDay'] = dropZoneDay;
      setDayMenu(dmenu);
      console.log(dmenu);
    }
    setPosition(startPos);
    event.preventDefault();
  }
  
  const onTouchStart = (event) => {
    setPressed(true);
    const currentRecipe = event.target.innerText;
    const dmenu = {...dayMenu};
    dmenu['selectedRecipe'] = currentRecipe;
    setDayMenu(dmenu);
    const elStyle = window.getComputedStyle(event.touches[0].target);
    const h = parseInt(elStyle.height, 10);
    const w = parseInt(elStyle.width, 10);
    setStartPos({x: event.touches[0].pageX - event.touches[0].target.parentNode.clientWidth -(w / 2.0),
        y: event.touches[0].pageY - h - event.touches[0].target.parentNode.parentNode.parentNode.offsetTop - event.touches[0].target.parentNode.clientHeight - offTop})
    event.preventDefault();
  }

  const onClick = (event) => {
    if (pressed) {
      setPressed(false);
    } else {
      setPressed(true);
      const currentRecipe = event.target.innerText;
      const dmenu = {...dayMenu};
      dmenu['selectedRecipe'] = currentRecipe;
      setDayMenu(dmenu);
    }
  }
  

  return (
    <div
    className='noSelect'
      ref={ ref }
      style={ draggableStyle }
      onTouchStart={ onTouchStart }
      onTouchEnd={ onTouchEnd }
      onTouchCancel={ () => setPressed(false) }
      onTouchMove={ onTouchMove }
      onClick={ onClick }
      // onMouseMove={ onMouseMove }
      // onMouseDown={ () => setPressed(true) }
      // onMouseUp={ () => setPressed(false) }
      >
      { pressed ? "Dragging..." : displayName }
    </div>
  )
}

export default DraggableComponent