import { Utils } from 'wpe-lightning-sdk';
import { PLAY_PAUSE_TAG, PLAYING_STATE } from '@/constants';

export const createPausedState = base =>
  class PausedState extends base {
    $enter() {
      this.tag(PLAY_PAUSE_TAG).src = Utils.asset('mediaplayer/play.png');
    }

    _handleEnter() {
      super._handleEnter();
      this._setState(PLAYING_STATE);
    }
  };
