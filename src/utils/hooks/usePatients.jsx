import { useEffect, useState } from "react";
import { getPatients } from "../../services/patientServices";
import { useSelector } from "react-redux";

const usePatients = (searchQuery) => {
  const doctorId = useSelector(({ user }) => user?.doctorId);
  const patientRevision = useSelector(
    ({ revision }) => revision?.patientRevision
  );
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        if (doctorId) {
          const fetchPatients = await getPatients(doctorId, { searchQuery });
          setPatients(fetchPatients);
        }
      })();
    } catch (err) {
      console.err("[Pacientes] Error obteniendo los pacientes");
    }
    // eslint-disable-next-line
  }, [searchQuery, patientRevision, doctorId]);

  return patients;
};

export default usePatients;
