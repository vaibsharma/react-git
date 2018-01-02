import React from "react"
import { Grid, Button, Icon } from "semantic-ui-react"

export default class StateOptions extends React.Component {
    constructor(props){
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {
            previous:true,
            next: false,
            data:(this.props.data) || {}
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
    }

    stateHandler(handler){
        console.log(this.state.data)
        this.props.stateHandler(handler);
    }

    clickHandler(e){
        const handler = e.target.id;
        if(handler == 'Save'){
            console.log('Save');
            this.stateHandler(handler);
        }
        if(handler == 'Next'){
            console.log('Next');
            this.stateHandler(handler);
        }
        if(handler == 'Previous'){
            console.log('Previous');
            this.stateHandler(handler);
        }
    }
    
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
                                    <Button id="Previous" negative style={style.button} onClick={this.clickHandler} > <Icon name='angle double left' /> Previous </Button>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button id="Next" color='blue' onClick={this.clickHandler} style={style.button} >Next <Icon name='angle double right' /></Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column>
                        <Button id="Save" onClick={this.clickHandler}
                                positive style={style.button}> <Icon name='checkmark' /> Save</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const style = {
    button:{
        margin:"auto",
        width:"60%",
        display:"block"
    }
}
