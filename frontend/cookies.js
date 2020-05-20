import {Component} from "@angular/core";
import React from 'react';
import 'cookies.css';
import {ReturnStatement} from "@angular/compiler";


export default class cookies extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ifAccepted: localStorage.getItem('cookies') ? true: false
    }
  }


  returnToPreviousPage(){
    this.props.history.returnToPreviousPage();
  }

  flipCheckedBox(){
    let check;

    if(this.state.ifAccepted){
      check = false;
    }else {
      check = true;
    }

    if(check){
      localStorage.setItem('cookies', 'accepted');
    }else{
      localStorage.removeItem('cookies');
    }

    this.setState({ifAccepted: check});

  }

}
