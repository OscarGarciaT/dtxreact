import Button from "@mui/material/Button";
import { useState } from "react"
import DtxSuggestField from "../Components/Form/DtxSuggestField"
import { useForm } from "react-hook-form";

const Test = () => {

    const [diagnosis, setDiagnosis] = useState(null)

    const { control, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: { tratamientos: { diag: null } }
    })

    const handleSubmitTreatment = (data) => { // Cambia el parámetro data para obtener los valores del formulario
        console.log(data.tratamientos.diag?.descripcion); // Accede a la descripción del diagnóstico seleccionado
    };



    return (<div className="mb-6">
        <DtxSuggestField
            control={control}
            name={`tratamientos.diag`}
            label={""}
            viewMode={false}
        />
        <Button
            variant="contained"
            fullWith
            onClick={handleSubmit(handleSubmitTreatment)}
        >ENVIAR</Button>
    </div>)


}
export default Test
