import React from 'react'
import {Outlet , Navigate} from 'react-router-dom'

function privateRoutes() {

    const auth = false;
    if(auth === undefined) return 'loading....';

    return auth === true ? <Outlet/>: <Navigate to='/auth'/>
}

export default privateRoutes