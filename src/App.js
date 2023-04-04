import './style.css';
import {useReducer} from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

// Define action types for the reducer
export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}

// Reducer function for the calculator
const reducer = (state, {type, payload}) => {
    switch (type) {
        // Add a digit to the current operand
        case ACTIONS.ADD_DIGIT:

            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false
                }
            }

            if (payload.digit === '0' && state.currentOperand === '0') {
                return state;
            }

            if (payload.digit === '.' && state.currentOperand.includes('.')) {
                return state;
            }

            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload.digit}`
            }

        // Choose the operation to perform
        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null) {
                return state
            }

            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                }
            }

            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null
                }
            }

            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null
            }

        // Clear the calculator state
        case ACTIONS.CLEAR:
            return {}

        // Delete the last digit from the current operand
        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null
                }
            }

            if (state.currentOperand == null) return state;

            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: null
                }
            }

            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }

        // Evaluate the current expression
        case ACTIONS.EVALUATE:
            if (state.operation == null ||
                state.currentOperand == null ||
                state.previousOperand == null) {
                return state
            }

            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state)
            }
    }
}

// Function to evaluate the current expression
const evaluate = ({currentOperand, previousOperand, operation}) => {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return '';

    let computation = '';

    switch (operation) {
        case "+":
            computation = prev + current
            break;
        case "-":
            computation = prev - current
            break;
        case "*":
            computation = prev * current
            break;
        case "÷":
            computation = prev / current
            break;
    }

    return computation.toString();
}

// Formatter to display numbers in the calculator
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
})

// Function to format the operand for display
const formatOperand = (operand) => {
    if (operand == null) return;
    const [integer, decimal] = operand.split('.');
    if (decimal == null) return INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

// Main App component
const App = () => {
    const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(
        reducer,
        {}
    );

    // Render the calculator
    return (
        <div className='calculator-grid'>
            <div className='output'>
                <div className='previous-operand'>{formatOperand(previousOperand)} {operation}</div>
                <div className='current-operand'>{formatOperand(currentOperand)}</div>
            </div>
            <button className='span-two'
                    onClick={() => dispatch({type: ACTIONS.CLEAR})}>
                AC
            </button>
            <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>
                DEL
            </button>
            <OperationButton operation='÷' dispatch={dispatch}/>
            <DigitButton digit='1' dispatch={dispatch}/>
            <DigitButton digit='2' dispatch={dispatch}/>
            <DigitButton digit='3' dispatch={dispatch}/>
            <OperationButton operation='*' dispatch={dispatch}/>
            <DigitButton digit='4' dispatch={dispatch}/>
            <DigitButton digit='5' dispatch={dispatch}/>
            <DigitButton digit='6' dispatch={dispatch}/>
            <OperationButton operation='+' dispatch={dispatch}/>
            <DigitButton digit='7' dispatch={dispatch}/>
            <DigitButton digit='8' dispatch={dispatch}/>
            <DigitButton digit='9' dispatch={dispatch}/>
            <OperationButton operation='-' dispatch={dispatch}/>
            <DigitButton digit='.' dispatch={dispatch}/>
            <DigitButton digit='0' dispatch={dispatch}/>
            <button className='span-two'
                    onClick={() => dispatch({type: ACTIONS.EVALUATE})}>
                =
            </button>
        </div>
    );
}

export default App;
