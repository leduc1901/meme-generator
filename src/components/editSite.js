import React, { Component } from 'react'
import {connect} from "react-redux"
import {Select , Input} from 'antd';
import 'antd/dist/antd.css';
import { saveAs } from 'file-saver';
import { Rnd } from "react-rnd";
import {  message , Button} from 'antd';
import html2canvas from 'html2canvas';
import {returnSite} from "../action/memeActions"
import {  Link } from "react-router-dom"

const InputGroup = Input.Group;
const {Option} = Select

const style = {
    display: "inline-block",
    alignItems: "center",
    justifyContent: "center",
    fontWeight : "bolder",
    width : "max-content"
}

export class editSite extends Component {
    constructor(props){
        super(props);
        this.state = {
            line : [
                {
                    id : 0,
                    x : 100,
                    y : 30,
                    height : 30,
                    value : "Dòng Trên",
                    color : "white",
                    fontSize : 40,
                    
                } ,

                {
                    id : 1,
                    x : 300,
                    y : 300,
                    height : 30,
                    color : "white",
                    value : "Dòng Dưới",
                    fontSize : 40
                }
            ]
                
            
        }
    }
//x: d.x, y: d.y 
    renderText = () => {
        
        let renderTxt = this.state.line.map((e , i) => {
            return (
                <Rnd
                    style={Object.assign({} , style , 
                        {   fontSize : e.fontSize , 
                            color : e.color
                        }
                    )}

                    position={{ x: e.x + (i*10) , y: e.y + (i*10) }}
                    onDragStop={(e, d) => {
                        this.setState(prevState => ({
                            line : prevState.line.map(
                                item => item.id === i ?{
                                    ...item,
                                    x : d.x,
                                    y : d.y
                                }:item
                            )
                        }));
                    }}
                    
                >
                    {e.value }
                </Rnd>
            )
        })
        return renderTxt
    }

    changeValue = (e , id) => {
        this.setState(prevState => ({
            line : prevState.line.map(
                item => item.id === id ?{
                    ...item,
                    value : e
                }:item
            )
        }));
       
    }

    changeColor = (value ,id) => {
        this.setState(prevState => ({
            line : prevState.line.map(
                item => item.id === id ?{
                    ...item,
                    color : value
                }:item
            )
        }));
    }

    changeSize = (value , id) => {
        console.log(value)
        this.setState(prevState => ({
            line : prevState.line.map(
                item => item.id === id ?{
                    ...item,
                    fontSize : parseInt(value)
                }:item
            )
        }));
    }

    renderInput = () => {
        let renderInput = this.state.line.map((e , i ) => {
            return (
                <InputGroup compact>
                    <Select id="color" onChange={(value) => this.changeColor(value , i)} defaultValue="White">
                        <Option value="White">White</Option>
                        <Option value="Black">Black</Option>
                    </Select>
                    <Select id="size" onChange={(value) => this.changeSize(value , i)} defaultValue="40px">
                        <Option value="10">10px</Option>
                        <Option value="20">20px</Option>
                        <Option value="30">30px</Option>
                        <Option value="40">40px</Option>
                        <Option value="50">50px</Option>
                        <Option value="60">60px</Option>
                    </Select>
                    <Input onChange={(e) => this.changeValue(e.target.value , i)}  defaultValue={e.value} placeholder={e.value} />
                </InputGroup>
            )
        })
        return renderInput
    }

    snapShot = () => {
        let scrnshot =  document.getElementById("img-area")
        html2canvas(scrnshot, { allowTaint: true }).then(function (canvas) {
            var link = document.createElement('a');
            link.download = 'filename.png';
            link.href = canvas.toDataURL("image/jpeg");
            link.click();
        });
    }

    addNewInput = () => {
        if(this.state.line.length <= 10){
            this.setState({
                line : [...this.state.line , {
                    id : this.state.line.length,
                    x : 50,
                    y : 30,
                    height : 30,
                    value : "Dòng Mới",
                    color : "white",
                    fontSize : 40,
                }]
            })
        }
    }

    returnPage = () => {

    }

    render() {
        return (
            <div>
                <h1>Edit Ảnh Tại Đây</h1>
                <div className="edit-area">
                    <div id="img-area">
                        <img className="edit-img" src={this.props.imageUrl} />
                        
                        {this.renderText()}
                        <img width="75%" id="screen"></img>
                    </div>
                    <div className="input-area">
                        <Button className="generate" size="large" onClick={this.snapShot} type="primary">Tải Xuống</Button>
                        <Button className="addNew" size="large"  onClick={this.addNewInput} type="primary">Thêm Dòng Mới</Button>
                        {this.renderInput()}
                        <Button className="returnPageBtn" size="large"  onClick={this.addNewInput} type="primary">
                            <Link to="/">Upload Ảnh Khác</Link>
                        </Button>
                    </div>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        imageUrl : state.imageUrl
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatchReturnSite : () => dispatch(returnSite())
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(editSite)
