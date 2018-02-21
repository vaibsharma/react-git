import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Body from './components/Body/Body'
import Main from './components/Main/Main'
import States from './stateDB/captureStates'
import './main.css'

const states = new States;

export default class App extends React.Component {

    /**
    * Constructor for App component in React
    * @function onUpdate
    * @function stateHandler
    * @class states
     */

    constructor(props){
        super(props);
        console.log("Initializing the application");
        //console.log(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
        /* this.states = new States();*/
        this.state = {
            username:"vaibhav",
            stateid:"",
            previous:"",
            next:"",
            data:  (props.data)? props.data : {Main:{}},
            parent:"",
            versions:[]
        }
    }

    manageStates(result){
        this.setState({versions:result.versions,username:result.data.username,stateid:result.data._id,data:result.data.data,previous:result.data.previous.pointer,next:result.data.next.pointer,parent:result.data.parentId});
        console.log(this.state);
    }
    /**
     * The inherit function from React.Component
     * Runs after the component is rendered already
     */

    componentDidMount(){
        console.log(States);
        states.__init__(this.state.username,this.state.data).then((result)=>{
            console.log(result);
            this.manageStates(result);
        }).catch((err)=>{
            console.error(err);
        });
    }

    /**
     * Runs everytime when there is a change in component
     * states and pass props on the child components
     * @param {object} nextprops
     */

    componentWillReceiveProps(nextprops){
        if(this.props.data != nextprops.data){
            console.log("index.js props are changed ",nextprops);
        }
        else{
            console.log("index.js ",this.props,nextprops);
        }
    }

    stateHandler(handler){
        states.stateHandler(handler,this.state).then((result)=>{
            this.manageStates(result);
        }).catch((err)=>{
            console.error(err);
        });
    }

    /**
     * Updating the whole JSON created with the
     * React component and building up the TREE
     */

    onUpdate(child,data){
        let newData = this.state.data;
        if(child)
        newData[child]=data;
        console.log(newData);
        console.log(`I am here in Index and I am the father of ${child}`);
        console.log("okkay its working");
        this.setState({data:newData});
    }

    render(){
        console.log('index.js the state is',this.state.data);
        return (
            <BrowserRouter>
                <div>
                    <Body className="body">
                        <Switch>
                            <Route path="/" render={(props) => (<Main id="Main" data={this.state.data.Main} stateHandler={this.stateHandler} onUpdate={this.onUpdate}/>)} />
                        </Switch>
                    </Body>
                </div>
            </BrowserRouter>
        );
    }
}
