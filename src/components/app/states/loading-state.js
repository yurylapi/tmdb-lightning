import { LOADING_TAG } from '@/constants';

export const createLoadingState = base =>
  class Loading extends base {
    $enter() {
      this.tag(LOADING_TAG).visible = true;
    }

    $exit() {
      this.tag(LOADING_TAG).visible = false;
    }
  };
