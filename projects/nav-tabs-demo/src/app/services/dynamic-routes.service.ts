import {TabbableRoute} from "nav-tabs";
import {Injectable, signal} from "@angular/core";
import {AppTabsCopyModel} from "../models/copy";
import {tabbableRoutes} from "../stubs.routes";

@Injectable({
  providedIn: 'root'
})
export class DynamicRoutesService {
  private dynamicRoutes = signal<(TabbableRoute | TabbableRoute<AppTabsCopyModel>)[]>([]);
  private readonly baseRoutes: (TabbableRoute | TabbableRoute<AppTabsCopyModel>)[];

  constructor() {
    this.baseRoutes = [...tabbableRoutes];
    this.dynamicRoutes.set([...this.baseRoutes]);
  }

  getRoutes() {
    return this.dynamicRoutes.asReadonly();
  }

  addRoute(route: TabbableRoute | TabbableRoute<AppTabsCopyModel>) {
    this.dynamicRoutes.update(routes => [...routes, route]);
  }

  removeRoute(routeToRemove: TabbableRoute | TabbableRoute<AppTabsCopyModel>) {
    this.dynamicRoutes.update(routes => {
      return routes.filter(route => route.path !== routeToRemove.path);
    });
  }
}
