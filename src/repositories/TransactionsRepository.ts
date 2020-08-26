import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes: number = this.transactions
      .map(t => (t.type === 'income' ? t.value : 0))
      .reduce((total, num) => total + num);

    const outcomes: number = this.transactions
      .map(t => (t.type === 'outcome' ? t.value : 0))
      .reduce((total, num) => total + num);

    return {
      income: incomes,
      outcome: outcomes,
      total: incomes - outcomes,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
