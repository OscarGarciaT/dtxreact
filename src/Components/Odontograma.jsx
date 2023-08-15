import {
  Autocomplete,
  Button,
  Icon,
  IconButton,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useEffect, useRef } from "react";

const simbolos = [
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

const OdontogramaCanvas = (props) => {
  const canvasRef = useRef(null);
  const backgroundImage = "/assets/img/odontograma_canvas.png";
  const placedSymbols = props.placedSymbols;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      placedSymbols.forEach((symbol) => {
        const symbolImg = new Image();
        symbolImg.src = `/assets/img/simbolos/${symbol.src}`;
        symbolImg.onload = () => {
          const x = symbol.x - symbolImg.width / 2;
          const y = symbol.y - symbolImg.height / 2;
          ctx.drawImage(symbolImg, x, y);
        };
      });
    };
  }, [backgroundImage, placedSymbols]);

  return <canvas ref={canvasRef} width={1200} height={600} {...props} />;
};

const Odontograma = (props) => {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [placedSymbols, setPlacedSymbols] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);

  const handleCanvasClick = async (event) => {
    if (deleteMode) {
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

        const symbolX = symbol.x - symbolImg.width / 2;
        const symbolY = symbol.y - symbolImg.height / 2;

        if (
          clickX >= symbolX &&
          clickX <= symbolX + symbolImg.width &&
          clickY >= symbolY &&
          clickY <= symbolY + symbolImg.height
        ) {
          const newPlacedSymbols = placedSymbols.filter((s) => s !== symbol);
          setPlacedSymbols(newPlacedSymbols);
          break;
        }
      }
    } else if (selectedSymbol) {
      const canvas = event.target;
      const canvasRect = canvas.getBoundingClientRect();
      const x = event.clientX - canvasRect.left;
      const y = event.clientY - canvasRect.top;
      addSymbol(selectedSymbol.value, x, y);
    }
  };

  const addSymbol = (src, x, y) => {
    setPlacedSymbols([...placedSymbols, { src, x, y }]);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-x-2 my-2">
        <Autocomplete
          className="w-1/3"
          value={selectedSymbol}
          disabled={deleteMode}
          onChange={(event, newValue) => setSelectedSymbol(newValue)}
          options={simbolos}
          getOptionLabel={(option) => option.label}
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
        <Button
          onClick={() => setDeleteMode(!deleteMode)}
          variant={deleteMode ? "contained" : "outlined"}
        >
          <Icon>delete</Icon>
        </Button>
      </div>
      <OdontogramaCanvas
        onClick={handleCanvasClick}
        placedSymbols={placedSymbols}
      />
    </div>
  );
};

export default Odontograma;
