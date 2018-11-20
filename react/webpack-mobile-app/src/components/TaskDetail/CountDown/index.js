import React, { PureComponent } from 'react';
import './index.less'

export default class Index extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resetCount: (props.limitTime / 1000) || 0, // 剩余毫秒数
    }
    this.timer = null; // 定时器
    this.isInterrupt = false; // 是否中断
    if (props.limitTime > 0) { 
      this.countDown();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.limitTime !== nextProps.limitTime) {
      let time = (nextProps.limitTime >= 0) ? nextProps.limitTime : 0;
      time = time / 1000; // 转换成秒
      this.setState({ resetCount: time }, () => {
        if (time) {
          this.clearTimer();
          this.countDown();
        }
      })
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  // 强制中断
  interrupt = () => { 
    this.isInterrupt = true;
  }

  // 清楚定时
  clearTimer() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  // 倒计时
  countDown = () => {
    if (this.isInterrupt) { // 中断定时
      this.clearTimer()
      return;
    }

    this.timer = setTimeout(() => {
      let { resetCount } = this.state;
      if (resetCount > 0) {
        resetCount--;
        this.setState({ resetCount }, () => {
          this.countDown();
        });
      } else {
        this.props.autoInterruptTime()
        this.clearTimer()
      }
    }, 1000)
  }

  //将0-9的数字前面加上0，例1变为01
 checkTime(i) {  
    if(i < 10) { 
      i = "0" + i; 
    } 
    return i; 
  } 

  /**
   * 时间秒数格式化
   * @param s 时间戳（单位：秒）
   * @returns {*} 格式化后的时分秒
   */
  parseTime(s) {
    if (s <= 0 || !s) return '00:00:00';
    let hours = parseInt(s / 60 / 60 % 24 , 10); //计算剩余的小时 
    let minutes = parseInt(s / 60 % 60, 10);//计算剩余的分钟 
    let seconds = parseInt(s % 60, 10);//计算剩余的秒数 
    hours = this.checkTime(hours); 
    minutes = this.checkTime(minutes); 
    seconds = this.checkTime(seconds); 

    return `${hours}:${minutes}:${seconds}`;
  }

  render() {
    const { isRestartTask, limitTime, interruptTime } = this.props;
    const { resetCount } = this.state;
    const time = this.parseTime(resetCount);
    const giveupTask = limitTime > 0;

    return (
      <div className="count-down flex items-center">
        <span className="time">{time}</span>
        { isRestartTask && <span>任务超时</span> }
        { giveupTask && <button onClick={interruptTime} className="operate">放弃任务</button> }
      </div>
    )
  }
}