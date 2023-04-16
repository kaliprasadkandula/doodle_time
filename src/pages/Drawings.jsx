import React, { useRef, useState, useEffect } from "react";

function Sketchpad() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevCoords, setPrevCoords] = useState({ x: 0, y: 0 });
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [eraserEnabled, setEraserEnabled] = useState(false);
  const [eraserSize, setEraserSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Get the canvas background color, width, and height from local storage
    const storedBackgroundColor = localStorage.getItem("canvasBackgroundColor");
    const storedWidth = localStorage.getItem("canvasWidth");
    const storedHeight = localStorage.getItem("canvasHeight");

    // Set the canvas background color, width, and height
    canvas.style.backgroundColor =  "yellow";
    console.log(`lets logg the bg color`, canvas.style.backgroundColor)
    canvas.width = storedWidth || 500;
    canvas.height = storedHeight || 300;

    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = brushSize;
    context.strokeStyle = brushColor;
  }, []);

  function handleMouseDown(event) {
    setIsDrawing(true);
    console.log(`drawing`)
    setPrevCoords(getCoordinates(event));
  }

  function handleMouseMove(event) {
    if (isDrawing) {
      const currentCoords = getCoordinates(event);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      context.beginPath();
      context.moveTo(prevCoords.x, prevCoords.y);
      context.lineTo(currentCoords.x, currentCoords.y);

      if (eraserEnabled) {
        context.globalCompositeOperation = "destination-out";
        context.lineWidth = eraserSize;
      } else {
        context.globalCompositeOperation = "source-over";
        context.strokeStyle = brushColor;
        context.lineWidth = brushSize;
      }

      context.stroke();

      setPrevCoords(currentCoords);
    }
  }

  function handleMouseUp() {

    setIsDrawing(false);
    console.log(` not drawing`)

  }

  function handleColorChange(event) {
    setBrushColor(event.target.value);
    setEraserEnabled(false);
    localStorage.setItem("canvasBackgroundColor", event.target.value);
  }

  function handleBrushSizeChange(event) {
    setBrushSize(event.target.value);
    setEraserEnabled(false);
    localStorage.setItem("canvasWidth", canvasRef.current.width);
    localStorage.setItem("canvasHeight", canvasRef.current.height);
  }

  function handleEraserSizeChange(event) {
    setEraserSize(event.target.value);
    setEraserEnabled(true);
    localStorage.setItem("canvasWidth", canvasRef.current.width);
    localStorage.setItem("canvasHeight", canvasRef.current.height);
  }

  function handleEraserClick() {
    setEraserEnabled(true);
    setBrushColor("#ffffff");
    setBrushSize(eraserSize);
  }

  function handleBrushClick() {
    setEraserEnabled(false);
    setBrushColor("#000000");
    setBrushSize(5);
  }

  function getCoordinates(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }


  return (
    <div style={{ backgroundColor: "grey" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <div style={{ position: "relative", border: "10px solid black" }}>
          <canvas
            ref={canvasRef}
            width={500}
            height={300}
            background-color="white"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10vh" }}>
        <div style={{ position: "relative" }}>
          <div>
            <label htmlFor="color-picker">Color: </label>
            <input
              type="color"
              id="color-picker"
              value={brushColor}
              onChange={handleColorChange}
            />
            <label htmlFor="brush-size-slider">Brush Size: </label>
            <input
              type="range"
              id="brush-size-slider"
              min="1"
              max="20"
              value={brushSize}
              onChange={handleBrushSizeChange}
            />
            <button onClick={handleBrushClick} disabled={!eraserEnabled}>
              Brush
            </button>
            <button onClick={handleEraserClick} disabled={eraserEnabled}>
              Eraser
            </button>
            <label htmlFor="eraser-size-slider">Eraser Size: </label>
            <input
              type="range"
              id="eraser-size-slider"
              min="1"
              max="20"
              value={eraserSize}
              onChange={handleEraserSizeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sketchpad