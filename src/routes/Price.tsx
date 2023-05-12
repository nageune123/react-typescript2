import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "./Api";


const PriceDiv = styled.div`
    
    background-color:#353b48;
    padding:10px;
    border-radius:15px;
    margin:5px;
`;
const Loader = styled.span`
text-align : center;
display:block;
color:white;

`;

interface IHistorycal2 {
    close: string;
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
    volume: string;
}
interface ChartProps2 {
    coinId: string;
}
function Price({ coinId }: ChartProps2) {
    const { isLoading, data } = useQuery<IHistorycal2[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId)
    );
    console.log(data);
    const lastPrice = data?.map((price) => Number(price.close)) as number[];
    const higtPrice = data?.map((price) => Number(price.high)) as number[];
    const lowPrice = data?.map((price) => Number(price.low)) as number[];

    return <div>
        {isLoading ? <Loader>loading...</Loader> :
            <> 
            <PriceDiv>
                <Loader>최고 가격</Loader>
                <Loader>{higtPrice[0]}</Loader>
            </PriceDiv>
                <PriceDiv>
                    <Loader>최저 가격</Loader>
                    <Loader>{lowPrice[0]}</Loader>
                </PriceDiv></>}

    </div>

}

export default Price;