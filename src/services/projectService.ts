import { Observable, defer, from } from "rxjs";

import { IProjectTimesheet } from "../model/timesheet";
import { IProjectInfo } from "../model/project";
import { IPhasesInfo } from "../model/phases";
import { IClientInfo } from "../model/clients";

class ProjectService {
  public getTimeSheetData = (): Observable<IProjectTimesheet[]> => {
    return defer(() =>
      // for lazy loading

      {
        return from<Promise<IProjectTimesheet[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3500/timesheet`).then(r => r.json())
        );
      }
    );
  };

  public getClientData = (): Observable<IClientInfo[]> => {
    return defer(() =>
      // for lazy loading

      {
        return from<Promise<IClientInfo[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3500/clients`).then(r => r.json())
        );
      }
    );
  };

  public getProjectInfo = (): Observable<IProjectInfo[]> => {
    return defer(() =>
      // for lazy loading

      {
        return from<Promise<IProjectInfo[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3500/project`).then(r => r.json())
        );
      }
    );
  };

  public getProjectInfoById = (id: number): Observable<IProjectInfo> => {
    return defer(() =>
      // for lazy loading

      {
        return from<Promise<IProjectInfo>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3500/project/${id}`).then(r => r.json())
        );
      }
    );
  };

  public getPhasesInfo = (): Observable<IPhasesInfo[]> => {
    return defer(() =>
      // for lazy loading

      {
        return from<Promise<IPhasesInfo[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3500/timesheet`).then(r => r.json())
        );
      }
    );
  };

  // private mapToProductProfile=(product: IProductProfile[]): IProductProfile[] =>{

  // return product.map(this.mapToproduct);

  // }

  // private mapToproduct(product: IProductProfile):IProductProfile{

  // return {

  // productId: product.productId,

  // productName: product.productName,

  // productCode: product.productCode,

  // releaseDate: product.releaseDate,

  // description: product.description,

  // price: product.price,

  // starRating: product.starRating,

  // imageUrl: product.imageUrl

  // }

  // }
}

export default new ProjectService(); // exporting as an object