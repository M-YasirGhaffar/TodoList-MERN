import axios from 'axios';

const baseUrl = 'http://localhost:5002'; // Use 'http' instead of 'https'

const getAllToDo = async (setToDo) => {
    try {
        console.log('Before Axios request');
        const response = await axios.get(`${baseUrl}/`);
        console.log('Response:', response.data);
        setToDo(response.data);
        console.log('After Axios request');
    } catch (error) {
        console.error('Axios Error:', error);
    }
};

const addToDo = (text, setText, setToDo) => {
    axios.post(`${baseUrl}/save`, { text })
        .then((data) => {
            console.log(data);
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
            console.log(data);
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
            console.log(data); 
            getAllToDo(setToDo);
        })
        .catch((e) => {
            console.log(e);
        });
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };