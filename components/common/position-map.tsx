import SoccerLineUp, { type Team } from 'react-soccer-lineup';

export default function PositionMap () {
 
    
    const awayTeam: Team = {
      squad: {
        df: [{ number: 5 , name: "Center Back", offset: { x: 20, y: 20 }}],
        cm: [{ number: 6 , name: "Left Wing" ,  offset: { x: 22, y: -33 }}  ],
      },
      style: {
        borderColor: '#ffffff',
        nameColor: "#333333 " ,  
      }
      
      
    };
    
    return (
        <SoccerLineUp
          size='responsive'
          color='#479A3B'
          pattern='squares' 
          awayTeam={awayTeam}
         
        />
    );
}