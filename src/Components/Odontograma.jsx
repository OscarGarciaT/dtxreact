import {
  Autocomplete,
  Box,
  Button,
  Icon,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const colors = [
  { label: "Negro", value: "black" },
  { label: "Rojo", value: "red" },
  { label: "Azul", value: "blue" },
];

const brushSizes = [
  { label: "Pequeño", value: 1 },
  { label: "Mediano", value: 2 },
  { label: "Grande", value: 3 },
];

const symbolSizes = [
  { label: "Pequeño", value: 0.25 },
  { label: "Mediano", value: 0.5 },
  { label: "Grande", value: 1.25 },
];

const deleteMargin = 25;

const simbolos = [
  { label: "Grado 1", value: "grado_1.png" },
  { label: "Grado 2", value: "grado_2.png" },
  { label: "Grado 3", value: "grado_3.png" },
  { label: "Grado 4", value: "grado_4.png" },
  { label: "Sin grado", value: "sin_grado.png" },
  { label: "Sellante Necesario", value: "sellante_necesario.png" },
  { label: "Sellante Realizado", value: "sellante_realizado.png" },
  { label: "Caries", value: "caries.png" },
  { label: "Corona", value: "corona.png" },
  { label: "Endodoncia", value: "endodoncia.png" },
  { label: "Extraccion indicada", value: "extraccion_indicada.png" },
  { label: "Obturado", value: "obturado.png" },
  { label: "Perdida (Otra Causa)", value: "perdida_otra_causa.png" },
  { label: "Perdida por caries", value: "perdida_por_caries.png" },
  { label: "Protesis Fija (Extremo)", value: "protesis_fija_extremo.png" },
  {
    label: "Protesis Removible (Ext Izquierdo)",
    value: "protesis_removible_extremo_izq.png",
  },
  {
    label: "Protesis Removible (Ext Derecho)",
    value: "protesis_removible_extremo_der.png",
  },
  { label: "Protesis Total", value: "protesis_total.png" },
  { label: "Protesis", value: "protesis.png" },
];

const OdontogramaCanvas = ({
  placedSymbols,
  drawings,
  editingMode,
  mousePosition,
  ...props
}) => {
  const canvasRef = useRef(null);
  const backgroundImage = "/assets/img/odontograma_canvas.png";

  const symbols = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = backgroundImage;

    const drawCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      placedSymbols.forEach((symbol) => {
        const symbolImg = symbols.current[symbol.src];
        if (symbolImg) {
          const x = symbol.x - (symbolImg.width / 2) * symbol.size;
          const y = symbol.y - (symbolImg.height / 2) * symbol.size;
          ctx.drawImage(
            symbolImg,
            x,
            y,
            symbolImg.width * symbol.size,
            symbolImg.height * symbol.size
          );
        }
      });

      drawings.forEach((drawing) => {
        ctx.beginPath();
        ctx.moveTo(drawing.startX, drawing.startY);
        ctx.lineTo(drawing.endX, drawing.endY);
        ctx.strokeStyle = drawing.color;
        ctx.lineWidth = drawing.thickness;
        ctx.stroke();
      });

      if (editingMode === "deleting" && mousePosition.holding) {
        ctx.beginPath();
        ctx.rect(
          mousePosition.x - deleteMargin,
          mousePosition.y - deleteMargin,
          2 * deleteMargin,
          2 * deleteMargin
        );
        ctx.strokeStyle = "red";
        ctx.stroke();
      }
    };

    img.onload = () => {
      drawCanvas();
    };

    // Preload symbol images
    placedSymbols.forEach((symbol) => {
      const symbolImg = new Image();
      symbolImg.src = `/assets/img/simbolos/${symbol.src}`;
      symbolImg.onload = () => {
        symbols.current[symbol.src] = symbolImg;
        drawCanvas();
      };
    });

    const animate = () => {
      requestAnimationFrame(animate);
      drawCanvas();
    };
    animate();
  }, [backgroundImage, placedSymbols, drawings, mousePosition, editingMode]);

  return <canvas ref={canvasRef} width={1200} height={600} {...props} />;
};

const Odontograma = ({
  placedSymbols,
  setPlacedSymbols,
  drawings,
  setDrawings,
  isEditDialog,
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState(simbolos[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedBrushSize, setSelectedBrushSize] = useState(brushSizes[0]);
  const [selectedSymbolSize, setSelectedSymbolSize] = useState(symbolSizes[0]);

  const [editingMode, setEditingMode] = useState("adding");

  const [isDrawing, setIsDrawing] = useState(false);

  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    setIsDrawing(true);
    setLastX(event.nativeEvent.offsetX);
    setLastY(event.nativeEvent.offsetY);
  };

  const handleMouseUp = (event) => {
    setIsDrawing(false);
    setMousePosition((prevValue) => ({ ...prevValue, holding: false }));
  };

  const handleMouseMove = (event) => {
    if (editingMode === "drawing") {
      if (!isDrawing) return;
      const newDrawing = {
        startX: lastX,
        startY: lastY,
        endX: event.nativeEvent.offsetX,
        endY: event.nativeEvent.offsetY,
        color: selectedColor ? selectedColor.value : "black",
        thickness: selectedBrushSize ? selectedBrushSize.value : 1,
      };
      setDrawings((prevDrawings) => [...prevDrawings, newDrawing]);
      setLastX(event.nativeEvent.offsetX);
      setLastY(event.nativeEvent.offsetY);
    } else if (editingMode === "deleting") {
      if (!isDrawing) return;
      const mouseX = event.nativeEvent.offsetX;
      const mouseY = event.nativeEvent.offsetY; // adjust this to change the size of the deleting area
      setMousePosition({ x: mouseX, y: mouseY, holding: true });
      setDrawings((prevDrawings) =>
        prevDrawings.filter((drawing) => {
          // Check if the mouse is over the drawing or within the deleteMargin
          const isOverDrawing =
            mouseX >= Math.min(drawing.startX, drawing.endX) - deleteMargin &&
            mouseX <= Math.max(drawing.startX, drawing.endX) + deleteMargin &&
            mouseY >= Math.min(drawing.startY, drawing.endY) - deleteMargin &&
            mouseY <= Math.max(drawing.startY, drawing.endY) + deleteMargin;
          return !isOverDrawing;
        })
      );
    }
  };

  const handleCanvasClick = async (event) => {
    if (editingMode === "deleting") {
      const canvas = event.target;
      const canvasRect = canvas.getBoundingClientRect();
      const clickX = event.clientX - canvasRect.left;
      const clickY = event.clientY - canvasRect.top;

      for (const symbol of placedSymbols) {
        const symbolImg = new Image();
        symbolImg.src = `/assets/img/simbolos/${symbol.src}`;

        await new Promise((resolve) => {
          symbolImg.onload = resolve;
        });

        const symbolX = symbol.x - (symbolImg.width / 2) * symbol.size;
        const symbolY = symbol.y - (symbolImg.height / 2) * symbol.size;

        if (
          clickX >= symbolX &&
          clickX <= symbolX + symbolImg.width * symbol.size &&
          clickY >= symbolY &&
          clickY <= symbolY + symbolImg.height * symbol.size
        ) {
          const newPlacedSymbols = placedSymbols.filter((s) => s !== symbol);
          setPlacedSymbols(newPlacedSymbols);
          break;
        }
      }
    } else if (editingMode === "adding" && selectedSymbol) {
      const canvas = event.target;
      const canvasRect = canvas.getBoundingClientRect();
      const x = event.clientX - canvasRect.left;
      const y = event.clientY - canvasRect.top;
      addSymbol(selectedSymbol.value, x, y);
    }
  };

  const addSymbol = (src, x, y) => {
    setPlacedSymbols([
      ...placedSymbols,
      { src, x, y, size: selectedSymbolSize.value },
    ]);
  };

  const customEqualityTest = (option, currentOption) => {
    return option.value === currentOption.value;
  };

  return (
    <div className="flex flex-col mt-3">
      <div
        className={`flex flex-row gap-x-2 my-2 ${isEditDialog ? "hidden" : ""}`}
      >
        <Autocomplete
          className="w-1/3"
          value={selectedSymbol}
          disabled={editingMode !== "adding"}
          onChange={(event, newValue) => setSelectedSymbol(newValue)}
          options={simbolos}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={customEqualityTest}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecciona un simbolo"
              InputProps={{
                ...params.InputProps,
                startAdornment: selectedSymbol ? (
                  <>
                    <img
                      src={`/assets/img/simbolos/${selectedSymbol.value}`}
                      alt=""
                      style={{ height: 20, marginRight: 8 }}
                    />
                  </>
                ) : null,
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} className="flex items-center">
              <img
                src={`/assets/img/simbolos/${option.value}`}
                alt={option.label}
                style={{ marginRight: 8, height: 24 }}
              />
              {option.label}
              {selectedSymbol === option.value && (
                <IconButton
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedSymbol(null);
                  }}
                >
                  <Icon>delete</Icon>
                </IconButton>
              )}
            </li>
          )}
        />
        <Autocomplete
          className="w-40"
          value={selectedSymbolSize}
          disabled={editingMode !== "adding"}
          onChange={(event, newValue) => setSelectedSymbolSize(newValue)}
          options={symbolSizes}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={customEqualityTest}
          renderInput={(params) => (
            <TextField {...params} label="Tamaño de símbolo" />
          )}
        />
        <Button
          className="mr-5"
          onClick={() => setEditingMode("adding")}
          variant={editingMode === "adding" ? "contained" : "outlined"}
        >
          <Icon>add</Icon>
        </Button>
        <Button
          onClick={() => setEditingMode("drawing")}
          variant={editingMode === "drawing" ? "contained" : "outlined"}
        >
          <Icon>create</Icon>
        </Button>
        <Autocomplete
          className="w-36"
          value={selectedColor}
          disabled={editingMode !== "drawing"}
          onChange={(event, newValue) => setSelectedColor(newValue)}
          options={colors}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={customEqualityTest}
          renderInput={(params) => (
            <TextField {...params} label="Color del lapiz" />
          )}
        />
        <Autocomplete
          className="w-40"
          value={selectedBrushSize}
          disabled={editingMode !== "drawing"}
          onChange={(event, newValue) => setSelectedBrushSize(newValue)}
          options={brushSizes}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={customEqualityTest}
          renderInput={(params) => (
            <TextField {...params} label="Tamaño de lapiz" />
          )}
        />
        <Box flexGrow={1} />
        <Button
          onClick={() => setEditingMode("deleting")}
          variant={editingMode === "deleting" ? "contained" : "outlined"}
        >
          <Icon>delete</Icon>
        </Button>
      </div>
      <OdontogramaCanvas
        placedSymbols={placedSymbols}
        drawings={drawings}
        editingMode={editingMode}
        mousePosition={mousePosition}
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

export default React.memo(Odontograma);
