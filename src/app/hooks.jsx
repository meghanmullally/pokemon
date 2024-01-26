import { useDispatch, useSelector } from 'react-redux';

// This function returns a reference to the `dispatch` function and can be used throughout your app.
export const useAppDispatch = () => useDispatch();

// This constant is a direct export of the `useSelector` hook.
// You can use it throughout your app to select data from the Redux store state.
export const useAppSelector = useSelector;
