import api from "../api/axios";

async function handleRequest(request){
    try{
        const response = await request;
        return response.data;
    }catch(error){
        return {
            error: error || "Something wrong happened!"
        }
    }
}

export async function getGlucoseReadings(date) {
    const data= await handleRequest(
        api.get('/glucose-readings', 
            { params: { date } }, 
            { withCredentials: false }));

    return data.readings || [];
}

export async function generatePDF(start_date, end_date) {
  const response = await api.get('/reports/glucose/pdf', {
    params: { start_date, end_date },
    responseType: 'blob',  // ← critical: tells axios not to parse the binary
  });

  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `glucose_report_${start_date}_${end_date}.pdf`;
  document.body.appendChild(a);
  a.click();

  a.remove();
  URL.revokeObjectURL(url);
}