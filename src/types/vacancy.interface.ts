export interface IVacancy {
    id: number;
    payment_from: number;
    payment_to: number;
    profession: string;
    currency: string;
    type_of_work: ITypeOfWork;
    vacancyRichText: string;
    town: ITown;
}

interface ITypeOfWork {
    id: number;
    title: string;
}

interface ITown {
    "id": number;
    "title": string;
}