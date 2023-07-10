import "./Balance.scss";

const Balance = ({ balance }) => {
  return (
    <div className="balance">
      <h1>Your Balance</h1>
      <h1>{balance} AMD</h1>
    </div>
  );
};

export default Balance;
