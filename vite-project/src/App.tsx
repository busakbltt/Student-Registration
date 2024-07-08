import {useState } from 'react';
import {createStudent} from './services/studentService';
import StudentList from './components/StudentList';
import CourseList from './components/CourseList';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [refreshList, setRefreshList] = useState(false);

  const handleAddStudent = async () => {
    if (name && email) {
      try {
        await createStudent({ name, email});
        setRefreshList(prev => !prev);
        setName('');
        setEmail('');
      } catch (error) {
        console.error('Error adding student:', error);
      }
    } else {
      console.error('Name and email are required');
    }
  };

  return (
    <div>
      <h1>Student Registration</h1>
      <div>
        <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)} 
        placeholder='Name' 
        />
        <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        />
        <button onClick={handleAddStudent}>Add Student</button>
      </div>
      <StudentList refresh={refreshList}/>
      <CourseList refresh={refreshList}/>
    </div>
  );
};

export default App;
