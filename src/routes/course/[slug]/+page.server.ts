import pb from '$lib/pb';
import type { PageServerLoad} from './$types';
import type { Student, Attendance } from '$lib/types';
import { error } from '@sveltejs/kit';
export const load = (async ({ params }) => {
  // load list of students enrolled in the course
  // check if the course exists

  try {
    
  
    await pb.collection('course').getFirstListItem(`id="${params.slug}"`)



    const records = await pb.collection('student').getFullList(200 /* batch size */, {
        sort: 'student_id',
        filter: `courses ~ "%${params.slug}%"`
    });
    console.log(records);


// map the records to student type
const students: Student[] = records.map((record) => ({
    id: record.id,
    student_id: record.student_id,
    name: record.name,
}));

// get all attendance records for the course
const attendanceRecords = await pb.collection('attendance').getFullList(200 /* batch size */, {
    sort: 'date',
    filter: `course = "${params.slug}"`
});

// map the records to attendance type
const attendance: Attendance[] = attendanceRecords.map((record) => {

    let num_attended = record.attended_students.length; // number of students who attended the class
    return {
        date: record.date,
        num_attended: num_attended,
        id: record.id,
}});

// return the courses as the page data
return {

    course_id: params.slug,
    students,
    attendance,

};
} catch (err) {
    console.log(err)
    throw error(404, "NOT FOUND");
}

}) satisfies PageServerLoad;