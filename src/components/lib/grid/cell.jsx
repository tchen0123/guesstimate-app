import React, {Component, PropTypes} from 'react'
import $ from 'jquery'
import { DropTarget } from 'react-dnd';
import ItemCell from './filled-cell.js';
import EmptyCell from './cell-empty.js';

const squareTarget = {
  drop(props) {
    return {location: props.location}
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

@DropTarget('card', squareTarget, collect)
export default class Cell extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    gridKeyPress: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    item: PropTypes.object,
    location: PropTypes.shape({
      row: PropTypes.number.isRequired,
      column: PropTypes.number.isRequired
    }).isRequired,
    onAddItem: PropTypes.func.isRequired,
    onMoveItem: PropTypes.func.isRequired,
  }

  getPosition() {
    let $el = $(this.refs.dom)
    if ($el.length) {
      const position = $el.position()
      return {
        top: position.top,
        left: position.left,
        height: $el.height(),
        width: $el.width()
      }
    } else {
      return {}
    }
  }

  componentDidMount = () => {
    if (this.props.isSelected){
      this._focus()
    }
  }

  componentDidUpdate = (prevProps) => {
    const newlySelected = (this.props.isSelected && !prevProps.isSelected)
    const changeInItem = (!!prevProps.item !== !!this.props.item)
    if (newlySelected || changeInItem){
      this._focus()
    }
  }

  _focus = () => {
     $('.selected .grid-item-focus').focus();
  }

  _cellElement = () => {
    if (this.props.item) {
      return (<ItemCell {...this.props} />)
    } else {
      return (<EmptyCell {...this.props} />)
    }
  }

  _classes = () => {
    let classes = 'GiantCell'
    classes += (this.props.isSelected ? ' selected' : ' nonSelected')
    classes += this.props.isOver ? ' IsOver' : ''
    return classes
  }

  render = () => {
    return this.props.connectDropTarget(
      <div className={this._classes()}>
        {this._cellElement()}
      </div>
    )
  }
}
