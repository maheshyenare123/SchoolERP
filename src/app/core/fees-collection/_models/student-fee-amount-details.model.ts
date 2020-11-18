export class StudentFeeAmountDetailsModel {
    amount: number;
    amountDiscount: number;
    amountFine: number;
    date: string;
    description: number;
    id: number;
    paymentMode: number;

    clear() {
        this.amount = 0;
        this.amountDiscount = 0;
        this.amountFine = 0;
        this.date = '';
        this.description= 0;
        this.id= 0;
        this.paymentMode= 0;
    }
}