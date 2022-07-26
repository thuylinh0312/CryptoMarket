const initialState = {
    url: "",
    name: "",
};
const updateProfileFirebase = (state = initialState, action) => {
    switch(action.type) {

        case 'UPLOAD_IMAGE':
            return {
                ...state,
                url: action.path
            }
        case 'UPDATE_DISPLAY_NAME':
             return {
                ...state,
                name: action.str
            }
            
        default:
            return state;
    }
}
export default updateProfileFirebase;