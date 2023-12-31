import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
    setUsers(await response.json());
  };

  const createUser = async (event) => {
    await fetch(`${process.env.REACT_APP_API_URL}/users`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: value }) });
    setUsers([...users, { name: value }]);
    setValue('');
  };

  const deleteUser = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, { method: 'DELETE' });
    setUsers([...users.filter(user=>user._id !== id)]);
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  console.log(users)

  return (
    <div className="App">
        <label>
            Name: <input type="text" value={value} onChange={handleChange} />
        </label>
        <button disabled={!value.length} onClick={createUser}>Submit</button>
      <ul>
        {users.map(user => <li>{user.name} <button onClick={() => deleteUser(user._id)}>X</button></li>)}
      </ul>
    </div>
  );
}

export default App;
