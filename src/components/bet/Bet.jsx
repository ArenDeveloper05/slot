import "./Bet.scss";

const Bet = ({ setSelectedBet, selectedBet }) => {
  return (
    <div className="bet">
      <span>Your Bet</span>
      <input
        type="number"
        value={selectedBet}
        onChange={(e) => {
          setSelectedBet(Number(e.target.value));
        }}
      />
    </div>
  );
};

export default Bet;
