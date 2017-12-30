import React from 'react'
import { Message } from 'semantic-ui-react'
import shortid from 'shortid';
export default class ListItems extends React.Component {

    constructor(props){
        super(props);
        console.log(`this is MessageList Component ${props}`);
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {
            data:(props.data)? props.data : ["hey","there","okkay its working"]
        }
    }

    onUpdate(child,data){
        //do somework
        // change the date
        //let data = {
        //this.props.onUpdate();
        console.log(`I am here inside list and I am the father of ${child}`);
        //this.props.onUpdate(this.props.id);
    }

    componentDidMount(){
    }

    render(){
        let items = this.state.data;

        return(
            <Message>
                <Message.Header>Entered Data</Message.Header>
                <Message.List id="Message" items={items} key={shortid.generate()} />
            </Message>
        )
    }
}
