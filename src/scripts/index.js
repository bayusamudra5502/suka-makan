import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import AppContainer from './App';
import SkipToContent from './components/SkipToContent';
import RouteDictionary from './lib/RouteDictionary';

const RouterDictObj = new RouteDictionary();

document.body
  .appendChild(new SkipToContent())
  .appendChild(new AppContainer(RouterDictObj));
