import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap"

actor Token{

    var owner : Principal = Principal.fromText("sxot3-enfnf-cmsbu-gmqnb-mbzo2-2imed-vu3fh-tzfgy-jwjlg-ce7qi-vqe");

    var totalSupply : Nat = 1000000000;
    var symbol : Text = "DJAY Coin XX";

    private stable var balanceEnteries : [(Principal,Nat)] = [];
    private var balances = HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);

    balances.put(owner,totalSupply);

    public query func getBalance(id:Principal) : async Nat{
        var x  = switch (balances.get(id)){
            case null 0;
            case (?result) result;
        };

        return x;
    };
    
    public shared(msg) func payOut() : async Text {
        let x : Principal = msg.caller;
        var y = switch (balances.get(x)){
            case null 0;
            case (?res) res;
        };

        var z:Nat= await getBalance(owner);

        if(x == owner){
            return ("You Are The Owner");
        };

        if(y==0){
            let m: Nat = z-10000;
            balances.put(x,10000);
            balances.put(owner,m);
            return("Success");
        };

        return ("Already Claimed");
    };

    public shared(msg) func transfer(to : Principal, amount : Nat) : async Text {
        let toId : Principal = to;
        let fromId : Principal = msg.caller;

        let fromBalance : Nat = await getBalance(fromId);
        let toBalance : Nat = await getBalance(toId);

        if(fromBalance > amount){
            let newFromBalance : Nat = fromBalance - amount;
            let newToBalance : Nat = toBalance + amount;
            balances.put(toId,newToBalance);
            balances.put(fromId,newFromBalance);
            return("Success");
        }
        
        else{
            return ("Not Enough Balance");
        }

    };

    system func preupgrade() {
        balanceEnteries:= Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal,Nat>(balanceEnteries.vals(),1,Principal.equal,Principal.hash);
        if(balances.size() < 1){
            balances.put(owner,totalSupply);
        }
    }
}