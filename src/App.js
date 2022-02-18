import './App.css';
import './styles/districtingModal.css';
import './styles/graphModal.css';
import { AddDistricting } from './components/AddDistricting';
import { AddGraph } from './components/AddGraph';

function App() {
  return (
    <div className="App">
      <AddDistricting />
      <AddGraph />
    </div>
  );
}

export default App;
