/**
 * @author - vaibhav sharma (github.com/vaibsharma)
 * @contact - vaib.sharma44@gmail.com
 */

import React from "react";
import { Grid, Button, Icon } from "semantic-ui-react";

/**
 * Class stateOptions
 */

export default class StateOptions extends React.Component {

    /**
     * Constructor for StateOptions component in React
     * @function onUpdate
     * @function stateHandler
     * @function clickHandler
     */

    constructor(props){
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
        this.state = {
            previous:true,
            next: false,
            data:(this.props.data) || {}
        };
    }

    /**
     * StateHandler function for handling
     * Save, Next, Back
     */
    
    stateHandler(handler){
        console.log(this.state.data);
        this.props.stateHandler(handler);
    }

    /**
     * Function for Handling the clicking event
     * @param {object} eventHandler
     */

    clickHandler(e){
        const handler = e.target.id;
        if(handler == 'save' || handler == 'previous' || handler == 'next'){
            this.stateHandler(handler);
        }
    }

    /**
     * Function for updating the component
     * (currently useless as it doesn't do anything)
     */

    onUpdate(Handler){
        console.log(`I am here indide state options and I am the father of ${child}`);
    }

    render(){
        return(
            <Grid divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Grid divided='vertically'>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Button id="previous" negative style={style.button} onClick={this.clickHandler} > <Icon name='angle double left' /> Previous </Button>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button id="next" color='blue' onClick={this.clickHandler} style={style.button} >Next <Icon name='angle double right' /></Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column>
                        <Button id="save" onClick={this.clickHandler}
                                positive style={style.button}> <Icon name='checkmark' /> Save</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const style = {
    button:{
        margin:"auto",
        width:"60%",
        display:"block"
    }
};
