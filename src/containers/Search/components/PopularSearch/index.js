import React, { Component } from 'react';
import './style.css'

class PopularBox extends Component {

  render() {
    const data = ['三里屯','朝阳大悦城','西单','海底捞','星巴克','局气','火锅','温泉','烤鸭']

    return (
      <div className="popularSearch">
        {
          data.map((item,index) => {
            return (
              <span key={index} className="popularSearch__item">{item}</span>
            )
          })
        }
      </div>
    );
  }
}

export default PopularBox;
