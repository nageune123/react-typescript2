import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "./Api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atom";
import { useRecoilValue } from "recoil";

interface ChartProps {
    coinId: string;

}
interface IHistorycal {
    close: string;
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
    volume: string;
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorycal[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {
        refetchInterval: 5000,
    });
    const isDark = useRecoilValue(isDarkAtom);
    
    return <div> {isLoading ? "Loading chart.." :
        <ApexChart
            type="candlestick"
            series={[
                {
                    name: "Price",
                    data: data?.map((price) => ({
                        x: new Date(price.time_close),
                        y: [
                            Number(price.open),
                            Number(price.high),
                            Number(price.low),
                            Number(price.close)
                        ]
                    })) || []
                }
            ]}
            options={{
                theme: {
                    mode: isDark ? "dark" : "light",
                },
                chart: {
                    height: 300,
                    width: 500,
                    background: '#fff',
                    toolbar: {
                        show: false,
                    }
                },
                grid: {
                    show: false,
                },
                xaxis: {
                    labels: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    axisBorder: {
                        show: false
                    },
                    categories: data?.map((price) => (price.time_close)),
                    type: "datetime",
                },
                yaxis: {
                    show: false
                },
                stroke: {
                    curve: "smooth",
                    width: 3,
                },
                fill: {
                    type: "gradient",
                    gradient: { gradientToColors: ["#1dd1a1"], stops: [0, 100], },
                },
                colors: ["#0abde3"],
                tooltip: {
                    y: {
                        formatter: (value) => `$ ${value.toFixed(2)}`,
                    }
                }


            }}



        />}
    </div>;

}

export default Chart;