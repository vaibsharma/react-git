import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Body from './components/Body/Body'
import Main from './components/Main/Main'
import './main.css'
import States from './stateDB/captureStates'

const states = new States();

export default class App extends React.Component {

    constructor(props){
        super(props);
        console.log("Initializing the application");
        console.log(props);
        this.states = states;
        this.currentKey = states.getCurrentKey();
        this.state = {
            data:  props.data || {Main:{}}
        }
        this.onUpdate = this.onUpdate.bind(this);
    }


    onUpdate(child,data){
        // do something
        // make some changes
        // make a connection with couchDB
        // make the changes in date base
        // push the data
        /* data = this.state.data;
         * data.id = e;*/
        let newData = this.state.data;
        newData[child]=data;
        console.log(newData);
        console.log(`I am here in Index and I am the father of ${child}`);
        console.log("okkay its working");
        this.setState({data:newData});
        /* this.states.saveCurrentState(this.currentKey).then((newData)=>{
         *     thiks.setState({data:newData});
         * }).catch((err) => {console.log(err)});*/
            
    }
        
    componentDidMount(){
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Body className="body">
                        <Switch>
                            <Route path="/" render={(props) => (<Main id="Main" data={this.state.data.Main} onUpdate={this.onUpdate}/>)} />
                        </Switch>
                    </Body>
                </div>
            </BrowserRouter>
        );
    }
}
