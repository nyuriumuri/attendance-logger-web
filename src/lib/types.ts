export type Course = {
    id: string;
    code: string;
    name: string;
}

export type Student = {
    id: string;
    student_id: string;
    name: string;
    attended? : boolean;
    rfid?: string;
};

export type Attendance = {
    date: string;
    num_attended: number;
    id: string;
}

