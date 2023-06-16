import React, {useState} from 'react';
import './App.css';
import Messages from "./components/messages/Messages";
import SortBox from "./components/sortBox/SortBox";

function App() {
    const [newestOnTop, setNewestOnTop] = useState(false);

    const handleNewestOnTop = () => {
        setNewestOnTop(!newestOnTop);
    }

    return (
        <div className="App">
            <div className="title">Список постов</div>
            <SortBox
                newestOnTop={newestOnTop}
                handleNewestOnTop={handleNewestOnTop}
            />
            <Messages newestOnTop={newestOnTop} />
        </div>
    );
}

export default App;
