import React from 'react'
import { Route, Switch } from 'react-router-dom';
import HomePosts from './pages/HomePosts';
import UserPage from './pages/UserPage';

const queries = {
    toggle: '(max-width: 930px)',
}

const AppRoutes = () => {


  return (
    <Switch>
        <Route exact path='/'  >
            <HomePosts queries={queries} />
        </Route>
        <Route exact path='/user/:userId' component={UserPage} />
    </Switch>
  )
}



export default AppRoutes