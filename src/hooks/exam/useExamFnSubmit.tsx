import { useState } from "react";
import useContract from "./useExamContract";

const useSubmitFn = () => {
  const contract = useContract();
  const [submitStatus, setSubmitStatus] = useState(false);

  const submit = async (num: number, ans: string) => {
    if (!contract) return;

    setSubmitStatus(true);

    try {
      const transaction = await contract.submitAnswer(num, ans);

      await transaction.wait();
    } catch {
    } finally {
      setSubmitStatus(false);
    }
  };

  return { submit, submitStatus };
};

export default useSubmitFn;
