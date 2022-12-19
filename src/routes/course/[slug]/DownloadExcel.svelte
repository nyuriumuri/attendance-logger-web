<script lang="ts">
    import Excel from 'exceljs';
    import pb  from '$lib/pb';
    import { saveAs } from 'file-saver';
    import dayjs from 'dayjs';
    const fileName = 'attendance.xlsx';
    export let classId: String;
    

    const download = async () => {
        const wb = new Excel.Workbook();
        const ws = wb.addWorksheet('Sheet 1');

        // ws.getCell('A1').value = 'John Doe';
        // ws.getCell('B1').value = 'gardener';
        // ws.getCell('C1').value = new Date().toLocaleString();

        // const r3 = ws.getRow(3);
        // r3.values = [1, 2, 3, 4, 5, 6];
        // get all students in class
        const studentRecords = await pb.collection('student').getFullList(200,
            {
                filter: `courses ~ "%${classId}%"`
            });
        // get all attendance records for class
        const attendanceRecords = await pb.collection('attendance').getFullList(200,
            {
                filter: `course = "${classId}"`
            });
    
        // setup headers
        const headerRow = ws.getRow(1);
        headerRow.values = ['Student ID', 'Name', ...attendanceRecords.map((record) => dayjs(record.date).format('M/D/YYYY'))];
        // generate a row for each student
        // col 1: student id
        // col 2: student name
        // col 3+: student is attendance record's attendend_students ? 'P' : 'A'
        studentRecords.forEach((student, index) => {
            const row = ws.getRow(index + 2);
            row.values = [student.student_id, student.name, ...attendanceRecords.map((record) => record.attended_students.includes(student.id) ? 'P' : 'A')];
        });
        // fill all A cells with red, all P cells with green
        ws.eachRow((row, rowNumber) => {
            if (rowNumber === 1) {
                return;
            }
            row.eachCell((cell, colNumber) => {
                if (colNumber === 1 || colNumber === 2) {
                    return;
                }
                // bold centerd text
                cell.alignment = {
                    vertical: 'middle',
                    horizontal: 'center',
                    wrapText: true,
                };
                cell.font = {
                    bold: true,
                    color: { argb: 'FF000000' },
                };
              

                if (cell.value === 'A') {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFdd8b8d' },
                    };
                } else if (cell.value === 'P') {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FF61f8ad' },
                    };
                }
            });
        });
        // add borders
       
        // stretch columns to fit content
        ws.columns.forEach((column) => {
            column.width = 20;
        });
        wb.xlsx
            .writeBuffer()
            .then((blob) => {
               // save blob as xlsx file with file-saver
               const blobData = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                saveAs(blobData, fileName);

            })
            .catch(err => {
                console.log(err.message);
            });
    };

    const buttonClass ="bg-blue-900 hover:bg-blue-500 text-slate-200 rounded-lg p-2"

</script>

<button on:click={download} class={buttonClass}>Download as Spreadsheet</button>

