import React, { Component } from 'react'
import { Upload , message , Button} from 'antd';
import 'antd/dist/antd.css';
import {  LoadingOutlined, PlusOutlined  } from "@ant-design/icons"
import {connect} from "react-redux"
import {changeSite} from "../action/memeActions"
import {  Link } from "react-router-dom"

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }



class uploadSite extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading : false
        }
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };

    saveImage = () => {
        console.log(1)
        this.props.dispatchChangeSite(this.state.imageUrl)
    }

    render() {

        const uploadButton = (
            <div>
              {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="ant-upload-text">Upload</div>
            </div>
          );

        const startEditingButton = (
            <Button type="primary" size="large" onClick={this.saveImage}>
                <Link to={process.env.PUBLIC_URL + "/edit"}>Bắt Đầu Chỉnh Sửa</Link>     
            </Button>
        )
          
        const { imageUrl } = this.state;

        return (
            <div className="uploadPage">
                <h2>Hãy bấm nút để upload meme bạn muốn edit, hoặc kéo thả </h2>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                {imageUrl ? startEditingButton : ""}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {

    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatchChangeSite : (url) => dispatch(changeSite(url))
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(uploadSite)
