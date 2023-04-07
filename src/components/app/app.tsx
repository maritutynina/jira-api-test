import './app.scss';
import { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { NotFoundPage } from 'src/pages/not-found';
import packageInfo from '../../../package.json';
const version = packageInfo.version;

import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

const App: FC = () => {
    return <div className="container w-100 h-100">
        <Router>
            <Switch>
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
        <div className="version">{version}</div>
    </div>;
};

export default hot(App);
