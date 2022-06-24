import React,{useState} from "react";
import {token} from "../../../declarations/token"
import {Principal} from "@dfinity/principal"
function Balance() {

  const [principal,setPrincipal] = useState("");
  const [balance,setBalance] = useState("0");
  const [hidden, isHidden] = useState(false);
  
  async function handleClick() {
   const x = await token.getBalance(Principal.fromText(principal));
   setBalance(x.toLocaleString());
   isHidden(true);
  }

  const change = (e)=>{
    setPrincipal(e.target.value);
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          value = {principal}
          placeholder="Enter a Principal ID"
          onChange = {change}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      {hidden && <p>This account has a balance of {balance} Dang.</p>}
    </div>
  );
}

export default Balance;
