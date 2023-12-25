import axios from "axios";
import {BASE_URL,API_KEY}  from '../app.json'
class OTP {
    public phone: string;
    public otp: string;
    public otpId: string;
    constructor(phone: string) {
        this.phone = phone;
        this.otp = "";
        this.otpId = "";


    }
    public reuquestOTP() {
        try {
            axios.post(`${BASE_URL}/otp`, {
                apiKey:API_KEY,
                request:'get',
                phone: this.phone
            }).then((res) => {
                this.otp = res.data.otp;
                this.otpId = res.data.otpId;
            }).catch((err) => {
                throw err;

            })
        } catch (error) {
            throw error;
        }
    }

}