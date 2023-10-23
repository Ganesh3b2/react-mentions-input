import './App.css';
import MentionsInput from './components/mentions';
import data from './components/data.json'

function App ()  {
  const handleChange = (value: any) => {
    console.log("THE FINAL VALUE", value);
  };
  return (
    <div>
      <MentionsInput data={data} onChange={handleChange} />
    </div>
  );
};

export default App;
