// {
//        "data": {
//          "nameStore": "So 2 Duong 449 - 449E Duong Le Van Viet, Phuong Tang Nhon Phu A, TP. Thu Duc, TP. Ho Chi Minh, Viet Nam",
//          "storeCode": "Store:SG0199",
//          "fullName": "Hồ Nguyên Lộc",
//          "receipt": "115",
//          "date": "Tue 15 Apr 2025 21:22:27",
//          "terminal": "02",
//          "barcode": "20250415-QQT",
//          "product": [
//            {
//              "articleName": "STING Nuoc Tang Luc Nhan Sam 330ml/1 Chai",
//              "barcode": "8934588173073",
//              "sellingPrice": 15000,
//              "quantity": 1
//            },
//            {
//              "articleName": "STING Nuoc Tang Luc Dau Lon Cao 330ml/1 Lon",
//              "barcode": "8934588232220",
//              "sellingPrice": 1000,
//              "quantity": 1
//            },
//            {
//              "articleName": "STING Nuoc Tang Luc Nhan Sam Lon Cao 330ml/1 Lon",
//              "barcode": "8934588172229",
//              "sellingPrice": 1000,
//              "quantity": 1
//            }
//          ],
//          "promotion": [
//            {
//              "articleName": "Binh giu nhiet Red Festival",
//              "barcode": "701202479686",
//              "sellingPrice": 350000
//            }
//          ],
//          "discount": [
//            {
//              "titleDiscount": "NW-Monthly Apr 25-Mua 2 tang 1",
//              "barcode": "8934588173073",
//              "sellingPrice": 15000,
//              "quantity": 1
//            }
//          ],
//          "payment": {
//            "type": "Card",
//            "typeCard": "VISA",
//            "totalPay": 350000,
//            "refernceId": "111111111111",
//            "apprCode": "111111",
//            "TranID": "111111",
//            "changeDue": 0
//          }
//        }
//      }

import { USE_PRINTER } from "../config/printer.config";
import {
  convertStringToUpperCase,
  removeVietnameseTones,
} from "../utils/converReceipt";
import { delay } from "../utils/crypto";

export const printest = async () => {
  const pt = USE_PRINTER();
  pt.alignCenter();
  pt.println("Circlek");
  pt.alignLeft();
  pt.print("\n\n\n");
  const cutOptions = {
    verticalTabAmount: 0,
  };
  pt.cut(cutOptions);
  await pt.execute();
};

export const printCirclekBill = async (data: any) => {
  const ESC = String.fromCharCode(27);
  const lineSpacingCommand = ESC + "3" + String.fromCharCode(65);
  const printer = USE_PRINTER();
  printer.print(lineSpacingCommand);
  printer.alignCenter();
  await printer.printImage("./src/assets/logoCk.png");
  printer.setTypeFontA();
  printer.bold(true);
  printer.println(data.storeCode);
  printer.bold(false);
  printer.println(data.nameStore);
  printer.bold(true);
  printer.alignLeft();
  printer.println(`  Receipt:${convertStringToUpperCase(data.receipt)}`);
  printer.bold(false);
  printer.println(`  Date:${data.date}`);
  printer.println(`  Terminal:${data.terminal}`);
  printer.println(`  CashierName:${removeVietnameseTones(data.fullName)}`);
  printer.bold(true);
  printer.tableCustom([
    { text: "  ITEM", align: "LEFT", width: 0.2 },
    { text: "UniPrice", align: "LEFT", width: 0.25 },
    { text: "Qty", align: "LEFT", width: 0.2 },
    { text: "Amount", align: "RIGHT", width: 0.25 },
  ]);
  printer.bold(false);
  printer.println("----------------------------------------------");

  data.product.map((item: any) => {
    if (item.quantity > 1) {
      printer.println("  " + item.articleName.slice(0, 42));
      printer.tableCustom([
        {
          text: "       " + item.sellingPrice.toLocaleString(),
          align: "LEFT",
          width: 0.33,
        },
        {
          text:
            item.quantity >= 10 && item.quantity < 100
              ? " " + String(item.quantity)
              : String(item.quantity),
          align: "CENTER",
          width: item.quantity >= 10 && item.quantity < 100 ? 0.27 : 0.27,
        },
        {
          text:
            item.type === "product"
              ? " " + (item.sellingPrice * item.quantity).toLocaleString()
              : " " + (item.discountPrice * item.quantity).toLocaleString(),
          align: "RIGHT",
          width: 0.37,
        },
      ]);
    } else {
      printer.tableCustom([
        {
          text: "  " + item.articleName.slice(0, 32),
          align: "LEFT",
          width: 0.73,
        },
        {
          text:
            item.type === "product"
              ? (item.sellingPrice * item.quantity).toLocaleString()
              : (item.discountPrice * item.quantity).toLocaleString(),
          align: "RIGHT",
          width: 0.2,
        },
      ]);
    }
  });
  data.promotion &&
    data.promotion.map((item: any) => {
      if (item.quantity > 1) {
        printer.println("  " + item.articleName.slice(0, 42));
        printer.tableCustom([
          {
            text: "       " + item.sellingPrice.toLocaleString(),
            align: "LEFT",
            width: 0.33,
          },
          {
            text:
              item.quantity >= 10 && item.quantity < 100
                ? " " + String(item.quantity)
                : String(item.quantity),
            align: "CENTER",
            width: item.quantity >= 10 && item.quantity < 100 ? 0.27 : 0.27,
          },
          {
            text:
              item.type === "product"
                ? " " + (item.sellingPrice * item.quantity).toLocaleString()
                : " " + (item.discountPrice * item.quantity).toLocaleString(),
            align: "RIGHT",
            width: 0.37,
          },
        ]);
      } else {
        printer.tableCustom([
          {
            text: "  " + item.articleName.slice(0, 32),
            align: "LEFT",
            width: 0.73,
          },
          {
            text:
              item.type === "product"
                ? (item.sellingPrice * item.quantity).toLocaleString()
                : (item.discountPrice * item.quantity).toLocaleString(),
            align: "RIGHT",
            width: 0.2,
          },
        ]);
      }
    });

  printer.println("----------------------------------------------");
  printer.bold(true);
  printer.tableCustom([
    {
      text: "Total Item(s) Qty:",
      align: "RIGHT",
      width: 0.5,
      style: "B",
    },

    {
      text: data.product
        .reduce((acc: any, item: any) => acc + item.quantity, 0)
        .toString(),
      align: "RIGHT",
      width: 0.45,
      style: "B",
    },
  ]);
  printer.bold(false);
  printer.tableCustom([
    {
      text: "Subtotal:",
      align: "RIGHT",
      width: 0.5,
    },

    {
      text:
        (
          data.product.reduce(
            (acc: any, item: any) => acc + item.sellingPrice * item.quantity,
            0
          ) +
          data.promotion.reduce(
            (acc: any, item: any) => acc + item.sellingPrice * item.quantity,
            0
          )
        ).toLocaleString() + " VND",
      align: "RIGHT",
      width: 0.45,
    },
  ]);
  data.discount.length > 0 &&
    printer.tableCustom([
      {
        text: "Total Discount:",
        align: "RIGHT",
        width: 0.5,
      },

      {
        text:
          "-" +
          data.discount
            .reduce(
              (acc: any, item: any) => acc + item.sellingPrice * item.quantity,
              0
            )
            .toLocaleString() +
          " VND",
        align: "RIGHT",
        width: 0.45,
      },
    ]);
  printer.setTextDoubleHeight();
  printer.bold(true);
  const total =
    data.product.reduce(
      (acc: any, item: any) => acc + item.sellingPrice * item.quantity,
      0
    ) +
    data.promotion.reduce(
      (acc: any, item: any) => acc + item.sellingPrice * item.quantity,
      0
    ) -
    data.discount.reduce(
      (acc: any, item: any) => acc + item.sellingPrice * item.quantity,
      0
    );
  printer.println(
    `            Total(+VAT):${
      total >= 1000000
        ? "         " + total.toLocaleString()
        : total >= 100000
        ? "           " + total.toLocaleString()
        : total >= 10000
        ? "            " + total.toLocaleString()
        : "             " + total.toLocaleString()
    } VND`
  );

  printer.bold(false);
  printer.setTextNormal();
  printer.println("----------------------------------------------");
  if (data.payment.type === "Cash") {
    printer.tableCustom([
      {
        text: data.payment.type + ":",
        align: "RIGHT",
        width: 0.5,
      },

      {
        text: data.payment.totalPay.toLocaleString() + " VND",
        align: "RIGHT",
        width: 0.45,
      },
    ]);
    printer.bold(true);
    printer.tableCustom([
      {
        text: "CHANGE DUE:",
        align: "RIGHT",
        width: 0.5,
      },

      {
        text: data.payment.changeDue.toLocaleString() + " VND",
        align: "RIGHT",
        width: 0.45,
      },
    ]);
  }
  if (data.payment.type === "VNPAY") {
    printer.tableCustom([
      {
        text: data.payment.type + ":",
        align: "RIGHT",
        width: 0.5,
      },

      {
        text: data.payment.totalPay.toLocaleString() + " VND",
        align: "RIGHT",
        width: 0.45,
      },
    ]);
    printer.println(`       --Bill No. :${data.payment.billNo}`);
    printer.println("");
    printer.println(`       --Trans ID: ${data.payment.transId}`);
    printer.println(`       --Khong Doi Tra Hang Khi Thanh Toan Bang VNPAY`);

    printer.bold(true);
    printer.tableCustom([
      {
        text: "CHANGE DUE:",
        align: "RIGHT",
        width: 0.5,
      },

      {
        text: data.payment.changeDue.toLocaleString() + " VND",
        align: "RIGHT",
        width: 0.45,
      },
    ]);
  }
  if (data.payment.type === "MomoQR") {
    printer.tableCustom([
      {
        text: data.payment.type + ":",
        align: "RIGHT",
        width: 0.5,
      },

      {
        text: data.payment.totalPay.toLocaleString() + " VND",
        align: "RIGHT",
        width: 0.45,
      },
    ]);
    printer.println(`       --Bill No. :${data.payment.billNo}`);
    printer.println("");
    printer.println(`       --Trans ID: ${data.payment.transId}`);
    printer.println(`       --Khong Doi Tra Hang Khi Thanh Toan Bang Momo`);

    printer.bold(true);
    printer.tableCustom([
      {
        text: "CHANGE DUE:",
        align: "RIGHT",
        width: 0.5,
      },

      {
        text: data.payment.changeDue.toLocaleString() + " VND",
        align: "RIGHT",
        width: 0.45,
      },
    ]);
  }
  if (data.payment.type === "Card") {
    printer.tableCustom([
      {
        text: data.payment.type + ":",
        align: "RIGHT",
        width: 0.5,
      },

      {
        text: data.payment.totalPay.toLocaleString() + " VND",
        align: "RIGHT",
        width: 0.45,
      },
    ]);
    printer.println(`       --           ${data.payment.cardType}`);
    printer.println(`       --ReferenceId: ${data.payment.referenceId}`);
    printer.println(`       --ApprCode: ${data.payment.apprCode}`);
    printer.println(`       --  TranID: ${data.payment.tranID}`);
    printer.bold(true);
    printer.tableCustom([
      {
        text: "CHANGE DUE:",
        align: "RIGHT",
        width: 0.5,
      },

      {
        text: data.payment.changeDue.toLocaleString() + " VND",
        align: "RIGHT",
        width: 0.45,
      },
    ]);
  }
  printer.bold(false);
  printer.println("----------------------------------------------");
  printer.alignCenter();
  printer.code128(data.barcode.toString(), {
    width: 2,
    height: 70,
  });
  printer.println("");
  printer.println("");
  printer.println("");
  printer.println("");
  const cutOptions = {
    verticalTabAmount: 0,
  };
  printer.cut(cutOptions);
  await printer.execute();
  await delay(1000);
  printer.clear();
};
