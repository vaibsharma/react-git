import React from 'react'
import { Message } from 'semantic-ui-react'
import shortid from 'shortid';
export default class ListItems extends React.Component {

    constructor(props){
        super(props);
        console.log(`this is MessageList Component ${props}`);
        this.onUpdate = this.onUpdate.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
        this.state = {
            count:1,
            data:(props.data)? props.data : ["hey","there","okkay its working"]
        }
    }

    componentWillReceiveProps(nextprops){
        if(this.props.data != nextprops.data){
            console.log("List.js props are changed ",nextprops);
            this.setState({data:nextprops.data});
        }
        else{
            console.log("List.js",this.props,nextprops);
        }
    }

    stateHandler(handler){
        console.log(this.state.data)
        this.props.stateHandler(handler);
    }
    
    onUpdate(child,data){
        //do somework
        // change the date
        //let data = {
        //this.props.onUpdate();
        console.log(`I am here inside list and I am the father of ${child}`);
        this.setState({count:this.state.count+1});
        //this.props.onUpdate(this.props.id);
    }

    componentDidMount(){
        console.log("componentDidMount on ListJs, props ",this.props);
        this.setState({count:this.state.count+1});
    }

    render(){
        console.log("Rendering list.js and  the no. of count is ",this.state.count);
        let items = this.state.data;

        return(
            <Message>
                <Message.Header>Entered Data</Message.Header>
                <Message.List id="Message" items={items} key={shortid.generate()} />
            </Message>
        )
    }
}
