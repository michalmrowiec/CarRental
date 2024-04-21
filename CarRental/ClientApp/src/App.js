import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import {AuthProvider} from 'react-auth-kit';
// import { AuthContext } from './components/auth/AuthContext';


export default class App extends Component {
  static displayName = App.name;
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: sessionStorage.getItem('userRole') !== null,
    };
  }

  render() {
    return (
      <AuthProvider value={this.state.isLoggedIn} 
                  authStorageType={'cookie'}
                  authStorageName={'_auth_t'}
                  authTimeStorageName={'_auth_time'}
                  stateStorageName={'_auth_state'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}>
        <Layout>
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        </Layout>
         </AuthProvider>
    );
  }
}
