import React from 'react'
import { Grid, Image, Button, Checkbox, Form } from 'semantic-ui-react'
import ListItems from "../List/List"

export default class Writing extends React.Component {
    constructor(props){
        console.log(`this is from writing component ${props.data}`);
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.save = this.save.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        let listItem =["hey","whatsup","okay its working"]; 
        this.state = {
            data: (props.data)? props.data : {inputText:"",listItems:listItem}
        }

    }

    componentDidMount(){
        
    }

    _handleKeyPress(e){
        if(e.key == "Enter"){
            let list = this.state.data.listItems, inputText = this.state.data.inputText;
            list.unshift(inputText);
            let newData = {listItems:list,inputText:""};
            this.setState({data:newData});
            this.onUpdate("inputText",inputText);
        }
    }

    save(e){
        if(e.target.id == "saveBtn"){
            var d = {key:"Enter"};
            this._handleKeyPress(d);
        }
    }

    onChangeInput(e){
        console.log(e.target.value);
        let newData = this.state.data;
        newData.inputText = e.target.value;
        this.setState({data:newData});
    }

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

    render(){
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
                <ListItems id="ListItem" onUpdate={this.onUpdate} data={this.state.data.listItems} />
            </div>
        )
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
}
