import { NextRequest, NextResponse } from "next/server";

// Authorize.net SDK
const ApiContracts = require("authorizenet").APIContracts;
const ApiControllers = require("authorizenet").APIControllers;
const SDKConstants = require("authorizenet").Constants;

// Get credentials from environment variables
const API_LOGIN_ID = process.env.AUTHORIZE_NET_API_LOGIN_ID;
const TRANSACTION_KEY = process.env.AUTHORIZE_NET_TRANSACTION_KEY;
const IS_SANDBOX = process.env.AUTHORIZE_NET_ENVIRONMENT !== "production";

interface PaymentRequest {
  amount: number;
  cardNumber: string;
  expirationDate: string; // Format: "MMYY" or "MM/YY"
  cardCode: string; // CVV
  firstName: string;
  lastName: string;
  email: string;
  description?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json();

    // Validate required fields
    if (!body.amount || !body.cardNumber || !body.expirationDate || !body.cardCode) {
      return NextResponse.json(
        { success: false, error: "Missing required payment fields" },
        { status: 400 }
      );
    }

    if (!API_LOGIN_ID || !TRANSACTION_KEY) {
      console.error("Authorize.net credentials not configured");
      return NextResponse.json(
        { success: false, error: "Payment system not configured" },
        { status: 500 }
      );
    }

    // Create merchant authentication
    const merchantAuthentication = new ApiContracts.MerchantAuthenticationType();
    merchantAuthentication.setName(API_LOGIN_ID);
    merchantAuthentication.setTransactionKey(TRANSACTION_KEY);

    // Create credit card payment type
    const creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(body.cardNumber.replace(/\s/g, "")); // Remove spaces
    creditCard.setExpirationDate(body.expirationDate.replace("/", "")); // Format: MMYY
    creditCard.setCardCode(body.cardCode);

    const paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    // Create order information
    const orderDetails = new ApiContracts.OrderType();
    orderDetails.setInvoiceNumber(`INV-${Date.now()}`);
    orderDetails.setDescription(body.description || "JHEAC Donation/Course Payment");

    // Create customer information
    const customerData = new ApiContracts.CustomerDataType();
    customerData.setType(ApiContracts.CustomerTypeEnum.INDIVIDUAL);
    customerData.setEmail(body.email);

    // Create billing address
    const billTo = new ApiContracts.CustomerAddressType();
    billTo.setFirstName(body.firstName);
    billTo.setLastName(body.lastName);

    // Create transaction request
    const transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(
      ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
    );
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(body.amount.toFixed(2));
    transactionRequestType.setOrder(orderDetails);
    transactionRequestType.setCustomer(customerData);
    transactionRequestType.setBillTo(billTo);

    // Create the API request
    const createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthentication);
    createRequest.setTransactionRequest(transactionRequestType);

    // Execute the transaction
    const controller = new ApiControllers.CreateTransactionController(
      createRequest.getJSON()
    );

    // Set environment (sandbox or production)
    if (IS_SANDBOX) {
      controller.setEnvironment(SDKConstants.endpoint.sandbox);
    } else {
      controller.setEnvironment(SDKConstants.endpoint.production);
    }

    // Return a promise-based response
    return new Promise<NextResponse>((resolve) => {
      controller.execute(() => {
        const apiResponse = controller.getResponse();
        const response = new ApiContracts.CreateTransactionResponse(apiResponse);

        if (response !== null) {
          if (
            response.getMessages().getResultCode() ===
            ApiContracts.MessageTypeEnum.OK
          ) {
            const transactionResponse = response.getTransactionResponse();

            if (transactionResponse.getMessages() !== null) {
              resolve(
                NextResponse.json({
                  success: true,
                  transactionId: transactionResponse.getTransId(),
                  authCode: transactionResponse.getAuthCode(),
                  message: transactionResponse.getMessages().getMessage()[0].getDescription(),
                })
              );
            } else {
              const errors = transactionResponse.getErrors();
              resolve(
                NextResponse.json(
                  {
                    success: false,
                    error: errors
                      ? errors.getError()[0].getErrorText()
                      : "Transaction failed",
                  },
                  { status: 400 }
                )
              );
            }
          } else {
            const transactionResponse = response.getTransactionResponse();
            if (transactionResponse && transactionResponse.getErrors()) {
              resolve(
                NextResponse.json(
                  {
                    success: false,
                    error: transactionResponse.getErrors().getError()[0].getErrorText(),
                  },
                  { status: 400 }
                )
              );
            } else {
              resolve(
                NextResponse.json(
                  {
                    success: false,
                    error: response.getMessages().getMessage()[0].getText(),
                  },
                  { status: 400 }
                )
              );
            }
          }
        } else {
          resolve(
            NextResponse.json(
              { success: false, error: "No response from payment gateway" },
              { status: 500 }
            )
          );
        }
      });
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      { success: false, error: "Payment processing failed" },
      { status: 500 }
    );
  }
}

