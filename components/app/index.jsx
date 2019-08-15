import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import { Skeleton } from 'antd'
import './index.less'

function BasicExample() {
    return (
        <Router>
            <div>
                <ul className='h-ul'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/topics'>Topics</Link>
                    </li>
                </ul>

                <hr />

                <Route exact path='/' component={Home} />
                <Route path='/about' component={About} />
                <Route path='/topics' component={Topics} />
            </div>
        </Router>
    )
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
            <Skeleton />
        </div>
    )
}

function About() {
    return (
        <div>
            <h2>About</h2>
            <Skeleton />
        </div>
    )
}

function Topics({ match }) {
    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${match.url}/rendering`}>
                        Rendering with React
                    </Link>
                </li>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>
                        Props v. State
                    </Link>
                </li>
            </ul>

            <Route path={`${match.path}/:topicId`} component={Topic} />
            <Route
                exact
                path={match.path}
                render={() => <h3>Please select a topic above.</h3>}
            />
        </div>
    )
}

function Topic({ match }) {
    return (
        <div>
            <h3>{match.params.topicId}</h3>
            <Skeleton />
        </div>
    )
}

export default hot(BasicExample)
