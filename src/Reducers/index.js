import {combineReducers} from 'redux';
import searchResultReducer from './SearchResultReducer';
import searchTitleReducer from './SearchTitleReducer';

const allReducers = combineReducers({
    searchResult: searchResultReducer,
    searchTitle: searchTitleReducer
});

export default allReducers;