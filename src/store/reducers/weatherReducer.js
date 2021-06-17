const initialState = {
    activeCity: null,
    favorites: [],
    msg: '',
    isLight: true
}

export function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ACTIVE_CITY':
            return { ...state, activeCity: action.city }
        case 'SET_FAVORITES':
            return { ...state, favorites: action.favoritesList }
        case 'SET_MSG':
            return { ...state, msg: action.msg }
        case 'CHANGE_COLORS':
            return { ...state, isLight: action.boolean }
        default:
            return state;
    }
}