import React from 'react';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';

export default function SubmittedForms (props){

    return(
        <QueueAnim>
            <div className="download-wrap" key="9">
                <Row gutter={[16, 20]}>
                    <Col span={6} xs={12} sm={6}>
                        <a href="http://cdnimg.yijiahaohuo.com/paycheck/049b200c4c1ddf07d05e859a29c404c2" download="scramble">
                            <section className="forms-box">
                                <span>待确认</span>
                                <div className="forms-box-middle">
                                    <img src={require('../../images/docs.png')} alt=""/>
                                    <p>文件标题我没我昂热</p>
                                </div>
                                <p className="upload-time">上传时间：2019-9-21 12：32</p>
                            </section>
                        </a>
                        
                    </Col>
                    <Col span={6} xs={12} sm={6}>
                    <a href="http://ovqxodlhu.bkt.clouddn.com/0_06082958033220438_360.jpg" download="scramble.jpg">
                    
                        <section className="forms-box">
                            <span>待确认</span>
                            <div className="forms-box-middle">
                                <img src={require('../../images/docs.png')} alt=""/>
                                <p>文件标题我没我昂文件标题昂热标题昂热文件文件标题我没我昂热热</p>
                            </div>
                            <p className="upload-time">上传时间：2019-9-21 12：32</p>
                        </section>
                        </a>
                    </Col>
                    <Col span={6} xs={12} sm={6}>
                        <section className="forms-box">
                            <span>待确认</span>
                            <div className="forms-box-middle">
                                <img src={require('../../images/docs.png')} alt=""/>
                                <p>文件标题我没我昂热</p>
                            </div>
                            <p className="upload-time">上传时间：2019-9-21 12：32</p>
                        </section>
                    </Col>
                    <Col span={6} xs={12} sm={6}>
                        <section className="forms-box">
                            <span>待确认</span>
                            <div className="forms-box-middle">
                                <img src={require('../../images/docs.png')} alt=""/>
                                <p>文件标题我没我昂热</p>
                            </div>
                            <p className="upload-time">上传时间：2019-9-21 12：32</p>
                        </section>
                    </Col>
                    <Col span={6} xs={12} sm={6}>
                        <section className="forms-box">
                            <span>待确认</span>
                            <div className="forms-box-middle">
                                <img src={require('../../images/docs.png')} alt=""/>
                                <p>文件标题我没我昂热</p>
                            </div>
                            <p className="upload-time">上传时间：2019-9-21 12：32</p>
                        </section>
                    </Col>
                </Row>
            </div>
        </QueueAnim>
        
    )
}