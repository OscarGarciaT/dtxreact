import { useState, useEffect } from "react";
import { getAllDiagnoses } from "../../services/patientServices";

async function fetchDiagnoses() {
    try {
        const response = await getAllDiagnoses(); // Supongamos que getAllDiagnoses es la función que devuelve la promesa
        return response; // La promesa se resuelve con el arreglo de diagnósticos
    } catch (error) {
        console.error('Error fetching diagnoses:', error);
        return []; // En caso de error, retornamos un arreglo vacío o manejas el error de otra manera
    }
}

const useAllDiagnoses = () => {
    const [diagnoses, setDiagnoses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const fetchedDiagnoses = await fetchDiagnoses();
            setDiagnoses(fetchedDiagnoses);
        }

        fetchData();
    }, []);

    return diagnoses;
}
export default useAllDiagnoses;