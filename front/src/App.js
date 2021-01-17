import './index.scss';
import 'alertifyjs/build/css/alertify.css';
import { Container } from '@material-ui/core';
import Header from './components/Header';
import Modals from './modals';
import AppRoutes from './AppRoutes';




const App = () => {
  return (
    <Container maxWidth="md">
      <Header></Header>
      <AppRoutes></AppRoutes>
      <Modals />
    </Container>
    
  );
}

export default App;
