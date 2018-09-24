import React from 'react';
import { Redirect } from 'react-router-dom';

import catalog from '../../../catalog/routes';

const Login = () => <Redirect to={catalog().path} />;


export default Login;
