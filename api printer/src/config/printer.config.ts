import { ThermalPrinter, types } from "node-thermal-printer";
let pte: any;
export const CONNECT_PT = () => {
  let pt = new ThermalPrinter({
    type: types.EPSON,
    interface: "tcp://192.168.1.190:9100",
  });
  console.log("connect printer");
  pte = pt;
};
export const USE_PRINTER = () => {
  return pte;
};
