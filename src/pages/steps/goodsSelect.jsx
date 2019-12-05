import React,{ useState,useEffect } from 'react';
import { Button,Checkbox, Row, Col,message } from 'antd';
import qs from 'querystring'
import { request } from '../../utility/request'
import QueueAnim from 'rc-queue-anim';

export default function GoodsSelect (props){

    const [glist,setGlist] = useState([]);
    const [selectArr,setSelect] = useState([]);
    const Key = localStorage.getItem('upload_token') || '';

    useEffect(() => {
        request({
            url:'OrderTable.GoodsInfo',
            method:'POST',
            body:qs.stringify({Key})
        }).then(function(res){
            if(res.flag === 200){
                setGlist(res.data);
            }else if(res.flag === 420){
                message.warn('登陆信息已过期，请重新登陆~',1,()=>props.forceLogout())
            }else{
                message.error(res.msg)
            }
            
        })
    }, [Key,props])

    const checkOnChange = (e) => {
        if(e.length > 0){
            let end = e[e.length-1];
            setSelect([end]);
        }else{
            setSelect([]);
        }
        
    }
    const selectDone = () => {

        localStorage.setItem('GoodsBasicID',selectArr[0]);
        props.handleStepChange(3);
    }
    
    return(
        <QueueAnim>
            {
                glist && glist.length > 0 &&
                <div className="download-wrap" key="s">
                <h1>{props.realStep}</h1>
                    <Checkbox.Group style={{ width: '100%' }} value={selectArr} onChange={checkOnChange} >
                        <Row gutter={[12, 12]}>
                            {
                                glist.length > 0 &&
                                glist.map((item)=>
                                    <Col span={4} key={item.goods_basicid} className="goods-wrap" xs={12} sm={4}>
                                        <Checkbox value={item.goods_basicid} className="goods-wrap-checkbox" />
                                        <img src={item.goods_image} alt="" />
                                    </Col>
                                )
                            }
                            
                        </Row>
                    </Checkbox.Group>
    
                    <div className="next-step">
                        <Button className={selectArr.length === 0?"disabled-button":""} type="primary" block size="large" onClick={selectDone} disabled={selectArr.length === 0?true:false}>下一步</Button>
                    </div>
                </div>
            }

        </QueueAnim>
        
    )
}