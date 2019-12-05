import React,{ useState,useEffect,useMemo} from 'react';
import { request } from '../../utility/request'
import randomNameUpload from '../../utility/randomName';
import qs from 'querystring'
import { Button,Upload,message } from 'antd';
import QueueAnim from 'rc-queue-anim';

export default function UploadStep (props){

    const Key = localStorage.getItem('upload_token') || '';    
    const [randomUploadName, setRandomUploadName] = useState('');
    const [qiniuToken, setQiniuToken] = useState('');
    const [TableName,setTableName] = useState('');

    useEffect(() => {
        request({
            url:'OrderTable.GetQiniuToken',
            method:"POST",
            body:qs.stringify({
                Key
            })
        }).then(function(res){
            if(res.flag === 200){
                setQiniuToken(res.data)
            }else{
                message.error(res.msg)
            }
        })
    }, [Key])

    const uploadProps = useMemo(() => ({
        name: 'file',
        accept:"*",
        action: 'http://up.qiniu.com',
        data:{key:'forms/'+randomUploadName,token:qiniuToken},
        showUploadList: false,
        multiple:false,
        beforeUpload(val){
            console.log(val);
            setTableName(val.name);
            setRandomUploadName(randomNameUpload(val.name))
        },
        onChange(info) {
            if (info.file.status === 'done') {
                let TableUrl = info.file.response.key;
                console.log('randomNameUpload',TableUrl);
                request({
                    url:'OrderTable.SubmitTable',
                    method:"POST",
                    body:qs.stringify({
                        Key,
                        GoodsBasicID:localStorage.getItem('GoodsBasicID') || 0,
                        TableUrl,
                        TableName,
                        ShopLevel:JSON.parse(localStorage.getItem('personal_info')).shop_level || ''
                    })
                }).then(function(res){
                    console.log(res.data);  
                    if(res.flag === 200){
                        message.success('上传凭证成功！请等待审核哦~',1,()=>props.forceAdding());
                        
                    }else{
                        message.error(res.msg)
                    }
                })
            } else if (info.file.status === 'error') {
                message.error('上传失败了~请稍后再试')
            }
        }
    }
), [Key,qiniuToken,randomUploadName,TableName,props])
    return(
        <QueueAnim>
            <div className="download-wrap" key='3'>
                {
                    props.realStep === 0?
                    <Upload {...uploadProps} >
                        <img src={require('../../images/upload_form.png')} alt=""/>
                    </Upload>
                    :
                    <img src={require('../../images/form_uploaded.png')} alt=""/>
                }
                
                {
                    props.realStep === 0?
                    <div className="next-step">
                        <Button className="disabled-button" block size="large" disabled>下一步</Button>
                    </div>
                    :
                    <div className="next-step">
                        <Button type="primary" block size="large" onClick={()=>props.handleStepChange(4)}>下一步</Button>
                    </div>
                }
                
            </div>
        </QueueAnim>
        
    )
}