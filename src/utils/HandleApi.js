import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const getAllToDo = async (setToDo) => {
    try {
        const response = await axios.get(`${baseUrl}/`);
        setToDo(response.data);
    } catch (error) {
        console.error('Axios Error:', error);
    }
};

const addToDo = (text, setText, setToDo) => {
    axios.post(`${baseUrl}/save`, { text })
        .then((data) => {
            setText('');
            getAllToDo(setToDo);
        })
        .catch((e) => {
            console.log(e);
        });
};

const updateToDo = (toDoId, text, setText, setToDo, setIsUpdating) => {
    axios.post(`${baseUrl}/update`, { _id: toDoId, text })
        .then((data) => {
            setText('');
            setIsUpdating(false);
            getAllToDo(setToDo);
        })
        .catch((e) => {
            console.log(e);
        });
};

const deleteToDo = (_id, setToDo) => {
    axios.post(`${baseUrl}/delete`, { _id})
        .then((data) => {
            getAllToDo(setToDo);
        })
        .catch((e) => {
            console.log(e);
        });
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };