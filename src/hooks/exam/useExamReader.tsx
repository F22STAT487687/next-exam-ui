import { useEffect, useState } from "react";
import useContract from "./useExamContract";

const useExamReader = () => {
  const contract = useContract();
  const [examStatus, setExamStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!contract) return;
    let mounted = true;

    const getExamStatus = async () => {
      try {
        const response = await contract.isExamEnabled();

        setExamStatus(response);
      } catch {}
    };

    if (mounted) {
      getExamStatus();
    }

    return () => {
      mounted = false;
    };
  }, [contract]);

  return { examStatus };
};

export default useExamReader;
