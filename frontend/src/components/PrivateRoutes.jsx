import {Outlet , Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';

function privateRoutes() {

    const {auth} = useAuth();

    if(auth === undefined) return 'loading....';

    return auth === true ? <Outlet/> : <Navigate to='/auth'/>
}

export default privateRoutes;