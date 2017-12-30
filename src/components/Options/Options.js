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
    }

    onUpdate(child){
        console.log(`I am here indide state options and I am the father of ${child}`);
        //this.props.onUpdate();
    }

    render(){
        return(
            <Grid divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Grid divided='vertically'>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                        <Button negative style={style.button} disabled={this.state.previous}> <Icon name='angle double left' /> Previous </Button>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button color='blue' style={style.button} disabled={this.state.next}>Next <Icon name='angle double right' /></Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column>
                            <Button positive style={style.button}> <Icon name='checkmark' /> Save</Button>
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
