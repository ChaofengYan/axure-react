/**
* 开发和生产环境公用的组件
*/
require('antd/style/index.less');
 import React from "react"
 import ReactDOM from "react-dom"
 import Antd from 'antd';
 import CommonDropTarget from './dblPlayGround/CommonDropTarget'
 window.React = React;
 window.ReactDOM = ReactDOM;
 window.CommonDropTarget = CommonDropTarget;
 for (var item in Antd) {
 	if (Antd.hasOwnProperty(item)) {
 		window[item] = Antd[item];
 	}
 }

 