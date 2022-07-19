/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './TodoItem.module.css'

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    }
  }

  handleEditing = () => {
    this.setState({
      editing: true,
    })
  }

  handleUpdatedDone = event => {
    if (event.key === 'Enter') {
      this.setState({ editing: false })
    }
  }

  render () {
  const { handleChangeprops, deleteTodoProps } = this.props;
  const { completed, id, title } = this.props.todo;
  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  }

  let viewMode = {}
  let editMode = {}

  if (this.state.editing) {
    viewMode.display = 'none'
  } else {
    editMode.display = 'none'
  }

  return (
    <li className={styles.item}>
      <div onDoubleClick={this.handleEditing} style={viewMode}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={completed}
        onChange={() => handleChangeprops(id)}
      />
    <button onClick={() => deleteTodoProps(id)}>
        Delete
      </button>
      <span style={completed ? completedStyle : null}>
        {title}
      </span>
    </div>
    <input
      type='text'
      style={editMode}
      className={styles.textInput}
      value={title}
      onChange={e => {
        this.props.setUpdate(e.target.value, id)
      }}
      onKeyDown={this.handleUpdatedDone}
    />
    </li>
  );
}
};
TodoItem.propTypes = {
  todo: PropTypes.instanceOf(Object).isRequired,
  handleChangeprops: PropTypes.func.isRequired,
};

export default TodoItem;
