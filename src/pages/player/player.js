import { Lightning, Utils, MediaPlayer } from 'wpe-lightning-sdk';

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
        colorTop: 0x00000000,
        colorBottom: 0xff000000
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
    this.tag('MediaPlayer').updateSettings({
      consumer: this
    });
  }

  _focus() {
    this.tag('Controls').setSmooth('alpha', 1);
  }

  _unfocus() {
    this.tag('Controls').setSmooth('alpha', 0);
  }

  /**
   * @param {String} src
   * @param {Boolean} loop
   */
  play(src, loop) {
    this.tag('MediaPlayer').open(src);
    this.tag('MediaPlayer').videoEl.loop = loop;
    this.tag('MediaPlayer').videoEl.muted = true;
  }

  stop() {
    this.tag('MediaPlayer').close();
  }

  _active() {
    const item = this.item;
    this.play(item.video || item.stream, false);
    this._setState('PlayingState');
  }

  set item(v) {
    this._item = v;
  }

  get item() {
    return this._item;
  }

  _handleEnter() {
    this.tag('MediaPlayer').playPause();
  }

  /**
   * This will be automatically called when the mediaplayer pause event is triggered
   */
  $mediaplayerPause() {
    this._setState('PausedState');
  }

  _getFocused() {
    return this.tag('MediaPlayer');
  }

  static _states() {
    return [
      class LoadingState extends this {},
      class PlayingState extends this {
        $enter() {
          this.tag('PlayPause').src = Utils.asset('mediaplayer/pause.png');
        }

        _handleEnter() {
          super._handleEnter();
          this._setState('PausedState');
        }

        /**
         * This will be automatically called on timeupdate
         * @param currentTime
         * @param duration
         */
        $mediaplayerProgress({ currentTime, duration }) {
          this.tag('Progress').setProgress(currentTime, duration);
        }
      },
      class PausedState extends this {
        $enter() {
          this.tag('PlayPause').src = Utils.asset('mediaplayer/play.png');
        }

        _handleEnter() {
          super._handleEnter();
          this._setState('PlayingState');
        }
      }
    ];
  }
}

class Progress extends Lightning.Component {
  static _template() {
    return {
      Bar: {
        rect: true,
        color: 0x20ffffff,
        h: 10,
        w: 1500
      },
      Time: {
        y: -40,
        text: { text: '', fontSize: 24, fontFace: 'SourceSansPro-Regular' }
      },
      Duration: {
        rect: true,
        color: 0xffffffff,
        h: 10
      }
    };
  }

  setProgress(currentTime, duration) {
    this._currentTime = currentTime;
    this._duration = duration;

    const durationResult = currentTime / Math.max(duration, 1);
    const timeResult = `${Math.round(currentTime / 60)} : ${Math.round(currentTime)} / ${Math.round(
      duration / 60
    )} : ${Math.round(duration)}`;
    this.tag('Time').patch({
      text: {
        text: timeResult
      }
    });
    this.tag('Duration').setSmooth('w', durationResult * 1500, { timingFunction: 'linear' });
  }
}
