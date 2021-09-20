import React from 'react';

class DetailBox extends React.Component{

  render(){
    return( 
       <div
        className="detail-box"
        onClick={()=> this.props.onClick()}
        >
            <div className="box-icon">
                <img src={this.props.logo} alt="Points"></img>
            </div>
            <div className="box-content">
                <div className="box-value">
                    {this.props.value || "NA"}
                </div>
                <div className="box-text">
                    {this.props.text}
                </div>
            </div>
        </div>
    );
  }
}
export default DetailBox;
