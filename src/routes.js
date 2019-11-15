import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Dash from './components/Dash/Dash'
import Form from './components/Form/Form'
import Post from './components/Post/Post'

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/dashboard' component={Dash} />
        <Route path='/post/postid' component={Post} />
        <Route path='/new' component={Form} />
    </Switch>
)