/**
 * @author - vaibhav sharma (github.com/vaibsharma)
 * @contact - vaib.sharma44@gmail.com
 */


import React from 'react';
import { Message } from 'semantic-ui-react';
import shortid from 'shortid';
export default class ListItems extends React.Component {

    /**
     * Constructor for List component in React
     * @function onUpdate
     * @function stateHandler
     */

    constructor(props){
        super(props);
        console.log(`this is MessageList Component ${props}`);
        this.onUpdate = this.onUpdate.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
        this.state = {
            count:1,
            data:(props.data)? props.data : ["hey","there","okkay its working"]
        };
    }

    /**
     * The inherit function from React.Component
     * Runs after the component is rendered already
     */

    componentDidMount(){
        console.log("componentDidMount on ListJs, props ",this.props);
        this.setState({count:this.state.count+1});
    }

    /**
     * Runs everytime when there is a change in component
     * states and pass props on the child components
     * @param {object} nextprops
     */

    componentWillReceiveProps(nextprops){
        if(this.props.data != nextprops.data){
            console.log("List.js props are changed ",nextprops);
            this.setState({data:nextprops.data});
        }
        else{
            console.log("List.js",this.props,nextprops);
        }
    }

    /** Function for handling the states
     * Call handling the states
     * @param {string} handler
     */

    stateHandler(handler){
        console.log(this.state.data);
        this.props.stateHandler(handler);
    }

    /**
     * Updating the whole JSON created with the
     * React component and building up the TREE
     * @param {string,object}
     * calls parent onUpdate
     */

    onUpdate(child,data){
        
        console.log(`I am here inside list and I am the father of ${child}`);
        this.setState({count:this.state.count+1});
        //this.props.onUpdate();
    }

    render(){
        console.log("Rendering list.js and  the no. of count is ",this.state.count);
        let items = this.state.data;
        return(
            <Message>
                <Message.Header>Entered Data</Message.Header>
                {
                    items.map((item,index)=>{
                        return <Message.List id="Message" items={[item]} onClick={this.changeBackground} key={index} />;
                    })
                }
            </Message>
        );
    }
}
