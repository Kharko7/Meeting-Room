import { useLayoutEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/toolkitHooks';
import { userLoginSuccess, setLoading } from 'redux&saga/slices/user.slice';
import { getFromLocalStorage } from 'services/local-storage.service';
import AppRouter from './routes/routes';

const App = () => {
    const dispatch = useAppDispatch()
    const { loading, userRole } = useAppSelector((state) => state.user);
    useLayoutEffect(() => {
        const token = getFromLocalStorage('token')
        token
            ? dispatch(userLoginSuccess(token))
            : dispatch(setLoading(false))
    }, [dispatch])

    return (
        <AppRouter role={userRole} loading={loading}/>
    );
};

export default App;


