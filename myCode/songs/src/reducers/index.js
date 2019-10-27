import { combineReducers } from 'redux';

const songsReducer = () => {
    return [
        { title: 'No Scrubs', duration: '4:05' },
        { title: 'Spaceman', duration: '3:02' },
        { title: 'Zero', duration: '3:25' },
        { title: 'Basketcase', duration: '2:32'}
    ];
};

const selectedSongReducer = (selectedSong=null,action) => {
    if(action.type === 'SONG_SELECTED') {
        return action.payload
    }
    
    return selectedSong;
}

export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer
});