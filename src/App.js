import React from 'react';
import Task from './components/task';
import TaskInput from './components/taskInput';
// Главный экран. Будет хранить в себе все задачи. Компонент с состоянием.

class App extends React.Component {
  constructor () { // Определим начальное состояние
    super();

    this.state = {
      tasks: [
        { id: 0, title: 'Create todo-react app', done: false}, // done- сделана задача или нет
        { id: 1, title: 'Make a video about it', done: true},
        { id: 2, title: 'Create simple todo-app', done: false}
      ]
    };
  }

  addTask = task => { // taskInput
    this.setState(state => {
      let { tasks } = state;
      tasks.push({ // Добавляем в массив с задачами новый объект
        id: tasks.length !== 0 ? task.length : 0, // Есди длина массива !== 0, то id будет = task.length. Иначе = 0. Если вдруг будут удалены все задачи, то id = 0
        title: task,
        done: false
      });
      return tasks;
    });
  };

  doneTask = id => { // Index будет индексом положения задач в массиве. Чтобы найти индекс берем state.tasks, проводим через map(task.id) и возвращаем id каждой задачи, чтобы сформировать новый массив из id каждой задачи. И после получения массива, берем indexOf нужного нам id

    const index = this.state.tasks.map(task => task.id).indexOf(id);
    this.setState(state => { // Изменяем задачу
      let { tasks } = state;
      tasks[index].done = true;
      return tasks;
    });
  };

  deleteTask = id => {
    const index = this.state.tasks.map(task => task.id).indexOf(id);
    this.setState(state => {
      let { tasks } = state;
      delete tasks[index];
      return tasks;
    });
  };

  render() {
    const { tasks } = this.state; // С помощью деструктурирующего присваивания получаем массив
    const activeTasks = tasks.filter(task => !task.done);  
    const doneTasks = tasks.filter(task => task.done);  // Выполненные задачи, будут отображаться снизу
    return(
      <div className="App">
        <h1 className="top">Active tasks: {activeTasks.length} </h1> {/* Отображает только те задачи, которые выполнены */}
        {/* Длина массива с количеством задач */}
        {[...activeTasks, ...doneTasks].map(task => // Сортировка задач, с помощью деструктуризации. Сначала невыполненные, потом выполненные
          <Task 
            doneTask={() => this.doneTask(task.id)} 
            deleteTask={() => this.deleteTask(task.id)}
            task={task} 
            key={task.id}
          ></Task>)} {/* Task для прохода по массиву и ключ для понимания js-ом уникальности элемента*/}
          <TaskInput addTask={this.addTask}></TaskInput> {/* Не оборачиваем в стрелочную ф-ю, так как не передаем параметр в App.js. Передадим параметр в taskInput */}
      </div> // Ставим стрелочную ф-ю, чтобы она не выполнилась на старте компонента. Передаем task.id для того, чтобы в массиве с задачами найти ту что нужно выполнить. Обязательно оборачивать ф-ю при передаче компонента
    );
  }
}

export default App;
