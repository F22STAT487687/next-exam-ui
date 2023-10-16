import { Contract } from "ethers";
import { useMemo } from "react";
import { IWeb3Context, useWeb3Context } from "../../context/Web3Context";
import ABI from "../../abis/Put.json";

const address = "0x5Fd590c24fE89059649c3c35540CCc4A24A90765";

const usePutContract = () => {
  const { state } = useWeb3Context() as IWeb3Context;

  return useMemo(
    () => state.signer && new Contract(address, ABI, state.signer),
    [state.signer]
  );
};

export default usePutContract;
