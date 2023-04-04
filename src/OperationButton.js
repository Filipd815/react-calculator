import {ACTIONS} from "./App";

// OperationButton component responsible for handling operation input
const OperationButton = ({dispatch, operation}) => {

    // Render a button with the provided operation as the text
    return <button onClick={() => {
        dispatch({
            type: ACTIONS.CHOOSE_OPERATION,
            payload: {
                operation
            }
        })
    }}>{operation}</button>
}

export default OperationButton;