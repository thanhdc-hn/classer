// Tất cả số lượng được lưu theo đơn vị "chip". Ví dụ: 100 = 100 chip.

export interface BuyIn {
  id: string;
  amount: number; // theo chip
  at: number; // timestamp
}

export interface Player {
  id: string;
  name: string;
  buyIns: BuyIn[];
  cashOut: number | null; // theo chip, null = chưa nhập
  isBanker: boolean; // nhà cái
}

export interface Transaction {
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  amount: number; // theo chip
}
