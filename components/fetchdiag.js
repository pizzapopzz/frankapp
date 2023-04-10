const DiagAPI = async () => {
  try {
    let data = await fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1P1KMcDGfa-MAgegfLhRDAEEhu5mKHmnbMsZ64y60rqw/values/Sheet4?valueRenderOption=FORMATTED_VALUE&key=AIzaSyCEIsyW5ZCHSFILrPRxWSDtw0E5lXEPBPE"
    );
    let { values } = await data.json();
    let [, ...Data] = values.map((data) => data);
    return Data;
  } catch {
    console.log("Error");
  }
};
export default DiagAPI;
