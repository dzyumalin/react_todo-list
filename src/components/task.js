import React from 'react';

const Task = ({ task, ...props }) => { // передаем task
    const ActionBtn = () => (
    <div className="action-btn">
    {!task.done
    ? <p onClick={props.doneTask}>✅</p> // Если задача не выполнена - V, если выполнена - X
    : <p onClick={props.deleteTask}>❌</p>} 
    </div>
    );

    const className = 'task ' + (task.done ? 'task-done' : ''); // Выполненные задачи. Если задача выполнена - task.done, если нет - ''

    return(
        <div className={className}>
            <p>{task.title}</p>
            <ActionBtn></ActionBtn>
        </div>
    )
} // Компонент без состояния создается с помощью большой буквы

export default Task;