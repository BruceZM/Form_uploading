import React,{ useState,useEffect,useMemo } from 'react';
import { Button,List,Upload,message } from 'antd';
import { request } from '../../utility/request'
import randomNameUpload from '../../utility/randomName';
import qs from 'querystring'
import QueueAnim from 'rc-queue-anim';

export default function Paydone (props){

    const Key = localStorage.getItem('upload_token') || '';
    const [randomUploadName, setRandomUploadName] = useState('');
    const [qiniuToken, setQiniuToken] = useState('');

    useEffect(() => {
        request({
            url:'OrderTable.GetQiniuToken',
            method:"POST",
            body:qs.stringify({
                Key
            })
        }).then(function(res){
            console.log(res.data);  
            if(res.flag === 200){
                setQiniuToken(res.data)
            }else{
                message.error(res.msg)
            }
        })
    }, [Key])
    const data = [
        '汇款账户：6204 5274 9056 1521 068',
        '所属银行：中国银行',
        '收款人：升级为',
        '电话：193 4829 0283',
    ];

// paycheck/049b200c4c1ddf07d05e859a29c404c2
    const uploadProps = useMemo(() => ({
        name: 'file',
        accept:"image/*",
        action: 'http://up.qiniu.com',
        data:{key:'paycheck/'+randomUploadName,token:qiniuToken},
        showUploadList: false,
        multiple:false,
        beforeUpload(val){
            
            setRandomUploadName(randomNameUpload(val.name))
        },
        onChange(info) {
            if (info.file.status === 'done') {
                let PayUrl = info.file.response.key;
                console.log('randomNameUpload',PayUrl);
                request({
                    url:'OrderTable.SubmitPay',
                    method:"POST",
                    body:qs.stringify({
                        Key,
                        GoodsBasicID:localStorage.getItem('GoodsBasicID') || 0,
                        PayUrl
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
), [Key,qiniuToken,randomUploadName,props])
    return(
        <QueueAnim>
            <div className="download-wrap" key="62">
                <div style={{width:'100%',maxWidth:450,padding:'0 10px',margin:'0 auto',textAlign:'left'}}>
                    <h3 style={{fontWeight:'bold',marginBottom:20}}>请将货款转账至以下账户，并在转账成功后上传支付凭证</h3>
                    <List
                    
                    dataSource={data}
                    renderItem={item => <List.Item>{item}</List.Item>}
                    />
                    <p style={{color:'#C83B4C',marginTop:20}}>请在打款后上传支付凭证，以便后续工作的顺利进行</p>
                </div>
                

                <div className="next-step">
                    {
                        props.realStep === 4?
                        <Button disabled style={{backgroundColor:'#BDBDBD',borderColor:'#BDBDBD',color:'#fff'}} size="large">支付凭证已上传</Button>
                        :
                        <Upload {...uploadProps} >
                            <Button type="primary" block size="large" htmlType="button">立即上传支付凭证</Button>
                        </Upload>
                    }
                    

                    
                </div>
            </div>
        </QueueAnim>
    )
}