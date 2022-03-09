export const initialState = null;

export const reducer = (state, action) => {
    console.log(`reducer ka state `+state);
    if (action.type === "USER") {
        console.log(`action payload` + action);
        return action.payload;
    }
    return state;
}