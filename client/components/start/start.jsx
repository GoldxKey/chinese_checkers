import React, { Component } from 'react';
import { getUserName } from 'SERVICE/user.service';

export default class StartComponent extends Component {
  constructor() {
    super();

    this.nextBtnDisabled = false;

    this.updateUserName = (ev) => {
      let name = ev.target.value;
      this.nextBtnDisabled = name.length <= 0;
      this.props.updateUserInfo('name', name);
    };

    this.parameToGame = {
      roomID: '123456',
      players: '2',
      getLink() {
        return `/game/?roomID=${this.roomID}&players=${this.players}`;
      }
    };

    this.setNum = (ev) => {
      let val = ev.target.value;
      this.parameToGame.players = val;
      // change roomID
    };

    this.goToGame = () => {
      this.props.history.pushState(null, this.parameToGame.getLink());
    };
  }

  componentWillMount() {
    if (!this.props.user.name || !this.props.user.name.length) {
      getUserName().then((data) => this.props.updateUserInfo('name', data.data));
    }
  }

  render() {
    return (
      <section className="text-center">
        <div className="form-group">
          <input className="form-control" type="text" placeholder="设置昵称" value={this.props.user.name} onChange={this.updateUserName} />
        </div>
        <div className="form-group">
          <label>
            <input className="form-control" type="radio" name="num" value="2" onChange={this.setNum} defaultChecked />
            <span>两个玩家</span>
          </label>
          <label>
            <input className="form-control" type="radio" name="num" value="3" onChange={this.setNum} />
            <span>三个玩家</span>
          </label>
          <label>
            <input className="form-control" type="radio" name="num" value="4" onChange={this.setNum} />
            <span>四个玩家</span>
          </label>
          <label>
            <input className="form-control" type="radio" name="num" value="6" onChange={this.setNum} />
            <span>六个玩家</span>
          </label>
        </div>
        <button className="btn btn-primary" onClick={this.goToGame} disabled={this.nextBtnDisabled}>开始</button>
      </section>
    );
  }
};
