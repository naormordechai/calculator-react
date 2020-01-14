import React, { useState, useRef, useEffect, useReducer } from 'react';
import './App.scss';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import { evaluate } from 'mathjs';
import { OPERATORS_SIGNS } from './constants/operators';
import { NUMS } from './constants/nums';
import HistoryCalc from './components/HistoryCalc/HistoryCalc';


function App() {
  const [value, setValue] = useState('0');
  const [isFinishResult, setIsFinishResult] = useState(false);
  const [isDisplayHistory, setIsDisplayHistory] = useState(false)
  const containerRef = useRef(null);

  const historyListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'DELETE':
        return state.filter(h => h.id !== action.id);
      default:
        return state
    }
  }

  const [historyList, dispatch] = useReducer(historyListReducer, []);

  useEffect(() => {
    containerRef.current.focus();
  }, [isDisplayHistory]);


  const handlerClickNumber = (num) => {
    if (value === '0' || isFinishResult) {
      setValue(num)
    } else {
      setValue(value => value += num);
    }
    setIsFinishResult(false);
  };

  const handlerOperatorSign = (operatorSign) => {
    if (operatorSign === value[value.length - 1]) {
      return;
    } else if (OPERATORS_SIGNS.includes(value[value.length - 1])) {
      let pos = value.lastIndexOf(value[value.length - 1]);
      var res = value.substring(0, pos) + operatorSign;
      setValue(res);

    } else {
      setValue(value => value += operatorSign);
    }
    setIsFinishResult(false);
  };

  const handlerEquel = () => {
    if (OPERATORS_SIGNS.includes(value[value.length - 1])) {
      return;
    };
    dispatch({ type: 'ADD', payload: { id: Math.random(), calc: `${value} = ${evaluate(value)}` } });
    const valueNum = evaluate(value);
    setValue(valueNum.toString());
    setIsFinishResult(true);

  }

  const clearCalc = () => {
    setValue('0');
    setIsFinishResult(false);
    containerRef.current.focus();
  };

  const clearLastNumber = () => {
    if (OPERATORS_SIGNS.includes(value[value.length - 1]) || isFinishResult) {
      return;
    };
    setValue(value => value.substring(0, value.length - 1));
    setIsFinishResult(false);
  };

  const handleKeyboard = (key) => {
    if (isDisplayHistory) return;
    if (NUMS.includes(key)) {
      handlerClickNumber(key);
    } else if (OPERATORS_SIGNS.includes(key)) {
      handlerOperatorSign(key)
    } else if (key === 'Enter' || key === '=') {
      handlerEquel();
    } else if (key === 'Backspace') {
      clearLastNumber()
    }
  };

  const toggleHistoryCalc = () => {
    setIsDisplayHistory(displayHistory => !displayHistory)
  };

  const onDeleteHistory = (id) => {
    dispatch({ type: 'DELETE', id }) 
  };

  return (
    <div ref={containerRef} className="calc-wrapper" onKeyDown={(e) => handleKeyboard(e.key)} tabIndex="0">
      <div className="inner-container">
        <div className="title-section">
          <h2 className="title">CALCULATOR MY SIZE</h2>
          <span>(play with keyboard)</span>
          <button onClick={toggleHistoryCalc} className="btn-history">
            <img src="https://img.icons8.com/material-sharp/16/000000/time-machine.png" alt="time machine" />
          </button>
        </div>
        <div>
          <Input>{value}</Input>
          {isDisplayHistory ?
            <HistoryCalc deleteHistoryHandler={onDeleteHistory} setValueHandler={setValue} historyList={historyList} toggleHistoryCalcHandler={toggleHistoryCalc} />
            : <>
              <div className="flex">
                <Button onClick={() => handlerClickNumber('7')}>7</Button>
                <Button onClick={() => handlerClickNumber('8')}>8</Button>
                <Button onClick={() => handlerClickNumber('9')}>9</Button>
                <Button onClick={() => handlerOperatorSign('/')}>/</Button>
              </div>
              <div className="flex">
                <Button onClick={() => handlerClickNumber('4')}>4</Button>
                <Button onClick={() => handlerClickNumber('5')}>5</Button>
                <Button onClick={() => handlerClickNumber('6')}>6</Button>
                <Button onClick={() => handlerOperatorSign('*')}>X</Button>
              </div>
              <div className="flex">
                <Button onClick={() => handlerClickNumber('1')}>1</Button>
                <Button onClick={() => handlerClickNumber('2')}>2</Button>
                <Button onClick={() => handlerClickNumber('3')}>3</Button>
                <Button onClick={() => handlerOperatorSign('+')}>+</Button>
              </div>
              <div className="flex">
                <Button onClick={() => handlerOperatorSign('.')}>.</Button>
                <Button onClick={() => handlerClickNumber('0')}>0</Button>
                <Button onClick={handlerEquel}>=</Button>
                <Button onClick={() => handlerOperatorSign('-')}>-</Button>
              </div>
              <div className="flex">
                <Button onClick={clearCalc} isClear={true}>CLEAR</Button>
                <Button onClick={clearLastNumber}>
                  <img src="https://img.icons8.com/carbon-copy/25/000000/clear-symbol--v1.png" alt="icon delete" />
                </Button>
              </div>
            </>}
        </div>
      </div>
    </div>
  );
}

export default App;
