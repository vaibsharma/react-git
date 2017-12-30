import React from 'react';
import {Grid, Card, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class Body extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.onUpdate = this.onUpdate.bind(this);
    }

    onUpdate(child){
        // do somework
        //change the data
        // let data = {}
        this.props.onUpdate(child);
    }

    render() {
        return (
                <div style={styles.body}>
                {this.props.children}
                </div>
        );
    }
} 

const styles = {
    body: {
        fontFamily: 'Roboto'
    }
};
