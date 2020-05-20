import Component from 'react';
import React from 'react';
import cookies from "./cookies";

class app extends Component {

  constructor(props, context) {
    super(props,context);
    this.policyRef = React.createRef();
    this.state = {
      isPrivacyBanner: localStorage.getItem('cookies') ? false: true
    }

  }

  componentCount(){
    if(this.policyRef.current){
      this.policyRef.current.addEventListener(
        'accept', this.checkedChanged.bind(this)
      );
    }
  }

  checkChanged(){
    localStorage.setItem("cookies", "accepted");
    this.setState({isPrivacyBanner: false})
  }

  showBanner(){
    this.setState({isPrivacyBanner: true})
  }

  render(){
    const cookies = cookies;

    cookies.props.showBanner = this.showBanner().bind(this);


  }



}
