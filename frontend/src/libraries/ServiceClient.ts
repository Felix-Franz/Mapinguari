import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import LegalType from "../core/types/LegalType";
import ServiceEnum from "../core/types/ServiceEnum";

export default class ServiceClient {

    private static Requester : AxiosInstance = Axios.create();
    private static pathInterceptor: number = -1;
    
    public static configure(apiUrl: string = `${process.env.PUBLIC_URL}`){
        if (this.pathInterceptor !== -1)
        this.Requester.interceptors.request.eject(this.pathInterceptor);
        this.pathInterceptor = this.Requester.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
            config.url = `${apiUrl}${config.url}`;
            return config;
        }, (config: AxiosRequestConfig): AxiosRequestConfig => config);
    }

    private static async call(config: AxiosRequestConfig) : Promise<any>{
        return new Promise((resolve, reject) => {
            this.Requester(config)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }

    public static async getMeeting(): Promise<string>{
        return this.call({
            method: 'GET',
            url: ServiceEnum.Meeting
        });

    }

    public static async getLegal(): Promise<LegalType>{
        return this.call({
            method: 'GET',
            url: ServiceEnum.Legal
        });

    }

}