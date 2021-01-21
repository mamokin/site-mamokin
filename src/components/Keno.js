import React, { useState, useEffect } from 'react';

import { Chance } from 'chance';
const chance = new Chance();

/*
Keno cards have 8 rows of numbers with 10 numbers in each row.
Each row starts from the value of the last row + 1
*/
export default function Keno() {
  const [kb, setKb] = useState([]);
  const [picked, setPicked] = useState([]);
  const [pickLimit] = useState(10);
  const [maxPricePerGame] = useState(20);
  const [qpNum, setQPNum] = useState();
  const [winningDraw, setWinningDraw] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [boardOptions, setBoardOptions] = useState({
    totalAmount: 0,
    pricePer: 0,
    numGames: 0
  });

  useEffect(() => {
    let newKb = [];
    let add = 1;
    // init rows of Keno board
    for (let r = 0; r < 8; r++) {
      newKb.push([]);
    }

    // populate Keno board
    for (let r = 0; r < newKb.length; r++) {
      for (let x = 1; x <= 10; x++) {
        newKb[r].push(add);
        add++;
      }
    }

    setKb(newKb);
  }, []);

  /**
   * Finish the game.
   * - disable the board
   * - generate winning numbers
   * - show winnint numbers
   */
  const finGetWin = () => {
    setDisabled(true);
    showWinningDraw();
  };

  /**
   * Generate NPC games.
   */
  const genNPC = () => {
    // generate dummy data for other players
    let players = [];
    const n = chance.integer({ min: 10, max: 20 });
    for (let i = 0; i < n; i++) {
      players.push([]);
    }
    for (let y = 0; y < players.length; y++) {
      players[y].push(
        chance.unique(chance.natural, pickLimit, { min: 1, max: 80 })
      );
    }
    return players;
  };

  // eslint-disable-next-line no-unused-vars
  const calcWinnings = () => {
    const npcs = genNPC(); // eslint-disable-line
    // calc flat winnings for each npc

    // calc flat winnings for client

    // calc actual winnings
  };

  /**
   * GUI Utility.
   * Generate and display the winning Keno spots.
   */
  const showWinningDraw = () => {
    // generate a winning draw
    const d = chance.unique(chance.natural, pickLimit, { min: 1, max: 80 });
    // set the winning spots
    setWinningDraw(d);
  };

  /**
   * GUI Form Utility.
   * QuikPik: auto select a draw of numbers of length `n`.
   * @param {event} e - Click event.
   */
  const quikPik = e => {
    e.preventDefault();
    // determine to use default pickLimit or user defined qpNum.
    let num = qpNum ? qpNum : pickLimit;
    const d = chance.unique(chance.natural, num, { min: 1, max: 80 });
    setPicked(d);
    setDisabled(true);
  };

  /**
   * GUI Form Utility.
   * Process changes to QuikPik form.
   * @param {event} e - Click event.
   */
  const handleChange = e => {
    e.preventDefault();
    if (e.target.value > pickLimit) setQPNum(pickLimit);
    else setQPNum(e.target.value);
  };

  /**
   * GUI Form Utility.
   * Process clicked elements within the Keno game board.
   * @param {event} e - Click event
   * @param {number} val - The cell that was clicked within the Keno game board
   */
  const addPicked = (e, val) => {
    e.preventDefault();
    // guard check limit met
    if (picked.length < pickLimit) {
      let nPicked = picked.slice(0);

      nPicked.push(val);
      setPicked(nPicked);

      // disable the clicked item
      e.currentTarget.className += ' picked';

      // check new length for should disable
      if (nPicked.length === pickLimit) {
        setDisabled(true); // submit required to generate other data
      }
    }
  };

  /**
   * GUI Form Utility.
   * Process changes to price per game input field.
   * @param {event} e - Click event
   */
  const handlePricePerGame = e => {
    e.preventDefault();
    let val = e.target.value
      .trim()
      .replace(/[A-Za-z]/g, '')
      .replace(/,/g, '');

    if (val > maxPricePerGame) val = maxPricePerGame;

    setBoardOptions({
      ...boardOptions,
      pricePer: val,
      totalAmount: formatCurrency(boardOptions.numGames * val)
    });
  };

  /**
   * GUI Utility.
   * Process changes to number of games input field.
   * @param {event} e - Click event
   */
  const handleNumGamesChange = e => {
    e.preventDefault();
    let val = e.target.value;

    setBoardOptions({
      ...boardOptions,
      numGames: val,
      totalAmount: boardOptions.pricePer * val
    });
  };

  /**
   * GUI Utility.
   * Format a string input to a NA currency format (0.00).
   * @param {string|number} num - String input
   */
  const formatCurrency = num => {
    if (!num) num = '';

    if (typeof num === 'number') {
      num = num.toString();
    }

    let value = num.trim().replace(/,/g, '');

    while (value.substring(0, 2) === '00') {
      value = value.substring(1);
    }

    if (value[0] === '.') {
      value = '0' + value;
    } else if (value.length) {
      let n = Number(value);

      if (isNaN(n)) {
        value = parseFloat(value);

        if (isNaN(value)) {
          return '';
        }
      }

      let parts = (value + '').split('.');
      value = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      if (parts.length > 1) {
        value += '.' + parts[1];
      }
    }

    return value;
  };

  /**
   * Render Helper.
   * Display a number `n`.
   * @param {number} n - The number (from and array iteration) to display
   */
  const renderNum = n => {
    return (
      <span className='numbers__your-num' key={n}>
        {n + ' '}
      </span>
    );
  };

  /**
   * Render Helper.
   * Builds the HTML/JSX required to render the winning numbers.
   */
  const renderWinningDraw = () => {
    return winningDraw.length > 0 ? (
      <div className='numbers__your'>
        <h3>Winning Numbers</h3>
        {winningDraw.map(n => renderNum(n))}
      </div>
    ) : null;
  };

  /**
   * Render helper.
   * Builds the HTML/JSX required to render the options available for the Keno game.
   * 'Fake' form.
   */
  const renderOptions = () => {
    return (
      <div className='options'>
        <label htmlFor='options__price-per'>Price per Game:</label>
        <input
          type='text'
          id='options__price-per'
          name='options__price-per'
          onChange={handlePricePerGame}
          onBlur={handlePricePerGame}
          placeholder={1}
          value={formatCurrency(boardOptions.pricePer)}
        />
        <label htmlFor='options__num-games'>Number of Games:</label>
        <input
          type='number'
          id='options__num-games'
          name='options__num-games'
          min={1}
          max={100}
          onChange={handleNumGamesChange}
          onBlur={handleNumGamesChange}
          placeholder={1}
          value={boardOptions.numGames}
        />
        <p>Total Price: ${boardOptions.totalAmount}</p>
        <button
          disabled={picked.length === 0 || boardOptions.totalAmount === 0}
          className='submit__card'
          onClick={finGetWin}
        >
          Submit
        </button>
      </div>
    );
  };

  /**
   * Render helper.
   * Builds the HTML/JSX required to render the Keno board.
   * Additional check made here to 'x' the cell for when QuikPik is used.
   */
  const renderBoard = () => {
    return (
      <>
        <div className={`board ${disabled ? 'disabled' : ''}`}>
          <div className='board__card'>
            {kb.map(row => (
              <div className='row' key={row}>
                {row.map(col =>
                  picked.indexOf(col) !== -1
                    ? (<div className='col picked' key={col} />)
                    : (
                      <div
                        className='col'
                        key={col}
                        onClick={e => addPicked(e, col)}
                        value={col}
                      >
                        {renderNum(col)}
                      </div>
                    )
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  /**
   * Render helper.
   * Conditionally builds the HTML/JSX required to render the QuikPik form.
   * If the end user has not selected any Keno spots manually, this form will display.
   *
   * Allows user to pick a number less than or equal to the `pickLimit` which will be
   * the number of Keno spots to generate using our selected RNG
   */
  const showQuikPik = () => {
    return (
      <>
        {picked.length === 0 ? (
          <form className='quik-pik' onSubmit={quikPik}>
            <label htmlFor='quik-pik-limit'>How many numbers?</label>
            <input
              type='number'
              id='quik-pik-limit'
              name='quik-pik-limit'
              min={1}
              max={pickLimit}
              onChange={handleChange}
              onBlur={handleChange}
              placeholder={pickLimit}
              value={qpNum}
            />
            <input className='submit__quick-pick' type='submit' value='Quik Pik' />
          </form>
        ) : null}
      </>
    );
  };

  /**
   * Render helper.
   * Builds the HTML/JSX required to render the end users selected Keno spots.
   */
  const renderYourNumbers = () => {
    return (
      <div className='numbers__your'>
        <h3>
          Your Numbers: {picked.length}/{pickLimit}
        </h3>
        {picked.map(n => renderNum(n))}
      </div>
    );
  };

  /**
   * Render helper.
   * Builds the HTML/JSX required to render the end users Keno spots that match the winning Keno spots.
   */
  const renderMatchingWins = () => {
    const matches = picked.filter(n => winningDraw.indexOf(n) > 0);
    const matchCount = matches.length;
    return (
      <>
        {winningDraw.length > 0 ? (
          <div className='numbers__matching'>
            <h3>Matches: {matchCount}</h3>
            {matches.map(n => renderNum(n))}
          </div>
        ) : null}
      </>
    );
  };

  /**
   * Render helper.
   * Builds the HTML/JSX required to render the statistics section of the application.
   * The following are built:
   * - end users Keno spots
   * - the winning Keno spots
   * - the Keno spots the end user guessed that exist within the winning Keno spots
   */
  const renderNumbers = () => {
    return (
      <div className='numbers'>
        {renderYourNumbers()}

        {renderWinningDraw()}

        {renderMatchingWins()}
      </div>
    );
  };

  return (
    <>
      <h1>Chance Keno</h1>
      <p>
        Pick up to {pickLimit} Keno spots by clicking on the number in the Keno
        card or choose Quik Pik (defaults to {pickLimit} numbers).
      </p>
      {/* <p>
        This is not a real Keno so we will generate some games in the
        background. There will be anywhere from 10 to 20 other players who may
        or may not have bought more than one card.
      </p> */}
      <div className='keno'>
        <div>
          {showQuikPik()}
          {renderNumbers()}
        </div>
        {renderBoard()}

        {renderOptions()}
      </div>
    </>
  );
}