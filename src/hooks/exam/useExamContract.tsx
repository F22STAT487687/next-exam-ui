import { Contract } from "ethers";
import { useMemo } from "react";
import { IWeb3Context, useWeb3Context } from "../../context/Web3Context";
import ABI from "../../abis/Exam.json";

const address = "0x0C567D3734aC0d5653E2aAC504F1A9053a6d64CB";

const useExamContract = () => {
  const { state } = useWeb3Context() as IWeb3Context;

  return useMemo(
    () => state.signer && new Contract(address, ABI, state.signer),
    [state.signer]
  );
};

export default useExamContract;
