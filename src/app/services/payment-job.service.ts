import { Injectable } from '@angular/core';
import { PaymentJobList } from '../models/payment-job-list';
import { PaymentJobStatus } from '../models/payment-job-status.enum';

@Injectable({
  providedIn: 'root'
})
export class PaymentJobService {
  private statusEnum = PaymentJobStatus;
  private tmpMock = 0;

  getJobList(idCreditor: string): PaymentJobList {
    const response = new PaymentJobList();
    // eslint-disable-next-line functional/immutable-data
    response.list =
      this.tmpMock < 4
        ? [
            {
              creditorId: 0,
              elaborationDate: '09/04/2021, 10:20',
              fileName: 'avvisi-1.csv',
              insertDate: '09/04/2021, 10:10',
              jobId: 0,
              nrecordAdded: 0,
              nrecordFound: 0,
              status: this.statusEnum.IN_CORSO
            }
          ]
        : [
            {
              creditorId: 0,
              elaborationDate: '09/04/2021, 10:20',
              fileName: 'avvisi-1.csv',
              insertDate: '09/04/2021, 10:10',
              jobId: 0,
              nrecordAdded: 10,
              nrecordFound: 10,
              status: this.statusEnum.OK
            },
            {
              creditorId: 0,
              elaborationDate: '09/04/2021, 11:20',
              fileName: 'avvisi-2.csv',
              insertDate: '09/04/2021, 11:10',
              jobId: 0,
              nrecordAdded: 300,
              nrecordFound: 300,
              status: this.statusEnum.OK
            },
            {
              creditorId: 0,
              elaborationDate: '09/04/2021, 12:20',
              fileName: 'avvisi-3.csv',
              insertDate: '09/04/2021, 12:10',
              jobId: 0,
              nrecordAdded: 15,
              nrecordFound: 20,
              status: this.statusEnum.PARZIALE
            },
            {
              creditorId: 0,
              elaborationDate: '09/04/2021, 13:20',
              fileName: 'avvisi-4.csv',
              insertDate: '09/04/2021, 13:10',
              jobId: 0,
              nrecordAdded: 0,
              nrecordFound: 0,
              status: this.statusEnum.FALLITO
            }
          ];
    return response;
  }

  getStatus(paymentJobListPending: PaymentJobList): boolean {
    // eslint-disable-next-line functional/immutable-data
    return ++this.tmpMock > 4;
  }

  downloadFile(jobId: number): void {
    //
  }
}
