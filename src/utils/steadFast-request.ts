import axios from "axios";

class SteadFast {
  private client_: any;
  constructor({apiKey, secretKey }) {
    this.client_ = axios.create({
      baseURL: `https://portal.steadfast.com.bd/api/v1`,
      headers: {
        "Content-Type": "application/json",
        "Api-Key": apiKey,
        "Secret-Key": secretKey,
      },
    });
  }

  async request(data: any) {
    return this.client_(data).then(({ data }) => data)
  }
    
  steadFastSingleOrder = () => {
    return {
        create: async (data: any) => {
            const path = `/create_orders`
            return this.client_({
                method: "POST",
                url: path,
                data: {
                  data,
                },
            }).then(({ data }) => data)
        },
    }
  }
}

export default SteadFast