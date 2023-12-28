import { Cart, Fulfillment, LineItem, Order, OrderService } from "@medusajs/medusa";
import { FulfillmentService } from "medusa-interfaces";
import SteadFast from "../utils/steadFast-request";

class SteadFastFulfillmentService extends FulfillmentService {
    static identifier = "steadfast";
    steadFastService: any;
    secrte_key: any;
    api_key: any;
    client_: any;
    orderService_: OrderService;
    options_: any;
    logger_: any;

    constructor(container: { steadFastService: any }, options: { secretKey: any, apiKey: any }) {
        super();
        this.steadFastService = container.steadFastService;
        this.secrte_key = options.secretKey;
        this.api_key = options.apiKey;
        
        // Pass API key and secret key to SteadFast constructor
        this.client_ = new SteadFast({
          secretKey: this.secrte_key,
          apiKey: this.api_key,
        });
      }

    async getFulfillmentOptions() {
        return [
            {
                id: "REGULAR",
                name: "Regular Delivery within - 24h"
            },
            {
                id: "EXPRESS",
                name: "Express Delivery within - 5h"
            },
            {
                id: "MULTIPLE",
                name: "Multiple Delivery within - 24h"
            },
        ]
    }

    async createFulfillment(data: Record<string, unknown>, items: LineItem, order: Order, fulfillment: Fulfillment) {
        const orderData = {
            invoice: order.id,
            recipient_name: order.customer.first_name,
            recipient_phone: order.customer.phone, 
            recipient_address: order.shipping_address.address_1 + order.shipping_address.city,
            cod_amount: order.subtotal,
            note: order
        }
        return this.client_.orders
        .create(orderData)
        .then((result: { data: any; }) => {
          return result.data
        })
        .catch((err: { response: any; }) => {
          throw err.response
        })
    }


    async calculatePrice(
        optionData: Record<string, unknown>,
        data: Record<string, unknown>,
        cart: Cart
      ): Promise<number> {
        throw new Error("Method not implemented.")
    }

    async canCalculate(
        data: Record<string, unknown>
      ): Promise<boolean> {
        return data.id === "steadFast"
    }

    async cancelFulfillment(fulfillment: Record<string, unknown>): Promise<any> {
        return {}
    }

    async validateFulfillmentData(
        optionData: Record<string, unknown>,
        data: Record<string, unknown>,
        cart: Cart
      ): Promise<Record<string, unknown>> {
        if (data.id !== "steadfast") {
          throw new Error("invalid data")
        }
        return { ...data, ...optionData, ...cart}
      }

    async validateOption(
        data: Record<string, unknown>
      ): Promise<boolean> {
        return data.id == "steadfast"
    }
}

export default SteadFastFulfillmentService;