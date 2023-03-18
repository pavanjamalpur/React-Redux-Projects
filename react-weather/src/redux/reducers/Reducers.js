import {
  FETCH_WEATHER_DATA_FAILURE,
  FETCH_WEATHER_DATA_REQUEST,
  FETCH_WEATHER_DATA_SUCCESS,
} from "../action-Types/ActionTypes";

export const initialState = {
  weatherData: {},
};

export const Reducers = (state = initialState, action) => {
  // console.log(state)
  console.log(action)
  switch (action.type) {
    case FETCH_WEATHER_DATA_REQUEST:
      return {
        ...state,
      };

    case FETCH_WEATHER_DATA_SUCCESS:
      return {
        ...state,
        weatherData: action.payload,
      };

    case FETCH_WEATHER_DATA_FAILURE:
      return {
        ...state,
        weatherData: {},
      };

    default:
      return state;
  }
};
