import { combineReducers } from 'redux';
import { AudioReducer } from './audioReducer';
import { AuthReducer } from './authReducer';
import { ForgotReducer } from './forgotReducer';
import { LyricsReducer } from './lyricsReducer';
import { ResultReducer } from './resultReducer';
import { SearchReducer } from './searchReducer';
import { ResetReducer } from './resetReducer';
import { VideoReducer } from './videoReducer';

const RootReducer = combineReducers({
    auth: AuthReducer,
    result: ResultReducer,
    video: VideoReducer,
    audio: AudioReducer,
    lyrics: LyricsReducer,
    search: SearchReducer,
    forgot: ForgotReducer,
    reset: ResetReducer
});

export { RootReducer };
