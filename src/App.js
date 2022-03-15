import './App.css';
import FriendsList from './Components/FriendsList';
import FriendsProvider from './store/FriendsProvider';

function App() {
  return (
    <FriendsProvider>
    <div className="App">
      <div className='title'><label>Friends List</label></div>
      <FriendsList></FriendsList>
    </div>
    </FriendsProvider>
  );
}

export default App;
