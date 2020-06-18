import { Lightning, Utils, MediaPlayer } from 'wpe-lightning-sdk';
import { createLoadingState, createPausedState, createPlayingState } from '@/pages/player/states';
import { Progress } from '@/pages/player/player.progress';
import { CONTROLS_TAG, MEDIA_PLAYER_TAG, PAUSED_STATE, PLAYING_STATE } from '@/constants';
import { colorMap } from '@/lib';

export default class Player extends Lightning.Component {
  static _template() {
    return {
      MediaPlayer: {
        forceZIndexContext: true,
        type: MediaPlayer
      },
      Overlay: {
        w: 1920,
        rect: true,
        h: 300,
        mountY: 1,
        y: 1080,
        colorTop: colorMap.invisibleBlack,
        colorBottom: colorMap.black
      },
      Controls: {
        alpha: 0,
        x: 100,
        y: 1000,
        PlayPause: {
          src: Utils.asset('mediaplayer/play.png')
        },
        Skip: { x: 50, src: Utils.asset('mediaplayer/skip.png') },
        Progress: {
          type: Progress,
          x: 150,
          y: 7
        }
      }
    };
  }

  _init() {
    this.application.emit('playVideo');
    this.tag(MEDIA_PLAYER_TAG).updateSettings({
      consumer: this
    });
  }

  _focus() {
    this.tag(CONTROLS_TAG).setSmooth('alpha', 1);
  }

  _unfocus() {
    this.tag(CONTROLS_TAG).setSmooth('alpha', 0);
  }

  /**
   * @param {String} src
   * @param {Boolean} loop
   */
  play(src, loop) {
    this.tag(MEDIA_PLAYER_TAG).open(src);
    this.tag(MEDIA_PLAYER_TAG).videoEl.loop = loop;
    this.tag(MEDIA_PLAYER_TAG).videoEl.muted = true;
  }

  stop() {
    this.tag(MEDIA_PLAYER_TAG).close();
  }

  _active() {
    const item = this.item;
    this.play(item.video || item.stream, false);
    this._setState(PLAYING_STATE);
  }

  set item(v) {
    this._item = v;
  }

  get item() {
    return this._item;
  }

  _handleEnter() {
    this.tag(MEDIA_PLAYER_TAG).playPause();
  }

  /**
   * Automatically calla when the mediaplayer pause event is triggered.
   */
  $mediaplayerPause() {
    this._setState(PAUSED_STATE);
  }

  _getFocused() {
    return this.tag(MEDIA_PLAYER_TAG);
  }

  static _states() {
    return [createLoadingState(this), createPlayingState(this), createPausedState(this)];
  }
}
