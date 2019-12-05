import React from 'react';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';

export default function Download (props){

    return(
        <QueueAnim>
            <div className="download-wrap" key="w">
                <a href={require('../../utility/form.xls')} download="导单表格模板.xls">
                    <img src={require('../../images/download_form.png')} alt=""/>
                </a>

                <div className="next-step">
                    <Button type="primary" block size="large" onClick={()=>props.handleStepChange(2)}>下一步</Button>
                </div>
            </div>
        </QueueAnim>
        
    )
}