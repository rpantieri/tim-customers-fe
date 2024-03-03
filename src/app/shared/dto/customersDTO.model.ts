export class CustomerDTO {
    public name:string = '';
    public taxcode:string = '';
    public id:number = NaN;
    public address:string = '';
    public userId:number = NaN;
    public note:string = '';

    public contacts: ContatDTO[] = [];
    public services: ServiceDTO[] = [];

    constructor() { }
}

export class ContatDTO {
    public name:string = '';
    public phone:string = '';
    public mobile:string = '';
    public email:string = '';
    public role:string = '';
}

export class ServiceDTO{
    public name:string = '';
    public amount:number = NaN;
    public costPerMonth:number = NaN;
}



export function copyCustomerDTOFromProxy(i:CustomerDTO): CustomerDTO{
    let a:CustomerDTO = new CustomerDTO();
    Object.assign(a,i);
    let cc:ContatDTO[] = [];
    let ss:ServiceDTO[] = [];
    i.contacts.forEach( x => { let c:ContatDTO = new ContatDTO(); Object.assign(c,x);cc.push(c); });
    i.services.forEach( x => { let s:ServiceDTO = new ServiceDTO(); Object.assign(s,x);ss.push(s); });
    a.contacts = cc;
    a.services = ss;
    return a;
}