import React from 'react';

// Компонент input с кнопкой

class TaskInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = { // В состоянии будет находится один пустой input
            input: ''
        };
    }

    addTask = () => {
        const { input } = this.state;
        if(input) { // Если input не пуст
            this.props.addTask(input);
            this.setState({ input: '' }); // очистка input
        }
    };

    handleEnter = event => {
        if(event.key === 'Enter') // Если key равен enter, то вып. ф-ю
        this.addTask();
    };

    inputChange = event => { // Получаем значение input. Для добавления задачи
        this.setState({ input: event.target.value });
    }

    render() {
        const { input } = this.state;
        return(
            <div className="task-input">
                <input 
                    onKeyPress={this.handleEnter} 
                    onChange={this.inputChange} 
                    value={input}
                ></input>
                <button onClick={this.addTask}>Add</button>
            </div>
        );
    }
}

export default TaskInput;