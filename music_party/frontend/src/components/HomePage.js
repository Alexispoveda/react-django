import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'

import JoinRoomPage from './JoinRoomPage'
import CreateRoomPage from './CreateRoomPage'
import Room from './Room'

export default class HomePage extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return( 
            <Router>
                <Switch>
                    <Route exact path='/'><p>This is the homepage</p></Route>
                    <Route path='/join' component={JoinRoomPage}/>
                    <Route path='/create' component={CreateRoomPage}/>
                    <Route path='/room/:roomCode' component={Room}/>
                </Switch>
            </Router>
        )
    }
}