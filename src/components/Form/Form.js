/**
 * @author - vaibhav sharma (github.com/vaibsharma)
 * @contact - vaib.sharma44@gmail.com
 */

import React from 'react';
import { Grid, Image, Button, Checkbox, Form } from 'semantic-ui-react';
import ListItems from "../List/List";

/**
 * Class for form UI inheriting from React.component
 * @function onUpdate
 * @function stateHandler
 * @function _handlerKeyPress
 * @function save
 * @function onChangeInput
 */

export default class Writing extends React.Component {

    constructor(props){
        console.log(`this is from writing component ${props.data}`);
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.save = this.save.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        let listItem =["hey","whatsup","okay its working"]; 
        this.state = {
            data: (props.data)? props.data : {inputText:"",listItems:listItem}
        };
    }

    /**
     * The inherit function from React.Component
     * Runs after the component is rendered already
     */

    componentDidMount(){
        console.log("Form.js Component did mount, props ",this.props);
    }

    /**
     * Function for handling Enter button
     */

    _handleKeyPress(e){
        if(e.key == "Enter"){
            let list = this.state.data.listItems, inputText = this.state.data.inputText;
            if(inputText.length>0){
                list.unshift(inputText);
                let newData = {listItems:list,inputText:""};
                this.setState({data:newData});
                this.onUpdate("listItems",list);
            }
        }
    }

    /**
     * Function for clicking the save button
     * @param {object} eventHandler
     */

    save(e){
        if(e.target.id == "saveBtn"){
            var d = {key:"Enter"};
            this._handleKeyPress(d);
        }
    }

    /**
    * Runs everytime when there is a change in component
    * states and pass props on the child components
    * @param {object} nextprops
    */

    componentWillReceiveProps(nextprops){
        if(this.props.data != nextprops.data){
            console.log("Form.js props are changed ",nextprops);
            if(nextprops.data){
                nextprops.data.inputText = "";
                this.setState({data:nextprops.data});
            }
            
        }
        else{
            console.log("Form.js ",this.props,nextprops);
        }
    }

    /**
     * Function on changing the input Text
     * @param {object} eventHandler
     */

    onChangeInput(e){
        console.log(e.target.value);
        let newData = this.state.data;
        newData.inputText = e.target.value;
        this.setState({data:newData});
    }

    /**
     * Updating the whole JSON created with the
     * React component and building up the TREE
     * calling the parent onUpdate through props
     * @param {string,object} child, data
     */

    onUpdate(child,data){
        // do somework
        // change the data
        // let data = {}
        console.log(`I am here inside Form and I am the father of ${child}`);
        console.log(`new data from ${child} is `,data);
        let newData = this.state.data;
        newData[child] = data;
        this.props.onUpdate(this.props.id,newData);
    }

    /**
    * Function for stateHandler
    * calls the parent stateHandler through props
    * @param {string} handler
    */

    stateHandler(handler){
        console.log(this.state.data,handler);
        this.props.stateHandler(handler);
    }

    render(){
        console.log("Rendering Form.js");
        console.log(this.state.data.listItems);
        return(
            <div> 
                <Form>
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name' onKeyPress={this._handleKeyPress} onChange={this.onChangeInput} value={this.state.data.inputText}/>
                    </Form.Field>
                    <Button type='submit' id="saveBtn" onClick={this.save} style={style.button}>Submit</Button>
                </Form>
                <ListItems id="ListItem" stateHandler={this.stateHandler} onUpdate={this.onUpdate} data={this.state.data.listItems} />
            </div>
        );
    }
}

const style = {
    button:{
        backgroundColor:"#E91E63",
        height: "2.5em",
        width: "30%",
        color:"white",
        weight:"500",
        fontSize:"1.5em",
        margin:"auto",
        display:"block"
    }
};
