import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Body from './components/Body/Body'
import Main from './components/Main/Main'
import States from './stateDB/captureStates'
import Ajax from './helpers/ajax'
import './main.css'

const ajax = new Ajax;

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
        this.states = new States();
        this.state = {
            _id:"vaibhavid",
            _rev:"",
            _previous:"",
            _next:"",
            data:  (props.data)? props.data : {Main:{}}
        }
    }

    /**
     * The inherit function from React.Component
     * Runs after the component is rendered already
     */
    
    componentDidMount(){
        this.states.getCurrentState(this.state._id).then((newData)=>{
            console.log(newData);
            if(!newData.parentId.exist){
                var _next="",_previous="",_id="";
                if(newData.previous.exist) _previous = newData.previous.key;
                if(newData.next.exist) _next = newData.next.key;
                this.setState({data:newData.data,_id:newData._id,_next:_next,_previous:_previous,_rev:newData._rev});
            }
            else{
                this.states.getCurrentState(newData.parentId.key).then((parentData)=>{
                    console.log(parentData);
                     var _next="",_previous="",_id="";
                    if(parentData.previous.exist) _previous = parentData.previous.key;
                    if(parentData.next.exist) _next = parentData.next.key;
                    this.setState({data:parentData.data,_id:parentData._id,_next:_next,_previous:_previous,_rev:parentData._rev});
                });
            }
        }).catch((err) => {console.log(err)});
        console.log("componentDidMount on IndexJs with props",this.props);
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

    /**
     * Function for assigning the next pointer to
     * the current state in CouchDB
     * @param {string,object,string} pastKey, data, currentKey
     */

    managePast(pastKey,data,currentKey){
        return new Promise((resolve,reject)=>{
            console.log(pastKey,data,currentKey);
            var host = "http://vaibhav:1234567890@localhost:5984/busigence/"+pastKey;
            var obj = {
                _rev:data._rev,
                type:data.type,
                parentId: data.parentId,
                previous: data.previous,
                next:{
                    exist:true,
                    key:currentKey
                },
                data:data.data,
                timeUpdate:data.timeUpdate
            };

            ajax.makePUT(obj,host).then((result)=>{
                resolve(result);
            }).catch((error)=>{
                reject(error);
            });
        });
    }

    /**
     * Function for handling the options for
     * going back, next and saving the current stateHandler
     * @param {string} handler
     */

    stateHandler(handler){
        console.log(this.state.data)
        console.log(handler);
        if(handler == 'Save'){
            var previousKey = this.state._id;
            this.states.saveCurrentState(previousKey,this.state.data).then((result)=>{
                console.log(result);
                var previousData = result.previousData, newData = result.newData;
                this.managePast(previousData._id,previousData,newData.id).then((result)=>{
                    console.log(result);
                }).catch((err)=>{
                    console.log(err);
                });
                this.setState({_id:newData.id,_previous:previousData.id});
                this.states.helpParent(this.state._id);

            }).catch((err)=>{
                console.error(err);
            });
        }
        else if(handler == 'Previous' || handler == 'Next'){
            this.states.getCurrentState(this.state._id).then((newData) => {
                var flag = false,wantedKey;
                if(handler == 'Previous' && newData.previous.exist){
                    flag = true;
                    wantedKey = newData.previous.key;
                }
                else if(handler == 'Next' && newData.next.exist){
                    flag = true;
                    wantedKey = newData.next.key;
                }
                if(flag){
                    this.states.getCurrentState(wantedKey).then((resultData)=>{
                                 let _id = resultData._id, _previousKey = resultData.previous.key, _nextKey = resultData.next.key;
                                 this.setState({_id:_id,_previous:_previousKey,_next:_nextKey,data:resultData.data});
                                 console.log(resultData);
                             });
                }
            });
        }
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
