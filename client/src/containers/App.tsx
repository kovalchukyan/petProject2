import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Main from '../components/Main/Main';
import Login from '../components/Login/Login';
import Contacts from '../components/ContactsList/Contacts';
import ContactCreate from '../components/ContactCreate/ContactCreate';

const App: React.FC = () => {
  return (
    <div className="app">
        <Sidebar />
        <div className="main">
            <Header />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" exact component={Login} />
                <Route path="/list" exact component={Contacts} />
                <Route path="/create" exact component={ContactCreate} />
            </Switch>
        </div>
    </div>
  );
};

export default App;
