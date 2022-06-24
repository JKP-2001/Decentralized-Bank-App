import React,{useState} from "react";
import {token} from "../../../declarations/token";
import {Principal} from "@dfinity/principal";

function Transfer() {

  const [account,setAccount] = useState("");
  const [amount,setAmount] = useState("0");
  const [disable,setDisable] = useState(false);
  const [status,setStatus] = useState("");
  const [button,setButton] = useState("Transfer");
  
  async function handleClick() {
    setDisable(true);
    setButton("Processing...");
    const x = await token.transfer(Principal.fromText(account),parseInt(amount));
    setDisable(false);
    setButton("Transfer");
    setStatus(x);
    setAccount("");
    setAmount("0");
  }


  


  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={account}
                onChange = {(e)=>setAccount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange ={(e)=>setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={disable} >
            {button}
          </button>
        </p>
        <p>{status}</p>
      </div>
    </div>
  );
}

export default Transfer;
