import React,{useState} from "react";
import {token} from "../../../declarations/token"


function Faucet() {

  const [txt,setTxt] = useState('Gimme Gimme');
  const [dis,setDis] = useState(false);

  async function handleClick(event) {
    setDis(true);
    setTxt("Loading...");
    const x = await token.payOut();
    setTxt(x);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" disabled={dis} onClick={handleClick}>
          {txt}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
