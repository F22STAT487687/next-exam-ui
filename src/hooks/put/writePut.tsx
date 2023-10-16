import { useState } from "react";
import usePutContract from "./usePutContract";

const writePut = () => {
  const contract = usePutContract();
  const [loading, setLoading] = useState(false);

  const put = async (message: string) => {
    if (!contract) return;

    setLoading(true);

    try {
      const transaction = await contract.put(message);

      await transaction.wait();
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return { put, loading };
};

export default writePut;
