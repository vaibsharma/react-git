import React from 'react'
import { Grid, Image, Button, Checkbox } from 'semantic-ui-react'
import Writing from "../Form/Form"
import ListElement from "../List/List"
import StateOptions from "../Options/Options"
/* const styles = {
 *     body: {
 *         height:'100vh',
 *     },
 *     messenger:{
 *     },
 *     google:{
 *         backgroundColor:'#3949ab'
 *     }
 * },
 *       messenger = Object.assign({}, styles.body, styles.messenger),
 *       google = Object.assign({}, styles.body, styles.google);
 * 
 * export default Main*/


export default class Main extends React.Component {

    constructor(props){
        //console.log(props);
        super(props);
        console.log(props.data);
        this.onUpdate = this.onUpdate.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
        const newData = {Writing:{},StateOptions:{}}
        this.state = {
            count:1,
            data: props.data || newData
        }
        /* this.setState({data:newData});*/
    }

    componentWillReceiveProps(nextprops){
        if(this.props.data != nextprops.data){
            console.log("Main.js props are changed ",nextprops);
            this.setState({data:nextprops.data});
        }
        else{
            console.log("Main.js",this.props,nextprops);
        }
    }

    onUpdate(child,data){
        console.log(`I am here inside Main and I am the father of ${child}`);
        console.log(`new data from ${child} is `,data);
        let newData = this.state.data;
        newData[child] = data;
        this.props.onUpdate(this.props.id,newData);
    }

   stateHandler(handler){
        console.log(this.state.data,handler);
        this.props.stateHandler(handler);
    }

    componentDidMount(){
        console.log("componentDidMount on MainJs with props",this.props);
        this.setState({count:this.state.count+1});
    }

    render(){
        console.log("Rendering Main.js no of count is",this.state.count);
        return(
            <div>
                <Writing id="Writing" style={styles.ListElement} stateHandler={this.stateHandler} data={this.state.data.Writing} onUpdate={this.onUpdate}/>
                <StateOptions data={this.state.data.StateOptions} stateHandler={this.stateHandler} id="StateOptions" onUpdate={this.onUpdate}/>
            </div>
        )
    }
}

const styles = {
    ListElement:{
        marginBottom:"10%"
    }
}
