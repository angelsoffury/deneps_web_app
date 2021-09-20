import React from 'react';
import DetailBox from '../../components/DetailBox';
import pointsIcon from '../../assets/pointsIcon.png';
import rewardsIcon from '../../assets/rewardsIcon.png';
import requestIcon from '../../assets/requestIcon.png';
import orderIcon from '../../assets/orderIcon.png';
import { useHistory } from 'react-router-dom';
import "./Dashboard.css";
import PointsGraph from '../../components/PointsGraph';

export default function Dashboard() {
  let history = useHistory();
  return(
    <div>
      
  <div id="main">
    <h2>Dashboard</h2>
    <div class="detail-summary">
    <DetailBox logo={pointsIcon} text= "Total Points" onClick={()=> {history.push('/points')}}/>
    <DetailBox logo={rewardsIcon} text="Points to Redeem" onClick={()=>{history.push('/points')}} />
    <DetailBox logo={requestIcon} text="Pending Requests" onClick={()=>{history.push('/requests')}} />
    <DetailBox logo={orderIcon} text="Pending Orders" onClick={()=>{history.push('/orders' )}} />
    </div>
    <div class="points-graph">
      <PointsGraph/>
    </div>
  </div>
    </div>
    
  );
  
}