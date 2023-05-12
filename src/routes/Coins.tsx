import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useQuery} from "react-query";
import { fetchCoins } from "./Api";




const Container = styled.div`
padding: 0px 20px;
max-width:480px;
margin:0 auto;
`;
const Header = styled.header`
height:10vh;
display:flex;
justify-content:center;
align-items:center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
background-color:white ;
color:${props => props.theme.bgColor};
margin-bottom : 10px;
border-radius:15px;
a{
    transition : color 0.2s ease-in;
    display:flex;
    padding:20px;
    align-items:center;
}
&:hover{
    a{
        color:${props => props.theme.accentColor};
    }
}
`;

const Title = styled.h1`
font-size:48px;
  color:${props => props.theme.accentColor}; 

`;
const Loader = styled.span`
text-align : center;
display:block;

`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

const Img = styled.img`
width:35px;
height:35px;
margin-right:10px;
`;




function Coins() {
   const {isLoading,data} = useQuery<ICoin[]>("AllCoins",fetchCoins);
   console.log(data);
//    const (toggle,setToggle) = useState(true);

    return <Container>
     
        <Header>
            <Title>코인</Title>
        </Header>
       
        {isLoading ? <Loader>"Loading..."</Loader> : <CoinsList>
            {data?.slice(0,100).map(coin => <Coin key={coin.id}>
                <Link to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name },
                }}>
                    <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                    {coin.name} &rarr;</Link></Coin>)}
        </CoinsList>}
       
    </Container>



}
export default Coins;