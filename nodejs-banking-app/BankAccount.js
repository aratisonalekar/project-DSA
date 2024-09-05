import { LinkedList } from './LinkedList';
import { TreeNode } from './TreeNode';

export class Bank {
    constructor() {
        this.accounts = new LinkedList();
        this.treeRoot = null;
    }

    addAccount(accountNumber, balance) {
        this.accounts.add(accountNumber, balance);
        this.treeRoot = this.addTreeNode(this.treeRoot, accountNumber, balance);
    }

    addTreeNode(node, accountNumber, balance) {
        if (!node) {
            return new TreeNode(accountNumber, balance);
        }
        if (accountNumber < node.accountNumber) {
            node.left = this.addTreeNode(node.left, accountNumber, balance);
        } else {
            node.right = this.addTreeNode(node.right, accountNumber, balance);
        }
        return node;
    }

    transfer(fromAccountNumber, toAccountNumber, amount) {
        const fromAccount = this.findTreeNode(this.treeRoot, fromAccountNumber);
        const toAccount = this.findTreeNode(this.treeRoot, toAccountNumber);
        if (fromAccount && toAccount && fromAccount.balance >= amount) {
            fromAccount.balance -= amount;
            toAccount.balance += amount;
            return true;
        }
        return false;
    }

    checkBalance(accountNumber) {
        const account = this.findTreeNode(this.treeRoot, accountNumber);
        return account ? account.balance : null;
    }

    findTreeNode(node, accountNumber) {
        if (!node) {
            return null;
        }
        if (accountNumber === node.accountNumber) {
            return node;
        }
        if (accountNumber < node.accountNumber) {
            return this.findTreeNode(node.left, accountNumber);
        }
        return this.findTreeNode(node.right, accountNumber);
    }
}

export default BankAccount;