// Add an event listener to the "Generate Report" button
document.querySelector('.button-primary').addEventListener('click', function() {

    // Create a new instance of jsPDF
    var doc = new jsPDF();
  
    // Save the PDF document
    doc.save('attendance_report.pdf');
  
  });
  