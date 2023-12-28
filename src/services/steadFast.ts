import axios from "axios";

class SteadFast {
  account_: any;
  private token_: any;
  private client_: any;
  constructor({ account, token }) {
    this.account_ = account
    this.token_ = token
    this.client_ = axios.create({
      baseURL: `https://${account}/api/v1`,
      headers: {
        "content-type": "application/json"
      },
    })
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