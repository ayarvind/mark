import { actionName } from '../actionName';
interface ActionProps {
    type: string;
    payload: {
        color: string;
        style: string;
    };
}
export interface StatusBarProps {
    color: string;
    style: string;
}
const initialState = {
  color: 'transparent',
  style: 'dark',
};

export default function statusBar(state = initialState, action:ActionProps) {
  switch (action.type) {
    case actionName.SET_STATUS_BAR_COLOR:
      return {
        ...state,
        color: action.payload.color,
        style: action.payload.style,
      };
    default:
      return state;
  }
}
