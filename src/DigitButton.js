import {ACTIONS} from "./App";

// DigitButton component responsible for handling digits input
const DigitButton = ({dispatch, digit}) => {

    // Render a button with the provided digit as the text
    return <button onClick={() => {

        // On button click, dispatch the ADD_DIGIT action with the provided digit as payload
        dispatch({
            type: ACTIONS.ADD_DIGIT,
            payload: {
                digit
            }
        })
    }}>{digit}</button>
}

export default DigitButton;