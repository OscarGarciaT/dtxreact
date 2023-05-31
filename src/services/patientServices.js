import { createRequest } from "../utils/requestUtils";

export const getPatients = () => {
  return createRequest()
    .get("patients")
    .then((res) => res.data);
};
