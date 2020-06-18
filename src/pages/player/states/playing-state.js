import { Utils } from 'wpe-lightning-sdk';
import { PAUSED_STATE, PLAY_PAUSE_TAG, PROGRESS_TAG } from '@/constants';

export const createPlayingState = base =>
  class PlayingState extends base {
    $enter() {
      this.tag(PLAY_PAUSE_TAG).src = Utils.asset('mediaplayer/pause.png');
    }

    _handleEnter() {
      super._handleEnter();
      this._setState(PAUSED_STATE);
    }

    /**
     * Automatically calls on timeupdate.
     *
     * @param {Number} currentTime
     * @param {Number} duration
     */
    $mediaplayerProgress({ currentTime, duration }) {
      this.tag(PROGRESS_TAG).setProgress(currentTime, duration);
    }
  };
