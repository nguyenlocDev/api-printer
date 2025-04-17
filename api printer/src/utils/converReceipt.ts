export function convertStringToUpperCase(str: string) {
  if (!/^\d{1,3}$/.test(str)) {
    return "Đầu vào không hợp lệ, cần chuỗi số có 1 hoặc 2 ký tự.";
  }

  const mapping = {
    "0": "p",
    "1": "q",
    "2": "w",
    "3": "e",
    "4": "r",
    "5": "t",
    "6": "y",
    "7": "u",
    "8": "i",
    "9": "o",
  };

  return str
    .split("")
    .map((digit) => mapping[digit as keyof typeof mapping].toUpperCase())
    .join("");
}

export function removeVietnameseTones(str: string): string {
  return str
    .normalize("NFD") // Chuẩn hóa chuỗi thành dạng tách rời ký tự và dấu
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu thanh (diacritics)
    .replace(/đ/g, "d") // Thay 'đ' thành 'd'
    .replace(/Đ/g, "D"); // Thay 'Đ' thành 'D')
}
