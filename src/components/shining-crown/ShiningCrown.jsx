import React, { useEffect, useRef, useState } from "react";
import "./ShiningCrown.scss";
// ICONS
import sevenIcon from "../../assets/images/7.png";
import bananaIcon from "../../assets/images/banana.png";
import gilasIcon from "../../assets/images/gilas.png";
import limonIcon from "../../assets/images/limon.png";
import salorIcon from "../../assets/images/salor.png";
import barIcon from "../../assets/images/bar.png";
import orangeIcon from "../../assets/images/orange.png";
import watermelonIcon from "../../assets/images/watermelon.png";
import bigwinIcon from "../../assets/images/bigwin.png";

const initialData = [
  [
    { id: 1, imageIDX: 0 },
    { id: 2, imageIDX: 1 },
    { id: 3, imageIDX: 2 },
    { id: 4, imageIDX: 3 },
    { id: 5, imageIDX: 3 },
  ],
  [
    { id: 6, imageIDX: 5 },
    { id: 7, imageIDX: 4 },
    { id: 8, imageIDX: 0 },
    { id: 9, imageIDX: 2 },
    { id: 10, imageIDX: 8 },
  ],
  [
    { id: 11, imageIDX: 1 },
    { id: 12, imageIDX: 1 },
    { id: 13, imageIDX: 4 },
    { id: 14, imageIDX: 2 },
    { id: 15, imageIDX: 7 },
  ],
];
const ShiningCrown = ({
  balance,
  setBalance,
  selectedBet,
  setAnimationShow,
  animationShow,
}) => {
  const iconsAndData = useRef({
    icons: [
      sevenIcon,
      bananaIcon,
      gilasIcon,
      limonIcon,
      salorIcon,
      barIcon,
      orangeIcon,
      watermelonIcon,
      bigwinIcon,
    ],
  });
  const [fields, setFields] = useState(initialData);
  const [wins, setWins] = useState([]);

  const startSpin = () => {
    setAnimationShow(true);
    const sound = new Audio("/slot1.mp3");
    sound.play();
    setWins((prev) => {
      if (prev.length !== 0) {
        return [];
      }
      return prev;
    });

    setFields((prev) => {
      const newData = prev.map((item) => {
        return item.map((obj) => {
          return {
            ...obj,
            imageIDX: Math.floor(Math.random() * 9),
          };
        });
      });
      console.log(newData);
      const winResults = howManyWins(newData);
      setTimeout(() => {
        setAnimationShow(false);
        if (winResults.length !== 0) {
          const winSound = new Audio("/slot-winning.wav");
          winSound.play();
          setWins(winResults);
          setBalance((prev) => {
            return prev + selectedBet * 3;
          });
        }
      }, 550);

      return newData;
    });
    if (balance < selectedBet) {
      alert("You dont have money");
      return;
    } else {
      setBalance((prev) => {
        return prev - selectedBet;
      });
    }
  };

  function howManyWins(arr) {
    const wins = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 2; j < arr[i].length; j++) {
        if (
          arr[i][j].imageIDX === arr[i][j - 1].imageIDX &&
          arr[i][j - 1].imageIDX === arr[i][j - 2].imageIDX
        ) {
          wins.push(arr[i][j]);
          wins.push(arr[i][j - 1]);
          wins.push(arr[i][j - 2]);
        }
        // if (i - 2 >= 0 && i - 1 >= 0) {
        //   if (
        //     arr[i][j].imageIDX === arr[i - 1][j].imageIDX &&
        //     arr[i - 1][j].imageIDX === arr[i - 2][j].imageIDX
        //   ) {
        //     wins.push(arr[i][j]);
        //     wins.push(arr[i - 1][j]);
        //     wins.push(arr[i - 2][j]);
        //   }
        //   console.log(arr[i - 1][j].imageIDX);
        // }
        // if (arr[i][j].imageIDX === 4) {
        // }
      }
    }

    return wins;
  }

  function checkWinnerItem(wins, id) {
    let isWinner = false;
    for (let i = 0; i < wins.length; i++) {
      if (wins[i].id === id) {
        isWinner = true;
        break;
      }
    }
    return isWinner;
  }

  useEffect(() => {
    console.log(wins);
  }, [wins]);

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.keyCode === 13) {
        startSpin();
      }
    }
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <div
      className="shining-crown"
      style={{ display: animationShow ? "none" : "flex" }}
    >
      {fields &&
        fields.map((item, i) => {
          return (
            <React.Fragment key={i}>
              {item.map(({ id, imageIDX }) => {
                return (
                  <div
                    className="shining-crown-item"
                    key={id}
                    style={{
                      border: checkWinnerItem(wins, id)
                        ? "16px solid red"
                        : "none",
                    }}
                  >
                    <img
                      src={iconsAndData.current.icons[imageIDX]}
                      alt="crown-item"
                    />
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      <button onClick={startSpin}>Spin</button>
    </div>
  );
};

export default ShiningCrown;
