import React, { useState } from 'react';
import './App.css';

const Calculator = () => {
  const [operation, setOperation] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [polygonType, setPolygonType] = useState('');
  const [result, setResult] = useState('');
  const [focusedInput, setFocusedInput] = useState('input1');

  const handleNumberClick = (number) => {
    if (focusedInput === 'input1') {
      setInput1(input1 + number);
    } else {
      setInput2(input2 + number);
    }
  };

  const handleCalculate = () => {
    let res;
    const num1 = parseFloat(input1);
    const num2 = parseFloat(input2);

    switch (operation) {
      case 'add':
        res = num1 + num2;
        break;
      case 'subtract':
        res = num1 - num2;
        break;
      case 'multiply':
        res = num1 * num2;
        break;
      case 'divide':
        res = num1 / num2;
        break;
      case 'sqrt':
        res = Math.sqrt(num1);
        break;
      case 'power':
        res = Math.pow(num1, num2);
        break;
      case 'areaPolygon':
        res = calculatePolygonArea(num1, num2, polygonType);
        break;
      case 'areaCylinder':
        res = Math.PI * Math.pow(num1, 2) * num2;
        break;
      case 'surfaceAreaCylinder':
        res = 2 * Math.PI * num1 * (num1 + num2);
        break;
      default:
        res = 'Invalid operation';
    }

    setResult(res);
  };

  const calculatePolygonArea = (base, height, type) => {
    switch (type) {
      case 'triangle':
        return 0.5 * base * height;
      case 'rectangle':
        return base * height;
      case 'pentagon':
        return (5 / 2) * base * height;
      case 'hexagon':
        return (3 * Math.sqrt(3) / 2) * Math.pow(base, 2);
      case 'octagon':
        return 2 * (1 + Math.sqrt(2)) * Math.pow(base, 2);
      default:
        return 'Invalid polygon type';
    }
  };

  const handleClear = () => {
    setInput1('');
    setInput2('');
    setPolygonType('');
    setResult('');
  };

  const getPlaceholder = (inputNumber) => {
    const placeholders = {
      add: ['Number 1', 'Number 2'],
      subtract: ['Number 1', 'Number 2'],
      multiply: ['Number 1', 'Number 2'],
      divide: ['Number 1', 'Number 2'],
      sqrt: ['Number', ''],
      power: ['Base', 'Exponent'],
      areaPolygon: ['Base/Side Length', 'Height/Apothem'],
      areaCylinder: ['Radius', 'Height'],
      surfaceAreaCylinder: ['Radius', 'Height'],
    };

    return placeholders[operation] ? placeholders[operation][inputNumber - 1] : '';
  };

  return (
    <div className="app">
      <h1>Calculator</h1>
      <div className="calculator">
        <select
          className="operation-select"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="">Select Operation</option>
          <option value="add">Addition (+)</option>
          <option value="subtract">Subtraction (-)</option>
          <option value="multiply">Multiplication (x)</option>
          <option value="divide">Division (/)</option>
          <option value="sqrt">Square Root</option>
          <option value="power">Power of (^)</option>
          <option value="areaPolygon">Area of Polygon</option>
          <option value="areaCylinder">Area of Cylinder</option>
          <option value="surfaceAreaCylinder">Surface Area of Cylinder</option>
        </select>

        {operation === 'areaPolygon' && (
          <select
            className="polygon-select"
            value={polygonType}
            onChange={(e) => setPolygonType(e.target.value)}
          >
            <option value="">Select Polygon</option>
            <option value="triangle">Triangle</option>
            <option value="rectangle">Rectangle</option>
            <option value="pentagon">Pentagon</option>
            <option value="hexagon">Hexagon</option>
            <option value="octagon">Octagon</option>
          </select>
        )}

        <div className="inputs">
          <input
            type="number"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder={getPlaceholder(1)}
            onFocus={() => setFocusedInput('input1')}
          />
          {operation !== 'sqrt' && (
            <input
              type="number"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              placeholder={getPlaceholder(2)}
              onFocus={() => setFocusedInput('input2')}
            />
          )}
        </div>

        <div className="number-buttons">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <button
              key={number}
              onClick={() => handleNumberClick(number.toString())}
            >
              {number}
            </button>
          ))}
          <button className="zero-button" onClick={() => handleNumberClick('0')}>0</button>
        </div>

        <div className="buttons">
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleCalculate}>Calculate</button>
        </div>

        {result !== '' && <div className="result">Result: {result}</div>}
      </div>
    </div>
  );
};

export default Calculator;
