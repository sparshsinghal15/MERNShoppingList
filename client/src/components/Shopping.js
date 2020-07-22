import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux';
import { getItems, deleteItems } from '../actions/itemAction'
import PropTypes from 'prop-types'

class ShoppingList extends Component {
    componentDidMount() {
        this.props.getItems();
    }
    onClickDelete(id) {
        this.props.deleteItems(id)
    } 
    render () {
        const { items } = this.props.item;
        return (
            <Container>
                
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map((item)=> (
                            <CSSTransition key={item._id} timeout={300} classNames="fade">
                                <ListGroupItem>
                                    <Button 
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onClickDelete.bind(this, item._id)}
                                    >
                                        &times;
                                    </Button> &nbsp; &nbsp;
                                    {item.name}
                                    </ListGroupItem>
                            </CSSTransition>)
                        )}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
}) 

export default connect(mapStateToProps, {getItems, deleteItems})(ShoppingList)