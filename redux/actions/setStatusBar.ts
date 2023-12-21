import { actionName } from "../actionName";
export default function setStatusBar(payload: any) {
    return {
      type: actionName.SET_STATUS_BAR_COLOR,
      payload: payload,
    };
  }
  