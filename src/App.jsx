import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from './cmps/Header.jsx';
import { Favorites } from './pages/Favorites.jsx';
import { WeatherApp } from './pages/WeatherApp.jsx';
import background from './assets/img/background.jpeg';
import cluodNight from './assets/img/cluodNight.jpeg';
import { useSelector } from 'react-redux';
export function App() {
  const { isLight } = useSelector((state) => state.weatherReducer);

  const style = {
    backgroundImage: `url(${isLight ? background : cluodNight})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  };
  return (
    <div className={`App`} style={style}>
      <Router>
        <Header />
        <Switch>
          <Route path='/favorites' component={Favorites} />
          <Route path='/' component={WeatherApp} />
        </Switch>
      </Router>
    </div>
  );
}
