const DataAPI = async () => {
  try {
    let data = await fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1gLi4naNlVCirP2sK6rWM9C7_VLkKsH4EltLMHf7fI48/values/Sheet2?valueRenderOption=FORMATTED_VALUE&key=AIzaSyCEIsyW5ZCHSFILrPRxWSDtw0E5lXEPBPE"
    );
    let { values } = await data.json();
    let [, ...Data] = values.map((data) => data);
    return Data;
  } catch (err) {
    console.log(err);
  }
};
export default DataAPI;
