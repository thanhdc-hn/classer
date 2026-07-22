import { Player, Transaction } from '../types.ts';
import { netOf } from './format.ts';

interface Balance {
  id: string;
  name: string;
  amount: number; // >0 được nhận, <0 phải trả (theo chip)
}

/**
 * Tính danh sách chuyển tiền để cân bằng net giữa các người chơi.
 *
 * - Nếu có nhà cái: mọi giao dịch đi qua nhà cái. Người thua trả chip cho nhà
 *   cái, nhà cái trả chip cho người thắng (nhà cái là trung gian gom/chia quỹ).
 * - Nếu không có nhà cái: dùng greedy ghép người thua ↔ người thắng để tối
 *   giản số giao dịch.
 *
 * Chỉ tính những người đã nhập cash-out.
 */
export const computeSettlement = (players: Player[]): Transaction[] => {
  const EPS = 0.5; // dưới 0.5 chip coi như bằng 0
  const settled = players.filter((p) => p.cashOut != null);
  const banker = players.find((p) => p.isBanker);

  // Mọi giao dịch đi qua nhà cái
  if (banker) {
    const transactions: Transaction[] = [];
    for (const p of settled) {
      if (p.id === banker.id) continue;
      const net = netOf(p);
      if (net > EPS) {
        // Nhà cái trả cho người thắng
        transactions.push({
          fromId: banker.id,
          fromName: banker.name,
          toId: p.id,
          toName: p.name,
          amount: Math.round(net),
        });
      } else if (net < -EPS) {
        // Người thua trả cho nhà cái
        transactions.push({
          fromId: p.id,
          fromName: p.name,
          toId: banker.id,
          toName: banker.name,
          amount: Math.round(-net),
        });
      }
    }
    return transactions;
  }

  const balances: Balance[] = settled.map((p) => ({
    id: p.id,
    name: p.name,
    amount: netOf(p),
  }));

  const debtors = balances
    .filter((b) => b.amount < -EPS)
    .map((b) => ({ ...b }));
  const creditors = balances
    .filter((b) => b.amount > EPS)
    .map((b) => ({ ...b }));

  // Nợ nhiều nhất trước (amount âm nhất), nhận nhiều nhất trước
  debtors.sort((a, b) => a.amount - b.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const transactions: Transaction[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const pay = Math.min(-debtor.amount, creditor.amount);

    if (pay > EPS) {
      transactions.push({
        fromId: debtor.id,
        fromName: debtor.name,
        toId: creditor.id,
        toName: creditor.name,
        amount: Math.round(pay),
      });
    }

    debtor.amount += pay;
    creditor.amount -= pay;

    if (Math.abs(debtor.amount) <= EPS) i++;
    if (Math.abs(creditor.amount) <= EPS) j++;
  }

  return transactions;
};
