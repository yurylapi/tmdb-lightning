import { Lightning } from 'wpe-lightning-sdk';
import { DURATION_TAG, SOURCE_SANS_PRO_REGULAR, TIME_TAG } from '@/constants';
import { colorMap } from '@/lib';

export class Progress extends Lightning.Component {
  static _template() {
    return {
      Bar: {
        rect: true,
        color: colorMap.hiddenWhite,
        h: 10,
        w: 1500
      },
      Time: {
        y: -40,
        text: { text: '', fontSize: 24, fontFace: SOURCE_SANS_PRO_REGULAR }
      },
      Duration: {
        rect: true,
        color: colorMap.white,
        h: 10
      }
    };
  }

  /**
   * @param {Number} currentTime
   * @param {Number} duration
   */
  setProgress(currentTime, duration) {
    this._currentTime = currentTime;
    this._duration = duration;

    const durationResult = currentTime / Math.max(duration, 1);
    const timeResult = `${Math.round(currentTime / 60)} : ${Math.round(currentTime)} / ${Math.round(
      duration / 60
    )} : ${Math.round(duration)}`;
    this.tag(TIME_TAG).patch({
      text: {
        text: timeResult
      }
    });
    this.tag(DURATION_TAG).setSmooth('w', durationResult * 1500, { timingFunction: 'linear' });
  }
}
