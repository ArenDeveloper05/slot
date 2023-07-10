import { useState } from "react";
import ShiningCrown from "../shining-crown/ShiningCrown";
import "./Home.scss";
import ShiningCrownAnimation from "../shining-crown/shining-crown-animation/ShiningCrownAnimation";
import Bet from "../bet/Bet";
import Balance from "../balance/Balance";

const Home = () => {
  const [balance, setBalance] = useState(1000000);
  const [selectedBet, setSelectedBet] = useState(5000);
  const [animationShow, setAnimationShow] = useState(false);

  return (
    <div className="home">
      <Balance balance={balance} />

      {animationShow && <ShiningCrownAnimation />}

      <ShiningCrown
        balance={balance}
        setBalance={setBalance}
        selectedBet={selectedBet}
        setAnimationShow={setAnimationShow}
        animationShow={animationShow}
      />
      <Bet setSelectedBet={setSelectedBet} selectedBet={selectedBet} />
    </div>
  );
};

export default Home;
