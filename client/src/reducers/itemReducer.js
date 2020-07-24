import { GET_ITEMS, DELETE_ITEMS, ADD_ITEMS, ITEMS_LOADING } from '../actions/types';

const initialState = {
	items: [],
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ITEMS:
			return {
				...state,
				items: action.payload,
				loading: false
			};
		case ADD_ITEMS:
			return {
				...state,
				items: [ action.payload, ...state.items ]
			};
		case DELETE_ITEMS:
			console.log('Items going to be deleted');
			return {
				...state,
				items: state.items.filter((item) => item._id !== action.payload)
			};
		case ITEMS_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
