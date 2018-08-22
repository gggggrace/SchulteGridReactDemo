import React, { Component } from 'react';
import '../style/App.css';
// import ControlPanel from '../components/ControlPanel'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            cells: [
                {num: 1, color: ''},
                {num: 2, color: ''},
                {num: 3, color: ''},
                {num: 4, color: ''},
                {num: 5, color: ''},
                {num: 6, color: ''},
                {num: 7, color: ''},
                {num: 8, color: ''},
                {num: 9, color: ''},
                {num: 10, color: ''},
                {num: 11, color: ''},
                {num: 12, color: ''},
                {num: 13, color: ''},
                {num: 14, color: ''},
                {num: 15, color: ''},
                {num: 16, color: ''}
            ],
            order:0,
            restart:"Restart",
            timer:"", //定时器
            time:"00:00",
            dur:"0"
        };
    }
    //数字随机排列
    randomSort(){
       let self = this.state;
       let arr = self.cells;
       let res = [];
       for (let i = 0, len = arr.length; i < len; i++) {
            let j = Math.floor(Math.random() * arr.length);
            res[i] = arr[j];
            arr.splice(j, 1);
       }
        this.setState({
            order:1,
            cells:res
        });
    }

    //计时器
    timeCount(){
        let self = this;
        let timer, time;
        clearInterval(self.state.timer);
        timer = setInterval(function () {
            let dur = self.state.dur;
            dur = parseInt(dur,10) + 1;
            let mm = Math.floor(dur / 60);
            if (mm > 60) {
                mm = "00"
            }
            let ss = dur % 60;
            time = self.addNum(mm) + ":" + self.addNum(ss);
            self.setState({
                timer:timer,
                time:time,
                dur:dur
            })
        }, 1000);
    }
    //时间自动补全
    addNum(num){
        num = num < 10 ? ("0" + num) : num;
        return num;
    }

    // 按顺序点击
    cellClick = (_this,num,index) =>{
        let self = this;
        let order = self.state.order;
        let arr = self.state.cells;
        if(order === num){
            self.setState({
                order:order+1,
            });
            if(order === 16){
                clearInterval(self.state.timer);
                self.setState({
                    restart:"Continue",
                });
            }
            arr[index].color = 'correct';
            self.setState({
                cells:arr
            })
        }else{
            arr[index].color = 'wrong';
            self.setState({
                cells:arr
            })
        }
        setTimeout(function () {
            arr[index].color = '';
            self.setState({
                cells:arr
            })
        }, 1000);
    };
    // 重启
    restartBtn = () => {
        this.randomSort();
        this.timeCount();
        this.setState({
            restart:"Restart",
            time:"00:00",
            dur:"0"
        });
    };

    componentDidMount(){
        this.randomSort();
        this.timeCount();
    }

    render() {
        let self = this;
        let cellList = self.state.cells.map(function (cell,index) {
            return <div className={`schulteCell ${cell.color === 'wrong' ? "wrong" : ""} ${cell.color === 'correct' ? "correct" : ""}`} key={index} onClick={()=>self.cellClick(this,cell.num,index)}>{cell.num}</div>
        });

        return (
            <div className="App">
                <h2>Schulte Grid</h2>
                <div className="schulteHeader">
                    <div className="schulteTime">
                        <div>Time</div>
                        <div><span className="schulteSeconds">{this.state.time}</span></div>
                    </div>
                    <div className="schulteStage"><div>Stage</div><div>1</div></div>
                    <div className={`schulteBtn ${this.state.restart === 'Continue' ? 'red':""}`} onClick={this.restartBtn}>{this.state.restart}</div>
                </div>
                <div className="guideText"><b>Guide: </b> Click numbers one by one in order.</div>
                <div className="schulteContent">{cellList}</div>
                <div className="footer">
                    <span className="footer-text">Created by  <a href="https://github.com/gggggrace" target="_blank" rel="noopener noreferrer">gggggrace</a>  ,written in <a href="https://facebook.github.io/react" target="_blank" rel="noopener noreferrer">React</a></span>
                </div>
            </div>
        );
    }
}

export default App;
