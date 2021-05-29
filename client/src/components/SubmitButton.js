import React from 'react';

class SubmitButton extends React.Component{

  render(){
    return(
       <button
           className={this.props.className}
           disabled={this.props.disabled}
           onClick={()=> this.props.onClick()}
        >
            {this.props.text}
       </button>
    );
  }
}
export default SubmitButton;
