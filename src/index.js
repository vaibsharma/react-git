import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Body from './components/Body/Body'
import Main from './components/Main/Main'
import './main.css'
import States from './stateDB/captureStates'
import $ from 'jquery'

export default class App extends React.Component {

    constructor(props){
        super(props);
        console.log("Initializing the application");
        console.log(props);
        this.states = new States();
        this.state = {
            _id:"vaibhavid",
            _rev:"",
            _previous:"",
            _next:"",
            data:  (props.data)? props.data : {Main:{}}
        }
        this.onUpdate = this.onUpdate.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
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
        if(child)
        newData[child]=data;
        console.log(newData);
        console.log(`I am here in Index and I am the father of ${child}`);
        console.log("okkay its working");
        this.setState({data:newData});
    }

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

            var response = $.ajax({
                type:'PUT',
                url:host,
                dataType:'text',
                data:JSON.stringify(obj),
                success:function(data){
                    //console.log(data);
                    data = JSON.parse(data);
                    resolve(data);
                },
                error:function(err){
                        reject(err);
                }
            });
            
        });
    }
    
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
                    /* this.states.getCurrentState(result.id).then((result)=>{
                     *     console.log(result);
                     * }).catch((err)=>{
                     *     console.log(err);
                     * }*/
                }).catch((err)=>{
                    console.log(err);
                });
                this.setState({_id:newData.id,_previous:previousData.id});

            }).catch((err)=>{
                console.error(err);
            });
        }
        else if(handler == 'Previous'){
            this.states.getCurrentState(this.state._id).then((newData) => {
                if(newData.previous.exist){
                    var previousKey = newData.previous.key;
                    this.states.getCurrentState(previousKey).then((previousData)=>{
                        let _id = previousData._id, _previousKey = previousData.previous.key, _nextKey = previousData.next.key;
                        this.setState({_id:_id,_previous:_previousKey,_next:_nextKey,data:previousData.data});
                        console.log(previousData);
                    })
                }
            })
        }
    else if(handler == 'Next'){
        console.log(handler);
            this.states.getCurrentState(this.state_id).then((newData)=>{
                console.log(newData);
                if(newData.next.exist){
                    var nextKey = newData.next.key;
                    /* this.states.getCurrentState(nextKey).then((previousData)=>{
                     *     let _id = previousData._id, _previousKey = previousData.previous.key, _nextKey = previousData.next.key;
                     *     this.setState({_id:_id,_previous:_previousKey,_next:_nextKey,data:previousData.data});
                     *     console.log(previousData);
                     * });*/
                }
            })
        }
        /* this.props.stateHandler();*/
    }

    componentDidMount(){
        this.states.getCurrentState(this.state._id).then((newData)=>{
            console.log(newData);
            var _next="",_previous="",_id="";
            if(newData.previous.exist) _previous = newData.previous.key;
            if(newData.next.exist) _next = newData.next.key;
            if(newData.parent.exist){
                this.states.getCurrentState(newData.parent.key).then((parentData)=>{
                    _next = "",_previous="",_id="";
                    if(parentData.previous.exist) _previous = parentData.previous.key;
                    if(parentData.next.exist) _next = parentData.next.key;
                    _id = parentData._id;
                })
            }
            this.setState({data:newData.data,_id:newData._id,_next:_next,_previous:_previous,_rev:newData._rev});
        }).catch((err) => {console.log(err)});
        console.log("componentDidMount on IndexJs with props",this.props);
    }

    componentWillReceiveProps(nextprops){
        if(this.props.data != nextprops.data){
            console.log("index.js props are changed ",nextprops);
            
        }
        else{
            console.log("index.js ",this.props,nextprops);
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
