import pb from '$lib/pb';
import type { PageLoad} from './$types';
import type { Student, Attendance, Course } from '$lib/types';

export const load = (async ({ params }) => {
    // load attendance record with the given id
try{
   const attendanceRecord = await pb.collection('attendance').getFirstListItem(`id="${params.slug}"`, {
        expand: 'course',
    });

    console.log(attendanceRecord)
    // get all students enrolled in the course
    const studentRecords = await pb.collection('student').getFullList(200 /* batch size */, {
        sort: 'student_id',
        filter: `courses ~ "%${attendanceRecord.course}%"`
    });

    // map the records to student type
    const students: Student[] = studentRecords.map((record) => ({
        id: record.id,
        student_id: record.student_id,
        name: record.name,
        attended: attendanceRecord.attended_students.includes(record.id),
        rfid: record.rfid,
    }));

    const courseRecord = attendanceRecord.expand.course as any;
    const course: Course = {
        id: courseRecord.id,
        code: courseRecord.code,
        name: courseRecord.name,
    }


    return {
        course: course,
        date: attendanceRecord.date,
        id: attendanceRecord.id,
        students: students,
    };
}
catch (e) {
    console.log(e);
}

}) satisfies PageLoad;