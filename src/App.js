import React, {
  Component
} from 'react';
import 'semantic-ui-css/semantic.min.css';
import OrderList from './ConnectedOrderList';
class App extends Component {
  render() {
    return ( <
      div className = "App" >
      <
      OrderList / >
      <
      /div>
    );
  }
}
export default App;