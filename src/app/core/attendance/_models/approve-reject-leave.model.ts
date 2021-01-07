export class ApproveRejectLeaveModel {
    approveOrRejectReason: string;
    id: number;
    status: number;

    clear() {
        this.id = 0;
        this.approveOrRejectReason = '';
        this.status = 0;
    }
}
