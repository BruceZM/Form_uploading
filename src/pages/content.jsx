import React,{ useState,useEffect,useMemo } from 'react';
import { Button,Modal,message } from 'antd';
import { request } from '../utility/request'
import qs from 'querystring'
import Download from './steps/download';
import UploadStep from './steps/uploadStep';
import GoodsSelect from './steps/goodsSelect';
import Paydone from './steps/paydone';
import SubmittedForms from './steps/submittedForms';

const { confirm } = Modal;

export default function Content (props){

    const [info,setInfo] = useState({});
    const [nowStep,setStep] = useState(1);
    const [realStep,setRealStep] = useState(0);
    const [count,setCount] = useState(3);
    const Key = localStorage.getItem('upload_token') || '';

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem('personal_info'));
        setInfo(info);
    }, [])

    useEffect(() => {
        request({
            url:'OrderTable.OrderUpStatus',
            method:'POST',
            body:qs.stringify({
                Key,
            })
        }).then(function(res){
            console.log(res)
            if(res.flag === 200){
                setRealStep(parseInt(res.data.upload_status));
            }else if(res.flag === 420){
                message.warn('登陆信息已过期，请重新登陆~',1,()=>props.handleLogout())
            }else{
                message.error(res.msg)
            }
        })

    }, [Key,count,props])
    
    const forceAdding = () => {
        setCount(n=>n+1)
    }

    const handleLogOut = () => {
        confirm({
            title: '您确定要退出登陆吗？',
            content: '',
            onOk() {
              props.handleLogout()
            },
            onCancel() {},
            cancelText:'取消',
            okText:"确定"
        });
    }

    //const forceLogout = React.useCallback(()=>props.handleLogout(),[props])

    const handleStepChange = (e) => {
        setStep(e)
    }

    const contentHtml = useMemo(() => {
        switch (nowStep) {
            case 1:
                return <Download handleStepChange={handleStepChange} />
            case 2:
                return <GoodsSelect handleStepChange={handleStepChange} forceLogout={()=>props.handleLogout()} />
            case 3:
                return <UploadStep forceAdding={forceAdding} handleStepChange={handleStepChange} forceLogout={()=>props.handleLogout()} realStep={realStep}/>
            case 4:
                return <Paydone forceAdding={forceAdding} handleStepChange={handleStepChange} forceLogout={()=>props.handleLogout()} realStep={realStep}/>
            case 5:
                return <SubmittedForms handleStepChange={handleStepChange} forceLogout={()=>props.handleLogout()}/>
            default:
                return <code></code>
        }
    }
    , [nowStep,realStep,props])

    return (
        <>
            <div className="top-fixed-menu">
                <div className="top-middle-content">
                    <div className="logo-intro">
                        <img src={require('../images/logo_round.png')} alt=""/>
                        <h3>蚁家人订单表格导入</h3>
                    </div>
                    <div className="personal-info">
                        <p>用户名：{info.member_name}</p>
                        <p>账号：{info.member_mobile}</p>
                        <Button onClick={handleLogOut}>退出</Button>
                    </div>
                    
                </div>
            </div>
            <div className="content">
            <h1>real-status:{realStep}</h1>
                <ul className="btn-menu">
                    <li>
                        <Button size="large" type={nowStep===1?"primary":""} onClick={()=>handleStepChange(1)}>第一步：下载模版</Button>
                    </li>
                    <li>
                        <Button size="large" type={nowStep===2?"primary":""} onClick={()=>handleStepChange(2)}>第二步：勾选选择商品</Button>
                    </li>
                    <li>
                        <Button size="large" type={nowStep===3?"primary":""} disabled={(realStep>0||nowStep===3)?false:true} onClick={()=>handleStepChange(3)}>第三步：上传表格</Button>
                    </li>
                    <li>
                        <Button size="large" type={nowStep===4?"primary":""} onClick={()=>handleStepChange(4)}>第四步：付款并上传支付凭证</Button>
                    </li>
                    <li>
                        <Button size="large" type={nowStep===5?"primary":""} onClick={()=>handleStepChange(5)}>查看已上传表格</Button>
                    </li>
                </ul>
                {contentHtml}

            </div>
        </>
    )
}