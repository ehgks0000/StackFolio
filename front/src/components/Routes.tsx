import Header from 'components/sections/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from 'components/home/Home';
import Playground from './Playground';
import React from 'react';
import Search from './search/Search';
import Tags from './tags/Tags';
import TagDetail from './tags/TagDetail';
import QuestionDetails from './questions/QuestionDetails';
import Questions from './questions/Questions';
import SearchHome from './search/SearchHome';
import Profile from './profile/Profile';
// TODO: TEST COMPONENTS
import TestComponent1 from './TestComponent1'
import TestComponent2 from './TestComponent2'

const Routes = () => {
    return(
    // <BrowserRouter>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Switch>
            <Route path="/playground" exact component={Playground} />
            <Route path="/" exact component={Home} />
            <Route path="/@:id" component={Profile} />
            <Route exact path="/search" component={SearchHome} />
            <Route path="/search/:keyword" component={Search} />
            <Route exact path="/tags" component={Tags} />
            <Route path="/tags/:id" component={TagDetail} />
            <Route exact path="/questions" component={Questions} />
            <Route path="/questions/:id" component={QuestionDetails} />
            {/* TODO: 테스트 컴포넌트 */}
            <Route path="/register" component={TestComponent1} />
            <Route path="/verify" component={TestComponent2} />
        </Switch>
    </BrowserRouter>
    )
}

export default Routes;